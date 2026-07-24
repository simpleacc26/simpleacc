# Arquitetura dos slides

Como montar o HTML: formato, elementos obrigatórios em todo slide, padrões de
conteúdo, a sequência-padrão, os componentes reutilizáveis e o frame de
Instagram do preview.

> Os blocos de código abaixo são a **fonte de verdade técnica** — copie-os como
> estão. `B` = `BRAND_PRIMARY`; tokens entre `{ }` são placeholders da paleta
> (ver `sistema-visual.md`).

---

## Formato

- Proporção: **4:5** (padrão de carrossel do Instagram).
- Cada slide é **autocontido** — todos os elementos de UI são assados na imagem.
- **Alterne** fundos `LIGHT_BG` e `DARK_BG` para dar ritmo visual.

---

## Elementos obrigatórios em TODO slide

### 1. Barra de progresso (base de todo slide)

Mostra ao usuário onde ele está no carrossel. Enche conforme ele passa os slides.

- Posição: absoluta na base, largura total, 28px de padding horizontal, 20px na base.
- Trilho: 3px de altura, cantos arredondados.
- Largura do preenchimento: `((slideIndex + 1) / totalSlides) * 100%`.
- Adapta ao fundo do slide:
  - Slides claros: trilho `rgba(0,0,0,0.08)`, preenchimento `BRAND_PRIMARY`, contador `rgba(0,0,0,0.3)`.
  - Slides escuros: trilho `rgba(255,255,255,0.12)`, preenchimento `#fff`, contador `rgba(255,255,255,0.4)`.
- Label do contador ao lado da barra: formato "1/7", 11px, peso 500.

```javascript
function progressBar(index, total, isLightSlide) {
  const pct = ((index + 1) / total) * 100;
  const trackColor = isLightSlide ? 'rgba(0,0,0,0.08)' : 'rgba(255,255,255,0.12)';
  const fillColor = isLightSlide ? B : '#fff';
  const labelColor = isLightSlide ? 'rgba(0,0,0,0.3)' : 'rgba(255,255,255,0.4)';

  return `<div style="position:absolute;bottom:0;left:0;right:0;padding:16px 28px 20px;z-index:10;display:flex;align-items:center;gap:10px;">
    <div style="flex:1;height:3px;background:${trackColor};border-radius:2px;overflow:hidden;">
      <div style="height:100%;width:${pct}%;background:${fillColor};border-radius:2px;"></div>
    </div>
    <span style="font-size:11px;color:${labelColor};font-weight:500;">${index + 1}/${total}</span>
  </div>`;
}
```

### 2. Seta de swipe (borda direita — todo slide EXCETO o último)

Uma chevron sutil na borda direita dizendo pro usuário continuar passando. **No
último slide ela é removida** para o usuário saber que chegou ao fim.

- Posição: absoluta à direita, altura total, 48px de largura.
- Fundo: gradiente de transparente → tint sutil.
- Chevron: SVG 24×24, traços arredondados.
- Adapta ao fundo do slide:
  - Slides claros: fundo `rgba(0,0,0,0.06)`, traço `rgba(0,0,0,0.25)`.
  - Slides escuros: fundo `rgba(255,255,255,0.08)`, traço `rgba(255,255,255,0.35)`.

