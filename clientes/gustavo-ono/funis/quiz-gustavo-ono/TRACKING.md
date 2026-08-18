# Traqueamento do funil

Container: **GTM-KW7KM3LM** — conta "Gustavo Ono 2", workspace `[WEB] Gustavo Ono 2`.
Páginas: `diagnostico-gustavo-ono.vercel.app` e `quiz-gustavo-ono.vercel.app`
(os dois apontam para o mesmo deploy).

## Como está montado

Desde 18/08 **o código não fala com nenhuma ferramenta de medição**. Ele só
empurra eventos para o dataLayer, e o GTM distribui. O Meta Pixel
(`413208557089573`), que antes era um script solto no `index.html`, passou a ser
carregado por tag no container.

```
quiz (dataLayer) → GTM → GA4
                      └→ Meta Pixel
```

A consequência prática: **evento novo, parâmetro novo ou ferramenta nova não
pedem mais deploy**, desde que o dado já esteja no dataLayer. Em compensação,
**se o container não estiver publicado, nada é medido** — não existe mais um
pixel de reserva na página.

## Eventos que o funil empurra para o dataLayer

Tudo sai de `src/analytics.ts`.

| Evento | Quando dispara | Parâmetros |
|---|---|---|
| `quiz_iniciado` | primeira resposta, na landing | `content_name`, `status` |
| `quiz_pergunta` | cada resposta seguinte | `pergunta` (2 a 9) |
| `quiz_formulario` | lead chega no formulário | — |
| `quiz_lead` | formulário enviado | `content_name`, `content_category`, **`rota`** |
| `relatorio_visto` | relatório abre | `content_name`, `content_category`, **`rota`** |
| `clique_whatsapp` | clique no CTA da sessão (só Rota A) | `content_name`, `content_category`, **`rota`** |
| `clique_treinamento` | clique no botão do treinamento de R$ 97 | `value` (97), `currency` (BRL), `content_name`, **`rota`** |

Os nomes de parâmetro seguem o vocabulário da Meta de propósito: as tags do
Pixel no GTM leem direto deles.

`rota` é `A` (fatura acima de R$ 5 mil, vê a sessão diagnóstica como oferta
principal) ou `B` (vê só o treinamento). O relatório é uma página diferente em
cada rota, então **taxa de clique no treinamento sem separar por rota é média de
duas coisas distintas**.

`quiz_pergunta` existe para achar em qual pergunta as pessoas abandonam. Ele não
deve virar tag do Pixel: até 18/08 disparava `ViewContent` a cada resposta, cerca
de nove por lead, e isso poluía a otimização da campanha.

---

# Montagem no GTM

## Passo 1 — Variáveis

**Variáveis → Definidas pelo usuário → Nova → Variável da camada de dados.**
Só isso: o nome da variável e o campo "Nome da variável da camada de dados".

| Nome da variável | Nome da variável da camada de dados |
|---|---|
| `DLV - rota` | `rota` |
| `DLV - value` | `value` |
| `DLV - currency` | `currency` |

Sem esse passo, o `{{DLV - rota}}` do passo 3 não existe para ser selecionado.

## Passo 2 — Acionadores

Já criados: `Quiz Lead`, `Clique Low Ticket`, `Clique WhatsApp`, `Relatório View`.

**Confira dentro de cada um o campo "Nome do evento".** O nome que aparece na
lista é livre, mas o nome do evento tem que bater com o dataLayer, minúsculo e
com underline:

| Acionador | Nome do evento (exato) |
|---|---|
| Quiz Lead | `quiz_lead` |
| Clique Low Ticket | `clique_treinamento` |
| Clique WhatsApp | `clique_whatsapp` |
| Relatório View | `relatorio_visto` |

Falta criar mais um, para o Pixel do passo 4:

| Acionador | Nome do evento |
|---|---|
| Quiz Iniciado | `quiz_iniciado` |

Tipo: **Evento personalizado**, disparando em "Todos os eventos personalizados".

## Passo 3 — Tags do GA4

**Tags → Nova → Configuração da tag → Google Analytics → Evento do GA4.**

No campo de configuração/ID de medição, use o mesmo da tag `[GA4] 1 | PageView`
que já existe.

Depois preencha **Nome do evento**, abra **Parâmetros do evento → Adicionar
linha** para cada parâmetro, e em **Acionamento** escolha o acionador.

