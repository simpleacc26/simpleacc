/* ============================================================
   APP. Motor do funil (render, validação, persistência, tracking).
   Sem dependências externas. Funciona abrindo o index.html.
   Estrutura invisível espelhada do quiz de alta conversão da Pâmella,
   no mesmo padrão já ajustado no funil do Felipe Damasceno.
   Padrão de escrita: nunca usar travessões (traço longo).
   ============================================================ */

/* ---- Tracking plugável: preencha os IDs e os eventos vão junto.
   Vazio = só loga no console. ---- */
const TRACKING_CONFIG = { ga4_id: "", meta_pixel_id: "", custom_webhook: "" };

/* Planilha de leads. Webhook do Make que grava na planilha
   "Planilha de Leads - Thaina e Thiago (Diagnóstico do Ciclo) - Simple Acc"
   (ID 1aAl3LvOLWJVAmC64IhvbA4B3reiHTPoi5d2sYWsJap4, aba "Untitled"),
   cenário "[Thaina e Thiago] Diagnóstico do Ciclo → Sheets" (id 5917422).
   Vazio = não envia (só salva local + segue pro diagnóstico). */
const LEADS_ENDPOINT = "https://hook.us2.make.com/ihw791qjf1jhlz4es96meisghjvu3313";

/* UTMs capturadas da URL no carregamento e GUARDADAS NA SESSÃO.
   A página do quiz não muda de URL até o envio, então a leitura da URL já
   resolveria o caso normal. O sessionStorage cobre o caso que quebrava: a lead
   recarrega ou volta pelo histórico numa URL sem os parâmetros, aceita o
   "continuar de onde parou" e o lead cairia na planilha sem origem nenhuma.
   Regra: se a URL tem UTM, ela manda e é regravada. Se não tem, usa a guardada. */
const UTM_KEY = (((window.FLOW || {}).config || {}).storeKey || "funil") + "_utms";
function getUTMs() {
  const p = new URLSearchParams(location.search);
  const daUrl = {
    utm_source: p.get("utm_source") || "", utm_medium: p.get("utm_medium") || "",
    utm_campaign: p.get("utm_campaign") || "", utm_content: p.get("utm_content") || "",
    utm_term: p.get("utm_term") || "",
  };
  try {
    if (Object.values(daUrl).some((v) => v)) {
      sessionStorage.setItem(UTM_KEY, JSON.stringify(daUrl));
      return daUrl;
    }
    const salvo = JSON.parse(sessionStorage.getItem(UTM_KEY));
    if (salvo) return { ...daUrl, ...salvo };
  } catch (e) { /* sessionStorage bloqueado: segue com o que veio da URL */ }
  return daUrl;
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

/* Classifica o lead pela regra de segmentação da estratégia:
   - fora:        casada ou em relação fixa SEM indicar falta de valorização
   - nutrir:      "não neste momento, quero só entender melhor"
   - fila-quente: prontidão a ou b (prioridade máxima de atendimento)
   - qualificado: o resto ("só dependendo do valor"), atender com o 12x na conversa */
function classificarLead(a) {
  if (a.perfil === "casada" && a.situacao !== "sem-valor") return "fora";
  if (a.prontidao === "depois") return "nutrir";
  if (a.prontidao === "prioridade" || a.prontidao === "se-funciona") return "fila-quente";
  return "qualificado";
}

/* Nome do padrão, tirado da resposta de reação (elo 2). É o que a mulher vê no
   topo do relatório e o que vai na mensagem do WhatsApp. */
function padraoDoLead(a) {
  const step = window.FLOW.steps.find((s) => s.id === "reacao");
  const opt = step && step.options.find((o) => o.value === a.reacao);
  return (opt && opt.padrao) || "Ciclo da Migalha";
}

/* Envia o lead pra planilha. Manda as respostas já em texto legível.
   Fire-and-forget: nunca trava o fluxo do lead. */
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
    nome: a.nomeResp || "", whatsapp: fmt(a.whatsapp || ""), email: a.email || "",
    situacao: label("situacao"), gatilho: label("gatilho"), reacao: label("reacao"),
    tempo: label("tempo"), implicacao: label("implicacao"), tentativas: label("tentativas"),
    objetivo: label("objetivo"), perfil: label("perfil"), prontidao: label("prontidao"),
    padrao: padraoDoLead(a),
    classificacao: classificarLead(a),
    frente: (F.config && F.config.frente) || "Mulher que Escolhe",
    origem: document.referrer || location.href,
    ...URL_UTMS,
  };
  // application/json de propósito: com text/plain o webhook do Make não parseia
  // o corpo e a linha cai vazia na planilha.
  try {
    fetch(LEADS_ENDPOINT, { method: "POST", keepalive: true,
      headers: { "Content-Type": "application/json" }, body: JSON.stringify(lead) })
      .catch(() => { /* não bloqueia o lead */ });
  } catch (e) { /* não bloqueia o lead */ }
}

