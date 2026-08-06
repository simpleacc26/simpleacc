# 01 — Contas e acessos (o que criar, nesta ordem)

Este é o inventário completo do que a operação precisa ter. Crie **nesta ordem**,
porque cada bloco depende do anterior.

> **Regra número 1 de todas:** nenhuma conta da operação nasce no e-mail
> **pessoal de uma pessoa**. Ou nasce num e-mail do domínio da empresa, ou num
> e-mail **da operação** que o time inteiro controla. Conta no e-mail pessoal de
> alguém vira refém: quando a pessoa sai, a operação para.

---

## Antes de tudo: escolha o modelo de conta

Existem dois jeitos de operar, e a escolha muda o resto do documento.

### Modelo A — Conta única da operação (mais simples, começo barato)

Um e-mail só (pode ser um Gmail: `operacao@gmail.com`), e **todo mundo entra por
ele** em todas as ferramentas. É o modelo mais rápido de montar e o mais barato.

**O que você ganha:** custo mínimo, zero convite para gerenciar, ninguém fica
esperando acesso.

**O que você perde, e precisa compensar:**

| Perda | O que acontece na prática | Como compensar |
| ----- | ------------------------- | -------------- |
| **Rastreabilidade** | Todo commit e todo PR saem com o mesmo autor. Você não sabe quem fez o quê. | Convenção: a 1ª mensagem da sessão começa com o nome (*"Renan aqui. Trabalhar em clientes/X: ..."*), e isso vai para o título/corpo do PR |
| **Limite de uso** | O limite do plano é da **conta**, não da pessoa. Três pessoas gastam o limite três vezes mais rápido, e quando estoura, **todo mundo para junto** | Combine horários de uso pesado; quando doer, é o primeiro item a virar plano de time |
| **Histórico comum** | Todo mundo vê as sessões de todo mundo, e é fácil retomar a conversa errada | Reforce ainda mais: **uma sessão = um cliente**, e a memória é o Git |
| **Offboarding** | Não dá para revogar o acesso de uma pessoa: só trocando a senha de tudo | Senha e 2FA no gerenciador de senhas compartilhado, para trocar rápido quando precisar |
| **Termos de uso** | Compartilhar login individual costuma ir contra os termos da maioria dos serviços | Confira os termos de cada ferramenta antes de escalar o time |

### Modelo B — Conta por pessoa (o que aguenta crescer)

Cada pessoa com o próprio login, e as ferramentas em modo time/organização.

**Recomendação prática:** comece no **Modelo A**, mas **separe o GitHub já no
dia 1**. No GitHub o Modelo B é **de graça** (organização Free = repositórios
privados e colaboradores ilimitados), e é justamente onde a falta de
rastreabilidade dói mais: é o histórico do trabalho. Você fica com o melhor dos
dois: um login só para o resto, e "quem fez o quê" preservado onde importa.

Migre o resto para o Modelo B quando: entrar a terceira pessoa, o limite de uso
começar a travar o time, ou alguém sair da operação.

---

## Ordem de criação

```
1. Domínio + Google Workspace     → cria a identidade (e-mails da operação)
        ↓
2. GitHub (organização + repo)    → onde o trabalho mora
        ↓
3. Claude (plano de time)         → onde o trabalho é feito
        ↓
4. Vercel (time)                  → onde as páginas são publicadas
        ↓
5. Conectores (Drive, ClickUp,    → integrações do dia a dia
   Make, Figma, Canva)
        ↓
6. Contas de mídia/negócio        → Meta Business, WhatsApp Business, etc.
```

---

## Bloco 1 — E-mail da operação (fundação)

### Modelo A — Gmail único da operação (rápido, grátis)

| Item | Para quê | Observação |
| ---- | -------- | ---------- |
| **Gmail da operação** | login único de todas as ferramentas | Nome neutro, de função, não de pessoa: `operacaoX@gmail.com`, nunca `joao.silva@gmail.com` |
| **Gerenciador de senhas** | guardar a senha e o **2FA** dessa conta | Obrigatório aqui. Sem ele, ou o time não tem 2FA, ou só uma pessoa consegue entrar |

Cuidados que só existem neste modelo:

- **Ligue o 2FA e guarde o segundo fator no gerenciador de senhas** (1Password e
  Bitwarden guardam códigos TOTP). Se o 2FA ficar só no celular de uma pessoa,
  ela vira o gargalo de toda a operação.
- **Guarde os códigos de recuperação** no mesmo lugar.
- **Gmail não tem Drives Compartilhados.** Tudo mora no "Meu Drive" dessa conta.
  Funciona bem enquanto for uma conta só, mas na migração para Workspace os
  arquivos precisam mudar de dono, e transferir muitos arquivos é chato. Já
  organize as pastas como se fossem virar Drive Compartilhado.
