#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Gerador dos PDFs do 1o checkpoint da Stella Grutzmann (Simple Acc).

Identidade visual "editorial clara" (mesma linha do checkpoint do Romulo, 29/06):
  - fundo branco
  - painel de capa azul-marinho  #142338
  - titulos em serifa display  (Gloock)
  - corpo em serifa            (Lora)
  - rotulos / eyebrows em caixa-alta espacada  (Work Sans), azul  #3F5E86

Regra editorial: NAO usar travessao (—) em nenhum texto.

Produz dois arquivos na mesma pasta:
  1. Pauta_Call_Stella_Grutzmann.pdf  -> pauta de conducao (uso interno)
  2. Checkpoint_Stella_Grutzmann.pdf  -> documento de registro para a cliente

Uso:  python3 gerar_pdfs.py
"""

import os
from reportlab.lib.pagesizes import A4
from reportlab.lib.units import mm
from reportlab.lib.enums import TA_LEFT, TA_CENTER, TA_JUSTIFY
from reportlab.lib.colors import HexColor
from reportlab.lib.styles import ParagraphStyle
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.platypus import (
    BaseDocTemplate, PageTemplate, Frame, Paragraph, Spacer, Table, TableStyle,
    NextPageTemplate, PageBreak, Flowable,
)

# ------------------------------------------------------------- fontes -------
FDIR = "/mnt/skills/examples/canvas-design/canvas-fonts"
LIB = "/usr/share/fonts/truetype/liberation"

DISP, BODY, BODY_B, BODY_I, BODY_BI, UI, UI_B = (
    "Gloock", "Lora", "Lora-B", "Lora-I", "Lora-BI", "Work", "Work-B")
try:
    pdfmetrics.registerFont(TTFont(DISP, f"{FDIR}/Gloock-Regular.ttf"))
    pdfmetrics.registerFont(TTFont(BODY, f"{FDIR}/Lora-Regular.ttf"))
    pdfmetrics.registerFont(TTFont(BODY_B, f"{FDIR}/Lora-Bold.ttf"))
    pdfmetrics.registerFont(TTFont(BODY_I, f"{FDIR}/Lora-Italic.ttf"))
    pdfmetrics.registerFont(TTFont(BODY_BI, f"{FDIR}/Lora-BoldItalic.ttf"))
    pdfmetrics.registerFont(TTFont(UI, f"{FDIR}/WorkSans-Regular.ttf"))
    pdfmetrics.registerFont(TTFont(UI_B, f"{FDIR}/WorkSans-Bold.ttf"))
    pdfmetrics.registerFontFamily(
        BODY, normal=BODY, bold=BODY_B, italic=BODY_I, boldItalic=BODY_BI)
except Exception:
    DISP, BODY, BODY_B, BODY_I, BODY_BI, UI, UI_B = (
        "Times-Bold", "Times-Roman", "Times-Bold", "Times-Italic",
        "Times-BoldItalic", "Helvetica", "Helvetica-Bold")

# ------------------------------------------------------------- paleta -------
NAVY     = HexColor("#142338")   # painel de capa / pull-quote
NAVY2    = HexColor("#1D3252")   # topo do painel (leve variacao)
INK      = HexColor("#1B2A44")   # titulos serifados
ACCENT   = HexColor("#3F5E86")   # azul dos eyebrows / marcadores
BODYCLR  = HexColor("#343A42")   # texto corrido
MUTE     = HexColor("#8B94A2")   # cabecalho / rodape / secundario
SOFT     = HexColor("#5B6472")   # corpo dos cards
HAIR     = HexColor("#E3E7EC")   # divisorias / bordas
CALL_BG  = HexColor("#EDF1F7")   # fundo do callout
PANEL_HL = HexColor("#9DB4D6")   # destaque dentro do painel navy
PANEL_TX = HexColor("#D7DEEA")   # texto claro dentro do painel
WHITE    = HexColor("#FFFFFF")

PAGE_W, PAGE_H = A4
MARGIN = 50
CW = PAGE_W - 2 * MARGIN
HERE = os.path.dirname(os.path.abspath(__file__))


def hx(c):
    return "#" + c.hexval()[2:]


# ------------------------------------------------------------- estilos ------
def mk(name, **kw):
    base = dict(fontName=BODY, textColor=BODYCLR, fontSize=11, leading=16.5)
    base.update(kw)
    return ParagraphStyle(name, **base)


S = {
    "body":  mk("body", alignment=TA_JUSTIFY),
    "bodyl": mk("bodyl"),
    "bullet": mk("bullet", leading=16, leftIndent=15, bulletIndent=0),
    "muted_i": mk("muted_i", fontName=BODY_I, textColor=MUTE, fontSize=10.5,
                  leading=15.5),
    "card_t": mk("card_t", fontName=DISP, textColor=INK, fontSize=15,
                 leading=18),
    "card_b": mk("card_b", textColor=SOFT, fontSize=9.5, leading=13.5),
    "call_b": mk("call_b", textColor=INK, fontSize=10.5, leading=15.5),
    "pull":  mk("pull", fontName=BODY_BI, textColor=WHITE, fontSize=15,
                leading=22),
    "th":    mk("th", fontName=UI_B, textColor=ACCENT, fontSize=8, leading=11),
    "td":    mk("td", fontSize=9.5, leading=13.5, textColor=BODYCLR),
    "td_b":  mk("td_b", fontName=BODY_B, fontSize=9.5, leading=13.5,
                textColor=INK),
    "spec_v": mk("spec_v", fontSize=10, leading=14),
    "chk":   mk("chk", fontSize=10.5, leading=15, textColor=BODYCLR),
}


# ----------------------------------------------------------- utilitarios ----
def caps(c, x, y, text, size, color, font=UI_B, tr=1.6, align="l", box=None):
    """Desenha caixa-alta com espacamento (tracking)."""
    c.setFillColor(color)
    c.setFont(font, size)
    c._charSpace = tr
    w = pdfmetrics.stringWidth(text, font, size) + tr * max(0, len(text) - 1)
    if align == "c":
        x = x - w / 2
    elif align == "r":
        x = x - w
    c.drawString(x, y, text)
    c._charSpace = 0
    return w


# ----------------------------------------------------------- flowables ------
class Eyebrow(Flowable):
    """Rotulo de secao: '01 · ONDE ESTAMOS' em caps azul."""
    def __init__(self, text):
        super().__init__()
        self.text = text.upper()

    def wrap(self, aw, ah):
        return (CW, 12)

    def draw(self):
        caps(self.canv, 0, 2, self.text, 8.5, ACCENT, tr=1.8)


class SubEyebrow(Flowable):
    def __init__(self, text):
        super().__init__()
        self.text = text.upper()

    def wrap(self, aw, ah):
        return (CW, 12)

    def draw(self):
        caps(self.canv, 0, 1, self.text, 8.5, ACCENT, tr=1.6)


class Title(Flowable):
    """Titulo serifado grande (display)."""
    def __init__(self, text, size=30):
        super().__init__()
        self.para = Paragraph(
            text, ParagraphStyle("t", fontName=DISP, textColor=INK,
                                 fontSize=size, leading=size * 1.12))

    def wrap(self, aw, ah):
        w, h = self.para.wrap(CW, ah)
        self._h = h
        return (CW, h)

    def draw(self):
        self.para.drawOn(self.canv, 0, 0)


class HRule(Flowable):
    def __init__(self, width=CW, color=HAIR, t=0.6):
        super().__init__()
        self.width, self.color, self.t = width, color, t

    def wrap(self, aw, ah):
        return (self.width, self.t + 2)

    def draw(self):
        self.canv.setStrokeColor(self.color)
        self.canv.setLineWidth(self.t)
        self.canv.line(0, 1, self.width, 1)


def bullets(items):
    out = []
    for it in items:
        out.append(Paragraph(
            f'<font color="{hx(ACCENT)}">&#8226;</font>&nbsp;&nbsp;{it}',
            S["bullet"]))
        out.append(Spacer(1, 5))
    return out


class Cards(Flowable):
    """Tres cards em linha: (eyebrow, titulo, corpo)."""
    def __init__(self, items, gap=16):
        super().__init__()
        self.items = items
        self.gap = gap
        self.cw = (CW - gap * (len(items) - 1)) / len(items)
        self.pad = 12

    def wrap(self, aw, ah):
        inner = self.cw - self.pad * 2
        self._parts = []
        maxh = 0
        for eb, tt, bd in self.items:
            tp = Paragraph(tt, S["card_t"])
            bp = Paragraph(bd, S["card_b"])
            tw, th = tp.wrap(inner, 999)
            bw, bh = bp.wrap(inner, 999)
            h = self.pad + 12 + 8 + th + 6 + bh + self.pad
            maxh = max(maxh, h)
            self._parts.append((tp, th, bp, bh))
        self._h = maxh
        return (CW, maxh)

    def draw(self):
        c = self.canv
        x = 0
        inner = self.cw - self.pad * 2
        for (eb, tt, bd), (tp, th, bp, bh) in zip(self.items, self._parts):
            c.setStrokeColor(HAIR)
            c.setLineWidth(0.8)
            c.roundRect(x, 0, self.cw, self._h, 4, fill=0, stroke=1)
            caps(c, x + self.pad, self._h - self.pad - 8, eb.upper(), 7.5,
                 ACCENT, tr=1.4)
            ty = self._h - self.pad - 8 - 12 - th
            tp.drawOn(c, x + self.pad, ty)
            bp.drawOn(c, x + self.pad, ty - 6 - bh)
            x += self.cw + self.gap


class Callout(Flowable):
    def __init__(self, eyebrow, body, pad=13):
        super().__init__()
        self.eyebrow = eyebrow.upper()
        self.body = Paragraph(body, S["call_b"])
        self.pad = pad

    def wrap(self, aw, ah):
        inner = CW - self.pad * 2 - 6
        w, h = self.body.wrap(inner, 999)
        self._bh = h
        self._h = self.pad + 11 + 7 + h + self.pad
        return (CW, self._h)

    def draw(self):
        c = self.canv
        c.setFillColor(CALL_BG)
        c.roundRect(0, 0, CW, self._h, 4, fill=1, stroke=0)
        c.setFillColor(ACCENT)
        c.rect(0, 0, 3, self._h, fill=1, stroke=0)
        caps(c, self.pad + 6, self._h - self.pad - 8, self.eyebrow, 8, ACCENT,
             tr=1.5)
        self.body.drawOn(c, self.pad + 6, self.pad)


class PullQuote(Flowable):
    def __init__(self, html, pad=20):
        super().__init__()
        self.para = Paragraph(html, S["pull"])
        self.pad = pad

    def wrap(self, aw, ah):
        w, h = self.para.wrap(CW - self.pad * 2, 999)
        self._h = h + self.pad * 2
        return (CW, self._h)

    def draw(self):
        c = self.canv
        c.setFillColor(NAVY)
        c.roundRect(0, 0, CW, self._h, 6, fill=1, stroke=0)
        self.para.drawOn(c, self.pad, self.pad)


class Check(Flowable):
    """Item de checklist com quadradinho."""
    def __init__(self, lead, rest="", pad=7):
        super().__init__()
        txt = f'<font name="{BODY_B}" color="{hx(INK)}">{lead}</font>'
        if rest:
            txt += f' {rest}'
        self.para = Paragraph(txt, ParagraphStyle(
            "c", parent=S["chk"], leftIndent=24))
        self.pad = pad

    def wrap(self, aw, ah):
        w, h = self.para.wrap(CW, 999)
        self._h = h + self.pad * 2
        return (CW, self._h)

    def draw(self):
        c = self.canv
        self.para.drawOn(c, 0, self.pad)
        c.setStrokeColor(ACCENT)
        c.setLineWidth(1.2)
        c.rect(1, self._h - self.pad - 11, 11, 11, fill=0, stroke=1)
        c.setStrokeColor(HAIR)
        c.setLineWidth(0.6)
        c.line(0, 0, CW, 0)


def spec_table(pairs):
    data = [[Paragraph(k.upper(), S["th"]), Paragraph(v, S["spec_v"])]
            for k, v in pairs]
    t = Table(data, colWidths=[CW * 0.24, CW * 0.76])
    t.setStyle(TableStyle([
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
        ("LEFTPADDING", (0, 0), (-1, -1), 0),
        ("RIGHTPADDING", (0, 0), (-1, -1), 6),
        ("TOPPADDING", (0, 0), (-1, -1), 7),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 7),
        ("LINEBELOW", (0, 0), (-1, -1), 0.6, HAIR),
    ]))
    return t


def light_table(header, rows, widths, first_bold=True):
    data = [[Paragraph(h, S["th"]) for h in header]]
    for r in rows:
        row = []
        for i, cell in enumerate(r):
            row.append(Paragraph(cell, S["td_b"] if (i == 0 and first_bold)
                                 else S["td"]))
        data.append(row)
    t = Table(data, colWidths=widths, repeatRows=1)
    t.setStyle(TableStyle([
        ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
        ("LEFTPADDING", (0, 0), (-1, -1), 2),
        ("RIGHTPADDING", (0, 0), (-1, -1), 8),
        ("TOPPADDING", (0, 0), (0, 0), 0),
        ("BOTTOMPADDING", (0, 0), (-1, 0), 7),
        ("TOPPADDING", (0, 1), (-1, -1), 8),
        ("BOTTOMPADDING", (0, 1), (-1, -1), 8),
        ("LINEBELOW", (0, 0), (-1, 0), 1.1, ACCENT),
        ("LINEBELOW", (0, 1), (-1, -2), 0.6, HAIR),
    ]))
    return t


def sec(number, eyebrow, title, size=29):
    return [Eyebrow(f"{number} · {eyebrow}"), Spacer(1, 7),
            Title(title, size), Spacer(1, 12)]


# ------------------------------------------------------------ documento -----
class Doc(BaseDocTemplate):
    def __init__(self, filename, cover, header_r, foot_l, foot_r):
        super().__init__(filename, pagesize=A4,
                         leftMargin=MARGIN, rightMargin=MARGIN,
                         topMargin=MARGIN + 6, bottomMargin=MARGIN)
        self.cover = cover
        self.header_r = header_r
        self.foot_l = foot_l
        self.foot_r = foot_r
        body = Frame(MARGIN, MARGIN, CW, PAGE_H - 2 * MARGIN - 6, id="b",
                     leftPadding=0, rightPadding=0, topPadding=0, bottomPadding=0)
        cov = Frame(MARGIN, MARGIN, CW, PAGE_H - 2 * MARGIN, id="c",
                    leftPadding=0, rightPadding=0, topPadding=0, bottomPadding=0)
        self.addPageTemplates([
            PageTemplate(id="cover", frames=[cov], onPage=self._cover),
            PageTemplate(id="body", frames=[body], onPage=self._chrome),
        ])

    def _chrome(self, c, doc):
        c.setFillColor(WHITE)
        c.rect(0, 0, PAGE_W, PAGE_H, fill=1, stroke=0)
        caps(c, MARGIN, PAGE_H - MARGIN + 8, "SIMPLE ACC", 7.5, MUTE, tr=2.2)
        caps(c, PAGE_W - MARGIN, PAGE_H - MARGIN + 8, self.header_r, 7.5, MUTE,
             tr=2.0, align="r")
        c.setStrokeColor(HAIR)
        c.setLineWidth(0.6)
        c.line(MARGIN, MARGIN - 10, PAGE_W - MARGIN, MARGIN - 10)
        caps(c, MARGIN, MARGIN - 22, self.foot_l, 7, MUTE, tr=1.8)
        caps(c, PAGE_W - MARGIN, MARGIN - 22, self.foot_r, 7, MUTE, tr=1.8,
             align="r")

    def _cover(self, c, doc):
        d = self.cover
        c.setFillColor(WHITE)
        c.rect(0, 0, PAGE_W, PAGE_H, fill=1, stroke=0)
        caps(c, MARGIN, PAGE_H - MARGIN + 8, "SIMPLE ACC", 7.5, MUTE, tr=2.2)
        caps(c, PAGE_W - MARGIN, PAGE_H - MARGIN + 8, self.header_r, 7.5, MUTE,
             tr=2.0, align="r")
        caps(c, MARGIN, MARGIN - 22, self.foot_l, 7, MUTE, tr=1.8)
        caps(c, PAGE_W - MARGIN, MARGIN - 22, self.foot_r, 7, MUTE, tr=1.8,
             align="r")

        px, pw = MARGIN, CW
        ptop = PAGE_H - MARGIN - 22
        pbot = PAGE_H * 0.40
        ph = ptop - pbot
        c.setFillColor(NAVY)
        c.roundRect(px, pbot, pw, ph, 8, fill=1, stroke=0)
        cx = PAGE_W / 2

        caps(c, px + 22, ptop - 26, d["tag_l"], 7.5, PANEL_HL, tr=1.8)
        caps(c, px + pw - 22, ptop - 26, d["tag_r"], 7.5, PANEL_HL, tr=1.8,
             align="r")

        # medir o subtitulo e a altura total do bloco central
        sub = Paragraph(
            d["subtitle"],
            ParagraphStyle("s", fontName=BODY_I, textColor=PANEL_TX,
                           fontSize=12.5, leading=18, alignment=TA_CENTER))
        sw, sh = sub.wrap(pw * 0.74, 999)
        n_title = len(d["title"])

        g_wm_eb, g_eb_rule, g_rule_t = 26, 15, 34
        g_t_sub, g_sub_name, g_name_sc = 28, 28, 14
        h_wm, h_eb, h_title, h_name, h_sc = 22, 12, 42, 14, 10
        block_h = (h_wm + g_wm_eb + h_eb + g_eb_rule + g_rule_t
                   + h_title * n_title + g_t_sub + sh + g_sub_name
                   + h_name + g_name_sc + h_sc)

        region_top = ptop - 48
        region_bot = pbot + 56          # acima da linha de meta
        cur = (region_top + region_bot) / 2 + block_h / 2

        caps(c, cx, cur - 16, "SIMPLE ACC", 20, WHITE, font=DISP, tr=6,
             align="c")
        cur -= h_wm + g_wm_eb
        caps(c, cx, cur - 9, d["eyebrow"], 9, PANEL_HL, tr=3, align="c")
        cur -= h_eb + g_eb_rule
        c.setStrokeColor(PANEL_HL)
        c.setLineWidth(1)
        c.line(cx - 26, cur, cx + 26, cur)
        cur -= g_rule_t
        c.setFillColor(WHITE)
        c.setFont(DISP, 38)
        for line in d["title"]:
            c.drawCentredString(cx, cur - 30, line)
            cur -= h_title
        cur -= g_t_sub
        sub.drawOn(c, cx - sw / 2, cur - sh)
        cur -= sh + g_sub_name
        caps(c, cx, cur - 10, d["name"], 10.5, WHITE, tr=3, align="c")
        cur -= h_name + g_name_sc
        caps(c, cx, cur - 8, d["sub_caps"], 7.5, PANEL_HL, tr=2, align="c")

        caps(c, cx, pbot + 28, d["meta"], 8, PANEL_HL, tr=2, align="c")


def start(doc_flow):
    doc_flow.append(NextPageTemplate("body"))
    doc_flow.append(PageBreak())


# ================================================================ PAUTA =====
def build_pauta():
    doc = Doc(
        os.path.join(HERE, "Pauta_Call_Stella_Grutzmann.pdf"),
        cover=dict(
            tag_l="PAUTA DE CONDUÇÃO", tag_r="USO INTERNO",
            eyebrow="1º CHECKPOINT", title=["Pauta de Call"],
            subtitle="Roteiro para conduzir a call de execução com a Stella, "
                     "revisar o roadmap e destravar o que ficou pendente.",
            name="STELLA GRÜTZMANN",
            sub_caps="CONSULTORIA DE IMAGEM E ESTILO",
            meta="JUNHO DE 2026 · SIMPLE ACC · USO INTERNO"),
        header_r="PAUTA · STELLA GRÜTZMANN",
        foot_l="USO INTERNO",
        foot_r="PAUTA · 1º CHECKPOINT · STELLA GRÜTZMANN")
    e = [Spacer(1, 1)]
    start(e)

    e += sec("01", "Contexto rápido", "Contexto rápido")
    e.append(spec_table([
        ("Cliente", "Stella Grützmann, consultoria de imagem e estilo premium."),
        ("Oferta", "Premium R$ 6.000 (90 dias) como principal. Entrada "
                   "R$ 2.997 (45 dias) só sob objeção de preço."),
        ("Meta 90 dias", "De R$ 4.000 para R$ 20.000 por mês. 5 a 6 vendas por "
                         "mês, ticket médio de R$ 4.000."),
        ("Roadmap", "5 fases: Fundação, SDR e Ativação, Ritmo, Volume e "
                    "Outbound, Previsibilidade."),
        ("Momento", "1º checkpoint, revisão de execução. Ela já produziu "
                    "material e está rodando."),
    ]))
    e.append(Spacer(1, 14))
    e.append(Callout(
        "Leitura desta call",
        "Diferente de um onboarding, este é um checkpoint de execução. A Stella "
        "se moveu: entregou apresentação, workbook e prospecção. O objetivo é "
        "verificar onde a execução está em relação ao roadmap, destravar "
        "gargalos e blindar responsabilidade (o que é dela, o que é da Simple "
        "Acc)."))

    e.append(Spacer(1, 20))
    e += sec("02", "Objetivo da call", "Objetivo da call")
    e += bullets([
        "Mapear o <b>status real de execução</b> de cada fase do roadmap, sem aceitar “tá indo”.",
        "Validar a <b>decisão da SDR</b>, que é o gargalo nº 1 do plano (a caixa do mês 1 depende disso).",
        "Confirmar que a <b>base de contatos</b> foi listada (80 a 150) e está sendo ativada por áudio e vídeo.",
        "Alinhar os <b>ajustes da apresentação comercial</b> (auditoria Full Sales) e o que entra primeiro.",
        "Fechar a call com <b>checklist datado</b> e próximos passos claros para o Checkpoint.",
    ])

    e.append(PageBreak())
    e += sec("03", "Revisão de execução por fase",
             "Onde a execução está", 27)
    e.append(Paragraph(
        "Para cada item, pergunte o <b>status</b> (feito, parcial ou não "
        "começou) e, se parcial ou não, qual o bloqueio. Marque a coluna ao "
        "conduzir.", S["muted_i"]))
    e.append(Spacer(1, 10))
    e.append(light_table(
        ["FASE", "ITEM DO ROADMAP", "STATUS"],
        [
            ["Fase I", "5 treinamentos assistidos (Call, Pré-vendas, Outbound, Social Selling, Quiz)", ""],
            ["Fase I", "2 ofertas documentadas (Premium R$ 6k e entrada R$ 2.997)", ""],
            ["Fase I", "Roteiro de venda em 1 página", ""],
            ["Fase I", "Lista de 80 a 150 contatos (ex-clientes, leads, seguidoras)", ""],
            ["Fase I", "“Turbinar” do carrossel ativo (R$ 20/dia, mulheres 35+)", ""],
            ["Fase I", "Planilha de controle montada", ""],
            ["Fase II", "SDR contratada e treinada", ""],
            ["Fase II", "Base ativada: 20 a 30/dia por áudio e vídeo, não texto", ""],
            ["Fase II", "Programa de indicação no ar", ""],
            ["Fase II", "Primeiras vendas (meta 2 a 4 = R$ 6 a 15k)", ""],
            ["Fase III", "Rotina diária estabilizada (reuniões e entrega)", ""],
            ["Fase III", "Números enviados ao grupo toda sexta", ""],
        ],
        [CW * 0.12, CW * 0.72, CW * 0.16]))

    e.append(PageBreak())
    e += sec("04", "Perguntas de diagnóstico",
             "Puxar o que travou", 27)
    e.append(SubEyebrow("SDR (decisão crítica)"))
    e.append(Spacer(1, 6))
    e += bullets([
        "“Você já abriu a vaga de SDR? Se não, o que está te impedindo: dinheiro, medo de gerir ou não priorizou?”",
        "“Sem SDR, quem está fazendo as 20 a 30 abordagens por dia hoje? Está acontecendo?”",
    ])
    e.append(Spacer(1, 6))
    e.append(SubEyebrow("Base e ativação"))
    e.append(Spacer(1, 6))
    e += bullets([
        "“Quantos contatos entraram na lista de fato? Chegou nos 80?”",
        "“Quantas você já chamou por áudio ou vídeo? Quantas viraram reunião?”",
        "“O que as pessoas respondem? Tem alguma objeção se repetindo?”",
    ])
    e.append(Spacer(1, 6))
    e.append(SubEyebrow("Vendas e oferta"))
    e.append(Spacer(1, 6))
    e += bullets([
        "“Em quantas reuniões você apresentou o Premium R$ 6k como opção única?”",
        "“Em quantas você foi direto pro R$ 2.997 sem a cliente pedir?” (sinal de perda de convicção)",
        "“Já fechou alguma? Qual foi o mix?”",
    ])

    e.append(PageBreak())
    e += sec("05", "Blindagem de responsabilidade",
             "Quem entrega o quê", 27)
    e.append(Paragraph(
        "Deixar explícito para o próximo checkpoint cobrar com clareza.",
        S["muted_i"]))
    e.append(Spacer(1, 10))
    e.append(light_table(
        ["FRENTE", "STELLA", "SIMPLE ACC"],
        [
            ["SDR", "Abrir vaga, contratar e treinar", "Modelo de remuneração e critérios de qualificação"],
            ["Base e ativação", "Listar 80 a 150 e chamar por áudio e vídeo", "Script de ativação e metas semanais"],
            ["Vendas", "Conduzir reuniões e apresentar o Premium", "Revisar gravações e refinar o roteiro"],
            ["Apresentação", "Aplicar ajustes de narrativa", "Direção dos ajustes (auditoria)"],
            ["Conteúdo e tráfego", "Turbinar carrossel e postar", "Quiz e criativos"],
            ["Números", "Enviar dados toda sexta", "Análise semanal e ajuste do gargalo"],
        ],
        [CW * 0.20, CW * 0.40, CW * 0.40]))
    e.append(Spacer(1, 16))
    e.append(Callout(
        "Fechamento",
        "Recapitular em voz alta os 3 compromissos mais importantes até o "
        "próximo checkpoint, definir a data e o que precisa estar pronto, e "
        "confirmar o envio dos números toda sexta. Depois da call, gerar e "
        "enviar o Checkpoint com o checklist datado."))

    doc.build(e)
    return doc.filename


# ============================================================ CHECKPOINT ====
def build_checkpoint():
    doc = Doc(
        os.path.join(HERE, "Checkpoint_Stella_Grutzmann.pdf"),
        cover=dict(
            tag_l="DOCUMENTO DE CHECKPOINT", tag_r="CONFIDENCIAL",
            eyebrow="1º CHECKPOINT", title=["Ajuste de Rota"],
            subtitle="O balanço do primeiro checkpoint e o novo foco: "
                     "tráfego pago e funil de quiz.",
            name="STELLA GRÜTZMANN",
            sub_caps="CONSULTORIA DE IMAGEM E ESTILO",
            meta="25 DE JUNHO DE 2026 · PREPARADO POR SIMPLE ACC · VERSÃO 1.0"),
        header_r="CHECKPOINT · STELLA GRÜTZMANN",
        foot_l="CONFIDENCIAL",
        foot_r="REUNIÃO DE 25.06.2026 · STELLA GRÜTZMANN")
    e = [Spacer(1, 1)]
    start(e)

    e += sec("01", "Onde estamos", "Onde estamos")
    e.append(Paragraph(
        "Stella, este documento registra o nosso primeiro checkpoint e organiza "
        "os próximos passos. Antes de tudo, parabéns pela novidade, é uma "
        "alegria. Diante do seu momento atual e da necessidade de acelerar as "
        "vendas neste período, revisamos o roadmap juntos e decidimos ajustar a "
        "rota para um caminho de aquisição mais rápido e que faça sentido para "
        "você agora: tráfego pago e funil de quiz. A prospecção ativa não é "
        "abandonada. Ela passa a ser uma frente paralela, para retomarmos "
        "quando fizer sentido.", S["body"]))
    e.append(Spacer(1, 16))
    e.append(Cards([
        ("O que andou", "Materiais",
         "Você já estruturou a oferta, a apresentação comercial, o workbook e o "
         "script de prospecção. Base pronta para ativar."),
        ("O que travou", "Execução",
         "O roadmap não saiu do papel. As conversas na base quente esfriaram e a "
         "prospecção ativa não combinou com o seu momento."),
        ("Decisão-chave", "Nova rota",
         "Priorizar tráfego pago e funil de quiz agora. SDR e prospecção ativa "
         "ficam para depois."),
    ]))
    e.append(Spacer(1, 16))
    e.append(Callout(
        "Decisão central deste checkpoint",
        "Priorizar tráfego pago e o funil de quiz como motor principal de "
        "aquisição agora. A contratação de SDR e a prospecção ativa ficam "
        "adiadas e serão reavaliadas caso o tráfego não traga volume "
        "suficiente."))

    e.append(PageBreak())
    e += sec("02", "O que mudou", "Plano original e novo caminho", 27)
    e.append(light_table(
        ["FRENTE", "PLANO ORIGINAL", "NOVO CAMINHO"],
        [
            ["Aquisição principal", "Prospecção ativa na base quente", "Tráfego pago e funil de quiz"],
            ["SDR", "Contratar logo no início", "Adiar e reavaliar se o tráfego não bastar"],
            ["Tráfego pago", "Bloqueado até validar vendas", "Liberado agora, frente principal"],
            ["Geração de caixa", "Vendas manuais 1 a 1", "Volume via anúncios e agendamento"],
            ["Pós-90 dias", "Não previsto", "Funil para o curso Estilo Têxtil"],
        ],
        [CW * 0.22, CW * 0.39, CW * 0.39]))
    e.append(Spacer(1, 18))
    e.append(PullQuote(
        f'“O que muda não é a meta, é <font color="{hx(PANEL_HL)}">o caminho</font>. '
        f'Em vez de correr atrás de uma pessoa por vez, trazemos as pessoas '
        f'certas até você com <font color="{hx(PANEL_HL)}">tráfego e quiz</font>.”'))

    e.append(PageBreak())
    e += sec("03", "O funil de quiz", "Como o funil vai funcionar", 27)
    e += bullets([
        "<b>Anúncio para a página do quiz</b>: o lead chega e responde um quiz curto, de forma gamificada.",
        "<b>Qualificação e pré-diagnóstico</b>: ao final ela recebe na hora um primeiro diagnóstico. A solução completa vem na reunião com você.",
        "<b>Agendamento</b>: direciona para o seu calendário ou para o WhatsApp, conforme o seu nicho.",
        "<b>Planilha e CRM</b>: os leads caem numa planilha (template Simple Acc) com origem, campanha, público e respostas do quiz.",
    ])
    e.append(Spacer(1, 10))
    e += sec("04", "Tráfego pago", "Ajustes com o Renan", 27)
    e += bullets([
        "Nesta fase o tráfego vai para o seu <b>perfil no Instagram</b>, não para site ou link externo. O site entra depois, com o link do quiz.",
        "O <b>Renan</b> vai ajustar a configuração de público para evitar leads fora do perfil. O impulsionamento anterior trouxe gente fora do alvo.",
        "Vamos <b>expandir a segmentação</b>: sair do “só Sul” e incluir estados-chave do Brasil, olhando ticket e aderência.",
        "Melhor <b>configuração de campanha</b>, sem depender só do criativo. Você já pode publicar o post aprovado pela parceira, e revemos o público juntos.",
    ])

    e.append(PageBreak())
    e += sec("05", "Curso Estilo Têxtil", "Receita recorrente", 27)
    e.append(Paragraph(
        "Fica registrado para não perdermos de vista, mas <b>não é a "
        "prioridade agora</b>. Vamos retomar este ponto depois que o funil de "
        "quiz estiver pronto e no ar.", S["body"]))
    e.append(Spacer(1, 10))
    e += bullets([
        "A ideia é criar um funil para vender o seu curso gravado (Estilo Têxtil), garantindo caixa entrando mesmo após os 90 dias de consultoria.",
        "O próprio funil de quiz pode ser adaptado para isso, com o mesmo público e redirecionamento para a venda do curso ao final.",
        "Quando chegarmos nesta frente, o Renan analisa as campanhas anteriores do curso (os vídeos que não converteram) e propõe um novo funil com criativos mais simples.",
    ])
    e.append(Spacer(1, 8))
    e.append(Callout(
        "Quando entra",
        "Depois que o funil de quiz estiver pronto e rodando. Até lá, o foco "
        "total é tráfego e quiz."))

    e.append(Spacer(1, 18))
    e += sec("06", "Prospecção ativa", "Fica em paralelo", 27)
    e.append(Paragraph(
        "Não é abandono, é sequência. Registramos o aprendizado para quando "
        "retomarmos.", S["bodyl"]))
    e.append(Spacer(1, 8))
    e += bullets([
        "Prospecção exige <b>volume e persistência</b>. O sucesso costuma vir por volta do 5º ponto de contato, com cadência e follow-up. Falar com cerca de 7 pessoas é uma amostra pequena demais.",
        "Por isso o <b>modelo de SDR</b>: R$ 500 fixo mais comissão, podendo chegar a R$ 2.000 ao bater a meta. Alguém preparado para o volume, sem sobrecarregar você.",
        "Retomamos essa frente em paralelo assim que o tráfego estiver rodando.",
    ])

    e.append(PageBreak())
    e += sec("07", "Próximos passos", "O que vem agora", 27)
    e.append(light_table(
        ["RESPONSÁVEL", "ENTREGA", "PRAZO"],
        [
            ["Simple Acc · Carlos", "Doc de estratégia, copy das páginas e criativos para validação", "1/7"],
            ["Renan", "Configuração de público dos anúncios e segmentação por estados", "2/7 (reunião com ela)"],
            ["Stella", "Publicar o post aprovado e aprovar os materiais enviados", "a partir de 2/7"],
            ["Simple Acc", "Funil de quiz montado e enviado para aprovação", "3/7"],
            ["Simple Acc", "Planilha e CRM (template) para acompanhamento dos leads", "a partir de 3/7"],
            ["Renan", "Análise das campanhas do curso e proposta de funil (Estilo Têxtil)", "após funil no ar"],
        ],
        [CW * 0.24, CW * 0.54, CW * 0.22]))

    e.append(Spacer(1, 18))
    e += sec("08", "Para esse caminho dar certo", "O que sustenta o plano", 27)
    e += bullets([
        "<b>Aprovação rápida</b> dos materiais (cópias e quiz) para não perder a janela. Quanto antes aprovar, antes ativamos.",
        "Tráfego focado no <b>perfil</b> até o quiz no ar, com o público sempre revisado com o Renan para não voltar a entrar lead fora do alvo.",
        "Acompanhar os leads na <b>planilha</b>. É o que nos deixa ajustar a campanha com dados, e não no escuro.",
    ])
    e.append(Spacer(1, 16))
    e.append(HRule(color=HAIR))
    e.append(Spacer(1, 10))
    e.append(Paragraph(
        "Ajustamos o caminho para o seu momento, mais rápido e mais leve para "
        "você. O foco agora é colocar o tráfego e o quiz no ar e fazer os leads "
        "entrarem. Qualquer dúvida, é só chamar. Seguimos juntos nessa.",
        S["muted_i"]))

    doc.build(e)
    return doc.filename


if __name__ == "__main__":
    print("Gerado:", build_pauta())
    print("Gerado:", build_checkpoint())
