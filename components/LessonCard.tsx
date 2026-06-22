import type { LessonMeta } from "@/lib/data";
import Link from "next/link";

export default function LessonCard({ lesson, bestScore }: { lesson: LessonMeta; bestScore?: number }) {
  return (
    <Link
      href={`/quiz/${lesson.date}`}
      className="block rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4 transition-all hover:-translate-y-0.5 hover:shadow-md"
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs text-[var(--color-text-secondary)]">
            Chương {lesson.chuong}
          </p>
          <h3 className="mt-0.5 font-semibold">{lesson.tenBai}</h3>
          <p className="mt-1 text-xs text-[var(--color-text-secondary)]">
            📅 {new Date(lesson.date).toLocaleDateString("vi-VN")} · ⏱ {lesson.thoiGian} phút · {lesson.soCau} câu
          </p>
        </div>
        {bestScore !== undefined && (
          <span className="shrink-0 rounded-full bg-[var(--color-success)]/10 px-3 py-1 text-sm font-bold text-[var(--color-success)]">
            🏆 {bestScore}/{lesson.soCau}
          </span>
        )}
      </div>
    </Link>
  );
}
