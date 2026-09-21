/* ============================================================
   APP · motor do funil (render, validação, persistência, envio).

   Ordem das telas, conforme a apostila "Funil de Lead Dinâmico":
     captura -> P1 ... P10, com interseções de implicação no meio
     -> loading -> página de resultado.

   A captura vem primeiro de propósito: tendo nome, WhatsApp e
   e-mail, o comercial trabalha o lead mesmo que ele não termine
   o quiz. O lead é enviado duas vezes: na captura (parcial) e no
   fim (completo, com bucket e conta).
   ============================================================ */

/* ---------- tracking ---------- */
const TRACKING_CONFIG = { ga4_id: "", meta_pixel_id: "", custom_webhook: "" };

/* Webhook do Make que grava a linha na planilha de leads no Drive.
   Preencher antes de publicar. Vazio = nada é enviado. */
const LEADS_ENDPOINT = "";

function getUTMs() {
  const p = new URLSearchParams(location.search);
  const out = {};
  ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term", "fbclid", "gclid"]
    .forEach((k) => { const v = p.get(k); if (v) out[k] = v; });
  return out;
}
const URL_UTMS = getUTMs();

function trackEvent(name, data = {}) {
  const payload = { ...data, ts: Date.now() };
  try { if (window.gtag) window.gtag("event", name, payload); } catch (e) {}
  try { if (window.fbq) window.fbq("trackCustom", name, payload); } catch (e) {}
  try {
    if (TRACKING_CONFIG.custom_webhook) {
      navigator.sendBeacon(TRACKING_CONFIG.custom_webhook, JSON.stringify({ event: name, ...payload }));
    }
  } catch (e) {}
}

function dataHoraBR() {
  try {
    const tz = { timeZone: "America/Sao_Paulo" };
    const d = new Date();
    return d.toLocaleDateString("pt-BR", tz) + " " + d.toLocaleTimeString("pt-BR", tz);
  } catch (e) { return new Date().toISOString(); }
}

const F = window.FLOW;
const M = window.MOTOR;
const STORE_KEY = (F.config && F.config.storeKey) || "quiz";
const app = document.getElementById("app");
const progressEl = document.getElementById("progress");

/* ---------- estado ---------- */
let state = { view: 0, answers: {}, started: false, capturado: false };
let stepEnterTime = Date.now();

function save() { try { sessionStorage.setItem(STORE_KEY, JSON.stringify(state)); } catch (e) {} }
function loadSaved() { try { return JSON.parse(sessionStorage.getItem(STORE_KEY)); } catch (e) { return null; } }
function clearSaved() { try { sessionStorage.removeItem(STORE_KEY); } catch (e) {} }

/* ---------- telas ----------
   Monta a sequência: captura, e depois cada pergunta seguida da
   sua interseção, quando ela existe. */
const SCREENS = [{ kind: "captura" }];
F.steps.forEach((s, i) => {
  SCREENS.push({ kind: "step", i });
  if (F.interseccoes && F.interseccoes[s.id]) SCREENS.push({ kind: "inter", id: s.id });
});

/* ---------- helpers ---------- */
function el(html) { const t = document.createElement("template"); t.innerHTML = html.trim(); return t.content.firstElementChild; }
function scrollTop() { window.scrollTo({ top: 0, behavior: "smooth" }); }
function soDigitosTel(v) {
  let d = String(v || "").replace(/\D/g, "");
  if (d.length > 11 && d.startsWith("55")) d = d.slice(2);
  return d.slice(0, 11);
}
function fmtTel(v) {
  const d = soDigitosTel(v);
  if (!d) return "";
  if (d.length <= 2) return "(" + d;
  if (d.length <= 6) return "(" + d.slice(0, 2) + ") " + d.slice(2);
  if (d.length <= 10) return "(" + d.slice(0, 2) + ") " + d.slice(2, 6) + "-" + d.slice(6);
  return "(" + d.slice(0, 2) + ") " + d.slice(2, 7) + "-" + d.slice(7);
}
function celularValido(v) {
  const d = soDigitosTel(v);
  return d.length === 11 && d[2] === "9";
}

/* ---------- progresso (conta só as perguntas) ---------- */
function updateProgress(stepIdx) {
  const total = F.steps.length;
  if (stepIdx == null) { progressEl.hidden = true; return; }
  progressEl.hidden = false;
  const human = stepIdx + 1;
  const pct = Math.round((stepIdx / total) * 100);
  const label = stepIdx === total - 1 ? "Última pergunta" : `Pergunta ${human} de ${total}`;
  document.getElementById("progress-label").textContent = label;
  document.getElementById("progress-pct").textContent = pct + "%";
  document.getElementById("progress-bar").style.width = pct + "%";
}

