/* ============================================================
   APP — motor do funil (render, validação, persistência, tracking,
   transição de análise, envio de lead). Sem dependências externas.
   ============================================================ */

const TRACKING_CONFIG = { ga4_id: "", meta_pixel_id: "", custom_webhook: "" };

/* Planilha de leads (Google Apps Script). Cole aqui a URL /exec da
   implantação e republique. Vazio = não envia (só salva local e segue). */
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
    nome: a.nomeResp || "", whatsapp: a.whatsapp || "", email: a.email || "",
    contato: label("contato"), estrutura: label("estrutura"), desafio: label("desafio"),
    ticket: label("ticket"), urgencia: label("urgencia"), faturamento: label("faturamento"),
    quer_analise: label("quer-analise"),
    balde: F.getBalde(a), camada: F.getCamada(a),
    frente: "Quiz Saúde", origem: document.referrer || location.href,
    ...URL_UTMS,
  };
  if (!LEADS_ENDPOINT) return;
  try {
    fetch(LEADS_ENDPOINT, { method: "POST", mode: "no-cors", keepalive: true,
      headers: { "Content-Type": "text/plain;charset=utf-8" }, body: JSON.stringify(lead) });
  } catch (e) { /* não bloqueia o lead */ }
}

const STORE_KEY = "magna_quiz_saude";
const F = window.FLOW;
const app = document.getElementById("app");
const progressEl = document.getElementById("progress");
const toastEl = document.getElementById("toast");
const REDUCE = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

let state = { view: 0, answers: {}, started: false };
let stepEnterTime = 0;

function save() { try { sessionStorage.setItem(STORE_KEY, JSON.stringify(state)); } catch (e) {} }
function loadSaved() { try { return JSON.parse(sessionStorage.getItem(STORE_KEY)); } catch (e) { return null; } }
function clearSaved() { try { sessionStorage.removeItem(STORE_KEY); } catch (e) {} }

function el(html) { const t = document.createElement("template"); t.innerHTML = html.trim(); return t.content.firstElementChild; }
function scrollTop() { window.scrollTo({ top: 0, behavior: REDUCE ? "auto" : "smooth" }); }
function vibrar(p) { try { if (navigator.vibrate) navigator.vibrate(p); } catch (e) {} }

/* Ícones em traço fino (SVG inline, herdam a cor do texto). */
const ICON = {
  lupa: '<circle cx="11" cy="11" r="6.5"/><path d="M16 16l4.5 4.5"/>',
  pulso: '<path d="M2.5 12.5h4l2.2-5.5 4 11 2.6-7 1.4 1.5h4.8"/>',
  agenda: '<rect x="3.5" y="5" width="17" height="15.5" rx="2.5"/><path d="M3.5 10h17M8 3v4M16 3v4"/><path d="M8.5 14.5l2 2 4-4"/>',
  grafico: '<path d="M3.5 20h17"/><path d="M5.5 16l4.5-4.5 3.5 3.5 6-6.5"/><path d="M15 8.5h4.5V13"/>',
  diamante: '<path d="M6.5 3.5h11l4 5.5L12 20.5 2.5 9z"/><path d="M2.5 9h19M9.5 3.5 12 20.5l2.5-17"/>',
  selo: '<path d="M12 2.8l2.3 1.6 2.8-.1 1 2.6 2.3 1.6-.8 2.7.8 2.7-2.3 1.6-1 2.6-2.8-.1L12 21.2l-2.3-1.6-2.8.1-1-2.6-2.3-1.6.8-2.7-.8-2.7 2.3-1.6 1-2.6 2.8.1z"/><path d="M8.6 12.2l2.3 2.3 4.6-4.7"/>',
  relogio: '<circle cx="12" cy="12" r="8.5"/><path d="M12 7.5V12l3 2"/>',
  check: '<path d="M6 12.5l4 4 8-9"/>',
};
function icon(name, cls = "ico") {
  return `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICON[name]}</svg>`;
}

let toastTimer = null;
function toast(msg) {
  if (!msg) return;
  toastEl.innerHTML = `${icon("check", "ico toast-ico")}<span>${msg}</span>`;
  toastEl.classList.remove("show"); void toastEl.offsetWidth; toastEl.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toastEl.classList.remove("show"), 2400);
}

