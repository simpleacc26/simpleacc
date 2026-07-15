# Funil de Hipnose — Pâmella Mello

Quiz de qualificação + página de diagnóstico (relatório personalizado) para a
Clínica Pâmella Mello (hipnoterapia clínica + neurociência). Site estático,
sem framework, sem build (`index.html` já é o entregável).

## O que é cada arquivo

- `index.html` — landing + quiz (SPA simples: as telas são renderizadas dentro de `#app`).
- `flow.js` — toda a copy do quiz e do relatório (perguntas, opções, textos). Para editar
  perguntas/textos, mexa **só** neste arquivo.
- `app.js` — motor do quiz: render, validação, persistência (sessionStorage), tracking,
  envio do lead pro webhook do Make.
- `diagnostico.html` — página do relatório/diagnóstico pós-quiz.
- `diagnostico.js` — monta o relatório a partir das respostas salvas e trata o clique no
  CTA de WhatsApp.
- `styles.css` — identidade visual (dourado/champagne + espresso). Paleta provisória até
  receber o brand kit/logo oficiais da cliente.
- `depoimentos/01.jpeg`…`08.jpeg` — prints de avaliações reais usados como prova social
  no relatório.

## Tracking instalado

- **Meta Pixel:** `328694529132563` (em `index.html`, `diagnostico.html` e disparando
  eventos customizados via `app.js`/`diagnostico.js`: `InitiateCheckout`, `Lead`, `Contact`).
- **Google Tag Manager:** `GTM-PWQS84LW` (código head + noscript body em `index.html` e
  `diagnostico.html`).
- **Leads:** enviados via webhook do Make (`LEADS_ENDPOINT` em `app.js`) para a planilha
  "Planilha de Leads - Pâmella Mello (Funil Hipnose)" no Drive da cliente.

## Deploy

- **Vercel project:** `funil-pamella-mello` (team `simpleacc`, `prj_u5Vm6BXBgI70yZuDtYhpR59wJYMP`).
- **Domínios:** `funil-pamella-mello.vercel.app` e `quiz.pamellamellohipnoterapia.com.br`
  (CNAME já apontado pela cliente, domínio adicionado e verificado no projeto).
- **⚠️ Projeto NÃO está conectado a um repositório Git na Vercel** — foi criado por deploy
  direto via CLI/API. Isso significa que a Vercel **não redeploya sozinha** quando este
  código muda aqui no monorepo. Depois de editar qualquer arquivo desta pasta, é preciso
  reimplantar manualmente (upload de arquivos via API/CLI do Vercel apontando pro projeto
  acima). Considerar conectar o projeto a este repo (com Root Directory apontando pra esta
  pasta) para eliminar esse passo manual.
- Servido "flat" na raiz do domínio (sem prefixo de pasta) — os caminhos dos arquivos no
  deploy devem espelhar exatamente os nomes acima (ex.: `index.html`, não `src/index.html`).
