import { lazy, Suspense, useEffect, useState } from "react";
import { questions, calcScore, calcTier } from "./data/questions";
import { getBucketFromSlug, getSlugFromBucket } from "./data/buckets";
import { fbqTrack } from "./analytics";
import { LandingScreen } from "./components/LandingScreen";
import { QuestionScreen } from "./components/QuestionScreen";
import { LeadCaptureForm, type LeadData } from "./components/LeadCaptureForm";
import { LoadingScreen } from "./components/LoadingScreen";

// Páginas mostradas depois do quiz → carregadas sob demanda (lazy), para
// deixar o bundle inicial (landing + quiz) o mais leve e rápido possível.
const DiagnosticoPage = lazy(() =>
  import("./pages/DiagnosticoPage").then((m) => ({ default: m.DiagnosticoPage }))
);
const AgendamentoPage = lazy(() =>
  import("./pages/AgendamentoPage").then((m) => ({ default: m.AgendamentoPage }))
);
const GateBlockPage = lazy(() =>
  import("./pages/GateBlockPage").then((m) => ({ default: m.GateBlockPage }))
);

// Fallback neutro (fundo creme) enquanto o chunk da página carrega — evita
// flash branco.
function PageFallback() {
  return <div style={{ minHeight: "100vh", backgroundColor: "#faf8f4" }} />;
}

type Step = "landing" | "question" | "lead-capture" | "gate-block" | "loading" | "diagnostico" | "agendamento";

interface UtmParams {
  utm_source: string;
  utm_medium: string;
  utm_campaign: string;
  utm_content: string;
  utm_term: string;
}

const WEBHOOK_URL =
  import.meta.env.VITE_WEBHOOK_URL || "";

// Índice 0 = landing (P1), índice 1..6 = P2..P7
const TOTAL_QUESTIONS = questions.length;

function calcIsQualified(answers: Record<number, string>): boolean {
  return calcScore(answers) >= 35;
}

// Regra extra de ICP: indústria de menor porte tocada por quem não decide.
// Q1 (setor) índice 0, Q2 (cargo) índice 1, Q7 (faturamento mensal) índice 6.
// R$3M/ano ≈ R$250 mil/mês → faixas "1","2","3" (até R$300 mil/mês) contam como abaixo.
// Cargos sem poder de decisão: "3" (executivo recente) e "4" (gestor com autonomia parcial).
function isOutOfICP(answers: Record<number, string>): boolean {
  const industria = answers[0] === "4";
  const abaixo3M = answers[6] === "1" || answers[6] === "2" || answers[6] === "3";
  const semDecisao = answers[1] === "3" || answers[1] === "4";
  return industria && abaixo3M && semDecisao;
}

// Qualificação de ICP consolidada, decidida já a partir das respostas do quiz
// (não depende do formulário). Falha em qualquer regra → desqualificado.
function isICPQualified(answers: Record<number, string>): boolean {
  const faturamento = answers[6]; // Q7 (faturamento mensal)
  const abaixoDoPiso = faturamento === "1" || faturamento === "2"; // < R$1M/ano
  if (abaixoDoPiso) return false;
  if (isOutOfICP(answers)) return false;
  return calcIsQualified(answers);
}

