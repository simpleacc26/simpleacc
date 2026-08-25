#!/usr/bin/env python3
# Gera o carrossel do Felipe Damasceno a partir da copy aprovada na
# Estrategia Completa (20.07.26). Regra do cliente: nunca usar travessao.
from pathlib import Path

HERE = Path(__file__).parent
FONTS = (HERE / "fonts" / "fonts-embedded.css").read_text()

# ---- Sistema de cor derivado do primario #E0A63A ----
B   = "#E0A63A"   # BRAND_PRIMARY
BL  = "#F2C775"   # BRAND_LIGHT
BD  = "#8C5E0A"   # BRAND_DARK
LBG = "#F2EEE6"   # LIGHT_BG (creme quente)
LBD = "#E3DCCF"   # LIGHT_BORDER
DBG = "#0A0E16"   # DARK_BG (navy da marca)
GRAD = f"linear-gradient(165deg,{BD} 0%,{B} 50%,{BL} 100%)"
MUTED_L = "#8A8580"

HANDLE = "@felipedamasceno.1"
BRAND = "Felipe Damasceno"
TOTAL = 7

CROWN = ('<svg viewBox="0 0 64 64" width="{w}" height="{w}" fill="none">'
         '<path d="M32 8 L50 13 V33 C50 45 42 52 32 55 C22 52 14 45 14 33 V13 Z" '
         'fill="none" stroke="{c}" stroke-width="3" stroke-linejoin="round"/>'
         '<path d="M23 34 L25.5 24 L30 30 L32 21 L34 30 L38.5 24 L41 34 Z" fill="{c}"/>'
         '<rect x="23" y="35.5" width="18" height="3.2" rx="1" fill="{c}"/></svg>')


def progress(i, light):
    pct = ((i + 1) / TOTAL) * 100
    track = "rgba(0,0,0,0.08)" if light else "rgba(255,255,255,0.12)"
    fill = B if light else "#fff"
    label = "rgba(0,0,0,0.3)" if light else "rgba(255,255,255,0.4)"
    return (f'<div style="position:absolute;bottom:0;left:0;right:0;padding:16px 28px 20px;'
            f'z-index:10;display:flex;align-items:center;gap:10px;">'
            f'<div style="flex:1;height:3px;background:{track};border-radius:2px;overflow:hidden;">'
            f'<div style="height:100%;width:{pct}%;background:{fill};border-radius:2px;"></div></div>'
            f'<span class="sans" style="font-size:11px;color:{label};font-weight:500;">{i+1}/{TOTAL}</span></div>')


def arrow(light):
    bg = "rgba(0,0,0,0.06)" if light else "rgba(255,255,255,0.08)"
    st = "rgba(0,0,0,0.25)" if light else "rgba(255,255,255,0.35)"
    return (f'<div style="position:absolute;right:0;top:0;bottom:0;width:48px;z-index:9;display:flex;'
            f'align-items:center;justify-content:center;background:linear-gradient(to right,transparent,{bg});">'
            f'<svg width="24" height="24" viewBox="0 0 24 24" fill="none">'
            f'<path d="M9 6l6 6-6 6" stroke="{st}" stroke-width="2.5" stroke-linecap="round" '
            f'stroke-linejoin="round"/></svg></div>')


def tag(text, color):
    return (f'<span class="sans" style="display:inline-block;font-size:10px;font-weight:700;'
            f'letter-spacing:2px;color:{color};margin-bottom:16px;">{text}</span>')


def lockup(color_txt, icon_bg, icon_color):
    return (f'<div style="display:flex;align-items:center;gap:11px;">'
            f'<div style="width:40px;height:40px;border-radius:50%;background:{icon_bg};display:flex;'
            f'align-items:center;justify-content:center;flex:0 0 40px;">'
            f'{CROWN.format(w=22, c=icon_color)}</div>'
            f'<div><div class="sans" style="font-size:13px;font-weight:700;letter-spacing:0.5px;'
            f'color:{color_txt};line-height:1.2;">{BRAND}</div>'
            f'<div class="sans" style="font-size:9.5px;letter-spacing:2px;text-transform:uppercase;'
            f'color:{color_txt};opacity:.6;margin-top:2px;">Governo Empresarial</div></div></div>')


