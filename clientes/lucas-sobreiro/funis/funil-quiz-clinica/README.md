# Funil de Quiz · Lucas Sobreiro (clínicas / saúde)

Funil de diagnóstico (quiz → página de aplicação) para donos de clínica e
profissionais da saúde. Gera lead qualificado antes da Sessão Estratégica.

**Estrutura:** espelhada no funil validado da Pâmella Mello (o que vem tendo bom
resultado). **Copy e identidade:** do Lucas (estratégia aprovada em
`../../estrategia/2026-07-20-estrategia.md`; identidade Método BIO: creme +
espresso + vinho terracota, serifa editorial, wordmark "MÉTODO BIO").

## O que é

- **`index.html`** + `flow.js` + `app.js`: o quiz. Hero + 9 passos SPIN
  (situação, problema, tempo, impacto, o que tentou, objetivo, área,
  faturamento, prontidão) + captura (nome, WhatsApp, e-mail). Barra de
  progresso, auto-avanço, "continuar de onde parou", tela de loading (~5s).
- **`diagnostico.html`** + `diagnostico.js`: a página de aplicação. Monta o
  diagnóstico personalizado a partir das respostas (espelho do cenário →
  reframe do gargalo comercial → dois caminhos → método em 3 pilares → sessão
  estratégica → depoimentos → CTA). O CTA adapta por qualificação:
  - **Qualificado** (faturamento 30k+ e pronto para investir): "Quero agendar
    minha Sessão Estratégica".
  - **Nutrir** (faturamento até 30k ou só pesquisando): "Quero entender melhor
    o próximo passo" (caminho de menor compromisso / produto de entrada).
- **`depoimentos/`**: prints reais dos clientes do Lucas (baixados do Drive,
  convertidos para `.webp` 520px para carregar leve). O
  `01-paula-xavier-dentista` é o case-estrela da saúde.
- Toda a copy do quiz e do relatório vive em `flow.js` e `diagnostico.js`.

## Como rodar local

Servidor estático (não abra via `file://`, o sessionStorage entre páginas
funciona melhor por http). Ex.:

```
cd clientes/lucas-sobreiro/funis/funil-quiz-clinica
python3 -m http.server 8000
# abra http://localhost:8000
```

## Status

- [x] **WhatsApp do Lucas** em `flow.js` (`marca.whatsapp` = `5551981115195`).
- [x] **Cenário do Make** (webhook instant → Google Sheets) criado e **testado
      ponta a ponta** (23/07/2026, 2 leads gravados). URL já em `app.js`
      (`LEADS_ENDPOINT`). Detalhes na seção Integração abaixo.
- [x] **Deploy (Vercel):** no ar em https://quiz-lucas-sobreiro.vercel.app
      (produção, team `simpleacc`). Ver seção Deploy.
- [x] **Meta Pixel do Lucas** (`1096905346357097`) instalado no `<head>` das duas
      páginas, com o traqueamento completo montado para o objetivo **Leads**.
      Ver seção Traqueamento abaixo.
- [ ] (Opcional) Logo do Lucas: trocar `.brand-name`/`.brand-tag` por
      `<img class="logo-img">` quando houver arquivo do brandbook oficial.

## Traqueamento (Meta Pixel · objetivo Leads)

**Pixel:** `1096905346357097`. Instalado no `<head>` do `index.html` e do
`diagnostico.html`. O `PageView` sai do snippet base; todo o resto sai do
código do funil (`app.js` e `diagnostico.js`).

### Regra que manda em tudo

**Só é lead quem preencheu nome, e-mail e WhatsApp, passou na validação e
clicou em enviar.** O evento `Lead` dispara nesse instante, dentro do
`app.js`. Quem abandona no meio do quiz, quem erra o telefone, quem chega no
formulário e não envia: não gera `Lead`. É esse evento que a campanha otimiza.

### Mapa de eventos

| Momento | Evento no Meta | Tipo | Onde |
|---|---|---|---|
| Abriu a página | `PageView` | padrão | snippet, as duas páginas |
| Escolheu a primeira resposta | `InitiateCheckout` | padrão | `app.js` |
| Avançou uma etapa (1 a 9) | `QuizStep` | custom | `app.js` |
| Terminou o quiz e viu o formulário | `QuizCaptura` | custom | `app.js` |
| **Enviou o formulário válido** | **`Lead`** | **padrão** | **`app.js`** |
| O diagnóstico apareceu na tela | `ViewContent` | padrão | `diagnostico.js` |
| Clicou em qualquer CTA de WhatsApp | `Contact` | padrão | `diagnostico.js` |

Eventos internos que **não** vão pro Pixel de propósito (`page_view`,
`step_view`, `step_back`, `field_error`, `funnel_abandon`): ficam só no
console. Evento demais no Pixel polui o aprendizado da campanha.

### Para quem vai configurar a campanha (Renan)

