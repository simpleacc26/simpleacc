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
- `materiais/leads-organizados.csv` — base completa de leads do quiz (472).
- `materiais/leads-76-mqls.csv` — recorte dos 76 MQLs (>R$1M, com contato).
- `materiais/analise-leads.py` — script que reproduz o diagnóstico de dados.

## Achado central (resumo de uma linha)

Os **76 leads de maior valor (>R$1M) já deixaram WhatsApp e e-mail**, mas o
contato deles é capturado num **segundo conjunto de campos do quiz que não chega
ao GHL** — por isso o comercial só recebe lead de baixo valor. Problema
**técnico (mapeamento de campos + integração InLead→GHL)**, não de volume nem de
"lead que não responde". Os 76 são o ativo imediato para reativar.

## Referências externas (do grupo interno)

- Skill/persona de análise "Fernanda Face" (cientista de dados) — base do Passo 1.
- App de apoio: https://simple-revenue-intelligence.vercel.app/
- Diagnóstico compartilhado pelo Daniel: link `claude.ai/share` (no grupo interno).
