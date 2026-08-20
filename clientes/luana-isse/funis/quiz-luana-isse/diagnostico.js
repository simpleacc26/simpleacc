/* ============================================================
   DIAGNÓSTICO. Carta de vendas personalizada a partir das respostas.
   Ordem dos blocos conforme o blueprint da Simple:
   0 cabeçalho e selo do índice · 1 antes de tudo · 2 seu cenário ·
   3 por que não resolveu · 4 dois caminhos · CTA · 5 o método ·
   6 o que precisa acontecer · CTA · 7 quem é a Luana (autoridade) ·
   8 depoimentos · 9 CTA final adaptado à qualificação.
   Padrão: nunca usar travessões. Sem emoji. Linguagem neutra em gênero.
   ============================================================ */
const STORE_KEY = "luana_isse_quiz";
const F = window.FLOW;
const report = document.getElementById("report");

function getState() { try { return JSON.parse(sessionStorage.getItem(STORE_KEY)) || {}; } catch (e) { return {}; } }
function frase(stepId) {
  const step = F.steps.find(s => s.id === stepId);
  const val = (getState().answers || {})[stepId];
  const opt = step && step.options.find(o => o.value === val);
  return (opt && opt.report) || "";
}
function valor(stepId) { return (getState().answers || {})[stepId]; }
function esc(s) { return String(s == null ? "" : s).replace(/[<>&]/g, c => ({ "<": "&lt;", ">": "&gt;", "&": "&amp;" }[c])); }

const a = getState().answers || {};

