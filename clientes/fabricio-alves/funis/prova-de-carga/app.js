/* Prova de Carga · motor do quiz.
   Render, auto-avanço, telas de implicação, máscara, UTMs, carregamento e envio
   do lead. A copy inteira mora no flow.js; a lógica de leitura, no motor.js. */

(function () {
  "use strict";

  var F = window.FLOW;
  var M = window.MOTOR;
  var STORE_KEY = (F.config && F.config.storeKey) || "fa_prova_de_carga";

  /* Webhook do Make. Preencher para ligar a captação. Ver README. */
  var LEADS_ENDPOINT = "";

  var TRACKING = { ga4_id: "", meta_pixel_id: "" };

  var reduce =
    window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------------------------------------------------------------- estado */
  var telas = construirTelas();
  var idx = 0;
  var state = { answers: {}, lead: null, utms: capturarUtms() };

  var app = document.getElementById("app");
  var progresso = document.getElementById("progresso");

  /* As telas são as perguntas, as implicações e a captura, numa lista só. */
  function construirTelas() {
    var out = [];
    F.steps.forEach(function (s) {
      if (s.implicacao) out.push({ tipo: "implicacao", chave: s.implicacao });
      else out.push({ tipo: "pergunta", step: s });
    });
    out.push({ tipo: "captura" });
    return out;
  }

  function totalPerguntas() {
    return telas.filter(function (t) { return t.tipo === "pergunta"; }).length;
  }

  function perguntasFeitas() {
    var n = 0;
    for (var i = 0; i < idx; i++) if (telas[i].tipo === "pergunta") n++;
    return n;
  }

  /* ------------------------------------------------------------ utilidades */
  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  function capturarUtms() {
    var p = new URLSearchParams(window.location.search), o = {};
    ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"].forEach(function (k) {
      o[k] = p.get(k) || "";
    });
    return o;
  }

  function salvar() {
    try { sessionStorage.setItem(STORE_KEY, JSON.stringify(state)); } catch (e) {}
  }

  function trackEvent(nome) {
    /* PRIVACIDADE: para a Meta vai só o nome do evento, nunca o payload.
       As respostas são dados da operação do lead e não saem daqui. */
    if (TRACKING.meta_pixel_id && typeof window.fbq === "function") {
      window.fbq("trackCustom", nome);
      if (nome === "medicao_concluida") window.fbq("track", "Lead");
    }
    if (TRACKING.ga4_id && typeof window.gtag === "function") {
      window.gtag("event", nome);
    }
  }

  /* ------------------------------------------------------------- progresso */
  function pintarProgresso() {
    var total = totalPerguntas();
    var feitas = perguntasFeitas();
    var pct = Math.min(100, Math.round((feitas / total) * 100));

    var rotulo;
    if (feitas === 0) rotulo = "Começando a medição";
    else if (telas[idx] && telas[idx].tipo === "captura") rotulo = "Medição concluída";
    else if (feitas >= total - 1) rotulo = "Última pergunta";
    else rotulo = "Medição em curso";

    progresso.innerHTML =
      '<div class="progresso-trilho">' +
      '<div class="progresso-feito" style="width:' + pct + '%"></div>' +
      '<div class="progresso-ponto" style="left:' + pct + '%"></div>' +
      "</div>" +
      '<div class="progresso-rotulo">' + rotulo + "</div>";
  }

  /* ----------------------------------------------------------------- render */
  function render() {
    pintarProgresso();
    var t = telas[idx];
    if (t.tipo === "pergunta") return renderPergunta(t.step);
    if (t.tipo === "implicacao") return renderImplicacao(t.chave);
    return renderCaptura();
  }

  function renderPergunta(step) {
    /* Só a primeira tela leva hero. Da segunda em diante começa direto na
       pergunta, sem rótulo de etapa: o campo `papel` do flow.js é organização
       interna e nunca vai para a tela. */
    var primeira = idx === 0;
    var hero = primeira
      ? '<img class="hero-fig" src="' + F.marca.marcaFigura + '" alt="" aria-hidden="true">' +
        '<p class="eyebrow">' + esc(F.hero.eyebrow) + "</p>" +
        "<h1>" + esc(F.hero.titulo) + "</h1>" +
        '<p class="lead">' + esc(F.hero.subtitulo) + "</p>" +
        '<hr class="regua">'
      : "";

    var opcoes = step.opcoes
      .map(function (o) {
        var sel = state.answers[step.id] === o.value;
        return (
          '<button type="button" class="opt" role="radio" aria-checked="' +
          (sel ? "true" : "false") +
          '" data-valor="' + esc(o.value) + '">' + esc(o.label) + "</button>"
        );
      })
      .join("");

    app.innerHTML =
      hero +
      '<h2 class="pergunta">' + esc(step.pergunta) + "</h2>" +
      '<div class="opcoes" role="radiogroup" aria-label="' + esc(step.pergunta) + '">' +
      opcoes +
      "</div>" +
      (idx > 0 ? '<button type="button" class="voltar" data-voltar>Voltar</button>' : "");

    app.querySelectorAll(".opt").forEach(function (b) {
      b.addEventListener("click", function () {
        app.querySelectorAll(".opt").forEach(function (x) { x.setAttribute("aria-checked", "false"); });
        b.setAttribute("aria-checked", "true");
        state.answers[step.id] = b.dataset.valor;
        salvar();
        setTimeout(avancar, reduce ? 0 : 280);
      });
    });

    focarTopo();
  }

  function renderImplicacao(chave) {
    var bloco = F.implicacoes[chave];

    /* A tela de ajustes é condicional ao sintoma percebido na pergunta 5. */
    if (chave === "ajustes") {
      var o = M.opcaoDe(state.answers, "ajuste");
      var variante = (o && o.sintoma) || "geral";
      bloco = { eyebrow: bloco.eyebrow, __v: bloco[variante] || bloco.geral };
      bloco.linhas = bloco.__v.linhas;
      bloco.remate = bloco.__v.remate;
    }

    app.innerHTML =
      '<div class="implicacao">' +
      '<p class="eyebrow">' + esc(bloco.eyebrow) + "</p>" +
      bloco.linhas.map(function (l) { return "<p>" + esc(l) + "</p>"; }).join("") +
      '<p class="remate">' + esc(bloco.remate) + "</p>" +
      '<button type="button" class="seguir" data-seguir>Continuar</button>' +
      "</div>";

    app.querySelector("[data-seguir]").addEventListener("click", avancar);
    focarTopo();
  }

  function renderCaptura() {
    app.innerHTML =
      '<p class="eyebrow">' + esc(F.captura.eyebrow) + "</p>" +
      "<h2>" + esc(F.captura.titulo) + "</h2>" +
      '<p class="lead">' + esc(F.captura.subtitulo) + "</p>" +
      '<form id="form-captura" novalidate>' +
      campo("nome", "Nome", "text", "Como você assina") +
      campo("whatsapp", "WhatsApp", "tel", "(11) 99999-9999") +
      campo("email", "E-mail", "email", "voce@suaoperacao.com.br") +
      '<div class="btn-linha"><button type="submit" class="btn">' +
      esc(F.captura.botao) + "</button></div>" +
      '<p class="btn-micro">' + esc(F.captura.consentimento) + "</p>" +
      "</form>" +
      '<button type="button" class="voltar" data-voltar>Voltar</button>';

    var form = document.getElementById("form-captura");
    var wpp = form.querySelector("#f-whatsapp");
    wpp.addEventListener("input", function () { wpp.value = mascara(wpp.value); });
    form.addEventListener("submit", enviar);
    focarTopo();
  }

  function campo(id, rot, tipo, ph) {
    return (
      '<div class="campo" id="c-' + id + '">' +
      '<label for="f-' + id + '">' + esc(rot) + "</label>" +
      '<input id="f-' + id + '" name="' + id + '" type="' + tipo + '" placeholder="' + esc(ph) +
      '" autocomplete="' + (id === "nome" ? "name" : id === "email" ? "email" : "tel") + '">' +
      '<div class="erro" id="e-' + id + '"></div>' +
      "</div>"
    );
  }

  function mascara(v) {
    var d = v.replace(/\D/g, "").slice(0, 11);
    if (d.length <= 2) return d.length ? "(" + d : "";
    if (d.length <= 6) return "(" + d.slice(0, 2) + ") " + d.slice(2);
    if (d.length <= 10) return "(" + d.slice(0, 2) + ") " + d.slice(2, 6) + "-" + d.slice(6);
    return "(" + d.slice(0, 2) + ") " + d.slice(2, 7) + "-" + d.slice(7);
  }

  /* --------------------------------------------------------------- navegação */
  function avancar() {
    if (idx < telas.length - 1) { idx++; render(); }
  }

  document.addEventListener("click", function (e) {
    var b = e.target.closest && e.target.closest("[data-voltar]");
    if (!b) return;
    if (idx > 0) { idx--; render(); }
  });

  function focarTopo() {
    window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
    var alvo = app.querySelector("h1, h2");
    if (alvo) { alvo.setAttribute("tabindex", "-1"); alvo.focus({ preventScroll: true }); }
  }

  /* ------------------------------------------------------------------ envio */
  function enviar(e) {
    e.preventDefault();
    var nome = document.getElementById("f-nome").value.trim();
    var whatsapp = document.getElementById("f-whatsapp").value.trim();
    var email = document.getElementById("f-email").value.trim();
    var ok = true;

    /* Valida só no envio, nunca enquanto digita. */
    ok = marcar("nome", nome.length >= 2, "Preencha o seu nome.") && ok;
    ok = marcar("whatsapp", whatsapp.replace(/\D/g, "").length >= 10,
      "Preencha o WhatsApp com DDD.") && ok;
    ok = marcar("email", /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email),
      "Preencha um e-mail válido.") && ok;
    if (!ok) return;

    state.lead = { name: nome, whatsapp: whatsapp, email: email };
    salvar();
    trackEvent("medicao_concluida");
    enviarLead();
    renderLoading();
  }

  function marcar(id, valido, msg) {
    var c = document.getElementById("c-" + id);
    document.getElementById("e-" + id).textContent = valido ? "" : msg;
    c.classList.toggle("invalido", !valido);
    return valido;
  }

  function enviarLead() {
    if (!LEADS_ENDPOINT) return;
    var a = state.answers;
    var conta = M.calcularConta(a);
    var eixoId = M.definirEixo(a);
    var sust = M.definirSustentacao(a);
    var sintoma = M.opcaoDe(a, "ajuste");

    var lead = {
      name: state.lead.name,
      whatsapp: state.lead.whatsapp,
      email: state.lead.email,
      eixo: (F.eixos[eixoId] || {}).nome || "",
      sustentacao: (F.sustentacao[sust] || {}).nome || "",
      rota: M.definirRota(a),
      dialeto: M.definirDialeto(a),
      sintoma_percebido: (sintoma && sintoma.sintoma) || "",
      nao_mede: M.naoMede(a) ? "sim" : "nao",
      vazamento_conservador: conta.executavel ? conta.conservadora : "",
      vazamento_realista: conta.executavel ? conta.realista : "",
      answers: a,
      utms: state.utms,
      meta: {
        timestamp: new Date().toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo" }),
        page_url: window.location.href,
        referrer: document.referrer || "",
      },
    };

    /* application/json de verdade: com text/plain o Make responde "Accepted" e
       grava linha vazia, sem erro nenhum na tela. O .catch é obrigatório,
       try/catch não pega promise rejeitada. */
    fetch(LEADS_ENDPOINT, {
      method: "POST",
      keepalive: true,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(lead),
    }).catch(function () {});
  }

  /* ----------------------------------------------------------- carregamento */
  function renderLoading() {
    progresso.innerHTML = "";
    var dur = reduce ? 800 : 4700;
    var msgs = F.loading.mensagens;

    app.innerHTML =
      '<div class="carregando">' +
      '<p class="msg" id="load-msg" role="status">' + esc(msgs[0]) + "</p>" +
      '<div class="trilho"><div class="feito" id="load-feito"></div>' +
      '<div class="ponto" id="load-ponto"></div></div>' +
      "</div>";

    var feito = document.getElementById("load-feito");
    var ponto = document.getElementById("load-ponto");
    var msg = document.getElementById("load-msg");
    var inicio = Date.now();

    requestAnimationFrame(function passo() {
      var p = Math.min(1, (Date.now() - inicio) / dur);
      feito.style.width = p * 100 + "%";
      ponto.style.left = p * 100 + "%";
      var i = Math.min(msgs.length - 1, Math.floor(p * msgs.length));
      if (msg.textContent !== msgs[i]) msg.textContent = msgs[i];
      if (p < 1) requestAnimationFrame(passo);
    });

    setTimeout(function () {
      var destino = M.definirRota(state.answers) === "fora" ? "fora-de-fase.html" : "leitura.html";
      window.location.href = destino;
    }, dur + 350);
  }

  /* ------------------------------------------------------------------ boot */
  render();
})();
