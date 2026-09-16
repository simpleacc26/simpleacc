/* ============================================================
   APP · HODIE. Motor do funil (render, validação, persistência,
   índice, tracking). Sem dependências externas.
   Padrão de escrita: nunca usar travessão.
   ============================================================ */

/* ---- Tracking plugável: preencha os IDs e os eventos vão junto.
   Vazio = só loga no console. ---- */
const TRACKING_CONFIG = { ga4_id: "", meta_pixel_id: "", custom_webhook: "" };

/* Planilha de leads via Make (webhook instant -> Google Sheets).
   Cole a URL do webhook do Make aqui. O Make só estrutura o lead quando
   recebe application/json (já tratado em enviarLead). Vazio = não envia. */
const LEADS_ENDPOINT = "https://hook.us2.make.com/vuvci258shxi12m92b40q9ycmkeb6w9i";

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

/* Data e hora no fuso de Brasília ("15/09/2026 09:32:35"). */
function dataHoraBR() {
  try {
    const tz = { timeZone: "America/Sao_Paulo" };
    const d = new Date();
    return d.toLocaleDateString("pt-BR", tz) + " " + d.toLocaleTimeString("pt-BR", tz);
  } catch (e) { return new Date().toISOString(); }
}

const F = window.FLOW;
const STORE_KEY = (F.config && F.config.storeKey) || "hodie_quiz";
const app = document.getElementById("app");
const progressEl = document.getElementById("progress");

/* Envia o lead pro webhook do Make. Fire-and-forget: nunca trava o lead. */
function enviarLead() {
  if (!LEADS_ENDPOINT) return;
  const a = state.answers;
  const label = (stepId) => {
    const s = F.steps.find((x) => x.id === stepId);
    const o = s && s.options.find((op) => op.value === a[stepId]);
    return o ? o.label : "";
  };
  const indice = window.calcularIndice(a);
  const lead = {
    name: a.nomeResp || "",
    email: a.email || "",
    whatsapp: a.whatsapp || "",
    qualificacao: window.classificarLead(a),
    bucket: (F.buckets[window.definirBucket(a)] || {}).nome || "",
    indice_pct: indice.pct,
    indice_faixa: F.indice.faixas[indice.faixa].titulo,
    frente: (F.config && F.config.frente) || "Funil",
    answers: {
      q1: label("situacao"), q2: label("problema"), q3: label("tempo"),
      q4: label("impacto"), q5: label("necessidade"), q6: label("objetivo"),
      q7: label("perfil"), q8: label("investimento"), q9: label("prontidao"),
    },
    utms: URL_UTMS,
    meta: {
      timestamp: dataHoraBR(),
      page_url: location.href,
      referrer: document.referrer || "",
      user_agent: navigator.userAgent || "",
    },
  };
  try {
    // application/json de verdade: com text/plain o Make aceita e grava linha
    // vazia, sem erro nenhum na tela. keepalive garante que o POST sobreviva
    // ao redirect para o relatório.
    // o .catch é obrigatório: try/catch não pega promise rejeitada, e sem ele
    // um webhook fora do ar vira erro não tratado no console do lead.
    fetch(LEADS_ENDPOINT, { method: "POST", keepalive: true,
      headers: { "Content-Type": "application/json" }, body: JSON.stringify(lead) })
      .catch(() => {});
  } catch (e) { /* não bloqueia o lead */ }
}

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
  const pct = Math.round((stepIdx / total) * 100);
  const label = stepIdx === 0 ? "Começando" : (stepIdx === total - 1 ? "Última pergunta" : `Pergunta ${stepIdx + 1} de ${total}`);
  progressEl.hidden = false;
  document.getElementById("progress-label").textContent = label;
  document.getElementById("progress-pct").textContent = `${pct}%`;
  document.getElementById("progress-bar").style.width = `${pct}%`;
}

/* ============================================================
   TELAS
   ============================================================ */

/* Só a tela 1 leva hero. Da tela 2 em diante começa direto na pergunta,
   sem rótulo de etapa repetido (regra fixa da casa). */
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
      <p class="lead">${F.hero.subtitulo}</p>
      <p class="hint" style="margin:-2px 0 18px">${F.hero.tempo}</p>` : "";

  const screen = el(`
    <section class="card screen">
      ${intro}
      <h2 id="q-${step.id}">${step.pergunta}</h2>
      <div class="options" role="radiogroup" aria-labelledby="q-${step.id}">${opts}</div>
      <div class="actions">
        ${i > 0
          ? '<button class="btn btn-ghost" id="back">Voltar</button>'
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
          <button class="btn btn-ghost" id="back" type="button">Voltar</button>
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

  // valida só no envio, nunca enquanto digita
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
    const submitBtn = screen.querySelector("#submit");
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<span class="spinner"></span>Enviando...';
    state.answers._completedAt = new Date().toISOString();
    save();
    trackEvent("funnel_complete", { indice: window.calcularIndice(state.answers) });
    enviarLead();
    renderLoading();
  });
}

/* Tela de carregamento. Obrigatória entre a captura e o relatório: dá valor
   percebido, cria expectativa, e dá tempo real do lead chegar na planilha
   antes da troca de página. */
function renderLoading() {
  progressEl.hidden = true;
  trackEvent("step_view", { step_id: "loading" });
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const dur = reduce ? 800 : 4700;
  const msgs = [
    "Analisando as suas respostas...",
    `Calculando o seu ${F.indice.nome}...`,
    "Montando a sua leitura personalizada...",
  ];
  const screen = el(`
    <section class="card screen loading-card">
      <p class="eyebrow">Quase lá</p>
      <h2>Preparando a sua leitura</h2>
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
  if (state.started) trackEvent("funnel_abandon", { last_step: state.view });
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
