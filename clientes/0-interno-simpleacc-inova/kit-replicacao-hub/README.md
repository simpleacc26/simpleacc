# Kit de Replicação do Hub

Tudo que é preciso para **montar do zero, numa operação nova, a mesma estrutura
compartilhada** que usamos aqui: um repositório-hub onde várias pessoas, de
cidades e máquinas diferentes, trabalham para os mesmos clientes sem se
atrapalhar, e onde o conhecimento fica acumulado em vez de se perder na conversa.

O kit tem duas partes:

| Parte | O que é |
| ----- | ------- |
| **`base/`** | O esqueleto do repositório, pronto para copiar, com `{{PLACEHOLDERS}}` no lugar dos nomes |
| **`docs/`** | Como configurar cada conta e ferramenta, com o detalhe que só se aprende operando |

---

## A ideia em 30 segundos

```
Um repositório = todo o trabalho da operação
  clientes/<cliente>/   → contexto, estratégia, copy, roteiros, funis, aprendizados
  prompts/ + .claude/   → a inteligência reutilizável (comandos e skills)
  docs/                 → o manual que o time lê
  _modelo/              → modelos para criar cliente/projeto/comando/skill novos

A sessão do Claude é descartável. A memória é o Git.
Branch por trabalho, PR sempre, uma sessão = um cliente.
```

O que faz isso funcionar com várias pessoas não é a pasta: é a **disciplina**
descrita em `docs/`. A pasta sem a disciplina vira um Drive bagunçado com passos
extras.

---

## Comece aqui

1. **[INSTALACAO.md](INSTALACAO.md)** — o passo a passo do dia 1, na ordem certa
2. **[PERSONALIZAR.md](PERSONALIZAR.md)** — o que trocar, o que manter, o que reescrever

## Documentação

| # | Documento | Sobre |
| - | --------- | ----- |
| 01 | [Contas e acessos](docs/01-contas-e-acessos.md) | Tudo que precisa ser criado, na ordem, com custo de referência |
| 02 | [GitHub](docs/02-github.md) | Organização, repositório, times, proteção da `main`, segurança |
| 03 | [Claude Code na web](docs/03-claude-code.md) | Ambiente, sessões, contexto, trabalho simultâneo |
| 04 | [Vercel](docs/04-vercel.md) | Time, Root Directory, a armadilha do 401, deploy pela sessão |
| 05 | [Google Workspace e Drive](docs/05-google-workspace.md) | Estrutura de pastas, documento formatado, planilha de leads |
| 06 | [Conectores](docs/06-conectores.md) | Quais existem, como conectar, o que dá errado |
| 07 | [Time e onboarding](docs/07-time-e-onboarding.md) | Papéis, roteiro de 2h para entrar alguém, offboarding |
| 08 | [Operação diária](docs/08-operacao-diaria.md) | O ciclo de trabalho, rotinas, problemas comuns |
| 09 | [Prompts e skills](docs/09-prompts-e-skills.md) | A inteligência reutilizável e a armadilha das duas versões |

## Scripts

| Script | O que faz |
| ------ | --------- |
| `scripts/criar-hub.sh` | Gera a estrutura do hub novo a partir de `base/`, trocando os placeholders |
| `scripts/copiar-inteligencia.sh` | Leva `prompts/`, `.claude/commands/` e `.claude/skills/` de um hub existente para o novo |

---

## O que este kit **não** faz

- Não cria contas nem paga assinatura. Isso é humano, na ordem de `docs/01`.
- Não decide o nicho nem o processo comercial da operação nova.
- Não copia clientes: cada operação tem os seus.
- Não traz automaticamente os prompts e skills da operação existente — isso é uma
  decisão (mesmo negócio → copie e revise; nicho diferente → copie só a estrutura).

---

## Três coisas que valem mais que o resto do kit

1. **A memória é o Git, não a conversa.** Quem entende isso para de tentar
   "voltar naquela sessão" e passa a ler a pasta do cliente. É a mudança mental
   que faz a operação compartilhada funcionar.

2. **Uma sessão = um cliente.** Contexto misturado é a origem da maior parte dos
   erros de entrega.

3. **Skill e prompt vivem no repositório.** Se ficarem na conta pessoal de
   alguém, o time não os enxerga, eles desandam em duas versões e somem quando a
   pessoa sai. Ver `docs/09-prompts-e-skills.md`, seção 4.
