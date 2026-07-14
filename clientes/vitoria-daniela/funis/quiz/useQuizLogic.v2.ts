import { useState, useEffect, useCallback, useMemo } from 'react';

export type Question = {
  id: string;
  text: string;
  options: string[];
  contextType?: 'BALDE' | 'CONTEXT' | 'TICKET' | 'APOIO' | 'FATURAMENTO' | 'INVESTIMENTO';
};

export const QUESTIONS: Question[] = [
  {
    id: 'q1',
    text: 'Hoje, qual dessas frases mais descreve a sua realidade?',
    contextType: 'BALDE',
    options: [
      'Tenho vendas instáveis, sem controle sobre quando vem cliente',
      'Já tentei marketing, conteúdo ou anúncios e não converteu em venda',
      'Vendo bem, mas dependo de mim pra fechar tudo e não consigo me afastar',
      'Meu negócio vende bem, mas não sei me posicionar como referência no mercado',
      'Já tenho estrutura e previsibilidade, quero otimizar e escalar',
    ],
  },
  {
    id: 'q2',
    text: 'Como está estruturada a execução do marketing e vendas no seu negócio hoje?',
    contextType: 'CONTEXT',
    options: [
      'Faço tudo sozinha, da entrega ao marketing',
      'Tenho equipe de entrega/operação, mas nada de marketing/vendas',
      'Tenho pelo menos 1 pessoa cuidando de marketing ou vendas',
      'Tenho estrutura de marketing e comercial rodando',
    ],
  },
  {
    id: 'q3',
    text: 'Qual é o ticket médio do serviço que você vende hoje?',
    contextType: 'TICKET',
    options: [
      'Até R$1.000',
      'Entre R$1.000 e R$3.000',
      'Entre R$3.000 e R$10.000',
      'Acima de R$10.000',
    ],
  },
  {
    id: 'q4',
    text: 'O que mais faria a diferença para o seu negócio atualmente?',
    contextType: 'APOIO',
    options: [
      'Um direcionamento e acompanhamento do que eu preciso fazer',
      'Um acompanhamento individual de médio prazo para eu aprender a estruturar meu ecossistema de vendas e marketing',
      'Profissionais que executem tudo pra mim',
      'O equilíbrio entre acompanhamento individual e profissionais que cuidam de tudo pra mim',
    ],
  },
  {
    id: 'q5',
    text: 'Qual desses cenários mais representa seu momento com relação a investir em uma solução pra isso agora?',
    contextType: 'INVESTIMENTO',
    options: [
      'Sei que preciso resolver, mas não é prioridade agora',
      'Quero resolver, mas não posso investir agora',
      'Quero resolver, mas meu caixa está apertado no momento',
      'Quero resolver e tenho como viabilizar investimento se fizer sentido',
    ],
  },
  {
    id: 'q6',
    text: 'Qual é o faturamento médio mensal do seu negócio hoje?',
    contextType: 'FATURAMENTO',
    options: [
      'Até R$5 mil',
      'Entre R$5 mil e R$20 mil',
      'Entre R$20 mil e R$50 mil',
      'Entre R$50 mil e R$100 mil',
      'Acima de R$100 mil',
    ],
  },
];

export type Answers = Record<string, string>;

const BALDE_MAP: Record<string, string> = {
  'Tenho vendas instáveis, sem controle sobre quando vem cliente': 'Sem Previsibilidade',
  'Já tentei marketing, conteúdo ou anúncios e não converteu em venda': 'Marketing Sem Sistema',
  'Vendo bem, mas dependo de mim pra fechar tudo e não consigo me afastar': 'Refém da Operação',
  'Meu negócio vende bem, mas não sei me posicionar como referência no mercado': 'Sem Posicionamento',
  'Já tenho estrutura e previsibilidade, quero otimizar e escalar': 'Pronta para Escalar',
};

const DESQUALIFYING_FATURAMENTO = ['Até R$5 mil', 'Entre R$5 mil e R$20 mil'];
const DESQUALIFYING_INVESTIMENTO = [
  'Sei que preciso resolver, mas não é prioridade agora',
  'Quero resolver, mas não posso investir agora',
];

