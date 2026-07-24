# Sistema visual — marca, paleta e tipografia

Este arquivo cobre os **passos 1 a 3** do fluxo: coletar a marca, derivar a
paleta de 6 tokens e definir a tipografia. Tudo sai de **uma única cor primária**.

---

## Passo 1 — Coletar os dados de marca

Antes de gerar qualquer carrossel, pergunte (se ainda não foi informado):

1. **Nome da marca** — exibido no primeiro e no último slide.
2. **@ do Instagram** — mostrado no header do frame e na legenda.
3. **Cor primária da marca** — o acento principal (código hex, ou descreve e você
   escolhe uma).
4. **Logo** — pergunte se tem um path SVG, se quer usar a inicial da marca, ou
   pular o logo.
5. **Preferência de fonte** — pergunte se quer título serifado + corpo sans
   (clima editorial), tudo sans-serif (moderno/clean), ou se tem Google Fonts
   específicas em mente.
6. **Tom** — profissional, casual, brincalhão, ousado, minimalista, etc.
7. **Imagens** — pergunte por qualquer imagem a incluir no carrossel (foto de
   perfil, prints, imagens de produto, etc.).

Se o usuário passar uma **URL de site** ou assets da marca, derive as cores e o
estilo a partir deles.

Se o usuário disser só **"faz um carrossel sobre X" sem detalhes de marca,
pergunte antes de gerar. Não assuma defaults.**

> Dentro da pasta de um cliente, boa parte disso já está em `contexto/`,
> `CLAUDE.md` e `aprendizados.md` — leia antes de perguntar e chegue nas
> perguntas só com o que faltar.

---

## Passo 2 — Derivar o sistema de cores completo

A partir da **cor primária única** da marca, gere a paleta de **6 tokens**:

```
BRAND_PRIMARY = {cor do usuário}        // Acento principal — barra de progresso, ícones, tags
BRAND_LIGHT   = {primária ~20% mais clara} // Acento secundário — tags no escuro, pills
BRAND_DARK    = {primária ~30% mais escura} // Texto de CTA, âncora do gradiente
LIGHT_BG      = {off-white quente ou frio}  // Fundo dos slides claros (nunca #fff puro)
LIGHT_BORDER  = {um tom mais escuro que LIGHT_BG} // Divisórias nos slides claros
DARK_BG       = {quase-preto com tint da marca}   // Fundo dos slides escuros
```

**Regras para derivar as cores:**
- **LIGHT_BG** é um off-white tingido que combina com a primária (primária quente
  → creme quente; primária fria → branco-acinzentado frio). **Nunca `#fff` puro.**
- **DARK_BG** é um quase-preto com um tint sutil na temperatura da marca
  (quente → `#1A1918`; frio → `#0F172A`).
- **LIGHT_BORDER** é sempre ~1 tom mais escuro que LIGHT_BG.
- O **gradiente de marca** usado nos slides de gradiente é:
  `linear-gradient(165deg, BRAND_DARK 0%, BRAND_PRIMARY 50%, BRAND_LIGHT 100%)`

> No JS dos componentes, `B` é o atalho para **BRAND_PRIMARY**.

---

## Passo 3 — Tipografia

Com base na preferência de fonte do usuário, escolha uma **fonte de título** e uma
**fonte de corpo** do Google Fonts.

**Pares sugeridos:**

| Estilo                    | Fonte de título          | Fonte de corpo        |
| ------------------------- | ------------------------ | --------------------- |
| Editorial / premium       | Playfair Display         | DM Sans               |
| Moderno / clean           | Plus Jakarta Sans (700)  | Plus Jakarta Sans (400) |
| Aconchegante / próximo    | Lora                     | Nunito Sans           |
| Técnico / afiado          | Space Grotesk            | Space Grotesk         |
| Ousado / expressivo       | Fraunces                 | Outfit                |
| Clássico / confiável      | Libre Baskerville        | Work Sans             |
| Arredondado / amigável    | Bricolage Grotesque      | Bricolage Grotesque   |

**Escala de tamanhos (fixa para todas as marcas):**
- **Títulos:** 28–34px, peso 600, letter-spacing -0.3 a -0.5px, line-height 1.1–1.15
- **Corpo:** 14px, peso 400, line-height 1.5–1.55
- **Tags/labels:** 10px, peso 600, letter-spacing 2px, caixa alta
- **Números de passo:** fonte de título, 26px, peso 300
- **Texto pequeno:** 11–12px

Aplique via classes CSS **`.serif`** (fonte de título) e **`.sans`** (fonte de
corpo) em todos os slides.
