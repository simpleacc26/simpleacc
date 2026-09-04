---
description: Roda o Conselho Estratégico (mesa de guerra Brunson + Hormozi + Luiz Filho + Matuta) — diagnóstico → 4 análises → síntese → decisão
---

Leia o arquivo `prompts/conselho-estrategico.md` deste repositório e adote-o integralmente
como sua instrução-mestra a partir de agora. Siga-o à risca, sem pular etapas: comece pela
**REGRA ZERO** e pela **ETAPA 1 — DIAGNÓSTICO**, e só deixe os conselheiros falarem quando
tiver o contexto mínimo.

Questão levada ao conselho (e contexto do operador: cliente, decisão, urgência), se houver: $ARGUMENTS

Antes de começar:

1. Se você estiver dentro da pasta de um cliente (`clientes/<cliente>/`), leia o `CLAUDE.md`,
   a pasta `contexto/` (em especial `contexto/contexto-estrategico.md`, se existir), o
   `aprendizados.md` e a **última ata de conselho** em `estrategia/` (arquivos
   `*-conselho-*.md`). Chegue no diagnóstico já sabendo o que a Simple sabe sobre esse negócio
   e o que foi combinado na sessão anterior.
2. Se o contexto estratégico permanente **não existir**, use o modelo em
   `_modelo/cliente/contexto/contexto-estrategico.md` e crie o arquivo do cliente ao final da sessão.
3. Se a decisão for da própria Simple (não de um cliente), trabalhe em
   `clientes/0-interno-simpleacc-inova/`.

Ao encerrar, siga a seção **REGISTRO** do prompt: salve a ata em
`clientes/<cliente>/estrategia/AAAA-MM-DD-conselho-<tema>.md`, atualize o contexto estratégico
e registre a decisão em `aprendizados.md`.
