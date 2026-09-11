# War Room — Reestruturação do Funil Alivance Club

**Data:** 15/07/2026
**Contexto:** Pit Stop Quinzenal 15/07 (Rafael + Renan + Deise). Rafael questionando seriamente a continuidade do tráfego pago: 2,5 meses, ~R$8k/mês (ads + agência), 4 reuniões, **0 vendas**. A prospecção ativa (outbound) dele faz **46 reuniões/mês**, mais barato e convertendo.
**Fontes cruzadas:** transcrição do Pit Stop, CSV de campanha (15/06–14/07), Growth Model, doc de copies 2026, jornada do quiz, correção de tracking feita em 11/07.

---

## ⚠️ A descoberta que muda tudo: a decisão está sendo tomada sobre dado corrompido

O Renan propôs "reformular o quiz e a página" porque a **taxa de conversão da página caiu de 18% para 4%**. Só que:

**Esse 4% foi medido enquanto o rastreamento de conversão estava QUEBRADO.** O evento `submit_application_website` só voltou a contar corretamente em **11/07** (correção do trigger 25 no GTM). Durante quase todo o período 15/06–14/07 medido no CSV, o Meta estava subcontando as conversões de conclusão do quiz.

**Implicação direta:** o "4%" provavelmente **não é a conversão real da página** — é a conversão *mal medida*. Reformular o quiz agora significa **mudar a variável antes de ter uma linha de base confiável do que ela realmente é**. Perde-se o baseline e nunca se saberá se o "4%" era real ou artefato do tracking quebrado.

**Além disso** — o outro fator que mudou entre o "18%" e o "4%": a campanha ativa hoje é `[ADV+] Quiz 01 - ATUALIZADO`. O **[ADV+] = Advantage+ Audience** (público amplo/automático do Meta). Público amplo traz clique mais barato, mas visitante mais frio e menos qualificado → **isso sozinho explica tanto a queda de conversão da página quanto a queda de qualidade dos leads** que o Rafael reclamou. A copy do quiz não mudou nesse período — então culpar a copy do quiz é consertar justamente a variável que **não** mudou.

---

## Os números reais (CSV 15/06–14/07)

Única campanha de lead ativa hoje: `[SACC][Leads][CBO][Solicitação][ADV+] Quiz 01 - ATUALIZADO`
- Gasto: R$1.378 | Orçamento: R$50/dia
- **CPM: R$127,50** (muito alto — saudável seria R$40–80)
- CTR (link): 1,84% (ok)
- 199 cliques no link → 154 visitas de LP = **~77% connect rate** (bom, confirma o "75%" do Renan)
- 154 visitas → 5 conversões medidas = ~3–4% **(número contaminado pelo tracking quebrado)**
- Reuniões: 4 em 2,5 meses | Vendas: 0

Campanhas pausadas relevantes:
- Webinário: **CPM R$25,45** (melhor da conta), 24 leads, R$183 — encerrada 28/06
- Formulário Nativo: CPM R$109, 5 leads
- Distribuição/Seguidores ToFu: 1.241 visitas de perfil por R$298 (público morno acumulado, hoje **sem retargeting rodando em cima**)

---

## War Room: Hormozi · Brunson · Marçal

### 🧩 Alex Hormozi — o constraint e a qualificação
- "Você tem um problema de **qualidade/fechamento**, e a solução proposta é baixar o CPM indo mais amplo. Isso é jogar mais água num balde furado. Volume não é seu gargalo — **conversão-para-venda é**. Foram 4 reuniões, 0 fechamentos. Se eu te der 40 reuniões da mesma qualidade, você fecha 0. Conserte o que está zerado."
- "O quiz qualifica a pessoa fazendo ela se sentir *diagnosticada*, não fazendo ela *provar que pode comprar*. Auto-declarar 'faturo R$20k' não filtra nada. Coloque um filtro real de prontidão-para-investir, uma âncora de preço/aplicação — não só faixa de faturamento."
- Sobre 'manter ou não o tráfego': "Seu CAC não está quebrado, sua **medição** estava. Uma venda de R$115k paga 14 meses de anúncio. Mas você não pode rodar o que não consegue medir, e você **acabou de consertar o pixel há 4 dias**. Você tem zero dado limpo. Não reformule nada por 2 semanas — deixe o pixel corrigido te dar um baseline real primeiro."

