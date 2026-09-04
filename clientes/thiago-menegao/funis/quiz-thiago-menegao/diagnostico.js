/* ============================================================
   DIAGNÓSTICO E OFERTA. A peça central do funil.
   Cliente: Thiago Menegão · Protocolo PRIMAL PITCH.

   É UMA PÁGINA SÓ. A pessoa responde o quiz, deixa os dados e cai direto no
   resultado dela. A leitura sobe do diagnóstico para a oferta sem mudar de
   assunto: a trava é nomeada, o mecanismo explica por que ela existe, e o
   produto é o caminho para corrigi-la. Não existe reunião neste funil.

   Ordem dos blocos, conforme a estratégia aprovada (Seção 3):
   0 resultado e régua das sete etapas · 0b as quatro travas · 1 antes de tudo
   2 leitura do cenário · 3 o espelho · CTA · 4 por que o que você tentou não
   funcionou · 5 o mecanismo · 6 o que precisa acontecer no seu caso
   7 a conta · CTA · 8 a oferta · 9 quem é o Thiago e a prova
   10 para quem é e para quem não é · 11 FAQ · 12 a decisão e o CTA final.

   Regras não negociáveis aplicadas aqui: sem travessão, sem emoji, sem future
   pacing, sem ancoragem inflada, nada que soe a pressionar ou dominar o lead,
   e cena descrita em vez de pessoa acusada.
   ============================================================ */
const F = window.FLOW;
const P = window.PRIMAL;
const report = document.getElementById("report");
const STORE_KEY = (F.config && F.config.storeKey) || "funil_quiz";

function getState() { try { return JSON.parse(sessionStorage.getItem(STORE_KEY)) || {}; } catch (e) { return {}; } }
function esc(s) { return String(s == null ? "" : s).replace(/[<>&]/g, (c) => ({ "<": "&lt;", ">": "&gt;", "&": "&amp;" }[c])); }

const a = getState().answers || {};

/* ============================================================
   DEPOIMENTOS
   Vazio de propósito: o produto está publicado e ainda não existe depoimento
   em vídeo. É o único gargalo do projeto e a Fase 1 do roadmap.
   Enquanto a lista estiver vazia, o bloco não renderiza e o bloco de
   autoridade sustenta a prova social sozinho, como manda o blueprint.
   NUNCA inventar depoimento, e NUNCA publicar caixa vazia de "em breve".
   Para ligar: um objeto por vídeo, arquivo em depoimentos/, e o nome e o
   segmento visíveis (quem vende alto valor só confia em quem vende alto
   valor). Vídeo vertical, WebM ou MP4, com poster.
   ============================================================ */
const DEPOIMENTOS = [];

/* Por que o que você tentou não funcionou. A lista é fixa e cobre as saídas
   que o canvas mapeia; a frase de abertura é que recebe a resposta da pessoa. */
const TENTATIVAS_MORTAS = [
  ["Curso de vendas genérico", "ensina a vender ticket baixo por volume. Não se aplica a uma reunião de R$ 25 mil."],
  ["Banco de script, ou script gerado por IA", "resolve o que dizer, e a conversa quebra no primeiro desvio."],
  ["Conteúdo gratuito de fechamento", "peças soltas sem sequência. Vira repertório sem arquitetura."],
  ["Contratar closer", "transferiu o problema, manteve a dependência e adicionou custo."],
  ["Aumentar tráfego", "comprar mais lead para compensar conversão baixa é a saída mais cara que existe."],
  ["Baixar preço ou parcelar mais", "fechou algumas vendas e corroeu o posicionamento."],
  ["Terapia, mentalidade, autoconfiança", "trabalhou a crença sem mudar o comportamento, e a crença voltou ao ponto anterior."],
];

