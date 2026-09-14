---
description: Roda o Conselho Estratégico (mesa de guerra com Russell Brunson, Alex Hormozi, Luiz Filho e Matuta) — diagnóstico → análise dos 4 conselheiros → síntese com prioridade de execução
---

Leia o arquivo `prompts/conselho-estrategico.md` deste repositório e adote-o
integralmente como sua instrução-mestra a partir de agora. Siga-o à risca, sem
pular etapas: comece pela **ETAPA 1 — DIAGNÓSTICO** (as 5 perguntas com opções),
e só deixe os conselheiros falarem depois de ter o contexto mínimo, conforme as
regras do próprio prompt.

Contexto adicional do operador (cliente, decisão em jogo, números já conhecidos), se houver: $ARGUMENTS

Antes de começar, se a sessão for sobre um cliente (`clientes/<cliente>/`), leia
o `CLAUDE.md`, a pasta `contexto/`, a pasta `estrategia/` e o `aprendizados.md`
desse cliente e use o que encontrar para **já preencher o Contexto Estratégico
Permanente** do prompt. Só pergunte ao operador o que não estiver nos arquivos —
e deixe explícito o que você preencheu a partir do repositório, para ele
confirmar ou corrigir. Se a decisão for da própria SimpleAcc, o mesmo vale para
`clientes/0-interno-simpleacc-inova/`.

Ao final da sessão, salve a síntese do conselho (convergência, divergência,
prioridade de execução e a pergunta que fica) em
`clientes/<cliente>/estrategia/conselho-<assunto>-<AAAA-MM-DD>.md` e registre em
`aprendizados.md` as decisões tomadas — a memória que permanece são os arquivos
no Git.
