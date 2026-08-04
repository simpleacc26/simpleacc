# Personalizar: o que trocar, manter e reescrever

O kit separa três coisas: o que é **genérico** (use como está), o que é
**identidade** (troque) e o que é **conteúdo do negócio** (reescreva ou traga da
operação existente).

---

## 1. Placeholders

Todo arquivo de `assets/base/` usa `{{CHAVE}}`. O `assets/scripts/criar-hub.sh` troca todos de
uma vez. Se preferir fazer à mão, esta é a lista completa:

| Placeholder | O que é | Exemplo |
| ----------- | ------- | ------- |
| `{{EMPRESA}}` | Nome da operação, como aparece nos documentos | `Nova Operação` |
| `{{ORG_GITHUB}}` | Organização no GitHub | `novaop` |
| `{{REPO}}` | Nome do repositório | `novaop` |
| `{{TIME_VERCEL}}` | Slug do time na Vercel | `novaop` |
| `{{DOMINIO}}` | Domínio da operação | `novaop.com.br` |
| `{{EMAIL_ADMIN}}` | E-mail do dono das contas | `admin@novaop.com.br` |
| `{{PASTA_INTERNO}}` | Pasta do interno em `clientes/` | `0-interno-novaop` |

Conferir se sobrou algum:

```bash
grep -rn '{{[A-Z_]*}}' <pasta-do-hub-novo>
```

---

## 2. O que é genérico (mantenha)

Funciona igual em qualquer operação de serviço com clientes. Não mexa antes de
usar por um mês.

| Arquivo | Por que manter |
| ------- | -------------- |
| Estrutura `clientes/<cliente>/{contexto,estrategia,copy,roteiros,funis}` | Divisão validada na prática |
| `aprendizados.md` por cliente | O que faz a operação acumular inteligência |
| `docs/MANUAL.md` | Convenções de pasta, branch, PR, segredo, deploy |
| `docs/COMO-USAR.md` | Guia de entrada para quem não é técnico |
| `CLAUDE.md` da raiz | As regras que a IA lê em toda sessão |
| `_modelo/` inteiro | Modelos de cliente, projeto, comando e skill |
| `.gitignore` | Bloqueia `node_modules`, builds e `.env` |
| `.github/pull_request_template.md` | Checklist do PR |
| Padrão de branch `cliente/<cliente>/<assunto>` | Mantém a `main` limpa |
| Prefixo `0-` na pasta do interno | Mantém o interno no topo da lista |

---

## 3. O que é identidade (troque)

| O quê | Onde | Como |
| ----- | ---- | ---- |
| Nome da operação | tudo | placeholder `{{EMPRESA}}` |
| Links de GitHub, Vercel, Drive | `README.md`, `docs/` | placeholders |
| Pasta do interno | `clientes/{{PASTA_INTERNO}}/` | placeholder |
| Marca (logo, paleta, fontes) | `clientes/<interno>/marca/` | subir os arquivos da marca nova |
| Tabelas de comandos e skills | `prompts/README.md`, `docs/COMO-USAR.md` | preencher conforme cadastrar |

---

## 4. O que é conteúdo do negócio (decida)

Aqui não existe resposta automática. Depende de a operação nova ser do mesmo
negócio ou de outro.

| Item | Mesmo negócio | Nicho diferente |
| ---- | ------------- | --------------- |
| Prompts mestres (`prompts/*.md`) | Copie e revise nomes/exemplos | Copie **só a estrutura** e reescreva |
| Skills (`.claude/skills/`) | Copie e revise contas, caminhos e assets | Aproveite o esqueleto do `SKILL.md`, reescreva o conteúdo |
| Assets de skill (HTML de funil, modelo de PDF) | Copie e troque a identidade visual | Refaça a partir do que converte no nicho novo |
| Regras de estilo da casa | Mantenha | Redefina |
| Clientes | **Não copie.** Cada operação tem os seus | **Não copie** |

Para copiar: `assets/scripts/copiar-inteligencia.sh` (roda em simulação por padrão).

---

## 5. Revisão obrigatória depois de copiar inteligência

Todo item abaixo já causou problema real. Confira um por um:

- [ ] **Trava de conta na Vercel** apontando para o time **novo** — senão a
      operação nova publica na conta da antiga
- [ ] **Pasta do Drive** apontando para o Drive **novo**
- [ ] **Nome da empresa antiga** removido de todos os textos:
      `grep -ril "<empresa-antiga>" prompts .claude`
- [ ] **Nomes de clientes** da operação antiga virando exemplos genéricos
- [ ] **Assets** (logo, paleta, fontes) trocados
- [ ] **Números de WhatsApp** e links `wa.me` trocados
- [ ] **Descrições das skills** com as palavras que o time **novo** vai usar —
      se a `description` não bate com o vocabulário da casa, a skill nunca dispara

---

## 6. O que não replicar

| Não leve | Por quê |
| -------- | ------- |
| Pastas de clientes | Dados de cliente não migram entre operações |
| Histórico do Git da operação antiga | Comece limpo |
| Chaves, tokens, `.env` | Nunca estiveram no Git, e não devem estar |
| Skills genéricas da conta (PDF, planilha, apresentação) | Cada pessoa instala na sua conta |
| URLs de deploy da operação antiga | Projetos novos, URLs novas |

---

## 7. Ajustes que costumam aparecer no primeiro mês

Normal e saudável. Faça por PR, como qualquer outro trabalho:

| Ajuste | Quando |
| ------ | ------ |
| Subpasta nova em `clientes/<cliente>/` | A operação tem um tipo de entrega que não cabe nas cinco |
| Comando novo | Algo se repetiu três vezes |
| Skill nova | Um processo ganhou etapas fixas e arquivos-modelo |
| Regra nova no `CLAUDE.md` | A IA errou a mesma coisa duas vezes |
| Seção nova no `MANUAL.md` | Alguém perguntou a mesma coisa duas vezes |

> Se você respondeu a mesma dúvida duas vezes no WhatsApp do time, ela deveria
> estar no `MANUAL.md`. Documentar é mais barato que responder.
