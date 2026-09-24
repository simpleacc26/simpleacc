/* ============================================================
   APP. Motor do funil de quiz (render, validacao, score, tracking).
   Compartilhado entre o Quiz A (Killer) e o Quiz B (Score):
   o que muda entre os dois vive inteiro no flow.js.
   Sem dependencias externas.
   Padrao de escrita: nunca usar travessao.
   ============================================================ */

const F = window.FLOW;
const TRACKING_CONFIG = {
  ga4_id: "",
  meta_pixel_id: (F.config && F.config.pixelId) || "",
  custom_webhook: "",
};

/* ---- Mapa de eventos internos -> Meta Pixel ----
   A campanha roda com objetivo LEADS, entao so existe UM evento de conversao:
   "Lead", no envio valido do formulario. Os demais sao custom e servem para
   ler a queda do funil e montar publico de remarketing, nunca para otimizar. */
const META_MAP = {
  funnel_start:    { name: "InitiateCheckout", type: "std" },
  step_complete:   { name: "QuizStep",         type: "custom" },
  captura_view:    { name: "QuizCaptura",      type: "custom" },
  funnel_complete: { name: "Lead",             type: "std" },
};

const LEADS_ENDPOINT = (F.config && F.config.leadsEndpoint) || "";
const STORE_KEY = (F.config && F.config.storeKey) || "funil";

function novoEventId() {
  return "lead-" + Date.now().toString(36) + "-" + Math.random().toString(36).slice(2, 10);
}

/* Advanced matching manual: reenvia o init do Pixel com os dados do lead antes
   do evento Lead. O proprio fbevents.js faz o hash SHA-256 no navegador, nada
   sai daqui em texto puro. PII entra SO aqui, nunca como parametro de evento. */
function pixelAdvancedMatching(a) {
  if (!TRACKING_CONFIG.meta_pixel_id || typeof fbq !== "function") return;
  try {
    const am = { country: "br" };
    const email = String(a.email || "").trim().toLowerCase();
    if (email) am.em = email;
    const d = soDigitosTel(a.whatsapp);
    if (d.length === 11) am.ph = "55" + d;
    const nome = String(a.nomeResp || "").trim().toLowerCase().split(/\s+/).filter(Boolean);
    if (nome[0]) am.fn = nome[0];
    if (nome.length > 1) am.ln = nome[nome.length - 1];
    fbq("init", TRACKING_CONFIG.meta_pixel_id, am);
  } catch (e) { /* tracking nunca quebra o funil */ }
}

/* UTMs capturadas no carregamento. utm_id entra tambem: e o unico
   identificador estavel quando o nome da campanha muda no gerenciador. */
function getUTMs() {
  const p = new URLSearchParams(location.search);
  return {
    utm_source: p.get("utm_source") || "",
    utm_medium: p.get("utm_medium") || "",
    utm_campaign: p.get("utm_campaign") || "",
    utm_content: p.get("utm_content") || "",
    utm_term: p.get("utm_term") || "",
    utm_id: p.get("utm_id") || "",
  };
}
const URL_UTMS = getUTMs();

function trackEvent(name, data = {}, opts = {}) {
  console.log(`[TRACK] ${name}`, { ...data, ts: Date.now() });
  try {
    if (TRACKING_CONFIG.ga4_id && typeof gtag === "function") gtag("event", name, data);
    if (TRACKING_CONFIG.meta_pixel_id && typeof fbq === "function") {
      const m = META_MAP[name];
      if (m) {
        const verbo = m.type === "custom" ? "trackCustom" : "track";
        if (opts.eventID) fbq(verbo, m.name, data, { eventID: opts.eventID });
        else fbq(verbo, m.name, data);
      }
    }
  } catch (e) { /* tracking nunca quebra o funil */ }
}

function dataHoraBR() {
  try {
    const tz = { timeZone: "America/Sao_Paulo" };
    const d = new Date();
    return d.toLocaleDateString("pt-BR", tz) + " " + d.toLocaleTimeString("pt-BR", tz);
  } catch (e) { return new Date().toISOString(); }
}

