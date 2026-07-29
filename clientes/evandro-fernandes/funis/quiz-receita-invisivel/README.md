# Funil · Diagnóstico de Receita Invisível · Evandro Fernandes

Quiz de aplicação + página pós-quiz (diagnóstico) do Evandro Fernandes (HDM),
gerado pela skill `gerar-quiz-diag-pag-pos-quiz` a partir da Estratégia Completa
aprovada (`../../estrategia/2026-07-22-estrategia-completa-evandro-fernandes.*`).

Stack: HTML/CSS/JS puro, sem dependências, sem build. Mobile-first.

## Arquivos
- `index.html` · quiz (1ª pergunta já na 1ª tela, auto-avanço)
- `flow.js` · toda a copy do quiz (marca, hero, 7 perguntas SPIN, captura)
- `app.js` · motor (render, validação, máscara, UTMs, sessionStorage, envio do lead)
- `styles.css` · identidade (tokens no `:root`)
- `diagnostico.html` + `diagnostico.js` · relatório auto-preenchido + Baixar PDF + WhatsApp
- `integracao-planilha.gs` · Apps Script da planilha de leads

## Como rodar local
```
cd clientes/evandro-fernandes/funis/quiz-receita-invisivel
python3 -m http.server 8099
# abra http://localhost:8099/index.html?utm_source=teste
```

## PENDÊNCIAS antes de publicar (precisam do cliente)
- [ ] **WhatsApp oficial** do Evandro/time (hoje placeholder `5500000000000` em `flow.js`).
- [ ] **Logo e paleta oficiais** do HDM (hoje placeholder Simple/HDM navy+dourado em `styles.css`; trocar o slot do logo nos dois HTML).
- [ ] **Depoimentos reais** (case JusExpert em vídeo/print) para substituir os `[DEPOIMENTO]` em `diagnostico.js`.
- [ ] **Deploy na Vercel** (conta/time da Simple) · não feito nesta sessão (sem CLI/login Vercel).
- [ ] **Planilha de leads** no Drive do cliente + `LEADS_ENDPOINT` no `app.js` (hoje vazio) + teste ponta a ponta.
- [ ] (Opcional) IDs de GA4 / Meta Pixel em `TRACKING_CONFIG` no `app.js`.

## Deploy (quando liberado)
Publicar **apenas esta subpasta** na conta/time da Simple na Vercel, com nome de
projeto limpo. Ver `.claude/skills/gerar-quiz-diag-pag-pos-quiz/references/deploy-vercel.md`.
O anúncio deve apontar para a raiz com query (`/?utm_source=...`), nunca `/index.html`.