- **Não use esse Gmail como e-mail público** de contato com cliente. Um e-mail
  no domínio passa outra impressão, e você não quer o login da operação
  circulando em assinatura de e-mail.

### Modelo B — Domínio + Google Workspace (o que aguenta crescer)

| Item | Para quê | Observação |
| ---- | -------- | ---------- |
| **Domínio** (`{{DOMINIO}}`) | identidade da operação; base dos e-mails | Registro.br, Cloudflare, Namecheap |
| **Google Workspace** | e-mails `nome@{{DOMINIO}}`, Drives Compartilhados, Docs, Planilhas | **Business Standard ou superior.** O Starter **não tem Drives Compartilhados**, e sem eles os arquivos ficam presos na conta de quem criou |

E-mails a criar: `{{EMAIL_ADMIN}}` (dono das contas), um por pessoa, e um
público (`contato@{{DOMINIO}}`).

**Nas duas opções vale a mesma regra:** o dono das contas é um e-mail **de
função**, não de pessoa física. Se um dia a pessoa sai, a conta fica.

---

## Bloco 2 — GitHub

| Item | Plano | Custo de referência | Por quê |
| ---- | ----- | ------------------- | ------- |
| **Organização** `{{ORG_GITHUB}}` | Free serve para começar | US$ 0 | Repositórios privados ilimitados, colaboradores ilimitados |
| **Upgrade para Team** | quando quiser **proteger a `main`** em repositório privado | ~US$ 4/usuário/mês | Regras de proteção de branch em repo privado exigem plano pago |

Detalhes completos em **[02-github.md](02-github.md)**.

> A organização é o que separa "o repositório de uma pessoa" do "repositório da
> empresa". Com organização, a saída de uma pessoa é revogar um acesso; sem
> organização, é migrar o repositório.

⭐ **Mesmo no Modelo A (conta única), separe o GitHub.** Aqui a conta por pessoa
custa **zero** (organização Free = repositórios privados e colaboradores
ilimitados) e resolve o que mais dói na conta compartilhada: saber **quem fez o
quê**. Crie a organização com o e-mail da operação e convide cada pessoa com o
GitHub dela. É o único lugar onde vale quebrar o modelo único desde o dia 1.

---

## Bloco 3 — Claude

| Item | Observação |
| ---- | ---------- |
| **Conta** | **Modelo A:** uma conta no e-mail da operação, usada por todos. **Modelo B:** uma por pessoa. |
| **Plano** | confira no site qual plano da sua região libera **Claude Code na web** e quantas sessões simultâneas. Planos de time centralizam cobrança e assentos. |
| **Ambiente ("Environment")** | criado uma vez, apontando para o repositório. Todo mundo usa o mesmo, nos dois modelos. |

### Se a conta é compartilhada (Modelo A), saiba disto

| O que muda | Consequência | O que fazer |
| ---------- | ------------ | ----------- |
| **O limite de uso é da conta** | Três pessoas gastam o limite três vezes mais rápido. Quando estoura, **todo mundo para junto** | Combine os horários de uso pesado. Quando começar a travar, é o primeiro item a virar plano de time |
| **Sessões simultâneas** | O plano limita quantas sessões rodam ao mesmo tempo | Se alguém não consegue abrir sessão, provavelmente é isso, não bug |
| **Histórico comum** | Todo mundo vê as conversas de todo mundo, e é fácil retomar a sessão errada | **Uma sessão = um cliente**, sem exceção. E o que vale está no Git, não na conversa |
| **Autoria dos commits** | Sai tudo com o mesmo autor | Comece a sessão com o nome: *"Renan aqui. Trabalhar em `clientes/X`: ..."* — vai para o PR |
| **Termos de uso** | Compartilhar login individual costuma ir contra os termos da maioria dos serviços | Confira os termos antes de escalar o time |

Detalhes completos em **[03-claude-code.md](03-claude-code.md)**.

⚠️ **Ponto que quase todo mundo erra:** *skills* e *conectores* instalados na
**conta pessoal** de alguém **não aparecem** para o resto do time. O que precisa
valer para todos vai **dentro do repositório** (`.claude/skills/`, `.claude/commands/`).
Veja **[09-prompts-e-skills.md](09-prompts-e-skills.md)**.

---

## Bloco 4 — Vercel

