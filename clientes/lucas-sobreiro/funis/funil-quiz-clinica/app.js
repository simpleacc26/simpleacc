/* ============================================================
   APP. Motor do funil (render, validação, persistência, tracking).
   Sem dependências externas. Funciona abrindo o index.html.
   Padrão de escrita: nunca usar travessões (traço longo).
   ============================================================ */

/* ---- Tracking plugável: preencha os IDs e os eventos vão junto.
   Vazio = só loga no console. ---- */
const TRACKING_CONFIG = { ga4_id: "", meta_pixel_id: "1096905346357097", custom_webhook: "" };

/* ---- Mapa de eventos internos -> Meta Pixel ----
   A campanha do Lucas roda com objetivo LEADS. Então só existe UM evento de
   conversão: "Lead", e ele dispara no envio válido do formulário (nome, e-mail
   e WhatsApp preenchidos e aprovados na validação). Nada antes disso conta.

   type "std"    = evento padrão do Meta. Aparece na lista de otimização e de
                   conversão do gerenciador. Use com parcimônia.
   type "custom" = trackCustom. Não serve para otimizar, serve para montar
                   público de remarketing e enxergar onde o lead cai fora.

   Eventos internos que NÃO estão aqui (page_view, step_view, step_back,
   field_error, funnel_abandon) ficam só no console/GA4. É de propósito: evento
   demais no Pixel polui o aprendizado da campanha. */
const META_MAP = {
  funnel_start:    { name: "InitiateCheckout", type: "std" },    // começou a responder
  step_complete:   { name: "QuizStep",         type: "custom" }, // avançou uma etapa
  captura_view:    { name: "QuizCaptura",      type: "custom" }, // chegou no formulário
  funnel_complete: { name: "Lead",             type: "std" },    // CONVERSÃO
};

/* ID único por envio. Serve para deduplicar caso um dia entre a API de
   Conversões (CAPI) junto do Pixel: os dois mandam o mesmo eventID e o Meta
   conta um lead só. Fica guardado no state e vai no console. */
function novoEventId() {
  return "lead-" + Date.now().toString(36) + "-" + Math.random().toString(36).slice(2, 10);
}

/* Advanced matching manual. Reenvia o init do Pixel com os dados do lead antes
   do evento Lead: o próprio fbevents.js faz o hash SHA-256 no navegador, nada
   sai daqui em texto puro. Isso sobe a qualidade da correspondência, que é o
   que faz a otimização para Leads achar mais gente parecida com quem converteu.
   Regra da casa: PII entra SÓ aqui, nunca como parâmetro de evento. */
function pixelAdvancedMatching(a) {
  if (!TRACKING_CONFIG.meta_pixel_id || typeof fbq !== "function") return;
  try {
    const am = { country: "br" };
    const email = String(a.email || "").trim().toLowerCase();
    if (email) am.em = email;
    const d = soDigitosTel(a.whatsapp);
    if (d.length === 11) am.ph = "55" + d;                 // E.164 sem o "+"
    const nome = String(a.nomeResp || "").trim().toLowerCase().split(/\s+/).filter(Boolean);
    if (nome[0]) am.fn = nome[0];
    if (nome.length > 1) am.ln = nome[nome.length - 1];
    fbq("init", TRACKING_CONFIG.meta_pixel_id, am);
  } catch (e) { /* tracking nunca quebra o funil */ }
}

/* Planilha de leads via Make (webhook instant → Google Sheets).
   Dispara só quando chega lead; não fica varrendo (não consome crédito à toa).
   Cenário Make: "[Lucas Sobreiro] Funil Clínica → Sheets" (webhook instant ->
   Google Sheets addRow). Planilha de leads (aba "Untitled", colunas A-T).
   Testado ponta a ponta em 23/07/2026 (2 leads gravados com sucesso). */
