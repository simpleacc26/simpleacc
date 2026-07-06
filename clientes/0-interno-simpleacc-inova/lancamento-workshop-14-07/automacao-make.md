# Automação (Make) — Kiwify → boas-vindas + grupo + pesquisa

> Bloco 2 do HANDOFF, **prioridade nº1** (captação já rolando). A única automação
> inegociável: **compra → boas-vindas no WhatsApp pedindo pra entrar no grupo e
> responder a pesquisa.**

## ✅ Já criado no Make (por esta sessão)

Org **Simple Acc** · Team **Time Simple Acc** (1317940) · zona `us2.make.com`.

- **Webhook** "Kiwify - Boas-vindas Workshop 14-07" (id `2542253`)
  URL: **`https://hook.us2.make.com/wq9of44lzzvjypcy3r7piwuyglg5rngy`**
- **Cenário** "[Simple] Kiwify → Boas-vindas Workshop 14-07" (id `5584763`) — **INATIVO**
  Fluxo: `Webhook (Kiwify)` → `Z-API · Send a Text Message`
  Conexão WhatsApp: **My Z-API connection** (id `6288971`, instância `3EA6…`)
  Mensagem de boas-vindas já preenchida (copy adaptada dos modelos — ver `comunicacao.md`).

## 🔧 O que o Carlos precisa fazer pra ativar (5 passos)

1. **Ligar a Kiwify no webhook:** na Kiwify → Configurações → **Webhooks** → criar
   webhook do evento **"Compra aprovada / Pedido pago"** apontando pra:
   `https://hook.us2.make.com/wq9of44lzzvjypcy3r7piwuyglg5rngy`
2. **Determinar a estrutura de dados:** com o webhook "escutando" no Make, faça
   **1 compra-teste** na Kiwify. O Make captura o formato do payload.
3. **Mapear o telefone:** no módulo Z-API, campo **Phone**, trocar o placeholder
   `{{1.phone}}` pelo campo real do payload da Kiwify (ex.: telefone/celular do
   cliente). ⚠️ Só números, com DDI 55 (ex.: `5538988315339`).
4. **Colar os 2 links** na mensagem (hoje estão como `[COLE O LINK DO GRUPO]` e
   `[COLE O LINK DA PESQUISA]`): o link do **grupo de WhatsApp novo** do evento e o
   link da **pesquisa** (form).
5. **Testar e ativar:** rodar 1 vez, confirmar que chega a mensagem, e ligar o
   cenário (toggle ON). Só depois disso ele dispara em compra real.

## Próximas camadas (depois que o básico estiver no ar)
- **Registro/CRM:** adicionar módulo Google Sheets (Add a Row) ou GHL pra gravar
  nome/telefone/UTM + tag `comprou_ingresso` (usada por URA/SMS e fila do SDR).
  Já existem conexões Google e GHL no time.
- **Redisparo 60 min:** ramo com Sleep 60min + filtro "não entrou no grupo" →
  reenvia o link do grupo (checklist do HANDOFF).
- **Entrada no grupo → pesquisa:** se o provedor emitir evento de novo
  participante; se não, a pesquisa já vai na boas-vindas da compra + fallback manual.

## Observações
- O cenário nasce **inativo** de propósito — nada dispara pra cliente até o Carlos
  mapear o telefone, colar os links e ligar.
- Se preferir mandar o link do grupo como **botão** (mais clicável), dá pra trocar o
  módulo por `Z-API · Send a Link` ou `Send a Button List`.
