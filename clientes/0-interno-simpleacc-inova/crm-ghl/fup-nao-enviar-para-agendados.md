# FUP não envia para quem já está Agendado (GHL)

**Tema:** CRM / GoHighLevel — automações de Follow-up (FUP)
**Conta (location):** `h8nI5fhCDTeo8rjNUi01`
**Data:** 2026-06-29
**Pessoas:** Daniel (SimpleAcc) · Thamiris (SDR)

## Problema

A automação **QUASE OFICIAL - FUP 1 - Follow-up Automático 1** continuava
mandando mensagem de follow-up para leads que **já tinham agendado**. A SDR
(Thamiris) pediu: "tem como a automação não enviar mensagem pra quem já está
agendado?".

### Por que acontecia

Olhando o fluxo do QUASE OFICIAL - FUP 1:

- **Gatilhos:** 4x "Etapa do funil alterada" (entra quando o lead vai pra uma
  etapa de *Follow up* nos funis *Indicações Simple* e *Pré Vendas Simple*).
- **Fluxo:** Wait (com restrição de fim de semana) → WhatsApp
  `dia_um_mensagem_dois` → Wait → **Condition** que só checa
  **"Contact replied"**:
  - não respondeu (`False`) → manda a próxima mensagem;
  - respondeu (ramo `None`) → **Remove from Workflow**.

A **única forma de sair era respondendo**. Quem **agendava** (ia pra etapa
"Agendado") mas não "respondia" no critério da condição **continuava no fluxo**
e seguia recebendo follow-up — inclusive parado num passo de **Wait**.

### O que muda no GHL quando o lead agenda (confirmado pela SDR)

1. Entra uma **tag** de agendado.
2. O lead **muda de etapa na pipeline** para **"Agendado"**.
   - Esteira de exemplo: `follow 1, 2, 3 → Agendado → follow 4, 5, 6 → descartado`.

## Solução adotada — workflow "trava" (kill-switch)

Em vez de mexer na Condition do FUP (frágil: só protege o próximo envio e não
tira quem está parado num Wait), criamos um **workflow separado** que **remove o
lead de todos os FUPs no instante em que ele vira "Agendado"**.

**Workflow:** `KILL - Remover do FUP ao Agendar`

- **Gatilho 1 — Etapa do funil alterada**
  - Filtro: `No pipeline = Indicações Simple - SDR 1`
  - Filtro: `Etapa do pipeline = Agendado`
- **Gatilho 2 — Etapa do funil alterada** (cópia do 1)
  - Filtro: `No pipeline = Pré Vendas Simple - SDR 1`
  - Filtro: `Etapa do pipeline = Agendado`
- *(reforço opcional, não usado nesta versão)* Gatilho por
  `Etiqueta do contato (Tag) = [tag de agendado]`.
- **Ação — Remover do fluxo de trabalho (Remove from Workflow)**
  - Selecionar o `QUASE OFICIAL - FUP 1 - Follow-up Automático 1 - Simple Acc`
    (e quaisquer outros FUPs que existam).
- **Publicar** (toggle "Rascunho → Publicar"). Sem publicar, não roda.

Resultado: assim que o lead entra na etapa **Agendado** (em qualquer um dos dois
funis), ele é arrancado do FUP e para de receber mensagem — mesmo parado num
Wait.

## Pegadinhas / lições aprendidas

- **O filtro de etapa é obrigatório.** Só com `No pipeline` o gatilho dispara em
  *qualquer* mudança de etapa do funil (inclusive ao entrar no Follow-up), o que
  removeria o lead na hora errada. Sempre os **dois filtros**: pipeline **E**
  etapa = Agendado.
- **Nome da etapa tem que bater igualzinho.** Confirmar que a etapa se chama
  exatamente "Agendado" em cada funil (cuidado com "AGENDADO" / "Reunião
  Agendada").
- **Cuidado ao selecionar os fluxos na ação Remove from Workflow.** Apareceu um
  `New Workflow : <id>` (fluxo vazio/sem nome) selecionado por engano — tem que
  remover e deixar só os FUPs de verdade.
- **Selecionar TODOS os FUPs** na ação. Se existir FUP 2, 3…, o lead precisa sair
  de todos, senão sai do FUP 1 e continua recebendo dos outros.
- Alternativa descartada: editar a **Condition** dentro de cada FUP (checar
  etapa/tag antes de cada envio). Funciona, mas é mais frágil — não cobre quem
  está parado num Wait e precisa ser repetida a cada mensagem.

## Status

✅ Implementado e publicado pelo Daniel em 2026-06-29.
