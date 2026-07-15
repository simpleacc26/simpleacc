# Skills da SimpleAcc — pacote de exportação

Pacote portátil com as skills construídas no hub da SimpleAcc, prontas para
instalar em **qualquer conta do Claude** (claude.ai, app desktop ou Claude
Code). Cada pasta é uma skill completa e autocontida: `SKILL.md` + referências
+ assets. Os `.zip` em `zips/` são os mesmos conteúdos, prontos para upload.

## O que tem aqui

As três skills formam o fluxo completo da Simple, do onboarding ao funil no ar:

| Skill | O que entrega | Etapa do fluxo |
|---|---|---|
| `estrategia-completa-clientes` | Documento de estratégia completo (8 seções: Big Idea, quiz, página, anúncios, diagnóstico, cadência de 12 dias, tarefas, recomendações) a partir da transcrição do onboarding, entregue como **Google Doc formatado** na pasta do cliente no Drive | 1. Onboarding → estratégia |
| `prompt-mestre-funil` | O Prompt Mestre de Funil: diagnóstico (5 perguntas) → aprofundamento → **página/funil e anúncios em HTML puro** | 2. Estratégia → copy/página |
| `gerar-quiz-diag-pag-pos-quiz` | Quiz + página pós-quiz (diagnóstico) + PDF **publicados na Vercel**, com identidade visual do cliente, planilha de leads no Drive e integração funil→planilha **testada** | 3. Copy aprovada → funil no ar |

Detalhe do que cada uma faz e como: leia o `SKILL.md` dentro de cada pasta.

## Como instalar

### No claude.ai / app desktop (Skills da conta)

1. Acesse **Settings → Capabilities → Skills** (é preciso ter Skills habilitadas
   no plano/organização).
2. Faça **upload do `.zip`** da skill (um por vez), a partir de `zips/`.
3. Repita para as três. A skill é acionada automaticamente quando o pedido
   bate com a descrição dela (ex.: "monta a estratégia do cliente X").

### No Claude Code (CLI / web)

- **Para valer em todos os projetos da máquina/conta:** copie as pastas para
  `~/.claude/skills/`:

  ```bash
  cp -r estrategia-completa-clientes gerar-quiz-diag-pag-pos-quiz prompt-mestre-funil ~/.claude/skills/
  ```

- **Para valer só em um repositório:** copie para `<repo>/.claude/skills/`
  (é assim que elas vivem no hub `simpleacc26/simpleacc`).

- No Claude Code, skills também podem ser invocadas direto por nome:
  `/estrategia-completa-clientes`, `/gerar-quiz-diag-pag-pos-quiz`,
  `/prompt-mestre-funil`.

> No hub da SimpleAcc o prompt mestre existe como comando `/prompt-mestre`
> (lê `prompts/funil-html.md` do repo). A versão deste pacote
> (`prompt-mestre-funil`) embute o prompt inteiro em `references/`, então
> funciona em qualquer lugar, sem depender do monorepo.

## O que cada skill precisa para entregar tudo

As skills orientam o Claude, mas as **integrações** precisam estar conectadas
na conta onde forem usadas:

| Skill | Precisa de | Para quê |
|---|---|---|
| `estrategia-completa-clientes` | Conector **Google Drive** | Criar o arquivo na pasta do cliente |
| | Navegador (Chrome MCP) — opcional | Converter HTML → Google Doc formatado (sem ele, a skill tem a alternativa manual documentada) |
| `prompt-mestre-funil` | Nada além do Claude | Gera HTML puro, sem dependências |
| `gerar-quiz-diag-pag-pos-quiz` | **Vercel** (conector MCP ou CLI logada) | Publicar o funil — **sempre na conta/time da Simple, nunca pessoal** (trava obrigatória no SKILL.md) |
| | Conector **Google Drive** | Criar a planilha de leads na pasta do cliente |
| | Google Apps Script (manual, guiado pela skill) | Integração funil → planilha |

E, claro, os **insumos do cliente**: transcrição do onboarding (skill 1),
copy aprovada + identidade visual + WhatsApp (skill 3). As skills perguntam o
que faltar, não inventam.

## Regenerar os zips

Depois de editar qualquer skill, regenere a partir desta pasta:

```bash
cd exports/claude-skills
for s in estrategia-completa-clientes gerar-quiz-diag-pag-pos-quiz prompt-mestre-funil; do
  rm -f "zips/$s.zip" && zip -rq "zips/$s.zip" "$s"
done
```

## Fonte da verdade

A fonte canônica destas skills continua sendo o hub
(`.claude/skills/` e `prompts/funil-html.md` no repo `simpleacc26/simpleacc`).
Se evoluir uma skill lá, atualize este pacote (e os zips) para as outras
contas não ficarem para trás.
