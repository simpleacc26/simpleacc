# Relatório do Quiz A em PDF (gerado por lead)

O relatório do Quiz A não tem 4 versões fixas: ele é um texto único com **4
respostas do lead encaixadas dentro dele** (objetivo, gargalo, custo e o que já
tentou), mais o nome. São 4 × 4 × 4 × 4 = **256 combinações possíveis**, então
não dá pra pré-gerar arquivos estáticos sem perder as respostas da pessoa.

Por isso aqui o PDF é montado na hora, com os dados daquele lead.

## Por que sai idêntico à tela

`corpo-template.html` **não foi reescrito à mão**. É o HTML renderizado,
capturado direto do app em produção (`quiz.rafaelgranella.com.br`), com os
trechos variáveis trocados por marcadores (`{{NOME}}`, `{{GARGALO}}`, etc.).
`estilos-producao.css` é o CSS de produção, sem alteração.

Ou seja, o PDF é a mesma marcação e o mesmo estilo que o lead viu, só que
impressos. Se o app de produção mudar, é preciso recapturar (ver abaixo).

## Gerar um PDF

```bash
node gerar.mjs saida.pdf '{
  "nome": "Fulano de Tal",
  "objetivo": "Romper a barreira de R$100k por mês com consistência",
  "gargalo": "Escalar sem depender só de mim",
  "custo": "Gasto tempo demais em operação e pouco em estratégia",
  "tentou": "Investi em tráfego pago ou marketing digital"
}'
```

Os valores são o **texto exato** das opções do quiz, que é o mesmo texto que
chega no webhook do Make (`resposta_*`). O parágrafo de próximo passo é
escolhido automaticamente pelo gargalo, igual ao app faz (ver `dados.mjs`).

De onde vem cada campo, no payload do webhook do Quiz A:

| Campo aqui | Vem de | Pergunta |
| --- | --- | --- |
| `nome` | `nome` | — |
| `objetivo` | `resposta_6` | Qual é o seu objetivo principal para os próximos 12 meses? |
| `gargalo` | `resposta_3` | Qual é o maior gargalo no seu negócio de mentoria hoje? |
| `custo` | `resposta_4` | E como isso está impactando o seu negócio hoje? |
| `tentou` | `resposta_5` | O que você já tentou para resolver esse gargalo? |

## Recapturar o template (se o relatório de produção mudar)

O template foi extraído automatizando o quiz num espelho local do bundle de
produção. O procedimento está registrado em
`../../../estrategia/2026-07-31-relatorio-no-whatsapp-diagnostico.md`.
