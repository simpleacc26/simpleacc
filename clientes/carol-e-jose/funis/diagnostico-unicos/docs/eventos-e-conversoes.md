# Eventos e conversões — Diagnóstico ÚNICOS

Regra de ouro: **só o lead qualificado (o que cai na aba _Qualificados_) pode contar
como conversão no Gerenciador da Meta.** O desqualificado é redirecionado **antes** do
formulário, então nem chega a disparar o evento de lead — o funil já isola isso no código
(`diagnostico.html`, função `finalize()`).

## Mapa de eventos (dataLayer / GTM `GTM-T9XG58XR`)

| Evento | Quando dispara | Quem | Usar como conversão de lead? |
|---|---|---|---|
| `diag_inicio` | abre o diagnóstico | todos | ❌ (é tráfego/topo) |
| `diag_pergunta` | cada pergunta respondida | todos | ❌ |
| `diag_resultado` | resultado calculado (antes de rotear) | **todos, inclusive desqualificado** | ❌ **NUNCA** — carrega `aprovacao`/`rota` e engana |
| `diag_fora_papel` | não é dono/sócio → sai | desqualificado | ❌ |
| `diag_abaixo_piso` | faturamento < R$1M → sai | desqualificado | ❌ |
| `diag_lead` | enviou o formulário | **só qualificado** | ⚠️ pode, mas prefira o de baixo |
| **`diag_lead_aprovado`** | enviou o formulário e passou nos critérios | **só qualificado** | ✅ **é ESTE** |
| `diag_agendamento_click` | clicou em agendar | qualificado | ✅ (conversão de fundo, opcional) |
| `diag_comunidade_click` | clicou no grupo (desqualificado) | desqualificado | ❌ |

Todos carregam `utm_content` (criativo) + `aprovacao` (pleno/tier2) + `balde`, para medir
**custo por lead aprovado, por criativo**.

## Como ligar a conversão na Meta (via GTM) sem contaminar

1. **Tag** = Meta Pixel / Conversions API com o evento padrão **`Lead`**.
2. **Gatilho** = *Custom Event* com nome **exatamente** `diag_lead_aprovado`.
   - Não use `All Pages`/`PageView`, nem `diag_inicio`, `diag_resultado` ou `diag_lead`
     como gatilho da conversão de lead.
3. Passe `utm_content` (e `aprovacao`, `balde`) como parâmetros do evento, lendo do
   dataLayer, para o Gerenciador atribuir por criativo.
4. **Otimize a campanha para esse evento `Lead`** (não para PageView/tráfego).

> Por que fica limpo: o desqualificado sai em `diag_fora_papel`/`diag_abaixo_piso` e
> **dá `return` antes do formulário** — é impossível ele disparar `diag_lead_aprovado`.
> A contagem antiga contaminava porque o Pixel do funil velho disparava `Lead` para todos.

## Conferência rápida (quando for validar)

- No **preview do GTM** (Tag Assistant), percorra o quiz como **desqualificado** (ex.:
  "Diretor/executivo" ou faturamento "Até R$1 milhão"): só devem aparecer
  `diag_resultado` + `diag_fora_papel`/`diag_abaixo_piso`. **Nenhum** `diag_lead*`.
- Percorra como **qualificado** (dono/sócio + ≥ R$1M) e envie o formulário: aí sim
  aparecem `diag_lead` e `diag_lead_aprovado`.