def watermark(color, opacity):
    return (f'<div style="position:absolute;right:-40px;bottom:-30px;opacity:{opacity};z-index:0;'
            f'pointer-events:none;">{CROWN.format(w=260, c=color)}</div>')


def bullet(text, color, dot):
    return (f'<div style="display:flex;align-items:flex-start;gap:11px;padding:7px 0;">'
            f'<span style="color:{dot};font-size:13px;line-height:1.45;flex:0 0 auto;">&bull;</span>'
            f'<span class="sans" style="font-size:12.5px;line-height:1.45;color:{color};">{text}</span></div>')


def wrong(label, desc):
    return (f'<div style="display:flex;align-items:flex-start;gap:13px;padding:9px 0;'
            f'border-bottom:1px solid {LBD};">'
            f'<span style="color:{B};font-size:14px;width:16px;text-align:center;line-height:1.5;'
            f'flex:0 0 16px;">&#10005;</span><div>'
            f'<div class="sans" style="font-size:13.5px;font-weight:700;color:{DBG};line-height:1.3;">{label}</div>'
            f'<div class="sans" style="font-size:11.5px;color:{MUTED_L};line-height:1.35;margin-top:2px;">{desc}</div>'
            f'</div></div>')


def step(n, title, desc):
    return (f'<div style="display:flex;align-items:flex-start;gap:14px;padding:8px 0;'
            f'border-bottom:1px solid {LBD};">'
            f'<span class="serif" style="font-size:22px;font-weight:600;color:{B};min-width:30px;'
            f'line-height:1.1;flex:0 0 30px;">{n}</span><div>'
            f'<div class="sans" style="font-size:13px;font-weight:700;color:{DBG};line-height:1.25;">{title}</div>'
            f'<div class="sans" style="font-size:11px;color:{MUTED_L};line-height:1.35;margin-top:1px;">{desc}</div>'
            f'</div></div>')


# ============================ SLIDES ============================
S = []

# 1 HERO (light) - Big Idea + headline aprovada
S.append(f'''<div class="slide" style="background:{LBG};justify-content:space-between;padding:40px 36px 62px;">
  {watermark(B, "0.05")}
  <div style="position:relative;z-index:1;">{lockup(DBG, B, "#fff")}</div>
  <div style="position:relative;z-index:1;">
    {tag("GOVERNO EMPRESARIAL", B)}
    <h1 class="serif" style="font-size:33px;font-weight:700;letter-spacing:-0.5px;line-height:1.12;color:{DBG};margin:0 0 14px;">
      A sua empresa cresceu.<br>E hoje quem trabalha<br>mais &eacute; voc&ecirc;.</h1>
    <p class="sans" style="font-size:14px;line-height:1.5;color:{MUTED_L};margin:0;">
      O problema n&atilde;o &eacute; vender mais.<br>&Eacute; a empresa depender de voc&ecirc;.</p>
  </div>
  {arrow(True)}{progress(0, True)}
</div>''')

# 2 PROBLEMA (dark) - bloco de dor / espelho do ICP
S.append(f'''<div class="slide" style="background:{DBG};justify-content:flex-end;padding:0 36px 62px;">
  <div>
    {tag("O ESPELHO", BL)}
    <h2 class="serif" style="font-size:29px;font-weight:600;letter-spacing:-0.4px;line-height:1.15;color:#fff;margin:0 0 14px;">
      Voc&ecirc; se reconhece<br>aqui?</h2>
    <div>
      {bullet("Voc&ecirc; aprova praticamente todas as decis&otilde;es importantes.", "rgba(255,255,255,0.72)", B)}
      {bullet("Vive apagando inc&ecirc;ndios e resolvendo o que a equipe deveria resolver.", "rgba(255,255,255,0.72)", B)}
      {bullet("Sempre que se afasta, a empresa desacelera.", "rgba(255,255,255,0.72)", B)}
      {bullet("J&aacute; investiu em pessoas, tecnologia e consultorias, e continua sendo o gargalo.", "rgba(255,255,255,0.72)", B)}
      {bullet("Leva trabalho para casa e troca tempo de vida por crescimento.", "rgba(255,255,255,0.72)", B)}
    </div>
  </div>
  {arrow(False)}{progress(1, False)}
</div>''')

