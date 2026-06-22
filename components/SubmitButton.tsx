"use client";

export default function SubmitButton({ onClick, disabled }: { onClick: () => void; disabled?: boolean }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="w-full rounded-xl bg-[var(--color-success)] py-3 text-base font-bold text-white transition-all hover:brightness-110 disabled:opacity-30"
    >
      Nộp bài
    </button>
  );
}
