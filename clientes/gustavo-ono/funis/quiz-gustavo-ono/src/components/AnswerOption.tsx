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
      className="w-full text-left p-5 rounded-2xl border-2 transition-all duration-200 hover:shadow-lg"
      style={{
        borderColor: selected ? "#B08D57" : "rgba(176, 141, 87, 0.25)",
        backgroundColor: selected ? "rgba(176, 141, 87, 0.12)" : "rgba(255,255,255,0.03)",
      }}
    >
      <div className="flex flex-col gap-1.5">
        <div
          className="text-white"
          style={{
            letterSpacing: "-0.01em",
            fontWeight: selected ? 500 : 400,
          }}
        >
          {title}
        </div>
        {description && (
          <div className="text-sm" style={{ color: "rgba(255, 255, 255, 0.6)" }}>
            {description}
          </div>
        )}
      </div>
    </button>
  );
}
