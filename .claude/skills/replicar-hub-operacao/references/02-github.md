# 02 — GitHub: organização, repositório e configuração

O GitHub é a **memória permanente** da operação. A sessão do Claude é
descartável; o que está commitado é o que sobrevive. Por isso vale configurar
direito no dia 1.

---

## 1. Criar a organização (não use repositório pessoal)

1. github.com → seu avatar → **Your organizations** → **New organization**
2. Plano: **Free** serve para começar (repos privados e colaboradores ilimitados).
3. Nome: `{{ORG_GITHUB}}` — curto, sem espaço, é o que aparece na URL.
4. E-mail de contato: `{{EMAIL_ADMIN}}` (do domínio, não pessoal).

**Por que organização e não repo pessoal:** com organização, a saída de uma
pessoa é revogar um acesso. Sem organização, o repositório é *de alguém* e a
saída dela vira migração. Também é o que permite times, permissões por papel e
regras de proteção.

Depois de criar: **Settings → Members → adicione um segundo Owner.** Uma
operação com um único dono de conta é uma operação com um ponto único de falha.

---

## 2. Criar o repositório

1. Na organização → **New repository**
2. Nome: `{{REPO}}` (ex.: o nome curto da operação)
3. Visibilidade: **Private**
4. **Não** marque "Add a README" — o kit já traz um.
5. Default branch: **`main`**

Um único repositório-hub para tudo. Repositório separado só quando um projeto
crescer a ponto de precisar de CI/CD próprio ou acesso restrito (seção 12 do
`MANUAL.md`).

---

## 3. Subir a estrutura base

Use o script do kit (recomendado):

```bash
assets/scripts/criar-hub.sh
```

Ou manualmente:

```bash
git clone https://github.com/{{ORG_GITHUB}}/{{REPO}}.git
cd {{REPO}}
cp -r <kit>/assets/base/. .
# renomear os arquivos que viajam sem ponto no pacote:
mv dot-gitignore .gitignore && mv dot-github .github && mv dot-claude .claude
# trocar os {{PLACEHOLDERS}} — ver PERSONALIZAR.md
git add -A
git commit -m "Estrutura inicial do hub"
git push -u origin main
```

---

## 4. Times e permissões (quem pode o quê)

**Settings → Teams → New team**

| Time | Permissão no repo | Quem entra |
| ---- | ----------------- | ---------- |
| `admin` | **Admin** | sócios / responsável técnico |
| `operacao` | **Write** | quem produz (pode criar branch, push e PR; não pode apagar o repo) |
| `leitura` | **Read** | quem só precisa consultar (cliente, freelancer pontual) |

Regra: **quase todo mundo é `Write`.** Admin é exceção — quem pode apagar o
repositório inteiro. Convide sempre pelo e-mail do domínio.

---

## 5. Proteger a `main` (impedir que alguém sobrescreva o trabalho do outro)

**Settings → Rules → Rulesets → New branch ruleset**

| Configuração | Valor | Por quê |
| ------------ | ----- | ------- |
| Target branch | `main` | é a versão oficial |
| **Require a pull request before merging** | ✅ | ninguém escreve direto na `main` |
| Required approvals | **1** (ou 0 se a operação começa com 1 pessoa) | revisão antes de virar oficial |
| Dismiss stale approvals on new push | ✅ | aprovou, mudou, revisa de novo |
| **Block force pushes** | ✅ | impede apagar histórico |
| **Restrict deletions** | ✅ | impede apagar a `main` |
| Require linear history | opcional | histórico mais limpo |

> **Atenção ao plano:** regras de proteção de branch em **repositório privado**
> exigem **GitHub Team** (pago). No plano Free com repo privado, a proteção não
> fica disponível — nesse caso a disciplina de branch + PR é acordo do time, não
> trava técnica. Se a operação vai ter mais de duas pessoas mexendo, vale os
> ~US$ 4/usuário/mês.

Se a operação começa com uma pessoa só, deixe **Required approvals = 0** e mantenha
o resto ligado: você continua abrindo PR (que é o registro do que foi feito) e
consegue dar merge sozinho.

---

## 6. Segurança

**Settings → Code security**

| Configuração | Ligar? | Por quê |
| ------------ | ------ | ------- |
| **Secret scanning** | ✅ | avisa se um token vazou para o Git |
| **Push protection** | ✅ | **bloqueia o push** que contém um segredo, antes de vazar |
| Dependabot alerts | ✅ | avisa de dependência vulnerável nos funis |

O `.gitignore` do kit já bloqueia `.env`. Push protection é a segunda camada,
para o caso de alguém colar um token dentro de um `.md`.

---

## 7. Conectar o Claude Code ao GitHub

1. Na organização: **Settings → GitHub Apps** (ou pelo fluxo de conexão dentro
   do Claude Code) → instale o app do **Claude**.
2. Escopo: **Only select repositories** → marque `{{REPO}}`.
   Dê acesso só ao que a operação precisa, não à organização inteira.
3. Confirme as permissões: leitura/escrita de conteúdo e de pull requests.

Feito isso, uma sessão consegue: ler o repositório, criar branch, commitar,
fazer push e abrir Pull Request sozinha.

---

## 8. Convenções que o time segue

**Branches**

```
cliente/<cliente>/<assunto>     ex.: cliente/maria-silva/estrategia-inicial
interno/<assunto>               ex.: interno/site-institucional
```

**Commits** — português, imperativo, uma linha:

```
Adiciona estratégia inicial da Maria Silva
Corrige link do WhatsApp no funil
Ajusta paleta do quiz para a identidade do cliente
```

**Pull Requests**
- Um PR por assunto. **Nunca misture dois clientes no mesmo PR.**
- Pode abrir como rascunho (draft) enquanto trabalha.
- O template em `.github/pull_request_template.md` já vem com o checklist.

---

## 9. Como o time vê o trabalho

| Quero… | Onde |
| ------ | ---- |
| **Ler** um documento pronto | github.com/{{ORG_GITHUB}}/{{REPO}} → navegue nas pastas, branch `main` |
| **Ver o que mudou** | aba **Pull requests** |
| **Ver o histórico** de um arquivo | abra o arquivo → **History** |
| **Criar/alterar** | sessão do Claude Code (não pelo site do GitHub) |

Regra prática para quem não é técnico: **GitHub = ler. Claude Code = escrever.**

---

## 10. Checklist do GitHub

- [ ] Organização criada, com **dois** Owners
- [ ] Repositório `{{REPO}}` privado, default branch `main`
- [ ] Estrutura base commitada na `main`
- [ ] Times `admin` / `operacao` criados e pessoas convidadas
- [ ] Ruleset protegendo a `main` (PR obrigatório, sem force push, sem deleção)
- [ ] Secret scanning + push protection ligados
- [ ] App do Claude instalado, com acesso **só** a `{{REPO}}`
- [ ] `pull_request_template.md` presente em `.github/`
