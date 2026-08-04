#!/usr/bin/env python3
"""Carrossel ÚNICOS — ângulo "decisão solitária" (balde `decisao` do funil V3).

Direção visual deliberadamente diferente do carrossel do recorte indústria:
escuro do começo ao fim, com uma única virada em creme, numeração editorial na
lateral, Plus Jakarta Sans ExtraBold no lugar da serifada e foto em duotone.
A serifada entra uma vez só, no card 3, como virada de voz.
"""
import base64
from pathlib import Path

BASE = Path(__file__).resolve().parent
FOTOS = BASE / "assets"
OUT = BASE / "carrossel.html"

# ---------------------------------------------------------------- paleta
NAVY = "#16314f"
NAVY_DEEP = "#0a1826"      # fundo do card 1, o mais fechado
NAVY_MID = "#14293f"       # fundo do card 2, um degrau acima
NAVY_700 = "#1e3d61"
GOLD = "#a9802f"
GOLD_LIGHT = "#d4a84b"
CREAM = "#f3eee2"

GRADIENT = f"linear-gradient(170deg, {NAVY_DEEP} 0%, {NAVY} 58%, {NAVY_700} 100%)"

TOTAL = 5
HANDLE = "carolbatista"


def b64(nome: str) -> str:
    return "data:image/jpeg;base64," + base64.b64encode((FOTOS / nome).read_bytes()).decode()


FOTO_DUOTONE = b64("carol-duotone.jpg")
AVATAR = b64("avatar.jpg")

STAR = (
    '<svg viewBox="0 0 20 20" fill="none" aria-hidden="true" style="width:{w}px;height:{w}px;'
    'flex-shrink:0;margin-top:1px;">'
    '<path d="M10 0.5 C10 0.5 11.5 7.5 19.5 10 C11.5 12.5 10 19.5 10 19.5 '
    'C10 19.5 8.5 12.5 0.5 10 C8.5 7.5 10 0.5 10 0.5Z" fill="{cor}"/></svg>'
)


