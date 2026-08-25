# Deploy

Site estático (HTML/CSS/JS). Publica em qualquer host estático.

## Vercel (padrão Simple Acc)

Projeto próprio por funil (framework "Other"), deploy direto da pasta:

```bash
vercel deploy --prod --yes --scope <slug-do-time>
```

Cuidado: se o username pessoal e o slug do time forem iguais, `--scope` pode
resolver pra conta pessoal. A conta do time pode ter **SAML SSO** (a sessão do
token expira; gere um token novo). **Nunca commitar o token.**

## Outros hosts

- **Netlify:** arraste a pasta em app.netlify.com, ou `netlify deploy --prod`.
- **GitHub Pages:** push pra branch `gh-pages` (ou `/docs` na main).
- **Cloudflare Pages:** conecte o repo ou faça upload da pasta.
- **Firebase Hosting:** `firebase deploy`.
- **Amazon S3:** upload + habilitar "static website hosting".

## Favicon (gerar os PNGs a partir do SVG)

Sem rasterizador instalado, renderize com o Chromium headless:

```js
// node + playwright-core. Gera apple-touch-icon.png (180), favicon-32.png, favicon-16.png
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

## Checklist antes de publicar

- [ ] `flow.js` com copy aprovada, WhatsApp real, sem travessões
- [ ] Paleta e favicon na identidade do cliente
- [ ] Depoimentos reais (imagens inteiras)
- [ ] `LEADS_ENDPOINT` ligado e **lead testado caindo na planilha**
- [ ] Loading ~5s e CTAs distribuídos funcionando
- [ ] `TRACKING_CONFIG` (GA4/Meta Pixel) quando o cliente liberar
