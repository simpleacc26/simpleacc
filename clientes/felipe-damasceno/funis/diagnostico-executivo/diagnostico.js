/* ============================================================
   DIAGNÓSTICO EXECUTIVO (IDE) — monta o relatório a partir das
   respostas do quiz (sessionStorage) e habilita "Baixar PDF" + WhatsApp.
   ============================================================ */
const STORE_KEY = "felipe_diagnostico_executivo";
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
   implicacao, necessidade, perfil). Máximo teórico ~14. */
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
  const implicacao = frase("implicacao") || "a empresa depender de você";
  const tentativa = frase("necessidade") || "buscar uma solução";
  const objetivo = frase("objetivo") || "governar a sua empresa sem ser o gargalo dela";
  const foraDeArea = valor("qualificacao") === "ate-50" || valor("qualificacao") === "50-100";

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
      <h3>Abertura</h3>
      <p>${nome}, o seu IDE deu <strong>${ide.nivel.toLowerCase()}</strong>. Isso significa que, hoje,
      a sua empresa ainda depende de você em um nível ${ide.nivel.toLowerCase()}. Não é um problema de
      capacidade, é um problema de estrutura. E tem solução.</p>
    </div>

    <div class="etapa">
      <h3>O seu cenário hoje</h3>
      <p>Você marcou que o que mais consome o seu tempo é <strong>${problema}</strong>, e que, se
      ficasse 15 dias fora, o resultado seria <strong>${implicacao}</strong>. Esse é o retrato
      clássico do dono próspero preso à operação: a empresa cresceu, mas a dependência do dono
      cresceu junto.</p>
    </div>

    <div class="etapa">
      <h3>Por que não resolveu até agora</h3>
      <p>Você já tentou <strong>${tentativa}</strong> e mesmo assim continua no centro de tudo. Isso
      acontece porque o esforço foi na direção errada: contratar, comprar ferramenta ou fazer curso
      não reduz dependência enquanto o conhecimento, as decisões e as cobranças continuarem
      concentrados em você.</p>
    </div>

    <div class="etapa">
      <h3>Dois cenários lado a lado</h3>
      <div class="compare">
        <div class="col bad">
          <h4>Hoje</h4>
          <ul><li>Você decide quase tudo</li><li>Agenda no improviso</li><li>Apaga incêndios</li><li>Você é o gargalo</li></ul>
        </div>
        <div class="col good">
          <h4>Com governo</h4>
          <ul><li>A equipe decide com critério</li><li>Rotina por indicadores</li><li>Reuniões de resultado</li><li>Você lidera, não executa</li></ul>
        </div>
      </div>
    </div>

    <div class="etapa">
      <h3>O que precisa acontecer com a sua empresa</h3>
      <p>O caminho é o Método Potência Empresarial: mapear o seu tempo e medir o IDE, diagnosticar
      as causas da dependência, transferir o que sai das suas costas para pessoas, processos,
      tecnologia e indicadores, e implantar uma rotina de governo. O que você deseja,
      <strong>${objetivo}</strong>, é totalmente possível. Não começa pela empresa, começa por você.</p>
    </div>

    <div class="etapa">
      <h3>Quem é o Felipe</h3>
      <p>Empresário que construiu operações, sistemas e tecnologias que organizam empresas, e ajudou
      a estruturar uma empresa que faturou mais de 100 milhões no primeiro ano de operação.
      Transformou a própria experiência de sair de operário da própria operação em um método
      replicável e mensurável.</p>
      <div class="depo">[DEPOIMENTO]: inserir vídeo/print de um empresário que reduziu a dependência da empresa em relação a ele.</div>
    </div>

    <div class="cta-box">
      <h2 style="margin-top:0">O próximo passo, ${nome}</h2>
      <p>Uma Sessão Estratégica com o nosso time para desenhar o seu plano de redução de dependência.
      Vagas limitadas por semana.</p>
      ${foraDeArea ? '<p class="hint">Pelo seu faturamento hoje, o melhor primeiro passo pode ser o nosso conteúdo e a plataforma de gestão. Me chama no WhatsApp que eu te mostro por onde começar.</p>' : ""}
      <div class="actions" style="justify-content:center">
        <button class="btn btn-primary" id="whatsapp-2">Agendar minha Sessão Estratégica</button>
      </div>
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
