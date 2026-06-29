import type { Question } from "../data/questions";
import { ProgressBar } from "./ProgressBar";
import { AnswerOption } from "./AnswerOption";
import { NavigationButtons } from "./NavigationButtons";
import { LogoUnicos } from "./LogoUnicos";

interface QuestionScreenProps {
  question: Question;
  currentQuestion: number;
  totalQuestions: number;
  selectedAnswer: string | null;
  onSelectAnswer: (value: string) => void;
  onBack: () => void;
}

export function QuestionScreen({
  question,
  currentQuestion,
  totalQuestions,
  selectedAnswer,
  onSelectAnswer,
  onBack,
}: QuestionScreenProps) {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-start p-5 pb-12"
      style={{ backgroundColor: "#faf8f4" }}
    >
      <div
        className="w-full flex justify-center pt-6 pb-5"
        style={{ borderBottom: "1px solid rgba(169,128,47,0.15)" }}
      >
        <LogoUnicos size="sm" />
      </div>

      <div className="max-w-2xl w-full mt-6">
        {/* Progresso */}
        <div className="mb-6">
          <ProgressBar current={currentQuestion} total={totalQuestions} />
          <div
            className="flex justify-between mt-2"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            <span style={{ fontSize: "0.78rem", color: "#a9802f", fontWeight: 500 }}>
              Pergunta {currentQuestion} de {totalQuestions}
            </span>
            <span style={{ fontSize: "0.78rem", color: "rgba(22,49,79,0.4)" }}>
              {Math.round((currentQuestion / totalQuestions) * 100)}% completo
            </span>
          </div>
        </div>

        {/* Card da pergunta */}
        <div
          className="rounded-2xl p-7"
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
              fontSize: "clamp(1.2rem, 3vw, 1.55rem)",
              fontWeight: 600,
              color: "#16314f",
              lineHeight: 1.3,
              marginBottom: "8px",
            }}
          >
            {question.question}
          </h2>
          {question.supportText && (
            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "0.85rem",
                color: "rgba(22,49,79,0.5)",
                marginBottom: "6px",
              }}
            >
              {question.supportText}
            </p>
          )}

          <div className="flex flex-col gap-3 mt-6">
            {question.options.map((option) => (
              <AnswerOption
                key={option.value}
                title={option.title}
                selected={selectedAnswer === option.value}
                onClick={() => onSelectAnswer(option.value)}
              />
            ))}
          </div>

          <NavigationButtons onBack={onBack} />
        </div>
      </div>
    </div>
  );
}
