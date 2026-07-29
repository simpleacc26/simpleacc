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

## Publicação (Vercel · time Simpleacc)
- **Projeto:** `quiz-evandro-fernandes` (`prj_9gwlLW8TG5yVauoDFe1714KyjhAq`), time Simpleacc (`team_bD5dst9eSAc4qVaaynXWifXr`).
- **URL de produção:** https://quiz-evandro-fernandes-simpleacc.vercel.app (deploy READY).
- ⚠️ **BLOQUEIO:** o time tem **Vercel Authentication (Deployment Protection) ON**, então a URL redireciona pra login (302). Um admin precisa desligar em **Project → Settings → Deployment Protection → Vercel Authentication → Off**. Só depois o funil fica público. (Os tools de protection do MCP retornam "not found", não dá pra desligar por aqui.)
- Anúncio deve apontar pra raiz com query (`/?utm_source=...`), nunca `/index.html`.

## Planilha de leads
- **Planilha:** https://docs.google.com/spreadsheets/d/1A1xFuIldVeAM7S0HQfza4hj-GZRZxAqahlFRqoJc1Gk/edit (dona: daniel@simpleacc.com.br), cabeçalho pronto.
- **Integração (a ligar):** Make (time `1317940`, conexão Google `5139463`), webhook → Google Sheets addRow, mesmo padrão dos outros funis. Depois: colar a URL do webhook em `LEADS_ENDPOINT` (`app.js`), republicar e testar 1 lead.

## PENDÊNCIAS (precisam do cliente/admin)
- [ ] **Admin Vercel:** desligar a Deployment Protection (acima).
- [ ] **WhatsApp oficial** do Evandro/time (hoje placeholder `5500000000000` em `flow.js`).
- [ ] **Logo e paleta oficiais** do HDM (hoje placeholder Simple/HDM; trocar slot do logo nos 2 HTML).
- [ ] **Depoimentos reais** (case JusExpert) para os `[DEPOIMENTO]` em `diagnostico.js`.
- [ ] Ligar `LEADS_ENDPOINT` (Make webhook) + testar ponta a ponta.
- [ ] (Opcional) IDs de GA4 / Meta Pixel em `TRACKING_CONFIG` no `app.js`.
