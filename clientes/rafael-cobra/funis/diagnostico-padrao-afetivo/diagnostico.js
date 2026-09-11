/* ============================================================
   DIAGNÓSTICO. Carta personalizada a partir das respostas.
   Cliente: Rafael Cobra. Copy aprovada: seção 3 da estratégia de 13/08,
   os 9 blocos, na ordem.
   0 cabeçalho e selo do índice · 1 o resultado dela · 2 a leitura do cenário ·
   3 o espelho · 4 por que o que você tentou não resolveu · CTA · 5 o mecanismo ·
   6 o que precisa acontecer no seu caso · CTA · 7 quem é o Rafael ·
   8 para quem é, para quem não é, e FAQ · 9 o convite, adaptado à qualificação.
   Padrão: nunca usar travessões. Sem emoji. Concordância no feminino.
   ============================================================ */
const STORE_KEY = "rafael_cobra_quiz";
const F = window.FLOW;
const report = document.getElementById("report");

function getState() { try { return JSON.parse(sessionStorage.getItem(STORE_KEY)) || {}; } catch (e) { return {}; } }
function frase(stepId) {
  const step = F.steps.find(s => s.id === stepId);
  const val = (getState().answers || {})[stepId];
  const opt = step && step.options.find(o => o.value === val);
  return (opt && opt.report) || "";
}
function esc(s) { return String(s == null ? "" : s).replace(/[<>&]/g, c => ({ "<": "&lt;", ">": "&gt;", "&": "&amp;" }[c])); }

const a = getState().answers || {};

function calcularIRP(answers) {
  let soma = 0, max = 0;
  F.steps.forEach((s) => {
    const pontua = s.options.some((o) => typeof o.peso === "number");
    if (!pontua) return;
    max += Math.max(...s.options.map((o) => o.peso || 0));
    const escolhida = s.options.find((o) => o.value === answers[s.id]);
    if (escolhida && typeof escolhida.peso === "number") soma += escolhida.peso;
  });
  const pct = max ? Math.round((soma / max) * 100) : 0;
  return { pct, faixa: pct >= 66 ? "Alta" : (pct >= 33 ? "Média" : "Baixa") };
}
function padraoDominante(answers) {
  const sp = F.steps.find((x) => x.id === "problema");
  const op = sp && sp.options.find((o) => o.value === answers.problema);
  if (op && op.padrao) return op.padrao;
  const sr = F.steps.find((x) => x.id === "repeticao");
  const or = sr && sr.options.find((o) => o.value === answers.repeticao);
  return (or && or.padrao) || "Provedora Emocional";
}

/* Leitura por padrão. Vem do bloco 6 da estratégia, palavra por palavra:
   o que precisa acontecer no caso dela, sem prometer relacionamento. */
const LEITURA_PADRAO = {
  "Provedora Emocional": {
    resumo: "o seu padrão é o da <strong>Provedora Emocional</strong>: você dá mais do que recebe e chama isso de amor. Escolhe quem precisa de você, não quem escolhe você.",
    caminho: "Antes de qualquer coisa, o trabalho é separar ser necessária de ser amada. Enquanto dar for o seu jeito de garantir presença, você vai continuar escolhendo quem precisa de você, e vai continuar cansada.",
  },
  "Espera a Definição": {
    resumo: "o seu padrão é o da <strong>Que Espera a Definição</strong>: você vive relações sem contrato. Ele não define, você não cobra para não parecer difícil, e o tempo passa.",
    caminho: "O trabalho aqui é a sua régua. Você não cobra para não parecer difícil, e o silêncio vira contrato. Sem régua não existe relação, existe espera, e espera não vira compromisso com o tempo.",
  },
  "Sabe e Não Sai": {
    resumo: "o seu padrão é o da <strong>Que Sabe e Não Sai</strong>: você já entendeu que a relação te machuca, explica tudo com clareza, e continua.",
    caminho: "Aqui o padrão é mais antigo e mais forte, e a saída não é informação: é sustentação. Você já sabe. O que falta não é entender mais, é conseguir aguentar sair, e isso não se faz sozinha.",
  },
  "Blindada": {
    resumo: "o seu padrão é o da <strong>Blindada</strong>: você afasta quem é bom para você e persegue quem é indisponível. A autonomia virou defesa.",
    caminho: "A autonomia que te salvou está te isolando. O trabalho é conseguir receber sem sentir que está perdendo o controle, porque hoje quem te quer de verdade aciona um alarme que não é sobre ele.",
  },
};

