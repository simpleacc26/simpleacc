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
| `index.html` | A página, com a aplicação em dois passos até o WhatsApp |
| `obrigado.html` | Confirmação, abre a conversa no WhatsApp e explica os próximos passos |
| `integracao/apps-script-planilha.gs` | Caminho alternativo, fora de uso: grava na planilha por Apps Script em vez de Make |
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

## A automação da planilha

Quem grava as aplicações é um cenário do Make, na conta da Simple:

| Item | Valor |
| --- | --- |
| Cenário | **[Rafael Granella] Alivance Day → Planilha de leads** (id 5991808), ativo |
| Webhook | `https://hook.us2.make.com/rlowstgf7uhkwv3tjyri826fyk6ofe89` |
| Planilha | "Leads - Alivance Day", aba `Página1` |
| Conexão | My Google connection (ssouzadaniel.ads@gmail.com) |
| Custo | 2 operações por aplicação |

Colunas gravadas, nessa ordem: Data, Etapa, Nome, WhatsApp, Email, O que faz hoje,
Faturamento, Maior travamento, utm_source, utm_medium, utm_campaign, utm_content, utm_term,
Página. A data é gerada pelo Make no fuso de São Paulo.

A página envia com `navigator.sendBeacon`, que continua enviando mesmo depois que a pessoa
sai da tela, então nenhuma aplicação se perde no caminho para o WhatsApp. Se o navegador não
tiver sendBeacon, cai num `fetch` com `keepalive`. Os dados vão como formulário
(`application/x-www-form-urlencoded`) de propósito: é o formato que o webhook do Make lê sem
preflight de CORS. Trocar por JSON quebra a gravação.

Para testar sem abrir a página:

```bash
curl -X POST https://hook.us2.make.com/rlowstgf7uhkwv3tjyri826fyk6ofe89 \
  -H "Content-Type: application/x-www-form-urlencoded" \
  --data-urlencode "etapa=teste" --data-urlencode "nome=Fulano" \
  --data-urlencode "whatsapp=51999999999" --data-urlencode "email=fulano@teste.com"
```

## Antes de publicar

Preencher o bloco `window.CONFIG` no topo do `index.html`:

| Campo | O que colocar |
| --- | --- |
| `whatsapp` | Já preenchido com `5554933003410`. É para onde a aplicação e o convite direto levam. |
| `webhookLeads` | Já preenchido com o webhook do Make acima. Vazio significa que a pessoa segue para o WhatsApp normalmente, mas nada é gravado. |
| `vagasRestantes` | Número de vagas ainda disponíveis, para exibir o contador. `null` esconde o contador. |

Ainda pendente de decisão do cliente, marcado no HTML:

1. Três perguntas do FAQ estão comentadas esperando resposta: gravação, almoço e a política
   de quem compra e não pode ir. Descomentar depois de confirmar com a Deise.
2. A frase sobre o horário começar 8h59 assume que o horário quebrado é intencional. Se não
   for, remover o parágrafo indicado no bloco de logística.
3. O contador de vagas depende de saber quantas das 50 já são de membros isentos.
4. A planilha está compartilhada como "qualquer pessoa com o link pode editar". Vale
   restringir para o time antes de a campanha subir.

## Os dois caminhos de entrada

- **Anúncio:** `https://dominio/` abre a aplicação em dois passos e termina no WhatsApp. É o
  caminho que alimenta a planilha, o remarketing e o evento de conversão da Meta.
- **Convite direto do Rafa:** `https://dominio/?direto=1` abre o WhatsApp na hora, sem
  formulário, porque essa audiência já está quente e o atrito só atrapalha.

## Traqueamento

O Google Tag Manager `GTM-KJ4MG9FD` está instalado nas duas páginas, com o snippet do `<head>`
antes de qualquer outro script e o `<noscript>` logo depois do `<body>`.

A página empurra os eventos abaixo para o `dataLayer`. Todos são eventos personalizados, então
no GTM cada um vira um acionador do tipo **Evento personalizado** com o nome exato:

| Evento | Quando dispara | Página |
| --- | --- | --- |
| `aplicacao_abriu` | Pessoa clica em qualquer botão de inscrição e o modal abre | index |
| `aplicacao_passo2` | **Respondeu as três perguntas e clicou em Continuar.** É a métrica de quem avançou para os dados de contato | index |
| `aplicacao_enviada` | **Preencheu nome, WhatsApp e e-mail válidos e enviou.** É a conversão principal | index |
| `whatsapp_convite_direto` | Entrou por `?direto=1` e foi mandado direto pro WhatsApp | index |
| `aplicacao_concluida` | Carregou a página de obrigado | obrigado |
| `whatsapp_conversa_aberta` | Clicou no botão que abre a conversa no WhatsApp | obrigado |

O `aplicacao_enviada` carrega três parâmetros sem dado pessoal: `faturamento`, `atuacao` e
`travamento`. Dá para ler no GA4 (ou no relatório do GTM) qual faixa de faturamento e qual
travamento mais converte, e usar isso para ajustar público e copy. Nome, WhatsApp e e-mail
nunca vão para o dataLayer, ficam só na planilha.

**Detalhe que evita perder conversão:** `aplicacao_enviada` e `whatsapp_convite_direto` vêm
colados numa troca de página, e nesse cenário a tag costuma não disparar a tempo. A página usa
`eventCallback` e só navega quando o GTM confirma, com teto de 1 segundo para não segurar
ninguém caso o GTM esteja bloqueado por extensão.

### O que montar no GTM

1. Três acionadores de evento personalizado: `aplicacao_passo2`, `aplicacao_enviada` e
   `whatsapp_conversa_aberta`.
2. Tag do GA4 (ou do Pixel da Meta) em cada um deles. No Pixel, o `aplicacao_enviada` deve ser
   um evento **Lead**, que é o que a campanha vai otimizar.
3. O Pixel da Meta pode entrar pelo próprio GTM, com a tag base em Todas as páginas. Não
   colocar pixel direto no HTML também, senão os eventos contam em dobro.
4. Publicar o container e conferir no Preview do GTM, seguindo o fluxo real da página.

Referência de leitura da campanha: visitas → `aplicacao_passo2` → `aplicacao_enviada` →
`whatsapp_conversa_aberta`. A queda entre os dois primeiros mostra problema de oferta ou de
público; a queda entre os dois últimos mostra problema no atendimento do WhatsApp.

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

Hoje o endereço de produção é **https://alivance-day.vercel.app** (projeto `alivance-day`,
com a proteção de deploy desligada para a página abrir sem login).

Depois de publicar, testar nesta ordem: abrir a página no celular, preencher a aplicação com
dados reais, conferir se a linha apareceu na planilha "Leads - Alivance Day" e se o botão da
página de obrigado abre a conversa no WhatsApp já com o nome na mensagem.
