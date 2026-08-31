#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Gera os 5 carrosséis de largada da Luana Isse em HTML autocontido.

Identidade tirada do MANUAL DE MARCA oficial (enviado por ela em 20/08):
  #030118 escuro institucional · #441529 vinho · #491F13 marrom
  #B49055 dourado (principal) · #FFFFFF branco · #07292E verde petróleo
Tipografia: Montserrat no corpo (manual) e Playfair Display nos títulos,
substituta da Humble Nostalgia, que é paga e não temos o arquivo.
Fontes e imagens vão embutidas em base64: o HTML não depende de rede.

Direção visual pedida: fundo escuro ou bege, tipografia serifada,
dourado nos destaques, para ficar na mesma família das artes que ela produz.
"""
import base64
import re
from pathlib import Path

AQUI = Path(__file__).resolve().parent
ASSETS = AQUI / "assets"

# ---------------------------------------------------------------- paleta
GOLD       = "#B49055"   # dourado, cor principal do manual
GOLD_LIGHT = "#C9AC7E"   # dourado clareado ~20%, para fundo escuro
GOLD_DARK  = "#7E653B"   # dourado escurecido ~30%
BEGE       = "#F5EFE4"   # off-white quente, nunca branco puro
BEGE_LINE  = "#E3D8C5"   # divisória sobre bege
INK        = "#030118"   # escuro institucional
CREAM      = "#F5EFE4"   # texto sobre escuro

LINK = "quiz-luana-isse.vercel.app"
HANDLE = "@luana.isse"
MARCA = "LUANA ISSE"

TEMA = {
    "light": dict(bg=BEGE, fg=INK, muted="#6E6555", tag=GOLD,
                  line=BEGE_LINE, claro=True, logo="logo-escuro"),
    "dark":  dict(bg=INK, fg=CREAM, muted="rgba(245,239,228,.58)", tag=GOLD_LIGHT,
                  line="rgba(245,239,228,.13)", claro=False, logo="logo-claro"),
}


def b64(nome, mime):
    return "data:%s;base64,%s" % (mime, base64.b64encode((ASSETS / nome).read_bytes()).decode())


IMG = {
    "foto": b64("luana.jpg", "image/jpeg"),
    "logo-escuro": b64("logo-escuro.png", "image/png"),
    "logo-claro": b64("logo-claro.png", "image/png"),
    "logo-dourado": b64("logo-dourado.png", "image/png"),
}
FONTES = (ASSETS / "fonts" / "fontes-embutidas.css").read_text(encoding="utf-8")


# ------------------------------------------------------------ componentes
def barra(i, total, claro):
    pct = ((i + 1) / total) * 100
    trilho = "rgba(3,1,24,.10)" if claro else "rgba(245,239,228,.14)"
    fill = GOLD if claro else GOLD_LIGHT
    label = "rgba(3,1,24,.32)" if claro else "rgba(245,239,228,.40)"
    return (
        '<div style="position:absolute;bottom:0;left:0;right:0;padding:16px 28px 20px;'
        'z-index:10;display:flex;align-items:center;gap:10px;">'
        f'<div style="flex:1;height:3px;background:{trilho};border-radius:2px;overflow:hidden;">'
        f'<div style="height:100%;width:{pct}%;background:{fill};border-radius:2px;"></div></div>'
        f'<span class="sans" style="font-size:11px;color:{label};font-weight:500;">{i + 1}/{total}</span>'
        "</div>"
    )


def seta(claro):
    bg = "rgba(3,1,24,.06)" if claro else "rgba(245,239,228,.07)"
    traco = "rgba(3,1,24,.26)" if claro else "rgba(245,239,228,.34)"
    return (
        '<div style="position:absolute;right:0;top:0;bottom:0;width:48px;z-index:9;'
        "display:flex;align-items:center;justify-content:center;"
        f'background:linear-gradient(to right,transparent,{bg});">'
        '<svg width="24" height="24" viewBox="0 0 24 24" fill="none">'
        f'<path d="M9 6l6 6-6 6" stroke="{traco}" stroke-width="2.5" '
        'stroke-linecap="round" stroke-linejoin="round"/></svg></div>'
    )


def etiqueta(txt, t):
    if not txt:
        return ""
    return (
        f'<span class="sans" style="display:inline-block;font-size:10px;font-weight:600;'
        f'letter-spacing:2px;color:{t["tag"]};margin-bottom:18px;">{txt}</span>'
    )


def topo(t, com_logo=False):
    """Faixa do topo: assinatura da marca no primeiro e no último slide,
    arroba discreta no resto."""
    if com_logo:
        esquerda = (
            f'<img src="{IMG[t["logo"]]}" alt="{MARCA}" '
            'style="height:19px;width:auto;display:block;opacity:.92;">'
        )
    else:
        esquerda = (
            f'<span class="sans" style="font-size:10px;font-weight:600;letter-spacing:1.6px;'
            f'color:{t["muted"]};">{MARCA}</span>'
        )
    return (
        '<div style="position:absolute;top:26px;left:36px;right:36px;z-index:6;'
        'display:flex;align-items:center;justify-content:space-between;gap:12px;">'
        f"{esquerda}"
        f'<span class="sans" style="font-size:10px;font-weight:500;letter-spacing:.6px;'
        f'color:{t["muted"]};">{HANDLE}</span></div>'
    )


def foto(px=104, borda=None, raio="50%"):
    borda = borda or GOLD
    return (
        f'<img src="{IMG["foto"]}" alt="Luana Isse" '
        f'style="width:{px}px;height:{px}px;border-radius:{raio};object-fit:cover;'
        f'border:2px solid {borda};display:block;">'
    )


def titulo(txt, size=30, cor=None, peso=500, lh=1.16, mb=0):
    cor = cor or "inherit"
    return (
        f'<h2 class="serif" style="font-size:{size}px;font-weight:{peso};line-height:{lh};'
        f'letter-spacing:-.4px;color:{cor};margin:0 0 {mb}px;">{txt}</h2>'
    )


def ouro(txt, t):
    return f'<span style="color:{t["tag"]};">{txt}</span>'


def risco(txt, t):
    """Risca a palavra dentro da própria frase, em vez de repeti-la numa pílula."""
    return (f'<span style="text-decoration:line-through;text-decoration-thickness:2px;'
            f'text-decoration-color:{t["tag"]};opacity:.72;">{txt}</span>')


def citacao(txt, t):
    """Caixa de citação para as frases que o especialista diz para si mesmo."""
    if t["claro"]:
        cx = f"background:rgba(255,255,255,.6);border:1px solid {BEGE_LINE};"
    else:
        cx = "background:rgba(245,239,228,.04);border:1px solid rgba(245,239,228,.12);"
    return (
        f'<div style="padding:22px 22px 24px;border-radius:14px;{cx}">'
        f'<span class="serif" style="display:block;font-size:34px;line-height:1;'
        f'color:{t["tag"]};opacity:.5;margin-bottom:6px;">&ldquo;</span>'
        f'<p class="serif" style="font-size:24px;font-weight:400;font-style:italic;'
        f'line-height:1.3;letter-spacing:-.3px;margin:0;color:inherit;">{txt}</p></div>'
    )


def pilares(t, destaque=None):
    """Os quatro pilares do MMPV, na formulação dela."""
    nomes = ["Mentalidade", "Movimento", "Posicionamento", "Vendas"]
    linhas = []
    for n, nome in enumerate(nomes, 1):
        forte = destaque == nome
        cor_num = t["tag"] if not forte else t["tag"]
        peso = 600 if forte else 500
        linhas.append(
            f'<div style="display:flex;align-items:baseline;gap:14px;padding:9px 0;'
            f'border-bottom:1px solid {t["line"]};">'
            f'<span class="serif" style="font-size:19px;font-weight:300;color:{cor_num};'
            f'min-width:26px;line-height:1;">0{n}</span>'
            f'<span class="sans" style="font-size:14px;font-weight:{peso};color:inherit;">{nome}</span>'
            "</div>"
        )
    return f'<div style="margin-top:24px;">{"".join(linhas)}</div>'


def brilho_final():
    """Lavagem dourada no slide de CTA. Fundo continua escuro institucional,
    como pede a direção; o dourado entra só como destaque."""
    return (
        '<div style="position:absolute;inset:0;z-index:0;pointer-events:none;'
        f"background:radial-gradient(120% 78% at 50% 112%, {GOLD}38 0%, {GOLD_DARK}1f 42%, "
        'rgba(3,1,24,0) 74%);"></div>'
    )


def botao(txt):
    return (
        f'<div class="sans" style="display:inline-flex;align-items:center;gap:9px;'
        f'padding:13px 26px;background:{BEGE};color:{INK};font-weight:600;font-size:14px;'
        'border-radius:28px;letter-spacing:.2px;">'
        f"{txt}"
        '<svg width="15" height="15" viewBox="0 0 24 24" fill="none">'
        f'<path d="M5 12h14M13 6l6 6-6 6" stroke="{INK}" stroke-width="2.2" '
        'stroke-linecap="round" stroke-linejoin="round"/></svg></div>'
    )


# ------------------------------------------------------------------ slide
def slide(i, total, tema, conteudo, alinhamento="flex-end", topo_logo=False,
          extras="", ultimo=False):
    t = TEMA[tema]
    pad_top = 44
    return (
        f'<div class="slide" style="background:{t["bg"]};color:{t["fg"]};">'
        f"{extras}"
        f"{topo(t, topo_logo)}"
        f'<div style="position:relative;z-index:5;flex:1;display:flex;flex-direction:column;'
        f'justify-content:{alinhamento};padding:{pad_top}px 36px 62px;">{conteudo}</div>'
        f"{'' if ultimo else seta(t['claro'])}"
        f"{barra(i, total, t['claro'])}"
        "</div>"
    )


def cta(t_nome, texto, com_foto=True, etiq="DIAGNÓSTICO GRATUITO"):
    """Último slide. Sem seta, barra cheia, CTA e link do funil."""
    t = TEMA[t_nome]
    bloco_foto = (
        f'<div style="margin-bottom:24px;">{foto(88, GOLD)}</div>' if com_foto else ""
    )
    return (
        '<div style="display:flex;flex-direction:column;align-items:flex-start;">'
        f"{bloco_foto}"
        f"{etiqueta(etiq, t)}"
        f"{titulo(texto, 27, peso=500, lh=1.2)}"
        f'<div style="margin-top:26px;">{botao("Toque no link")}</div>'
        f'<p class="sans" style="font-size:11px;font-weight:500;letter-spacing:.4px;'
        f'color:{t["muted"]};margin:14px 0 0;">{LINK}</p>'
        f'<div style="display:flex;align-items:center;gap:10px;margin-top:26px;'
        f'padding-top:18px;border-top:1px solid {t["line"]};width:100%;">'
        f'<img src="{IMG["logo-claro"]}" alt="{MARCA}" style="height:18px;width:auto;opacity:.92;">'
        f'<span class="sans" style="font-size:10px;font-weight:600;letter-spacing:1.4px;'
        f'color:{t["tag"]};margin-left:auto;">QUEM É VISTO, VENDE MAIS</span></div>'
        "</div>"
    )


def distancia(t):
    """Diagrama da distância entre o valor que a pessoa tem e o que o mercado enxerga."""
    ponto = ("width:9px;height:9px;border-radius:50%%;background:%s;flex:none;")
    return (
        '<div style="margin-top:26px;display:flex;align-items:center;gap:10px;">'
        f'<span style="{ponto % t["tag"]}"></span>'
        f'<span style="flex:1;height:1px;background:repeating-linear-gradient(to right,'
        f'{t["tag"]} 0 5px,transparent 5px 11px);opacity:.55;"></span>'
        f'<span style="{ponto % t["tag"]};opacity:.35;"></span></div>'
        '<div style="display:flex;justify-content:space-between;gap:16px;margin-top:9px;">'
        f'<span class="sans" style="font-size:11px;font-weight:600;color:{t["fg"]};max-width:120px;'
        'line-height:1.35;">o valor que você tem</span>'
        f'<span class="sans" style="font-size:11px;font-weight:500;color:{t["muted"]};max-width:130px;'
        'line-height:1.35;text-align:right;">o valor que o mercado enxerga</span></div>'
    )


def cartao_frase(n, txt, t):
    return (
        f'<span class="serif" style="display:block;font-size:15px;font-weight:400;'
        f'color:{t["tag"]};letter-spacing:1px;margin-bottom:14px;">0{n}</span>'
        f"{citacao(txt, t)}"
    )


# --------------------------------------------------------------- conteúdo
def carrossel_1():
    """Cena · O dia do especialista invisível. Foto: só no fim."""
    L, D = TEMA["light"], TEMA["dark"]
    return [
        dict(tema="light", topo_logo=True, conteudo=(
            etiqueta("O DIA DO ESPECIALISTA INVISÍVEL", L)
            + titulo("Você acorda e vê que a sua colega de turma anunciou mais uma mentoria.", 28)
        )),
        dict(tema="dark", conteudo=(
            etiqueta("E VOCÊ", D)
            + titulo(f'Você tem {ouro("duas pós a mais", D)} que ela.', 33)
        )),
        dict(tema="light", conteudo=(
            etiqueta("A ROTINA", L)
            + titulo("Escreve um conteúdo denso, com fundamento. Duas horas.", 30)
        )),
        dict(tema="dark", alinhamento="center", conteudo=(
            etiqueta("O RETORNO", D)
            + titulo(f'{ouro("Doze", D)}<br>curtidas.', 58, peso=400, lh=1.02)
        )),
        dict(tema="light", conteudo=(
            etiqueta("O PENSAMENTO", L)
            + titulo('E aí vem o pensamento: <span style="font-style:italic;color:%s;">'
                     "talvez eu não sirva para isso.</span>" % GOLD_DARK, 28)
        )),
        dict(tema="dark", conteudo=(
            etiqueta("A VERDADE", D)
            + titulo(f'{ouro("Serve.", D)} O que falta não é competência.', 33)
        )),
        dict(tema="dark", ultimo=True, alinhamento="center",
             extras=brilho_final(),
             conteudo=cta("dark", "Descubra em 2 minutos o que realmente está travando.",
                          com_foto=True)),
    ]


def carrossel_2():
    """Cena · As frases que você já disse pra si mesmo. Foto: começo e fim."""
    L, D = TEMA["light"], TEMA["dark"]
    return [
        dict(tema="light", topo_logo=True, conteudo=(
            f'<div style="margin-bottom:26px;">{foto(104)}</div>'
            + etiqueta("O QUE NINGUÉM FALA EM VOZ ALTA", L)
            + titulo("Cinco frases que quase todo especialista já disse pra si mesmo.", 28)
        )),
        dict(tema="dark", alinhamento="center",
             conteudo=cartao_frase(1, "Se eu fosse mesmo excelente, já teriam me procurado.", D)),
        dict(tema="light", alinhamento="center",
             conteudo=cartao_frase(2, "Não vou fazer dancinha para vender o que eu estudei anos.", L)),
        dict(tema="dark", alinhamento="center",
             conteudo=cartao_frase(3, "Meu público não está no Instagram.", D)),
        dict(tema="light", alinhamento="center",
             conteudo=cartao_frase(4, "Depois eu organizo isso direito.", L)),
        dict(tema="dark", conteudo=(
            etiqueta("O QUE ELAS TÊM EM COMUM", D)
            + titulo(f'Nenhuma delas é o problema. Todas são {ouro("sintoma do mesmo", D)}.', 30)
        )),
        dict(tema="dark", ultimo=True, alinhamento="center",
             extras=brilho_final(),
             conteudo=cta("dark", "Faça o diagnóstico gratuito e veja qual é.", com_foto=True)),
    ]


def carrossel_3():
    """Mecanismo · A Ruptura de Valor Percebido. Foto: só no fim."""
    L, D = TEMA["light"], TEMA["dark"]
    return [
        dict(tema="light", topo_logo=True, conteudo=(
            etiqueta("MECANISMO", L)
            + titulo("Existe uma distância entre o valor que você tem e o valor que o mercado enxerga.", 27)
            + distancia(L)
        )),
        dict(tema="dark", alinhamento="center", conteudo=(
            etiqueta("O NOME DISSO", D)
            + titulo("Ela tem nome:", 24, peso=400, mb=10)
            + titulo(ouro("Ruptura de Valor Percebido.", D), 36, peso=600, lh=1.1)
        )),
        dict(tema="light", conteudo=(
            etiqueta("POR QUE NADA FUNCIONA", L)
            + titulo("Enquanto ela existir, nenhuma tática resolve.", 32)
        )),
        dict(tema="dark", conteudo=(
            etiqueta("NEM ISSO", D)
            + titulo(f'{risco("Postar mais", D)} não resolve. {risco("Curso", D)} não resolve. '
                     f'{risco("Agência", D)} não resolve.', 28)
        )),
        dict(tema="light", conteudo=(
            etiqueta("O MOTIVO", L)
            + titulo(f'Porque tática em cima de percepção quebrada só produz {ouro("ruído", L)}.', 30)
        )),
        dict(tema="dark", conteudo=(
            etiqueta("O QUE RESOLVE", D)
            + titulo("O que resolve é fechar a distância, na ordem certa.", 27)
            + pilares(D)
        )),
        dict(tema="dark", ultimo=True, alinhamento="center",
             extras=brilho_final(),
             conteudo=cta("dark", "Meça a sua em 2 minutos.", com_foto=True)),
    ]


def carrossel_4():
    """Mecanismo · Técnico ou percebido. Foto: só no começo."""
    L, D = TEMA["light"], TEMA["dark"]
    return [
        dict(tema="light", topo_logo=True, conteudo=(
            f'<div style="margin-bottom:26px;">{foto(100)}</div>'
            + etiqueta("TÉCNICO OU PERCEBIDO", L)
            + titulo("Existem dois especialistas no mercado.", 32)
        )),
        dict(tema="dark", conteudo=(
            etiqueta("O TÉCNICO", D)
            + titulo("O técnico: sabe muito, estuda muito, tem certificado.", 29)
        )),
        dict(tema="light", conteudo=(
            etiqueta("E MESMO ASSIM", L)
            + titulo(f'E continua sendo {ouro("comparado por preço", L)}.', 32)
        )),
        dict(tema="dark", conteudo=(
            etiqueta("O PERCEBIDO", D)
            + titulo("O percebido: talvez saiba exatamente a mesma coisa.", 29)
        )),
        dict(tema="light", conteudo=(
            etiqueta("A DIFERENÇA APARECE AQUI", L)
            + titulo(f'Mas é {ouro("lembrado", L)}, é {ouro("indicado", L)}, '
                     f'é {ouro("valorizado", L)}.', 31)
        )),
        dict(tema="dark", conteudo=(
            etiqueta("NÃO É O QUE PARECE", D)
            + titulo(f'A diferença entre os dois {ouro("não é conhecimento", D)}.', 31)
        )),
        dict(tema="light", conteudo=(
            etiqueta("É ISTO", L)
            + titulo("É comunicação de valor. E isso se constrói.", 32)
        )),
        dict(tema="dark", ultimo=True, alinhamento="center",
             extras=brilho_final(),
             conteudo=cta("dark", "Descubra em qual você está hoje.", com_foto=False)),
    ]


def carrossel_5():
    """Autoridade · O que eu vi em quase 30 especialistas. Foto: começo e fim."""
    L, D = TEMA["light"], TEMA["dark"]
    return [
        dict(tema="light", topo_logo=True, conteudo=(
            f'<div style="margin-bottom:26px;">{foto(108)}</div>'
            + etiqueta("AUTORIDADE", L)
            + titulo("Já acompanhei quase 30 especialistas de perto.", 31)
        )),
        dict(tema="dark", conteudo=(
            etiqueta("QUEM SÃO", D)
            + titulo(f'Psicólogos, advogados, terapeutas, coaches. '
                     f'{ouro("Gente muito boa", D)}.', 28)
        )),
        dict(tema="light", conteudo=(
            etiqueta("O PADRÃO", L)
            + titulo(f'Todos com o mesmo padrão: {ouro("excelentes e invisíveis", L)}.', 30)
        )),
        dict(tema="dark", conteudo=(
            etiqueta("O DIAGNÓSTICO ERRADO", D)
            + titulo("E todos achando que o problema era falta de marketing.", 29)
        )),
        dict(tema="light", conteudo=(
            etiqueta("O QUE ERA DE VERDADE", L)
            + titulo("Não era. Era a distância entre o que sabiam e o que comunicavam.", 28)
        )),
        dict(tema="dark", conteudo=(
            etiqueta("POR ISSO O MMPV", D)
            + titulo("Foi para fechar essa distância que eu criei o MMPV.", 27)
            + pilares(D)
        )),
        dict(tema="dark", ultimo=True, alinhamento="center",
             extras=brilho_final(),
             conteudo=cta("dark", "Comece descobrindo o tamanho da sua. Diagnóstico gratuito.", com_foto=True)),
    ]


# ------------------------------------------------------------------ shell
PAGINA = """<!doctype html>
<html lang="pt-BR">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>__TITULO__ · Carrossel Luana Isse</title>
<style>
__FONTES__
*{box-sizing:border-box;}
html,body{margin:0;padding:0;}
body{background:#EFEAE3;font-family:'Montserrat',-apple-system,BlinkMacSystemFont,'Segoe UI',
Roboto,Arial,sans-serif;display:flex;justify-content:center;padding:28px 12px 44px;}
.serif{font-family:'Playfair Display','Iowan Old Style',Palatino,Georgia,serif;}
.sans{font-family:'Montserrat',-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Arial,sans-serif;}
.ig-frame{width:420px;max-width:100%;background:#fff;border-radius:14px;
box-shadow:0 2px 6px rgba(3,1,24,.06),0 20px 50px rgba(3,1,24,.12);overflow:hidden;}
.ig-header{display:flex;align-items:center;gap:11px;padding:12px 14px;}
.ig-avatar{width:34px;height:34px;border-radius:50%;object-fit:cover;flex:none;
border:2px solid #B49055;}
.ig-handle{font-size:13px;font-weight:600;color:#030118;line-height:1.25;}
.ig-sub{font-size:11px;color:#8A8378;line-height:1.25;}
.ig-more{margin-left:auto;color:#8A8378;font-size:17px;letter-spacing:1px;}
.carousel-viewport{width:420px;aspect-ratio:4/5;overflow:hidden;position:relative;
cursor:grab;user-select:none;background:#030118;}
.carousel-viewport.dragging{cursor:grabbing;}
.carousel-track{display:flex;height:100%;transition:transform .34s cubic-bezier(.22,.61,.36,1);
will-change:transform;}
.slide{flex:0 0 420px;width:420px;height:100%;position:relative;overflow:hidden;
display:flex;flex-direction:column;}
.slide img{-webkit-user-drag:none;user-drag:none;}
.ig-actions{display:flex;align-items:center;gap:15px;padding:11px 14px 4px;color:#030118;}
.ig-actions .spacer{flex:1;}
.ig-dots{display:flex;justify-content:center;gap:5px;padding:9px 0 2px;}
.ig-dot{width:6px;height:6px;border-radius:50%;background:#D6D0C6;transition:background .2s;}
.ig-dot.on{background:#B49055;}
.ig-caption{padding:2px 14px 16px;font-size:13px;line-height:1.5;color:#030118;}
.ig-caption b{font-weight:600;}
.ig-time{display:block;margin-top:8px;font-size:10px;letter-spacing:.6px;color:#9A9389;}
</style>
</head>
<body>
<div class="ig-frame">
  <div class="ig-header">
    <img class="ig-avatar" src="__AVATAR__" alt="Luana Isse">
    <div>
      <div class="ig-handle">luana.isse</div>
      <div class="ig-sub">__SUB__</div>
    </div>
    <div class="ig-more">&#8943;</div>
  </div>
  <div class="carousel-viewport" id="vp">
    <div class="carousel-track" id="track">__SLIDES__</div>
  </div>
  <div class="ig-actions">
    <svg width="23" height="23" viewBox="0 0 24 24" fill="none" stroke="currentColor"
      stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">
      <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1L12 21l7.7-7.6
      1.1-1a5.5 5.5 0 0 0 0-7.8z"/></svg>
    <svg width="23" height="23" viewBox="0 0 24 24" fill="none" stroke="currentColor"
      stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">
      <path d="M21 11.5a8.4 8.4 0 0 1-9 8.5 8.4 8.4 0 0 1-3.8-.9L3 21l1.9-5.2A8.4 8.4 0 0 1 4 11.5
      8.4 8.4 0 0 1 12.5 3 8.4 8.4 0 0 1 21 11.5z"/></svg>
    <svg width="23" height="23" viewBox="0 0 24 24" fill="none" stroke="currentColor"
      stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">
      <path d="M22 2 11 13"/><path d="M22 2l-7 20-4-9-9-4 20-7z"/></svg>
    <span class="spacer"></span>
    <svg width="23" height="23" viewBox="0 0 24 24" fill="none" stroke="currentColor"
      stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">
      <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>
  </div>
  <div class="ig-dots" id="dots">__DOTS__</div>
  <div class="ig-caption">
    <b>luana.isse</b> __LEGENDA__
    <span class="ig-time">HÁ 2 HORAS</span>
  </div>
</div>
<script>
(function () {
  var track = document.getElementById('track');
  var vp = document.getElementById('vp');
  var dots = Array.prototype.slice.call(document.querySelectorAll('.ig-dot'));
  var total = __TOTAL__, W = 420, idx = 0, x0 = null, dx = 0;

  function render(anim) {
    track.style.transition = anim ? '' : 'none';
    track.style.transform = 'translateX(' + (-idx * W + dx) + 'px)';
    dots.forEach(function (d, i) { d.classList.toggle('on', i === idx); });
  }
  function go(n) { idx = Math.max(0, Math.min(total - 1, n)); dx = 0; render(true); }

  vp.addEventListener('pointerdown', function (e) {
    x0 = e.clientX; dx = 0; vp.classList.add('dragging'); vp.setPointerCapture(e.pointerId);
  });
  vp.addEventListener('pointermove', function (e) {
    if (x0 === null) return;
    dx = e.clientX - x0;
    if ((idx === 0 && dx > 0) || (idx === total - 1 && dx < 0)) dx *= 0.32;
    render(false);
  });
  function solta() {
    if (x0 === null) return;
    var d = dx; x0 = null; vp.classList.remove('dragging');
    if (d < -55) go(idx + 1); else if (d > 55) go(idx - 1); else go(idx);
  }
  vp.addEventListener('pointerup', solta);
  vp.addEventListener('pointercancel', solta);
  document.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowRight') go(idx + 1);
    if (e.key === 'ArrowLeft') go(idx - 1);
  });
  render(true);
})();
</script>
</body>
</html>
"""


CARROSSEIS = [
    dict(
        n=1, slug="1-o-dia-do-especialista-invisivel",
        titulo="O dia do especialista invisível", eixo="Cena",
        foto="só no fim", slides=carrossel_1,
        legenda=("Não é falta de competência. Existe uma distância entre o valor que você tem "
                 "e o valor que o mercado enxerga, e ela pode ser medida. Diagnóstico gratuito "
                 "de 2 minutos no link."),
    ),
    dict(
        n=2, slug="2-as-frases-que-voce-ja-disse-pra-si-mesmo",
        titulo="As frases que você já disse pra si mesmo", eixo="Cena",
        foto="começo e fim", slides=carrossel_2,
        legenda=("Nenhuma dessas frases é o problema. Todas são sintoma da mesma coisa. "
                 "Descubra qual é no diagnóstico gratuito de 2 minutos."),
    ),
    dict(
        n=3, slug="3-a-ruptura-de-valor-percebido",
        titulo="A Ruptura de Valor Percebido", eixo="Mecanismo",
        foto="só no fim", slides=carrossel_3,
        legenda=("Existe um motivo pelo qual o mercado ainda ignora você, e não é marketing. "
                 "Chama-se Ruptura de Valor Percebido. Meça a sua em 2 minutos."),
    ),
    dict(
        n=4, slug="4-tecnico-ou-percebido",
        titulo="Técnico ou percebido", eixo="Mecanismo",
        foto="só no começo", slides=carrossel_4,
        legenda=("O técnico sabe muito e continua sendo comparado por preço. O percebido talvez "
                 "saiba o mesmo, mas é lembrado, indicado e valorizado. Descubra em qual você está."),
    ),
    dict(
        n=5, slug="5-o-que-eu-vi-em-quase-30-especialistas",
        titulo="O que eu vi em quase 30 especialistas", eixo="Autoridade",
        foto="começo e fim", slides=carrossel_5,
        legenda=("Quase 30 especialistas acompanhados de perto, todos com o mesmo padrão: "
                 "excelentes e invisíveis. Comece descobrindo o tamanho da sua ruptura."),
    ),
]


def montar(c):
    itens = c["slides"]()
    total = len(itens)
    html_slides = []
    for i, s in enumerate(itens):
        html_slides.append(slide(
            i, total,
            s["tema"],
            s["conteudo"],
            alinhamento=s.get("alinhamento", "flex-end"),
            topo_logo=s.get("topo_logo", False),
            extras=s.get("extras", ""),
            ultimo=s.get("ultimo", False),
        ))
    dots = "".join('<span class="ig-dot%s"></span>' % (" on" if i == 0 else "")
                   for i in range(total))
    pagina = PAGINA
    for chave, valor in [
        ("__FONTES__", FONTES),
        ("__TITULO__", c["titulo"]),
        ("__AVATAR__", IMG["foto"]),
        ("__SUB__", "%s · %s slides" % (c["eixo"], total)),
        ("__SLIDES__", "".join(html_slides)),
        ("__DOTS__", dots),
        ("__LEGENDA__", c["legenda"]),
        ("__TOTAL__", str(total)),
    ]:
        pagina = pagina.replace(chave, valor)
    return pagina, total


def main():
    print("Gerando carrosséis de largada · Luana Isse\n")
    resumo = []
    for c in CARROSSEIS:
        pagina, total = montar(c)
        destino = AQUI / ("carrossel-%s.html" % c["slug"])
        destino.write_text(pagina, encoding="utf-8")
        resumo.append((c["n"], c["titulo"], total, c["foto"], destino.name,
                       len(pagina.encode("utf-8"))))
        print("  %d. %-42s %d slides · foto %-16s %s" %
              (c["n"], c["titulo"], total, c["foto"], destino.name))
    print("\nTotal de slides: %d" % sum(r[2] for r in resumo))
    return resumo


if __name__ == "__main__":
    main()
