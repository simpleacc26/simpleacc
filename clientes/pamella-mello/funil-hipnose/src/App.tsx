import { useEffect, useState } from "react";
import { questions } from "./data/questions";
import { fbqTrack } from "./analytics";
import { LandingScreen } from "./components/LandingScreen";
import { QuestionScreen } from "./components/QuestionScreen";
import { LeadCaptureForm, type LeadData } from "./components/LeadCaptureForm";
import { ReportScreen } from "./components/ReportScreen";

type Step = "landing" | "question" | "lead-capture" | "report";

interface UtmParams {
  utm_source: string;
  utm_medium: string;
  utm_campaign: string;
  utm_content: string;
  utm_term: string;
}

// Webhook (Make/GHL) opcional. Se vazio, o envio é ignorado — o funil segue
// funcionando para teste/preview.
const WEBHOOK_URL = import.meta.env.VITE_WEBHOOK_URL || "";

// Total de etapas exibidas na barra de progresso (perguntas + captura).
const TOTAL_STEPS = questions.length + 1;

export default function App() {
  const [step, setStep] = useState<Step>("landing");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [leadData, setLeadData] = useState<LeadData | null>(null);
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
    fbqTrack("PageView");
  }, []);

  // Landing: a primeira pergunta inicia o quiz.
  const handleLandingSelect = (value: string) => {
    setAnswers((prev) => ({ ...prev, 0: value }));
    fbqTrack("CompleteRegistration", { content_name: "Início Quiz", status: "started" });
    setStep("question");
    setCurrentIndex(1);
  };

  const handleSelectAnswer = (value: string) => {
    setAnswers((prev) => ({ ...prev, [currentIndex]: value }));
    fbqTrack("ViewContent", {
      content_name: `Pergunta ${currentIndex + 1}`,
      content_category: "Quiz",
    });
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      fbqTrack("InitiateCheckout");
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
    setCurrentIndex(questions.length - 1);
  };

  const handleLeadSubmit = async (data: LeadData) => {
    setLeadData(data);
    fbqTrack("Lead", { content_name: "Leitura Emocional", content_category: "Hipnoterapia" });

    if (WEBHOOK_URL) {
      const answerText = (index: number) => {
        const value = answers[index];
        if (!value || !questions[index]) return "";
        return questions[index].options[parseInt(value) - 1]?.title || "";
      };

      const payload = new URLSearchParams();
      payload.append("nome", data.name);
      payload.append("email", data.email);
      payload.append("telefone", data.phone);
      questions.forEach((question, index) => {
        payload.append(`pergunta_${index + 1}`, question.question);
        payload.append(`resposta_${index + 1}`, answerText(index));
      });
      payload.append("utm_source", utm.utm_source);
      payload.append("utm_medium", utm.utm_medium);
      payload.append("utm_campaign", utm.utm_campaign);
      payload.append("utm_content", utm.utm_content);
      payload.append("utm_term", utm.utm_term);

      try {
        const response = await fetch(WEBHOOK_URL, {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: payload.toString(),
        });
        console.log("Webhook enviado:", response.status);
      } catch (error) {
        console.error("Erro ao enviar webhook:", error);
      }
    }

    setStep("report");
  };

  if (step === "question") {
    return (
      <QuestionScreen
        question={questions[currentIndex]}
        currentQuestion={currentIndex + 1}
        totalQuestions={TOTAL_STEPS}
        selectedAnswer={answers[currentIndex] || null}
        onSelectAnswer={handleSelectAnswer}
        onBack={handleBack}
      />
    );
  }

  if (step === "lead-capture") {
    return (
      <LeadCaptureForm
        totalSteps={TOTAL_STEPS}
        onSubmit={handleLeadSubmit}
        onBack={handleLeadBack}
      />
    );
  }

  if (step === "report" && leadData) {
    return <ReportScreen leadData={leadData} answers={answers} />;
  }

  return (
    <LandingScreen
      question={questions[0]}
      selectedAnswer={answers[0] || null}
      onSelectAnswer={handleLandingSelect}
    />
  );
}
