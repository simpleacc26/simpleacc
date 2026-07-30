// Configuração operacional do funil — ÚNICOS
// TODOS os valores que dependem de dados reais do cliente ficam aqui, lidos de
// variáveis de ambiente (Netlify) com fallback de placeholder. NADA aqui é
// inventado: o que estiver como "PREENCHER" precisa ser fornecido antes de publicar.
// Veja .env.example e o README.

const env = import.meta.env;

export const config = {
  // Google Tag Manager (já em uso no funil atual: GTM-MP9NJX24).
  gtmId: (env.VITE_GTM_ID as string) || "GTM-MP9NJX24",

  // Endpoint que recebe o lead (Make/Apps Script) e joga na planilha do Drive.
  // Ex.: https://hook.us2.make.com/xxxxx  ou  URL do Web App do Apps Script.
  leadsEndpoint: (env.VITE_LEADS_ENDPOINT as string) || "PREENCHER_LEADS_ENDPOINT",

  // WhatsApp de destino dos CTAs de quem NÃO segue para o agendamento
  // (comunidade / Jornada 1). Apenas dígitos com DDI. Ex.: 5551999999999
  whatsapp: (env.VITE_WHATSAPP as string) || "PREENCHER_WHATSAPP",

  // Link/emb) do Calendário nativo do GHL para o agendamento da sessão (aprovados).
  agendamentoUrl: (env.VITE_AGENDAMENTO_URL as string) || "PREENCHER_AGENDAMENTO_URL",

  // Link da comunidade / Jornada 1 para desqualificados (papel ou porte).
  comunidadeUrl: (env.VITE_COMUNIDADE_URL as string) || "PREENCHER_COMUNIDADE_URL",
} as const;

export function faltaConfig(): string[] {
  const pend: string[] = [];
  if (config.leadsEndpoint.startsWith("PREENCHER")) pend.push("VITE_LEADS_ENDPOINT");
  if (config.whatsapp.startsWith("PREENCHER")) pend.push("VITE_WHATSAPP");
  if (config.agendamentoUrl.startsWith("PREENCHER")) pend.push("VITE_AGENDAMENTO_URL");
  if (config.comunidadeUrl.startsWith("PREENCHER")) pend.push("VITE_COMUNIDADE_URL");
  return pend;
}
