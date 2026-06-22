"use client";

interface Props {
  message?: string;
  onRetry?: () => void;
}

export default function ErrorState({ message = "Có lỗi xảy ra", onRetry }: Props) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-[var(--color-text-secondary)]">
      <span className="text-4xl">⚠️</span>
      <p className="mt-2 text-sm">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="mt-3 rounded-lg bg-[var(--color-primary)] px-4 py-2 text-sm font-medium text-white transition-all hover:brightness-110"
        >
          Thử lại
        </button>
      )}
    </div>
  );
}
