# SimpleAcc — Hub de Trabalho

Repositório central da SimpleAcc. Aqui ficam, organizados por pasta, **os
trabalhos de clientes** e as **ações internas** do nosso negócio. A ideia é ter
**um único ambiente remoto** que mais de uma pessoa pode usar, de qualquer
máquina, mantendo cada assunto no seu lugar.

> 📖 **Antes de começar, leia o [Manual de Operação](docs/MANUAL.md).**
> Ele explica como rodar sessões remotas, as convenções de pastas/branches e as
> boas práticas para trabalharmos juntos sem bagunça.
>
> 🚀 **Novo no time?** Comece pelo guia rápido **[Como usar o hub](docs/COMO-USAR.md)**
> (versão visual: abra `docs/COMO-USAR.html` no navegador).

## Como está organizado

```
.
├── README.md            ← você está aqui (visão geral)
├── CLAUDE.md            ← contexto que toda sessão do Claude Code lê
├── docs/                ← manual, convenções e playbooks
│   └── MANUAL.md
├── prompts/             ← prompts mestres reutilizáveis (ex.: /prompt-mestre)
├── .claude/commands/    ← comandos que rodam os prompts mestres
├── clientes/            ← um diretório por cliente (Interno fica no topo: 0-...)
│   └── <cliente>/       ← base de conhecimento do cliente:
│       ├── CLAUDE.md    ← contexto do cliente (lido automaticamente)
│       ├── contexto/    ← quem é, oferta, ICP, análise de mercado
│       ├── estrategia/  ← estratégias, planos, diagnósticos
│       ├── copy/        ← copy de páginas e de anúncios
│       ├── roteiros/    ← roteiros de vídeo (datados)
│       ├── funis/       ← funis, landing pages e quizzes
│       └── aprendizados.md
└── _modelo/             ← modelos para criar cliente/projeto novo
```

## Onde colocar cada coisa

| Tipo de trabalho                         | Onde vai                                       |
| ---------------------------------------- | ---------------------------------------------- |
| Estratégia, diagnóstico de um cliente    | `clientes/<cliente>/estrategia/`               |
| Copy de página ou de anúncio             | `clientes/<cliente>/copy/`                     |
| Roteiro de vídeo                         | `clientes/<cliente>/roteiros/`                 |
| Funil, landing, quiz                     | `clientes/<cliente>/funis/`                    |
| Contexto / pesquisa de mercado           | `clientes/<cliente>/contexto/`                 |
| Coisa da própria SimpleAcc               | `clientes/0-interno-simpleacc-inova/`          |
| Padrão reutilizável (prompt mestre)      | `prompts/` (+ comando em `.claude/commands/`)  |
| Documento, convenção, playbook geral     | `docs/`                                        |

## Gerar funil / página / anúncios

Em qualquer sessão, rode **`/prompt-mestre`** — o prompt mestre conduz diagnóstico →
aprofundamento → geração (HTML puro ou copy de anúncios). Dentro da pasta de um
cliente, ele já usa o contexto daquele cliente.

## Começar um trabalho novo

1. Leia o [Manual](docs/MANUAL.md).
2. Copie `_modelo/cliente/` ou `_modelo/projeto/` para o lugar certo.
3. Preencha o `README.md` do projeto (o que é, links, deploy, contatos).
4. Trabalhe numa branch (veja o padrão de branches no manual) e abra um PR.
