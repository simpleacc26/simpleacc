/* ============================================================
   APP. Motor do funil (render, validação, persistência, tracking).
   Sem dependências externas. Padrão: nunca usar travessões.

   Base: motor fechado no funil da Luana Isse, com os nomes do índice
   generalizados (calcularIndice, payload "indice"/"indice_faixa"), para o
   próximo funil não precisar renomear nada.

   Pontos que fogem da base da skill, todos intencionais:
   1. A barra de progresso não mostra número nenhum: nem "Pergunta X de N",
      nem porcentagem. Número ali faz o quiz parecer longo e derruba conclusão.
   2. Cálculo do IIM (Índice de Improviso na Construção das Mechas) a partir dos pesos, com os
      pesos calibrados sobre as 1024 combinações (ver nota no flow.js).
   3. Classificação em 4 faixas, não 3: fila-quente, qualificado, nutrir e
      fora. A página mostra 3 CTAs (fila-quente e qualificado compartilham),
      mas a planilha recebe as 4, para priorizar a fila do atendimento.
   ============================================================ */

const TRACKING_CONFIG = { ga4_id: "", meta_pixel_id: "", custom_webhook: "" };

/* Webhook do Make que grava o lead na planilha. Vazio = não envia.
   Cenário: "[Rômulo Heleno] Diagnóstico da Mecha → Sheets" (id 5560422, instantâneo,
   só roda quando chega lead: 2 operações por lead, sem varredura). */
const LEADS_ENDPOINT = "https://hook.us2.make.com/z43xti6urytnu8xomciv1ohozoxd1qfq";

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

function dataHoraBR() {
  try {
    const tz = { timeZone: "America/Sao_Paulo" };
    const d = new Date();
    return d.toLocaleDateString("pt-BR", tz) + " " + d.toLocaleTimeString("pt-BR", tz);
  } catch (e) { return new Date().toISOString(); }
}

const F = window.FLOW;
const STORE_KEY = (F.config && F.config.storeKey) || "funil_quiz";
const app = document.getElementById("app");
const progressEl = document.getElementById("progress");

let state = { view: 0, answers: {}, started: false };
let stepEnterTime = 0;

/* ============================================================
   IIM: Índice de Improviso na Construção das Mechas
   Só as perguntas de diagnóstico pontuam (as que têm peso nas opções).
   Tempo, objetivo e as duas porteiras ficam de fora.
   ============================================================ */
function calcularIndice(answers) {
  let soma = 0, max = 0;
  F.steps.forEach((s) => {
    const pontua = s.options.some((o) => typeof o.peso === "number");
    if (!pontua) return;
    max += Math.max(...s.options.map((o) => o.peso || 0));
    const escolhida = s.options.find((o) => o.value === answers[s.id]);
    if (escolhida && typeof escolhida.peso === "number") soma += escolhida.peso;
  });
  const pct = max ? Math.round((soma / max) * 100) : 0;
  const faixa = pct >= 66 ? "Alto" : (pct >= 33 ? "Médio" : "Baixo");
  return { pct, faixa };
}

/* Pilar onde o improviso está concentrado (vem da pergunta de problema):
   Leitura, Execução, Adaptação ou Posicionamento. */
function pilarDominante(answers) {
  const s = F.steps.find((x) => x.id === "problema");
  const o = s && s.options.find((op) => op.value === answers.problema);
  return (o && o.pilar) || "Execução";
}

/* ============================================================
   TELEFONE. Bug de produção pego no funil da Thaina e herdado como regra: o
   autofill do iPhone entrega "+55 11 99991-2039" de uma vez só, e o código do
   país entrava como se fosse DDD. Chegava na planilha "(55) 11999-9120", com o
   final do número perdido e sem conserto. O 55 sai ANTES de qualquer corte.
   ============================================================ */
