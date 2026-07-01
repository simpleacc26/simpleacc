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
  options: Option[];
}

export const questions: Question[] = [
  // Q1 (landing) — Papel e autonomia
  {
    category: "QUALIFICAÇÃO",
    question: "Qual é o seu papel nesta empresa?",
    options: [
      { value: "1", title: "Fundador ou sócio com responsabilidade direta", score: 20 },
      { value: "2", title: "Diretor ou C-level com autonomia total", score: 12 },
      { value: "3", title: "Assumi recentemente posição executiva de alta responsabilidade", score: 8 },
      { value: "4", title: "Gestor com autonomia parcial", score: 3 },
    ],
  },
  // Q2 — Modelo da empresa
  {
    category: "DIAGNÓSTICO",
    question: "Qual modelo melhor descreve a operação da sua empresa?",
    options: [
      { value: "1", title: "Prestação de serviços ou soluções", score: 12 },
      { value: "2", title: "Indústria ou manufatura", score: 14 },
      { value: "3", title: "Comércio, varejo ou e-commerce", score: 10 },
    ],
  },
  // Q3 — Tamanho do time
  {
    category: "DIAGNÓSTICO",
    question: "Quantas pessoas estão sob sua responsabilidade direta hoje?",
    options: [
      { value: "1", title: "1 a 3 pessoas", score: 2 },
      { value: "2", title: "4 a 10 pessoas", score: 8 },
      { value: "3", title: "11 a 25 pessoas", score: 15 },
      { value: "4", title: "26 a 50 pessoas", score: 15 },
      { value: "5", title: "Mais de 50 pessoas", score: 12 },
    ],
  },
  // Q4 — Risco recorrente (determina o bucket/diagnóstico)
  {
    category: "DIAGNÓSTICO",
    question: "Na sua avaliação, qual tem sido o padrão de risco mais recorrente na sua gestão?",
    options: [
      { value: "1", title: "A liderança está sobrecarregada e isso freia o que poderia crescer", score: 15, bucket: "Refém da Operação" },
      { value: "2", title: "As decisões sobre pessoas são postergadas mais do que deveriam", score: 13, bucket: "O Frustrado" },
      { value: "3", title: "O time executa o que é pedido, mas não opera com autonomia real", score: 13, bucket: "Time sem Dono" },
      { value: "4", title: "Há desalinhamento entre o que foi decidido e o que é entregue", score: 10, bucket: "Consolidado mas Estagnado" },
      { value: "5", title: "A performance e o engajamento caem sem causa evidente", score: 8, bucket: "Consolidado mas Estagnado" },
    ],
  },
  // Q5 — Impacto desejado
  {
    category: "DIAGNÓSTICO",
    question: "Se sua liderança estivesse operando em alto padrão nos próximos 12 meses, qual seria o resultado mais relevante?",
    options: [
      { value: "1", title: "O time operaria com autonomia real, sem depender de mim", score: 10 },
      { value: "2", title: "As decisões difíceis seriam tomadas com mais velocidade e critério", score: 9 },
      { value: "3", title: "Os resultados teriam mais previsibilidade e menos dependência de mim", score: 8 },
      { value: "4", title: "A performance do time refletiria nos resultados financeiros", score: 7 },
      { value: "5", title: "O ambiente interno seria mais coeso e com menos atrito", score: 6 },
    ],
  },
  // Q6 — Estilo de liderança
  {
    category: "DIAGNÓSTICO",
    question: "Como você descreveria o que guia suas decisões de liderança hoje?",
    options: [
      { value: "1", title: "Tenho critérios claros e um método estruturado", score: 4 },
      { value: "2", title: "Me guio pela experiência acumulada e pelo bom senso", score: 5 },
      { value: "3", title: "Trabalho muito pela intuição e tentativa e erro", score: 5 },
      { value: "4", title: "Reajo às situações conforme elas aparecem", score: 3 },
    ],
  },
  // Q7 — Faturamento anual (gate de qualificação)
  {
    category: "QUALIFICAÇÃO",
    question: "Qual é o faturamento anual da sua empresa hoje?",
    supportText: "Essa informação define o tipo de diagnóstico que vamos entregar para você.",
    options: [
      { value: "1", title: "Menos de R$ 1 milhão", score: 0, qualifies: false },
      { value: "2", title: "Entre R$ 1M e R$ 2M", score: 10, qualifies: true },
      { value: "3", title: "Entre R$ 2M e R$ 3M", score: 18, qualifies: true },
      { value: "4", title: "Entre R$ 3M e R$ 5M", score: 22, qualifies: true },
      { value: "5", title: "Acima de R$ 5M", score: 25, qualifies: true },
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
