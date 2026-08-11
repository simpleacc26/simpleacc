# Diagnóstico do Ciclo · Mulher que Escolhe (Thiago)

Funil de quiz do produto de relacionamento do Thiago (cliente Thaina Elvira).
Transforma a copy aprovada (`clientes/thaina-elvira/estrategia/2026-08-04-estrategia-thaina-elvira.pdf`)
em páginas no ar: quiz de 9 perguntas → captura → tela de carregamento →
página pós-quiz personalizada que nomeia o padrão dela → CTAs de WhatsApp
distribuídos.

Stack: HTML/CSS/JS puro, sem build, sem dependências. Construído seguindo o
**blueprint canônico da casa**, em
`.claude/skills/gerar-quiz-diag-pag-pos-quiz/references/estrutura-invisivel.md`
(linhagem Pâmella Mello → Lucas Sobreiro → Felipe Damasceno).

## Conformidade com o blueprint

| Item do blueprint | Aqui |
| ----------------- | ---- |
| 1ª pergunta na 1ª tela, sem tela de "Começar" | ✅ |
| Sem título/rótulo de etapa repetido da tela 2 em diante | ✅ (`etapa` só existe no `flow.js`, nunca renderiza) |
| Auto-avanço + Voltar + barra de progresso | ✅ |
| 9 passos SPIN com as 2 porteiras no fim | ✅ (porteiras: **perfil** e **prontidão**) |
| Prontidão sem ancorar em "mais barato" | ✅ (enquadrada como momento) |
| Índice com nome próprio | ✅ **ICM, Índice do Ciclo da Migalha** |
| Tela de carregamento, 3 mensagens, ~4,7s | ✅ |
| Relatório na ordem do blueprint | ✅ (com 2 blocos a mais, ver desvios) |
| Espelho costurando os campos `report` | ✅ (testado em várias combinações) |
| Mínimo 3 CTAs distribuídos | ✅ |
| CTA final adaptado, ninguém leva porta na cara | ✅ (3 saídas) |
| Bloco de autoridade completo | ✅ (ver ressalva nos desvios) |
| Depoimentos | ❌ ainda não existem prints reais (o blueprint permite subir assim) |
| Sem travessão, sem emoji | ✅ |
| `application/json` no envio do lead | ✅ |
| Hover isolado em `@media (hover: hover)` | ✅ |
| `noindex` + favicon + zero dependência | ✅ |

### Desvios conscientes (e por quê)

1. **O relatório tem 11 blocos, não 9.** Os 9 do blueprint estão todos lá, na
   ordem. Entraram mais dois que vieram da estratégia aprovada pela cliente:
   "para quem é e para quem não é" e o FAQ. Os dois ficam depois do segundo CTA
   e antes da autoridade, que é o último bloco antes do fechamento, como manda
   o blueprint.
2. **As porteiras são perfil e prontidão, não faturamento e prontidão.** O ICP
   deste produto é definido por momento de vida, não por renda. A regra de
   corte é o cruzamento perfil x situação da estratégia.
3. **A grade de credenciais traz fatos do método, não credenciais pessoais.**
   O Thiago ainda não tem histórico público nesta área (dito na call de 04/08:
   *"ele não tem tanto histórico nessa área"*). Pela regra do blueprint, só vira
   claim o que está escrito no material, então a grade usa os quatro números que
   existem na estratégia aprovada. **Quando ele mandar credenciais reais,
   troque.** Marcado com comentário no `diagnostico.js`.
4. **O ICM vai de 27% a 100% e sai "Alto" em ~77% das combinações.** O quiz não
   tem alternativa de "está tudo bem", porque quem clica no anúncio já está no
   ciclo. Os cortes do blueprint (≥66 Alto, 33 a 65 Médio) foram mantidos, e
   "Baixo" é praticamente inalcançável de propósito.

## ⚠️ A regra que define este funil