function updateProgress(stepIdx) {
  const total = F.steps.length;
  const pct = Math.round((stepIdx / total) * 100);
  const label = stepIdx === total - 1 ? "Última pergunta" : `Pergunta ${stepIdx + 1} de ${total}`;
  /* Na 1ª tela a barra fica oculta (o hero já diz "7 perguntas") para a
     1ª pergunta subir e aparecer na dobra; ela surge ao responder. */
  progressEl.hidden = stepIdx === 0;
  document.getElementById("progress-label").textContent = label;
  document.getElementById("progress-pct").textContent = `${pct}%`;
  document.getElementById("progress-bar").style.width = `${Math.max(pct, 3)}%`;
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
      <span class="opt-key" aria-hidden="true">${String.fromCharCode(65 + idx)}</span>
      <span class="txt">${o.label}</span>
      <span class="opt-check" aria-hidden="true">${icon("check", "ico")}</span>
    </button>`).join("");

  let intro = "";
  if (i === 0) {
    const h = F.hero;
    const titulo = h.titulo.startsWith(h.destaque)
      ? `<em>${h.destaque}</em>${h.titulo.slice(h.destaque.length)}` : h.titulo;
    intro = `
      <header class="hero">
        <span class="selo">${icon("diamante")}${h.selo}</span>
        <h1>${titulo}</h1>
        <p class="lead">${h.subtitulo}</p>
        <p class="hero-meta">${icon("relogio")}${h.tempo}</p>
        <div class="orn" aria-hidden="true"><span></span>${icon("diamante")}<span></span></div>
      </header>`;
  }

  const card = `
    <section class="card${i === 0 ? "" : " screen"}">
      <p class="eyebrow"><span class="step-n">${String(i + 1).padStart(2, "0")}</span>${step.etapa}</p>
      <h2 id="q-${step.id}">${step.pergunta}</h2>
      <div class="options" role="radiogroup" aria-labelledby="q-${step.id}">${opts}</div>
      <div class="actions">
        ${i > 0
          ? '<button class="btn btn-ghost" id="back">← Voltar</button>'
          : '<span class="hint">Toque na opção que mais combina com você. Avança sozinho.</span>'}
      </div>
    </section>`;
  const screen = i === 0 ? el(`<div class="screen-wrap">${intro}${card}</div>`) : el(card);
  app.replaceChildren(screen);
  if (i > 0) scrollTop();

  const optionEls = [...screen.querySelectorAll(".opt")];
  let advancing = false;
  function choose(node) {
    if (advancing) return;
    optionEls.forEach(o => { o.setAttribute("aria-checked", "false"); o.tabIndex = -1; });
    node.setAttribute("aria-checked", "true"); node.tabIndex = 0;
    node.classList.add("chosen");
    vibrar(8);
    state.answers[step.id] = node.dataset.value;
    save();
    if (!state.started) { state.started = true; trackEvent("funnel_start", {}); }
    trackEvent("step_complete", { step_id: step.id, time_on_step: Date.now() - stepEnterTime });
    advancing = true;
    setTimeout(() => {
      if (step.toast) toast(step.toast);
      (i < F.steps.length - 1) ? goToStep(i + 1) : renderCaptura();
    }, REDUCE ? 0 : 420);
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
  const esc = (v) => String(v).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");
  const fields = c.campos.map(f => `
    <div class="field">
      <label for="${f.id}">${f.label} ${f.required ? '<span class="req" aria-hidden="true">*</span>' : '<span class="opt-tag">(opcional)</span>'}</label>
      <input id="${f.id}" name="${f.id}" type="${f.type}" autocomplete="${f.autocomplete}"
             placeholder="${f.placeholder}" value="${state.answers[f.id] ? esc(state.answers[f.id]) : ""}"
             ${f.required ? 'aria-required="true"' : ""} aria-describedby="${f.id}-err" />
      <p class="err-msg" id="${f.id}-err"></p>
    </div>`).join("");

  const total = F.steps.length;
  const screen = el(`
    <section class="card screen">
      <div class="done-badge">${icon("selo")}<span>${total} de ${total} respostas registradas</span></div>
      <h2>${c.titulo}</h2>
      <p class="lead">${c.subtitulo}</p>
      <div class="errors" id="err" role="alert" aria-live="assertive" tabindex="-1"></div>
      <form id="form" novalidate>
        ${fields}
        <button class="btn btn-primary btn-block" id="submit" type="submit"><span>${c.cta}</span>${icon("diamante")}</button>
        <p class="hint privacy">${c.privacidade}</p>
        <div class="actions actions-center">
          <button class="btn btn-ghost" id="back" type="button">← Voltar</button>
        </div>
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
        msg.textContent = problem; msg.classList.add("show");
      } else {
        input.removeAttribute("aria-invalid"); msg.classList.remove("show");
        state.answers[f.id] = val;
      }
    });
    if (problems.length) {
      errBox.textContent = "Confira os campos: " + problems.join(", ") + ".";
      errBox.classList.add("show"); errBox.focus();
      trackEvent("field_error", { step_id: "captura", fields: problems });
      return;
    }
    state.answers._completedAt = new Date().toISOString();
    state.answers._balde = F.getBalde(state.answers);
    state.answers._camada = F.getCamada(state.answers);
    state.view = "analise";
    save();
    trackEvent("funnel_complete", { balde: state.answers._balde, camada: state.answers._camada });
    enviarLead();
    renderAnalisando();
  });
}

