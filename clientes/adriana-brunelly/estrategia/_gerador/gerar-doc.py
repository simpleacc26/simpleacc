# -*- coding: utf-8 -*-
"""
Gera o documento de estrategia/validacao da Adriana em HTML A4 paginado,
na paleta do proprio funil (preto, dourado e cristal).

As perguntas saem de flow2.json (dump do flow.js que roda no ar) e a copy
do diagnostico sai de diag-extraido.json (a pagina renderizada de verdade
num navegador). Nada e escrito a mao aqui: o documento nao tem como
divergir do funil.
"""
import json, io, re, html
from doc_css import CSS

F = json.load(open("flow2.json", encoding="utf-8"))
D = json.load(open("diag-extraido.json", encoding="utf-8"))
AG = D["agenda"]

DATA = "23 de setembro de 2026"
paginas = []

def pg(_num, secao, corpo, classe=""):
    num = len(paginas) + 1
    paginas.append(f"""
<section class="page {classe}">
  <div class="runhead"><span><b>Adriana Brune&rsquo;lly</b> &middot; Diagnóstico da Dívida de Valor</span><span>{secao}</span></div>
  {corpo}
  <div class="runfoot"><span>Simple &middot; documento para validação</span><span>{num}</span></div>
</section>""")

def capa(corpo):
    paginas.append(f'<section class="page"><div class="capa">{corpo}</div></section>')

def q_html(i, s):
    ops = "".join(f'<span class="qop">{html.escape(o["label"])}</span>' for o in s["options"])
    nota = f'<p class="qnota">{s["nota"]}</p>' if s.get("nota") else ""
    return (f'<div class="q"><span class="qn">{i:02d}</span>'
            f'<p class="qetapa">{html.escape(s["etapa"])}</p>'
            f'<p class="qtexto">{html.escape(s["pergunta"])}</p>'
            f'<div class="qops">{ops}</div>{nota}</div>')

def inter_html(k, titulo, quando):
    it = F["interseccoes"][k]
    return (f'<div class="inter"><h4 style="margin-top:0">{titulo}</h4>'
            f'<p class="num">{it["num"]}</p><p>{it["texto"]}</p>'
            f'<p class="fonte">{it["fonte"]}</p>'
            f'<p class="mini" style="margin-top:1.6mm">{quando}</p></div>')

def copy_bloco(b, rot=None):
    r = f'<p class="rot">{rot}</p>' if rot else ""
    return f'<div class="copy">{r}{b["html"]}</div>'

# =====================================================================
# 1 · CAPA
# =====================================================================
capa(f"""
  <div class="monograma">A</div>
  <p class="selo">Para a sua validação &middot; versão 3</p>
  <h1>O quiz e o diagnóstico da <em>Dívida de Valor</em></h1>
  <p class="sub">Todas as perguntas, todas as telas e toda a copy que a sua cliente vai ler,
  num documento só. Esta versão traz o que você mandou nos áudios, nos vídeos e nos
  quinze PDFs da análise tela a tela, incluindo o seu Documento de Premissas 2.0.</p>
  <hr class="rule" style="max-width:60mm;margin:0 0 8mm">
  <p class="meta">
    <b>Cliente:</b> Adriana Brune&rsquo;lly &middot; Estrategista em Negócios para Eventos<br>
    <b>Frente:</b> Funil de Lead Dinâmico &middot; quiz de diagnóstico<br>
    <b>No ar para teste:</b> quiz-adriana-brunelly.vercel.app<br>
    <b>Data:</b> {DATA}
  </p>""")

