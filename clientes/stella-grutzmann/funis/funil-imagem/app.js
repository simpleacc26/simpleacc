/* ============================================================
   APP — motor do funil (render, validação, persistência, tracking)
   Sem dependências externas. Funciona abrindo o index.html.
   ============================================================ */

/* ---- Tracking plugável: preencha os IDs e os eventos vão junto.
   Vazio = só loga no console. ---- */
const TRACKING_CONFIG = { ga4_id: "", meta_pixel_id: "", custom_webhook: "" };

/* Planilha de leads (Google Apps Script). Cole aqui a URL /exec da implantação
   e republique. Vazio = não envia (só salva local + segue pro diagnóstico). */
const LEADS_ENDPOINT = "";

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

/* Envia o lead pra planilha (Google Apps Script). Manda as respostas já em
   texto legível. Fire-and-forget: nunca trava o fluxo do lead. */
function enviarLead() {
  if (!LEADS_ENDPOINT) return;
  const a = state.answers;
  const label = (stepId) => {
    const s = F.steps.find((x) => x.id === stepId);
    const o = s && s.options.find((op) => op.value === a[stepId]);
    return o ? o.label : "";
  };
  const lead = {
    data: new Date().toISOString(),
    nome: a.nomeResp || "", whatsapp: a.whatsapp || "", email: a.email || "",
    situacao: label("situacao"), problema: label("problema"), implicacao: label("implicacao"),
    custo: label("custo"), tentativas: label("tentativas"), objetivo: label("objetivo"),
    perfil: label("perfil"), qualificacao: label("qualificacao"),
    frente: "Consultoria de Imagem", origem: document.referrer || location.href,
    ...URL_UTMS,
  };
  try {
    fetch(LEADS_ENDPOINT, { method: "POST", mode: "no-cors",
      headers: { "Content-Type": "text/plain;charset=utf-8" }, body: JSON.stringify(lead) });
  } catch (e) { /* não bloqueia o lead */ }
}

const STORE_KEY = "stella_funil_imagem";
const F = window.FLOW;
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

function updateProgress(stepIdx) {
  const total = F.steps.length;
  const human = stepIdx + 1;
  const pct = Math.round((stepIdx / total) * 100);
  const label = stepIdx === 0 ? "Começando" : (stepIdx === total - 1 ? "Última pergunta" : `Pergunta ${human} de ${total}`);
  progressEl.hidden = false;
  document.getElementById("progress-label").textContent = label;
  document.getElementById("progress-pct").textContent = `${pct}%`;
  document.getElementById("progress-bar").style.width = `${pct}%`;
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

  const intro = i === 0 ? `
      <span class="selo">${F.hero.selo}</span>
      <h1>${F.hero.titulo}</h1>
      <p class="hint" style="margin:-4px 0 20px">${F.hero.tempo}</p>` : "";
  const screen = el(`
    <section class="card screen">
      ${intro}
      <p class="eyebrow">${step.etapa}</p>
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
    setTimeout(() => { window.location.href = "diagnostico.html"; }, 600);
  });
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
  banner.querySelector("#resume-no").addEventListener("click", () => { clearSaved(); state = { view: "hero", answers: {}, started: false }; render(); });
}

/* ---------- abandono ---------- */
window.addEventListener("beforeunload", () => {
  if (state.started && state.view !== "captura") trackEvent("funnel_abandon", { last_step: state.view });
});

/* ---------- start ---------- */
(function init() {
  trackEvent("page_view", { funil: "inclusao" });
  const saved = loadSaved();
  if (saved && saved.started && !(saved.answers && saved.answers._completedAt)) {
    offerResume(saved);
  } else {
    render();
  }
})();
