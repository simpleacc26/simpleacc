import { CircleCheck } from "lucide-react";

interface SuccessScreenProps {
  onRestart: () => void;
}

export function SuccessScreen({ onRestart }: SuccessScreenProps) {
  return (
    <div
      className="min-h-screen flex items-center justify-center p-6"
      style={{ backgroundColor: "#1c1c42" }}
    >
      <div className="max-w-2xl w-full text-center">
        <div
          className="rounded-3xl p-12 shadow-xl"
          style={{ backgroundColor: "#292859" }}
        >
          <div className="mb-6 flex justify-center">
            <div
              className="w-20 h-20 rounded-full flex items-center justify-center"
              style={{ backgroundColor: "#c8b28b" }}
            >
              <CircleCheck className="w-10 h-10" style={{ color: "#1c1c42" }} />
            </div>
          </div>
          <h2
            className="mb-4"
            style={{
              fontSize: "2.5rem",
              fontWeight: 500,
              letterSpacing: "-0.02em",
              lineHeight: 1.2,
              color: "#c8b28b",
              fontFamily: "Fahkwang, sans-serif",
              textTransform: "uppercase",
            }}
          >
            Seu diagnóstico foi registrado com sucesso.
          </h2>
          <p
            className="text-xl mb-10 leading-relaxed"
            style={{ color: "rgba(255, 255, 255, 0.85)" }}
          >
            Em breve você receberá a análise completa com os principais pontos
            que estão travando o crescimento do seu modelo de negócio.
          </p>
          <button
            onClick={onRestart}
            className="px-8 py-3 border-2 rounded-xl transition-all hover:opacity-80"
            style={{
              letterSpacing: "-0.01em",
              fontWeight: 500,
              borderColor: "#c8b28b",
              color: "#c8b28b",
              backgroundColor: "transparent",
            }}
          >
            Refazer diagnóstico
          </button>
        </div>
      </div>
    </div>
  );
}
