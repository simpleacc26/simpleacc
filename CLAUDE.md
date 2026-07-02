# Contexto para sessões do Claude Code

Este é o **hub da SimpleAcc**: um monorepo que reúne trabalhos de clientes e
ações internas do negócio. Ele é usado remotamente (Claude Code na web), por
mais de uma pessoa, em máquinas diferentes.

## Estrutura

- `clientes/<cliente>/` — **base de conhecimento + entregas** de cada cliente,
  com subpastas `contexto/`, `estrategia/`, `copy/`, `roteiros/`, `funis/`, um
  `aprendizados.md` e um `CLAUDE.md` próprio. Os funis/landing/quiz ficam em
  `funis/` (autocontidos, com seu próprio build/deploy).
- `clientes/0-interno-simpleacc-inova/` — coisas da própria SimpleAcc (fica no
  topo da lista pelo prefixo `0-`).
- `prompts/` — prompts mestres reutilizáveis; viram comandos em `.claude/commands/`.
- `docs/` — manual e convenções. **Leia `docs/MANUAL.md`.**
- `_modelo/` — modelos para criar cliente/projeto novo.

## Memória = Git

A sessão é descartável; **a memória que permanece são os arquivos no Git**. Ao
trabalhar para um cliente, **leia `contexto/` e `aprendizados.md` antes de criar**
e **registre aprendizados** depois. Para gerar funil/página/anúncios, use `/prompt-mestre`.

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

## Convenção de nomes

- Pastas em minúsculas, sem acento, com hífen: `rafael-granella`, `quiz-alivance`.
- Branches: `cliente/<cliente>/<assunto>` ou `interno/<assunto>`.

## Convenção de escrita (vale para TODOS os materiais)

- **Nunca usar travessões (traço longo).** Nada de "—" nem "–" em copy, textos
  de site, comentários de código, READMEs, docs, mensagens. Travessão deixa o
  texto com cara de IA. Use vírgula, ponto, dois-pontos, parênteses ou reescreva
  a frase. Para faixas, use "de X a Y" (ex.: "R$3.500 a R$4.000"), não "X–Y".
- Hífen comum em palavras compostas (ex.: "follow-up", "pós-expansão") é normal
  e permitido; o proibido é o traço longo usado como pausa.