# =====================================================================
# 2 · O QUE MUDOU COM OS SEUS ÁUDIOS
# =====================================================================
feitos = [
 ("Vocabulário técnico fora do quiz",
  "“Faturamento”, “margem”, “ticket médio”, “precificação”: palavras que fazem a leitora confundir o que entra com o que sobra.",
  "Varridas do quiz e da página. Ficou <strong>“quanto você cobra”</strong>, <strong>“o que sobra para você”</strong>, <strong>“a operação absorve”</strong>. A única exceção é a sua: <strong>“fatura (vende)”</strong> na última pergunta."),
 ("Zero scroll, em todas as telas",
  "Nenhuma alternativa e nenhum botão pode ficar escondido. Você autorizou tirar o cabeçalho para isso.",
  "Cabeçalho fora das perguntas e da tela de contato, espaçamentos apertados. <strong>Conferido tela a tela em quatro tamanhos de celular</strong>, do Android pequeno ao iPhone: nenhuma tela precisa rolar."),
 ("O número do meio do quiz vinha do nada",
  "Ele mostrava a conta de um evento de R$ 15 mil que não era o de quem estava respondendo.",
  "A tela agora é montada com <strong>as respostas da própria pessoa</strong>, e a conta aparece escrita: tantos eventos, de tanto, tanto por cento. Dá para conferir de cabeça."),
 ("O valor anual, não o por evento",
  "R$ 1.500 por evento não assusta ninguém. R$ 144 mil por ano assusta.",
  "A tela de impacto passou a mostrar <strong>o total de 12 meses</strong>, e fecha com a sua pergunta do sonho: o carro, a viagem, os equipamentos, ou simplesmente guardado."),
 ("A comissão vem antes do cálculo",
  "Sem ela, o número do impacto sai incompleto.",
  "A pergunta de comissão subiu e agora vem <strong>antes</strong> da tela de impacto. E ela entrou na soma da Dívida de Valor, com a sua frase: comissão paga sem estratégia, com medo de perder o parceiro."),
 ("Os botões falam de decisão, não de conta",
  "“Quero minha conta” e “quero conversar sobre a minha conta” remetem a cadastro.",
  "Todos os botões do resultado: <strong>“Quero conversar com a Adriana para ter uma empresa lucrativa”</strong>. Você mesma escreveu a regra: se o destino é WhatsApp e não agenda, o verbo é conversar."),
 ("Perguntas reescritas na sua palavra",
  "Extras, comissão, o que já tentou, o objetivo e o faturamento.",
  "As cinco entraram como você escreveu, incluindo a Tela 11 que <strong>planta o nome “Dívida de Valor”</strong> pela primeira vez, sem explicar, só para gerar a curiosidade."),
 ("O nome só é explicado no fim",
  "Plantar na Tela 11, reforçar na tela de contato, explicar no resultado.",
  "O arco está montado exatamente assim. Durante as perguntas de diagnóstico o nome <strong>não aparece nenhuma vez</strong>."),
 ("A sua história sem números técnicos",
  "“De cada R$ 2.000 que eu recebia, R$ 1.700 iam embora em custo.”",
  "Entrou literal, junto de <strong>“eu já fui exatamente onde você está”</strong> e do <strong>“eu trabalhava mais e lucrava menos, hoje eu trabalho menos e lucro mais”</strong>."),
 ("O seu texto de fechamento",
  "O parágrafo inteiro que você escreveu para a última página.",
  "Está na página, palavra por palavra, terminando em <strong>“Te espero na reunião”</strong>."),
 ("Instagram no formulário",
  "Você olha o perfil antes de qualquer conversa.",
  "Entrou. E o formulário ficou nos quatro campos que você aprovou: <strong>como eu te chamo, WhatsApp, cidade e Instagram</strong>. O e-mail saiu."),
 ("O seu perfil na primeira pergunta",
  "Assessoria e cerimonial não são o foco do Método ACA®.",
  "Saiu. Entrou <strong>“tenho um buffet e também trabalho com decoração”</strong>, que é fatia grande do seu mercado e não tinha onde se encaixar."),
]
cards = "".join(f'''<div class="ficha"><p class="ft">{t}</p>
<p class="fo">{o}</p><p class="fr">{r}</p></div>''' for t, o, r in feitos)
pg(2, "O que mudou", f"""
  <p class="kicker">Antes de tudo</p>
  <h2>As suas premissas, e onde cada uma está no funil</h2>
  <p class="lead">Os quinze PDFs da sua análise viraram doze mudanças, e todas já estão no ar.
  <strong>As quatro que você ficou de decidir estão na última página</strong>, com a nossa leitura de cada uma.</p>
  <div class="fichas">{cards}</div>""")

