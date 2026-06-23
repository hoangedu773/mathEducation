"use client";

import { PartyPopper } from "lucide-react";
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
  const pct = total > 0 ? score / total : 0;
  const isPerfect = pct === 1;
  const isGood = pct >= 0.8;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm animate-[fadeIn_0.2s_ease-out]">
      <div className="w-full max-w-sm rounded-2xl bg-[var(--color-surface)] p-6 shadow-xl animate-[scaleIn_0.3s_ease-out]">
        <div className="text-center">
          <PartyPopper size={40} className={`mx-auto ${isPerfect ? "text-[var(--color-warning)]" : isGood ? "text-[var(--color-success)]" : "text-[var(--color-text-secondary)]"}`} />
          <h2 className="mt-2 text-xl font-bold">Kết quả</h2>

          <div className={`mt-4 inline-flex h-20 w-20 items-center justify-center rounded-full ${
            isPerfect ? "bg-[var(--color-warning)]/10" :
            isGood ? "bg-[var(--color-success)]/10" :
            "bg-[var(--color-border)]"
          }`}>
            <span className={`text-2xl font-bold ${
              isPerfect ? "text-[var(--color-warning)]" :
              isGood ? "text-[var(--color-success)]" :
              "text-[var(--color-text)]"
            }`}>
              {score}/{total}
            </span>
          </div>

          <div className="mt-4 space-y-1 text-sm text-[var(--color-text-secondary)]">
            <p>⏱ Thời gian: {formatDuration(duration)}</p>
            {flags.length > 0 && (
              <p className="text-[var(--color-danger)]">⚠ {flags.length} cảnh báo gian lận</p>
            )}
          </div>

          {isPerfect && <p className="mt-2 text-sm font-bold text-[var(--color-warning)]">🎉 Tuyệt vời! Điểm tuyệt đối!</p>}
        </div>

        <div className="mt-6 space-y-2">
          <button
            onClick={onViewRanking}
            className="w-full rounded-xl bg-[var(--color-primary)] py-2.5 text-sm font-bold text-white transition-all hover:brightness-110 active:scale-[0.98]"
          >
            Xem bảng xếp hạng
          </button>
          <button
            onClick={onRetry}
            className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] py-2.5 text-sm font-medium transition-all hover:bg-[var(--color-border)] active:scale-[0.98]"
          >
            Làm lại
          </button>
        </div>
      </div>
    </div>
  );
}
