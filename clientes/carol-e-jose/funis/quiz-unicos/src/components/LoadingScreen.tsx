import { useEffect, useState } from "react";
import { LogoUnicos } from "./LogoUnicos";

const GOLD = "#a9802f";

const PHASES = [
  "Cruzando suas respostas...",
  "Identificando seu perfil de liderança...",
  "Gerando seu diagnóstico...",
  "Quase lá...",
];

export function LoadingScreen() {
  const [progress, setProgress] = useState(0);
  const [phaseIndex, setPhaseIndex] = useState(0);

  useEffect(() => {
    const duration = 2800;
    const startTime = Date.now();
    const tick = setInterval(() => {
      const t = Math.min((Date.now() - startTime) / duration, 1);
      setProgress(Math.round((1 - Math.pow(1 - t, 2.5)) * 100));
      if (t >= 1) clearInterval(tick);
    }, 40);
    return () => clearInterval(tick);
  }, []);

  useEffect(() => {
    const timers = [700, 1500, 2200].map((delay, i) =>
      setTimeout(() => setPhaseIndex(i + 1), delay)
    );
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center p-5"
      style={{ backgroundColor: "#faf8f4" }}
    >
      <div className="mb-14">
        <LogoUnicos size="md" />
      </div>

      <div className="max-w-xs w-full">
        <div className="flex justify-between items-center mb-3">
          <span
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "0.85rem",
              color: "rgba(22,49,79,0.55)",
            }}
          >
            {PHASES[phaseIndex]}
          </span>
          <span
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "0.85rem",
              color: GOLD,
              fontWeight: 600,
              minWidth: "38px",
              textAlign: "right",
            }}
          >
            {progress}%
          </span>
        </div>

        <div
          className="rounded-full overflow-hidden"
          style={{ height: "5px", backgroundColor: "rgba(169,128,47,0.12)" }}
        >
          <div
            className="h-full rounded-full"
            style={{
              width: `${progress}%`,
              backgroundColor: GOLD,
              transition: "width 0.08s linear",
            }}
          />
        </div>
      </div>
    </div>
  );
}
