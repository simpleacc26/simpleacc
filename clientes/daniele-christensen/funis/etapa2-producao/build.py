# -*- coding: utf-8 -*-
"""
Gera a versão de produção da Etapa 2 a partir do protótipo.

    python3 build.py

Mesma ideia da build do quiz: o protótipo em ../prototipo-etapa2 continua sendo
a fonte da verdade da copy, e aqui sai o arquivo que o lead recebe.

O que sai:
  - a barra de demonstração, o painel "O que vai para o CRM" e os atalhos de
    preenchimento. O lead nunca deveria ver a nota dele nem o payload do CRM:
    a Etapa 2 é diagnóstico para o Closer ler, não devolutiva na tela.

O que entra:
  - title de página real e o Google Tag Manager (ver ../gtm.py)

O `noindex` já vem do protótipo, e continua valendo: a página é confidencial e
só deve ser aberta por quem recebeu o link no WhatsApp.
"""

import os, re, sys

AQUI = os.path.dirname(os.path.abspath(__file__))
FONTE = os.path.join(AQUI, "..", "prototipo-etapa2")
sys.path.insert(0, os.path.join(AQUI, ".."))
import gtm

TITULO = "Diagnóstico Completo · Dra. Daniele Christensen"


def corta(html, inicio, fim, oque):
    a = html.find(inicio)
    if a < 0:
        sys.exit("build: não achei o início de %s" % oque)
    b = html.find(fim, a)
    if b < 0:
        sys.exit("build: não achei o fim de %s" % oque)
    return html[:a] + html[b + len(fim):]


def troca(html, velho, novo, oque, vezes=1):
    if html.count(velho) != vezes:
        sys.exit("build: esperava %d ocorrência(s) de %s, achei %d"
                 % (vezes, oque, html.count(velho)))
    return html.replace(velho, novo)


def main():
    html = open(os.path.join(FONTE, "index.html"), encoding="utf-8").read()

    # ---------------------------------------------------------------- CSS
    html = corta(html,
                 "  /* ---------- barra de demonstração",
                 "font-size:11.5px;line-height:1.5;color:#9a978f;margin:0;\n  }\n",
                 "o CSS da demonstração")

    # ---------------------------------------------------------------- HTML
    html = corta(html, '<div class="demobar">',
                 '<pre id="painelJson">—</pre>\n  </div>\n</div>\n',
                 "a barra e o painel de demonstração")

    # -------------------------------------------------------- JS de demo
    for nome in ["linha", "atualizaPainel", "togglePainel", "reiniciar", "preencher"]:
        html = corta(html, "function %s(" % nome, "\n}\n", "a função %s()" % nome)
    html = corta(html, "var PRESETS = {", "};\n", "os atalhos de preenchimento")
    html = corta(html,
                 "/* ------------------------------------------------------------ demonstração */",
                 "// atalhos com respostas fixas, para ver o cálculo e o payload sem responder tudo\n",
                 "o cabeçalho da seção de demonstração")
    html = re.sub(r"[ \t]*atualizaPainel\(\);\n", "", html)
    html = re.sub(r"\n{3,}", "\n\n", html)   # fecha os buracos deixados pelos cortes

    # ------------------------------------------------------------- cabeça
    html = troca(html, "<title>Etapa 2 — Diagnóstico Completo Grokker</title>",
                 "<title>%s</title>" % TITULO, "o title")

    # ------------------------------------------------------------------ GTM
    html = gtm.injeta(html, troca)
    erro = gtm.confere(html)
    if erro:
        sys.exit("build: GTM — " + erro)

    # ------------------------------------------------------------ conferência
    proibidos = ["demobar", "painelGrid", "painelJson", "Demonstração",
                 "togglePainel", "atualizaPainel", "PRESETS", "Etapa 2 —"]
    for p in proibidos:
        if p in html:
            sys.exit("build: sobrou %r no arquivo de produção" % p)

    obrigatorios = ["DESTINOS", "calendly.com/sucessodocliente",
                    'name="viewport"', "noindex", "PERGUNTAS", "montaAgenda",
                    "campoTelefone",
                    # os dois pedidos da Pulsar: o aviso de abertura e o carimbo
                    # do lead na agenda. Os dois são invisíveis na tela, então
                    # sumiriam sem ninguém notar se um recorte comesse o trecho.
                    "grokker-etapa2-iniciada", "avisaAbertura();", "utm_content="]
    for o in obrigatorios:
        if o not in html:
            sys.exit("build: faltou %r no arquivo de produção" % o)

    open(os.path.join(AQUI, "index.html"), "w", encoding="utf-8").write(html)

    origem = os.path.getsize(os.path.join(FONTE, "index.html"))
    print("ok — index.html %d bytes (protótipo tinha %d)"
          % (len(html.encode()), origem))


main()
