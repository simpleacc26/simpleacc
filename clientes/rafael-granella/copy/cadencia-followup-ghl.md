# Cadência de Follow-up automática — GHL (Rafael Granella / Alivance Club)

Guia de construção do workflow de automação no GHL do Rafa, replicando a lógica
validada na conta Simple ("QUASE OFICIAL - FUP 1 - Follow-up Automático 1").
As contas são de agências diferentes — não é possível copiar o workflow
diretamente, então a montagem é manual, etapa por etapa, seguindo este guia.

## Contexto

- **Pipeline do Rafa:** `Leads do Quiz`
- **Etapas de gatilho:** `Follow 1` a `Follow 6` — correspondem aos 6 níveis de
  FUP do documento de estratégia (não respondeu / engajou e parou / quer
  agendar e adia / no-show / fez call e não fechou / relacionamento longo).
- **Templates de WhatsApp:** já aprovados na pasta "Cadência Followup"
  (`dia_um`, `dia_um_dois`, `dia_dois`, `dia_dois_dois`, `dia_tres`,
  `dia_tres_dois`, `dia_quatro`, `dia_cinco`, `dia_oito`, `dia_nove`,
  `dia_dez` — confirmar nomes exatos na lista de 18 modelos).
- **Cadência vai até o dia 10** (não o dia 12 do modelo original da Simple) —
  decisão já tomada pelo time.
- Igual na Simple: qualquer lead que cair em qualquer uma das etapas Follow
  1–6 entra na **mesma** cadência (não é uma cadência por etapa).

## 1. Gatilho

Adicionar um trigger **"Pipeline stage changed"** por etapa (6 no total),
todos no mesmo workflow, todos levando ao mesmo fluxo:

- In pipeline is `Leads do Quiz`
- Pipeline stage is `Follow 1` (repetir trigger para Follow 2, 3, 4, 5, 6)

## 2. Espera inicial (com restrição de fim de semana)

Bloco **Wait**, logo após os gatilhos:

- Selected wait type: `For a set period of time`
- Time period: `3` `hours`
- Advance window: **ligado**
- Resume on: Seg, Ter, Qua, Qui, Sex (Sáb e Dom desmarcados)
- Resume between hours: `09:00 AM` – `06:30 PM`

## 3. Bloco repetido (um por mensagem do dia)

Este é o padrão que se repete para **cada mensagem** da cadência. Construir
uma vez e duplicar (copiar/colar) para as próximas, só trocando o template.

```
[Enviar WhatsApp — template do dia]
        │
   ┌─────┴─────┐
Delivered   Undelivered
   │             │
   │            END
[Wait — 24 horas, SEM restrição de fim de semana]
   │
[Condition: "Contact replied" is "False"]
   │
   ├── Branch (False) ──▶ [próxima mensagem do fluxo — volta ao topo deste bloco]
   │
   └── None (respondeu) ──▶ [Remove from Workflow] ──▶ END
```

Detalhe do bloco **Wait** (diferente do da etapa 2 — este NÃO tem restrição
de fim de semana):
- Selected wait type: `For a set period of time`
- Time period: `24` `hours`
- Advance window: **desligado**

Detalhe do bloco **Condition**:
- Scenario recipe: `Build your own`
- Branch: `Contact replied` = `False`
- None branch (quando nenhuma condição é atendida, ou seja, respondeu):
  `Remove from Workflow` → `END`

## 4. Sequência de mensagens (dia a dia)

Repetir o bloco da etapa 3 nesta ordem, trocando o template a cada vez.
Onde há 2 mensagens no mesmo dia, mandar a segunda logo em seguida (sem
esperar 24h entre as duas — confirmar esse detalhe olhando o template
`dia_um` → `dia_um_dois` na conta da Simple antes de montar, pois nos prints
o wait de 24h ficou entre `dia_um_mensagem_dois` e `dia_dois_mensagem_um`,
não entre as duas mensagens do mesmo dia).

| Ordem | Dia  | Template (Rafa)  |
| ----- | ---- | ----------------- |
| 1     | 1    | `dia_um`          |
| 2     | 1    | `dia_um_dois`     |
| 3     | 2    | `dia_dois`        |
| 4     | 2    | `dia_dois_dois`   |
| 5     | 3    | `dia_tres`        |
| 6     | 3    | `dia_tres_dois`   |
| 7     | 4    | `dia_quatro`      |
| 8     | 5    | `dia_cinco`       |
| —     | 6–7  | **sem contato** (pular — nenhuma mensagem) |
| 9     | 8    | `dia_oito`        |
| 10    | 9    | `dia_nove`        |
| 11    | 10   | `dia_dez`         |

## 5. Fim da cadência

Depois do último bloco (`dia_dez`), se o lead não respondeu:
`Remove from Workflow` → `END`. Não há mais mensagens automáticas depois do
dia 10 (igual ao comportamento observado no fluxo da Simple após o dia 12).

## Pendências / a confirmar com o time antes de publicar

- [ ] Confirmar nomes exatos dos 18 templates da pasta "Cadência Followup"
      (só vimos os 10 primeiros na lista).
- [ ] Confirmar se as 2 mensagens do mesmo dia (ex. `dia_um` → `dia_um_dois`)
      são enviadas em sequência imediata ou com um intervalo curto entre
      elas (manhã/tarde, conforme o doc de estratégia sugere).
- [ ] Ligações (☎️) e áudio pessoal (dia 11 no modelo original) não fazem
      parte da automação — ficam como tarefa manual do time comercial.
- [ ] Testar o workflow em rascunho com um lead de teste antes de publicar.

## Referências

- Documento de estratégia: `Simple Acc — Estratégia ALIVANCE CLUB` (seção
  "CADÊNCIA DE FOLLOW-UP SDR — ALIVANCE CLUB")
- Modelo replicado: workflow `QUASE OFICIAL - FUP 1 - Follow-up Automático 1`
  na conta GHL da Simple
- Call de definição: Carlos Durães & Renan Martini, 03/07/2026
