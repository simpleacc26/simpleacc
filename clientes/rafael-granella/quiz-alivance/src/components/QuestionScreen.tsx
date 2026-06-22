import type { Question } from "../data/questions";
import { ProgressBar } from "./ProgressBar";
import { AnswerOption } from "./AnswerOption";
import { NavigationButtons } from "./NavigationButtons";

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
      className="min-h-screen flex items-center justify-center p-6"
      style={{ backgroundColor: "#1c1c42" }}
    >
      <div className="max-w-3xl w-full">
        <div className="mb-8">
          <ProgressBar current={currentQuestion} total={totalQuestions} />
          <div
            className="mt-3 text-sm"
            style={{ color: "rgba(200, 178, 139, 0.8)" }}
          >
            Pergunta {currentQuestion} de {totalQuestions}
          </div>
        </div>

        <div
          className="rounded-3xl p-10 shadow-xl"
          style={{ backgroundColor: "#292859" }}
        >
          <h2
            className="mb-3"
            style={{
              fontSize: "2rem",
              fontWeight: 500,
              letterSpacing: "-0.02em",
              lineHeight: 1.3,
              color: "#c8b28b",
              fontFamily: "Fahkwang, sans-serif",
              textTransform: "uppercase",
            }}
          >
            {question.question}
          </h2>
          {question.supportText && (
            <p className="mb-8" style={{ color: "rgba(255, 255, 255, 0.7)" }}>
              {question.supportText}
            </p>
          )}

          <div className="flex flex-col gap-4 mt-8">
            {question.options.map((option) => (
              <AnswerOption
                key={option.value}
                title={option.title}
                description={option.description}
                selected={selectedAnswer === option.value}
                onClick={() => onSelectAnswer(option.value)}
              />
            ))}
          </div>

          <NavigationButtons onBack={onBack} showContinue={false} />
        </div>
      </div>
    </div>
  );
}
