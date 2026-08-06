---
name: replicar-hub-operacao
description: >-
  Monta do zero, numa operação nova, a estrutura compartilhada de trabalho em
  repositório-hub: uma pasta por cliente com contexto, estratégia, copy,
  roteiros, funis e aprendizados; prompts mestres e skills versionados; e a
  configuração das contas (GitHub, Claude Code, Vercel, Google Workspace,
  conectores) para várias pessoas trabalharem juntas sem se atrapalhar. Use
  sempre que alguém pedir para "replicar a estrutura em outra operação",
  "montar o hub da empresa nova", "criar o repositório da operação",
  "organizar o ambiente compartilhado do time", "estruturar do zero como
  fizemos na outra empresa", ou quando uma conta nova precisar montar esse
  mesmo jeito de trabalhar. Conduz a montagem passo a passo, pergunta o que
  falta e não inventa nomes, domínios nem contas.
---

# Replicar o hub da operação — montar a estrutura compartilhada do zero

## O que esta skill faz

Conduz a montagem completa de uma operação nova que trabalha do mesmo jeito:
**um repositório-hub** onde várias pessoas, de máquinas e cidades diferentes,
trabalham para os mesmos clientes, e onde o conhecimento **acumula** em vez de
se perder na conversa.

Entregáveis ao fim:

1. Estrutura do repositório gerada e commitada, com os nomes da operação nova
2. Lista do que precisa ser criado/configurado em cada conta, na ordem certa
3. Time sabendo operar (manual + guia de entrada já dentro do repositório)

## A ideia que sustenta tudo

```
Um repositório = todo o trabalho da operação
  clientes/<cliente>/   → contexto, estratégia, copy, roteiros, funis, aprendizados
  prompts/ + .claude/   → a inteligência reutilizável (comandos e skills)
  docs/                 → o manual que o time lê
  _modelo/              → modelos de cliente, projeto, comando e skill

A sessão é descartável. A memória é o Git.
Branch por trabalho · PR sempre · uma sessão = um cliente.
```

Se a pessoa não entender essa frase, o resto não gruda. Explique antes de montar.

## Regra de ouro: pergunte, não invente

Nunca invente nome de empresa, domínio, organização do GitHub, time da Vercel ou
e-mail. Esses valores aparecem em dezenas de arquivos: errar um significa refazer.
Se faltar, **pergunte**.

---

## Fluxo (siga na ordem)

```
1. DIAGNÓSTICO  → entender a operação nova e o que já existe
2. NOMES        → coletar os 7 valores que parametrizam tudo
3. CONTAS       → orientar a criação, na ordem de dependência
4. GERAR        → criar a estrutura com os nomes trocados
5. SUBIR        → repositório, proteção da main, app do Claude
6. FERRAMENTAS  → ambiente, Vercel, Drive, conectores
7. INTELIGÊNCIA → trazer ou escrever prompts e skills
8. ENTREGA      → primeiro cliente + onboarding do time
```

### Passo 1 — Diagnóstico

Pergunte, tudo de uma vez:

1. **Qual é a operação nova?** (nome, o que vende, para quem)
2. **É o mesmo negócio** da operação existente, ou outro nicho? *(decide se os
   prompts e skills são copiados ou reescritos)*
3. **Quantas pessoas** vão trabalhar nela, e quem administra as contas?
4. **O que já existe?** (e-mail/domínio, GitHub, Vercel, Drive, conta Claude) —
   não crie o que já existe. Pergunte explicitamente: **é uma conta só para o
   time inteiro, ou uma por pessoa?**
5. **Já tem clientes** em andamento, ou começa vazia?

Resuma o que entendeu antes de seguir.

### Passo 2 — Modelo de conta e nomes

**Primeiro, o modelo de conta.** Ele muda os passos 3, 6 e 8:

| Modelo | Quando | O que implica |
| ------ | ------ | ------------- |
| **A — conta única da operação** | começo, time pequeno, orçamento apertado | Um e-mail (pode ser Gmail) que todos usam. Sem Drive Compartilhado, limite de uso e histórico compartilhados, e a saída de alguém obriga a trocar senha |
| **B — conta por pessoa** | time crescendo, rotatividade, limite travando | Domínio + Workspace, conta própria em cada ferramenta |

