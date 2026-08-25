# Integração com a Pulsar — os dois webhooks

**Data:** 17/08/2026 · atualizado em 25/08 com o aviso de abertura da Etapa 2 e
o carimbo do lead no Calendly.
**Origem:** pedido da Pulsar (webhooks, cenário na grafia exata, telefone
repassado sem reformatar).
**Status:** no ar e verificado. Os dois endpoints da Pulsar respondem e o CORS
está liberado. As duas páginas de produção disparam para a Pulsar e para o Make.

Este documento é o contrato entre as duas pontas. Quem for mexer no quiz ou no
formulário sem ler isto quebra a integração sem perceber.

## Os endereços

| Quando | Página no ar | Webhook |
|---|---|---|
| 1 — quiz concluído | `grokker-diagnostico.vercel.app` | `https://pulsar.app.n8n.cloud/webhook/grokker-quiz-etapa1` |
| 2 — página aberta | `grokker-etapa2-diagnostico.vercel.app` | `https://pulsar.app.n8n.cloud/webhook/grokker-etapa2-iniciada` |
| 2 — diagnóstico concluído | `grokker-etapa2-diagnostico.vercel.app` | `https://pulsar.app.n8n.cloud/webhook/grokker-quiz-etapa2` |

Os três disparam `POST` com `Content-Type: application/json`.

No fim de cada etapa a página manda para **dois destinos**, não só para a
Pulsar (o aviso de abertura é a exceção: só interessa ao CRM). O segundo é um
webhook do Make que alimenta as nossas planilhas, e existe para não dependermos
da Pulsar para enxergar o próprio lead — foi assim que o acesso à planilha
antiga se perdeu sem substituta. O Make **não** cria contato no CRM: duplicaria
o que o n8n já faz e a cadência dispararia duas vezes para o mesmo lead.

| Etapa | Webhook do Make | Destino |
|---|---|---|
| 1 | `hook.us2.make.com/v0ungryn21i7gk3q0ld4rxamf3g2m5tp` | aba `Página1` |
| 2 | `hook.us2.make.com/3xnav3lyusd965i2fptdpi5kk5yl0ywy` | aba `Etapa 2` |
| clique no WhatsApp | `hook.us2.make.com/l8nl0chvehsk2aonkg1hi5y34ok2ndap` | marca a linha do lead na `Página1` |

O cenário do clique procura a linha pelo telefone e escreve em duas células com
endereço fixo. Ele ficou fora do ar entre 19 e 25/08 por causa disso: quando o
telefone não casa com nenhuma linha — clique vindo do protótipo, por exemplo — o
número da linha vinha vazio, o endereço saía como `AI` em vez de `AI12`, e o
Make derrubava o cenário depois dos erros. Agora há um filtro antes: sem linha
encontrada, o clique é ignorado em silêncio em vez de virar erro.

Os três escrevem no **mesmo arquivo**: `Grokker — Jornada completa (Etapa 1 +
Etapa 2)`. Foi pedido da Dani ver a jornada inteira num lugar só, e o desenho
resolve mais do que a conveniência: com as duas etapas separadas em arquivos
diferentes, ninguém conseguia responder "quantos dos leads que entraram
chegaram até o fim" sem cruzar na mão.

A aba `Página1` ganhou 26 colunas de jornada (AL a BK) que puxam da aba
`Etapa 2` **pelo telefone**: se respondeu, as 15 notas cruas, as cinco médias de
bloco, o TD, o bloco dominante, onde está o gargalo, a etiqueta de Lead Hot e
por onde abrir a call. Uma linha por lead, com a jornada inteira nela.

O prefixo `E2 ·` no cabeçalho não é enfeite: sem ele, colunas como "Bloco A" ou
"A1" se confundiriam com as respostas da Etapa 1 na hora de filtrar.

É por isso que o telefone da Etapa 2 precisa voltar idêntico ao da Etapa 1 — se
ele for reformatado no meio do caminho, o cruzamento silenciosamente para de
casar e todo mundo aparece como "não respondeu", com as 25 colunas vazias.

As colunas de jornada são **fórmula na linha 1** e valem para a planilha toda.
Não digite por cima nem apague a linha 1. E a aba `Etapa 2` é a fonte: se alguém
inserir ou reordenar coluna lá, os VLOOKUP daqui passam a trazer o campo errado
sem dar erro.

Um destino que cai não derruba o outro, e o lead não espera por nenhum dos dois.

## Etapa 1 — o que sai no fim do quiz

