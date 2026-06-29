interface AnswerOptionProps {
  title: string;
  selected: boolean;
  onClick: () => void;
}

export function AnswerOption({ title, selected, onClick }: AnswerOptionProps) {
  return (
    <button
      onClick={onClick}
      className="w-full text-left rounded-xl transition-all duration-200 focus:outline-none"
      style={{
        padding: "14px 18px",
        backgroundColor: selected
          ? "rgba(169,128,47,0.18)"
          : "rgba(255,255,255,0.04)",
        border: selected
          ? "2px solid #a9802f"
          : "2px solid rgba(255,255,255,0.1)",
        color: selected ? "#f3eee2" : "rgba(255,255,255,0.85)",
        fontWeight: selected ? 500 : 400,
        fontFamily: "'Inter', sans-serif",
        fontSize: "0.95rem",
        lineHeight: 1.45,
        cursor: "pointer",
      }}
    >
      <div className="flex items-start gap-3">
        <span
          style={{
            width: "18px",
            height: "18px",
            borderRadius: "50%",
            border: selected ? "5px solid #a9802f" : "2px solid rgba(255,255,255,0.25)",
            flexShrink: 0,
            marginTop: "2px",
            transition: "all 0.2s",
            display: "inline-block",
          }}
        />
        <span>{title}</span>
      </div>
    </button>
  );
}