/* ---------- telefone ----------
   Autofill do iPhone entrega "+55 11 99991-2039" de uma vez. Tira o codigo do
   pais ANTES de cortar, senao o 55 entra como DDD e empurra o numero todo. */
function soDigitosTel(v) {
  let d = String(v || "").replace(/\D/g, "");
  if (d.length > 11 && d.startsWith("55")) d = d.slice(2);
  return d.slice(0, 11);
}
function fmtTel(v) {
  const d = soDigitosTel(v);
  if (d.length <= 2) return d ? "(" + d : "";
  if (d.length <= 7) return "(" + d.slice(0, 2) + ") " + d.slice(2);
  return "(" + d.slice(0, 2) + ") " + d.slice(2, 7) + "-" + d.slice(7);
}
function celularValido(v) {
  const d = soDigitosTel(v);
  return d.length === 11 && d[2] === "9" && Number(d.slice(0, 2)) >= 11;
}

/* ---------- qualificacao ----------
   Tres faixas, nao duas. Quem esta abaixo do corte de ICP sai pelo produto de
   entrada em vez de receber o mesmo texto de quem esta pronto. */
function classificarLead(a) {
  const fat = a.faturamento;
  if (fat === "ate15" || fat === "15a30") return "entrada";
  return "qualificado";
}

/* ---------- score (so o Quiz B usa) ----------
   Soma os pesos das perguntas de diagnostico e normaliza em 0 a 100.
   Perguntas sem 'peso' no flow.js simplesmente nao entram na conta. */
function calcularIndice(a) {
  let soma = 0, maximo = 0;
  F.steps.forEach((s) => {
    if (!s.peso) return;
    const max = Math.max(...s.options.map((o) => Number(o.peso) || 0));
    maximo += max;
    const esc = s.options.find((o) => o.value === a[s.id]);
    if (esc) soma += Number(esc.peso) || 0;
  });
  if (!maximo) return null;
  return Math.round((soma / maximo) * 100);
}

/* Envia o lead pro webhook do Make. Fire-and-forget com keepalive: sobrevive
   ao redirect para o diagnostico e nunca trava o fluxo do lead.
   application/json de verdade: com text/plain o Make aceita e grava linha
   vazia, sem erro nenhum na tela. */
function enviarLead() {
  if (!LEADS_ENDPOINT) return;
  const a = state.answers;
  const label = (stepId) => {
    const s = F.steps.find((x) => x.id === stepId);
    const o = s && s.options.find((op) => op.value === a[stepId]);
    return o ? o.label : "";
  };
  const respostas = {};
  F.steps.forEach((s, i) => { respostas["q" + (i + 1)] = label(s.id); });

  const lead = {
    quiz: (F.config && F.config.quizId) || "",
    name: a.nomeResp || "",
    email: a.email || "",
    whatsapp: a.whatsapp || "",
    qualificacao: classificarLead(a),
    indice: calcularIndice(a),
    answers: respostas,
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
      method: "POST",
      keepalive: true,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(lead),
    });
  } catch (e) { /* nao bloqueia o lead */ }
}

/* ============================================================
   ESTADO E TELAS
   ============================================================ */
const app = document.getElementById("app");
const progressEl = document.getElementById("progress");
let state = { view: 0, answers: {}, started: false };
let stepEnterTime = 0;

function save() { try { sessionStorage.setItem(STORE_KEY, JSON.stringify(state)); } catch (e) {} }
function el(html) { const t = document.createElement("template"); t.innerHTML = html.trim(); return t.content.firstElementChild; }
function scrollTop() { window.scrollTo({ top: 0, behavior: "smooth" }); }

/* A barra some na tela 1. "0%" na chegada desanima em vez de orientar, e o
   espaco dela e exatamente o que faz a primeira alternativa cair abaixo da
   dobra no celular. Ela entra a partir da tela 2. */
