# Etapa 2 — Diagnóstico completo (especificação para produção)

**Data:** agosto/2026
**Base:** documentos `Etapa2_Diagnostico` e `Etapa2_Disparo` (Grokker) + transcrição da
reunião com a Pulsar (`estrategia/transcricao-reuniao-pulsar.txt`)
**Protótipo:** `funis/prototipo-etapa2/`

Este documento existe porque a documentação da Grokker e a reunião com a Pulsar
descrevem **fluxos diferentes** para a mesma peça. Aqui está o que foi mantido de
cada lado e por quê, para que quem implementar não precise escolher no escuro.

## O que é

O formulário de 15 perguntas que o lead responde **entre** receber o PDF do
diagnóstico no WhatsApp e escolher o horário da sessão estratégica. Ele mede o
tamanho do gap de gestão em cinco blocos e entrega ao Closer, antes da call, a
nota de cada bloco e o Total Diagnóstico.

Para o lead é um passo curto. Para o comercial é a pauta da conversa.

## As divergências e o que vale

### 1. Quando o link é disparado

**Documentação:** no instante em que o lead confirma o agendamento. Primeiro
agenda, depois preenche.
**Call:** o link vai junto com a entrega do PDF, e a agenda aparece no fim do
formulário. Foi a ordem que o Graziano recapitulou no fechamento da reunião:
*"ele recebe o áudio, recebe o PDF e recebe o link"*, com a Dani presente.

**Vale a ordem da call.** Não só por ser mais recente: a documentação justifica a
ordem dela com o argumento de que pedir *"um formulário longo de 15 minutos"*
antes do agendamento derrubaria a conversão. Esse argumento cai junto com a
premissa, porque o formulário não tem 15 minutos (ver adiante). Com 3 minutos, o
esforço pedido é menor que o de abrir uma agenda e escolher um horário.

O compromisso psicológico que a documentação queria proteger continua existindo,
só muda de fonte: em vez de vir do horário reservado, vem do áudio da Dani e do
PDF que o lead acabou de receber. Ele preenche em cima da leitura, não frio.

### 2. Quanto tempo leva

