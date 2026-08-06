# Instalação — do zero ao hub funcionando

Roteiro do dia 1. Siga na ordem: cada bloco depende do anterior.

**Tempo total:** cerca de 4 horas de trabalho efetivo, mais o tempo de propagação
de DNS do domínio (que pode levar horas e roda em paralelo).

---

## Antes de começar, decida

**Primeiro, o modelo de conta** (muda os Blocos 1, 2 e 5):

| Modelo | Quando | Detalhe |
| ------ | ------ | ------- |
| **A — conta única da operação** | começo, time pequeno, orçamento apertado | Um e-mail (pode ser Gmail) que todos usam. **Separe só o GitHub**: lá a conta por pessoa é grátis |
| **B — conta por pessoa** | time crescendo, rotatividade, limite de uso travando | Domínio + Workspace, e conta própria em cada ferramenta |

Detalhes e trade-offs em `01-contas-e-acessos.md`. Depois, os nomes:

| Decisão | Exemplo | Onde vai aparecer |
| ------- | ------- | ----------------- |
| Nome da operação | `Nova Operação` | em tudo |
| Domínio | `novaop.com.br` | e-mails, links |
| Organização no GitHub | `novaop` | URL do repositório |
| Nome do repositório | `novaop` | URL do repositório |
| Time na Vercel | `novaop` | escopo dos deploys |
| E-mail do admin | `admin@novaop.com.br` | dono das contas |
| Pasta do interno | `0-interno-novaop` | `clientes/0-interno-novaop/` |

Anote. O script vai pedir exatamente isso.

---

## Bloco 1 — Fundação

### Modelo A — conta única (15 min)

- [ ] Criar o **e-mail da operação** com nome neutro, de função
      (`operacaoX@gmail.com`), nunca o nome de uma pessoa
- [ ] Criar o **gerenciador de senhas** (1Password, Bitwarden)
- [ ] **Ligar o 2FA** dessa conta e guardar o segundo fator **no gerenciador**,
      não no celular de uma pessoa só
- [ ] Guardar os **códigos de recuperação** no mesmo lugar
- [ ] Combinar com o time: o e-mail da operação é login, **não** é o e-mail
      público de contato com cliente

### Modelo B — domínio + Workspace (60 min + propagação de DNS)

- [ ] Registrar o **domínio**
- [ ] Contratar **Google Workspace Business Standard** (ou superior — o Starter
      não tem Drives Compartilhados)
- [ ] Verificar o domínio no Workspace e apontar o DNS
- [ ] Criar o e-mail do admin e um e-mail por pessoa do time
- [ ] Criar o **gerenciador de senhas** e colocar tudo lá

📖 `01-contas-e-acessos.md`

> No Modelo B, enquanto o DNS propaga, siga para o Bloco 2. Não fica travado.

---

## Bloco 2 — GitHub (30 min)

- [ ] Criar a **organização** (não repositório pessoal)
- [ ] Adicionar um **segundo Owner**
- [ ] Criar o repositório **privado**, default branch `main`, sem README
- [ ] Criar os times `admin` e `operacao`
- [ ] Convidar as pessoas — **mesmo no Modelo A, cada uma com o GitHub próprio**
      (é grátis, e é o que preserva quem fez o quê)
- [ ] Ligar **secret scanning** e **push protection**

📖 `02-github.md`

---

## Bloco 3 — Gerar e subir a estrutura (20 min)

```bash
# a partir da pasta do kit
assets/scripts/criar-hub.sh
```

O script pergunta os valores do quadro acima, copia `base/` para o destino e
troca todos os `{{PLACEHOLDERS}}`.

Depois:

```bash
cd <destino>
git init -b main
git add -A
git commit -m "Estrutura inicial do hub"
git remote add origin https://github.com/<org>/<repo>.git
git push -u origin main
```

- [ ] Estrutura no ar em `github.com/<org>/<repo>`
- [ ] Conferir que `CLAUDE.md`, `README.md` e `docs/` estão com os nomes certos

📖 `PERSONALIZAR.md`

---

## Bloco 4 — Proteger a `main` (10 min)

Só depois que a `main` existe:

- [ ] Ruleset em `main`: **PR obrigatório**, **sem force push**, **sem deleção**
- [ ] Aprovações necessárias: `1` (ou `0` se a operação começa com uma pessoa)

⚠️ Em repositório **privado**, proteção de branch exige **GitHub Team** (pago).
No Free, a disciplina de branch + PR é acordo do time, não trava técnica.

📖 `02-github.md`, seção 5

---

## Bloco 5 — Claude Code (30 min)

- [ ] **Modelo A:** uma conta no e-mail da operação, usada por todos ·
      **Modelo B:** uma conta por pessoa
