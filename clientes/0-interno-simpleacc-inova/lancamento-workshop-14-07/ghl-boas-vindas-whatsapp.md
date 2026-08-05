# Boas-vindas no WhatsApp via GHL (template + workflow)

> Decisão: o WhatsApp de boas-vindas sai pelo **GHL** (número oficial já conectado),
> não pelo Z-API. O gatilho é a tag **`comprou ingresso`**, que o cenário do Make
> (`LP [L01] - Compra`) já adiciona no contato após a compra na Kiwify.
>
> Fluxo: **Compra Kiwify → Make (tag `comprou ingresso` + oportunidade) → GHL detecta
> a tag → envia o template de WhatsApp.**

## 1. Subir o template (GHL → WhatsApp → Templates)

- **Nome:** `boas_vindas_workshop_fld` (só minúsculas, números e `_`)
- **Idioma:** Português (BR)
- **Categoria:** **Utility** (é confirmação de compra + instruções) — aprova mais
  rápido. Se o Meta reclassificar como Marketing, tudo bem, só aprova um pouco mais devagar.
- **Variáveis:** `{{1}}` = primeiro nome. **Exemplo pro Meta:** `Daniel`
- **Links:** ficam **fixos** no corpo (são iguais pra todo mundo), não precisam ser variável.

### Corpo do template
```
Olá {{1}}, seja bem-vindo(a) ao *Workshop Funil de Lead Dinâmico*! Seu ingresso está confirmado. 🚀

📌 *Grave a data:* terça, 14 de julho, das 14h às 17h (horário de Brasília), ao vivo e online.

*1º passo (leva 2 min):*
🟢 Entre no grupo oficial do evento: https://chat.whatsapp.com/LOWEVNHuqNRH7wOx9QrFAr
📝 Depois responda a pesquisa: https://forms.gle/4LEbAmbNELgdGgvU7

Qualquer dúvida, é só responder aqui neste WhatsApp.
```

> Deixei o tom **transacional** (confirmação + próximos passos) de propósito, pra
> aprovar rápido. Se quiser a linha de posicionamento ("o novo jogo do high ticket…"),
> dá pra incluir, mas aí provavelmente entra como **Marketing** (aprovação mais lenta).
> Versão com a linha, se preferir:
> `Nele você vai descobrir o novo jogo do high ticket: fazer o lead certo se qualificar antes da call, com CAC menor.`

### (Opcional) Botão de URL
Dá pra adicionar um botão **"Entrar no grupo"** apontando pro link do grupo — fica
mais clicável que o link no texto. Tipo de botão: *Visitar site* (URL estática).

## 2. Criar o workflow (GHL → Automation → Workflows)

1. **Novo workflow.**
2. **Gatilho (Trigger):** `Contact Tag` → *Tag adicionada* = **`comprou ingresso`**
   (exatamente o nome que o Make grava — minúsculo, com espaço).
3. **Ação:** `Send WhatsApp` → escolher o template **`boas_vindas_workshop_fld`** →
   mapear `{{1}}` = `{{contact.first_name}}`.
4. **Publicar** o workflow (toggle "Publish").

## 3. Pré-requisitos pra funcionar de ponta a ponta
- [ ] Template **Aprovado** pelo Meta (status "Approved" no GHL).
- [ ] Workflow **publicado**.
- [ ] Cenário do Make `LP [L01] - Compra` **ativo** (é ele que grava a tag). Antes de
  ativar: abrir o cenário → módulo Webhook → **Redeterminar estrutura de dados**
  (tem 1 compra na fila) → ligar. Enquanto ele estiver inativo/inválido, a tag não é
  gravada e o workshop do GHL não dispara.
- [ ] Telefone do contato no GHL com **DDI 55** (formato E.164). A Kiwify manda em
  `Customer.mobile`; confere se chega com o 55.

## Observações
- O cenário do Make voltou a ser **só CRM** (removi a rota de Z-API que eu tinha
  testado). O WhatsApp agora é 100% GHL.
- O cenário standalone `[Simple] Kiwify - Boas-vindas Workshop 14-07` (id 5584763)
  ficou **sem uso** — pode apagar.
