# Arquitetura do slide, sequência e componentes

## Formato

- Proporção **4:5** (padrão de carrossel do Instagram).
- Base de layout: **420px de largura por 525px de altura**. Todos os tamanhos
  desta skill foram calibrados nessa base. O export sobe para 1080x1350 sem
  refluir nada.
- Cada slide é **autocontido**: barra de progresso e seta fazem parte da
  imagem, não são UI por cima. O que você vê no preview é exatamente o que sai
  no PNG.
- Fundos alternam claro e escuro para dar ritmo.

## Os dois elementos obrigatórios

### Barra de progresso (em TODO slide)

Encostada embaixo, largura total, `padding:16px 28px 20px`, `z-index:10`.
Trilho de 3px, preenchimento `((i+1)/total)*100%`, contador "1/7" ao lado
(11px, peso 500).

| | Trilho | Preenchimento | Contador |
|---|---|---|---|
| Slide claro | `rgba(0,0,0,0.08)` | `--brand-primary` | `rgba(0,0,0,0.3)` |
| Slide escuro ou gradiente | `rgba(255,255,255,0.12)` | `#fff` | `rgba(255,255,255,0.4)` |

### Seta de swipe (em todo slide MENOS o último)

Faixa de 48px colada na direita, altura total, `z-index:9`, com um degradê de
transparente para um tom sutil. Chevron 24x24 com traço arredondado.

| | Fundo | Traço |
|---|---|---|
| Slide claro | `rgba(0,0,0,0.06)` | `rgba(0,0,0,0.25)` |
| Slide escuro ou gradiente | `rgba(255,255,255,0.08)` | `rgba(255,255,255,0.35)` |

**No último slide a seta some.** É assim que o leitor sabe que acabou.

### Implementação

As duas coisas são injetadas por JS em cada `.slide`, lendo o
`data-tone="light|dark|gradient"` (o `modelo-carrossel.html` já faz isso):

```javascript
function progressBar(index, total, isLight){
  const pct    = ((index + 1) / total) * 100;
  const trackC = isLight ? 'rgba(0,0,0,0.08)'  : 'rgba(255,255,255,0.12)';
  const fillC  = isLight ? 'var(--brand-primary)' : '#fff';
  const labelC = isLight ? 'rgba(0,0,0,0.3)'   : 'rgba(255,255,255,0.4)';
  return `<div class="pbar">
      <div class="track" style="background:${trackC};">
        <div class="fill" style="width:${pct}%;background:${fillC};"></div>
      </div>
      <span class="count" style="color:${labelC};">${index + 1}/${total}</span>
    </div>`;
}

function swipeArrow(isLight){
  const bg     = isLight ? 'rgba(0,0,0,0.06)'  : 'rgba(255,255,255,0.08)';
  const stroke = isLight ? 'rgba(0,0,0,0.25)'  : 'rgba(255,255,255,0.35)';
  return `<div class="swipe" style="background:linear-gradient(to right,transparent,${bg});">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M9 6l6 6-6 6" stroke="${stroke}" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </div>`;
}

