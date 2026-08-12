# Protótipo — Etapa 2 (Diagnóstico completo)

Protótipo navegável do formulário que o lead responde entre receber o PDF no
WhatsApp e escolher o horário da sessão estratégica.

## O que é

Página única, HTML puro, sem build e sem dependência.

**No ar:** https://grokker-etapa2-diagnostico-simpleacc.vercel.app
(projeto `grokker-etapa2-diagnostico` na Vercel, conta simpleacc, sem proteção de
login, com `noindex` no HTML e no header `X-Robots-Tag`.)

Também abre direto do disco:

```
clientes/daniele-christensen/funis/prototipo-etapa2/index.html
```

Fluxo: abertura com a escala explicada → 15 perguntas, uma por tela → tela de
processamento → confirmação com a agenda.

## O que dá para testar

A barra do topo é de demonstração e **não faz parte da página real**:

- **Reiniciar** — volta para a abertura.
- **Preencher: dor alta / baixa / misto** — respostas fixas para ver o cálculo
  sem responder as 15. O "misto" é o caso interessante: TD médio com bloco A
  alto, que é onde a régua da Grokker manda o Closer atacar o bloco e não a média.
- **O que vai para o CRM** — abre as notas por bloco, o TD, o bloco dominante, a
  etiqueta de Lead Hot e o JSON exato do webhook. O lead nunca vê nada disso.

Dá para simular o link real com os parâmetros que a Pulsar vai mandar:

```
index.html?lead=abc123&nome=Marcelo&cenario=O%20Gargalo
```

## Planilha de respostas

`planilha/` tem o gerador do CSV que virou a planilha da Etapa 2 no Drive. É lá
que as respostas caem, com o cálculo já feito por fórmula. Detalhes e o contrato
de colunas em `estrategia/etapa2-diagnostico-profundo.md`.

## O que não está aqui

- **A agenda** é um espaço reservado na última tela. Depende de definir com a
  Pulsar se embutimos o widget deles ou redirecionamos.
- **O envio** não acontece: o JSON é montado e exibido, não postado.

## Antes de mexer

As 15 perguntas, a ordem dos blocos e a escala de pontuação são propriedade
intelectual da Grokker e a documentação proíbe alteração sem autorização por
escrito. Otimize a experiência à vontade; não reescreva pergunta.

A especificação completa, com as divergências entre a documentação e a reunião da
Pulsar e o que ficou valendo, está em
`estrategia/etapa2-diagnostico-profundo.md`.
