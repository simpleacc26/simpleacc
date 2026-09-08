# Funil Quiz (template Simple Acc)

Funil em HTML puro, sem build, sem dependências: **Hero + Quiz (SPIN) → Loading
(~5s) → Captura → Diagnóstico personalizado** com CTAs no WhatsApp.

Padrão de escrita: **nunca usar travessões (traço longo)**.

## Arquivos

```
index.html        Hero + barra de progresso + container
styles.css        Sistema visual (só a PALETA em :root muda por cliente)
flow.js           TODA a copy: marca, hero, perguntas, captura  <- principal a editar
app.js            Motor: render, auto-avanço, máscara, validação, persistência,
                  tela de loading (~5s), envio do lead
diagnostico.html  Página do relatório
diagnostico.js    Relatório + CTAs distribuídos (.cta-wpp)
favicon.svg       Monograma (ajuste letra/cor; gere os PNGs)
```

## Como rodar localmente

É estático: abra o `index.html`, ou `npx serve .` (ou `python3 -m http.server`).

## Como personalizar

1. **`flow.js`**: marca, WhatsApp (só dígitos), hero, perguntas (com `report`),
   qualificação (`foraDeArea`/`nutrir`), captura. `config.storeKey` único.
2. **Placeholders nos HTML**: `__MARCA__`, `__TAGLINE__`, `__TITULO__`,
   `__TITULO_DIAGNOSTICO__`, `__META_DESCRICAO__`, `__RODAPE_DIAGNOSTICO__`.
3. **`STORE_KEY`** igual em `flow.js` e `diagnostico.js`.
4. **Paleta**: CSS vars no `:root` do `styles.css` (mantenha `--primary`,
   `--primary-700`, `--accent-soft`).
5. **Relatório** (`diagnostico.js`): copy das seções ao nicho.
6. **Depoimentos**: prints em `./depoimentos/01.jpeg...` e liste no
   `diagnostico.js`. Imagens inteiras.
7. **Favicon**: edite `favicon.svg` e gere os PNGs (ver DEPLOY.md).

## Destino do lead (Make → Google Sheets)

Cole a URL do webhook do Make em `LEADS_ENDPOINT` (`app.js`). O envio já é
`application/json` (o Make só estrutura assim) + `keepalive`. Veja o guia da
skill `criar-funil-quiz` para montar o cenário e a planilha.

## Tracking

`TRACKING_CONFIG` no topo do `app.js` (GA4 / Meta Pixel / webhook). Vazio = só
`console.log`.
