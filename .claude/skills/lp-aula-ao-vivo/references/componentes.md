# Componentes técnicos da LP de aula ao vivo

Catálogo dos 12 componentes interativos da página, com o código que está no ar e
as armadilhas de cada um. Todos são **HTML + CSS + JS vanilla**: zero framework,
zero biblioteca, zero CDN além do Google Fonts.

O arquivo `assets/modelo-lp/` traz a página inteira montada. Use este documento
para entender **o porquê** de cada peça antes de mexer nela.

---

## Regra de ouro do arquivo

```
index.html   → estrutura + copy      (~39 KB)
styles.css   → tudo de visual        (~35 KB, tokens no :root)
app.js       → 3 comportamentos      (~1,5 KB)
```

**O JS inteiro da página cabe em 1,5 KB.** Se a sua adaptação precisou de mais
do que isso, você adicionou algo que a estrutura não pede. Os 3 comportamentos
são: contador, player de depoimento sob demanda, e reveal no scroll. Nada mais.

---

## 1. Contador regressivo

```html
<div class="clock">
  <div class="wrap in">
    <span class="lbl">A aula começa em</span>
    <div class="nums" id="clock">
      <span class="cbox"><b data-u="d">00</b><span>dias</span></span>
      <span class="cbox"><b data-u="h">00</b><span>horas</span></span>
      <span class="cbox"><b data-u="m">00</b><span>min</span></span>
      <span class="cbox"><b data-u="s">00</b><span>seg</span></span>
    </div>
  </div>
</div>
```

```js
var alvo = new Date('2026-09-08T19:30:00-03:00').getTime();
var campos = {};
document.querySelectorAll('#clock [data-u]').forEach(function(el){
  campos[el.dataset.u] = el;
});
function pad(n){ return String(n).padStart(2,'0') }
function tick(){
  var s = Math.max(0, Math.floor((alvo - Date.now())/1000));
  campos.d.textContent = Math.floor(s/86400);
  campos.h.textContent = pad(Math.floor(s%86400/3600));
  campos.m.textContent = pad(Math.floor(s%3600/60));
  campos.s.textContent = pad(s%60);
}
tick(); setInterval(tick, 1000);
```

**Armadilhas:**
- **Fuso obrigatório** (`-03:00`). Sem ele o navegador interpreta como UTC e o
  contador erra 3 horas.
- `Math.max(0, …)` evita contagem negativa depois da hora.
- `tick()` roda **antes** do `setInterval`, senão o primeiro segundo mostra `00`.
- Aplique `font-variant-numeric: tabular-nums` nos `<b>`, senão os dígitos
  dançam a cada segundo.
- Horário de verão brasileiro não existe hoje, mas se voltar, `-03:00` continua
  correto para setembro. Confira a data específica do evento.

---

## 2. Ticker (marquee CSS)

```html
<div class="ticker"><div class="track">
  <span>Terça 08/09 <i>·</i> 19h30 <i>·</i> Ao vivo <i>·</i> Sem gravação <i>·</i> R$ 27 <i>·</i></span>
  <span>Terça 08/09 <i>·</i> 19h30 <i>·</i> Ao vivo <i>·</i> Sem gravação <i>·</i> R$ 27 <i>·</i></span>
</div></div>
```

```css
.ticker{background:var(--bronze);color:#fff;overflow:hidden;padding:14px 0;white-space:nowrap}
.ticker .track{display:inline-flex;animation:tick 30s linear infinite}
.ticker span{font-weight:800;font-size:.86rem;letter-spacing:.22em;text-transform:uppercase;padding:0 24px}
@keyframes tick{ to{ transform:translateX(-50%) } }

/* segunda faixa: fundo escuro, sentido invertido, mais lenta */
.ticker--deep{background:var(--deep);border-block:1px solid rgb(201 169 114 / .25)}
.ticker--deep .track{animation-duration:38s;animation-direction:reverse}
```

**O conteúdo tem que estar duplicado em dois `<span>` idênticos** e a animação
tem que ir a exatamente `-50%`. É isso que faz o loop fechar sem salto. Se você
mudar o texto de um dos spans, aparece um pulo visível a cada volta.

Sem JS, sem biblioteca de marquee, sem `<marquee>`.

---

## 3. Reveal no scroll

```js
(function(){
  var alvos = document.querySelectorAll('.rv:not(.in)');
  if(!('IntersectionObserver' in window)){
    alvos.forEach(function(el){ el.classList.add('in') }); return;
  }
  var obs = new IntersectionObserver(function(entradas){
    entradas.forEach(function(e){
      if(e.isIntersecting){ e.target.classList.add('in'); obs.unobserve(e.target) }
    });
  }, { rootMargin:'0px 0px -12% 0px' });
  alvos.forEach(function(el){ obs.observe(el) });
})();
```

