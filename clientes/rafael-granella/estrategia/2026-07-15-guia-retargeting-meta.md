# Guia — Como ligar o Retargeting no Meta (Alivance Club)

**Data:** 15/07/2026
**Por que:** hoje só rodam campanhas de aquisição fria. Existe público morno acumulado (1.241 visitas de perfil, video-viewers, quiz-abandoners, visitantes de LP) que **ninguém está perseguindo** — e é justamente o público que o Rafael fecha. Retargeting é a verba de maior retorno esperado no momento.

## Pré-requisito (já resolvido em 11/07)
O Pixel + evento de conversão foram corrigidos. Isso é o que permite construir públicos de retargeting confiáveis a partir de agora. Quanto mais tempo rodando com o pixel correto, melhores os públicos ficam.

## Passo 1 — Criar os Públicos Personalizados (Custom Audiences)
No **Meta Ads Manager → Públicos → Criar público → Público personalizado**, criar estes (um de cada):

1. **Visitantes do site (LP + quiz)** — Fonte: Site → todos os visitantes de `quiz.rafaelgranella.com.br` e `lp.rafaelgranella.com.br` nos últimos **30 dias**.
2. **Quiz abandoners** — Fonte: Site → pessoas que visitaram o quiz mas **NÃO** dispararam o evento de conversão (`submit_application`/`relatorio_view`) — últimos **14 dias**. (É o público mais quente: começou e não terminou.)
3. **Chegaram no relatório mas não agendaram** — Fonte: Site → dispararam `relatorio_view`/URL contém `/relatorio/` E **não** visitaram a página de agendamento — últimos **30 dias**.
4. **Engajamento no Instagram/Facebook** — Fonte: Instagram (conta) e Página do FB → todos que engajaram nos últimos **365 dias** (aproveita o público de conteúdo/perfil).
5. **Video-viewers** — Fonte: Vídeo → quem assistiu **50%+** de qualquer vídeo dos criativos, últimos **30–60 dias**.

## Passo 2 — Criar o Lookalike dos clientes REAIS
Este é o mais estratégico (recomendação do war room):
- Suba uma **lista dos clientes que o Rafael de fato FECHOU** (e-mail/telefone dos mentorados pagantes — não os leads, os CLIENTES) como Público Personalizado por lista.
- Crie um **Lookalike 1%** Brasil a partir dessa lista.
- Esse público diz pro Meta "ache mais gente parecida com quem já COMPROU", não "parecida com quem clicou". É a melhor matéria-prima pra aquisição — muito superior a interesses ou ADV+.
- ⚠️ Precisa de no mínimo ~100 contatos na lista pra o lookalike ficar bom. Se o Rafael tiver poucos clientes fechados, dá pra complementar com quem fez a call (mesmo sem fechar) como semente secundária.

## Passo 3 — Montar a campanha de Retargeting
- **Objetivo:** Conversões (evento `submit_application` / Lead) — agora que o pixel está corrigido, dá pra otimizar por conversão.
- **Públicos (conjuntos):** os Custom Audiences do Passo 1. Sugestão de priorizar verba nos mais quentes: quiz-abandoners e "chegou no relatório e não agendou".
- **Exclusões:** excluir quem já agendou/virou cliente (pra não gastar com quem já converteu).
- **Verba:** começar pequeno (retargeting tem público limitado — não adianta verba grande). Algo como R$15–30/dia por conjunto quente. O volume é menor, mas a conversão é muito maior.
- **Criativo:** aqui o ângulo muda — não é "descubra seu diagnóstico" (eles já conhecem). É **prova social + urgência + quebra de objeção**. Usar depoimentos (Fabrício/Greice/Camila) e os criativos de "objeção" (#003 de 19/06: "se você já me acompanha e ainda não respondeu..."). Retargeting fala com quem já sabe quem é o Rafael.

## Passo 4 — Lookalike numa campanha de aquisição separada
- Campanha à parte (aquisição fria qualificada), objetivo Conversões, público = Lookalike 1% dos clientes reais.
- Roda em paralelo às duas campanhas atuais (a original + a nova sem ADV+ Brasil-todo). Vira uma terceira frente pra comparar qual fonte de público traz o lead que mais fecha.

## O que observar (2 semanas)
- Retargeting deve ter **CPL bem menor e qualidade maior** que o frio — se não tiver, algo está errado no público.
- Comparar as 3 frentes (original / nova sem ADV+ / lookalike de clientes) por **qualidade de lead e agendamento**, não só por CPL.
- O público morno é finito: acompanhar a **frequência** — se subir muito (>3-4), a audiência está saturando e precisa de novo criativo ou de esperar acumular mais gente.
