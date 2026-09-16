# Aprendizados — Greicy Speroto

Registro contínuo do que funciona e do que não funciona neste cliente.

## 2026-08-21

**Diagnóstico de anúncios Meta Ads não entregando mensagens no WhatsApp da Greicy.**
Depois de descartar erro de digitação de número, migração para Cloud API, chatbots, WhatsApp Web e restrições de conta, o Omar entrou em Contas do WhatsApp do portfólio empresarial e encontrou uma conta duplicada e uma linha adicional (final 0766) vinculadas indevidamente. Removeu e manteve só o número oficial. A campanha paralela de Instagram Direct trouxe 2 leads em um dia, isolando o problema no vínculo específico Página do Facebook ↔ WhatsApp.
**Lição**: em cliente com Business Portfolio configurado, sempre checar Contas do WhatsApp e Configurações da Página do Facebook antes de assumir bug de plataforma. Status "Offline" em Phone numbers é normal para app WhatsApp Business (não é Cloud API).

**Script de abordagem no WhatsApp criado**, com metodologia high ticket adaptada para clínica de estética. Ver `copy/script-abordagem-whatsapp.md`. Cobre roteiro geral em 7 etapas, abordagem específica por procedimento (Botox, Full Face, Preenchimento Labial, Rinomodelação, Bioestimulador), tratamento de 7 objeções comuns em estética e follow-up estruturado em 4 tempos (24h, 3 dias, 7 dias, 30 dias). Aguardando teste real da Greicy com as próximas leads para ajustar.
