import { ChevronLeft } from "lucide-react";
import { COLORS, accentSoft } from "../theme";

interface NavigationButtonsProps {
  onBack?: () => void;
  onContinue?: () => void;
  canContinue?: boolean;
  continueText?: string;
  showBack?: boolean;
  showContinue?: boolean;
}

export function NavigationButtons({
  onBack,
  onContinue,
  canContinue = true,
  continueText = "Continuar",
  showBack = true,
  showContinue = true,
}: NavigationButtonsProps) {
  return (
    <div className="flex items-center justify-between gap-4 mt-8">
      {showBack && onBack ? (
        <button
          onClick={onBack}
          className="flex items-center gap-2 hover:opacity-70 transition-opacity"
          style={{ color: COLORS.accent }}
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Voltar</span>
        </button>
      ) : (
        <div />
      )}
      {showContinue && onContinue && (
        <button
          onClick={(event) => {
            event.preventDefault();
            if (canContinue) onContinue();
          }}
          disabled={!canContinue}
          className="px-8 py-3 rounded-xl transition-all shadow-lg"
          style={{
            letterSpacing: "-0.01em",
            backgroundColor: canContinue ? COLORS.accent : accentSoft(0.3),
            color: canContinue ? COLORS.bg : "rgba(255, 255, 255, 0.4)",
            cursor: canContinue ? "pointer" : "not-allowed",
            opacity: canContinue ? 1 : 0.5,
            pointerEvents: canContinue ? "auto" : "none",
          }}
        >
          {continueText}
        </button>
      )}
    </div>
  );
}
