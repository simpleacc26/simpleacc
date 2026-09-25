/* ============================================================
   Player da VSL (estilo VTurb), usado no topo do diagnóstico e na LP.
   - Começa mudo em autoplay com "Seu vídeo já começou / Clique para ouvir".
   - No 1º clique: volta ao início, liga o som e o aviso some de vez.
   - Depois disso: clique no vídeo pausa/continua, barra de controles com
     play/pausa, volume (mudo + controle deslizante) e tela cheia.
   - Barra de progresso "rápida no começo, lenta no fim" (não permite pular).
   Uso: montarVSL(elemento, { src, poster, onTempo(segundos), onEvento(nome, dados) })
   ============================================================ */
(function () {
  const SVG = {
    som: '<path d="M4 9.5v5h3.5L12 18.5v-13L7.5 9.5z"/><path d="M15.5 9a4 4 0 0 1 0 6M18 6.5a7.5 7.5 0 0 1 0 11"/>',
    mudo: '<path d="M4 9.5v5h3.5L12 18.5v-13L7.5 9.5z"/><path d="M16 9.5l5 5M21 9.5l-5 5"/>',
    play: '<path d="M8 5.5v13l10.5-6.5z" fill="currentColor"/>',
    pausa: '<path d="M8 5.5v13M16 5.5v13" stroke-width="3.2"/>',
    cheia: '<path d="M4 9V4h5M15 4h5v5M20 15v5h-5M9 20H4v-5"/>',
  };
  const ico = (n) => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${SVG[n]}</svg>`;

  window.montarVSL = function (box, opt) {
    const emit = (nome, dados) => { try { opt.onEvento && opt.onEvento(nome, dados || {}); } catch (e) {} };
    box.classList.add("vsl", "vsl-native");
    box.innerHTML = `
      <video playsinline muted autoplay preload="metadata" ${opt.poster ? `poster="${opt.poster}"` : ""}>
        <source src="${opt.src}" type="video/mp4">
      </video>
      <button class="vsl-som" type="button">
        <span class="vsl-som-ico">${ico("som")}</span>
        <strong>Seu vídeo já começou</strong><span>Clique para ouvir</span>
      </button>
      <span class="vsl-big" aria-hidden="true">${ico("play")}</span>
      <div class="vsl-ctrl">
        <button class="vsl-b vsl-pp" type="button" aria-label="Pausar">${ico("pausa")}</button>
        <div class="vsl-vol">
          <button class="vsl-b vsl-mute" type="button" aria-label="Tirar o som">${ico("som")}</button>
          <input class="vsl-range" type="range" min="0" max="1" step="0.05" value="1" aria-label="Volume">
        </div>
        <span class="vsl-esp"></span>
        <button class="vsl-b vsl-fs" type="button" aria-label="Tela cheia">${ico("cheia")}</button>
      </div>
      <div class="vsl-barra" aria-hidden="true"><span></span></div>`;

    const v = box.querySelector("video");
    const som = box.querySelector(".vsl-som");
    const pp = box.querySelector(".vsl-pp");
    const mute = box.querySelector(".vsl-mute");
    const range = box.querySelector(".vsl-range");
    const fs = box.querySelector(".vsl-fs");
    const prog = box.querySelector(".vsl-barra span");
    const marcos = new Set();
    let ativo = false, ocioso;

    v.addEventListener("loadedmetadata", () => {
      if (v.videoWidth && v.videoHeight) box.style.aspectRatio = `${v.videoWidth} / ${v.videoHeight}`;
    });

    /* 1º clique: liga o som, recomeça do início e tira o aviso de vez */
    som.addEventListener("click", () => {
      ativo = true;
      som.remove();
      box.classList.add("vsl-ativo");
      v.currentTime = 0; v.muted = false; v.volume = Number(range.value) || 1;
      v.play().catch(() => {});
      acordar();
      emit("vsl_play");
    });

    const alternar = () => { if (v.paused || v.ended) v.play().catch(() => {}); else v.pause(); };
    v.addEventListener("click", () => { if (ativo) alternar(); });
    box.querySelector(".vsl-big").addEventListener("click", () => { if (ativo) alternar(); });
    pp.addEventListener("click", alternar);

    const sync = () => {
      const parado = v.paused || v.ended;
      box.classList.toggle("vsl-pausado", ativo && parado);
      pp.innerHTML = ico(parado ? "play" : "pausa");
      pp.setAttribute("aria-label", parado ? "Continuar" : "Pausar");
      const semSom = v.muted || v.volume === 0;
      mute.innerHTML = ico(semSom ? "mudo" : "som");
      mute.setAttribute("aria-label", semSom ? "Ligar o som" : "Tirar o som");
      range.value = semSom ? 0 : v.volume;
      range.style.setProperty("--vol", (semSom ? 0 : v.volume) * 100 + "%");
    };
    ["play", "pause", "ended", "volumechange"].forEach((e) => v.addEventListener(e, sync));
    v.addEventListener("pause", () => { if (ativo && !v.ended) emit("vsl_pausa", { segundo: Math.round(v.currentTime) }); });

    mute.addEventListener("click", () => {
      if (v.muted || v.volume === 0) { v.muted = false; if (v.volume === 0) v.volume = 0.6; }
      else v.muted = true;
    });
    range.addEventListener("input", () => {
      const val = Number(range.value);
      v.volume = val; v.muted = val === 0;
    });

    fs.addEventListener("click", () => {
      const doc = document;
      if (doc.fullscreenElement || doc.webkitFullscreenElement) {
        (doc.exitFullscreen || doc.webkitExitFullscreen).call(doc);
      } else if (box.requestFullscreen) box.requestFullscreen().catch(() => {});
      else if (box.webkitRequestFullscreen) box.webkitRequestFullscreen();
      else if (v.webkitEnterFullscreen) v.webkitEnterFullscreen(); /* iPhone */
    });

    /* controles somem sozinhos enquanto o vídeo roda e o mouse fica parado */
    function acordar() {
      box.classList.remove("vsl-ocioso");
      clearTimeout(ocioso);
      ocioso = setTimeout(() => { if (!v.paused) box.classList.add("vsl-ocioso"); }, 2600);
    }
    ["pointermove", "pointerdown", "keydown"].forEach((e) => box.addEventListener(e, acordar));
    v.addEventListener("play", acordar);

    v.addEventListener("timeupdate", () => {
      if (!v.duration) return;
      const p = v.currentTime / v.duration;
      prog.style.width = (Math.pow(p, 0.55) * 100).toFixed(2) + "%";
      if (!ativo) return;
      [25, 50, 75, 95].forEach((m) => { if (p * 100 >= m && !marcos.has(m)) { marcos.add(m); emit("vsl_progresso", { marco: m }); } });
      if (!v.muted && opt.onTempo) opt.onTempo(v.currentTime);
    });

    sync();
    return v;
  };
})();
