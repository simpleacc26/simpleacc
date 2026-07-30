# Sistema de design do carrossel

Tudo aqui é fixo entre marcas, **menos a paleta e as fontes**. É isso que faz
carrosséis de clientes diferentes parecerem igualmente bem feitos.

---

## 1. A paleta: 6 tokens a partir de uma cor só

A pessoa dá **uma** cor. Você deriva as outras cinco.

```
BRAND_PRIMARY = cor da pessoa          → barra de progresso, ícones, tags
BRAND_LIGHT   = primária +20% de luz   → tags sobre fundo escuro, pills
BRAND_DARK    = primária -30% de luz   → texto do CTA, âncora do gradiente
LIGHT_BG      = off-white tingido      → fundo dos slides claros (nunca #fff puro)
LIGHT_BORDER  = 1 tom abaixo do LIGHT_BG → divisórias nos slides claros
DARK_BG       = quase-preto tingido    → fundo dos slides escuros
```

Regras de derivação:

- **A temperatura manda.** Primária quente (vermelho, laranja, dourado) puxa
  `LIGHT_BG` para creme e `DARK_BG` para `#1A1918`. Primária fria (azul, verde,
  roxo) puxa `LIGHT_BG` para branco-acinzentado e `DARK_BG` para `#0F172A`.
- `LIGHT_BG` **nunca** é `#FFFFFF`. Branco puro no feed do Instagram parece
  slide sem acabamento.
- `LIGHT_BORDER` é sempre um tom só abaixo do `LIGHT_BG`, não é cinza médio.
- O gradiente da marca, usado nos slides 3 e 7, é sempre:
  `linear-gradient(165deg, BRAND_DARK 0%, BRAND_PRIMARY 50%, BRAND_LIGHT 100%)`

Exemplo derivado do azul da Simple (`#3E5C8A`, frio):

```
BRAND_PRIMARY #3E5C8A   BRAND_LIGHT #8197B6   BRAND_DARK  #263A57
LIGHT_BG      #EEF3FA   LIGHT_BORDER #DDE5F0  DARK_BG     #0A1626
```

---

## 2. Tipografia

Escolha o par pelo tom pedido no intake:

| Estilo | Título | Corpo |
|---|---|---|
| Editorial / premium | Playfair Display | DM Sans |
| Moderno / limpo | Plus Jakarta Sans 700 | Plus Jakarta Sans 400 |
| Acolhedor | Lora | Nunito Sans |
| Técnico / afiado | Space Grotesk | Space Grotesk |
| Ousado / expressivo | Fraunces | Outfit |
| Clássico / confiável | Libre Baskerville | Work Sans |
| Arredondado / amigável | Bricolage Grotesque | Bricolage Grotesque |

**A escala não muda entre marcas:**

| Elemento | Tamanho | Peso | Detalhe |
|---|---|---|---|
| Título | 28 a 34px | 600 | `letter-spacing: -0.3 a -0.5px`, `line-height: 1.1 a 1.15` |
| Corpo | 14px | 400 | `line-height: 1.5 a 1.55` |
| Tag / label | 10px | 600 | `letter-spacing: 2px`, maiúsculas |
| Número de passo | 26px | 300 | fonte do título |
| Texto pequeno | 11 a 12px | 400 a 500 | |

No HTML, as duas fontes viram as classes `.serif` (título) e `.sans` (corpo),
usadas em todos os slides. Os nomes das classes são fixos mesmo quando o par
escolhido não tem serifa nenhuma.

---

## 3. Arquitetura do slide

- Proporção **4:5**, o padrão de carrossel do Instagram. No preview: 420x525px.
- Fundos **alternam claro e escuro** para criar ritmo ao longo do swipe.
- Cada slide é autossuficiente: tudo que se vê está dentro da imagem exportada.

### Barra de progresso (em todos os slides)

Fica colada no rodapé, ocupa a largura toda com 28px de respiro lateral e 20px
embaixo. Trilho de 3px arredondado, preenchimento
`((indice + 1) / total) * 100%`, e o contador "1/7" ao lado, 11px, peso 500.

Ela se adapta ao fundo:

| | Trilho | Preenchimento | Contador |
|---|---|---|---|
| Slide claro | `rgba(0,0,0,0.08)` | `BRAND_PRIMARY` | `rgba(0,0,0,0.3)` |
| Slide escuro | `rgba(255,255,255,0.12)` | `#fff` | `rgba(255,255,255,0.4)` |

### Seta de swipe (em todos, menos no último)

