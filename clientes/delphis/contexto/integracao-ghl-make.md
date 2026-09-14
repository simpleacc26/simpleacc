# Integração Quiz → Make → Sheets → GHL (Delphis)

Última atualização: 14/09/2026. Status: **aguardando autorização da conexão GHL no Make.**

## Peças

| Peça | Identificador |
| ---- | ------------- |
| Funil | `https://autofoco.vercel.app` (pasta `funis/quiz-autofoco`) |
| Webhook Make | `https://hook.us2.make.com/3wzu02g0mdb771irfu6ngavgrp1k6njv` (hook 2766246) |
| Cenário Make | **6134483** — `[Delphis Fonseca] Diagnóstico AUTOFOCO → Sheets` (time 1317940) |
| Planilha de leads | `1I5dn9kDWkCBteLKKaO3-V5y7va2pyZJGGp_KwLPk3H8` |
| Conexão Google | 5139463 — `My Google connection (ssouzadaniel.ads@gmail.com)` |
| GHL location | `Is3rj2clTtHoaWODpqS7` |
| Conexão GHL no Make | **ainda não existe** — ver "Pendência" abaixo |

## Payload que o funil envia

Form-urlencoded, uma chave por coluna. Enviado em `app.js`, função `enviarLead()`.

`data`, `nome`, `whatsapp`, `email`, `classificacao`, `padrao`, `situacao`, `profissao`,
`problema`, `depois`, `tempo`, `custo`, `tentativas`, `objetivo`, `prontidao`, `frente`,
`origem`, `utm_source`, `utm_medium`, `utm_campaign`, `utm_content`, `utm_term`.

- `classificacao` ∈ `QUALIFICADO` · `A NUTRIR` · `FORA POR ORA`
- `padrao` ∈ `O Invisível` · `O Travado` · `O Personagem` · `O Correto`
- `frente` é sempre `Diagnóstico AUTOFOCO` (serve para separar funis futuros)

## Desenho da automação (modelo Ju Godinho)

Referência: cenário **5937136** `V4 - Ju Godinho (Quiz B)`. Mesma espinha, quatro módulos:

1. `gateway:CustomWebHook` — o que já existe hoje.
2. `google-sheets:addRow` — o que já existe hoje. **Não mexer**, a planilha continua sendo a
   fonte de conferência.
3. `highlevel:universal` — `POST /contacts/upsert`, com `locationId`, nome, email, telefone,
   `source`, `tags` e os `customFields` do diagnóstico. Upsert (não create) para não duplicar
   quem responde o quiz duas vezes. Com `builtin:Ignore` no erro.
4. `highlevel:createAnOpportunity` — usa `{{3.body.contact.id}}`, pipeline e estágio de
   entrada, status `open`, título com o nome do lead. Com `builtin:Ignore` no erro.

O `Ignore` nos dois módulos de GHL é o padrão da casa: se o CRM cair, o lead ainda cai na
planilha e nada se perde.

### Tags planejadas no contato

- `diagnostico-autofoco` (fixa, identifica a origem)
- `qualificado` · `a-nutrir` · `fora-por-ora` (vem da `classificacao`)
- `padrao-invisivel` · `padrao-travado` · `padrao-personagem` · `padrao-correto`

As tags de classificação são o gatilho dos templates e do follow-up automático da fase 2,
e por isso precisam ser normalizadas (minúsculas, sem acento, com hífen).

### Pipeline proposto

Espelha o manual de pré-vendas (`estrategia/2026-09-14-script-pre-vendas-delphis.html`):

1. Lead novo (quiz) ← estágio de entrada da automação
2. Em conversa
3. Sessão agendada
4. Sessão realizada
5. Proposta
6. Cliente
7. Perdido

## Pendência que trava o resto

A conexão OAuth da location do Delphis não existe no Make e só pode ser criada por alguém
logado no GHL dele. Foi aberta uma solicitação de credencial no Make:

`https://us2.make.com/1317940/credentials-requests/inbox?requestId=9da45b23-b86f-4496-80f6-61015bdfb82d`

Depois que a conexão existir, a sequência é:

1. `GET /locations/Is3rj2clTtHoaWODpqS7/customFields` para ver o que já existe
2. Criar os campos personalizados que faltarem (um por resposta do quiz)
3. `GET /opportunities/pipelines` para pegar pipeline e estágio (criar se não houver)
4. Adicionar os módulos 3 e 4 ao cenário 6134483
5. Testar com um lead de teste e conferir contato, campos, tags e oportunidade no CRM

## Fase 2 (depois desta)

Templates de mensagem no GHL e disparo automático da primeira mensagem e do follow-up,
usando as mensagens do manual de pré-vendas e as tags de classificação como gatilho.
