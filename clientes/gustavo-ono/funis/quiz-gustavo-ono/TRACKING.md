# Traqueamento do funil

Container: **GTM-KW7KM3LM** — conta "Gustavo Ono 2", workspace `[WEB] Gustavo Ono 2`.
Páginas: `diagnostico-gustavo-ono.vercel.app` e `quiz-gustavo-ono.vercel.app`
(os dois apontam para o mesmo deploy).

Pixel da Meta (`413208557089573`) é carregado direto no `index.html`, não pelo
GTM. Isso é de propósito: o código chama `fbq()` já na montagem do React, e se o
pixel dependesse do GTM ele poderia ainda não existir nessa hora, derrubando o
evento de Lead em silêncio.

## Eventos que o funil empurra para o dataLayer

Tudo sai de `src/analytics.ts`. Os nomes abaixo são os que você usa nos
acionadores do GTM.

| Evento | Quando dispara | Parâmetros | Também vai para o Pixel |
|---|---|---|---|
| `quiz_iniciado` | primeira resposta, na landing | `content_name`, `status` | `CompleteRegistration` |
| `quiz_pergunta` | cada resposta seguinte | `pergunta` (2 a 9) | não |
| `quiz_formulario` | lead chega no formulário | — | não |
| `quiz_lead` | formulário enviado | `content_name`, `content_category`, **`rota`** | `Lead` |
| `relatorio_visto` | relatório abre | `content_name`, `content_category`, **`rota`** | `ViewContent` |
| `clique_whatsapp` | clique no CTA da sessão (só Rota A) | `content_name`, `content_category`, **`rota`** | `Contact` |
| `clique_treinamento` | clique no botão do treinamento de R$ 97 | `value` (97), `currency` (BRL), `content_name`, **`rota`** | `InitiateCheckout` |

`rota` é `A` (fatura acima de R$ 5 mil, vê a sessão diagnóstica como oferta
principal) ou `B` (vê só o treinamento). O relatório é uma página diferente em
cada rota, então **taxa de clique no treinamento sem separar por rota é média de
duas coisas distintas** — daí o parâmetro viajar junto.

`quiz_pergunta` existe para achar em qual pergunta as pessoas abandonam. Ele não
vai para o Pixel de propósito: até 18/08 disparava `ViewContent` a cada resposta,
cerca de nove por lead, e isso poluía a otimização da campanha.

## O que criar no GTM

### 1. Variáveis (Variáveis → Definidas pelo usuário → Variável da camada de dados)

| Nome | Nome da variável da camada de dados |
|---|---|
| `DLV - rota` | `rota` |
| `DLV - value` | `value` |
| `DLV - currency` | `currency` |

### 2. Acionadores (Acionadores → Novo → Evento personalizado)

| Nome | Nome do evento | Dispara em |
|---|---|---|
| `Evento - quiz_lead` | `quiz_lead` | Todos os eventos personalizados |
| `Evento - clique_treinamento` | `clique_treinamento` | Todos os eventos personalizados |
| `Evento - clique_whatsapp` | `clique_whatsapp` | Todos os eventos personalizados |
| `Evento - relatorio_visto` | `relatorio_visto` | Todos os eventos personalizados |

Os dois primeiros são os que você pediu. Os outros dois custam um minuto e são o
que permite calcular a taxa de conversão do relatório depois.

### 3. Tags (Tags → Nova → Google Analytics: evento do GA4)

Em todas, o campo de configuração aponta para a mesma tag do Google que já
existe (`[GA4] 1 | PageView`).

**`[GA4] 2 | Lead`**
- Nome do evento: `generate_lead`
- Parâmetros: `rota` = `{{DLV - rota}}`
- Acionador: `Evento - quiz_lead`

**`[GA4] 3 | Clique treinamento`**
- Nome do evento: `clique_treinamento`
- Parâmetros: `value` = `{{DLV - value}}`, `currency` = `{{DLV - currency}}`,
  `rota` = `{{DLV - rota}}`
- Acionador: `Evento - clique_treinamento`

**`[GA4] 4 | Clique WhatsApp`** (opcional)
- Nome do evento: `clique_whatsapp`
- Parâmetros: `rota` = `{{DLV - rota}}`
- Acionador: `Evento - clique_whatsapp`

### 4. No GA4, depois de publicar

1. **Admin → Definições personalizadas → Criar dimensão personalizada**:
   nome `Rota`, escopo **Evento**, parâmetro `rota`. Sem isso o parâmetro chega
   mas não aparece em relatório nenhum.
2. **Admin → Eventos → marcar como evento-chave**: `generate_lead` e
   `clique_treinamento`.
3. Os dados só começam a existir a partir da publicação. Não dá para
   retroagir.

## Três armadilhas específicas deste funil

**O quiz é SPA.** Ir da landing para `/resultado` não gera um novo carregamento
de página, então a tag de PageView não dispara de novo. Se quiser contar quem
chegou no relatório, use `relatorio_visto`, não pageview. (Alternativa: ligar
"Alterações de página com base em eventos do histórico do navegador" na medição
otimizada do GA4.)

**A tag `[Meta Ads] 1 | PageView` duplica o pixel.** O `index.html` já inicializa
o pixel e o app já dispara `PageView` na landing e no relatório. A tag do GTM em
"All Pages" soma mais um por carregamento. Pausar ou excluir essa tag. Não tire o
pixel do código para "resolver pelo GTM": os eventos de Lead e InitiateCheckout
saem do React e dependem do `fbq` já existir.

**A tag `[API] 2 | Lead` está sem acionador**, ou seja, nunca dispara. Se ela é a
versão server-side do evento de lead, o acionador que falta nela é
`Evento - quiz_lead`.

## Como conferir antes de publicar

Modo **Visualizar** do GTM apontando para `https://diagnostico-gustavo-ono.vercel.app`,
e responder o quiz até o fim. A sequência correta é:

```
quiz_iniciado → quiz_pergunta ×8 → quiz_formulario → quiz_lead → relatorio_visto
```

`relatorio_visto` tem que aparecer **uma vez só**. Para ver a Rota A, escolha
qualquer faixa de faturamento acima de "Até R$ 5.000" na última pergunta — só
nela aparece o botão de WhatsApp.
