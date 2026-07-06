# Torre de Controle — Workshop 14/07 (modelo Rapha/Tarso, 5 abas)

> Bloco 3 do HANDOFF. **Chão de fábrica**: nada é agendado fora daqui.
> Espelha as **5 abas** do cockpit do Rapha/Tarso, adaptadas pra nossa realidade
> (workshop de 1 dia, 14/07, em vez de lançamento com CPLs).
>
> **Fluxo sugerido:** você duplica a planilha do Rapha (mantém abas, formatação e
> os dropdowns de Status) e cola em cada aba o conteúdo abaixo. Cada aba tem um
> CSV pronto em `torre/` pra colar direto.

**Legenda de Status (dropdown do Rapha):** `Não iniciado` · `Disparo agendado` ·
`Disparo realizado`. (No nosso preenchimento inicial deixei `A fazer`.)

**Fases:** `Captação` (07–08/07) · `Aquecimento` (09–13/07) · `Evento` (14/07) ·
`Vendas` (15–21/07, pós-evento → aplicação).

---

## Aba 1 — SOS LINKS  (`torre/1-sos-links.csv`)

### Links úteis
| Item | Link |
| --- | --- |
| Grupo do evento (WhatsApp) | `{{link_grupo}}` |
| Pesquisa (entrada do grupo) | `{{link_pesquisa}}` |
| Checkout (Kiwify) | `{{link_checkout}}` |
| Área de membros (Kiwify) | `{{link_membros}}` |
| Sala do evento (ao vivo) | `{{link_sala}}` |
| Replay do evento | `{{link_replay}}` |
| Aplicação (pós-evento) | `{{link_aplicacao}}` |
| Suporte / direto | `{{link_suporte}}` |
| Automação Make (webhook Kiwify) | `https://hook.us2.make.com/wq9of44lzzvjypcy3r7piwuyglg5rngy` |
| Banner do checkout | `criativos/banner-checkout.png` |
| Apostila (Workbook) | `apostila/apostila.html` |
| Brandbook Simple | `../marca/brandbook.html` |

> Rapha tem colunas de CPLs (canal VEX / RAPHA) — **não se aplicam** ao nosso
> evento de 1 dia. Trocadas por *Sala/Replay* acima.

### Datas
| Marco | Data | Dia |
| --- | --- | --- |
| Captação abre | 07/07 | ter |
| Disparo base #1 | 07/07 | ter |
| Disparo base #2 | 08/07 | qua |
| **Evento — Workshop (14h–17h)** | **14/07** | **ter** |
| Libera gravação (order bump) | 15/07 | qua |
| Abre aplicações | 15/07 | qua |
| Fecha aplicações da semana | 21/07 | ter |

---

## Aba 2 — DISPAROS GRUPOS  (`torre/2-disparos-grupos.csv`)
| Fase | Base | Data | Dia | Período | Status | Link da copy |
| --- | --- | --- | --- | --- | --- | --- |
| Captação | Novo comprador | na compra | — | imediato | A fazer | D1 Boas-vindas (Z-API) · comunicacao.md#D1 |
| Aquecimento | Grupo | 09/07 | qui | manhã | A fazer | G5 Faltam 5 dias · comunicacao.md#g5 |
| Aquecimento | Grupo | 11/07 | sáb | manhã | A fazer | G3 Faltam 3 dias · comunicacao.md#g3 |
| Aquecimento | Grupo | 12/07 | dom | tarde | A fazer | G2 Faltam 2 dias · comunicacao.md#g2 |
| Aquecimento | Grupo | 13/07 | seg | noite | A fazer | G1 É amanhã · comunicacao.md#g1 |
| Evento | Grupo | 14/07 | ter | 08h | A fazer | H0 É hoje · comunicacao.md#h-hoje |
| Evento | Grupo | 14/07 | ter | 12h | A fazer | H1 Faltam 2h · comunicacao.md#h-2h |
| Evento | Grupo | 14/07 | ter | 13h50 | A fazer | H2 Tá começando · comunicacao.md#h-start |
| Evento | Grupo | 14/07 | ter | 14h30 | A fazer | H3 Cadê você · comunicacao.md#h-cade |
| Vendas | Grupo | 15/07 | qua | manhã | A fazer | P1 Replay + aplicação · comunicacao.md#p1 |
| Vendas | Grupo | 16/07 | qua | — | A fazer | P2 Case/urgência · comunicacao.md#p2 |
| Vendas | Grupo | 17–21/07 | — | — | A fazer | P3 D+3 a D+7 · comunicacao.md#p3 |

---

## Aba 3 — TROCA DE NOME  (`torre/3-troca-de-nome.csv`)
| Fase | Grupo | Data | Dia | Período | Hora | Status | Nome do Grupo |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Captação | Grupo do evento | 07/07 | ter | captação | — | A fazer | Workshop Funil de Lead Dinâmico · 14/07 |
| Aquecimento | Grupo do evento | 13/07 | seg | pré | noite | A fazer | ⚡ É AMANHÃ 14H · Workshop FLD |
| Evento | Grupo do evento | 14/07 | ter | evento | 08h | A fazer | 🔴 HOJE 14H · Workshop FLD |
| Evento | Grupo do evento | 14/07 | ter | evento | 13h50 | A fazer | 🔴 AO VIVO AGORA · entra na sala |
| Vendas | Grupo do evento | 15/07 | qua | pós | manhã | A fazer | 🎬 REPLAY no ar · faça sua aplicação |
| Vendas | Grupo do evento | 21/07 | ter | pós | — | A fazer | ⏳ Últimas vagas da semana |

---

## Aba 4 — DISPAROS API (base ~2k, 1:1)  (`torre/4-disparos-api.csv`)
| Fase | Base | Data | Dia | Período | Janela | Status | Link da copy |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Captação | Lista geral | 07/07 | ter | manhã | Janela 1 | A fazer | BASE 1 Abertura · comunicacao.md#base1 |
| Captação | Lista geral | 08/07 | qua | manhã | Janela 2 | A fazer | BASE 2 Reforço/urgência · comunicacao.md#base2 |
| Evento | Lista geral | 14/07 | ter | manhã | Janela 3 | A fazer | É hoje — última chamada (opcional) |

---

## Aba 5 — URA e SMS (dia do evento)  (`torre/5-ura-sms.csv`)
| Fase | Base | Data | Dia | Período | Status | Link da copy |
| --- | --- | --- | --- | --- | --- | --- |
| Evento | tag comprou_ingresso | 14/07 | ter | 09h (SMS) | A fazer | SMS É hoje 14h · comunicacao.md#C |
| Evento | tag comprou_ingresso | 14/07 | ter | 12h (SMS) | A fazer | SMS Faltam 2h · comunicacao.md#C |
| Evento | tag comprou_ingresso | 14/07 | ter | 13h45 (URA) | A fazer | URA Começa em 15 min · comunicacao.md#C |
| Evento | Não-presentes | 14/07 | ter | 14h20 (SMS) | A fazer | SMS Tá rolando, entra agora · comunicacao.md#C |

---

## Rotina manual crítica (não terceiriza pra "torcer")
- **Fallback do grupo 2x/dia (12h e 18h):** cruzar quem comprou × quem entrou no
  grupo e **adicionar na mão** quem faltou (com secretária/SDR).

> ⏳ Aguardando o print da **sua cópia da planilha do Rapha** pra encaixar 100% às
> colunas/dropdowns dela. O conteúdo acima já está na nossa realidade.
