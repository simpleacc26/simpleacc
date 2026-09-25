# Make · cenário do quiz da Ju

Cenário **5937136 — "V4 - Ju Godinho (Quiz B)"**, no time 1317940 da org 5039063.
Webhook `xm49y796rjznhxylkfx1grmgg9wgkbc2`, hook id 2688400.

```
webhook → Google Sheets (addRow) → GHL upsert de contato → GHL cria oportunidade
```

## Alterações de 25/09/2026

**1. Três campos novos chegando do quiz.** `lead_id`, `gargalo_id` e `rota_id`
entraram na interface do webhook e no mapeamento da planilha, nas colunas
**S, T e U** da aba `V4 - Quiz`. Foram acrescentadas no fim de propósito: inserir
no meio deslocaria tudo e quebraria fórmula, filtro e análise existentes.

O `lead_id` já era enviado pelo quiz desde agosto e **nunca chegava na planilha**,
porque não estava na interface do webhook. É ele que casa o lead com os eventos
de GTM da `oferta.html`.

**2. Filtro anti-teste no módulo do GHL.** O módulo 3 só roda quando o `lead_id`
não contém `teste-simpleacc`. Sem isso, qualquer teste de ponta a ponta cria
contato e oportunidade falsos no CRM da cliente, e a Ana vê na fila.
Para testar o fluxo inteiro sem sujar o CRM, basta usar um `lead_id` com esse
prefixo: a linha entra na planilha e o GHL é pulado.

## Reverter

O blueprint anterior está em `5937136-blueprint-antes-de-25-09.json`. Para voltar,
`scenarios_update` no cenário 5937136 com aquele JSON inteiro, sem o campo `_nota`.

## O que ainda não foi feito

Os três campos novos **não vão para o GHL**, só para a planilha. Levar exige
criar os custom fields correspondentes na conta da Ju e acrescentar os ids no
corpo do módulo 3. Não foi feito porque criar campo no CRM da cliente é decisão
dela, não nossa.

## Como isso foi testado

Webhook disparado por fora com um lead marcado `teste-simpleacc-rota-01`. A
execução gastou **2 operações**, ou seja, só webhook e planilha: o filtro barrou
o GHL como esperado. A linha entrou com as três colunas preenchidas, e depois foi
removida com uma trava que só deixava apagar se a linha fosse mesmo a de teste.
A aba voltou de A1:U165 para **A1:U164**, que é o número de linhas de antes.
