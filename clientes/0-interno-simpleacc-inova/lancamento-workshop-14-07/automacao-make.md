# Automação (Make) — webhook Hubla → grupo + pesquisa + tag

> Bloco 2 do HANDOFF. **A única automação inegociável:** compra → entra no grupo
> → recebe a pesquisa. Se esse elo arrebenta, o lead não se aquece e nada depois
> funciona.
>
> ⚠️ Este arquivo é o **blueprint**. Ligar às conexões reais (Hubla + provedor de
> WhatsApp) é mão do Carlos com as credenciais — não dá pra "subir no ar" sem elas.

## Cenário 1 — Compra aprovada → boas-vindas + grupo + tag

**Gatilho:** `Webhook` (custom) recebendo o evento da Hubla.
Na Hubla: criar webhook de **compra aprovada** apontando pra URL do webhook do Make.

**Módulos, em ordem:**

1. **Webhook (Hubla · compra aprovada)**
   Campos esperados no payload: `nome`, `email`, `telefone/whatsapp`, `produto`,
   `valor`, `utm_source/medium/campaign/content/term`, `id_transacao`.

2. **Router** (2 rotas)

   **Rota A — Boas-vindas no WhatsApp**
   - **WhatsApp (provedor: API oficial / Z-API / provedor da Simple)** → enviar
     mensagem `G0` (`comunicacao.md#g0`) com **link do grupo** `{{link_grupo}}` e
     **link da pesquisa** `{{link_pesquisa}}`, personalizada com `{{primeiro_nome}}`.
   - Mapear telefone do webhook → destinatário.

   **Rota B — Registro/CRM**
   - **Google Sheets · Add a Row** (planilha de leads) OU **Data Store do Make**:
     gravar `nome, email, telefone, produto, valor, UTMs, data/hora, tag=comprou_ingresso`.
   - Essa linha alimenta: fallback manual do grupo, disparo de URA/SMS e a rotina
     do SDR.

3. **Sleep 60 min** → **Filtro:** "não respondeu / não entrou no grupo"
   - **Redisparo do link do grupo** (mensagem curta reforçando o `{{link_grupo}}`).
   - (checklist do HANDOFF: "redisparo do link do grupo em 60 min para quem não respondeu")

## Cenário 2 — Entrada no grupo → pesquisa

Se o provedor de WhatsApp/grupo emitir evento de **novo participante**:
- **Gatilho:** webhook "entrou no grupo".
- **Ação:** mensagem automática de boas-vindas no grupo com o **link da pesquisa**
  (`comunicacao.md#g0`).
- Se o provedor **não** emitir esse evento, cobrir pela mensagem G0 do Cenário 1
  (que já manda a pesquisa na compra) + fallback manual 2x/dia.

## Dados / tags a padronizar
- Tag: `comprou_ingresso` (usada por URA/SMS e fila do SDR).
- Guardar **origem/UTM** de cada compra (atribuição de tráfego pro Renan).

## Checklist de execução (Carlos, no Make)
- [ ] Criar webhook na Hubla (compra aprovada) → URL do Make
- [ ] Cenário 1: Webhook → Router → WhatsApp G0 (grupo+pesquisa) + Sheets/DataStore
- [ ] Redisparo do grupo em 60 min p/ quem não respondeu
- [ ] Cenário 2: entrada no grupo → pesquisa (ou cobrir pelo G0)
- [ ] Testar com 1 compra real ponta-a-ponta (Pix e cartão)
- [ ] Confirmar gravação de UTM/origem em toda compra

> Posso montar o esqueleto do cenário direto no Make (via MCP) se você me
> confirmar: **qual organização/equipe do Make** usar e **qual conexão de WhatsApp**
> (provedor). Sem isso, o cenário nasceria quebrado — melhor você plugar as
> credenciais e eu ajudo a validar o fluxo.
