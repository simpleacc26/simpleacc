# Deploy

Site estático puro (HTML/CSS/JS), sem build e sem dependência.

## Vercel (padrão Simple Acc)

- **Time:** Simpleacc (`team_bD5dst9eSAc4qVaaynXWifXr`). **Nunca conta pessoal.**
- **Projeto:** `romulo-heleno` → https://romulo-heleno.vercel.app
- **Target:** production.

A publicação **substitui a árvore inteira**, não faz merge. Mande sempre os 7
arquivos (`index.html`, `diagnostico.html`, `styles.css`, `flow.js`, `app.js`,
`diagnostico.js`, `favicon.svg`), mesmo os que você não tocou. Arquivo faltando
vira 404 mudo e o quiz abre sem JS, sem CSS, sem nada.

Pelo CLI, dentro desta pasta:

```bash
vercel deploy . --prod --yes --scope simpleacc --token <TOKEN>
```

Cuidado: se o username pessoal e o slug do time forem iguais, `--scope` pode
resolver para a conta pessoal. **Nunca commitar o token.**

## Depois de CADA deploy, confira o SHA256

Não confie no "deployment created". Compare byte a byte:

```bash
for f in index.html diagnostico.html styles.css flow.js app.js diagnostico.js favicon.svg; do
  L=$(sha256sum "$f" | cut -c1-12)
  R=$(curl -s "https://romulo-heleno.vercel.app/$f" | sha256sum | cut -c1-12)
  [ "$L" = "$R" ] && echo "$f OK" || echo "$f DIFERE"
done
```

## Por que não existe binário nesta pasta

**Arquivo binário sobe corrompido pelo MCP da Vercel**, que transporta em
base64. No deploy de 26/08 o `favicon-32.png` voltou com 1 byte trocado e o
`apple-touch-icon.png` com 9. Os dois abriam normalmente como imagem, mesmo
tamanho, mesmas dimensões: só o SHA256 pegou. Os PNGs foram removidos e ficou
só o `favicon.svg`, que é texto. **Se um dia precisar subir imagem aqui, use a
API REST da Vercel** (`POST /v2/files` com `--data-binary @arquivo` e o header
`x-vercel-digest: <sha1>`, depois `POST /v13/deployments` com a árvore inteira),
que manda o arquivo cru do disco e não passa por base64.

## Checklist antes de publicar

- [ ] `flow.js` com a copy aprovada, WhatsApp real e sem travessões
- [ ] Máscara testada com `+55 11 99991-2039` colado no campo (tela E payload)
- [ ] Distribuição dos pesos rodada de novo, se algum peso mudou (ver README)
- [ ] `LEADS_ENDPOINT` ligado e **lead testado caindo na planilha**, lendo a planilha
- [ ] Loading de ~5s e os 3 CTAs de WhatsApp funcionando
- [ ] SHA256 de todos os arquivos conferido depois do deploy
- [ ] `TRACKING_CONFIG` (GA4/Meta Pixel), quando o tráfego pago for liberado
