interface ProgressBarProps {
  current: number;
  total: number;
}

export function ProgressBar({ current, total }: ProgressBarProps) {
  const percentage = (current / total) * 100;
  return (
    <div
      className="w-full h-1 rounded-full overflow-hidden"
      style={{ backgroundColor: "rgba(200, 123, 117, 0.2)" }}
    >
      <div
        className="h-full transition-all duration-500 ease-out"
        style={{ width: `${percentage}%`, backgroundColor: "#C87B75" }}
      />
    </div>
  );
}
