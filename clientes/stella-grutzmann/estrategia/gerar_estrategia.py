#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Estratégia Completa — Stella Grützmann (Simple Acc).

Documento de estratégia e copy do Funil de Quiz, no mesmo modelo aprovado
pelos clientes (Pâmella Mello / Rômulo Heleno). Versão para a CLIENTE:
sem as seções internas da Simple (Tarefas de onboarding e Recomendações).

Identidade visual e componentes reutilizados de gerar_pdfs.py.
Regra editorial: sem travessão (—) em nenhum texto.

Seções: 00 Resumo · 01 Big Idea · 02 Quiz · 03 Página de Aplicação ·
        04 Anúncios · 05 Diagnóstico · 06 Cadência de Follow-up.

Uso:  python3 gerar_estrategia.py
"""

import os
from reportlab.platypus import KeepTogether
from gerar_pdfs import (  # identidade + componentes compartilhados
    Doc, sec, PullQuote, Callout, bullets, HRule, SubEyebrow,
    caps, hx, S, mk, start,
    Paragraph, Spacer, Table, TableStyle, PageBreak, Flowable,
    ParagraphStyle, TA_JUSTIFY,
    NAVY, INK, ACCENT, BODYCLR, MUTE, SOFT, HAIR, CALL_BG, PANEL_HL, PANEL_TX,
    WHITE, CW, DISP, BODY, BODY_B, BODY_I, UI_B,
)

HERE = os.path.dirname(os.path.abspath(__file__))

# fonte de símbolos (✓ ✕) que as serifadas não têm
from reportlab.pdfbase import pdfmetrics as _pm
from reportlab.pdfbase.ttfonts import TTFont as _TTF
SYM = "Sym"
try:
    _pm.registerFont(_TTF(SYM, "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf"))
except Exception:
    SYM = UI_B

# estilos extra desta peça
S["q_title"] = mk("q_title", fontName=DISP, textColor=INK, fontSize=13.5,
                  leading=17)
S["alt"] = mk("alt", fontSize=9.5, leading=13, textColor=BODYCLR)
S["altL"] = mk("altL", fontName=UI_B, fontSize=8, textColor=ACCENT, leading=13)
S["faq_q"] = mk("faq_q", fontName=DISP, textColor=INK, fontSize=12.5,
                leading=16)
S["num_t"] = mk("num_t", fontName=BODY_B, textColor=INK, fontSize=11.5,
                leading=15)
S["stat"] = mk("stat", fontName=DISP, textColor=INK, fontSize=18, leading=21)
S["day"] = mk("day", fontName=BODY_B, textColor=INK, fontSize=10.5, leading=13)


# --------------------------------------------------------- componentes ------
class HeroPanel(Flowable):
    """Painel navy do topo do quiz: eyebrow + título + corpo + caps."""
    def __init__(self, eyebrow, title, body, caps_line, pad=18):
        super().__init__()
        self.eyebrow = eyebrow.upper()
        self.caps_line = caps_line.upper()
        self.pad = pad
        self.title = Paragraph(title, ParagraphStyle(
            "ht", fontName=DISP, textColor=WHITE, fontSize=17, leading=21))
        self.body = Paragraph(body, ParagraphStyle(
            "hb", fontName=BODY, textColor=PANEL_TX, fontSize=10, leading=15))

    def wrap(self, aw, ah):
        w = CW - self.pad * 2
        _, th = self.title.wrap(w, 999)
        _, bh = self.body.wrap(w, 999)
        self._th, self._bh = th, bh
        self._h = self.pad + 11 + 8 + th + 8 + bh + 10 + 10 + self.pad
        return (CW, self._h)

    def draw(self):
        c = self.canv
        c.setFillColor(NAVY)
        c.roundRect(0, 0, CW, self._h, 6, fill=1, stroke=0)
        x = self.pad
        y = self._h - self.pad
        caps(c, x, y - 8, self.eyebrow, 8, PANEL_HL, tr=1.6)
        y -= 8 + 8
        self.title.drawOn(c, x, y - self._th)
        y -= self._th + 8
        self.body.drawOn(c, x, y - self._bh)
        y -= self._bh + 10
        caps(c, x, y - 8, self.caps_line, 7.5, PANEL_HL, tr=1.6)


class NumItem(Flowable):
    """Item numerado do mecanismo: número grande + título + corpo."""
    def __init__(self, num, title, body):
        super().__init__()
        self.num = num
        self.title = Paragraph(title, S["num_t"])
        self.body = Paragraph(body, mk("nb", fontSize=9.5, leading=13.5,
                                       textColor=SOFT))
        self.ind = 40

    def wrap(self, aw, ah):
        w = CW - self.ind
        _, th = self.title.wrap(w, 999)
        _, bh = self.body.wrap(w, 999)
        self._th, self._bh = th, bh
        self._h = max(30, th + 4 + bh) + 12
        return (CW, self._h)

    def draw(self):
        c = self.canv
        top = self._h - 8
        c.setFillColor(ACCENT)
        c.setFont(DISP, 21)
        c.drawString(0, top - 17, self.num)
        self.title.drawOn(c, self.ind, top - self._th)
        self.body.drawOn(c, self.ind, top - self._th - 4 - self._bh)
        c.setStrokeColor(HAIR)
        c.setLineWidth(0.5)
        c.line(0, 0, CW, 0)


def stat_cards(items, gap=16):
    """Cards do resumo: eyebrow + (valor grande opcional) + corpo."""
    n = len(items)
    cwid = (CW - gap * (n - 1)) / n
    cells = []
    for eb, val, body in items:
        inner = []
        inner.append(Paragraph(
            f'<font name="{UI_B}" color="{hx(ACCENT)}" size="7.5">'
            f'{eb.upper()}</font>', mk("e", leading=11)))
        inner.append(Spacer(1, 7))
        if val:
            inner.append(Paragraph(val, S["stat"]))
            inner.append(Spacer(1, 6))
        inner.append(Paragraph(body, S["card_b"]))
        t = Table([[inner]], colWidths=[cwid], rowHeights=None)
        t.setStyle(TableStyle([
            ("BOX", (0, 0), (-1, -1), 0.8, HAIR),
            ("VALIGN", (0, 0), (-1, -1), "TOP"),
            ("LEFTPADDING", (0, 0), (-1, -1), 12),
            ("RIGHTPADDING", (0, 0), (-1, -1), 12),
            ("TOPPADDING", (0, 0), (-1, -1), 13),
            ("BOTTOMPADDING", (0, 0), (-1, -1), 14),
            ("ROUNDEDCORNERS", [4, 4, 4, 4]),
        ]))
        cells.append(t)
    row = Table([cells], colWidths=[cwid] * n)
    row.setStyle(TableStyle([
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
        ("LEFTPADDING", (0, 0), (-1, -1), 0),
        ("RIGHTPADDING", (0, 0), (-1, -1), gap),
        ("TOPPADDING", (0, 0), (-1, -1), 0),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 0),
    ]))
    return row


def quiz_block(label, tipo, question, alts):
    els = [SubEyebrow(f"PERGUNTA {label} · {tipo}"), Spacer(1, 5),
           Paragraph(question, S["q_title"]), Spacer(1, 6)]
    data = [[Paragraph(a, S["altL"]), Paragraph(t, S["alt"])] for a, t in alts]
    tb = Table(data, colWidths=[20, CW - 20])
    tb.setStyle(TableStyle([
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
        ("LEFTPADDING", (0, 0), (-1, -1), 0),
        ("RIGHTPADDING", (0, 0), (-1, -1), 6),
        ("TOPPADDING", (0, 0), (-1, -1), 7),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 7),
        ("LINEBELOW", (0, 0), (-1, -1), 0.5, HAIR),
    ]))
    els.append(tb)
    els.append(Spacer(1, 12))
    return KeepTogether(els)


def two_col_check(left, right):
    head = [Paragraph(f'<font name="{UI_B}" color="{hx(ACCENT)}" size="8">'
                      f'PARA QUEM É</font>', mk("h", leading=12)),
            Paragraph(f'<font name="{UI_B}" color="{hx(ACCENT)}" size="8">'
                      f'PARA QUEM NÃO É</font>', mk("h", leading=12))]
    rows = [head]
    for i in range(max(len(left), len(right))):
        l = f'<font name="{SYM}" color="{hx(ACCENT)}">✓</font>&nbsp;&nbsp;{left[i]}' if i < len(left) else ""
        r = f'<font name="{SYM}" color="{hx(MUTE)}">✕</font>&nbsp;&nbsp;{right[i]}' if i < len(right) else ""
        rows.append([Paragraph(l, S["alt"]), Paragraph(r, S["alt"])])
    t = Table(rows, colWidths=[CW * 0.5 - 8, CW * 0.5 - 8])
    t.setStyle(TableStyle([
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
        ("LEFTPADDING", (0, 0), (0, -1), 0),
        ("LEFTPADDING", (1, 0), (1, -1), 14),
        ("RIGHTPADDING", (0, 0), (-1, -1), 8),
        ("TOPPADDING", (0, 0), (-1, -1), 6),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 6),
        ("LINEBELOW", (0, 0), (-1, 0), 1.0, ACCENT),
        ("LINEBELOW", (0, 1), (-1, -2), 0.5, HAIR),
    ]))
    return t


def faq(items):
    out = []
    for q, a in items:
        out.append(Paragraph(q, S["faq_q"]))
        out.append(Spacer(1, 3))
        out.append(Paragraph(a, S["bodyl"]))
        out.append(Spacer(1, 11))
    return out


def cadence(rows):
    data = []
    for day, tag, msg in rows:
        left = Paragraph(
            f'<font name="{BODY_B}" color="{hx(INK)}" size="10.5">{day}</font>'
            f'<br/><font name="{UI_B}" color="{hx(ACCENT)}" size="7">'
            f'{tag.upper()}</font>', mk("d", leading=13))
        data.append([left, Paragraph(msg, S["alt"])])
    t = Table(data, colWidths=[CW * 0.17, CW * 0.83])
    t.setStyle(TableStyle([
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
        ("LEFTPADDING", (0, 0), (0, -1), 0),
        ("LEFTPADDING", (1, 0), (1, -1), 10),
        ("RIGHTPADDING", (0, 0), (-1, -1), 6),
        ("TOPPADDING", (0, 0), (-1, -1), 9),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 9),
        ("LINEBELOW", (0, 0), (-1, -1), 0.5, HAIR),
    ]))
    return t


def dor_bullets(items):
    out = []
    for it in items:
        out.append(Paragraph(
            f'<font name="{DISP}" color="{hx(ACCENT)}">›</font>&nbsp;&nbsp;{it}',
            mk("db", fontSize=10.5, leading=15, leftIndent=15)))
        out.append(Spacer(1, 5))
    return out


def ad_angle(titulo, nome, estrategia, hook, curta=None, media=None, longa=None,
             extra=None):
    els = [SubEyebrow(titulo), Spacer(1, 4),
           Paragraph(f'“{nome}”', S["q_title"]), Spacer(1, 4),
           Paragraph(f'<i>Estratégia: {estrategia}</i>', S["muted_i"]),
           Spacer(1, 8),
           Callout("Hook (3s)", hook)]
    for lbl, tx in [("Curta (~50)", curta), ("Média (~120)", media),
                    ("Longa (~250)", longa)]:
        if tx:
            els += [Spacer(1, 9), SubEyebrow(lbl), Spacer(1, 4),
                    Paragraph(tx, S["body"])]
    if extra:
        els += [Spacer(1, 8), Paragraph(extra, S["muted_i"])]
    return els


# ================================================================ DOC ========
def build():
    doc = Doc(
        os.path.join(HERE, "Estrategia_Stella_Grutzmann.pdf"),
        cover=dict(
            tag_l="DOCUMENTO DE ESTRATÉGIA", tag_r="CONFIDENCIAL",
            eyebrow="FUNIL DE QUIZ",
            title=["Estratégia de", "Aquisição & Copy"],
            subtitle="O funil que faz a profissional certa se reconhecer "
                     "sozinha, e transforma tráfego em agenda de avaliações "
                     "estratégicas.",
            name="STELLA GRÜTZMANN",
            sub_caps="CONSULTORIA DE IMAGEM & ESTILO · PREMIUM",
            meta="JUNHO DE 2026 · PREPARADO POR SIMPLE ACC · VERSÃO 1.0"),
        header_r="ESTRATÉGIA · STELLA GRÜTZMANN",
        foot_l="CONFIDENCIAL",
        foot_r="FUNIL DE QUIZ · STELLA GRÜTZMANN")
    e = [Spacer(1, 1)]
    start(e)

    # ----------------------------------------------------- 00 RESUMO
    e += sec("00", "Resumo do projeto", "O contexto do negócio")
    e.append(Paragraph(
        "Consultoria de imagem e estilo com um ângulo próprio: em vez de moda e "
        "tendência passageira, conhecimento. A Stella ensina a profissional a "
        "entender os elementos visuais da própria imagem e a fazer escolhas com "
        "estratégia, para que a imagem comunique a autoridade que ela já "
        "construiu. Esta estratégia organiza a aquisição via funil de quiz: a "
        "promessa, as perguntas que qualificam, a página, os anúncios, o "
        "diagnóstico personalizado e o follow-up até a avaliação estratégica.",
        S["body"]))
    e.append(Spacer(1, 16))
    e.append(stat_cards([
        ("Meta", "R$ 20.000/mês",
         "Partindo de R$ 4.000, com 5 a 6 vendas por mês. O funil de quiz entra "
         "como motor principal de aquisição."),
        ("Carro-chefe", "Premium · 90 dias",
         "Acompanhamento Estratégico de R$ 6.000: 3 encontros, 2 sessões de "
         "implementação, curadoria de marcas e suporte por 90 dias."),
        ("Porta de entrada", "Avaliação",
         "Avaliação estratégica individual, agendada logo após o diagnóstico do "
         "quiz."),
    ]))
    e.append(Spacer(1, 14))
    e.append(stat_cards([
        ("Modelo de atendimento", "",
         "Encontros online ao vivo, para todo o Brasil e fora dele. Premium de "
         "90 dias; entrada Consultoria Estratégica de 45 dias (R$ 2.997), "
         "apresentada apenas sob objeção de preço."),
        ("Quem conduz", "",
         "Stella Grützmann conduz a consultoria: consultora de imagem e estilo, "
         "com atendimento a profissionais consolidadas. Estratégia e "
         "acompanhamento por Simple Acc."),
    ]))

    # ----------------------------------------------------- 01 BIG IDEA
    e.append(PageBreak())
    e += sec("01", "Big Idea", "A tese que sustenta tudo")
    e.append(PullQuote(
        f'“A profissional que não é levada a sério pela imagem não tem um '
        f'problema de competência. Tem um <font color="{hx(PANEL_HL)}">problema '
        f'de tradução</font>: o que ela sabe não aparece no que ela veste. E '
        f'isso não se resolve com mais roupa, se resolve '
        f'<font color="{hx(PANEL_HL)}">com estratégia</font>.”'))
    e.append(Spacer(1, 16))
    e.append(Paragraph(
        "A cliente ideal da Stella é a mulher madura e consolidada, médica, "
        "dentista, advogada, empresária, executiva, que é excelente no que faz e "
        "sabe disso. Ela tem o guarda-roupa cheio, compra com frequência, mas "
        "vive o mesmo impasse: “tenho muita roupa e não sei combinar”, peças que "
        "ficam paradas, e a sensação de que a imagem não acompanha o momento "
        "profissional que ela vive.", S["body"]))
    e.append(Spacer(1, 10))
    e.append(Paragraph(
        "A virada de chave: o problema nunca foi falta de roupa nem de bom "
        "gosto. É falta de estratégia de imagem, entender o que cada elemento "
        "(cor, linha, forma, tecido) comunica ao inconsciente de quem olha, e "
        "escolher de propósito. Consultoria comum entrega um “antes e depois” que "
        "a cliente não sabe repetir sozinha. A Stella entrega o que falta: o "
        "critério para escolher com autonomia, para sempre. É por isso que custa "
        "o que custa. Não é o preço de uma consultoria de moda, é o preço de "
        "parar de ser subestimada pela própria imagem.", S["body"]))
    e.append(Spacer(1, 14))
    e.append(Callout(
        "Por que resolve o “tenho muita roupa e não sei usar”",
        "A Big Idea qualifica na origem. Quem busca dica de moda barata se "
        "autoexclui; quem está cansada de ser vista abaixo da própria "
        "competência se reconhece e aceita o investimento de um processo "
        "estratégico."))

    # ----------------------------------------------------- 02 QUIZ
    e.append(PageBreak())
    e += sec("02", "Copy do Quiz", "As 8 perguntas que qualificam")
    e.append(Paragraph(
        "Ordem SPIN, baixa fricção primeiro, qualificação por último. Ao final, "
        "a lead recebe uma leitura personalizada do que enfraquece a sua "
        "autoridade visual, e segue para a avaliação estratégica.", S["body"]))
    e.append(Spacer(1, 12))
    e.append(HeroPanel(
        "Hero · topo do quiz",
        "Descubra o que a sua imagem está comunicando, e o que muda a percepção "
        "sobre você",
        "Responda 8 perguntas e receba uma leitura personalizada do que hoje "
        "enfraquece a sua autoridade visual, e o primeiro passo para alinhar "
        "imagem e competência.",
        "Leva ~2 minutos · 100% confidencial"))
    e.append(Spacer(1, 14))
    quiz = [
        ("01", "Situação",
         "Como você descreveria a sua relação com a própria imagem hoje?",
         [("A", "Invisto em roupa, mas nunca sinto que estou bem resolvida"),
          ("B", "Me visto no automático, sempre nas mesmas peças"),
          ("C", "Tenho bom gosto, mas falta estratégia e intenção"),
          ("D", "Minha imagem não acompanha o meu momento profissional")]),
        ("02", "Problema",
         "O que mais te incomoda na hora de se vestir?",
         [("A", "Tenho muita roupa e não sei combinar o que já tenho"),
          ("B", "Compro peças que acabam paradas no armário"),
          ("C", "Perco tempo e energia decidindo o que vestir todo dia"),
          ("D", "Nunca sei o que usar em reuniões e eventos importantes")]),
        ("03", "Implicação",
         "Como isso aparece na sua vida profissional?",
         [("A", "Sinto que passo menos autoridade do que realmente tenho"),
          ("B", "Já vi gente menos preparada ser levada mais a sério"),
          ("C", "Fico insegura em reuniões, eventos e fotos"),
          ("D", "Minha imagem gera dúvida no cliente antes de eu falar")]),
        ("04", "Implicação (custo)",
         "Se nada mudar nos próximos meses, o que isso representa?",
         [("A", "Continuar sendo subestimada pela imagem"),
          ("B", "Perder oportunidades para quem se posiciona melhor"),
          ("C", "Seguir insegura e gastando com roupa sem resolver"),
          ("D", "Tudo isso ao mesmo tempo")]),
        ("05", "Tentativas",
         "O que você já tentou para resolver?",
         [("A", "Comprei mais roupa, mas o problema continuou"),
          ("B", "Segui dicas de moda e influenciadoras"),
          ("C", "Pedi ajuda a amigas ou a vendedoras"),
          ("D", "Ainda não tentei nada estruturado")]),
        ("06", "Objetivo",
         "O que você mais quer conquistar com a sua imagem?",
         [("A", "Ser vista como a autoridade que eu já sou"),
          ("B", "Ter segurança e praticidade para me vestir todo dia"),
          ("C", "Aprender a comprar e combinar com critério"),
          ("D", "Presença e confiança em reuniões e eventos")]),
        ("07", "Perfil",
         "Qual cenário descreve melhor você hoje?",
         [("A", "Profissional da saúde (médica, dentista, dermatologista)"),
          ("B", "Advogada, executiva ou gestora"),
          ("C", "Empresária ou dona do próprio negócio"),
          ("D", "Profissional liberal em outra área")]),
        ("08", "Qualificação (sempre por último)",
         "Se existisse um processo que alinha a sua imagem à sua competência, "
         "com estratégia e não só dicas, você investiria nele nos próximos "
         "30 dias?",
         [("A", "Sim, se eu entender que é o caminho certo para mim"),
          ("B", "Talvez, dependendo do formato e do valor"),
          ("C", "Prefiro esperar mais um tempo"),
          ("D", "Só estou pesquisando por enquanto")]),
    ]
    for label, tipo, q, alts in quiz:
        e.append(quiz_block(label, tipo, q, alts))
    e.append(Spacer(1, 4))
    e.append(Callout(
        "Lógica de qualificação",
        "P08 (A) com P06 (A/B/C/D) indica lead quente, vai direto para a "
        "avaliação estratégica. P08 (B) entra na nutrição via follow-up. "
        "P08 (C/D) recebe conteúdo antes do comercial. O filtro é por intenção "
        "e prontidão (“quero resolver”, “investir”), nunca por pergunta crua de "
        "renda, respeitando a sensibilidade do público."))
    e.append(Spacer(1, 12))
    e.append(SubEyebrow("Captura de dados · após a última pergunta"))
    e.append(Spacer(1, 5))
    e.append(Paragraph("Sua leitura personalizada está pronta.", S["q_title"]))
    e.append(Spacer(1, 4))
    e.append(Paragraph(
        "Deixe seus dados para receber o resultado e, se fizer sentido, "
        "conversar com a Stella sobre o próximo passo.", S["bodyl"]))
    e.append(Spacer(1, 6))
    e.append(Paragraph(
        "<b>Campos:</b> Nome* · WhatsApp* · E-mail (opcional) · @ do Instagram "
        "(opcional). &nbsp; <b>CTA:</b> Ver minha leitura personalizada.",
        S["bodyl"]))
    e.append(Spacer(1, 4))
    e.append(Paragraph(
        "<i>Privacidade: seus dados são confidenciais e usados apenas para o seu "
        "atendimento. Nada de spam.</i>", S["muted_i"]))

    # ----------------------------------------------------- 03 PÁGINA
    e.append(PageBreak())
    e += sec("03", "Página de Aplicação", "A copy da landing page")
    e.append(SubEyebrow("Headline + subheadline"))
    e.append(Spacer(1, 5))
    e.append(Paragraph(
        "Você não precisa de mais roupa. Precisa que a sua imagem comunique a "
        "autoridade que você já construiu.", S["q_title"]))
    e.append(Spacer(1, 6))
    e.append(Paragraph(
        "Consultoria de imagem com estratégia, não dicas de moda: você aprende a "
        "escolher cor, corte, forma e tecido com critério, e passa a ser vista "
        "do jeito que a sua competência merece. <b>CTA: Quero agendar minha "
        "avaliação estratégica.</b>", S["body"]))
    e.append(Spacer(1, 12))
    e.append(SubEyebrow("Prova social · logo após o headline"))
    e.append(Spacer(1, 5))
    e.append(Paragraph(
        "[DEPOIMENTO em vídeo/print de cliente com antes e depois de imagem e de "
        "percepção profissional] · [DEPOIMENTO de cliente que ganhou segurança "
        "em reuniões e eventos]. Inserir prints reais das redes da Stella, é o "
        "ativo de conversão mais forte deste nicho.", S["muted_i"]))
    e.append(Spacer(1, 12))
    e.append(SubEyebrow("Bloco de dor · espelho do cliente ideal"))
    e.append(Spacer(1, 7))
    e += dor_bullets([
        "Tem o guarda-roupa cheio e, mesmo assim, sente que não tem o que vestir",
        "Compra roupa com frequência, mas as peças acabam paradas por não saber combinar",
        "Perde tempo e energia toda manhã decidindo o que usar",
        "É excelente no que faz, mas sente que a imagem não passa isso",
        "Já viu profissionais menos preparadas serem levadas mais a sério pela aparência",
        "Fica insegura em reuniões, eventos e fotos importantes",
    ])
    e.append(Spacer(1, 3))
    e.append(Paragraph(
        "Se você se reconheceu em mais de uma dessas frases, o problema não é "
        "falta de roupa nem de bom gosto. É falta de estratégia de imagem.",
        S["body"]))

    e.append(PageBreak())
    e.append(SubEyebrow("Reframe · por que o esforço comum não resolve"))
    e.append(Spacer(1, 6))
    e.append(Paragraph(
        "A maioria das dicas de moda foca na peça, na tendência da estação, no "
        "“compre isto”. Você compra, usa uma vez e volta pra estaca zero, porque "
        "ninguém te ensinou o critério por trás da escolha. Imagem que comunica "
        "autoridade não vem de acumular roupa. Vem de entender o que cada "
        "elemento transmite e escolher de propósito, para o objetivo que você "
        "tem.", S["body"]))
    e.append(Spacer(1, 14))
    e.append(SubEyebrow("Mecanismo único · o método da Stella"))
    e.append(Spacer(1, 10))
    for n, t, b in [
        ("01", "Mapeamento de estilo e temperamento",
         "Entendemos quem você é, o seu momento profissional e a imagem que você "
         "precisa projetar. A estratégia parte de você, não de um padrão genérico."),
        ("02", "A psicologia por trás da imagem",
         "Você aprende o que cor, linha, forma e tecido comunicam ao inconsciente "
         "de quem olha, e por que hoje a sua imagem gera a percepção que gera."),
        ("03", "Estratégia de imagem personalizada",
         "Traduzimos tudo em critérios práticos: o que combina com o quê, o que "
         "comprar, o que usar do que você já tem, o que evitar. Você para de "
         "decidir no escuro."),
        ("04", "Autonomia para o resto da vida",
         "O objetivo não é te deixar dependente de mim. É te dar o critério para "
         "escolher sozinha, com segurança, todos os dias."),
    ]:
        e.append(NumItem(n, t, b))
    e.append(Spacer(1, 12))
    e.append(SubEyebrow("Autoridade · quem conduz"))
    e.append(Spacer(1, 6))
    e.append(Paragraph(
        "Stella Grützmann é consultora de imagem e estilo, com um método próprio "
        "focado em conhecimento e estratégia, não em tendência. Atende "
        "profissionais consolidadas dentro e fora do Brasil, ajudando cada uma a "
        "alinhar a imagem à competência que já tem. [CREDENCIAL: formação, tempo "
        "de atuação, número de clientes atendidas, marcas ou veículos].",
        S["body"]))

    e.append(PageBreak())
    e.append(SubEyebrow("Oferta"))
    e.append(Spacer(1, 6))
    e.append(Paragraph(
        "O primeiro passo é uma Avaliação Estratégica: uma conversa individual em "
        "que a Stella entende o seu momento, a sua imagem atual e o objetivo que "
        "você quer alcançar, e te mostra o caminho. A partir dela, para quem "
        "decide seguir, conduzimos o Acompanhamento Estratégico, um processo "
        "estruturado de imagem, online, para todo o Brasil.", S["body"]))
    e.append(Spacer(1, 8))
    e.append(Callout(
        "CTA primário · quero agendar minha avaliação estratégica",
        "Reforço: agenda individual e limitada. Cada processo é conduzido de "
        "forma personalizada, para garantir profundidade no atendimento."))
    e.append(Spacer(1, 14))
    e.append(SubEyebrow("Para quem é / não é"))
    e.append(Spacer(1, 8))
    e.append(two_col_check(
        ["Você é excelente no que faz e quer que a imagem comunique isso",
         "Você quer aprender o critério, não só receber um “antes e depois”",
         "Você está disposta a um processo estruturado e a investir nele"],
        ["Você busca dica de moda pontual e barata",
         "Você quer que alguém escolha a roupa por você sem entender o porquê",
         "Você espera transformação sem participar do processo"]))
    e.append(Spacer(1, 16))
    e.append(SubEyebrow("FAQ"))
    e.append(Spacer(1, 8))
    e += faq([
        ("É consultoria de moda?",
         "Não. Moda é tendência passageira; aqui o foco é estratégia de imagem: o "
         "critério para você comunicar autoridade e escolher com autonomia, "
         "independente da estação."),
        ("Preciso comprar roupa nova?",
         "Não necessariamente. Boa parte do trabalho é aprender a usar melhor o "
         "que você já tem e a comprar com critério daqui pra frente, o que "
         "costuma economizar dinheiro."),
        ("Funciona online?",
         "Sim. Os encontros são ao vivo e online, e a estratégia é entregue de "
         "forma personalizada, para todo o Brasil e fora dele."),
        ("Quanto tempo leva?",
         "O carro-chefe é um acompanhamento de 90 dias, definido conforme o seu "
         "momento. Há também um formato de entrada mais curto para casos "
         "pontuais."),
        ("E se na avaliação eu decidir não seguir?",
         "Sem problema. A avaliação já te entrega clareza sobre a sua imagem e o "
         "caminho. Seguir o processo é uma decisão sua."),
    ])
    e.append(SubEyebrow("CTA final"))
    e.append(Spacer(1, 5))
    e.append(Paragraph(
        "Dar o primeiro passo: agendar minha avaliação estratégica.",
        S["q_title"]))
    e.append(Spacer(1, 4))
    e.append(Paragraph(
        "<i>Microcopy: atendimento individual e confidencial. A sua imagem e o "
        "seu momento são tratados com sigilo.</i>", S["muted_i"]))

    # ----------------------------------------------------- 04 ANÚNCIOS
    e.append(PageBreak())
    e += sec("04", "Anúncios", "Copy de mídia paga")
    e.append(Callout(
        "Compliance · Meta",
        "Evitar afirmações em 2ª pessoa que atribuam um defeito à pessoa (“você "
        "não sabe se vestir”, “você é insegura”). A Meta reprova. Usar 1ª pessoa, "
        "aspiracional ou pergunta aberta. As copies abaixo já seguem isso."))
    e.append(Spacer(1, 12))
    e.append(SubEyebrow("Big Idea · versão anúncio"))
    e.append(Spacer(1, 5))
    e.append(Paragraph(
        "A sua competência já é grande. O que talvez ainda não esteja à altura "
        "dela é o que a sua imagem comunica antes de você falar.", S["q_title"]))

    e.append(PageBreak())
    e += ad_angle(
        "Ângulo 1 · Dor / identificação", "Guarda-roupa cheio, nada pra vestir",
        "espelhar o impasse de quem tem muita roupa e nenhuma estratégia.",
        "Você tem o armário cheio e ainda sente que não tem o que vestir? "
        "O problema não é a roupa.",
        curta="Quem tem o guarda-roupa cheio e mesmo assim não sabe o que vestir "
        "conhece essa frustração. Não é falta de roupa, é falta de estratégia de "
        "imagem: critério para escolher cor, corte e combinação com intenção. "
        "Faça uma leitura da sua imagem em 2 minutos. [link]",
        media="Tem uma cena que se repete: o armário cheio, a manhã correndo, e "
        "aquela sensação de não ter o que vestir. Você compra, mas as peças ficam "
        "paradas, porque ninguém te ensinou o critério por trás da escolha. Imagem "
        "que comunica autoridade não vem de acumular roupa, vem de entender o que "
        "cada elemento transmite e escolher de propósito. É disso que trata a "
        "consultoria de imagem com estratégia. Responda 8 perguntas e receba uma "
        "leitura personalizada da sua imagem. [link]",
        longa="Existe um incômodo que muita profissional excelente carrega em "
        "silêncio: o guarda-roupa está cheio, ela compra com frequência, e ainda "
        "assim, toda manhã, bate a sensação de que não tem o que vestir. As peças "
        "ficam paradas, as combinações não fecham, e o tempo que deveria ser dela "
        "vira decisão no escuro. A conclusão injusta que vem é “eu não sei me "
        "vestir”. Não é isso. O motivo não é falta de roupa nem de bom gosto, é "
        "falta de estratégia de imagem. A maioria das dicas de moda foca na peça e "
        "na tendência da estação, nunca no critério: o que cada cor, corte, forma "
        "e tecido comunica sobre você antes de você falar. Quando você aprende "
        "esse critério, para de comprar por impulso, passa a usar o que já tem e "
        "constrói uma imagem que trabalha a seu favor. Faça uma leitura "
        "personalizada da sua imagem em 2 minutos e entenda o primeiro passo. "
        "[link]")

    e.append(PageBreak())
    e += ad_angle(
        "Ângulo 2 · Mecanismo único", "Imagem é estratégia, não moda",
        "diferenciação, por que este trabalho é diferente de dica de moda.",
        "A diferença entre seguir tendência e construir uma imagem que trabalha "
        "por você.",
        curta="Moda foca na tendência da estação. Estratégia de imagem foca em "
        "você: no que cada escolha comunica e no objetivo que você tem. É por isso "
        "que o resultado dura, e não sai de moda. Veja se faz sentido pra você. "
        "[link]",
        media="A maior parte do conteúdo sobre imagem trabalha a tendência: a cor "
        "do ano, a peça do momento. Some, e você continua sem saber escolher "
        "sozinha. A consultoria de imagem com estratégia faz o caminho inverso: "
        "parte de quem você é e do que você precisa comunicar, e te ensina o "
        "critério por trás de cor, linha, forma e tecido. Não é te dizer o que "
        "comprar, é te dar autonomia para decidir com segurança, todos os dias. "
        "Faça uma leitura da sua imagem e entenda o caminho. [link]",
        longa="Por que algumas mulheres transmitem autoridade no instante em que "
        "entram numa sala, e outras, igualmente competentes, passam despercebidas? "
        "Quase nunca é sobre gastar mais com roupa. É sobre estratégia. A imagem "
        "comunica antes da primeira palavra, e cada elemento (cor, caimento, "
        "forma, tecido) manda um sinal para o inconsciente de quem olha. Dica de "
        "moda ignora isso: entrega a peça da estação e te deixa na mesma dúvida na "
        "estação seguinte. A consultoria de imagem com estratégia trabalha a "
        "origem: mapeia o seu estilo e o seu momento, te ensina a psicologia por "
        "trás da imagem, constrói uma estratégia personalizada e te dá o critério "
        "para escolher sozinha, para sempre. Não é sobre estar na moda, é sobre "
        "ser vista do jeito que a sua competência merece. Faça uma leitura da sua "
        "imagem em 2 minutos. [link]")

    e.append(PageBreak())
    e += ad_angle(
        "Ângulo 3 · Prova social / transformação", "A virada de percepção",
        "mostrar transformação real, o ativo mais forte deste nicho. Apoiar em "
        "depoimento das redes.",
        "Ela não mudou de profissão nem comprou um guarda-roupa novo. Mudou a "
        "estratégia da imagem, e a forma como é vista mudou junto.",
        extra="[DEPOIMENTO curto, médio e longo: substituir quando houver case "
        "com antes e depois de imagem, de segurança ou de percepção profissional. "
        "Priorizar coleta de depoimento em vídeo das primeiras clientes.]")

    e.append(PageBreak())
    e.append(SubEyebrow("10 headlines para teste A/B"))
    e.append(Spacer(1, 8))
    e += bullets([
        "Você não precisa de mais roupa. Precisa de estratégia de imagem.",
        "Guarda-roupa cheio e nada pra vestir? O problema não é a roupa.",
        "A sua competência é grande. E o que a sua imagem comunica?",
        "Imagem é estratégia, não moda. E estratégia se aprende.",
        "Por que profissionais menos preparadas são levadas mais a sério.",
        "Pare de comprar por impulso e comece a escolher com critério.",
        "A sua imagem fala antes de você. O que ela anda dizendo?",
        "Ser vista como a autoridade que você já é começa pela imagem.",
        "Não é sobre estar na moda. É sobre ser levada a sério.",
        "Descubra em 2 minutos o que a sua imagem comunica sobre você.",
    ])
    e.append(Spacer(1, 12))
    e.append(SubEyebrow("5 hooks para vídeo"))
    e.append(Spacer(1, 8))
    e += bullets([
        "“Você tem o armário cheio e ainda sente que não tem o que vestir? Não é a roupa.”",
        "“A sua imagem comunica antes de você falar. E nem sempre o que ela diz combina com a sua competência.”",
        "“A diferença entre seguir tendência e construir uma imagem que trabalha por você.”",
        "“Já viu alguém menos preparada ser levada mais a sério? Quase sempre é imagem, não talento.”",
        "“Consultoria de imagem não é te dizer o que comprar. É te dar o critério para escolher sozinha.”",
    ])

    # ----------------------------------------------------- 05 DIAGNÓSTICO
    e.append(PageBreak())
    e += sec("05", "Relatório de Diagnóstico", "A leitura entregue após o quiz")
    e.append(Paragraph(
        "Instruções de uso: substitua os campos {{ }} pelas respostas do quiz. "
        "[DEPOIMENTO] indica onde inserir prova real. Botões [AGENDAR] levam ao "
        "WhatsApp ou calendário. Tom direto e acolhedor, nunca condescendente. "
        "Adapte a leitura ao padrão dominante das respostas (P02/P03).",
        S["muted_i"]))
    e.append(Spacer(1, 12))
    for n, t, b in [
        ("1", "Abertura personalizada",
         "Olá, {{nome}}. Obrigada por esses minutos olhando pra sua imagem com "
         "atenção. Pelo que você respondeu, hoje a sua relação com a imagem é de "
         "{{situacao}}, e o que mais te incomoda é {{problema}}. Isso é mais comum "
         "do que parece entre profissionais como você, e tem solução."),
        ("2", "Leitura do cenário",
         "Você tem muito a comunicar e, mesmo assim, sente que {{implicacao}}. "
         "Quando a imagem não é pensada com estratégia, ela fala por conta "
         "própria, e nem sempre o que ela diz combina com a sua competência."),
        ("3", "O mecanismo do problema",
         "Você já tentou {{tentativa}}. Faz sentido não ter resolvido: dica de "
         "moda foca na peça e na tendência, não no critério. Sem entender o que "
         "cada escolha comunica, você compra mais e continua no mesmo lugar. Não é "
         "falta de bom gosto, é falta de estratégia."),
        ("4", "Dois cenários",
         "Continuar como está: guarda-roupa cheio, decisões no escuro, a sensação "
         "de ser vista abaixo do que você é. Com estratégia de imagem: escolhas "
         "com critério, autonomia para se vestir, e uma imagem que reforça a sua "
         "autoridade antes de você falar."),
        ("5", "O custo de continuar",
         "{{nome}}, o que custa caro não é investir na sua imagem. É mais um ano "
         "sendo {{custo_da_inacao}}, perdendo espaço para quem se posiciona "
         "melhor. O tempo passa do mesmo jeito; a diferença é como você será vista "
         "no fim dele."),
        ("6", "O mecanismo da solução",
         "O método da Stella trabalha em quatro frentes: mapear estilo e "
         "temperamento, entender a psicologia por trás da imagem, construir a sua "
         "estratégia personalizada e te dar autonomia para escolher sozinha. Não é "
         "moda, é critério que fica com você."),
        ("7", "O que precisa acontecer agora",
         "Baseado em {{objetivo}}, o foco da sua estratégia começaria por "
         "{{recomendacao_por_gargalo}}. [Ex.: “ser vista como autoridade” leva a "
         "cor, forma e composições de presença; “praticidade” leva a guarda-roupa "
         "cápsula e combinações; “insegurança em eventos” leva a estratégia por "
         "ocasião.]"),
        ("8", "Prova",
         "[DEPOIMENTO de cliente com objetivo parecido com o de {{nome}} que "
         "alinhou imagem e percepção com a consultoria.]"),
        ("9", "Convite",
         "[AGENDAR] Quero agendar minha avaliação estratégica. Conversa "
         "individual, online, sem compromisso: você apresenta o seu momento e "
         "entende como a estratégia de imagem resolve o seu caso."),
    ]:
        e.append(NumItem(n, t, b))
    e.append(Spacer(1, 8))
    e.append(Paragraph(
        "<i>Rodapé: este resultado é uma leitura inicial baseada nas suas "
        "respostas, não um diagnóstico completo. A avaliação estratégica é o "
        "passo que aprofunda o seu caso.</i>", S["muted_i"]))

    # ----------------------------------------------------- 06 CADÊNCIA
    e.append(PageBreak())
    e += sec("06", "Cadência de Follow-up", "12 dias de acompanhamento")
    e.append(Paragraph(
        "Voz da Stella: acolhedora, madura e segura, de mulher para mulher, nunca "
        "vendedora agressiva (o público valoriza sofisticação; tom errado "
        "afasta). Personalizar com {{nome}} e a resposta do quiz. Quem opera: "
        "Stella ou equipe no WhatsApp.", S["body"]))
    e.append(Spacer(1, 8))
    e.append(Callout(
        "Níveis de FUP",
        "N1 não respondeu o diagnóstico · N2 engajou e parou · N3 quer agendar e "
        "adia · N4 no-show na avaliação · N5 fez a avaliação e não fechou · "
        "N6 base fria (relacionamento longo)."))
    e.append(Spacer(1, 12))
    e.append(cadence([
        ("Dia 1", "Manhã · até 2h",
         "{{nome}}, sua leitura de imagem chegou. Dei uma olhada no que você "
         "respondeu e tem um ponto importante aí pra conversar. Me manda uma "
         "mensagem quando puder ler com calma."),
        ("Dia 2", "Tarde · N1",
         "Check-in leve (mandar só o emoji de olhinhos) e, se não responder: "
         "“Normalmente quem não responde ainda não parou pra ler, a rotina "
         "aperta. Quando puder, me diz o que achou. Tem uma coisa sobre "
         "{{problema}} que quero te perguntar.”"),
        ("Dia 3", "Tarde · check-in",
         "Uma pergunta rápida, {{nome}}: em qual situação você mais sente que a "
         "sua imagem não te representa, reunião, evento, dia a dia? Me fala e eu "
         "te explico o que a gente trabalharia primeiro."),
        ("Dia 4", "Manhã · valor",
         "Um detalhe que muita gente não sabe: a cor e o caimento de uma peça "
         "mudam a percepção de autoridade antes de qualquer palavra. Não é "
         "estética à toa, é estratégia. Faz sentido pro que você sente?"),
        ("Dia 5", "Ligação · dia-chave",
         "Tenta ligar. Se não atender, áudio curto: “{{nome}}, tentei te ligar. "
         "Não precisa ser agora, mas quando tiver um tempinho me chama. Quero "
         "entender melhor o seu momento antes de recomendar qualquer coisa.”"),
        ("Dia 6", "Tarde · prova",
         "[DEPOIMENTO] {{nome}}, isso aqui aconteceu com alguém num momento "
         "parecido com o seu. Se quiser conversar sobre o que faria sentido pra "
         "você, é só falar."),
        ("Dia 7", "Tarde · check-in",
         "Check-in leve: mandar só o emoji de olhinhos, sem texto."),
        ("Dia 8", "Manhã · oportunidade",
         "{{nome}}, atendo poucas clientes por vez justamente pra construir a "
         "estratégia de cada uma com profundidade, por isso a agenda é limitada. "
         "Não é urgência artificial, é o formato. Se está considerando, vale "
         "conversarmos antes de a agenda fechar."),
        ("Dia 9", "Manhã · CTA",
         "Se você já tentou resolver comprando mais roupa e não mudou, o que "
         "falta não é roupa, é estratégia. É isso que a consultoria entrega. Uma "
         "avaliação estratégica, sem compromisso, pra ver se faz sentido: [LINK]."),
        ("Dia 10", "Áudio pessoal",
         "Áudio de 30 a 40s, tom próximo: “{{nome}}, quero entender o que ainda te "
         "segura. Pode ser que não seja o momento, e tudo bem, prefiro que você me "
         "diga do que ficar sem resposta. Se for dúvida, é só perguntar. Tô aqui.”"),
        ("Dia 11", "Manhã · última prova",
         "[ANTES E DEPOIS] A transformação que mais me marca é de quem quase não "
         "veio. Fica o convite, no seu tempo."),
        ("Dia 12", "Pré break-up",
         "{{nome}}, vou parar de te escrever pra não virar incômodo. Mas a porta "
         "fica aberta: quando você sentir que é hora de alinhar a sua imagem à sua "
         "competência, é só me chamar aqui. Torço por você."),
    ]))
    e.append(Spacer(1, 14))
    e.append(Callout(
        "N5 · fez a avaliação e não fechou",
        "48h depois: “Ficou alguma dúvida que não ficou clara?”. No dia 5: “O que "
        "travou a decisão: financeiro, timing, outra coisa? Me fala direto que "
        "consigo ser mais útil.”"))
    e.append(Spacer(1, 8))
    e.append(Callout(
        "N6 · base fria",
        "Gancho de reativação com um quick win imediato (uma dica de imagem "
        "aplicável) e o relacionamento já existente. Reabrir pela troca de valor, "
        "não pela oferta. Oferecer condição se houver."))

    # ----------------------------------------------------- FECHAMENTO
    e.append(PageBreak())
    e.append(Spacer(1, 40))
    e.append(Paragraph(
        f'<font name="{DISP}" color="{hx(INK)}" size="20">Simple Acc</font>',
        mk("cl", leading=24)))
    e.append(Spacer(1, 10))
    e.append(HRule(width=CW * 0.12, color=ACCENT, t=1.2))
    e.append(Spacer(1, 12))
    e.append(Paragraph(
        "Documento de estratégia e copy do Funil de Quiz para a consultoria de "
        "imagem e estilo de Stella Grützmann. Construído a partir do "
        "posicionamento de imagem como estratégia (não moda) e da arquitetura do "
        "funil de quiz. Próximos passos: aprovar a copy, montar o quiz, o "
        "diagnóstico e a página, subir os criativos com a observação de "
        "compliance da Meta e ativar a cadência de follow-up.", S["body"]))
    e.append(Spacer(1, 14))
    e.append(Paragraph(
        f'<font name="{UI_B}" color="{hx(MUTE)}" size="8">'
        f'CONFIDENCIAL · JUNHO DE 2026 · VERSÃO 1.0</font>', mk("m", leading=11)))

    doc.build(e)
    return doc.filename


if __name__ == "__main__":
    print("Gerado:", build())
