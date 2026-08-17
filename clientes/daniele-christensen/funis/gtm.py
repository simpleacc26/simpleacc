# -*- coding: utf-8 -*-
"""
Injeção do Google Tag Manager, compartilhada pelas duas builds de produção.

O contêiner é o mesmo nas duas páginas (GTM-PHG5489R), porque o funil é um só:
o lead entra pelo quiz e volta na Etapa 2. Contêineres separados obrigariam a
casar duas propriedades na mão para ver a jornada inteira.

O GTM **não** entra nos protótipos. Protótipo é a URL que a Dani e a gente
abrimos para revisar copy; se ele disparasse tag, a medição da campanha viria
suja de visita interna.
"""

CONTAINER = "GTM-PHG5489R"

CABECA = """<!-- Google Tag Manager -->
<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','%s');</script>
<!-- End Google Tag Manager -->""" % CONTAINER

# O <body> explícito não é enfeite. Estes arquivos não têm <html>/<head>/<body>,
# e o parser só sai da <head> quando encontra conteúdo de corpo. Sem abrir o
# <body> aqui, o <noscript> cairia dentro da <head> e o iframe não renderizaria
# justamente no caso em que ele existe para servir: navegador sem JavaScript.
CORPO = """<body>
<!-- Google Tag Manager (noscript) -->
<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=%s"
height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
<!-- End Google Tag Manager (noscript) -->""" % CONTAINER


def injeta(html, troca):
    """Põe o script no fim da head e o noscript no início do body.

    `troca` é a função de substituição verificada da build, para que a injeção
    falhe alto se o arquivo mudar de forma.
    """
    html = troca(html, "<style>", CABECA + "\n<style>", "a abertura do <style>")
    html = troca(html, "</style>\n", "</style>\n\n" + CORPO + "\n", "o fim do <style>")
    return html


def confere(html):
    """Erros que só apareceriam em produção, com a tag já publicada."""
    if html.count(CONTAINER) != 2:
        return "esperava o contêiner %s duas vezes (script e noscript)" % CONTAINER
    if html.count("<body>") != 1:
        return "esperava exatamente um <body>"
    if html.index("gtm.js?id=") > html.index("<body>"):
        return "o script do GTM precisa vir antes do <body>"
    if html.index("<body>") > html.index("ns.html?id="):
        return "o noscript do GTM precisa vir depois do <body>"
    return ""
