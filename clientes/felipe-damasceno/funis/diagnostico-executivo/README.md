# Diagnóstico Executivo (IDE) · Felipe Damasceno

Funil de quiz do cliente Felipe Damasceno (Governo Empresarial). Transforma a
copy aprovada (ver `clientes/felipe-damasceno/estrategia/`) em páginas no ar:
quiz de 7 perguntas → captura → relatório personalizado com o **IDE (Índice de
Dependência Empresarial)** → CTA WhatsApp + Baixar PDF.

Stack: HTML/CSS/JS puro, sem build, sem dependências. Gerado a partir da skill
`gerar-quiz-diag-pag-pos-quiz` (base de referência Sabrina, 100% recopy).

## Arquivos
- `index.html` — quiz (uma pergunta por tela, auto-avanço, barra de progresso).
- `diagnostico.html` + `diagnostico.js` — relatório pós-quiz (calcula o IDE, monta o diagnóstico, WhatsApp, Baixar PDF).
- `flow.js` — **toda a copy** (marca, hero, 7 perguntas com pesos do IDE, captura). Editar aqui.
- `styles.css` — identidade (tema dark navy + dourado, proposto).
- `app.js` — motor do funil (render, validação, UTMs, sessionStorage, POST dos leads).
- `integracao-planilha.gs` — Google Apps Script da planilha de leads.

## Como o IDE é calculado
Pesos por resposta (0 a 3) nas perguntas situação, problema, implicação,
necessidade e perfil. `IDE% = soma / máximo`. ≥66% = Alto, 33 a 65% = Médio,
<33% = Baixo. Faturamento "até R$ 50 mil" e "R$ 50 a 100 mil" marcam o lead como
fora do ICP (roteia para conteúdo/plataforma, não para a sessão).

## Pendências para publicar (o que falta do cliente)
1. **WhatsApp do Felipe** (CTA): trocar `marca.whatsapp` em `flow.js` (hoje `5500000000000`).
2. **Logo + cores oficiais**: hoje usa marca em texto e o tema dark navy + dourado
   proposto. Trocar o logo (colocar `logo.png` e ativar `<img class="logo-img">`)
   e ajustar os HEX no `:root` do `styles.css` quando vier o manual de marca.
3. **Deploy na Vercel** (conta/time da Simple, nunca pessoal): publicar só esta
   subpasta, com nome de projeto limpo.
4. **Planilha de leads**: criar no Drive do cliente, colar o `integracao-planilha.gs`
   no Apps Script, implantar como App da Web, colar a URL `/exec` em
   `app.js → LEADS_ENDPOINT`, republicar e testar um lead de ponta a ponta.

## Deploy (resumo)
Publicar **apenas esta pasta** na Vercel da Simple. Rodar tráfego com
`?utm_source=...&utm_campaign=...` na URL para as UTMs caírem na planilha.
