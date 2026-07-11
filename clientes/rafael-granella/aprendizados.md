# Aprendizados — Rafael Granella

Log do que funciona e do que não funciona com este cliente. Toda sessão pode
adicionar uma linha. É a memória que se acumula ao longo do tempo.

| Data | Aprendizado / decisão | Origem (campanha, teste, call) |
| ---------- | --------------------- | ------------------------------ |
| 2026-07-07 | Cadência de follow-up automática (GHL) replicada do modelo Simple: dispara em qualquer etapa Follow 1-6 do pipe "Leads do Quiz", vai até o dia 10 (não o dia 12 do modelo original), guia de montagem em `copy/cadencia-followup-ghl.md` | Call Carlos Durães & Renan Martini, 03/07/2026 |
| 2026-07-07 | No GHL, o nó de WhatsApp só mostra os outcomes automáticos "Delivered/Undelivered" se o toggle "Enable Branches" for ligado manualmente (vem desligado por padrão). E o campo "Contact reply" numa Condition só fica disponível se o Wait logo acima for do tipo "Until the contato replies" (não "For a set period of time") — esse tipo de Wait já entrega os ramos "Contact reply"/"Time out" prontos, sem precisar de Condition separada. | Construção da cadência de follow-up, 11/07/2026 |
| 2026-07-11 | Volume baixo de leads do quiz **não é falta de criativo/quiz ruim**: causa raiz é investimento reduzido (R$1.140 em 30 dias vs R$2.602 só em junho), orçamento pulverizado em 19 variações de anúncio (11 inativas), bug de UTM dinâmico não resolvido (perdeu atribuição do lead de maior valor, >R$500k/mês) e Meta subcontando conversões (pixel/CAPI possivelmente não capturando o evento de conclusão do quiz). O anúncio-âncora histórico (`AD05 - CARD - Existe uma diferença`, 5 leads/60% qualificados) foi descontinuado sem substituto. Diagnóstico completo e plano de ação em `estrategia/2026-07-11-diagnostico-trafego-pago.md` | Análise de Ads Manager (11/06-10/07) + Planilha de Leads, 11/07/2026 |
