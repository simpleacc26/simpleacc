#!/usr/bin/env python3
"""Gera o carrossel ÚNICOS (Diagnóstico de Maturidade do Negócio, recorte indústria).

HTML autocontido: fontes do Google, fotos embutidas em base64, preview em frame
do Instagram. Cada slide é 4:5 e sai pronto para exportar em 1080x1350.
"""
import base64
from pathlib import Path

BASE = Path(__file__).resolve().parent
FOTOS = BASE / "assets"
OUT = BASE / "carrossel.html"

# ---------------------------------------------------------------- paleta (house style do funil V3)
NAVY = "#16314f"
NAVY_DEEP = "#0f2338"
NAVY_700 = "#1e3d61"
GOLD = "#a9802f"
GOLD_LIGHT = "#d4a84b"
ORANGE = "#d4601a"
LIGHT_BG = "#faf8f4"
LIGHT_BORDER = "#e6e1d6"
CREAM = "#f3eee2"
MUTED = "#5c6672"

GRADIENT = f"linear-gradient(165deg, {NAVY_DEEP} 0%, {NAVY} 52%, {NAVY_700} 100%)"

TOTAL = 5
HANDLE = "carolbatista"


def b64(nome: str) -> str:
    dados = base64.b64encode((FOTOS / nome).read_bytes()).decode("ascii")
    return f"data:image/jpeg;base64,{dados}"


FOTO_SLIDE4 = b64("build_slide4.jpg")
AVATAR = b64("build_avatar.jpg")

STAR = (
    '<svg viewBox="0 0 20 20" fill="none" aria-hidden="true" style="width:{w}px;height:{w}px;'
    'flex-shrink:0;margin-top:{mt}px;">'
    '<path d="M10 0.5 C10 0.5 11.5 7.5 19.5 10 C11.5 12.5 10 19.5 10 19.5 '
    'C10 19.5 8.5 12.5 0.5 10 C8.5 7.5 10 0.5 10 0.5Z" fill="{cor}"/></svg>'
)


def logo(escuro: bool, tamanho: str = "md") -> str:
    """Lockup ÚNICOS: wordmark + estrela + assinatura 'Saia do Padrão'."""
    palavra = CREAM if escuro else NAVY
    slogan = GOLD_LIGHT if escuro else GOLD
    estrela = GOLD_LIGHT if escuro else ORANGE
    fs, star_w, sub_fs = (25, 11, 10.5) if tamanho == "md" else (20, 9, 9)
    return (
        '<div style="display:inline-flex;flex-direction:column;align-items:center;">'
        '<div style="display:flex;align-items:flex-start;gap:3px;">'
        f'<span class="serif" style="font-weight:700;font-size:{fs}px;color:{palavra};'
        f'letter-spacing:.05em;line-height:1;">ÚNICOS</span>'
        + STAR.format(w=star_w, mt=1, cor=estrela)
        + "</div>"
        f'<span class="serif" style="font-style:italic;font-weight:400;font-size:{sub_fs}px;'
        f'color:{slogan};letter-spacing:.16em;margin-top:4px;">Saia do Padrão</span>'
        "</div>"
    )


def progress_bar(index: int, claro: bool) -> str:
    pct = ((index + 1) / TOTAL) * 100
    trilho = "rgba(0,0,0,0.08)" if claro else "rgba(255,255,255,0.12)"
    preenche = GOLD if claro else "#fff"
    label = "rgba(0,0,0,0.3)" if claro else "rgba(255,255,255,0.4)"
    return (
        '<div style="position:absolute;bottom:0;left:0;right:0;padding:16px 28px 20px;'
        'z-index:10;display:flex;align-items:center;gap:10px;">'
        f'<div style="flex:1;height:3px;background:{trilho};border-radius:2px;overflow:hidden;">'
        f'<div style="height:100%;width:{pct}%;background:{preenche};border-radius:2px;"></div>'
        "</div>"
        f'<span class="sans" style="font-size:11px;color:{label};font-weight:500;">'
        f"{index + 1}/{TOTAL}</span></div>"
    )


