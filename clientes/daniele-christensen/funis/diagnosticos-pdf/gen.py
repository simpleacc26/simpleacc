#!/usr/bin/env python3
# Diagnósticos Grokker / Intensity — identidade escura, 2 páginas
import os, subprocess, html

OUT = os.path.dirname(os.path.abspath(__file__))
CHROME = "/opt/pw-browsers/chromium"

ABERTURA = ("Você acabou de concluir o Diagnóstico de Liderança. O que vem a seguir é a leitura "
            "das suas respostas: onde está o gargalo, por que ele se instalou e o que precisa "
            "mudar para destravá-lo.")

QUEM = ("Dra. Adm. Daniele Christensen é Doutora em Administração e criadora do INTENSITY, "
        "programa de Desenvolvimento em Gestão e Liderança Adulta. O trabalho dela corrige "
        "exatamente o que a maioria das formações em liderança ignora: a decisão emocional, "
        "a permissividade disfarçada de empatia, a insegurança para dar feedback, cobrar e "
        "demitir, e a ausência de método para conduzir pessoas com critério.")

# "algumas perguntas" e não um número: a Etapa 2 tem 15, e o "5" antigo vinha
# dos 5 blocos. Pedido da equipe da Dani em 25/08, que também levou o tempo de
# 3 para 5 minutos — o mesmo que a página pós-quiz e a Etapa 2 já prometiam.
PROXIMO = ("Seu cenário foi identificado, e este documento é o retrato da superfície. Para um "
           "Diagnóstico Gratuito Completo da sua Gestão, dedique agora menos de 5 minutos e "
           "responda algumas perguntas mais profundas. É esse resultado que vamos ler juntos, e ao "
           "terminar você já escolhe o horário da sua Sessão Estratégica Gratuita. Complete pelo link "
           "que enviei junto com este documento.")

