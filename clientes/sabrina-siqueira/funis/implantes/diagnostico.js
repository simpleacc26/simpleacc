/* ============================================================
   DIAGNÓSTICO (Implantes) — monta a orientação a partir das
   respostas do quiz (sessionStorage) e habilita WhatsApp + PDF.
   ============================================================ */
const F = window.FLOW;
const STORE_KEY = (F.config && F.config.storeKey) || "siqueira_funil_implantes";
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
    <p class="eyebrow">Orientação</p>
    <h2>Ainda não temos suas respostas</h2>
    <p class="lead">Parece que você chegou aqui sem fazer o teste. Leva ~2 minutos.</p>
    <div class="actions"><a class="btn btn-primary btn-block" href="/">Fazer o teste agora</a></div>`;
} else {
  const nome = esc((a.nomeResp || "").split(" ")[0]) || "tudo bem";
  const problema = frase("problema") || "o seu sorriso";
  const implicacao = frase("implicacao") || "afetar o seu dia a dia";
  const tentativa = frase("necessidade") || "buscar uma solução";
  const objetivo = frase("objetivo") || "voltar a sorrir com segurança";
  const orientacao = frase("situacao") || "uma avaliação para definir a melhor solução";
  const foraDeArea = valor("qualificacao") === "outra";

  report.innerHTML = `
    <div class="report-head">
      <span class="selo">Orientação personalizada</span>
      <h1>O caminho de volta ao seu sorriso</h1>
      <p class="hint">Elaborada com base nas suas respostas · ${new Date().toLocaleDateString("pt-BR")}</p>
    </div>

    <div class="etapa">
      <h3>Antes de tudo</h3>
      <p>Olá, ${nome}! Aqui é da equipe do Instituto Sabrina Siqueira. 💛 Li com atenção tudo o
      que você respondeu, e já tenho uma orientação inicial sobre o seu caso. Quero começar com
      uma coisa: <strong>dar o primeiro passo é mais simples (e menos assustador) do que parece.</strong></p>
    </div>

    <div class="etapa">
      <h3>O seu cenário hoje</h3>
      <p>Pelo que você me contou, o que mais te incomoda hoje é <strong>${problema}</strong>.
      E isso vem custando caro: ${implicacao}. Você já chegou a ${tentativa}, e mesmo assim
      não resolveu. Faz todo sentido você estar buscando uma solução agora.</p>
    </div>

    <div class="etapa">
      <h3>Por que tanta gente trava nessa hora</h3>
      <p>O que segura a maioria das pessoas <em>não é o dinheiro</em>: é o medo. Medo de dor, de
      não dar certo, de cair num lugar que trata sorriso como linha de produção, faz orçamento no
      susto e some depois. Reabilitação séria é o oposto disso: <strong>começa com avaliação e
      planejamento, não com a furadeira.</strong></p>
    </div>

    <div class="etapa">
      <h3>Dois caminhos lado a lado</h3>
      <div class="compare">
        <div class="col bad">
          <h4>Fábrica de sorriso</h4>
          <ul><li>Orçamento no susto</li><li>Procedimento apressado</li><li>Zero acompanhamento</li><li>Um problema que volta</li></ul>
        </div>
        <div class="col good">
          <h4>Com planejamento (como fazemos aqui)</h4>
          <ul><li>Avaliação real do seu caso</li><li>Plano com etapas e condições</li><li>Acompanhamento do começo ao fim</li><li>Um sorriso que dura</li></ul>
        </div>
      </div>
    </div>

    <div class="etapa">
      <h3>O que o seu caso pede</h3>
      <p>Pelo que você descreveu, o caminho mais indicado tende a ser <strong>${orientacao}</strong>.
      Mas a definição correta (e qualquer valor ou plano) depende de uma <strong>avaliação
      presencial</strong>: dar um número sem te examinar seria irresponsável. O que você deseja,
      <strong>${objetivo}</strong>, é totalmente possível, e começa com esse primeiro passo.</p>
    </div>

    <div class="etapa">
      <h3>Quem já viveu isso</h3>
      <div class="depo">[ANTES E DEPOIS 1]: inserir foto/vídeo de um paciente que voltou a sorrir nas fotos.</div>
      <div class="depo">[DEPOIMENTO 2]: inserir caso de quem trocou a prótese que machucava por algo fixo.</div>
      <p class="hint">Reabilitação bem feita não devolve só dente. Devolve a pessoa.</p>
    </div>

    <div class="cta-box">
      <h2 style="margin-top:0">O próximo passo é simples, ${nome}</h2>
      <p>Uma avaliação para entender o seu caso e te mostrar o caminho e as condições, sem
      compromisso de fechar nada na hora.</p>
      ${foraDeArea ? '<p class="hint">Vi que você fica um pouco mais longe, mas me chama mesmo assim que a gente vê o que é possível, tá?</p>' : ""}
      <div class="actions" style="justify-content:center">
        <button class="btn btn-primary" id="whatsapp-2">Quero agendar minha avaliação</button>
      </div>
      <p class="clube">Você já adiou tempo demais. O primeiro passo é só uma avaliação.</p>
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
document.addEventListener("click", (e) => { if (e.target && e.target.id === "whatsapp-2") abrirWhatsApp(); });
