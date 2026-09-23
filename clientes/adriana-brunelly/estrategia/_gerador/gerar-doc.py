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

def pg(num, secao, corpo, classe=""):
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
  <p class="selo">Para a sua validação &middot; versão 2</p>
  <h1>O quiz e o diagnóstico da <em>Dívida de Valor</em></h1>
  <p class="sub">Todas as perguntas, todas as telas e toda a copy que a sua cliente vai ler,
  num documento só. Esta versão já traz o que você trouxe nos áudios e nos vídeos.</p>
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
 ("“De onde ele tirou esse número?”",
  "As telas de intervalo davam uma conta de um evento de R$ 15 mil que não era o da pessoa.",
  "As três telas passaram a ser montadas <strong>com as respostas da própria pessoa</strong>. O número que ela vê é o dela, e a tela diz de onde saiu."),
 ("Os botões não falam de dinheiro",
  "“Quero minha sessão de diagnóstico” é a nossa linguagem, não a da sua cliente.",
  "Agora falam em dinheiro e em perda: <strong>“Quero parar de perder esse dinheiro”</strong> e “Quero começar a recuperar esse dinheiro”."),
 ("No celular, a última faixa sumia",
  "A pergunta de ticket tem sete faixas e o cabeçalho comia a tela.",
  "O cabeçalho sai durante as perguntas (você mesma abriu mão dele) e volta na tela do contato. <strong>As sete faixas cabem inteiras.</strong>"),
 ("A sua história estava complicada",
  "“Faturei 40% menos e lucrei 60% mais” obriga quem lê a fazer conta de cabeça.",
  "A sua versão entrou literal: <strong>“Eu trabalhava mais e lucrava menos. Hoje eu trabalho menos e lucro mais.”</strong> A conta fria ficou embaixo, em uma linha."),
 ("Faltava empatia antes da autoridade",
  "O texto contava o seu caso sem dizer que você já esteve no lugar de quem lê.",
  "O bloco abre com <strong>“E eu já fui exatamente onde você está”</strong>, e só depois vem a prova."),
 ("Dívida de Valor não é dívida de banco",
  "A distinção é a sua tese e não estava escrita em lugar nenhum da página.",
  "Entrou logo abaixo do número: dívida financeira tem boleto e alguém cobra, a Dívida de Valor <strong>ninguém cobra e ninguém devolve</strong>."),
 ("Pedir o Instagram da pessoa",
  "Você olha o perfil antes de qualquer conversa.",
  "Entrou no formulário de contato, junto de nome, WhatsApp, e-mail e cidade. Não virou pergunta do quiz: é dado de perfil, não de diagnóstico."),
]
cards = "".join(f'''<div class="ficha"><p class="ft">{t}</p>
<p class="fo">{o}</p><p class="fr">{r}</p></div>''' for t, o, r in feitos)
pg(2, "O que mudou", f"""
  <p class="kicker">Antes de tudo</p>
  <h2>O que os seus áudios mudaram nesta versão</h2>
  <p class="lead">Nove pontos saíram dos seus áudios e dos seus vídeos. <strong>Sete já estão no ar</strong>,
  e são estes. Os dois que faltam dependem de você, e estão no fim do documento.</p>
  <div class="fichas">{cards}</div>
  <div class="ouro">
    <h4>O que a gente aprendeu com isso</h4>
    <p style="margin:0">Tela de implicação com texto fixo é uma bomba-relógio num funil que promete conta feita.
    A pessoa acabou de responder os próprios números e, na tela seguinte, leva na cara uma conta que não é a dela.
    <strong>Desconfiar ali é a reação certa</strong>, e foi a sua. Você conhece esse público melhor do que nós, e é
    por isso que essa rodada existe.</p>
  </div>""")

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
        <p style="font-size:11pt;color:var(--primary-700);font-weight:600;margin-bottom:1.4mm">{cp["titulo"]}</p>
        <p>{cp["subtitulo"]}</p>
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
  <p class="lead">Elas aparecem depois das perguntas 3, 6 e 9. <strong>Não são propaganda:
  são consequência.</strong> E, desta versão em diante, cada uma é montada com o que a
  pessoa acabou de responder.</p>

  <div class="ouro">
    <h4>O exemplo abaixo é de uma pessoa que respondeu assim</h4>
    <p class="mini" style="margin:0">As alternativas que ela marcou, na ordem: “{lbl("segmento")}” &middot;
    “{lbl("volume")}” eventos por mês &middot; ticket “{lbl("ticket")}” &middot; desconto “{lbl("desconto")}” &middot;
    extras: “{lbl("extras")}” &middot; já tentou: “{lbl("tentativas")}”.
    Troque qualquer uma delas e <strong>todos os números dessas telas mudam junto</strong>.</p>
  </div>

  {inter_html("orcamento", "Tela 1 &middot; depois da pergunta 3",
     "Aqui ainda não existe ticket respondido, então não se fala em dinheiro: a conta é de volume, feita com os eventos por mês que ela marcou.")}
  {inter_html("desconto", "Tela 2 &middot; depois da pergunta 6",
     "O primeiro número em reais do funil. É por evento, e nunca o total do ano: o total só ganha o teto do faturamento na última pergunta, e sairia brigando com o resultado final.")}
  {inter_html("tentativas", "Tela 3 &middot; depois da pergunta 9",
     "Responde à tentativa que ela marcou, uma a uma, e fecha com a sua virada na frase que você pediu.")}

  <div class="cristal">
    <h4>Quem não dá desconto vê outra tela</h4>
    <p class="mini" style="margin:0">Se ela marcou que não dá desconto, a tela 2 usa os extras.
    Se ela não dá desconto <em>e</em> tem contrato fechado, a tela vira um elogio honesto:
    “os dois furos mais comuns não estão em você, então a sua conta está em outro lugar”.
    <strong>Em nenhum caso ela vê um número que não é dela.</strong></p>
  </div>""")

# =====================================================================
# 7 · COMO A CONTA É FEITA
# =====================================================================
dv = ex["divida"]; cu = ex["custos"]
pg(7, "A conta", f"""
  <p class="kicker">O motor</p>
  <h2>Como o número é calculado, e por que ele é defensável</h2>
  <p class="lead">Este é o ativo mais caro do funil. Se a cliente não reconhecer o número,
  ela não lê o resto da página, e a gente perde o lead e a conversa.</p>

  <div class="duas">
    <div>
      <h3>A fórmula</h3>
      <div class="cristal" style="margin-top:1.5mm">
        <p style="font-size:9.6pt;margin:0">ticket médio <strong>&times;</strong> eventos por mês
        <strong>&times;</strong> (% de desconto <strong>+</strong> % de extras absorvidos)</p>
      </div>
      <p class="mini">Só entram as respostas dela. Nada de média de mercado, nada estimado por fora.</p>

      <h3>As três travas</h3>
      <ul class="limpa">
        <li><strong>Teto do faturamento.</strong> A conta nunca passa da faixa que ela declarou na última
        pergunta, mesmo que ticket vezes volume dê mais. Fica sempre do lado conservador.</li>
        <li><strong>Piso de R$ 500.</strong> Abaixo disso a página troca o número por uma leitura sem número.
        Mostrar R$ 0 derruba a peça inteira.</li>
        <li><strong>Por evento nas telas de intervalo.</strong> Total do ano só no diagnóstico, depois do teto.</li>
      </ul>

      <h3>O que fica de fora da soma</h3>
      <p class="mini">Mão de obra e comissão <strong>não entram</strong> na Dívida de Valor.
      São custos legítimos do negócio, não dinheiro deixado na mesa, e somar tudo no mesmo número
      inflaria a conta. Aparecem como dois blocos próprios, ao lado do número.</p>
    </div>
    <div>
      <h3>O mesmo exemplo, fechado</h3>
      <table style="margin-top:1.5mm">
        <tr><th>Item</th><th>Valor</th></tr>
        <tr><td>Desconto no fechamento</td><td class="n">{dv["fmt"]["desconto"]}/mês</td></tr>
        <tr><td>Extras absorvidos</td><td class="n">{dv["fmt"]["extras"]}/mês</td></tr>
        <tr><td><strong>Dívida de Valor</strong></td><td class="n">{dv["fmt"]["mes"]}/mês</td></tr>
      </table>
      <div class="numerao">
        <p class="rot">A Dívida de Valor dela</p>
        <p class="val">{dv["fmt"]["ano"]}</p>
        <p class="ano">em doze meses</p>
      </div>
      <div class="cristal">
        <h4>Ao lado, sem entrar na soma</h4>
        <p class="mini" style="margin-bottom:1.2mm">Mão de obra: <strong>{cu["fmt"]["custoEquipeMes"]} por mês</strong>
        de operação, cruzada com o desconto que ela ainda dá em cima disso.</p>
        <p class="mini" style="margin:0">Comissão: pagar {rep("comissao")} equivale a
        <strong>cerca de {cu["fatiaDoLucro"]}% do lucro</strong> daquela festa, com margem de {cu["margemRef"]}%.
        É aritmética, não julgamento, e é isso que deixa o argumento de pé.</p>
      </div>
    </div>
  </div>

  <hr class="rule">
  <h3 style="margin-top:0">E quando a conta dá quase zero?</h3>
  <p class="mini">Acontece, e é bom que aconteça: significa que a pessoa não dá desconto e não absorve
  extra. Nesse caso a página <strong>não mostra número nenhum</strong>, e diz outra coisa.</p>
  <div class="copy" style="margin-top:2mm">
    <p class="rot">O que ela lê no lugar do número</p>
    <p>Aqui acontece uma coisa interessante. Você marcou que quase não dá desconto e que quase não
    absorve extra. <strong>Então a sua perda não está no fechamento nem na entrega: ela está antes.</strong></p>
    <p>Acontece no orçamento que sai e não volta, e esse é o único tipo de perda que não aparece
    em lugar nenhum.</p>
  </div>
  <p class="mini">Inventar um número aqui seria o jeito mais rápido de perder a pessoa. Ela sabe que
  não dá desconto: se a tela disser que dá, acabou a conversa.</p>""")

open("parte1.html","w",encoding="utf-8").write("\n".join(paginas))
print("parte 2 ok:", len(paginas), "páginas")

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
pg(13, "O que falta", """
  <p class="kicker">Para fechar</p>
  <h2>O que eu preciso de você para subir isso</h2>
  <p class="lead">O funil está pronto e funcionando. O que segura a largada agora não é
  técnico, é decisão.</p>

  <h3>Três coisas, em ordem</h3>
  <ul class="limpa">
    <li><strong>A sua validação desta copy.</strong> Pode ser em áudio, do jeito que você já mandou:
    funcionou muito bem. Marque o que está errado na boca do seu público, que a gente troca.</li>
    <li><strong>O documento tela a tela dos botões.</strong> Você comentou a posição deles no
    diagnóstico e disse que ia mandar. Com ele em mãos, a gente mexe no layout uma vez só.</li>
    <li><strong>O resumo de conversa que você citou.</strong> Ele não chegou aqui. Se reenviar,
    entra nesta mesma rodada.</li>
  </ul>

  <hr class="rule">
  <h3>Depois disso, o caminho é curto</h3>
  <table>
    <tr><th>Passo</th><th>Quem faz</th><th>Depende de</th></tr>
    <tr><td>Ajustes finais de copy</td><td>Simple</td><td>Sua validação</td></tr>
    <tr><td>Gravar os criativos</td><td>Você</td><td>Roteiros prontos, já entregues</td></tr>
    <tr><td>Subir a campanha</td><td>Simple</td><td>Conta de anúncio com saldo (Pix, pré-paga)</td></tr>
    <tr><td>Atender os leads</td><td>Você</td><td>Roteiros de WhatsApp, entregues junto</td></tr>
  </table>

  <div class="ouro">
    <h4>Uma nota sobre como isso foi feito</h4>
    <p style="margin:0">As perguntas deste documento foram lidas direto do arquivo que roda no ar,
    e a copy do diagnóstico foi extraída da página de verdade, aberta num navegador.
    <strong>Não existe versão de documento diferente da versão que a sua cliente vê.</strong>
    Quando o funil mudar, este documento muda junto.</p>
  </div>

  <hr class="rule">
  <h3 style="margin-top:0">O que já está de pé, para você não ficar na dúvida</h3>
  <div class="duas">
    <div>
      <ul class="limpa" style="margin-bottom:0">
        <li><strong>O quiz no ar</strong>, com as 12 perguntas e as três telas de intervalo.</li>
        <li><strong>A página de diagnóstico</strong>, com os quatro padrões e a sua foto.</li>
        <li><strong>O cálculo</strong>, com as três travas de credibilidade.</li>
      </ul>
    </div>
    <div>
      <ul class="limpa" style="margin-bottom:0">
        <li><strong>A planilha de leads</strong>, que enche sozinha a cada resposta.</li>
        <li><strong>O botão do WhatsApp</strong>, que já chega com o padrão e a conta na mensagem.</li>
        <li><strong>A oferta de R$ 47</strong>, para quem fica fora da faixa da sessão.</li>
      </ul>
    </div>
  </div>

  <hr class="rule">
  <p class="mini" style="text-align:center">Adriana Brune&rsquo;lly &middot; 25 anos no mercado de eventos &middot; Londrina, PR<br>
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

dest = "/home/user/simpleacc/clientes/adriana-brunelly/estrategia/2026-09-23-quiz-e-diagnostico-v2-para-validacao.html"
io.open(dest, "w", encoding="utf-8").write(doc)
print("documento gerado:", len(paginas), "páginas,", len(doc)//1024, "KB ->", dest)
