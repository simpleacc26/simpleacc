interface ProgressBarProps {
  current: number;
  total: number;
}

export function ProgressBar({ current, total }: ProgressBarProps) {
  const pct = Math.min(100, Math.round((current / total) * 100));
  return (
    <div>
      <div
        className="w-full rounded-full overflow-hidden"
        style={{ height: "4px", backgroundColor: "rgba(169,128,47,0.2)" }}
      >
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{ width: `${pct}%`, backgroundColor: "#a9802f" }}
        />
      </div>
    </div>
  );
}