/* ============================================================
   PROVA SOCIAL
   Ele é psicanalista: depoimento de paciente exige AUTORIZAÇÃO ESCRITA, e
   caso clínico não vira copy. Por isso as duas listas nascem vazias e a seção
   inteira só aparece quando houver material liberado. Publicar "[DEPOIMENTO]"
   para tráfego real seria um placeholder no ar, e é pior que não ter prova.
   Enquanto isso, a prova da página é a trajetória dele, no bloco de autoridade.
   Quando chegar material autorizado, é só preencher: a estrutura já existe,
   igual à do funil da Luana Isse (vídeo vertical com preload="none", print
   que abre em tamanho real).
   ============================================================ */
const VIDEOS = [];
const PRINTS = [];

if (!a._completedAt && !a.problema) {
  report.innerHTML = `
    <p class="eyebrow">Seu diagnóstico</p>
    <h2>Ainda não temos as suas respostas</h2>
    <p class="lead">Parece que você chegou aqui sem responder o diagnóstico. Leva cerca de 2 minutos.</p>
    <div class="actions"><a class="btn btn-primary btn-block" href="index.html">Fazer agora</a></div>`;
} else {
  const nome = esc((a.nomeResp || "").split(" ")[0]) || "tudo bem";
  const situacao = frase("situacao") || "o seu momento de agora";
  const repeticao = frase("repeticao") || "o que se repete nas suas relações";
  const reacao = frase("reacao") || "o que você faz quando começa a doer";
  const tempo = frase("tempo") || "um tempo";
  const custo = frase("custo") || "mais do que você gostaria";
  const tentativa = frase("tentativas") || "tentar resolver sozinha";
  const objetivo = frase("objetivo") || "parar de aceitar menos do que você merece";

  const irp = calcularIRP(a);
  const padrao = padraoDominante(a);
  const leitura = LEITURA_PADRAO[padrao];
  const faixaClasse = irp.faixa === "Alta" ? "alta" : (irp.faixa === "Média" ? "media" : "baixa");
  const resultado = (F.resultados && F.resultados[padrao]) || "A Provedora Emocional";

  /* Mesma regra do app.js. Quatro faixas para o atendimento, três CTAs na
     página: fila-quente e qualificado veem o mesmo botão. */
  const PERFIL_ICP = ["empresaria", "executiva", "liberal"];
  const stepPr = F.steps.find((s) => s.id === "prontidao");
  const optPr = stepPr && stepPr.options.find((o) => o.value === a.prontidao);
  const nivel = (optPr && optPr.fora) ? "fora"
    : ((optPr && optPr.nutrir) ? "nutrir"
      : ((a.prontidao === "pronta" && PERFIL_ICP.indexOf(a.perfil) > -1 && irp.pct >= 66) ? "fila-quente" : "qualificado"));

  let ctaLabel, ctaExtra, fecho;
  if (nivel === "qualificado" || nivel === "fila-quente") {
    ctaLabel = "Quero minha sessão de diagnóstico";
    ctaExtra = '<p class="hint">A agenda clínica dele está cheia, então são poucas sessões por semana, e cada uma é preparada antes com base no que você respondeu.</p>';
    fecho = '<p class="clube">São 45 minutos, com ele, para olhar a sua história de frente e nomear a origem do que se repete. Você sai com a leitura, decida ou não seguir.</p>';
  } else if (nivel === "nutrir") {
    ctaLabel = "Quero entender como funciona";
    ctaExtra = '<p class="hint">Sem compromisso e no seu tempo. Dá para entender o caminho agora e decidir depois, quando fizer sentido para você.</p>';
    fecho = '<p class="clube">Não existe hora errada para entender o que está se repetindo. A decisão vem depois.</p>';
  } else {
    /* Quem só queria o diagnóstico não recebe oferta de sessão: recebe a
       leitura inteira e um convite de conteúdo. Oferecer sessão para quem já
       disse não gasta a agenda dele e ensina ela a dizer não. */
    ctaLabel = "Quero continuar acompanhando";
    ctaExtra = '<p class="hint">O seu diagnóstico está aí em cima e é seu, para reler quantas vezes quiser.</p>';
    fecho = '<p class="clube">Todo dia ele fala sobre esse padrão no perfil, e é de graça. Quando fizer sentido, você sabe onde encontrar.</p>';
  }
  const ctaInline = `<div class="cta-inline"><button class="btn btn-primary cta-wpp">${ctaLabel}</button></div>`;

  /* O bloco de prova só entra quando existir material autorizado. */
  const blocoProva = (VIDEOS.length || PRINTS.length) ? `
    <div class="etapa">
      <h3>Quem já fez esse caminho</h3>
      <div class="dep-videos">
        ${VIDEOS.map(v => `
          <figure class="dep-video">
            <video src="${v.src}" poster="${v.poster}" controls playsinline preload="none"></video>
            <figcaption><b>${v.nome}</b>${v.papel}</figcaption>
          </figure>`).join("")}
      </div>
      <div class="dep-prints">
        ${PRINTS.map(d => `
          <figure class="dep-print${d.largo ? " largo" : ""}">
            <a href="${d.src}" target="_blank" rel="noopener">
              <img src="${d.src}" alt="${d.alt}" loading="lazy" />
            </a>
            <figcaption><b>${d.quem}</b>${d.papel}</figcaption>
          </figure>`).join("")}
      </div>` : "";

  report.innerHTML = `
    <div class="report-head">
      <span class="selo">Diagnóstico do Padrão Afetivo</span>
      <h1>O seu padrão tem nome</h1>
      <div class="resultado">${resultado}</div>
      <div class="irp ${faixaClasse}">
        <div class="irp-num">${irp.pct}%</div>
        <div class="irp-txt">Repetição ${irp.faixa}<span>o quanto esse padrão já se instalou nas suas escolhas</span></div>
      </div>
      <p class="hint">Calculado a partir das suas respostas em ${new Date().toLocaleDateString("pt-BR")}</p>
    </div>

    <div class="etapa">
      <h3>Antes de tudo</h3>
      <p>${nome}, li suas respostas com atenção. Vou ser direto com você, porque acho que é isso que você precisa agora,
      não mais uma frase bonita. <strong>Isso não é um julgamento sobre você. É o nome do que se repete, e é o começo do fim dele.</strong></p>
    </div>

    <div class="etapa">
      <h3>O seu cenário hoje</h3>
      <p>Você me contou que hoje o seu momento é de <strong>${situacao}</strong>, que o que mais se repete é
      <strong>${repeticao}</strong>, e que quando começa a doer você costuma <strong>${reacao}</strong>.
      Isso já dura <strong>${tempo}</strong>, e já te custou <strong>${custo}</strong>.</p>
      <p>Essa combinação é a assinatura do padrão que apareceu no seu resultado. E ela diz uma coisa importante:
      <strong>o padrão não fica parado. Ele cobra juros.</strong></p>
    </div>

    <div class="etapa">
      <h3>O espelho</h3>
      <p>Você é competente. Ninguém precisa te dizer isso: o seu currículo diz. Você resolve o que ninguém resolve,
      sustenta a casa, sustenta os outros, sustenta até quem não sustenta você. E aí chega no amor e parece que nada
      do que você é conta.</p>
      <ul class="metodo">
        <li>Você atrai o homem que elogia, que admira, que diz que você é incrível, e não te escolhe.</li>
        <li>Você dá mais do que recebe e chama isso de amor.</li>
        <li>Você engole o que incomoda para não parecer difícil.</li>
        <li>Você já terminou e voltou, sabendo que ia terminar de novo.</li>
        <li>Depois do terceiro, você parou de culpar eles e começou a culpar você.</li>
      </ul>
      <p><strong>Não há nada de errado com você. Há um padrão em você.</strong> E padrão não se resolve com força de
      vontade, nem com mais um livro, nem tentando de novo com outra pessoa.</p>
    </div>

    <div class="etapa">
      <h3>Por que o que você já tentou não resolveu</h3>
      <p>Você marcou que já chegou a <strong>${tentativa}</strong>. Isso não foi desperdício: hoje você entende o seu
      padrão melhor do que a maioria das pessoas entende o próprio.</p>
      <p>Só que entender é da cabeça, e o padrão não mora na cabeça. Mora em quem você se torna quando está dentro da
      relação. É por isso que você explica tudo com clareza para a sua amiga e, três meses depois, faz igual de novo.</p>
      <p><strong>Entender o padrão não basta.</strong> Enquanto quem você é dentro da relação não mudar, você troca de
      homem e repete a história.</p>
    </div>

    ${ctaInline}

    <div class="etapa">
      <h3>O que eu faço, e o que eu não faço</h3>
      <div class="compare">
        <div class="col bad">
          <h4>O que ensinam por aí</h4>
          <ul><li>Como conversar e se comportar</li><li>Como fazer ele correr atrás</li><li>Técnica para a relação melhorar</li><li>Funciona por três semanas</li></ul>
        </div>
        <div class="col good">
          <h4>O que eu faço</h4>
          <ul><li>Encontro a origem inconsciente do padrão</li><li>Trato a estrutura, não o comportamento</li><li>Você para de aceitar, em vez de aceitar melhor</li><li>O homem errado deixa de caber na sua vida</li></ul>
        </div>
      </div>
      <p class="hint">Sou psicanalista. Não é autoestima baixa genérica: é uma estrutura, e ela tem começo, meio e lógica.</p>
    </div>

    <div class="etapa">
      <h3>O que precisa acontecer no seu caso</h3>
      <p>Pelo que você respondeu, ${leitura.resumo}</p>
      <p>${leitura.caminho}</p>
      <p><strong>O custo de continuar onde está</strong> não é só a relação que não veio. É o ano que passa igual, a
      energia que some, e a parte de você que vai desistindo em silêncio de tentar de novo.</p>
      <p>O que você disse que quer, <strong>${objetivo}</strong>, é possível. E o primeiro passo não é aprender a
      conquistar ninguém: é olhar a origem do que se repete.</p>
    </div>

    ${ctaInline}

    <div class="etapa">
      <h3>Quem é o Rafael Cobra</h3>
      <div class="autor">
        <div>
          <span class="autor-nome">RAFAEL COBRA</span>
          <span class="autor-cargo">Psicanalista · Palestrante TEDx</span>
          <a class="autor-ig" href="https://www.instagram.com/orafaelcobra/" target="_blank" rel="noopener">@orafaelcobra</a>
        </div>
      </div>
      <p>Psicanalista, com centenas de atendimentos na carreira. Antes disso, oito anos como atleta da seleção
      brasileira de remo, melhor do país no período. Foi lá que aprendi uma coisa que uso até hoje no consultório:
      ninguém quebra um padrão sozinho e no improviso.</p>
      <p class="autor-fala">"A pergunta que eu mais ouço na primeira sessão é: por que sempre eu? A resposta é
      desconfortável e libertadora ao mesmo tempo. O problema nunca esteve na escolha. Esteve no que faz você escolher."</p>
      <div class="cred-grid">
        <div class="cred"><div class="n">333 mil</div><div class="d">pessoas acompanhando, sem um centavo de anúncio</div></div>
        <div class="cred"><div class="n">2 milhões</div><div class="d">de visualizações em um único vídeo sobre esse padrão</div></div>
        <div class="cred"><div class="n">TEDx</div><div class="d">palestrante</div></div>
        <div class="cred"><div class="n">8 anos</div><div class="d">como melhor atleta do país no remo</div></div>
      </div>
    </div>
    ${blocoProva}

    <div class="etapa">
      <h3>Para quem é, e para quem não é</h3>
      <div class="compare">
        <div class="col good">
          <h4>É para você se</h4>
          <ul><li>O padrão já se repete há anos, e com pessoas diferentes</li><li>Você já tentou entender sozinha, entendeu, e repetiu</li><li>Você quer parar de aceitar, não quer aprender a conquistar</li></ul>
        </div>
        <div class="col bad">
          <h4>Talvez não seja o momento se</h4>
          <ul><li>Você procura técnica para reconquistar alguém específico</li><li>Você quer alguém que garanta que vai aparecer um homem</li><li>Você está em crise aguda e precisa de acompanhamento clínico contínuo</li></ul>
        </div>
      </div>
    </div>

    <div class="etapa">
      <h3>Perguntas que sempre chegam</h3>
      <dl class="faq">
        <dt>Isso é terapia?</dt>
        <dd>Não. É uma leitura estratégica da sua vida afetiva. Se você já faz terapia, isso não substitui e não atrapalha: soma.</dd>
        <dt>Já fiz terapia por anos e não resolvi. Por que agora?</dt>
        <dd>Porque terapia trata o sintoma no ritmo em que ele aparece. Aqui a gente vai direto ao padrão, com método e prazo. Muita paciente minha chega exatamente assim.</dd>
        <dt>E se eu estiver num relacionamento ruim agora?</dt>
        <dd>Melhor ainda. É onde o padrão está vivo e visível.</dd>
        <dt>Quanto custa a sessão?</dt>
        <dd>Nada. O que custa é continuar mais um ano igual.</dd>
      </dl>
    </div>

    <div class="cta-box">
      <h2 style="margin-top:0">O próximo passo, ${nome}</h2>
      <p>Você já perdeu tempo demais tentando entender sozinha.</p>
      ${ctaExtra}
      <div class="actions" style="justify-content:center">
        <button class="btn btn-primary cta-wpp">${ctaLabel}</button>
      </div>
      ${fecho}
    </div>`;
}