```json
{
  "etapa": 1,
  "enviado_em": "2026-08-17T13:05:00.000Z",
  "nome": "Marcelo",
  "email": "marcelo@empresa.com.br",
  "telefone": "5511987654321",
  "telefone_digitado": "(11) 98765-4321",
  "cenario": "O Gargalo",
  "cenario_indice": 1,
  "diagnostico_pdf": "Diagnostico-02-o-gargalo.pdf",
  "caminho": "A",
  "cargo": "...", "setor": "...",
  "colaboradores": "Entre 100 e 200",
  "colaboradores_sob_responsabilidade": "",
  "faturamento": "...", "margem": "...",
  "autonomia": "...", "remuneracao": "...",
  "pontuacao": 7,
  "qualificado": true,
  "motivo": "...",
  "respostas": { "P0": "...", "P1": "...", "P8": "..." }
}
```

A **`P8`** entrou em 25/08, a pedido da equipe da Dani, e são **duas perguntas
diferentes com a mesma função de qualificador** — uma por caminho. Por isso são
dois campos, e cada lead preenche um e deixa o outro em branco, exatamente como
`faturamento`/`margem` contra `autonomia`/`remuneracao` já faziam:

| Caminho | Campo | Pergunta | Faixas |
|---|---|---|---|
| A — dono ou sócio | `colaboradores` | Quantos colaboradores a sua empresa emprega? | Acima de 500 · Entre 200 e 500 · Entre 100 e 200 · Entre 50 e 100 · Entre 20 e 50 · Menos de 20 |
| B — executivo | `colaboradores_sob_responsabilidade` | Quantos colaboradores estão sob sua responsabilidade? | Mais de 30 · Entre 16 e 30 · Entre 11 e 15 · Entre 05 e 10 · Entre 1 e 4 · Nenhum |

Os dois campos existem sempre no payload, então ninguém precisa de `if` para
ler. Dentro de `respostas`, a `P8` já vem resolvida: traz a que o lead
respondeu.

Nenhuma das duas **mexe em `qualificado` nem em `pontuacao`** ainda. A
especificação dá pontos para cada faixa, mas não diz a partir de quantos
colaboradores o lead qualifica, e ligar a régua sem essa definição reprovaria
lead que hoje passa. As faixas e os pontos já estão na página; falta a régua.

**`cenario`** vem com uma das quatro grafias abaixo, caractere por caractere,
com acento e maiúscula. Foi o pedido da Pulsar e é o que permite casar com o
material sem tabela de tradução no meio:

| `cenario_indice` | `cenario` | `diagnostico_pdf` |
|---|---|---|
| 0 | `O Adiador` | `Diagnostico-01-o-adiador.pdf` |
| 1 | `O Gargalo` | `Diagnostico-02-o-gargalo.pdf` |
| 2 | `Time que não Assume` | `Diagnostico-03-time-que-nao-assume.pdf` |
| 3 | `Plano que não Vira Execução` | `Diagnostico-04-plano-que-nao-vira-execucao.pdf` |

Quem preferir chave estável a texto usa `cenario_indice`. `diagnostico_pdf` já
diz qual dos quatro arquivos enviar, sem `if` do lado de lá.

**`telefone`** vai normalizado: só dígitos, com `55` na frente. Números de 10 ou
11 dígitos recebem o prefixo; o que já vier com DDI passa direto.
`telefone_digitado` guarda o que o lead escreveu, para conferência quando algo
não casar.

`qualificado` e `motivo` são a régua de corte (dono ≥ R$ 200 mil/mês; executivo
≥ R$ 10 mil com autonomia), já aplicada — não precisa recalcular.

### Como a `pontuacao` é somada

**Só as perguntas qualificadoras somam.** As de cenário (P2 a P5) leem qual é o
problema do lead, não o tamanho dele, e ficam de fora. A margem também: a
especificação a trata como indicador de maturidade financeira, não como nota.

| Caminho | Somam | Teto |
|---|---|---|
| A — dono ou sócio | P8 colaboradores + P6 faturamento | 20 |
| B — executivo | P6 autonomia + P8 colaboradores + P7 remuneração | 30 |

| P8 caminho A | pts | P6 faturamento | pts |
|---|---|---|---|
| Acima de 500 | 10 | Acima de R$ 500.000 | 10 |
| Entre 200 e 500 | 8 | De R$ 300.000 até R$ 500.000 | 8 |
| Entre 100 e 200 | 6 | De R$ 200.000 até R$ 300.000 | 4 |
| Entre 50 e 100 | 4 | De R$ 100.000 até R$ 200.000 | 1 |
| Entre 20 e 50 | 2 | Até R$ 100.000 | 0 |
| Menos de 20 | 1 | | |

