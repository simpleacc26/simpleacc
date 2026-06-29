export interface Option {
  value: string;
  title: string;
  bucket?: string;
  qualifies?: boolean;
  isICP?: boolean;
}

export interface Question {
  category: string;
  question: string;
  supportText?: string;
  options: Option[];
}

export const questions: Question[] = [
  {
    category: "IDENTIFICAÇÃO",
    question: "Qual o setor da sua empresa?",
    options: [
      { value: "1", title: "Serviços / operações B2B", qualifies: true },
      { value: "2", title: "Digital / infoproduto / mentoria", qualifies: true },
      { value: "3", title: "Comércio / varejo", qualifies: true },
      { value: "4", title: "Indústria", qualifies: true },
    ],
  },
  {
    category: "DIAGNÓSTICO",
    question: "O que mais drena a sua energia como líder hoje?",
    options: [
      {
        value: "1",
        title: "Sou o ponto de aprovação de quase toda decisão",
        bucket: "Refém da Operação",
      },
      {
        value: "2",
        title: "Tenho equipe, mas turnover alto e ninguém assume ownership",
        bucket: "Time sem Dono",
      },
      {
        value: "3",
        title: "Perdi tração e vejo o concorrente avançar enquanto estagno",
        bucket: "Consolidado mas Estagnado",
      },
      {
        value: "4",
        title: "Já implementei mentorias e ferramentas, mas nada engrena com o time",
        bucket: "O Frustrado",
      },
    ],
  },
  {
    category: "DIAGNÓSTICO",
    question: "Quando uma decisão crítica aparece, o que costuma acontecer?",
    options: [
      { value: "1", title: "Resolvo eu mesmo, é mais rápido do que delegar" },
      { value: "2", title: "Acompanho de perto até a entrega sair" },
      { value: "3", title: "O time decide dentro da alçada e me reporta" },
      { value: "4", title: "Já está em processo e roda sem depender de mim" },
    ],
  },
  {
    category: "DIAGNÓSTICO",
    question: "Para destravar isso, o que você já tentou e não colou de vez?",
    options: [
      { value: "1", title: "Mentorias e aceleradoras de gestão" },
      { value: "2", title: "Troquei ou reforcei o time com gente de mercado" },
      { value: "3", title: "Implantei ERP, ferramentas e indicadores" },
      { value: "4", title: "Tentei me afastar, mas acabei recentralizando" },
    ],
  },
  {
    category: "DIAGNÓSTICO",
    question: "Nos próximos 12 meses, o que você mais quer destravar?",
    options: [
      { value: "1", title: "Sair do operacional e recuperar minha agenda" },
      { value: "2", title: "Um time com alçada, que decide como dono" },
      { value: "3", title: "Voltar a crescer com previsibilidade e método" },
      { value: "4", title: "Formar liderança que sustente a escala" },
    ],
  },
  {
    category: "QUALIFICAÇÃO",
    question: "Qual é o seu papel na empresa?",
    options: [
      { value: "1", title: "Dono ou sócio, decido os rumos", qualifies: true },
      { value: "2", title: "Sócio com voz na decisão", qualifies: true },
      { value: "3", title: "Diretor ou C-level", qualifies: true },
      { value: "4", title: "Gestor ou colaborador", qualifies: false },
    ],
  },
  {
    category: "QUALIFICAÇÃO",
    question: "Qual o faturamento MENSAL da empresa que você lidera?",
    supportText:
      "Essa informação define o tipo de diagnóstico que vamos entregar para você.",
    options: [
      { value: "1", title: "Até R$ 50 mil", qualifies: false },
      { value: "2", title: "De R$ 50 mil a R$ 100 mil", qualifies: true },
      { value: "3", title: "De R$ 100 mil a R$ 300 mil", qualifies: true },
      { value: "4", title: "De R$ 300 mil a R$ 500 mil", qualifies: true, isICP: true },
      { value: "5", title: "Acima de R$ 500 mil", qualifies: true, isICP: true },
    ],
  },
];

export const BUCKET_LABELS: Record<string, string> = {
  "1": "Refém da Operação",
  "2": "Time sem Dono",
  "3": "Consolidado mas Estagnado",
  "4": "O Frustrado",
};
