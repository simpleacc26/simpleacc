/* ============================================================
   APP — motor do funil (render, validação, persistência, tracking,
   transição de carregamento, envio de lead)
   Sem dependências externas. Funciona abrindo o index.html.
   ============================================================ */

const TRACKING_CONFIG = { ga4_id: "", meta_pixel_id: "", custom_webhook: "" };

/* Planilha de leads (Google Apps Script). Cole aqui a URL /exec da
   implantação e republique. Vazio = não envia (só salva local + segue). */
const LEADS_ENDPOINT = "";

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

function enviarLead() {
  const a = state.answers;
  const label = (stepId) => {
    const s = F.steps.find((x) => x.id === stepId);
    const o = s && s.options.find((op) => op.value === a[stepId]);
    return o ? o.label : "";
  };
  const lead = {
    data: new Date().toISOString(),
    nome: a.nomeResp || "", whatsapp: a.whatsapp || "", email: a.email || "",
    momento: label("momento"), estrutura: label("estrutura"), desafio: label("desafio"),
    ticket: label("ticket"), urgencia: label("urgencia"), faturamento: label("faturamento"),
    quer_analise: label("quer-analise"),
    balde: F.getBalde(a), camada: F.getCamada(a),
    frente: "Quiz Magna", origem: document.referrer || location.href,
    ...URL_UTMS,
  };
  if (!LEADS_ENDPOINT) return;
  try {
    fetch(LEADS_ENDPOINT, { method: "POST", mode: "no-cors",
      headers: { "Content-Type": "text/plain;charset=utf-8" }, body: JSON.stringify(lead) });
  } catch (e) { /* não bloqueia o lead */ }
}

const STORE_KEY = "magna_quiz_diagnostico";
const F = window.FLOW;
const app = document.getElementById("app");
const progressEl = document.getElementById("progress");

let state = { view: 0, answers: {}, started: false };
let stepEnterTime = 0;

function save() { try { sessionStorage.setItem(STORE_KEY, JSON.stringify(state)); } catch (e) {} }
function loadSaved() { try { return JSON.parse(sessionStorage.getItem(STORE_KEY)); } catch (e) { return null; } }
function clearSaved() { try { sessionStorage.removeItem(STORE_KEY); } catch (e) {} }

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
   TELAS DO QUIZ
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
      <p class="lead" style="margin:0 0 6px">${F.hero.subtitulo}</p>
      <p class="hint" style="margin:0 0 22px">${F.hero.tempo}</p>` : "";
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
    setTimeout(() => { (i < F.steps.length - 1) ? goToStep(i + 1) : renderCaptura(); }, reduce ? 0 : 320);
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
  state.view = "captura"; save();
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
    state.answers._completedAt = new Date().toISOString();
    state.answers._balde = F.getBalde(state.answers);
    state.answers._camada = F.getCamada(state.answers);
    save();
    trackEvent("funnel_complete", { answers: { ...state.answers } });
    enviarLead();
    renderAnalisando();
  });
}

/* ============================================================
   TELA DE ANÁLISE — transição dopaminérgica (0→100% em ~5s)
   ============================================================ */
function renderAnalisando() {
  progressEl.hidden = true;
  trackEvent("step_view", { step_id: "analisando" });

  const nome = (state.answers.nomeResp || "").split(" ")[0] || "";
  const frases = [
    "Lendo suas respostas" + (nome ? `, ${nome}` : "") + "…",
    "Cruzando com o banco de diagnósticos da Magna…",
    "Identificando o gargalo que mais te trava agora…",
    "Calculando o seu potencial de faturamento…",
    "Montando o seu diagnóstico personalizado…",
  ];
  const icones = ["🔎", "🧩", "🎯", "📈", "✨"];

  const screen = el(`
    <section class="card screen analise">
      <div class="analise-icon" id="an-icon" aria-hidden="true">${icones[0]}</div>
      <p class="eyebrow" style="text-align:center">Gerando diagnóstico</p>
      <h2 class="an-frase" id="an-frase" aria-live="polite">${frases[0]}</h2>
      <div class="progress-track an-track"><div class="progress-bar" id="an-bar"></div></div>
      <p class="an-pct" id="an-pct">0%</p>
      <ul class="an-checklist" id="an-checklist">
        <li data-at="15">Respostas registradas</li>
        <li data-at="40">Balde de diagnóstico identificado</li>
        <li data-at="65">Comparando com +300 negócios atendidos</li>
        <li data-at="90">Diagnóstico personalizado pronto</li>
      </ul>
    </section>`);
  app.replaceChildren(screen);
  scrollTop();

  const bar = screen.querySelector("#an-bar");
  const pctEl = screen.querySelector("#an-pct");
  const fraseEl = screen.querySelector("#an-frase");
  const iconEl = screen.querySelector("#an-icon");
  const items = [...screen.querySelectorAll("#an-checklist li")];
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const DURATION = reduce ? 200 : 5000;
  const start = performance.now();
  let lastFraseIdx = 0;

  function tick(now) {
    const elapsed = now - start;
    const pct = Math.min(100, Math.round((elapsed / DURATION) * 100));
    bar.style.width = pct + "%";
    pctEl.textContent = pct + "%";

    const fraseIdx = Math.min(frases.length - 1, Math.floor((pct / 100) * frases.length));
    if (fraseIdx !== lastFraseIdx || pct === 0) {
      lastFraseIdx = fraseIdx;
      fraseEl.textContent = frases[fraseIdx];
      iconEl.textContent = icones[fraseIdx];
      iconEl.classList.remove("pulse"); void iconEl.offsetWidth; iconEl.classList.add("pulse");
    }
    items.forEach((li) => { if (pct >= Number(li.dataset.at)) li.classList.add("done"); });

    if (elapsed < DURATION) {
      requestAnimationFrame(tick);
    } else {
      bar.style.width = "100%"; pctEl.textContent = "100%";
      items.forEach((li) => li.classList.add("done"));
      fraseEl.textContent = "Diagnóstico pronto!";
      setTimeout(() => { window.location.href = "diagnostico.html"; }, 500);
    }
  }
  requestAnimationFrame(tick);
}

/* ---------- navegação ---------- */
function goToStep(i) { state.view = i; save(); renderStep(i); }

function render() {
  if (state.view === "captura") return renderCaptura();
  if (typeof state.view === "number") return renderStep(state.view);
  renderStep(0);
}

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

window.addEventListener("beforeunload", () => {
  if (state.started && state.view !== "captura") trackEvent("funnel_abandon", { last_step: state.view });
});

(function init() {
  trackEvent("page_view", { funil: "quiz-magna" });
  const saved = loadSaved();
  if (saved && saved.started && !(saved.answers && saved.answers._completedAt)) {
    offerResume(saved);
  } else {
    render();
  }
})();