```css
.js .rv{opacity:0;transform:translateY(20px);transition:opacity .7s ease,transform .7s ease}
.js .rv.in{opacity:1;transform:none}
@media (prefers-reduced-motion:reduce){
  *{animation:none!important;transition:none!important}
  .js .rv{opacity:1;transform:none}
}
```

**Três detalhes que quebram na prática:**

1. 🔒 **`.js` no `<html>` antes do CSS carregar.** O gate `.js .rv{opacity:0}`
   existe para que quem tem JS desligado veja a página inteira. Mas se a classe
   for adicionada depois do CSS, o conteúdo **pisca**. Coloque no `<head>`,
   antes do `<link>`:
   ```html
   <script>document.documentElement.classList.add('js')</script>
   <link rel="stylesheet" href="styles.css">
   ```
2. **`unobserve` depois de revelar.** Sem isso o observer continua rodando a
   página inteira e o elemento re-anima ao voltar.
3. **O hero já nasce com `.in`** (`<div class="rv in">`). Nunca esconda a dobra
   atrás de uma animação de scroll.

---

## 4. Barras que enchem ao aparecer

Usado em três lugares: gráfico do dado (`.linha`), funil dos 5 degraus (`.frow
.fb`) e barra de escassez (`.bar .f`). O padrão é o mesmo: **largura em variável
CSS inline, transição disparada pela classe `.in` do reveal.**

```html
<div class="frow">
  <span class="fl">A mensagem chegou</span>
  <span class="fb"><i style="--w:100%"></i></span>
  <span class="fn">?</span>
</div>
```

```css
.fb{height:14px;background:rgb(70 36 68 / .07);border-radius:99px}
.fb i{display:block;height:100%;border-radius:99px;background:linear-gradient(90deg,#C9A972,#FF6A4D)}

/* estado inicial e transição só quando há JS */
.js .fb i{width:0;transition:width 1s cubic-bezier(.2,.7,.3,1)}
.js .in .fb i{width:var(--w)}

/* cascata: cada linha entra um pouco depois da anterior */
.js .in .frow:nth-child(2) .fb i{transition-delay:.12s}
.js .in .frow:nth-child(3) .fb i{transition-delay:.24s}
.js .in .frow:nth-child(4) .fb i{transition-delay:.36s}
.js .in .frow:nth-child(5) .fb i{transition-delay:.48s}
```

**Por que variável CSS e não largura no `style`:** o valor final fica no HTML
(fácil de editar por quem escreve a copy) enquanto o estado inicial e a transição
ficam no CSS. Trocar um número do gráfico não exige mexer em JS nem em CSS.

**No fallback sem JS as barras já aparecem cheias.** Nunca dependa da animação
para o dado existir.

---

## 5. Mock de conversa de WhatsApp

Renderizado em HTML, **nunca screenshot**.

```html
<div class="zap">
  <div class="top">
    <span class="av">P</span>
    <div><b>Paciente nova</b><span>visto por último há 9 dias</span></div>
  </div>
  <div class="body">
    <p class="msg in">Oi! Vi o seu Instagram 😍 Quanto fica a avaliação? <time>20:41</time></p>
    <p class="msg out">Oi! A avaliação é R$ 250 😊 <time>22:15</time></p>
    <p class="msg in">Ah, entendi… vou ver aqui e te falo! <time>22:19</time></p>
    <p class="silence">9 dias sem resposta</p>
  </div>
</div>
```

**Por que HTML e não print:**
- Print de conversa real levanta questão de LGPD, mesmo borrado.
- Print fica ilegível em 360px de largura; o mock reflui.
- O mock é adaptável para outro cliente em 5 minutos.
- Texto real é indexável, selecionável e acessível a leitor de tela.

**Os horários carregam o argumento** (ver `estrutura-invisivel-lp.md`, peça 5).
Escolha-os com intenção: a demora do lado do cliente e a rapidez do lado do
prospect.

Os dois emoji dentro dos balões (😍 😊) são exceção à regra de emoji da casa:
ali eles são **conteúdo da mensagem citada**, não decoração da página.

---

## 6. Depoimento em vídeo com carregamento sob clique

O thumb é uma imagem; o iframe só existe depois do clique.

```html
<article class="dep" data-guid="8b378501-56a2-43f5-a250-f9b5807e0ba9">
  <button class="depplay">
    <img src="…/thumbnail.jpg" alt="Depoimento de …" loading="lazy">
    <span class="deptag">Depoimento real</span>
    <span class="deptri"></span>
  </button>
  <div class="depfoot">
    <b>Dra. Dirléia Casagrande</b>
    <span>Harmonização facial · Joinville, SC</span>
    <p class="depnum"><i>R$ 20 mil → R$ 53 mil</i> <small>/mês</small></p>
    <p class="depobs">em 4 meses, e já abriu a segunda unidade</p>
  </div>
</article>
```

