import { useEffect, useState } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { questions } from "./data/questions";
import { fbqTrack } from "./analytics";
import { LandingScreen } from "./components/LandingScreen";
import { QuestionScreen } from "./components/QuestionScreen";
import { LeadCaptureForm, type LeadData } from "./components/LeadCaptureForm";
import { LoadingScreen } from "./components/LoadingScreen";
import { ReportScreen } from "./components/ReportScreen";

interface UtmParams {
  utm_source: string;
  utm_medium: string;
  utm_campaign: string;
  utm_content: string;
  utm_term: string;
}

interface ResultState {
  leadData: LeadData;
  answers: Record<number, string>;
}

const WEBHOOK_URL =
  import.meta.env.VITE_WEBHOOK_URL ||
  "https://hook.us2.make.com/webrhbzopsinsjep4oxquwrf0m7frfnl";

type QuizStep = "landing" | "question" | "lead-capture" | "loading";

function QuizFlow() {
  const navigate = useNavigate();
  const [step, setStep] = useState<QuizStep>("landing");
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

  const handleLandingSelect = (value: string) => {
    setAnswers((prev) => ({ ...prev, 0: value }));
    fbqTrack("CompleteRegistration", {
      content_name: "Início Quiz",
      status: "started",
    });
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
    fbqTrack("Lead", {
      content_name: "Quiz Diagnóstico",
      content_category: "Chocolate",
    });

    const answerText = (index: number) => {
      const value = answers[index];
      if (!value || !questions[index]) return "";
      return questions[index].options[parseInt(value) - 1]?.title || "";
    };

    const fieldNames = [
      "combinacao",
      "carro_chefe",
      "tempo",
      "motivacao",
      "frustracao",
      "canal_de_vendas",
      "impedimento",
      "dominasse",
      "seguranca",
    ];

    const payload = new URLSearchParams();
    payload.append("nome", data.name);
    payload.append("email", data.email);
    payload.append("whatsapp", data.phone);
    fieldNames.forEach((field, index) => {
      payload.append(field, answerText(index));
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

    setStep("loading");
  };

  const handleLoadingComplete = () => {
    if (!leadData) return;
    const resultState: ResultState = { leadData, answers };
    sessionStorage.setItem("quizResult", JSON.stringify(resultState));
    navigate("/resultado", { state: resultState });
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
        currentQuestion={currentIndex + 1}
        totalQuestions={questions.length}
        selectedAnswer={answers[currentIndex] || null}
        onSelectAnswer={handleSelectAnswer}
        onBack={handleBack}
      />
    );
  }

  if (step === "lead-capture") {
    return <LeadCaptureForm onSubmit={handleLeadSubmit} onBack={handleLeadBack} />;
  }

  if (step === "loading") {
    return <LoadingScreen onComplete={handleLoadingComplete} />;
  }

  return null;
}

function ResultPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const state: ResultState | null =
    location.state ||
    (() => {
      try {
        return JSON.parse(sessionStorage.getItem("quizResult") || "null");
      } catch {
        return null;
      }
    })();

  useEffect(() => {
    if (!state) {
      navigate("/", { replace: true });
    }
  }, [state, navigate]);

  if (!state) return null;

  return <ReportScreen leadData={state.leadData} answers={state.answers} />;
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<QuizFlow />} />
      <Route path="/resultado" element={<ResultPage />} />
    </Routes>
  );
}
