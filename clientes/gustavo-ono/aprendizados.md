# Aprendizados — Gustavo Ono

Log do que funciona e do que não funciona com este cliente. Toda sessão pode
adicionar uma linha. É a memória que se acumula ao longo do tempo.

| Data | Aprendizado / decisão | Origem (campanha, teste, call) |
| ---------- | --------------------- | ------------------------------ |
| 2026-04-30 | Abril foi o primeiro mês com vendas de mentoria HT (2 vendas = R$10k) + 5 low tickets. CPL R$23,8, ROAS 7,73. | Controle de Métricas |
| 2026-04-30 | Em Fev e Mar o funil gerou leads a CPL baixo mas zero vendas HT. Problema estava no comercial, não no tráfego. | Controle de Métricas |
| 2026-05-31 | Maio teve melhor CPL (R$15,3) e mais leads (84), mas zero vendas. Indica gargalo no comercial/agendamento. | Controle de Métricas |
| 2026-06-03 | CPL subiu para R$52 em Junho (acima do benchmark R$32). Precisam otimizar criativos ou segmentação. | Growth Model 2026 |
| 2026-06-03 | Taxa MQL de 43% em Junho — qualidade dos leads é boa; problema é taxa de agendamento/comparecimento. | Pit Stop Estratégico |
| 2026-06-08 | Cadências de reativação (frios e mornos) criadas — 5 toques em 10 dias para frios, 4 toques em 8 dias para mornos. | Copy |
| 2026-07-02 | ICP confirmado: mulher 35–55 anos, maioria já tem chocolateria, frustrações com inconsistência e precificação. | Planilha de Leads / Quiz 2 |
| 2026-07-02 | Público de maior ticket médio declarado (acima de R$30k faturamento) aparece nos leads do Quiz 2 — vale segmentar. | Planilha de Leads |
| 2026-07-15 | Meta Pixel (ID 413208557089573) instalado no quiz: PageView na landing e no relatório, ViewContent ao abrir relatório, InitiateCheckout nos CTAs, Lead no form, CompleteRegistration ao iniciar quiz. Usar `fbqTrack()` de `src/analytics.ts` — nunca chamar `window.fbq()` diretamente. | Deploy quiz-gustavo-ono |
| 2026-07-15 | O projeto Vercel `quiz-gustavo-ono` **não tem integração GitHub** — push no git não dispara deploy automático. Para subir: rodar `VERCEL_TOKEN=xxx npx vercel deploy --prod --yes` dentro de `funis/quiz-gustavo-ono/`. | Deploy quiz-gustavo-ono |
| 2026-07-15 | O `vercel.json` precisa declarar `buildCommand`, `outputDirectory` e `framework` explicitamente — sem isso a Vercel serve os arquivos-fonte sem compilar (página preta no browser). | Deploy quiz-gustavo-ono |
| 2026-07-15 | noscript do Meta Pixel deve ficar no `<body>`, não no `<head>` — Vite/parse5 rejeita conteúdo não-script dentro do noscript em head e quebra o build. | Deploy quiz-gustavo-ono |
