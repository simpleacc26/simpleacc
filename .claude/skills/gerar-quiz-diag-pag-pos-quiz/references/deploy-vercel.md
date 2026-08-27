# Publicar na Vercel

Funil no ar numa URL limpa e pública, no **time da Simple**. Entregue o link
no final.

---

## Trava obrigatória: conta da Simple

**Antes de qualquer deploy, confirme que está publicando no time da Simple,
nunca numa conta pessoal.** Se o time não aparecer, **pare e peça acesso**.

Nunca publique a raiz do workspace: ela tem dados de outros clientes. **Só a
subpasta do funil.**

---

## O nome do projeto é a URL, e não dá para renomear

O nome vira `<projeto>.vercel.app`. Trocar de domínio exige **projeto novo** e
remover o antigo. Escolha o nome com calma na primeira vez:
`quiz-<cliente>`.

O **link público é o curto**. O alias com sufixo do time
(`<projeto>-simpleacc.vercel.app`) também responde, mas é interno e costuma
ficar atrás de SSO.

---

## Proteção de deploy: o 302 em todos os assets

Times vêm com **Vercel Authentication ligada**. Sintoma: a página e todos os
assets respondem **302** para uma tela de login.

Funil público não pode exigir login. Desligue a proteção no projeto
(`ssoProtection: null` ou pelo painel) e **confirme com curl** que a raiz
responde 200.

---

## Caminho A: MCP (padrão, para texto e imagem pequena)

Serve para HTML, CSS, JS e imagem encolhida. **Manda o arquivo em base64**, e é
por isso que tem limite prático.

**Imagem em base64 pode sair com byte trocado.** Encolha antes e confira o
SHA256 depois. Ver `bugs-que-ja-quebraram.md`, item 5.

## Caminho B: API REST (obrigatório para vídeo e binário grande)

Manda o arquivo **cru do disco**, sem base64 nenhum.

```bash
# 1. cada arquivo, com o sha1 no header
SHA=$(sha1sum "$f" | cut -d' ' -f1)
curl -X POST "https://api.vercel.com/v2/files?teamId=$TEAM" \
  -H "Authorization: Bearer $TOKEN" \
  -H "x-vercel-digest: $SHA" \
  -H "Content-Type: application/octet-stream" \
  --data-binary "@$f"

# 2. o deploy, com a lista de TODOS os arquivos (file, sha, size)
curl -X POST "https://api.vercel.com/v13/deployments?teamId=$TEAM&forceNew=1" \
  -H "Authorization: Bearer $TOKEN" -H "Content-Type: application/json" \
  --data-binary @deploy.json
```

Duas coisas que mordem:

- **Upload de arquivo de megabytes falha por timeout de vez em quando** (deu 3
  de 13 numa rodada). Repita com backoff e **confira o 200 de cada um**.
- **A lista do passo 2 tem que trazer a árvore inteira.** A publicação
  substitui tudo, não faz merge.

O token fica **fora do repositório**, em arquivo com permissão 600. Nunca
commitado. Depois de usar, peça ao usuário para revogar.

---

## Conferência depois de todo deploy

**Compare o SHA256 do publicado contra o local em TODOS os arquivos**, não só
nos que você mexeu:

```bash
for f in <todos os arquivos>; do
  R=$(curl -s -o /tmp/dl -w '%{http_code}' "$B/$f")
  L=$(sha256sum "$f" | cut -c1-16); D=$(sha256sum /tmp/dl | cut -c1-16)
  [ "$L" = "$D" ] && echo "$R $f IGUAL" || echo "$R $f DIFERENTE"
done
```

**Status `000` é falha de conexão no download, não divergência.** Repita esse
arquivo antes de sair investigando.

---

## Validação visual sem internet no navegador

O Chromium do ambiente pode não alcançar a internet. Não trave por isso:

- Sirva a pasta local (`python3 -m http.server`) e renderize com Playwright em
  **430px e 900px**, injetando respostas no `sessionStorage` para chegar no
  relatório sem responder o quiz à mão.
- Confira o que só se vê renderizando: imagem que não carregou
  (`naturalWidth === 0`), grade que rola quando não devia, legenda desalinhada.
- **Cuidado com imagem `loading="lazy"`**: role até o bloco e espere antes de
  checar, senão dá falso negativo.

O que exige internet de verdade (o POST do lead chegando no Make) **é teste do
usuário**. Peça, não finja que fez.

---

## Entrega

Confirme por curl que a URL final responde 200 e serve o conteúdo. Entregue o
link curto e lembre: **o anúncio aponta para a raiz com `?utm_...`**, nunca para
`/index.html`, porque o servidor limpa a URL e derruba a query.