def logo(escuro: bool) -> str:
    palavra = CREAM if escuro else NAVY
    slogan = GOLD_LIGHT if escuro else GOLD
    estrela = GOLD_LIGHT if escuro else GOLD
    return (
        '<div style="display:inline-flex;flex-direction:column;align-items:flex-start;">'
        '<div style="display:flex;align-items:flex-start;gap:3px;">'
        f'<span class="serif" style="font-weight:700;font-size:22px;color:{palavra};'
        'letter-spacing:.05em;line-height:1;">ÚNICOS</span>'
        + STAR.format(w=10, cor=estrela)
        + "</div>"
        f'<span class="serif" style="font-style:italic;font-weight:400;font-size:9.5px;'
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


def espinha(index: int, rotulo: str, claro: bool) -> str:
    """Numeração editorial: índice no topo e fio vertical descendo a lateral.

    É o motivo estrutural deste carrossel, no lugar das tags soltas e da estrela
    de marca d'água que o carrossel do recorte indústria usa.
    """
    cor_num = GOLD if claro else GOLD_LIGHT
    cor_fio = "rgba(169,128,47,0.35)" if claro else "rgba(212,168,75,0.30)"
    return (
        f'<div style="position:absolute;left:36px;top:42px;z-index:3;">'
        f'<span class="sans" style="font-size:11px;font-weight:700;letter-spacing:2px;'
        f'color:{cor_num};">{index + 1:02d} · {rotulo}</span></div>'
        f'<div style="position:absolute;left:38px;top:68px;bottom:52px;width:1px;'
        f'background:{cor_fio};z-index:3;"></div>'
    )


def slide(index: int, fundo: str, rotulo: str, conteudo: str, claro: bool,
          baixo: bool = False) -> str:
    justify = "flex-end" if baixo else "center"
    ultimo = index == TOTAL - 1
    return (
        f'<div class="slide" style="background:{fundo};justify-content:{justify};">'
        + espinha(index, rotulo, claro)
        + conteudo
        + ("" if ultimo else swipe_arrow(claro))
        + progress_bar(index, claro)
        + "</div>"
    )


PAD = "padding:0 52px 20px 62px;"          # centralizados: folga à direita para a seta
PAD_BAIXO = "padding:0 52px 52px 62px;"    # o card da foto ancora embaixo

# ---------------------------------------------------------------- slides
s1 = slide(
    0, NAVY_DEEP, "DECISÃO",
    f'<div style="position:relative;z-index:2;{PAD}">'
    # Quebra explícita: no automático o Jakarta joga "milhões," sozinho na segunda linha.
    f'<p class="sans" style="font-size:15px;font-weight:600;color:{GOLD_LIGHT};'
    'line-height:1.4;margin:0 0 16px;letter-spacing:-.1px;">'
    "Sua indústria já passa<br>dos R$5 milhões,</p>"
    f'<p class="sans" style="font-size:30px;font-weight:800;color:{CREAM};line-height:1.18;'
    'letter-spacing:-.7px;margin:0;">e as decisões que mais pesam são você com você mesmo.</p>'
    "</div>",
    claro=False,
)

s2 = slide(
    1, NAVY_MID, "A CAUSA",
    f'<div style="position:relative;z-index:2;{PAD}">'
    f'<p class="sans" style="font-size:31px;font-weight:800;color:{CREAM};line-height:1.16;'
    'letter-spacing:-.7px;margin:0 0 20px;">Não é falta de informação.</p>'
    f'<div style="width:40px;height:2px;background:{GOLD};margin-bottom:20px;"></div>'
    '<p class="sans" style="font-size:16px;font-weight:400;color:rgba(243,238,226,0.78);'
    'line-height:1.55;margin:0;">É não ter, no seu nível, alguém com quem trocar antes de '
    "bater o martelo.</p>"
    "</div>",
    claro=False,
)

# Card 3 é a virada: fundo creme e a única aparição da serifada, para dar peso ao risco.
s3 = slide(
    2, CREAM, "O RISCO",
    f'<div style="position:relative;z-index:2;{PAD}">'
    '<p class="sans" style="font-size:16px;font-weight:500;color:rgba(22,49,79,0.62);'
    'line-height:1.5;margin:0 0 20px;">Quando você é a pessoa mais inteligente da sala, '
    "o risco não é errar de vez em quando.</p>"
    f'<p class="serif" style="font-size:28px;font-weight:700;font-style:italic;color:{NAVY};'
    'line-height:1.26;letter-spacing:-.3px;margin:0;">É ter um viés do próprio negócio, '
    "e não ter quem te avise.</p>"
    "</div>",
    claro=True,
)

s4 = slide(
    3, NAVY_DEEP, "O CUSTO",
    f'<img src="{FOTO_DUOTONE}" alt="Caroline Batista" style="position:absolute;inset:0;'
    'width:100%;height:100%;object-fit:cover;z-index:0;">'
    '<div style="position:absolute;inset:0;z-index:1;background:linear-gradient(to bottom,'
    "rgba(10,24,38,0.18) 0%,rgba(10,24,38,0.62) 40%,rgba(10,24,38,0.95) 74%,"
    '#0a1826 100%);"></div>'
    f'<div style="position:relative;z-index:2;{PAD_BAIXO}">'
    f'<p class="sans" style="font-size:26px;font-weight:800;color:{CREAM};line-height:1.2;'
    'letter-spacing:-.6px;margin:0 0 16px;">Todo dono de negócio nesse porte chega nesse '
    "ponto sozinho.</p>"
    '<p class="sans" style="font-size:15px;font-weight:400;color:rgba(243,238,226,0.82);'
    'line-height:1.55;margin:0;">E decisão nesse nível não custa reunião, custa margem e '
    "meses de operação.</p>"
    "</div>",
    claro=False,
    baixo=True,
)

s5 = slide(
    4, GRADIENT, "O PRÓXIMO PASSO",
    f'<div style="position:relative;z-index:2;{PAD}">'
    '<p class="sans" style="font-size:15px;font-weight:400;color:rgba(243,238,226,0.78);'
    'line-height:1.55;margin:0 0 14px;">Clique em Saiba mais e responda o Diagnóstico de '
    "Maturidade do Negócio:</p>"
    f'<p class="sans" style="font-size:27px;font-weight:800;color:{CREAM};line-height:1.2;'
    'letter-spacing:-.6px;margin:0 0 34px;">descubra o que te mantém decidindo tudo sozinho.</p>'
    f'<div style="width:40px;height:2px;background:{GOLD_LIGHT};margin-bottom:24px;"></div>'
    + logo(True)
    + "</div>",
    claro=False,
)

SLIDES = [s1, s2, s3, s4, s5]

# ---------------------------------------------------------------- página
CSS = f"""
:root{{color-scheme:light dark;}}
*{{box-sizing:border-box;}}
body{{margin:0;padding:32px 16px;background:#e9e6e0;display:flex;justify-content:center;
  font-family:'Plus Jakarta Sans',system-ui,-apple-system,'Segoe UI',Roboto,sans-serif;}}
@media (prefers-color-scheme: dark){{body{{background:#14181d;}}}}
:root[data-theme="dark"] body{{background:#14181d;}}
:root[data-theme="light"] body{{background:#e9e6e0;}}
.serif{{font-family:'Playfair Display',Georgia,'Times New Roman',serif;margin:0;}}
.sans{{font-family:'Plus Jakarta Sans',system-ui,-apple-system,'Segoe UI',Roboto,sans-serif;
  margin:0;}}

.ig-frame{{width:420px;max-width:100%;background:#fff;border-radius:14px;overflow:hidden;
  box-shadow:0 10px 40px rgba(10,24,38,.20);}}
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

HTML = f"""<title>Carrossel ÚNICOS · A decisão que você toma sozinho</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Playfair+Display:ital,wght@1,600;1,700&display=swap" rel="stylesheet">
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
    <b>{HANDLE}</b> Um erro em empresa desse porte não custa uma reunião, custa margem e
    meses de operação. Responda o Diagnóstico de Maturidade do Negócio e descubra o que
    te mantém decidindo tudo sozinho. 7 perguntas, dois minutos.
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

OUT.write_text(HTML, encoding="utf-8")
print(f"ok: {OUT}  ({OUT.stat().st_size / 1024:.0f} KB)")
