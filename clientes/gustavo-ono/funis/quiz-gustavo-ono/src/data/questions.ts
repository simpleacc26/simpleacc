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
  // Q0 — landing (pergunta inicial, visível na LandingScreen)
  {
    category: "PERFIL",
    question: "Como você se define hoje?",
    options: [
      {
        value: "1",
        title: "Faço chocolates em casa e quero transformar isso em renda",
      },
      {
        value: "2",
        title: "Já vendo chocolates artesanais, mas quero aumentar meu faturamento",
      },
      {
        value: "3",
        title: "Tenho uma confeitaria estabelecida e quero adicionar chocolates finos",
      },
      {
        value: "4",
        title: "Sou profissional da área e quero me especializar em bombons artísticos",
      },
    ],
  },
  // Q1
  {
    category: "EXPERIÊNCIA",
    question: "Há quanto tempo você trabalha com chocolate artesanal?",
    options: [
      { value: "1", title: "Estou começando agora (menos de 6 meses)" },
      { value: "2", title: "Entre 6 meses e 2 anos de prática" },
      { value: "3", title: "Entre 2 e 5 anos de experiência" },
      { value: "4", title: "Mais de 5 anos no mercado" },
    ],
  },
  // Q2
  {
    category: "PRODUTOS",
    question: "Quais produtos você já produz hoje?",
    options: [
      { value: "1", title: "Trufas e bombons simples" },
      { value: "2", title: "Ovos de Páscoa e chocolates temáticos" },
      { value: "3", title: "Alfajores, barras e tabletes artesanais" },
      { value: "4", title: "Trabalho com vários produtos diferentes" },
    ],
  },
  // Q3
  {
    category: "TÉCNICA",
    question: "Qual é a sua maior dificuldade técnica hoje?",
    options: [
      { value: "1", title: "Temperagem e conseguir brilho perfeito no chocolate" },
      {
        value: "2",
        title: "Criar recheios e ganaches com sabores diferenciados e marcantes",
      },
      { value: "3", title: "Decoração artística e acabamento de alto nível" },
      {
        value: "4",
        title: "Embalagem e apresentação que justifique um preço premium",
      },
    ],
  },
  // Q4 — FRUSTRAÇÃO (usado na personalização do relatório)
  {
    category: "SITUAÇÃO",
    question: "O que mais te frustra no seu negócio de chocolates hoje?",
    options: [
      {
        value: "1",
        title: "Não consigo cobrar o que meu trabalho realmente vale",
      },
      {
        value: "2",
        title: "Meus produtos não têm aparência profissional suficiente",
      },
      {
        value: "3",
        title: "Não tenho clientes em quantidade suficiente ou constante",
      },
      {
        value: "4",
        title: "Não me diferencio das outras confeiteiras no mercado",
      },
    ],
  },
  // Q5
  {
    category: "TENTATIVAS",
    question: "O que você já tentou para resolver essa situação?",
    options: [
      { value: "1", title: "Fiz cursos online, mas sem resultado prático consistente" },
      { value: "2", title: "Tentei vender pelas redes sociais com pouco retorno" },
      { value: "3", title: "Investi em equipamentos melhores" },
      { value: "4", title: "Ainda não tomei uma ação estruturada para resolver" },
    ],
  },
  // Q6 — IMPEDIMENTO (usado na personalização do relatório)
  {
    category: "OBSTÁCULO",
    question: "O que te impede de ir para o próximo nível agora?",
    options: [
      {
        value: "1",
        title: "Falta de técnica específica em bombons artísticos de alto padrão",
      },
      {
        value: "2",
        title: "Não sei como precificar e posicionar meus produtos corretamente",
      },
      { value: "3", title: "Não tenho tempo para aprender novas técnicas" },
      {
        value: "4",
        title: "Tenho medo de investir em algo novo e não ter retorno",
      },
    ],
  },
  // Q7
  {
    category: "OBJETIVO",
    question: "Qual é o seu principal objetivo para os próximos 6 meses?",
    options: [
      {
        value: "1",
        title: "Lançar uma coleção de bombons assinados com identidade própria",
      },
      { value: "2", title: "Triplicar minha renda com chocolates artesanais" },
      { value: "3", title: "Ser reconhecida como referência na minha cidade" },
      { value: "4", title: "Criar um negócio de chocolates online escalável" },
    ],
  },
  // Q8 — qualificação financeira
  {
    category: "QUALIFICAÇÃO",
    question: "Qual é a sua renda mensal com chocolates ou confeitaria hoje?",
    supportText:
      "Essa informação nos ajuda a personalizar o diagnóstico para o seu momento atual.",
    options: [
      { value: "1", title: "Ainda não gero renda (estou começando)" },
      { value: "2", title: "Até R$2.000 por mês" },
      { value: "3", title: "Entre R$2.000 e R$5.000 por mês" },
      { value: "4", title: "Entre R$5.000 e R$10.000 por mês" },
      { value: "5", title: "Acima de R$10.000 por mês" },
    ],
  },
];

// Rótulos para o relatório, indexados por pergunta
export const answerLabels: string[][] = [
  [
    "Faço chocolates em casa e quero transformar isso em renda",
    "Já vendo chocolates artesanais, mas quero aumentar meu faturamento",
    "Tenho uma confeitaria estabelecida e quero adicionar chocolates finos",
    "Sou profissional da área e quero me especializar em bombons artísticos",
  ],
  [
    "Estou começando agora (menos de 6 meses)",
    "Entre 6 meses e 2 anos de prática",
    "Entre 2 e 5 anos de experiência",
    "Mais de 5 anos no mercado",
  ],
  [
    "Trufas e bombons simples",
    "Ovos de Páscoa e chocolates temáticos",
    "Alfajores, barras e tabletes artesanais",
    "Trabalho com vários produtos diferentes",
  ],
  [
    "Temperagem e brilho perfeito no chocolate",
    "Recheios e ganaches com sabores diferenciados",
    "Decoração artística e acabamento de alto nível",
    "Embalagem e apresentação premium",
  ],
  [
    "Não consigo cobrar o que meu trabalho realmente vale",
    "Meus produtos não têm aparência profissional suficiente",
    "Não tenho clientes em quantidade suficiente ou constante",
    "Não me diferencio das outras confeiteiras no mercado",
  ],
  [
    "Fiz cursos online, mas sem resultado prático consistente",
    "Tentei vender pelas redes sociais com pouco retorno",
    "Investi em equipamentos melhores",
    "Ainda não tomei uma ação estruturada para resolver",
  ],
  [
    "Falta de técnica específica em bombons artísticos de alto padrão",
    "Não sei como precificar e posicionar meus produtos corretamente",
    "Não tenho tempo para aprender novas técnicas",
    "Tenho medo de investir em algo novo e não ter retorno",
  ],
  [
    "Lançar uma coleção de bombons assinados com identidade própria",
    "Triplicar minha renda com chocolates artesanais",
    "Ser reconhecida como referência na minha cidade",
    "Criar um negócio de chocolates online escalável",
  ],
  [
    "Ainda não gero renda (estou começando)",
    "Até R$2.000 por mês",
    "Entre R$2.000 e R$5.000 por mês",
    "Entre R$5.000 e R$10.000 por mês",
    "Acima de R$10.000 por mês",
  ],
];
