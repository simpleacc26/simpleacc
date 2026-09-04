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

# ---------------------------------------------------------------- opções
#
# Sem argumento nenhum, esta build gera EXATAMENTE o que está no ar hoje. A
# promessa de abertura só entra com --abertura, e é isso que impede o link de
# produção de mudar porque alguém rodou a build sem saber do combinado.
#
#   produção  : python3 build.py
#   validação : python3 build.py --abertura --sem-tags --sem-envio \
#                                --saida=quiz-etapa1-validacao
#
# --sem-tags e --sem-envio existem por causa do que a autópsia mostrou: teste
# feito em página com tag ativa vira conversão no pixel, infla o relatório da
# cliente e ensina o algoritmo a procurar o perfil errado. O link de validação
# não mede nada e não grava lead nenhum.
COM_ABERTURA = "--abertura" in sys.argv
SEM_TAGS     = "--sem-tags" in sys.argv
SEM_ENVIO    = "--sem-envio" in sys.argv

SAIDA = AQUI
for _a in sys.argv[1:]:
    if _a.startswith("--saida="):
        SAIDA = os.path.abspath(os.path.join(AQUI, "..", _a.split("=", 1)[1]))

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

    # ------------------------------------------------------------- abertura
    if COM_ABERTURA:
        # a promessa fica; só confere que ela sobreviveu ao resto dos recortes
        for pedaco in ["Descubra onde a sua Liderança", "receba o seu cenário na tela"]:
            if pedaco not in html:
                sys.exit("build: --abertura pedida mas %r não está no protótipo" % pedaco)
    else:
        # Sai tudo: marcação, CSS e o guard no render. O CSS e o guard seriam
        # inertes sem o elemento, mas deixá-los faria a build sem argumento
        # gerar um arquivo diferente do que está publicado, e é justamente essa
        # igualdade que garante que produção não muda sozinha.
        html = corta(html, "    <!-- A promessa que o anúncio faz", "</div>\n",
                     "o bloco da abertura")
        html = corta(html, "  /* ---------- abertura: a promessa",
                     "max-width:56ch}\n\n", "o CSS da abertura")
        html = corta(html, "\n  // a promessa vale para quem acabou de chegar",
                     "if(ab) ab.hidden = i > 0;\n", "o guard da abertura no render")

    # ------------------------------------------------------------ envio
    if SEM_ENVIO:
        html = troca(html,
                     '  "https://pulsar.app.n8n.cloud/webhook/grokker-quiz-etapa1",\n'
                     '  "https://hook.us2.make.com/v0ungryn21i7gk3q0ld4rxamf3g2m5tp"\n',
                     "  // validação: nenhum destino, nada é gravado\n",
                     "os destinos do webhook")
        # o aviso de clique no WhatsApp grava numa coluna da planilha real
        html = troca(html,
                     'var CLIQUE_ZAP = "https://hook.us2.make.com/l8nl0chvehsk2aonkg1hi5y34ok2ndap";',
                     'var CLIQUE_ZAP = "";  // validação: não avisa ninguém',
                     "o destino do clique no WhatsApp")
        html = troca(html, "  try{\n    if(navigator.sendBeacon) navigator.sendBeacon(CLIQUE_ZAP",
                     "  try{\n    if(!CLIQUE_ZAP) return;\n"
                     "    if(navigator.sendBeacon) navigator.sendBeacon(CLIQUE_ZAP",
                     "o disparo do clique")

    # ----------------------------------------------------------------- GTM
    if not SEM_TAGS:
        html = gtm.injeta(html, troca, pixel=True)
        erro = gtm.confere(html, pixel=True)
        if erro:
            sys.exit("build: GTM — " + erro)
    else:
        # sem <body> explícito o parser não fecha a head sozinho aqui
        html = troca(html, "</style>\n", "</style>\n\n<body>\n", "o fim do <style>")

    # ------------------------------------------------------------ conferência
    proibidos = ["demobar", "painelGrid", "Demonstração", "togglePainel",
                 "atualizaPainel", "CRM da Pulsar", "function pular",
                 "Protótipo"]
    for p in proibidos:
        if p in html:
            sys.exit("build: sobrou %r no arquivo de produção" % p)

    obrigatorios = ["DESTINOS", "telefoneCanonico", "RASTREIO",
                    'name="viewport"', "Diagnostico-01-o-adiador.pdf",
                    "dani.jpg", "noindex",
                    # as duas perguntas de colaboradores: cada uma só aparece
                    # num dos caminhos, então quem revisa por um só nunca vê a
                    # outra e sumir dela passaria despercebido
                    "aColab", "bColab",
                    "colaboradores:", "colaboradores_sob_responsabilidade:"]
    for o in obrigatorios:
        if o not in html:
            sys.exit("build: faltou %r no arquivo de produção" % o)

    # a abertura não pode vazar para produção por descuido
    if not COM_ABERTURA and "Descubra onde a sua Liderança" in html:
        sys.exit("build: a abertura sobrou no arquivo sem --abertura")

    if not os.path.isdir(SAIDA):
        os.makedirs(SAIDA)
    open(os.path.join(SAIDA, "index.html"), "w", encoding="utf-8").write(html)
    shutil.copy(os.path.join(FONTE, "dani.jpg"), os.path.join(SAIDA, "dani.jpg"))

    origem = os.path.getsize(os.path.join(FONTE, "index.html"))
    print("ok — %s/index.html %d bytes%s%s%s"
          % (os.path.basename(SAIDA), len(html.encode()),
             "  [abertura]" if COM_ABERTURA else "",
             "  [sem tags]" if SEM_TAGS else "",
             "  [sem envio]" if SEM_ENVIO else ""))


main()
