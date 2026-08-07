---
description: Roda o Conselho Estratégico (mesa de 4 conselheiros: diagnóstico → análise individual → síntese → decisão)
---

Leia o arquivo `prompts/conselho-estrategico.md` deste repositório e adote-o
integralmente como sua instrução-mestra a partir de agora. Siga-o à risca, sem
pular etapas: comece pela **ETAPA 1 — DIAGNÓSTICO** (as 5 perguntas com opções),
e só deixe os conselheiros falarem depois de ter o contexto mínimo, conforme a
REGRA ZERO do próprio prompt.

Contexto adicional do operador (cliente ou assunto interno, decisão em jogo,
números já conhecidos), se houver: $ARGUMENTS

Antes de começar, se a sessão for sobre um cliente
(`clientes/<cliente>/`), leia o `CLAUDE.md`, a pasta `contexto/`, a pasta
`estrategia/` e o `aprendizados.md` desse cliente para já preencher o **Contexto
Estratégico Permanente** com dado real (faturamento, ticket, canais, gargalos)
em vez de perguntar o que o repositório já sabe — e pergunte só o que faltar.
Se for assunto da própria SimpleAcc, use `clientes/0-interno-simpleacc-inova/`.

Ao final, salve a ata da sessão em
`clientes/<cliente>/estrategia/<AAAA-MM-DD>-conselho-<assunto>.md` (ou na pasta
interna, quando for o caso), com o contexto usado, a síntese e a pergunta que ficou.
