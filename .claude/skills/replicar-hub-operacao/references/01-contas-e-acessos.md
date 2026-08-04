# 01 — Contas e acessos (o que criar, nesta ordem)

Este é o inventário completo do que a operação precisa ter. Crie **nesta ordem**,
porque cada bloco depende do anterior.

> **Regra número 1 de todas:** nenhuma conta da operação nasce num e-mail pessoal.
> Toda conta é criada com um e-mail **do domínio da empresa** e, sempre que a
> ferramenta permitir, com **estrutura de time/organização** — não com login
> individual compartilhado. Conta pessoal vira refém: quando a pessoa sai, a
> operação para.

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

## Bloco 1 — Domínio e e-mails (fundação)

| Item | Para quê | Quem cria | Observação |
| ---- | -------- | --------- | ---------- |
| **Domínio** (`{{DOMINIO}}`) | identidade da operação; base dos e-mails | Sócio/admin | Registro.br, Cloudflare, Namecheap. Pode ser o mesmo registrador do domínio atual. |
| **Google Workspace** | e-mails `nome@{{DOMINIO}}`, Drive compartilhado, Docs, Planilhas | Sócio/admin | **Plano Business Standard ou superior.** O Starter **não tem Drives Compartilhados**, e sem eles os arquivos ficam presos na conta de quem criou. |

E-mails a criar no dia 1:

| E-mail | Para quê |
| ------ | -------- |
| `{{EMAIL_ADMIN}}` | dono das contas (admin de tudo) |
| um por pessoa do time | acesso individual e rastreável |
| `contato@{{DOMINIO}}` ou similar | e-mail público, respondido por quem estiver de plantão |

**Nunca** use um e-mail de pessoa física para ser o dono de uma conta de
ferramenta. Se der, crie um e-mail de função (ex.: `ops@{{DOMINIO}}`) e coloque
como owner, com o admin humano como segundo owner.

---

## Bloco 2 — GitHub

| Item | Plano | Custo de referência | Por quê |
| ---- | ----- | ------------------- | ------- |
| **Organização** `{{ORG_GITHUB}}` | Free serve para começar | US$ 0 | Repositórios privados ilimitados, colaboradores ilimitados |
| **Upgrade para Team** | quando quiser **proteger a `main`** em repositório privado | ~US$ 4/usuário/mês | Regras de proteção de branch em repo privado exigem plano pago |

Detalhes completos em **[02-github.md](02-github.md)**.

> A organização é o que separa "o repositório do Daniel" de "o repositório da
> empresa". Com organização, a saída de uma pessoa é revogar um acesso; sem
> organização, é migrar o repositório.

---

## Bloco 3 — Claude

| Item | Observação |
| ---- | ---------- |
| **Conta por pessoa** | cada pessoa do time tem o próprio login, com o e-mail do domínio |
| **Plano** | confira no site qual plano da sua região libera **Claude Code na web** e quantas sessões simultâneas. Planos de time centralizam a cobrança e o gerenciamento de assentos. |
| **Ambiente ("Environment")** | criado uma vez, apontando para o repositório. Todo mundo usa o mesmo. |

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

Para uma operação de **3 pessoas**, ordem de grandeza:

| Item | Estimativa |
| ---- | ---------- |
| Google Workspace Business Standard (3 usuários) | ~US$ 40 |
| GitHub Team (3 usuários) | ~US$ 12 |
| Vercel Pro (1 a 2 assentos) | ~US$ 20 a 40 |
| Claude (3 assentos) | conforme o plano escolhido |
| ClickUp / Make / Figma / Canva | US$ 0 a 30 |
| Domínio | ~US$ 15/ano |

> Os valores acima são **referência de ordem de grandeza** e mudam com o tempo e
> com a região. Confirme no site de cada ferramenta antes de fechar o orçamento.
> O mínimo viável para começar: Workspace + GitHub Free + Claude + Vercel Pro.

---

## Checklist do bloco de contas

- [ ] Domínio registrado e apontando para o Google Workspace
- [ ] Workspace **Business Standard ou superior** (para ter Drives Compartilhados)
- [ ] E-mail de cada pessoa criado no domínio
- [ ] Gerenciador de senhas criado, com todos os acessos dentro
- [ ] Organização no GitHub criada (não repositório pessoal)
- [ ] Time na Vercel criado (não conta pessoal)
- [ ] Cada pessoa com a própria conta Claude, no e-mail do domínio
- [ ] Dois administradores em cada conta crítica (ninguém é ponto único de falha)
