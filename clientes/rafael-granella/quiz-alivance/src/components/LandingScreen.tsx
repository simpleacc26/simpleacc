import type { Question } from "../data/questions";

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
      style={{ backgroundColor: "#1c1c42" }}
    >
      <div className="max-w-2xl w-full">
        <div
          className="rounded-3xl p-12 shadow-xl"
          style={{ backgroundColor: "#292859" }}
        >
          <h1
            className="mb-12 text-center"
            style={{
              fontSize: "clamp(1.5rem, 4vw, 2rem)",
              fontWeight: 500,
              letterSpacing: "-0.02em",
              lineHeight: 1.3,
              color: "#c8b28b",
              fontFamily: "Fahkwang, sans-serif",
            }}
          >
            Descubra em 30 segundos por que sua mentoria ainda não opera como um
            negócio de educação e o que está travando seu próximo salto.
          </h1>

          <div className="space-y-8">
            <div>
              <div
                className="mb-3"
                style={{
                  color: "#c8b28b",
                  fontSize: "0.875rem",
                  fontWeight: 500,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                }}
              >
                {question.category}
              </div>
              <h2
                className="text-2xl mb-6"
                style={{ color: "rgba(255, 255, 255, 0.95)", fontWeight: 500 }}
              >
                {question.question}
              </h2>
              {question.supportText && (
                <p
                  className="mb-6"
                  style={{ color: "rgba(255, 255, 255, 0.6)", fontSize: "0.875rem" }}
                >
                  {question.supportText}
                </p>
              )}
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
                        ? "#c8b28b"
                        : "rgba(255, 255, 255, 0.05)",
                    color:
                      selectedAnswer === option.value
                        ? "#1c1c42"
                        : "rgba(255, 255, 255, 0.9)",
                    border:
                      selectedAnswer === option.value
                        ? "2px solid #c8b28b"
                        : "2px solid rgba(255, 255, 255, 0.1)",
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
