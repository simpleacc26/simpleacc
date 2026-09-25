# Criativos: qualificação (MQL) depois do "Eu vou" · 25/09/2026

Pedido da Vitória (25/09): saber quais criativos, principalmente os estáticos,
estão performando melhor depois que o "Eu vou" foi desativado, para aumentar a
verba sabendo o que dá certo quando a SDR estiver instalada.

**Fonte:** "Planilha de Leads - Vitória Daniela", aba **Quiz 2** (quiz atual,
com Balde e Camada calculados). A aba Quiz 1 parou em 13/07 e não entra.
**MQL** = lead classificado como **Camada A (Implementação Magna)** ou
**Camada B (Mentoria Magnetizze)**. "Fora do perfil (nutrição)" não é MQL.
A coluna Camada é calculada pelo próprio quiz (`funis/quiz/useQuizLogic.v2.ts`,
regra do diagnóstico de 06/07):

- **Fora do perfil:** faturamento até R$20 mil ("Até R$5 mil" ou "Entre R$5 mil
  e R$20 mil") **ou** respondeu "Sei que preciso resolver, mas não é prioridade
  agora" / "Quero resolver, mas não posso investir agora".
- **Camada A:** faturamento R$50 mil+, tem pelo menos 1 pessoa na equipe,
  ticket R$3 mil+ **e** "Quero resolver e tenho como viabilizar investimento".
- **Camada B:** todo o resto (faturamento R$20 mil+ sem nenhum bloqueio acima).

Obs.: a resposta "Quero resolver, mas meu caixa está apertado no momento" não
bloqueia; com faturamento R$20 mil+ ela vira Camada B.

## Data de corte

O último lead do criativo **AD16 - IM - Eu vou** entrou em **26/08/2026 às
09h42 (horário de Brasília)**. Ele rodou de 15/07 a 26/08 e trouxe 122 leads.
A análise abaixo considera só os leads que entraram **depois** disso
(26/08 09h42 até 23/09, último lead da planilha).

## Tabela (leads de 26/08 a 23/09)

| Criativo | Formato | Leads | MQL | Taxa MQL | Fat. R$20 mil+ | Ticket R$3 mil+ | "Tenho como viabilizar" |
|---|---|---:|---:|---:|---:|---:|---:|
| AD02 - IM - Estruturamos | Estático | 15 | 1 (B) | 6,7% | 2 | 3 | 3 |
| Anúncio sem nome na UTM (ID 120251713966390076) | ? | 3 | 1 (B) | 33,3% | 1 | 1 | 0 |
| AD15 - IM - Você quer resolver (cópia) | Estático | 3 | 0 | 0% | 0 | 2 | 0 |
| AD01 - VD - Vou te explicar | Vídeo | 3 | 0 | 0% | 0 | 1 | 2 |
| AD08 - IM - Nota oficial | Estático | 3 | 0 | 0% | 0 | 0 | 1 |
| AD18 - IM - É claro (cópia) | Estático | 2 | 0 | 0% | 0 | 1 | 0 |
| AD01 - IM - Lembra quando | Estático | 1 | 0 | 0% | 0 | 0 | 0 |
| AD18 - IM - Você não precisa (cópia) | Estático | 1 | 0 | 0% | 0 | 0 | 0 |
| AD09 - IM - Iceberg | Estático | 1 | 0 | 0% | 0 | 0 | 0 |
| **Total** | | **32** | **2 (0 A, 2 B)** | **6,3%** | **3** | **8** | **6** |

Comparação: o **"Eu vou"** teve 122 leads e 10 MQL (1 A, 9 B), **8,2%**.

## Leitura

- **Volume caiu muito** sem o "Eu vou": de ~20 leads/semana para ~8/semana.
  Isso explica o "os leads estão vindo bem poucos".
- **AD02 - Estruturamos** é o único estático com volume (15 leads, quase metade
  do período) e concentra os sinais de qualidade (ticket R$3 mil+, faturamento
  R$20 mil+, disposição para investir). Hoje é o melhor candidato para receber
  verba.
- O anúncio com **ID 120251713966390076** trouxe 1 MQL em 3 leads, mas a UTM
  veio sem nome (parâmetro dinâmico quebrado): precisa do export do Meta para
  saber qual criativo é. Vale corrigir a UTM desse anúncio.
- O vídeo **AD01 - VD - Vou te explicar** tem 3 leads e 2 com disposição para
  investir, mas nenhum MQL ainda.
- **Amostra pequena**: com 1 a 3 leads por criativo, um único lead muda a taxa
  em 30 pontos. A decisão de verba deve cruzar com o custo por lead e por MQL
  (CSV de tráfego que o Daniel vai enviar).

## Próximo passo

Cruzar com o CSV do Gerenciador (gasto, CPM, CTR, custo por lead por anúncio)
para fechar custo por MQL por criativo. Os números por criativo estão em
`2026-09-25-criativos-mql.csv` (nesta pasta).