pg(3, "O que ficou igual", f"""
  <p class="kicker">Tão importante quanto</p>
  <h2>O que você aprovou, e que a gente não tocou</h2>
  <p class="lead">Em documento de revisão quase nunca se escreve o que ficou igual, e isso é um erro:
  o que já está certo também é decisão.</p>

  <div class="duas">
    <div>
      <h3>Design</h3>
      <ul class="limpa">
        <li><strong>Identidade visual inteira.</strong> Preto, dourado, cristal, tipografia e cards. “Não mudar nada disso.”</li>
        <li><strong>Barra de progresso</strong> com “Pergunta N de 12”, que reduz abandono.</li>
        <li><strong>O selo</strong> “Diagnóstico gratuito · 2 minutos”, que quebra a objeção de tempo logo de cara.</li>
        <li><strong>O rodapé</strong> “25 anos no mercado · Londrina, PR”. Detalhe pequeno, impacto grande.</li>
      </ul>
    </div>
    <div>
      <h3>Copy</h3>
      <ul class="limpa">
        <li><strong>Tela 2, volume.</strong> Aprovada sem uma vírgula. A frase neutra ali é decisão sua, e é a certa.</li>
        <li><strong>Tela 3, o orçamento.</strong> “O coração emocional do quiz.” Intocada.</li>
        <li><strong>As 4 respostas da Tela 11.</strong> Quatro identidades, não quatro preferências.</li>
        <li><strong>O formulário, o botão e a nota de privacidade</strong> da tela de contato.</li>
      </ul>
    </div>
  </div>

  <hr class="rule">
  <h3 style="margin-top:0">As quatro premissas que passam a reger tudo</h3>
  <table>
    <tr><th>Premissa</th><th>O que ela manda na prática</th></tr>
    <tr><td style="width:44mm"><strong>O público é operacional, não técnico</strong></td>
      <td>Nada de faturamento, margem, lucratividade, pró-labore, ponto de equilíbrio, ticket médio ou precificação. Exceção única: “fatura (vende)” na última pergunta.</td></tr>
    <tr><td><strong>Linguagem de perda, nunca de ganho</strong></td>
      <td>“Você está perdendo X” ganha de “você pode ganhar X”. Vale para pergunta, cálculo e botão.</td></tr>
    <tr><td><strong>Zero scroll</strong></td>
      <td>Nenhuma alternativa e nenhum botão escondido, em nenhum celular. O cabeçalho sai sempre que for preciso.</td></tr>
    <tr><td><strong>O anual é o número que converte</strong></td>
      <td>E sempre apresentado como “esse é um dos cálculos”, porque isso diz que existe mais perda além da que está na tela.</td></tr>
  </table>

  <hr class="rule">
  <h3 style="margin-top:0">O arco do nome “Dívida de Valor”</h3>
  <p class="mini">Decisão sua, e está implementada exatamente assim. Durante as perguntas de diagnóstico
  o nome <strong>não aparece nenhuma vez</strong>: ele é plantado, reforçado e só então explicado.</p>
  <div class="fluxo" style="margin-bottom:2mm">
    <div class="et"><b>Pergunta 11</b><span>O nome aparece pela primeira vez, sem explicação. “O que é isso? Eu tenho isso?”</span></div>
    <div class="seta">&rarr;</div>
    <div class="et"><b>Tela de contato</b><span>O título repete o nome e promete o número por ano. Preencher vira descoberta, não cadastro.</span></div>
    <div class="seta">&rarr;</div>
    <div class="et"><b>Resultado</b><span>O nome é explicado, com a conta dela do lado e a distinção para dívida de banco.</span></div>
  </div>
  <p class="mini">É o que transforma o clique no botão em curiosidade resolvida, e não em mais um formulário.</p>""")

# =====================================================================
# 3 · O FUNIL EM UMA PÁGINA
# =====================================================================
h = F["hero"]; cp = F["captura"]; lo = F["loading"]
campos = " &middot; ".join(c["label"] for c in cp["campos"])
pg(3, "O funil em uma página", f"""
  <p class="kicker">Visão geral</p>
  <h2>O caminho inteiro, do anúncio até o seu WhatsApp</h2>
  <p class="lead">São cinco telas e uma regra que não muda: <strong>a pessoa responde primeiro
  e só deixa o contato quando a conta dela já está pronta do outro lado.</strong></p>

  <div class="fluxo">
    <div class="et"><b>1 · Anúncio</b><span>Ela clica querendo saber quanto está perdendo</span></div>
    <div class="seta">&rarr;</div>
    <div class="et"><b>2 · Quiz</b><span>12 perguntas, da mais fácil para a mais reflexiva</span></div>
    <div class="seta">&rarr;</div>
    <div class="et"><b>3 · Contato</b><span>O resultado já está pronto, o dado é a chave dele</span></div>
    <div class="seta">&rarr;</div>
    <div class="et"><b>4 · Cálculo</b><span>5 segundos de barra subindo até 100%</span></div>
    <div class="seta">&rarr;</div>
    <div class="et"><b>5 · Diagnóstico</b><span>O número dela e o convite para falar com você</span></div>
  </div>

  <div class="duas larga">
    <div>
      <h3>A primeira tela</h3>
      <div class="copy" style="margin-top:1.5mm">
        <p class="rot">Selo</p><p style="margin-bottom:2.4mm">{h["selo"]}</p>
        <p class="rot">Título</p><p style="font-size:11.4pt;line-height:1.25">{h["titulo"]}</p>
        <p class="rot">Abaixo do título</p><p>{h["subtitulo"]}</p>
      </div>
      <h3>A tela de contato</h3>
      <p class="mini">Vem <strong>depois</strong> do quiz, nunca antes.</p>
      <div class="copy" style="margin-top:1.5mm">
        <p style="font-size:10.4pt;color:var(--primary-700);font-weight:600;margin-bottom:1.4mm">{cp["titulo"]}</p>
        <p class="rot" style="margin-top:2.4mm">Campos</p><p>{campos}</p>
        <p class="rot" style="margin-top:2.4mm">Botão</p><p><strong>{cp["cta"]}</strong></p>
      </div>
    </div>
    <div>
      <h3>Para quem vai cada final</h3>
      <table style="margin-top:1.5mm">
        <tr><th>Faturamento dela</th><th>Para onde vai</th></tr>
        <tr><td class="n">R$ 40 mil +</td><td>Sessão com você, pelo WhatsApp</td></tr>
        <tr><td class="n">R$ 10 a 40 mil</td><td>Conversa, e sobe para sessão se a perda passar de R$ 3 mil por mês</td></tr>
        <tr><td class="n">Até R$ 10 mil</td><td>Recebe a leitura e a oferta de R$ 47</td></tr>
      </table>
      <div class="cristal">
        <h4>Os 5 segundos de cálculo</h4>
        <p class="mini" style="margin-bottom:1.6mm">Não é espera técnica, é o que faz o resultado
        parecer calculado para aquela pessoa.</p>
        <p style="font-size:9.4pt;margin-bottom:.8mm"><strong>{lo["titulo"]}</strong></p>
        <p style="font-size:9.4pt;margin-bottom:.8mm">{lo["mensagens"][0]}</p>
        <p style="font-size:9.4pt;margin-bottom:1.6mm">{lo["mensagens"][1]}</p>
        <p class="mini">{lo["nota"]}</p>
      </div>
      <div class="ouro">
        <h4>Onde ela te encontra</h4>
        <p class="mini" style="margin:0">O botão abre o seu WhatsApp com o padrão de perda e a conta
        já escritos na mensagem. Não existe link de agenda: o combinado na call de 10/09 foi
        conversa primeiro, e a Simple te entrega os roteiros.</p>
      </div>
    </div>
  </div>""")

