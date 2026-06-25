#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Gerador dos PDFs do 1o checkpoint da Stella Grutzmann (Simple Acc).

Identidade visual (mesma linha do roadmap / material do Romulo):
  - fundo escuro  #07090D
  - dourado       #C9A84C
  - tipografia    Helvetica

Produz dois arquivos na mesma pasta:
  1. Pauta_Call_Stella_Grutzmann.pdf  -> pauta de diagnostico para conduzir a call
  2. Checkpoint_Stella_Grutzmann.pdf  -> documento de registro enviado a cliente

Uso:  python3 gerar_pdfs.py
"""

import os
from reportlab.lib.pagesizes import A4
from reportlab.lib.units import mm
from reportlab.lib.enums import TA_LEFT, TA_CENTER, TA_JUSTIFY
from reportlab.lib.colors import HexColor
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet

from reportlab.platypus import (
    BaseDocTemplate, PageTemplate, Frame, Paragraph, Spacer, Table, TableStyle,
    NextPageTemplate, PageBreak, KeepTogether, Flowable,
)

# ---------------------------------------------------------------- paleta ----
BG       = HexColor("#07090D")   # fundo escuro
BG_SOFT  = HexColor("#0E1218")   # cartoes / bandas
BG_ROW   = HexColor("#11161D")   # linha alternada de tabela
GOLD     = HexColor("#C9A84C")   # dourado
GOLD_DIM = HexColor("#8C7634")   # dourado escuro (regras)
INK      = HexColor("#E8E6E0")   # texto claro
MUTE     = HexColor("#9A968C")   # texto secundario
LINE     = HexColor("#26303B")   # divisorias suaves

PAGE_W, PAGE_H = A4
MARGIN = 18 * mm

HERE = os.path.dirname(os.path.abspath(__file__))


# --------------------------------------------------------------- estilos ----
def styles():
    ss = getSampleStyleSheet()

    def mk(name, **kw):
        base = dict(fontName="Helvetica", textColor=INK, leading=14, fontSize=10)
        base.update(kw)
        return ParagraphStyle(name, **base)

    return {
        "kicker": mk("kicker", fontName="Helvetica-Bold", fontSize=8.5,
                     textColor=GOLD, leading=12, alignment=TA_LEFT),
        "h_title": mk("h_title", fontName="Helvetica-Bold", fontSize=21,
                      textColor=INK, leading=25),
        "cover_title": mk("cover_title", fontName="Helvetica-Bold", fontSize=30,
                          textColor=INK, leading=34),
        "cover_sub": mk("cover_sub", fontSize=11.5, textColor=MUTE, leading=17),
        "section": mk("section", fontName="Helvetica-Bold", fontSize=14,
                      textColor=GOLD, leading=18),
        "sub": mk("sub", fontName="Helvetica-Bold", fontSize=10.5,
                  textColor=INK, leading=14),
        "body": mk("body", fontSize=10, leading=15, alignment=TA_JUSTIFY,
                   textColor=INK),
        "body_l": mk("body_l", fontSize=10, leading=15, textColor=INK),
        "bullet": mk("bullet", fontSize=10, leading=14.5, leftIndent=12,
                     bulletIndent=2, textColor=INK),
        "muted": mk("muted", fontSize=9, leading=13, textColor=MUTE),
        "muted_i": mk("muted_i", fontName="Helvetica-Oblique", fontSize=9.5,
                      leading=14, textColor=MUTE),
        "th": mk("th", fontName="Helvetica-Bold", fontSize=9, textColor=BG,
                 leading=12),
        "td": mk("td", fontSize=9, leading=12.5, textColor=INK),
        "td_b": mk("td_b", fontName="Helvetica-Bold", fontSize=9, leading=12.5,
                   textColor=GOLD),
        "tag": mk("tag", fontName="Helvetica-Bold", fontSize=8, textColor=GOLD,
                  leading=11),
        "foot": mk("foot", fontSize=7.5, textColor=MUTE, leading=10,
                   alignment=TA_CENTER),
    }


S = styles()


# ------------------------------------------------------------- flowables ----
class HBar(Flowable):
    """Regra horizontal fina dourada."""
    def __init__(self, width, color=GOLD_DIM, thickness=0.8, pad=2):
        super().__init__()
        self.width = width
        self.color = color
        self.thickness = thickness
        self.pad = pad

    def wrap(self, aw, ah):
        return (self.width, self.thickness + self.pad * 2)

    def draw(self):
        c = self.canv
        c.setStrokeColor(self.color)
        c.setLineWidth(self.thickness)
        c.line(0, self.pad, self.width, self.pad)


class SectionTitle(Flowable):
    """Numero da secao em quadro dourado + titulo + regra."""
    def __init__(self, number, title, width):
        super().__init__()
        self.number = number
        self.title = title
        self.width = width
        self.h = 20

    def wrap(self, aw, ah):
        return (self.width, self.h)

    def draw(self):
        c = self.canv
        # quadradinho do numero
        c.setFillColor(GOLD)
        c.rect(0, 1, 16, 16, fill=1, stroke=0)
        c.setFillColor(BG)
        c.setFont("Helvetica-Bold", 9.5)
        c.drawCentredString(8, 5, self.number)
        # titulo
        c.setFillColor(GOLD)
        c.setFont("Helvetica-Bold", 13.5)
        c.drawString(24, 4.5, self.title)
        # regra
        c.setStrokeColor(LINE)
        c.setLineWidth(0.7)
        c.line(0, -4, self.width, -4)


def section(number, title):
    return SectionTitle(number, title, PAGE_W - 2 * MARGIN)


def hx(color):
    return "#" + color.hexval()[2:]


def bullets(items, style="bullet", marker="•", color=GOLD):
    out = []
    for it in items:
        out.append(Paragraph(
            f'<font color="{hx(color)}">{marker}</font>&nbsp;&nbsp;{it}',
            S[style]))
        out.append(Spacer(1, 2.5))
    return out


def checklist(items, style="bullet"):
    out = []
    for it in items:
        out.append(Paragraph(
            f'<font color="{hx(GOLD)}">&#9744;</font>&nbsp;&nbsp;{it}',
            S[style]))
        out.append(Spacer(1, 3))
    return out


def gold_table(header, rows, col_widths, bold_first=False, align_first=TA_LEFT):
    data = [[Paragraph(h, S["th"]) for h in header]]
    for r in rows:
        cells = []
        for i, cell in enumerate(r):
            if i == 0 and bold_first:
                st = ParagraphStyle("tdf", parent=S["td_b"],
                                    alignment=align_first)
                cells.append(Paragraph(cell, st))
            else:
                cells.append(Paragraph(cell, S["td"]))
        data.append(cells)

    t = Table(data, colWidths=col_widths, repeatRows=1)
    style = [
        ("BACKGROUND", (0, 0), (-1, 0), GOLD),
        ("LINEBELOW", (0, 0), (-1, 0), 0.4, BG),
        ("ROWBACKGROUNDS", (0, 1), (-1, -1), [BG_SOFT, BG_ROW]),
        ("TEXTCOLOR", (0, 1), (-1, -1), INK),
        ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
        ("LEFTPADDING", (0, 0), (-1, -1), 7),
        ("RIGHTPADDING", (0, 0), (-1, -1), 7),
        ("TOPPADDING", (0, 0), (-1, -1), 5.5),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 5.5),
        ("LINEBELOW", (0, 1), (-1, -2), 0.3, LINE),
        ("BOX", (0, 0), (-1, -1), 0.5, GOLD_DIM),
    ]
    t.setStyle(TableStyle(style))
    return t


class Callout(Flowable):
    """Caixa de destaque com barra dourada a esquerda."""
    def __init__(self, text, width, style=None, pad=9):
        super().__init__()
        self.width = width
        self.pad = pad
        self.style = style or ParagraphStyle(
            "callout", fontName="Helvetica", fontSize=10, leading=14.5,
            textColor=INK)
        self.para = Paragraph(text, self.style)
        self._h = 0

    def wrap(self, aw, ah):
        w = self.width - self.pad * 2 - 6
        pw, ph = self.para.wrap(w, ah)
        self._h = ph + self.pad * 2
        return (self.width, self._h)

    def draw(self):
        c = self.canv
        c.setFillColor(BG_SOFT)
        c.roundRect(0, 0, self.width, self._h, 3, fill=1, stroke=0)
        c.setFillColor(GOLD)
        c.rect(0, 0, 3, self._h, fill=1, stroke=0)
        self.para.drawOn(c, self.pad + 6, self.pad)


def chip_row(label, value, width):
    """Linha label/valor estilo ficha tecnica."""
    data = [[Paragraph(label.upper(), S["tag"]),
             Paragraph(value, S["body_l"])]]
    t = Table(data, colWidths=[width * 0.32, width * 0.68])
    t.setStyle(TableStyle([
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
        ("LEFTPADDING", (0, 0), (-1, -1), 0),
        ("RIGHTPADDING", (0, 0), (-1, -1), 6),
        ("TOPPADDING", (0, 0), (-1, -1), 3),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 3),
        ("LINEBELOW", (0, 0), (-1, -1), 0.4, LINE),
    ]))
    return t


# ------------------------------------------------------------ documento -----
class Doc(BaseDocTemplate):
    def __init__(self, filename, footer_left):
        super().__init__(filename, pagesize=A4,
                         leftMargin=MARGIN, rightMargin=MARGIN,
                         topMargin=MARGIN + 4, bottomMargin=MARGIN)
        self.footer_left = footer_left
        frame = Frame(MARGIN, MARGIN, PAGE_W - 2 * MARGIN,
                      PAGE_H - 2 * MARGIN - 4, id="main",
                      leftPadding=0, rightPadding=0,
                      topPadding=0, bottomPadding=0)
        cover = Frame(MARGIN, MARGIN, PAGE_W - 2 * MARGIN,
                      PAGE_H - 2 * MARGIN, id="cover",
                      leftPadding=0, rightPadding=0,
                      topPadding=0, bottomPadding=0)
        self.addPageTemplates([
            PageTemplate(id="cover", frames=[cover], onPage=self._bg_cover),
            PageTemplate(id="body", frames=[frame], onPage=self._bg_body),
        ])

    def _paint_bg(self, canv):
        canv.setFillColor(BG)
        canv.rect(0, 0, PAGE_W, PAGE_H, fill=1, stroke=0)

    def _bg_cover(self, canv, doc):
        self._paint_bg(canv)
        # moldura dourada fina
        canv.setStrokeColor(GOLD_DIM)
        canv.setLineWidth(0.8)
        canv.rect(MARGIN * 0.6, MARGIN * 0.6,
                  PAGE_W - MARGIN * 1.2, PAGE_H - MARGIN * 1.2, fill=0)

    def _bg_body(self, canv, doc):
        self._paint_bg(canv)
        # rodape
        canv.setStrokeColor(LINE)
        canv.setLineWidth(0.5)
        canv.line(MARGIN, MARGIN - 4, PAGE_W - MARGIN, MARGIN - 4)
        canv.setFillColor(MUTE)
        canv.setFont("Helvetica", 7.5)
        canv.drawString(MARGIN, MARGIN - 13, self.footer_left)
        canv.drawRightString(PAGE_W - MARGIN, MARGIN - 13,
                             f"{doc.page}")
        canv.setFillColor(GOLD)
        canv.drawCentredString(PAGE_W / 2, MARGIN - 13, "SIMPLE ACC")


def cover(kicker, title, subtitle, meta_lines):
    cw = PAGE_W - 2 * MARGIN
    el = [Spacer(1, 70)]
    el.append(Paragraph(kicker.upper(), ParagraphStyle(
        "ck", parent=S["kicker"], alignment=TA_CENTER, fontSize=9)))
    el.append(Spacer(1, 14))
    el.append(Paragraph(title, ParagraphStyle(
        "ct", parent=S["cover_title"], alignment=TA_CENTER)))
    el.append(Spacer(1, 16))
    el.append(HBar(cw * 0.30, color=GOLD, thickness=1.4))
    el.append(Spacer(1, 16))
    el.append(Paragraph(subtitle, ParagraphStyle(
        "cs", parent=S["cover_sub"], alignment=TA_CENTER)))
    el.append(Spacer(1, 120))
    for ln in meta_lines:
        el.append(Paragraph(ln, ParagraphStyle(
            "cm", parent=S["muted"], alignment=TA_CENTER, leading=15)))
    return el


# ================================================================ PAUTA =====
def build_pauta():
    cw = PAGE_W - 2 * MARGIN
    doc = Doc(os.path.join(HERE, "Pauta_Call_Stella_Grutzmann.pdf"),
              "Pauta de Call · Stella Grützmann · 1º Checkpoint")
    e = []

    # capa
    e += cover(
        "Consultoria de Aceleração Comercial · Simple Acc",
        "Pauta de Call",
        "Stella Grützmann — 1º Checkpoint de Execução<br/>Roadmap 90 dias (R$4k → R$20k/mês)",
        ["DOCUMENTO INTERNO DE CONDUÇÃO — NÃO ENVIAR À CLIENTE",
         "Mentor: Daniel Souza  ·  Junho 2026"])
    e.append(NextPageTemplate("body"))
    e.append(PageBreak())

    # contexto rapido
    e.append(section("01", "Contexto rápido"))
    e.append(Spacer(1, 8))
    for lbl, val in [
        ("Cliente", "Stella Grützmann — consultoria de imagem e estilo (premium)"),
        ("Oferta", "Premium R$ 6.000 / 90 dias (principal) · Entrada R$ 2.997 / 45 dias (só sob objeção)"),
        ("Meta 90 dias", "R$ 4.000 → R$ 20.000/mês · 5–6 vendas/mês · ticket médio R$ 4.000+"),
        ("Roadmap", "5 fases: Fundação → SDR + Ativação → Ritmo → Volume/Outbound → Previsibilidade"),
        ("Momento", "1º checkpoint — revisão de EXECUÇÃO (ela já produziu material e está rodando)"),
    ]:
        e.append(chip_row(lbl, val, cw))
    e.append(Spacer(1, 12))
    e.append(Callout(
        "<b>Leitura desta call:</b> diferente de um onboarding, este é um checkpoint de "
        "execução. A Stella se moveu — entregou apresentação, workbook e prospecção. O objetivo "
        "é <b>verificar onde a execução está vs. o roadmap</b>, destravar gargalos e blindar "
        "responsabilidade (o que é dela, o que é da Simple Acc).", cw))

    # objetivo
    e.append(Spacer(1, 16))
    e.append(section("02", "Objetivo da call"))
    e.append(Spacer(1, 8))
    e += bullets([
        "Mapear o <b>status real de execução</b> de cada fase do roadmap (sem aceitar “tá indo”).",
        "Validar a <b>decisão da SDR</b> — é o gargalo nº 1 do plano (caixa do mês 1 depende disso).",
        "Confirmar que a <b>base de contatos</b> foi listada (80–150) e está sendo ativada por <b>áudio/vídeo</b>.",
        "Alinhar os <b>ajustes da apresentação comercial</b> (auditoria Full Sales) — o que entra primeiro.",
        "Fechar a call com <b>checklist datado</b> e próximos passos claros para o Checkpoint.",
    ])

    e.append(Spacer(1, 14))
    e.append(section("03", "Abertura e temperatura (5 min)"))
    e.append(Spacer(1, 8))
    e += bullets([
        "“Como você está se sentindo com o ritmo do plano até aqui — animada, travada, sobrecarregada?”",
        "“Desde que recebeu o roadmap, o que você <b>já tirou do papel</b> e o que ainda não saiu?”",
        "Ouvir sem corrigir. Anotar o que ela cita espontaneamente (isso revela a prioridade real dela).",
    ])

    e.append(PageBreak())

    # revisao por fase
    e.append(section("04", "Revisão de execução — por fase"))
    e.append(Spacer(1, 6))
    e.append(Paragraph(
        "Para cada item: pergunte <b>status</b> (feito / parcial / não começou) e, se parcial/não, "
        "<b>qual o bloqueio</b>. Marque na coluna ao conduzir.", S["muted_i"]))
    e.append(Spacer(1, 9))

    fase_rows = [
        ["Fase I — Fundação", "5 treinamentos assistidos (Call, Pré-vendas, Outbound, Social Selling, Quiz)", ""],
        ["", "2 ofertas documentadas (Premium R$6k + entrada R$2.997)", ""],
        ["", "Roteiro de venda em 1 página", ""],
        ["", "Lista de 80–150 contatos (ex-clientes, leads 18m, seguidoras)", ""],
        ["", "“Turbinar” do carrossel ativo (R$20/dia, mulheres 35+)", ""],
        ["", "Planilha de controle montada (oportunidades, DRE, indicadores)", ""],
        ["Fase II — SDR + Ativação", "SDR contratada e treinada (onboarding 2 dias)", ""],
        ["", "Base sendo ativada: 20–30 contatos/dia por ÁUDIO/VÍDEO (não texto)", ""],
        ["", "Programa de indicação no ar", ""],
        ["", "Primeiras vendas (meta Fase II: 2–4 = R$6–15k)", ""],
        ["Fase III — Ritmo", "Rotina diária estabilizada (reuniões + entrega)", ""],
        ["", "Resumo de números enviado ao grupo toda sexta", ""],
    ]
    e.append(gold_table(
        ["FASE", "ITEM DO ROADMAP", "STATUS"],
        fase_rows, [cw * 0.22, cw * 0.62, cw * 0.16],
        bold_first=True))

    e.append(Spacer(1, 14))
    e.append(section("05", "Perguntas de diagnóstico (puxar o que travou)"))
    e.append(Spacer(1, 8))
    e.append(Paragraph("SDR (decisão crítica)", S["sub"]))
    e.append(Spacer(1, 4))
    e += bullets([
        "“Você já abriu a vaga de SDR? Se não, o que está te impedindo — dinheiro, medo de gerir, ou não priorizou?”",
        "“Sem SDR, quem está fazendo as 20–30 abordagens/dia hoje? Está acontecendo?”",
    ], color=GOLD)
    e.append(Spacer(1, 6))
    e.append(Paragraph("Base e ativação", S["sub"]))
    e.append(Spacer(1, 4))
    e += bullets([
        "“Quantos contatos entraram na lista de fato? Chegou nos 80?”",
        "“Quantas você já chamou por áudio/vídeo? Quantas viraram reunião?”",
        "“O que as pessoas respondem? Tem alguma objeção se repetindo?”",
    ], color=GOLD)
    e.append(Spacer(1, 6))
    e.append(Paragraph("Vendas e oferta", S["sub"]))
    e.append(Spacer(1, 4))
    e += bullets([
        "“Em quantas reuniões você apresentou o Premium R$6k <b>como opção única</b>?”",
        "“Em quantas você foi direto pro R$2.997 sem a cliente pedir?” (sinal de perda de convicção)",
        "“Já fechou alguma? Qual foi o mix?”",
    ], color=GOLD)

    e.append(PageBreak())

    # materiais que ela produziu
    e.append(section("06", "Materiais que ela já produziu"))
    e.append(Spacer(1, 8))
    e.append(Paragraph("Apresentação comercial (auditada — framework Full Sales)", S["sub"]))
    e.append(Spacer(1, 4))
    e.append(Paragraph(
        "Forte em autoridade, prova social e posicionamento. Lacuna: está <b>institucional demais "
        "para fechar</b>. Conduzir os ajustes de <b>prioridade alta</b> primeiro:", S["body_l"]))
    e.append(Spacer(1, 5))
    e += bullets([
        "Inserir <b>promessa principal logo no início</b> (ex.: “…ser lembrada antes mesmo de começar a falar”).",
        "Amplificar <b>problema e consequências</b> de não agir (inclusive impacto financeiro).",
        "Construir <b>contraste cenário atual × desejado</b> de forma explícita.",
        "Reordenar a narrativa: <b>Problema → Consequência → Desejo → Transformação → Método</b>.",
    ])
    e.append(Spacer(1, 6))
    e.append(Callout(
        "Reforçar com ela: <b>não vamos mexer no visual</b> (que está excelente). O ganho de "
        "conversão vem da <b>narrativa</b>, não do design.", cw, S["muted_i"]))
    e.append(Spacer(1, 10))
    e.append(Paragraph("Workbook da cliente", S["sub"]))
    e.append(Spacer(1, 4))
    e += bullets([
        "Confirmar em que ponto do funil o workbook entra (tarefa entre encontros / pré-call de venda?).",
        "Definir se ele vira <b>ferramenta de qualificação</b> antes da reunião (filtra quem está pronta).",
    ])
    e.append(Spacer(1, 8))
    e.append(Paragraph("Script de prospecção", S["sub"]))
    e.append(Spacer(1, 4))
    e += bullets([
        "Já personalizado (quente / morno / frio aberto / frio fechado). Está sendo <b>usado na prática</b>?",
        "Qual etapa do script as conversas mais morrem? (ajustar o gancho que trava).",
    ])

    e.append(Spacer(1, 16))
    e.append(section("07", "Blindagem de responsabilidade"))
    e.append(Spacer(1, 6))
    e.append(Paragraph(
        "Deixar explícito quem entrega o quê — para o próximo checkpoint cobrar com clareza.",
        S["muted_i"]))
    e.append(Spacer(1, 9))
    e.append(gold_table(
        ["FRENTE", "STELLA (cliente)", "SIMPLE ACC (mentor)"],
        [
            ["SDR", "Abrir vaga, contratar e treinar", "Modelo de remuneração + critérios de qualificação"],
            ["Base / ativação", "Listar 80–150 e chamar por áudio/vídeo", "Script de ativação + metas semanais"],
            ["Vendas", "Conduzir reuniões e apresentar Premium", "Revisar gravações + refinar roteiro"],
            ["Apresentação", "Aplicar ajustes de narrativa", "Direção dos ajustes (auditoria)"],
            ["Conteúdo / tráfego", "Turbinar carrossel + postar", "Quiz funnel + criativos (Fase V)"],
            ["Números", "Enviar dados toda sexta ao grupo", "Análise semanal e ajuste de gargalo"],
        ],
        [cw * 0.20, cw * 0.40, cw * 0.40], bold_first=True))

    e.append(Spacer(1, 16))
    e.append(section("08", "Fechamento e próximos passos"))
    e.append(Spacer(1, 8))
    e += bullets([
        "Recapitular em voz alta os <b>3 compromissos</b> mais importantes que ela assume até o próximo checkpoint.",
        "Definir <b>data do próximo checkpoint</b> e o que precisa estar pronto até lá.",
        "Confirmar o <b>envio dos números toda sexta</b> (2ª falta = pauta urgente).",
        "Pós-call: gerar e enviar o <b>Checkpoint</b> com o checklist datado.",
    ])

    doc.build(e)
    return doc.filename


# ============================================================ CHECKPOINT ====
def build_checkpoint():
    cw = PAGE_W - 2 * MARGIN
    doc = Doc(os.path.join(HERE, "Checkpoint_Stella_Grutzmann.pdf"),
              "Checkpoint · Stella Grützmann · Simple Acc")
    e = []

    e += cover(
        "Acompanhamento Estratégico · Simple Acc",
        "Checkpoint",
        "Stella Grützmann — Registro do 1º Checkpoint<br/>Roadmap 90 dias (R$4k → R$20k/mês)",
        ["Mentor: Daniel Souza  ·  Junho 2026",
         "Documento de acompanhamento — Simple Acc"])
    e.append(NextPageTemplate("body"))
    e.append(PageBreak())

    e.append(section("01", "Onde estamos"))
    e.append(Spacer(1, 8))
    e.append(Paragraph(
        "Stella, este documento registra o nosso 1º checkpoint e organiza os próximos passos. "
        "Você saiu na frente: já estruturou a oferta, produziu a apresentação comercial, criou o "
        "workbook e está com o script de prospecção em mãos. O foco agora é <b>transformar esse "
        "material em caixa</b> — e o caminho mais curto para isso é a <b>ativação da base</b> e a "
        "<b>decisão da SDR</b>.", S["body"]))
    e.append(Spacer(1, 10))
    e.append(Callout(
        "<b>A regra que sustenta o trimestre:</b> apresentar sempre o <b>Premium (R$ 6.000)</b> "
        "com convicção, como opção única. O R$ 2.997 só entra quando a cliente disser, com "
        "todas as letras, que está fora do orçamento.", cw))

    e.append(Spacer(1, 16))
    e.append(section("02", "Pontos alinhados na call"))
    e.append(Spacer(1, 6))
    e.append(Paragraph(
        "<i>(Preencher/ajustar após a conversa — registro do que foi acordado.)</i>", S["muted_i"]))
    e.append(Spacer(1, 8))
    e += bullets([
        "Oferta dupla confirmada: Premium R$6k como principal, R$2.997 como exceção sob objeção.",
        "Prioridade do trimestre: <b>ativar a base</b> (caixa) antes de estruturar tráfego pago.",
        "SDR é a contratação-chave — destrava o volume de abordagens sem sobrecarregar a Stella.",
        "Ativação da base sempre por <b>áudio/vídeo no WhatsApp</b>, nunca por mensagem de texto.",
        "Apresentação comercial: ajustar a narrativa (não o visual) na ordem de prioridade definida.",
    ])

    e.append(Spacer(1, 14))
    e.append(section("03", "Suas tarefas — próximos 14 dias"))
    e.append(Spacer(1, 8))
    e.append(Paragraph("Comercial / SDR", S["sub"]))
    e.append(Spacer(1, 4))
    e += checklist([
        "Abrir a vaga de SDR e iniciar o processo de seleção.",
        "Fechar a lista de <b>80–150 contatos</b> (ex-clientes, leads dos últimos 18 meses, seguidoras).",
        "Ativar <b>20–30 contatos/dia</b> por áudio ou vídeo no WhatsApp.",
        "Registrar tudo na planilha de controle (oportunidades + indicadores).",
    ])
    e.append(Spacer(1, 6))
    e.append(Paragraph("Oferta e apresentação", S["sub"]))
    e.append(Spacer(1, 4))
    e += checklist([
        "Aplicar na apresentação: promessa no início + dor/consequências + contraste de cenários.",
        "Reordenar a narrativa para Problema → Consequência → Desejo → Transformação → Método.",
        "Manter as 2 ofertas documentadas e o roteiro de venda em 1 página à mão.",
    ])
    e.append(Spacer(1, 6))
    e.append(Paragraph("Conteúdo e disciplina", S["sub"]))
    e.append(Spacer(1, 4))
    e += checklist([
        "Manter o “Turbinar” do carrossel ativo (R$20/dia, público mulheres 35+).",
        "Enviar os <b>números toda sexta-feira</b> ao grupo (reuniões, vendas, mix R$6k/R$2k, travas).",
    ])

    e.append(PageBreak())

    e.append(section("04", "Nossa parte — Simple Acc"))
    e.append(Spacer(1, 8))
    e += bullets([
        "Entregar o <b>modelo de remuneração da SDR</b> + critérios de qualificação de lead.",
        "Revisar as <b>primeiras gravações de reunião</b> e refinar o roteiro de venda com você.",
        "Conduzir a direção dos <b>ajustes da apresentação</b> (auditoria Full Sales).",
        "Preparar o <b>quiz funnel</b> e os criativos para a Fase V (tráfego pago em teste).",
        "Analisar seus números toda semana e apontar o gargalo a destravar.",
    ])

    e.append(Spacer(1, 14))
    e.append(section("05", "Metas por marco"))
    e.append(Spacer(1, 8))
    e.append(gold_table(
        ["MARCO", "META", "FATURAMENTO"],
        [
            ["Dia 14", "SDR em contratação · base ativada · 2–4 vendas", "R$ 6–15k em caixa"],
            ["Dia 30", "SDR com 20+ reuniões qualificadas · rotina estável", "R$ 15–25k · 5–7 vendas"],
            ["Dia 60", "Outbound ativo (30–50/dia) · mix 40%+ Premium", "R$ 15–20k/mês"],
            ["Dia 90", "Quiz + tráfego em teste · operação previsível", "> R$ 20.000/mês"],
        ],
        [cw * 0.16, cw * 0.55, cw * 0.29], bold_first=True))

    e.append(Spacer(1, 10))
    e.append(Paragraph("Cenários de mix (5–6 vendas/mês)", S["sub"]))
    e.append(Spacer(1, 6))
    e.append(gold_table(
        ["CENÁRIO", "R$ 2k", "R$ 6k", "TICKET MÉDIO", "TOTAL"],
        [
            ["Defensivo", "3–4", "2–3", "R$ 3.600", "R$ 21.600 (6)"],
            ["Esperado", "2–3", "2–3", "R$ 4.000", "R$ 20.000 (5)"],
            ["Otimista", "1–2", "3–4", "R$ 4.800", "R$ 24.000 (5)"],
        ],
        [cw * 0.22, cw * 0.14, cw * 0.14, cw * 0.25, cw * 0.25], bold_first=True))

    e.append(Spacer(1, 16))
    e.append(section("06", "Alertas"))
    e.append(Spacer(1, 8))
    e += bullets([
        "<b>SDR é o gargalo nº 1.</b> Se não bater 20 reuniões em 30 dias, a prospecção volta pra você e o trimestre trava — avaliamos no dia 15.",
        "<b>Convicção no Premium.</b> Ir direto pro R$2.997 derruba o ticket. Gravar as 10 primeiras reuniões para revisarmos.",
        "<b>Sobrecarga na entrega.</b> Bloquear 3h/dia só para entrega; se passar de 12 clientes ativas, pausar vendas.",
        "<b>Disciplina de medir.</b> Sem os números de sexta, ajustamos no escuro. Segunda falta vira pauta urgente.",
    ], marker="!", color=GOLD)

    e.append(Spacer(1, 14))
    e.append(HBar(cw, color=GOLD_DIM, thickness=0.8))
    e.append(Spacer(1, 8))
    e.append(Paragraph(
        "“Daqui a 90 dias seu negócio estará em um lugar completamente diferente — mas só se o "
        "plano for seguido linha por linha. Cada fase prepara a próxima. Você não está sozinha; "
        "a execução é sua, o acompanhamento é nosso.”", S["muted_i"]))

    doc.build(e)
    return doc.filename


if __name__ == "__main__":
    p1 = build_pauta()
    p2 = build_checkpoint()
    print("Gerado:", p1)
    print("Gerado:", p2)
