/* ============================================================
   DIAGNÓSTICO — monta a leitura de imagem a partir das respostas
   do quiz (sessionStorage) e habilita "Baixar PDF" + WhatsApp.
   Copy da estratégia aprovada. Sem travessão.
   ============================================================ */
const STORE_KEY = "stella_funil_imagem";
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

if (!a._completedAt && !a.problema) {
  report.innerHTML = `
    <p class="eyebrow">Leitura de imagem</p>
    <h2>Ainda não temos suas respostas</h2>
    <p class="lead">Parece que você chegou aqui sem fazer o teste. Leva ~2 minutos.</p>
    <div class="actions"><a class="btn btn-primary btn-block" href="index.html">Fazer o teste agora</a></div>`;
} else {
  const nome = esc((a.nomeResp || "").split(" ")[0]) || "tudo bem";
  const problema = frase("problema") || "o que mais te incomoda na imagem";
  const implicacao = frase("implicacao") || "passar menos autoridade do que você tem";
  const custo = frase("custo") || "continuar sendo subestimada pela sua imagem";
  const tentativa = frase("tentativas") || "buscar uma solução";
  const objetivo = frase("objetivo") || "uma imagem que comunique a sua autoridade";
  const frio = ["esperar", "pesquisando"].includes(valor("qualificacao"));

  // recomendação inicial conforme o objetivo escolhido
  const RECO = {
    autoridade: "cor, forma e composições que constroem presença e autoridade",
    praticidade: "um guarda-roupa cápsula e combinações práticas para o dia a dia",
    criterio: "os critérios de compra e de combinação, para você escolher sozinha",
    presenca: "uma estratégia de imagem por ocasião, para reuniões e eventos",
  };
  const reco = RECO[valor("objetivo")] || "o alinhamento entre a sua imagem e o seu objetivo";

  report.innerHTML = `
    <div class="report-head">
      <span class="selo">Leitura personalizada</span>
      <h1>A sua imagem e a sua autoridade${nome && nome !== "tudo bem" ? ", " + nome : ""}</h1>
      <p class="hint">Elaborada com base nas suas respostas · ${new Date().toLocaleDateString("pt-BR")}</p>
    </div>

    <div class="etapa">
      <h3>Antes de tudo</h3>
      <p>Oi, ${nome}! Aqui é da Stella. Obrigada por esses minutos olhando pra sua imagem com
      atenção. Pelo que você respondeu, o que mais te incomoda hoje é <strong>${problema}</strong>.
      Isso é mais comum do que parece entre profissionais como você, e tem solução.</p>
    </div>

    <div class="etapa">
      <h3>O seu cenário hoje</h3>
      <p>Na sua vida profissional, isso aparece como <strong>${implicacao}</strong>. Quando a
      imagem não é pensada com estratégia, ela fala por conta própria, e nem sempre o que ela diz
      combina com a sua competência.</p>
    </div>

    <div class="etapa">
      <h3>Por que não resolveu até agora</h3>
      <p>Você já chegou a <strong>${tentativa}</strong>. Faz sentido não ter resolvido: dica de
      moda foca na peça e na tendência, não no critério. Sem entender o que cada escolha comunica,
      a gente compra mais e continua no mesmo lugar. Não é falta de bom gosto, é falta de
      estratégia.</p>
    </div>

    <div class="etapa">
      <h3>Dois caminhos lado a lado</h3>
      <div class="compare">
        <div class="col bad">
          <h4>Sem estratégia</h4>
          <ul><li>Guarda-roupa cheio</li><li>Decisões no escuro</li><li>Compra por impulso</li><li>Ser vista abaixo do que você é</li></ul>
        </div>
        <div class="col good">
          <h4>Com estratégia de imagem</h4>
          <ul><li>Escolhas com critério</li><li>Autonomia para se vestir</li><li>Menos compra, mais uso</li><li>Autoridade reforçada antes de você falar</li></ul>
        </div>
      </div>
    </div>

    <div class="etapa">
      <h3>O custo de continuar</h3>
      <p>O que custa caro não é investir na sua imagem. É <strong>${custo}</strong>, perdendo
      espaço para quem se posiciona melhor. O tempo passa do mesmo jeito. A diferença é como você
      será vista no fim dele.</p>
    </div>

    <div class="etapa">
      <h3>O que precisa acontecer agora</h3>
      <p>Pelo seu objetivo, o foco da sua estratégia começaria por <strong>${reco}</strong>. O que
      você deseja, <strong>${objetivo}</strong>, é totalmente possível com um processo estruturado
      de imagem: mapear o seu estilo, entender a psicologia por trás das escolhas e te dar o
      critério para decidir sozinha, para sempre.</p>
    </div>

    <div class="etapa">
      <h3>Quem já viveu isso</h3>
      <div class="depo">[DEPOIMENTO 1]: inserir print/vídeo de cliente com antes e depois de imagem e de percepção profissional.</div>
      <div class="depo">[DEPOIMENTO 2]: inserir caso de cliente que ganhou segurança em reuniões e eventos.</div>
      <p class="hint">O que essas histórias têm em comum: não mudou a competência. Mudou a estratégia da imagem.</p>
    </div>

    <div class="cta-box">
      <h2 style="margin-top:0">O próximo passo é simples${nome && nome !== "tudo bem" ? ", " + nome : ""}</h2>
      <p>Uma <strong>avaliação estratégica</strong> com a Stella: uma conversa individual, online,
      em que ela entende o seu momento e te mostra o caminho. Sem compromisso.</p>
      ${frio ? '<p class="hint">Sem pressa. Fica o convite para quando fizer sentido pra você.</p>' : ""}
      <div class="actions" style="justify-content:center">
        <button class="btn btn-primary" id="whatsapp-2">Quero agendar minha avaliação</button>
      </div>
      <p class="clube">Este resultado é uma leitura inicial baseada nas suas respostas. A avaliação estratégica é o passo que aprofunda o seu caso.</p>
    </div>`;
}

/* ---------- WhatsApp + PDF ---------- */
function abrirWhatsApp() {
  const nome = (a.nomeResp || "").split(" ")[0] || "";
  const msg = (F.marca.whatsappMsg || "").replace("{nome}", nome);
  const url = `https://wa.me/${F.marca.whatsapp}?text=${encodeURIComponent(msg)}`;
  window.open(url, "_blank", "noopener");
}
document.getElementById("whatsapp")?.addEventListener("click", abrirWhatsApp);
document.getElementById("pdf")?.addEventListener("click", () => window.print());
document.addEventListener("click", (e) => { if (e.target && e.target.id === "whatsapp-2") abrirWhatsApp(); });