| Nome da tag | Nome do evento | Parâmetros | Acionador |
|---|---|---|---|
| `[GA4] 2 \| Lead` | `generate_lead` | `rota` = `{{DLV - rota}}` | Quiz Lead |
| `[GA4] 3 \| Clique treinamento` | `clique_treinamento` | `value` = `{{DLV - value}}`, `currency` = `{{DLV - currency}}`, `rota` = `{{DLV - rota}}` | Clique Low Ticket |
| `[GA4] 4 \| Clique WhatsApp` | `clique_whatsapp` | `rota` = `{{DLV - rota}}` | Clique WhatsApp |
| `[GA4] 5 \| Relatório visto` | `relatorio_visto` | `rota` = `{{DLV - rota}}` | Relatório View |

As duas primeiras são o que foi pedido: quantidade de leads e cliques no
treinamento. As outras duas são o denominador — sem `relatorio_visto` não dá
para calcular taxa de clique, só volume.

## Passo 4 — Tags do Meta Pixel

O jeito mais seguro é **duplicar a tag que já existe**: abra
`[Meta Ads] 1 | PageView` → menu **⋮ → Copiar**, renomeie, troque o evento e o
acionador. Assim o ID do pixel e o formato do template vêm prontos.

| Nome da tag | Evento do Pixel | Acionador |
|---|---|---|
| `[Meta Ads] 1 \| PageView` (já existe) | PageView | All Pages |
| `[Meta Ads] 2 \| CompleteRegistration` | CompleteRegistration | Quiz Iniciado |
| `[Meta Ads] 3 \| Lead` | Lead | Quiz Lead |
| `[Meta Ads] 4 \| ViewContent` | ViewContent | Relatório View |
| `[Meta Ads] 5 \| Contact` | Contact | Clique WhatsApp |
| `[Meta Ads] 6 \| InitiateCheckout` | InitiateCheckout | Clique Low Ticket |

Na `InitiateCheckout`, preencha as propriedades do evento com
`value` = `{{DLV - value}}` e `currency` = `{{DLV - currency}}`. É isso que faz a
Meta enxergar R$ 97 por clique em vez de um evento sem valor.

**A `[Meta Ads] 1 | PageView` precisa continuar ativa e em All Pages.** Ela é
quem carrega o pixel na página agora. Se for pausada, o funil inteiro para de
mandar evento para a Meta.

## Passo 5 — GA4

1. **Admin → Definições personalizadas → Criar dimensão personalizada**: nome
   `Rota`, escopo **Evento**, parâmetro `rota`. Sem isso o parâmetro chega mas
   não aparece em relatório nenhum.
2. **Admin → Eventos → marcar como evento-chave**: `generate_lead` e
   `clique_treinamento`.
3. Os dados só existem a partir da publicação. Não retroage.

## Passo 6 — Testar e publicar

Modo **Visualizar** apontando para `https://diagnostico-gustavo-ono.vercel.app`,
respondendo o quiz até o fim. A sequência correta:

```
quiz_iniciado → quiz_pergunta ×8 → quiz_formulario → quiz_lead → relatorio_visto
```

`relatorio_visto` tem que aparecer **uma vez só**. Para cair na Rota A e ver o
botão de WhatsApp, escolha qualquer faixa acima de "Até R$ 5.000" na última
pergunta.

Confira também, no painel do preview, que as tags do Meta e do GA4 aparecem em
"Tags Fired" nesses eventos, não em "Tags Not Fired".

---

## Ordem de subida (importa)

O deploy que tira o Pixel do `index.html` **só pode ir ao ar depois que o
container estiver publicado**. Entre uma coisa e outra, a Meta ficaria sem
receber nada.

1. Publicar o container no GTM (botão **Enviar**).
2. Só então subir o deploy do quiz.

## Armadilhas deste funil

**O quiz é SPA.** Ir da landing para `/resultado` não gera carregamento novo de
página, então nenhuma tag de PageView dispara lá. Quem marca a chegada no
relatório é o evento `relatorio_visto`.

**Não devolva o Pixel para o `index.html`.** Com o pixel nos dois lugares, cada
carregamento conta dois PageView e o CPL fica bonito por engano.

**A tag `[API] 2 | Lead` está sem acionador**, ou seja, nunca dispara. Se ela é a
versão server-side do evento de lead, o acionador que falta nela é `Quiz Lead`.
