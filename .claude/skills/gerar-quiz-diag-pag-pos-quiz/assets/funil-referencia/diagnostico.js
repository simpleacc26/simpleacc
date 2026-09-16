/* ============================================================
   DIAGNÓSTICO. Monta o diagnóstico da clínica a partir das
   respostas do quiz (sessionStorage) e habilita o CTA de WhatsApp.
   Estrutura espelhada no funil de quiz validado da Simple Acc.
   Padrão de escrita: nunca usar travessões (traço longo).
   ============================================================ */
const STORE_KEY = "funil_quiz_cliente";
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
    <p class="eyebrow">Diagnóstico da clínica</p>
    <h2>Ainda não temos suas respostas</h2>
    <p class="lead">Parece que você chegou aqui sem fazer o diagnóstico. Leva ~2 minutos.</p>
    <div class="actions"><a class="btn btn-primary btn-block" href="index.html">Fazer agora</a></div>`;
} else {
  const nome = esc((a.nomeResp || "").split(" ")[0]) || "tudo bem";
  const situacao = frase("situacao") || "o momento atual da sua clínica";
  const problema = frase("problema") || "o que mais trava o crescimento";
  const tempo = frase("tempo") || "um tempo";
  const impacto = frase("impacto") || "seguir no mesmo ponto";
  const tentativa = frase("necessidade") || "buscar uma solução";
  const objetivo = frase("objetivo") || "crescer com lucro e previsibilidade";

  const fat = valor("faturamento");
  const prontidaoVal = valor("prontidao");
  const nutrir = fat === "ate15" || fat === "15a30" || prontidaoVal === "pontual" || prontidaoVal === "pesquisando";

  // CTA adaptado ao nível de qualificação
  let ctaLabel, ctaExtra, clube;
  if (nutrir) {
    ctaLabel = "Quero entender melhor o próximo passo";
    ctaExtra = '<p class="hint">Sem compromisso. A equipe te explica o caminho e o que faz sentido para o momento da sua clínica.</p>';
    clube = '<p class="clube">Dependendo do seu momento, o começo pode ser destravar o comercial com quem você já tem, antes de escalar. A gente te mostra o caminho certo.</p>';
  } else {
    ctaLabel = "Quero agendar minha Sessão Estratégica";
    ctaExtra = '<p class="hint">Atendimento online para todo o Brasil, individual e confidencial. A sessão já te entrega clareza, decida ou não seguir.</p>';
    clube = '<p class="clube">A partir da sessão, desenhamos o plano da mentoria, pensado para a realidade da sua clínica.</p>';
  }
  // CTA reutilizável, distribuído pela página (o lead clica quando se sentir pronto)
  const ctaInline = `<div class="cta-inline"><button class="btn btn-primary cta-wpp">${ctaLabel}</button></div>`;

  report.innerHTML = `
    <div class="report-head">
      <span class="selo">Diagnóstico personalizado</span>
      <h1>O diagnóstico da sua clínica</h1>
      <p class="hint">Elaborado com base nas suas respostas · ${new Date().toLocaleDateString("pt-BR")}</p>
    </div>

    <div class="etapa">
      <h3>Antes de tudo</h3>
      <p>Oi, ${nome}! Aqui é da equipe do Lucas. Li com atenção tudo o que você respondeu.
      E quero começar por uma coisa que talvez ninguém tenha te dito:
      <strong>o que trava a sua clínica não é falta de esforço, nem falta de competência técnica.</strong>
      Tem uma explicação, e tem caminho.</p>
    </div>

    <div class="etapa">
      <h3>O cenário da sua clínica hoje</h3>
      <p>Pelo que você me contou, o momento é de <strong>${situacao}</strong>, e o que mais
      pesa é <strong>${problema}</strong>. Isso já dura <strong>${tempo}</strong>, e a tendência,
      se nada mudar, é <strong>${impacto}</strong>. Esse padrão se repete em quase todas as clínicas
      que chegam até a gente. E ele tem uma explicação.</p>
    </div>

    <div class="etapa">
      <h3>Por que não destravou até agora</h3>
      <p>Você já chegou a <strong>${tentativa}</strong>, e mesmo assim o crescimento não veio.
      Faz sentido: a maioria das saídas mira em atrair mais paciente ou aperfeiçoar a técnica.
      Só que o gargalo da clínica que atende bem e lucra pouco quase nunca é técnica,
      <strong>é processo comercial.</strong> O paciente elogia, "vai pensar" e some; o orçamento
      vai embora sem follow-up; a agenda tem buraco. Não é falta de esforço seu; é a alavanca que
      ninguém te ensinou a puxar.</p>
    </div>

    <div class="etapa">
      <h3>Dois caminhos lado a lado</h3>
      <div class="compare">
        <div class="col bad">
          <h4>Continuar no modelo atual</h4>
          <ul><li>Trabalhar mais horas</li><li>Mais cadeira, mais plantão</li><li>Crescimento que depende de você</li><li>O teto sempre volta</li></ul>
        </div>
        <div class="col good">
          <h4>Trocar o modelo (como fazemos aqui)</h4>
          <ul><li>Instala processo comercial</li><li>A clínica passa a vender, não só atender</li><li>Dono no estratégico, não no operacional</li><li>Crescimento com previsibilidade</li></ul>
        </div>
      </div>
    </div>

    ${ctaInline}

    <div class="etapa">
      <h3>Como o método trabalha</h3>
      <p>Uma mentoria de evolução empresarial que transforma o dono operacional em líder
      estratégico, em três frentes:</p>
      <ol class="metodo">
        <li><strong>Vendas:</strong> a clínica aprende a vender, no dono ou em quem atende, com processo e não no improviso.</li>
        <li><strong>Produtividade:</strong> gestão do tempo, delegação e priorização para você sair do operacional.</li>
        <li><strong>Autoliderança:</strong> a mentalidade que sustenta cobrar o seu preço e crescer com consistência.</li>
      </ol>
      <p class="hint">É um processo com método e acompanhamento. A clínica que fatura 30 mil está a um processo comercial de dobrar.</p>
    </div>

    <div class="etapa">
      <h3>O que precisa acontecer agora</h3>
      <p>O caminho começa por uma <strong>Sessão Estratégica</strong>: uma leitura completa do
      momento da sua clínica e o desenho do próximo passo mais lucrativo. Você sai dela com clareza
      do que está travando e do que fazer. O que você quer, <strong>${objetivo}</strong>, é
      totalmente possível. A gente faz isso todos os dias.</p>
    </div>

    ${ctaInline}

    <div class="etapa">
      <h3>Quem já viveu isso</h3>
      <p>Donos de clínica e empresários que pararam de só trabalhar mais e foram na causa:</p>
      <!-- Troque pelos prints REAIS do cliente: nomeie 01.webp..N.webp e
           converta para WebP ~520px (funil leve). O primeiro e o case-estrela. -->
      <div class="depo-gallery">
        <img class="depo-shot" src="depoimentos/01.webp" loading="lazy" alt="Depoimento de cliente" />
        <img class="depo-shot" src="depoimentos/02.webp" loading="lazy" alt="Depoimento de cliente" />
        <img class="depo-shot" src="depoimentos/03.webp" loading="lazy" alt="Depoimento de cliente" />
        <img class="depo-shot" src="depoimentos/04.webp" loading="lazy" alt="Depoimento de cliente" />
        <img class="depo-shot" src="depoimentos/05.webp" loading="lazy" alt="Depoimento de cliente" />
        <img class="depo-shot" src="depoimentos/06.webp" loading="lazy" alt="Depoimento de cliente" />
        <img class="depo-shot" src="depoimentos/07.webp" loading="lazy" alt="Depoimento de cliente" />
        <img class="depo-shot" src="depoimentos/08.webp" loading="lazy" alt="Depoimento de cliente" />
        <img class="depo-shot" src="depoimentos/09.webp" loading="lazy" alt="Depoimento de cliente" />
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
  if (e.target.closest && e.target.closest(".cta-wpp")) {
    try { if (typeof fbq === "function") fbq("track", "Contact", { content_name: "CTA WhatsApp diagnostico" }); } catch (err) {}
    abrirWhatsApp();
  }
});
