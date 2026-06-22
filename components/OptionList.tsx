"use client";

interface Props {
  options: string[];
  selected: number | null;
  onSelect: (index: number) => void;
}

const LABELS = ["A", "B", "C", "D"];

export default function OptionList({ options, selected, onSelect }: Props) {
  return (
    <div className="grid gap-2">
      {options.map((opt, i) => (
        <button
          key={i}
          onClick={() => onSelect(i)}
          className={`flex items-center gap-3 rounded-xl border p-4 text-left transition-all ${
            selected === i
              ? "border-[var(--color-primary)] bg-[var(--color-primary)]/10 ring-1 ring-[var(--color-primary)]"
              : "border-[var(--color-border)] bg-[var(--color-surface)] hover:border-[var(--color-text-secondary)]/30"
          }`}
        >
          <span
            className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-bold ${
              selected === i
                ? "bg-[var(--color-primary)] text-white"
                : "bg-[var(--color-border)] text-[var(--color-text-secondary)]"
            }`}
          >
            {LABELS[i]}
          </span>
          <span className="text-sm">{opt}</span>
        </button>
      ))}
    </div>
  );
}
