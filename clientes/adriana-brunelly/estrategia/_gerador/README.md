# Gerador do documento de validação

O documento `../2026-09-23-quiz-e-diagnostico-v2-para-validacao.html` **não é
escrito à mão**. Ele é montado a partir do funil que está no ar, em duas frentes:

- as perguntas, a captura, os buckets e a oferta saem de `dump.js`, que carrega
  o `flow.js` do funil e despeja tudo em `flow2.json`, junto de um exemplo
  calculado pelo `calculo.js` de verdade;
- a copy do diagnóstico sai de `extrai-diag.mjs`, que **abre a página num
  navegador** com respostas de exemplo e extrai os blocos renderizados.

Assim o documento não tem como divergir do funil. Documento escrito à mão sobre
funil que muda envelhece em uma semana.

## Como regerar

```bash
cd <este diretório>
npm install playwright            # se ainda não tiver
node dump.js                      # flow2.json
node extrai-diag.mjs              # diag-extraido.json
python3 gerar-doc.py              # o HTML, direto na pasta estrategia/
node checar-paginas.mjs           # confere estouro e preenchimento de cada página
node gerar-pdf.mjs                # o PDF ao lado do HTML
```

`checar-paginas.mjs` ignora `.runhead` e `.runfoot` de propósito: os dois são
`position:absolute` e apareceriam como estouro em toda página.

Alvo de preenchimento: **80% ou mais** por página. A primeira versão deste
documento saiu com metade da página vazia e o cliente reclamou, com razão.

Os caminhos dentro dos scripts são absolutos, apontando para
`funis/quiz-divida-de-valor/`. Se a pasta mudar de lugar, ajuste no topo de
`dump.js` e `extrai-diag.mjs`.
