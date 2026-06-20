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
        borderColor: selected ? "#c8b28b" : "rgba(200, 178, 139, 0.3)",
        backgroundColor: selected ? "rgba(200, 178, 139, 0.1)" : "transparent",
      }}
    >
      <div className="flex flex-col gap-2">
        <div
          className="tracking-tight text-white"
          style={{ letterSpacing: "-0.01em" }}
        >
          {title}
        </div>
        {description && (
          <div className="text-sm" style={{ color: "rgba(255, 255, 255, 0.7)" }}>
            {description}
          </div>
        )}
      </div>
    </button>
  );
}
