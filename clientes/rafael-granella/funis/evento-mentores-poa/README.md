# Página do evento | Imersão Mentores Alivance (POA, 11/09/2026)

Página de venda do ingresso de R$1.500 do evento presencial de Porto Alegre.
HTML puro, sem framework e sem build. Publica como site estático.

- **Copy de origem:** `../../copy/2026-08-14-copy-pagina-evento-poa.md`
- **Estratégia:** `../../estrategia/2026-08-14-mesa-de-guerra-campanha-evento-poa.md`
- **Identidade:** navy `#1c1c42`, cartão `#292859`, dourado `#c8b28b`, Fahkwang nos títulos
  e Inter no corpo, a mesma do quiz do cliente.

## Arquivos

**Fluxo (atualizado em 18/08):** não existe checkout e não vai existir até o evento, então a
venda acontece pelo WhatsApp. A página é uma **aplicação em dois passos**: contato, três
perguntas de qualificação, gravação na planilha e abertura da conversa no WhatsApp já com o
nome da pessoa. A página diz em três lugares que ninguém é levado a página de pagamento.

| Arquivo | O que é |
| --- | --- |
| `index.html` | A página, com a aplicação em dois passos e o botão de dúvida no WhatsApp |
| `obrigado.html` | Confirmação, abre a conversa no WhatsApp e explica os próximos passos |
| `integracao/apps-script-planilha.gs` | Script que grava as aplicações na planilha "Leads - Alivance Day" |
| `vercel.json` | Redireciona `/img/*` para as fotos já publicadas (ver "As fotos" abaixo) |

As três perguntas do passo 2 são de escolha, sem digitação. A do travamento tem cinco
alternativas tiradas da programação do evento mais "Outro", que abre um campo de uma linha
só para quem escolher. Quem marca "Outro" chega na planilha como `Outro: <texto>`.

## As fotos

O deploy é feito enviando os arquivos pela ferramenta da Vercel, e imagem binária não passa
por esse caminho. Por isso o `vercel.json` aponta `/img/rafa-mls.jpg` e `/img/rafa-palco.jpg`
para o deploy `alivance-23uv62k39-simpleacc.vercel.app`, que já serve as duas. Os arquivos
originais continuam aqui em `img/`, e quem publicar pela CLI (`npx vercel --prod`) pode
apagar o `vercel.json`, porque aí as fotos sobem junto e são servidas direto.

## Antes de publicar

Preencher o bloco `window.CONFIG` no topo do `index.html`:

| Campo | O que colocar |
| --- | --- |
| `whatsapp` | Número que atende o evento, só dígitos, com DDI e DDD. Exemplo: `5551999999999`. É para onde a aplicação leva e também o botão de dúvida. |
| `webhookLeads` | URL do Apps Script publicado na planilha "Leads - Alivance Day" (instruções em `integracao/apps-script-planilha.gs`). Vazio significa que a pessoa segue para o WhatsApp normalmente, mas nada é gravado. |
| `vagasRestantes` | Número de vagas ainda disponíveis, para exibir o contador. `null` esconde o contador. |

Ainda pendente de decisão do cliente, marcado no HTML:

1. Três perguntas do FAQ estão comentadas esperando resposta: gravação, almoço e a política
   de quem compra e não pode ir. Descomentar depois de confirmar com a Deise.
2. A frase sobre o horário começar 8h59 assume que o horário quebrado é intencional. Se não
   for, remover o parágrafo indicado no bloco de logística.
3. O contador de vagas depende de saber quantas das 50 já são de membros isentos.

## Os dois caminhos de entrada

- **Anúncio:** `https://dominio/` abre a aplicação em dois passos e termina no WhatsApp. É o
  caminho que alimenta a planilha, o remarketing e o evento de conversão da Meta.
- **Convite direto do Rafa:** `https://dominio/?direto=1` abre o WhatsApp na hora, sem
  formulário, porque essa audiência já está quente e o atrito só atrapalha.

## Eventos enviados para o dataLayer

`aplicacao_abriu`, `aplicacao_passo2`, `aplicacao_enviada`, `whatsapp_duvida`,
`whatsapp_convite_direto` e, na página de obrigado, `aplicacao_concluida`. Ligar o GTM ou o
Pixel na tag de conversão que a campanha for otimizar, que é o `aplicacao_enviada`.

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

Depois de publicar, testar nesta ordem: abrir a página no celular, preencher a aplicação com
dados reais, conferir se a linha apareceu na planilha "Leads - Alivance Day" e se a conversa
abriu no WhatsApp já com o nome preenchido na mensagem.
