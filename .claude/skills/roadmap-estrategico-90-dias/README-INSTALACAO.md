# Instalação da skill Roadmap Estratégico de 90 dias

Pacote portátil da skill da Simple que gera o **Roadmap Estratégico de 90
dias** de um cliente: o PDF de apresentação da call de roadmap, na identidade
navy + dourado, seguindo a estrutura destilada dos roadmaps já entregues, sem
travessões e com paginação A4 validada (nada cortado).

## O que tem no pacote

```
roadmap-estrategico-90-dias/
├── SKILL.md                         → instruções que o Claude segue
├── README-INSTALACAO.md             → este arquivo (pode apagar depois)
├── assets/
│   ├── modelo-roadmap.html          → esqueleto com o CSS validado
│   └── exemplos/                    → roadmaps reais entregues (calibragem)
│       ├── roadmap-lucas-sobreiro.html
│       ├── roadmap-joao-mendes.html
│       ├── roadmap-ayla-rica.html
│       ├── roadmap-felipe-damasceno.html
│       └── roadmap-lucas-alife.html
└── references/
    ├── extracao-cliente.md          → o que extrair dos materiais de base
    ├── estrutura-e-conteudo.md      → o documento página a página (variantes A e B)
    ├── exemplos-entregues.md        → o padrão que se repete nos exemplos
    └── validacao-e-pdf.md           → validações obrigatórias + geração do PDF
```

Os exemplos acompanham a skill, então ela funciona em qualquer sessão sem
depender do repositório. **Leia pelo menos um por inteiro antes de redigir** —
é o que calibra tom, granularidade e formato dos boxes.

## Opção 1: Claude Code / Cowork (recomendado)

Copie a pasta `roadmap-estrategico-90-dias/` inteira para:

- **Um projeto específico:** `<projeto>/.claude/skills/roadmap-estrategico-90-dias/`
  (vale para todo mundo que usa o repositório; faça commit).
- **A conta toda:** `~/.claude/skills/roadmap-estrategico-90-dias/`

> Prefira o repositório. Skill que fica só na conta pessoal não existe para o
> resto do time e desanda em duas versões — foi exatamente o que aconteceu com
> esta skill antes deste pacote existir.

Na sessão, envie os materiais do cliente e peça "monta o roadmap estratégico
do cliente X" (ou invoque pelo nome `roadmap-estrategico-90-dias`).

## Opção 2: claude.ai (Skills / Capacidades)

1. Compacte a pasta `roadmap-estrategico-90-dias/` num `.zip`.
2. No claude.ai: **Configurações → Capacidades/Skills → Enviar skill** → suba o zip.
3. Nas conversas, envie os materiais e peça o roadmap do cliente.

Observação: funciona melhor com execução de código habilitada (validações e
PDF automáticos). Sem isso, o Claude entrega o HTML paginado e orienta a
impressão em PDF pelo Chrome (resultado idêntico).

## O que enviar para o Claude em cada uso

- **Materiais de base do cliente**: transcrição/anotações da call de
  onboarding, canvas de produto e cliente ideal, anotações, call de vendas se
  houver.
- O que faltar de crítico (ticket, meta, escopo do contrato), a skill
  pergunta de uma vez só.

## O que a skill entrega

PDF de 13 a 15 páginas: capa personalizada, decisões fundamentais com a big
idea e a matemática operacional da meta, estratégia de caixa rápido (base,
novo serviço, indicações, antecipação de recebíveis), fases com passos
numerados e metas com alerta vermelho, funil (variante executada pelo cliente
ou implementada pela Simple), bônus com os ativos únicos do cliente,
checkpoints, materiais de apoio e fechamento pessoal. Mais a fonte HTML
editável para ajustes rápidos.

## Regras de qualidade embutidas

- Zero travessões (padrão de escrita da Simple); separadores com "·" e
  intervalos com "a".
- Matemática da meta consistente do início ao fim (contexto, fases,
  checkpoints).
- Verificação automática de paginação (nenhuma página estourando o A4).
- Tudo na realidade do cliente: nada genérico sobrando, fechamento pessoal
  com a história dele.