### 🎯 Russell Brunson — arquitetura de funil e "o que mudou"
- "Regra nº 1 de diagnóstico: **o que mudou entre 18% e 4%?** Você trocou o público para Advantage+ e re-hospedou o quiz. Você **não** mudou a copy do quiz — então por que a copy do quiz é o que você vai 'reformular'? Está consertando a única variável que não mudou. Volte o público pro que convertia a 18% e teste a partir daí."
- "Esse funil tem portas demais: Anúncio → Quiz → Relatório → Página de Agendamento → WhatsApp → Call. Cada porta perde gente. Pra high-ticket eu **colapsaria**: o relatório JÁ É o pitch e deveria agendar a call dentro dele, não entregar pra uma página de agendamento separada e depois pro WhatsApp."
- "O relatório é sua VSL. Hoje ele **lisonjeia** ('isso não é coincidência, é um padrão') — bom gancho — mas ele **future-paceia** e cria **urgência de agendar**? É aí que as 4 reuniões que não fecham estão sendo perdidas: o relatório educa mas não vende a CALL."

### 🔥 Pablo Marçal — atenção, polarização e alavancar o que já funciona
- "Você tem um closer de elite — o próprio Rafa — que pega gente fria que nunca o viu e fecha. E usa o tráfego pra **replicar** um funil que **compete** com ele, em vez de **alimentar** ele. Inverte: o tráfego não é pra vender a mentoria sozinho, é pra encher a agenda do Rafa e da SDR."
- "Esse quiz é passivo demais. Mentor bem-sucedido é movido a ego e rivalidade, não a 'diagnóstico gratuito'. O ângulo tem que **confrontar e comparar**, e o CTA tem que puxar pra uma **conversa**, não pra um relatório automático que ele lê sozinho e esquece."
- "Retargeting é o dinheiro na mesa. 1.241 visitas de perfil, gente que assistiu vídeo, gente que começou o quiz e não terminou — **ninguém está sendo perseguido**. Bota verba de remarketing em cima de quem já demonstrou interesse. Esse é o público que o Rafa fecha."

### Consenso dos três
1. **Não alargar o topo** (geo/ADV+) — piora a qualidade, que é justamente a reclamação nº 1. **Apertar**, não abrir.
2. **Não reformular o quiz sobre dado quebrado** — esperar ~2 semanas de tracking limpo pra ter baseline, ou no mínimo reverter o público ADV+ primeiro (isolar uma variável por vez).
3. **Usar o pago pra alimentar a máquina que funciona** (outbound + retargeting de público morno + lookalike dos clientes REAIS fechados), não pra rodar um funil frio paralelo.
4. **Consertar a conversão relatório→call** (o relatório tem que vender a call) e **adicionar qualificação real**.
5. **A call/oferta é onde mora o 0 vendas** — ninguém está olhando pra ela. 4 reuniões 0 fechamentos não se resolve mexendo no quiz.

---

## Avaliação crítica do plano do Renan

| Ação proposta pelo Renan | Veredito | Por quê |
|---|---|---|
| Abrir geolocalização pra baixar CPM | ⚠️ **Arriscado / provável erro** | Baixar CPM indo mais amplo = mais leads baratos e mais frios. Piora a qualidade, que é a reclamação nº 1. Otimiza a métrica errada. |
| Reformular quiz + página | ⚠️ **Prematuro e mal-direcionado** | Baseado no "4%" contaminado pelo tracking quebrado + ignora que a variável que mudou foi o público (ADV+), não a copy do quiz. |
| Adicionar novos vídeos + estáticos | ✅ **Ok, mas não é o gargalo** | CTR já está bom; mais criativo não conserta conversão-para-venda zerada. Fazer, mas sem esperar que resolva o problema central. |
| Cadência de follow-up automática | ✅ **Boa infra, hoje ainda inócua** | Bem construída, mas só ajuda quando houver volume de lead qualificado entrando. Não é a alavanca do momento. |
| Alinhar com Daniel/Carlos e validar com Rafael | ✅ **Correto (processo)** | — |

**O que o Renan acertou** (e vale reconhecer): identificar o CPM alto; a correção do connect rate (38%→75%, feita); o instinto de que o CTR/criativo está saudável; a leitura de que precisa melhorar o match com o ICP (só que a alavanca é público + qualificação, não copy do quiz).

