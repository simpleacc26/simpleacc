#!/usr/bin/env python3
"""Carrossel ÚNICOS — ângulo "padrões desatualizados" (balde `processo` do funil V3).

Terceira direção visual da série. Enquanto o recorte indústria é claro e arejado
e a decisão solitária é escura e densa, este é uma ficha de diagnóstico em papel:
creme do começo ao fim, cabeçalho com fio horizontal em toda página, conteúdo
dentro de caixas e foto emoldurada. Fecha em navy, que é o único card escuro.
"""
import base64
from pathlib import Path

BASE = Path(__file__).resolve().parent
FOTOS = BASE / "assets"
OUT = BASE / "carrossel.html"

# ---------------------------------------------------------------- paleta
NAVY = "#16314f"
NAVY_DEEP = "#0f2338"
NAVY_700 = "#1e3d61"
GOLD = "#a9802f"
GOLD_LIGHT = "#d4a84b"
PAPEL = "#f5efe3"          # creme do "papel", fundo dos cards 1 a 3
CREAM = "#f3eee2"

GRADIENT = f"linear-gradient(168deg, {NAVY_DEEP} 0%, {NAVY} 55%, {NAVY_700} 100%)"

TOTAL = 4
HANDLE = "carolbatista"


def b64(nome: str) -> str:
    return "data:image/jpeg;base64," + base64.b64encode((FOTOS / nome).read_bytes()).decode()


FOTO_BANDA = b64("carol-banda.jpg")
AVATAR = b64("avatar.jpg")

