# Diagnóstico do Ciclo · Mulher que Escolhe (Thiago Vitório)

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
3. **O bloco de autoridade não tem grade de credenciais.** A primeira versão
   trazia uma grade de números (5 elos, 4 etapas, 60 min) e o Daniel derrubou:
   ali é para apresentar o Thiago brevemente, não para repetir método e etapas,
   que já aparecem no bloco anterior. O bloco agora é foto, nome, o que ele faz e
   uma fala dele, tirados das páginas atuais (thiagorvitorio.com.br e o
   Diagnóstico da Autossabotagem). Nada de claim que não esteja escrito lá.
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
- `styles.css`: identidade do Thiago (preto quente + dourado champanhe).
- `thiago.webp`: foto dele, no bloco de autoridade da página pós-quiz.
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
9. quem é o Thiago (foto, quem ele é e por que ouvir ele)
10. **CTA 3**, adaptado à qualificação

## No ar

**https://quiz-thiagovitorio.vercel.app**

Produção, no time da Simple na Vercel (`team_bD5dst9eSAc4qVaaynXWifXr`), projeto
`quiz-thiagovitorio`. Os 9 assets conferidos em 200 depois do deploy, e o
`thiago.webp` conferido por sha256 (o base64 chegou íntegro).

⚠️ O projeto antigo `quiz-thaina-thiago` foi aposentado (o nome do projeto vira a
URL e não dá para renomear, então trocar de domínio exige projeto novo). Ele
ainda responde: **remover pelo painel da Vercel** para ninguém divulgar o link
errado. O alias com sufixo `-simpleacc` fica atrás do SSO do time e responde 302,
então o link público é sempre o curto. Rodar tráfego apontando para a **raiz com
query** (`/?utm_source=...&utm_campaign=...`), nunca para `/index.html`.

## Identidade visual

Tirada das páginas atuais do Thiago (thiagorvitorio.com.br, o Kit SOS
Antimigalhas e o Diagnóstico da Autossabotagem): **preto quente `#0C0A09` +
dourado champanhe `#E8C77E`**, serifada de display nos títulos, botão dourado
cheio com texto escuro. Os tokens ficam todos no `:root` do `styles.css`.

Decisões de layout pedidas pelo Daniel em 12/08:
- **Só a barra de progresso**, sem número nenhum: nem contador "Pergunta X de N"
  nem percentual. Número ali faz o quiz parecer longo e medido.
- **Sem rodapé** nas duas páginas.
- Topo com o nome completo: **"com Thiago Vitório"**.
- **Foto do Thiago** (`thiago.webp`, 224px, exibida a 104px) no bloco de
  autoridade da página pós-quiz.

## Planilha de leads (Make → Sheets, ligado e testado)

- **Planilha**: [Planilha de Leads - Thaina e Thiago (Diagnóstico do Ciclo) - Simple Acc](https://docs.google.com/spreadsheets/d/1aAl3LvOLWJVAmC64IhvbA4B3reiHTPoi5d2sYWsJap4/edit),
  pasta "3. Estratégia e Tráfego" do Drive do cliente.
  ID `1aAl3LvOLWJVAmC64IhvbA4B3reiHTPoi5d2sYWsJap4`, aba **`Untitled`**, 22 colunas.
- **Cenário Make**: "[Thaina e Thiago] Diagnóstico do Ciclo → Sheets"
  (id 5917422, time Simple Acc), trigger webhook instantâneo, ativo.
- **Endpoint** em `app.js → LEADS_ENDPOINT`.
- **Testado**: dois leads de teste caíram na planilha com as 22 colunas e as
  UTMs, com a data em horário de Brasília. Apagar essas duas linhas antes de
  subir tráfego.

⚠️ O POST precisa ir com `Content-Type: application/json`. Com `text/plain` o
webhook do Make não parseia o corpo e a linha cai vazia, sem erro nenhum. O
webhook devolve `access-control-allow-origin: *` (conferido com o Origin do
funil), então o envio do navegador passa.

⚠️ A aba se chama **`Untitled`** porque a planilha nasceu de um CSV. O `addRow`
referencia a aba pelo NOME: se alguém renomear, o módulo quebra com
`400 Unable to parse range` e o Make desativa o cenário.

O `integracao-planilha.gs` fica no repo como plano B (caso um dia se queira sair
do Make e usar Apps Script direto na planilha).

O **WhatsApp de atendimento** é o `+55 11 94514-8716` (`flow.js → marca.whatsapp`).
A trava continua no código: se o número um dia sair ou voltar a ter "X", os CTAs
param de abrir o WhatsApp e a página mostra um aviso no topo, de propósito.

## Pendências

1. **Republicar a partir desta pasta**: os deploys até aqui foram feitos pelo MCP
   da Vercel, com os arquivos colados sem os blocos de comentário (a lógica e o
   texto do funil são idênticos ao repo). No próximo deploy, publicar a pasta
   direto pelo `vercel` CLI para produção e repo ficarem iguais byte a byte.
2. **Apagar as 2 linhas de teste** da planilha antes de subir tráfego.
3. **Logo oficial**: hoje usa o emblema de ciclo aberto em SVG + marca em texto.
   Quando vier o arquivo, colocar `logo.png` e ativar `<img class="logo-img">`.
5. **Remover o projeto antigo** `quiz-thaina-thiago` no painel da Vercel.
6. **Depoimentos**: quando os primeiros prints chegarem (ver
   `estrategia/2026-07-21-guia-captacao-depoimentos.pdf`), converter para WebP
   ~520px e somar uma `.depo-gallery` antes do bloco de autoridade (CSS pronto).
7. **Pixel da Meta e GA4**: preencher `app.js → TRACKING_CONFIG`.

## Deploy

Publicar **apenas esta pasta** na Vercel da Simple (mesmo padrão do funil do
Felipe). Rodar tráfego com `?utm_source=...&utm_campaign=...` na URL para as
UTMs caírem na planilha.