function updateProgress(stepIdx) {
  const total = F.steps.length;
  if (stepIdx === 0) { progressEl.hidden = true; return; }
  const pct = Math.round((stepIdx / total) * 100);
  progressEl.hidden = false;
  document.getElementById("progress-label").textContent =
    stepIdx === total - 1 ? "Última pergunta" : "Quase lá";
  document.getElementById("progress-pct").textContent = `${pct}%`;
  document.getElementById("progress-bar").style.width = `${pct}%`;
}

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

  /* Só a tela 1 leva hero. Da tela 2 em diante começa direto na pergunta:
     rótulo de etapa repetido deixa o quiz com cara de formulário. */
  const intro = i === 0 ? `
      <h1>${F.hero.titulo}</h1>
      <p class="lead">${F.hero.subtitulo}</p>` : "";

  const screen = el(`
    <section class="card screen${i === 0 ? " first" : ""}">
      ${intro}
      <h2 id="q-${step.id}"${i === 0 ? ' class="q1"' : ""}>${step.pergunta}</h2>
      <div class="options" role="radiogroup" aria-labelledby="q-${step.id}">${opts}</div>
      <div class="actions">
        ${i > 0
          ? '<button class="btn btn-ghost" id="back" type="button">← Voltar</button>'
          : `<span class="hint">${F.hero.tempo}</span>`}
      </div>
    </section>`);
  app.replaceChildren(screen);
  if (i > 0) scrollTop();

  const optionEls = [...screen.querySelectorAll(".opt")];
  let advancing = false;
  function choose(node) {
    if (advancing) return;
    optionEls.forEach((o) => { o.setAttribute("aria-checked", "false"); o.tabIndex = -1; });
    node.setAttribute("aria-checked", "true"); node.tabIndex = 0;
    state.answers[step.id] = node.dataset.value;
    save();
    if (!state.started) { state.started = true; trackEvent("funnel_start", {}); }
    trackEvent("step_complete", {
      step_id: step.id, step_number: i + 1,
      total_steps: F.steps.length, time_on_step: Date.now() - stepEnterTime,
    });
    advancing = true;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setTimeout(() => {
      (i < F.steps.length - 1) ? goToStep(i + 1) : renderCaptura();
    }, reduce ? 0 : 280);
  }
  optionEls.forEach((node, idx) => {
    node.addEventListener("click", () => choose(node));
    node.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") { e.preventDefault(); choose(node); }
      if (e.key === "ArrowDown" || e.key === "ArrowRight") { e.preventDefault(); optionEls[(idx + 1) % optionEls.length].focus(); }
      if (e.key === "ArrowUp" || e.key === "ArrowLeft") { e.preventDefault(); optionEls[(idx - 1 + optionEls.length) % optionEls.length].focus(); }
    });
  });

  if (i > 0) screen.querySelector("#back").addEventListener("click", () => goToStep(i - 1));
}