D = [
{
 "slug":"01-o-adiador", "cenario":"O Adiador",
 "freio":"Existe uma decisão sobre gente que você já sabe qual é, e ela continua não sendo tomada.",
 "freio_sub":"Não é de hoje, e provavelmente não é uma pessoa só. Você já identificou quem não está no padrão, já ensaiou a conversa na cabeça, e vem empurrando.",
 "sinais":[
   "Você já sabe o nome da pessoa antes mesmo de terminar de ler esta frase.",
   "Você já ensaiou a conversa mentalmente mais de uma vez, e ela ainda não aconteceu.",
   "Quando pensa em agir, o que te trava não é o que fazer, é justificar depois por que fez."],
 "significa":"Isso não é falta de coragem. Quem não tem coragem não constrói uma empresa desse tamanho e/ou sustenta uma operação com gente dependendo dela. É falta de critério. Sem uma régua definida, toda decisão sobre pessoas vira aposta emocional, e você fica preso entre ser duro demais e permissivo demais. É nesse intervalo que a decisão não sai, e a ausência dela vira, na prática, uma decisão tomada.",
 "custo":"O custo de uma decisão adiada não aparece na demonstração do mês, ele aparece diluído. Aparece na entrega que sai abaixo do combinado e ninguém corrige. Aparece nas pessoas boas do time, que enxergam a situação antes de você e concluem que o padrão aqui é negociável. E aparece em você, que carrega diariamente uma pendência que consome mais energia do que a própria decisão consumiria.",
 "tentou":"Você provavelmente tentou resolver conversando, deu mais um prazo, chegou mais perto. Talvez já tenha trocado a pessoa e o problema voltou com outro nome. Conversa sem critério é só mais uma conversa: ela alivia o desconforto do momento e empurra a decisão para a semana seguinte. E trocar a pessoa sem mudar a régua apenas transfere o problema, porque o padrão que não estava claro para uma também não estará para a próxima.",
 "caminho":"Ter critério claro para decidir sobre pessoas: o que é padrão aceitável, o que já não é, em quanto tempo se corrige e onde se encerra. Com isso definido, a conversa difícil deixa de ser confronto pessoal e vira aplicação de uma régua que todo mundo conhece de antemão.",
 "muda":"Quando existe critério, a decisão difícil deixa de depender do seu estado de ânimo. Você para de adiar e também para de decidir no impulso, que é o outro extremo do mesmo problema. A equipe passa a saber com antecedência o que acontece quando o padrão não é cumprido, e isso reduz a quantidade de conversas difíceis, porque a maioria delas deixa de ser necessária.",
},
{
 "slug":"02-o-gargalo", "cenario":"O Gargalo",
 "freio":"A operação cresceu, e você continua sendo o ponto por onde tudo precisa passar.",
 "freio_sub":"Toda decisão que importa espera por você. Quando você para, a operação desacelera junto.",
 "sinais":[
   "Sua agenda está cheia de assuntos que, no papel, não deveriam ser seus.",
   "Quando você fica um dia fora, o volume não diminui, apenas acumula para o dia seguinte.",
   "Sua equipe provavelmente é competente, mas prefere confirmar com você antes de agir."],
 "significa":"O modelo de decisão que está em uso hoje é o de uma operação menor do que a atual. Em algum momento ele fez todo sentido, porque era mais rápido decidir do que explicar. A operação cresceu e esse modelo não acompanhou. O que trava não é a competência do seu time: é que ninguém ali tem critério para decidir no seu lugar, porque esse critério nunca foi escrito. Ele existe, funciona bem, mas mora dentro da sua cabeça.",
 "custo":"Enquanto tudo passa por você, o tamanho da empresa e/ou os seus resultados ficam limitados à sua capacidade de processar decisão. Você vira o teto da própria operação. E o custo não é só de crescimento, é de qualidade: decisão tomada às pressas no meio de dezenas de outras raramente é a melhor decisão. Some a isso o tempo estratégico que não existe, e o resultado é uma operação que trabalha muito e avança pouco.",
 "tentou":"Você provavelmente já contratou gente mais sênior, já implantou processo, ferramenta e indicador. E percebeu que as decisões continuam chegando na sua mesa do mesmo jeito. Ferramenta organiza informação, mas não distribui decisão. Processo diz como se executa, não com que critério se escolhe. Enquanto a régua existir só na sua cabeça, cada situação nova volta para lá, inclusive as que você contratou alguém justamente para não precisar ver.",
 "caminho":"Transferir critério, não apenas tarefa. Delegar de verdade é entregar a régua junto com a atividade: o que a pessoa decide sozinha, até onde vai a alçada dela, o que precisa vir para você e o que ela decide e depois informa.",
 "muda":"Quando o critério é transferido junto com a tarefa, a equipe começa a resolver sem consultar, e você recupera a agenda. Não é abrir mão do controle, é trocar o controle sobre cada decisão pelo controle sobre a régua que gera todas elas. É o que permite a empresa crescer sem que você cresça junto em horas trabalhadas.",
},
{
 "slug":"03-time-que-nao-assume", "cenario":"Time que não Assume",
 "freio":"As pessoas justificam o resultado com o mercado, o cliente ou o preço, em vez de assumir a responsabilidade.",
 "freio_sub":"Não é falta de esforço do time. É que ninguém se sente dono do número.",
 "sinais":[
   "As explicações para o resultado ruim chegam prontas, antes mesmo de você perguntar.",
   "Quando algo dá errado, é difícil identificar quem, especificamente, deveria ter agido.",
   "Você sente que não cobra do jeito que deveria."],
 "significa":"Quando o resultado sempre tem uma explicação externa e ninguém a examina, isso deixa de ser desculpa e passa a ser cultura. E cultura não se instala por discurso, se instala por repetição. Cada vez que uma justificativa passa sem ser questionada, ela ensina ao time que resultado é algo que acontece com a empresa, não algo que a empresa produz.",
 "custo":"Um time que não assume transfere para você toda a responsabilidade emocional pelo resultado. Você passa a ser o único incomodado quando o número não vem, e isso é insustentável ao longo do tempo. Além disso, sem responsabilização não existe aprendizado: se a causa do erro foi sempre externa, não há o que corrigir internamente, e o mesmo erro reaparece no trimestre seguinte com outro nome.",
 "tentou":"Você já puxou responsabilidade em reunião, já chamou individualmente, talvez já tenha trocado quem não entregava. Não pegou porque falta uma régua objetiva de quem responde pelo quê. Sem isso, cobrar responsabilidade vira a sua opinião contra a dele, e nessa disputa a justificativa quase sempre ganha, porque ela é mais confortável para os dois lados.",
 "caminho":"Tornar explícito quem responde por qual resultado, com que autonomia e com qual consequência. Responsabilidade que não foi combinada com clareza não pode ser cobrada com firmeza.",
 "muda":"Quando cada resultado tem um dono claro, a conversa muda de natureza. Deixa de ser você cobrando e passa a ser a pessoa prestando conta de algo que ela mesma assumiu. O desgaste cai, a discussão vira técnica em vez de pessoal, e o erro passa a gerar ajuste, porque existe alguém responsável por examiná-lo.",
},
{
 "slug":"04-plano-que-nao-vira-execucao", "cenario":"Plano que não Vira Execução",
 "freio":"A sua empresa provavelmente sabe para onde ir. Ela só não chega.",
 "freio_sub":"O planejamento provavelmente existe, a meta provavelmente está definida, todo mundo saiu da reunião de acordo. E aí o mês começa e boa parte não acontece.",
 "sinais":[
   "O planejamento é bom. Você o revisita e continua concordando com ele.",
   "Entre a reunião e a prática, o urgente sempre encontra espaço e o combinado sempre encontra desculpa.",
   "Em dezembro, a conversa se parece com a de janeiro, apenas com outras palavras."],
 "significa":"Plano que não vira execução quase nunca é problema de plano. É problema de prioridade que não foi sustentada. O importante não perde para o desinteresse, ele perde para o urgente, todos os dias, porque o urgente grita e o importante espera em silêncio. Sem um critério que defina o que pode ser interrompido e o que não pode, o time inteiro passa a resolver o que aparece na frente.",
 "custo":"O custo aqui é silencioso, porque nada quebra. A empresa continua funcionando, entregando e faturando. O que não acontece é o salto. Você paga esse custo em oportunidade, não em prejuízo, e por isso ele é fácil de tolerar por anos seguidos. Enquanto isso, o concorrente que executa metade do que você planeja termina na frente, não por ser melhor, mas por concluir.",
 "tentou":"Você provavelmente já implantou indicador, reunião de acompanhamento e metodologia de metas. Já cobrou o andamento e já refez o plano com mais detalhe. Nada disso resolveu porque o problema não é de visibilidade. Você não deixou de executar por não enxergar o atraso: você enxergou, e mesmo assim o urgente venceu. Mais indicador apenas mostra com mais precisão aquilo que não está acontecendo.",
 "caminho":"Instalar um critério de priorização que sobreviva ao dia a dia, e uma cadência em que a decisão sobre o que sai da frente seja de fato tomada. Executar estratégia não é ter mais disciplina, é ter clareza sobre o que se está disposto a não fazer.",
 "muda":"Quando existe critério de priorização, a semana passa a ter uma pergunta clara: o que sai da frente para que o combinado aconteça. A execução deixa de depender de disciplina individual e passa a depender de uma decisão tomada em voz alta e registrada. O plano deixa de ser intenção e vira compromisso com consequência.",
},
]