const F = window.FLOW;
const STORE_KEY = (F.config && F.config.storeKey) || "thaina_diagnostico_ciclo";
const app = document.getElementById("app");
const progressEl = document.getElementById("progress");

let state = { view: 0, answers: {}, started: false };
let stepEnterTime = 0;

/* ---------- persistência ---------- */
function save() { try { sessionStorage.setItem(STORE_KEY, JSON.stringify(state)); } catch (e) {} }
function loadSaved() { try { return JSON.parse(sessionStorage.getItem(STORE_KEY)); } catch (e) { return null; } }
function clearSaved() { try { sessionStorage.removeItem(STORE_KEY); } catch (e) {} }

/* ---------- helpers ---------- */
/* ---------- telefone ----------
   BUG REAL DE PRODUÇÃO (13/08): o autofill do iPhone, principalmente quando a
   lead vem do navegador do Instagram, preenche o telefone em formato
   internacional (+55 ...). O código do país entrava como se fosse DDD e o final
   do número se perdia: chegavam na planilha coisas como "(55) 19991-2039".
   Aqui o 55 sai antes de qualquer corte. */
function soDigitos(v) {
  let d = String(v || "").replace(/\D/g, "");
  if (d.length > 11 && d.startsWith("55")) d = d.slice(2);   // tira o país
  return d.slice(0, 11);
}
function fmt(v) {
  const d = soDigitos(v);
  if (d.length <= 2) return d ? "(" + d : "";
  if (d.length <= 7) return "(" + d.slice(0, 2) + ") " + d.slice(2);
  return "(" + d.slice(0, 2) + ") " + d.slice(2, 7) + "-" + d.slice(7);
}
/* Celular brasileiro: 11 dígitos, DDD de 11 a 99 e o nono dígito sempre 9. */
function celularValido(v) {
  const d = soDigitos(v);
  return d.length === 11 && d[2] === "9" && Number(d.slice(0, 2)) >= 11;
}

function el(html) { const t = document.createElement("template"); t.innerHTML = html.trim(); return t.content.firstElementChild; }
function scrollTop() { window.scrollTo({ top: 0, behavior: "smooth" }); }

/* Só a barra, sem número nenhum: contador "Pergunta X de N" e percentual fazem
   o quiz parecer longo e medido, e derrubam a conclusão. */
function updateProgress(stepIdx) {
  const pct = Math.round((stepIdx / F.steps.length) * 100);
  progressEl.hidden = false;
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

  // Só a 1ª tela tem título e subtítulo. As demais começam direto na pergunta
  // (sem rótulo de etapa em cima), como no quiz da Pâmella.
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
    /* Sem maxLength de propósito. O autofill escreve o valor cru ANTES da
       máscara rodar: um maxLength curto cortava "+55 11 99991-2039" no meio e
       o final do número se perdia. Quem limita é o soDigitos(). */
    input.removeAttribute("maxlength");
    if (input.value) input.value = fmt(input.value);
    /* change e blur cobrem o autofill, que nem sempre dispara 'input'. */
    ["input", "change", "blur"].forEach((ev) =>
      input.addEventListener(ev, () => { input.value = fmt(input.value); }));
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
    trackEvent("funnel_complete", { classificacao: classificarLead(state.answers), padrao: padraoDoLead(state.answers) });
    enviarLead();
    renderLoading();
  });
}

/* Tela de "preparando o diagnóstico": barra que enche + mensagens, depois
   redireciona. O tempo extra também garante a entrega do lead antes da troca
   de página. */
function renderLoading() {
  progressEl.hidden = true;
  trackEvent("step_view", { step_id: "loading" });
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const dur = reduce ? 800 : 4700;
  const msgs = [
    "Lendo as suas respostas...",
    "Calculando o seu ICM, o Índice do Ciclo da Migalha...",
    "Montando o seu Diagnóstico do Ciclo personalizado...",
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
  trackEvent("page_view", { funil: (F.config && F.config.funil) || "ciclo-da-migalha" });
  const saved = loadSaved();
  if (saved && saved.started && !(saved.answers && saved.answers._completedAt)) {
    offerResume(saved);
  } else {
    render();
  }
})();
