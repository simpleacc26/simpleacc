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

## Identidade visual (HDM)
Paleta extraída do site oficial (`hdmfy.com.br/assets/css/style.css`), não
inventada: fundo `#030507`, realce `#00E3BB` para `#30B9FF`, texto `#eef2ff`,
cartões translúcidos, raio 20px. Fonte da marca é Inter (usada se existir na
máquina; sem Google Fonts, por performance). Tema escuro com `@media print`
invertendo para claro, para o "Salvar em PDF" sair legível.

## Publicação (Vercel · time Simpleacc)
- **Projeto:** `quiz-evandro-fernandes` (`prj_9gwlLW8TG5yVauoDFe1714KyjhAq`), time Simpleacc (`team_bD5dst9eSAc4qVaaynXWifXr`).
- **URL de produção:** https://quiz-evandro-fernandes-simpleacc.vercel.app (deploy READY).
- ✅ **Público:** o domínio limpo responde **200** (13/08/2026). A URL com sufixo do time (`...-simpleacc.vercel.app`) segue atrás da Vercel Authentication e dá 302: **entregue sempre o domínio limpo**.
- Integridade conferida com `curl` + `cmp`: os 6 arquivos no ar são idênticos ao repo.
- Anúncio deve apontar pra raiz com query (`/?utm_source=...`), nunca `/index.html`.

## Planilha de leads (integração montada)
- **Planilha:** https://docs.google.com/spreadsheets/d/1A1xFuIldVeAM7S0HQfza4hj-GZRZxAqahlFRqoJc1Gk/edit (dona: daniel@simpleacc.com.br), cabeçalho pronto (19 colunas).
- **Make:** cenário `[Evandro Fernandes] Diagnóstico Receita Invisível → Sheets` (id **5805664**, ATIVO), time `1317940`, conexão Google `5139463`. Webhook → google-sheets:addRow (fromAll, aba `Untitled`).
- **Webhook:** `https://hook.us2.make.com/bb1vst7dea8fyim5mfs9rh4vfo4rdf1v` (já ligado no `LEADS_ENDPOINT` do `app.js`, envio em `application/json`+`keepalive`).
- ⚠️ **1 clique pendente:** a conexão do Make grava como **ssouzadaniel.ads@gmail.com**, que ainda NÃO tem acesso à planilha (teste retornou `403 PERMISSION_DENIED`). **Compartilhar a planilha com ssouzadaniel.ads@gmail.com como Editor.** Depois disso o lead cai sozinho (verificar a aba: se der "Unable to parse range", o nome da aba não é `Untitled` e ajusto no cenário).

## PENDÊNCIAS (precisam do cliente/admin)
- [ ] **Admin Vercel:** desligar a Deployment Protection (acima).
- [ ] **WhatsApp oficial** do Evandro/time (hoje placeholder `5500000000000` em `flow.js`).
- [ ] **Logo e paleta oficiais** do HDM (hoje placeholder Simple/HDM; trocar slot do logo nos 2 HTML).
- [ ] **Depoimentos reais** (case JusExpert) para os `[DEPOIMENTO]` em `diagnostico.js`.
- [ ] Ligar `LEADS_ENDPOINT` (Make webhook) + testar ponta a ponta.
- [ ] (Opcional) IDs de GA4 / Meta Pixel em `TRACKING_CONFIG` no `app.js`.
