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
      className="min-h-screen flex items-center justify-center p-5"
      style={{ backgroundColor: "#1A0900" }}
    >
      <div className="max-w-2xl w-full">
        {/* Logo / assinatura */}
        <div className="text-center mb-8">
          <p
            className="text-sm tracking-widest uppercase"
            style={{ color: "rgba(200, 123, 117, 0.7)", letterSpacing: "0.15em" }}
          >
            Gustavo Ono · Chocolatier
          </p>
        </div>

        <div
          className="rounded-3xl p-8 md:p-12 shadow-2xl"
          style={{ backgroundColor: "#2D1108" }}
        >
          {/* Headline */}
          <h1
            className="mb-3 text-center"
            style={{
              fontSize: "clamp(1.4rem, 4vw, 1.9rem)",
              fontWeight: 600,
              lineHeight: 1.3,
              color: "#FBF1EE",
              fontFamily: "Lora, Georgia, serif",
            }}
          >
            Descubra o que está travando seus chocolates artesanais de alcançar
            o{" "}
            <em style={{ color: "#C87B75" }}>nível profissional</em> que você
            merece.
          </h1>
          <p
            className="text-center mb-10"
            style={{
              color: "rgba(251, 241, 238, 0.6)",
              fontSize: "0.95rem",
              marginTop: "0.75rem",
            }}
          >
            Diagnóstico gratuito · Resultado em 2 minutos
          </p>

          {/* Pergunta de perfil */}
          <div>
            <h2
              className="mb-6"
              style={{
                fontSize: "1.2rem",
                fontWeight: 500,
                color: "rgba(251, 241, 238, 0.95)",
                lineHeight: 1.4,
              }}
            >
              {question.question}
            </h2>

            <div className="space-y-3">
              {question.options.map((option) => (
                <button
                  key={option.value}
                  onClick={() => onSelectAnswer(option.value)}
                  className="w-full text-left p-5 rounded-xl transition-all duration-200"
                  style={{
                    backgroundColor:
                      selectedAnswer === option.value
                        ? "rgba(200, 123, 117, 0.15)"
                        : "rgba(255, 255, 255, 0.04)",
                    color:
                      selectedAnswer === option.value
                        ? "#FBF1EE"
                        : "rgba(251, 241, 238, 0.85)",
                    border:
                      selectedAnswer === option.value
                        ? "2px solid #C87B75"
                        : "2px solid rgba(200, 123, 117, 0.2)",
                    fontWeight: selectedAnswer === option.value ? 500 : 400,
                  }}
                >
                  {option.title}
                </button>
              ))}
            </div>
          </div>

          <p
            className="text-center mt-8 text-xs"
            style={{ color: "rgba(251, 241, 238, 0.35)" }}
          >
            Selecione uma opção para começar
          </p>
        </div>
      </div>
    </div>
  );
}