CSS = """
@page { size: A4; margin: 0; }
* { box-sizing: border-box; }
html, body { margin:0; padding:0; background:#0b0b0b; }
body {
  font-family: 'Liberation Sans', 'DejaVu Sans', Arial, sans-serif;
  color:#e8e6e2; -webkit-print-color-adjust: exact; print-color-adjust: exact;
}
.page {
  width:210mm; height:297mm; padding:16mm 19mm 13mm;
  position:relative; overflow:hidden;
  display:flex; flex-direction:column;
  background:#0b0b0b;
  background-image:
    repeating-linear-gradient(45deg,  rgba(255,255,255,.017) 0 34mm, rgba(255,255,255,0) 34mm 68mm),
    repeating-linear-gradient(-45deg, rgba(255,255,255,.017) 0 34mm, rgba(255,255,255,0) 34mm 68mm);
}
.page + .page { page-break-before: always; }

/* wordmark */
.wm { font-size:17pt; font-weight:700; letter-spacing:.30em; color:#fff; line-height:1; }
.wm .o {
  background:linear-gradient(160deg,#f7d774 5%,#d99b1a 55%,#f2c14e 95%);
  -webkit-background-clip:text; background-clip:text; color:transparent;
}
header { border-bottom:1px solid rgba(255,255,255,.13); padding-bottom:6mm; margin-bottom:6mm; }
.htop { display:flex; justify-content:space-between; align-items:baseline; }
.hlabel { font-size:7.4pt; letter-spacing:.22em; text-transform:uppercase; color:#8d8a84; }
.doc { font-size:20pt; font-weight:700; color:#fff; margin:5mm 0 0; letter-spacing:-.005em; }
.cen { font-size:8pt; letter-spacing:.18em; text-transform:uppercase; color:#f18700; margin-top:2.5mm; font-weight:700; }

.abertura { font-size:10.2pt; line-height:1.65; color:#a8a5a0; margin:0 0 6mm; }

.sec { font-size:7.8pt; letter-spacing:.19em; text-transform:uppercase; color:#f18700;
       font-weight:700; margin:6.2mm 0 2.4mm; display:flex; align-items:center; gap:2.5mm; }
.sec::before { content:""; width:5mm; height:1.4pt; background:#f18700; display:inline-block; flex:none; }

.freio { font-size:15pt; line-height:1.34; color:#fff; font-weight:700; margin:0 0 2.5mm; }
p { font-size:10.3pt; line-height:1.67; margin:0 0 2.5mm; color:#ddd9d3; text-align:justify; }

ul.sinais { list-style:none; margin:1mm 0 0; padding:0; }
ul.sinais li {
  font-size:10pt; line-height:1.55; color:#ddd9d3;
  padding-left:6.5mm; margin-bottom:2.2mm; position:relative;
}
ul.sinais li::before {
  content:""; position:absolute; left:0; top:1.9mm;
  width:2.2mm; height:2.2mm; transform:rotate(45deg);
  background:linear-gradient(150deg,#f7d774,#d99b1a);
}

.quem { background:rgba(255,255,255,.035); border:1px solid rgba(255,255,255,.09);
        padding:5mm 6mm; margin-top:6mm; }
.quem .sec { margin-top:0; }
.quem p { margin-bottom:0; font-size:9.7pt; color:#c9c5bf; }
.card { background:#151412; border-left:2.5pt solid #f18700; padding:5mm 6mm; margin-top:5mm; }
.card .sec { margin-top:0; }
.card p { margin-bottom:0; color:#e8e6e2; }

footer { margin-top:auto; padding-top:6mm; border-top:1px solid rgba(255,255,255,.13); }
.fl { display:flex; justify-content:space-between; align-items:flex-end; gap:8mm; }
.assina { font-size:11pt; color:#fff; font-weight:700; }
.assina .cra { font-size:8.8pt; font-weight:400; color:#9a9893; letter-spacing:.02em; }
.cred { font-size:8.4pt; color:#8d8a84; margin-top:1.5mm; line-height:1.5; }
.frase { font-size:8.8pt; color:#f2c14e; font-style:italic; margin-top:2.5mm; }
.lock { text-align:right; flex:none; }
.lock .wm { font-size:10pt; letter-spacing:.26em; }
.lock .int {
  font-size:15pt; font-weight:700; font-style:italic; letter-spacing:.10em;
  color:#f9a33c; margin-top:1mm;
  text-shadow:0 0 4px rgba(241,135,0,.85), 0 0 11px rgba(241,135,0,.45);
}
.pnum { position:absolute; bottom:8mm; right:19mm; font-size:7.5pt; color:#5f5d59; letter-spacing:.12em; }
.contfrom { font-size:7.4pt; letter-spacing:.2em; text-transform:uppercase; color:#5f5d59; margin-bottom:4mm; }
"""