/* ============================================================
   ENVIO DO LEAD
   Duas chamadas: "parcial" logo na captura (o comercial já pode
   trabalhar) e "completa" no fim, com bucket, conta e respostas.
   Fire and forget: nunca trava o fluxo.
   ============================================================ */
function enviarLead(etapa) {
  if (!LEADS_ENDPOINT) return;
  const a = state.answers;
  const completo = etapa === "completo";
  const divida = completo ? M.calcularDivida(a) : null;
  const bucket = completo ? M.definirBucket(a) : null;

  const lead = {
    etapa: etapa,
    name: a.nomeResp || "",
    email: a.email || "",
    whatsapp: a.whatsapp || "",
    cidade: a.cidade || "",
    frente: (F.config && F.config.frente) || "Funil",
    qualificacao: completo ? M.classificarLead(a, divida) : "parcial",
    padrao: bucket ? bucket.dados.nome : "",
    divida_mes: divida ? Math.round(divida.mes) : "",
    divida_ano: divida ? Math.round(divida.ano) : "",
    answers: F.steps.reduce((acc, s, i) => {
      acc["q" + (i + 1) + "_" + s.id] = M.label(s.id, a);
      return acc;
    }, {}),
    utms: URL_UTMS,
    meta: {
      timestamp: dataHoraBR(),
      page_url: location.href,
      referrer: document.referrer || "",
      user_agent: navigator.userAgent || "",
    },
  };
  try {
    fetch(LEADS_ENDPOINT, {
      method: "POST", keepalive: true,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(lead),
    });
  } catch (e) { /* não bloqueia o lead */ }
}

/* ============================================================
   TELA 1 · CAPTURA (a porta de entrada)
   ============================================================ */
function renderCaptura() {
  updateProgress(null);
  trackEvent("step_view", { step_id: "captura" });
  const c = F.captura;

  const fields = c.campos.map(f => `
    <div class="field">
      <label for="${f.id}">${f.label} ${f.required ? '<span class="req">*</span>' : '<span class="opt-tag">(opcional)</span>'}</label>
      <input id="${f.id}" name="${f.id}" type="${f.type}" ${f.required ? "required" : ""}
             autocomplete="${f.autocomplete || "off"}" placeholder="${f.placeholder || ""}"
             value="${(state.answers[f.id] || "").replace(/"/g, "&quot;")}"
             aria-describedby="${f.id}-err" />
      <p class="err-msg" id="${f.id}-err"></p>
    </div>`).join("");

  const screen = el(`
    <section class="card screen">
      <span class="selo">${F.hero.selo}</span>
      <h1>${F.hero.titulo}</h1>
      <p class="lead">${F.hero.subtitulo}</p>
      <p class="hint tempo">${F.hero.tempo}</p>
      <hr class="rule-gold" />
      <p class="eyebrow">${c.titulo}</p>
      <p class="lead" style="margin-bottom:6px">${c.subtitulo}</p>
      <form id="form" novalidate>
        <div class="errors" id="err" role="alert" tabindex="-1"></div>
        ${fields}
        <button class="btn btn-primary btn-block" id="submit" type="submit">${c.cta}</button>
        <p class="hint" style="margin-top:14px;text-align:center">${c.privacidade}</p>
        <p class="microlegal">${c.microlegal}</p>
      </form>
    </section>`);
  app.replaceChildren(screen);
  scrollTop();

  // máscara de telefone
  c.campos.filter(f => f.mask === "phone").forEach(f => {
    const input = screen.querySelector(`#${f.id}`);
    if (!input) return;
    input.inputMode = "numeric";
    input.removeAttribute("maxlength");
    if (input.value) input.value = fmtTel(input.value);
    ["input", "change", "blur"].forEach(ev =>
      input.addEventListener(ev, () => { input.value = fmtTel(input.value); }));
  });

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
      else if (f.type === "tel" && val && !celularValido(val)) problem = "Confira o WhatsApp: DDD e 9 dígitos, sem o +55.";
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
    state.started = true;
    state.capturado = true;
    save();
    trackEvent("funnel_start", {});
    enviarLead("parcial");
    goTo(1);
  });
}

/* ============================================================
   TELA 2 · PERGUNTA
   ============================================================ */
