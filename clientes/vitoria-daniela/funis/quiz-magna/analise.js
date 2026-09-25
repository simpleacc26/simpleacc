/* ============================================================
   LP da análise estratégica + VSL
   - Player: código do VTurb (VSL.vturb) OU vídeo hospedado (VSL.src).
     Sem nenhum dos dois, mostra um aviso (não publicar assim).
   - Teste A/B do atraso (pedido da Vitória no doc: "coloque o delay na
     página, 2 min, fazer um a/b disso"):
       A = página inteira visível desde o início
       B = texto, botões e o resto da página só aparecem depois de 2 min
           de vídeo assistido
     A variante fica salva no navegador e vai na mensagem do WhatsApp com
     um texto diferente, para a SDR (e a planilha) saberem de qual veio.
   ============================================================ */
const VSL = {
  vturb: "",                 /* cole aqui o código de incorporação do VTurb */
  src: "",                   /* ou o caminho do vídeo hospedado (mp4) */
  poster: "",
  atrasoSegundos: 120,
};

const F = window.FLOW;
const WHATS_MSG = {
  a: "Oi! {sou}Quero agendar minha análise estratégica.",
  b: "Oi! {sou}Assisti o vídeo e quero agendar minha análise estratégica.",
};

function track(nome, dados = {}) {
  try {
    if (typeof fbq === "function") fbq("trackCustom", nome, dados);
    if (typeof gtag === "function") gtag("event", nome, dados);
  } catch (e) {}
}

/* ---------- variante do teste A/B ---------- */
const variante = (() => {
  const q = new URLSearchParams(location.search).get("v");
  if (q === "a" || q === "b") return q;
  try {
    const salva = localStorage.getItem("magna_lp_variante");
    if (salva === "a" || salva === "b") return salva;
    const nova = Math.random() < 0.5 ? "a" : "b";
    localStorage.setItem("magna_lp_variante", nova);
    return nova;
  } catch (e) { return "a"; }
})();
document.body.dataset.variante = variante;

/* ---------- CTA → WhatsApp ---------- */
const nome = (() => {
  try {
    const s = JSON.parse(sessionStorage.getItem("magna_quiz_diagnostico")) || {};
    return ((s.answers && s.answers.nomeResp) || "").trim().split(/\s+/)[0] || "";
  } catch (e) { return ""; }
})();
const msg = WHATS_MSG[variante].replace("{sou}", nome ? `Sou ${nome}. ` : "");
const waUrl = `https://wa.me/${F.marca.whatsapp}?text=${encodeURIComponent(msg)}`;
document.querySelectorAll(".lp-cta").forEach((a) => {
  a.href = waUrl; a.target = "_blank"; a.rel = "noopener";
  a.addEventListener("click", () => track("lp_cta_click", { variante, posicao: a.dataset.cta }));
});

/* ---------- atraso (variante B) ---------- */
let liberado = variante === "a";
function liberar(motivo) {
  if (liberado && document.body.classList.contains("lp-liberado")) return;
  liberado = true;
  document.body.classList.add("lp-liberado");
  track("lp_delay_liberado", { variante, motivo });
}
if (variante === "a") document.body.classList.add("lp-liberado");

/* ---------- player ---------- */
const box = document.getElementById("vsl");

function montarVTurb(codigo) {
  const tmp = document.createElement("div");
  tmp.innerHTML = codigo;
  [...tmp.childNodes].forEach((n) => {
    if (n.tagName === "SCRIPT") {
      const s = document.createElement("script");
      [...n.attributes].forEach((at) => s.setAttribute(at.name, at.value));
      s.text = n.text;
      box.appendChild(s);
    } else {
      box.appendChild(n);
    }
  });
  /* VTurb expõe o tempo do vídeo em window.smartplayer; sem ele, conta o
     tempo na página como aproximação. */
  const inicio = Date.now();
  const t = setInterval(() => {
    let seg = (Date.now() - inicio) / 1000;
    try {
      const inst = window.smartplayer && window.smartplayer.instances && window.smartplayer.instances[0];
      if (inst && inst.video) seg = inst.video.currentTime;
    } catch (e) {}
    if (seg >= VSL.atrasoSegundos) { clearInterval(t); liberar("vturb"); }
  }, 1000);
}

function montarVideo(src) {
  box.classList.add("vsl-native");
  box.innerHTML = `
    <video id="vsl-video" playsinline muted autoplay preload="metadata" ${VSL.poster ? `poster="${VSL.poster}"` : ""}>
      <source src="${src}" type="video/mp4">
    </video>
    <button class="vsl-som" id="vsl-som" type="button">
      <span class="vsl-som-ico" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 9.5v5h3.5L12 18.5v-13L7.5 9.5z"/><path d="M15.5 9a4 4 0 0 1 0 6M18 6.5a7.5 7.5 0 0 1 0 11"/></svg></span>
      <strong>Seu vídeo já começou</strong><span>Clique para ouvir</span>
    </button>
    <div class="vsl-barra" aria-hidden="true"><span id="vsl-prog"></span></div>`;
  const v = document.getElementById("vsl-video");
  const som = document.getElementById("vsl-som");
  const prog = document.getElementById("vsl-prog");
  const marcos = new Set();

  v.addEventListener("loadedmetadata", () => {
    if (v.videoWidth && v.videoHeight) box.style.aspectRatio = `${v.videoWidth} / ${v.videoHeight}`;
  });
  som.addEventListener("click", () => {
    v.muted = false; v.currentTime = 0; v.play();
    som.hidden = true; box.classList.add("vsl-ativo");
    track("vsl_play", { variante });
  });
  v.addEventListener("click", () => { if (!som.hidden) return; v.paused ? v.play() : v.pause(); });
  v.addEventListener("timeupdate", () => {
    if (!v.duration) return;
    const p = v.currentTime / v.duration;
    /* barra "rápida no começo, lenta no fim", estilo VTurb */
    prog.style.width = (Math.pow(p, 0.55) * 100).toFixed(2) + "%";
    if (som.hidden) [25, 50, 75, 95].forEach((m) => { if (p * 100 >= m && !marcos.has(m)) { marcos.add(m); track("vsl_progresso", { variante, marco: m }); } });
    if (!v.muted && v.currentTime >= VSL.atrasoSegundos) liberar("video");
  });
}

if (VSL.vturb) montarVTurb(VSL.vturb);
else if (VSL.src) montarVideo(VSL.src);
else {
  box.classList.add("vsl-vazio");
  box.innerHTML = `<p>A VSL entra aqui assim que o vídeo for disponibilizado.</p>`;
  liberar("sem-video");
}
track("lp_view", { variante });
