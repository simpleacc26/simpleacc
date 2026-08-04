# Contexto para sessões do Claude Code

Este é o **hub da {{EMPRESA}}**: um monorepo que reúne trabalhos de clientes e
ações internas do negócio. Ele é usado remotamente (Claude Code na web), por
mais de uma pessoa, em máquinas diferentes.

## Estrutura

- `clientes/<cliente>/` — **base de conhecimento + entregas** de cada cliente,
  com subpastas `contexto/`, `estrategia/`, `copy/`, `roteiros/`, `funis/`, um
  `aprendizados.md` e um `CLAUDE.md` próprio. Os funis/landing/quiz ficam em
  `funis/` (autocontidos, com seu próprio build/deploy).
- `clientes/{{PASTA_INTERNO}}/` — coisas da própria {{EMPRESA}} (fica no
  topo da lista pelo prefixo `0-`).
- `prompts/` — prompts mestres reutilizáveis; viram comandos em `.claude/commands/`.
- `.claude/skills/` — skills do time (versionadas aqui, nunca só na conta pessoal).
- `docs/` — manual e convenções. **Leia `docs/MANUAL.md`.**
- `_modelo/` — modelos para criar cliente/projeto/comando/skill novos.

## Memória = Git

A sessão é descartável; **a memória que permanece são os arquivos no Git**. Ao
trabalhar para um cliente, **leia `contexto/` e `aprendizados.md` antes de criar**
e **registre aprendizados** depois.

## Regras ao trabalhar aqui

1. **Escopo da sessão = uma pasta.** Antes de mexer, confirme em qual
   `clientes/<cliente>/` a tarefa vive.
   Não altere arquivos de outros clientes na mesma sessão.
2. **Comandos rodam dentro da pasta do projeto.** `npm install`, `npm run dev`,
   build, etc. são executados no diretório do projeto (ex.: dentro de `funis/<projeto>`),
   não na raiz.
3. **Branch por trabalho** e **PR sempre** (veja o padrão no manual).
4. **Nunca commitar segredos.** `.env` é ignorado; use `.env.example`.
5. **Cada projeto tem um `README.md`** explicando o que é, como rodar, onde faz
   deploy e os contatos. Mantenha-o atualizado.
6. **Toda inteligência reutilizável mora neste repositório.** Prompt mestre novo
   vai em `prompts/` + `.claude/commands/`; skill nova vai em `.claude/skills/`.
   Nunca deixe uma skill só na conta pessoal de alguém: o resto do time não a
   enxerga e as versões desandam.

## Convenção de nomes

- Pastas em minúsculas, sem acento, com hífen: `maria-silva`, `quiz-diagnostico`.
- Branches: `cliente/<cliente>/<assunto>` ou `interno/<assunto>`.
