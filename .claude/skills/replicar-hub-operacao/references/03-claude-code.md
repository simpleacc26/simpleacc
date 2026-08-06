# 03 — Claude Code na web: ambiente, sessões e contexto

Aqui é onde o trabalho acontece. Este documento explica como configurar e,
principalmente, **o modelo mental** que faz a operação compartilhada funcionar.

---

## 1. O modelo mental (leia isto antes de configurar qualquer coisa)

```
Ambiente   = a sala equipada    → criado 1 vez, quase nunca se mexe
Repositório = o armário         → guarda tudo, versionado
Branch     = uma cópia de trabalho → main é a oficial
Pasta      = a gaveta           → um cliente, um assunto
Sessão     = uma reunião        → DESCARTÁVEL
```

**A frase que sustenta tudo:** *a conversa é descartável; a memória é o Git.*

Não existe "voltar naquela conversa do cliente". Existe **abrir a pasta do
cliente e ler o que está salvo**. Por isso toda sessão termina com commit, push
e PR — se não terminou assim, o trabalho não existe para o resto do time.

Consequência prática para quem vem de ChatGPT/Claude de chat comum: **você não
precisa manter uma conversa longa viva.** Pode fechar. O que importa está em
`clientes/<cliente>/`.

---

## 2. Criar o Ambiente (Environment)

No Claude Code na web: **Environments → New environment**

| Campo | O que colocar |
| ----- | ------------- |
| **Nome** | `{{EMPRESA}}` — é o que aparece no seletor da sessão |
| **Sources / repositórios** | `{{ORG_GITHUB}}/{{REPO}}` |
| **Política de rede** | libere o acesso de saída que a operação precisa (publicar na Vercel, baixar dependências npm, consultar sites de pesquisa). Comece pelo preset mais restritivo que ainda deixe o deploy funcionar. |
| **Variáveis de ambiente** | só o que **não** é segredo pessoal. Segredo de produção fica na Vercel. |
| **Setup script** | opcional. Se os funis precisarem de `npm install` antes de rodar, coloque aqui. |

O ambiente é criado **uma vez** e usado por todo mundo. Se alguém precisar de
uma ferramenta nova, o ajuste é no ambiente, não na máquina da pessoa — foi para
isso que ele existe.

---

## 3. Como o contexto é montado (por que o `CLAUDE.md` importa)

Toda sessão lê automaticamente:

```
CLAUDE.md (raiz)                 → regras da operação inteira
    +
clientes/<cliente>/CLAUDE.md     → ficha daquele cliente
```

Por isso o `CLAUDE.md` da raiz é curto e cheio de regra, e o de cada cliente
traz oferta, ICP, links e contato. **Manter esses dois arquivos atualizados é o
que faz a IA acertar de primeira.** Documento desatualizado gera entrega
desatualizada.

O `_modelo/cliente/CLAUDE.md` do kit já vem no formato certo.

---

## 4. Abrir uma sessão (o passo a passo do time)

1. **New session**, modo **Code**
2. Seletor: **{{EMPRESA}} → {{REPO}} → `main`**
3. Primeira mensagem, sempre no formato:

```
Trabalhar em clientes/<cliente>: <a tarefa>.
Leia contexto/ e aprendizados.md antes de criar.
```

4. Ao terminar: a sessão commita, dá push e abre o PR.
5. Alguém revisa e dá **merge**.

**Uma sessão = um cliente.** Duas tarefas de clientes diferentes = duas sessões.
Isso não é preciosismo: contexto misturado é a principal causa de entrega
trocada e de PR que ninguém consegue revisar.

---

## 4b. Se o time usa uma conta Claude só

Funciona, e é o começo mais barato. Três coisas mudam no dia a dia:

**1. Diga quem você é na primeira mensagem.** Como o commit sai com o mesmo
autor para todo mundo, o nome na abertura é o que preserva o "quem fez o quê":

```
Renan aqui. Trabalhar em clientes/<cliente>: <a tarefa>.
Leia contexto/ e aprendizados.md antes de criar.
```

Peça que isso vá para o corpo do PR. Com a organização do GitHub em contas
individuais (ver `01-contas-e-acessos.md`, Bloco 2), o revisor do PR já é
identificado, e a abertura cobre o autor.

**2. O limite de uso é de todos.** O plano tem limite por conta, não por pessoa.
Se três pessoas trabalham pesado ao mesmo tempo, o limite chega mais rápido e
**todo mundo para junto**. Combine os horários de carga pesada (gerar funil,
roadmap, PDFs) para não colidirem. Se alguém não conseguir abrir sessão, o mais
provável é limite de sessões simultâneas, não defeito.

