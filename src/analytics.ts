// Helper seguro para o Facebook Pixel (fbq), que é carregado via GTM.
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