slides.forEach((slide, i) => {
  const isLight = slide.dataset.tone === 'light';
  slide.insertAdjacentHTML('beforeend', progressBar(i, TOTAL, isLight));
  if (i !== TOTAL - 1) slide.insertAdjacentHTML('beforeend', swipeArrow(isLight));
});
```

Gradiente conta como slide escuro para efeito de contraste.

## Regras de layout

- Respiro padrão do conteúdo: `0 36px`.
- Quem encosta embaixo leva `padding-bottom:52px` para não brigar com a barra.
- **Slides de hero e de CTA**: `justify-content:center`.
- **Slides de conteúdo**: `justify-content:flex-end` (texto embaixo, ar em cima).
- Título longo esbarrando na seta? Encurte a headline. Não empurre o padding.

## Sequência padrão (7 slides é o ponto ideal; 5 a 10 funciona)

| # | Tipo | Fundo | Papel |
|---|------|-------|-------|
| 1 | Hero | claro | O gancho: afirmação forte, lockup da marca, marca d'água |
| 2 | Problema | escuro | A dor: o que está quebrado, caro ou ultrapassado |
| 3 | Solução | gradiente | A virada: o que resolve, com caixa de citação ou exemplo |
| 4 | Entregáveis | claro | O que a pessoa leva: lista com ícones |
| 5 | Detalhe | escuro | Profundidade: personalização, specs, diferencial |
| 6 | Passo a passo | claro | O processo numerado |
| 7 | CTA | gradiente | Ação: lockup, promessa curta, botão. **Sem seta, barra em 100%.** |

- O slide 1 tem uma função só: **parar o scroll**. Promessa ou afirmação
  ousada, nunca descrição. Print real ou foto valida o gancho na hora.
- O slide 7 sempre fecha em gradiente, sem seta, barra cheia.
- Alterne claro e escuro. Dois claros seguidos achatam o carrossel.
- **Adapte a sequência ao tema.** Nem todo carrossel tem "problema"; carrossel
  de bastidor ou de lista pode ser hero + 5 itens + CTA. A tabela é o esqueleto
  padrão, não uma obrigação.

## Componentes

Todos já existem como classe no `modelo-carrossel.html`. Os valores abaixo são
os mesmos, escritos em linha, se você precisar montar um slide fora do modelo.

**Tag / rótulo de categoria** (acima do título, em todo slide de conteúdo)
```html
<span class="sans" style="display:inline-block;font-size:10px;font-weight:600;letter-spacing:2px;color:{cor};margin-bottom:16px;">TEXTO DA TAG</span>
```
Claro: `--brand-primary`. Escuro: `--brand-light`. Gradiente: `rgba(255,255,255,0.6)`.

**Lockup da marca** (slides 1 e 7): círculo de 40px com `--brand-primary` de
fundo e o ícone (ou a inicial) em branco, nome da marca ao lado com 13px, peso
600, letter-spacing 0.5px.

**Marca d'água** (opcional, só com logo): o ícone grande no canto, opacidade
0.04 a 0.06, nos slides de hero, CTA e gradiente. Sem logo, não invente.

**Pills riscadas** (o que fica pra trás, slides de problema)
```html
<span style="font-size:11px;padding:5px 12px;border:1px solid rgba(255,255,255,0.1);border-radius:20px;color:#6B6560;text-decoration:line-through;">Ferramenta antiga</span>
```

**Pills normais** (opções, categorias)
```html
<span style="font-size:11px;padding:5px 12px;background:rgba(255,255,255,0.06);border-radius:20px;color:{--brand-light};">Rótulo</span>
```

**Caixa de citação / exemplo**
```html
<div style="padding:16px;background:rgba(0,0,0,0.15);border-radius:12px;border:1px solid rgba(255,255,255,0.08);">
  <p class="sans" style="font-size:13px;color:rgba(255,255,255,0.5);margin-bottom:6px;">Rótulo</p>
  <p class="serif" style="font-size:15px;color:#fff;font-style:italic;line-height:1.4;">"Texto da citação"</p>
</div>
```

**Lista de entregáveis** (ícone + título + descrição, divisória `--light-border`;
ícone `--brand-primary`, 15px, largura 18px; título 14px/600; descrição 12px).

**Passos numerados** (número na fonte de título, 26px, peso 300,
`--brand-primary`, largura mínima 34px; título 14px/600; descrição 12px).

**Amostras de cor**: quadrados de 32px, `border-radius:8px`, borda
`rgba(255,255,255,0.08)`.

**Botão de CTA** (só no último slide): fundo `--light-bg`, texto
`--brand-dark`, 14px peso 600, `padding:12px 28px`, `border-radius:28px`.

## Moldura do Instagram (só preview)

Serve para a pessoa sentir a experiência antes de aprovar. **Largura exata de
420px** (`.ig-frame`): o export depende disso.

- **Cabeçalho**: avatar (círculo `--brand-primary` com a inicial ou o logo) + @ + subtítulo.
- **Viewport**: `.carousel-viewport` 4:5 com `.carousel-track` arrastável.
- **Dots**: bolinhas embaixo, a ativa em `--brand-primary`.
- **Ações**: coração, comentário, enviar, salvar (SVG).
- **Legenda**: @ + descrição curta do post + "há 2 horas".

Arraste com pointer events e navegação por seta do teclado. Os slides em si não
dependem de nada disso: no export a moldura inteira é escondida.
