export interface Option {
  value: string;
  title: string;
  description?: string;
}

export interface Question {
  category: string;
  question: string;
  supportText?: string;
  options: Option[];
}

export const questions: Question[] = [
  // Q0 — landing
  {
    category: "PERFIL",
    question: "Qual dessas opções mais combina com você hoje?",
    options: [
      { value: "1", title: "Estou em crescimento mas preciso melhorar" },
      { value: "2", title: "Minha margem de lucro é baixa" },
      { value: "3", title: "Meu negócio vende sem constância" },
      { value: "4", title: "Não tenho organização interna para crescer" },
    ],
  },
  // Q1
  {
    category: "PRODUTO",
    question: 'Os chocolates são o "carro chefe" do seu negócio?',
    options: [
      { value: "1", title: "Sim, são meu carro chefe" },
      { value: "2", title: "Os chocolates finos são menos de 50% das minhas vendas" },
      { value: "3", title: "Ainda não, mas quero que sejam o carro chefe" },
      { value: "4", title: "Ainda quero começar a vender chocolates" },
    ],
  },
  // Q2
  {
    category: "EXPERIÊNCIA",
    question: "Há quanto tempo você tem sua loja/atelier?",
    options: [
      { value: "1", title: "Menos de 1 ano" },
      { value: "2", title: "1 – 3 anos" },
      { value: "3", title: "3 – 6 anos" },
      { value: "4", title: "6 – 10 anos" },
      { value: "5", title: "Mais de 10 anos" },
    ],
  },
  // Q3
  {
    category: "MOTIVAÇÃO",
    question: "O que mais te motiva a trabalhar com chocolates?",
    options: [
      { value: "1", title: "Paixão e prazer" },
      { value: "2", title: "Reconhecimento profissional" },
      { value: "3", title: "Independência financeira" },
      { value: "4", title: "Renda extra" },
    ],
  },
  // Q4 — FRUSTRAÇÃO (usada na personalização do relatório)
  {
    category: "FRUSTRAÇÃO",
    question: "O que mais te frustra quando tenta vender chocolates?",
    options: [
      { value: "1", title: "Falta de segurança técnica" },
      { value: "2", title: "Não saber cobrar preço" },
      { value: "3", title: "Falta de padrão nos produtos" },
      { value: "4", title: "Medo de errar e perder material" },
    ],
  },
  // Q5
  {
    category: "VENDAS",
    question: "Qual dessas opções representa seu maior canal de vendas?",
    options: [
      { value: "1", title: "Eventos (aniversários, casamentos, festas)" },
      { value: "2", title: "Delivery" },
      { value: "3", title: "Vendas à pronta entrega na loja" },
      { value: "4", title: "Encomendas para datas especiais (ex: Páscoa, Natal)" },
      { value: "5", title: "Internet / redes sociais" },
      { value: "6", title: "Outro" },
    ],
  },
  // Q6 — IMPEDIMENTO (usada na personalização do relatório)
  {
    category: "OBSTÁCULO",
    question: "O que você acredita que mais te impede de crescer hoje?",
    options: [
      { value: "1", title: "Ter tempo de focar nas vendas, pois fico presa na produção" },
      { value: "2", title: "Falta de estrutura para crescer" },
      { value: "3", title: "Concorrência alta e desleal" },
      { value: "4", title: "Imprevisibilidade nas vendas" },
      { value: "5", title: "Falta de demanda na minha região" },
      { value: "6", title: "Outro" },
    ],
  },
  // Q7
  {
    category: "POTENCIAL",
    question: "Se você dominasse mais técnicas de produção e vendas de chocolates finos, isso te ajudaria a vender mais?",
    options: [
      { value: "1", title: "Com certeza" },
      { value: "2", title: "Acredito que sim" },
      { value: "3", title: "Muito provável" },
    ],
  },
  // Q8 — qualificação
  {
    category: "FATURAMENTO",
    question: "Qual é a média do seu faturamento mensal hoje?",
    supportText:
      "Essa informação nos ajuda a personalizar o diagnóstico para o seu momento.",
    options: [
      { value: "1", title: "Até R$ 5.000" },
      { value: "2", title: "De R$ 5.000 até R$ 10.000" },
      { value: "3", title: "De R$ 10.000 até R$ 20.000" },
      { value: "4", title: "Acima de R$ 30.000" },
    ],
  },
];

export const answerLabels: string[][] = [
  [
    "Estou em crescimento mas preciso melhorar",
    "Minha margem de lucro é baixa",
    "Meu negócio vende sem constância",
    "Não tenho organização interna para crescer",
  ],
  [
    "Sim, são meu carro chefe",
    "Os chocolates finos são menos de 50% das minhas vendas",
    "Ainda não, mas quero que sejam o carro chefe",
    "Ainda quero começar a vender chocolates",
  ],
  [
    "Menos de 1 ano",
    "1 – 3 anos",
    "3 – 6 anos",
    "6 – 10 anos",
    "Mais de 10 anos",
  ],
  [
    "Paixão e prazer",
    "Reconhecimento profissional",
    "Independência financeira",
    "Renda extra",
  ],
  [
    "Falta de segurança técnica",
    "Não saber cobrar preço",
    "Falta de padrão nos produtos",
    "Medo de errar e perder material",
  ],
  [
    "Eventos (aniversários, casamentos, festas)",
    "Delivery",
    "Vendas à pronta entrega na loja",
    "Encomendas para datas especiais (ex: Páscoa, Natal)",
    "Internet / redes sociais",
    "Outro",
  ],
  [
    "Ter tempo de focar nas vendas, pois fico presa na produção",
    "Falta de estrutura para crescer",
    "Concorrência alta e desleal",
    "Imprevisibilidade nas vendas",
    "Falta de demanda na minha região",
    "Outro",
  ],
  [
    "Com certeza",
    "Acredito que sim",
    "Muito provável",
  ],
  [
    "Até R$ 5.000",
    "De R$ 5.000 até R$ 10.000",
    "De R$ 10.000 até R$ 20.000",
    "Acima de R$ 30.000",
  ],
];
