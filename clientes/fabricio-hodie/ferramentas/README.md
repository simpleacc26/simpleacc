# Ferramentas · HODIE

## `extrai-copy-do-funil.mjs`

Gera o documento **Copy completa do funil do Índice do Metabolismo da Fome**,
que o cliente lê e comenta no Drive. Puxa cada texto dos arquivos do funil e do
arquivo de anúncios. **Não escreve copy nova**: se a página mudar, rode de novo
em vez de editar o documento à mão.

```bash
cd clientes/fabricio-hodie/ferramentas
node extrai-copy-do-funil.mjs   # gera hodie.md
```

Depois passe pelo `normaliza-paragrafos.py` que vive em
`clientes/fabricio-alves/ferramentas/`, que junta as quebras de linha, e suba o
`-final.md` para o Drive como Google Doc (`text/markdown`, que o Drive converte
com títulos e negrito).

**Documento no ar:** [Copy completa do funil do IMF](https://docs.google.com/document/d/1woQGhbUBIttq-m7fR2S5S94EHgjRnt5kiEnU6705sy0/edit)

### O que o extrator deixa de fora, de propósito

As linhas de **Ângulo** e **Atenção** do arquivo de anúncios são nota interna
para quem escreve, não são o anúncio. O extrator as remove, inclusive quando a
nota continua na linha de baixo. **Criativo**, **Título**, **Descrição** e
**CTA** ficam, porque são peça.

### Como conferir antes de entregar

Mesmo procedimento do Fabrício: `cmp` dos arquivos publicados contra o repo, e
renderização dos relatórios no navegador (semeando `sessionStorage`) para checar
que cada trecho do documento aparece literalmente em algum deles. Aqui são
5 perfis x 3 faixas do índice x 3 rotas de convite, 44 combinações no total.