def swipe_arrow(claro: bool) -> str:
    bg = "rgba(0,0,0,0.06)" if claro else "rgba(255,255,255,0.08)"
    traco = "rgba(0,0,0,0.25)" if claro else "rgba(255,255,255,0.35)"
    return (
        '<div style="position:absolute;right:0;top:0;bottom:0;width:48px;z-index:9;'
        "display:flex;align-items:center;justify-content:center;background:linear-gradient("
        f'to right,transparent,{bg});">'
        '<svg width="24" height="24" viewBox="0 0 24 24" fill="none">'
        f'<path d="M9 6l6 6-6 6" stroke="{traco}" stroke-width="2.5" stroke-linecap="round" '
        'stroke-linejoin="round"/></svg></div>'
    )


def tag(texto: str, cor: str, mb: int = 16) -> str:
    return (
        f'<span class="sans" style="display:inline-block;font-size:10px;font-weight:600;'
        f'letter-spacing:2px;color:{cor};margin-bottom:{mb}px;">{texto}</span>'
    )


def slide(index: int, fundo: str, conteudo: str, claro: bool, centro: bool = False) -> str:
    justify = "center" if centro else "flex-end"
    ultimo = index == TOTAL - 1
    return (
        f'<div class="slide" style="background:{fundo};justify-content:{justify};">'
        f"{conteudo}"
        f"{'' if ultimo else swipe_arrow(claro)}"
        f"{progress_bar(index, claro)}"
        "</div>"
    )


# ---------------------------------------------------------------- slides
# 1 — Hero. Reconhecimento: o leitor precisa se ver no espelho antes de qualquer argumento.
s1 = slide(
    0,
    LIGHT_BG,
    '<div style="position:absolute;top:-40px;right:-70px;opacity:.05;z-index:0;">'
    + STAR.format(w=300, mt=0, cor=GOLD)
    + "</div>"
    '<div style="position:absolute;top:32px;left:36px;z-index:2;">' + logo(False) + "</div>"
    '<div style="position:relative;z-index:2;padding:0 36px 52px;">'
    + tag("INDÚSTRIA · ACIMA DE R$5 MILHÕES", GOLD)
    + f'<p class="serif" style="font-size:20px;font-weight:600;color:{GOLD};line-height:1.25;'
    'margin-bottom:14px;letter-spacing:-.2px;">Sua indústria já passa dos R$5 milhões.</p>'
    + f'<p class="serif" style="font-size:30px;font-weight:700;color:{NAVY};line-height:1.16;'
    'letter-spacing:-.4px;">Mas quando você não está em cima, as coisas não andam do jeito '
    "que deveriam.</p>"
    "</div>",
    claro=True,
)

# 2 — Diagnóstico. Nomeia a causa sem culpar o time nem o dono.
s2 = slide(
    1,
    NAVY,
    '<div style="position:relative;z-index:2;padding:0 36px 52px;">'
    + tag("O QUE ACONTECE NA PRÁTICA", GOLD_LIGHT)
    + '<p class="serif" style="font-size:29px;font-weight:700;color:#fff;line-height:1.18;'
    'letter-spacing:-.4px;margin-bottom:18px;">Não é que o time não saiba o que fazer. '
    f'<span style="color:{GOLD_LIGHT};">Ele sabe.</span></p>'
    + f'<div style="width:38px;height:2px;background:{GOLD};margin-bottom:18px;"></div>'
    + '<p class="sans" style="font-size:16px;font-weight:400;color:rgba(255,255,255,0.78);'
    'line-height:1.5;">As pessoas só aprenderam que nada anda sem o seu aval.</p>'
    "</div>",
    claro=False,
)

