# Diagnóstico de Tráfego Pago — Quiz Alivance Club

**Data:** 11/07/2026
**Escopo:** Campanha do Quiz (Meta Ads) — não cobre ainda Webinário nem Formulário Nativo.
**Motivação:** time reportou volume de leads "extremamente baixo" e alarmante.

## Dados analisados

- Export Meta Ads Manager, nível anúncio e nível conjunto de anúncios (11/06 a 10/07/2026)
- `Planilha de Leads - Rafael Granella` (Drive), cruzada por `utm_content`
- `Rafael Granella - Controle de Métricas` / `Growth Model - 2026` (Drive)
- `Estratégia 2026`, Pit Stops Estratégicos 03/06, 17/06, 01/07 (Drive)

## Achados principais

1. **Investimento caiu bastante.** R$1.140,34 gastos em 30 dias (11/06–10/07) contra R$2.602,57 só em junho, segundo a planilha interna de métricas. O ritmo de investimento atual está bem abaixo do histórico recente.

2. **Orçamento fragmentado demais.** 19 variações de anúncio testadas, 11 já inativas, disputando pouca verba entre si. Sem volume suficiente por anúncio, o algoritmo do Meta não sai da fase de aprendizado — reflexo direto: CPM disparado em vários (até R$252,92, contra uma faixa saudável de ~R$50-80 pro público).

3. **Bug de tracking crítico (UTM dinâmico não resolvido).** O lead de maior valor da base (Guilherme Valota, faturamento **acima de R$500.000/mês**) tem `utm_campaign`, `utm_content` e `utm_term` gravados como o texto literal `{{campaign.name}}` / `{{ad.name}}` / `{{adset.name}}` — os parâmetros dinâmicos do Meta não foram substituídos pelos valores reais. Não dá pra saber qual anúncio trouxe esse lead, nem replicar o que funcionou.

4. **Meta está subcontando conversões.** Apenas 2 conversões do evento `submit_application_website` registradas em 30 dias no Ads Manager, enquanto a Planilha de Leads mostra entradas de CRM em ritmo maior. O anúncio com melhor eficiência de entrega da conta (AD04 - IM - Mentor com agenda, CPM R$51,87, o mais barato) está com **zero conversões registradas** — forte indício de pixel/CAPI não capturando o evento de conclusão do quiz de forma confiável. Isso também impede o algoritmo do Meta de otimizar entrega para quem realmente converte.

5. **O anúncio-âncora foi descontinuado.** Cruzando leads x anúncio x faturamento declarado:

   | Anúncio | Leads | Qualificados (≥R$20k/mês) | Taxa | Rodando hoje? |
   |---|---|---|---|---|
   | AD05 - CARD - Existe uma diferença | 5 | 3 | 60% | ❌ não |
   | AD08 - CARD - Mentor, você já | 2 | 1 | 50% | ❌ não |
   | AD13 - IM - Mentor, isso aqui | 2 | 1 | 50% | ❌ não |
   | AD01 - IM - Mentor | 2 | 1 | 50% | inactive |
   | AD13 - CARD - Mentor, isso aqui | 2 | 1 | 50% | ✅ active |
   | AD03 - IM - Fabrício | 1 | 1 | 100%* | inactive |
   | AD15 - CARD - Tem uma diferença | 1 | 1 | 100%* | ✅ active |
   | AD14 - CARD - A maioria dos mentores | 1 | 0 | 0% | inactive |

   *amostra de 1, não conclusivo isoladamente.

   `AD05 - CARD - Existe uma diferença` trouxe o dobro de leads de qualquer outro anúncio, com a melhor taxa de qualificação — e não existe mais na estrutura atual de campanha.

6. **Ponto positivo: connect rate melhorou.** A taxa de conexão (cliques no link → visualização de LP) estava em 36-38% nos dados de maio/junho da planilha interna (bem abaixo do benchmark de ≥80%). Nos conjuntos mais recentes (rodando desde 27/06), está em 62-87%. O problema técnico de carregamento de página parece já ter sido resolvido — não é mais a prioridade nº 1.

7. **Qualificação geral saudável.** Dos 15 leads com UTM rastreável, 60% declaram faturamento ≥R$20k/mês. O quiz está atraindo o público certo — o problema é volume, não qualidade de quem chega.

## Conclusão

O gargalo não é "criativo fraco" nem "quiz mal feito" — é uma combinação de **investimento reduzido + orçamento pulverizado + medição quebrada**, com um agravante estrutural: o anúncio que historicamente mais performava foi tirado do ar sem substituto à altura.

## Plano de ação (em ordem de prioridade)

### Fase 1 — Medição (esta semana, antes de qualquer outra mudança)
Sem isso, nenhuma decisão de criativo/orçamento daqui pra frente é confiável.
- Corrigir o parâmetro de URL dinâmico quebrado (`{{campaign.name}}` etc.) na configuração do anúncio/link do quiz.
- Verificar se o Meta Pixel **e** a Conversions API (CAPI) estão instalados e disparando no evento certo de conclusão do quiz (usar o Meta Pixel Helper pra confirmar ao vivo).
- Reconciliar: nº de leads no CRM/GHL x nº de conversões contadas pelo Meta, pra medir o tamanho real da perda de tracking.
- Confirmar GA4/GTM como fonte secundária de verdade (hoje não documentado nos acessos).

### Fase 2 — Estancar o desperdício de orçamento (próximas 1-2 semanas)
- Pausar de vez os anúncios com CPM alto e zero conversão/qualificação (ex.: `AD14 - CARD - A maioria dos mentores`).
- Reduzir o número de variações ativas simultâneas — concentrar verba nos ângulos com prova real em vez de pulverizar entre muitas.
- Reativar (ou recriar com o mesmo ângulo/copy) o `AD05 - CARD - Existe uma diferença` — é o único anúncio com prova real de volume + qualidade.
- Revisar o orçamento diário total da campanha (verificar se ainda está no patamar de R$10/dia definido no doc de Estratégia 2026 — nesse caso, está baixo demais pro ticket do produto).

### Fase 3 — Escalar criativo (após Fases 1 e 2 resolvidas)
- Executar o plano de ToFu/Meio/Fundo já desenhado no doc "Estratégia 2026" (ângulos 1-7), que segundo os Pit Stops de 03/06, 17/06 e 01/07 ainda não saiu do papel.
- Testar novos criativos só depois que a medição estiver confiável — senão não dá pra saber o que está funcionando.

### Baixa prioridade por ora
- Revisão de quiz/LP: o connect rate já melhorou sozinho nos conjuntos recentes. Não é o gargalo principal hoje. Vale só confirmar que ele se mantém saudável depois da Fase 1, e revisitar só se os números caírem de novo.

## Pendências para fechar o diagnóstico 100%
- Export de campanha (nível campanha, pra ver orçamento diário real — hoje só sabemos que está em "orçamento da campanha", CBO)
- Exports equivalentes das campanhas de Webinário e Formulário Nativo
- Confirmação de status do GA4/GTM/CAPI
