/* ============================================================
   APP · motor do funil (render, validação, persistência, tracking)
   Sem dependências externas. Funciona abrindo o index.html.
   Estrutura invisível espelhada do quiz de alta conversão da
   Pâmella (uma pergunta por tela sem título repetido, tela de
   loading antes do diagnóstico), igual ao funil do Felipe.
   ============================================================ */

/* ---- Tracking plugável: preencha os IDs e os eventos vão junto.
   Vazio = só loga no console. ---- */
const TRACKING_CONFIG = { ga4_id: "", meta_pixel_id: "", custom_webhook: "" };

/* Webhook do Make que grava o lead na planilha. Cenário
   "[Guilherme Eduardo] Diagnóstico IDR (GES360) → Sheets" no time Simple Acc.
   Vazio = não envia (só salva local + segue pro diagnóstico). */
const LEADS_ENDPOINT = "https://hook.us2.make.com/r18d4hny5o7c7hce9cfcn09fhyja8d6c";

/* UTMs capturadas da URL no carregamento (a página do quiz não muda de URL até
   o envio, então isso preserva os parâmetros do anúncio). */
function getUTMs() {
  const p = new URLSearchParams(location.search);
  return {
    utm_source: p.get("utm_source") || "", utm_medium: p.get("utm_medium") || "",
    utm_campaign: p.get("utm_campaign") || "", utm_content: p.get("utm_content") || "",
    utm_term: p.get("utm_term") || "",
  };
}
const URL_UTMS = getUTMs();
function trackEvent(name, data = {}) {
  const payload = { ...data, ts: Date.now() };
  console.log(`[TRACK] ${name}`, payload);
  try {
    if (TRACKING_CONFIG.ga4_id && typeof gtag === "function") gtag("event", name, data);
    if (TRACKING_CONFIG.meta_pixel_id && typeof fbq === "function") fbq("trackCustom", name, data);
    if (TRACKING_CONFIG.custom_webhook && navigator.sendBeacon)
      navigator.sendBeacon(TRACKING_CONFIG.custom_webhook, JSON.stringify({ event: name, ...payload }));
  } catch (e) { /* tracking nunca quebra o funil */ }
}

/* Classifica o lead por ICP (faturamento) + intenção (prontidão), mesma régua
   do relatório. É o que troca o CTA final do diagnóstico e o que o comercial
   usa para priorizar a fila. */
function classificarLead(a) {
  if (a.qualificacao === "ate-20" || a.qualificacao === "20-50") return "fora";
  if (a.prontidao === "depois" || a.prontidao === "pesquisando") return "nutrir";
  return "qualificado";
}

/* Envia o lead pra planilha (Google Apps Script). Manda as respostas já em
   texto legível. Fire-and-forget: nunca trava o fluxo do lead. */
function enviarLead() {
  if (!LEADS_ENDPOINT) return;
  const a = state.answers;
  const opt = (stepId) => {
    const st = F.steps.find((x) => x.id === stepId);
    return st ? st.options.find((op) => op.value === a[stepId]) : null;
  };
  const label = (stepId) => { const o = opt(stepId); return o ? o.label : ""; };

  /* IDR: mesmo cálculo do diagnostico.js (mantenha os dois em sincronia) */
  const PESOS = { situacao: 1, cobranca: 3, problema: 2.5, implicacao: 1.5, tentativas: 1, objetivo: 0.5, qualificacao: 1.5 };
  let soma = 0, tot = 0;
  Object.keys(PESOS).forEach((id) => {
    const o = opt(id);
    if (o && typeof o.score === "number") { soma += o.score * PESOS[id]; tot += PESOS[id]; }
  });
  const idr = tot ? Math.round(soma / tot) : "";
  const faixa = idr >= 78 ? "Dependência crítica" : idr >= 60 ? "Dependência alta"
              : idr >= 40 ? "Dependência moderada" : "Modelo em transição";
  const qual = opt("qualificacao");
  const perfilLead = qual && qual.icp ? "ICP (agendar diagnóstico)" : "Nao-ICP (oferta de entrada)";

  const lead = {
    data: new Date().toISOString(),
    nome: a.nomeResp || "", whatsapp: a.whatsapp || "", email: a.email || "",
    idr: idr, faixa_idr: faixa, perfil_lead: perfilLead,
    classificacao: classificarLead(a),
    gargalo: (opt("problema") && opt("problema").gargalo) || "",
    situacao: label("situacao"), cobranca: label("cobranca"), problema: label("problema"),
    tempo: label("tempo"), implicacao: label("implicacao"), tentativas: label("tentativas"),
    objetivo: label("objetivo"), especialidade: label("perfil"),
    faturamento: label("qualificacao"), prontidao: label("prontidao"),
    frente: (F.config && F.config.frente) || "GES360",
    origem: document.referrer || location.href,
    ...URL_UTMS,
  };
  /* application/json normal, com CORS. O destino é webhook do Make, que responde
     ao preflight OPTIONS com Access-Control-Allow-Origin: *. Isto é o oposto do
     que valia quando o destino era Apps Script, que não responde ao preflight e
     por isso exigia text/plain + no-cors. Se um dia voltar para Apps Script,
     precisa voltar também esse par.
     keepalive garante a entrega mesmo com a troca de página logo em seguida. */
  try {
    fetch(LEADS_ENDPOINT, { method: "POST", keepalive: true,
      headers: { "Content-Type": "application/json" }, body: JSON.stringify(lead) })
      .catch(() => { /* não bloqueia o lead */ });
  } catch (e) { /* não bloqueia o lead */ }
}

