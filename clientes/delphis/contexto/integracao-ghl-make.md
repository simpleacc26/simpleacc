# Integração Quiz → Make → Sheets → GHL (Delphis)

Última atualização: 14/09/2026. Status: **no ar e testado ponta a ponta.**

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
4. `http:ActionSendData` — `POST /opportunities/`, usando `{{3.data.contact.id}}`,
   também com `builtin:Ignore`.

Os dois módulos do GHL ignoram erro de propósito: se o CRM cair, o lead ainda fica na
planilha e nada se perde.

### Filtro no módulo 4

Só cria oportunidade para quem **não** é `FORA POR ORA`. Esse público é perfil errado
para a mentoria e entupiria o pipeline, que precisa servir de fila de trabalho. Ele
continua virando contato com as tags, e o destino dele é o produto de entrada.
Para colocar todo mundo no pipeline, basta remover o filtro do módulo.

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

## Pipeline

`AUTOFOCO · Pré-vendas`, id `sLzZy2TcsVJKlyUsQEzc`. Criado na interface, porque a API do
GHL só lê pipeline, não cria. Estágios, espelhando o manual de pré-vendas:

| Posição | Estágio | Id |
| --- | --- | --- |
| 0 | Lead novo (quiz) ← entrada da automação | `3741327a-232c-4eac-a3f4-d19331ef2075` |
| 1 | Em conversa | `b9ab7abe-afc6-4962-8f0b-93ac2acfa7b9` |
| 2 | Sessão agendada | `ef34a106-0d5d-40f3-9800-d81e4c1922c0` |
| 3 | Sessão realizada | `dd4b1ede-c64d-47e3-a47f-6c85b091b542` |
| 4 | Proposta | `d8d1b05a-f866-4107-91e5-92f23a383433` |
| 5 | Cliente | `ab6265f7-fa68-4835-8b23-66dffa8b87b5` |
| 6 | Perdido | `3caf196d-63d2-4c59-9c91-238c54790245` |

## Teste feito em 14/09/2026

Lead de teste passando pelo webhook, igual o quiz manda. Resultado conferido no CRM:
contato criado, telefone em `+5511987654321`, as três tags certas, os 18 campos
preenchidos, e a oportunidade aberta no estágio de entrada com o nome no formato
`Nome · Padrão`. Dados de teste apagados depois.

O GHL divide o nome completo sozinho: `firstName` fica só com o primeiro nome, que é o
que os templates da fase 2 vão usar na saudação.

## O que falta

1. **Fuso da conta**, ainda em `America/Los_Angeles`. O token não tem escopo de escrita
   em Locations, então precisa ser trocado na interface, em Settings → Business Profile.
2. **Oportunidade do Claudemir**, primeiro lead real que entrou no CRM (14/09, 19:51).
   Ele chegou entre a instalação do módulo 3 e a do módulo 4, então virou contato sem
   oportunidade. Basta abrir uma no estágio de entrada.
3. **Leads anteriores.** Os ~27 leads que já estão na planilha não estão no CRM, porque
   entraram antes da integração. Dá para importar de uma vez, se fizer sentido.

## Pendências de higiene

- A planilha de leads segue aberta para edição por link. Decisão do time em 14/09.
- Apagar da planilha as linhas de teste (`Teste Simple (apagar)`, `Teste GHL Dois (apagar)`
  e as do Renan). No GHL já foram removidas.
- Apagar o cenário temporário 6272276 quando ninguém mais precisar dele.

## Fase 2 (depois desta)

Templates de mensagem no GHL e disparo automático da primeira mensagem e do follow-up,
usando as mensagens do manual de pré-vendas e as tags de classificação como gatilho.
