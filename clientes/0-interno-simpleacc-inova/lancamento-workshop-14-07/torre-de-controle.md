# Torre de Controle — Workshop 14/07

> Bloco 3 do HANDOFF. É o **chão de fábrica**: nada é agendado fora daqui.
> Modelada na Torre do Tarso. Uma **aba por canal**; cada linha tem
> **data · dia · período · status · link da copy**. Isso é o que evita mensagem
> esquecida ou duplicada.

**Abas (no Google Sheets):** `Disparos Grupo` · `Troca de Nome/Grupo` ·
`Disparos API (base)` · `URA e SMS`.

O arquivo `torre-de-controle.csv` traz **tudo num sheet só** (coluna `Canal`
filtra por aba). Importe no Sheets e, se quiser, quebre em abas por `Canal`.

**Legenda de Status:** `A fazer` · `Copy pronta` · `Agendado` · `Enviado` · `—`

## Calendário-mãe (evento 14/07/2026, terça)

| Data | Dia | Marco |
| --- | --- | --- |
| 07/07 | ter | Captação abre · **disparo base #1** |
| 08/07 | qua | **disparo base #2** |
| 09/07 | qui | Grupo: faltam **5 dias** |
| 11/07 | sáb | Grupo: faltam **3 dias** |
| 12/07 | dom | Grupo: faltam **2 dias** |
| 13/07 | seg | Grupo: **é amanhã** |
| 14/07 | **ter** | **EVENTO 14h–17h** · é hoje · URA+SMS · faltam 2h · começando · cadê você |
| 15/07 | qua | Pós D+1 · **libera gravação (order bump)** |
| 16–21/07 | qua–ter | Pós D+2 a D+7 (aplicação, replay, encerramento) |

## Régua completa (espelho do CSV)

### Aba: Disparos Grupo
| Data | Dia | Período | Peça | Status | Link copy |
| --- | --- | --- | --- | --- | --- |
| na compra | — | imediato | Boas-vindas + regras do grupo + link da pesquisa | A fazer | comunicacao.md#g0 |
| 07–13/07 | — | imediato | (auto) Entrada no grupo → link da pesquisa | A fazer | comunicacao.md#g0 |
| 09/07 | qui | manhã | Faltam 5 dias — o que você vai sair sabendo | A fazer | comunicacao.md#g5 |
| 11/07 | sáb | manhã | Faltam 3 dias — prova/mecanismo | A fazer | comunicacao.md#g3 |
| 12/07 | dom | tarde | Faltam 2 dias — quebra de objeção | A fazer | comunicacao.md#g2 |
| 13/07 | seg | noite | É amanhã — link/agenda + o que preparar | A fazer | comunicacao.md#g1 |
| 14/07 | ter | 08h | É hoje — link da sala + horário | A fazer | comunicacao.md#h-hoje |
| 14/07 | ter | 12h | Faltam 2h | A fazer | comunicacao.md#h-2h |
| 14/07 | ter | 13h50 | Tá começando — entra agora | A fazer | comunicacao.md#h-start |
| 14/07 | ter | 14h30 | Cadê você — ainda dá tempo | A fazer | comunicacao.md#h-cade |
| 15/07 | qua | manhã | Pós D+1 — replay + chamada pra aplicação | A fazer | comunicacao.md#p1 |
| 16/07 | qua | — | Pós D+2 — case/urgência | A fazer | comunicacao.md#p2 |
| 17–21/07 | — | — | Pós D+3 a D+7 — aplicação + encerramento | A fazer | comunicacao.md#p3 |

### Aba: Troca de Nome/Grupo
| Data | Dia | Período | Ação | Status |
| --- | --- | --- | --- | --- |
| 13/07 | seg | noite | Trocar nome do grupo → "⚡ É AMANHÃ · Workshop FLD" | A fazer |
| 14/07 | ter | 08h | Trocar nome → "🔴 HOJE 14h · Workshop FLD" | A fazer |
| 14/07 | ter | 13h50 | Trocar nome → "🔴 AO VIVO AGORA · entra na sala" | A fazer |

### Aba: Disparos API (base ~2k)
| Data | Dia | Período | Canal | Peça | Status | Link copy |
| --- | --- | --- | --- | --- | --- | --- |
| 07/07 | ter | manhã | WhatsApp API + E-mail | Abertura da captação — oferta do ingresso | A fazer | comunicacao.md#base1 |
| 08/07 | qua | manhã | WhatsApp API + E-mail | Reforço + prova + urgência (lote) | A fazer | comunicacao.md#base2 |

### Aba: URA e SMS (dia do evento)
| Data | Dia | Horário | Canal | Alvo | Peça | Status |
| --- | --- | --- | --- | --- | --- | --- |
| 14/07 | ter | 09h | SMS | tag `comprou_ingresso` | É hoje 14h — link da sala | A fazer |
| 14/07 | ter | 12h | SMS | tag `comprou_ingresso` | Faltam 2h | A fazer |
| 14/07 | ter | 13h45 | URA (ligação) | tag `comprou_ingresso` | Começa em 15 min — entra na sala | A fazer |
| 14/07 | ter | 14h20 | SMS | não-presentes | Tá rolando, entra agora | A fazer |

## Rotina manual crítica (não terceiriza pra "torcer")
- **Fallback do grupo 2x/dia (12h e 18h):** cruzar quem comprou × quem entrou no
  grupo e **adicionar na mão** quem faltou (com secretária/SDR). Registrar na aba
  `Disparos Grupo` como controle diário.
