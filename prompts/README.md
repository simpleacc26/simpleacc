# Prompts mestres (padrões compartilhados)

Aqui ficam os **prompts mestres** da SimpleAcc — a "inteligência de especialistas"
que a gente reaproveita para todos os clientes. Cada prompt tem **uma fonte de
verdade** (um arquivo `.md` nesta pasta) e um **comando** correspondente em
`.claude/commands/` para rodar fácil em qualquer sessão.

## Prompts disponíveis

| Comando   | Fonte                      | Para quê |
| --------- | -------------------------- | -------- |
| `/funil`  | `prompts/funil-html.md`    | Criar funil/página completa em HTML puro ou anúncios (copy + criativo). Conduz diagnóstico → aprofundamento → geração. |

## Skills disponíveis

Skills ficam em `.claude/skills/` e são acionadas automaticamente pela IA quando
a tarefa combina (ou você pode pedir pelo nome).

| Skill (nome interno)            | Para quê |
| ------------------------------- | -------- |
| `estrategia-completa-clientes`  | **Estratégia Completa para Clientes** — a partir do onboarding (transcrição/notas), gera o documento de estratégia de 8 seções e entrega como Google Doc formatado na pasta do cliente no Drive. |

## Como usar

Em qualquer sessão, digite o comando (ex.: **`/funil`**) e o agente assume o papel
do prompt mestre. Se você estiver na pasta de um cliente, ele já puxa o contexto
daquele cliente antes de começar.

## Como adicionar um novo prompt mestre

1. Crie o conteúdo em `prompts/<nome>.md` (a fonte de verdade, editável por todos).
2. Crie o comando em `.claude/commands/<nome>.md` apontando para esse arquivo
   (use o `funil.md` como modelo).
3. Adicione uma linha na tabela acima.

> Editar o prompt = editar o arquivo em `prompts/`. O comando só aponta para ele,
> então a melhoria vale para todos os clientes de uma vez.
