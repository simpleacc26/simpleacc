/* ============================================================
   APP. Motor do funil (render, validação, persistência, tracking).
   Cliente: Thiago Menegão · Protocolo PRIMAL PITCH.
   Sem dependências externas. Nunca usar travessões. Sem emoji.

   O que este motor tem a mais que a base da casa:
   1. TELAS DE CARREGAMENTO SIMULADAS no meio do quiz (F.intersticiais), no
      modelo da referência do Daniel: cada uma carrega um argumento e a barra
      cresce de 0 a 100 antes de avançar sozinha.
   2. Cálculo do IIC (Índice de Inversão de Camada) e da afinidade com as
      quatro travas, tudo a partir dos pesos do flow.js.
   3. A CONTA: quanto ficou na mesa nos últimos 12 meses, calculada com o
      volume de reuniões e o ticket que a própria pessoa informou.
   4. Não existe classificação que barre ninguém. Este funil vende um produto
      de R$ 2 mil, e todo mundo que conclui recebe a oferta. A segmentação
      serve para calibrar o argumento e para marcar, na planilha, o perfil de
      topo que interessa ao que o Thiago já vende caro.
   ============================================================ */

/* PENDENTE antes de subir mídia: ID do Pixel da Meta desta conta.
   O mesmo ID precisa ir no <script> do index.html E do diagnostico.html. */
const TRACKING_CONFIG = { ga4_id: "", meta_pixel_id: "", custom_webhook: "" };

/* PENDENTE: webhook do Make que grava o lead na planilha do Drive do cliente.
   Vazio = não envia. Depois de ligar, TESTE PELO NAVEGADOR respondendo o quiz
   inteiro e confira LENDO A PLANILHA. Testar com curl não testa este caminho. */
const LEADS_ENDPOINT = "";

function metaPadrao(evento, params) {
  if (!TRACKING_CONFIG.meta_pixel_id || typeof fbq !== "function") return;
  try { fbq("track", evento, params || {}); } catch (e) { /* nunca quebra o funil */ }
}

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
const reduzMovimento = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

let state = { view: 0, answers: {}, started: false };
let stepEnterTime = 0;

/* ============================================================
   MOTOR DE DIAGNÓSTICO
   Vive em motor.js, carregado antes deste arquivo e compartilhado com a página
   de diagnóstico. Fonte única: mexer no cálculo é mexer em um lugar só.
   ============================================================ */
const { calcularIIC, travaDominante, calcularConta, segmentoLead, fmtBRL,
        fmtTel, celularValido } = window.PRIMAL;