# 3 VIRADA (gradiente) - frase de virada aprovada
S.append(f'''<div class="slide" style="background:{GRAD};justify-content:center;padding:0 36px 62px;">
  {watermark("#fff", "0.06")}
  <div style="position:relative;z-index:1;">
    {tag("A VIRADA", "rgba(255,255,255,0.6)")}
    <div style="padding:18px;background:rgba(0,0,0,0.15);border-radius:12px;border:1px solid rgba(255,255,255,0.12);margin-bottom:18px;">
      <p class="serif" style="font-size:25px;font-weight:600;color:#fff;line-height:1.2;margin:0;letter-spacing:-0.3px;">
        &ldquo;Isso n&atilde;o &eacute; sinal de sucesso.<br>&Eacute; uma pris&atilde;o bem paga.&rdquo;</p>
    </div>
    <p class="sans" style="font-size:14px;line-height:1.5;color:rgba(255,255,255,0.85);margin:0;">
      E o problema n&atilde;o &eacute; a sua capacidade.<br>
      &Eacute; a falta de um <strong style="color:#fff;">governo</strong> para a sua opera&ccedil;&atilde;o.</p>
  </div>
  {arrow(False)}{progress(2, False)}
</div>''')

# 4 REFRAME (light) - por que nao resolveu
S.append(f'''<div class="slide" style="background:{LBG};justify-content:flex-end;padding:0 36px 62px;">
  <div>
    {tag("POR QUE N&Atilde;O RESOLVEU", B)}
    <h2 class="serif" style="font-size:28px;font-weight:600;letter-spacing:-0.4px;line-height:1.15;color:{DBG};margin:0 0 12px;">
      A maioria tenta resolver<br>pelo lado errado.</h2>
    <div style="margin-bottom:12px;">
      {wrong("Contrata mais gente", "As decis&otilde;es continuam passando por voc&ecirc;.")}
      {wrong("Compra mais ferramenta", "Tecnologia sem processo s&oacute; organiza a bagun&ccedil;a.")}
      {wrong("Faz mais um curso", "Mais conhecimento no dono, n&atilde;o no time.")}
    </div>
    <p class="sans" style="font-size:12.5px;line-height:1.45;color:{MUTED_L};margin:0;">
      Nada disso reduz a depend&ecirc;ncia enquanto o conhecimento, as decis&otilde;es e as cobran&ccedil;as
      continuarem concentrados em voc&ecirc;.</p>
  </div>
  {arrow(True)}{progress(3, True)}
</div>''')

# 5 MECANISMO (dark) - o IDE
S.append(f'''<div class="slide" style="background:{DBG};justify-content:center;padding:0 36px 62px;">
  <div>
    {tag("O MECANISMO", BL)}
    <h2 class="serif" style="font-size:29px;font-weight:600;letter-spacing:-0.4px;line-height:1.15;color:#fff;margin:0 0 18px;">
      Existe um n&uacute;mero<br>que mede isso.</h2>
    <div style="display:inline-flex;flex-direction:column;align-items:flex-start;padding:16px 22px;
                border-radius:14px;background:rgba(224,166,58,0.14);border:1px solid rgba(224,166,58,0.3);margin-bottom:18px;">
      <span class="serif" style="font-size:40px;font-weight:700;color:{BL};line-height:1;">IDE</span>
      <span class="sans" style="font-size:10px;letter-spacing:1.6px;text-transform:uppercase;
            color:rgba(255,255,255,0.5);margin-top:6px;">&Iacute;ndice de Depend&ecirc;ncia Empresarial</span>
    </div>
    <p class="sans" style="font-size:13.5px;line-height:1.5;color:rgba(255,255,255,0.72);margin:0;">
      Mede o quanto a sua empresa ainda depende de voc&ecirc; para funcionar:
      em <strong style="color:#fff;">decis&otilde;es</strong>, <strong style="color:#fff;">execu&ccedil;&atilde;o</strong>,
      <strong style="color:#fff;">cobran&ccedil;a</strong> e <strong style="color:#fff;">conhecimento</strong>.</p>
  </div>
  {arrow(False)}{progress(4, False)}
</div>''')