- [ ] Se a conta é única, combinar as três regras extras (nome na 1ª mensagem,
      não retomar sessão antiga, avisar antes de carga pesada)
- [ ] Instalar o **app do Claude** no GitHub, com acesso **só a este repositório**
- [ ] Criar o **ambiente**, apontando para o repositório
- [ ] Ajustar a política de rede (precisa alcançar a Vercel e o registro de pacotes)
- [ ] Testar: abrir sessão, pedir uma alteração pequena, conferir que o PR abre

📖 `03-claude-code.md`

---

## Bloco 6 — Vercel (30 min)

- [ ] Criar o **time** no plano **Pro** (o Hobby é pessoal e não permite uso comercial)
- [ ] Adicionar as pessoas; deixar **dois** Owners
- [ ] Conectar à organização do GitHub
- [ ] Anotar o **TEAM_ID** (`team_...`) no gerenciador de senhas
- [ ] Conferir o estado do **Deployment Protection** (a armadilha do 401)

📖 `04-vercel.md`

---

## Bloco 7 — Drive (30 min)

- [ ] **Modelo A:** montar as pastas no "Meu Drive" da conta da operação, já no
      formato de Drive Compartilhado · **Modelo B:** criar o **Drive
      Compartilhado** da operação
- [ ] Montar a estrutura `00 Interno/` e `Clientes/`
- [ ] Criar o **modelo de pasta de cliente** para copiar a cada cliente novo
- [ ] Dar acesso ao time
- [ ] Conectar o conector do **Google Drive** com a conta da operação

📖 `05-google-workspace.md`

---

## Bloco 8 — Conectores (15 min)

- [ ] Google Drive ✅ · Vercel ✅ · GitHub ✅ (essenciais)
- [ ] ClickUp, Make (recomendados)
- [ ] Figma, Canva (opcionais)
- [ ] Conectar no nível da **organização**, não da conta pessoal

📖 `06-conectores.md`

---

## Bloco 9 — Inteligência: prompts e skills (30 min a algumas horas)

Se a operação nova é do **mesmo negócio**:

```bash
# simulação primeiro
assets/scripts/copiar-inteligencia.sh <hub-existente> <hub-novo>
# depois de conferir a lista
assets/scripts/copiar-inteligencia.sh <hub-existente> <hub-novo> --aplicar
```

- [ ] Revisar item por item (nomes, contas, caminhos, assets, exemplos)
- [ ] Preencher as tabelas em `prompts/README.md` e `docs/COMO-USAR.md`

Se a operação nova é de **outro nicho**: copie só a estrutura (`_modelo/comando/`
e `_modelo/skill/`) e escreva o conteúdo do zero.

⚠️ Antes de copiar, confira se alguma skill importante da operação atual está
**só na conta pessoal** de alguém. O script avisa quando detecta. Traga para o
repositório de origem antes de replicar.

📖 `09-prompts-e-skills.md`

---

## Bloco 10 — Primeiro cliente de verdade (60 min)

Faça o primeiro cliente **junto com o time**, para o processo entrar no corpo:

- [ ] `cp -r _modelo/cliente clientes/<cliente>` e preencher o `CLAUDE.md`
- [ ] Criar a pasta do cliente no Drive
- [ ] Preencher `contexto/` com o material do onboarding
- [ ] Produzir a primeira entrega numa sessão
- [ ] Registrar o aprendizado em `aprendizados.md`
- [ ] Abrir o PR, revisar junto, mergear

📖 `08-operacao-diaria.md`

---

## Bloco 11 — Onboarding do time (2h por pessoa)

- [ ] Acessos criados
- [ ] Leitura de `docs/COMO-USAR.md` e `docs/MANUAL.md`
- [ ] Tour guiado
- [ ] Primeira tarefa real, com o PR revisado junto

📖 `07-time-e-onboarding.md`

---

## Verificação final

A estrutura está pronta quando **todas** forem verdade:

- [ ] Uma pessoa que não participou da montagem consegue abrir uma sessão,
      produzir e abrir um PR **só lendo `docs/COMO-USAR.md`**
- [ ] A `main` não aceita push direto (ou o time acordou que não faz)
- [ ] Existe pelo menos um cliente completo servindo de exemplo
- [ ] Existe pelo menos um comando ou skill funcionando
- [ ] Todo funil no ar tem URL registrada no `README.md` e integração testada
- [ ] Nenhuma skill de processo vive só numa conta pessoal
- [ ] Modelo B: cada conta crítica tem **dois** administradores ·
      Modelo A: senha e 2FA da conta única acessíveis a mais de uma pessoa
