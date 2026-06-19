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
  {
    category: "PERFIL",
    question: "Qual das opções abaixo melhor descreve você hoje?",
    options: [
      {
        value: "1",
        title:
          "Já atuo como mentor, coach ou consultor e quero escalar ou mudar o modelo",
      },
      {
        value: "2",
        title:
          "Sou empresário com negócio estabelecido e quero criar ou estruturar uma mentoria",
      },
      {
        value: "3",
        title:
          "Sou reconhecido no meu nicho mas nunca monetizei isso como mentor",
      },
      {
        value: "4",
        title:
          "Estou começando a construir minha presença como mentor ou consultor",
      },
    ],
  },
  {
    category: "SITUAÇÃO",
    question: "Como você estrutura a entrega da sua mentoria hoje?",
    options: [
      { value: "1", title: "Sessões individuais por demanda" },
      { value: "2", title: "Programa fechado com prazo definido" },
      { value: "3", title: "Clube ou grupo com membros recorrentes" },
      { value: "4", title: "Combino individual com grupo" },
    ],
  },
  {
    category: "PROBLEMA",
    question: "Qual é o maior gargalo no seu negócio de mentoria hoje?",
    options: [
      { value: "1", title: "Previsibilidade de aquisição de clientes" },
      { value: "2", title: "Ticket médio abaixo do que meu trabalho vale" },
      { value: "3", title: "Escalar sem depender só de mim" },
      {
        value: "4",
        title:
          "Não tenho clareza sobre qual modelo de negócio faz sentido agora",
      },
    ],
  },
  {
    category: "IMPLICAÇÃO",
    question: "E como isso está impactando o seu negócio hoje?",
    options: [
      { value: "1", title: "Minha receita está estagnada mesmo com agenda cheia" },
      {
        value: "2",
        title: "Dependo de indicação e networking para fechar clientes",
      },
      { value: "3", title: "Gasto tempo demais em operação e pouco em estratégia" },
      { value: "4", title: "Não sei qual é o próximo movimento certo para escalar" },
    ],
  },
  {
    category: "NECESSIDADE",
    question: "O que você já tentou para resolver esse gargalo?",
    options: [
      { value: "1", title: "Aumentei o preço da mentoria" },
      {
        value: "2",
        title: "Criei um formato em grupo para escalar atendimentos",
      },
      { value: "3", title: "Investi em tráfego pago ou marketing digital" },
      { value: "4", title: "Ainda não tomei uma ação estruturada para resolver" },
    ],
  },
  {
    category: "OBJETIVO",
    question: "Qual é o seu objetivo principal para os próximos 12 meses?",
    options: [
      { value: "1", title: "Romper a barreira de R$100k por mês com consistência" },
      { value: "2", title: "Faturar mais trabalhando menos horas por semana" },
      {
        value: "3",
        title: "Transformar minha mentoria em um negócio de educação estruturado",
      },
      { value: "4", title: "Aumentar meu ticket médio sem perder clientes" },
    ],
  },
  {
    category: "QUALIFICAÇÃO FINANCEIRA",
    question:
      "Qual é o seu faturamento médio mensal com mentoria e/ou consultoria?",
    supportText:
      "Essa informação define o tipo de diagnóstico que vamos entregar para você.",
    options: [
      { value: "1", title: "Abaixo de R$20.000" },
      { value: "2", title: "Entre R$20.000 e R$50.000" },
      { value: "3", title: "Entre R$50.000 e R$100.000" },
      { value: "4", title: "Entre R$100.000 e R$300.000" },
      { value: "5", title: "Entre R$300.000 e R$500.000" },
      { value: "6", title: "Acima de R$500.000" },
    ],
  },
];

// Rótulos usados na geração do relatório, indexados por pergunta.
export const answerLabels: string[][] = [
  [
    "Já atuo como mentor, coach ou consultor e quero escalar ou mudar o modelo",
    "Sou empresário com negócio estabelecido e quero criar ou estruturar uma mentoria",
    "Sou reconhecido no meu nicho mas nunca monetizei isso como mentor",
    "Estou começando a construir minha presença como mentor ou consultor",
  ],
  [
    "Sessões individuais por demanda",
    "Programa fechado com prazo definido",
    "Clube ou grupo com membros recorrentes",
    "Combino individual com grupo",
  ],
  [
    "Previsibilidade de aquisição de clientes",
    "Ticket médio abaixo do que meu trabalho vale",
    "Escalar sem depender só de mim",
    "Não tenho clareza sobre qual modelo de negócio faz sentido agora",
  ],
  [
    "Minha receita está estagnada mesmo com agenda cheia",
    "Dependo de indicação e networking para fechar clientes",
    "Gasto tempo demais em operação e pouco em estratégia",
    "Não sei qual é o próximo movimento certo para escalar",
  ],
  [
    "Aumentei o preço da mentoria",
    "Criei um formato em grupo para escalar atendimentos",
    "Investi em tráfego pago ou marketing digital",
    "Ainda não tomei uma ação estruturada para resolver",
  ],
  [
    "Romper a barreira de R$100k por mês com consistência",
    "Faturar mais trabalhando menos horas por semana",
    "Transformar minha mentoria em um negócio de educação estruturado",
    "Aumentar meu ticket médio sem perder clientes",
  ],
  [
    "Abaixo de R$20.000",
    "Entre R$20.000 e R$50.000",
    "Entre R$50.000 e R$100.000",
    "Entre R$100.000 e R$300.000",
    "Entre R$300.000 e R$500.000",
    "Acima de R$500.000",
  ],
];
