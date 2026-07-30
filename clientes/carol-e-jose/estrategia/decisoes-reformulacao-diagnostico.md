# Decisões da reformulação do funil (Diagnóstico ÚNICOS)

Registro das decisões fechadas com o cliente (Daniel, 30/07/2026) após a análise dos
documentos reformulados por Carol e José (Guia da Nova Campanha, Diagnóstico v4, Página
Pós-Diagnóstico v8) e da transcrição do Pit Stop de 24/07. Fundamenta o build em
`../funis/diagnostico-unicos/`.

## Contexto
Régua antiga do funil entregava 0 MQL real (4 meses: 359 leads, 0 vendas de mídia paga,
9 de 9 compradores por indicação). Achado central do Guia: **duas camadas de vocabulário
que nunca se misturam** (comunicação × qualificação). O novo funil aplica isso.

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