/* ---------- WhatsApp: um handler para todos os CTAs distribuídos ----------
   Trava: se o número estiver vazio ou ainda com placeholder, os CTAs não
   abrem nada e a página mostra um aviso no topo. Evita publicar com botão
   mudo e só descobrir depois que o tráfego já rodou. */
function numeroValido() {
  const n = String((F.marca && F.marca.whatsapp) || "");
  return /^[0-9]{12,13}$/.test(n);
}

function abrirWhatsApp() {
  if (!numeroValido()) {
    console.warn("[funil] WhatsApp não configurado em flow.js > marca.whatsapp");
    return;
  }
  const irp = calcularIRP(a);
  const padrao = padraoDominante(a);
  const msg = (F.marca.whatsappMsg || "")
    .replace("{nome}", (a.nomeResp || "").split(" ")[0] || "")
    .replace("{resultado}", (F.resultados && F.resultados[padrao]) || "")
    .replace("{irp}", irp.pct + "%")
    .replace("{faixa}", irp.faixa.toLowerCase())
    .replace("{padrao}", padrao);
  window.open(`https://wa.me/${F.marca.whatsapp}?text=${encodeURIComponent(msg)}`, "_blank", "noopener");
}

/* ============================================================
   PIXEL DA META no relatório
   A biblioteca carrega no diagnostico.html (PageView sai de lá). Aqui saem os
   dois eventos que só existem nesta página. Contact no clique do WhatsApp é o
   sinal de intenção mais forte do funil.
   NUNCA mande nome, telefone ou e-mail para o Pixel. Só qualificação.
   ============================================================ */
