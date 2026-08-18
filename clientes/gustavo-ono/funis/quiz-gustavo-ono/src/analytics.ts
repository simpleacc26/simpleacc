/**
 * Rastreamento do funil.
 *
 * Cada evento vai para dois lugares:
 *   - Meta Pixel, via fbq, com o nome de evento padrao da Meta
 *   - dataLayer do GTM, com um nome em snake_case previsivel
 *
 * Ate 18/08 so o Pixel recebia. O container do GTM carregava na pagina e nao
 * enxergava nada do funil, entao qualquer tag configurada la dependia so de
 * pageview. Os pushes abaixo abrem o caminho para GA4, conversao por evento e
 * qualquer outra tag, sem precisar mexer no codigo de novo.
 *
 * Nomes no dataLayer (usar estes ao criar os acionadores no GTM):
 *   quiz_iniciado, quiz_lead, relatorio_visto, clique_whatsapp, clique_treinamento
 */

const NOMES_GTM: Record<string, string> = {
  CompleteRegistration: "quiz_iniciado",
  Lead: "quiz_lead",
  ViewContent: "relatorio_visto",
  Contact: "clique_whatsapp",
  InitiateCheckout: "clique_treinamento",
};

export function fbqTrack(event: string, params?: Record<string, unknown>): void {
  if (typeof window === "undefined") return;

  if (typeof window.fbq === "function") {
    window.fbq("track", event, params);
  }

  // PageView ja e capturado pelo proprio GTM, entao nao duplicamos aqui.
  const nomeGtm = NOMES_GTM[event];
  if (nomeGtm && Array.isArray(window.dataLayer)) {
    window.dataLayer.push({ event: nomeGtm, ...(params ?? {}) });
  }
}

/** Empurra um evento so para o GTM, sem passar pelo Pixel. */
export function gtmTrack(event: string, params?: Record<string, unknown>): void {
  if (typeof window === "undefined" || !Array.isArray(window.dataLayer)) return;
  window.dataLayer.push({ event, ...(params ?? {}) });
}

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}
