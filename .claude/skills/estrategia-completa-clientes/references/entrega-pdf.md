# Entrega · PDF paginado na pasta do cliente

> **Formato atual da casa, desde a Luana Isse (11/08/26).** O caminho antigo
> (markdown ou HTML convertido em Google Doc) está **aposentado**: gerava um
> documento sem identidade visual, que não conversa com o roadmap. Se encontrar
> instrução de "Abrir com Google Docs" em algum lugar do repo, está desatualizada.

## 1. Achar a pasta do cliente

`search_files` (MCP Drive) por título do cliente. A estratégia vai na pasta de
documentos do projeto (ex.: `Simple <> {Cliente} / 2026 / 1. Documentos`).
Guarde o `parentId`.

## 2. Gerar o PDF

Ache o navegador:

```bash
for BIN in "$PLAYWRIGHT_BROWSERS_PATH/chromium" /opt/pw-browsers/chromium \
  chromium chromium-browser google-chrome google-chrome-stable \
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"; do
  command -v "$BIN" >/dev/null 2>&1 || [ -x "$BIN" ] && { echo "$BIN"; break; }
done
```

Exporte:

```bash
<navegador> --headless --disable-gpu --no-sandbox --no-pdf-header-footer \
  --print-to-pdf="<nome de entrega>.pdf" "file://<caminho-absoluto>/<arquivo>.html"
```

Confira ao menos uma página densa com `--screenshot --window-size=794,1123`
(para ver a página N, esconda as anteriores com um CSS temporário
`.page:nth-of-type(-n+X){display:none;}`).

## 3. Nome do arquivo

Padrão da casa, igual ao da Luana:

```
Estratégia Completa + Copies <Tipo de Funil> <Nome do Cliente> - DD.MM.AA.pdf
```

Exemplo real: `Estratégia Completa + Copies Funil Quiz Luana Isse - 11.08.26.pdf`

## 4. Subir no Drive

`create_file` com `parentId` da pasta, `contentMimeType: "application/pdf"` e o
conteúdo em `base64Content`.

> **⚠️ Limite real, medido em 13/08/26.** O MCP só aceita o binário como base64
> **escrito dentro da chamada de ferramenta**. Um PDF de estratégia fica entre
> 240 e 400 KB, o que vira de 320 a 530 KB de texto, ou seja, de 80 a 130 mil
> tokens **gerados caractere a caractere**. Além do custo, um único caractere
> errado corrompe o arquivo. **Na prática, não suba PDF de estratégia por aqui.**
>
> **O que fazer:** entregue o PDF pelo chat (o cliente da sessão tem envio de
> arquivo) e peça para alguém do time arrastar para a pasta do Drive. Foi assim
> que o PDF da Luana chegou lá. O que **vale a pena** subir por MCP é conteúdo
> de texto (`textContent`), não binário.
>
> Antes de desistir, dá para reduzir o PDF com `pikepdf` (`pip install pikepdf`):
> `compress_streams=True, recompress_flate=True, object_stream_mode=generate`
> tirou 38% no PDF do Rafael (385 KB para 240 KB), sem perder nada. Continua
> grande demais para o MCP, mas ajuda no envio.

## 5. Limpar

O MCP tem `trash_file`. Se subiu uma versão errada ou um intermediário, mande
para a lixeira em vez de deixar dois arquivos de nome parecido na pasta do
cliente. Nunca apague arquivo do próprio cliente (canvas, materiais dele).

## 6. Entregar

Informe o link (`https://drive.google.com/file/d/{ID}/view`), confirme a pasta e
diga quantas páginas tem. Se o cliente ainda não tem acesso, diga isso também.

## Erros a evitar

- Não entregar Google Doc: o formato é PDF paginado.
- Não subir o HTML fonte na pasta do cliente. Ele vive no repo, não no Drive.
- Não confiar em nome de arquivo para escolher o que apagar: use ID, data e tamanho.
- Não pular a validação de paginação. Página estourada corta conteúdo no PDF e
  só se descobre depois que o cliente abriu.
