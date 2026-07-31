// Diagnóstico de Maturidade do Negócio — ÚNICOS
// Perguntas, ordem e textos = exatamente o v4 do cliente (feedback do José).
// Uma pergunta por tela (auto-avanço). A "Pergunta 4" tem duas telas (quem coordena e
// quantas pessoas), ambas com num=4, contadas como 4 de 7.
// Sem travessões "—" na copy (regra do cliente).

export interface Option {
  value: string;
  title: string;
  description?: string;
}

export interface Question {
  /** chave estável usada pela pontuação e pelo roteamento */
  id: string;
  /** número exibido ao lead ("Pergunta {num} de 7"); a P4 tem duas telas com num=4 */
  num: number;
  category: string;
  question: string;
  supportText?: string;
  /** habilita campo aberto "Qual?" quando a última opção for "Outro" */
  allowOther?: boolean;
  options: Option[];
}

/** Máximo exibido no contador ("de 7"). */
export const MAX_NUM = 7;

export const questions: Question[] = [
  {
    id: "autonomia",
    num: 1,
    category: "DIAGNÓSTICO",
    question: "Quantos dias seguidos a sua empresa roda sem ninguém precisar te ligar?",
    options: [
      { value: "1", title: "Nenhum, sempre me procuram" },
      { value: "2", title: "De um a três dias" },
      { value: "3", title: "Cerca de uma semana" },
      { value: "4", title: "Duas semanas ou mais" },
    ],
  },
  {
    id: "setor",
    num: 2,
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
    num: 3,
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
    num: 4,
    category: "DIAGNÓSTICO",
    question: "Quem coordena as áreas da sua empresa hoje?",
    options: [
      { value: "1", title: "Ninguém, tudo passa por mim" },
      { value: "2", title: "Encarregados que tocam a rotina, mas me consultam para decidir" },
      { value: "3", title: "Coordenadores ou gerentes que respondem por uma área inteira" },
      { value: "4", title: "Gestores que já lideram outros líderes" },
    ],
  },
  {
    id: "tamanho",
    num: 4,
    category: "DIAGNÓSTICO",
    question: "Quantas pessoas trabalham na empresa hoje?",
    options: [
      { value: "1", title: "Até 20" },
      { value: "2", title: "De 20 a 50" },
      { value: "3", title: "De 50 a 100" },
      { value: "4", title: "De 100 a 300" },
      { value: "5", title: "Mais de 300" },
    ],
  },
  {
    id: "decisao",
    num: 5,
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
    num: 6,
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
    num: 7,
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
];
