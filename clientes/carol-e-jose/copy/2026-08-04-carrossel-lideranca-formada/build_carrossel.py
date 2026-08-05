#!/usr/bin/env python3
"""Carrossel ÚNICOS — ângulo "liderança formada" (balde `lideranca` do funil V3).

Quarta direção visual da série. Aqui a peça é construída em faixas: uma zona navy
em cima e uma zona creme embaixo, separadas por um fio dourado que muda de altura
a cada card. É uma composição arquitetônica, diferente do fundo cheio com texto
solto dos outros três, e conversa com o próprio assunto, que é camada de liderança.
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
PAPEL = "#f5efe3"
CREAM = "#f3eee2"

NAVY_GRAD = f"linear-gradient(160deg, {NAVY_DEEP} 0%, {NAVY} 70%, {NAVY_700} 100%)"

TOTAL = 4
HANDLE = "carolbatista"


def b64(nome: str) -> str:
    return "data:image/jpeg;base64," + base64.b64encode((FOTOS / nome).read_bytes()).decode()


FOTO_FAIXA = b64("carol-faixa.jpg")
AVATAR = b64("avatar.jpg")

STAR = (
    '<svg viewBox="0 0 20 20" fill="none" aria-hidden="true" style="width:{w}px;height:{w}px;'
    'flex-shrink:0;">'
    '<path d="M10 0.5 C10 0.5 11.5 7.5 19.5 10 C11.5 12.5 10 19.5 10 19.5 '
    'C10 19.5 8.5 12.5 0.5 10 C8.5 7.5 10 0.5 10 0.5Z" fill="{cor}"/></svg>'
)


def logo() -> str:
    return (
        '<div style="display:inline-flex;flex-direction:column;align-items:flex-start;">'
        '<div style="display:flex;align-items:flex-start;gap:3px;">'
        f'<span class="serif" style="font-weight:700;font-size:21px;color:{CREAM};'
        'letter-spacing:.05em;line-height:1;">ÚNICOS</span>'
        + STAR.format(w=10, cor=GOLD_LIGHT)
        + "</div>"
        f'<span class="serif" style="font-style:italic;font-weight:400;font-size:9px;'
        f'color:{GOLD_LIGHT};letter-spacing:.16em;margin-top:4px;">Saia do Padrão</span>'
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


def swipe_arrow(claro: bool, topo: str = "0") -> str:
    """Nos cards em faixa a seta fica só na zona creme.

    Se ocupasse a altura toda, metade dela cairia sobre a foto navy do card 3 e o
    traço escuro sumiria. Presa ao creme, ela lê em todos os cards.
    """
    bg = "rgba(0,0,0,0.06)" if claro else "rgba(255,255,255,0.08)"
    traco = "rgba(0,0,0,0.25)" if claro else "rgba(255,255,255,0.35)"
    return (
        f'<div style="position:absolute;right:0;top:{topo};bottom:0;width:48px;z-index:9;'
        "display:flex;align-items:center;justify-content:center;background:linear-gradient("
        f'to right,transparent,{bg});">'
        '<svg width="24" height="24" viewBox="0 0 24 24" fill="none">'
        f'<path d="M9 6l6 6-6 6" stroke="{traco}" stroke-width="2.5" stroke-linecap="round" '
        'stroke-linejoin="round"/></svg></div>'
    )


def rotulo(texto: str) -> str:
    return (
        '<div style="display:flex;align-items:center;justify-content:space-between;">'
        f'<span class="sans" style="font-size:10px;font-weight:700;letter-spacing:2px;'
        f'color:{GOLD_LIGHT};">{texto}</span>'
        + STAR.format(w=10, cor=GOLD_LIGHT)
        + "</div>"
    )


def slide_faixa(index: int, altura: int, texto_rotulo: str, navy_extra: str,
                creme: str, foto: bool = False) -> str:
    """Card em duas zonas: navy em cima até `altura`%, creme no restante.

    O fio dourado da divisória é o que amarra a série, e a altura variável é o
    que dá composição diferente a cada card sem trocar de sistema.
    """
    ultimo = index == TOTAL - 1
    imagem = (
        f'<img src="{FOTO_FAIXA}" alt="Caroline Batista" style="position:absolute;inset:0;'
        'width:100%;height:100%;object-fit:cover;object-position:center 38%;z-index:0;">'
        '<div style="position:absolute;inset:0;z-index:1;background:linear-gradient(to bottom,'
        'rgba(15,35,56,0.82) 0%,rgba(15,35,56,0.58) 45%,rgba(15,35,56,0.74) 100%);"></div>'
        if foto else ""
    )
    return (
        '<div class="slide" style="background:' + PAPEL + ';">'
        # zona navy
        f'<div style="position:absolute;top:0;left:0;right:0;height:{altura}%;'
        f'background:{NAVY_GRAD};overflow:hidden;z-index:1;">'
        + imagem
        + '<div style="position:absolute;top:34px;left:40px;right:40px;z-index:2;">'
        + rotulo(texto_rotulo)
        + "</div>"
        + navy_extra
        + "</div>"
        # divisória dourada
        f'<div style="position:absolute;top:{altura}%;left:0;right:0;height:1.5px;'
        f'background:{GOLD};z-index:4;"></div>'
        # zona creme
        f'<div style="position:absolute;top:{altura}%;left:0;right:0;bottom:0;'
        'display:flex;flex-direction:column;justify-content:center;'
        'padding:26px 52px 46px 40px;z-index:2;">'
        + creme
        + "</div>"
        + ("" if ultimo else swipe_arrow(True, topo=f"{altura}%"))
        + progress_bar(index, True)
        + "</div>"
    )


# ---------------------------------------------------------------- slides
# 1 — Reconhecimento. O faturamento abre na zona navy, a dor cai na zona creme.
s1 = slide_faixa(
    0, 36, "01 · O QUE VOCÊ TENTOU",
    '<div style="position:absolute;left:40px;right:52px;bottom:26px;z-index:2;">'
    # Quebra explícita: no automático o Jakarta joga "milhões." sozinho na segunda linha.
    f'<p class="sans" style="font-size:15px;font-weight:600;color:{CREAM};line-height:1.45;'
    'margin:0;">Sua indústria já passa<br>dos R$5 milhões.</p></div>',
    f'<p class="serif" style="font-size:24px;font-weight:700;color:{NAVY};line-height:1.24;'
    'letter-spacing:-.3px;margin:0 0 16px;">Você contratou mais gente e mesmo assim continua '
    "puxando tudo.</p>"
    '<p class="sans" style="font-size:14.5px;font-weight:400;color:rgba(22,49,79,0.66);'
    'line-height:1.58;margin:0;">Contratar mais braço não resolveu porque não era braço '
    "que faltava.</p>",
)

# 2 — O que falta. Zona navy fina, quase só respiro: a frase é a peça inteira.
s2 = slide_faixa(
    1, 26, "02 · O QUE FALTA", "",
    f'<p class="serif" style="font-size:26px;font-weight:700;color:{NAVY};line-height:1.26;'
    'letter-spacing:-.3px;margin:0;">O que falta é '
    f'<span style="color:{GOLD};">gente formada</span> para assumir a entrega, e não mais '
    "um par de mãos esperando a sua ordem.</p>",
)

# 3 — Normalização e custo. A foto ocupa a zona navy e a autoridade entra aqui,
#     depois da dor, como manda o Framework.
s3 = slide_faixa(
    2, 50, "03 · O PADRÃO", "",
    f'<p class="serif" style="font-size:22px;font-weight:700;color:{NAVY};line-height:1.24;'
    'letter-spacing:-.3px;margin:0 0 12px;">Não é só com você.</p>'
    '<p class="sans" style="font-size:14px;font-weight:400;color:rgba(22,49,79,0.66);'
    'line-height:1.55;margin:0;">É o padrão mais comum em quem cresce mais rápido do que '
    "consegue formar novas lideranças, e enquanto isso, mais faturamento gera mais "
    "sobrecarga em cima de você.</p>",
    foto=True,
)

# 4 — Oferta. As faixas se fundem: o card inteiro vira navy e fecha a série.
s4 = (
    f'<div class="slide" style="background:{NAVY_GRAD};">'
    '<div style="position:absolute;top:34px;left:40px;right:40px;z-index:2;">'
    + rotulo("04 · O PRÓXIMO PASSO")
    + "</div>"
    f'<div style="position:absolute;top:26%;left:0;right:0;height:1.5px;background:{GOLD};'
    'z-index:2;"></div>'
    '<div style="position:absolute;top:26%;left:0;right:0;bottom:0;display:flex;'
    'flex-direction:column;justify-content:center;padding:26px 52px 46px 40px;z-index:2;">'
    '<p class="sans" style="font-size:15px;font-weight:400;color:rgba(243,238,226,0.78);'
    'line-height:1.55;margin:0 0 16px;">Clique em Saiba mais e responda o Diagnóstico de '
    "Maturidade do Negócio:</p>"
    f'<p class="serif" style="font-size:25px;font-weight:700;color:{CREAM};line-height:1.26;'
    'letter-spacing:-.3px;margin:0 0 30px;">descubra quem, do time que você já tem, tem '
    "condição de assumir mais.</p>"
    f'<div style="width:40px;height:2px;background:{GOLD_LIGHT};margin-bottom:22px;"></div>'
    + logo()
    + "</div>"
    + progress_bar(3, False)
    + "</div>"
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
.slide{{position:relative;flex:0 0 100%;width:100%;height:100%;overflow:hidden;}}

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

HTML = f"""<title>Carrossel ÚNICOS · Falta liderança formada, não mão de obra</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&family=Playfair+Display:wght@600;700&display=swap" rel="stylesheet">
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
    <b>{HANDLE}</b> Contratar mais gente para executar não resolve, porque não é braço que
    falta. Responda o Diagnóstico de Maturidade do Negócio e descubra quem, do time que
    você já tem, tem condição de assumir mais.
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
