// Helper seguro para o Facebook Pixel (fbq), carregado via GTM.
// No-op enquanto o pixel não estiver instalado (ver index.html).
export function fbqTrack(event: string, params?: Record<string, unknown>): void {
  if (typeof window !== "undefined" && typeof window.fbq === "function") {
    window.fbq("track", event, params);
  }
}

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
    clarity?: (...args: unknown[]) => void;
  }
}
