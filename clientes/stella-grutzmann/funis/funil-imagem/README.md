# Funil de Quiz — Stella Grützmann (Consultoria de Imagem)

Funil visual autocontido (HTML/CSS/JS puro, sem build). Quiz de 8 perguntas
(SPIN) → captura → página de leitura personalizada (diagnóstico) com Baixar PDF
e CTA de WhatsApp para a avaliação estratégica.

Copy da estratégia aprovada (`../../estrategia/Estrategia_Stella_Grutzmann.pdf`).
Identidade extraída do site dela (mogno `#401F18` + taupe `#A98F73` sobre marfim
`#F5F0EA`). Sem travessão.

## Arquivos
- `index.html` / `app.js` / `flow.js` — quiz (copy no `flow.js`, motor no `app.js`)
- `diagnostico.html` / `diagnostico.js` — relatório personalizado + PDF + WhatsApp
- `styles.css` — tema (bloco `:root` "PALETA — TROQUE AQUI") + layout
- `integracao-planilha.gs` — Apps Script da planilha de leads

## Rodar local
```
python3 -m http.server 8099
# abrir http://localhost:8099/index.html?utm_source=teste
```
Testado ponta a ponta (Playwright): 1ª pergunta na 1ª tela, auto-avanço, máscara
de WhatsApp, e-mail obrigatório, captura de UTMs, diagnóstico preenchido, PDF.
Console limpo (só o 404 do favicon, inofensivo).

## Pendências (precisa da cliente / Simple) antes de publicar
- [ ] **WhatsApp da Stella** — hoje é placeholder `5500000000000` em `flow.js` (`marca.whatsapp`).
- [ ] **Logo** (PNG transparente ou SVG) — hoje usa wordmark serifado provisório.
- [ ] **Depoimentos reais** (prints/vídeos) — hoje `[DEPOIMENTO 1/2]` no `diagnostico.js`.
- [ ] **Deploy na Vercel** (conta/time da Simple) — CLI não disponível neste ambiente.
- [ ] **Planilha de leads** no Drive da Stella + colar a URL `/exec` em `app.js` (`LEADS_ENDPOINT`) e testar.
- [ ] (Opcional) IDs de GA4 / Meta Pixel em `app.js` (`TRACKING_CONFIG`).

## Anúncio
Apontar para a **raiz com query** (`/?utm_source=...&utm_campaign=...`), nunca
`/index.html` (o servidor limpa a URL e derruba os UTMs).