const F = window.FLOW;
const STORE_KEY = (F.config && F.config.storeKey) || "ges360_funil_quiz";
const app = document.getElementById("app");
const progressEl = document.getElementById("progress");

let state = { view: 0, answers: {}, started: false };
let stepEnterTime = 0;

/* ---------- persistência ---------- */
function save() { try { sessionStorage.setItem(STORE_KEY, JSON.stringify(state)); } catch (e) {} }
function loadSaved() { try { return JSON.parse(sessionStorage.getItem(STORE_KEY)); } catch (e) { return null; } }
function clearSaved() { try { sessionStorage.removeItem(STORE_KEY); } catch (e) {} }

/* ---------- helpers ---------- */
function el(html) { const t = document.createElement("template"); t.innerHTML = html.trim(); return t.content.firstElementChild; }
function scrollTop() { window.scrollTo({ top: 0, behavior: "smooth" }); }

/* Barra sem número: nem "Pergunta X de N", nem porcentagem. Os dois anunciam o
   tamanho da fila e fazem o quiz parecer longo justo no começo, quando o lead
   ainda pode desistir. A barra enchendo já diz que anda e que tem fim. */
function updateProgress(stepIdx) {
  progressEl.hidden = false;
  document.getElementById("progress-bar").style.width = `${Math.round((stepIdx / F.steps.length) * 100)}%`;
}

/* ============================================================
   TELAS
   ============================================================ */
function renderStep(i) {
  const step = F.steps[i];
  updateProgress(i);
  stepEnterTime = Date.now();
  trackEvent("step_view", { step_id: step.id, step_number: i + 1 });

  const selected = state.answers[step.id];
  const opts = step.options.map((o, idx) => `
    <button class="opt" role="radio" tabindex="${idx === 0 ? 0 : -1}"
            aria-checked="${selected === o.value ? "true" : "false"}" data-value="${o.value}">
      <span class="dot" aria-hidden="true"></span>
      <span class="txt">${o.label}</span>
    </button>`).join("");

  /* Só a 1ª tela tem título e subtítulo. As demais começam direto na pergunta,
     sem rótulo de etapa em cima (ficava repetitivo), como no quiz da Pâmella. */
  const intro = i === 0 ? `
      ${F.hero.selo ? `<span class="selo">${F.hero.selo}</span>` : ""}
      <h1>${F.hero.titulo}</h1>
      <p class="lead">${F.hero.subtitulo}</p>
      <p class="hint" style="margin:6px 0 20px">${F.hero.tempo}</p>` : "";
  const screen = el(`
    <section class="card screen">
      ${intro}
      <h2 id="q-${step.id}">${step.pergunta}</h2>
      <div class="options" role="radiogroup" aria-labelledby="q-${step.id}">${opts}</div>
      <div class="actions">
        ${i > 0
          ? '<button class="btn btn-ghost" id="back">← Voltar</button>'
          : '<span class="hint">Toque na opção que mais combina. Avança sozinho.</span>'}
      </div>
    </section>`);
  app.replaceChildren(screen);
  scrollTop();

  const optionEls = [...screen.querySelectorAll(".opt")];
  let advancing = false;
  // auto-avanço: escolher já leva pra próxima (maior conclusão/connect rate)
  function choose(node) {
    if (advancing) return;
    optionEls.forEach(o => { o.setAttribute("aria-checked", "false"); o.tabIndex = -1; });
    node.setAttribute("aria-checked", "true"); node.tabIndex = 0;
    state.answers[step.id] = node.dataset.value;
    save();
    if (!state.started) { state.started = true; trackEvent("funnel_start", {}); }
    trackEvent("step_complete", { step_id: step.id, time_on_step: Date.now() - stepEnterTime });
    advancing = true;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setTimeout(() => { (i < F.steps.length - 1) ? goToStep(i + 1) : renderCaptura(); }, reduce ? 0 : 300);
  }
  optionEls.forEach((node, idx) => {
    node.addEventListener("click", () => choose(node));
    node.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") { e.preventDefault(); choose(node); }
      if (e.key === "ArrowDown" || e.key === "ArrowRight") { e.preventDefault(); optionEls[(idx + 1) % optionEls.length].focus(); }
      if (e.key === "ArrowUp" || e.key === "ArrowLeft") { e.preventDefault(); optionEls[(idx - 1 + optionEls.length) % optionEls.length].focus(); }
    });
  });

  if (i > 0) screen.querySelector("#back").addEventListener("click", () => {
    trackEvent("step_back", { from: step.id });
    goToStep(i - 1);
  });
}

