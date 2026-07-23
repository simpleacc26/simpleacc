
window.FLOW = {
  marca: {
    nome: "Instituto Sabrina Siqueira",
    expert: "Dra. Sabrina Siqueira",
    // Coloque o número no formato internacional, só dígitos (ex: 5533999999999)
    whatsapp: "5533998668858",
    // Texto que abre no WhatsApp (o {nome} é trocado pelo nome do responsável)
    whatsappMsg: "Oi! Sou {nome}, acabei de fazer o diagnóstico no site e quero falar sobre o atendimento do meu filho.",
  },

  hero: {
    selo: "Odontologia humanizada · Governador Valadares e região",
    titulo: "Seu filho merece um dentista que entende de manejo, não só de dente.",
    subtitulo:
      "Responda algumas perguntas rápidas e descubra o caminho certo para o seu filho ter uma relação tranquila e sem trauma com o dentista.",
    tempo: "Leva ~2 minutos · 7 perguntas",
    cta: "Começar",
  },

  
  steps: [
    {
      id: "situacao",
      etapa: "Situação",
      pergunta: "Como são hoje as idas ao dentista do seu filho?",
      options: [
        { value: "nunca", label: "Ele nunca foi, tenho receio de como vai reagir" },
        { value: "dificil", label: "Já fomos, mas foi difícil: choro, contenção ou a consulta não rolou" },
        { value: "falta-alguem", label: "Vamos quando dá, mas sinto que falta alguém que entenda ele de verdade" },
        { value: "ja-paciente", label: "Ele já é meu paciente e quero manter o acompanhamento" },
      ],
    },
    {
      id: "problema",
      etapa: "Problema",
      pergunta: "Qual é a maior dificuldade na hora da consulta odontológica hoje?",
      options: [
        { value: "nao-senta", label: "Ele não senta na cadeira / não deixa examinar",
          report: "ele não conseguir sentar na cadeira ou deixar examinar" },
        { value: "ambiente", label: "O ambiente o desregula: barulho, luz, cheiro, espera",
          report: "o ambiente desregular ele, com barulho, luz, cheiro e espera" },
        { value: "sem-manejo", label: "Já encontrei dentista bom, mas nenhum sabe lidar com o comportamento",
          report: "encontrar dentistas bons, mas nenhum que saiba lidar com o comportamento dele" },
        { value: "medo-trauma", label: "Tenho medo de uma experiência ruim criar um trauma que dure anos",
          report: "o medo de uma experiência ruim virar um trauma que dure anos" },
      ],
    },
    {
      id: "implicacao",
      etapa: "Implicação",
      pergunta: "E como isso afeta vocês hoje?",
      options: [
        { value: "saude-de-lado", label: "A saúde bucal dele está sendo deixada de lado por falta de quem atenda",
          report: "a saúde bucal dele ficar em segundo plano por falta de quem atenda" },
        { value: "inseguros", label: "Cada tentativa frustrada deixa ele (e eu) mais inseguros",
          report: "cada tentativa frustrada deixar vocês dois mais inseguros" },
        { value: "gastei", label: "Já rodei vários consultórios e gastei sem resolver",
          report: "já ter rodado vários consultórios e gasto sem resolver" },
        { value: "improviso", label: "Vivo no improviso, sem um acompanhamento de verdade",
          report: "viver no improviso, sem um acompanhamento de verdade" },
      ],
    },
    {
      id: "necessidade",
      etapa: "O que já tentou",
      pergunta: "O que você já tentou para resolver isso?",
      options: [
        { value: "comum", label: "Levei em dentista comum, mas não soube fazer o manejo",
          report: "levar em dentista comum, que não soube fazer o manejo" },
        { value: "plano", label: "Tentei dentista de plano, mas indicaram sedação ou contenção como única saída",
          report: "tentar dentista de plano, que indicou sedação ou contenção como única saída" },
        { value: "adiei", label: "Adiei porque não achei ninguém de confiança na região",
          report: "adiar por não achar ninguém de confiança na região" },
        { value: "pesquisando", label: "Ainda não tentei, estou pesquisando agora",
          report: "começar a pesquisar agora por alguém de confiança" },
      ],
    },
    {
      id: "objetivo",
      etapa: "Objetivo",
      pergunta: "O que você mais deseja para a relação do seu filho com o dentista?",
      options: [
        { value: "sem-trauma", label: "Que ele consiga ser atendido sem trauma e sem contenção",
          report: "ser atendido sem trauma e sem contenção" },
        { value: "sozinho", label: "Que um dia ele entre sozinho e tranquilo na cadeira",
          report: "um dia entrar sozinho e tranquilo na cadeira" },
        { value: "referencia", label: "Ter um dentista de referência, que conhece ele e a rotina dele",
          report: "ter um dentista de referência, que conheça ele e a rotina dele" },
        { value: "acompanhamento", label: "Manter a saúde bucal em dia com acompanhamento contínuo",
          report: "manter a saúde bucal em dia com acompanhamento contínuo" },
      ],
    },
    {
      id: "perfil",
      etapa: "Perfil",
      pergunta: "Me conta um pouco sobre seu filho:",
      options: [
        { value: "autista", label: "Autista (com ou sem diagnóstico fechado)" },
        { value: "tdah", label: "TDAH / outra neurodivergência" },
        { value: "investigacao", label: "Em investigação / aguardando diagnóstico" },
        { value: "ansiosa", label: "Criança típica, mas muito ansiosa/medrosa com dentista" },
      ],
    },
    {
      id: "qualificacao",
      etapa: "Onde vocês ficam",
      pergunta: "De onde vocês são? Atendemos Governador Valadares e região.",
      options: [
        { value: "valadares", label: "Governador Valadares" },
        { value: "vizinha", label: "Cidade vizinha (até ~1h30 de Valadares)" },
        { value: "longe-ok", label: "Mais distante, mas o deslocamento não é problema pra nós" },
        { value: "outra", label: "Outra região", foraDeArea: true },
      ],
    },
  ],

  captura: {
    titulo: "Seu diagnóstico está pronto. 💛",
    subtitulo:
      "Pra onde enviamos? Deixe seu WhatsApp que a equipe da Dra. Sabrina te manda o diagnóstico do seu filho e os próximos passos, sem compromisso.",
    campos: [
      { id: "nomeResp", label: "Seu nome", type: "text", required: true, autocomplete: "name", placeholder: "Como podemos te chamar?" },
      { id: "whatsapp", label: "Seu WhatsApp (com DDD)", type: "tel", required: true, autocomplete: "tel", placeholder: "(33) 99999-9999", mask: "phone" },
      { id: "email", label: "Seu e-mail", type: "email", required: true, autocomplete: "email", placeholder: "voce@email.com" },
    ],
    cta: "Ver meu diagnóstico agora",
    privacidade: "🔒 Usamos seus dados só para te enviar o diagnóstico e o contato do consultório. Nada de spam.",
  },
};




