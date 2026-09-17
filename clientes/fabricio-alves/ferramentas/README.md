# Ferramentas · Fabrício Alves

## `extrai-copy-do-funil.mjs`

Gera o documento **Copy completa do funil Prova de Carga**, que o cliente lê e
comenta no Drive. Puxa cada texto dos arquivos do funil, dos anúncios e dos
roteiros. **Não escreve copy nova**: se a página mudar, rode de novo em vez de
editar o documento à mão.

```bash
cd clientes/fabricio-alves/ferramentas
node extrai-copy-do-funil.mjs        # gera fabricio.md
python3 normaliza-paragrafos.py      # junta as quebras de linha, gera *-final.md
```

O `-final.md` é o que sobe para o Drive como Google Doc (`text/markdown`, que o
Drive converte com títulos e negrito).

**Documento no ar:** [Copy completa do funil Prova de Carga](https://docs.google.com/document/d/1KqEP6DP8_sOvRG0RljP5soFRN5I-1kU47M0TiuRa2Xg/edit)

### Como conferir antes de entregar

A regra do pedido é que o documento seja igual ao que está no ar. A conferência
que fecha isso tem dois passos:

1. `curl` em cada arquivo do funil publicado e `cmp` contra o repo, para provar
   que os arquivos de onde a copy sai são os que estão servindo a página.
2. Renderizar os relatórios no navegador (semeando as respostas em
   `sessionStorage` e lendo o `innerText`) e checar que cada trecho do documento
   aparece literalmente em algum deles.

Sem o passo 2, uma variação que só aparece em certa combinação de respostas
passa despercebida. Foi assim que apareceram a conta como número único e o
parágrafo do segundo eixo, que nenhuma das 36 combinações comuns produz.

## `recorte-gravuras.py`

Recorta as gravuras da image-bible com alfa por diferença de luminância. Ver o
comentário no topo do arquivo.