# 6 METODO (light) - 5 pilares oficiais
S.append(f'''<div class="slide" style="background:{LBG};justify-content:flex-end;padding:0 36px 62px;">
  <div>
    {tag("M&Eacute;TODO POT&Ecirc;NCIA EMPRESARIAL", B)}
    <h2 class="serif" style="font-size:26px;font-weight:600;letter-spacing:-0.4px;line-height:1.15;color:{DBG};margin:0 0 4px;">
      N&atilde;o come&ccedil;a pela empresa.<br>Come&ccedil;a por voc&ecirc;.</h2>
    <div style="margin-top:10px;">
      {step("01", "Diagnosticar", "Medir a depend&ecirc;ncia com o IDE e a CLO.")}
      {step("02", "Organizar", "Estruturar pessoas, processos e informa&ccedil;&otilde;es.")}
      {step("03", "Delegar", "Transferir responsabilidades com clareza.")}
      {step("04", "Automatizar", "Cad&ecirc;ncias e sistemas que fazem o trabalho acontecer.")}
      {step("05", "Governar", "Acompanhar e decidir com base em dados.")}
    </div>
  </div>
  {arrow(True)}{progress(5, True)}
</div>''')

# 7 CTA (gradiente) - sem seta, barra 100%
S.append(f'''<div class="slide" style="background:{GRAD};justify-content:space-between;padding:40px 36px 62px;">
  {watermark("#fff", "0.07")}
  <div style="position:relative;z-index:1;">{lockup("#fff", "rgba(255,255,255,0.18)", "#fff")}</div>
  <div style="position:relative;z-index:1;">
    {tag("O PR&Oacute;XIMO PASSO", "rgba(255,255,255,0.6)")}
    <h2 class="serif" style="font-size:31px;font-weight:700;letter-spacing:-0.5px;line-height:1.13;color:#fff;margin:0 0 12px;">
      Fa&ccedil;a o seu<br>Diagn&oacute;stico Executivo.</h2>
    <p class="sans" style="font-size:13.5px;line-height:1.5;color:rgba(255,255,255,0.85);margin:0 0 20px;">
      Responda o quiz e receba o seu IDE com o caminho para governar a sua empresa
      atrav&eacute;s de pessoas, processos e indicadores.</p>
    <div style="display:inline-flex;align-items:center;gap:8px;padding:13px 28px;background:{LBG};
                color:{BD};border-radius:28px;">
      <span class="sans" style="font-weight:700;font-size:14px;">Link na bio</span>
    </div>
    <p class="sans" style="font-size:11.5px;color:rgba(255,255,255,0.7);margin:14px 0 0;">
      Gratuito &middot; 2 minutos &middot; {HANDLE}</p>
  </div>
  {progress(6, False)}
</div>''')

slides_html = "\n".join(S)
dots = "".join(f'<div class="dot{" active" if i==0 else ""}"></div>' for i in range(TOTAL))

