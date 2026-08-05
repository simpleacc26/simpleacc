# Automação: Kiwify -> CRM (Make/GHL) + boas-vindas WhatsApp (GHL)

> Bloco 2 do HANDOFF. Compra na Kiwify -> marca no CRM + manda boas-vindas no
> WhatsApp com link do grupo e da pesquisa.

## Decisão final
- **CRM:** feito no **Make**, cenário do CEO `LP [L01] - Compra` (id `5582298`):
  Webhook Kiwify -> busca contato no GHL -> tag `comprou ingresso` -> oportunidade.
- **WhatsApp de boas-vindas:** feito no **GHL** (número oficial já conectado),
  disparado pela tag `comprou ingresso`. Passo a passo e template em
  **`ghl-boas-vindas-whatsapp.md`**.

Por que GHL e não Z-API: o GHL já tem número WhatsApp conectado (oficial, sem risco
de ban). O Z-API tinha incerteza (sessão do número + `client-token: N/A`) que não dá
pra garantir pelo Make. Testei a rota Z-API dentro do cenário e **reverti** — o
cenário do Make voltou a ser **só CRM**.

## Estado atual (Make)
- Webhook Kiwify `LP [L01] - Compra (Kiwify)` (id `2541175`) -> hook `3hpkws13...`
  (já configurado na Kiwify pelo CEO).
- Cenário `LP [L01] - Compra` (id `5582298`): **inativo** e marcado inválido — o
  Webhook precisa **Redeterminar estrutura de dados** (tem 1 compra na fila). Depois
  disso, ativar.
- Cenário standalone `[Simple] Kiwify - Boas-vindas Workshop 14-07` (id `5584763`):
  **sem uso**, pode apagar.

## Pra ficar 100% no ar
1. **GHL:** subir o template + criar o workflow (ver `ghl-boas-vindas-whatsapp.md`).
2. **Make:** abrir `LP [L01] - Compra` -> Webhook -> Redeterminar estrutura -> ativar
   (é ele que grava a tag que dispara o GHL).
3. **Testar:** 1 compra-teste -> confere tag no GHL + WhatsApp chegando.

## Próximas camadas (opcionais)
- Redisparo/lembrete pra quem não entrou no grupo.
- Régua completa do grupo/URA/SMS (ver Torre de Controle + `comunicacao.md`).
