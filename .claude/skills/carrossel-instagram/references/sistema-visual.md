# Sistema visual: 6 tokens de cor + 2 fontes

Toda a identidade do carrossel sai de **uma cor** e **um par de fontes**. Nada
de cor solta no meio do HTML: se não estiver no `:root`, não existe.

## 1. Os 6 tokens

```css
:root{
  --brand-primary: /* a cor que o cliente deu */
  --brand-light:   /* primária ~20% mais clara */
  --brand-dark:    /* primária ~30% mais escura */
  --light-bg:      /* off-white tingido, NUNCA #fff */
  --light-border:  /* um tom abaixo do --light-bg */
  --dark-bg:       /* quase-preto com a temperatura da marca */
}
```

| Token | Onde aparece |
|-------|--------------|
| `--brand-primary` | barra de progresso, ícones, tags em fundo claro, círculo do lockup |
| `--brand-light` | tags e pills em fundo escuro, âncora clara do gradiente |
| `--brand-dark` | texto do botão de CTA, âncora escura do gradiente |
| `--light-bg` | fundo dos slides claros, fundo do botão de CTA |
| `--light-border` | divisórias de listas e passos em fundo claro |
| `--dark-bg` | fundo dos slides escuros, texto forte em fundo claro |

### Como derivar

- **Clara e escura**: mexa na luminosidade em HSL, mantendo o matiz. Se a
  primária for muito clara (dourado, amarelo, lima), a `--brand-dark` precisa
  descer mais que 30% para o texto do CTA ficar legível.
- **`--light-bg` acompanha a temperatura**: primária quente (vermelho, laranja,
  dourado) pede creme (`#F6F2E9`); primária fria (azul, roxo, verde-azulado)
  pede cinza-branco (`#F4F6F8`). Off-white sempre: `#fff` puro estoura no feed.
- **`--dark-bg` idem**: quente vira `#1A1918`, frio vira `#0F172A`. Preto puro
  achata o carrossel.
- **`--light-border`** é o `--light-bg` um tom abaixo, nunca um cinza neutro.

### Gradiente da marca

```css
linear-gradient(165deg, var(--brand-dark) 0%, var(--brand-primary) 50%, var(--brand-light) 100%);
```

Fórmula fixa, usada nos slides de solução e de CTA. Se os três tons ficarem
parecidos demais (o gradiente vira uma chapada), afaste mais a `--brand-dark`.

### Contraste (não é opcional)

Texto branco em cima do gradiente precisa passar em AA (4,5:1) **no ponto mais
claro do gradiente**, que é o canto inferior direito. Marca clara (dourado,
amarelo) quase nunca passa: escureça a `--brand-dark` e puxe o meio do gradiente
para baixo. O mesmo vale para o botão de CTA (`--light-bg` de fundo com texto
`--brand-dark`).

## 2. Tipografia

Um par: **fonte de título** e **fonte de corpo**, ambas do Google Fonts, ambas
declaradas no `<link>` do `<head>`. Aplique por classe: `.serif` (título) e
`.sans` (corpo).

| Estilo | Título | Corpo |
|--------|--------|-------|
| Editorial / premium | Playfair Display | DM Sans |
| Moderno / limpo | Plus Jakarta Sans (700) | Plus Jakarta Sans (400) |
| Quente / acolhedor | Lora | Nunito Sans |
| Técnico / afiado | Space Grotesk | Space Grotesk |
| Ousado / expressivo | Fraunces | Outfit |
| Clássico / confiável | Libre Baskerville | Work Sans |
| Arredondado / amigável | Bricolage Grotesque | Bricolage Grotesque |

### Escala (igual para toda marca)

| Elemento | Tamanho | Peso | Detalhe |
|----------|---------|------|---------|
| Título | 28 a 34px | 600 | letter-spacing -0.3 a -0.5px, line-height 1.1 a 1.15 |
| Corpo | 14px | 400 | line-height 1.5 a 1.55 |
| Tag / rótulo | 10px | 600 | letter-spacing 2px, caixa alta |
| Número de passo | 26px | 300 | fonte de título |
| Texto pequeno | 11 a 12px | 400 a 500 | legendas, contador, descrições de lista |

Título com mais de três linhas a 32px: desça para 28px (`.h.sm`) em vez de
cortar a ideia. Se ainda não couber, o problema é a copy, não o tamanho.

> As fontes vêm do Google Fonts por `<link>`. É a única dependência externa
> aceita aqui (o carrossel vira imagem no fim, então isso não afeta a
> performance de nenhuma página do cliente). Para funis e landing pages a regra
> continua sendo a de sempre: stack de sistema, sem fonte externa.
