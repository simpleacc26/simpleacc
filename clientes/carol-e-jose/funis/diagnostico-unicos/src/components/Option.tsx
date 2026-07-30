import type { Option as Opt } from "../data/questions";

export function OptionButton({
  option,
  selected,
  onSelect,
}: {
  option: Opt;
  selected: boolean;
  onSelect: (v: string) => void;
}) {
  return (
    <button
      type="button"
      className={`option${selected ? " selected" : ""}`}
      onClick={() => onSelect(option.value)}
      aria-pressed={selected}
    >
      <span className="dot" aria-hidden />
      <span className="opt-title">{option.title}</span>
    </button>
  );
}
