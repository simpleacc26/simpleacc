# SimpleAcc — Hub de Trabalho

Repositório central da SimpleAcc. Aqui ficam, organizados por pasta, **os
trabalhos de clientes** e as **ações internas** do nosso negócio. A ideia é ter
**um único ambiente remoto** que mais de uma pessoa pode usar, de qualquer
máquina, mantendo cada assunto no seu lugar.

> 📖 **Antes de começar, leia o [Manual de Operação](docs/MANUAL.md).**
> Ele explica como rodar sessões remotas, as convenções de pastas/branches e as
> boas práticas para trabalharmos juntos sem bagunça.

## Como está organizado

```
.
├── README.md            ← você está aqui (visão geral)
├── CLAUDE.md            ← contexto que toda sessão do Claude Code lê
├── docs/                ← manual, convenções e playbooks
│   └── MANUAL.md
├── clientes/            ← um diretório por cliente
│   └── <cliente>/
│       └── <projeto>/   ← cada projeto/entrega do cliente
├── interno/             ← ações próprias do negócio (site, automações, etc.)
└── _modelo/             ← modelos para criar cliente/projeto novo
    ├── cliente/
    └── projeto/
```

## Onde colocar cada coisa

| Tipo de trabalho                         | Onde vai                                  |
| ---------------------------------------- | ----------------------------------------- |
| Site, landing, quiz, app de um cliente   | `clientes/<cliente>/<projeto>/`           |
| Automação (Make), integração de cliente  | `clientes/<cliente>/<projeto>/`           |
| Site/ferramenta/automação da SimpleAcc   | `interno/<projeto>/`                      |
| Documento, anotação, playbook geral      | `docs/`                                   |

## Começar um trabalho novo

1. Leia o [Manual](docs/MANUAL.md).
2. Copie `_modelo/cliente/` ou `_modelo/projeto/` para o lugar certo.
3. Preencha o `README.md` do projeto (o que é, links, deploy, contatos).
4. Trabalhe numa branch (veja o padrão de branches no manual) e abra um PR.