**A página pós-quiz não vende. Ela sobe o nível de consciência e leva ao WhatsApp.**
Sem preço, sem checkout, sem pré-agendamento pago. A venda da Sessão Mapa do
Ciclo (R$ 1.000) acontece na conversa. Decisão da call de 04/08 com a Thaina.
Se alguém pedir para colocar o preço na página, é mudança de estratégia, não
ajuste de copy.

## Arquivos

- `index.html`: quiz (uma pergunta por tela, sem título repetido em cima, auto-avanço, barra de progresso).
- `diagnostico.html` + `diagnostico.js`: página pós-quiz (nomeia o padrão, aponta o elo dominante, 3 CTAs de WhatsApp).
- `flow.js`: **toda a copy** (config, marca, hero, 9 perguntas com pesos, captura). Editar aqui.
- `styles.css`: identidade (tema dark vinho + rosé, proposto).
- `app.js`: motor do funil (render, validação, tela de loading, UTMs, sessionStorage, POST dos leads).
- `integracao-planilha.gs`: Google Apps Script da planilha de leads (plano B do Make).

## Estrutura do quiz (9 passos, ordem SPIN)

situação → **gatilho (elo 1)** → **reação (elo 2)** → há quanto tempo →
implicação → o que já tentou → objetivo → **perfil** (qualificação de ICP) →
**prontidão** (qualificação de intenção). As duas últimas ficam no fim, como no
quiz da Pâmella.

São as 8 perguntas da estratégia aprovada mais o passo "há quanto tempo esse
padrão se repete", incluído no padrão do funil do Felipe: enriquece a leitura do
relatório e não entra em nenhum cálculo.

Cada pergunta alimenta um elo do Mapa do Ciclo, então o quiz é ao mesmo tempo
captação e **pré-work da sessão**: o Thiago abre a conversa já sabendo o caso.

## Como o padrão é nomeado

O nome vem da resposta de **reação** (elo 2), que é onde o ciclo dela se
sustenta:

| Resposta | Padrão |
| -------- | ------ |
| Fico olhando o celular esperando resposta | **Ciclo da Espera** |
| Mando uma mensagem longa explicando como me sinto | **Ciclo da Explicação** |
| Cobro, discuto e depois me arrependo | **Ciclo da Cobrança** |
| Finjo indiferença e espero que ele venha atrás | **Ciclo do Afastamento** |

O nome aparece no selo do topo, no corpo do texto e **na mensagem
pré-preenchida do WhatsApp**, então o atendimento já começa sabendo o resultado.

## O ICM, Índice do Ciclo da Migalha

O índice nomeado deste funil (o equivalente ao IDE do Felipe). Sai dos pesos
(0 a 3) das cinco perguntas de diagnóstico: situação, gatilho, reação,
implicação e tentativas. Tempo, objetivo e as duas porteiras não pontuam.

```
ICM% = soma dos pesos / 15      ·      ≥66% Alto · 33 a 65% Médio · <33% Baixo
```

Amplitude real: **27% a 100%** (1.024 combinações possíveis). O ICM descreve
**o ciclo**, nunca a pessoa, que é a régua de compliance deste nicho: por isso
ele nunca aparece como um atributo dela.

## Qualificação e CTA adaptado

`classificarLead()` roteia o lead em quatro faixas (a coluna "Classificação" da
planilha), e a página troca o CTA final:

- **fora**: casada ou em relação fixa **sem** indicar falta de valorização. CTA vira conteúdo primeiro. (regra de cruzamento P7 x P1 da estratégia)
- **nutrir**: "não neste momento, quero só entender melhor" → CTA "entender melhor como funciona".
- **fila-quente**: prontidão a ou b → prioridade máxima de atendimento.
- **qualificado**: "só dependendo do valor" → atender normalmente, com o 12x já na conversa.

fila-quente e qualificado veem o mesmo CTA na página (a diferença é só na fila
do atendimento, porque a página não fala de preço).

## Estrutura da página pós-quiz

Cabeçalho com o padrão nomeado e o selo do ICM, e depois:

1. antes de tudo (acolhe e tira a culpa)
2. o seu resultado (espelho: padrão nomeado + gatilho + reação)
3. o que isso já custou (personalizado com situação, tempo e implicação)
4. você viu um elo, o seu ciclo tem cinco, com os elos dela preenchidos, mais os dois caminhos lado a lado → **CTA 1**
5. por que o que você tentou não funcionou (reframe, personalizado com as tentativas)
6. o método e o que acontece na sessão (fecha devolvendo o objetivo dela) → **CTA 2**
7. para quem é e para quem não é
8. perguntas que sempre aparecem (FAQ em acordeão)
9. quem é o Thiago (autoridade + grade)
10. **CTA 3**, adaptado à qualificação

## Planilha de leads (por Apps Script, não por Make)

A planilha já existe, com as 22 colunas certas:
**[Planilha de Leads - Thaina e Thiago (Diagnóstico do Ciclo) - Simple Acc](https://docs.google.com/spreadsheets/d/1aAl3LvOLWJVAmC64IhvbA4B3reiHTPoi5d2sYWsJap4/edit)**
(pasta "3. Estratégia e Tráfego" do Drive do cliente).

A integração vai por **Google Apps Script**, e não por cenário no Make, porque é
gratuita e não consome operação do plano (o plano do time é Core, 10.000
operações/mês). Decisão do Daniel em 11/08. Bônus: o Apps Script grava pela
primeira aba (`getSheets()[0]`), então a armadilha do nome de aba "Untitled"
que quebra o `addRow` do Make não existe aqui.

Para ligar (o passo de autorização do Google é do dono da conta, 2 minutos):

1. Abra a planilha → **Extensões → Apps Script**
2. Apague o conteúdo, cole todo o `integracao-planilha.gs` e salve
3. **Implantar → Nova implantação → App da Web**, executar como *Eu*, acesso
   *Qualquer pessoa* → Implantar → Autorizar
4. Copie a URL que termina em `/exec` e me mande: eu colo em
   `app.js → LEADS_ENDPOINT` e rodo o lead de teste de ponta a ponta

Só considere pronto depois que uma linha de teste cair na planilha, com as UTMs.
Valide **lendo a planilha**, nunca o status HTTP.

## Pendências para publicar

1. **WhatsApp de atendimento** (bloqueante): preencher `flow.js → marca.whatsapp`
   com o número em formato internacional, só dígitos. Enquanto tiver "X", os
   CTAs não abrem o WhatsApp e a página mostra um aviso de configuração no topo.
2. **URL do Apps Script** (bloqueante): ver a seção acima.
3. **Deploy na Vercel**: publicar só esta pasta, no time da Simple (nunca conta
   pessoal), com o nome de projeto `quiz-thaina-thiago` (o nome vira a URL e não
   dá para renomear depois). Conferir todos os assets com `curl` depois do
   deploy: publicação substitui a árvore inteira e arquivo faltando vira 404 mudo.
4. **Logo oficial**: hoje usa o emblema de ciclo aberto em SVG + marca em texto.
   Quando vier o arquivo, colocar `logo.png` e ativar `<img class="logo-img">`.
5. **Foto do Thiago**: hoje o bloco de autoridade usa a inicial. Quando vier a
   foto, trocar `.autor-ini` por `<img class="autor-foto" src="thiago.webp">`
   (a classe já existe no CSS).
6. **Credenciais reais do Thiago**: trocar a grade de 4 itens por credenciais
   escritas por ele. Só entra o que estiver escrito, nunca objeto de cena.
7. **Depoimentos**: quando os primeiros prints chegarem (ver
   `estrategia/2026-07-21-guia-captacao-depoimentos.pdf`), converter para WebP
   ~520px e somar uma `.depo-gallery` antes do bloco de autoridade (CSS pronto).
8. **Pixel da Meta e GA4**: preencher `app.js → TRACKING_CONFIG`.

## Deploy

Publicar **apenas esta pasta** na Vercel da Simple (mesmo padrão do funil do
Felipe). Rodar tráfego com `?utm_source=...&utm_campaign=...` na URL para as
UTMs caírem na planilha.