- **Objetivo:** Leads. **Evento de otimização e de conversão:** `Lead`.
- **Não** otimizar por `QuizCaptura` nem por `ViewContent`. Eles existem para
  medir queda e montar público, não para a campanha perseguir.
- **Públicos de remarketing prontos** (todos por evento do Pixel):
  - `QuizStep` sem `Lead` → começou e largou no meio.
  - `QuizCaptura` sem `Lead` → chegou no formulário e não enviou (o mais quente).
  - `Lead` sem `Contact` → virou lead e não chamou no WhatsApp.
  - `Lead` → base de lookalike (é a semente boa, usar essa).
- **Segmentação por qualidade do lead:** todo evento leva o parâmetro
  `lead_qualificacao` (`qualificado` ou `nutrir`, mesma régua do diagnóstico) e
  o `Lead` leva também `faturamento`, `prontidao` e `perfil`. Dá para montar
  conversão customizada só de `Lead` + `lead_qualificacao = qualificado` e
  fazer lookalike só dos bons.
- As UTMs da URL viajam junto no `Lead` (`utm_source`, `utm_medium`,
  `utm_campaign`, `utm_content`, `utm_term`) e também na planilha.

### Detalhes técnicos

- **Advanced matching manual:** antes do `Lead`, o `app.js` reenvia o `fbq('init')`
  com e-mail, telefone (E.164, `55` + DDD + número), primeiro e último nome e
  país. O hash SHA-256 é feito pelo próprio `fbevents.js` no navegador: nada sai
  em texto puro. Isso sobe a qualidade da correspondência, que é o que faz a
  otimização para Leads funcionar melhor.
- **Nenhum dado pessoal vai como parâmetro de evento** (política do Meta). PII
  entra só pelo advanced matching acima.
- **`eventID` por envio:** o `Lead` já sai com um ID único. Se um dia entrar a
  API de Conversões (CAPI) junto do Pixel, é só mandar o mesmo `eventID` do
  lado do servidor que o Meta deduplica e conta um lead só.
- **Disparo único:** o `Lead` é travado por um flag no `sessionStorage`. Submit
  duplicado, refresh ou voltar não geram lead repetido.
- **Testado em Chromium headless** (02/09/2026): funil completo → `InitiateCheckout`,
  9x `QuizStep`, `QuizCaptura`, `init` com advanced matching e 1x `Lead`.
  Submit vazio e submit com telefone/e-mail inválidos: **nenhum** `Lead`.
  Submit duplicado: **1** `Lead`. Diagnóstico aberto direto, sem respostas:
  **nenhum** evento.

## Integração de leads (Make → Google Sheets)

- **Cenário Make:** `[Lucas Sobreiro] Funil Clínica → Sheets` (ID `5747069`),
  team `Time Simple Acc`. Webhook instant → `google-sheets:addRow`.
- **Webhook:** `https://hook.us2.make.com/xiiny36asyfrjgrxfc2el43v6nuciu1l`
  (já em `app.js` → `LEADS_ENDPOINT`).
- **Planilha:** ID `1ugcf959c8-g-PvWXybRIqP2ROtArb5YkkHk1mnI0opE`, aba `Untitled`,
  colunas A-T: Nome, Email, WhatsApp, Data, q1..q9 (Situação → Prontidão),
  Qualificação, utm_source/medium/campaign/content/term, Origem.
- O `app.js` manda `application/json` com `keepalive` (sobrevive ao redirect pro
  diagnóstico). Duas linhas de teste foram gravadas na validação: **apagar as
  duas linhas `TESTE Claude` antes de mandar tráfego.**

## Deploy (Vercel)

Projeto estático (framework "Other"), padrão dos demais funis: deploy direto da
pasta, sem git connect. Precisa do token Vercel da conta Simple Acc (nunca
commitar o token).

- **Produção (no ar):** https://quiz-lucas-sobreiro.vercel.app
- **Projeto Vercel:** `quiz-lucas-sobreiro` (team `simpleacc`)
- **Anúncio aponta para a raiz** com `?utm_source=...&utm_medium=...&utm_campaign=...`

**Redeploy** (logo, WhatsApp, Pixel, etc.), mantendo a mesma URL:
```
cd clientes/lucas-sobreiro/funis/funil-quiz-clinica
# uma vez por máquina: liga a pasta ao projeto existente
vercel link --yes --project quiz-lucas-sobreiro --scope simpleacc
# a cada deploy:
vercel deploy --prod --yes --scope simpleacc
```
Sem o `vercel link`, o deploy da pasta cria um projeto novo (`funil-quiz-clinica`);
por isso o deploy é feito a partir de uma cópia nomeada
`quiz-lucas-sobreiro/` para dar o domínio limpo.

## Identidade

Método BIO (Lucas Sobreiro): creme `#F1ECE4` + espresso `#2A2420` + vinho
terracota `#8C3B34`, serifa editorial, wordmark "MÉTODO BIO". Paleta provisória a
partir do Instagram; ajustar ao brandbook oficial quando chegar.