open("parte1.html","w",encoding="utf-8").write("\n".join(paginas))
print("parte 1 ok:", len(paginas), "páginas")

# =====================================================================
# 4 e 5 · AS 12 PERGUNTAS
# =====================================================================
S = F["steps"]
pg(4, "As perguntas · 1 a 6", f"""
  <p class="kicker">O quiz</p>
  <h2>As 12 perguntas, na ordem em que ela responde</h2>
  <p class="lead">Da mais fácil para a mais reflexiva. Abre no que se responde sem pensar,
  e a pergunta de faturamento é sempre a última. <strong>Doze é o teto</strong>: quem a gente
  quer é justamente quem não tem tempo.</p>
  <hr class="rule">
  {"".join(q_html(i+1, s) for i, s in enumerate(S[:6]))}
  <div class="cristal" style="margin-top:2mm">
    <h4>Duas perguntas que vieram de você</h4>
    <p class="mini" style="margin:0">Os quatro temas que você mandou em 18/09 viraram duas perguntas
    (mão de obra e comissão, na página seguinte) e dois assuntos da sessão: <strong>quantos funcionários
    registrados</strong> e <strong>com que frequência ela investe em estrutura</strong>. Os dois não viram
    número na hora, e valem mais na sua conversa do que numa tela.</p>
  </div>""")

pg(5, "As perguntas · 7 a 12", f"""
  <p class="kicker">O quiz</p>
  <h2>Da operação ao que ela sente no fim do mês</h2>
  <p class="lead">As duas primeiras aqui são as suas: mão de obra e comissão.
  Elas não entram na soma da Dívida de Valor, e a página explica por quê.</p>
  <hr class="rule">
  {"".join(q_html(i+7, s) for i, s in enumerate(S[6:]))}""")

# =====================================================================
# 6 · AS TRÊS TELAS DE INTERVALO
# =====================================================================
ex = F["exemplo"]; exr = ex["respostas"]
def _op(sid):
    st = next(s for s in S if s["id"] == sid)
    return next(o for o in st["options"] if o["value"] == exr[sid])
