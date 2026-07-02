import type { Question } from "../data/questions";
import { LogoUnicos } from "./LogoUnicos";
import { AnswerOption } from "./AnswerOption";

interface LandingScreenProps {
  question: Question;
  selectedAnswer: string | null;
  onSelectAnswer: (value: string) => void;
}

export function LandingScreen({
  question,
  selectedAnswer,
  onSelectAnswer,
}: LandingScreenProps) {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-start p-5 pb-12"
      style={{ backgroundColor: "#faf8f4" }}
    >
      {/* Header com logo */}
      <div
        className="w-full flex justify-center pt-8 pb-6"
        style={{ borderBottom: "1px solid rgba(169,128,47,0.2)" }}
      >
        <LogoUnicos size="md" />
      </div>

      <div className="max-w-2xl w-full mt-8">
        {/* Headline */}
        <div className="text-center mb-8 px-2">
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "0.75rem",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "#a9802f",
              fontWeight: 600,
              marginBottom: "12px",
            }}
          >
            Diagnóstico de Liderança
          </p>
          <h1
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: "clamp(1.6rem, 4vw, 2.1rem)",
              fontWeight: 700,
              color: "#16314f",
              lineHeight: 1.25,
              marginBottom: "14px",
            }}
          >
            Você levou sua empresa aos 7 dígitos.
          </h1>
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "1rem",
              color: "rgba(22,49,79,0.65)",
              lineHeight: 1.6,
              maxWidth: "520px",
              margin: "0 auto",
            }}
          >
            Em 2 minutos, descubra o gargalo invisível que te mantém refém da operação, mesmo faturando alto.
          </p>
        </div>

        {/* Card Q1 */}
        <div
          className="rounded-2xl p-7 shadow-sm"
          style={{
            backgroundColor: "#ffffff",
            border: "1px solid rgba(169,128,47,0.15)",
            boxShadow: "0 4px 24px rgba(22,49,79,0.08)",
          }}
        >
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "0.72rem",
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "#a9802f",
              fontWeight: 700,
              marginBottom: "10px",
            }}
          >
            {question.category}
          </p>
          <h2
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: "1.25rem",
              fontWeight: 600,
              color: "#16314f",
              marginBottom: "20px",
              lineHeight: 1.3,
            }}
          >
            {question.question}
          </h2>
          <div className="flex flex-col gap-3">
            {question.options.map((option) => (
              <AnswerOption
                key={option.value}
                title={option.title}
                selected={selectedAnswer === option.value}
                onClick={() => onSelectAnswer(option.value)}
              />
            ))}
          </div>
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "0.78rem",
              color: "rgba(22,49,79,0.35)",
              textAlign: "center",
              marginTop: "18px",
            }}
          >
            Selecione uma opção para continuar
          </p>
        </div>


      </div>
    </div>
  );
}
