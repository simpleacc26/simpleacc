// Quiz da Pâmella Mello — ordem SPIN do doc de Estratégia (aprovado):
// baixa fricção primeiro, qualificação (perfil + geografia + prontidão) por
// último. As três perguntas de qualificação (7a/7b/7c do doc) viram as
// perguntas 7, 8 e 9 para caber no fluxo de uma pergunta por tela.
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
    category: "SITUAÇÃO",
    question: "Como você descreveria seu momento emocional hoje?",
    options: [
      { value: "1", title: "Sobrecarregado(a), funcionando no automático" },
      { value: "2", title: "Ansioso(a) a maior parte do tempo" },
      { value: "3", title: 'Sinto um vazio, mesmo quando tudo "parece bem"' },
      { value: "4", title: "Travado(a), repetindo os mesmos padrões há tempos" },
    ],
  },
  {
    category: "PROBLEMA",
    question: "O que mais pesa no seu dia a dia?",
    options: [
      { value: "1", title: "Não consigo desligar a mente / não descanso de verdade" },
      { value: "2", title: "Me cobro demais e nunca está bom o suficiente" },
      { value: "3", title: "Sabotei coisas importantes pra mim sem entender por quê" },
      { value: "4", title: "Sinto que ninguém entende de verdade o que eu sinto" },
    ],
  },
  {
    category: "HÁ QUANTO TEMPO",
    question: "Há quanto tempo você convive com isso?",
    options: [
      { value: "1", title: "Começou recentemente (últimos meses)" },
      { value: "2", title: "Mais de 1 ano" },
      { value: "3", title: "Vários anos — virou parte de como eu funciono" },
      { value: "4", title: 'Desde sempre, parece que é "do meu jeito"' },
    ],
  },
  {
    category: "IMPACTO",
    question: "Como isso já afetou o que importa pra você?",
    options: [
      { value: "1", title: "Meus relacionamentos" },
      { value: "2", title: "Meu trabalho / minha renda" },
      { value: "3", title: "Minha saúde (sono, corpo, energia)" },
      { value: "4", title: "Tudo isso ao mesmo tempo" },
    ],
  },
  {
    category: "O QUE JÁ TENTOU",
    question: "O que você já tentou para melhorar?",
    options: [
      { value: "1", title: "Terapia convencional — ajudou, mas não resolveu a raiz" },
      { value: "2", title: "Medicação" },
      { value: "3", title: "Conteúdo, autoajuda, força de vontade" },
      { value: "4", title: "Ainda não tentei nada estruturado" },
    ],
  },
  {
    category: "OBJETIVO",
    question: "Se você pudesse mudar uma coisa nos próximos meses, seria:",
    options: [
      { value: "1", title: "Parar de viver em estado de alerta / ter paz" },
      { value: "2", title: "Quebrar os padrões que eu repito" },
      { value: "3", title: "Entender de uma vez por que eu sinto o que sinto" },
      { value: "4", title: "Voltar a sentir prazer e leveza na vida" },
    ],
  },
  {
    category: "PARA QUEM É",
    question: "Este atendimento é para:",
    options: [
      { value: "1", title: "Mim" },
      { value: "2", title: "Meu filho(a) / adolescente" },
      { value: "3", title: "Meu parceiro(a) ou familiar" },
      { value: "4", title: "Ainda não sei" },
    ],
  },
  {
    category: "ONDE VOCÊ ESTÁ",
    question: "Onde você está?",
    options: [
      { value: "1", title: "Contagem / Belo Horizonte e região (posso ir presencialmente)" },
      { value: "2", title: "Em Minas, mas fora da região metropolitana" },
      { value: "3", title: "Em outro estado (faria por atendimento online)" },
      { value: "4", title: "Fora do Brasil" },
    ],
  },
  {
    category: "O PRÓXIMO PASSO",
    question:
      "Você está buscando um processo terapêutico estruturado e definitivo — mesmo que represente um investimento maior do que uma sessão avulsa?",
    options: [
      { value: "1", title: "Sim, quero resolver de vez e entendo que isso é um investimento" },
      { value: "2", title: "Sim, mas preciso entender melhor como funciona antes" },
      { value: "3", title: "No momento, busco algo mais pontual / de menor custo" },
      { value: "4", title: "Só estou pesquisando por enquanto" },
    ],
  },
];

// Rótulos para a geração do relatório, derivados das próprias perguntas.
export const answerLabels: string[][] = questions.map((q) =>
  q.options.map((o) => o.title),
);
