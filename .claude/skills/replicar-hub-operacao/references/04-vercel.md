# 04 — Vercel: time, projetos e publicação dos funis

A Vercel é onde os funis, quizzes e landing pages ficam no ar. O ponto crítico
da replicação: **tudo publica no time da empresa, nunca numa conta pessoal.**

---

## 1. Criar o time

1. vercel.com → **Create Team**
2. Nome: `{{TIME_VERCEL}}`
3. Plano: **Pro**

> O plano Hobby é **pessoal e não permite uso comercial**, e não tem times. Se a
> operação publicar página de cliente numa conta Hobby pessoal, o material fica
> preso na conta de uma pessoa e fora dos termos de uso.

Adicione as pessoas em **Settings → Members**. Papéis:

| Papel | Quem |
| ----- | ---- |
| **Owner** | sócios / admin (dois, nunca um) |
| **Member** | quem publica funil |
| **Viewer** | quem só acompanha |

Guarde o **TEAM_ID** (`team_...`) — aparece em **Settings → General**. Ele é
usado no deploy pela linha de comando.

---

## 2. Conectar ao GitHub

**Settings → Git → Connect** → autorize a organização `{{ORG_GITHUB}}` e o
repositório `{{REPO}}`.

Com isso, cada push cria um **Preview Deployment** (uma URL de teste do que está
naquele PR) e o merge na `main` atualiza a produção. Você consegue ver a página
antes de aprovar o PR.

---

## 3. Criar um projeto (um por funil)

**Add New → Project → Import** o repositório `{{REPO}}` e configure:

| Campo | Valor | Por quê |
| ----- | ----- | ------- |
| **Project Name** | nome limpo, sem prefixo (ex.: `quiz-maria-silva`) | vira o domínio público `<nome>.vercel.app` |
| **Root Directory** | `clientes/<cliente>/funis/<projeto>` | ⚠️ **o mais importante.** Sem isso a Vercel tenta buildar o monorepo inteiro |
| Framework | detecção automática | |
| Environment Variables | os segredos do projeto | **nunca** no Git |

**Regra de segurança:** nunca publique a raiz do repositório. A raiz contém o
material de **todos os clientes**. Publique sempre a subpasta do funil.

Repita para cada funil. Um repositório, muitos projetos na Vercel, cada um
apontando para a sua subpasta.

---

## 4. Deployment Protection (a armadilha do 401)

Times na Vercel costumam vir com **"Vercel Authentication" ligada**. O sintoma é
cruel: a URL do deploy responde **401** e o lead não consegue nem abrir a página.

O que saber:

- Só o **domínio de produção** do projeto (`<nome-do-projeto>.vercel.app`) fica
  público. URLs de preview ficam protegidas.
- Por isso o **nome limpo do projeto** importa: ele é a URL que você entrega.
- **Sempre confira antes de entregar:**

```bash
curl -s -o /dev/null -w "%{http_code}\n" https://<nome-do-projeto>.vercel.app/
# tem que dar 200
```

- Se der 401 na URL que você vai entregar: use o domínio de produção, ou desligue
  a proteção em **Project → Settings → Deployment Protection**. Funil público
  não pode exigir login.

---

## 5. Publicar pela linha de comando (dentro da sessão)

Quando o deploy é feito pela sessão do Claude, e não pelo Git:

```bash
# 1. TRAVA OBRIGATÓRIA — confirmar a conta antes de qualquer coisa
vercel whoami        # NÃO pode ser conta pessoal
vercel teams ls      # o time {{TIME_VERCEL}} tem que aparecer

# 2. Publicar SÓ a subpasta do funil, com o TEAM_ID no escopo
vercel deploy "clientes/<cliente>/funis/<projeto>" --prod --yes --scope <TEAM_ID>

# 3. Conferir que está público
curl -s -o /dev/null -w "%{http_code}\n" https://<nome>.vercel.app/
```

Regras:

- Use o **TEAM_ID** (`team_...`) no `--scope`, não o slug. O slug pode colidir
  com o nome da conta pessoal e dar *"You cannot set your Personal Account as
  the scope"*.
- Em modo não interativo, a Vercel **exige** `--scope` explícito.
- Se o `whoami` mostrar conta pessoal ou o time não aparecer: **pare.** Peça
  para a pessoa rodar `vercel login` com a conta certa. Login é interativo, só
  o humano conclui no navegador.

Essa trava vale a pena estar escrita dentro da skill que publica — assim ela é
verificada toda vez, não só quando alguém lembra.

---

## 6. Domínio próprio

Para entregar `quiz.{{DOMINIO}}` em vez de `<projeto>.vercel.app`:

**Project → Settings → Domains → Add** → siga as instruções de DNS (um CNAME no
registrador do domínio). O certificado HTTPS a Vercel emite sozinha.

Vale quando o funil é da própria operação. Para funil de cliente, `.vercel.app`
com nome limpo costuma bastar — a menos que o cliente queira no domínio dele,
e aí o DNS é feito por ele.

---

## 7. Higiene

- Apague projetos de teste do time: `vercel project rm <nome> --scope <TEAM_ID>`
  (o comando pede confirmação `y`; ele não aceita `--yes`).
- Registre a URL de produção no `README.md` do projeto, dentro do repositório.
  URL que só existe no chat se perde.
- Um funil aposentado: desative o projeto, mas mantenha o código no Git.

---

## 8. Checklist da Vercel

- [ ] Time `{{TIME_VERCEL}}` criado no plano **Pro**, com dois Owners
- [ ] TEAM_ID anotado no gerenciador de senhas
- [ ] GitHub conectado à organização `{{ORG_GITHUB}}`
- [ ] Todo projeto com **Root Directory** apontando para a subpasta do funil
- [ ] Nenhum projeto publicando a raiz do repositório
- [ ] URL de produção testada com `curl` (200, não 401)
- [ ] URL registrada no `README.md` do projeto
- [ ] Segredos nas Environment Variables da Vercel, não no Git
