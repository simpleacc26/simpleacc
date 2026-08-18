export interface Option {
  value: string;
  title: string;
  bucket?: string;
  score: number;
  qualifies?: boolean;
}

export interface Question {
  category: string;
  question: string;
  supportText?: string;
  highlightWords?: string[];
  options: Option[];
}

export const questions: Question[] = [
  // Q1 (landing) — Setor da empresa
  {
    category: "IDENTIFICAÇÃO",
    question: "Qual o setor da sua empresa?",
    options: [
      { value: "1", title: "Serviços / operações B2B", score: 12 },
      { value: "2", title: "Digital / infoproduto / mentoria", score: 10 },
      { value: "3", title: "Comércio / varejo", score: 10 },
      { value: "4", title: "Indústria", score: 14 },
    ],
  },
  // Q2 — Cargo / papel
  {
    category: "QUALIFICAÇÃO",
    question: "Qual é o seu papel nesta empresa?",
    options: [
      { value: "1", title: "Fundador ou Sócio", score: 20 },
      { value: "2", title: "Diretor ou C-Level", score: 12 },
      { value: "3", title: "Assumi recentemente posição executiva de alta responsabilidade", score: 8 },
      { value: "4", title: "Gestor com autonomia parcial", score: 3 },
    ],
  },
  // Q3 — Tamanho do time
  {
    category: "DIAGNÓSTICO",
    question: "Quantas pessoas estão sob sua responsabilidade direta hoje?",
    options: [
      { value: "1", title: "1 a 5 pessoas", score: 4 },
      { value: "2", title: "6 a 10 pessoas", score: 8 },
      { value: "3", title: "11 a 25 pessoas", score: 15 },
      { value: "4", title: "Mais de 25 pessoas", score: 12 },
    ],
  },
  // Q4 — Risco recorrente (determina o bucket)
  {
    category: "DIAGNÓSTICO",
    question: "Na sua avaliação, qual tem sido o padrão de risco mais recorrente na sua gestão?",
    options: [
      { value: "1", title: "Sou eu quem segura tudo e isso está freando o que o negócio poderia crescer", score: 15, bucket: "Refém da Operação" },
      { value: "2", title: "Fico empurrando decisões difíceis sobre o time mais do que deveria", score: 13, bucket: "O Frustrado" },
      { value: "3", title: "O time faz o que eu peço, mas para quando eu paro", score: 13, bucket: "Time sem Dono" },
      { value: "4", title: "O que eu decido e o que de fato é entregue são coisas diferentes", score: 10, bucket: "Consolidado mas Estagnado" },
      { value: "5", title: "O ritmo do time caiu e eu não consigo identificar o motivo", score: 8, bucket: "Consolidado mas Estagnado" },
    ],
  },
  // Q5 — Impacto desejado
  {
    category: "DIAGNÓSTICO",
    question: "Se sua liderança estivesse operando em alto padrão nos próximos 12 meses, qual seria o resultado mais relevante?",
    options: [
      { value: "1", title: "Meu time tomaria decisões sem me chamar a cada passo", score: 10 },
      { value: "2", title: "As decisões difíceis não ficariam paradas esperando por mim", score: 9 },
      { value: "3", title: "O negócio avançaria mesmo nos dias em que eu não estivesse presente", score: 8 },
      { value: "4", title: "O que o time entrega se converteria em resultado financeiro real", score: 7 },
      { value: "5", title: "O time trabalharia com mais alinhamento e menos desgaste entre as pessoas", score: 6 },
    ],
  },
  // Q6 — Estilo de liderança
  {
    category: "DIAGNÓSTICO",
    question: "Como você descreveria o que guia suas decisões de liderança hoje?",
    options: [
      { value: "1", title: "Tenho critérios definidos e sigo um processo para tomar decisões", score: 4 },
      { value: "2", title: "Me guio pelo que aprendi ao longo do caminho e pelo bom senso", score: 5 },
      { value: "3", title: "Confio muito na intuição e vou ajustando pelo caminho", score: 5 },
      { value: "4", title: "Vou resolvendo conforme as situações aparecem", score: 3 },
    ],
  },
  // Q7 — Faturamento MENSAL (gate de qualificação)
  {
    category: "QUALIFICAÇÃO",
    question: "Qual o faturamento MENSAL da empresa que você lidera?",
    highlightWords: ["MENSAL"],
    supportText: "Essa informação define o tipo de diagnóstico que vamos entregar para você.",
    options: [
      { value: "1", title: "Até R$ 50 mil", score: 0, qualifies: false },
      { value: "2", title: "De R$ 50 mil a R$ 100 mil", score: 10, qualifies: true },
      { value: "3", title: "De R$ 100 mil a R$ 300 mil", score: 18, qualifies: true },
      { value: "4", title: "De R$ 300 mil a R$ 500 mil", score: 22, qualifies: true },
      { value: "5", title: "Acima de R$ 500 mil", score: 25, qualifies: true },
    ],
  },
];

export function calcScore(answers: Record<number, string>): number {
  return questions.reduce((total, question, idx) => {
    const option = question.options.find(o => o.value === answers[idx]);
    return total + (option?.score ?? 0);
  }, 0);
}

export function calcTier(score: number): string {
  if (score >= 75) return "Perfil ÚNICO";
  if (score >= 55) return "Alta Qualificação";
  if (score >= 35) return "Qualificado";
  if (score >= 10) return "Baixa Qualificação";
  return "Fora do perfil";
}
