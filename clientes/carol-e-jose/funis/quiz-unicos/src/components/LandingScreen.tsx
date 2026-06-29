import type { Question } from "../data/questions";
import { LogoUnicos } from "./LogoUnicos";
import { AnswerOption } from "./AnswerOption";

interface LandingScreenProps {
  question: Question;
  selectedAnswer: string | null;
  onSelectAnswer: (value: string) => void;
}

const NAVY_CARD = "#1e3d61";

export function LandingScreen({
  question,
  selectedAnswer,
  onSelectAnswer,
}: LandingScreenProps) {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-start p-5 pb-12"
      style={{ backgroundColor: "#16314f" }}
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
              color: "#f3eee2",
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
              color: "rgba(243,238,226,0.75)",
              lineHeight: 1.6,
              maxWidth: "520px",
              margin: "0 auto",
            }}
          >
            Em 2 minutos, descubra o gargalo invisível que te mantém refém da
            operação, mesmo faturando alto.
          </p>
        </div>

        {/* Boxes É para você / NÃO é para você */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
          <div
            className="rounded-xl p-4"
            style={{
              backgroundColor: "rgba(31,107,79,0.12)",
              border: "1px solid rgba(31,107,79,0.35)",
            }}
          >
            <p
              style={{
                fontSize: "0.7rem",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "#4db88a",
                fontWeight: 700,
                marginBottom: "8px",
              }}
            >
              É para você se...
            </p>
            <ul className="space-y-2">
              {[
                "Decide os rumos (dono, sócio ou C-level)",
                "Já tem escala, fatura múltiplos milhões por ano",
                "Cresceu, mas mantém a gestão da época da fundação",
              ].map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2"
                  style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.8)" }}
                >
                  <span style={{ color: "#4db88a", flexShrink: 0, marginTop: "1px" }}>
                    ✓
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div
            className="rounded-xl p-4"
            style={{
              backgroundColor: "rgba(157,47,47,0.1)",
              border: "1px solid rgba(157,47,47,0.3)",
            }}
          >
            <p
              style={{
                fontSize: "0.7rem",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "#e07070",
                fontWeight: 700,
                marginBottom: "8px",
              }}
            >
              NÃO é para você se...
            </p>
            <ul className="space-y-2">
              {[
                "Está em sobrevivência ou busca fórmula mágica",
                "Ainda não atingiu escala",
                "Não tem autonomia de decisão",
              ].map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2"
                  style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.8)" }}
                >
                  <span style={{ color: "#e07070", flexShrink: 0, marginTop: "1px" }}>
                    ✕
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Card Q1 */}
        <div
          className="rounded-2xl p-7 shadow-xl"
          style={{ backgroundColor: NAVY_CARD }}
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
              color: "#f3eee2",
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
              color: "rgba(243,238,226,0.4)",
              textAlign: "center",
              marginTop: "18px",
            }}
          >
            Selecione uma opção para continuar
          </p>
        </div>

        {/* Frase de marca */}
        <p
          style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: "0.9rem",
            fontStyle: "italic",
            color: "rgba(169,128,47,0.7)",
            textAlign: "center",
            marginTop: "28px",
          }}
        >
          Aqui não falta grana. Falta uma nova maneira de liderar.
        </p>
      </div>
    </div>
  );
}