function metaPadrao(evento, params) {
  if (typeof fbq !== "function") return;
  try { fbq("track", evento, params || {}); } catch (e) { /* nunca quebra a página */ }
}
function paramsQualificacao() {
  try {
    const ans = getState().answers || {};
    const irp = calcularIRP(ans);
    const padrao = padraoDominante(ans);
    return {
      content_name: (F.config && F.config.frente) || "Funil",
      content_category: padrao,
      irp: irp.pct,
      faixa: irp.faixa,
      resultado: (F.resultados && F.resultados[padrao]) || "",
    };
  } catch (e) { return {}; }   // tracking nunca derruba o relatório
}
if ((getState().answers || {})._completedAt) {
  metaPadrao("ViewContent", paramsQualificacao());
}

document.addEventListener("click", (e) => {
  if (e.target.closest && e.target.closest(".cta-wpp")) {
    metaPadrao("Contact", paramsQualificacao());
    abrirWhatsApp();
  }
});

if (!numeroValido()) {
  const aviso = document.createElement("p");
  aviso.className = "aviso";
  aviso.textContent = "Configuração pendente: o WhatsApp comercial não está preenchido em flow.js, então os botões não abrem conversa. Preencha marca.whatsapp antes de mandar tráfego.";
  report.prepend(aviso);
}
