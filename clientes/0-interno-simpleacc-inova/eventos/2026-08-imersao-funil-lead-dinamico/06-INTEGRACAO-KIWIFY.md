# INTEGRAÇÃO KIWIFY → MANYCHAT

> **Por que isso importa:** é o que impede um comprador de receber "ainda dá
> tempo de garantir sua vaga" três horas depois de ter pago R$9,90. Sem isso,
> pedido de reembolso e desgaste com a base.

Não existe integração nativa Kiwify ↔ ManyChat. Três caminhos, do mais robusto
ao mais rápido.

---

## Opção A — Make (recomendada)

A conta Make já existe e está no nome do Daniel (`ssouzadaniel.ads@gmail.com`).

### Montagem

**Módulo 1 — Webhooks → Custom webhook**
Crie e copie a URL gerada. Essa URL não precisa de credencial nenhuma.

**No Kiwify:** `Configurações → Webhooks → Adicionar webhook`
- URL: a do Make
- Evento: **Compra aprovada** (só esse; não marque pedido gerado ou pix gerado)
- Salve, e faça uma compra de teste pro Make capturar a estrutura do payload

**Módulo 2 — HTTP → Make a request**
Primeiro achar o contato pelo telefone:
- Método: `GET`
- URL: `https://api.manychat.com/fb/subscriber/findBySystemField`
- Query string: `phone` = telefone do payload do Kiwify, normalizado
- Header: `Authorization: Bearer <MANYCHAT_API_KEY>`

**Módulo 3 — HTTP → Make a request**
Aplicar a tag:
- Método: `POST`
- URL: `https://api.manychat.com/fb/subscriber/addTagByName`
- Headers: `Authorization: Bearer <MANYCHAT_API_KEY>` e `Content-Type: application/json`
- Body:
```json
{
  "subscriber_id": "{{id_vindo_do_modulo_2}}",
  "tag_name": "EVENTO_FL_COMPRADOR"
}
```

A API key sai em `ManyChat → Settings → API`. **Exige plano Pro.**

### A pegadinha do telefone

O Kiwify manda o telefone num formato, o ManyChat guarda em outro. Se não bater,
o módulo 2 não acha ninguém e a tag nunca é aplicada — silenciosamente.

Antes do módulo 2, coloque um **Tools → Set variable** normalizando para
`+55DDNÚMERO`:
- tirar espaço, parêntese, hífen e `+`
- se começar com `55`, manter; se não, prefixar `55`
- garantir 9 dígitos após o DDD em celular
- devolver com `+` na frente

**Teste com uma compra real antes de confiar.** Esse é o ponto que mais quebra.

### Se a busca falhar

Adicione um **Router**: se o módulo 2 não retornar contato, mande a linha pra
uma planilha de exceções (Google Sheets) que alguém revisa manualmente. Melhor
uma lista de 3 pessoas pra tratar na mão do que descobrir na terça que 40
compradores continuaram recebendo mensagem de venda.

---

## Opção B — Kiwify → ManyChat direto por webhook

O ManyChat tem "External Request" mas não um endpoint de entrada aberto que
aceite o formato do Kiwify. Na prática precisa de um intermediário. **Fica só
como referência — não é caminho pra hoje.**

---

## Opção C — Manual (plano B garantido)

Sem código, sem integração, funciona:

1. Kiwify → `Vendas` → filtrar por aprovadas → `Exportar CSV`
2. ManyChat → `Contacts` → `Import` → subir o CSV
3. Selecionar os importados → `Add Tag` → `EVENTO_FL_COMPRADOR`

Rodar a cada 2 horas na segunda e na terça, e uma última vez na quarta de manhã.
Alarme no celular. Leva 5 minutos por rodada.

> Com o volume esperado (15–50 ingressos), a Opção C é perfeitamente viável e
> tem risco quase zero. **Se o tempo apertar amanhã cedo, vá de C sem culpa** e
> monte o Make depois do evento, para o próximo lançamento.

---

## O que eu preciso pra montar a Opção A por você

Consigo criar o cenário no Make daqui, mas preciso de:

1. **API key do ManyChat** (`Settings → API`) — só existe no plano Pro
2. Confirmação de qual **team/organização** do Make usar
3. Acesso ao Kiwify, ou alguém que cole a URL do webhook lá

Com esses três itens, monto e testo em ~20 minutos.