**Documentação:** 15 minutos, em dois trechos.
**Call:** 3 minutos, calculado pela própria Dani ao vivo (*"em 3 minutos ela
responde, eu calculei"*), e o Graziano pediu que entrasse na copy como *"mais 3
minutinhos"*.

**Vale 3 minutos.** São 15 perguntas de toque único numa escala de quatro pontos.
O protótipo confirma a conta. O número aparece na abertura do formulário, no
áudio e nos PDFs.

Fechado em 3 minutos em ago/26 e **reaberto em 13/08**: na revisão da Etapa 2 a
Dani pediu "em menos de 5 minutos" na abertura do formulário, que é o que está
publicado. As outras peças (página pós-quiz, áudio, PDFs) continuam dizendo
menos de 3 minutos. **Falta unificar de novo**, e a recomendação é ficar em 5:
é o número que a cliente escolheu duas vezes, e prometer folga e entregar rápido
é melhor que o contrário.

### 3. Quem recebe

**Documentação:** só quem agendou. Quem não agenda vai para nutrição e nunca vê a
Etapa 2, *"porque pedir esforço sem recompensa derruba a experiência"*.
**Call:** todo mundo que chamou no WhatsApp recebe, porque o formulário é o
caminho até a agenda.

**Vale a regra da call**, por consequência da ordem nova. A recompensa que a
documentação procurava passa a estar do outro lado do formulário: quem preenche
sai com o horário marcado.

A nutrição não some, muda de gatilho. Antes era para quem não agendou; agora é
para quem recebeu o link e não preencheu dentro da janela de 24 horas.

### 4. O que deixa de fazer sentido

Três mecanismos da documentação existiam só para sustentar a ordem antiga e saem:

- Lembretes automáticos 24h e 4h antes da call para quem agendou e não preencheu.
  Na ordem nova não existe agendado sem preenchimento. O que fica no lugar são os
  dois follow-ups dentro da janela de 24h já descritos em
  `copy/whatsapp-entrega-diagnostico.md`.
- A prerrogativa de o Closer **reagendar** quem chega à call sem ter preenchido.
- O SDR cobrando o preenchimento de quem já agendou.

## O que foi mantido da documentação, sem alteração

O instrumento em si é propriedade intelectual da Grokker e a documentação proíbe
mexer na redação das perguntas, na ordem dos blocos e na escala. O que segue é
transcrição fiel, com **uma única alteração, pedida pela própria cliente em
13/08**: a pergunta E5 passou de "O quanto você **está** satisfeito" para "O
quanto você **se sente** satisfeito". A autorização vem da Grokker, que é a dona
do instrumento.

### Escala

Quatro pontos, com pontuação **invertida**:

| Resposta | Pontos |
|---|---|
| Sempre | 0 |
| Geralmente | 4 |
| Às vezes | 8 |
| Nunca | 10 |

As perguntas são escritas na forma positiva e a pontuação é invertida de
propósito: **nota alta significa gap maior**. Quem lê o resultado precisa saber
disso, porque interpretar nota alta como bom desempenho inverte o sentido da call
inteira.

### Blocos e perguntas

| Bloco | Nome | Perguntas | Cálculo |
|---|---|---|---|
| A | Exigência e Responsabilização | A1, A2 | (A1+A2)/2 |
| B | Autonomia da Equipe e Execução | B1, B2 | (B1+B2)/2 |
| C | Reuniões e Prazos | C1, C2 | (C1+C2)/2 |
| D | Delegação e Maturidade do Time | D1 a D4 | soma/4 |
| E | Cultura, Alinhamento e Retenção | E1 a E5 | soma/5 |

**Total Diagnóstico:** `TD = (A + B + C + D + E) / 5`

O texto das 15 perguntas está no protótipo, em `funis/prototipo-etapa2/index.html`,
copiado palavra por palavra do documento original.

### Régua de leitura

- **TD** é o índice de caos de gestão. Quanto mais perto de 10, mais urgente.
- **Bloco dominante** é o de maior nota. É por ele que o Closer abre a conversa,
  mesmo quando o TD é médio: um TD 5 com bloco A em 10 vende mais que um TD 6
  distribuído por igual.
- **Lead Hot:** TD acima de 8,0 **ou** nota 10 em A, B ou D. Entra no CRM com
  etiqueta de prioridade.

### Ponte com o cenário da Etapa 1

| Cenário da Etapa 1 | Blocos correspondentes |
|---|---|
| O Adiador | A (Exigência) e E4 (medo de ser impopular) |
| O Gargalo | B (Autonomia e "o que fazemos agora?") |
| Time que não Assume | D (Delegação) e A2 (culpabilização externa) |
| Plano que não Vira Execução | C (Reuniões e Prazos) e D2 (confiança na meta) |

Serve para o Closer amarrar as duas etapas: *"no quiz você caiu em O Adiador;
agora, olhando o bloco A, dá para ver exatamente por quê"*.

### Régua financeira

Continua sendo a da Etapa 1 (dono ≥ R$ 200 mil/mês; executivo ≥ R$ 10 mil com
autonomia), sempre em base **mensal**. A Etapa 2 qualifica o problema, não o
bolso.

### O que o lead vê, e quando

A abertura do formulário **não menciona a Sessão Estratégica**. Quem chega ali
ainda não sabe que ela existe, e antecipar a oferta transforma um passo curto em
compromisso comercial antes da hora. A sessão só aparece na tela final, depois
de o lead ter respondido, quando o esforço já foi feito e a oferta soa como
consequência.

A tela final tem uma ordem deliberada: confirmação, depois o texto que explica
por que a leitura precisa de um especialista, e só então a agenda. O argumento
vem antes do calendário; se a agenda aparecesse primeiro, o lead escolheria
horário sem entender o que ganha com ele.

Os nomes dos blocos (A a E) **não aparecem** para o lead. São nomenclatura
interna e, na tela, só criavam ruído entre a pergunta e a resposta.

### Confidencialidade

A página leva `noindex` e não deve ser indexada nem acessível fora do fluxo. O
lead é informado de que as respostas são confidenciais — está na abertura do
formulário, e não é só cortesia: resposta socialmente aceitável mascara a dor e
estraga o diagnóstico.

## O que precisa existir do lado técnico

### O link

Precisa carregar a identificação do lead, senão o CRM não sabe quem preencheu e
os follow-ups batem em quem já respondeu. O protótipo lê:

```
/etapa2?lead=<id>&nome=<primeiro nome>&email=<e-mail>&telefone=<telefone da Etapa 1>&cenario=<cenário da Etapa 1>
```

`nome` personaliza a abertura e pré-preenche a agenda, junto com `email`.
`cenario` é o que permite mostrar a ponte ao Closer. Só `lead` é obrigatório.

`telefone` é a chave de cruzamento entre as duas etapas e por isso tem uma
regra própria: **o formulário não pergunta o telefone e não reformata o que
recebe**. O valor que vier na URL é o valor que volta no webhook, caractere por
caractere. Foi o pedido da Pulsar e é o comportamento certo: se a Etapa 2
recapturasse o número, o lead poderia digitar diferente do que digitou na Etapa 1
e os dois registros deixariam de casar. Por tolerância a integrações que nomeiam
o parâmetro de outro jeito, também são aceitos `phone`, `whatsapp`, `zap`, `tel`
e `celular` — o primeiro que aparecer vence, e o painel de demonstração mostra
qual deles foi lido, para conferir a integração sem adivinhação.

### O envio ao CRM

Um webhook único, disparado quando as 15 perguntas terminam, com tudo calculado
do nosso lado. O Closer não deve receber respostas cruas para somar na mão.

`POST https://pulsar.app.n8n.cloud/webhook/grokker-quiz-etapa2`

```json
{
  "lead_id": "abc123",
  "etapa": 2,
  "cenario_etapa1": "O Gargalo",
  "telefone": "5511987654321",
  "nome": "Marcelo",
  "respostas": { "A1": 10, "A2": 4, "...": "..." },
  "blocos": { "A": 7, "B": 9, "C": 7, "D": 8, "E": 8 },
  "td": 7.8,
  "bloco_dominante": "B",
  "lead_hot": false
}
```

São 15 campos de resposta, 5 de bloco, o TD, o bloco dominante e a etiqueta de
Lead Hot, mais a identificação. A documentação pede que o dado esteja no CRM em
até 5 minutos; sendo webhook na conclusão, é imediato.

`cenario_etapa1` chega exatamente com uma das quatro grafias da Etapa 1, com
acento e maiúscula: `O Adiador`, `O Gargalo`, `Time que não Assume`,
`Plano que não Vira Execução`. `telefone` é o eco do parâmetro da URL.

O disparo não bloqueia o lead: sai por `fetch` com `keepalive`, e se falhar cai
para `navigator.sendBeacon`. O beacon vai como `text/plain` para não pedir
preflight, então **o endpoint precisa aceitar os dois content-types** e liberar
CORS para o domínio da página.

### O webhook da Etapa 1

Mesmo mecanismo, no fim do quiz:

`POST https://pulsar.app.n8n.cloud/webhook/grokker-quiz-etapa1`

```json
{
  "etapa": 1,
  "enviado_em": "2026-08-17T13:05:00.000Z",
  "nome": "Marcelo", "email": "...", "telefone": "5511987654321",
  "telefone_digitado": "(11) 98765-4321",
  "cenario": "O Gargalo", "cenario_indice": 1,
  "diagnostico_pdf": "Diagnostico-02-o-gargalo.pdf",
  "caminho": "A", "cargo": "...", "setor": "...",
  "faturamento": "...", "margem": "...", "autonomia": "...", "remuneracao": "...",
  "pontuacao": 7, "qualificado": true, "motivo": "...",
  "respostas": { "P0": "...", "P7": "..." }
}
```

`telefone` vem normalizado (só dígitos, com o 55 na frente) e é **esse** o valor
que precisa voltar na URL da Etapa 2. `telefone_digitado` guarda o que o lead
escreveu, para conferência. `diagnostico_pdf` diz qual dos quatro PDFs enviar.

### Onde as respostas ficam

Dois destinos, cada um para um público:

**Planilha própria da Etapa 2**, no Drive: `[Simple Acc] Grokker — Etapa 2 ·
Diagnóstico completo (respostas)`. Uma linha por lead. As colunas A a U são o que
o formulário escreve (identificação e as 15 notas); as colunas V a AE são
fórmula e calculam sozinhas os cinco blocos, o TD, o bloco dominante, o nome do
gargalo, a etiqueta de Lead Hot e a ponte com o cenário da Etapa 1. À direita,
fora do caminho dos dados, há um painel que se atualiza sozinho: total de
respostas, TD médio, quantos Leads Hot, média por bloco, distribuição do bloco
dominante, faixas de TD e o cruzamento com o cenário da Etapa 1.

Ela é separada da `Planilha de Leads` da Etapa 1 de propósito, porque o acesso de
edição daquela se perdeu.

**Card do lead na Pulsar**, que é onde o comercial opera. Mesmos números, pelo
webhook, no momento em que o lead termina.

O ponto que não pode se perder: **ninguém calcula nada à mão**. O cálculo
acontece no navegador do lead e o que trafega já vai pronto. Se alguém precisar
transportar resposta para descobrir a nota antes da call, o funil volta a ter
trabalho manual e o Closer fica refém de a conta ter sido feita.

Detalhes de manutenção da planilha estão dentro dela, no bloco "Como ler".

### A agenda

**Resolvido:** é o Calendly da Grokker, embutido na última tela.

```
https://calendly.com/sucessodocliente-grokkeronline/30min
```

Widget inline, carregado só quando o lead chega à tela final — antes disso o
script nem entra na página. `nome` e `email` da URL vão como prefill, então o
lead não redigita o que já informou na Etapa 1, e as cores acompanham o tema
escuro para o calendário não parecer um corpo estranho colado no fim.

A agenda vem **depois** do texto que explica por que a leitura precisa de um
especialista. A ordem é deliberada e está descrita em "O que o lead vê, e quando".

## Pendências

1. **Quem hospeda.** A recomendação é a Simple, pelo mesmo motor da Etapa 1, com
   a Pulsar recebendo um webhook só. Não foi fechado na reunião.
2. **"A gente lê junto".** O material fala em primeira pessoa, como se a Dani
   conduzisse a sessão; a documentação descreve o Closer conduzindo. O texto da
   última tela do formulário está neutro (*"quem conduz a sua sessão"*) para não
   prometer a presença dela, mas o áudio e os 4 PDFs ainda prometem.
3. **CORS no n8n.** Os dois webhooks precisam liberar o domínio das páginas, e
   aceitar `application/json` e `text/plain` (o fallback do beacon). Enquanto
   não estiver liberado, o envio falha silenciosamente para o lead — o painel de
   demonstração é onde isso aparece.
4. **3 ou 5 minutos.** A abertura da Etapa 2 diz "menos de 5 minutos"; áudio e
   PDFs ainda dizem 3.
