import { ArrowLeft, ArrowRight } from "lucide-react";

interface NavigationButtonsProps {
  onBack?: () => void;
  onContinue?: () => void;
  canContinue?: boolean;
  continueText?: string;
  showContinue?: boolean;
  loading?: boolean;
}

export function NavigationButtons({
  onBack,
  onContinue,
  canContinue = true,
  continueText = "Continuar",
  showContinue = false,
  loading = false,
}: NavigationButtonsProps) {
  return (
    <div className="flex items-center justify-between mt-8 gap-4">
      {onBack ? (
        <button
          onClick={onBack}
          className="flex items-center gap-2 transition-opacity hover:opacity-80"
          style={{
            color: "rgba(255,255,255,0.5)",
            fontFamily: "'Inter', sans-serif",
            fontSize: "0.875rem",
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: "8px 0",
          }}
        >
          <ArrowLeft className="w-4 h-4" />
          Voltar
        </button>
      ) : (
        <div />
      )}

      {(showContinue || onContinue) && (
        <button
          onClick={onContinue}
          disabled={!canContinue || loading}
          className="flex items-center gap-2 rounded-xl transition-all"
          style={{
            padding: "13px 28px",
            backgroundColor: canContinue && !loading ? "#a9802f" : "rgba(169,128,47,0.3)",
            color: canContinue && !loading ? "#fff" : "rgba(255,255,255,0.4)",
            fontFamily: "'Inter', sans-serif",
            fontWeight: 600,
            fontSize: "0.9rem",
            letterSpacing: "0.03em",
            border: "none",
            cursor: canContinue && !loading ? "pointer" : "not-allowed",
            transition: "all 0.2s",
          }}
        >
          {loading ? "Enviando..." : continueText}
          {!loading && <ArrowRight className="w-4 h-4" />}
        </button>
      )}
    </div>
  );
}
