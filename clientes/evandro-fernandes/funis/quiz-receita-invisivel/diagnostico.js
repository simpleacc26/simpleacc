/* ============================================================
   DIAGNÓSTICO · monta o relatório a partir das respostas do quiz
   (sessionStorage) e habilita "Baixar PDF" + WhatsApp.
   ============================================================ */
const STORE_KEY = "evandro_receita_invisivel";
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
    <p class="eyebrow">Diagnóstico</p>
    <h2>Ainda não temos suas respostas</h2>
    <p class="lead">Parece que você chegou aqui sem fazer o diagnóstico. Leva ~2 minutos.</p>
    <div class="actions"><a class="btn btn-primary btn-block" href="index.html">Fazer o diagnóstico agora</a></div>`;
} else {
  const nome = esc((a.nomeResp || "").split(" ")[0]) || "tudo bem";
  const situacao = frase("situacao") || "os dados espalhados entre as áreas";
  const problema = frase("problema") || "a receita que escapa no meio do caminho";
  const implicacao = frase("implicacao") || "seguir investindo mais para o mesmo resultado";
  const tentativa = frase("necessidade") || "buscar uma solução";
  const objetivo = frase("objetivo") || "crescer com previsibilidade";
  const nutrir = ["ate-100", "100-300"].includes(valor("qualificacao"));

  report.innerHTML = `
    <div class="report-head">
      <span class="selo">Diagnóstico de Receita Invisível</span>
      <h1>Onde a receita da sua empresa está escapando</h1>
      <p class="hint">Elaborado com base nas suas respostas · ${new Date().toLocaleDateString("pt-BR")}</p>
    </div>

    <div class="etapa">
      <h3>Antes de tudo</h3>
      <p>Oi, ${nome}! Aqui é da equipe do Evandro Fernandes. Li com atenção o que você respondeu.
      E quero começar por uma boa notícia: <strong>o dinheiro que falta na sua empresa não sumiu.
      Ele vaza, e o que vaza dá para recuperar.</strong></p>
    </div>

    <div class="etapa">
      <h3>O seu cenário hoje</h3>
      <p>Pelo que você contou, hoje a situação é <strong>${situacao}</strong>, e o que mais trava o
      seu resultado é <strong>${problema}</strong>. Você já chegou a ${tentativa}, e mesmo assim a
      receita continua escapando. Se nada mudar, o caminho provável é ${implicacao}. Esse padrão se
      repete em quase toda empresa digital que cresceu rápido. E ele tem uma explicação.</p>
    </div>

    <div class="etapa">
      <h3>Por que não resolveu até agora</h3>
      <p>Existe uma diferença entre <em>gerar mais lead</em> e <em>gerir a evasão nos 3 funis</em>. A
      maioria trata Marketing, Comercial e CS como ilhas separadas, cada um com o próprio número. Só
      que o comportamento do lead não respeita essa divisão: ele clica, conversa, compra e reclama, e
      cada pedaço fica preso numa ilha. Ninguém vê o todo, então ninguém age a tempo. O problema nunca
      foi o seu tráfego. Foi a Receita Invisível, a receita que já entrou e escapa entre os funis.</p>
    </div>

    <div class="etapa">
      <h3>Dois caminhos lado a lado</h3>
      <div class="compare">
        <div class="col bad">
          <h4>Sem gestão da evasão</h4>
          <ul><li>Dados em ilhas</li><li>Mais verba no tráfego</li><li>Lead que some sem rastro</li><li>Receita escapando todo mês</li></ul>
        </div>
        <div class="col good">
          <h4>Com o método HDM</h4>
          <ul><li>Os 3 funis como um organismo</li><li>Comportamento real lido (Endognose)</li><li>Cada lead rastreado até o fim</li><li>Receita recuperada em R$</li></ul>
        </div>
      </div>
    </div>

    <div class="etapa">
      <h3>O que precisa acontecer na sua empresa</h3>
      <p>O caminho começa por um <strong>Diagnóstico 360°</strong>: a Endognose lê o comportamento real
      do seu lead e calcula, em R$, quanto está vazando nos 3 funis. A partir daí, os funis são
      desenhados como um organismo único e a recuperação é implementada com a sua equipe. O que você
      quer, <strong>${objetivo}</strong>, é totalmente possível, e sem precisar aumentar o tráfego.</p>
    </div>

    <div class="etapa">
      <h3>Quem já viveu isso</h3>
      <div class="depo">[DEPOIMENTO 1]: inserir o case JusExpert (mais de R$ 30 milhões de receita gerada com a gestão da Receita Invisível nos 3 funis).</div>
      <div class="depo">[DEPOIMENTO 2]: inserir print/vídeo de um cliente que reduziu o custo por lead e recuperou receita sem aumentar a mídia.</div>
      <p class="hint">O que essas histórias têm em comum: não compraram mais tráfego. Passaram a gerir a evasão.</p>
    </div>

    <div class="cta-box">
      <h2 style="margin-top:0">O próximo passo, ${nome}</h2>
      ${nutrir
        ? `<p>Pelo momento do seu negócio, o caminho mais inteligente agora é começar pela plataforma
           HDM e organizar seus dados, para depois escalar. Me chama no WhatsApp que a equipe te mostra
           por onde iniciar.</p>`
        : `<p>Agendar uma <strong>sessão estratégica gratuita</strong> com o Evandro: um diagnóstico do
           seu momento e o desenho do próximo passo para recuperar a sua Receita Invisível. Sem
           compromisso e sem enrolação.</p>`}
      <div class="actions" style="justify-content:center">
        <button class="btn btn-primary" id="whatsapp-2">${nutrir ? "Falar com a equipe no WhatsApp" : "Quero minha sessão estratégica"}</button>
      </div>
      <p class="clube">As agendas da semana são limitadas pelo próprio Evandro, no máximo 2 sessões por dia.</p>
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
