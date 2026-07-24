/* ============================================================
   DIAGNÓSTICO EXECUTIVO (IDE). Monta o relatório a partir das
   respostas do quiz (sessionStorage), calcula o IDE e habilita os
   CTAs de WhatsApp distribuídos pela página.
   Estrutura invisível espelhada do quiz de alta conversão da Pâmella
   (espelho do cenário, reframe, dois caminhos, método, CTAs
   distribuídos, depoimentos, CTA final adaptado à qualificação).
   Padrão de escrita: nunca usar travessões (traço longo).
   ============================================================ */
const STORE_KEY = (window.FLOW.config && window.FLOW.config.storeKey) || "felipe_diagnostico_executivo";
const F = window.FLOW;
const report = document.getElementById("report");

function getState() { try { return JSON.parse(sessionStorage.getItem(STORE_KEY)) || {}; } catch (e) { return {}; } }

/* pega a frase de relatório (campo "report") da opção escolhida num passo */
function frase(stepId) {
  const step = F.steps.find(s => s.id === stepId);
  const val = (getState().answers || {})[stepId];
  const opt = step && step.options.find(o => o.value === val);
  return (opt && opt.report) || "";
}
function valor(stepId) { return (getState().answers || {})[stepId]; }
function esc(s) { return String(s == null ? "" : s).replace(/[<>&]/g, c => ({ "<": "&lt;", ">": "&gt;", "&": "&amp;" }[c])); }

/* calcula o IDE a partir dos pesos das respostas (situacao, problema,
   implicacao, necessidade, perfil). tempo/objetivo/qualificacao/prontidao
   não entram no cálculo. */
function calcIDE() {
  const a = getState().answers || {};
  let soma = 0, max = 0;
  ["situacao", "problema", "implicacao", "necessidade", "perfil"].forEach(id => {
    const step = F.steps.find(s => s.id === id);
    if (!step) return;
    const pesos = step.options.map(o => o.peso || 0);
    max += Math.max(...pesos);
    const opt = step.options.find(o => o.value === a[id]);
    soma += (opt && opt.peso) || 0;
  });
  const pct = max ? Math.round((soma / max) * 100) : 0;
  let nivel = "Baixo", cor = "ide-baixo";
  if (pct >= 66) { nivel = "Alto"; cor = "ide-alto"; }
  else if (pct >= 33) { nivel = "Médio"; cor = "ide-medio"; }
  return { pct, nivel, cor };
}

const a = getState().answers || {};