const ESPELHO = [
  "A reunião corre bem. O lead se abre, elogia, demonstra interesse. Na hora do preço, o clima muda.",
  "Você manda a proposta por escrito e o lead desaparece.",
  "Faz o follow-up se sentindo inconveniente por fazer. Então faz pouco, ou não faz.",
  "Trava meio segundo antes de falar o preço. E esse meio segundo é sentido do outro lado.",
  "Reabre a gravação da call, assiste inteira, e continua sem enxergar o ponto em que a conversa virou.",
  "Explica demais, ensina demais dentro da reunião, entrega o valor inteiro de graça, e mesmo assim não fecha.",
  "Enche a agenda para compensar a conversão, e termina o mês trabalhando mais para faturar o mesmo.",
  "Já explicou a perda para si mesmo culpando o lead: não tinha dinheiro, não era o momento, não era meu público.",
];

const FAQ = [
  ["Isso não é manipular o lead?",
   "Não, e é o contrário. Manipular é fazer alguém decidir contra o próprio interesse. Conduzir é assumir a responsabilidade por uma conversa que a outra pessoa precisa concluir. A passividade é que não é neutra: quando você não conduz, quem conduz é a insegurança do lead, e ele decide não decidir. O protocolo se sustenta em Posição e Limite, nunca em pressão."],
  ["Já fiz curso de vendas e não mudou nada.",
   "Categorias diferentes: técnica solta contra arquitetura sequencial. É por isso que o mecanismo inteiro está exposto acima, antes de você decidir qualquer coisa."],
  ["Não tenho tempo para assistir.",
   "Não precisa assistir tudo antes de aplicar, e o desenho é proposital. Você aplica um conceito em uma call real, analisa com o framework e avança. Progresso a cada ciclo, não no fim do curso."],
  ["Meu problema é geração de lead, não conversão.",
   "Talvez. Mas comprar mais lead para compensar conversão baixa é a correção mais cara que existe, e a conta que apareceu acima é sua, feita com os seus números."],
  ["Prefiro contratar um closer.",
   "Sem um padrão de condução definido por você, o closer improvisa. Você troca a dependência de si mesmo pela dependência dele, e adiciona comissão."],
  ["Isso é mais um treinamento de vendas?",
   "Não. Treinamento de vendas trabalha o que dizer. Aqui o trabalho é a ordem, que é o que determina se a frase certa chega na camada certa."],
  ["Funciona no meu segmento?",
   "O protocolo não é sobre o seu produto, é sobre como a decisão humana acontece. Foi aplicado em segmentos que não conversam entre si, de medicina a curso de idioma."],
  ["Serve para o meu time comercial?",
   "Serve, e vira critério único de avaliação de call. Cada pessoa do time precisa do próprio acesso."],
  ["E se não for para mim?",
   "Existe prazo de garantia. Devolução integral, sem pedir explicação."],
];

/* ============================================================
   RENDER
   ============================================================ */
