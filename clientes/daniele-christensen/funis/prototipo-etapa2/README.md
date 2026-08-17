# Protótipo — Etapa 2 (Diagnóstico completo)

Protótipo navegável do formulário que o lead responde entre receber o PDF no
WhatsApp e escolher o horário da sessão estratégica.

## O que é

Página única, HTML puro, sem build e sem dependência.

**Este protótipo não está publicado.** A URL
`grokker-etapa2-diagnostico.vercel.app` serve a **versão de produção**, gerada a
partir deste arquivo por `../etapa2-producao/build.py` — é a página que a Pulsar
manda para o lead, sem a barra de demonstração.

Este arquivo é para revisar copy e inspecionar o payload, e abre direto do
disco:

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
index.html?lead=abc123&nome=Marcelo&email=marcelo@empresa.com.br&telefone=5511987654321&cenario=O%20Gargalo
```

`telefone` é o número que veio da Etapa 1. O formulário **não pergunta e não
reformata**: devolve no webhook exatamente o que recebeu, porque é por ele que
as duas etapas se cruzam. O painel mostra qual parâmetro foi lido.

## Planilha de respostas

`planilha/` tem o gerador do CSV que virou a planilha da Etapa 2 no Drive. É lá
que as respostas caem, com o cálculo já feito por fórmula. Detalhes e o contrato
de colunas em `estrategia/etapa2-diagnostico-profundo.md`.

## Agenda e envio

Os dois já estão ligados.

**Agenda:** Calendly da Grokker (`sucessodocliente-grokkeronline/30min`),
embutido na última tela, carregado só quando o lead chega lá. Nome e e-mail da
URL vão preenchidos.

**Envio:** `POST` para `https://pulsar.app.n8n.cloud/webhook/grokker-quiz-etapa2`
assim que a 15ª pergunta é respondida — sai por `fetch` com `keepalive` e cai
para `sendBeacon` se falhar, então nunca segura o lead. O painel mostra o status
do envio; o JSON continua visível ali.

Do lado do n8n falta liberar CORS para o domínio da página e aceitar
`application/json` **e** `text/plain` (o beacon usa o segundo para não pedir
preflight). Sem isso o envio falha sem o lead perceber.

## Antes de mexer

As 15 perguntas, a ordem dos blocos e a escala de pontuação são propriedade
intelectual da Grokker e a documentação proíbe alteração sem autorização por
escrito. Otimize a experiência à vontade; não reescreva pergunta.

A especificação completa, com as divergências entre a documentação e a reunião da
Pulsar e o que ficou valendo, está em
`estrategia/etapa2-diagnostico-profundo.md`.
