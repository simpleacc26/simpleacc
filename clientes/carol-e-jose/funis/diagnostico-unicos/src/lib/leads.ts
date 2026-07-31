// Envio do lead para a planilha (via Make / Apps Script) — ÚNICOS
// Envia dados do lead + todas as respostas legíveis + utm/criativo + o resultado
// da régua (rota, aprovação, balde). É o payload que fecha "custo por lead aprovado".

import { config } from "../config";
import { questions } from "../data/questions";
import type { Answers, Resultado } from "./scoring";
import type { Utm } from "./session";

export interface LeadData {
  nome: string;
  empresa: string;
  email: string;
  whatsapp: string;
  telefoneComercial?: string;
}

function labelDe(id: string, value: string | undefined): string {
  if (!value) return "";
  const q = questions.find((x) => x.id === id);
  if (q) {
    const opt = q.options.find((o) => o.value === value);
    if (opt) return opt.title;
  }
  return value;
}

export async function enviarLead(
  lead: LeadData,
  answers: Answers,
  resultado: Resultado,
  utm: Utm,
  setorOutro?: string,
): Promise<boolean> {
  const payload = new URLSearchParams();
  payload.append("nome", lead.nome);
  payload.append("empresa", lead.empresa);
  payload.append("email", lead.email);
  payload.append("whatsapp", lead.whatsapp);
  payload.append("telefone_comercial", lead.telefoneComercial || "");

  // respostas legíveis
  payload.append("autonomia", labelDe("autonomia", answers["autonomia"]));
  payload.append("setor", answers["setor"] === "outro" && setorOutro ? `Outro: ${setorOutro}` : labelDe("setor", answers["setor"]));
  payload.append("papel", labelDe("papel", answers["papel"]));
  payload.append("camada_lideranca", labelDe("lideranca", answers["lideranca"]));
  payload.append("tamanho_time", labelDe("tamanho", answers["tamanho"]));
  payload.append("como_decide", labelDe("decisao", answers["decisao"]));
  payload.append("ja_tentou", labelDe("tentativas", answers["tentativas"]));
  payload.append("faturamento", labelDe("faturamento", answers["faturamento"]));

  // régua / resultado
  payload.append("estagio", resultado.estagio);
  payload.append("rota", resultado.rota);
  payload.append("aprovacao", resultado.aprovacao); // pleno | tier2 | nao-aprovado
  payload.append("balde", resultado.balde);
  payload.append("dono", resultado.dono ? "sim" : "nao");

  // utm / criativo
  payload.append("utm_source", utm.utm_source);
  payload.append("utm_medium", utm.utm_medium);
  payload.append("utm_campaign", utm.utm_campaign);
  payload.append("utm_content", utm.utm_content);
  payload.append("utm_term", utm.utm_term);
  payload.append("data", new Date().toISOString());

  if (config.leadsEndpoint.startsWith("PREENCHER")) {
    console.warn("[leads] VITE_LEADS_ENDPOINT não configurado. Lead não enviado:", Object.fromEntries(payload));
    return false;
  }

  try {
    const res = await fetch(config.leadsEndpoint, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: payload.toString(),
    });
    return res.ok;
  } catch (e) {
    console.error("[leads] falha ao enviar", e);
    return false;
  }
}