/* ---------- envio do lead ---------- */
function enviarLead() {
  if (!LEADS_ENDPOINT) return;
  const a = state.answers;
  const label = (stepId) => {
    const s = F.steps.find((x) => x.id === stepId);
    const o = s && s.options.find((op) => op.value === a[stepId]);
    return o ? o.label : "";
  };
  const iic = calcularIIC(a);
  const conta = calcularConta(a);
  const lead = {
    timestamp: dataHoraBR(),
    nome: a.nomeResp || "",
    whatsapp: fmtTel(a.whatsapp || ""),
    email: a.email || "",
    oquevende: a.oquevende || "",
    iic: iic.pct + "%",
    iic_faixa: iic.faixa,
    trava: F.travas[travaDominante(a)].nome,
    segmento: segmentoLead(a),
    conta_anual: conta ? fmtBRL(conta.anual) : "",
    origem_reunioes: label("origem"),
    padrao_de_perda: label("perda"),
    momento_da_perda: label("trava"),
    custo: label("custo"),
    tentativa: label("tentativa"),
    objetivo: label("objetivo"),
    estrutura_comercial: label("estrutura"),
    volume_reunioes: label("conta"),
    ticket: label("ticket"),
    frente: (F.config && F.config.frente) || "Funil",
    origem: document.referrer || "",
    page_url: location.href,
    ...URL_UTMS,
  };
  try {
    /* NUNCA volte a pôr mode:"no-cors" aqui. Nesse modo o navegador descarta
       o header Content-Type: application/json, o POST chega ao Make como
       text/plain, o Make responde 200 "Accepted" e joga fora. Nada aparece na
       planilha e nada aparece como erro: o lead evapora em silêncio.
       keepalive garante que o POST sobreviva ao redirect para o diagnóstico. */
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
function esc(s) { return String(s == null ? "" : s).replace(/[<>&"]/g, (c) => ({ "<": "&lt;", ">": "&gt;", "&": "&amp;", '"': "&quot;" }[c])); }

/* Barra sem número nenhum: nem "Pergunta X de N", nem porcentagem. Número aqui
   faz o quiz parecer longo e medido, e derruba conclusão. */
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
            aria-checked="${selected === o.value ? "true" : "false"}" data-value="${esc(o.value)}">
      <span class="dot" aria-hidden="true"></span>
      <span class="txt">${o.label}</span>
    </button>`).join("");

  /* Só a tela 1 leva hero. Da tela 2 em diante começa direto na pergunta, sem
     rótulo de etapa em cima. O campo `etapa` do flow.js é organização interna
     e planilha, nunca copy de tela. */
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
    optionEls.forEach((o) => { o.setAttribute("aria-checked", "false"); o.tabIndex = -1; });
    node.setAttribute("aria-checked", "true"); node.tabIndex = 0;
    state.answers[step.id] = node.dataset.value;
    save();
    if (!state.started) {
      state.started = true;
      trackEvent("funnel_start", {});
      metaPadrao("ViewContent", { content_name: (F.config && F.config.frente) || "Funil" });
    }
    trackEvent("step_complete", { step_id: step.id, time_on_step: Date.now() - stepEnterTime });
    advancing = true;
    setTimeout(() => { avancarDe(i); }, reduzMovimento() ? 0 : 300);
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

/* Depois de responder, ou entra uma tela de carregamento simulada, ou vai
   direto para a próxima pergunta. Voltar sempre pula o intersticial. */
function avancarDe(i) {
  const step = F.steps[i];
  const inter = (F.intersticiais || []).find((x) => x.after === step.id);
  const proxima = () => (i < F.steps.length - 1) ? goToStep(i + 1) : renderCaptura();
  if (inter) return renderIntersticial(inter, proxima);
  proxima();
}

/* ============================================================
   TELA DE CARREGAMENTO SIMULADA
   Não é espera, é argumento com barra em cima. A barra CRESCE de 0 a 100 e a
   tela avança sozinha no fim: nunca aparece pronta e nunca tem botão.
   Sem porcentagem escrita: número em tela de espera vira contador de paciência.
   ============================================================ */
function renderIntersticial(inter, proxima) {
  progressEl.hidden = true;
  trackEvent("step_view", { step_id: "intersticial_" + inter.id });
  const dur = reduzMovimento() ? 700 : (inter.duracao || 2200);

  /* Quando o intersticial declara `campo`, o token {resposta} no título e no
     texto recebe a resposta que a pessoa acabou de dar, na terceira pessoa.
     Se ela pulou a pergunta, o token cai para o texto de reserva `semResposta`,
     e a tela continua fazendo sentido sem personalização nenhuma. */
  const personalizar = (txt) => {
    if (!txt || txt.indexOf("{resposta}") === -1) return txt;
    let val = inter.semResposta || "";
    if (inter.campo) {
      const s = F.steps.find((x) => x.id === inter.campo);
      const o = s && s.options.find((op) => op.value === state.answers[inter.campo]);
      if (o && o.report) val = o.report;
    }
    /* Os campos `report` são escritos em minúscula para caberem no meio de uma
       frase. Quando o token abre a frase, a primeira letra sobe. */
    return txt.replace(/\{resposta\}/g, (m, pos) =>
      pos === 0 ? val.charAt(0).toUpperCase() + val.slice(1) : val);
  };
  const titulo = personalizar(inter.titulo);
  const texto = personalizar(inter.texto);

  const screen = el(`
    <section class="card screen inter-card">
      <h2 class="inter-titulo">${titulo}</h2>
      <p class="lead inter-texto">${texto}</p>
      <div class="load-track"><div class="load-bar" id="inter-bar"></div></div>
      <p class="hint inter-legenda">${inter.barra}</p>
    </section>`);
  app.replaceChildren(screen);
  scrollTop();

  const bar = screen.querySelector("#inter-bar");
  bar.style.transition = `width ${dur}ms cubic-bezier(.22,.61,.36,1)`;
  requestAnimationFrame(() => { bar.style.width = "100%"; });
  setTimeout(proxima, dur + 220);
}

function renderCaptura() {
  progressEl.hidden = true;
  const c = F.captura;
  trackEvent("step_view", { step_id: "captura" });
  const fields = c.campos.map((f) => `
    <div class="field">
      <label for="${f.id}">${f.label} ${f.required ? '<span class="req" title="obrigatório">*</span>' : '<span class="opt-tag">(opcional)</span>'}</label>
      <input id="${f.id}" name="${f.id}" type="${f.type}" autocomplete="${f.autocomplete}"
             placeholder="${f.placeholder}" value="${state.answers[f.id] ? esc(state.answers[f.id]) : ""}"
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
    /* Sem maxLength: o autofill do iPhone entrega "+55 11 99991-2039" de uma
       vez e um limite curto cortava a string ANTES da máscara rodar. Quem
       limita o tamanho é o soDigitosTel(), depois de tirar o código do país. */
    input.removeAttribute("maxlength");
    if (input.value) input.value = fmtTel(input.value);
    /* "change" e "blur" além de "input": autofill nem sempre dispara "input". */
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
    const iic = calcularIIC(state.answers);
    const trava = travaDominante(state.answers);
    const seg = segmentoLead(state.answers);
    trackEvent("funnel_complete", { iic: iic.pct, faixa: iic.faixa, trava, segmento: seg });
    /* CONVERSÃO. É este o evento que a campanha otimiza.
       NUNCA mande nome, telefone nem e-mail para o Pixel. */
    metaPadrao("Lead", {
      content_name: (F.config && F.config.frente) || "Funil",
      content_category: F.travas[trava].nome,
      iic: iic.pct, faixa: iic.faixa, segmento: seg,
    });
    /* EVENTO POR SEGMENTO. O construtor de Conversão Personalizada da Meta só
       oferece regra por URL, não por parâmetro de evento (testado em 27/08 na
       conta da Luana). Então o parâmetro acima serve para relatório, mas não
       dá para filtrar por ele. A saída é um evento por segmento: evento sempre
       aparece no seletor, parâmetro nem sempre. Assim dá para medir QUALIDADE
       de criativo, não só volume. CamelCase porque a Meta não aceita hífen. */
    const EVENTO_SEGMENTO = {
      "topo": "LeadTopo",
      "ticket-alto": "LeadTicketAlto",
      "ticket-medio": "LeadTicketMedio",
      "ticket-entrada": "LeadTicketEntrada",
    };
    if (EVENTO_SEGMENTO[seg] && TRACKING_CONFIG.meta_pixel_id && typeof fbq === "function") {
      try { fbq("trackCustom", EVENTO_SEGMENTO[seg], { iic: iic.pct, faixa: iic.faixa, trava: F.travas[trava].nome }); }
      catch (e) { /* tracking nunca quebra o funil */ }
    }
    enviarLead();
    renderLoading();
  });
}

/* Tela de carregamento real, entre a captura e o relatório. Item obrigatório
   do blueprint: dá valor percebido, cria expectativa pelo resultado e garante
   tempo real para o lead chegar na planilha antes da troca de página.
   Se o envio falhar, a tela NÃO trava: seguir para o diagnóstico sempre. */
function renderLoading() {
  progressEl.hidden = true;
  trackEvent("step_view", { step_id: "loading" });
  const reduce = reduzMovimento();
  const dur = reduce ? 800 : 4700;
  const msgs = [
    "Lendo as suas respostas.",
    "Localizando em qual das sete etapas a condução escapa.",
    "Montando a sua análise.",
  ];
  const screen = el(`
    <section class="card screen inter-card">
      <p class="eyebrow">Quase lá</p>
      <h2 class="inter-titulo">Preparando o seu diagnóstico</h2>
      <p class="lead inter-texto" id="load-msg">${msgs[0]}</p>
      <div class="load-track"><div class="load-bar" id="load-bar"></div></div>
      <p class="hint inter-legenda">Personalizando com base no que você respondeu.</p>
    </section>`);
  app.replaceChildren(screen);
  scrollTop();

  const bar = screen.querySelector("#load-bar");
  const msgEl = screen.querySelector("#load-msg");
  bar.style.transition = `width ${dur}ms cubic-bezier(.22,.61,.36,1)`;
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