```js
document.querySelectorAll('.dep .depplay').forEach(function(botao){
  botao.addEventListener('click', function(){
    var guid = botao.parentNode.getAttribute('data-guid');
    var f = document.createElement('iframe');
    f.src = 'https://iframe.mediadelivery.net/embed/__LIBRARY_ID__/' + guid
          + '?autoplay=true&preload=true&responsive=true';
    f.setAttribute('allow','accelerometer;gyroscope;autoplay;encrypted-media;picture-in-picture;');
    f.setAttribute('allowfullscreen','');
    botao.parentNode.replaceChild(f, botao);
    if (window.fbq) fbq('trackCustom','VideoDepoimento',{ guid: guid });
  });
});
```

**Por que assim:**
- **Três iframes de vídeo no carregamento matam o LCP no 4G.** Com thumb, a
  seção custa 3 imagens.
- O `<button>` é elemento nativo: foco por teclado e leitor de tela funcionam de
  graça.
- `replaceChild` troca o botão pelo iframe: sem estado, sem duplicata, sem
  possibilidade de dois vídeos tocando.
- O `trackCustom` mede **quem assistiu depoimento**, que é o público mais quente
  para remarketing. Mantenha esse evento.

**Player:** a referência usa Bunny Stream (`iframe.mediadelivery.net/embed/
<library>/<guid>`). YouTube funciona igual com
`youtube-nocookie.com/embed/<id>?autoplay=1`. Não use player que exija script
externo.

**Proporção 9/13** no thumb e no iframe: é vídeo vertical gravado no celular
pelo próprio cliente satisfeito. Vídeo horizontal produzido parece propaganda e
converte menos aqui.

---

## 7. Carrossel do mural (scroll-snap nativo)

Zero JS.

```css
.muralrail{
  display:flex; gap:20px; overflow-x:auto; overflow-y:hidden;
  scroll-snap-type:x mandatory; -webkit-overflow-scrolling:touch;
  padding:6px 0 22px;
  /* alinha o primeiro card com a coluna de texto, mas deixa sangrar até a borda */
  padding-inline: max(24px, calc((100vw - 1100px) / 2));
}
.muralrail::-webkit-scrollbar{height:8px}
.muralrail::-webkit-scrollbar-thumb{background:rgb(142 105 69 / .4);border-radius:99px}
.mcard{flex:0 0 auto; width:min(272px,72vw); scroll-snap-align:center}
```

**O `padding-inline` com `max()`** é o truque: o carrossel ocupa a viewport
inteira (sangra nas bordas, sinalizando que há mais conteúdo) mas o primeiro
card alinha com o texto do container de 1100px. Sem isso, ou o carrossel fica
preso na coluna (parece grade) ou desalinha do título.

Termine com um `.muralhint` textual ("arraste para o lado →"). Barra de rolagem
customizada some no iOS; a dica não.

---

## 8. FAQ com `<details>` nativo

```css
details{background:#fff;border:1px solid var(--line);border-radius:14px;padding:4px 22px}
details[open]{border-color:var(--bronze)}
summary{cursor:pointer;list-style:none;padding:17px 0;font-weight:700;
        display:flex;justify-content:space-between;gap:16px;color:var(--ameixa)}
summary::-webkit-details-marker{display:none}
summary::after{content:"+";color:var(--bronze);font-weight:800;font-size:1.35rem}
details[open] summary::after{content:"×"}
```

Acordeão sem uma linha de JS, com acessibilidade e busca do navegador (Ctrl+F
encontra texto dentro de `<details>` fechado nos navegadores atuais). As **duas**
regras de remoção do marcador (`list-style:none` e `::-webkit-details-marker`)
são necessárias: cobrem Firefox e Safari.

---

## 9. Barra fixa (sticky)

```css
.sticky{
  position:fixed; left:0; right:0; bottom:0; z-index:60;
  background:rgb(46 19 41 / .94); backdrop-filter:blur(10px);
  border-top:1px solid rgb(201 169 114 / .35);
  padding:12px 20px; display:flex; align-items:center; justify-content:center; gap:20px;
}
@media (max-width:640px){
  .sticky .sp{ display:none }   /* some o texto */
  .sticky .btn{ width:100% }    /* botão ocupa a barra inteira */
}
```

**Não esqueça o respiro no rodapé**, senão a barra cobre os links de política e
termos:

```css
.ftr{ padding-bottom: 96px }
```

---

## 10. Propagação de UTM para o checkout