```javascript
function swipeArrow(isLightSlide) {
  const bg = isLightSlide ? 'rgba(0,0,0,0.06)' : 'rgba(255,255,255,0.08)';
  const stroke = isLightSlide ? 'rgba(0,0,0,0.25)' : 'rgba(255,255,255,0.35)';

  return `<div style="position:absolute;right:0;top:0;bottom:0;width:48px;z-index:9;display:flex;align-items:center;justify-content:center;background:linear-gradient(to right,transparent,${bg});">
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M9 6l6 6-6 6" stroke="${stroke}" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  </div>`;
}
```

---

## Padrões de conteúdo dos slides

### Regras de layout
- Padding de conteúdo: `0 36px` (padrão).
- Slides alinhados na base com barra de progresso: `0 36px 52px` para não encostar na barra.
- **Slides de hero/CTA:** `justify-content: center`.
- **Slides com muito conteúdo:** `justify-content: flex-end` (texto na base, respiro visual em cima).

### Tag / label de categoria
Label pequeno em caixa alta acima do título de cada slide, para categorizar o conteúdo.

```html
<span class="sans" style="display:inline-block;font-size:10px;font-weight:600;letter-spacing:2px;color:{color};margin-bottom:16px;">{TAG TEXT}</span>
```

- Slides claros: `color = BRAND_PRIMARY`.
- Slides escuros: `color = BRAND_LIGHT`.
- Slides de gradiente de marca: `color = rgba(255,255,255,0.6)`.

### Logo lockup (primeiro e último slide)
Ícone da marca + nome da marca juntos.
- Com ícone de logo: círculo de 40px (fundo `BRAND_PRIMARY`) com o ícone centralizado, nome ao lado.
- Com iniciais: círculo de 40px com a primeira letra do nome em branco.
- Nome da marca: 13px, peso 600, letter-spacing 0.5px.

### Watermark (opcional)
Se o usuário forneceu um ícone de logo, use-o como marca d'água de fundo sutil em
slides-chave (hero, CTA, gradiente de marca) com opacidade 0.04–0.06. Pule se não
houver logo.

---

## Sequência-padrão de slides

Siga este arco narrativo. O número de slides pode variar (5–10), mas **7 é o ideal**.

| # | Tipo       | Fundo             | Propósito |
|---|------------|-------------------|-----------|
| 1 | Hero       | LIGHT_BG          | Gancho — afirmação forte, logo lockup, watermark opcional |
| 2 | Problema   | DARK_BG           | Dor — o que está quebrado, frustrante ou ultrapassado |
| 3 | Solução    | Gradiente de marca| A resposta — o que resolve, com quote/prompt box opcional |
| 4 | Features    | LIGHT_BG          | O que você ganha — lista de features com ícones |
| 5 | Detalhes   | DARK_BG           | Profundidade — customização, specs, diferenciais |
| 6 | Passo a passo | LIGHT_BG       | Passos — workflow numerado ou processo |
| 7 | CTA        | Gradiente de marca| Chamada para ação — logo, tagline, botão. **Sem seta. Barra cheia.** |

**Regras:**
- Comece com um gancho — o primeiro slide tem que parar o scroll. Lidere com uma
  proposta de valor ou afirmação forte, não com uma descrição. Use prova visual
  (prints, imagens) para validar o gancho na hora.
- Termine com um CTA no gradiente de marca — **sem seta de swipe, barra de
  progresso em 100%**.
- **Alterne** fundos claros e escuros para dar ritmo.
- **Adapte** a sequência ao tema — nem todo carrossel precisa de um slide de "problema".
- Slides podem ser reordenados, adicionados ou removidos conforme o conteúdo pedir.

---

## Componentes reutilizáveis

### Pills com texto riscado (strikethrough)
Para mensagem de "o que está sendo substituído" nos slides de problema.

```html
<span style="font-size:11px;padding:5px 12px;border:1px solid rgba(255,255,255,0.1);border-radius:20px;color:#6B6560;text-decoration:line-through;">{Old tool}</span>
```

### Pills de tag
Para labels de features, opções ou categorias.

```html
<span style="font-size:11px;padding:5px 12px;background:rgba(255,255,255,0.06);border-radius:20px;color:{BRAND_LIGHT};">{Label}</span>
```

### Prompt / quote box
Para mostrar exemplos de input, citações ou depoimentos.

```html
<div style="padding:16px;background:rgba(0,0,0,0.15);border-radius:12px;border:1px solid rgba(255,255,255,0.08);">
  <p class="sans" style="font-size:13px;color:rgba(255,255,255,0.5);margin-bottom:6px;">{Label}</p>
  <p class="serif" style="font-size:15px;color:#fff;font-style:italic;line-height:1.4;">"{Quote text}"</p>
</div>
```

### Feature list
Linhas de ícone + label + descrição para slides de features/benefícios.

```html
<div style="display:flex;align-items:flex-start;gap:14px;padding:10px 0;border-bottom:1px solid {LIGHT_BORDER};">
  <span style="color:{BRAND_PRIMARY};font-size:15px;width:18px;text-align:center;">{icon}</span>
  <div>
    <span class="sans" style="font-size:14px;font-weight:600;color:{DARK_BG};">{Label}</span>
    <span class="sans" style="font-size:12px;color:#8A8580;">{Description}</span>
  </div>
</div>
```

### Passos numerados
Para slides de workflow ou passo a passo.

```html
<div style="display:flex;align-items:flex-start;gap:16px;padding:14px 0;border-bottom:1px solid {LIGHT_BORDER};">
  <span class="serif" style="font-size:26px;font-weight:300;color:{BRAND_PRIMARY};min-width:34px;line-height:1;">01</span>
  <div>
    <span class="sans" style="font-size:14px;font-weight:600;color:{DARK_BG};">{Step title}</span>
    <span class="sans" style="font-size:12px;color:#8A8580;">{Step description}</span>
  </div>
</div>
```

### Swatches de cor
Para slides de customização ou branding.

```html
<div style="width:32px;height:32px;border-radius:8px;background:{color};border:1px solid rgba(255,255,255,0.08);"></div>
```

### Botão de CTA (só no último slide)

```html
<div style="display:inline-flex;align-items:center;gap:8px;padding:12px 28px;background:{LIGHT_BG};color:{BRAND_DARK};font-family:'{BODY_FONT}',sans-serif;font-weight:600;font-size:14px;border-radius:28px;">
  {CTA text}
</div>
```

---

## Frame de Instagram (wrapper do preview)

Ao exibir o carrossel no chat, embrulhe num frame estilo Instagram para a pessoa
pré-visualizar a experiência:

- **Header:** avatar (círculo `BRAND_PRIMARY` + logo) + @ + subtítulo.
- **Viewport:** proporção 4:5, track swipeável/arrastável com todos os slides.
- **Dots:** indicadores de bolinha abaixo do viewport.
- **Ações:** ícones SVG de coração, comentário, compartilhar, salvar.
- **Legenda:** @ + descrição curta do carrossel + timestamp "2 HOURS AGO".

Inclua interação de swipe/drag por ponteiro no preview, mas os slides em si são
**imagens autocontidas, prontas para export**.

> **Importante:** o `.ig-frame` precisa ter **exatamente 420px de largura**. O
> viewport do carrossel dentro dele tem proporção 4:5 (420×525px). Todos os
> layouts, tamanhos de fonte e espaçamentos foram desenhados para essa base de
> 420px. **NÃO mude essa largura — o processo de export depende dela.**
