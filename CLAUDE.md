# Contexto para sessões do Claude Code

Este é o **hub da SimpleAcc**: um monorepo que reúne trabalhos de clientes e
ações internas do negócio. Ele é usado remotamente (Claude Code na web), por
mais de uma pessoa, em máquinas diferentes.

## Estrutura

- `clientes/<cliente>/<projeto>/` — entregas de clientes (sites, quizzes, apps,
  automações). Cada projeto é autocontido (tem seu próprio `package.json`,
  build e deploy).
- `interno/<projeto>/` — coisas da própria SimpleAcc.
- `docs/` — manual e convenções. **Leia `docs/MANUAL.md`.**
- `_modelo/` — modelos para criar cliente/projeto novo.

## Regras ao trabalhar aqui

1. **Escopo da sessão = uma pasta.** Antes de mexer, confirme em qual
   `clientes/<cliente>/<projeto>/` ou `interno/<projeto>/` a tarefa vive.
   Não altere arquivos de outros clientes na mesma sessão.
2. **Comandos rodam dentro da pasta do projeto.** `npm install`, `npm run dev`,
   build, etc. são executados no diretório do projeto, não na raiz.
3. **Branch por trabalho** e **PR sempre** (veja o padrão no manual).
4. **Nunca commitar segredos.** `.env` é ignorado; use `.env.example`.
5. **Cada projeto tem um `README.md`** explicando o que é, como rodar, onde faz
   deploy e os contatos. Mantenha-o atualizado.

## Convenção de nomes

- Pastas em minúsculas, sem acento, com hífen: `rafael-granella`, `quiz-alivance`.
- Branches: `cliente/<cliente>/<assunto>` ou `interno/<assunto>`.