export default function App() {
  const initPath = window.location.pathname;
  // Desqualificados usam /comunidade; qualificados usam /diagnostico/<bucket>.
  // Assim, "diagnostico" na URL identifica exclusivamente os qualificados.
  const isComunidade = initPath === "/comunidade";
  const initSlug = initPath.startsWith("/diagnostico/") ? initPath.replace("/diagnostico/", "") : null;
  const initBucket = initSlug ? (getBucketFromSlug(initSlug) ?? "Refém da Operação") : "Refém da Operação";
  const initStep: Step = initPath === "/agendamento" ? "agendamento" : (initSlug || isComunidade) ? "diagnostico" : "landing";
  const initQualified = !isComunidade;
  const [step, setStep] = useState<Step>(initStep);
  const [bucket, setBucket] = useState<string>(initBucket);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [leadData, setLeadData] = useState<LeadData | null>(null);
  const [isQualified, setIsQualified] = useState(initQualified);
  const [utm, setUtm] = useState<UtmParams>({
    utm_source: "",
    utm_medium: "",
    utm_campaign: "",
    utm_content: "",
    utm_term: "",
  });

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setUtm({
      utm_source: params.get("utm_source") || "",
      utm_medium: params.get("utm_medium") || "",
      utm_campaign: params.get("utm_campaign") || "",
      utm_content: params.get("utm_content") || "",
      utm_term: params.get("utm_term") || "",
    });
  }, []);

  // Prefetch das próximas páginas durante os momentos ociosos, para que já
  // estejam prontas quando o lead avançar (sem espera após o quiz).
  useEffect(() => {
    if (step === "question") import("./pages/DiagnosticoPage");
    if (step === "diagnostico" && isQualified) import("./pages/AgendamentoPage");
  }, [step, isQualified]);

  const handleLandingSelect = (value: string) => {
    setAnswers((prev) => ({ ...prev, 0: value }));
    fbqTrack("ViewContent", { content_name: "Quiz Iniciado", content_category: "Quiz ÚNICOS" });
    setStep("question");
    setCurrentIndex(1);
  };

  const handleSelectAnswer = (value: string) => {
    const updated = { ...answers, [currentIndex]: value };
    setAnswers(updated);
    if (currentIndex < TOTAL_QUESTIONS - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      // Última pergunta: a qualificação é decidida agora, a partir das respostas.
      const bucketName = questions[3]?.options.find((o) => o.value === updated[3])?.bucket ?? "Refém da Operação";
      if (isICPQualified(updated)) {
        // ICP: coleta os dados (formulário) e segue para o diagnóstico → agenda.
        fbqTrack("InitiateCheckout", { content_name: "Captura de Lead Quiz ÚNICOS" });
        setStep("lead-capture");
      } else {
        // Desqualificado: sem formulário — vai direto ao diagnóstico com o
        // botão da comunidade.
        fbqTrack("Lead", { content_name: "Lead Quiz ÚNICOS", content_category: "Desqualificado" });
        setIsQualified(false);
        setBucket(bucketName);
        setStep("diagnostico");
        // URL exclusiva dos desqualificados: /comunidade (sem "diagnostico"),
        // para separar claramente no traqueamento.
        window.history.pushState({}, "", "/comunidade");
      }
    }
  };

  const handleBack = () => {
    if (currentIndex > 1) {
      setCurrentIndex(currentIndex - 1);
    } else {
      setStep("landing");
    }
  };

  const handleLeadBack = () => {
    setStep("question");
    setCurrentIndex(TOTAL_QUESTIONS - 1);
  };

  const handleLeadSubmit = async (data: LeadData) => {
    setLeadData(data);
    setStep("loading");

    const getAnswerText = (index: number) => {
      const value = answers[index];
      if (!value || !questions[index]) return "";
      return questions[index].options.find((o) => o.value === value)?.title || "";
    };

    const getBucket = () => {
      const opt = questions[3]?.options.find((o) => o.value === answers[3]);
      return opt?.bucket || "";
    };

    const score = calcScore(answers);
    const tier = calcTier(score);

    const payload = new URLSearchParams();
    payload.append("nome", data.name);
    payload.append("email", data.email);
    payload.append("whatsapp", data.phone);
    payload.append("empresa", data.company || "");
    payload.append("balde", getBucket());
    payload.append("pontuacao", score.toString());
    payload.append("tier", tier);
    questions.forEach((question, index) => {
      payload.append(`pergunta_${index + 1}`, question.question);
      payload.append(`resposta_${index + 1}`, getAnswerText(index));
    });
    payload.append("utm_source", utm.utm_source);
    payload.append("utm_medium", utm.utm_medium);
    payload.append("utm_campaign", utm.utm_campaign);
    payload.append("utm_content", utm.utm_content);
    payload.append("utm_term", utm.utm_term);

    const minDelay = new Promise<void>((resolve) => setTimeout(resolve, 3000));
    const webhookCall = WEBHOOK_URL
      ? fetch(WEBHOOK_URL, {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: payload.toString(),
        }).catch(() => {})
      : Promise.resolve();

    await Promise.all([webhookCall, minDelay]);

    // Apenas leads ICP (qualificados) chegam ao formulário; os demais já foram
    // direcionados ao diagnóstico/comunidade sem coletar dados.
    fbqTrack("Lead", { content_name: "Lead Quiz ÚNICOS", content_category: "Qualificado" });
    fbqTrack("Schedule");
    const bucketName = questions[3]?.options.find((o) => o.value === answers[3])?.bucket ?? "Refém da Operação";
    const slug = getSlugFromBucket(bucketName);
    setIsQualified(true);
    setBucket(bucketName);
    setStep("diagnostico");
    window.history.pushState({}, "", `/diagnostico/${slug}`);
  };

  const handleSchedule = () => {
    setStep("agendamento");
    window.history.pushState({}, "", "/agendamento");
  };

  if (step === "landing") {
    return (
      <LandingScreen
        question={questions[0]}
        selectedAnswer={answers[0] || null}
        onSelectAnswer={handleLandingSelect}
      />
    );
  }

  if (step === "question") {
    return (
      <QuestionScreen
        question={questions[currentIndex]}
        currentQuestion={currentIndex}
        totalQuestions={TOTAL_QUESTIONS - 1}
        selectedAnswer={answers[currentIndex] || null}
        onSelectAnswer={handleSelectAnswer}
        onBack={handleBack}
      />
    );
  }

  if (step === "gate-block") {
    return (
      <Suspense fallback={<PageFallback />}>
        <GateBlockPage />
      </Suspense>
    );
  }

  if (step === "lead-capture") {
    return (
      <LeadCaptureForm
        onSubmit={handleLeadSubmit}
        onBack={handleLeadBack}
      />
    );
  }

  if (step === "loading") {
    return <LoadingScreen />;
  }

  if (step === "diagnostico") {
    return (
      <Suspense fallback={<PageFallback />}>
        <DiagnosticoPage
          bucket={bucket}
          isQualified={isQualified}
          leadData={leadData}
          onSchedule={handleSchedule}
        />
      </Suspense>
    );
  }

  return (
    <Suspense fallback={<PageFallback />}>
      <AgendamentoPage leadData={leadData} isQualified={isQualified} />
    </Suspense>
  );
}
