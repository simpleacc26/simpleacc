# Leads com o telefone corrompido pelo bug do `+55` (19/08/2026)

Levantamento feito sobre a exportação da planilha de leads no dia 19/08, depois
que o cliente reportou números chegando errados. O bug e a correção estão no
README do funil, seção "Correção do campo de WhatsApp".

**9 linhas afetadas** entre as 60 da planilha, não as 4 que apareceram no print.

## O que dá e o que não dá para recuperar

O funil **nunca chegou a enviar os últimos dígitos**: a máscara antiga cortava o
número antes do envio, então eles não estão na planilha, nem no histórico do
Make, nem em lugar nenhum. Dá para reconstruir com certeza o **DDD e 7 dos 9
dígitos** do celular. Faltam os 2 últimos em 8 casos e o último em 1.

Como a reconstrução funciona: o valor gravado são os 11 primeiros dígitos de
`55 + DDD + celular` (13 dígitos). Tirando o `55` da frente sobram DDD + 7
dígitos, e os 2 finais se perderam no corte.

## As 9 linhas

| Linha | Nome | Está na planilha | Número real | E-mail | Origem |
|---|---|---|---|---|---|
| 2  | Cleuza | (03) 19960-4097 | (31) 99604-097? | cleusagomesroque@gmail.com | orgânico |
| 20 | Marilene | (55) 71988-4186 | (71) 98841-86?? | marilenequeiroz506@gmail.com | ManyChat |
| 27 | Elisangela | (55) 11933-9624 | (11) 93396-24?? | larafarias898@gmail.com | Meta pago |
| 33 | Maria Isabel Gross | (55) 54993-2784 | (54) 99327-84?? | grossmariagramadors@gmail.com | Meta pago |
| 35 | Eliana M. Gonçalves | (55) 31999-5990 | (31) 99959-90?? | elianamgoncalves@edu.pbh.gov.br | ManyChat |
| 36 | Ingrid Gois | (55) 15997-0964 | (15) 99709-64?? | ingridgois2401@gmail.com | Meta pago |
| 52 | Simone Ramilo | (55) 19991-2039 | (19) 99120-39?? | siramilo71@gmail.com | Meta pago |
| 53 | Vanessa Simplício | (55) 48996-4711 | (48) 99647-11?? | vanessasimplicio69@gmail.com | Meta pago |
| 55 | Leydivania | (55) 84996-6548 | (84) 99665-48?? | leydivaniaanisioanisio06@gmail.com | Meta pago |

A linha 2 (Cleuza) é uma variação do mesmo bug: em vez do `+55`, veio o DDD no
formato antigo com zero na frente (`031`), que também entrou como se fosse
dígito do número. Por isso ali se perdeu só 1 dígito.

## Duas confirmações de que a reconstrução está certa

Duas linhas se confirmam sozinhas, sem precisar supor nada:

- **Maria Isabel Gross** reconstrói com DDD **54** (Caxias do Sul/Gramado) e o
  e-mail dela é `grossmariagramadors@gmail.com`.
- **Eliana** reconstrói com DDD **31** (Belo Horizonte) e o e-mail dela é
  `@edu.pbh.gov.br`, da Prefeitura de Belo Horizonte.

Os 9 DDDs reconstruídos são todos válidos e coerentes: 11, 15, 19, 31, 48, 54,
71, 84.

## Dois alarmes falsos

- **(61) 99374-8030** (Bruna, linha 54) **está correto**: DDD 61, celular com 11
  dígitos começando em 9. Não foi afetado, pode contatar direto.
- **(19) 95270-2006** (Irani, linha 19), marcada como "número incorreto", também
  é estruturalmente válida. Não é o bug do `+55`: ou ela digitou errado, ou
  trocou de número. O e-mail dela também tem erro de digitação (`gmail.cm`), o
  que reforça a hipótese de pressa no preenchimento.

## Como recuperar

O canal é o **e-mail**, que chegou certo nas 9. Testar os 2 dígitos que faltam
dá 100 combinações por lead, não se paga na mão.

- **Cleuza, Marilene e Eliana** vieram de ManyChat/orgânico: o contato existe lá
  com o perfil do Instagram, dá para retomar a conversa sem depender do telefone.
- **As outras 6** vieram de tráfego pago, então só resta o e-mail.

Sugestão: um disparo curto para as 9, no tom do quiz, pedindo o WhatsApp para
enviar o diagnóstico.

> Nenhum lead novo entra assim: a correção subiu em 13/08 e está no ar em
> https://quiz-thiagovitorio.vercel.app.
