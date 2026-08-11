# Entrega — Google Doc formatado no Drive

> **ATALHO VALIDADO (20/07/26, estratégia do Lucas Sobreiro):** o MCP de Drive
> converte **`contentMimeType: "text/markdown"` direto para Google Doc nativo
> formatado** (títulos, negrito, listas), sem passo de navegador. Use
> `create_file` com `parentId` da pasta do cliente, `textContent` = o markdown
> completo, e confira o resultado (mimeType `application/vnd.google-apps.document`
> na resposta). **Tente este caminho primeiro.** O fluxo HTML → "Abrir com
> Google Docs" abaixo vira fallback para quando a conversão não aplicar a
> formatação esperada.

O objetivo é entregar um **Google Doc nativo e formatado** (Título 1/2, negrito,
listas, divisórias) na pasta do cliente. A formatação importa: foi o que fez o
cliente aprovar de imediato. Um "textão" cru passa a impressão de rascunho.

## Por que não dá pra fazer do jeito óbvio

A integração de Drive (MCP `create_file`) só converte automaticamente
`text/plain → Google Doc` e `text/csv → Sheet`. Consequências testadas:
- Subir **texto puro** → vira Doc, mas **sem nenhum estilo** (tudo Normal). Ruim.
- Subir **HTML** com `contentMimeType: text/html` → fica como **arquivo .html**
  (não converte sozinho).
- Subir **Markdown** → fica como arquivo .md (não converte).
- Subir **.docx** via `base64Content` → **inviável**: base64 de um .docx tokeniza
  altíssimo (um .docx de ~50KB vira ~180k tokens), estoura o limite.
- `file_upload` do Chrome → **rejeita** caminhos locais que não foram
  compartilhados na sessão (então não adianta gerar .docx local e tentar subir).

## O caminho que funciona (HTML → "Abrir com Google Docs")

A importação de HTML do Google Docs converte `<h1>`→Título 1, `<h2>`→Título 2,
`<strong>`→negrito, `<ul>/<ol>`→listas, `<hr>`→divisória. Então:

### 1. Gere o conteúdo como UM arquivo HTML
Tags suportadas e suficientes: `<h1> <h2> <h3> <p> <strong> <em> <ul><li>
<ol><li> <br> <hr>`. Escreva o documento inteiro (as 8 seções) nesse HTML.
Salve localmente (ex: `~/Downloads/<cliente>_estrategia.html`) — útil como backup.

### 2. Ache a pasta do cliente no Drive
Use `search_files` (MCP Drive) por título do cliente para localizar a pasta de
documentos do projeto (ex: `Simple <> {Cliente} / 2026 / 1. Documentos`).
Guarde o `parentId` da pasta.

### 3. Suba o HTML na pasta (via MCP Drive)
`create_file` com: `parentId` = pasta do cliente, `contentMimeType: "text/html"`,
`textContent` = o HTML completo (UTF-8; pode conter acentos/emojis). Ele fica
como arquivo .html na pasta — é o passo intermediário.

### 4. Converta para Doc formatado (via navegador / Chrome MCP)
- Liste os browsers conectados; garanta que o Chrome está logado numa conta com
  **acesso de escrita à pasta** (pode ser uma conta diferente da que a API usa —
  ambas precisam ter acesso).
- Navegue até o preview do HTML: `https://drive.google.com/file/d/{ID_DO_HTML}/view`
  (o `create_file` retorna o `id`). Navegar pelo ID evita confusão quando há
  arquivos de nome igual.
- Clique em **"Abrir com Google Docs"** (botão no topo do preview; ache via
  `find` se as coordenadas variarem). Isso cria um **Doc nativo formatado** na
  **mesma pasta**, e abre numa aba nova.
- Confira numa screenshot: títulos como Heading, negrito aplicado, **sem tags
  literais** (`<h1>` etc.) no corpo. Se aparecerem tags literais, algo foi
  importado errado — descarte esse Doc e refaça.

### 5. Limpe os arquivos intermediários
Você vai terminar com vários arquivos de **nome idêntico** na pasta (o .html
fonte, talvez um Doc de texto puro de tentativa anterior, arquivos de teste).
Isso confunde o cliente. Limpe:
- Na lista da pasta, identifique o **Doc formatado a manter** pelo mais recente +
  tamanho maior (o convertido). Selecione os intermediários (o .html fonte e
  qualquer teste) e mande pra lixeira (ícone de lixeira da barra de seleção).
- Cuidado pra **não apagar o Doc formatado nem arquivos do cliente** (ex: Canvas).
- O MCP Drive **não tem ferramenta de apagar** — a limpeza é feita pelo navegador.
  Se a conta do navegador não conseguir apagar (arquivos "Externos", de outro
  dono), use "Remover da pasta" ou avise a pessoa quais 2 arquivos remover.

### 6. Entregue
Informe o **link do Doc final** (`https://docs.google.com/document/d/{ID}/edit`)
e confirme que está na pasta certa, formatado e sem duplicados.

## Erros a evitar (resumo)
- Não tente subir `.docx`/HTML esperando conversão automática pela API — não converte.
- Não tente `file_upload` de arquivo local não-compartilhado — é rejeitado.
- Não confie em nome de arquivo pra escolher o que apagar — use ID/data/tamanho.
- Não deixe a extensão do Chrome travar o fluxo: se cair ("not connected"), é
  transitório; recarregue o contexto de abas e tente de novo.

## Alternativa manual (sem navegador)
Se o Chrome MCP não estiver disponível, gere o conteúdo como `.docx` localmente
(títulos/negrito reais) e oriente a pessoa a **arrastar o .docx pra pasta do
Drive** e "Abrir com Google Docs" — resultado formatado em poucos cliques. O doc
do Rafael, inclusive, é um `.docx` no Drive, então `.docx` também é fiel ao modelo.