TPL = """<!doctype html><html lang="pt-br"><head><meta charset="utf-8">
<title>Diagnóstico de Liderança — {cenario}</title><style>{css}</style></head><body>

<div class="page">
  <header>
    <div class="htop">
      <div class="wm">GR<span class="o">O</span>KKER</div>
      <div class="hlabel">Diagnóstico · Página 1 de 2</div>
    </div>
    <h1 class="doc">Diagnóstico de Liderança</h1>
    <div class="cen">Cenário identificado · {cenario}</div>
  </header>

  <p class="abertura">{abertura}</p>

  <div class="sec">O seu gargalo</div>
  <p class="freio">{freio}</p>
  <p>{freio_sub}</p>

  <div class="sec">Os sinais que apareceram nas suas respostas</div>
  <ul class="sinais">{sinais}</ul>

  <div class="sec">O que isso significa</div>
  <p>{significa}</p>

  <div class="sec">O custo de continuar assim</div>
  <p>{custo}</p>

  <div class="sec">Por que o que você já tentou não resolveu</div>
  <p>{tentou}</p>

  <div class="pnum">01</div>
</div>

<div class="page">
  <div class="contfrom">Diagnóstico de Liderança · {cenario}</div>

  <div class="sec">O caminho</div>
  <p>{caminho}</p>

  <div class="sec">O que muda quando isso é resolvido</div>
  <p>{muda}</p>

  <div class="quem">
    <div class="sec">Quem conduz a análise</div>
    <p>{quem}</p>
  </div>

  <div class="card">
    <div class="sec">O próximo passo</div>
    <p>{proximo}</p>
  </div>

  <footer>
    <div class="fl">
      <div>
        <div class="assina">Dra. Adm. Daniele Christensen <span class="cra">- CRA-RS 13.798</span></div>
        <div class="cred">Doutora em Administração e criadora do INTENSITY.</div>
        <div class="frase">Liderança adulta exige critério, coragem e método.</div>
      </div>
      <div class="lock">
        <div class="wm">GR<span class="o">O</span>KKER</div>
        <div class="int">INTENSITY</div>
      </div>
    </div>
  </footer>

  <div class="pnum">02</div>
</div>
</body></html>"""

for d in D:
    sinais = "".join("<li>%s</li>" % html.escape(s) for s in d["sinais"])
    doc = TPL.format(css=CSS, cenario=html.escape(d["cenario"]),
        abertura=html.escape(ABERTURA), freio=html.escape(d["freio"]),
        freio_sub=html.escape(d["freio_sub"]), sinais=sinais,
        significa=html.escape(d["significa"]), custo=html.escape(d["custo"]),
        tentou=html.escape(d["tentou"]), caminho=html.escape(d["caminho"]),
        muda=html.escape(d["muda"]), quem=html.escape(QUEM), proximo=html.escape(PROXIMO))
    hp = os.path.join(OUT, d["slug"] + ".html")
    pp = os.path.join(OUT, "Diagnostico-" + d["slug"] + ".pdf")
    open(hp, "w", encoding="utf-8").write(doc)
    subprocess.run([CHROME,"--headless","--disable-gpu","--no-sandbox",
                    "--no-pdf-header-footer","--print-to-pdf="+pp,"file://"+hp],
                   check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    print("ok:", os.path.basename(pp), os.path.getsize(pp), "bytes")
