/* ============================================================
   DIAGNÓSTICO · a página de resultado, uma por bucket.

   Estrutura da apostila (Procedimento 6): headline de
   identificação -> VSL -> espelhamento com as palavras da pessoa
   -> causa-raiz nomeada -> mecanismo -> prova -> CTA específica.
   Os nove blocos da estratégia da Adriana entram nessa ordem.

   O conteúdo muda por bucket e a CTA muda por qualificação.
   Band-aid e cura: aqui está o "o quê". O "como" é a mentoria.
   ============================================================ */
const F = window.FLOW;
const M = window.MOTOR;
const report = document.getElementById("report");

const a = M.respostas();
const temRespostas = !!(a._completedAt || a.orcamento);

function esc(s) {
  return String(s == null ? "" : s).replace(/[<>&]/g, c => ({ "<": "&lt;", ">": "&gt;", "&": "&amp;" }[c]));
}

if (!temRespostas) {
  report.innerHTML = `
    <p class="eyebrow">O seu diagnóstico</p>
    <h2>Ainda não tenho as suas respostas</h2>
    <p class="lead">Parece que você chegou aqui sem responder. O diagnóstico é montado com as suas respostas, então ele começa no quiz.</p>
    <div class="actions"><a class="btn btn-primary btn-block" href="index.html">Fazer agora</a></div>`;
} else {
  const nome = esc((a.nomeResp || "").split(" ")[0]) || "Oi";
  const divida = M.calcularDivida(a);
  const custos = M.custosDeOperacao(a, divida);
  const bucket = M.definirBucket(a);
  const B = bucket.dados;
  const nivel = M.classificarLead(a, divida);

  const segmento = M.frase("segmento");
  const ticket = M.frase("ticket");
  const eventos = M.frase("volume");
  const respOrcamento = M.frase("orcamento");
  const pctDesconto = M.frase("desconto");
  const extras = M.frase("extras");
  const sentimento = M.frase("sentimento");
  const tentativas = M.frase("tentativas");
  const equipe = M.frase("equipe");
  const comissao = M.frase("comissao");
  const objetivo = M.frase("objetivo");
  const faturamento = M.frase("faturamento");

  /* ---- CTA por nível de qualificação ---- */
  let ctaLabel, ctaClasse, ctaNota, fechamento;
  if (nivel === "qualificado") {
    /* Ela pediu "Quero agendar para ter uma empresa lucrativa" e deixou a
       regra escrita: se o destino for WhatsApp e não uma agenda, usar
       "conversar com a Adriana". O destino aqui é o WhatsApp dela, então
       vale a segunda forma. Se um dia entrar agenda (config.agendamentoUrl),
       o texto volta para "agendar". */
    ctaLabel = "Quero conversar com a Adriana para ter uma empresa lucrativa";
    ctaClasse = "cta-sessao";
    ctaNota = "São 45 minutos com a Adriana, olhando a sua conta. Sem apresentação de slide.";
    fechamento = `<p class="clube">Se fizer sentido seguirmos juntas, eu te explico como. Se não fizer, você sai com a sua conta na mão do mesmo jeito.</p>`;
  } else if (nivel === "nutrir") {
    ctaLabel = "Quero conversar com a Adriana para ter uma empresa lucrativa";
    ctaClasse = "cta-wpp";
    ctaNota = "Sem compromisso. A gente olha o seu número e te diz qual é o primeiro passo no seu caso.";
    fechamento = `<p class="clube">Para o seu momento, o primeiro passo costuma ser menor do que você imagina. E começa por onde o dinheiro está saindo.</p>`;
  } else {
    ctaLabel = "Quero conversar com a Adriana sobre o meu negócio";
    ctaClasse = "cta-wpp";
    ctaNota = "Sem compromisso, e sem proposta de mentoria agora.";
    fechamento = "";
  }
  const ctaInline = `<div class="cta-inline"><button class="btn btn-primary ${ctaClasse}" type="button">${ctaLabel}</button></div>`;

  /* ---- Bloco 4 · a conta (com e sem número) ---- */
  let blocoConta;
  if (divida.temNumero) {
    const linhas = [];
    if (divida.valorDesconto > 0) {
      linhas.push(`<li><span>Desconto dado no fechamento</span><strong>${divida.fmt.desconto} por mês</strong></li>`);
    }
    if (divida.valorExtras > 0) {
      linhas.push(`<li><span>Extras que você absorve</span><strong>${divida.fmt.extras} por mês</strong></li>`);
    }
    /* A comissão entra na soma por decisão dela: pagar sem estratégia, com
       medo de perder o parceiro, é consequência da Dívida de Valor, não
       custo de operação. Mão de obra continua fora, em bloco próprio. */
    if (divida.valorComissao > 0) {
      linhas.push(`<li><span>A comissão que você paga sem estratégia por causa da Dívida de Valor, com medo de perder o parceiro</span><strong>${divida.fmt.comissao} por mês</strong></li>`);
    }
    blocoConta = `
      <div class="etapa">
        <h3>O quanto isso está te custando</h3>
        <p><strong>Esse é um dos cálculos que mostra quanto você está perdendo em dinheiro em seu negócio
        por ter a Dívida de Valor.</strong></p>
        <p>Com o que você respondeu, valor ${ticket} por trabalho e ${eventos} eventos por mês, a conta fica assim:</p>
        <ul class="conta">${linhas.join("")}</ul>
        <div class="numerao">
          <span class="rotulo">A sua Dívida de Valor</span>
          <span class="valor">${divida.fmt.mes}</span>
          <span class="periodo">por mês</span>
          <hr class="rule-gold" />
          <span class="ano">${divida.fmt.ano} em doze meses</span>
        </div>
        ${divida.teveTeto ? `<p class="distincao">Uma observação de honestidade: pelo valor e pelo volume que você
        marcou, a conta daria bem mais que isso. Só que na última pergunta você disse que o negócio vende
        <strong>${faturamento}</strong> por mês, e <strong>eu sempre fico com o número menor.</strong>
        Por isso essa conta está feita por baixo. Se o seu volume for mesmo o que você marcou, a perda é maior.</p>` : ``}
        <p>${nome}, esse dinheiro não foi roubado e não se perdeu no mercado.
        <strong>Ele foi entregue por você, de graça, junto com o seu trabalho.</strong></p>
        <p class="distincao">E é por isso que se chama dívida. <strong>Só que não é dívida de banco:</strong>
        dívida financeira aparece no extrato, tem boleto, tem data e alguém cobra. A Dívida de Valor não
        aparece em lugar nenhum, ninguém cobra e ninguém devolve. Ela sai do seu bolso disfarçada de contrato fechado,
        cliente satisfeito e agenda cheia. <strong>É por isso que ela cresce por anos sem ninguém ver.</strong></p>
      </div>`;
  } else {
    blocoConta = `
      <div class="etapa">
        <h3>A sua conta</h3>
        <p>Aqui acontece uma coisa interessante. Você marcou que quase não dá desconto e que quase não absorve extra.
        <strong>Então a sua perda não está no fechamento nem na entrega: ela está antes.</strong></p>
        <p>Acontece no orçamento que sai e não volta, e esse é o único tipo de perda que não aparece em lugar nenhum.
        Não entra na planilha, não tem linha no extrato, e por isso passa anos sem ser resolvida.
        É a sua Dívida de Valor, e ela é invisível.</p>
      </div>`;
  }

  /* ---- prova e depoimentos (só os reais) ---- */
  const galeria = (F.depoimentos && F.depoimentos.length)
    ? `<div class="depo-gallery">${F.depoimentos.map(d =>
        `<img class="depo-shot" src="${d}" loading="lazy" alt="Depoimento de cliente" />`).join("")}</div>`
    : "";

  /* ---- VSL (só quando existir de verdade) ---- */
  const vsl = (F.vsl && F.vsl.ativo && F.vsl.embed)
    ? `<div class="etapa"><h3>${F.vsl.titulo}</h3><div class="vsl">${F.vsl.embed}</div></div>`
    : "";

  /* ---- oferta de entrada, só para quem está fora da faixa ---- */
  const entrada = (nivel === "fora" && F.ofertaEntrada && F.ofertaEntrada.ativo)
    ? `<div class="entrada">
         <p class="eyebrow">Um primeiro passo do seu tamanho</p>
         <h3 class="entrada-nome">${F.ofertaEntrada.nome} <span>${F.ofertaEntrada.preco}</span></h3>
         <p>${F.ofertaEntrada.promessa}</p>
         <a class="btn btn-outline btn-block" href="${F.ofertaEntrada.link}" target="_blank" rel="noopener">${F.ofertaEntrada.cta}</a>
       </div>`
    : "";

  report.innerHTML = `
    <div class="report-head">
      <span class="selo">Diagnóstico da Dívida de Valor</span>
    </div>

    <!-- Bloco 1 · o resultado dela (fórmula de identificação da apostila) -->
    <div class="resultado">
      <p class="padrao-rotulo">O seu padrão é</p>
      <h1><em>${B.nome}</em></h1>
      <p class="padrao-onde">${B.onde}</p>
      <p class="padrao-porque">${nome}, esse é o seu padrão porque você ainda não <strong>${B.causaRaiz}</strong>.</p>
      <p class="hint">Isso não é um julgamento sobre o seu trabalho. É o nome do lugar por onde o seu dinheiro está saindo, e é o começo do fim dele.</p>
    </div>

    ${vsl}

    <!-- Bloco 2 · a leitura do cenário -->
    <div class="etapa">
      <h3>O que eu li nas suas respostas</h3>
      <p>Eu li tudo com atenção. Vou ser direta com você, porque é disso que você precisa agora, e não de mais uma frase bonita.</p>
      <p>Você trabalha com <strong>${segmento}</strong>, entrega <strong>${eventos}</strong> eventos por mês e cobra
      <strong>${ticket}</strong> em cada um. Quando manda um orçamento, o que mais acontece é <strong>${respOrcamento}</strong>.
      Na hora de fechar sai <strong>${pctDesconto}</strong> de desconto. Sobre os extras: <strong>${extras}</strong>.
      E no fim do mês, olhando a conta, você sente <strong>${sentimento}</strong>.</p>
      <p>Essa combinação é a assinatura d${B.nome.startsWith("A") ? "a" : "o"} <strong>${B.nome}</strong>.
      ${B.resumo} E ela diz uma coisa importante: <strong>isso não fica parado.</strong>
      Cada mês que passa, a diferença entre o que você entrega e o que você recebe aumenta um pouco.</p>
    </div>

    <!-- Bloco 3 · o espelho -->
    <div class="etapa">
      <h3>O espelho</h3>
      <p>Você é boa no que faz. Ninguém precisa te dizer isso: o seu trabalho diz. Te procuram, te indicam,
      e quando o evento é importante o seu nome aparece.</p>
      <p>Provavelmente você se reconhece aqui:</p>
      <ul class="espelho">
        <li>Entregou o evento mais bonito da cidade e, no fim do mês, não sobrou para repor o material</li>
        <li>Mandou o orçamento com capricho e a pessoa agradeceu e sumiu</li>
        <li>Aceitou o extra de última hora, fez acontecer e nunca lançou na conta</li>
        <li>Ouviu que fulana faz mais barato, de alguém que nunca viu o seu trabalho de perto</li>
        <li>Trabalhou o fim de semana inteiro de novo e se perguntou até quando</li>
        <li>Pensou em subir o preço e travou, com medo de perder o cliente que já tem</li>
      </ul>
      <p><strong>Não há nada de errado com você. Há um padrão no seu negócio.</strong>
      E padrão não se resolve trabalhando mais, nem fazendo mais um curso, nem tentando de novo no próximo orçamento.</p>
    </div>

    <!-- Bloco 4 · a conta -->
    ${blocoConta}

    <!-- Bloco 4b · o que a operação come, ao lado da conta -->
    <div class="etapa">
      <h3>E tem o que a operação absorve</h3>
      ${custos.semConta
        ? `<p>Você marcou que <strong>nunca fez a conta do que a mão de obra absorve de um evento</strong>.
           Não é descuido: quase ninguém nesse mercado faz. Só que esse é o custo que mais cresce sozinho,
           porque ele sobe a cada evento aceito e nunca aparece numa linha só.</p>
           <p><strong>Enquanto você não souber esse número, qualquer preço que você colocar é chute.</strong>
           É a primeira conta que eu faço com quem senta comigo.</p>`
        : `<p>Somando equipe fixa e freelancer, a mão de obra absorve <strong>${equipe}</strong>,
           cerca de <strong>${custos.fmt.custoEquipeMes} por mês</strong> na sua operação.</p>
           ${custos.equipePesada && divida.pctDesconto > 0
             ? `<p>Repare no cruzamento: a mão de obra já leva ${equipe}, e ainda assim você dá
                <strong>${pctDesconto}</strong> de desconto na hora de fechar.
                <strong>O desconto sai do que já sobrava pouco, antes mesmo de você abrir a boca.</strong></p>`
             : ``}
           ${custos.equipePesada
             ? `<p>Mão de obra acima de 20% quase nunca é preço de mercado: é equipe sem treino, que precisa de
                mais gente para entregar o mesmo. Você paga caro por mão de obra barata.</p>`
             : ``}`}
    </div>

    ${custos.temComissao ? `
    <!-- Bloco 4c · a conta da comissão -->
    <div class="etapa destaque">
      <h3>A conta da comissão</h3>
      <p>Você paga <strong>${comissao}</strong> para quem te traz contrato. Essa é a conta que quase ninguém faz.</p>
      <p>A comissão não sai do que entra, sai do <strong>que sobra para você</strong>. Num buffet ou numa decoração
      em que sobram ${custos.margemRef}% no fim do mês, pagar ${comissao} significa entregar
      <strong>cerca de ${custos.fatiaDoLucro}% do lucro daquela festa</strong> para alguém que não montou o salão,
      não atendeu o cliente e não respondeu no domingo.</p>
      ${custos.fatiaDoLucro >= 40
        ? `<p><strong>Nessa faixa, o parceiro deixou de ser parceiro e virou sócio.</strong> E sócio majoritário,
           dependendo do mês. Eu já vi buffet fechar as portas por causa dessa conta.</p>`
        : `<p>Não sou contra comissão. Sou contra virar sócio de quem só faz a indicação.</p>`}
      <p>E o motivo de a porcentagem nunca ser renegociada raramente é o dinheiro:
      <strong>é o medo de perder quem traz festa.</strong> Você aceita a conta do parceiro pelo volume que ele traz,
      e não pelo trabalho que você entrega. Isso também é Dívida de Valor.</p>
    </div>` : ``}

    ${ctaInline}

    <!-- Bloco 5 · por que o que você tentou não resolveu -->
    <div class="etapa">
      <h3>Por que o que você já tentou não resolveu</h3>
      <p>Você marcou que <strong>${tentativas}</strong>. Isso não foi desperdício: hoje você entrega melhor
      que a maioria por causa disso.</p>
      <p>Só que curso técnico melhora a entrega, e o seu problema não está na entrega.
      Planilha de gestão te dá o número certo, e o seu problema não é saber o número:
      é sustentar o número na frente do cliente. Rede social traz mais gente perguntando preço,
      e mais gente perguntando preço sem valor construído antes é mais orçamento sumindo.
      E quase toda mentoria deste mercado ensina a entregar melhor, não a cobrar melhor.</p>
      <p><strong>Nenhuma dessas coisas mexe no lugar onde o dinheiro está saindo.</strong></p>
    </div>

    <!-- Bloco 6 · o mecanismo -->
    <div class="etapa">
      <h3>O que eu faço diferente</h3>
      <p>A maioria ensina técnica: como fazer o arranjo, como montar o cardápio, como calcular o per capita.
      Eu vou muito antes disso.</p>
      <p>Passei 25 anos nesse mercado. Comecei vendendo doce na calçada, virei doceira de festa, assessora,
      decoradora, e fundei um dos maiores buffets da minha cidade. O que eu aprendi nesse tempo é que
      dá para entregar o evento mais bonito da cidade e não ganhar dinheiro com ele, e dá para entregar
      menos eventos, mais tranquilos, e ainda assim sobrar dinheiro no fim do mês.</p>
      <p>A diferença não está na entrega. <strong>Está no que o cliente percebe antes de ver o número.</strong>
      O Método ACA trabalha isso em três camadas, nesta ordem:</p>
      <ol class="metodo">
        <li><strong>Autorreconhecimento:</strong> enxergar o próprio valor e a própria conta.</li>
        <li><strong>Conexão e Comunicação:</strong> traduzir esse valor antes do orçamento.</li>
        <li><strong>Autoridade:</strong> sustentar a posição, para o seu nome deixar de ser comparado e passar a ser procurado.</li>
      </ol>
      <p class="principio">Ninguém cobra acima do valor que acredita ter.</p>
    </div>

    <!-- Bloco 7 · o que precisa acontecer no seu caso -->
    <div class="etapa destaque">
      <h3>O que precisa acontecer no seu caso</h3>
      <p>${B.oQueMuda}</p>
      ${divida.temNumero
        ? `<p class="custo">O custo de continuar como está: em três anos, <strong>${divida.fmt.tresAnos}</strong>.
           E não é só dinheiro. É o fim de semana que você não teve, o evento que você aceitou sabendo que não fechava
           a conta, e a pergunta que volta todo mês.</p>`
        : `<p class="custo">O custo de continuar como está não cabe só em dinheiro.
           É o fim de semana que você não teve, o evento que você aceitou sabendo que não fechava a conta,
           e a pergunta que volta todo mês.</p>`}
    </div>

    ${ctaInline}

    <!-- Bloco 8 · quem é a Adriana, prova e FAQ -->
    <div class="etapa">
      <h3>Quem está te dizendo isso</h3>
      ${F.marca.foto ? `<figure class="retrato">
        <img src="${F.marca.foto}" alt="${F.marca.fotoAlt || ""}" loading="lazy" width="760" height="949" />
        <figcaption>${F.marca.nome}</figcaption>
      </figure>` : ""}
      <p>Comecei vendendo doce na calçada, de porta em porta. Virei doceira de festa, assessora, decoradora,
      e fundei um dos maiores buffets da minha cidade. São 25 anos dentro desse mercado.</p>
      <p><strong>E eu já fui exatamente onde você está.</strong> Em 2017 eu entreguei 13 eventos em uma semana
      e passei 72 horas sem dormir. Ficou tudo impecável, todo mundo elogiou. Na segunda-feira eu fui olhar os
      números e não tinha sobrado quase nada, e o pior: eu não sabia explicar por quê.</p>
      <p>Naquela época, de cada R$ 2 mil que eu recebia, R$ 1.700 iam embora em custo. Ficavam R$ 300 para mim,
      e eu não sabia disso.</p>
      <p>O que mudou depois não foi a minha entrega, foi para quem eu vendia.
      <strong>Eu trabalhava mais e lucrava menos. Hoje eu trabalho menos e lucro mais.</strong>
      Hoje eu faço menos eventos, ganho mais em cada um, e ainda tenho tempo para viver.</p>
      <p>E já em transição de carreira, sem postar decoração, uma cliente me procurou de outro estado e insistiu
      até fechar: R$ 150 mil de decoração mais R$ 15 mil de projeto.</p>
      ${galeria}
    </div>

    <div class="etapa">
      <h3>O que você deve estar pensando</h3>
      <div class="faq">
        <p class="pergunta">"Na minha cidade não tem cliente que paga isso."</p>
        <p>Era o que eu pensava. Até separar meus clientes em A, B e C e descobrir que 30% do meu mercado
        gastava de R$ 20 mil a R$ 40 mil numa festa. Eram poucos, existiam, e eu não falava com eles.</p>
        <p class="pergunta">"Já tentei subir o preço e perdi cliente."</p>
        <p>Perdeu porque subiu o número sem mudar o que vem antes dele.</p>
        <p class="pergunta">"Eu não sou boa de tecnologia."</p>
        <p>Nem eu. Aqui não tem automação nem sigla em inglês. É gestão e conversa, na linguagem de quem monta salão.</p>
      </div>
    </div>

    ${entrada}

    <!-- Bloco 9 · o convite -->
    <div class="cta-box">
      <p class="eyebrow">O próximo passo, ${nome}</p>
      <h2>${nivel === "qualificado"
        ? "Eu abro algumas conversas por semana para olhar esse número junto com a pessoa."
        : "Vamos olhar esse número juntas."}</h2>
      <p class="fechamento">Você já descobriu o padrão da sua Dívida de Valor e quanto ela está fazendo você perder em seu negócio.
      O que falta é você decidir converter todas essas perdas em lucro: uma marca desejada, reconhecida por
      clientes que pagam mais pelo valor da sua entrega, e se transformar em uma marca lucrativa. E isso a gente
      resolve entendendo o modelo do seu negócio em uma conversa, compreendendo o seu momento e, se fizer
      sentido, te entregar uma solução. <strong>Te espero na reunião.</strong></p>
      <p class="hint">${ctaNota}</p>
      <div class="actions" style="justify-content:center">
        <button class="btn btn-primary ${ctaClasse}" type="button">${ctaLabel}</button>
      </div>
      ${fechamento}
      <hr class="rule-gold" />
      <p class="reforco">O seu talento já está pago. Falta você receber por ele.</p>
    </div>`;

  /* ---------- destinos dos CTAs ---------- */
  function abrirWhatsApp() {
    if (!F.marca.whatsapp) return;
    const primeiro = (a.nomeResp || "").split(" ")[0] || "";
    const msg = (F.marca.whatsappMsg || "")
      .replace("{nome}", primeiro)
      .replace("{padrao}", B.nome)
      .replace("{divida}", divida.temNumero ? divida.fmt.mes + " por mês" : "sem número fechado");
    window.open(`https://wa.me/${F.marca.whatsapp}?text=${encodeURIComponent(msg)}`, "_blank", "noopener");
  }
  /* Destino do lead qualificado. O combinado na call de 10/09 é WhatsApp,
     com a Adriana chamando para a reunião pelo script. A apostila sugere
     agenda direta para o qualificado; se o time adotar isso um dia, basta
     preencher config.agendamentoUrl no flow.js. */
  function abrirAgenda() {
    const url = F.config && F.config.agendamentoUrl;
    if (url) window.open(url, "_blank", "noopener");
    else abrirWhatsApp();
  }
  document.addEventListener("click", (e) => {
    if (!e.target.closest) return;
    if (e.target.closest(".cta-sessao")) abrirAgenda();
    else if (e.target.closest(".cta-wpp")) abrirWhatsApp();
  });
}
