// Tracking centralizado no GTM (dataLayer) — ÚNICOS
// A régua do contrato mudou (Guia): medimos por CRIATIVO e por LEAD APROVADO,
// não só volume. Por isso cada evento carrega utm/criativo + status de aprovação
// + balde, para o GTM repassar ao destino e a planilha fechar CAC ponta a ponta.

type DL = Record<string, unknown>;

declare global {
  interface Window {
    dataLayer?: DL[];
  }
}

export function pushEvent(event: string, data: DL = {}): void {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event, ...data });
}

// Eventos do funil
export const track = {
  inicio: (utm: DL) => pushEvent("diag_inicio", utm),
  pergunta: (n: number, id: string) => pushEvent("diag_pergunta", { pergunta: n, pergunta_id: id }),
  resultado: (d: DL) => pushEvent("diag_resultado", d),
  leadCapturado: (d: DL) => pushEvent("diag_lead", d),          // lead com dados (topo)
  leadAprovado: (d: DL) => pushEvent("diag_lead_aprovado", d),  // passou papel + porte
  forapapel: (d: DL) => pushEvent("diag_fora_papel", d),
  abaixopiso: (d: DL) => pushEvent("diag_abaixo_piso", d),
  agendamentoClick: (d: DL) => pushEvent("diag_agendamento_click", d),
  comunidadeClick: (d: DL) => pushEvent("diag_comunidade_click", d),
};
