export function Progress({ current, total }: { current: number; total: number }) {
  const pct = Math.round((current / total) * 100);
  return (
    <div>
      <div className="progress" aria-hidden>
        <span style={{ width: `${pct}%` }} />
      </div>
      <div className="progress-meta">
        <span>Pergunta {current} de {total}</span>
        <span>{pct}%</span>
      </div>
    </div>
  );
}
