# Integração Make do quiz

O quiz não fala com o Make direto do navegador. O caminho é:

```
quiz (browser) → /api/lead (função serverless na Vercel) → Make → GHL + Planilha
```

A função `api/lead.js` existe porque **ad blockers bloqueiam silenciosamente
`fetch()` do browser para `hook.us2.make.com`**. Em julho de 2026 isso derrubou a
captação por uma semana, com o Make registrando zero execuções e os leads sumindo
sem rastro. O proxy no servidor resolve: para o navegador, a requisição é
same-origin.

> Se algum dia alguém mudar `WEBHOOK_URL` no `App.tsx` para apontar direto ao
> Make, a captação volta a quebrar de forma invisível. Não faça isso.

## Cenário

| | |
|---|---|
| Nome | `[Gustavo Ono] Quiz Novo (quiz-gustavo-ono.vercel.app)` |
| ID | `5619844` |
| Time (Make) | `1317940` — Time Simple Acc |
| Webhook | hook `2557867`, label `quiz-gustavo-ono-novo` |
| Planilha | `1oOgRcaOIWHCMHXgIxywLQ-81qEhosvEGrtKqQfPQnpM`, aba `quiz novo` |
| CRM | GHL, location "CRM Gustavo Ono", pipeline "Funil do Marketing", etapa "New Lead" |

Fluxo dos módulos: **Webhook → criar contato no GHL → criar oportunidade → gravar
linha na planilha.**

## Backup

`blueprint-5619844-2026-08-12-antes-rota.json` é o blueprint exatamente como
estava antes de acrescentarmos os campos `rota` e `curso_anterior`. Para
restaurar, use `scenarios_update` com esse JSON inteiro (o update **substitui** o
blueprint, não faz merge).

## Campos enviados pelo funil

Além de `nome`, `email`, `whatsapp` e os cinco `utm_*`:

| Campo | Origem | Observação |
|---|---|---|
| `combinacao` | Q0 perfil | |
| `carro_chefe` | Q1 | decide a rota junto com `seguranca` |
| `tempo` | Q2 | |
| `motivacao` | Q3 | |
| `frustracao` | Q4 | usado no diagnóstico dos pilares |
| `canal_de_vendas` | Q5 | |
| `impedimento` | Q6 | usado no diagnóstico dos pilares |
| `curso_anterior` | Q7 | **campo novo**, substituiu `dominasse` |
| `seguranca` | Q8 faturamento | nome herdado; o conteúdo é faturamento |
| `rota` | calculado | **campo novo**, `A` ou `B` |

`rota` é o campo que permite medir se a segmentação aprovada em 07/08 funcionou.
Sem ele na planilha, não dá para comparar conversão por rota.

## Estado atual (12/08/2026)

Alterações já aplicadas e testadas em produção:

- Interface do webhook: `dominasse` saiu, entraram `curso_anterior` e `rota`.
- GHL: o custom field `BMPRUmFSEmt7qXObeGe7` passou a receber `curso_anterior`.
  **Esse campo ainda se chama "Dominasse" no GHL** — vale renomear lá para
  "Curso anterior", senão o rótulo engana quem olha o contato.
- Planilha: colunas **R = `Rota`** e **S = `Curso Anterior`** criadas na aba
  `quiz novo`. A coluna L (`Dominasse`) foi mantida com o histórico e simplesmente
  para de receber dados.
- Sheets do cenário: mapeamento atualizado para as duas colunas novas.

Teste feito em 12/08 disparando o webhook direto: a linha entrou com
`Rota = A` e `Curso Anterior` preenchido, com todos os demais campos intactos.
**A linha e o contato de teste ("TESTE SimpleAcc IGNORAR") precisam ser
apagados** da planilha e do GHL.

### O que ainda não foi feito

- `rota` não vai para o GHL, só para a planilha. Levar para o CRM como **tag**
  seria o ideal (o SDR veria na hora se é Rota A ou B), mas o módulo de criação
  de contato tem `onerror: Ignore`: se o formato da tag estiver errado, o contato
  falha em silêncio e a oportunidade seguinte quebra junto. Merece um teste
  dedicado antes de entrar.