if (!a._completedAt && !a.trava) {
  report.innerHTML = `
    <p class="eyebrow">Seu diagnóstico</p>
    <h2>Ainda não temos as suas respostas</h2>
    <p class="lead">Parece que você chegou aqui sem responder o diagnóstico. Leva cerca de 2 minutos.</p>
    <div class="actions"><a class="btn btn-primary btn-block" href="index.html">Fazer agora</a></div>`;
} else {
  const nome = esc((a.nomeResp || "").split(" ")[0]);
  const iic = P.calcularIIC(a);
  const travaId = P.travaDominante(a);
  const trava = F.travas[travaId];
  const travas = P.perfilTravas(a);
  const conta = P.calcularConta(a);
  const segmento = P.segmentoLead(a);
  const O = F.oferta;

  const origem = P.frase(a, "origem") || "o jeito como as suas reuniões chegam hoje";
  const perda = P.frase(a, "perda") || "o jeito como elas costumam terminar";
  const custo = P.frase(a, "custo") || "o custo que isso já teve";
  const tentativa = P.frase(a, "tentativa") || "buscar uma saída";
  const objetivo = P.frase(a, "objetivo") || "converter mais das reuniões que você já tem";
  const estrutura = P.frase(a, "estrutura") || "";
  const oquevende = esc(a.oquevende || "");

  /* Calibragem do argumento pelo ticket. Quem vende caro perde contrato, quem
     vende ticket de entrada perde volume de reunião. Não barra ninguém: o
     produto é o mesmo e o preço cabe nos dois casos. */
  const ARGUMENTO = {
    "topo": "No seu caso a conta é de contrato: com time comercial estruturado, cada ponto de condução que falta se multiplica por todas as reuniões que o time conduz, não só pelas suas.",
    "ticket-alto": "No seu caso a conta é de contrato: no seu ticket, uma reunião conduzida na ordem certa paga vários meses de qualquer coisa que você faça para melhorar a conversão.",
    "ticket-medio": "No seu caso a conta é de repetição: no seu ticket, a diferença aparece no acumulado do mês, e é ela que decide se você precisa vender mais reunião ou conduzir melhor as que já tem.",
    "ticket-entrada": "No seu caso a conta é de volume: cada reunião que não fecha é uma hora inteira gasta, e no seu ticket a hora gasta pesa mais, porque você precisa de mais fechamentos para chegar no mesmo lugar.",
  };

  /* Régua das sete etapas. A barra cresce até o ponto em que o controle
     escapa, que é o começo da PRIMEIRA etapa afetada pela trava: quem trava em
     Alarme Primal vê a barra quase vazia (a conversa nem chegou a andar), quem
     trava em Prescrição Sem Âncora vê a barra quase cheia (foi tudo bem até o
     preço). Substitui o gauge "Você x Concorrente" da referência, que compara
     o lead com um número de terceiro que ninguém tem como sustentar. */
  const totalEtapas = F.etapas.length;
  const afetadas = trava.etapasIdx || [1];
  const pctRegua = Math.round(((afetadas[0] - 0.5) / totalEtapas) * 100);
  const etapasChips = F.etapas.map((e, i) =>
    `<span class="${afetadas.indexOf(i + 1) > -1 ? "ativa" : ""}">${e}</span>`).join("");

  const cta = (extra) => `
    <div class="cta-inline">
      <button class="btn btn-primary btn-block cta-checkout" type="button">Quero o ${O.nome}</button>
      ${extra ? `<span class="hint">${extra}</span>` : ""}
    </div>`;

  const blocoFundadores = O.dataLimiteFundadores
    ? `<div class="fundadores"><b>Turma de Fundadores.</b> Esta condição vale até ${O.dataLimiteFundadores}. Depois disso o preço sobe e não volta.</div>`
    : "";
  const textoGarantia = O.prazoGarantia
    ? `Entra, assiste e aplica na primeira call. Se não fizer sentido em até ${O.prazoGarantia}, devolução integral, sem pedir explicação.`
    : `Entra, assiste e aplica na primeira call. Se não fizer sentido dentro do prazo de garantia, devolução integral, sem pedir explicação.`;

  const blocoDepoimentos = DEPOIMENTOS.length ? `
    <hr class="divisor" />
    <div class="etapa">
      <h3>Quem já aplicou</h3>
      <div class="dep-videos">
        ${DEPOIMENTOS.map((d) => `
          <figure class="dep-video">
            <video src="${d.src}" poster="${d.poster}" controls playsinline preload="none"></video>
            <figcaption><b>${d.nome}</b>${d.segmento}</figcaption>
          </figure>`).join("")}
      </div>
    </div>` : "";

  const blocoConta = conta ? `
    <div class="etapa">
      <h3>Falta uma conta</h3>
      <p>Com o volume e o ticket que você informou, dá para calcular quanto ficou na mesa nos últimos doze meses.
      Não é projeção do que pode acontecer, é leitura do que já aconteceu.</p>
      <div class="conta-box">
        <p class="conta-legenda">Uma reunião a mais fechada a cada dez, nos últimos doze meses</p>
        <div class="conta-num" id="conta-num" data-valor="${conta.anual}">${P.fmtBRL(0)}</div>
        <p class="conta-legenda">é o que a condução deixou de trazer.</p>
        <p class="conta-formula">Cálculo feito com os números que você mesmo informou:
        ${conta.reunioes} reuniões por mês, ticket de ${P.fmtBRL(conta.ticket)}, e apenas
        uma reunião a mais fechada a cada dez. Usamos sempre o piso de cada faixa que você marcou,
        nunca o teto.</p>
      </div>
      <p class="hint" style="margin-top:14px">${ARGUMENTO[segmento]}</p>
    </div>` : "";

  const duvida = (F.marca.whatsapp && /^[0-9]{12,13}$/.test(F.marca.whatsapp))
    ? `<p class="duvida">Dúvida antes de decidir? <a href="#" class="cta-duvida">Fale com a equipe no WhatsApp.</a></p>` : "";

  report.innerHTML = `
    <div class="report-head">
      <span class="selo">Diagnóstico de Condução</span>
      <h1>${nome ? nome + ", a" : "A"} sua reunião trava em
        <span class="trava-nome">${trava.nome}</span></h1>
      <p class="lead">Isso não diz nada sobre a qualidade do que você vende.
      Diz em que ponto da conversa a decisão sai do seu controle.</p>
      <div class="iic">
        <div class="iic-num" id="iic-num" data-pct="${iic.pct}">0%</div>
        <div class="iic-txt">Inversão ${iic.faixa}<span>quanto da sua conversa acontece fora da ordem em que a decisão realmente é tomada</span></div>
      </div>
    </div>

    <div class="etapa">
      <h3>Onde o controle escapa</h3>
      <div class="regua" id="regua">
        <div class="regua-track"><div class="regua-fill" data-pct="${pctRegua}"></div></div>
        <div class="etapas-chips" style="justify-content:center">${etapasChips}</div>
        <p class="regua-marca">Etapas afetadas: <strong>${trava.etapas}</strong></p>
      </div>
    </div>

    <div class="etapa">
      <h3>Como as quatro travas aparecem no seu caso</h3>
      <div class="travas-lista" id="travas-lista">
        ${travas.map((t) => `
          <div class="trava-item ${t.id === travaId ? "dominante" : ""}">
            <div class="trava-topo">
              <span class="trava-label">${t.nome}</span>
              <span class="trava-pct">${t.pct}%</span>
            </div>
            <div class="trava-track"><div class="trava-fill" data-pct="${t.pct}"></div></div>
            ${t.id === travaId ? `<p class="trava-desc">${t.resumo}</p>` : ""}
          </div>`).join("")}
      </div>
      <p class="hint" style="margin-top:14px">Percentual de afinidade calculado a partir das suas respostas. A trava dominante é a que comanda o resto da leitura.</p>
    </div>

    <hr class="divisor" />

    <div class="etapa">
      <h3>Antes de tudo</h3>
      <p>${nome ? "Oi, " + nome + ". " : ""}Nada aqui é sobre falta de competência ou falta de esforço.
      Você não estaria fazendo reunião de venda se o que você entrega não sustentasse a conversa.
      O que trava tem explicação, tem nome, e tem ordem.</p>
    </div>

    <div class="etapa">
      <h3>A leitura do seu cenário</h3>
      <p>Você contou que as suas reuniões chegam principalmente por <strong>${origem}</strong>,
      que as que não fecham costumam terminar com <strong>${perda}</strong>,
      e que isso já te custou <strong>${custo}</strong>.${estrutura ? ` Hoje a sua operação é de <strong>${estrutura}</strong>.` : ""}</p>
      <p>Essa combinação é a assinatura de quem trava em <strong>${trava.nome}</strong>: ${trava.resumo}
      Repare no que ela tem de específico: o problema não aparece no fim da conversa, mesmo que seja lá
      que você sinta. Ele aparece antes, e só cobra o preço no fim.</p>
    </div>

    <div class="etapa">
      <h3>O espelho</h3>
      <p>Você provavelmente se reconhece aqui:</p>
      <ul class="espelho">${ESPELHO.map((e) => `<li>${e}</li>`).join("")}</ul>
      <p class="virada">Nada disso é falta de técnica de fechamento. É a ordem. A decisão de compra acontece
      em três camadas, e a maior parte das reuniões é perdida porque o vendedor entra pela camada errada,
      na hora errada. O fim da conversa é onde a conta chega, não onde o erro acontece.</p>
    </div>

    ${cta("Acesso imediato à área de membros. Sem reunião, sem call de vendas.")}

    <hr class="divisor" />

    <div class="etapa">
      <h3>Por que o que você tentou não funcionou</h3>
      <p>A maior parte do que se ensina sobre venda trabalha <strong>o que dizer</strong>. Uma parte menor
      trabalha <strong>como pensar</strong>. Quase ninguém trabalha <strong>a ordem</strong>. Por isso
      ${tentativa} não mudou o seu jogo:</p>
      <ul class="entrega">
        ${TENTATIVAS_MORTAS.map(([t, d]) => `<li><b>${t}:</b> ${d}</li>`).join("")}
      </ul>
      <p>Todos têm o mesmo alvo: o que dizer. Nenhum toca na camada em que a decisão acontece.</p>
    </div>

    <div class="etapa">
      <h3>O mecanismo</h3>
      <p>O Protocolo <strong>${O.nome}</strong> parte da ordem real em que a decisão humana acontece.</p>
      <ul class="camadas">
        <li><b>Primal:</b> segurança, ameaça, status e pertencimento. Decide antes da consciência.
        Ignorada, o lead resiste sem saber por quê e diz que vai pensar.</li>
        <li><b>Emocional:</b> desejo, medo e identidade projetada. Dá a energia da decisão.
        Ignorada, o lead entende tudo, concorda com tudo e não compra.</li>
        <li><b>Racional:</b> justificativa, comparação e orçamento. Sustenta a decisão já tomada.
        Ignorada, o lead compra e depois se arrepende.</li>
      </ul>
      <p>Sobre essa hierarquia rodam sete etapas, cada uma com função, critério de saída e sinal de
      travamento: Abertura, Diagnóstico, Espelho, Contexto, Condução, Prescrição e Decisão. É o que
      permite olhar uma reunião perdida e apontar a etapa exata em que o controle escapou.</p>
    </div>

    <div class="etapa">
      <h3>O que precisa acontecer no seu caso</h3>
      <p>${trava.caminho}</p>
      <p>O que você quer, <strong>${objetivo}</strong>, depende disso e não do contrário.</p>
      <p><strong>O custo de continuar como está</strong> não é só o contrato que não fechou. É o desconto
      que você deu sem precisar, a agenda ocupada por quem nunca ia decidir, o concorrente pior que levou
      o cliente, e a próxima reunião que você vai conduzir do mesmo jeito, porque ninguém te mostrou
      onde ela quebrou.</p>
    </div>

    ${blocoConta}

    ${cta("")}

    <hr class="divisor" />

    <div class="etapa">
      <h3>A virada</h3>
      <p>Agora você sabe onde a sua conversa quebra. Saber já muda a próxima reunião, e essa parte é sua
      para sempre, tenha você comprado alguma coisa ou não.</p>
      <p>O que saber não resolve é a estrutura. Enquanto a correção depender de você lembrar, no meio de
      uma negociação, o que precisa acontecer naquela etapa, ela não vai acontecer.
      <strong>Condução não se sustenta na memória, se sustenta em protocolo.</strong></p>
    </div>

    <div class="etapa">
      <h3>O que está dentro</h3>
      <ul class="entrega">
        <li><b>Os seis movimentos do Primal Pitch:</b> os fundamentos da hierarquia primal, emocional e
        racional, e os cinco elementos que atravessam a conversa inteira: posição, ritmo, intenção,
        âncora e limite.</li>
        <li><b>As sete etapas do Primal Closing:</b> Abertura, Diagnóstico, Espelho, Contexto, Condução,
        Prescrição e Decisão, aplicadas a uma call real, do primeiro minuto ao fechamento ou ao
        follow-up. Cada etapa com a função dela, o critério de saída e o sinal de que a conversa travou,
        em um módulo por etapa.</li>
        <li><b>Perfis comportamentais e objeção por ferida:</b> a calibragem de linguagem, ritmo e
        ancoragem para os quatro perfis, e o tratamento de objeção pela ferida ativada, no lugar de
        resposta pronta.</li>
        <li><b>O protocolo pós-decisão:</b> a instalação que protege a venda contra o arrependimento e o
        follow-up estruturado em 2, 24 e 48 horas.</li>
        <li><b>Bônus, o Framework de Análise de Call:</b> o guia que transforma cada reunião perdida em
        informação aproveitável, com a régua das sete etapas para você auditar as suas próprias gravações.</li>
      </ul>

      <div class="oferta-box">
        <p class="oferta-nome">${O.nome}</p>
        <p class="oferta-desc">${O.descricao}</p>
        <p class="oferta-preco">${O.preco}</p>
        <p class="oferta-cond">${O.parcelamento}</p>
        <button class="btn btn-primary btn-block cta-checkout" type="button">Quero o ${O.nome}</button>
        <p class="oferta-nota">${O.acesso}.</p>
        ${blocoFundadores}
      </div>
      <p class="hint" style="margin-top:14px"><strong>Garantia.</strong> ${textoGarantia}</p>
    </div>

    <hr class="divisor" />

    <div class="etapa">
      <h3>Quem assina esse método</h3>
      <div class="autor">
        <img class="autor-foto" src="thiago.jpg" alt="Thiago Menegão" width="184" height="184"
               loading="lazy" onerror="this.remove()" />
        <div>
          <span class="autor-nome">THIAGO MENEGÃO</span>
          <span class="autor-cargo">Engenheiro · Estrategista · Criador do ${O.nome}</span>
          <a class="autor-ig" href="https://instagram.com/thiagomenegao" target="_blank" rel="noopener">${F.marca.instagram}</a>
        </div>
      </div>
      <p>Engenheiro de computação, estudioso de comportamento humano desde 1993. Passou quase duas décadas
      nos bastidores de empresas como Mercedes, Itaú, Honda, John Deere, Electrolux e Philips,
      trabalhando estratégia, comunicação e comportamento antes de precisar vender qualquer coisa
      para si mesmo.</p>
      <p>Não nasceu vendedor. Quando precisou fechar os próprios contratos, foi para o campo no improviso
      e apanhou. Estudou o que todo mundo estuda, melhorou pouco, e só virou o jogo quando cruzou
      psicologia comportamental, neurociência e tomada de decisão com a prática real de fechamento.
      Parou de perguntar como convenço este lead e passou a perguntar
      <strong>em que camada este lead decide</strong>.</p>
      <p>Hoje conduz negociações de alto valor com esse protocolo e ensina o método em consultoria,
      uma empresa por vez. O ${O.nome} gravado existe para que a estrutura inteira chegue a quem
      quer aplicar sem depender da agenda dele.</p>
      <div class="cred-grid">
        <div class="cred"><div class="n">1993</div><div class="d">estudando comportamento humano</div></div>
        <div class="cred"><div class="n">20 anos</div><div class="d">de mercado, quase duas décadas nos bastidores</div></div>
        <div class="cred"><div class="n">50+</div><div class="d">projetos entregues</div></div>
        <div class="cred"><div class="n">Marca própria</div><div class="d">PRIMAL PITCH®, método registrado</div></div>
      </div>
      <div class="marcas">
        <span>Mercedes</span><span>Itaú</span><span>Honda</span>
        <span>John Deere</span><span>Electrolux</span><span>Philips</span>
      </div>
    </div>

    ${blocoDepoimentos}

    <hr class="divisor" />

    <div class="etapa">
      <h3>Para quem é, e para quem não é</h3>
      <div class="compare">
        <div class="col good">
          <h4>É para você se</h4>
          <ul>
            <li>Vende em reunião individual ou em palco, com ticket que exige conversa</li>
            <li>Já entrega resultado real e sente que a condução não está à altura do que entrega</li>
            <li>Se recusa a usar ancoragem falsa e fechamento forçado</li>
          </ul>
        </div>
        <div class="col bad">
          <h4>Não é para você se</h4>
          <ul>
            <li>Procura frase pronta para vencer objeção sem mudar a condução</li>
            <li>Acredita que o problema está inteiramente no lead</li>
            <li>Ainda não tem produto validado nem reunião acontecendo, porque aí o gargalo é aquisição e não condução</li>
            <li>Procura motivação em vez de estrutura</li>
          </ul>
        </div>
      </div>
    </div>

    <div class="etapa faq">
      <h3>Perguntas que sempre aparecem</h3>
      ${FAQ.map(([q, r]) => `
        <details>
          <summary>${q}</summary>
          <p class="resposta">${r}</p>
        </details>`).join("")}
    </div>

    <hr class="divisor" />

    <div class="cta-box">
      <h2 style="margin-top:0">${nome ? nome + ", a" : "A"} partir daqui existem três caminhos</h2>
      <ol class="escolhas" style="text-align:left">
        <li>Fechar esta página e voltar para a rotina. Continuar explicando demais, continuar ouvindo
        faz sentido de novo, continuar torcendo para a próxima call ser diferente. Você pode seguir
        assim, mas o curso disso você já conhece.</li>
        <li>Tentar resolver sozinho. Assistir mais conteúdo, juntar mais informação, testar outro
        script. Se informação bastasse, isso já estaria resolvido. O que falta não é conteúdo, é
        estrutura de condução.</li>
        <li class="agora">Entrar agora e aplicar o protocolo na sua próxima reunião. Uma única
        negociação conduzida na ordem certa já paga este investimento.</li>
      </ol>
      <p class="pergunta-final">A pergunta não é se faz sentido entrar.
      A pergunta é quanto te custa continuar adiando.</p>
      <button class="btn btn-primary btn-block cta-checkout" type="button">Quero o ${O.nome}</button>
      <p class="oferta-nota">${O.preco}, ${O.parcelamento}. ${O.acesso}.</p>
      ${duvida}
    </div>`;

  /* ============================================================
     ANIMAÇÃO
     Toda barra e todo número CRESCEM até o valor, nunca aparecem prontos.
     Foi o detalhe que o cliente destacou na referência, e é o que dá a
     sensação de que algo está sendo calculado ali. Dispara na entrada em tela,
     uma vez só, e respeita prefers-reduced-motion.
     ============================================================ */
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function animarBarra(elm) {
    const pct = Number(elm.dataset.pct || 0);
    elm.style.width = pct + "%";
  }

  function animarConta(elm) {
    const alvo = Number(elm.dataset.valor || 0);
    if (reduce || !alvo) { elm.textContent = P.fmtBRL(alvo); return; }
    contarAte(elm, alvo, 1200, (v) => P.fmtBRL(Math.round(v)));
  }

  /* Percentual que sobe junto com a barra, no mesmo easing. */
  function animarPct(elm) {
    const alvo = Number(elm.dataset.pct || 0);
    if (reduce) { elm.textContent = alvo + "%"; return; }
    contarAte(elm, alvo, 900, (v) => Math.round(v) + "%");
  }
  function contarAte(elm, alvo, dur, fmt) {
    const ini = performance.now();
    function passo(t) {
      const p = Math.min(1, (t - ini) / dur);
      const eased = 1 - Math.pow(1 - p, 3);   /* mesma curva das barras */
      elm.textContent = fmt(alvo * eased);
      if (p < 1) requestAnimationFrame(passo);
    }
    requestAnimationFrame(passo);
  }

  function animar(elm) {
    if (elm.id === "conta-num") return animarConta(elm);
    if (elm.classList.contains("iic-num")) return animarPct(elm);
    animarBarra(elm);
    if (elm.classList.contains("regua-fill")) {
      const regua = document.getElementById("regua");
      if (regua) regua.classList.add("on");
    }
  }

  const alvos = [
    ...report.querySelectorAll("#iic-num"),
    ...report.querySelectorAll(".regua-fill, .trava-fill"),
    ...report.querySelectorAll("#conta-num"),
  ];

  if (reduce || !("IntersectionObserver" in window)) {
    alvos.forEach(animar);
  } else {
    const obs = new IntersectionObserver((entradas) => {
      entradas.forEach((e) => {
        if (!e.isIntersecting) return;
        animar(e.target);
        obs.unobserve(e.target);
      });
    }, { threshold: 0.45 });
    /* As barras com defasagem de 120ms entre si, para a leitura acompanhar
       uma de cada vez em vez de tudo saltar junto. */
    alvos.forEach((elm, i) => setTimeout(() => obs.observe(elm), i * 120));
  }

  /* FAQ: uma resposta aberta por vez, como na referência. */
  const detalhes = [...report.querySelectorAll(".faq details")];
  detalhes.forEach((d) => d.addEventListener("toggle", () => {
    if (d.open) detalhes.forEach((o) => { if (o !== d) o.open = false; });
  }));
}

