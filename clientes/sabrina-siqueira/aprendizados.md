# Aprendizados — Sabrina Siqueira

Log do que funciona e do que não funciona com este cliente.

| Data | Aprendizado / decisão | Origem |
| ---------- | --------------------- | ------ |
| 2026-06-30 | Automação dos 2 funis vai espelhar o modelo Carol e José: `Webhook → GHL Create Contact (com Ignore no erro) → GHL Create Opportunity → Sheets Add Row`. Relatório é gerado **na página**, não no Make. | Decisão com Daniel |
| 2026-06-30 | O "Skip" do print da Carol e José é só o error handler `Ignore` do Create Contact (evita travar se o contato já existe). | Make (cenário Carol e José - V2, id 5525517) |
| 2026-06-30 | Já existia o cenário "[Simple] Sabrina" (id 3310938) num modelo antigo (OpenAI + Google Docs gerando relatório). No modelo novo, esses dois módulos saem. IDs reais (conexão GHL 6040053, pipeline JZRPFoyQXKKFUM2DM2FU, planilha 1XbK1Gi...) reaproveitados — ver `funis/automacao-make.md`. | Make (cenário [Simple] Sabrina) |