function calcularIRV(answers) {
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
function pilarDominante(answers) {
  const s = F.steps.find((x) => x.id === "problema");
  const o = s && s.options.find((op) => op.value === answers.problema);
  return (o && o.pilar) || "Posicionamento";
}

/* Leitura por pilar: o que precisa acontecer no caso de quem respondeu */
const LEITURA_PILAR = {
  Mentalidade: {
    resumo: "a sua ruptura está concentrada em <strong>Mentalidade</strong>: você sabe o que faz, mas trava na hora de ocupar o espaço que é seu.",
    caminho: "Antes de qualquer estratégia, o trabalho é remover o bloqueio que faz você se esconder. Enquanto se posicionar parecer arrogância, nenhuma tática pega. Não é falta de técnica, é permissão.",
  },
  Movimento: {
    resumo: "a sua ruptura está concentrada em <strong>Movimento</strong>: você fala do que faz, e ainda não do que defende.",
    caminho: "O trabalho é transformar o seu conhecimento em causa. Ninguém lembra de quem descreve um serviço; lembra de quem defende uma ideia. Sem causa, o conteúdo vira informação e informação não gera lembrança.",
  },
  Posicionamento: {
    resumo: "a sua ruptura está concentrada em <strong>Posicionamento</strong>: o que você diz poderia ser dito por qualquer colega da sua área.",
    caminho: "O trabalho é ficar inconfundível: identidade, narrativa e arquétipo. Enquanto você for intercambiável, a decisão do cliente volta para o preço, porque não existe outro critério visível.",
  },
  Vendas: {
    resumo: "a sua ruptura está concentrada em <strong>Vendas</strong>: você já comunica bem, e o que falta é caminho de compra.",
    caminho: "O trabalho é oferta, processo e condução. Você já constrói percepção; o que não existe ainda é a ponte entre quem admira o seu conteúdo e quem contrata você.",
  },
};

/* ============================================================
   DEPOIMENTOS
   Regra desta conta: depoimento aqui NÃO cita número de faturamento.
   É decisão da própria Luana (ela não promete resultado financeiro) e
   protege o anúncio, porque a Meta lê a página de destino. Dos prints que
   ela mandou em 20/08, só este passa nessa régua; os outros dois são
   captura de valor em reais e ficaram de fora de propósito.
   Antes de somar depoimento novo: confirmar autorização de quem aparece.
   ============================================================ */
const DEPOIMENTOS = [
  {
    texto: "Hoje eu vendi a minha primeira mentoria no Método Tekton, que criei a partir do MMPV. Um mês desde que fiz a escolha de estar aqui e os resultados já começaram.",
    quem: "Nathy, mentorada da turma atual",
  },
];

if (!a._completedAt && !a.problema) {
  report.innerHTML = `
    <p class="eyebrow">Seu diagnóstico</p>
    <h2>Ainda não temos as suas respostas</h2>
    <p class="lead">Parece que você chegou aqui sem responder o diagnóstico. Leva cerca de 2 minutos.</p>
    <div class="actions"><a class="btn btn-primary btn-block" href="index.html">Fazer agora</a></div>`;
} else {
  const nome = esc((a.nomeResp || "").split(" ")[0]) || "tudo bem";
  const situacao = frase("situacao") || "o seu momento atual";
  const problema = frase("problema") || "o que mais te trava hoje";
  const tempo = frase("tempo") || "um tempo";
  const impacto = frase("impacto") || "seguir no mesmo ponto";
  const tentativa = frase("necessidade") || "buscar uma solução";
  const objetivo = frase("objetivo") || "ter reconhecimento pelo que você entrega";
  const perfil = frase("perfil") || "";

  const irv = calcularIRV(a);
  const pilar = pilarDominante(a);
  const leitura = LEITURA_PILAR[pilar];

  const faixaClasse = irv.faixa === "Alta" ? "alta" : (irv.faixa === "Média" ? "media" : "baixa");
  const resultado = (F.resultados && F.resultados[pilar]) || "Excelente e invisível";

  /* Mesma regra do app.js. Quatro faixas para o atendimento, três CTAs na
     página: fila-quente e qualificado veem o mesmo botão. */
  const stepFat = F.steps.find((s) => s.id === "faturamento");
  const optFat = stepFat && stepFat.options.find((o) => o.value === a.faturamento);
  const caixaBom = ["10a25", "25a50", "acima50"].indexOf(a.faturamento) > -1;
  const nivel = (optFat && optFat.fora) ? "fora"
    : ((a.prontidao === "depois" || a.prontidao === "pesquisando") ? "nutrir"
      : ((a.prontidao === "sim" && caixaBom && irv.pct >= 66) ? "fila-quente" : "qualificado"));

  let ctaLabel, ctaExtra, fecho;
  if (nivel === "qualificado" || nivel === "fila-quente") {
    ctaLabel = "Quero agendar minha sessão de posicionamento";
    ctaExtra = '<p class="hint">São poucos horários por semana, porque cada sessão é preparada antes com base no seu diagnóstico.</p>';
    fecho = '<p class="clube">Na sessão, a Luana lê o seu caso com nome e sobrenome e desenha o caminho. Você sai com clareza, decida ou não seguir.</p>';
  } else if (nivel === "nutrir") {
    ctaLabel = "Quero entender melhor como funciona";
    ctaExtra = '<p class="hint">Sem compromisso e no seu tempo. A equipe te explica o caminho e o que faz sentido para o seu momento.</p>';
    fecho = '<p class="clube">Não existe hora errada para entender o que está travando. A decisão vem depois, quando fizer sentido para você.</p>';
  } else {
    ctaLabel = "Falar com a equipe no WhatsApp";
    ctaExtra = '<p class="hint">A equipe te indica por onde começar no seu momento, e te avisa da próxima conferência gratuita.</p>';
    fecho = '<p class="clube">Comece pelo conteúdo e pela próxima conferência. O caminho existe, e ele tem ordem.</p>';
  }
  const ctaInline = `<div class="cta-inline"><button class="btn btn-primary cta-wpp">${ctaLabel}</button></div>`;

  report.innerHTML = `
    <div class="report-head">
      <span class="selo">Diagnóstico de Autoridade</span>
      <h1>O seu Índice de Ruptura de Valor</h1>
      <div class="resultado">${resultado}</div>
      <div class="irv ${faixaClasse}">
        <div class="irv-num">${irv.pct}%</div>
        <div class="irv-txt">Ruptura ${irv.faixa}<span>distância entre o que você sabe e o que o mercado enxerga</span></div>
      </div>
      <p class="hint">Calculado a partir das suas respostas em ${new Date().toLocaleDateString("pt-BR")}</p>
    </div>

    <div class="etapa">
      <h3>Antes de tudo</h3>
      <p>Oi, ${nome}. Li com atenção tudo o que você respondeu, e quero começar por uma coisa que talvez ninguém tenha te dito:
      <strong>o que trava o seu reconhecimento não é falta de competência, nem falta de esforço.</strong>
      Tem explicação, tem nome, e tem caminho.</p>
    </div>

    <div class="etapa">
      <h3>O seu cenário hoje</h3>
      <p>Pelo que você me contou, o seu momento é de <strong>${situacao}</strong>, e o que mais pesa é
      <strong>${problema}</strong>. Isso já dura <strong>${tempo}</strong>, e a tendência, se nada mudar,
      é <strong>${impacto}</strong>.${perfil ? ` Você também se descreveu como alguém que vive <strong>${perfil}</strong>.` : ""}</p>
      <p>Esse padrão se repete em quase todo especialista que chega até mim. E ele tem um nome.</p>
    </div>

    <div class="etapa">
      <h3>Por que não mudou até agora</h3>
      <p>Você já chegou a <strong>${tentativa}</strong>, e mesmo assim o reconhecimento não veio.
      Faz sentido: todas essas saídas miram na tática, e o que trava um especialista competente não está na tática.</p>
      <p>O nome disso é <strong>Ruptura de Valor Percebido</strong>: a distância entre o valor que você possui e o valor
      que você consegue comunicar ao mercado. Enquanto essa distância existir, nenhuma estratégia será suficiente para
      gerar vendas consistentes, porque tática aplicada em cima de uma percepção quebrada só produz mais ruído.</p>
      <p>No seu caso, ${leitura.resumo}</p>
    </div>

    <div class="etapa">
      <h3>Dois especialistas, e a diferença entre eles</h3>
      <div class="compare">
        <div class="col bad">
          <h4>O especialista técnico</h4>
          <ul><li>Sabe muito e estuda muito</li><li>Tem formação e certificados</li><li>É elogiado por quem já conhece</li><li>E continua sendo comparado por preço</li></ul>
        </div>
        <div class="col good">
          <h4>O especialista percebido</h4>
          <ul><li>Talvez saiba exatamente o mesmo</li><li>Mas construiu outra percepção</li><li>É lembrado, indicado e valorizado</li><li>E vende mentorias de alto valor</li></ul>
        </div>
      </div>
      <p class="hint">A diferença entre os dois não é conhecimento. É comunicação de valor, e isso se constrói.</p>
    </div>

    ${ctaInline}

    <div class="etapa">
      <h3>Como o método funciona</h3>
      <p>O <strong>MMPV, Método de Multiplicação do Valor Percebido</strong>, existe para eliminar a ruptura. Em quatro pilares, nessa ordem:</p>
      <ol class="metodo">
        <li><strong>Mentalidade:</strong> remove os bloqueios que impedem você de ocupar o seu espaço.</li>
        <li><strong>Movimento:</strong> transforma o seu conhecimento em causa.</li>
        <li><strong>Posicionamento:</strong> transforma a sua causa em autoridade percebida.</li>
        <li><strong>Vendas:</strong> transformam a sua autoridade em faturamento.</li>
      </ol>
      <p class="hint">Fora dessa ordem não funciona. É por isso que começar pelo marketing raramente sustenta.</p>
    </div>

    <div class="etapa">
      <h3>O que precisa acontecer agora</h3>
      <p>${leitura.caminho}</p>
      <p>O que você quer, <strong>${objetivo}</strong>, é totalmente possível. O primeiro passo é uma
      <strong>sessão de posicionamento</strong>: uma leitura do seu caso com nome e sobrenome, e o desenho do
      próximo passo. Não é apresentação de produto.</p>
    </div>

    ${ctaInline}

    <div class="etapa">
      <h3>Quem é a Luana Isse</h3>
      <div class="autor">
        <img class="autor-foto" src="luana.jpg" alt="Luana Isse" width="160" height="160" loading="lazy" />
        <div>
          <span class="autor-nome">LUANA ISSE</span>
          <span class="autor-cargo">Jornalista · Copywriter · Estrategista · Master Coach</span>
          <a class="autor-ig" href="https://www.instagram.com/luana.isse/" target="_blank" rel="noopener">@luana.isse</a>
        </div>
      </div>
      <p>Passei dez anos construindo narrativa e movimento para líderes que precisavam ser lembrados pelo que
      representam. Hoje faço a mesma engenharia para o especialista brilhante que ninguém vê.</p>
      <p class="autor-fala">"Depois de acompanhar dezenas de especialistas, percebi que o verdadeiro problema não é o
      marketing. É a distância entre o valor que eles possuem e o valor que conseguem comunicar ao mercado."</p>
      <div class="cred-grid">
        <div class="cred"><div class="n">10 anos</div><div class="d">de comunicação e narrativa para líderes</div></div>
        <div class="cred"><div class="n">30</div><div class="d">especialistas já mentorados</div></div>
        <div class="cred"><div class="n">87</div><div class="d">pessoas em evento presencial, no orgânico</div></div>
        <div class="cred"><div class="n">17</div><div class="d">alunos na turma atual da mentoria</div></div>
      </div>
    </div>

    <div class="etapa">
      <h3>Quem já fez esse caminho</h3>
      ${DEPOIMENTOS.map(d => `
        <div class="dep">
          <p>${d.texto}</p>
          <span class="quem">${d.quem}</span>
        </div>`).join("")}
    </div>

    <div class="cta-box">
      <h2 style="margin-top:0">O próximo passo, ${nome}</h2>
      <p>Dar o primeiro passo é simples, e no seu tempo.</p>
      ${ctaExtra}
      <div class="actions" style="justify-content:center">
        <button class="btn btn-primary cta-wpp">${ctaLabel}</button>
      </div>
      ${fecho}
    </div>`;
}

/* ---------- WhatsApp: um handler para todos os CTAs distribuídos ----------
   Trava: se o número estiver vazio ou ainda com X de placeholder, os CTAs não
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
  const irv = calcularIRV(a);
  const pilar = pilarDominante(a);
  const msg = (F.marca.whatsappMsg || "")
    .replace("{nome}", (a.nomeResp || "").split(" ")[0] || "")
    .replace("{resultado}", (F.resultados && F.resultados[pilar]) || "")
    .replace("{irv}", irv.pct + "%")
    .replace("{faixa}", irv.faixa.toLowerCase())
    .replace("{pilar}", pilar);
  window.open(`https://wa.me/${F.marca.whatsapp}?text=${encodeURIComponent(msg)}`, "_blank", "noopener");
}

document.addEventListener("click", (e) => {
  if (e.target.closest && e.target.closest(".cta-wpp")) abrirWhatsApp();
});

if (!numeroValido()) {
  const aviso = document.createElement("p");
  aviso.className = "aviso";
  aviso.textContent = "Configuração pendente: o WhatsApp comercial não está preenchido em flow.js, então os botões não abrem conversa. Preencha marca.whatsapp antes de mandar tráfego.";
  report.prepend(aviso);
}