Faixa de 48px na borda direita, altura inteira, com gradiente de transparente
para um tom sutil, e um chevron de 24x24 com pontas arredondadas.

| | Fundo da faixa | Traço do chevron |
|---|---|---|
| Slide claro | `rgba(0,0,0,0.06)` | `rgba(0,0,0,0.25)` |
| Slide escuro | `rgba(255,255,255,0.08)` | `rgba(255,255,255,0.35)` |

**No último slide a seta some.** É assim que a pessoa entende que acabou.

As duas coisas já estão implementadas no template
(`assets/modelo-carrossel.html`, funções `progressBar()` e `swipeArrow()`). Você
não precisa reescrever, só não apague.

---

## 4. Layout do conteúdo

- Respiro padrão: `0 36px`.
- Slide cujo conteúdo chega embaixo: `0 36px 52px`, para **nunca** encostar na
  barra de progresso.
- Slide de capa e de CTA: `justify-content: center`.
- Slide com muito conteúdo: `justify-content: flex-end`, texto embaixo e ar em
  cima. Fica mais elegante e mais legível no feed.

### Tag de categoria

Label curta em maiúsculas acima do título, categorizando o slide.

- Slide claro: cor = `BRAND_PRIMARY`
- Slide escuro: cor = `BRAND_LIGHT`
- Slide com gradiente: cor = `rgba(255,255,255,0.6)`

### Lockup da marca (primeiro e último slide)

Círculo de 40px com `BRAND_PRIMARY` de fundo, com o ícone do logo centralizado
ou a inicial do nome em branco, e o nome da marca ao lado em 13px, peso 600,
`letter-spacing: 0.5px`.

### Marca d'água (opcional)

Só se a pessoa mandou o ícone do logo: use como fundo em opacidade 0.04 a 0.06
nos slides de capa, gradiente e CTA. Sem logo, pule, não invente forma.

---

## 5. Componentes reutilizáveis

Já existem como funções no template. Use sempre os mesmos, é a repetição que dá
identidade ao carrossel.

| Componente | Onde usar |
|---|---|
| **Pills riscadas** | slide de problema, o que está sendo substituído |
| **Pills de tag** | rótulos de recurso, opções, categorias |
| **Caixa de citação** | exemplo de input, depoimento, fala do cliente |
| **Lista de recursos** | ícone + rótulo + descrição, no slide de benefícios |
| **Passos numerados** | `01`, `02`, `03` no slide de como fazer |
| **Amostras de cor** | quadradinhos de 32px, slide de personalização |
| **Botão de CTA** | só no último slide, fundo `LIGHT_BG`, texto `BRAND_DARK` |

---

## 6. A sequência narrativa

Sete slides é o ideal. Pode variar de 5 a 10.

| # | Tipo | Fundo | Papel |
|---|---|---|---|
| 1 | Capa | `LIGHT_BG` | o gancho: afirmação forte, lockup da marca |
| 2 | Problema | `DARK_BG` | a dor: o que está quebrado ou ultrapassado |
| 3 | Solução | gradiente | a virada, com caixa de citação se couber |
| 4 | Benefícios | `LIGHT_BG` | o que a pessoa ganha, lista com ícones |
| 5 | Detalhes | `DARK_BG` | profundidade, diferenciais, especificações |
| 6 | Como fazer | `LIGHT_BG` | passos numerados |
| 7 | CTA | gradiente | logo, frase de fecho, botão. **Sem seta, barra em 100%** |

Regras que valem mesmo mudando a sequência:

- Slide 1 **para o scroll**. Promessa ou afirmação, nunca "hoje eu vou falar
  sobre". Se tiver print ou foto, use aqui, prova visual valida o gancho na hora.
- O último é sempre CTA sobre gradiente, sem seta, barra cheia.
- Claro e escuro alternam.
- **Adapte.** Nem todo tema tem "problema". Carrossel de bastidor, de lista, de
  depoimento pedem outra ordem. A tabela é o padrão, não a lei.

---

## 7. Moldura do Instagram (só no preview)

O HTML embrulha os slides numa moldura fake do Instagram para o cliente aprovar:
cabeçalho com avatar e @, viewport 4:5 com arrasto, dots, ícones de curtir e
comentar, e legenda com "HÁ 2 HORAS".

**A `.ig-frame` tem exatamente 420px de largura.** Toda a escala tipográfica e
todo o espaçamento foram desenhados para essa base, e a exportação multiplica
por 2,5714 para chegar em 1080. Mudar essa largura quebra as duas coisas ao
mesmo tempo. Não mude.
