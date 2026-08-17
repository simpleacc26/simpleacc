# -*- coding: utf-8 -*-
"""
Gera a versão de produção do Quiz (Etapa 1) a partir do protótipo.

    python3 build.py

Existe para não haver dois arquivos divergindo. O protótipo continua sendo a
fonte da verdade da copy; esta build tira dele o que é andaime de demonstração
e acrescenta o que só produção precisa. Quando a Dani pedir correção de texto,
mexa no protótipo e rode isto de novo.

O que sai:
  - a barra de demonstração e o painel "Dados capturados"
  - o aviso "as respostas vão para o CRM da Pulsar" (o lead não precisa saber
    o nome do CRM, e falar em CRM na hora de pedir o telefone assusta)

O que entra:
  - title e meta description de página real, e noindex (é tráfego pago, não
    busca orgânica, e página de campanha indexada só gera ruído)
  - captura de UTM, fbclid/gclid e referrer, que seguem no webhook. Sem isso
    não dá para saber qual anúncio trouxe qual lead.
  - o Google Tag Manager (ver ../gtm.py)

Toda remoção é verificada no fim. Se um trecho do protótipo mudar de forma e um
recorte deixar de casar, a build falha em vez de publicar um arquivo quebrado.
"""

import os, re, shutil, sys

AQUI = os.path.dirname(os.path.abspath(__file__))
FONTE = os.path.join(AQUI, "..", "prototipo-quiz-lp")
sys.path.insert(0, os.path.join(AQUI, ".."))
import gtm

TITULO = "Diagnóstico de Gestão e Liderança · Dra. Daniele Christensen"
DESCRICAO = ("Descubra em 2 minutos o que está travando a sua gestão e receba "
             "um diagnóstico com o seu cenário.")

# rastreio de campanha: lido uma vez, na carga, e anexado ao webhook
RASTREIO = '''
// de onde o lead veio. Sem isto o webhook chega sem origem e não dá para
// dizer qual anúncio pagou por qual lead.
var RASTREIO = (function(){
  var p = new URLSearchParams(location.search), r = {};
  ["utm_source","utm_medium","utm_campaign","utm_content","utm_term",
   "fbclid","gclid","ttclid"].forEach(function(k){
    var v = p.get(k); if(v) r[k] = v;
  });
  if(document.referrer) r.referrer = document.referrer;
  r.pagina = location.origin + location.pathname;
  return r;
})();
'''


def corta(html, inicio, fim, oque):
    """Remove de `inicio` até `fim`, inclusive. Falha se não achar."""
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
                 "color:var(--accent);max-width:700px;margin:0 auto 8px}\n",
                 "o CSS da demonstração")

    # ---------------------------------------------------------------- HTML
    html = corta(html, '<div class="demobar">',
                 '<div class="grid" id="painelGrid"></div>\n</div>\n',
                 "a barra e o painel de demonstração")

    # -------------------------------------------------------- JS de demo
    for nome in ["linha", "atualizaPainel", "togglePainel", "reiniciar", "pular"]:
        html = corta(html, "function %s(" % nome, "\n}\n",
                     "a função %s()" % nome)
    html = re.sub(r"[ \t]*atualizaPainel\(\);\n", "", html)
    html = re.sub(r"\n{3,}", "\n\n", html)   # fecha os buracos deixados pelos cortes

    # ------------------------------------------------------ ajustes de copy
    html = troca(html,
                 '  tela.appendChild(el("p","nota","Ao concluir, as respostas '
                 'vão para o CRM da Pulsar."));\n',
                 "", "o aviso do CRM")

    # ------------------------------------------------------------- cabeça
    html = troca(html, "<title>Protótipo do Funil Grokker</title>",
                 '<title>%s</title>\n'
                 '<meta name="description" content="%s">\n'
                 '<meta name="robots" content="noindex, nofollow">'
                 % (TITULO, DESCRICAO), "o title")

    # ------------------------------------------------------------ rastreio
    fim_destinos = '"https://hook.us2.make.com/v0ungryn21i7gk3q0ld4rxamf3g2m5tp"\n];'
    html = troca(html, fim_destinos, fim_destinos + "\n" + RASTREIO,
                 "o fim da lista de destinos")
    html = troca(html, "    etapa: 1,\n",
                 "    etapa: 1,\n    rastreio: RASTREIO,\n", "o campo etapa do payload")

    # ----------------------------------------------------------------- GTM
    html = gtm.injeta(html, troca)
    erro = gtm.confere(html)
    if erro:
        sys.exit("build: GTM — " + erro)

    # ------------------------------------------------------------ conferência
    proibidos = ["demobar", "painelGrid", "Demonstração", "togglePainel",
                 "atualizaPainel", "CRM da Pulsar", "function pular",
                 "Protótipo"]
    for p in proibidos:
        if p in html:
            sys.exit("build: sobrou %r no arquivo de produção" % p)

    obrigatorios = ["DESTINOS", "telefoneCanonico", "RASTREIO",
                    'name="viewport"', "Diagnostico-01-o-adiador.pdf",
                    "dani.jpg", "noindex"]
    for o in obrigatorios:
        if o not in html:
            sys.exit("build: faltou %r no arquivo de produção" % o)

    open(os.path.join(AQUI, "index.html"), "w", encoding="utf-8").write(html)
    shutil.copy(os.path.join(FONTE, "dani.jpg"), os.path.join(AQUI, "dani.jpg"))

    origem = os.path.getsize(os.path.join(FONTE, "index.html"))
    print("ok — index.html %d bytes (protótipo tinha %d, saíram %d de andaime)"
          % (len(html.encode()), origem, origem - len(html.encode())))


main()
