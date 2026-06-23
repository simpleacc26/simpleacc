# Manual de Operação — SimpleAcc

Este manual explica **como trabalhamos neste repositório** de forma remota, em
várias máquinas e com mais de uma pessoa, mantendo cada assunto organizado.

Leitura de 5 minutos. Quando tiver dúvida de "onde colocar" ou "como começar",
volte aqui.

---

## 1. A ideia em uma frase

Um **único repositório-hub** guarda tudo: cada cliente é uma pasta, cada ação
interna é uma pasta. Todo mundo usa o **mesmo ambiente**, de qualquer máquina,
e o trabalho fica versionado e organizado no Git.

---

## 2. Estrutura de pastas

```
clientes/<cliente>/        → base de conhecimento + entregas de cada cliente
  ├── CLAUDE.md            → contexto do cliente (a sessão lê automaticamente)
  ├── contexto/            → quem é, oferta, ICP, análise de mercado, linguagem
  ├── estrategia/          → estratégias, planos, diagnósticos (e PDFs)
  ├── copy/                → copy de páginas e de anúncios/criativos
  ├── roteiros/            → roteiros de vídeo (datados)
  ├── funis/               → funis, landing pages e quizzes que publicam
  └── aprendizados.md      → o que funciona/não funciona (memória do cliente)
clientes/0-interno-simpleacc-inova/  → coisas da própria SimpleAcc (no topo: 0-)
prompts/                   → prompts mestres (padrões reutilizáveis p/ todos)
.claude/commands/          → comandos (ex.: /funil) que rodam os prompts mestres
docs/                      → manual, convenções, playbooks
_modelo/                   → modelos para copiar ao criar algo novo
```

Regra de ouro: **um assunto = uma pasta**. As coisas internas da SimpleAcc ficam
em `clientes/0-interno-simpleacc-inova/` — o prefixo `0-` mantém o interno no
topo da lista.

---

## 3. Convenções de nomes

- **Pastas:** minúsculas, sem acento, separadas por hífen.
  ✅ `rafael-granella`, `quiz-alivance`, `landing-black-friday`
  ❌ `Rafael Granella`, `Quiz_Alivance`, `Landing BF`
- **Cliente:** use um nome curto e estável (o nome da pessoa/empresa).
- **Projeto:** descreve a entrega (`site`, `quiz-diagnostico`, `automacao-leads`).

---

## 4. Como começar um trabalho novo

1. Decida: é de **cliente** ou **interno**? Os dois ficam em `clientes/` — o
   interno em `clientes/0-interno-simpleacc-inova/`.
2. Copie o modelo:
   - Cliente novo: copie `_modelo/cliente/` para `clientes/<cliente>/`.
   - Projeto novo de um cliente que já existe: copie `_modelo/projeto/` para
     `clientes/<cliente>/<projeto>/`.
3. Preencha o `README.md` do projeto (o que é, links, deploy, contatos).
4. Crie a branch do trabalho (seção 5) e comece.

---

## 5. Branches e Pull Requests

Trabalhamos sempre em **branch + PR**, nunca direto na principal. Assim duas
pessoas não se atrapalham e fica fácil revisar.

**Padrão de nome de branch:**

```
cliente/<cliente>/<assunto>      ex.: cliente/rafael-granella/ajuste-relatorio
interno/<assunto>                ex.: interno/site-institucional (trabalho interno)
```

**Fluxo:**

1. Crie/entre na branch do seu trabalho.
2. Faça commits pequenos e com mensagem clara (em português, no imperativo:
   "Adiciona...", "Corrige...", "Ajusta...").
3. `git push -u origin <branch>` e abra um **Pull Request** (pode ser rascunho).
4. Mantenha **um PR por assunto** — não misture clientes diferentes no mesmo PR.

---

## 6. Trabalhar remotamente em várias máquinas / com várias pessoas

- O ambiente remoto é **efêmero**: o que não for commitado e enviado (`push`)
  some quando a sessão encerra. **Commit e push sempre** ao terminar algo.
- Como duas pessoas podem mexer ao mesmo tempo: **cada uma na sua branch**.
  Antes de começar, dê `git fetch` / `git pull` na sua branch.
- **Uma sessão = um assunto.** Não abra a mesma sessão para mexer em dois
  clientes; abra sessões separadas. Isso mantém o histórico e o contexto limpos.
- Conflito de edição no mesmo arquivo: quem terminar primeiro abre o PR; a outra
  pessoa dá `git pull` e resolve antes de seguir.

