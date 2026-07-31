// Diagnóstico de Maturidade do Negócio — ÚNICOS
// Estrutura adotada dos documentos reformulados por Carol e José (v4) + margem (decisão do cliente).
// Regra de vocabulário (Guia da Nova Campanha): o TOPO e a leitura falam a língua da COMUNICAÇÃO
// (dependência da presença, oportunidade que passa). A qualificação usa a língua da QUALIFICAÇÃO
// (papel, camada de liderança, faturamento, margem). Nunca misturar as duas.
// Sem travessões "—" na copy (regra do cliente).

export interface Option {
  value: string;
  title: string;
  description?: string;
}

export interface SubQuestion {
  id: string;
  question: string;
  options: Option[];
}

export interface Question {
  /** chave estável usada pela pontuação e pelo roteamento */
  id: string;
  category: string;
  question: string;
  supportText?: string;
  footer?: string;
  options: Option[];
  /** habilita campo aberto "Qual?" quando a última opção for "Outro" */
  allowOther?: boolean;
  /** segunda seleção na mesma tela (Pergunta 4: quem coordena + tamanho do time) */
  secondPart?: SubQuestion;
}

const defs: Question[] = [
  {
    id: "autonomia",
    category: "DIAGNÓSTICO",
    question: "Quantos dias seguidos a sua empresa roda sem ninguém precisar te ligar?",
    footer: "Depois de um certo tamanho, o limite deixa de estar no mercado.",
    options: [
      { value: "1", title: "Nenhum, sempre me procuram" },
      { value: "2", title: "De um a três dias" },
      { value: "3", title: "Cerca de uma semana" },
      { value: "4", title: "Duas semanas ou mais" },
    ],
  },
  {
    id: "setor",
    category: "IDENTIFICAÇÃO",
    question: "Qual o setor da sua empresa?",
    allowOther: true,
    options: [
      { value: "industria", title: "Indústria" },
      { value: "servicos", title: "Serviços" },
      { value: "b2b", title: "Operações B2B" },
      { value: "comercio", title: "Comércio ou varejo" },
      { value: "outro", title: "Outro" },
    ],
  },
  {
    id: "papel",
    category: "QUALIFICAÇÃO",
    question: "Qual é o seu papel na empresa?",
    options: [
      { value: "dono", title: "Dono ou sócio, decido os rumos" },
      { value: "socio", title: "Sócio, participo das decisões" },
      { value: "exec", title: "Diretor ou executivo, respondo ao dono" },
      { value: "nenhuma", title: "Nenhuma dessas" },
    ],
  },
  {
    id: "lideranca",
    category: "DIAGNÓSTICO",
    question: "Quem coordena as áreas da sua empresa hoje?",
    options: [
      { value: "1", title: "Ninguém, tudo passa por mim" },
      { value: "2", title: "Encarregados que tocam a rotina, mas me consultam para decidir" },
      { value: "3", title: "Coordenadores ou gerentes que respondem por uma área inteira" },
      { value: "4", title: "Gestores que já lideram outros líderes" },
    ],
    secondPart: {
      id: "tamanho",
      question: "Quantas pessoas trabalham na empresa hoje?",
      options: [
        { value: "1", title: "Até 20" },
        { value: "2", title: "De 20 a 50" },
        { value: "3", title: "De 50 a 100" },
        { value: "4", title: "De 100 a 300" },
        { value: "5", title: "Mais de 300" },
      ],
    },
  },
  {
    id: "decisao",
    category: "DIAGNÓSTICO",
    question: "Quando aparece uma decisão importante, o que costuma acontecer?",
    options: [
      { value: "1", title: "Resolvo eu mesmo, é mais rápido do que explicar" },
      { value: "2", title: "Acompanho de perto até a entrega sair" },
      { value: "3", title: "O time decide até certo ponto e me reporta" },
      { value: "4", title: "O time decide e resolve sem me envolver" },
    ],
  },
  {
    id: "tentativas",
    category: "DIAGNÓSTICO",
    question: "O que você já tentou para resolver isso e não funcionou como esperava?",
    options: [
      { value: "1", title: "Mentoria, consultoria ou aceleradora de gestão" },
      { value: "2", title: "Contratei gente de mercado para assumir" },
      { value: "3", title: "Implantei ERP, ferramentas e indicadores" },
      { value: "4", title: "Tentei me afastar e acabei voltando para o centro" },
      { value: "5", title: "Todas as alternativas acima" },
    ],
  },
  {
    id: "faturamento",
    category: "QUALIFICAÇÃO",
    question: "Qual o faturamento anual da sua empresa?",
    supportText: "Essa informação define o tipo de análise que vamos preparar para você.",
    options: [
      { value: "1", title: "Até R$1 milhão" },
      { value: "2", title: "De R$1 a R$3 milhões" },
      { value: "3", title: "De R$3 a R$10 milhões" },
      { value: "4", title: "De R$10 a R$30 milhões" },
      { value: "5", title: "Acima de R$30 milhões" },
    ],
  },
  {
    id: "margem",
    category: "QUALIFICAÇÃO",
    question: "Da sua receita anual, quanto sobra de lucro para você (margem líquida aproximada)?",
    supportText: "Fica entre nós. Ajuda a calibrar a análise ao momento real do seu negócio.",
    options: [
      { value: "1", title: "Menos de 10%" },
      { value: "2", title: "Entre 10% e 20%" },
      { value: "3", title: "Entre 20% e 30%" },
      { value: "4", title: "Acima de 30%" },
      { value: "5", title: "Não sei dizer com precisão" },
    ],
  },
];

// Ordem ASK: baixa fricção primeiro, storytelling clínico (o lead relata, nós
// diagnosticamos), faturamento e margem sempre no fim.
const ORDEM_ASK = ["setor", "papel", "autonomia", "decisao", "lideranca", "tentativas", "faturamento", "margem"];
export const questions: Question[] = ORDEM_ASK.map((id) => defs.find((q) => q.id === id)!);

/** Total de "perguntas" exibidas ao lead (Pergunta 4 conta como uma só, com duas partes). */
export const TOTAL_PERGUNTAS = questions.length;
