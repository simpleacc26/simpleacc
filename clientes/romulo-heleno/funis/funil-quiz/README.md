# Funil de Quiz — Mentoria Cabelo de Segunda (Rômulo Heleno)

Funil de quiz + página de diagnóstico + WhatsApp, HTML/CSS/JS puro (sem build,
sem dependência externa). Gerado pela skill `gerar-quiz-diag-pag-pos-quiz` a
partir da copy aprovada em `clientes/romulo-heleno/estrategia/`.

## Arquivos
- `index.html` / `app.js` / `flow.js` — o quiz (10 perguntas SPIN, auto-avanço, máscara de WhatsApp, UTMs).
- `diagnostico.html` / `diagnostico.js` — relatório personalizado + Baixar PDF + WhatsApp.
- `styles.css` — identidade visual (navy + dourado sobre marfim). Tokens no `:root`.
- `integracao-planilha.gs` — Apps Script da planilha de leads.

## Rodar local
`python3 -m http.server 8000` e abrir `http://localhost:8000/?utm_source=teste`

## Identidade
Navy #14233D + dourado #B98A3E sobre marfim #F5F1EA, serifada de sistema nos
títulos. Mesma linguagem dos documentos de estratégia/checkpoint do cliente.
Tokenizada no `:root` do `styles.css` para troca fácil quando chegar logo/hex oficial.

## Status
- [x] WhatsApp do Rômulo em `flow.js` (5551997990520 — confirmar com o cliente).
- [x] Deploy na Vercel (time Simpleacc): https://romulo-heleno.vercel.app (público).
- [x] Planilha de leads no Drive: "Leads · Funil de Quiz · Mentoria Cabelo de Segunda".
- [ ] Publicar o Apps Script como web app (passo manual do Google) e ligar `LEADS_ENDPOINT` no `app.js` + testar.
- [ ] Logo oficial (o cliente não tem no Instagram; seguimos com o wordmark).
- [ ] Depoimentos reais no lugar dos `[DEPOIMENTO]`.

## Redeploy
Projeto Vercel já religado (`.vercel/`). Para atualizar:
`vercel deploy . --prod --yes --scope simpleacc --token <TOKEN>` (a URL atualiza sozinha).
