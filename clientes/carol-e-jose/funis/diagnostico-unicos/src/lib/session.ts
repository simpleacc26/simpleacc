// Captura e persistência de UTMs / criativo — ÚNICOS
// A métrica nova é "custo por lead aprovado, POR CRIATIVO". Para isso o criativo
// (utm_content / utm_term) precisa viajar do anúncio até a planilha. Guardamos em
// sessionStorage para sobreviver à navegação entre telas do funil.

export interface Utm {
  utm_source: string;
  utm_medium: string;
  utm_campaign: string;
  utm_content: string; // usado como identificador do criativo
  utm_term: string;
}

const KEY = "unicos_utm";

export function captureUtm(): Utm {
  const params = new URLSearchParams(window.location.search);
  const fromUrl: Utm = {
    utm_source: params.get("utm_source") || "",
    utm_medium: params.get("utm_medium") || "",
    utm_campaign: params.get("utm_campaign") || "",
    utm_content: params.get("utm_content") || "",
    utm_term: params.get("utm_term") || "",
  };
  const hasAny = Object.values(fromUrl).some(Boolean);
  if (hasAny) {
    try { sessionStorage.setItem(KEY, JSON.stringify(fromUrl)); } catch { /* ignore */ }
    return fromUrl;
  }
  try {
    const saved = sessionStorage.getItem(KEY);
    if (saved) return JSON.parse(saved) as Utm;
  } catch { /* ignore */ }
  return fromUrl;
}

export function getUtm(): Utm {
  try {
    const saved = sessionStorage.getItem(KEY);
    if (saved) return JSON.parse(saved) as Utm;
  } catch { /* ignore */ }
  return { utm_source: "", utm_medium: "", utm_campaign: "", utm_content: "", utm_term: "" };
}