/* ============================================================
   TELA DE ANÁLISE — transição dopaminérgica (0→100% em 5s)
   Monitor de "sinais vitais" da clínica, ícone que troca a cada
   etapa, checklist que acende e explosão de brilho no 100%.
   ============================================================ */
function renderAnalisando() {
  progressEl.hidden = true;
  trackEvent("step_view", { step_id: "analisando" });

  const nome = F.primeiroNome(state.answers.nomeResp);
  const etapas = [
    { frase: "Lendo suas respostas" + (nome ? `, ${nome}` : "") + "…", icone: "lupa" },
    { frase: "Medindo os sinais vitais da sua clínica…", icone: "pulso" },
    { frase: "Identificando o que mais trava a sua agenda…", icone: "agenda" },
    { frase: "Cruzando com clínicas que já atendemos…", icone: "grafico" },
    { frase: "Montando o seu diagnóstico personalizado…", icone: "diamante" },
  ];
  const ECG = "M0 34H40l6-6 6 6H70l5 4 7-30 7 38 5-12H110q10-12 20 0H160l6-6 6 6H190l5 4 7-30 7 38 5-12H230q10-12 20 0H300";

  const screen = el(`
    <section class="card screen analise">
      <p class="eyebrow eyebrow-center">Gerando seu diagnóstico</p>
      <div class="medalha" id="an-medalha">
        <span class="medalha-ring" aria-hidden="true"></span>
        <span class="medalha-ico" id="an-icon">${icon(etapas[0].icone)}</span>
        <span class="sparks" id="an-sparks" aria-hidden="true"></span>
      </div>
      <svg class="ecg" viewBox="0 0 300 60" preserveAspectRatio="none" aria-hidden="true">
        <path class="ecg-base" d="${ECG}" />
        <path class="ecg-live" d="${ECG}" pathLength="100" />
      </svg>
      <h2 class="an-frase" id="an-frase">${etapas[0].frase}</h2>
      <div class="an-pct" aria-hidden="true"><span id="an-pct">0</span><small>%</small></div>
      <div class="progress-track an-track" role="progressbar" aria-label="Gerando diagnóstico" aria-valuemin="0" aria-valuemax="100" aria-valuenow="0" id="an-track">
        <div class="progress-bar" id="an-bar"><span class="progress-tip" aria-hidden="true"></span></div>
      </div>
      <ul class="an-checklist" id="an-checklist">
        <li data-at="12"><span class="ck">${icon("check")}</span>Respostas registradas</li>
        <li data-at="38"><span class="ck">${icon("check")}</span>Ponto de maior atenção identificado</li>
        <li data-at="64"><span class="ck">${icon("check")}</span>Comparação com clínicas de alto padrão</li>
        <li data-at="90"><span class="ck">${icon("check")}</span>Diagnóstico personalizado pronto</li>
      </ul>
      <p class="sr-only" aria-live="polite" id="an-live">Analisando suas respostas.</p>
    </section>`);
  app.replaceChildren(screen);
  scrollTop();

  const bar = screen.querySelector("#an-bar");
  const track = screen.querySelector("#an-track");
  const pctEl = screen.querySelector("#an-pct");
  const fraseEl = screen.querySelector("#an-frase");
  const iconEl = screen.querySelector("#an-icon");
  const medalha = screen.querySelector("#an-medalha");
  const sparks = screen.querySelector("#an-sparks");
  const live = screen.querySelector("#an-live");
  const items = [...screen.querySelectorAll("#an-checklist li")];
  const DURATION = REDUCE ? 400 : 5000;
  const start = performance.now();
  let lastIdx = 0;

  function trocarEtapa(idx) {
    fraseEl.classList.remove("in"); void fraseEl.offsetWidth;
    fraseEl.textContent = etapas[idx].frase; fraseEl.classList.add("in");
    iconEl.innerHTML = icon(etapas[idx].icone);
    iconEl.classList.remove("pop"); void iconEl.offsetWidth; iconEl.classList.add("pop");
  }

  function tick(now) {
    const t = Math.min(1, Math.max(0, (now - start) / DURATION));
    const eased = 1 - Math.pow(1 - t, 1.35);
    const pct = Math.min(100, Math.round(eased * 100));
    bar.style.width = pct + "%";
    pctEl.textContent = pct;
    track.setAttribute("aria-valuenow", String(pct));

    const idx = Math.min(etapas.length - 1, Math.floor(t * etapas.length));
    if (idx !== lastIdx) { lastIdx = idx; trocarEtapa(idx); }
    items.forEach((li) => {
      if (pct >= Number(li.dataset.at) && !li.classList.contains("done")) { li.classList.add("done"); vibrar(6); }
    });

    if (t < 1) { requestAnimationFrame(tick); return; }
    concluir();
  }

  function concluir() {
    bar.style.width = "100%"; pctEl.textContent = "100"; track.setAttribute("aria-valuenow", "100");
    items.forEach((li) => li.classList.add("done"));
    fraseEl.textContent = nome ? `${nome}, seu diagnóstico está pronto!` : "Seu diagnóstico está pronto!";
    live.textContent = "Diagnóstico pronto. Abrindo o resultado.";
    iconEl.innerHTML = icon("selo");
    iconEl.classList.remove("pop"); void iconEl.offsetWidth; iconEl.classList.add("pop");
    medalha.classList.add("complete");
    screen.classList.add("is-done");
    if (!REDUCE) {
      sparks.innerHTML = Array.from({ length: 14 }, (_, k) =>
        `<i style="--a:${Math.round((360 / 14) * k)}deg;--d:${64 + (k % 3) * 16}px;--s:${0.7 + (k % 4) * 0.15}"></i>`).join("");
    }
    vibrar([12, 40, 18]);
    setTimeout(() => { window.location.href = "diagnostico.html"; }, REDUCE ? 300 : 1100);
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
    <section class="card screen resume">
      <p class="eyebrow">Bem-vinda de volta</p>
      <h2>Você começou o diagnóstico antes. Quer continuar de onde parou?</h2>
      <div class="actions">
        <button class="btn btn-primary" id="resume-yes">Continuar</button>
        <button class="btn btn-ghost" id="resume-no">Recomeçar</button>
      </div>
    </section>`);
  app.replaceChildren(banner);
  banner.querySelector("#resume-yes").addEventListener("click", () => { state = saved; render(); });
  banner.querySelector("#resume-no").addEventListener("click", () => { clearSaved(); state = { view: 0, answers: {}, started: false }; render(); });
}

window.addEventListener("beforeunload", () => {
  if (state.started && typeof state.view === "number") trackEvent("funnel_abandon", { last_step: state.view });
});

(function init() {
  trackEvent("page_view", { funil: "quiz-magna-saude" });
  const saved = loadSaved();
  if (saved && saved.started && !(saved.answers && saved.answers._completedAt)) {
    offerResume(saved);
  } else {
    render();
  }
})();
