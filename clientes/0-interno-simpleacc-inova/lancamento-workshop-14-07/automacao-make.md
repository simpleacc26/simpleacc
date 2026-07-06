# Automação (Make): Kiwify -> CRM (GHL) + boas-vindas WhatsApp

> Bloco 2 do HANDOFF. Compra na Kiwify -> marca no CRM + manda boas-vindas no
> WhatsApp (com link do grupo e da pesquisa).

## Arquitetura final (consolidada, 1 webhook)

A Kiwify já aponta pro webhook do CEO (`LP [L01] - Compra (Kiwify)`). Em vez de
criar um 2º webhook, o envio de WhatsApp foi **colocado dentro do cenário do CEO**,
com um **Router** logo após a entrada, pra rodar em paralelo ao CRM (o WhatsApp
dispara mesmo se o GHL falhar).

- **Webhook Kiwify:** `LP [L01] - Compra (Kiwify)` (id `2541175`) ->
  `https://hook.us2.make.com/3hpkws13pqesabk9j3reyu4je4qvb63c` (já configurado na Kiwify)
- **Cenário:** `LP [L01] - Compra` (id `5582298`) — **INATIVO**
  - `Webhook` -> `Router`
    - **Rota 1 (CRM/GHL, do CEO, intacta):** busca contato por e-mail -> tag
      "comprou ingresso" -> cria oportunidade no pipeline
    - **Rota 2 (nova):** `Z-API · Send a Text Message` = boas-vindas
      - Conexão: `My Z-API connection` (id `6288971`)
      - Telefone: `{{replace(ifempty(1.Customer.mobile; 1.customer.mobile; 1.Customer.phone; 1.customer.phone); "/\D/g"; "")}}` (limpa +/espaços/traços)
      - Copy final aprovada + link do grupo + link da pesquisa (ver `comunicacao.md#D1`)

> O cenário separado que eu tinha criado (`[Simple] Kiwify - Boas-vindas Workshop
> 14-07`, id `5584763`) ficou **redundante** — pode ignorar/apagar. Não está ligado
> à Kiwify, então não dispara nada.

## Pra ativar (Carlos/Daniel, no Make) — 3 passos

1. Abrir o cenário `LP [L01] - Compra`. Ele ainda aparece como **inválido** — isso
   é **anterior** à minha mudança: o **Webhook** precisa "aprender" a estrutura de
   dados. Clica no módulo **Webhook -> Redeterminar estrutura de dados** (tem 1
   compra na fila pra ele aprender). Aí os campos (inclusive o telefone) resolvem.
2. **Testar (Run once):** confere na Rota 2 se o telefone saiu com o **55** na
   frente. Se vier sem o 55, me avisa que eu ajusto a fórmula pra prefixar.
3. **Ativar** (toggle ON). Pronto: toda compra -> tag no CRM + WhatsApp de boas-vindas.

⚠️ **Atenção:** há **1 compra na fila** do webhook. Ao ativar, ela é processada
na hora (manda o WhatsApp pra esse comprador). Se for um teste antigo e não quiser
disparar pra essa pessoa, limpe a fila do webhook antes de ativar.

## Próximas camadas (opcionais, quando quiser)
- **Redisparo 60 min** pra quem não entrou no grupo (Sleep + filtro).
- **Registro em planilha** (nome/telefone/UTM) além do GHL.
