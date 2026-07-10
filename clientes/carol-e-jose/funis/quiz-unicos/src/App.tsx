import { useEffect, useState } from "react";
import { questions, calcScore, calcTier } from "./data/questions";
import { fbqTrack } from "./analytics";
import { LandingScreen } from "./components/LandingScreen";
import { QuestionScreen } from "./components/QuestionScreen";
import { LeadCaptureForm, type LeadData } from "./components/LeadCaptureForm";
import { AgendamentoPage } from "./pages/AgendamentoPage";
import { DiagnosticoPage, getBucketFromSlug, getSlugFromBucket } from "./pages/DiagnosticoPage";
import { GateBlockPage } from "./pages/GateBlockPage";
import { LoadingScreen } from "./components/LoadingScreen";

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

export default function App() {
  const initPath = window.location.pathname;
  const initSlug = initPath.startsWith("/diagnostico/") ? initPath.replace("/diagnostico/", "") : null;
  const initBucket = initSlug ? (getBucketFromSlug(initSlug) ?? "Refém da Operação") : "Refém da Operação";
  const initStep: Step = initPath === "/agendamento" ? "agendamento" : initSlug ? "diagnostico" : "landing";
  const [step, setStep] = useState<Step>(initStep);
  const [bucket, setBucket] = useState<string>(initBucket);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [leadData, setLeadData] = useState<LeadData | null>(null);
  const [isQualified, setIsQualified] = useState(true);
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
      // Última pergunta (faturamento): TODOS preenchem o formulário para
      // entrar na base de leads. O destino final (agenda x comunidade) é
      // decidido no envio, em handleLeadSubmit.
      fbqTrack("InitiateCheckout", { content_name: "Captura de Lead Quiz ÚNICOS" });
      setStep("lead-capture");
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

    // Faturamento abaixo de R$1M/ano (≈ R$83 mil/mês) → fora do ICP,
    // independentemente do setor. Q7 (índice 6): "1" = Até R$50 mil e
    // "2" = R$50–100 mil. O lead já entrou na base pelo webhook acima, mas é
    // direcionado à comunidade — nunca à agenda nem ao diagnóstico de sessão.
    const faturamentoMensal = answers[TOTAL_QUESTIONS - 1];
    if (faturamentoMensal === "1" || faturamentoMensal === "2") {
      fbqTrack("Lead", {
        content_name: "Lead Quiz ÚNICOS",
        content_category: "Fora do perfil (faturamento)",
      });
      setStep("gate-block");
      return;
    }

    const qualified = calcIsQualified(answers) && !isOutOfICP(answers);
    fbqTrack("Lead", {
      content_name: "Lead Quiz ÚNICOS",
      content_category: qualified ? "Qualificado" : "Desqualificado",
    });
    if (qualified) {
      fbqTrack("Schedule");
    }
    const bucketName = questions[3]?.options.find((o) => o.value === answers[3])?.bucket ?? "Refém da Operação";
    const slug = getSlugFromBucket(bucketName);
    setIsQualified(qualified);
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
    return <GateBlockPage />;
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
      <DiagnosticoPage
        bucket={bucket}
        isQualified={isQualified}
        leadData={leadData}
        onSchedule={handleSchedule}
      />
    );
  }

  return <AgendamentoPage leadData={leadData} isQualified={isQualified} />;
}