Em qualquer um dos dois, **recomende separar o GitHub**: lá a conta por pessoa é
grátis (organização Free) e é o que preserva "quem fez o quê". Trade-offs
completos em `references/01-contas-e-acessos.md`.

**Depois, os sete valores** que parametrizam todos os arquivos:

| Valor | Exemplo |
| ----- | ------- |
| Nome da operação | `Nova Operação` |
| Domínio | `novaop.com.br` |
| Organização no GitHub | `novaop` |
| Nome do repositório | `novaop` |
| Time na Vercel | `novaop` |
| E-mail do admin | `admin@novaop.com.br` |
| Pasta do interno | `0-interno-novaop` |

No **Modelo A**, se ainda não existe domínio, use o e-mail da operação no lugar
de `E-mail do admin` e deixe `Domínio` como o que a operação usa hoje (ou o
domínio futuro, se já estiver decidido). Não invente um domínio: pergunte.

Confirme os sete na tela antes de gerar qualquer coisa.

### Passo 3 — Contas

Oriente a criação **nesta ordem** — cada bloco depende do anterior:

```
Domínio + Google Workspace → GitHub → Claude → Vercel → Conectores
```

Leia `references/01-contas-e-acessos.md` e passe o que importa. Os pontos que
mais custam caro quando erram:

- **Organização no GitHub**, não repositório pessoal — vale nos dois modelos
- **Time Pro na Vercel** — o plano gratuito é pessoal e não permite uso comercial
- **Modelo B:** Workspace Business Standard ou superior. O Starter não tem
  Drives Compartilhados, e sem eles todo arquivo fica preso na conta de quem criou
- **Modelo A:** 2FA da conta única guardado **no gerenciador de senhas**, não no
  celular de uma pessoa só, senão ela vira o gargalo da operação inteira

E a regra que atravessa tudo: nenhuma conta nasce no e-mail **pessoal de uma
pessoa**. Ou é o domínio da empresa, ou um e-mail de função que o time controla.

### Passo 4 — Gerar a estrutura

Se você tem execução de código:

```bash
assets/scripts/criar-hub.sh
```

O script pergunta os sete valores, copia `assets/base/` para o destino, troca
todos os `{{PLACEHOLDERS}}` e cria a pasta do interno. Ao final ele avisa se
sobrou algum placeholder.

Se **não** tem execução de código: crie os arquivos um a um a partir de
`assets/base/`, trocando os `{{PLACEHOLDERS}}`. Comece pelos quatro que importam
— `CLAUDE.md`, `README.md`, `docs/MANUAL.md`, `docs/COMO-USAR.md` — e siga pelos
`_modelo/`. Lembre de renomear `dot-gitignore` → `.gitignore`,
`dot-github/` → `.github/` e `dot-claude/` → `.claude/`.

Detalhe do que é genérico, do que é identidade e do que precisa ser reescrito:
`references/PERSONALIZAR.md`.

### Passo 5 — Subir e proteger

```bash
cd <destino>
git init -b main && git add -A
git commit -m "Estrutura inicial do hub"
git remote add origin https://github.com/<org>/<repo>.git
git push -u origin main
```

Depois, conforme `references/02-github.md`: proteger a `main` (PR obrigatório,
sem force push, sem deleção), ligar secret scanning e push protection, e
instalar o app do Claude **com acesso só a este repositório**.

⚠️ Proteção de branch em repositório **privado** exige o plano **GitHub Team**.
No Free, a disciplina de branch + PR é acordo do time, não trava técnica. Diga
isso em vez de deixar a pessoa achar que está protegida.

### Passo 6 — Ferramentas

| Ferramenta | Referência | Ponto crítico |
| ---------- | ---------- | ------------- |
| Claude Code | `references/03-claude-code.md` | Ambiente apontando para o repositório; rede liberada para a Vercel e para o registro de pacotes |
| Vercel | `references/04-vercel.md` | Root Directory na subpasta do funil (nunca a raiz); a armadilha do 401 |
| Google Drive | `references/05-google-workspace.md` | Drive Compartilhado; documento formatado via HTML → Google Docs |
| Conectores | `references/06-conectores.md` | Conectar no nível da organização, não da conta pessoal |

