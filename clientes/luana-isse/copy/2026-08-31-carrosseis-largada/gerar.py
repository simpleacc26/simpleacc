#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Gera os 5 carrosséis de largada da Luana Isse em HTML autocontido.

Cada carrossel tem **até 4 cards** e um **sistema visual próprio**, para que os
cinco não pareçam a mesma peça repetida cinco vezes:

  1  Duas batidas     bege e escuro; cada card é a montagem em cima e o soco embaixo
  2  Fichas           fundo DOURADO com letra escura, alternando com fichas de citação
  3  O vão            verde petróleo do manual, com o vão medido virando gráfico
  4  Coluna dividida  vinho contra dourado, e a divisão anda de um lado para o outro
  5  Retrato          coluna editorial com filete dourado e a foto grande

Todos saem do mesmo manual de marca (enviado por ela em 20/08):
  #030118 escuro institucional · #441529 vinho · #491F13 marrom
  #B49055 dourado (principal) · #FFFFFF branco · #07292E verde petróleo
Tipografia: Montserrat no corpo (manual) e Playfair Display nos títulos,
substituta da Humble Nostalgia, que é paga e não temos o arquivo.
Fontes e imagens vão embutidas em base64: o HTML não depende de rede.
"""
import base64
from pathlib import Path

AQUI = Path(__file__).resolve().parent
ASSETS = AQUI / "assets"

# ---------------------------------------------------------------- paleta
GOLD       = "#B49055"   # dourado, cor principal do manual
GOLD_LIGHT = "#C9AC7E"   # dourado clareado ~20%, destaque sobre fundo escuro
GOLD_DEEP  = "#8A6E3F"   # dourado escurecido, filete sobre fundo dourado
INK        = "#030118"   # escuro institucional
WINE       = "#441529"   # vinho
WINE_DEEP  = "#2C0E1B"   # vinho escurecido ~35%, base do carrossel 4
PETROL     = "#07292E"   # verde petróleo
BEGE       = "#F5EFE4"   # off-white quente, nunca branco puro
BEGE_LINE  = "#E3D8C5"
CREAM      = "#F5EFE4"

HANDLE = "@luana.isse"
MARCA = "LUANA ISSE"

# O cromo (barra, seta, faixa da marca) se adapta ao fundo do card.
TONS = {
    "claro": dict(fg=INK, muted="#6E6555", tag=GOLD, rule=BEGE_LINE, logo="logo-escuro",
                  track="rgba(3,1,24,.10)", fill=GOLD, num="rgba(3,1,24,.32)",
                  seta_bg="rgba(3,1,24,.06)", seta="rgba(3,1,24,.26)"),
    "escuro": dict(fg=CREAM, muted="rgba(245,239,228,.58)", tag=GOLD_LIGHT,
                   rule="rgba(245,239,228,.14)", logo="logo-claro",
                   track="rgba(245,239,228,.14)", fill=GOLD_LIGHT, num="rgba(245,239,228,.40)",
                   seta_bg="rgba(245,239,228,.07)", seta="rgba(245,239,228,.34)"),
    "ouro": dict(fg=INK, muted="rgba(3,1,24,.62)", tag="rgba(3,1,24,.55)", rule=GOLD_DEEP,
                 logo="logo-escuro",
                 track="rgba(3,1,24,.20)", fill=INK, num="rgba(3,1,24,.46)",
                 seta_bg="rgba(3,1,24,.09)", seta="rgba(3,1,24,.38)"),
}


def tom(base, **ajustes):
    """Clona um tom trocando só o que muda. Serve para o carrossel ficar inteiro
    numa família de cor: o 3 troca o azul institucional por petróleo, e o 4 por
    vinho, para não ter três cores fortes brigando no mesmo card."""
    novo = dict(TONS[base])
    novo.update(ajustes)
    return novo


TONS["claro-petroleo"] = tom(
    "claro", fg=PETROL, muted="#5E6A68", logo="logo-petroleo",
    track="rgba(7,41,46,.13)", num="rgba(7,41,46,.36)",
    seta_bg="rgba(7,41,46,.06)", seta="rgba(7,41,46,.28)")
TONS["ouro-petroleo"] = tom(
    "ouro", fg=PETROL, muted="rgba(7,41,46,.66)", tag="rgba(7,41,46,.58)",
    logo="logo-petroleo", fill=PETROL,
    track="rgba(7,41,46,.22)", num="rgba(7,41,46,.48)",
    seta_bg="rgba(7,41,46,.09)", seta="rgba(7,41,46,.38)")
# O carrossel 4 anda em vinho e bege, sem dourado nenhum: vinho com dourado é
# combinação que o cliente vetou.
TONS["escuro-vinho"] = tom(
    "escuro", tag="rgba(245,239,228,.74)", fill=CREAM,
    rule="rgba(245,239,228,.16)")
TONS["bege-vinho"] = tom(
    "claro", fg=WINE, muted="rgba(68,21,41,.66)", tag="rgba(68,21,41,.62)",
    rule="rgba(68,21,41,.20)", logo="logo-vinho", fill=WINE,
    track="rgba(68,21,41,.18)", num="rgba(68,21,41,.46)",
    seta_bg="rgba(68,21,41,.08)", seta="rgba(68,21,41,.36)")


def b64(nome, mime):
    return "data:%s;base64,%s" % (mime, base64.b64encode((ASSETS / nome).read_bytes()).decode())


IMG = {
    "foto": b64("luana.jpg", "image/jpeg"),
    "logo-escuro": b64("logo-escuro.png", "image/png"),
    "logo-claro": b64("logo-claro.png", "image/png"),
    "logo-dourado": b64("logo-dourado.png", "image/png"),
    "logo-petroleo": b64("logo-petroleo.png", "image/png"),
    "logo-vinho": b64("logo-vinho.png", "image/png"),
}
FONTES = (ASSETS / "fonts" / "fontes-embutidas.css").read_text(encoding="utf-8")

# A foto tem 640x640 e o export multiplica por 2.57, então acima de 248px de
# largura de tela ela começa a amolecer. Nenhum uso aqui passa disso.
FOTO_MAX = 248


# ------------------------------------------------------------ cromo comum
def barra(i, total, tom):
    t = TONS[tom]
    pct = ((i + 1) / total) * 100
    return (
        '<div class="chrome" style="position:absolute;bottom:0;left:0;right:0;'
        'padding:16px 30px 22px;z-index:12;display:flex;align-items:center;gap:10px;">'
        f'<div style="flex:1;height:3px;background:{t["track"]};border-radius:2px;overflow:hidden;">'
        f'<div style="height:100%;width:{pct}%;background:{t["fill"]};border-radius:2px;"></div></div>'
        f'<span class="sans" style="font-size:11px;color:{t["num"]};font-weight:500;'
        f'letter-spacing:.3px;">{i + 1}/{total}</span></div>'
    )


def seta(tom):
    t = TONS[tom]
    return (
        '<div class="chrome" style="position:absolute;right:0;top:0;bottom:0;width:46px;z-index:11;'
        "display:flex;align-items:center;justify-content:center;"
        f'background:linear-gradient(to right,transparent,{t["seta_bg"]});">'
        '<svg width="24" height="24" viewBox="0 0 24 24" fill="none">'
        f'<path d="M9 6l6 6-6 6" stroke="{t["seta"]}" stroke-width="2.5" '
        'stroke-linecap="round" stroke-linejoin="round"/></svg></div>'
    )


def faixa_marca(tom, com_logo=False, topo=26, esq=32, dir_=32):
    """Assinatura no primeiro e no último card, caixa alta no meio."""
    t = TONS[tom]
    if com_logo:
        esquerda = (f'<img src="{IMG[t["logo"]]}" alt="{MARCA}" '
                    'style="height:19px;width:auto;display:block;opacity:.92;">')
    else:
        esquerda = (f'<span class="sans" style="font-size:10px;font-weight:600;'
                    f'letter-spacing:1.7px;color:{t["muted"]};">{MARCA}</span>')
    return (
        f'<div style="position:absolute;top:{topo}px;left:{esq}px;right:{dir_}px;z-index:10;'
        'display:flex;align-items:center;justify-content:space-between;gap:12px;">'
        f'{esquerda}'
        f'<span class="sans" style="font-size:10px;font-weight:500;letter-spacing:.6px;'
        f'color:{t["muted"]};">{HANDLE}</span></div>'
    )


def card(inner, tom, i, total, fundo, ultimo=False, tom_barra=None, tom_seta=None):
    """`tom` vale para o texto. A barra e a seta aceitam tom próprio, porque em
    alguns cards elas caem sobre uma faixa de cor diferente do resto do card."""
    return (
        f'<div class="slide" style="background:{fundo};color:{TONS[tom]["fg"]};">'
        f'{inner}'
        f'{"" if ultimo else seta(tom_seta or tom)}'
        f'{barra(i, total, tom_barra or tom)}'
        "</div>"
    )


# --------------------------------------------------------- peças de texto
def etiqueta(txt, tom, mb=16, cor=None):
    cor = cor or TONS[tom]["tag"]
    return (f'<span class="sans" style="display:block;font-size:10px;font-weight:600;'
            f'letter-spacing:2.2px;color:{cor};margin-bottom:{mb}px;">{txt}</span>')


def titulo(txt, size=32, peso=500, lh=1.14, cor="inherit", mb=0, ls=-.4):
    return (f'<h2 class="serif" style="font-size:{size}px;font-weight:{peso};line-height:{lh};'
            f'letter-spacing:{ls}px;color:{cor};margin:0 0 {mb}px;">{txt}</h2>')


def texto(txt, tom, size=15, mb=0, mt=0, cor=None, largura=320, lh=1.55, peso=400):
    cor = cor or TONS[tom]["muted"]
    return (f'<p class="sans" style="font-size:{size}px;line-height:{lh};font-weight:{peso};'
            f'color:{cor};margin:{mt}px 0 {mb}px;max-width:{largura}px;">{txt}</p>')


def filete(cor, largura=44, mt=20, mb=20, espessura=2):
    return (f'<div style="width:{largura}px;height:{espessura}px;background:{cor};'
            f'margin:{mt}px 0 {mb}px;border-radius:2px;"></div>')


def foto(px=110, borda=GOLD, raio="50%", espessura=2, extra=""):
    px = min(px, FOTO_MAX)
    return (f'<img src="{IMG["foto"]}" alt="Luana Isse" '
            f'style="width:{px}px;height:{px}px;border-radius:{raio};object-fit:cover;'
            f'border:{espessura}px solid {borda};display:block;{extra}">')


def botao(txt="Toque em Saiba Mais", fundo=BEGE, cor=INK):
    """A seta aponta para baixo porque é para lá que o leitor vai: o botão
    Saiba Mais do anúncio fica embaixo do criativo, não ao lado."""
    return (f'<div class="sans" style="display:inline-flex;align-items:center;gap:9px;'
            f'padding:13px 24px;background:{fundo};color:{cor};font-weight:600;font-size:14px;'
            'border-radius:28px;letter-spacing:.2px;">'
            f'{txt}<svg width="15" height="15" viewBox="0 0 24 24" fill="none">'
            f'<path d="M12 5v14M6 13l6 6 6-6" stroke="{cor}" stroke-width="2.2" '
            'stroke-linecap="round" stroke-linejoin="round"/></svg></div>')


def rodape_cta(tom, cor_tagline=None, mt=24, pt=18):
    t = TONS[tom]
    return (
        f'<div style="display:flex;align-items:center;gap:10px;margin-top:{mt}px;'
        f'padding-top:{pt}px;border-top:1px solid {t["rule"]};width:100%;">'
        f'<img src="{IMG[t["logo"]]}" alt="{MARCA}" style="height:18px;width:auto;opacity:.92;">'
        f'<span class="sans" style="font-size:10px;font-weight:600;letter-spacing:1.4px;'
        f'color:{cor_tagline or t["tag"]};margin-left:auto;">QUEM É VISTO, VENDE MAIS</span></div>'
    )


def caixa(inner, alinhamento="flex-end", pad="66px 32px 64px", z=5):
    return (f'<div style="position:relative;z-index:{z};flex:1;display:flex;'
            f'flex-direction:column;justify-content:{alinhamento};padding:{pad};">{inner}</div>')


def pilares_grade(tom, cor_num=None):
    """Os quatro pilares do MMPV, na formulação dela, em grade 2x2."""
    t = TONS[tom]
    cor_num = cor_num or t["tag"]
    celulas = "".join(
        f'<div style="display:flex;align-items:baseline;gap:9px;padding:8px 0;'
        f'border-top:1px solid {t["rule"]};">'
        f'<span class="serif" style="font-size:15px;font-weight:300;color:{cor_num};'
        f'line-height:1;">0{n}</span>'
        f'<span class="sans" style="font-size:12px;font-weight:600;">{nome}</span></div>'
        for n, nome in enumerate(["Mentalidade", "Movimento", "Posicionamento", "Vendas"], 1)
    )
    return ('<div style="display:grid;grid-template-columns:1fr 1fr;gap:0 20px;'
            f'margin-top:20px;max-width:320px;">{celulas}</div>')


def riscado(txt, cor):
    return (f'<span style="text-decoration:line-through;text-decoration-thickness:2px;'
            f'text-decoration-color:{cor};opacity:.7;">{txt}</span>')


# =====================================================================
# 1 · DUAS BATIDAS
# Cada card é a montagem em cima e o soco embaixo, separados por um filete
# dourado. O espaço vazio some porque o conteúdo ocupa o topo e a base.
# =====================================================================
def carrossel_1():
    def batida(tom, tag, montagem, soco, soco_size=34, logo=False, fundo=None):
        fundo = fundo or (BEGE if tom == "claro" else INK)
        t = TONS[tom]
        inner = (
            faixa_marca(tom, com_logo=logo)
            + caixa(
                '<div>'
                + etiqueta(tag, tom, mb=14)
                + texto(montagem, tom, size=18, largura=330, lh=1.5)
                + '</div>'
                + f'<div style="display:flex;align-items:center;gap:12px;margin:0;">'
                  f'<span style="width:7px;height:7px;border-radius:50%;background:{t["tag"]};'
                  'flex:none;"></span>'
                  f'<span style="flex:1;height:1px;background:{t["rule"]};"></span></div>'
                + f'<div>{titulo(soco, soco_size, peso=500, lh=1.1)}</div>',
                alinhamento="space-between",
                pad="78px 32px 68px",
            )
        )
        return inner, tom, fundo

    return [
        dict(**dict(zip(("inner", "tom", "fundo"), batida(
            "claro", "O DIA DO ESPECIALISTA INVISÍVEL",
            "Você acorda e vê que a sua colega de turma anunciou mais uma mentoria.",
            f'Você tem <span style="color:{GOLD}">duas pós a mais</span> que ela.',
            34, logo=True)))),
        dict(**dict(zip(("inner", "tom", "fundo"), batida(
            "escuro", "A ROTINA",
            "Escreve um conteúdo denso, com fundamento. Duas horas.",
            f'<span style="color:{GOLD_LIGHT}">Doze</span><br>curtidas.',
            56)))),
        dict(**dict(zip(("inner", "tom", "fundo"), batida(
            "claro", "O PENSAMENTO",
            "E aí vem o pensamento: talvez eu não sirva para isso.",
            f'<span style="color:{GOLD}">Serve.</span> O que falta não é competência.',
            33)))),
        dict(tom="escuro", fundo=INK, ultimo=True, inner=(
            faixa_marca("escuro")
            + '<div style="position:absolute;inset:0;z-index:0;'
              f'background:radial-gradient(118% 76% at 50% 110%, {GOLD}3d 0%, {GOLD_DEEP}1c 44%,'
              ' rgba(3,1,24,0) 76%);"></div>'
            + caixa(
                f'<div style="margin-bottom:26px;">{foto(96, GOLD)}</div>'
                + etiqueta("DIAGNÓSTICO GRATUITO", "escuro", mb=14)
                + titulo("Descubra em 2 minutos o que realmente está travando.", 29, lh=1.18)
                + f'<div style="margin-top:26px;">{botao()}</div>'
                + rodape_cta("escuro", mt=30),
                alinhamento="center", pad="72px 32px 70px",
            )
        )),
    ]


# =====================================================================
# 2 · FICHAS EM DOURADO
# Abre e fecha com o card inteiro em #B49055 e letra escura. No meio, duas
# fichas de citação por card sobre o escuro institucional.
# =====================================================================
def carrossel_2():
    def ficha(n, frase):
        return (
            f'<div style="padding:20px 20px 22px;border-radius:14px;'
            f'background:rgba(245,239,228,.045);border:1px solid rgba(180,144,85,.30);">'
            f'<span class="serif" style="display:block;font-size:14px;color:{GOLD_LIGHT};'
            f'letter-spacing:1.4px;margin-bottom:10px;">0{n}</span>'
            f'<p class="serif" style="font-size:23px;font-weight:400;font-style:italic;'
            f'line-height:1.28;letter-spacing:-.3px;margin:0;color:{CREAM};">'
            f'&ldquo;{frase}&rdquo;</p></div>'
        )

    def par(n1, f1, n2, f2, tag):
        return dict(tom="escuro", fundo=INK, inner=(
            faixa_marca("escuro")
            + caixa(
                etiqueta(tag, "escuro", mb=18)
                + f'<div style="display:flex;flex-direction:column;gap:14px;">'
                  f'{ficha(n1, f1)}{ficha(n2, f2)}</div>',
                alinhamento="center", pad="76px 32px 70px",
            )
        ))

    return [
        dict(tom="ouro", fundo=GOLD, inner=(
            faixa_marca("ouro", com_logo=True)
            + caixa(
                f'<div style="margin-bottom:26px;">{foto(104, INK, espessura=2)}</div>'
                + etiqueta("O QUE NINGUÉM FALA EM VOZ ALTA", "ouro", mb=16)
                + titulo("Quatro frases que quase todo especialista já disse pra si mesmo.",
                         31, peso=500, lh=1.13, cor=INK),
                alinhamento="flex-end", pad="76px 32px 70px",
            )
        )),
        par(1, "Se eu fosse mesmo excelente, já teriam me procurado.",
            2, "Não vou fazer dancinha para vender o que eu estudei anos.",
            "AS DUAS PRIMEIRAS"),
        par(3, "Meu público não está no Instagram.",
            4, "Depois eu organizo isso direito.",
            "E AS OUTRAS DUAS"),
        dict(tom="ouro", fundo=GOLD, ultimo=True, inner=(
            faixa_marca("ouro")
            + caixa(
                f'<div style="margin-bottom:18px;">{foto(70, INK, espessura=2)}</div>'
                + titulo("Nenhuma delas é o problema. Todas são sintoma do mesmo.",
                         26, peso=500, lh=1.15, cor=INK)
                + texto("Faça o diagnóstico gratuito e veja qual é.", "ouro",
                        size=14, mt=12, largura=340)
                + f'<div style="margin-top:18px;">{botao(fundo=INK, cor=BEGE)}</div>'
                + rodape_cta("ouro", cor_tagline="rgba(3,1,24,.55)", mt=26, pt=16),
                alinhamento="center", pad="64px 32px 62px",
            )
        )),
    ]


# =====================================================================
# 3 · O VÃO
# Verde petróleo do manual em vez do escuro, e uma faixa dourada no rodapé
# que carrega a frase-chave de cada card. O vão medido vira gráfico.
# =====================================================================
def faixa_ouro(conteudo, pad="22px 32px 58px"):
    return (f'<div style="position:absolute;left:0;right:0;bottom:0;z-index:6;'
            f'background:{GOLD};padding:{pad};">{conteudo}</div>')


def grafico_vao(tom):
    t = TONS[tom]
    ponto = "width:9px;height:9px;border-radius:50%;flex:none;"
    tracejado = (f'flex:1;height:1px;background:repeating-linear-gradient(to right,'
                 f'{t["tag"]} 0 5px,transparent 5px 11px);opacity:.6;')
    return (
        '<div style="margin-top:26px;">'
        '<div style="display:flex;align-items:center;gap:9px;">'
        f'<span style="{ponto}background:{t["tag"]};"></span>'
        f'<span style="{tracejado}"></span>'
        f'<span class="sans" style="font-size:9px;font-weight:600;letter-spacing:1.8px;'
        f'color:{t["tag"]};white-space:nowrap;">O VÃO</span>'
        f'<span style="{tracejado}"></span>'
        f'<span style="{ponto}background:{t["tag"]};opacity:.34;"></span></div>'
        '<div style="display:flex;justify-content:space-between;gap:14px;margin-top:9px;">'
        f'<span class="sans" style="font-size:11px;font-weight:600;color:{t["fg"]};'
        'max-width:150px;line-height:1.35;">o valor que você tem</span>'
        f'<span class="sans" style="font-size:11px;font-weight:500;color:{t["muted"]};'
        'max-width:150px;line-height:1.35;text-align:right;">o valor que o mercado enxerga</span>'
        '</div></div>'
    )


def carrossel_3():
    return [
        dict(tom="claro-petroleo", fundo=BEGE, tom_barra="ouro-petroleo", inner=(
            faixa_marca("claro-petroleo", com_logo=True)
            + caixa(
                etiqueta("MECANISMO", "claro-petroleo", mb=16)
                + titulo("Existe uma distância entre o valor que você tem e o valor "
                         "que o mercado enxerga.", 27, lh=1.16)
                + grafico_vao("claro-petroleo"),
                alinhamento="flex-end", pad="76px 32px 158px",
            )
            + faixa_ouro(
                etiqueta("O NOME DISSO", "ouro-petroleo", mb=10)
                + titulo("Ela tem nome: Ruptura de Valor Percebido.", 24, peso=600,
                         lh=1.18, cor=PETROL)
            )
        )),
        dict(tom="escuro", fundo=PETROL, inner=(
            faixa_marca("escuro")
            + caixa(
                '<div>'
                + etiqueta("POR QUE NADA FUNCIONA", "escuro", mb=14)
                + titulo("Enquanto ela existir, nenhuma tática resolve.", 31, lh=1.14)
                + '</div>'
                + '<div>'
                + titulo(f'{riscado("Postar mais", GOLD_LIGHT)} não resolve. '
                         f'{riscado("Curso", GOLD_LIGHT)} não resolve. '
                         f'{riscado("Agência", GOLD_LIGHT)} não resolve.',
                         25, peso=400, lh=1.28)
                + '</div>',
                alinhamento="space-between", pad="78px 32px 68px",
            )
        )),
        dict(tom="claro-petroleo", fundo=BEGE, tom_barra="ouro-petroleo", inner=(
            faixa_marca("claro-petroleo")
            + caixa(
                etiqueta("O MOTIVO", "claro-petroleo", mb=14)
                + titulo(f'Porque tática em cima de percepção quebrada só produz '
                         f'<span style="color:{GOLD}">ruído</span>.', 30, lh=1.15),
                alinhamento="flex-end", pad="76px 32px 240px",
            )
            + faixa_ouro(
                titulo("O que resolve é fechar a distância, na ordem certa.", 21,
                       peso=600, lh=1.2, cor=PETROL)
                + pilares_grade("ouro-petroleo", cor_num="rgba(7,41,46,.52)")
            )
        )),
        dict(tom="escuro", fundo=PETROL, ultimo=True, inner=(
            faixa_marca("escuro")
            + '<div style="position:absolute;inset:0;z-index:0;'
              f'background:radial-gradient(116% 74% at 50% 110%, {GOLD}42 0%, {GOLD_DEEP}1e 44%,'
              ' rgba(7,41,46,0) 76%);"></div>'
            + caixa(
                f'<div style="margin-bottom:26px;">{foto(96, GOLD)}</div>'
                + etiqueta("DIAGNÓSTICO GRATUITO", "escuro", mb=14)
                + titulo("Meça a sua em 2 minutos.", 32, lh=1.16)
                + f'<div style="margin-top:26px;">{botao()}</div>'
                + rodape_cta("escuro", mt=30),
                alinhamento="center", pad="72px 32px 70px",
            )
        )),
    ]


# =====================================================================
# 4 · COLUNA DIVIDIDA
# A tela é partida em vinho e dourado, e a divisão anda: 50/50 na abertura,
# depois cede para o técnico, depois para o percebido. Rodapé escuro fixo
# para a barra de progresso não cair em cima da emenda.
# =====================================================================
def divisao(pct_vinho):
    """Vinho de um lado, bege do outro. Sem dourado: vinho com dourado é
    combinação que o cliente vetou."""
    return ('<div style="position:absolute;inset:0;z-index:0;display:flex;">'
            f'<div style="width:{pct_vinho}%;background:{WINE};"></div>'
            f'<div style="flex:1;background:{BEGE};"></div></div>')


def rodape_vinho(altura=78):
    """Base do card, em vinho profundo, para a barra de progresso não cair em
    cima da emenda entre as duas metades."""
    return ('<div style="position:absolute;left:0;right:0;bottom:0;z-index:4;'
            f'height:{altura}px;background:{WINE_DEEP};"></div>')


def etiqueta_vertical(txt, cor, lado, px=15, topo=76):
    """Fica no alto de propósito: no meio da altura ela encosta no chevron da seta."""
    pos = "left:%dpx;" % px if lado == "esq" else "right:%dpx;" % px
    return (f'<div style="position:absolute;{pos}top:{topo}px;z-index:5;">'
            '<span class="sans" style="writing-mode:vertical-rl;transform:rotate(180deg);'
            f'font-size:9px;font-weight:600;letter-spacing:2.6px;color:{cor};">{txt}</span></div>')


def carrossel_4():
    return [
        dict(tom="escuro-vinho", fundo=WINE_DEEP, tom_seta="bege-vinho",
             tom_barra="escuro-vinho", inner=(
            divisao(50)
            + rodape_vinho(142)
            + '<div style="position:absolute;top:26px;left:32px;right:32px;z-index:10;'
              'display:flex;align-items:center;justify-content:space-between;gap:12px;">'
              f'<img src="{IMG["logo-claro"]}" alt="{MARCA}" '
              'style="height:19px;width:auto;display:block;opacity:.92;">'
              '<span class="sans" style="font-size:10px;font-weight:500;letter-spacing:.6px;'
              f'color:rgba(68,21,41,.72);">{HANDLE}</span></div>'
            + '<div style="position:absolute;left:32px;top:74px;z-index:5;">'
              '<span class="sans" style="font-size:10px;font-weight:600;letter-spacing:2.2px;'
              'color:rgba(245,239,228,.74);">O TÉCNICO</span></div>'
            + '<div style="position:absolute;right:56px;top:74px;z-index:5;text-align:right;">'
              '<span class="sans" style="font-size:10px;font-weight:600;letter-spacing:2.2px;'
              'color:rgba(68,21,41,.72);">O PERCEBIDO</span></div>'
            + '<div style="position:absolute;left:50%;top:168px;transform:translateX(-50%);'
              f'z-index:6;">{foto(112, WINE_DEEP, espessura=3)}</div>'
            + '<div style="position:absolute;left:32px;right:32px;bottom:56px;z-index:6;">'
            + titulo("Existem dois especialistas no mercado.", 29, lh=1.14, cor=CREAM)
            + '</div>'
        )),
        dict(tom="escuro-vinho", fundo=WINE_DEEP, tom_seta="bege-vinho",
             tom_barra="escuro-vinho", inner=(
            divisao(76)
            + rodape_vinho(78)
            # a metade bege começa em 76% de 420, ou seja x=319: a arroba tem que
            # terminar antes disso, senão sai em creme em cima do bege e some
            + faixa_marca("escuro-vinho", dir_=114)
            + etiqueta_vertical("PERCEBIDO", "rgba(68,21,41,.62)", "dir")
            + caixa(
                etiqueta("O TÉCNICO", "escuro-vinho", mb=16)
                + titulo("O técnico: sabe muito, estuda muito, tem certificado.", 27, lh=1.16)
                + filete(CREAM, largura=40, mt=22, mb=18)
                + titulo("E continua sendo comparado por preço.", 24, peso=400, lh=1.2,
                         cor="rgba(245,239,228,.84)"),
                alinhamento="flex-end", pad="78px 132px 96px 32px",
            )
        )),
        dict(tom="bege-vinho", fundo=WINE_DEEP, tom_seta="bege-vinho",
             tom_barra="escuro-vinho", inner=(
            divisao(24)
            + rodape_vinho(78)
            + '<div style="position:absolute;top:26px;left:120px;right:32px;z-index:10;'
              'display:flex;align-items:center;justify-content:space-between;gap:12px;">'
              '<span class="sans" style="font-size:10px;font-weight:600;letter-spacing:1.7px;'
              f'color:rgba(68,21,41,.7);">{MARCA}</span>'
              '<span class="sans" style="font-size:10px;font-weight:500;letter-spacing:.6px;'
              f'color:rgba(68,21,41,.7);">{HANDLE}</span></div>'
            + etiqueta_vertical("TÉCNICO", "rgba(245,239,228,.62)", "esq")
            + caixa(
                etiqueta("O PERCEBIDO", "bege-vinho", mb=16)
                + titulo("O percebido: talvez saiba exatamente a mesma coisa.", 27, lh=1.16,
                         cor=WINE)
                + filete(WINE, largura=40, mt=22, mb=18)
                + titulo("Mas é lembrado, é indicado, é valorizado.", 24, peso=500, lh=1.2,
                         cor=WINE),
                alinhamento="flex-end", pad="78px 56px 96px 128px",
            )
        )),
        dict(tom="escuro-vinho", fundo=WINE_DEEP, ultimo=True, inner=(
            faixa_marca("escuro-vinho")
            + '<div style="position:absolute;inset:0;z-index:0;display:flex;">'
              f'<div style="width:50%;background:linear-gradient(to bottom,{WINE}00 62%,'
              f'{WINE}5e 100%);"></div>'
              f'<div style="flex:1;background:linear-gradient(to bottom,{BEGE}00 62%,'
              f'{BEGE}14 100%);"></div></div>'
            + caixa(
                etiqueta("A DIFERENÇA", "escuro-vinho", mb=14)
                # o destaque aqui é de opacidade, não de cor: dourado está vetado
                # junto do vinho, e cor nova fora do manual não entra
                + titulo('<span style="opacity:.72">A diferença entre os dois não é '
                         'conhecimento.</span> É comunicação de valor. '
                         '<span style="opacity:.72">E isso se constrói.</span>',
                         27, lh=1.18)
                + texto("Descubra em qual você está hoje.", "escuro-vinho", size=15, mt=16,
                        largura=290)
                + f'<div style="margin-top:22px;">{botao(fundo=BEGE, cor=WINE_DEEP)}</div>'
                + rodape_cta("escuro-vinho", mt=30),
                alinhamento="center", pad="74px 32px 70px",
            )
        )),
    ]


# =====================================================================
# 5 · RETRATO
# Coluna editorial: filete dourado na margem, o tema correndo na vertical
# ao lado dele e a foto grande. É o carrossel de autoridade, então é o
# único em que o rosto dela domina.
# =====================================================================
def coluna(tom, kicker):
    t = TONS[tom]
    return (
        f'<div style="position:absolute;left:32px;top:62px;bottom:64px;width:2px;'
        f'background:{GOLD};z-index:3;opacity:.85;"></div>'
        '<div style="position:absolute;left:19px;bottom:70px;z-index:4;">'
        '<span class="sans" style="writing-mode:vertical-rl;transform:rotate(180deg);'
        f'font-size:9px;font-weight:600;letter-spacing:2.4px;color:{t["muted"]};">'
        f'{kicker}</span></div>'
    )


def carrossel_5():
    KICKER = "O QUE EU VI EM QUASE 30 ESPECIALISTAS"
    return [
        dict(tom="escuro", fundo=INK, inner=(
            faixa_marca("escuro", com_logo=True, esq=62)
            + coluna("escuro", KICKER)
            + caixa(
                f'<div style="align-self:flex-end;margin-right:14px;">'
                f'{foto(222, GOLD, raio="12px")}</div>'
                + '<div>'
                + etiqueta("AUTORIDADE", "escuro", mb=14)
                + titulo("Já acompanhei quase 30 especialistas de perto.", 29, lh=1.14)
                + texto("Psicólogos, advogados, terapeutas, coaches. Gente muito boa.",
                        "escuro", size=15, mt=14, largura=300)
                + '</div>',
                alinhamento="space-between", pad="72px 32px 66px 62px",
            )
        )),
        dict(tom="claro", fundo=BEGE, inner=(
            faixa_marca("claro", esq=62)
            + coluna("claro", KICKER)
            + caixa(
                etiqueta("O PADRÃO", "claro", mb=0)
                + '<div>'
                + titulo("Todos com o mesmo padrão: "
                         f'<span style="color:{GOLD}">excelentes e invisíveis</span>.',
                         30, lh=1.15)
                + filete(GOLD, largura=40, mt=22, mb=18)
                + titulo("E todos achando que o problema era falta de marketing.", 23,
                         peso=400, lh=1.24, cor="#4C4638")
                + '</div>',
                alinhamento="space-between", pad="78px 32px 68px 62px",
            )
        )),
        dict(tom="escuro", fundo=INK, inner=(
            faixa_marca("escuro", esq=62)
            + coluna("escuro", KICKER)
            + caixa(
                '<div>'
                + etiqueta("O QUE ERA DE VERDADE", "escuro", mb=14)
                + titulo("Não era. Era a distância entre o que sabiam e o que comunicavam.",
                         27, lh=1.16)
                + '</div>'
                + '<div>'
                + titulo("Foi para fechar essa distância que eu criei o "
                         f'<span style="color:{GOLD_LIGHT}">MMPV</span>.', 24, peso=400,
                         lh=1.22)
                + pilares_grade("escuro")
                + '</div>',
                alinhamento="space-between", pad="78px 32px 66px 62px",
            )
        )),
        dict(tom="escuro", fundo=INK, ultimo=True, inner=(
            faixa_marca("escuro", esq=62)
            + coluna("escuro", KICKER)
            + '<div style="position:absolute;inset:0;z-index:0;'
              f'background:radial-gradient(118% 76% at 62% 108%, {GOLD}3d 0%, {GOLD_DEEP}1c 44%,'
              ' rgba(3,1,24,0) 76%);"></div>'
            + caixa(
                f'<div style="margin-bottom:24px;">{foto(100, GOLD)}</div>'
                + etiqueta("DIAGNÓSTICO GRATUITO", "escuro", mb=14)
                + titulo("Comece descobrindo o tamanho da sua.", 29, lh=1.16)
                + f'<div style="margin-top:24px;">{botao()}</div>'
                + rodape_cta("escuro", mt=30),
                alinhamento="center", pad="72px 32px 70px 62px",
            )
        )),
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
    dict(n=1, slug="1-o-dia-do-especialista-invisivel",
         titulo="O dia do especialista invisível", eixo="Cena",
         sistema="Duas batidas · bege e escuro", foto="só no fim", slides=carrossel_1,
         legenda=("Não é falta de competência. Existe uma distância entre o valor que você tem "
                  "e o valor que o mercado enxerga, e ela pode ser medida. Diagnóstico gratuito "
                  "de 2 minutos no link.")),
    dict(n=2, slug="2-as-frases-que-voce-ja-disse-pra-si-mesmo",
         titulo="As frases que você já disse pra si mesmo", eixo="Cena",
         sistema="Fichas · fundo dourado", foto="começo e fim", slides=carrossel_2,
         legenda=("Nenhuma dessas frases é o problema. Todas são sintoma da mesma coisa. "
                  "Descubra qual é no diagnóstico gratuito de 2 minutos.")),
    dict(n=3, slug="3-a-ruptura-de-valor-percebido",
         titulo="A Ruptura de Valor Percebido", eixo="Mecanismo",
         sistema="O vão · petróleo e faixa dourada", foto="só no fim", slides=carrossel_3,
         legenda=("Existe um motivo pelo qual o mercado ainda ignora você, e não é marketing. "
                  "Chama-se Ruptura de Valor Percebido. Meça a sua em 2 minutos.")),
    dict(n=4, slug="4-tecnico-ou-percebido",
         titulo="Técnico ou percebido", eixo="Mecanismo",
         sistema="Coluna dividida · vinho e bege", foto="só no começo", slides=carrossel_4,
         legenda=("O técnico sabe muito e continua sendo comparado por preço. O percebido talvez "
                  "saiba o mesmo, mas é lembrado, indicado e valorizado. Descubra em qual "
                  "você está.")),
    dict(n=5, slug="5-o-que-eu-vi-em-quase-30-especialistas",
         titulo="O que eu vi em quase 30 especialistas", eixo="Autoridade",
         sistema="Retrato · coluna editorial", foto="começo e fim", slides=carrossel_5,
         legenda=("Quase 30 especialistas acompanhados de perto, todos com o mesmo padrão: "
                  "excelentes e invisíveis. Comece descobrindo o tamanho da sua ruptura.")),
]


def montar(c):
    itens = c["slides"]()
    total = len(itens)
    assert total <= 4, "%s tem %d cards; o limite é 4" % (c["slug"], total)
    html_slides = [
        card(s["inner"], s["tom"], i, total, s["fundo"],
             ultimo=s.get("ultimo", False),
             tom_barra=s.get("tom_barra"), tom_seta=s.get("tom_seta"))
        for i, s in enumerate(itens)
    ]
    dots = "".join('<span class="ig-dot%s"></span>' % (" on" if i == 0 else "")
                   for i in range(total))
    pagina = PAGINA
    for chave, valor in [
        ("__FONTES__", FONTES),
        ("__TITULO__", c["titulo"]),
        ("__AVATAR__", IMG["foto"]),
        ("__SUB__", "%s · %d cards" % (c["eixo"], total)),
        ("__SLIDES__", "".join(html_slides)),
        ("__DOTS__", dots),
        ("__LEGENDA__", c["legenda"]),
        ("__TOTAL__", str(total)),
    ]:
        pagina = pagina.replace(chave, valor)
    return pagina, total


def main():
    print("Gerando carrosséis de largada · Luana Isse\n")
    total_cards = 0
    for c in CARROSSEIS:
        pagina, total = montar(c)
        destino = AQUI / ("carrossel-%s.html" % c["slug"])
        destino.write_text(pagina, encoding="utf-8")
        total_cards += total
        print("  %d. %-42s %d cards · %-34s foto %s" %
              (c["n"], c["titulo"], total, c["sistema"], c["foto"]))
    print("\nTotal de cards: %d" % total_cards)


if __name__ == "__main__":
    main()