/* ============================================================
   CTA
   Um handler para todos os botões distribuídos. Este funil é venda direta:
   o destino é o checkout, não um agendamento. TRAVA: enquanto a URL do
   checkout não estiver preenchida em flow.js, os botões não navegam e a
   página avisa no topo. Evita subir tráfego com botão mudo.
   ============================================================ */
function checkoutValido() {
  return /^https?:\/\/.+/i.test(String((F.marca && F.marca.checkoutUrl) || ""));
}

function irParaCheckout() {
  if (!checkoutValido()) {
    console.warn("[funil] checkout não configurado em flow.js > marca.checkoutUrl");
    return;
  }
  /* As UTMs do anúncio seguem para o checkout, senão a venda chega lá sem
     origem e não dá para saber qual criativo pagou. */
  const url = new URL(F.marca.checkoutUrl);
  new URLSearchParams(location.search).forEach((v, k) => {
    if (k.indexOf("utm_") === 0) url.searchParams.set(k, v);
  });
  window.location.href = url.toString();
}

function abrirWhatsApp() {
  const n = String((F.marca && F.marca.whatsapp) || "");
  if (!/^[0-9]{12,13}$/.test(n)) return;
  const msg = (F.marca.whatsappMsg || "")
    .replace("{nome}", (a.nomeResp || "").split(" ")[0] || "")
    .replace("{trava}", F.travas[P.travaDominante(a)].nome);
  window.open(`https://wa.me/${n}?text=${encodeURIComponent(msg)}`, "_blank", "noopener");
}

