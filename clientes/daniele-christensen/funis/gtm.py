# -*- coding: utf-8 -*-
"""
Injeção da cabeça de medição, compartilhada pelas duas builds de produção.

Apesar do nome do arquivo, que ficou por causa do histórico, aqui mora tudo o
que mede a jornada: Google Tag Manager, o carregador do Meta Pixel e o
Microsoft Clarity.

O contêiner é o mesmo nas duas páginas (GTM-PHG5489R), porque o funil é um só:
o lead entra pelo quiz e volta na Etapa 2. Contêineres separados obrigariam a
casar duas propriedades na mão para ver a jornada inteira. O projeto do Clarity
segue a mesma regra, pelo mesmo motivo: uma gravação por lead, do anúncio ao
agendamento, e não dois painéis para cruzar na mão.

Nada disto entra nos protótipos nem no link de validação. Protótipo é a URL que
a Dani e a gente abrimos para revisar copy; se ele disparasse tag, a medição da
campanha viria suja de visita interna, e o Clarity encheria as gravações de
sessão nossa.

## Por que existe um preconnect e um carregador de Pixel aqui

O connect rate do Meta é `visitas na página ÷ cliques no link`, e a visita só é
contada quando o **PageView do Pixel** dispara. A página em si é leve — 16 KB
comprimidos, um único arquivo, sem fonte externa — mas o PageView estava no fim
de uma fila longa:

    HTML (16 KB) → gtm.js (128 KB comprimidos, 392 KB de JS) → fbevents.js
                 → clientParamBuilder na AWS → PageView

Cada elo é uma conexão nova, com DNS, TCP e TLS por cima. Num celular em rede
móvel, dentro do navegador embutido do Instagram, essa fila leva vários
segundos, e quem desiste antes do último elo é um clique que o Meta cobra e não
conta como visita. É esse buraco que aparece como connect rate de 65%.

Duas medidas atacam isso sem mexer no que a página mostra:

1. **preconnect** para os dois domínios da fila. O navegador resolve DNS e faz
   o aperto de mão TLS enquanto ainda lê o HTML, em vez de esperar o gtm.js
   pedir. Economiza uma ida e volta em cada elo.
2. **O carregador do Pixel sai da fila.** O `fbevents.js` passa a baixar em
   paralelo com o gtm.js, e não depois dele. Quando a tag do GTM finalmente
   roda, a biblioteca já está na memória e o PageView sai na hora.

O `fbq('init')` daqui **não dispara PageView de propósito**. Quem dispara
continua sendo a tag do GTM, uma vez só. Se este arquivo passasse a disparar
também, a conta de visitas dobraria e o connect rate ficaria bonito e falso.
"""

CONTAINER = "GTM-PHG5489R"
PIXEL = "1818495198816821"
CLARITY_ID = "ygctxxrs01"

# Os dois domínios do caminho crítico da medição. O googletagmanager serve o
# gtm.js e, depois, o GA4; o connect.facebook.net serve o fbevents.js.
PRECONNECT = """<link rel="preconnect" href="https://www.googletagmanager.com" crossorigin>
<link rel="preconnect" href="https://connect.facebook.net" crossorigin>"""

# Carregador oficial do Pixel, sem a linha do PageView (ver o cabeçalho).
PIXEL_BASE = """<!-- Meta Pixel: só o carregador, o PageView é da tag do GTM -->
<script>!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window,document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init','%s');</script>
<!-- End Meta Pixel -->""" % PIXEL

CABECA = """<!-- Google Tag Manager -->
<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','%s');</script>
<!-- End Google Tag Manager -->""" % CONTAINER

# Microsoft Clarity: mapa de calor e gravação de sessão. Vai por último na
# cabeça, depois do Pixel e do GTM, de propósito.
#
# O connect rate do Meta depende de o PageView do Pixel sair rápido (o cabeçalho
# deste arquivo explica a fila inteira). O Clarity não participa dessa conta,
# então ele não pode disputar conexão com quem participa: entra depois, e o
# `t.async=1` do próprio snippet garante que ele nunca segura a renderização.
#
# Pelo mesmo motivo ele não ganha `preconnect`. Um terceiro aperto de mão TLS
# aberto na largada tiraria banda dos dois que decidem se a visita é contada.
CLARITY = """<!-- Microsoft Clarity -->
<script type="text/javascript">
    (function(c,l,a,r,i,t,y){
        c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
        t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
        y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
    })(window, document, "clarity", "script", "%s");
</script>
<!-- End Microsoft Clarity -->""" % CLARITY_ID

# O <body> explícito não é enfeite. Estes arquivos não têm <html>/<head>/<body>,
# e o parser só sai da <head> quando encontra conteúdo de corpo. Sem abrir o
# <body> aqui, o <noscript> cairia dentro da <head> e o iframe não renderizaria
# justamente no caso em que ele existe para servir: navegador sem JavaScript.
CORPO = """<body>
<!-- Google Tag Manager (noscript) -->
<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=%s"
height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
<!-- End Google Tag Manager (noscript) -->""" % CONTAINER


def injeta(html, troca, pixel=False):
    """Põe o script no fim da head e o noscript no início do body.

    `troca` é a função de substituição verificada da build, para que a injeção
    falhe alto se o arquivo mudar de forma.

    `pixel` liga o carregador do Meta Pixel. Vale só para a página que recebe
    tráfego pago — na Etapa 2 ele seria peso sem retorno, porque ninguém chega
    lá por anúncio.
    """
    cabeca = PRECONNECT + "\n" + CABECA
    if pixel:
        cabeca = PRECONNECT + "\n" + PIXEL_BASE + "\n" + CABECA
    cabeca = cabeca + "\n" + CLARITY
    html = troca(html, "<style>", cabeca + "\n<style>", "a abertura do <style>")
    html = troca(html, "</style>\n", "</style>\n\n" + CORPO + "\n", "o fim do <style>")
    return html


def confere(html, pixel=False):
    """Erros que só apareceriam em produção, com a tag já publicada."""
    if html.count(CONTAINER) != 2:
        return "esperava o contêiner %s duas vezes (script e noscript)" % CONTAINER
    if html.count("<body>") != 1:
        return "esperava exatamente um <body>"
    if html.index("gtm.js?id=") > html.index("<body>"):
        return "o script do GTM precisa vir antes do <body>"
    if html.index("<body>") > html.index("ns.html?id="):
        return "o noscript do GTM precisa vir depois do <body>"
    if html.count('rel="preconnect"') != 2:
        return "esperava os dois preconnect do caminho crítico"
    if html.index("preconnect") > html.index("gtm.js?id="):
        return "o preconnect precisa vir antes do script do GTM, senão não adianta"
    if html.count(CLARITY_ID) != 1:
        return "esperava o projeto %s do Clarity uma vez" % CLARITY_ID
    if html.index("clarity.ms/tag/") < html.index("gtm.js?id="):
        return ("o Clarity precisa vir depois do GTM: ele não entra na conta do "
                "connect rate e não pode disputar conexão com quem entra")
    if html.index("clarity.ms/tag/") > html.index("<body>"):
        return "o Clarity precisa ficar na <head>"
    if pixel:
        if html.count("fbevents.js") != 1:
            return "esperava o carregador do Pixel uma vez"
        if "fbq('track'" in html or 'fbq("track"' in html:
            return ("a página não pode disparar PageView: quem dispara é a tag "
                    "do GTM, e as duas juntas contariam a visita duas vezes")
        if html.index("fbevents.js") > html.index("gtm.js?id="):
            return "o Pixel precisa vir antes do GTM para baixar em paralelo"
    return ""
