"use client";

interface Props {
  chapters: number[];
  active: number | null;
  onChange: (chapter: number | null) => void;
}

export default function ChapterFilter({ chapters, active, onChange }: Props) {
  const unique = [...new Set(chapters)].sort((a, b) => a - b);

  return (
    <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
      <button
        onClick={() => onChange(null)}
        className={`shrink-0 rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
          active === null
            ? "bg-[var(--color-primary)] text-white"
            : "bg-[var(--color-border)] text-[var(--color-text-secondary)] hover:bg-[var(--color-text-secondary)]/20"
        }`}
      >
        Tất cả
      </button>
      {unique.map((chuong) => (
        <button
          key={chuong}
          onClick={() => onChange(chuong)}
          className={`shrink-0 rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
            active === chuong
              ? "bg-[var(--color-primary)] text-white"
              : "bg-[var(--color-border)] text-[var(--color-text-secondary)] hover:bg-[var(--color-text-secondary)]/20"
          }`}
        >
          Chương {chuong}
        </button>
      ))}
    </div>
  );
}