# 3 — A verdade que ninguém conta. Frase-âncora, sozinha, sem concorrência visual.
s3 = slide(
    2,
    GRADIENT,
    '<div style="position:absolute;bottom:-60px;left:-60px;opacity:.06;z-index:0;">'
    + STAR.format(w=260, mt=0, cor="#fff")
    + "</div>"
    '<div style="position:relative;z-index:2;padding:0 50px 52px;text-align:center;">'
    + tag("O DIAGNÓSTICO", "rgba(255,255,255,0.6)", mb=22)
    + f'<div style="width:44px;height:2px;background:{GOLD_LIGHT};margin:0 auto 24px;"></div>'
    + '<p class="serif" style="font-size:30px;font-weight:600;font-style:italic;color:#fff;'
    'line-height:1.28;letter-spacing:-.3px;">A mesma gestão que trouxe a sua empresa até aqui '
    "está com a validade vencida.</p>"
    + f'<div style="width:44px;height:2px;background:{GOLD_LIGHT};margin:24px auto 0;"></div>'
    "</div>",
    claro=False,
    centro=True,
)

# 4 — Normalização + custo. A autoridade entra aqui, depois da dor.
s4 = slide(
    3,
    NAVY,
    f'<img src="{FOTO_SLIDE4}" alt="Caroline Batista" style="position:absolute;inset:0;'
    'width:100%;height:100%;object-fit:cover;z-index:0;">'
    '<div style="position:absolute;inset:0;z-index:1;background:linear-gradient(to bottom,'
    "rgba(22,49,79,0.30) 0%,rgba(22,49,79,0.72) 42%,rgba(15,35,56,0.96) 78%,"
    '#0f2338 100%);"></div>'
    '<div style="position:relative;z-index:2;padding:0 36px 52px;">'
    + tag("O CUSTO DE MANTER", GOLD_LIGHT)
    + '<p class="serif" style="font-size:29px;font-weight:700;color:#fff;line-height:1.18;'
    'letter-spacing:-.4px;margin-bottom:16px;">Não é só com você.</p>'
    + '<p class="sans" style="font-size:15px;font-weight:400;color:rgba(255,255,255,0.82);'
    'line-height:1.55;">Todo dono de negócio que cresce rápido chega nesse ponto, e cada mês '
    "assim custa margem e oportunidades que não voltam.</p>"
    "</div>",
    claro=False,
)

# 5 — Oferta. Sem seta: sinaliza o fim do carrossel. Barra de progresso cheia.
s5 = slide(
    4,
    GRADIENT,
    '<div style="position:absolute;top:-50px;right:-80px;opacity:.06;z-index:0;">'
    + STAR.format(w=280, mt=0, cor="#fff")
    + "</div>"
    '<div style="position:relative;z-index:2;padding:0 38px 52px;text-align:center;">'
    f'<img src="{AVATAR}" alt="Caroline Batista" style="width:64px;height:64px;'
    'border-radius:50%;object-fit:cover;border:2px solid rgba(212,168,75,0.55);'
    'margin:0 auto 16px;display:block;">'
    + '<p class="sans" style="font-size:15px;font-weight:400;color:rgba(255,255,255,0.80);'
    'line-height:1.55;margin-bottom:12px;">Clique em Saiba mais e responda o Diagnóstico de '
    "Maturidade do Negócio:</p>"
    + '<p class="serif" style="font-size:25px;font-weight:700;color:#fff;line-height:1.22;'
    'letter-spacing:-.3px;margin-bottom:24px;">descubra o que falta para você construir o '
    "futuro do seu negócio.</p>"
    + '<div style="display:inline-flex;align-items:center;gap:8px;padding:13px 30px;'
    f'background:{LIGHT_BG};color:{NAVY};border-radius:28px;margin-bottom:26px;">'
    '<span class="sans" style="font-weight:600;font-size:14px;">Saiba mais</span>'
    '<svg width="15" height="15" viewBox="0 0 24 24" fill="none">'
    f'<path d="M5 12h13M13 6l6 6-6 6" stroke="{NAVY}" stroke-width="2.5" '
    'stroke-linecap="round" stroke-linejoin="round"/></svg></div>'
    + '<div style="display:flex;justify-content:center;">' + logo(True) + "</div>"
    "</div>",
    claro=False,
    centro=True,
)

SLIDES = [s1, s2, s3, s4, s5]