const TRACKING_CONFIG = { ga4_id: "", meta_pixel_id: "", custom_webhook: "" };


const LEADS_ENDPOINT = "https://hook.us2.make.com/frd24epny35fi5d3ddocl448fynuhsvc";


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
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event: name, ...data });
    if (TRACKING_CONFIG.ga4_id && typeof gtag === "function") gtag("event", name, data);
    if (TRACKING_CONFIG.meta_pixel_id && typeof fbq === "function") fbq("trackCustom", name, data);
    if (TRACKING_CONFIG.custom_webhook && navigator.sendBeacon)
      navigator.sendBeacon(TRACKING_CONFIG.custom_webhook, JSON.stringify({ event: name, ...payload }));
  } catch (e) {  }
}


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
    necessidade: label("necessidade"), objetivo: label("objetivo"), perfil: label("perfil"),
    qualificacao: label("qualificacao"), frente: (F.config && F.config.frente) || "Inclusão", origem: document.referrer || location.href,
    ...URL_UTMS,
  };
  try {
    fetch(LEADS_ENDPOINT, { method: "POST", mode: "no-cors",
      headers: { "Content-Type": "text/plain;charset=utf-8" }, body: JSON.stringify(lead) });
  } catch (e) {  }
}

const F = window.FLOW;

const STORE_KEY = (F.config && F.config.storeKey) || "siqueira_funil_inclusao";
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
          : '<span class="hint">Toque na opção que mais combina. Avança sozinho 💛</span>'}
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
    setTimeout(() => { window.location.href = (F.config && F.config.diagnosticoUrl) || "diagnostico.html"; }, 600);
  });
}


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
  banner.querySelector("#resume-no").addEventListener("click", () => { clearSaved(); state = { view: "hero", answers: {}, started: false }; render(); });
}


window.addEventListener("beforeunload", () => {
  if (state.started && state.view !== "captura") trackEvent("funnel_abandon", { last_step: state.view });
});


(function init() {
  trackEvent("page_view", { funil: "inclusao" });
  const saved = loadSaved();
  if (saved && saved.started && !(saved.answers && saved.answers._completedAt)) {
    offerResume(saved);
  } else {
    render();
  }
})();