function soDigitosTel(v) {
  let d = String(v || "").replace(/\D/g, "");
  if (d.length > 11 && d.startsWith("55")) d = d.slice(2);   // tira o país
  return d.slice(0, 11);
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

/* Resultado nomeado: o que vai no WhatsApp, na planilha e no topo do relatório. */
function resultadoNomeado(answers) {
  const R = F.resultados || {};
  return R[pilarDominante(answers)] || "Mão boa, método nenhum";
}

/* Quatro faixas na planilha, três CTAs na página. A regra de corte cruzada
   mora aqui, no código, e não só no documento de estratégia.
   fila-quente  pronta agora, com ticket de mecha na tabela e improviso alto
   qualificado  entra na sessão do mesmo jeito, só não fura fila
   nutrir       é momento, não é "algo mais barato"
   fora         não atende clientes e não tem previsão de atender
   Diferença para a Luana, de propósito: aqui o corte de caixa é o TICKET
   PRATICADO na mecha, nunca faturamento (regra do documento de estratégia). */
function classificarLead(a) {
  const stepTicket = F.steps.find((s) => s.id === "ticket");
  const optTicket = stepTicket && stepTicket.options.find((o) => o.value === a.ticket);
  if (optTicket && optTicket.fora) return "fora";
  if (a.prontidao === "depois" || a.prontidao === "pesquisando") return "nutrir";
  const ticketBom = ["200a400", "400a700", "acima700"].indexOf(a.ticket) > -1;
  if (a.prontidao === "sim" && ticketBom && calcularIndice(a).pct >= 66) return "fila-quente";
  return "qualificado";
}

/* ---------- envio do lead ---------- */
function enviarLead() {
  if (!LEADS_ENDPOINT) return;
  const a = state.answers;
  const label = (stepId) => {
    const s = F.steps.find((x) => x.id === stepId);
    const o = s && s.options.find((op) => op.value === a[stepId]);
    return o ? o.label : "";
  };
  const indice = calcularIndice(a);
  const lead = {
    timestamp: dataHoraBR(),
    nome: a.nomeResp || "",
    whatsapp: fmtTel(a.whatsapp || ""),
    email: a.email || "",
    instagram: a.instagram || "",
    indice: indice.pct + "%",
    indice_faixa: indice.faixa,
    pilar: pilarDominante(a),
    resultado: resultadoNomeado(a),
    qualificacao: classificarLead(a),
    situacao: label("situacao"),
    problema: label("problema"),
    tempo: label("tempo"),
    impacto: label("impacto"),
    necessidade: label("necessidade"),
    objetivo: label("objetivo"),
    perfil: label("perfil"),
    ticket: label("ticket"),
    prontidao: label("prontidao"),
    frente: (F.config && F.config.frente) || "Funil",
    origem: document.referrer || "",
    page_url: location.href,
    ...URL_UTMS,
  };
  try {
    /* NUNCA volte a pôr mode:"no-cors" aqui. Nesse modo o navegador descarta
       silenciosamente o header Content-Type: application/json (em no-cors só
       passam os três tipos de formulário), o POST chega ao Make como
       text/plain, o Make responde 200 "Accepted" e JOGA FORA. Nada aparece na
       planilha e nada aparece como erro: o lead evapora em silêncio.
       O webhook do Make responde ao preflight (access-control-allow-origin: *
       e allow-headers: content-type), então CORS normal funciona e o
       content-type chega de verdade.
       keepalive garante que o POST sobreviva ao redirect para o diagnóstico.
       TESTE SEMPRE PELO NAVEGADOR, respondendo o quiz de ponta a ponta, e
       confira lendo a planilha. Testar com curl NÃO testa este caminho:
       curl manda o content-type certo e passa mesmo com o bug em pé. */
    fetch(LEADS_ENDPOINT, {
      method: "POST", keepalive: true,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(lead),
    }).catch(() => {});
  } catch (e) { /* nunca bloqueia o lead */ }
}

/* ---------- persistência ---------- */
function save() { try { sessionStorage.setItem(STORE_KEY, JSON.stringify(state)); } catch (e) {} }
function loadSaved() { try { return JSON.parse(sessionStorage.getItem(STORE_KEY)); } catch (e) { return null; } }
function clearSaved() { try { sessionStorage.removeItem(STORE_KEY); } catch (e) {} }

/* ---------- helpers ---------- */
function el(html) { const t = document.createElement("template"); t.innerHTML = html.trim(); return t.content.firstElementChild; }
function scrollTop() { window.scrollTo({ top: 0, behavior: "smooth" }); }

/* Barra sem número nenhum: nem "Pergunta X de N", nem porcentagem. Número
   aqui faz o quiz parecer longo e medido, e derruba conclusão. Só a barra. */
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

  /* Só a tela 1 leva hero. Da tela 2 em diante começa direto na pergunta,
     sem rótulo de etapa em cima (regra do blueprint). */
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

  c.campos.filter((f) => f.mask === "phone").forEach((f) => {
    const input = screen.querySelector(`#${f.id}`);
    if (!input) return;
    input.inputMode = "numeric";
    /* Sem maxLength: o autofill do iPhone entrega "+55 11 99991-2039" de uma vez
       e um limite curto cortava a string ANTES da máscara rodar. Quem limita o
       tamanho é o soDigitosTel(), depois de tirar o código do país. */
    input.removeAttribute("maxlength");
    if (input.value) input.value = fmtTel(input.value);
    /* "change" e "blur" além de "input": preenchimento automático nem sempre
       dispara o evento "input". */
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
    trackEvent("funnel_complete", { indice: calcularIndice(state.answers), qualificacao: classificarLead(state.answers) });
    enviarLead();
    renderLoading();
  });
}

/* Tela de carregamento: item obrigatório do blueprint. Dá valor percebido,
   cria expectativa e garante tempo real para o lead chegar na planilha. */
function renderLoading() {
  progressEl.hidden = true;
  trackEvent("step_view", { step_id: "loading" });
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const dur = reduce ? 800 : 4700;
  /* O nome do índice sai do flow.js, nunca escrito à mão aqui: em 31/08 esta
     tela ficou com o nome antigo depois de um ajuste de copy do cliente,
     porque era a terceira cópia do mesmo texto no projeto. */
  const nomeIndice = (F.config && F.config.indice && F.config.indice.nome) || "índice";
  const msgs = [
    "Analisando as suas respostas...",
    `Calculando o seu ${nomeIndice}...`,
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
  trackEvent("page_view", { funil: (F.config && F.config.frente) || "funil" });
  const saved = loadSaved();
  if (saved && saved.started && !(saved.answers && saved.answers._completedAt)) {
    offerResume(saved);
  } else {
    render();
  }
})();
