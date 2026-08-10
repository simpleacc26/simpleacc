# Depoimentos · prints do Dr. Kayo Andrade

Prints de conversas reais de WhatsApp entre o Guilherme e o **Dr. Kayo Andrade**, o case
principal. Recortados (sem barra de status e sem teclado) e convertidos para WebP.

O Dr. Kayo **autorizou em contrato** o uso de print e vídeo (ver `CLAUDE.md` do cliente).

## Como aparecem na página

O relatório mostra **3 prints por lead**, escolhidos pelas respostas, igual ao CTA:

| Posição | Critério | Print |
| --- | --- | --- |
| 1º (fixo) | todos | `kayo-4756` (evolução mensal + "achando que ngm ia pagar") |
| 2º | gargalo `modelo de receita` | `kayo-4761` (fechamento de R$ 86.771) |
| 2º | gargalo `precificação` | `kayo-4750` ("ninguém pediu desconto, ninguém achou caro") |
| 2º | gargalo `conversão na consulta` | `kayo-4748` ("o que mudou? minha confiança") |
| 2º | gargalo `estruturação da oferta` | `kayo-4747` (3 programas em 1 dia, 100% de conversão) |
| 3º | objetivo `sair-plantao` | `kayo-4763` (plantão de 18h na UTI por R$ 1.500) |
| 3º | objetivo `vender-natural` | `kayo-4767` (3 pacientes "sem perfil") |
| 3º | demais objetivos | `kayo-4759` ("o investimento de maior retorno") |

A seleção vive em `diagnostico.js`, no objeto `PRINTS` e nos mapas `porGargalo` e `porObjetivo`.
Para trocar um print, mexa só ali.

## ⚠️ Prints que ficaram de fora, e por quê

Dos 22 enviados, **6 não podem ir para uma página pública**: têm **nome de paciente** visível
(planilhas de faturamento e o resumo de fechamentos), e um deles traz ainda **dado clínico**
(IMC e medicação). O Dr. Kayo autorizou o uso da conversa dele; os pacientes dele não
autorizaram nada.

`IMG_4751` · `IMG_4752` · `IMG_4753` · `IMG_4754` · `IMG_4757` · `IMG_4765`

O `IMG_4751` é uma pena, porque tem a melhor frase do lote ("se não fosse por você, seriamente,
eu teria faturado 60% disso"). Se o Guilherme quiser usar, o caminho é **pedir ao Dr. Kayo um
print novo** com os nomes trocados por iniciais, não borrar o atual.

Os demais que sobraram (4746, 4749, 4755, 4758, 4760, 4762, 4764, 4766) são bons mas redundantes
com os 8 escolhidos. Ficam como reserva se algum precisar ser trocado.

## ⚠️ Datas nas legendas

Dois prints (`4756` e `4759`) são **do meio de maio**, quando o mês ainda estava em R$ 64.761 e
R$ 75.571. O texto do relatório cita o fechamento, R$ 86.771. Sem contexto isso parece
contradição, então **a legenda diz a data de propósito**. Se mexer nessas legendas, mantenha a
referência temporal.

## Reprocessar

Recorte usado: `top=290`, `bottom=1600` (prints com teclado aberto) ou `2530` (sem teclado),
sobre o original de 1284x2778. Depois `thumbnail(720)` e WebP qualidade 82.
