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
      className="min-h-screen flex items-center justify-center p-5"
      style={{ backgroundColor: "#1A0900" }}
    >
      <div className="max-w-2xl w-full">
        <div className="mb-6">
          <ProgressBar current={currentQuestion} total={totalQuestions} />
          <div
            className="mt-2 text-sm"
            style={{ color: "rgba(200, 123, 117, 0.7)" }}
          >
            Pergunta {currentQuestion} de {totalQuestions}
          </div>
        </div>

        <div
          className="rounded-3xl p-8 md:p-10 shadow-2xl"
          style={{ backgroundColor: "#2D1108" }}
        >
          <h2
            className="mb-3"
            style={{
              fontSize: "clamp(1.2rem, 3vw, 1.6rem)",
              fontWeight: 600,
              lineHeight: 1.35,
              color: "#FBF1EE",
              fontFamily: "Lora, Georgia, serif",
            }}
          >
            {question.question}
          </h2>
          {question.supportText && (
            <p
              className="mb-6 text-sm"
              style={{ color: "rgba(251, 241, 238, 0.6)" }}
            >
              {question.supportText}
            </p>
          )}

          <div className="flex flex-col gap-3 mt-6">
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
