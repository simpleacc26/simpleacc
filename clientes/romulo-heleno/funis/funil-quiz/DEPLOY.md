# Deploy

Site estático puro (HTML/CSS/JS), sem build e sem dependência.

## Vercel (padrão Simple Acc)

- **Time:** Simpleacc (`team_bD5dst9eSAc4qVaaynXWifXr`). **Nunca conta pessoal.**
- **Projeto:** `romulo-heleno` (`prj_hMD7Iz8FaecxZdIjbq3AO0bPekVJ`) → https://romulo-heleno.vercel.app
- **Target:** production.

> A URL é o nome do projeto e **não dá para renomear**. O Rômulo confirmou em
> 27/08 que não tem domínio próprio, então esse endereço é o que circula com
> ele: não troque o projeto.

A publicação **substitui a árvore inteira**, não faz merge. Mande sempre os 14
arquivos (`index.html`, `diagnostico.html`, `styles.css`, `flow.js`, `app.js`,
`diagnostico.js`, `logo.svg`, `favicon.svg` e as 6 fotos em `fotos/`), mesmo os
que você não tocou. Arquivo faltando vira 404 mudo e o quiz abre sem JS, sem
CSS, sem nada.

### Caminho que funciona (validado em 27/08, com as fotos)

Sessão nova não vem com a pasta ligada ao projeto. **Ligue primeiro**, senão o
CLI cria um projeto novo com o nome da pasta (`funil-quiz`) e uma URL nova:

```bash
mkdir -p .vercel && cat > .vercel/project.json <<'JSON'
{"projectId":"prj_hMD7Iz8FaecxZdIjbq3AO0bPekVJ","orgId":"team_bD5dst9eSAc4qVaaynXWifXr","projectName":"romulo-heleno"}
JSON

export VERCEL_TOKEN='...'          # do ambiente, nunca do repositório
npx vercel@latest deploy . --prod --yes --token "$VERCEL_TOKEN"
```

`.vercel/` está no `.gitignore` da raiz e do projeto, então o arquivo de
ligação não vai para o Git. O `project.json` acima **não tem segredo**: é só o
id do projeto e o do time.

Prefira ligar pelo `project.json` a usar `--scope`: se o username pessoal e o
slug do time forem iguais, `--scope` pode resolver para a conta pessoal.
**Nunca commitar o token.**

## Depois de CADA deploy, confira o SHA256

Não confie no "deployment created". Compare byte a byte:

```bash
for f in index.html diagnostico.html styles.css flow.js app.js diagnostico.js \
         logo.svg favicon.svg fotos/trabalho-{1,2,3,4,5,6}.jpg; do
  L=$(sha256sum "$f" | cut -c1-12)
  R=$(curl -s "https://romulo-heleno.vercel.app/$f" | sha256sum | cut -c1-12)
  [ "$L" = "$R" ] && echo "$f OK" || echo "$f DIFERE"
done
```

## Fotos: por que o MCP não serve mais para publicar aqui

**Arquivo binário sobe corrompido pelo MCP da Vercel**, que transporta em
base64. No deploy de 26/08 o `favicon-32.png` voltou com 1 byte trocado e o
`apple-touch-icon.png` com 9. Os dois abriam normalmente como imagem, mesmo
tamanho, mesmas dimensões: só o SHA256 pegou. Os PNGs foram removidos e ficou
só o `favicon.svg`, que é texto.

**Desde 27/08 a pasta tem binário de novo**: as 6 fotos de trabalho em
`fotos/`. Com elas, o MCP deixou de ser caminho viável, e não só pelo risco de
corromper: as fotos somam ~500 KB, que viram ~680 KB de base64 que alguém teria
de reescrever inteiro **a cada deploy**, porque a publicação substitui a árvore.

**Publique com o CLI ou com a API REST, que leem o arquivo do disco.** Foi o
que rodou em 27/08: as 6 fotos subiram e os 14 arquivos voltaram com SHA256
idêntico ao local, binário incluído. O problema de corrupção era do transporte
base64 do MCP, e some quando o arquivo sai direto do disco.

```bash
# 1) sobe cada arquivo cru, sem base64 no meio
curl -X POST https://api.vercel.com/v2/files \
  -H "Authorization: Bearer $VERCEL_TOKEN" \
  -H "x-vercel-digest: $(sha1sum foto.jpg | cut -d' ' -f1)" \
  --data-binary @foto.jpg
# 2) cria o deployment referenciando os digests
curl -X POST "https://api.vercel.com/v13/deployments?teamId=team_bD5dst9eSAc4qVaaynXWifXr" ...
```

O CLI (`vercel deploy . --prod`) faz esses dois passos sozinho e é o caminho
curto. Os dois precisam de token, que **nunca vai para o repositório**: use
`VERCEL_TOKEN` no ambiente da sessão.

## Checklist antes de publicar

- [ ] `flow.js` com a copy aprovada, WhatsApp real e sem travessões
- [ ] Máscara testada com `+55 11 99991-2039` colado no campo (tela E payload)
- [ ] Distribuição dos pesos rodada de novo, se algum peso mudou (ver README)
- [ ] `LEADS_ENDPOINT` ligado e **lead testado caindo na planilha**, lendo a planilha
- [ ] Loading de ~5s e os 3 CTAs de WhatsApp funcionando
- [ ] Fotos abrindo (`fotos/trabalho-1..6.jpg`), sem 404, no celular e no desktop
- [ ] SHA256 de todos os arquivos conferido depois do deploy, fotos incluídas
- [ ] `TRACKING_CONFIG` (GA4/Meta Pixel), quando o tráfego pago for liberado
