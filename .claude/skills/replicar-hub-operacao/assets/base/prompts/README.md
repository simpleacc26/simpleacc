# Prompts mestres (padrões compartilhados)

Aqui ficam os **prompts mestres** da {{EMPRESA}} — a "inteligência de especialistas"
que a gente reaproveita para todos os clientes. Cada prompt tem **uma fonte de
verdade** (um arquivo `.md` nesta pasta) e um **comando** correspondente em
`.claude/commands/` para rodar fácil em qualquer sessão.

## Prompts disponíveis

| Comando | Fonte | Para quê |
| ------- | ----- | -------- |
| _(a preencher)_ | | |

## Skills disponíveis

Skills ficam em `.claude/skills/` e são acionadas automaticamente pela IA quando
a tarefa combina (ou você pode pedir pelo nome).

| Skill (nome interno) | Para quê |
| -------------------- | -------- |
| _(a preencher)_ | |

## Comando ou skill? Como escolher

| Use **comando** (`prompts/` + `.claude/commands/`) quando… | Use **skill** (`.claude/skills/`) quando… |
| --- | --- |
| O padrão é uma **conversa guiada**: pergunta, aprofunda, gera | O padrão é um **processo com etapas fixas** e entregável definido |
| Cabe em um arquivo de texto | Precisa de **arquivos-modelo** (HTML, CSS, scripts) junto |
| Você quer puxar na hora que decidir | Você quer que a IA **reconheça a tarefa sozinha** |
| Ex.: "gerar copy de anúncio no meu framework" | Ex.: "montar e publicar o funil completo do cliente" |

Na dúvida, comece como prompt mestre. Quando ele virar um processo com modelos e
regras de qualidade, promova para skill.

## Como adicionar um novo prompt mestre

1. Copie `_modelo/comando/prompt.md.modelo` para `prompts/<nome>.md` e escreva o
   conteúdo (a fonte de verdade, editável por todos).
2. Copie `_modelo/comando/comando.md.modelo` para `.claude/commands/<nome>.md`,
   apontando para esse arquivo.
3. Adicione uma linha na tabela acima e em `docs/COMO-USAR.md`.

## Como adicionar uma nova skill

1. Copie a pasta `_modelo/skill/` para `.claude/skills/<nome-da-skill>/`.
2. Renomeie `SKILL.md.modelo` para `SKILL.md` e preencha (o `name` do frontmatter
   tem que ser igual ao nome da pasta).
3. Coloque referências longas em `references/` e arquivos-modelo em `assets/`.
4. Adicione uma linha na tabela acima e em `docs/COMO-USAR.md`.
5. **Commite.** Skill fora do repositório não existe para o time.

> Editar o prompt = editar o arquivo em `prompts/`. O comando só aponta para ele,
> então a melhoria vale para todos os clientes de uma vez.