function renderStep(screenIdx, i) {
  const step = F.steps[i];
  updateProgress(i);
  stepEnterTime = Date.now();
  trackEvent("step_view", { step_id: step.id, step_number: i + 1 });

  const selected = state.answers[step.id];
  const opts = step.options.map((o, idx) => `
    <button class="opt" type="button" role="radio" tabindex="${idx === 0 ? 0 : -1}"
            aria-checked="${selected === o.value ? "true" : "false"}" data-value="${o.value}">
      <span class="dot" aria-hidden="true"></span>
      <span class="txt">${o.label}</span>
    </button>`).join("");

  const screen = el(`
    <section class="card screen">
      <p class="eyebrow">${step.etapa}</p>
      <h2 id="q-${step.id}">${step.pergunta}</h2>
      <div class="options" role="radiogroup" aria-labelledby="q-${step.id}">${opts}</div>
      <div class="actions">
        <button class="btn btn-ghost" id="back" type="button">&#8592; Voltar</button>
        <span class="hint">Toque na opção. Avança sozinho.</span>
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
    trackEvent("step_complete", { step_id: step.id, time_on_step: Date.now() - stepEnterTime });
    advancing = true;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setTimeout(() => {
      if (screenIdx < SCREENS.length - 1) goTo(screenIdx + 1);
      else finalizar();
    }, reduce ? 0 : 320);
  }
  optionEls.forEach((node, idx) => {
    node.addEventListener("click", () => choose(node));
    node.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") { e.preventDefault(); choose(node); }
      if (e.key === "ArrowDown" || e.key === "ArrowRight") { e.preventDefault(); optionEls[(idx + 1) % optionEls.length].focus(); }
      if (e.key === "ArrowUp" || e.key === "ArrowLeft") { e.preventDefault(); optionEls[(idx - 1 + optionEls.length) % optionEls.length].focus(); }
    });
  });

  screen.querySelector("#back").addEventListener("click", () => {
    trackEvent("step_back", { from: step.id });
    goTo(screenIdx - 1);
  });
}

/* ============================================================
   TELA 3 · INTERSEÇÃO (implicação, não pitch)
   ============================================================ */
function renderInterseccao(screenIdx, id) {
  const it = F.interseccoes[id];
  trackEvent("step_view", { step_id: "inter_" + id });

  const screen = el(`
    <section class="card screen interseccao">
      <p class="eyebrow">Enquanto você pensa nisso</p>
      <p class="num">${it.num}</p>
      <p>${it.texto}</p>
      <p class="fonte">${it.fonte}</p>
      <hr class="rule-gold" />
      <button class="btn btn-primary btn-block" id="segue" type="button">Continuar</button>
    </section>`);
  app.replaceChildren(screen);
  scrollTop();
  screen.querySelector("#segue").focus({ preventScroll: true });
  screen.querySelector("#segue").addEventListener("click", () => {
    if (screenIdx < SCREENS.length - 1) goTo(screenIdx + 1);
    else finalizar();
  });
}

/* ============================================================
   TELA 4 · LOADING
   ============================================================ */
function finalizar() {
  state.answers._completedAt = new Date().toISOString();
  save();
  trackEvent("funnel_complete", {});
  enviarLead("completo");
  renderLoading();
}

function renderLoading() {
  updateProgress(null);
  trackEvent("step_view", { step_id: "loading" });
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const dur = reduce ? 800 : 4700;
  const msgs = [
    "Lendo as suas respostas...",
    "Cruzando o seu ticket com o seu volume...",
    "Fechando a sua conta...",
  ];
  const screen = el(`
    <section class="card screen loading-card">
      <p class="eyebrow">Quase lá</p>
      <h2>Fechando a sua conta</h2>
      <p class="lead" id="load-msg">${msgs[0]}</p>
      <div class="load-track"><div class="load-bar" id="load-bar"></div></div>
      <p class="hint" style="margin-top:18px">O seu resultado é montado com o que você respondeu, não com média de mercado.</p>
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
function goTo(idx) {
  state.view = idx; save();
  const s = SCREENS[idx];
  if (!s) return renderCaptura();
  if (s.kind === "captura") return renderCaptura();
  if (s.kind === "step") return renderStep(idx, s.i);
  if (s.kind === "inter") return renderInterseccao(idx, s.id);
}
function render() { goTo(typeof state.view === "number" ? state.view : 0); }

/* ---------- resume ---------- */
function offerResume(saved) {
  const banner = el(`
    <div class="card screen">
      <p class="eyebrow">Você já começou</p>
      <h2>Quer continuar de onde parou?</h2>
      <div class="actions">
        <button class="btn btn-primary" id="resume-yes" type="button">Continuar</button>
        <button class="link" id="resume-no" type="button">Recomeçar</button>
      </div>
    </div>`);
  app.replaceChildren(banner);
  banner.querySelector("#resume-yes").addEventListener("click", () => { state = saved; render(); });
  banner.querySelector("#resume-no").addEventListener("click", () => {
    clearSaved(); state = { view: 0, answers: {}, started: false, capturado: false }; render();
  });
}

/* ---------- abandono ---------- */
window.addEventListener("beforeunload", () => {
  if (state.started && !state.answers._completedAt) trackEvent("funnel_abandon", { last_view: state.view });
});

/* ---------- start ---------- */
(function init() {
  trackEvent("page_view", { funil: (F.config && F.config.frente) || "funil" });
  const saved = loadSaved();
  if (saved && saved.started && !(saved.answers && saved.answers._completedAt)) {
    offerResume(saved);
  } else {
    render();
  }
})();
