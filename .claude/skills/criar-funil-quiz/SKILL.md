---
name: criar-funil-quiz
description: >-
  Cria um funil de quiz/diagnóstico da Simple Acc (Hero + Quiz SPIN → tela de
  Loading → Captura de lead → Relatório personalizado com CTAs no WhatsApp).
  Site estático, sem build. Use quando o pedido for criar/implementar um funil,
  quiz, landing de diagnóstico ou "leitura personalizada" para um cliente.
  Já inclui tela de loading (~5s), CTAs distribuídos, envio de lead que cai na
  planilha (Make → Google Sheets), data em horário de Brasília e qualificação
  por intenção. Referência viva: clientes/pamella-mello/funil-hipnose/.
---

# Criar Funil de Quiz (Simple Acc)

Padrão da casa para funis de aquisição. **Site estático, sem build, sem
dependências.** Mesma base do Instituto Sabrina Siqueira e da Pâmella Mello.

## Fluxo

**Hero + Quiz (SPIN)** → **Loading (~5s)** → **Captura** → **Diagnóstico
personalizado** com CTAs para o WhatsApp.

## Arquivos (em `template/`)

```
index.html        Hero + barra de progresso + container do quiz
styles.css        Sistema visual (CSS vars). Só a PALETA em :root muda por cliente
flow.js           TODA a copy: marca, hero, perguntas, captura (window.FLOW)  <- principal a editar
app.js            Motor: render, auto-avanço, máscara, validação, persistência,
                  "continuar de onde parou", tela de LOADING, envio do lead
diagnostico.html  Página do relatório
diagnostico.js    Monta o relatório + CTAs distribuídos (.cta-wpp)
favicon.svg       Monograma (ajuste a letra/cor). Gere os PNGs (ver abaixo)
```

## Como usar (passo a passo)

1. **Copie** `template/` para `clientes/<cliente>/<projeto>/`.
2. **Preencha o `flow.js`** com a Estratégia aprovada (é onde está toda a copy).
   Troque os placeholders `__MARCA__`, `__TAGLINE__`, `__SELO__`, perguntas,
   opções (com `report`), `marca.whatsapp` (DDI+DDD+número, só dígitos).
3. **Placeholders nos HTML**: substitua `__MARCA__`, `__TAGLINE__`, `__TITULO__`,
   `__TITULO_DIAGNOSTICO__`, `__META_DESCRICAO__`, `__RODAPE_DIAGNOSTICO__`.
4. **`STORE_KEY`**: deixe igual em `flow.js` (`config.storeKey`) e em
   `diagnostico.js` (`const STORE_KEY`).
5. **Paleta**: ajuste as CSS vars no `:root` do `styles.css` à identidade do
   cliente (cores do logo/feed). Mantenha `--primary`, `--primary-700`,
   `--accent-soft` (o relatório usa).
6. **Relatório** (`diagnostico.js`): ajuste a copy das seções ao nicho. Mantenha
   a estrutura (qualificação, CTAs distribuídos, galeria, bloco final).
7. **Depoimentos**: coloque prints em `./depoimentos/01.jpeg, 02.jpeg...` e
   liste no `diagnostico.js`. Prefira avaliações públicas (Google 5 estrelas) +
   WhatsApp. **Imagens inteiras, não cortar.**
8. **Favicon**: edite a letra/cores em `favicon.svg` e gere os PNGs (script no
   fim). Referencie 16/32/apple-touch nos `<head>` (já está no template).
9. **Integração de leads** (ver seção própria) e **deploy** (ver seção própria).
10. **Teste** o fluxo ponta a ponta e confirme o lead na planilha.

## Decisões estruturais (replicar SEMPRE)

Estas são as melhorias que viram padrão em todo funil novo:

1. **Tela de Loading (~5s)** após enviar o form, antes do diagnóstico
   (`renderLoading()` no `app.js`): barra dourada que enche + mensagens
   ("Analisando suas respostas..." etc.). Dá cara de "feito pra mim" e, de
   quebra, dá tempo do lead chegar na planilha antes do redirect. Duração em
   `const dur` (use ~4700ms → ~5s total). Respeita `prefers-reduced-motion`.
2. **CTAs distribuídos no diagnóstico** (sem botão no topo): 2 CTAs no meio
   (após "dois caminhos" e após "o que precisa acontecer") + bloco final. Todos
   com a classe `.cta-wpp` e um listener delegado. O lead clica quando se sentir
   pronto.
3. **Envio do lead robusto**: `fetch` em modo **cors + `application/json` +
   `keepalive`**. O webhook do Make **só estrutura o lead em application/json**
   (text/plain NÃO é parseado → nenhuma linha cai). `keepalive` faz o POST
   sobreviver ao redirect pro diagnóstico. (O webhook do Make responde CORS, então
   application/json passa.)