function renderCaptura() {
  progressEl.hidden = true;
  const c = F.captura;
  trackEvent("step_view", { step_id: "captura" });
  const fields = c.campos.map(f => `
    <div class="field">
      <label for="${f.id}">${f.label} ${f.required ? '<span class="req" title="obrigatório">*</span>' : '<span class="opt-tag">(opcional)</span>'}</label>
      <input id="${f.id}" name="${f.id}" type="${f.type}" autocomplete="${f.autocomplete}"
             placeholder="${f.placeholder}" value="${state.answers[f.id] ? String(state.answers[f.id]).replace(/"/g,'&quot;') : ""}"
             ${f.required ? 'aria-required="true"' : ""} aria-describedby="${f.id}-err" />
      <p class="err-msg" id="${f.id}-err"></p>
    </div>`).join("");

  const screen = el(`
    <section class="card screen">
      <p class="eyebrow">Quase lá</p>
      <h2>${c.titulo}</h2>
      <p class="lead">${c.subtitulo}</p>
      <div class="errors" id="err" role="alert" aria-live="assertive"></div>
      <form id="form" novalidate>
        ${fields}
        <div class="actions">
          <button class="btn btn-ghost" id="back" type="button">← Voltar</button>
          <button class="btn btn-primary btn-block" id="submit" type="submit">${c.cta}</button>
        </div>
        <p class="hint" style="margin-top:14px">${c.privacidade}</p>
      </form>
    </section>`);
  app.replaceChildren(screen);
  scrollTop();

  // máscara de WhatsApp: (XX) XXXXX-XXXX
  c.campos.filter((f) => f.mask === "phone").forEach((f) => {
    const input = screen.querySelector(`#${f.id}`);
    if (!input) return;
    input.inputMode = "numeric";
    input.maxLength = 16;
    const fmt = (v) => {
      const d = v.replace(/\D/g, "").slice(0, 11);
      if (d.length <= 2) return d ? "(" + d : "";
      if (d.length <= 7) return "(" + d.slice(0, 2) + ") " + d.slice(2);
      return "(" + d.slice(0, 2) + ") " + d.slice(2, 7) + "-" + d.slice(7);
    };
    if (input.value) input.value = fmt(input.value);
    input.addEventListener("input", () => { input.value = fmt(input.value); });
  });

  screen.querySelector("#back").addEventListener("click", () => goToStep(F.steps.length - 1));

  screen.querySelector("#form").addEventListener("submit", (e) => {
    e.preventDefault();
    const errBox = screen.querySelector("#err");
    errBox.classList.remove("show");
    const problems = [];
    c.campos.forEach(f => {
      const input = screen.querySelector(`#${f.id}`);
      const msg = screen.querySelector(`#${f.id}-err`);
      const val = input.value.trim();
      let problem = "";
      if (f.required && !val) problem = "Esse campo é obrigatório.";
      else if (f.type === "tel" && val && val.replace(/\D/g, "").length < 11) problem = "Informe o WhatsApp completo com DDD.";
      else if (f.type === "email" && val && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) problem = "Informe um e-mail válido.";
      if (problem) {
        problems.push(f.label);
        input.setAttribute("aria-invalid", "true");
        msg.textContent = "Erro: " + problem; msg.classList.add("show");
      } else {
        input.removeAttribute("aria-invalid"); msg.classList.remove("show");
        state.answers[f.id] = val;
      }
    });
    if (problems.length) {
      errBox.textContent = "Confira os campos: " + problems.join(", ") + ".";
      errBox.classList.add("show"); errBox.focus?.();
      trackEvent("field_error", { step_id: "captura", fields: problems });
      return;
    }
    // sucesso
    const submitBtn = screen.querySelector("#submit");
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<span class="spinner"></span>Enviando...';
    state.answers._completedAt = new Date().toISOString();
    save();
    trackEvent("funnel_complete", { answers: { ...state.answers } });
    enviarLead();
    renderLoading();
  });
}

