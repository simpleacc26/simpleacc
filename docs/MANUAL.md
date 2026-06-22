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
clientes/<cliente>/<projeto>/   → entregas de clientes
interno/<projeto>/              → coisas da própria SimpleAcc
docs/                           → manual, convenções, playbooks
_modelo/                        → modelos para copiar ao criar algo novo
```

Regra de ouro: **um assunto = uma pasta**. Se está na dúvida entre dois lugares,
é sinal de que talvez sejam dois projetos.

---

## 3. Convenções de nomes

- **Pastas:** minúsculas, sem acento, separadas por hífen.
  ✅ `rafael-granella`, `quiz-alivance`, `landing-black-friday`
  ❌ `Rafael Granella`, `Quiz_Alivance`, `Landing BF`
- **Cliente:** use um nome curto e estável (o nome da pessoa/empresa).
- **Projeto:** descreve a entrega (`site`, `quiz-diagnostico`, `automacao-leads`).

---

## 4. Como começar um trabalho novo

1. Decida: é de **cliente** (`clientes/`) ou **interno** (`interno/`)?
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
interno/<assunto>                ex.: interno/site-institucional
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

---

## 7. Segredos e variáveis de ambiente

- **Nunca** commite chaves, tokens ou `.env`. O `.gitignore` já bloqueia `.env`.
- Cada projeto que precisa de variáveis tem um **`.env.example`** com os nomes
  (sem os valores). Para rodar, copie para `.env` e preencha localmente.
- Segredos de produção ficam na plataforma de deploy (ex.: Vercel → Environment
  Variables), não no Git.

---

## 8. Rodar e fazer deploy de um projeto

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

## 9. Checklist de "trabalho pronto"

- [ ] Está na pasta certa (`clientes/...` ou `interno/...`).
- [ ] `README.md` do projeto preenchido/atualizado.
- [ ] Sem segredos commitados (`.env` fora do Git).
- [ ] Trabalhei numa branch com nome no padrão.
- [ ] Commits claros + push feito.
- [ ] PR aberto (um por assunto).

---

## 10. Quando "promover" um cliente para repositório próprio

Comece tudo aqui. Só vale criar um repositório separado quando um projeto
crescer a ponto de precisar de CI/CD próprio, acesso restrito a poucas pessoas,
ou histórico totalmente independente. Aí a gente extrai aquela pasta para um
repo dedicado e deixa um aviso no `README.md` dela apontando para o novo lugar.