**3. O histórico é comum.** Todo mundo vê as sessões de todo mundo, e é fácil
retomar a conversa errada. Isso torna as duas regras abaixo obrigatórias, não
recomendadas:

- **Uma sessão = um cliente.** Sem exceção.
- **Não retome sessão antiga.** Abra uma nova e leia a pasta do cliente. A
  memória é o Git.

> Quando migrar para conta por pessoa: quando entrar a terceira pessoa, quando o
> limite começar a travar o time, ou quando alguém sair da operação (com conta
> única, a saída de alguém obriga a trocar a senha de tudo).

---

## 5. Duas pessoas ao mesmo tempo

Funciona, desde que cada uma esteja **na sua branch**.

| Situação | O que acontece | O que fazer |
| -------- | -------------- | ----------- |
| Duas pessoas, clientes diferentes | Sem conflito | Nada. Cada uma abre o seu PR. |
| Duas pessoas, mesmo cliente, arquivos diferentes | Sem conflito | Nada. |
| Duas pessoas, **mesmo arquivo** | Conflito no merge | Quem terminar primeiro abre o PR e faz merge. A segunda dá `git pull origin main` na sua branch, resolve o conflito e segue. |

Antes de começar qualquer coisa: `git fetch` / `git pull`. Trabalhar em cima de
uma versão velha é o jeito mais rápido de criar retrabalho.

---

## 6. Onde mora a inteligência (e a armadilha do "só na minha conta")

| Local | Vale para | Versionado? |
| ----- | --------- | ----------- |
| `{{REPO}}/.claude/commands/` | **todo o time** | ✅ Git |
| `{{REPO}}/.claude/skills/` | **todo o time** | ✅ Git |
| `{{REPO}}/prompts/` | **todo o time** | ✅ Git |
| Skills da **conta pessoal** | só aquela pessoa | ❌ |
| Conectores da **conta pessoal** | só aquela pessoa | ❌ |

⚠️ **Esta é a armadilha mais cara da operação compartilhada.** Uma skill
instalada na conta pessoal de alguém:

- não aparece para o resto do time;
- vira uma **segunda versão** do mesmo processo, que desanda com o tempo;
- some quando a pessoa sai.

**Regra:** criou ou melhorou uma skill/prompt numa sessão? **Commite em
`.claude/skills/` ou `prompts/` e abra o PR.** A conta pessoal serve só para
skills genéricas (PDF, planilha, apresentação), nunca para processo da operação.

Detalhe completo em **[09-prompts-e-skills.md](09-prompts-e-skills.md)**.

---

## 7. Conectores na sessão

Conectores (Google Drive, Vercel, ClickUp, Make, Figma) são conectados
**por conta** e habilitados **por conversa**. Se uma skill precisa do Drive e o
conector está desligado naquela sessão, ela falha.

Antes de rodar algo que depende de conector, confirme que ele está ligado nas
configurações da conversa. Detalhes em **[06-conectores.md](06-conectores.md)**.

---

## 8. Boas práticas de sessão

| Faça | Não faça |
| ---- | -------- |
| Dizer o cliente na 1ª mensagem | Começar vago e ir corrigindo |
| Pedir para ler `contexto/` e `aprendizados.md` antes de criar | Deixar a IA inventar o contexto |
| Terminar com commit + push + PR | Fechar a sessão com trabalho não salvo |
| Registrar o aprendizado no `aprendizados.md` | Guardar o aprendizado só na sua cabeça |
| Abrir sessão nova para assunto novo | Empilhar 3 clientes na mesma conversa |

---

## 9. Checklist do Claude Code

- [ ] Ambiente `{{EMPRESA}}` criado, apontando para `{{ORG_GITHUB}}/{{REPO}}`
- [ ] Política de rede permite publicar na Vercel e instalar dependências
- [ ] Contas definidas: uma conta da operação para todos (Modelo A) **ou** uma por pessoa (Modelo B)
- [ ] Se a conta é única: 2FA guardado no gerenciador de senhas e convenção do nome na 1ª mensagem combinada
- [ ] `CLAUDE.md` da raiz preenchido com as regras da operação
- [ ] `_modelo/cliente/CLAUDE.md` sendo usado a cada cliente novo
- [ ] Time treinado no formato da 1ª mensagem
- [ ] Todo mundo sabe que skill/prompt vai **para o repositório**, não para a conta