# ---------------------------------------------------------------- página
CSS = f"""
:root{{color-scheme:light dark;}}
*{{box-sizing:border-box;}}
body{{margin:0;padding:32px 16px;background:#e9e6e0;display:flex;justify-content:center;
  font-family:'Inter',system-ui,-apple-system,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;}}
@media (prefers-color-scheme: dark){{body{{background:#14181d;}}}}
:root[data-theme="dark"] body{{background:#14181d;}}
:root[data-theme="light"] body{{background:#e9e6e0;}}
.serif{{font-family:'Playfair Display',Georgia,'Times New Roman',serif;margin:0;}}
.sans{{font-family:'Inter',system-ui,-apple-system,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;
  margin:0;}}

.ig-frame{{width:420px;max-width:100%;background:#fff;border-radius:14px;overflow:hidden;
  box-shadow:0 10px 40px rgba(22,49,79,.16);}}
@media (prefers-color-scheme: dark){{.ig-frame{{background:#1c2127;}}}}
:root[data-theme="dark"] .ig-frame{{background:#1c2127;}}
:root[data-theme="light"] .ig-frame{{background:#fff;}}

.ig-header{{display:flex;align-items:center;gap:10px;padding:12px 14px;
  border-bottom:1px solid rgba(0,0,0,.07);}}
.ig-avatar{{width:34px;height:34px;border-radius:50%;object-fit:cover;
  border:2px solid {GOLD};padding:1px;background:#fff;}}
.ig-handle{{font-size:13px;font-weight:600;color:#16314f;line-height:1.2;}}
.ig-sub{{font-size:11px;color:#8b8f95;line-height:1.2;}}
@media (prefers-color-scheme: dark){{
  .ig-header{{border-color:rgba(255,255,255,.09);}} .ig-handle{{color:#eef1f4;}}}}
:root[data-theme="dark"] .ig-header{{border-color:rgba(255,255,255,.09);}}
:root[data-theme="dark"] .ig-handle{{color:#eef1f4;}}
:root[data-theme="light"] .ig-header{{border-color:rgba(0,0,0,.07);}}
:root[data-theme="light"] .ig-handle{{color:#16314f;}}

.carousel-viewport{{position:relative;width:100%;aspect-ratio:4/5;overflow:hidden;
  cursor:grab;touch-action:pan-y;}}
.carousel-viewport:active{{cursor:grabbing;}}
.carousel-track{{display:flex;height:100%;width:100%;
  transition:transform .34s cubic-bezier(.22,.61,.36,1);}}
.slide{{position:relative;flex:0 0 100%;width:100%;height:100%;display:flex;
  flex-direction:column;overflow:hidden;}}

.ig-dots{{display:flex;justify-content:center;gap:5px;padding:10px 0 2px;}}
.ig-dots span{{width:6px;height:6px;border-radius:50%;background:#c9ccd1;
  transition:background .2s;}}
.ig-dots span.on{{background:{GOLD};}}
.ig-actions{{display:flex;align-items:center;gap:14px;padding:8px 14px 4px;color:#16314f;}}
.ig-actions .spacer{{flex:1;}}
@media (prefers-color-scheme: dark){{.ig-actions{{color:#eef1f4;}}}}
:root[data-theme="dark"] .ig-actions{{color:#eef1f4;}}
:root[data-theme="light"] .ig-actions{{color:#16314f;}}
.ig-caption{{padding:2px 14px 16px;font-size:13px;line-height:1.5;color:#2a2f36;}}
.ig-caption b{{color:#16314f;}}
.ig-caption .time{{display:block;margin-top:8px;font-size:10px;letter-spacing:.6px;
  color:#9aa0a6;text-transform:uppercase;}}
@media (prefers-color-scheme: dark){{
  .ig-caption{{color:#c8ccd2;}} .ig-caption b{{color:#eef1f4;}}}}
:root[data-theme="dark"] .ig-caption{{color:#c8ccd2;}}
:root[data-theme="dark"] .ig-caption b{{color:#eef1f4;}}
:root[data-theme="light"] .ig-caption{{color:#2a2f36;}}
:root[data-theme="light"] .ig-caption b{{color:#16314f;}}
"""

