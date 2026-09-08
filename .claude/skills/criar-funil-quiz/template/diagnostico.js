/* ============================================================
   DIAGNÓSTICO. Monta o relatório personalizado a partir das
   respostas do quiz (sessionStorage) e habilita os CTAs de WhatsApp.

   ESTRUTURA reutilizável (mantenha): qualificação (faturamento/prontidão)
   adapta o CTA; CTAs distribuídos pela página (classe .cta-wpp);
   galeria de depoimentos; bloco final.
   COPY: o texto das seções abaixo é NEUTRO (genérico de negócio).
   Reescreva 100% dele para o nicho do cliente. STORE_KEY deve bater
   com config.storeKey (flow.js).
   Padrão de escrita: nunca usar travessões (traço longo).
   ============================================================ */
const STORE_KEY = "funil_quiz";
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

const a = getState().answers || {};

/* sem respostas? (abriu a página direto) */
if (!a._completedAt && !a.problema) {
  report.innerHTML = `
    <p class="eyebrow">Seu diagnóstico</p>
    <h2>Ainda não temos suas respostas</h2>
    <p class="lead">Parece que você chegou aqui sem fazer o diagnóstico. Leva ~2 minutos.</p>
    <div class="actions"><a class="btn btn-primary btn-block" href="index.html">Fazer agora</a></div>`;
} else {
  const nome = esc((a.nomeResp || "").split(" ")[0]) || "tudo bem";
  const situacao = frase("situacao") || "o momento atual do seu negócio";
  const problema = frase("problema") || "o que mais trava o crescimento";
  const tempo = frase("tempo") || "um tempo";
  const impacto = frase("impacto") || "seguir no mesmo ponto";
  const tentativa = frase("necessidade") || "buscar uma solução";
  const objetivo = frase("objetivo") || "crescer com lucro e previsibilidade";

  // Qualificação por intenção: 2 perguntas-porteira (faturamento + prontidão).
  const fat = valor("faturamento");
  const prontidaoVal = valor("prontidao");
  const nutrir = fat === "ate15" || fat === "15a30" || prontidaoVal === "pontual" || prontidaoVal === "pesquisando";

  // CTA adaptado ao nível de qualificação
  let ctaLabel, ctaExtra, clube;
  if (nutrir) {
    ctaLabel = "Quero entender melhor o próximo passo";
    ctaExtra = '<p class="hint">Sem compromisso. A equipe te explica o caminho e o que faz sentido para o momento do seu negócio.</p>';
    clube = '<p class="clube">Dependendo do seu momento, o começo pode ser destravar o comercial com o que você já tem, antes de escalar. A gente te mostra o caminho certo.</p>';
  } else {
    ctaLabel = "Quero agendar minha conversa estratégica";
    ctaExtra = '<p class="hint">Atendimento individual e confidencial. A conversa já te entrega clareza, decida ou não seguir.</p>';
    clube = '<p class="clube">A partir da conversa, desenhamos o plano, pensado para a realidade do seu negócio.</p>';
  }
  // CTA reutilizável, distribuído pela página (o lead clica quando se sentir pronto)
  const ctaInline = `<div class="cta-inline"><button class="btn btn-primary cta-wpp">${ctaLabel}</button></div>`;

  report.innerHTML = `
    <div class="report-head">
      <span class="selo">Diagnóstico personalizado</span>
      <h1>O seu diagnóstico</h1>
      <p class="hint">Elaborado com base nas suas respostas · ${new Date().toLocaleDateString("pt-BR")}</p>
    </div>

    <div class="etapa">
      <h3>Antes de tudo</h3>
      <p>Oi, ${nome}! Aqui é da nossa equipe. Li com atenção tudo o que você respondeu.
      E quero começar por uma coisa que talvez ninguém tenha te dito:
      <strong>o que trava o seu negócio não é falta de esforço, nem falta de competência técnica.</strong>
      Tem uma explicação, e tem caminho.</p>
    </div>

    <div class="etapa">
      <h3>O seu cenário hoje</h3>
      <p>Pelo que você me contou, o momento é de <strong>${situacao}</strong>, e o que mais
      pesa é <strong>${problema}</strong>. Isso já dura <strong>${tempo}</strong>, e a tendência,
      se nada mudar, é <strong>${impacto}</strong>. Esse padrão se repete em quase todos os negócios
      que chegam até a gente. E ele tem uma explicação.</p>
    </div>

    <div class="etapa">
      <h3>Por que não destravou até agora</h3>
      <p>Você já chegou a <strong>${tentativa}</strong>, e mesmo assim o crescimento não veio.
      Faz sentido: a maioria das saídas mira em atrair mais cliente ou aperfeiçoar a entrega.
      Só que o gargalo de quem atende bem e lucra pouco quase nunca é técnica,
      <strong>é processo comercial.</strong> O cliente elogia, "vai pensar" e some; o orçamento
      vai embora sem follow-up; a agenda tem buraco. Não é falta de esforço seu; é a alavanca que
      ninguém te ensinou a puxar.</p>
    </div>

    <div class="etapa">
      <h3>Dois caminhos lado a lado</h3>
      <div class="compare">
        <div class="col bad">
          <h4>Continuar no modelo atual</h4>
          <ul><li>Trabalhar mais horas</li><li>Mais esforço para o mesmo resultado</li><li>Crescimento que depende de você</li><li>O teto sempre volta</li></ul>
        </div>
        <div class="col good">
          <h4>Trocar o modelo (como fazemos aqui)</h4>
          <ul><li>Instala processo comercial</li><li>O negócio passa a vender, não só atender</li><li>Dono no estratégico, não no operacional</li><li>Crescimento com previsibilidade</li></ul>
        </div>
      </div>
    </div>

    ${ctaInline}

    <div class="etapa">
      <h3>Como funciona</h3>
      <!-- Adapte ao método/processo REAL do cliente (nome e etapas próprios). -->
      <p>Um processo estruturado que transforma esforço em resultado previsível, em três frentes:</p>
      <ol class="metodo">
        <li><strong>Vendas:</strong> o negócio aprende a vender com processo, não no improviso.</li>
        <li><strong>Processos:</strong> organização e delegação para você sair do operacional.</li>
        <li><strong>Gestão:</strong> os indicadores e a rotina que sustentam crescer com consistência.</li>
      </ol>
      <p class="hint">É um processo com método e acompanhamento, com começo, meio e fim.</p>
    </div>

    <div class="etapa">
      <h3>O que precisa acontecer agora</h3>
      <p>O caminho começa por uma <strong>conversa estratégica</strong>: uma leitura completa do
      momento do seu negócio e o desenho do próximo passo mais lucrativo. Você sai dela com clareza
      do que está travando e do que fazer. O que você quer, <strong>${objetivo}</strong>, é
      totalmente possível. A gente faz isso todos os dias.</p>
    </div>

    ${ctaInline}

    <div class="etapa">
      <h3>Quem já viveu isso</h3>
      <p>Pessoas reais que pararam de só trabalhar mais e foram na causa:</p>
      <div class="depo-gallery">
        <!-- DEPOIMENTOS: troque pelos PRINTS REAIS do cliente. Coloque os arquivos em
             ./depoimentos/ nomeados 01.webp, 02.webp, 03.webp... na ordem que quiser exibir.
             Converta cada print para WebP com ~520px de largura (funil leve). Nunca invente
             depoimento. Repita uma linha <img> por print. -->
        <img class="depo-shot" src="depoimentos/01.webp" loading="lazy" alt="Depoimento de cliente" />
        <img class="depo-shot" src="depoimentos/02.webp" loading="lazy" alt="Depoimento de cliente" />
        <img class="depo-shot" src="depoimentos/03.webp" loading="lazy" alt="Depoimento de cliente" />
        <img class="depo-shot" src="depoimentos/04.webp" loading="lazy" alt="Depoimento de cliente" />
      </div>
      <p class="hint">O que essas histórias têm em comum: pararam de só trabalhar mais e instalaram método no negócio.</p>
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

/* ---------- WhatsApp ---------- */
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
