import { useEffect, useState } from "react";

interface LoadingScreenProps {
  onComplete: () => void;
}

const STEPS = [
  { at: 0, label: "Analisando suas respostas..." },
  { at: 35, label: "Identificando seu perfil..." },
  { at: 65, label: "Preparando seu diagnóstico personalizado..." },
  { at: 90, label: "Quase pronto..." },
];

export function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [label, setLabel] = useState(STEPS[0].label);

  useEffect(() => {
    const DURATION = 3000;
    const INTERVAL = 30;
    const step = 100 / (DURATION / INTERVAL);

    const timer = setInterval(() => {
      setProgress((prev) => {
        const next = Math.min(prev + step, 100);

        const current = [...STEPS]
          .reverse()
          .find((s) => next >= s.at);
        if (current) setLabel(current.label);

        if (next >= 100) {
          clearInterval(timer);
          setTimeout(onComplete, 200);
        }
        return next;
      });
    }, INTERVAL);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <div
      className="min-h-screen flex items-center justify-center p-6"
      style={{ backgroundColor: "#1A0900" }}
    >
      <div className="w-full max-w-sm flex flex-col items-center gap-8">
        {/* Ícone / logo */}
        <div
          className="w-16 h-16 rounded-full flex items-center justify-center"
          style={{ backgroundColor: "rgba(200, 123, 117, 0.12)", border: "1px solid rgba(200,123,117,0.25)" }}
        >
          <svg
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#C87B75"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M9 11l3 3L22 4" />
            <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
          </svg>
        </div>

        {/* Labels */}
        <div className="w-full text-center">
          <p
            className="text-sm mb-6 transition-all duration-500"
            style={{ color: "rgba(251, 241, 238, 0.7)", minHeight: "1.25rem" }}
          >
            {label}
          </p>

          {/* Barra */}
          <div
            className="w-full h-1.5 rounded-full overflow-hidden"
            style={{ backgroundColor: "rgba(200, 123, 117, 0.15)" }}
          >
            <div
              className="h-full rounded-full transition-all duration-100 ease-linear"
              style={{ width: `${progress}%`, backgroundColor: "#C87B75" }}
            />
          </div>

          <div
            className="mt-3 text-xs tabular-nums"
            style={{ color: "rgba(200, 123, 117, 0.6)" }}
          >
            {Math.round(progress)}%
          </div>
        </div>
      </div>
    </div>
  );
}
