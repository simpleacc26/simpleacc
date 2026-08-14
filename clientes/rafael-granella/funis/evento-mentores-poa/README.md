# Página do evento | Imersão Mentores Alivance (POA, 11/09/2026)

Página de venda do ingresso de R$1.500 do evento presencial de Porto Alegre.
HTML puro, sem framework e sem build. Publica como site estático.

- **Copy de origem:** `../../copy/2026-08-14-copy-pagina-evento-poa.md`
- **Estratégia:** `../../estrategia/2026-08-14-mesa-de-guerra-campanha-evento-poa.md`
- **Identidade:** navy `#1c1c42`, cartão `#292859`, dourado `#c8b28b`, Fahkwang nos títulos
  e Inter no corpo, a mesma do quiz do cliente.

## Arquivos

| Arquivo | O que é |
| --- | --- |
| `index.html` | A página de vendas, com modal de captura e botão de WhatsApp |
| `obrigado.html` | Página pós-compra com as 3 perguntas que alimentam o hotseat |

## Antes de publicar

Preencher o bloco `window.CONFIG` no topo do `index.html`:

| Campo | O que colocar |
| --- | --- |
| `linkPagamento` | O link único de pagamento (cartão parcelado + Pix). Enquanto estiver vazio, o botão avisa que as inscrições abrem em instantes e oferece o WhatsApp, em vez de quebrar. |
| `whatsapp` | Número do evento, só dígitos, com DDI e DDD. Exemplo: `5551999999999` |
| `webhookLeads` | Endpoint que recebe os contatos capturados: Apps Script da planilha, Make ou n8n. Vazio significa que o lead só é guardado no navegador e a pessoa segue para o pagamento normalmente. |
| `vagasRestantes` | Número de vagas ainda disponíveis, para exibir o contador. `null` esconde o contador. |

No `obrigado.html`, repetir `whatsapp` e preencher `webhookRespostas`.

Ainda pendente de decisão do cliente, marcado no HTML:

1. Três perguntas do FAQ estão comentadas esperando resposta: gravação, almoço e a política
   de quem compra e não pode ir. Descomentar depois de confirmar com a Deise.
2. A frase sobre o horário começar 8h59 assume que o horário quebrado é intencional. Se não
   for, remover o parágrafo indicado no bloco de logística.
3. O contador de vagas depende de saber quantas das 50 já são de membros isentos.

## Os dois caminhos de entrada

- **Anúncio:** `https://dominio/` leva ao modal de captura (nome, WhatsApp, e-mail) e só
  depois ao pagamento. É o caminho que alimenta o remarketing e o evento de conversão da Meta.
- **Convite direto do Rafa:** `https://dominio/?direto=1` manda para o pagamento sem etapa
  no meio, porque essa audiência já está quente e o atrito só atrapalha.

## Eventos enviados para o dataLayer

`captura_abriu`, `lead`, `checkout_click`, `whatsapp_duvida` e, na página de obrigado,
`questionario_respondido`. Ligar o GTM ou o Pixel na tag de conversão que a campanha for
otimizar, que é o `lead`.

## Rodar local

Não tem build. Abra o `index.html` no navegador, ou sirva a pasta:

```bash
python3 -m http.server 8000
```

## Deploy

Site estático na Vercel, publicado a partir desta pasta, na **conta da Simple**, nunca em
conta pessoal.

```bash
npx vercel --prod
```

Depois de publicar, testar nesta ordem: abrir a página no celular, preencher a captura com
dados reais, confirmar que o contato chegou na planilha, concluir uma compra de teste e
conferir se ela aparece na lista de inscritos.
