# Decisões da reformulação do funil (Diagnóstico ÚNICOS)

Registro das decisões fechadas com o cliente (Daniel, 30/07/2026) após a análise dos
documentos reformulados por Carol e José (Guia da Nova Campanha, Diagnóstico v4, Página
Pós-Diagnóstico v8) e da transcrição do Pit Stop de 24/07. Fundamenta o build em
`../funis/diagnostico-unicos/`.

## Contexto
Régua antiga do funil entregava 0 MQL real (4 meses: 359 leads, 0 vendas de mídia paga,
9 de 9 compradores por indicação). Achado central do Guia: **duas camadas de vocabulário
que nunca se misturam** (comunicação × qualificação). O novo funil aplica isso.

> ## ⚠️ Atualização — feedback do José (2026-08): reverter para o v4 exato
> O José revisou e **rejeitou três mudanças** que tínhamos proposto. Decisão final:
> **manter o diagnóstico exatamente como o v4 enviado.** Prevalece sobre o que está abaixo.
> 1. **Abrir pela pergunta de dor**, não por qualificação. Duas perguntas de qualificação
>    no começo quebram a expectativa criada pelo anúncio. → desfeita a reordenação "ASK";
>    ordem = v4 (Q1 = dias sem depender de você).
> 2. **Faturamento em faixa única** (v4), igual para todos os setores. "De R$1 a R$3 milhões
>    é a mesma estrutura de empresa, os mesmos problemas." → desfeita a faixa por setor.
> 3. **Remover a margem.** "Pode ser inflada e simulada, não diz nada e leva para gestão
>    operacional, que não é o meu caso." → margem fora do diagnóstico.
>
> O que a Simple mantém por dentro (não muda o que o lead vê): roteamento, leitura de ICP
> por setor só para a métrica interna, balde, tracking por criativo, e a reversão de risco
> na página (esta ainda a validar com o cliente).

## Decisões

1. **Filtro de papel é o corte real.** `Diretor/executivo, respondo ao dono` e
   `Nenhuma dessas` saem do agendamento e vão para a comunidade / Jornada 1.
2. **Piso de faturamento R$1M/ano.** `Até R$1 milhão` vai para a comunidade.
3. **"Aprovado" por setor.** Pleno = dono/sócio E porte ≥ ICP do setor (indústria R$5M,
   demais R$2M). Acima do piso mas abaixo do ICP = tier 2, contabilizado à parte.
   A régua do contrato passa a ser **custo por lead aprovado, por criativo**.
4. **Resultado único "Estágio 2: No Limite"**, com **balde** (uma das 4 situações da
   página) computado por dentro para segmentar leitura, relatório e comercial.
5. **Margem permanece no diagnóstico** (Q8), fora dos ganchos de comunicação.
6. **Reversão de risco** na sessão: 40 min; se não sair com um ponto claro, o tempo é por
   nossa conta.
7. **Sem VSL** por enquanto (não estava nos documentos enviados). Estrutura texto.
8. **Stack:** React + Vite + GTM + agendamento GHL. Deploy na **Netlify** (connect rate
   melhor que Vercel em outro cliente).

## Pendências para publicar (dados operacionais, não inventar)
- Endpoint de leads + planilha no Drive.
- WhatsApp, link do GHL (agendamento), link da comunidade.
- Logo oficial do ÚNICOS (hoje wordmark tipográfico).
- Conta/time da Simple na Netlify.

## Ponto a refinar (sinalizado)
As faixas de faturamento da v4 não cortam em R$5M/R$2M exatos, então pleno/tier2 é
aproximado pela faixa que contém o corte. Para tier 2 nítido em serviços, desmembrar as
faixas (R$1–2M / R$2–5M).

> A proposta anterior (`proposta-revisao-quiz-diagnostico.md`) foi superada pela v4 do
> cliente e por estas decisões. Mantida como histórico.