STAR = (
    '<svg viewBox="0 0 20 20" fill="none" aria-hidden="true" style="width:{w}px;height:{w}px;'
    'flex-shrink:0;">'
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
        f'<span class="serif" style="font-weight:700;font-size:21px;color:{palavra};'
        'letter-spacing:.05em;line-height:1;">ÚNICOS</span>'
        + STAR.format(w=10, cor=estrela)
        + "</div>"
        f'<span class="serif" style="font-style:italic;font-weight:400;font-size:9px;'
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


def cabecalho(index: int, rotulo: str, claro: bool) -> str:
    """Cabeçalho de ficha: rótulo à esquerda, estrela à direita, fio cruzando a página.

    É o motivo estrutural deste carrossel, no lugar da tag solta do recorte
    indústria e do fio vertical numerado da decisão solitária.
    """
    cor_txt = GOLD if claro else GOLD_LIGHT
    cor_fio = "rgba(22,49,79,0.16)" if claro else "rgba(243,238,226,0.20)"
    return (
        '<div style="position:absolute;top:34px;left:40px;right:40px;z-index:3;">'
        '<div style="display:flex;align-items:center;justify-content:space-between;">'
        f'<span class="sans" style="font-size:10px;font-weight:700;letter-spacing:2px;'
        f'color:{cor_txt};">{index + 1:02d} · {rotulo}</span>'
        + STAR.format(w=10, cor=cor_txt)
        + "</div>"
        f'<div style="height:1px;background:{cor_fio};margin-top:11px;"></div>'
        "</div>"
    )


def slide(index: int, fundo: str, rotulo: str, conteudo: str, claro: bool) -> str:
    ultimo = index == TOTAL - 1
    return (
        f'<div class="slide" style="background:{fundo};justify-content:center;">'
        + cabecalho(index, rotulo, claro)
        + conteudo
        + ("" if ultimo else swipe_arrow(claro))
        + progress_bar(index, claro)
        + "</div>"
    )


PAD = "padding:34px 52px 18px 40px;"   # folga à direita para não encostar na seta

# ---------------------------------------------------------------- slides
# 1 — O que já foi tentado, riscado. A lista da copy vira o próprio visual.
s1 = slide(
    0, PAPEL, "O QUE VOCÊ JÁ TENTOU",
    f'<div style="position:relative;z-index:2;{PAD}">'
    f'<p class="sans" style="font-size:24px;font-weight:700;color:{NAVY};line-height:1.24;'
    'letter-spacing:-.5px;margin:0 0 22px;">Você já fez de tudo para ter uma equipe mais '
    "produtiva e para o negócio depender menos de você.</p>"
    '<div style="background:rgba(22,49,79,0.045);border:1px solid rgba(22,49,79,0.12);'
    'border-radius:10px;padding:16px 18px;">'
    '<p class="sans" style="font-size:15px;font-weight:400;color:rgba(22,49,79,0.48);'
    'line-height:1.6;margin:0;text-decoration:line-through;'
    'text-decoration-color:rgba(169,128,47,0.75);text-decoration-thickness:1.5px;">'
    "Treinou, cobrou, trocou gente, mudou o organograma...</p>"
    "</div>"
    "</div>",
    claro=True,
)

# 2 — O diagnóstico. A virada ganha caixa navy cheia, o contraste vem de dentro
#     do card e não da troca de fundo.
s2 = slide(
    1, PAPEL, "O DIAGNÓSTICO",
    f'<div style="position:relative;z-index:2;{PAD}">'
    f'<p class="sans" style="font-size:26px;font-weight:700;color:{NAVY};line-height:1.2;'
    'letter-spacing:-.5px;margin:0 0 20px;">Os seus padrões não estão errados.</p>'
    f'<div style="background:{NAVY};border-radius:10px;padding:20px 20px 22px;">'
    f'<p class="serif" style="font-size:21px;font-weight:600;font-style:italic;color:{CREAM};'
    'line-height:1.32;margin:0;">Eles estão desatualizados, e é por isso que o que funcionou '
    "até aqui parou de responder.</p>"
    "</div>"
    "</div>",
    claro=True,
)

# 3 — Normalização e custo. A autoridade entra aqui, depois da dor, emoldurada.
s3 = slide(
    2, PAPEL, "O CUSTO",
    f'<div style="position:relative;z-index:2;{PAD}">'
    f'<img src="{FOTO_BANDA}" alt="Caroline Batista" style="width:100%;height:162px;'
    'object-fit:cover;object-position:center 20%;border-radius:10px;'
    'border:1px solid rgba(169,128,47,0.35);display:block;margin-bottom:22px;">'
    f'<p class="sans" style="font-size:22px;font-weight:700;color:{NAVY};line-height:1.22;'
    'letter-spacing:-.4px;margin:0 0 14px;">Não é só com você.</p>'
    '<p class="sans" style="font-size:14.5px;font-weight:400;color:rgba(22,49,79,0.66);'
    'line-height:1.58;margin:0;">Toda indústria que passou dos R$ 5 milhões chega no ponto '
    "em que a receita antiga para de funcionar, e cada mês nesse ponto custa margem e "
    "oportunidade.</p>"
    "</div>",
    claro=True,
)

# 4 — Oferta. Único card escuro, fecha a ficha na cor da marca.
s4 = slide(
    3, GRADIENT, "O PRÓXIMO PASSO",
    f'<div style="position:relative;z-index:2;{PAD}">'
    '<p class="sans" style="font-size:15px;font-weight:400;color:rgba(243,238,226,0.78);'
    'line-height:1.55;margin:0 0 16px;">Clique em Saiba mais e responda o Diagnóstico de '
    "Maturidade do Negócio:</p>"
    f'<p class="serif" style="font-size:27px;font-weight:700;color:{CREAM};line-height:1.24;'
    'letter-spacing:-.3px;margin:0 0 30px;">descubra o que falta para você construir o '
    "futuro do seu negócio.</p>"
    f'<div style="width:40px;height:2px;background:{GOLD_LIGHT};margin-bottom:22px;"></div>'
    + logo(True)
    + "</div>",
    claro=False,
)

SLIDES = [s1, s2, s3, s4]

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

HTML = f"""<title>Carrossel ÚNICOS · Os seus padrões estão desatualizados</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&family=Playfair+Display:ital,wght@0,600;0,700;1,600;1,700&display=swap" rel="stylesheet">
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
    <b>{HANDLE}</b> Treinar, cobrar, trocar gente e mexer no organograma resolve enquanto
    a empresa é pequena. Depois de um certo tamanho, para de responder. Responda o
    Diagnóstico de Maturidade do Negócio e descubra o que falta para o próximo estágio.
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
