import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { questions, MAX_NUM } from "../data/questions";
import { LandingScreen } from "../components/LandingScreen";
import { QuestionScreen } from "../components/QuestionScreen";
import { LeadCaptureForm } from "../components/LeadCaptureForm";
import type { LeadData } from "../lib/leads";
import { enviarLead } from "../lib/leads";
import { computeResultado, type Answers } from "../lib/scoring";
import { captureUtm, getUtm } from "../lib/session";
import { track } from "../lib/analytics";

type Step = "landing" | "question" | "lead";

export function DiagnosticoPage() {
  const nav = useNavigate();
  const [step, setStep] = useState<Step>("landing");
  const [idx, setIdx] = useState(0); // índice em questions[]
  const [answers, setAnswers] = useState<Answers>({});
  const [otherSetor, setOtherSetor] = useState<string>("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const utm = captureUtm();
    track.inicio({ ...utm });
  }, []);

  const resultado = useMemo(() => computeResultado(answers), [answers]);

  const persistResultado = (a: Answers) => {
    const r = computeResultado(a);
    try {
      sessionStorage.setItem("unicos_resultado", JSON.stringify(r));
      sessionStorage.setItem("unicos_answers", JSON.stringify(a));
      if (otherSetor) sessionStorage.setItem("unicos_setor_outro", otherSetor);
    } catch { /* ignore */ }
    return r;
  };

  const goResultado = (a: Answers) => {
    const r = persistResultado(a);
    const utm = getUtm();
    track.resultado({ rota: r.rota, aprovacao: r.aprovacao, balde: r.balde, ...utm });

    if (r.rota === "fora-papel") {
      track.forapapel({ ...utm }); // contagem anônima, sem formulário
      nav("/comunidade?motivo=papel");
      return;
    }
    if (r.rota === "abaixo-piso") {
      track.abaixopiso({ ...utm });
      nav("/comunidade?motivo=porte");
      return;
    }
    // qualificado: segue para captura de lead
    setStep("lead");
  };

  // Landing -> registra Q1 e vai para a pergunta 2
  const handleLanding = (value: string) => {
    const a = { ...answers, [questions[0].id]: value };
    setAnswers(a);
    track.pergunta(1, questions[0].id);
    setIdx(1);
    setStep("question");
  };

  const handleAnswer = (value: string, other?: string) => {
    const q = questions[idx];
    const a: Answers = { ...answers, [q.id]: value };
    if (q.allowOther && other) setOtherSetor(other);
    setAnswers(a);
    track.pergunta(q.num, q.id);

    if (idx < questions.length - 1) {
      setIdx(idx + 1);
    } else {
      goResultado(a);
    }
  };

  const handleBack = () => {
    if (step === "lead") { setStep("question"); setIdx(questions.length - 1); return; }
    if (idx > 1) setIdx(idx - 1);
    else { setIdx(0); setStep("landing"); }
  };

  const handleLeadSubmit = async (data: LeadData) => {
    setSubmitting(true);
    const utm = getUtm();
    track.leadCapturado({ aprovacao: resultado.aprovacao, balde: resultado.balde, ...utm });
    if (resultado.aprovacao === "pleno" || resultado.aprovacao === "tier2") {
      track.leadAprovado({ aprovacao: resultado.aprovacao, balde: resultado.balde, ...utm });
    }
    await enviarLead(data, answers, resultado, utm, otherSetor);
    try { sessionStorage.setItem("unicos_lead", JSON.stringify({ nome: data.nome })); } catch { /* ignore */ }
    setSubmitting(false);
    nav("/agendamento");
  };

  if (step === "landing") return <LandingScreen onSelect={handleLanding} />;
  if (step === "lead") return <LeadCaptureForm onSubmit={handleLeadSubmit} onBack={handleBack} submitting={submitting} />;

  const q = questions[idx];
  return (
    <QuestionScreen
      question={q}
      index={q.num}
      total={MAX_NUM}
      answer={answers[q.id]}
      otherText={otherSetor}
      onAnswer={handleAnswer}
      onBack={handleBack}
      canGoBack={true}
    />
  );
}