export const useQuizLogic = () => {
  const [currentStep, setCurrentStep] = useState(0); // 0-5 = Questions, 6 = Lead Form, 7 = Success
  const [answers, setAnswers] = useState<Answers>({});
  const [utms, setUtms] = useState<Record<string, string>>({});
  const [meta, setMeta] = useState<Record<string, any>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionError, setSubmissionError] = useState(false);

  useEffect(() => {
    // Capture UTMs and Meta
    const params = new URLSearchParams(window.location.search);
    const capturedUtms: Record<string, string> = {};
    ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'].forEach((key) => {
      const val = params.get(key);
      if (val) capturedUtms[key] = val;
    });
    setUtms(capturedUtms);

    setMeta({
      page_url: window.location.href,
      referrer: document.referrer,
      timestamp: new Date().toISOString(),
      user_agent: navigator.userAgent,
    });
  }, []);

  const getBalde = (answers: Answers) => BALDE_MAP[answers['q1']] ?? 'Sem Previsibilidade';

  // Camada mapeia direto para o ICP: Camada A (Implementação Magna, 72-80k),
  // Camada B (Mentoria Magnetizze, 15k), ou fora do perfil (segue para
  // nutrição, não vai para a agenda do comercial). Ver
  // clientes/vitoria-daniela/estrategia/2026-07-06-diagnostico-leads-desqualificados.md
  const getCamada = (answers: Answers) => {
    const faturamento = answers['q6'];
    const investimento = answers['q5'];
    const estrutura = answers['q2'];
    const ticket = answers['q3'];

    if (
      DESQUALIFYING_FATURAMENTO.includes(faturamento) ||
      DESQUALIFYING_INVESTIMENTO.includes(investimento)
    ) {
      return 'Fora do perfil (nutrição)';
    }

    const estruturaMinima = estrutura !== 'Faço tudo sozinha, da entrega ao marketing';
    const ticketAlto = ticket === 'Entre R$3.000 e R$10.000' || ticket === 'Acima de R$10.000';
    const investimentoPronto =
      investimento === 'Quero resolver e tenho como viabilizar investimento se fizer sentido';
    const faturamentoAlto =
      faturamento === 'Entre R$50 mil e R$100 mil' || faturamento === 'Acima de R$100 mil';

    if (faturamentoAlto && estruturaMinima && investimentoPronto && ticketAlto) {
      return 'Camada A (Implementação Magna)';
    }

    return 'Camada B (Mentoria Magnetizze)';
  };

  const handleStart = useCallback(() => setCurrentStep(0), []);

  const handleAnswer = useCallback((questionId: string, answer: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: answer }));
    setTimeout(() => {
      setCurrentStep((prev) => prev + 1);
    }, 350);
  }, []);

  const handleBack = useCallback(() => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  }, [currentStep]);

  const submitLead = useCallback(async (data: { name: string; email: string; whatsapp: string }) => {
    setIsSubmitting(true);
    setSubmissionError(false);

    const balde = getBalde(answers);
    const camada = getCamada(answers);
    const modelo_apoio = answers['q4'];

    const payload = {
      ...data,
      answers,
      balde,
      camada,
      modelo_apoio,
      utms,
      meta,
    };

    try {
      const WEBHOOK_URL = 'https://hook.us2.make.com/j7wh9ki8ae9qrkeb279w73e3hx3iesgr';

      const res = await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error('Failed');

      setCurrentStep(7); // Success (0-5 perguntas, 6 lead form, 7 sucesso)
    } catch (e) {
      console.error(e);
      setSubmissionError(true);
    } finally {
      setIsSubmitting(false);
    }
  }, [answers, utms, meta]);

  const currentQuestion = useMemo(() => QUESTIONS[currentStep], [currentStep]);

  return {
    currentStep,
    totalSteps: QUESTIONS.length,
    currentQuestion,
    answers,
    handleStart,
    handleAnswer,
    handleBack,
    submitLead,
    isSubmitting,
    submissionError,
  };
};
