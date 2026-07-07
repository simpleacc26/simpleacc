# Relatório (Diagnóstico Estratégico) — Vitória Daniela

Item 3 da ordem de execução. A cliente decidiu manter **um único relatório
genérico** (não por balde) — então este é o escopo final do item 3, não uma
etapa intermediária.

## Por que isso existe fora do Figma

O relatório original vive em Figma Make
(`https://www.figma.com/make/fiASU8LAlKiSqhhEqt4iI2/Relatorio-Vitoria--Copy-`),
mas o Daniel só tem acesso de **visualização** nesse arquivo (não é dono, e o
dono não pode dar acesso de edição no momento). Sem edição, também não dá
pra ler o código-fonte por API (o mesmo `get_design_context` que funcionou
pro quiz e pra LP devolveu "sem acesso de edição" aqui).

Por pedido do Daniel, recriei o relatório **fora do Figma**, em HTML puro,
pra dar autonomia total de edição sem depender de acesso a esse arquivo.

## Como foi recriado

O conteúdo (texto) veio 1:1 do PDF que já é enviado hoje pros leads
("Diagnóstico Estratégico Personalizado - Vitória Daniela.pdf", na pasta do
cliente no Drive) — 10 blocos ("slides"): capa, carta de abertura, os 3
motivos, por que já tentou de tudo, prova social, os 4 passos da sessão,
sobre a Vitória, pra quem é/não é, recapitulando, e a chamada final com as 2
opções.

O visual (fundo preto/dourado `#Cfb36e`, cards com borda `#222`, tipografia
Montserrat, botão verde do WhatsApp) segue a **mesma identidade** já usada
no quiz e na LP — não tive acesso ao visual exato do arquivo original do
Figma, então recriei com o sistema visual que a Vitória já aprovou nos
outros dois funis, pra manter tudo consistente. As duas fotos usadas (capa e
seção "sobre") são as mesmas já em uso na LP (`Hero.tsx` e `AboutExpert.tsx`).

## Arquivos

- `Diagnostico-Estrategico-Vitoria-Daniela.html` — versão HTML, autocontida
  (fotos embutidas em base64, abre em qualquer navegador sem depender de
  internet nem de arquivos externos). É o arquivo "fonte" pra editar texto.
- `Diagnostico-Estrategico-Vitoria-Daniela.pdf` — versão PDF gerada a partir
  do HTML, uma página por bloco/"slide", pronta pra enviar como está hoje.
- `template.html` — mesmo HTML, mas com placeholders no lugar das fotos e do
  link do WhatsApp (usado para gerar o HTML final; editar aqui se for trocar
  foto/link, depois re-gerar).
- `assets/` — as 2 fotos usadas, em PNG.

## Pendências / próximos passos

- **Confirmar com a Vitória** se o conteúdo bate com o relatório atual dela
  (não tive como comparar lado a lado com o Figma original por falta de
  acesso — só com o PDF que já é enviado hoje, que deveria ser a mesma
  fonte).
- O botão de WhatsApp aponta para o mesmo número usado na LP/quiz
  (5533997064731) com uma mensagem genérica de abertura — ajustar se for
  diferente.
- Esse relatório ainda não foi atualizado com a nova linguagem do quiz v2
  (baldes, "autoridade offline → digital"). Isso é opcional pra essa rodada
  — a cliente pediu recriar **exatamente igual** ao que existe hoje, não
  atualizar o conteúdo. Se quiser alinhar o relatório à nova linha de
  comunicação, é um passo separado, a decidir depois.
- Publicar: como esse HTML não está hospedado em lugar nenhum ainda (ao
  contrário do quiz/LP, que são o site ao vivo), falta decidir onde ele vai
  morar de fato — pode virar um projeto Vercel próprio dentro dessa mesma
  pasta, ou ser o arquivo que a automação do GHL/Make manda como anexo.