/* ---------- Pixel da Meta no relatório ----------
   A biblioteca carrega no diagnostico.html. Aqui saem os dois eventos que só
   existem nesta página. NUNCA mandar nome, telefone ou e-mail para o Pixel. */
function metaPadrao(evento, params) {
  if (typeof fbq !== "function") return;
  try { fbq("track", evento, params || {}); } catch (e) { /* nunca quebra a página */ }
}
function paramsQualificacao() {
  try {
    return {
      content_name: (F.config && F.config.frente) || "Funil",
      content_category: F.travas[P.travaDominante(a)].nome,
      iic: P.calcularIIC(a).pct,
      faixa: P.calcularIIC(a).faixa,
      segmento: P.segmentoLead(a),
      value: 2000, currency: "BRL",
    };
  } catch (e) { return {}; }
}
if (a._completedAt) metaPadrao("ViewContent", paramsQualificacao());

document.addEventListener("click", (e) => {
  if (e.target.closest && e.target.closest(".cta-checkout")) {
    /* InitiateCheckout é o sinal de intenção mais forte deste funil: a pessoa
       leu o diagnóstico inteiro e foi para o pagamento. */
    metaPadrao("InitiateCheckout", paramsQualificacao());
    irParaCheckout();
    return;
  }
  const duv = e.target.closest && e.target.closest(".cta-duvida");
  if (duv) { e.preventDefault(); metaPadrao("Contact", paramsQualificacao()); abrirWhatsApp(); }
});

if (!checkoutValido()) {
  const aviso = document.createElement("p");
  aviso.className = "aviso";
  /* Redigido para quem estiver revisando a página, não só para quem mexe no
     código: este link circula em aprovação antes de existir checkout. */
  aviso.textContent = "Prévia para aprovação. O botão de compra ainda não está ligado, porque falta a URL do checkout (flow.js > marca.checkoutUrl). Todo o resto do funil está funcionando.";
  report.prepend(aviso);
}