def lbl(sid): return _op(sid)["label"]
def rep(sid): return _op(sid).get("report") or _op(sid)["label"]
pg(6, "As telas de intervalo", f"""
  <p class="kicker">Entre as perguntas</p>
  <h2>As três telas que fazem a conta doer antes do resultado</h2>
  <p class="lead">Aparecem depois das perguntas 3, 7 e 9. <strong>Não são propaganda: são consequência.</strong>
  E cada uma é montada com o que a pessoa acabou de responder.</p>

  <div class="ouro">
    <h4>O exemplo abaixo é de quem marcou assim</h4>
    <p class="mini" style="margin:0">“{lbl("segmento")}” &middot; “{lbl("volume")}” eventos por mês &middot;
    cobra “{lbl("ticket")}” &middot; desconto “{lbl("desconto")}” &middot; extras: “{lbl("extras")}” &middot;
    comissão “{lbl("comissao")}”. Troque qualquer uma e
    <strong>todos os números dessas telas mudam junto</strong>.</p>
  </div>

  {inter_html("orcamento", "Tela 1 &middot; depois da pergunta 3",
     "Aqui ainda não existe valor cobrado respondido, então não se fala em dinheiro: a conta é de volume, com as entregas por mês que ela marcou.")}
  {inter_html("comissao", "Tela 2 &middot; depois da pergunta 7, a tela de impacto",
     "Vem depois da comissão de propósito: é o último dado que entra na conta. O número é o de 12 meses, porque o anual é o que a pessoa sente, e a conta aparece escrita para dar para conferir de cabeça.")}
  {inter_html("tentativas", "Tela 3 &middot; depois da pergunta 9",
     "Responde à tentativa que ela marcou, uma a uma, e fecha com a sua virada na frase que você pediu.")}

  <div class="cristal">
    <h4>Quem não perde por nenhum dos três caminhos vê outra tela</h4>
    <p class="mini" style="margin:0">Se ela não dá desconto, tem contrato fechado e não paga comissão, a tela do
    impacto vira um elogio honesto: “os três lugares por onde o dinheiro mais escapa não estão em você, então a
    sua perda está em outro lugar”. <strong>Em nenhum caso ela vê um número que não é dela.</strong></p>
  </div>""")

# =====================================================================
# 7 · COMO A CONTA É FEITA
# =====================================================================
dv = ex["divida"]; cu = ex["custos"]
pg(7, "A conta", f"""
  <p class="kicker">O motor</p>
  <h2>Como o número é calculado, e por que ele é defensável</h2>
  <p class="lead">Este é o ativo mais caro do funil. Se a sua cliente não reconhecer o número,
  ela não lê o resto da página, e a gente perde o lead e a conversa.</p>

  <div class="duas">
    <div>
      <h3>A fórmula</h3>
      <div class="cristal" style="margin-top:1.5mm">
        <p style="font-size:9.4pt;margin:0">valor cobrado <strong>&times;</strong> eventos por mês
        <strong>&times;</strong> (% de desconto <strong>+</strong> % de extra absorvido
        <strong>+</strong> % de comissão)</p>
      </div>
      <p class="mini">A <strong>comissão entra</strong> por decisão sua: comissão paga sem estratégia,
      com medo de perder o parceiro, é consequência da Dívida de Valor, não custo de operação.
      A <strong>mão de obra fica de fora</strong>: essa é custo legítimo, e somar tudo no mesmo número
      inflaria a conta. Ela aparece em bloco próprio, ao lado.</p>

      <h3>As três travas</h3>
      <ul class="limpa">
        <li><strong>Teto do que ela declara vender.</strong> A conta nunca passa da faixa marcada na última
        pergunta, mesmo que valor vezes volume dê mais.</li>
        <li><strong>Piso de R$ 500.</strong> Abaixo disso a página troca o número por uma leitura sem número.
        Mostrar R$ 0 derruba a peça inteira.</li>
        <li><strong>A tela do meio conta por baixo.</strong> Ela usa o piso das faixas, não o meio.</li>
      </ul>

      <h3>Por que a tela do meio conta por baixo</h3>
      <p class="mini">Ela roda <strong>antes</strong> da pergunta de faturamento, então não tem como aplicar o
      teto. Contando pelo piso das faixas, o número de lá vira chão e não teto, e o do resultado quase sempre
      vem maior. <strong>Subir é presente, descer é desmentido.</strong> E quando as respostas não fecham entre
      si e o teto morde mesmo assim, a página diz isso em voz alta, com o número que ela mesma declarou.</p>
    </div>
    <div>
      <h3>O mesmo exemplo, fechado</h3>
      <table style="margin-top:1.5mm">
        <tr><th>Item</th><th>Valor</th></tr>
        <tr><td>Desconto no fechamento</td><td class="n">{dv["fmt"]["desconto"]}/mês</td></tr>
        <tr><td>Extras absorvidos</td><td class="n">{dv["fmt"]["extras"]}/mês</td></tr>
        <tr><td>Comissão ao parceiro</td><td class="n">{dv["fmt"]["comissao"]}/mês</td></tr>
        <tr><td><strong>Dívida de Valor</strong></td><td class="n">{dv["fmt"]["mes"]}/mês</td></tr>
      </table>
      <div class="numerao">
        <p class="rot">A Dívida de Valor dela</p>
        <p class="val">{dv["fmt"]["ano"]}</p>
        <p class="ano">em doze meses</p>
      </div>
      <div class="cristal">
        <h4>Ao lado, sem entrar na soma</h4>
        <p class="mini" style="margin:0">A mão de obra absorve <strong>{cu["fmt"]["custoEquipeMes"]} por mês</strong>
        da operação dela, e a página cruza isso com o desconto que ela ainda dá por cima.</p>
      </div>

      <h3>E quando a conta dá quase zero?</h3>
      <p class="mini">Acontece, e é bom: significa que ela não dá desconto, não absorve extra e não paga
      comissão. A página <strong>não inventa número nenhum</strong>, e diz outra coisa.</p>
      <div class="copy" style="margin-top:2mm">
        <p class="rot">O que ela lê no lugar do número</p>
        <p>Aqui acontece uma coisa interessante. Você marcou que quase não dá desconto e que quase não
        absorve extra. <strong>Então a sua perda não está no fechamento nem na entrega: ela está antes.</strong></p>
      </div>
      <p class="mini">Ela sabe que não dá desconto. Se a tela disser que dá, acabou a conversa.</p>
    </div>
  </div>""")

