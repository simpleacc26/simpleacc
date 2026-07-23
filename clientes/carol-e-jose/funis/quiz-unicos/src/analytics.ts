/* eslint-disable @typescript-eslint/no-explicit-any */
declare global {
  interface Window {
    dataLayer?: Record<string, any>[];
  }
}

// Envia eventos para o dataLayer do GTM. O GTM é o responsável por repassar
// esses eventos ao Meta Pixel (e a outras ferramentas). O pixel não é mais
// chamado diretamente no código — tudo passa pelo GTM (GTM-MP9NJX24).
//
// Cada chamada empurra: { event: <nome>, ...params }
// No GTM, crie um acionador de "Evento personalizado" para cada <nome> e uma
// tag que dispare o evento correspondente no Meta Pixel.
export function fbqTrack(event: string, params?: Record<string, unknown>) {
  try {
    if (typeof window !== "undefined") {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({ event, ...(params || {}) });
    }
  } catch {
    // silencia erros de tracking em ambientes sem dataLayer
  }
}
