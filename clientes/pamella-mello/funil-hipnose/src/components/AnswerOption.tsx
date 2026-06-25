import { COLORS, accentSoft } from "../theme";

interface AnswerOptionProps {
  title: string;
  description?: string;
  selected: boolean;
  onClick: () => void;
}

export function AnswerOption({
  title,
  description,
  selected,
  onClick,
}: AnswerOptionProps) {
  return (
    <button
      onClick={onClick}
      className="w-full text-left p-6 rounded-2xl border-2 transition-all duration-200 hover:shadow-lg"
      style={{
        borderColor: selected ? COLORS.accent : accentSoft(0.3),
        backgroundColor: selected ? accentSoft(0.1) : "transparent",
      }}
    >
      <div className="flex flex-col gap-2">
        <div className="tracking-tight text-white" style={{ letterSpacing: "-0.01em" }}>
          {title}
        </div>
        {description && (
          <div className="text-sm" style={{ color: COLORS.textMuted }}>
            {description}
          </div>
        )}
      </div>
    </button>
  );
}
