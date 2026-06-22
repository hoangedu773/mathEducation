"use client";

interface Props {
  onPrev: () => void;
  onNext: () => void;
  canGoPrev: boolean;
  canGoNext: boolean;
  isLast: boolean;
  onSubmit: () => void;
  allAnswered: boolean;
}

export default function QuizNavigation({ onPrev, onNext, canGoPrev, canGoNext, isLast, onSubmit, allAnswered }: Props) {
  return (
    <div className="flex items-center justify-between gap-3">
      <button
        onClick={onPrev}
        disabled={!canGoPrev}
        className="rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-2 text-sm font-medium transition-colors hover:bg-[var(--color-border)] disabled:opacity-30"
      >
        ← Trước
      </button>

      {isLast ? (
        <button
          onClick={onSubmit}
          disabled={!allAnswered}
          className="rounded-lg bg-[var(--color-success)] px-6 py-2 text-sm font-bold text-white transition-all hover:brightness-110 disabled:opacity-30"
        >
          Nộp bài
        </button>
      ) : (
        <button
          onClick={onNext}
          disabled={!canGoNext}
          className="rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-2 text-sm font-medium transition-colors hover:bg-[var(--color-border)] disabled:opacity-30"
        >
          Câu sau →
        </button>
      )}
    </div>
  );
}