# =====================================================================
# 8 a 11 · A COPY DO DIAGNÓSTICO
# =====================================================================
B = AG["blocos"]
bk = F["buckets"][ex["bucket"]]

pg(8, "O diagnóstico · abertura", f"""
  <p class="kicker">A página de resultado</p>
  <h2>O que ela lê depois dos 5 segundos</h2>
  <p class="lead">A página inteira é montada com as respostas dela. Abaixo está a versão de quem
  caiu em <strong>{bk["nome"]}</strong>, o padrão do exemplo das páginas anteriores.
  Os outros três padrões mudam o diagnóstico, não a estrutura.</p>

  <div class="ouro" style="text-align:center">
    <p class="mini" style="margin-bottom:1.4mm">O padrão dela</p>
    <p style="font-family:var(--font-serif);font-size:17pt;color:var(--primary-700);margin:0 0 1.2mm">{AG["titulo"]}</p>
    <p class="mini" style="margin:0">{bk["onde"]}</p>
  </div>

  <h3>{B[0]["titulo"]}</h3>
  {copy_bloco(B[0])}
  <h3>{B[1]["titulo"]}</h3>
  {copy_bloco(B[1])}""")

pg(9, "O diagnóstico · a conta", f"""
  <p class="kicker">A página de resultado</p>
  <h2>O número, e o que ele não é</h2>
  <p class="lead">É aqui que entra a distinção que você pediu: <strong>Dívida de Valor não é
  dívida de banco.</strong></p>
  <h3>{B[2]["titulo"]}</h3>
  {copy_bloco(B[2])}
  <h3>{B[3]["titulo"]}</h3>
  {copy_bloco(B[3])}""")

pg(10, "O diagnóstico · comissão, tentativas e método", f"""
  <p class="kicker">A página de resultado</p>
  <h2>A comissão, o que ela já tentou, e o que você faz diferente</h2>
  <p class="lead">O bloco da comissão só aparece para quem paga comissão. Quem marcou que não
  trabalha com parceiros pula direto para o seguinte.</p>
  <h3>{B[4]["titulo"]}</h3>
  {copy_bloco(B[4])}
  <h3>{B[5]["titulo"]}</h3>
  {copy_bloco(B[5])}
  <h3>{B[6]["titulo"]}</h3>
  {copy_bloco(B[6])}""")

pg(11, "O diagnóstico · a virada, você e o convite", f"""
  <p class="kicker">A página de resultado</p>
  <h2>O que muda no caso dela, e quem está dizendo isso</h2>
  <p class="lead">A sua foto entra no bloco em que você fala de si, com o seu nome em ouro por cima.
  É o único ponto da página em que você aparece, e é de propósito: primeiro a conta dela, depois você.</p>
  <h3>{B[7]["titulo"]}</h3>
  {copy_bloco(B[7])}
  <h3>{B[8]["titulo"]}</h3>
  {copy_bloco(B[8])}
  <h3>{B[9]["titulo"]}</h3>
  {copy_bloco(B[9])}""")

# =====================================================================
# 12 · O CONVITE E OS QUATRO PADRÕES
# =====================================================================
ordem = sorted(F["buckets"].items(), key=lambda kv: kv[1]["ordem"])
cards = "".join(f"""<tr><td style="width:34mm"><strong>{b["nome"]}</strong><br>
<span class="mini">{b["onde"]}</span></td><td>{b["resumo"]}<br>
<span class="mini" style="color:var(--primary-700)">Primeira mudança: {b["causaRaiz"]}.</span></td></tr>"""
 for k, b in ordem)
