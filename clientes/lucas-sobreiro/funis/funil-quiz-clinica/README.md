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
- [ ] **Meta Pixel do Lucas** (fora do escopo desta entrega, a pedido do cliente):
      descomentar o bloco no `<head>` do `index.html` e do `diagnostico.html` e
      preencher o ID quando o Lucas enviar.
- [ ] (Opcional) Logo do Lucas: trocar `.brand-name`/`.brand-tag` por
      `<img class="logo-img">` quando houver arquivo do brandbook oficial.

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
