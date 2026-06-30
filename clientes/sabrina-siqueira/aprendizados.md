# Aprendizados — Sabrina Siqueira

Log do que funciona e do que não funciona com este cliente.

| Data | Aprendizado / decisão | Origem |
| ---------- | --------------------- | ------ |
| 2026-06-30 | Automação dos 2 funis vai espelhar o modelo Carol e José: `Webhook → GHL Create Contact (com Ignore no erro) → GHL Create Opportunity → Sheets Add Row`. Relatório é gerado **na página**, não no Make. | Decisão com Daniel |
| 2026-06-30 | O "Skip" do print da Carol e José é só o error handler `Ignore` do Create Contact (evita travar se o contato já existe). | Make (cenário Carol e José - V2, id 5525517) |
| 2026-06-30 | Já existia o cenário "[Simple] Sabrina" (id 3310938) num modelo antigo (OpenAI + Google Docs). No modelo novo esses módulos saem. | Make (cenário [Simple] Sabrina) |
| 2026-06-30 | **Os funis no ar agora são PARA PACIENTES** (mãe de autista / paciente de implante), não B2B p/ dentistas como o cenário antigo. Logo, custom fields/pipeline/planilha antigos NÃO servem — só reaproveitar as **conexões** GHL `6040053` e Google `5139463`. | Código dos funis (flow.js/app.js) |
| 2026-06-30 | Payload é **plano e idêntico nos 2 funis**: `nome, whatsapp, email, situacao, problema, implicacao, necessidade, objetivo, perfil, qualificacao, frente, origem, utm_*, data`. `frente` = "Inclusão" (institucional) / "Implantes". | app.js dos funis |
| 2026-06-30 | `LEADS_ENDPOINT` está **vazio** no app.js → funis não enviam nada hoje. Precisa colar a URL do webhook do Make e republicar. WhatsApp também é placeholder `5533000000000` (trocar em flow.js). | app.js / flow.js |
| 2026-06-30 | Funil envia POST `text/plain` (por causa de `mode:no-cors`). Se o Make não separar os campos, usar módulo **JSON → Parse JSON** após o webhook. | app.js |