```js
(function(){
  var qs = window.location.search;
  if(!qs || qs.length < 2) return;
  var incoming = qs.substring(1);
  function apply(){
    document.querySelectorAll('a[href*="__DOMINIO_CHECKOUT__"]').forEach(function(a){
      var href = a.getAttribute('href');
      if(!href || href.indexOf(incoming) !== -1) return;
      a.setAttribute('href', href + (href.indexOf('?') === -1 ? '?' : '&') + incoming);
    });
  }
  if(document.readyState !== 'loading') apply();
  else document.addEventListener('DOMContentLoaded', apply);
})();
```

O seletor tem que apontar para o **domínio do checkout do cliente**
(`pay.hotmart.com`, `pay.kiwify.com.br`, `yayforms.link`, o que for). Trocar de
gateway sem trocar o seletor derruba a atribuição em silêncio.

**Teste obrigatório antes de entregar:** abra `?utm_source=teste&utm_medium=x`,
clique no botão, confira que a query chegou na URL do checkout.

---

## 11. Botão com animação dupla

```css
.btn{
  background:var(--grad); background-size:220% 100%;
  animation: anda 5s ease-in-out infinite, halo 2.8s ease-in-out infinite;
  transition: transform .18s ease; border-radius:999px;
}
.btn:hover{ transform: translateY(-2px) }
.btn:focus-visible{ outline:3px solid var(--bronze-pale); outline-offset:4px }

@keyframes anda{ 0%,100%{background-position:0% 50%} 50%{background-position:100% 50%} }
@keyframes halo{
  0%,100%{ box-shadow:0 14px 34px -12px rgb(142 105 69 / .8), 0 0 0 0 rgb(201 169 114 / .5) }
  50%    { box-shadow:0 18px 44px -12px rgb(201 169 114 / .95), 0 0 0 16px #fff0 }
}
```

Duas animações contínuas: o gradiente desliza e um halo pulsa. O botão **se
move sozinho na periferia da visão** sem piscar nem gritar. `focus-visible`
explícito porque o `outline` padrão some sobre o gradiente.

Sob `prefers-reduced-motion` as duas param e fica só a sombra estática.

---

## 12. Ilustrações SVG inline animadas

A página não usa nenhum ícone de banco: as ilustrações (a cena do reframe, os 4
ícones dos ganhos, os ícones dos slots e do kit) são **SVG inline** com classes
de animação CSS (`.an-flutua`, `.an-bolha`, `.an-acende`, `.an-cresce`,
`.an-anel`, `.an-risca`, `.an-cai`, `.an-abre`).

```css
.an-acende  { animation: acende 2.4s ease-in-out infinite }
.an-acende-2{ animation-delay:.3s }
.an-acende-3{ animation-delay:.6s }
```

**Por que inline:** herdam `currentColor` e as variáveis do `:root`, então o
reskin de cliente muda as ilustrações junto com a paleta. Nenhuma requisição
extra, nenhum sprite, nenhum ícone genérico de Font Awesome.

Ao adaptar: mantenha as classes de animação e troque só os `path`. Se for
substituir por ícones prontos, prefira um conjunto de traço fino e **pinte com
`currentColor`**.

---

## Performance e acessibilidade

**O que a página faz certo e você deve preservar:**

| Item | Como |
|---|---|
| Zero JS bloqueante | `app.js` no fim do body, 1,5 KB |
| Vídeos sob demanda | thumb + `replaceChild` no clique |
| Imagens | WebP, `loading="lazy"` em tudo abaixo da dobra |
| Fontes | um único `@import` do Google Fonts, 2 famílias, pesos limitados |
| Sem CDN de terceiro | nenhuma biblioteca externa |
| Movimento | `prefers-reduced-motion` desliga **tudo** |
| Foco | `:focus-visible` explícito nos botões |
| Semântica | `<section> <article> <details> <button> <figure> <time>` reais |
| Números | `font-variant-numeric: tabular-nums` em contador, preços e percentuais |
| Só 2 breakpoints | 900px e 640px |

**O que checar antes de publicar:**

```
[ ] Testado em 360px de largura (a maioria do tráfego)
[ ] Contador com o fuso certo e a data certa
[ ] Os 4 CTAs + sticky apontam para o MESMO checkout, e é o do cliente
[ ] UTM chega no checkout (teste com ?utm_source=teste)
[ ] Nenhuma imagem apontando para domínio de outro cliente
[ ] prefers-reduced-motion desliga as animações (DevTools → Rendering)
[ ] Sem JS: a página inteira aparece, sem elemento invisível
[ ] Rodapé com padding-bottom suficiente para a sticky
[ ] Pixel/GA instalados e o evento de clique no CTA disparando
```
