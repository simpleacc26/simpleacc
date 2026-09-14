# Integração Quiz → Make → Sheets → GHL (Delphis)

Última atualização: 14/09/2026. Status: **contato no CRM implementado, falta o pipeline e a oportunidade.**

## Peças

| Peça | Identificador |
| ---- | ------------- |
| Funil | `https://autofoco.vercel.app` (pasta `funis/quiz-autofoco`) |
| Cenário Make | **6134483** — `[Delphis Fonseca] Diagnóstico AUTOFOCO → Sheets + GHL` (time 1317940) |
| Webhook | hook 2766246 (o endereço fica em `app.js`, `LEADS_ENDPOINT`) |
| Planilha de leads | `1I5dn9kDWkCBteLKKaO3-V5y7va2pyZJGGp_KwLPk3H8` |
| Conexão Google | 5139463 — `My Google connection (ssouzadaniel.ads@gmail.com)` |
| GHL location | `Is3rj2clTtHoaWODpqS7` — `Delphis da Fonseca's Account` |
| Autenticação no GHL | **Private Integration token**, guardado só no módulo 3 do cenário. Não fica neste repositório. |
| Cenário temporário | 6272276 — laboratório de teste, pode apagar quando tudo estiver validado |

## Por que token e não OAuth

A conexão OAuth da location exige um login no navegador, que ninguém da automação
consegue fazer sozinho. O token de integração privada foi gerado dentro do GHL do
Delphis e entra como header `Authorization: Bearer` no módulo HTTP. Não expira como o
OAuth e não precisa de ninguém clicando no Make. Se um dia for revogado, basta trocar o
header do módulo 3.

## Como está o cenário hoje

1. `gateway:CustomWebHook` — recebe o lead do quiz.
2. `google-sheets:addRow` — grava na planilha. Fonte de conferência, não mexer.
3. `http:ActionSendData` — `POST /contacts/upsert` no GHL, com `builtin:Ignore` no erro.
   Se o CRM cair, o lead ainda cai na planilha e nada se perde.

O módulo de oportunidade ainda não existe, porque depende de um pipeline.

### Campos personalizados criados no GHL

Dezoito campos, um por resposta do quiz, todos com o prefixo `AUTOFOCO ·`. Os ids ficam
no corpo do módulo 3. Nome, e-mail e telefone vão para os campos nativos do contato.

### Telefone

O funil manda `(11) 98765-4321` e o módulo converte para E.164 (`+5511987654321`) antes
de enviar. Sem isso o disparo de mensagem da fase 2 não funciona.

### Tags gravadas no contato

- `diagnostico-autofoco`, fixa, identifica a origem
- `qualificado` · `a-nutrir` · `fora-por-ora`, derivada da `classificacao`
- `padrao-invisivel` · `padrao-travado` · `padrao-personagem` · `padrao-correto`

São elas que vão disparar os templates e o follow-up automático da fase 2.

## O que falta

1. **Pipeline.** A API do GHL só lê pipelines, não cria. Precisa ser feito na interface,
   com estes estágios, espelhando o manual de pré-vendas:
   Lead novo (quiz) · Em conversa · Sessão agendada · Sessão realizada · Proposta ·
   Cliente · Perdido.
2. **Módulo 4**, a oportunidade, que usa o `contact.id` devolvido pelo módulo 3.
3. **Teste ponta a ponta** com um lead real passando pelo quiz.

## Pendências de higiene

- A planilha de leads continua compartilhada como "qualquer pessoa com o link pode editar",
  com nome, telefone e e-mail dos leads. Precisa ser restrita.
- O fuso da conta GHL está em `America/Los_Angeles`. Deveria ser `America/Sao_Paulo`,
  senão agendamento e automação por horário saem errados.
- Apagar da planilha as linhas de teste e do GHL o contato `teste simple (apagar)`.

## Fase 2 (depois desta)

Templates de mensagem no GHL e disparo automático da primeira mensagem e do follow-up,
usando as mensagens do manual de pré-vendas e as tags de classificação como gatilho.
