// Motor de qualificação e diagnóstico — ÚNICOS
// Traduz as decisões fechadas com o cliente em regras. Tudo aqui é TUNÁVEL:
// os pesos dos baldes e os cortes de "aprovado" ficam concentrados neste arquivo
// para Carol e José ajustarem sem mexer no resto do funil.

export type Answers = Record<string, string>;

// ---------------------------------------------------------------------------
// Roteamento (decisão 1 + piso de faturamento)
// ---------------------------------------------------------------------------
// - Filtro de PAPEL é o filtro que realmente exclui (Guia). Não-dono sai do
//   agendamento e vai para a comunidade / Jornada 1.
// - Piso absoluto de faturamento: R$1M/ano. Abaixo disso, Jornada 1 / grupo.

export type Rota = "qualificado" | "fora-papel" | "abaixo-piso";

export function rota(a: Answers): Rota {
  const papel = a["papel"];
  if (papel === "exec" || papel === "nenhuma") return "fora-papel";
  // faturamento "1" = "Até R$1 milhão" fica abaixo do piso
  if (a["faturamento"] === "1") return "abaixo-piso";
  return "qualificado";
}

export function isDono(a: Answers): boolean {
  return a["papel"] === "dono" || a["papel"] === "socio";
}

// ---------------------------------------------------------------------------
// Classificação de "aprovado" (decisão 3)
// ---------------------------------------------------------------------------
// aprovado pleno = dono/sócio E porte >= ICP do setor (indústria R$5M / demais R$2M).
// aprovado tier 2 = dono/sócio, acima do piso (R$1M) mas abaixo do ICP do setor.
//
// LIMITAÇÃO CONHECIDA (sinalizada ao cliente): as faixas de faturamento da v4 não
// cortam exatamente em R$5M e R$2M. Aproximamos pela faixa que contém o corte:
//   indústria: pleno a partir de "De R$3 a R$10 milhões" (faixa que contém R$5M);
//   demais setores: pleno a partir de "De R$1 a R$3 milhões" (faixa que contém R$2M).
// Para tier 2 nítido em serviços seria preciso desmembrar as faixas (R$1-2M / R$2-5M).

export type Aprovacao = "pleno" | "tier2" | "nao-aprovado";

export function aprovacao(a: Answers): Aprovacao {
  if (rota(a) !== "qualificado") return "nao-aprovado";
  // Produção (GHL): as faixas de faturamento variam por setor e são montadas para que
  // o índice 3 seja SEMPRE a borda do ICP (indústria R$5M / demais R$2M). Assim a regra
  // fica uniforme: pleno = índice >= 3 ; tier2 = índice 2 ; piso = índice 1 (sai na rota).
  const fat = parseInt(a["faturamento"] || "0", 10);
  return fat >= 3 ? "pleno" : "tier2";
}

// ---------------------------------------------------------------------------
// Baldes (decisão 4) — resultado único "No Limite", com a situação dominante por dentro.
// ---------------------------------------------------------------------------
// As 4 situações da página pós-diagnóstico são os 4 baldes:
//   oportunidade  · a demanda cresceu mais rápido que a empresa
//   lideranca     · falta liderança formada, não mão de obra
//   decisao       · as decisões de maior peso você toma sozinho
//   processo      · contratou processo e ferramenta, o time não mudou

export type Balde = "oportunidade" | "lideranca" | "decisao" | "processo";

export const BALDES: Record<Balde, { titulo: string; ancora: string }> = {
  oportunidade: {
    titulo: "A demanda cresceu mais rápido do que a empresa consegue acompanhar",
    ancora: "O dinheiro já está na mesa e você só consegue aproveitar uma fatia dele.",
  },
  lideranca: {
    titulo: "Falta liderança formada, não mão de obra",
    ancora: "O que falta é gente que se aproprie da entrega, e não mais um par de mãos.",
  },
  decisao: {
    titulo: "As decisões de maior peso você toma sozinho",
    ancora: "Não é falta de informação. É não ter, no seu nível, alguém com quem trocar antes de decidir.",
  },
  processo: {
    titulo: "Você contratou processo e ferramenta. O que não mudou foi como o time trabalha",
    ancora: "As ideias e as soluções continuam partindo de você, e as pessoas continuam esperando por você.",
  },
};

// Ordem de desempate = ordem em que as situações aparecem na página.
const ORDEM: Balde[] = ["oportunidade", "lideranca", "decisao", "processo"];

export function computeBalde(a: Answers): Balde {
  const pts: Record<Balde, number> = { oportunidade: 0, lideranca: 0, decisao: 0, processo: 0 };

  // Q1 autonomia (dias sem ligar)
  if (a["autonomia"] === "1") { pts.decisao += 1; pts.lideranca += 1; }
  if (a["autonomia"] === "2") { pts.lideranca += 1; }

  // Q4a quem coordena (camada de liderança)
  if (a["lideranca"] === "1") { pts.lideranca += 2; pts.decisao += 1; }
  if (a["lideranca"] === "2") { pts.lideranca += 1; }

  // Q4b tamanho do time  +  Q7 faturamento => sinal de "oportunidade que passa"
  const tam = parseInt(a["tamanho"] || "0", 10);
  const fat = parseInt(a["faturamento"] || "0", 10);
  if (tam >= 4) pts.oportunidade += 1;          // 100+ pessoas
  if (fat >= 4) pts.oportunidade += 1;          // R$10M+/ano
  if (tam >= 4 && fat >= 4) pts.oportunidade += 1;

  // Q5 como a decisão anda
  if (a["decisao"] === "1") { pts.decisao += 2; pts.lideranca += 1; }
  if (a["decisao"] === "2") { pts.decisao += 1; pts.lideranca += 1; }
  if (a["decisao"] === "3") { pts.lideranca += 1; }

  // Q6 o que já tentou
  switch (a["tentativas"]) {
    case "1": pts.processo += 1; break;                          // mentoria/consultoria
    case "2": pts.lideranca += 2; break;                         // contratou gente de mercado
    case "3": pts.processo += 2; break;                          // ERP/ferramentas
    case "4": pts.decisao += 2; pts.lideranca += 1; break;       // tentou se afastar e voltou
    case "5": pts.processo += 1; pts.lideranca += 1; pts.decisao += 1; break; // todas
  }

  // maior pontuação vence; empate resolve pela ordem da página
  let vencedor: Balde = ORDEM[0];
  let melhor = -1;
  for (const b of ORDEM) {
    if (pts[b] > melhor) { melhor = pts[b]; vencedor = b; }
  }
  return vencedor;
}

// ---------------------------------------------------------------------------
// Resumo consolidado para leitura, tracking e comercial
// ---------------------------------------------------------------------------
export interface Resultado {
  rota: Rota;
  aprovacao: Aprovacao;
  balde: Balde;
  estagio: string;           // hoje sempre "Estágio 2: No Limite" (decisão 4)
  dono: boolean;
}

export function computeResultado(a: Answers): Resultado {
  return {
    rota: rota(a),
    aprovacao: aprovacao(a),
    balde: computeBalde(a),
    estagio: "Estágio 2: No Limite",
    dono: isDono(a),
  };
}
