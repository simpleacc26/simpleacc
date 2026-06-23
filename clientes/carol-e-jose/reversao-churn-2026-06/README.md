# Reversão de churn — Carol e José (jun/2026)

Trabalho de **reversão de churn** do cliente Carol e José (ÚNICOS Club), aberto
após a reunião de tratativa de **23/06/2026**. O cliente está frustrado com a
falta de resultado (6º mês, ~R$ 40 mil investidos, zero venda) e há risco de
cancelamento com chargeback de ~R$ 40 mil.

Objetivo: dar suporte ao **plano de 3 passos do CEO (Daniel)** — diagnóstico,
caixa rápido e ajuste de funil — que será enviado a Carol e José na manhã
seguinte.

## Documentos

| Arquivo | O que é |
| --- | --- |
| [`01-resumo-da-situacao.md`](./01-resumo-da-situacao.md) | Resumo executivo da situação e do plano. |
| [`02-tarefas-em-aberto.md`](./02-tarefas-em-aberto.md) | Ata: todas as tarefas em aberto com responsável (ou "a definir"). |
| [`03-expectativas-jose.md`](./03-expectativas-jose.md) | O que o José espera e o que precisamos entregar. |
| [`04-diagnostico-dados.md`](./04-diagnostico-dados.md) | Diagnóstico da base de leads (o achado central). |

## Materiais de origem

- `materiais/reuniao-2026-06-23-alinhamento-gemini.pdf` — anotações + transcrição da reunião de hoje.
- `materiais/reuniao-2026-06-17-pitstop-gemini.md` — anotações + transcrição do Pit Stop anterior.
- `materiais/leads-organizados.csv` — base de leads do quiz analisada.
- `materiais/analise-leads.py` — script que reproduz o diagnóstico de dados.

## Achado central (resumo de uma linha)

O funil sofre de **contatabilidade invertida**: quanto maior o faturamento, menor
a chance de o lead deixar contato (acima de R$ 5M, só **1,7%** deixam WhatsApp).
Há **114 leads no ICP**, mas só **3** são abordáveis. O problema é de
**captura/funil**, não de volume.

## Referências externas (do grupo interno)

- Skill/persona de análise "Fernanda Face" (cientista de dados) — base do Passo 1.
- App de apoio: https://simple-revenue-intelligence.vercel.app/
- Diagnóstico compartilhado pelo Daniel: link `claude.ai/share` (no grupo interno).
