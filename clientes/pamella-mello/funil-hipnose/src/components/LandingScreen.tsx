import type { Question } from "../data/questions";
import { COLORS, accentSoft, displayHeading } from "../theme";

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
      className="min-h-screen flex items-center justify-center p-6"
      style={{ backgroundColor: COLORS.bg }}
    >
      <div className="max-w-2xl w-full">
        <div
          className="rounded-3xl p-10 sm:p-12 shadow-xl"
          style={{ backgroundColor: COLORS.card }}
        >
          <h1
            className="mb-4 text-center"
            style={{
              ...displayHeading,
              fontSize: "clamp(1.6rem, 4.5vw, 2.25rem)",
            }}
          >
            Descubra a origem emocional do que te trava — e o caminho para
            resolver de vez
          </h1>
          <p
            className="mb-2 text-center"
            style={{ color: COLORS.textBody, lineHeight: 1.6 }}
          >
            7 perguntas rápidas. No final, você recebe uma leitura personalizada
            do seu cenário emocional e do tipo de acompanhamento que faz sentido
            pra você.
          </p>
          <p
            className="mb-10 text-center text-sm"
            style={{ color: COLORS.textMuted }}
          >
            Leva ~2 minutos · 100% confidencial
          </p>

          <div className="space-y-6">
            <div>
              <div
                className="mb-3"
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
              <h2 className="text-2xl mb-6" style={{ color: COLORS.textHigh, fontWeight: 500 }}>
                {question.question}
              </h2>
            </div>

            <div className="space-y-3">
              {question.options.map((option) => (
                <button
                  key={option.value}
                  onClick={() => onSelectAnswer(option.value)}
                  className="w-full text-left p-5 rounded-xl transition-all"
                  style={{
                    backgroundColor:
                      selectedAnswer === option.value
                        ? COLORS.accent
                        : "rgba(255, 255, 255, 0.05)",
                    color:
                      selectedAnswer === option.value ? COLORS.bg : "rgba(255, 255, 255, 0.9)",
                    border:
                      selectedAnswer === option.value
                        ? `2px solid ${COLORS.accent}`
                        : `2px solid ${accentSoft(0.18)}`,
                    fontWeight: selectedAnswer === option.value ? 500 : 400,
                  }}
                >
                  <div>{option.title}</div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
