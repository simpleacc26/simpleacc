# 07 — Time: papéis e onboarding de uma pessoa nova

A estrutura só é "compartilhada" de verdade quando a segunda pessoa consegue
entrar, entender e produzir sem depender da primeira. Este documento é o roteiro
disso.

---

## 1. Papéis

| Papel | Faz o quê | Acessos |
| ----- | --------- | ------- |
| **Admin da operação** | dono das contas, cria acessos, aprova PR, decide estrutura | Owner em tudo |
| **Operador** | produz para os clientes (estratégia, copy, funil, roteiro) | Write no GitHub, Member na Vercel, conta Claude |
| **Especialista pontual** | entra num assunto específico (design, tráfego, vídeo) | acesso só ao que precisa; Read por padrão |
| **Cliente** | consome as entregas | só a pasta dele no Drive; **nunca** o repositório |

**Sempre dois admins.** Uma operação com um único dono de conta é uma operação
que trava quando essa pessoa fica indisponível.

---

## 2. Onboarding de uma pessoa nova (2 horas, uma vez)

### Bloco A — Acessos (admin faz antes, ~20 min)

- [ ] E-mail `nome@{{DOMINIO}}` criado no Google Workspace
- [ ] Convite para a organização `{{ORG_GITHUB}}`, no time `operacao` (Write)
- [ ] Convite para o time `{{TIME_VERCEL}}` na Vercel (Member)
- [ ] Conta Claude com o e-mail do domínio, com acesso ao ambiente `{{EMPRESA}}`
- [ ] Acesso ao Drive Compartilhado
- [ ] Acesso ao gerenciador de senhas (só ao cofre que a pessoa precisa)
- [ ] Convite para o ClickUp, se a operação usar

### Bloco B — Leitura (a pessoa faz, ~30 min)

Nesta ordem:

1. `docs/COMO-USAR.md` — o guia de entrada
2. `docs/MANUAL.md` — as convenções completas
3. `CLAUDE.md` da raiz — as regras que a IA também segue
4. Uma pasta de cliente qualquer, para ver a estrutura na prática

### Bloco C — Tour guiado (com o admin, ~30 min)

Mostre, na tela, nesta ordem:

1. **O repositório no GitHub** — "isto é o armário; aqui você **lê**"
2. **Uma pasta de cliente** — contexto, estratégia, copy, aprendizados
3. **Abrir uma sessão** — ambiente → repo → `main` → primeira mensagem
4. **Um PR aberto e um PR mergeado** — "é assim que o trabalho entra na versão oficial"
5. **A frase-chave:** *"a conversa é descartável; o que vale está nos arquivos"*

### Bloco D — Primeira tarefa real (~40 min)

Dê uma tarefa pequena e real, e acompanhe:

```
Trabalhar em clientes/<cliente>: atualizar o contexto/ com as
informações da última call. Leia contexto/ e aprendizados.md antes.
```

Ao final, confira junto: branch no padrão, arquivo na pasta certa, aprendizado
registrado, PR aberto. **Revise esse primeiro PR com calma** — é onde os hábitos
se formam.

---

## 3. As 7 regras que a pessoa precisa saber de cor

1. **Uma sessão = um cliente.** Nunca misturar.
2. **`main` no seletor**, sempre.
3. **Ler `contexto/` e `aprendizados.md` antes de criar** qualquer coisa.
4. **Terminar com commit + push + PR.** Se não terminou assim, não existe.
5. **Registrar o aprendizado** no `aprendizados.md` do cliente.
6. **Nunca commitar segredo** (senha, token, `.env`).
7. **Skill ou prompt novo vai para o repositório**, não fica só na sua conta.

---

## 4. Como o time divide o trabalho sem se atrapalhar

| Situação | Como resolver |
| -------- | ------------- |
| Duas pessoas, clientes diferentes | Cada uma na sua sessão e na sua branch. Zero conflito. |
| Duas pessoas, mesmo cliente | Combine **quais arquivos** cada uma toca antes de começar. |
| Alguém precisa continuar o trabalho do outro | Lê a pasta do cliente. Não precisa da conversa anterior. |
| Dúvida de "onde colocar" | `docs/MANUAL.md`, seção 2. Se não estiver lá, pergunte e **depois documente**. |

O gerenciador de tarefas (ClickUp) responde *quem está com o quê*. O repositório
responde *o que já foi feito*. Não misture os dois papéis.

---

## 5. Offboarding (quando alguém sai)

- [ ] Remover do time no GitHub
- [ ] Remover do time na Vercel
- [ ] Remover do Drive Compartilhado e do Workspace
- [ ] Revogar o acesso ao ambiente e à conta Claude
- [ ] Revogar conectores autorizados com a conta dela
- [ ] Remover do gerenciador de senhas e **trocar as senhas críticas**
- [ ] Conferir se alguma skill/prompt ficou só na conta pessoal dela — se ficou,
      **traga para o repositório antes de revogar o acesso**

O último item é o que costuma ser esquecido, e é o que dói. Ver
**[09-prompts-e-skills.md](09-prompts-e-skills.md)**.

---

## 6. Checklist de onboarding

- [ ] Todos os acessos do Bloco A criados
- [ ] Leitura do Bloco B feita
- [ ] Tour do Bloco C dado
- [ ] Primeira tarefa entregue com PR revisado
- [ ] As 7 regras compreendidas
- [ ] Pessoa adicionada ao gerenciador de senhas e ao ClickUp