### Passo 7 — Inteligência: prompts e skills

**Mesmo negócio** → copie do hub existente e revise:

```bash
assets/scripts/copiar-inteligencia.sh <hub-existente> <hub-novo>            # simula
assets/scripts/copiar-inteligencia.sh <hub-existente> <hub-novo> --aplicar  # aplica
```

Revise item por item: trava de conta da Vercel apontando para o time novo, pasta
do Drive nova, nome da empresa antiga removido, assets da marca nova, exemplos de
clientes antigos generalizados.

**Nicho diferente** → copie só a estrutura (`_modelo/comando/` e `_modelo/skill/`)
e escreva o conteúdo do zero. Prompt mestre de nicho errado entrega copy de
nicho errado.

⚠️ **Antes de copiar, verifique se alguma skill de processo vive só na conta
pessoal de alguém.** Se viver, o time não a enxerga e ela desanda em duas
versões. Traga para o repositório de origem antes de replicar. O script avisa
quando detecta. Detalhe em `references/09-prompts-e-skills.md`, seção 4.

### Passo 8 — Entrega

Não termine na estrutura vazia. Feche com:

1. **Um cliente completo**, feito junto com o time, do `_modelo/cliente/` até o
   PR mergeado — é o que faz o processo entrar no corpo
2. **Onboarding de cada pessoa** (`references/07-time-e-onboarding.md`): acessos,
   leitura, tour de 30 min, primeira tarefa real com o PR revisado junto
3. **As tabelas preenchidas** em `prompts/README.md` e `docs/COMO-USAR.md`

Entregue: link do repositório, o que ficou pronto, o que ainda depende de uma
ação humana (autorizações, pagamentos, DNS) e o checklist final de
`references/INSTALACAO.md`.

---

## Verificação: a estrutura está pronta quando

- [ ] Uma pessoa que não participou da montagem consegue abrir uma sessão,
      produzir e abrir um PR **só lendo `docs/COMO-USAR.md`**
- [ ] A `main` não aceita push direto (ou o time acordou que não faz)
- [ ] Existe pelo menos um cliente completo servindo de exemplo
- [ ] Existe pelo menos um comando ou skill funcionando
- [ ] Nenhuma skill de processo vive só numa conta pessoal
- [ ] Cada conta crítica tem dois administradores
- [ ] Nenhum `{{PLACEHOLDER}}` sobrou: `grep -rn '{{[A-Z_]*}}' <hub>`

## Arquivos desta skill

| Arquivo | Leia quando |
| ------- | ----------- |
| `references/INSTALACAO.md` | Quiser o runbook do dia 1, em 11 blocos |
| `references/PERSONALIZAR.md` | For decidir o que trocar, manter e reescrever |
| `references/01-contas-e-acessos.md` | Passo 3 — contas, ordem, custo de referência |
| `references/02-github.md` | Passo 5 — organização, times, proteção, segurança |
| `references/03-claude-code.md` | Passo 6 — ambiente, sessões, trabalho simultâneo |
| `references/04-vercel.md` | Passo 6 — time, Root Directory, deploy, 401 |
| `references/05-google-workspace.md` | Passo 6 — Drive, documento formatado, leads |
| `references/06-conectores.md` | Passo 6 — quais, como conectar, o que dá errado |
| `references/07-time-e-onboarding.md` | Passo 8 — papéis, onboarding, offboarding |
| `references/08-operacao-diaria.md` | Passo 8 — ciclo de trabalho, rotinas, problemas |
| `references/09-prompts-e-skills.md` | Passo 7 — comandos, skills e a armadilha das duas versões |
| `assets/base/` | Esqueleto do repositório, com `{{PLACEHOLDERS}}` |
| `assets/scripts/criar-hub.sh` | Passo 4 — gera a estrutura |
| `assets/scripts/copiar-inteligencia.sh` | Passo 7 — traz prompts e skills |