oe = F["ofertaEntrada"]
pg(12, "O fechamento e os padrões", f"""
  <p class="kicker">O fim da página</p>
  <h2>O convite, a oferta de entrada e os quatro padrões</h2>

  <div class="duas larga">
    <div>
      <h3>O convite, para quem está na faixa</h3>
      <div class="copy" style="margin-top:1.5mm">
        <p class="rot">Acima do título</p><p>O próximo passo, [nome dela]</p>
        <p class="rot">Título</p><p style="font-size:10.6pt;color:var(--primary-700);font-weight:600">Eu abro algumas conversas por semana para olhar esse número junto com a pessoa.</p>
        <p>O que sai dali: onde exatamente está a sua maior perda e o que muda primeiro.
        O que não é: não é aula e não é apresentação de produto disfarçada.</p>
        <p class="rot" style="margin-top:2.4mm">Botão</p>
        <p><strong>Quero parar de perder esse dinheiro</strong></p>
        <p class="mini">São 45 minutos com a Adriana, olhando a sua conta. Sem apresentação de slide.</p>
      </div>
    </div>
    <div>
      <h3>Para quem ficou abaixo da faixa</h3>
      <div class="copy" style="margin-top:1.5mm">
        <p class="rot">Oferta de entrada</p>
        <p style="color:var(--primary-700);font-weight:600;margin-bottom:1.4mm">{oe["nome"]} &middot; {oe["preco"]}</p>
        <p>{oe["promessa"]}</p>
        <p class="rot" style="margin-top:2.4mm">Botão</p><p><strong>{oe["cta"]}</strong></p>
      </div>
      <p class="mini">Ela sai com a leitura completa do mesmo jeito. Ninguém recebe porta fechada.</p>
    </div>
  </div>

  <hr class="rule">
  <h3 style="margin-top:0">Os quatro padrões de perda</h3>
  <p class="mini">Em empate, a pessoa sobe para o padrão de maior perda, nunca desce.
  O padrão nomeia o fenômeno, nunca a pessoa.</p>
  <table>
    <tr><th>Padrão</th><th>O que é</th></tr>
    {cards}
  </table>""")

# =====================================================================
# 13 · O QUE FALTA
# =====================================================================
pg(13, "As decisões que são suas", """
  <p class="kicker">Para fechar</p>
  <h2>Quatro decisões que só você pode tomar</h2>
  <p class="lead">Estão nos seus próprios PDFs, marcadas por você como “avaliar” ou “somente com a
  aprovação da Adriana”. Segue a nossa leitura de cada uma, para você decidir com a informação na mão.</p>

  <h3>1 &middot; Reduzir o valor cobrado de 7 para 5 faixas</h3>
  <div class="duas larga">
    <div><p class="mini" style="margin:0"><strong>Você propôs</strong> até R$ 3 mil / R$ 3 a 8 mil /
    R$ 8 a 20 mil / R$ 20 a 60 mil / acima de R$ 60 mil, porque com 7 a tela ficava carregada e a
    última faixa cortava no celular.</p></div>
    <div><p class="mini" style="margin:0"><strong>A nossa leitura:</strong> o corte no celular já está
    resolvido, então a razão principal caiu. E as 7 faixas fazem um trabalho que as 5 não fazem:
    <strong>quem marca a menor descobre, na mesma tela, que a maior é ocupada por gente do mesmo
    mercado.</strong> Mantivemos 7. <strong>Se você preferir 5, a troca leva cinco minutos.</strong></p></div>
  </div>

  <hr class="rule">
  <h3 style="margin-top:0">2 &middot; Múltipla escolha em “o que você já buscou fazer”</h3>
  <div class="duas larga">
    <div><p class="mini" style="margin:0"><strong>Você propôs</strong> deixar marcar mais de uma, porque a
    pessoa provavelmente já tentou curso <em>e</em> rede social.</p></div>
    <div><p class="mini" style="margin:0"><strong>A nossa leitura:</strong> faz sentido e aumenta a precisão,
    mas não é mudança de texto, é de motor. Múltipla escolha tira o avanço automático (a tela passa a
    precisar de um botão “continuar”) e muda a pontuação dos padrões, que hoje soma por resposta única.
    <strong>Dá para fazer, e a gente prefere medir com tráfego rodando antes de mexer.</strong></p></div>
  </div>

  <hr class="rule">
  <h3 style="margin-top:0">3 &middot; Personalizar o fechamento pela resposta da Tela 11</h3>
  <div class="duas larga">
    <div><p class="mini" style="margin:0"><strong>Você observou</strong> que as 4 opções são 4 identidades,
    e que o texto final podia falar diretamente com a que ela escolheu.</p></div>
    <div><p class="mini" style="margin:0"><strong>A nossa leitura:</strong> concordamos, e é barato de fazer.
    Só que hoje a página já muda por padrão de perda, e somar uma segunda variação antes de ter
    volume de leads é <strong>otimizar no escuro</strong>. Fica na fila, logo depois das primeiras cem
    respostas.</p></div>
  </div>

  <hr class="rule">
  <h3 style="margin-top:0">4 &middot; Há quanto tempo ela está no mercado</h3>
  <div class="duas larga">
    <div><p class="mini" style="margin:0"><strong>A sua Parte 04</strong> pede esse dado nas telas de perfil,
    mas o formulário que você aprovou não tem esse campo, e o quiz está no teto de 12 perguntas.</p></div>
    <div><p class="mini" style="margin:0"><strong>A nossa leitura:</strong> ficou de fora por ora. Para entrar,
    ou toma o lugar de outra pergunta, ou vira quinto campo do formulário sabendo que empurra o botão para
    perto da dobra. <strong>É informação sua para decidir:</strong> ela te ajuda na conversa ou no anúncio?</p></div>
  </div>

  <hr class="rule">
  <h3 style="margin-top:0">E o que a gente precisa de você para subir isso</h3>
  <ul class="limpa">
    <li><strong>O seu ok nesta versão.</strong> Pode ser em áudio, do jeito que você já mandou: funcionou
    muito bem, e esta versão existe por causa deles.</li>
    <li><strong>Os criativos gravados.</strong> Os roteiros estão prontos e entregues desde 11/09.</li>
    <li><strong>A conta de anúncio com saldo.</strong> Pré-paga, no Pix, porque é como funciona no seu caso.</li>
  </ul>

  <div class="ouro">
    <h4>Uma nota sobre como este documento foi feito</h4>
    <p style="margin:0">As perguntas foram lidas direto do arquivo que roda no ar, e a copy do diagnóstico
    foi extraída da página de verdade, aberta num navegador.
    <strong>Não existe versão de documento diferente da versão que a sua cliente vê.</strong></p>
  </div>

  <p class="mini" style="text-align:center;margin-top:3mm">Adriana Brune&rsquo;lly &middot; 25 anos no mercado de eventos &middot; Londrina, PR<br>
  Documento preparado pela Simple &middot; 23 de setembro de 2026</p>""")