> **Reframe importante:** no Claude Code remoto, **a sessão (a conversa) é
> descartável** — quando fecha, some o que não foi salvo. A **memória que
> permanece são os arquivos versionados no Git.** Então, em vez de "voltar
> naquela conversa do cliente", você **abre a pasta do cliente e lê o que já
> está salvo** (contexto, estratégias, roteiros, aprendizados) e acrescenta o
> seu. O Git guarda inclusive o histórico de versões (roteiro v1 → v2).

---

## 7. Base de conhecimento por cliente

Cada pasta em `clientes/<cliente>/` é a **memória viva** daquele cliente. O
trabalho acumula ali, e qualquer pessoa continua de onde a outra parou.

**Ciclo do dia a dia (exemplo real):**

1. Hoje, você escreve a estratégia em `clientes/sense-clinic/estrategia/` e dá push.
2. Amanhã, de outra máquina, o colega lê essa estratégia e gera um roteiro em
   `clientes/sense-clinic/roteiros/2026-06-22-roteiro.md`.
3. Depois, alguém lê o roteiro v1 e cria o `-v2` com melhorias.

**Regras práticas:**

- **Antes de criar qualquer coisa, leia `contexto/` e `aprendizados.md`** do cliente.
- **Registre aprendizados** em `aprendizados.md` — é o que deixa a SimpleAcc mais
  inteligente sobre cada cliente com o tempo.
- **Datar arquivos** que evoluem (roteiros, copy): `AAAA-MM-DD-tema.md`. Para
  melhorar, crie a próxima versão referenciando a anterior (não apague a antiga).
- Para começar uma sessão "dentro" de um cliente, escolha `main` no seletor e diga
  na primeira mensagem: *"Trabalhar em `clientes/sense-clinic`: ..."*. O `CLAUDE.md`
  daquela pasta entra como contexto automaticamente.

---

## 8. Prompts mestres e comandos

Os **padrões reutilizáveis** (a "inteligência de especialistas") ficam em
`prompts/` e viram **comandos** disponíveis em qualquer sessão:

| Comando  | Para quê |
| -------- | -------- |
| `/funil` | Criar funil/página completa em HTML ou anúncios. Conduz diagnóstico → aprofundamento → geração. |

- Digite o comando (ex.: **`/funil`**) e o agente assume o papel do prompt mestre.
  Se você estiver na pasta de um cliente, ele já usa o contexto daquele cliente.
- **Para editar/melhorar** um prompt: edite o arquivo em `prompts/` — a melhoria
  vale para **todos os clientes** de uma vez (não copie por cliente).
- **Para criar um novo** prompt mestre (ex.: roteiro, copy): veja `prompts/README.md`.

---

## 9. Segredos e variáveis de ambiente

- **Nunca** commite chaves, tokens ou `.env`. O `.gitignore` já bloqueia `.env`.
- Cada projeto que precisa de variáveis tem um **`.env.example`** com os nomes
  (sem os valores). Para rodar, copie para `.env` e preencha localmente.
- Segredos de produção ficam na plataforma de deploy (ex.: Vercel → Environment
  Variables), não no Git.

---

## 10. Rodar e fazer deploy de um projeto

Cada projeto é **autocontido**: os comandos rodam **dentro da pasta dele**.

```bash
cd clientes/<cliente>/<projeto>
npm install
npm run dev      # ambiente local
npm run build    # build de produção
```

**Deploy (Vercel):** como cada projeto está numa subpasta, ao criar o projeto na
Vercel configure o **Root Directory** apontando para a pasta do projeto
(ex.: `clientes/rafael-granella/quiz-alivance`). O resto (framework, build)
a Vercel detecta sozinha. Documente o link do deploy no `README.md` do projeto.

---

## 11. Checklist de "trabalho pronto"

- [ ] Está na pasta certa em `clientes/...` (interno em `clientes/0-interno-simpleacc-inova/`).
- [ ] Entregável salvo na subpasta certa do cliente (`contexto/`, `estrategia/`, `copy/`, `roteiros/`, `funis/`).
- [ ] Registrei o aprendizado em `aprendizados.md` do cliente (quando houver).
- [ ] Sem segredos commitados (`.env` fora do Git).
- [ ] Trabalhei numa branch com nome no padrão.
- [ ] Commits claros + push feito.
- [ ] PR aberto (um por assunto).

---

## 12. Quando "promover" um cliente para repositório próprio

Comece tudo aqui. Só vale criar um repositório separado quando um projeto
crescer a ponto de precisar de CI/CD próprio, acesso restrito a poucas pessoas,
ou histórico totalmente independente. Aí a gente extrai aquela pasta para um
repo dedicado e deixa um aviso no `README.md` dela apontando para o novo lugar.
