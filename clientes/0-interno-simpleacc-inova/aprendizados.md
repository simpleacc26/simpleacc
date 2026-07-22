# Aprendizados — Interno Simple Acc

## Integração Kiwify → GHL (cards de compra no lançamento)

**Cenário Make:** `LP [L01] - Compra - Lançamento Workshop 14/07/26` (id `5582298`, Time Simple Acc).
**Trigger:** webhook custom `LP [L01] - Compra (Kiwify)` → `https://hook.us2.make.com/3hpkws13pqesabk9j3reyu4je4qvb63c`.
**Fluxo:** webhook Kiwify → `POST /contacts/upsert` (GHL, location `h8nI5fhCDTeo8rjNUi01`) → tag `comprou ingresso` → `POST /opportunities/upsert` no pipeline `Lançamento Pago` (`JwofY5AAGVfcOKmaDRAW`), estágio `Comprou Ingresso` (`dce1e961-f0f7-41bb-ac4f-5beaf4cc6498`).

### Problema (22/07/2026)
Duas vendas não viraram card no GHL (Luiza Juste 19/07, Junior Ferreira 21/07). Diagnóstico:
o cenário estava saudável (ativo, webhook habilitado, fila zerada, últimas execuções OK até 15/07),
mas **não houve execução nenhuma** nesses dias — a Kiwify não enviou o evento pro webhook.
As duas eram do produto **"Treinamento Funil de Leads"**, diferente do **"Workshop Funil de Lead"**
que gerava os cards.

**Causa raiz:** o webhook na Kiwify estava vinculado só ao produto do Workshop. Produto novo do
lançamento não dispara o webhook → sem execução no Make → sem card.

### Como resolver / prevenir
- **Backfill:** na Kiwify, abrir a venda → seção Webhooks → **Reenviar** para o webhook do Make
  (payload real passa pelo cenário que já funciona). Alternativa: disparar o webhook manualmente.
- **Prevenção:** ao criar produto novo no lançamento, **adicionar o webhook do Make ao novo produto**
  (evento *compra aprovada*) na Kiwify. Checklist de lançamento deve incluir isso.

### Regra prática
Se um card não aparece no GHL: primeiro cheque no Make se **houve execução**. Sem execução = a Kiwify
não disparou (problema de configuração de webhook por produto), não é erro do cenário.
