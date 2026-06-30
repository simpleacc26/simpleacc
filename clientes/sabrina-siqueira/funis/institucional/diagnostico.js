/* ============================================================
   DIAGNÓSTICO — monta o relatório a partir das respostas do quiz
   (sessionStorage) e habilita "Baixar PDF" + WhatsApp.
   ============================================================ */
const STORE_KEY = "siqueira_funil_inclusao";
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
    <p class="lead">Parece que você chegou aqui sem fazer o teste. Leva ~2 minutos.</p>
    <div class="actions"><a class="btn btn-primary btn-block" href="index.html">Fazer o teste agora</a></div>`;
} else {
  const nome = esc((a.nomeResp || "").split(" ")[0]) || "tudo bem";
  const criancaRaw = (a.crianca || "").trim();
  const crianca = esc(criancaRaw ? criancaRaw.split(",")[0].trim() : "seu filho");
  const problema = frase("problema") || "as consultas odontológicas";
  const implicacao = frase("implicacao") || "a saúde bucal ficar em segundo plano";
  const tentativa = frase("necessidade") || "buscar uma solução";
  const objetivo = frase("objetivo") || "uma relação tranquila com o dentista";
  const foraDeArea = valor("qualificacao") === "outra";

  report.innerHTML = `
    <div class="report-head">
      <span class="selo">Diagnóstico personalizado</span>
      <h1>O caminho do sorriso ${criancaRaw ? "de " + crianca : "do seu filho"}</h1>
      <p class="hint">Elaborado com base nas suas respostas · ${new Date().toLocaleDateString("pt-BR")}</p>
    </div>

    <div class="etapa">
      <h3>Antes de tudo</h3>
      <p>Oi, ${nome}! Aqui é da equipe da Dra. Sabrina. 💛 Li com atenção tudo o que você
      respondeu sobre ${crianca}. E quero começar com uma coisa que talvez ninguém tenha te dito:
      <strong>o que vocês viveram nas consultas até aqui não foi culpa sua, nem dele.</strong></p>
    </div>

    <div class="etapa">
      <h3>O seu cenário hoje</h3>
      <p>Pelo que você me contou, a maior dificuldade tem sido <strong>${problema}</strong>.
      E isso vem custando caro: ${implicacao}. Você já chegou a ${tentativa}, e mesmo assim
      não resolveu. Esse padrão se repete em quase todas as famílias que chegam até a gente.
      E ele tem uma explicação.</p>
    </div>

    <div class="etapa">
      <h3>Por que não resolveu até agora</h3>
      <p>Existe uma diferença entre um <em>bom dentista</em> e um <em>dentista que sabe manejo</em>.
      A maioria é excelente tecnicamente, mas nunca estudou o comportamento da criança
      neurodivergente. Sem manejo, a única ferramenta que sobra é a contenção. E é aí que a
      consulta vira trauma. O problema nunca foi a capacidade técnica de quem atendeu ${crianca}.
      Foi a ausência de manejo.</p>
    </div>

    <div class="etapa">
      <h3>Dois caminhos lado a lado</h3>
      <div class="compare">
        <div class="col bad">
          <h4>Sem manejo</h4>
          <ul><li>Ambiente que desregula</li><li>Pressa</li><li>Contenção como saída</li><li>A criança sai pior do que entrou</li></ul>
        </div>
        <div class="col good">
          <h4>Com manejo (como fazemos aqui)</h4>
          <ul><li>Ambiente preparado</li><li>Tempo respeitado</li><li>Vínculo antes do procedimento</li><li>A criança colabora porque se sente segura</li></ul>
        </div>
      </div>
    </div>

    <div class="etapa">
      <h3>O que precisa acontecer com ${crianca}</h3>
      <p>O caminho começa do jeito certo: uma <strong>primeira consulta de vínculo</strong>, sem
      pressa de procedimento, construindo segurança no tempo dele. A partir daí, cada consulta
      fica melhor que a anterior. O que você deseja, <strong>${objetivo}</strong>, é totalmente
      possível. A gente faz isso todos os dias.</p>
    </div>

    <div class="etapa">
      <h3>Quem já viveu isso</h3>
      <div class="depo">[DEPOIMENTO 1]: inserir vídeo/print de uma família: criança que antes precisava ser contida e hoje entra sozinha na cadeira.</div>
      <div class="depo">[DEPOIMENTO 2]: inserir caso de família que viajava sem achar atendimento e encontrou referência na região.</div>
      <p class="hint">O que essas histórias têm em comum: não mudou a criança. Mudou o atendimento.</p>
    </div>

    <div class="cta-box">
      <h2 style="margin-top:0">O próximo passo é simples, ${nome}</h2>
      <p>Agendar a avaliação de ${crianca} com a Dra. Sabrina. Sem contenção como primeira opção. No tempo dele.</p>
      ${foraDeArea ? '<p class="hint">Vi que vocês ficam um pouco mais longe, mas me chama mesmo assim que a gente vê o que é possível, tá?</p>' : ""}
      <div class="actions" style="justify-content:center">
        <button class="btn btn-primary" id="whatsapp-2">Quero agendar a avaliação</button>
      </div>
      <p class="clube">E se fizer sentido pra rotina de vocês, te apresento o <strong>Clubinho do Sorriso</strong>, nosso acompanhamento contínuo pensado pra famílias como a sua.</p>
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
