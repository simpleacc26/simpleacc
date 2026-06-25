import type { Question } from "../data/questions";
import { COLORS, accentSoft, displayHeading } from "../theme";
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
      style={{ backgroundColor: COLORS.bg }}
    >
      <div className="max-w-3xl w-full">
        <div className="mb-8">
          <ProgressBar current={currentQuestion} total={totalQuestions} />
          <div className="mt-3 text-sm" style={{ color: accentSoft(0.8) }}>
            Pergunta {currentQuestion} de {totalQuestions}
          </div>
        </div>

        <div className="rounded-3xl p-8 sm:p-10 shadow-xl" style={{ backgroundColor: COLORS.card }}>
          <div
            className="mb-4"
            style={{
              color: COLORS.accent,
              fontSize: "0.8rem",
              fontWeight: 500,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
            }}
          >
            {question.category}
          </div>
          <h2 className="mb-3" style={{ ...displayHeading, fontSize: "clamp(1.5rem, 3.5vw, 2rem)" }}>
            {question.question}
          </h2>
          {question.supportText && (
            <p className="mb-8" style={{ color: COLORS.textBody }}>
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
