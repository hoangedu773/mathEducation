"use client";

import { formatDuration } from "@/lib/quiz";

interface Props {
  score: number;
  total: number;
  duration: number;
  flags: string[];
  onClose: () => void;
  onViewRanking: () => void;
  onRetry: () => void;
}

export default function ResultModal({ score, total, duration, flags, onClose, onViewRanking, onRetry }: Props) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 animate-[fadeIn_0.2s_ease-out]">
      <div className="w-full max-w-sm rounded-2xl bg-[var(--color-surface)] p-6 shadow-xl animate-[scaleIn_0.3s_ease-out]">
        <div className="text-center">
          <p className="text-4xl">🎉</p>
          <h2 className="mt-2 text-xl font-bold">Kết quả</h2>
          <div className="mt-4 inline-flex h-20 w-20 items-center justify-center rounded-full bg-[var(--color-success)]/10">
            <span className="text-2xl font-bold text-[var(--color-success)]">
              {score}/{total}
            </span>
          </div>

          <div className="mt-4 space-y-1 text-sm text-[var(--color-text-secondary)]">
            <p>⏱ Thời gian: {formatDuration(duration)}</p>
            <p>⚠ Cảnh báo: {flags.length > 0 ? flags.join(", ") : "0"}</p>
          </div>
        </div>

        <div className="mt-6 space-y-2">
          <button
            onClick={onViewRanking}
            className="w-full rounded-xl bg-[var(--color-primary)] py-2.5 text-sm font-bold text-white transition-all hover:brightness-110"
          >
            Xem bảng xếp hạng
          </button>
          <button
            onClick={onRetry}
            className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] py-2.5 text-sm font-medium transition-colors hover:bg-[var(--color-border)]"
          >
            Làm lại
          </button>
        </div>
      </div>
    </div>
  );
}