4. **Data em horário de Brasília**, formato legível `DD/MM/AAAA HH:MM:SS`
   (`dataHoraBR()` força `America/Sao_Paulo`). Nada de ISO/UTC.
5. **Qualificação por intenção**, não por pergunta crua de renda: flags
   `foraDeArea` (geografia) e `nutrir` (prontidão) nas opções do `flow.js`. O
   diagnóstico adapta o CTA (qualificado / nutrição / fora do Brasil).
6. **Email obrigatório** na captura (`required: true`).
7. **Sem travessões** (traço longo) em NENHUM texto. Use vírgula,
   dois-pontos, parênteses ou reescreva. Faixas: "de X a Y".
8. **Acessibilidade**: opções como `radiogroup`/`radio` com teclado, foco
   visível, `prefers-reduced-motion`, `aria-live`.
9. **Favicon** próprio (SVG monograma + PNGs) na identidade do cliente.
10. **Quiz**: ordem SPIN (baixa fricção primeiro, qualificação por último),
    auto-avanço ao escolher, barra de progresso, "continuar de onde parou",
    tracking plugável (GA4/Meta Pixel em `TRACKING_CONFIG`).

## Integração de leads (Make → Google Sheets)

Padrão **webhook instant → Google Sheets addRow**. **Não usar polling** (gasta
crédito do Make à toa); o cenário roda só quando chega lead.

- **Planilha**: colunas `Nome | Email | WhatsApp | Data | <1..N perguntas> |
  utm_source | utm_medium | utm_campaign | utm_content | utm_term | Origem`.
  Crie via Drive (CSV → Sheets). Atenção: a aba de um CSV importado costuma se
  chamar **"Untitled"** (use esse nome no módulo, não "Página1").
- **Cenário**: módulo `gateway:CustomWebHook` → `google-sheets:addRow` (mode
  `fromAll`, mapeando posições 0..N). Use a conexão Google compartilhada do time.
- **Payload** que o `app.js` envia (já pronto em `enviarLead`):
  `{ name, email, whatsapp, frente, meta:{timestamp,page_url,referrer,user_agent},
  utms:{...}, answers:{q1..qN}, qualificacao }`. Mapeie `meta.timestamp` na coluna
  Data, `answers.qN` nas perguntas, `utms.*` e `meta.page_url` (Origem).
- Cole a URL do webhook em `LEADS_ENDPOINT` (`app.js`).
- **Editar a planilha por código** (apagar coluna/linhas) sem mudar o link: use o
  módulo `google-sheets:makeAPICall` chamando a Sheets API
  (`/spreadsheets/{id}:batchUpdate`, `deleteDimension`). O `sheetId` (GID) não é 0
  num CSV importado: pegue via GET `?fields=sheets(properties(sheetId,title))` num
  passo anterior e referencie `{{1.body.sheets[1].properties.sheetId}}`.

## Deploy (Vercel)

Projeto **estático** próprio por funil (framework "Other"), deploy direto da
pasta (sem git connect):

```bash
vercel deploy --prod --yes --scope <slug-do-time>
```

Cuidado: se o username pessoal e o slug do time forem iguais, `--scope` pode
resolver pra conta pessoal. A conta do time pode ter **SAML SSO** (a sessão do
token expira; é só gerar um token novo). Nunca commitar o token.

## Gerar os PNGs do favicon (sem rasterizador instalado)

Renderize o `favicon.svg` com o Chromium headless:

```js
// node com playwright-core; salva apple-touch-icon.png (180), favicon-32.png, favicon-16.png
import { chromium } from 'playwright-core';
import { readFileSync } from 'node:fs';
const svg = readFileSync('favicon.svg','utf8');
const b = await chromium.launch({ args:['--no-sandbox'] });
for (const [size,out] of [[180,'apple-touch-icon.png'],[32,'favicon-32.png'],[16,'favicon-16.png']]) {
  const p = await b.newPage({ viewport:{width:size,height:size} });
  await p.setContent(`<body style="margin:0">${svg.replace('width="64" height="64"',`width="${size}" height="${size}"`)}</body>`);
  await p.screenshot({ path: out, omitBackground: true });
}
await b.close();
```

## Checklist final antes de mandar tráfego

- [ ] `flow.js` com copy aprovada, WhatsApp real, sem travessões
- [ ] Paleta e favicon na identidade do cliente
- [ ] Depoimentos reais (imagens inteiras)
- [ ] `LEADS_ENDPOINT` ligado e **lead testado caindo na planilha**
- [ ] Loading ~5s e CTAs distribuídos funcionando
- [ ] `TRACKING_CONFIG` (GA4/Meta Pixel) quando o cliente liberar
- [ ] Deploy em produção + README do projeto atualizado
