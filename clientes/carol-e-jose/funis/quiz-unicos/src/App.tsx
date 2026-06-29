import { useEffect, useState } from "react";
import { questions } from "./data/questions";
import { LandingScreen } from "./components/LandingScreen";
import { QuestionScreen } from "./components/QuestionScreen";
import { LeadCaptureForm, type LeadData } from "./components/LeadCaptureForm";
import { AgendamentoPage } from "./pages/AgendamentoPage";

type Step = "landing" | "question" | "lead-capture" | "agendamento";

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

export default function App() {
  const [step, setStep] = useState<Step>("landing");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [leadData, setLeadData] = useState<LeadData | null>(null);
  const [loading, setLoading] = useState(false);
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
    setStep("question");
    setCurrentIndex(1);
  };

  const handleSelectAnswer = (value: string) => {
    const updated = { ...answers, [currentIndex]: value };
    setAnswers(updated);
    if (currentIndex < TOTAL_QUESTIONS - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
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
    setLoading(true);
    setLeadData(data);

    const getAnswerText = (index: number) => {
      const value = answers[index];
      if (!value || !questions[index]) return "";
      return questions[index].options.find((o) => o.value === value)?.title || "";
    };

    const getBucket = () => {
      const opt = questions[1]?.options.find((o) => o.value === answers[1]);
      return opt?.bucket || "";
    };

    const payload = new URLSearchParams();
    payload.append("nome", data.name);
    payload.append("email", data.email);
    payload.append("whatsapp", data.phone);
    payload.append("balde", getBucket());
    questions.forEach((question, index) => {
      payload.append(`pergunta_${index + 1}`, question.question);
      payload.append(`resposta_${index + 1}`, getAnswerText(index));
    });
    payload.append("utm_source", utm.utm_source);
    payload.append("utm_medium", utm.utm_medium);
    payload.append("utm_campaign", utm.utm_campaign);
    payload.append("utm_content", utm.utm_content);
    payload.append("utm_term", utm.utm_term);

    try {
      if (WEBHOOK_URL) {
        await fetch(WEBHOOK_URL, {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: payload.toString(),
        });
      }
    } catch {
      // Não bloqueia o fluxo se o webhook falhar
    }

    setLoading(false);
    setStep("agendamento");
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

  if (step === "lead-capture") {
    return (
      <LeadCaptureForm
        onSubmit={handleLeadSubmit}
        onBack={handleLeadBack}
        loading={loading}
      />
    );
  }

  return <AgendamentoPage leadData={leadData} />;
}
