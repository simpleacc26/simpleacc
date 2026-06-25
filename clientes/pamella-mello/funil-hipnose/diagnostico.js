/* ============================================================
   DIAGNÓSTICO — monta a leitura emocional a partir das respostas
   do quiz (sessionStorage) e habilita o CTA de WhatsApp.
   ============================================================ */
const STORE_KEY = "pamella_funil_hipnose";
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
    <p class="eyebrow">Leitura emocional</p>
    <h2>Ainda não temos suas respostas</h2>
    <p class="lead">Parece que você chegou aqui sem fazer a leitura. Leva ~2 minutos.</p>
    <div class="actions"><a class="btn btn-primary btn-block" href="index.html">Fazer agora</a></div>`;
} else {
  const nome = esc((a.nomeResp || "").split(" ")[0]) || "tudo bem";
  const situacao = frase("situacao") || "o seu momento atual";
  const problema = frase("problema") || "o que mais te pesa hoje";
  const tempo = frase("tempo") || "um tempo";
  const impacto = frase("impacto") || "o que importa pra você";
  const tentativa = frase("necessidade") || "buscar uma solução";
  const objetivo = frase("objetivo") || "uma vida mais leve";

  const foraDeArea = valor("geografia") === "fora";
  const online = valor("geografia") !== "bh";
  const prontidaoVal = valor("prontidao");
  const nutrir = prontidaoVal === "pontual" || prontidaoVal === "pesquisando";
  const modalidade = valor("geografia") === "bh" ? "presencial em Contagem/BH" : "online";

  // CTA adaptado ao nível de qualificação
  let ctaLabel, ctaExtra, clube;
  if (foraDeArea) {
    ctaLabel = "Falar com a equipe da clínica";
    ctaExtra = '<p class="hint">O atendimento é presencial em Contagem/BH e online para todo o Brasil. Me chama que a gente vê o que é possível pra você. 💜</p>';
    clube = "";
  } else if (nutrir) {
    ctaLabel = "Quero entender melhor como funciona";
    ctaExtra = "<p class=\"hint\">Sem compromisso. A equipe te explica o método e tira suas dúvidas no seu tempo.</p>";
    clube = '<p class="clube">Quando fizer sentido pra você, o primeiro passo é a <strong>Sessão de Avaliação</strong> — um mapeamento do seu cenário, sem compromisso de seguir.</p>';
  } else {
    ctaLabel = "Quero agendar minha Sessão de Avaliação";
    ctaExtra = `<p class="hint">Atendimento ${modalidade}, individual e confidencial. A avaliação já te entrega clareza — decida ou não seguir.</p>`;
    clube = '<p class="clube">A partir da avaliação, conduzimos o <strong>protocolo terapêutico individual</strong>, pensado pro seu caso.</p>';
  }

  report.innerHTML = `
    <div class="report-head">
      <span class="selo">Leitura personalizada</span>
      <h1>Sua leitura emocional</h1>
      <p class="hint">Elaborada com base nas suas respostas · ${new Date().toLocaleDateString("pt-BR")}</p>
    </div>

    <div class="etapa">
      <h3>Antes de tudo</h3>
      <p>Oi, ${nome}! Aqui é da equipe da Pâmella. 💜 Li com atenção tudo o que você
      respondeu. E quero começar com uma coisa que talvez ninguém tenha te dito:
      <strong>o que você vive não é falta de esforço, nem "frescura".</strong> Tem uma explicação —
      e tem caminho.</p>
    </div>

    <div class="etapa">
      <h3>O seu cenário hoje</h3>
      <p>Pelo que você me contou, o seu momento é de <strong>${situacao}</strong>, e o que mais
      pesa é <strong>${problema}</strong>. Você convive com isso há <strong>${tempo}</strong>,
      e isso já vem custando caro em <strong>${impacto}</strong>. Esse padrão se repete em quase
      todas as pessoas que chegam até a gente. E ele tem uma explicação.</p>
    </div>

    <div class="etapa">
      <h3>Por que não resolveu até agora</h3>
      <p>Você já chegou a <strong>${tentativa}</strong>, e mesmo assim o padrão voltou. Faz
      sentido: a maioria das abordagens trabalha o que você <em>sente hoje</em>. O alívio vem — e
      por isso parece estar funcionando. Mas a origem emocional, os gatilhos e memórias guardados
      no inconsciente, continua intacta. <strong>Não é recaída sua; é a causa que não foi acessada.</strong></p>
    </div>

    <div class="etapa">
      <h3>Dois caminhos lado a lado</h3>
      <div class="compare">
        <div class="col bad">
          <h4>Continuar tratando o sintoma</h4>
          <ul><li>Alívios temporários</li><li>Recomeços</li><li>A sensação de andar em círculos</li><li>O padrão volta meses depois</li></ul>
        </div>
        <div class="col good">
          <h4>Tratar a causa (como fazemos aqui)</h4>
          <ul><li>Acessa a origem emocional</li><li>Ressignifica e reprograma o padrão</li><li>Processo com começo, meio e fim</li><li>Para não precisar voltar</li></ul>
        </div>
      </div>
    </div>

    <div class="etapa">
      <h3>Como o método trabalha</h3>
      <p>Hipnoterapia clínica + neurociência, num acompanhamento individual e estruturado, em
      quatro etapas:</p>
      <ol class="metodo">
        <li><strong>Investigação da origem</strong> — os gatilhos, memórias e crenças que sustentam o padrão.</li>
        <li><strong>Consciência</strong> — enxergar com clareza o que operava no automático.</li>
        <li><strong>Ressignificação</strong> — reorganizar as experiências que alimentam o sofrimento.</li>
        <li><strong>Reprogramação emocional</strong> — novas respostas, de forma sustentável.</li>
      </ol>
    </div>

    <div class="etapa">
      <h3>O que precisa acontecer agora</h3>
      <p>O caminho começa por uma <strong>Sessão de Avaliação</strong>: um mapeamento completo do
      seu histórico e dos seus padrões, com a definição de um plano individual. Você sai dela
      entendendo exatamente o que está acontecendo. O que você deseja — <strong>${objetivo}</strong> —
      é totalmente possível. A gente faz isso todos os dias.</p>
    </div>

    <div class="etapa">
      <h3>Quem já viveu isso</h3>
      <div class="depo">[DEPOIMENTO 1]: inserir vídeo/print de paciente que tentou terapia por anos e teve resultado rápido com o método.</div>
      <div class="depo">[DEPOIMENTO 2]: inserir relato de transformação emocional (antes e depois).</div>
      <p class="hint">O que essas histórias têm em comum: a pessoa parou de tratar o sintoma e foi na causa.</p>
    </div>

    <div class="cta-box">
      <h2 style="margin-top:0">O próximo passo, ${nome}</h2>
      <p>Dar o primeiro passo é simples — e no seu tempo.</p>
      ${ctaExtra}
      <div class="actions" style="justify-content:center">
        <button class="btn btn-primary" id="whatsapp-2">${ctaLabel}</button>
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
document.getElementById("whatsapp")?.addEventListener("click", abrirWhatsApp);
document.addEventListener("click", (e) => { if (e.target && e.target.id === "whatsapp-2") abrirWhatsApp(); });
