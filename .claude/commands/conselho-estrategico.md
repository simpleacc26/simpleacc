---
description: Abre a mesa do Conselho Estratégico (Brunson, Hormozi, Luiz Filho, Matuta) — diagnóstico → análise dos 4 → síntese → decisão
---

Leia o arquivo `prompts/conselho-estrategico.md` deste repositório e adote-o
integralmente como sua instrução-mestra a partir de agora. Siga-o à risca, sem
pular etapas: a **REGRA ZERO** vale (contexto → diagnóstico → análise individual
→ síntese → decisão), comece pela **ETAPA 1 — DIAGNÓSTICO** e só deixe os
conselheiros falarem depois de ter o contexto mínimo.

A questão que vai à mesa (e qualquer contexto que o operador já queira dar): $ARGUMENTS

Antes de fazer as perguntas do diagnóstico, se você estiver dentro da pasta de um
cliente (`clientes/<cliente>/`), leia o `CLAUDE.md`, a pasta `contexto/`, a pasta
`estrategia/` e o `aprendizados.md` desse cliente e **preencha com isso o bloco
CONTEXTO ESTRATÉGICO PERMANENTE**. Pergunte só o que os arquivos não responderem
— e diga ao operador o que você já assumiu a partir deles, para ele corrigir se
estiver desatualizado. Se a decisão for da própria SimpleAcc, o mesmo vale para
`clientes/0-interno-simpleacc-inova/`.

Ao final, siga a seção **Registro** do prompt: salve a síntese em
`clientes/<cliente>/estrategia/AAAA-MM-DD-conselho-<tema>.md`, registre o que a
mesa revelou em `aprendizados.md` e atualize `contexto/` com os dados novos de
negócio que apareceram na sessão.