ICONES = (
    '<svg width="23" height="23" viewBox="0 0 24 24" fill="none" stroke="currentColor" '
    'stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">'
    '<path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8l1 1.1L12 22l'
    '7.8-8.5 1-1.1a5.5 5.5 0 0 0 0-7.8z"/></svg>'
    '<svg width="23" height="23" viewBox="0 0 24 24" fill="none" stroke="currentColor" '
    'stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">'
    '<path d="M21 11.5a8.4 8.4 0 0 1-9 8.4 8.9 8.9 0 0 1-4.1-1L3 20l1.2-4.7A8.4 8.4 0 0 1 '
    '12 3.1a8.4 8.4 0 0 1 9 8.4z"/></svg>'
    '<svg width="23" height="23" viewBox="0 0 24 24" fill="none" stroke="currentColor" '
    'stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">'
    '<path d="M22 2 11 13"/><path d="M22 2l-7 20-4-9-9-4 20-7z"/></svg>'
    '<span class="spacer"></span>'
    '<svg width="23" height="23" viewBox="0 0 24 24" fill="none" stroke="currentColor" '
    'stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">'
    '<path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>'
)

HTML = f"""<title>Carrossel ÚNICOS · Diagnóstico de Maturidade do Negócio</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,600;0,700;1,400;1,600;1,700&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
<style>{CSS}</style>

<div class="ig-frame">
  <div class="ig-header">
    <img class="ig-avatar" src="{AVATAR}" alt="Caroline Batista">
    <div>
      <div class="ig-handle">{HANDLE}</div>
      <div class="ig-sub">ÚNICOS · Saia do Padrão</div>
    </div>
  </div>

  <div class="carousel-viewport" id="vp">
    <div class="carousel-track" id="track">
      {''.join(SLIDES)}
    </div>
  </div>

  <div class="ig-dots" id="dots">
    {''.join('<span class="on"></span>' if i == 0 else '<span></span>' for i in range(TOTAL))}
  </div>
  <div class="ig-actions">{ICONES}</div>
  <div class="ig-caption">
    <b>{HANDLE}</b> Depois de um certo tamanho, o limite deixa de estar no mercado.
    Responda o Diagnóstico de Maturidade do Negócio e descubra em que estágio a sua
    empresa está. 7 perguntas, dois minutos.
    <span class="time">há 2 horas</span>
  </div>
</div>

<script>
(function(){{
  var track=document.getElementById('track'), vp=document.getElementById('vp');
  var dots=document.getElementById('dots').children, total={TOTAL}, i=0;
  var x0=null, dx=0, largura=function(){{ return vp.clientWidth; }};

  function ir(n){{
    i=Math.max(0,Math.min(total-1,n));
    track.style.transition='transform .34s cubic-bezier(.22,.61,.36,1)';
    track.style.transform='translateX('+(-i*largura())+'px)';
    for(var k=0;k<dots.length;k++) dots[k].className = (k===i?'on':'');
  }}
  vp.addEventListener('pointerdown',function(e){{
    x0=e.clientX; dx=0; track.style.transition='none'; vp.setPointerCapture(e.pointerId);
  }});
  vp.addEventListener('pointermove',function(e){{
    if(x0===null) return;
    dx=e.clientX-x0;
    track.style.transform='translateX('+(-i*largura()+dx)+'px)';
  }});
  function soltar(){{
    if(x0===null) return;
    var limite=largura()*0.18;
    if(dx<-limite) ir(i+1); else if(dx>limite) ir(i-1); else ir(i);
    x0=null; dx=0;
  }}
  vp.addEventListener('pointerup',soltar);
  vp.addEventListener('pointercancel',soltar);
  document.addEventListener('keydown',function(e){{
    if(e.key==='ArrowRight') ir(i+1);
    if(e.key==='ArrowLeft') ir(i-1);
  }});
  window.addEventListener('resize',function(){{
    track.style.transition='none'; track.style.transform='translateX('+(-i*largura())+'px)';
  }});
}})();
</script>
"""

OUT.parent.mkdir(parents=True, exist_ok=True)
OUT.write_text(HTML, encoding="utf-8")
print(f"ok: {OUT}  ({OUT.stat().st_size / 1024:.0f} KB)")