function renderCaptura() {
  const c = F.captura;
  /* A barra fica, marcando 100%. Tirar o progresso justamente na tela de maior
     atrito remove o unico sinal de "acabou, falta um passo". */
  progressEl.hidden = false;
  document.getElementById("progress-label").textContent = "Pronto";
  document.getElementById("progress-pct").textContent = "100%";
  document.getElementById("progress-bar").style.width = "100%";

  trackEvent("step_view", { step_id: "captura" });
  trackEvent("captura_view", {
    content_name: "Formulario diagnostico",
    lead_qualificacao: classificarLead(state.answers),
  });

  const fields = c.campos.map((f) => `
    <div class="field">
      <label for="${f.id}">${f.label}</label>
      <input id="${f.id}" name="${f.id}" type="${f.type}" autocomplete="${f.autocomplete}"
             placeholder="${f.placeholder}"
             value="${state.answers[f.id] ? String(state.answers[f.id]).replace(/"/g, "&quot;") : ""}"
             aria-required="true" aria-describedby="${f.id}-err" />
      <p class="err-msg" id="${f.id}-err"></p>
    </div>`).join("");

  const screen = el(`
    <section class="card screen">
      <p class="eyebrow">${c.eyebrow}</p>
      <h2>${c.titulo}</h2>
      <p class="lead">${c.subtitulo}</p>
      <div class="errors" id="err" role="alert" aria-live="assertive"></div>
      <form id="form" novalidate>
        ${fields}
        <div class="actions actions-form">
          <button class="btn btn-ghost" id="back" type="button">← Voltar</button>
          <button class="btn btn-primary" id="submit" type="submit">${c.cta}</button>
        </div>
        <p class="hint privacidade">${c.privacidade}</p>
      </form>
    </section>`);
  app.replaceChildren(screen);
  scrollTop();

  c.campos.filter((f) => f.mask === "phone").forEach((f) => {
    const input = screen.querySelector(`#${f.id}`);
    if (!input) return;
    input.inputMode = "numeric";
    input.removeAttribute("maxlength");
    if (input.value) input.value = fmtTel(input.value);
    ["input", "change", "blur"].forEach((ev) =>
      input.addEventListener(ev, () => { input.value = fmtTel(input.value); }));
  });

  screen.querySelector("#back").addEventListener("click", () => goToStep(F.steps.length - 1));

  screen.querySelector("#form").addEventListener("submit", (e) => {
    e.preventDefault();
    const errBox = screen.querySelector("#err");
    errBox.classList.remove("show");
    const problems = [];
    c.campos.forEach((f) => {
      const input = screen.querySelector(`#${f.id}`);
      const msg = screen.querySelector(`#${f.id}-err`);
      const val = input.value.trim();
      let problem = "";
      if (!val) problem = "Esse campo é obrigatório.";
      else if (f.type === "tel" && !celularValido(val)) problem = "Confira o WhatsApp: DDD e 9 dígitos, sem o +55.";
      else if (f.type === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) problem = "Informe um e-mail válido.";
      if (problem) {
        problems.push(f.label);
        input.setAttribute("aria-invalid", "true");
        msg.textContent = problem; msg.classList.add("show");
      } else {
        input.removeAttribute("aria-invalid"); msg.classList.remove("show");
        state.answers[f.id] = (f.type === "tel") ? fmtTel(val) : val;
      }
    });
    if (problems.length) {
      errBox.textContent = "Confira os campos: " + problems.join(", ") + ".";
      errBox.classList.add("show");
      trackEvent("field_error", { step_id: "captura", fields: problems });
      return;
    }

    const submitBtn = screen.querySelector("#submit");
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<span class="spinner"></span>Preparando';
    state.answers._completedAt = new Date().toISOString();
    state.answers._indice = calcularIndice(state.answers);

    /* CONVERSAO. Guarda de disparo unico: se o submit rodar duas vezes por
       qualquer motivo, o Meta recebe um lead so. Nenhum dado pessoal vai como
       parametro de evento (politica do Meta): nome, e-mail e telefone entram
       apenas pelo advanced matching, ja hasheados pelo proprio pixel. */
    const qualificacao = classificarLead(state.answers);
    if (!state.answers._leadEventId) {
      state.answers._leadEventId = novoEventId();
      save();
      pixelAdvancedMatching(state.answers);
      trackEvent("funnel_complete", {
        content_name: (F.config && F.config.quizNome) || "Diagnostico",
        content_category: qualificacao,
        lead_qualificacao: qualificacao,
        faturamento: state.answers.faturamento || "",
        quiz: (F.config && F.config.quizId) || "",
        ...URL_UTMS,
      }, { eventID: state.answers._leadEventId });
    } else {
      save();
    }

    enviarLead();
    progressEl.hidden = true;
    const dest = (F.config && F.config.diagnosticoUrl) || "diagnostico.html";
    setTimeout(() => { window.location.href = dest; }, 400);
  });
}

function goToStep(i) { state.view = i; save(); renderStep(i); }

/* ---------- start ----------
   Sem banner de "continuar de onde parou": quem clica no anuncio uma segunda
   vez caia nele em vez de cair no quiz, e com frequencia acima de 1 isso
   acontece todo dia. Recomecar e sempre a experiencia certa para trafego pago. */
(function init() {
  trackEvent("page_view", { quiz: (F.config && F.config.quizId) || "" });
  try { sessionStorage.removeItem(STORE_KEY); } catch (e) {}
  renderStep(0);
})();
