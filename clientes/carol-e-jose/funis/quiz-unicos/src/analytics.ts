/* eslint-disable @typescript-eslint/no-explicit-any */
declare global {
  interface Window {
    fbq?: (...args: any[]) => void;
  }
}

export function fbqTrack(event: string, params?: Record<string, unknown>) {
  try {
    if (typeof window !== "undefined" && window.fbq) {
      if (params) {
        window.fbq("track", event, params);
      } else {
        window.fbq("track", event);
      }
    }
  } catch {
    // silencia erros de pixel em ambientes sem fbq
  }
}