HTML = f'''<!DOCTYPE html>
<html lang="pt-BR"><head><meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Carrossel · Felipe Damasceno</title>
<style>
{FONTS}
*{{box-sizing:border-box;margin:0;padding:0;}}
body{{background:#DBDBDB;font-family:'DM Sans',sans-serif;display:flex;justify-content:center;
  align-items:flex-start;padding:24px;min-height:100vh;}}
.serif{{font-family:'Playfair Display',Georgia,serif;}}
.sans{{font-family:'DM Sans',sans-serif;}}
.ig-frame{{width:420px;background:#fff;border-radius:8px;overflow:hidden;
  box-shadow:0 2px 14px rgba(0,0,0,.12);}}
.ig-header{{display:flex;align-items:center;gap:10px;padding:11px 14px;border-bottom:1px solid #EFEFEF;}}
.ig-av{{width:32px;height:32px;border-radius:50%;background:{B};display:flex;align-items:center;
  justify-content:center;flex:0 0 32px;}}
.carousel-viewport{{width:420px;aspect-ratio:4/5;overflow:hidden;position:relative;cursor:grab;}}
.carousel-track{{display:flex;height:100%;transition:transform .32s cubic-bezier(.22,1,.36,1);}}
.slide{{width:420px;height:100%;flex:0 0 420px;position:relative;display:flex;flex-direction:column;
  overflow:hidden;}}
.ig-dots{{display:flex;justify-content:center;gap:5px;padding:12px 0 6px;}}
.dot{{width:6px;height:6px;border-radius:50%;background:#C7C7C7;transition:background .2s;}}
.dot.active{{background:#0095F6;}}
.ig-actions{{display:flex;align-items:center;gap:15px;padding:4px 14px 8px;}}
.ig-caption{{padding:0 14px 14px;font-size:13px;line-height:1.4;color:#262626;}}
</style></head><body>
<div class="ig-frame">
  <div class="ig-header">
    <div class="ig-av">{CROWN.format(w=19, c="#fff")}</div>
    <div><div style="font-size:13px;font-weight:700;color:#262626;">{HANDLE}</div>
    <div style="font-size:11px;color:#8E8E8E;">Governo Empresarial</div></div>
  </div>
  <div class="carousel-viewport"><div class="carousel-track">{slides_html}</div></div>
  <div class="ig-dots">{dots}</div>
  <div class="ig-actions">
    <svg width="23" height="23" viewBox="0 0 24 24" fill="none" stroke="#262626" stroke-width="1.7"><path d="M20.8 4.6a5.5 5.5 0 00-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 00-7.8 7.8l1.1 1L12 21l7.7-7.6 1.1-1a5.5 5.5 0 000-7.8z"/></svg>
    <svg width="23" height="23" viewBox="0 0 24 24" fill="none" stroke="#262626" stroke-width="1.7"><path d="M21 11.5a8.4 8.4 0 01-9 8.5 8.4 8.4 0 01-3.8-.9L3 21l1.9-5.2A8.4 8.4 0 0112 3a8.4 8.4 0 019 8.5z"/></svg>
    <svg width="23" height="23" viewBox="0 0 24 24" fill="none" stroke="#262626" stroke-width="1.7"><path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/></svg>
    <svg style="margin-left:auto" width="23" height="23" viewBox="0 0 24 24" fill="none" stroke="#262626" stroke-width="1.7"><path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z"/></svg>
  </div>
  <div class="ig-caption">
    <strong>{HANDLE}</strong> A sua empresa cresceu. E hoje quem trabalha mais &eacute; voc&ecirc;.
    Arrasta pro lado e veja se voc&ecirc; se reconhece. O Diagn&oacute;stico Executivo est&aacute; no link da bio.
    <div style="color:#8E8E8E;font-size:10px;letter-spacing:.3px;margin-top:7px;">H&Aacute; 2 HORAS</div>
  </div>
</div>
<script>
const track=document.querySelector('.carousel-track'),dotsEl=document.querySelectorAll('.dot');
const vp=document.querySelector('.carousel-viewport');let idx=0,startX=0,drag=false,dx=0;
const W=420,N={TOTAL};
function go(i){{idx=Math.max(0,Math.min(N-1,i));track.style.transition='transform .32s cubic-bezier(.22,1,.36,1)';
  track.style.transform='translateX('+(-idx*W)+'px)';dotsEl.forEach((d,j)=>d.classList.toggle('active',j===idx));}}
vp.addEventListener('pointerdown',e=>{{drag=true;startX=e.clientX;dx=0;vp.setPointerCapture(e.pointerId);
  track.style.transition='none';vp.style.cursor='grabbing';}});
vp.addEventListener('pointermove',e=>{{if(!drag)return;dx=e.clientX-startX;
  track.style.transform='translateX('+(-idx*W+dx)+'px)';}});
vp.addEventListener('pointerup',()=>{{if(!drag)return;drag=false;vp.style.cursor='grab';
  if(Math.abs(dx)>60)go(idx+(dx<0?1:-1));else go(idx);}});
document.addEventListener('keydown',e=>{{if(e.key==='ArrowRight')go(idx+1);if(e.key==='ArrowLeft')go(idx-1);}});
</script></body></html>'''

out = HERE / "carousel.html"
out.write_text(HTML, encoding="utf-8")
print(f"OK: {out} ({out.stat().st_size} bytes, {TOTAL} slides)")
