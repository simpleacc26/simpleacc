# Redirect do endereço antigo

Conteúdo do projeto Vercel **`diagnostico-ges360`**, que era o endereço original
do funil. Ele **não serve mais o funil**: só redireciona para o oficial,
`quiz-guilhermeeduardo.vercel.app`, preservando a query string (as UTMs).

## Por que isso existe

Quando o funil mudou de endereço, o projeto antigo ficou no ar servindo a
**cópia daquele momento**. Essa cópia tinha `LEADS_ENDPOINT = ""`, ou seja:
quem entrasse pelo link antigo respondia o quiz inteiro, via o diagnóstico
normalmente e **o lead não ia para a planilha**. Nada falhava na tela, o que
torna o problema silencioso e difícil de perceber.

Aconteceu de verdade em 12/08, num teste do Daniel.

## A raiz precisa de regra própria

`"source": "/:path*"` casa com qualquer caminho, **menos com a raiz**: `/` tem o
segmento vazio e escapa da regra, caindo no `index.html` estático. Era o que
acontecia aqui: `/diagnostico.html` redirecionava com 307, e `/` devolvia 200.
Justo a URL que vai no anúncio e na bio do Instagram era a única sem redirect de
servidor, salva só pelo `location.replace` do `index.html`.

Por isso o `vercel.json` tem **duas** regras, `/` e `/:path*`. Ao testar, teste a
raiz separado, porque testar só um caminho qualquer dá 307 e engana:

```bash
curl -s -o /dev/null -w '%{http_code} -> %{redirect_url}\n' https://diagnostico-ges360.vercel.app/
```

## Regra que fica

Ao trocar um funil de endereço, o endereço antigo tem que **redirecionar**, nunca
continuar servindo uma cópia. Cópia parada vira armadilha: ela envelhece sozinha
e ninguém percebe até um lead sumir.