const LEADS_ENDPOINT = "https://hook.us2.make.com/xiiny36asyfrjgrxfc2el43v6nuciu1l";

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
function trackEvent(name, data = {}, opts = {}) {
  const payload = { ...data, ts: Date.now() };
  console.log(`[TRACK] ${name}`, payload);
  try {
    if (TRACKING_CONFIG.ga4_id && typeof gtag === "function") gtag("event", name, data);
    // Só os eventos mapeados vão pro Pixel (evita ruído e PageView duplicado).
    // Os demais eventos internos ficam só no console/GA4/webhook.
    if (TRACKING_CONFIG.meta_pixel_id && typeof fbq === "function") {
      const m = META_MAP[name];
      if (m) {
        const verbo = m.type === "custom" ? "trackCustom" : "track";
        if (opts.eventID) fbq(verbo, m.name, data, { eventID: opts.eventID });
        else fbq(verbo, m.name, data);
      }
    }
    if (TRACKING_CONFIG.custom_webhook && navigator.sendBeacon)
      navigator.sendBeacon(TRACKING_CONFIG.custom_webhook, JSON.stringify({ event: name, ...payload }));
  } catch (e) { /* tracking nunca quebra o funil */ }
}

/* Data/hora no fuso de Brasília, formato legível: "29/06/2026 09:32:35".
   Força America/Sao_Paulo (não depende do fuso do visitante). */
function dataHoraBR() {
  try {
    const tz = { timeZone: "America/Sao_Paulo" };
    const d = new Date();
    return d.toLocaleDateString("pt-BR", tz) + " " + d.toLocaleTimeString("pt-BR", tz);
  } catch (e) { return new Date().toISOString(); }
}

/* ---------- telefone ----------
   Autofill do iPhone entrega "+55 11 99991-2039" de uma vez. Tira o código do
   país ANTES de cortar, senão o 55 entra como DDD e empurra o número todo. */
function soDigitosTel(v) {
  let d = String(v || "").replace(/\D/g, "");
  if (d.length > 11 && d.startsWith("55")) d = d.slice(2);   // tira o país
  return d.slice(0, 11);                                     // corta DEPOIS
}
function fmtTel(v) {
  const d = soDigitosTel(v);
  if (d.length <= 2) return d ? "(" + d : "";
  if (d.length <= 7) return "(" + d.slice(0, 2) + ") " + d.slice(2);
  return "(" + d.slice(0, 2) + ") " + d.slice(2, 7) + "-" + d.slice(7);
}
/* Celular brasileiro: 11 dígitos, DDD de 11 a 99 e o nono dígito sempre 9.
   O DDD 55 (Santa Maria/RS) é real e continua passando: "55999122039" tem 11
   dígitos, então soDigitosTel() não mexe nele. */
function celularValido(v) {
  const d = soDigitosTel(v);
  return d.length === 11 && d[2] === "9" && Number(d.slice(0, 2)) >= 11;
}

/* Classifica o lead por faturamento e prontidão (mesma régua do diagnóstico).
   Qualifica por intenção, não por pergunta crua de renda. */
function classificarLead(a) {
  if (a.faturamento === "ate15" || a.faturamento === "15a30") return "nutrir";
  if (a.prontidao === "pontual" || a.prontidao === "pesquisando") return "nutrir";
  return "qualificado";
}

/* Envia o lead pro webhook do Make (formato padrão da casa: name/email/
   whatsapp + meta + utms + answers q1..q9). Fire-and-forget: nunca trava o
   fluxo do lead. O Make grava a linha na planilha. */
function enviarLead() {
  if (!LEADS_ENDPOINT) return;
  const a = state.answers;
  const label = (stepId) => {
    const s = F.steps.find((x) => x.id === stepId);
    const o = s && s.options.find((op) => op.value === a[stepId]);
    return o ? o.label : "";
  };
  const lead = {
    name: a.nomeResp || "",
    email: a.email || "",
    whatsapp: a.whatsapp || "",
    qualificacao: classificarLead(a),
    frente: (F.config && F.config.frente) || "Saude",
    answers: {
      q1: label("situacao"), q2: label("problema"), q3: label("tempo"),
      q4: label("impacto"), q5: label("necessidade"), q6: label("objetivo"),
      q7: label("perfil"), q8: label("faturamento"), q9: label("prontidao"),
    },
    utms: URL_UTMS,
    meta: {
      timestamp: dataHoraBR(),
      page_url: location.href,
      referrer: document.referrer || "",
      user_agent: navigator.userAgent || "",
    },
  };
  const body = JSON.stringify(lead);
  try {
    // O webhook do Make só estrutura o lead quando recebe application/json
    // (text/plain não é parseado). O webhook responde CORS, então o navegador
    // pode mandar application/json em modo cors. keepalive garante que o POST
    // sobreviva ao redirect pro diagnóstico (não é cancelado ao trocar de página).
    fetch(LEADS_ENDPOINT, { method: "POST", keepalive: true,
      headers: { "Content-Type": "application/json" }, body });
  } catch (e) { /* não bloqueia o lead */ }
}