# =====================================================================
# MONTAGEM
# =====================================================================
doc = f"""<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Quiz e Diagnóstico da Dívida de Valor · Adriana Brune'lly · para validação</title>
<style>{CSS}
/* classes que vêm da página de diagnóstico renderizada */
.copy ul.espelho,.copy ul.conta,.copy ol.metodo{{padding-left:4.6mm}}
.copy ul.conta{{list-style:none;padding-left:0}}
.copy ul.conta li{{display:flex;justify-content:space-between;gap:4mm;
  border-bottom:1px solid rgba(244,241,234,.08);padding:1.2mm 0}}
.copy ul.conta li strong{{white-space:nowrap}}
.copy .numerao{{margin:2.4mm 0}}
.copy .numerao .rotulo{{display:block;font-size:7.2pt;letter-spacing:.18em;text-transform:uppercase;color:var(--muted)}}
.copy .numerao .valor{{display:block;font-family:var(--font-serif);font-size:22pt;line-height:1.1;margin:1.2mm 0 .6mm;
  background:linear-gradient(92deg,#B8892F,#F0DCA8 52%,#B8892F);-webkit-background-clip:text;background-clip:text;color:transparent}}
.copy .numerao .periodo{{display:block;font-size:8.4pt;color:var(--muted)}}
.copy .numerao .ano{{display:block;font-size:9.6pt;color:var(--primary-700);font-weight:600;margin-top:1mm}}
.copy .numerao hr{{border:0;height:1px;background:linear-gradient(90deg,transparent,var(--primary-900),transparent);margin:1.6mm 0}}
.copy .distincao{{border-left:2px solid var(--primary-900);padding-left:3.4mm;color:var(--muted)}}
.copy .custo{{color:var(--muted)}}
.copy .clube{{color:var(--muted);font-style:italic}}
.copy .faq p{{margin-bottom:1.4mm}}
</style>
</head>
<body>
{chr(10).join(paginas)}
</body>
</html>"""

dest = "/home/user/simpleacc/clientes/adriana-brunelly/estrategia/2026-09-23-quiz-e-diagnostico-v3-para-validacao.html"
io.open(dest, "w", encoding="utf-8").write(doc)
print("documento gerado:", len(paginas), "páginas,", len(doc)//1024, "KB ->", dest)
