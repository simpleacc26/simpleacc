# Cadência de cruzamento: respostas do quiz × desfecho real da avaliação

**Contexto:** Camada 3 do plano de qualificação (as outras duas são a
ancoragem de valor real na Q9 do quiz e o roteiro de triagem da Ana antes de
confirmar horário). Registrado em 27/08/2026.

**Por que isto existe:** a régua de qualificação hoje (`classificarLead` em
`funis/funil-hipnose/app.js`) é uma hipótese, escrita a partir da ESTRATÉGIA
aprovada, sobre o que prediz prontidão real. As Camadas 1 e 2 melhoram a
qualificação na hora (quiz + triagem humana), mas nenhuma das duas usa dado
real de desfecho para se corrigir sozinha. Esta camada fecha esse ciclo:
compara o que a lead respondeu no quiz com o que de fato aconteceu na
avaliação (inclusive as notas comerciais que a Camada 2 passou a gerar) e
usa isso para refinar a régua com o tempo, em vez de manter a régua fixa por
suposição.

## O que cruzar

Para cada lead que passou pelo quiz e chegou (ou não) à avaliação:

| Do quiz (Planilha de Leads) | Da avaliação (planilha/CRM comercial) |
| ---------------------------- | -------------------------------------- |
| `qualificacao` (`fora` / `nutrir` / `qualificado`) | Compareceu à avaliação? |
| Resposta da Q9 (prontidão) | Fechou tratamento? Qual formato (1 ou 3 meses)? |
| Resposta da geografia (Q8) | Nota comercial da Ana (ver Camada 2): "não tem condições", "dúvida sobre valor", "confirmado sem ressalva" etc. |
| Origem/UTM do lead | Motivo de não fechamento, quando houver |

## Cadência

**Mensal**, alinhado ao ritmo de Pit Stop e ao volume atual de leads (não
compensa fazer isso semanalmente com o volume de hoje). Responsável: Carlos
(gestão/estratégia), com apoio do Renan para puxar os dados do lado do
tráfego.

1. Exportar os leads do mês na Planilha de Leads (Google Sheets).
2. Cruzar com a planilha/CRM comercial pelo WhatsApp ou e-mail do lead.
3. Para cada classificação (`fora`, `nutrir`, `qualificado`), calcular:
   - Taxa de comparecimento na avaliação.
   - Taxa de fechamento de tratamento.
   - Padrões nas notas comerciais (ex.: quantos "qualificado" viraram "não
     tem condições" na prática).
4. Registrar o resultado num bloco curto dentro deste mesmo arquivo (nova
   seção "Leituras mensais" abaixo), com a data e o que mudou desde a
   leitura anterior.

## O que fazer com o resultado

- **Se um padrão de resposta no quiz prever bem o desfecho real**, isso é
  sinal de que a régua atual está funcionando e não precisa mexer.
- **Se um padrão de resposta "qualificado" virar "não tem condições" com
  frequência**, é sinal de que a Q9 (ou outra pergunta) precisa de mais
  ajuste, ou de que a Camada 2 (triagem da Ana) precisa pegar esse caso mais
  cedo.
- **Mudanças na régua de `classificarLead` só devem ser feitas com dado de
  pelo menos 2 a 3 leituras mensais**, para não reagir a ruído de um mês
  isolado (volume ainda é baixo).

## O que este processo não é

- Não é um dashboard automático nem uma integração nova. É uma checagem
  manual, leve, feita a partir de planilhas que já existem.
- Não substitui a régua de MQL do tráfego nem a leitura de indicadores do
  Pit Stop (`2026-08-07-pit-stop-plano-de-acao.md`) — é o elo que faltava
  entre a qualificação declarada no quiz e o resultado comercial real.

## Leituras mensais

_(preencher a partir da primeira rodada, prevista para o fechamento de
setembro/2026)_