const F = window.FLOW;
const STORE_KEY = (F.config && F.config.storeKey) || "lucas_funil_clinica";
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
          ? '<button class="btn btn-ghost" id="back">← Voltar</button>'
          : '<span class="hint">Toque na opção que mais combina. Avança sozinho.</span>'}
      </div>
    </section>`);
  app.replaceChildren(screen);
  scrollTop();

  const optionEls = [...screen.querySelectorAll(".opt")];
  let advancing = false;
  // auto-avanço: escolher já leva pra próxima (maior taxa de conclusão)
  function choose(node) {
    if (advancing) return;
    optionEls.forEach(o => { o.setAttribute("aria-checked", "false"); o.tabIndex = -1; });
    node.setAttribute("aria-checked", "true"); node.tabIndex = 0;
    state.answers[step.id] = node.dataset.value;
    save();
    if (!state.started) { state.started = true; trackEvent("funnel_start", {}); }
    trackEvent("step_complete", { step_id: step.id, step_number: i + 1,
      total_steps: F.steps.length, time_on_step: Date.now() - stepEnterTime });
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
  /* Respondeu o quiz inteiro e chegou no formulário. É o melhor público de
     remarketing do funil: gente quente que ainda não virou lead. */
  trackEvent("captura_view", { content_name: "Formulario diagnostico",
    lead_qualificacao: classificarLead(state.answers) });
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
    // Nunca cortar por maxlength: colar e autofill entregam a string inteira de
    // uma vez, e o corte aconteceria antes da máscara rodar. Quem limita é o
    // soDigitosTel(). O autofill nem sempre dispara "input", daí change e blur.
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
        state.answers[f.id] = (f.mask === "phone" || f.type === "tel") ? fmtTel(val) : val;
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
    submitBtn.innerHTML = '<span class="spinner"></span>Preparando o seu diagnóstico...';
    state.answers._completedAt = new Date().toISOString();

    /* CONVERSÃO. Chegou aqui = passou pela validação dos três campos e clicou
       em enviar. É exatamente o que a campanha de Leads tem que otimizar.
       Guarda de disparo único: se por algum motivo o submit rodar duas vezes,
       o Meta recebe um lead só. */
    const qualificacao = classificarLead(state.answers);
    if (!state.answers._leadEventId) {
      state.answers._leadEventId = novoEventId();
      save();
      pixelAdvancedMatching(state.answers);
      /* Nenhum dado pessoal vai como parâmetro de evento (política do Meta).
         Nome, e-mail e telefone entram só pelo advanced matching, já hasheados
         pelo próprio pixel na função acima. */
      trackEvent("funnel_complete", {
        content_name: "Diagnostico da clinica",
        content_category: qualificacao,          // qualificado | nutrir
        lead_qualificacao: qualificacao,
        faturamento: state.answers.faturamento || "",
        prontidao: state.answers.prontidao || "",
        perfil: state.answers.perfil || "",
        frente: (F.config && F.config.frente) || "saude",
        ...URL_UTMS,
      }, { eventID: state.answers._leadEventId });
    } else {
      save();
    }

    enviarLead();
    irParaDiagnostico();
  });
}

/* Handoff para o diagnóstico. A barra de "preparando" NÃO fica aqui: ela mora
   no diagnostico.html, para terminar exatamente quando o relatório aparece e
   cobrir tambem o carregamento das imagens. Aqui só damos um respiro curto
   para o POST do lead sair (o fetch é keepalive, sobrevive ao redirect de
   qualquer jeito) e trocamos de página. */
function irParaDiagnostico() {
  progressEl.hidden = true;
  const dest = (F.config && F.config.diagnosticoUrl) || "diagnostico.html";
  setTimeout(() => { window.location.href = dest; }, 400);
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
  trackEvent("page_view", { funil: (F.config && F.config.frente) || "saude" });
  const saved = loadSaved();
  if (saved && saved.started && !(saved.answers && saved.answers._completedAt)) {
    offerResume(saved);
  } else {
    render();
  }
})();