**O que falta no plano (os gaps grandes):**
1. Ninguém questionou a troca pra ADV+ como causa raiz provável dos dois problemas (qualidade E conversão).
2. Ninguém reconheceu que o funil inteiro estava sendo medido com tracking quebrado — não dá pra otimizar o que você acabou de começar a medir certo.
3. A alavanca estratégica ignorada: o **outbound do Rafa converte ~10x melhor**. O pago deveria **alimentar** essa máquina (retargeting morno + lookalike dos clientes reais + encher a agenda), não competir com ela num funil frio.
4. A **call/oferta** — 4 reuniões, 0 fechamentos. Mesmo os leads "bons" não fecham. Isso não se resolve mexendo no quiz.
5. O funil tem **passos demais** pra frio→R$115k. Cada passo sangra, e gera exatamente o comportamento que o Rafael descreveu ("responde pra ver o que é e some").

---

## Plano de ação sequenciado

### 🟢 HOJE (reversível, alta alavanca, preserva dado) — fazer nesta ordem
1. **NÃO reformular o quiz/página ainda.** Congelar por ~2 semanas pra o tracking corrigido gerar baseline limpo. (Se houver pressão política pra "fazer algo hoje", que seja no relatório/CTA — ver item 4 — não no quiz inteiro.)
2. **Reverter o público ADV+** pro público que convertia a 18% (segmentação manual anterior), OU rodar os dois lado a lado pra isolar a variável. Essa é a mudança de maior probabilidade de recuperar conversão E qualidade.
3. **Ligar retargeting** em cima do público morno que já existe (1.241 visitas de perfil, video-viewers, quiz-abandoners). Verba pequena, público quente — é onde o Rafa fecha.
4. **Ajustar o RELATÓRIO pra vender a call** (não o quiz): adicionar future-pacing + prova social (Fabrício R$600k, Greice R$500k, Camila R$120k — já estão nas copies) + urgência real de agendar + CTA mais forte pro WhatsApp/agenda. Isso é rápido e ataca o ponto onde as reuniões não viram venda.
5. **NÃO abrir geolocalização** por enquanto — segurar até ter baseline. Se quiser mexer em CPM, o caminho é o público (ADV+→manual) e o retargeting, não alargar geografia.

### 🟡 ESTA SEMANA
6. **Adicionar qualificação real no quiz** (âncora de investimento / pergunta de prontidão), pra parar de deixar passar quem "auto-declara R$20k" mas não tem perfil.
7. **Colapsar passos do funil**: testar relatório que agenda a call dentro dele (cortar a página de agendamento intermediária), reduzindo o sangramento entre etapas.
8. **Subir os criativos novos** (3 vídeos + 3 estáticos de 11/07, já no doc de copies) — mas como teste controlado, com tracking limpo, não como "a solução".
9. **Olhar a call/oferta**: revisar as 4 reuniões que não fecharam (gravn­ções/notas) — é problema de intenção do lead ou de pitch/oferta? Sem isso, nenhum ajuste de topo resolve o 0 vendas.

### 🔵 ESTRATÉGICO (alinhar com Rafael — a conversa real que ele está pedindo)
10. Reposicionar o papel do tráfego: de "funil frio paralelo que compete com o outbound" para "**motor que alimenta o outbound e o retargeting**". Reduzir a verba do funil frio a um teste mínimo, redirecionar o grosso pra retargeting morno + lookalike dos clientes REAIS fechados, direcionando pra agenda/WhatsApp da SDR.
11. **Checkpoint de dado limpo em ~3 semanas**: com o pixel corrigido rodando, medir CAC real e conversão real. Aí sim decidir com dado — não com achismo — se o frio pago tem lugar. Isso responde de forma honesta a pergunta do Rafael ("vale a pena os R$8k?") em vez de só defender o investimento.

---

## Nota de honestidade sobre a pergunta do Rafael

O Rafael está fazendo uma pergunta legítima ("vale a pena R$8k/mês pra 4 reuniões e 0 vendas em 2,5 meses?"), e a resposta madura não é defender o investimento nem matá-lo de imediato. É: **(a)** reconhecer que a frustração é racional; **(b)** mostrar que boa parte do resultado ruim vem de causas técnicas já identificadas e em correção (tracking quebrado, público ADV+ frio, funil com passos demais) — não de "o tráfego não funciona pra ele"; **(c)** propor o checkpoint de dado limpo em 3 semanas como o momento de decidir com número real; **(d)** enquanto isso, reduzir desperdício e redirecionar verba pra alimentar a máquina que já converte. Matar o pago agora joga fora o ativo de audiência/retargeting/lookalike que compõe ao longo do tempo — mas continuar do jeito atual, sem essas correções, também não se sustenta.