/* sem respostas? (abriu a página direto) */
if (!a._completedAt && !a.problema) {
  report.innerHTML = `
    <p class="eyebrow">Diagnóstico Executivo</p>
    <h2>Ainda não temos as suas respostas</h2>
    <p class="lead">Parece que você chegou aqui sem fazer o diagnóstico. Leva ~2 minutos.</p>
    <div class="actions"><a class="btn btn-primary btn-block" href="index.html">Fazer o diagnóstico agora</a></div>`;
} else {
  const nome = esc((a.nomeResp || "").split(" ")[0]) || "empresário";
  const ide = calcIDE();
  const problema = frase("problema") || "a operação do dia a dia";
  const tempo = frase("tempo") || "um tempo";
  const implicacao = frase("implicacao") || "a empresa depender de você";
  const tentativa = frase("necessidade") || "buscar uma solução";
  const objetivo = frase("objetivo") || "governar a sua empresa sem ser o gargalo dela";

  const foraDeArea = valor("qualificacao") === "ate-50" || valor("qualificacao") === "50-100";
  const prontVal = valor("prontidao");
  const nutrir = prontVal === "depois" || prontVal === "pesquisando";

  // CTA adaptado ao nível de qualificação (faturamento + prontidão)
  let ctaLabel, ctaExtra, clube;
  if (foraDeArea) {
    ctaLabel = "Falar com a equipe no WhatsApp";
    ctaExtra = '<p class="hint">Pelo faturamento de hoje, o melhor primeiro passo pode ser o nosso conteúdo e a plataforma de gestão. Me chama no WhatsApp que eu te mostro por onde começar. 💛</p>';
    clube = "";
  } else if (nutrir) {
    ctaLabel = "Quero entender melhor como funciona";
    ctaExtra = '<p class="hint">Sem compromisso. A equipe te explica o Método Potência Empresarial e tira as suas dúvidas no seu tempo.</p>';
    clube = '<p class="clube">Quando fizer sentido pra você, o primeiro passo é uma <strong>Sessão Estratégica</strong>: um mapeamento do seu cenário, sem compromisso de seguir.</p>';
  } else {
    ctaLabel = "Quero agendar minha Sessão Estratégica";
    ctaExtra = '<p class="hint">Uma conversa individual com o nosso time para desenhar o seu plano de redução de dependência. Vagas limitadas por semana.</p>';
    clube = '<p class="clube">A partir da Sessão Estratégica, conduzimos a implementação do <strong>Governo Empresarial</strong>, pensada para o seu caso.</p>';
  }
  // CTA reutilizável, distribuído pela página (o lead clica quando se sentir pronto)
  const ctaInline = `<div class="cta-inline"><button class="btn btn-primary cta-wpp">${ctaLabel}</button></div>`;

  report.innerHTML = `
    <div class="report-head">
      <span class="selo">Diagnóstico Executivo</span>
      <h1>O seu Índice de Dependência Empresarial</h1>
      <div class="ide-badge ${ide.cor}">
        <span class="ide-num">${ide.pct}%</span>
        <span class="ide-label">IDE ${ide.nivel}</span>
      </div>
      <p class="hint">Elaborado com base nas suas respostas · ${new Date().toLocaleDateString("pt-BR")}</p>
    </div>

    <div class="etapa">
      <h3>Antes de tudo</h3>
      <p>${nome}, li com atenção tudo o que você respondeu. E quero começar por uma coisa que talvez
      ninguém tenha te dito: <strong>o que você vive não é falta de capacidade, nem falta de esforço.</strong>
      É um problema de estrutura. E tem solução.</p>
    </div>

    <div class="etapa">
      <h3>O seu cenário hoje</h3>
      <p>Pelo que você me contou, o que mais consome o seu tempo é <strong>${problema}</strong>. Você
      convive com essa dependência há <strong>${tempo}</strong>, e, se ficasse 15 dias totalmente fora,
      o resultado seria <strong>${implicacao}</strong>. Esse é o retrato clássico do dono próspero preso
      à operação: a empresa cresceu, mas a dependência do dono cresceu junto. O seu IDE deu
      <strong>${ide.nivel.toLowerCase()}</strong> (${ide.pct}%), e é exatamente isso que ele mede.</p>
    </div>

    <div class="etapa">
      <h3>Por que não resolveu até agora</h3>
      <p>Você já chegou a <strong>${tentativa}</strong> e mesmo assim continua no centro de tudo. Faz
      sentido: contratar pessoas, comprar uma ferramenta ou fazer mais um curso não reduz a dependência
      enquanto o conhecimento, as decisões e as cobranças continuarem concentrados em você.
      <strong>Não é falta de disciplina sua; é a causa que não foi endereçada.</strong></p>
    </div>

    <div class="etapa">
      <h3>Dois caminhos lado a lado</h3>
      <div class="compare">
        <div class="col bad">
          <h4>Continuar sendo o gargalo</h4>
          <ul><li>Você decide quase tudo</li><li>Agenda no improviso</li><li>Apaga incêndios</li><li>A empresa não anda sem você</li></ul>
        </div>
        <div class="col good">
          <h4>Governar a empresa (como fazemos aqui)</h4>
          <ul><li>A equipe decide com critério</li><li>Rotina por indicadores</li><li>Reuniões de resultado</li><li>Você lidera, não executa</li></ul>
        </div>
      </div>
    </div>

    ${ctaInline}

    <div class="etapa">
      <h3>Como o Método Potência Empresarial trabalha</h3>
      <p>Um acompanhamento individual e estruturado para tirar a empresa das suas costas, em cinco pilares:</p>
      <ol class="metodo">
        <li><strong>Diagnosticar:</strong> entender a real situação do negócio e medir a dependência com o IDE e a CLO (Calculadora de Liberdade Operacional).</li>
        <li><strong>Organizar:</strong> estruturar pessoas, processos e informações.</li>
        <li><strong>Delegar:</strong> transferir responsabilidades com clareza e confiança.</li>
        <li><strong>Automatizar:</strong> criar cadências e sistemas que fazem o trabalho acontecer.</li>
        <li><strong>Governar:</strong> acompanhar, decidir e direcionar com base em dados.</li>
      </ol>
      <p class="hint">O foco é na metodologia, não em prazo rígido: medir, reduzir e sustentar a redução da dependência.</p>
    </div>

    <div class="etapa">
      <h3>O que precisa acontecer agora</h3>
      <p>O caminho começa por uma <strong>Sessão Estratégica</strong>: um mapeamento do seu cenário e dos
      pontos onde a empresa mais depende de você, com a definição de um plano individual. Você sai dela
      com clareza do que está acontecendo. O que você deseja, <strong>${objetivo}</strong>, é totalmente
      possível. Não começa pela empresa, começa por você.</p>
    </div>

    ${ctaInline}

    <div class="etapa">
      <h3>Quem é o Felipe</h3>
      <p>Empresário, estrategista e mentor. Construiu empresas do zero, faturou
      <strong>mais de 100 milhões no primeiro ano</strong> de operação e viveu na pele o desafio de
      depender de si mesmo para tudo funcionar. Foi isso que o levou a criar o Método Potência
      Empresarial e o Programa Governo Empresarial.</p>
      <div class="cred-grid">
        <div class="cred"><div class="n">+R$ 100 mi</div><div class="d">faturados no primeiro ano com a XGrow</div></div>
        <div class="cred"><div class="n">+2.800</div><div class="d">players e empresas aceleradas no digital</div></div>
        <div class="cred"><div class="n">+15 anos</div><div class="d">em negócios, tecnologia e educação</div></div>
        <div class="cred"><div class="n">6 empresas</div><div class="d">fundadas e construídas do zero</div></div>
        <div class="cred full"><div class="n">Autor de "Líderes Não Nascem Prontos"</div><div class="d">o livro sobre formar líderes que assumem a empresa</div></div>
      </div>
      <p class="hint" style="margin-top:14px">Ecossistema de empresas que ele construiu:</p>
      <div class="eco">
        <span class="eco-chip"><b>XGROW</b> · plataforma de infoprodutos</span>
        <span class="eco-chip"><b>EVENTX</b> · ticketeira inteligente</span>
        <span class="eco-chip"><b>D360</b> · dashboard 360°</span>
        <span class="eco-chip"><b>ADVAI</b> · inteligência jurídica</span>
        <span class="eco-chip"><b>E3T</b> · educação e tecnologia</span>
        <span class="eco-chip"><b>NeuroVerse</b> · IA estratégica</span>
      </div>
    </div>

    <div class="cta-box">
      <h2 style="margin-top:0">O próximo passo, ${nome}</h2>
      <p>Dar o primeiro passo é simples, e no seu tempo.</p>
      ${ctaExtra}
      <div class="actions" style="justify-content:center">
        <button class="btn btn-primary cta-wpp">${ctaLabel}</button>
      </div>
      ${clube}
    </div>`;
}

/* ---------- WhatsApp (CTAs distribuídos) ---------- */
function abrirWhatsApp() {
  const nome = (a.nomeResp || "").split(" ")[0] || "";
  const msg = (F.marca.whatsappMsg || "").replace("{nome}", nome);
  const url = `https://wa.me/${F.marca.whatsapp}?text=${encodeURIComponent(msg)}`;
  window.open(url, "_blank", "noopener");
}
// qualquer CTA com a classe .cta-wpp (distribuídos pela página) abre o WhatsApp
document.addEventListener("click", (e) => {
  if (e.target.closest && e.target.closest(".cta-wpp")) abrirWhatsApp();
});
