/* ============================================================
   TRACKING — Meta Pixel + GA4. Preencha os IDs e republique:
   os scripts oficiais são carregados só quando há ID.
   Eventos padrão: PageView (todas as páginas) e Lead / generate_lead
   (quando a captura é enviada). O resto vai como evento customizado.
   ============================================================ */
const TRACKING_CONFIG = { ga4_id: "", meta_pixel_id: "", custom_webhook: "" };

(function carregarTracking() {
  const px = TRACKING_CONFIG.meta_pixel_id;
  if (px) {
    /* snippet oficial do Meta Pixel */
    !function (f, b, e, v, n, t, s) {
      if (f.fbq) return; n = f.fbq = function () { n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments); };
      if (!f._fbq) f._fbq = n; n.push = n; n.loaded = !0; n.version = "2.0"; n.queue = [];
      t = b.createElement(e); t.async = !0; t.src = v; s = b.getElementsByTagName(e)[0]; s.parentNode.insertBefore(t, s);
    }(window, document, "script", "https://connect.facebook.net/en_US/fbevents.js");
    fbq("init", px);
    fbq("track", "PageView");
  }
  const ga = TRACKING_CONFIG.ga4_id;
  if (ga) {
    const s = document.createElement("script");
    s.async = true; s.src = "https://www.googletagmanager.com/gtag/js?id=" + encodeURIComponent(ga);
    document.head.appendChild(s);
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { dataLayer.push(arguments); };
    gtag("js", new Date());
    gtag("config", ga);
  }
})();

function trackEvent(name, data = {}) {
  try {
    if (typeof fbq === "function") {
      if (name === "funnel_complete") fbq("track", "Lead", { content_name: data.camada, content_category: data.balde });
      else fbq("trackCustom", name, data);
    }
    if (typeof gtag === "function") gtag("event", name === "funnel_complete" ? "generate_lead" : name, data);
    if (TRACKING_CONFIG.custom_webhook && navigator.sendBeacon)
      navigator.sendBeacon(TRACKING_CONFIG.custom_webhook, JSON.stringify({ event: name, ...data, ts: Date.now() }));
  } catch (e) { /* tracking nunca quebra o funil */ }
}