| Item | Plano | Custo de referência | Por quê |
| ---- | ----- | ------------------- | ------- |
| **Time** `{{TIME_VERCEL}}` | **Pro** | ~US$ 20/usuário/mês | O plano gratuito (Hobby) é **pessoal e não permite uso comercial**. Sem time, os projetos ficam na conta de uma pessoa. |

No **Modelo A**, o time da Vercel é criado dentro da conta única, com um assento
só. Resolve bem: publicar funil é tarefa pontual e feita por poucas pessoas. O
que **não** muda é a exigência do plano Pro para uso comercial.

Detalhes completos em **[04-vercel.md](04-vercel.md)**.

---

## Bloco 5 — Conectores (integrações)

| Conector | Para quê na operação | Obrigatório? | Plano |
| -------- | -------------------- | ------------ | ----- |
| **Google Drive** | entregar documentos ao cliente, planilhas de leads | **Sim** | vem com o Workspace |
| **Vercel** | publicar e conferir os funis pela sessão | **Sim** | vem com o time Pro |
| **ClickUp** | tarefas, prazos, quem está com o quê | Recomendado | Free serve; pago ~US$ 7/usuário/mês |
| **Make** | automações (funil → planilha → CRM → WhatsApp) | Recomendado | Free (1.000 operações/mês) já resolve o começo |
| **Figma** | identidade visual, telas, diagramas | Opcional | Free serve |
| **Canva** | peças de anúncio e materiais rápidos | Opcional | Free ou Pro |

Detalhes completos em **[06-conectores.md](06-conectores.md)**.

---

## Bloco 6 — Contas de negócio (fora do escopo técnico, mas amarradas)

| Conta | Para quê | Cuidado |
| ----- | -------- | ------- |
| **Meta Business Manager** | anúncios, pixel, catálogos | Crie o **Business Manager da empresa** e adicione as pessoas por lá. Nunca rode anúncio pelo perfil pessoal de alguém. |
| **WhatsApp Business** | destino dos CTAs dos funis (`wa.me`) | Número da operação, não celular pessoal. Documente o número no `README.md` do cliente. |
| **Google Analytics / Tag Manager** | medir os funis | Conta na organização, não pessoal |
| **Gerenciador de senhas** (1Password, Bitwarden) | guardar todos os acessos acima | **Crie no dia 1.** É o único lugar onde senha pode morar. Nunca no Git, nunca no chat. |

---

## Custo mensal estimado (referência)

Ordem de grandeza para uma operação de **3 pessoas**:

| Item | Modelo A (conta única) | Modelo B (conta por pessoa) |
| ---- | ---------------------- | --------------------------- |
| E-mail | US$ 0 (Gmail) | ~US$ 40 (Workspace Business Standard × 3) |
| GitHub | US$ 0 (org Free) ou ~US$ 12 (Team, se quiser proteger a `main`) | mesmo |
| Vercel Pro | ~US$ 20 (1 assento) | ~US$ 20 a 40 |
| Claude | 1 plano | 3 planos ou plano de time |
| ClickUp / Make / Figma / Canva | US$ 0 a 30 | US$ 0 a 30 |
| Domínio | opcional | ~US$ 15/ano |

> Os valores são **referência de ordem de grandeza** e mudam com o tempo e com a
> região. Confirme no site de cada ferramenta antes de fechar o orçamento.

O Modelo A economiza principalmente em **e-mail** e em **assentos de Claude**. É
uma economia real no começo, e vira gargalo quando o limite de uso do plano
começar a travar o time.

---

## Checklist do bloco de contas

**Nos dois modelos:**

- [ ] Gerenciador de senhas criado, com todos os acessos dentro
- [ ] Organização no GitHub criada (não repositório pessoal)
- [ ] Time na Vercel criado (não conta pessoal), no plano Pro
- [ ] Conta dona das ferramentas é um e-mail **de função**, não de pessoa física

**Modelo A (conta única):**

- [ ] Gmail da operação com nome neutro (não o nome de uma pessoa)
- [ ] **2FA ligado**, com o segundo fator e os códigos de recuperação no gerenciador de senhas
- [ ] Cada pessoa do time com o **GitHub próprio** convidado na organização
- [ ] Time combinado sobre a convenção de dizer o nome na 1ª mensagem da sessão
- [ ] Pastas do Drive já organizadas como se fossem virar Drive Compartilhado

**Modelo B (conta por pessoa):**

- [ ] Domínio registrado e apontando para o Google Workspace
- [ ] Workspace **Business Standard ou superior** (para ter Drives Compartilhados)
- [ ] E-mail de cada pessoa criado no domínio
- [ ] Cada pessoa com a própria conta Claude
- [ ] Dois administradores em cada conta crítica (ninguém é ponto único de falha)
