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

## Regra que fica

Ao trocar um funil de endereço, o endereço antigo tem que **redirecionar**, nunca
continuar servindo uma cópia. Cópia parada vira armadilha: ela envelhece sozinha
e ninguém percebe até um lead sumir.
