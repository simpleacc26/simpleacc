---
name: carrossel-instagram
description: >-
  Cria carrossel de Instagram no formato 4:5 a partir de um tema e da marca:
  monta o HTML autocontido com preview em moldura do Instagram (swipe) e
  exporta cada slide como PNG 1080x1350 pronto para postar. Deriva a paleta
  inteira de UMA cor primária da marca, escolhe o par de fontes, e embute
  barra de progresso e seta de swipe dentro da imagem de cada slide. Use
  sempre que alguém pedir "faz um carrossel sobre X", "carrossel do cliente
  Y", "post em carrossel pro Instagram", "slides pro Insta", "exporta os
  slides em PNG", "carrossel de 7 slides", ou quando uma copy/estratégia
  aprovada precisar virar peça de carrossel. Pergunte os dados de marca antes
  de gerar, não invente.
---

# Carrossel de Instagram: gerar, revisar e exportar

## O que esta skill faz

Transforma **um tema + a identidade de uma marca** em duas entregas:

1. **`carrossel.html`**: arquivo único, autocontido, com os slides renderizados
   dentro de uma moldura do Instagram (com swipe/arrasto) para o cliente
   aprovar antes de exportar.
2. **`slides/slide_1.png` … `slide_N.png`**: cada slide exportado em
   **1080x1350 px**, prontos para subir direto no Instagram.

O princípio central: **cada slide é uma imagem final por si só**. A barra de
progresso e a seta de "arrasta pro lado" não são interface do preview, elas são
**parte do desenho do slide** e saem dentro do PNG.

## Arquivos desta skill

- **`references/intake-marca.md`**: o que perguntar antes de desenhar (marca,
  @, cor, logo, fontes, tom, imagens) e como derivar tudo isso de um site ou
  da pasta do cliente quando ela já existe.
- **`references/design-system.md`**: a paleta de 6 tokens derivada de uma cor
  só, a escala tipográfica fixa, a arquitetura do slide, os componentes
  reutilizáveis e a sequência narrativa de 7 slides.
- **`references/exportacao-png.md`**: como exportar em 1080x1350 sem quebrar o
  layout, e os erros que sempre acontecem se você improvisar.
- **`assets/modelo-carrossel.html`**: template funcional já no padrão. Duplique
  e troque os tokens e o array de slides. Não reescreva do zero.
- **`assets/exportar-slides.py`**: script Playwright de exportação. Só recebe
  caminho de entrada, pasta de saída e número de slides.

## Onde salvar no repositório

Carrossel é peça de copy. Salve em:

```
clientes/<cliente>/copy/carrosseis/<AAAA-MM-DD>-<tema-em-slug>/
├── carrossel.html
└── slides/
    ├── slide_1.png
    └── ...
```

Para material da própria Simple, o mesmo caminho dentro de
`clientes/0-interno-simpleacc-inova/`.

## Regra de ouro: pergunte a marca, não invente

Se a pessoa disser só *"faz um carrossel sobre X"*, **pare e pergunte** os dados
de marca antes de desenhar (lista em `references/intake-marca.md`). Não assuma
cor, fonte nem tom.

Duas exceções, e só elas:

- **A tarefa é de um cliente do repo.** Então leia
  `clientes/<cliente>/CLAUDE.md`, `contexto/` e `aprendizados.md` **antes de
  perguntar**, chegue já sabendo o que a Simple sabe, e pergunte só o que faltar.
- **A pessoa mandou um site ou os assets da marca.** Derive cor, fonte e tom
  dali e **confirme o que você derivou** antes de gerar os 7 slides.

## Regras de copy inegociáveis

- **Zero travessões (`—`)** em qualquer texto que vá para o slide ou para a
  legenda. É regra da casa: "fica com cara de IA". Use vírgula ou dois-pontos.
- O **slide 1 tem que parar o scroll**. Abra com promessa ou afirmação forte,
  nunca com descrição do que o post vai falar.
- Texto de slide é curto. Se a frase não couber em duas linhas no preview de
  420px, ela está comprida demais para o Instagram.

## Fluxo (siga na ordem)

```
1. INTAKE    → tema + marca (cor, @, logo, fontes, tom, imagens). Perguntar o que falta.
2. SISTEMA   → derivar a paleta de 6 tokens e escolher o par de fontes.
3. ROTEIRO   → escrever os 7 slides em texto e MOSTRAR antes de codar.
4. BUILD     → duplicar assets/modelo-carrossel.html, trocar tokens e slides.
5. REVISÃO   → abrir o preview, conferir slide a slide, corrigir só o que quebrou.
6. EXPORT    → rodar assets/exportar-slides.py, gerar os PNGs 1080x1350.
7. ENTREGA   → mandar os PNGs + a legenda do post + salvar tudo no repo.
```

### Passo 1 — Intake

Use `references/intake-marca.md`. Termine este passo com um resumo curto: o que
você recebeu, o que derivou e o que assumiu.

### Passo 2 — Sistema visual

Use `references/design-system.md`. A partir da **cor primária única**, derive os
6 tokens (`BRAND_PRIMARY`, `BRAND_LIGHT`, `BRAND_DARK`, `LIGHT_BG`,
`LIGHT_BORDER`, `DARK_BG`) e escolha o par de fontes conforme o tom pedido.

### Passo 3 — Roteiro antes do código

**Escreva os slides em texto puro e mostre para a pessoa antes de construir o
HTML.** Ajustar uma frase em texto custa segundos; ajustar depois de exportar
7 PNGs custa a sessão inteira. Um bloco por slide: tag, título, corpo, e o que
entra de visual.

### Passo 4 — Build

Duplique `assets/modelo-carrossel.html` para a pasta do cliente e edite **dois
lugares**:

- o bloco `:root` no topo do CSS (os 6 tokens + as duas fontes);
- o array `SLIDES` no JS do rodapé (o conteúdo de cada slide).

Tudo o mais (barra de progresso, seta, moldura, swipe, dots) já está pronto e
correto no template. **Não mexa na largura de 420px da `.ig-frame`**, a
exportação depende dela.

Imagens do usuário entram em **base64 embutido**. Antes de embutir, confira o
formato real com `file` (arquivo `.png` frequentemente é JPEG por dentro) e use
o MIME certo.

### Passo 5 — Revisão

Abra o preview e confira slide a slide. O que mais quebra, nesta ordem:

1. texto encostando na barra de progresso (falta `padding-bottom: 52px`);
2. título estourando para três linhas;
3. fonte do Google não carregada, caindo em fonte de sistema.

Corrija **o slide específico**. Só reconstrua tudo se a direção mudou de fato.

### Passo 6 — Exportação

Use `references/exportacao-png.md` e o script pronto:

```bash
python3 .claude/skills/carrossel-instagram/assets/exportar-slides.py \
  --html  clientes/<cliente>/copy/carrosseis/<pasta>/carrossel.html \
  --saida clientes/<cliente>/copy/carrosseis/<pasta>/slides \
  --slides 7
```

Três coisas que **nunca** mudam: gere HTML com Python (nunca com script de
shell, que corrompe `$` e números), mantenha o viewport em 420x525 usando
`device_scale_factor` para chegar em 1080, e esconda a moldura do Instagram
antes do screenshot.

### Passo 7 — Entrega

Entregue os PNGs na ordem, a **legenda do post** (gancho, corpo curto, CTA,
hashtags) e salve tudo no caminho do repositório. Depois, registre em
`clientes/<cliente>/aprendizados.md` o que funcionou: ângulo, tom, o que o
cliente pediu para mudar.
