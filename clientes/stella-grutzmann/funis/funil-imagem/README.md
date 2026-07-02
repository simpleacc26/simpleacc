# Funil de Quiz — Stella Grützmann (Consultoria de Imagem)

Funil visual autocontido (HTML/CSS/JS puro, sem build). Construído a partir do
template padrão da casa (`.claude/skills/criar-funil-quiz/template/`), com a copy
da estratégia aprovada e a identidade real da Stella.

Fluxo: quiz de 8 perguntas (SPIN) → captura → **tela de loading (~5s)** →
página de leitura personalizada (diagnóstico) com **CTAs distribuídos** de
WhatsApp para a avaliação estratégica.

## Padrões da casa já aplicados
- Tela de loading ~5s após o submit (dá cara de "feito pra mim" e tempo do lead cair na planilha).
- CTAs distribuídos no diagnóstico (2 no meio + bloco final, classe `.cta-wpp`), sem botão no topo.
- Envio de lead robusto: `fetch` cors + `application/json` + `keepalive` (formato do webhook do Make).
- Data em horário de Brasília (`DD/MM/AAAA HH:MM:SS`).
- Qualificação por intenção (flag `nutrir`), e-mail obrigatório, favicon próprio, sem travessões, a11y, auto-avanço.

## Identidade
Extraída do site stellagrutzmann.com: mogno `#401F18` + mocha/taupe `#8A6E52`
sobre marfim `#F5F0EA`, serifa de sistema. Tokens no `:root` do `styles.css`.

## Arquivos
- `index.html` / `app.js` / `flow.js` — quiz (copy no `flow.js`, motor no `app.js`)
- `diagnostico.html` / `diagnostico.js` — relatório + CTAs distribuídos
- `styles.css` — tema + layout
- `favicon.svg` + `favicon-16/32.png` + `apple-touch-icon.png`
- `depoimentos/` — prints reais entram aqui (01.jpeg, 02.jpeg...)
- `DEPLOY.md` — deploy (Vercel e alternativas)

## Rodar local
```
python3 -m http.server 8099
# abrir http://localhost:8099/index.html?utm_source=teste
```
Testado ponta a ponta (Playwright): 8 perguntas, auto-avanço, máscara de
WhatsApp, e-mail obrigatório, UTMs, loading ~5s, auto-redirect, diagnóstico
preenchido, 3 CTAs distribuídos. Console limpo.

## Pendências antes de publicar (precisa da cliente / Simple)
- [ ] **WhatsApp da Stella** — placeholder `5500000000000` em `flow.js` (`marca.whatsapp`).
- [ ] **Logo** (PNG/SVG) — hoje wordmark serifado provisório.
- [ ] **Depoimentos reais** — `[DEPOIMENTO 1/2]` em `diagnostico.js`; prints em `depoimentos/`.
- [ ] **Integração de leads (Make → Sheets):** criar a planilha, montar o cenário webhook→addRow e colar a URL do webhook em `app.js` (`LEADS_ENDPOINT`). Testar um lead caindo na planilha.
- [ ] **Deploy na Vercel** (conta/time da Simple) — ver `DEPLOY.md`.
- [ ] (Opcional) GA4/Meta Pixel em `app.js` (`TRACKING_CONFIG`).

## Anúncio
Apontar para a **raiz com query** (`/?utm_source=...&utm_campaign=...`), nunca
`/index.html`.
