# Instalação da skill "Replicar o hub da operação"

Pacote portátil da skill que monta, numa operação nova, a mesma estrutura
compartilhada de trabalho: repositório-hub com uma pasta por cliente, prompts e
skills versionados, e a configuração das contas (GitHub, Claude Code, Vercel,
Google Workspace, conectores) para várias pessoas trabalharem juntas.

## O que tem no pacote

```
replicar-hub-operacao/
├── SKILL.md                    → as instruções que o Claude segue
├── README-INSTALACAO.md        → este arquivo (pode apagar depois)
├── references/
│   ├── INSTALACAO.md           → runbook do dia 1, em 11 blocos
│   ├── PERSONALIZAR.md         → o que trocar, manter e reescrever
│   └── 01 a 09                 → contas, GitHub, Claude Code, Vercel, Drive,
│                                 conectores, time, operação diária, skills
└── assets/
    ├── base/                   → esqueleto do repositório com {{PLACEHOLDERS}}
    └── scripts/                → criar-hub.sh e copiar-inteligencia.sh
```

## Onde está o zip

Pronto para baixar em
`clientes/0-interno-simpleacc-inova/pacotes/replicar-hub-operacao.zip`.

Mexeu em algum arquivo da skill? Gere de novo antes de distribuir:

```bash
.claude/skills/replicar-hub-operacao/assets/scripts/empacotar.sh
```

## Opção 1: claude.ai (Skills / Capacidades)

1. Configurações → **Capacidades / Skills** → **Enviar skill**
2. Suba o arquivo `replicar-hub-operacao.zip`
3. Numa conversa, peça: *"monta a estrutura do hub da operação nova"*, ou
   invoque pelo nome `replicar-hub-operacao`

Sem execução de código, o Claude conduz a montagem e entrega o conteúdo dos
arquivos para você criar. Com execução de código habilitada, ele roda os scripts
e gera a estrutura inteira sozinho.

## Opção 2: Claude Code (recomendado)

Descompacte e copie a pasta `replicar-hub-operacao/` inteira para:

- **Um repositório específico** (vale para todo mundo que o usa; faça commit):
  `<repo>/.claude/skills/replicar-hub-operacao/`
- **A conta toda** (só para você): `~/.claude/skills/replicar-hub-operacao/`

> Prefira o repositório. Skill que fica só na conta pessoal não existe para o
> resto do time, e desanda em duas versões. É exatamente o que a seção 4 de
> `references/09-prompts-e-skills.md` explica.

## O que enviar para o Claude em cada uso

O necessário para não inventar nada:

- **Nome da operação nova**, o que ela vende e para quem
- **Se é o mesmo negócio** da operação existente ou outro nicho *(decide se os
  prompts e skills são copiados ou reescritos)*
- **Quantas pessoas** vão trabalhar e quem administra as contas
- **O que já existe**: domínio, e-mails, GitHub, Vercel, Drive
- Se já tem clientes em andamento

O que faltar, a skill pergunta. Ela não inventa nome de empresa, domínio nem
conta: esses valores aparecem em dezenas de arquivos e errar um significa refazer.

## O que a skill entrega

1. A estrutura do repositório gerada, com os nomes da operação nova no lugar dos
   placeholders, pronta para commitar
2. A lista do que criar em cada conta, **na ordem de dependência**, com os pontos
   que costumam custar caro (Workspace Business Standard pelos Drives
   Compartilhados, organização no GitHub em vez de repo pessoal, time Pro na
   Vercel, a armadilha do 401 no deploy)
3. O manual e o guia de entrada já dentro do repositório, para o time operar

## Rodando os scripts direto (sem a skill)

```bash
# gerar a estrutura do hub novo
assets/scripts/criar-hub.sh

# trazer prompts e skills de um hub existente (simula por padrão)
assets/scripts/copiar-inteligencia.sh <hub-existente> <hub-novo>
assets/scripts/copiar-inteligencia.sh <hub-existente> <hub-novo> --aplicar
```

## Nota sobre os arquivos `dot-`

Dentro de `assets/base/` os arquivos ocultos viajam sem o ponto
(`dot-gitignore`, `dot-github/`, `dot-claude/`) para sobreviverem ao zip e ao
upload. O `criar-hub.sh` renomeia de volta ao gerar o hub. Se você criar a
estrutura à mão, faça o mesmo:

```bash
mv dot-gitignore .gitignore && mv dot-github .github && mv dot-claude .claude
```
