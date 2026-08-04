# {{EMPRESA}} — Hub de Trabalho

Repositório central da {{EMPRESA}}. Aqui ficam, organizados por pasta, **os
trabalhos de clientes** e as **ações internas** do nosso negócio. A ideia é ter
**um único ambiente remoto** que mais de uma pessoa pode usar, de qualquer
máquina, mantendo cada assunto no seu lugar.

> 📖 **Antes de começar, leia o [Manual de Operação](docs/MANUAL.md).**
> Ele explica como rodar sessões remotas, as convenções de pastas/branches e as
> boas práticas para trabalharmos juntos sem bagunça.
>
> 🚀 **Novo no time?** Comece pelo guia rápido **[Como usar o hub](docs/COMO-USAR.md)**.

## Como está organizado

```
.
├── README.md            ← você está aqui (visão geral)
├── CLAUDE.md            ← contexto que toda sessão do Claude Code lê
├── docs/                ← manual, convenções e playbooks
│   ├── MANUAL.md
│   └── COMO-USAR.md
├── prompts/             ← prompts mestres reutilizáveis
├── .claude/commands/    ← comandos que rodam os prompts mestres (ex.: /prompt-mestre)
├── .claude/skills/      ← skills do time (versionadas, valem para todo mundo)
├── clientes/            ← um diretório por cliente (Interno fica no topo: 0-...)
│   └── <cliente>/       ← base de conhecimento do cliente:
│       ├── CLAUDE.md    ← contexto do cliente (lido automaticamente)
│       ├── contexto/    ← quem é, oferta, ICP, análise de mercado
│       ├── estrategia/  ← estratégias, planos, diagnósticos
│       ├── copy/        ← copy de páginas e de anúncios
│       ├── roteiros/    ← roteiros de vídeo (datados)
│       ├── funis/       ← funis, landing pages e quizzes
│       └── aprendizados.md
└── _modelo/             ← modelos para criar cliente/projeto/comando/skill novos
```

## Onde colocar cada coisa

| Tipo de trabalho                         | Onde vai                                       |
| ---------------------------------------- | ---------------------------------------------- |
| Estratégia, diagnóstico de um cliente    | `clientes/<cliente>/estrategia/`               |
| Copy de página ou de anúncio             | `clientes/<cliente>/copy/`                     |
| Roteiro de vídeo                         | `clientes/<cliente>/roteiros/`                 |
| Funil, landing, quiz                     | `clientes/<cliente>/funis/`                    |
| Contexto / pesquisa de mercado           | `clientes/<cliente>/contexto/`                 |
| Coisa da própria {{EMPRESA}}             | `clientes/{{PASTA_INTERNO}}/`                  |
| Padrão reutilizável (prompt mestre)      | `prompts/` (+ comando em `.claude/commands/`)  |
| Rotina completa e repetível (skill)      | `.claude/skills/<nome>/`                       |
| Documento, convenção, playbook geral     | `docs/`                                        |

## Começar um trabalho novo

1. Leia o [Manual](docs/MANUAL.md).
2. Copie `_modelo/cliente/` ou `_modelo/projeto/` para o lugar certo.
3. Preencha o `README.md` do projeto (o que é, links, deploy, contatos).
4. Trabalhe numa branch (veja o padrão de branches no manual) e abra um PR.

## Onde fica cada coisa fora do Git

| Ferramenta | Para quê | Link |
| ---------- | -------- | ---- |
| GitHub | este repositório (memória versionada) | `https://github.com/{{ORG_GITHUB}}/{{REPO}}` |
| Claude Code (web) | onde o trabalho é feito | https://claude.ai/code |
| Vercel | publicação dos funis/páginas | time `{{TIME_VERCEL}}` |
| Google Drive | material vivo trocado com o cliente (docs, planilhas de leads) | drive compartilhado `{{EMPRESA}}` |
