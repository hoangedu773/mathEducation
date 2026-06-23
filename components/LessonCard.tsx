import type { LessonMeta } from "@/lib/data";
import Link from "next/link";
import { Calendar, Clock, Trophy } from "lucide-react";

export default function LessonCard({ lesson, bestScore }: { lesson: LessonMeta; bestScore?: number }) {
  return (
    <Link
      href={`/quiz/${lesson.date}`}
      className="block rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4 transition-all hover:-translate-y-0.5 hover:shadow-md active:scale-[0.99]"
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs text-[var(--color-text-secondary)]">
            Chương {lesson.chuong}
          </p>
          <h3 className="mt-0.5 font-semibold">{lesson.tenBai}</h3>
          <p className="mt-1 flex items-center gap-3 text-xs text-[var(--color-text-secondary)]">
            <span className="flex items-center gap-1"><Calendar size={12} />{new Date(lesson.date).toLocaleDateString("vi-VN")}</span>
            <span className="flex items-center gap-1"><Clock size={12} />{lesson.thoiGian} phút</span>
            <span>{lesson.soCau} câu</span>
          </p>
        </div>
        {bestScore !== undefined && (
          <span className="shrink-0 flex items-center gap-1 rounded-full bg-[var(--color-success)]/10 px-3 py-1 text-sm font-bold text-[var(--color-success)]">
            <Trophy size={14} />
            {bestScore}/{lesson.soCau}
          </span>
        )}
      </div>
    </Link>
  );
}