/* Tela de "preparando o diagnóstico": barra dourada que enche + mensagens
   girando, depois redireciona. O tempo extra também garante a entrega do lead
   antes da troca de página. */
function renderLoading() {
  progressEl.hidden = true;
  trackEvent("step_view", { step_id: "loading" });
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const dur = reduce ? 800 : 4700;
  const msgs = [
    "Analisando as suas respostas...",
    "Calculando o seu IDR, o Índice de Dependência de Receita...",
    "Montando o seu diagnóstico personalizado...",
  ];
  const screen = el(`
    <section class="card screen loading-card">
      <p class="eyebrow">Quase lá</p>
      <h2>Preparando o seu diagnóstico</h2>
      <p class="lead" id="load-msg">${msgs[0]}</p>
      <div class="load-track"><div class="load-bar" id="load-bar"></div></div>
      <p class="hint" style="margin-top:16px">Estamos personalizando com base no que você respondeu.</p>
    </section>`);
  app.replaceChildren(screen);
  scrollTop();

  const bar = screen.querySelector("#load-bar");
  const msgEl = screen.querySelector("#load-msg");
  bar.style.transition = `width ${dur}ms cubic-bezier(.4,0,.2,1)`;
  requestAnimationFrame(() => { bar.style.width = "100%"; });

  if (!reduce) {
    let i = 1;
    const iv = setInterval(() => {
      if (i < msgs.length) { msgEl.textContent = msgs[i++]; } else { clearInterval(iv); }
    }, dur / msgs.length);
  }

  const dest = (F.config && F.config.diagnosticoUrl) || "diagnostico.html";
  setTimeout(() => { window.location.href = dest; }, dur + 350);
}

/* ---------- navegação ---------- */
function goToStep(i) { state.view = i; save(); renderStep(i); }

function render() {
  if (state.view === "captura") return renderCaptura();
  if (typeof state.view === "number") return renderStep(state.view);
  renderStep(0);
}

/* ---------- resume (continuar de onde parou) ---------- */
function offerResume(saved) {
  const banner = el(`
    <div class="resume">
      Você começou a responder antes. Quer continuar de onde parou?
      <div>
        <button class="btn btn-primary" id="resume-yes">Continuar</button>
        <button class="link" id="resume-no">Recomeçar</button>
      </div>
    </div>`);
  app.replaceChildren(banner);
  banner.querySelector("#resume-yes").addEventListener("click", () => { state = saved; render(); });
  banner.querySelector("#resume-no").addEventListener("click", () => { clearSaved(); state = { view: 0, answers: {}, started: false }; render(); });
}

/* ---------- abandono ---------- */
window.addEventListener("beforeunload", () => {
  if (state.started && state.view !== "captura") trackEvent("funnel_abandon", { last_step: state.view });
});

/* ---------- start ---------- */
(function init() {
  trackEvent("page_view", { funil: (F.config && F.config.funil) || "ges360" });
  const saved = loadSaved();
  if (saved && saved.started && !(saved.answers && saved.answers._completedAt)) {
    offerResume(saved);
  } else {
    render();
  }
})();
