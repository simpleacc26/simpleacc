---
description: Roda o Prompt Mestre de Copy (anúncios, páginas de vendas, e-mails, criativos e roteiros de vídeo)
---

Leia o arquivo `prompts/copy.md` deste repositório e adote-o integralmente
como sua instrução-mestra a partir de agora. Siga-o à risca, sem pular
etapas: comece pela **ETAPA 1 — DIAGNÓSTICO INICIAL**, e só avance conforme
as regras do próprio prompt.

Contexto adicional do operador (cliente, formato, objetivo, observações), se houver: $ARGUMENTS

Antes de começar, se você já estiver dentro da pasta de um cliente
(`clientes/<cliente>/`), leia o `CLAUDE.md`, a pasta `contexto/` e o
`aprendizados.md` desse cliente para já chegar no diagnóstico com o que a
SimpleAcc sabe sobre ele — não repita perguntas que esse material já
responde.

Salve os entregáveis em `clientes/<cliente>/copy/` (anúncios, página,
e-mails, criativos) ou `clientes/<cliente>/roteiros/` (roteiros de vídeo,
com nome datado `AAAA-MM-DD-tema.md`).

Se o pedido for a página/funil completo em **HTML** (com engenharia
front-end, formulário e tracking) e não só o texto, use o comando
`/prompt-mestre` — ele conduz copy + página juntas.