| P6 autonomia | pts | P8 caminho B | pts | P7 remuneração | pts |
|---|---|---|---|---|---|
| Total, a decisão é minha | 10 | Mais de 30 | 10 | Acima de R$ 50.000 | 10 |
| Parcial, decido até um valor | 6 | Entre 16 e 30 | 8 | De R$ 20.000 até R$ 50.000 | 8 |
| Quase nenhuma | 0 | Entre 11 e 15 | 6 | De R$ 10.000 até R$ 20.000 | 5 |
| Nenhuma | 0 | Entre 05 e 10 | 4 | De R$ 5.000 até R$ 10.000 | 2 |
| | | Entre 1 e 4 | 2 | Menos de R$ 5.000 | 1 |
| | | Nenhum | 0 | | |

**O caminho A somava errado até 25/08.** No lugar da P8 entrava a P4 ("quantas
decisões acontecem sem passar por você"), que é pergunta de cenário. Quem
marcava "tudo passa por mim" ganhava 10 pontos de graça: uma empresa de menos de
20 pessoas faturando até R$ 100 mil aparecia com **10** quando devia aparecer
com **1**. As linhas de teste anteriores a essa data têm a Pontuação inflada; o
resto dos campos está correto.

Isso nunca afetou `qualificado` — o corte olha o faturamento direto, não a soma.

**As faixas de remuneração foram alinhadas com a especificação em 25/08.** A
página tinha seis faixas, indo até "Acima de R$ 100.000"; passou a ter as cinco
do documento, com teto em "Acima de R$ 50.000". O corte de qualificação **não
mudou de lugar**: continua sendo R$ 20 mil, porque na escala nova a faixa
"De R$ 20.000 até R$ 50.000" vale 8 e a de baixo vale 5.

**Toda faixa desta página fecha na seguinte.** A especificação ia de R$ 10.000 a
R$ 19.000 e pulava para R$ 20.000; quem ganhasse R$ 19.500 não encontrava a
própria faixa. Os rótulos da página fecham em R$ 10.000 e R$ 20.000 redondos.

A regra vale para as quatro perguntas de faixa numérica, e as outras três já
estavam certas: faturamento e colaboradores da empresa fecham por sobreposição
(quem tem exatamente 50 pessoas escolhe uma das duas vizinhas), e colaboradores
sob responsabilidade fecha por ser contagem inteira — entre "Entre 1 e 4" e
"Entre 05 e 10" não existe número de gente para cair fora.

## Etapa 2 — o aviso de abertura

Pedido da Pulsar em 25/08. Dispara **na carga da página**, antes de o lead tocar
em qualquer botão:

```
POST https://pulsar.app.n8n.cloud/webhook/grokker-etapa2-iniciada?lead_id=<id>
{ "lead_id": "<id>", "telefone": "<o mesmo telefone da Etapa 1>" }
```

O `lead_id` vai **duas vezes de propósito**: na query string e no corpo. Se o
`fetch` cair e o envio for pelo `sendBeacon`, o corpo chega como `text/plain`; a
query string chega igual dos dois jeitos, então o dado nunca depende de o outro
lado saber ler o corpo.

**Por que na carga e não no botão.** O CRM precisa separar quem nunca clicou no
link de quem clicou e não terminou. Hoje os dois caem no mesmo lugar e recebem a
mesma mensagem, que está errada para um dos dois. Amarrado ao botão "Começar o
diagnóstico", quem abre e desiste continuaria contado como quem nunca abriu — que
é exatamente o caso que a mensagem precisa tratar diferente.

Recarregar a página dispara de novo, e isso é esperado: a deduplicação é do lado
da Pulsar, não da página. Página nenhuma consegue garantir "uma vez por lead" —
o lead troca de aparelho, limpa o navegador, abre em anônimo.

Abrir a página **sem `?lead=` e sem telefone não dispara nada**. Sem isso, cada
abertura do protótipo entraria no CRM como o lead fictício `demo-0001`.

## Etapa 2 — o que sai quando as 15 perguntas terminam

```json
{
  "lead_id": "abc123",
  "etapa": 2,
  "cenario_etapa1": "O Gargalo",
  "telefone": "5511987654321",
  "nome": "Marcelo",
  "respostas": { "A1": 10, "A2": 4, "B1": 8, "...": "..." },
  "blocos": { "A": 7, "B": 9, "C": 7, "D": 8, "E": 8 },
  "td": 7.8,
  "bloco_dominante": "B",
  "lead_hot": false
}
```

São as 15 notas cruas, as 5 médias de bloco, o Total Diagnóstico, o bloco
dominante e a etiqueta de Lead Hot. **Tudo calculado do nosso lado**: o Closer
abre o card e lê, não soma nada.

Lembrete de leitura que precisa aparecer no card: **a escala é invertida, nota
alta é problema grave**. `Sempre = 0 · Geralmente = 4 · Às vezes = 8 ·
Nunca = 10`. Ler nota alta como bom desempenho inverte o sentido da call.

`lead_hot` é `true` quando o TD passa de 8,0 **ou** algum dos blocos A, B ou D
bate 10.

## O link da Etapa 2

É a Pulsar que monta, no disparo do WhatsApp:

```
https://grokker-etapa2-diagnostico.vercel.app/?lead=<id>&nome=<primeiro nome>&email=<e-mail>&telefone=<o mesmo telefone da Etapa 1>&cenario=<cenário da Etapa 1>
```

Tudo com `encodeURIComponent` — os cenários têm acento e espaço.

Só `lead` é obrigatório. `nome` e `email` pré-preenchem o Calendly, para o lead
não redigitar o que já informou. `cenario` é o que mostra ao Closer por onde
abrir a call.

## O carimbo no Calendly

O link do widget leva `utm_content=<lead>`, ao lado do `name` e do `email` que já
iam. Não precisa configurar nada no Calendly: ele aceita `utm` em qualquer link e
devolve o valor no aviso de agendamento.

É o que liga a reunião agendada ao lead que fez o quiz. Sem isso sobra casar pelo
nome, que quebra na primeira vez que o lead escreve o nome de um jeito diferente
do que veio da Etapa 1 — e é justamente no lead que agenda que errar dói mais.

**Sobre o telefone, que foi o ponto levantado:** o formulário da Etapa 2 **não
pergunta o telefone e não reformata o que recebe**. O valor que vier no link é o
valor que volta no webhook, idêntico. Se ele recapturasse, o lead poderia
digitar diferente das duas vezes e os dois registros deixariam de casar — que é
exatamente o que a Pulsar pediu para evitar. Mandem no `telefone` o mesmo valor
que a Etapa 1 entregou em `telefone`.

Por tolerância a quem nomeia o parâmetro de outro jeito, também são aceitos
`phone`, `whatsapp`, `zap`, `tel` e `celular`. O primeiro que aparecer vence.

## O lado do n8n

Conferido em 17/08: os dois endpoints estão registrados para POST e devolvem
CORS liberado para qualquer origem. O que não dá para conferir daqui é o que o
fluxo faz com o dado depois de recebê-lo — isso só um teste com lead real
mostra, olhando o card no CRM.

Se um dia o `fetch` passar a falhar, o envio cai para `navigator.sendBeacon`,
que manda o mesmo JSON com `Content-Type: text/plain` para não pedir preflight.
O corpo é idêntico; muda só o cabeçalho. Vale o endpoint aceitar os dois.

O envio nunca segura o lead: falhando tudo, ele vê a agenda do mesmo jeito. Isso
é bom para a experiência e ruim para o diagnóstico, porque a falha é silenciosa —
por isso vale rodar um teste ponta a ponta antes de subir tráfego, olhando o que
chega no n8n.

## Como testar sem tráfego real

Na Etapa 1, responder o quiz até o fim com dados de teste.
Na Etapa 2, abrir com os parâmetros e responder as 15 perguntas:

```
https://grokker-etapa2-diagnostico.vercel.app/?lead=teste-001&nome=Marcelo&email=teste@empresa.com.br&telefone=5511987654321&cenario=O%20Gargalo
```

Os atalhos de preenchimento existiam só no protótipo e saíram da produção: o
lead nunca deve ver a nota dele nem o payload do CRM. Para inspecionar o JSON
exato sem publicar nada, abra `funis/prototipo-etapa2/index.html` do disco.

## Pendências fora deste contrato

- **A automação antiga ainda está no ar.** O lead que clica hoje recebe a
  mensagem antiga, que fala em sessão estratégica antes da Etapa 2. A sequência
  aprovada está em `copy/whatsapp-entrega-diagnostico.md`.
- **O domínio próprio.** `quiz.grokkeronline.com/quiz` e `/lp` ainda servem o
  funil antigo. Tudo o que está descrito aqui vive nas URLs da Vercel.
