import { getTodayLesson, getTheoryContent } from "@/lib/data";
import MarkdownRenderer from "@/components/MarkdownRenderer";
import Link from "next/link";
import { Calendar, Play, BarChart3, Inbox } from "lucide-react";

export const revalidate = 86400;

export default function HomePage() {
  const lesson = getTodayLesson();

  return (
    <div className="space-y-6">
      {lesson ? (
        <>
          <div className="text-center">
            <p className="flex items-center justify-center gap-1.5 text-sm text-[var(--color-text-secondary)]">
              <Calendar size={14} />
              {new Date(lesson.date).toLocaleDateString("vi-VN", { weekday: "long", day: "numeric", month: "numeric", year: "numeric" })}
            </p>
            <h1 className="mt-1 text-xl font-bold">
              Chương {lesson.chuong}: {lesson.tenBai}
            </h1>
          </div>

          <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5">
            <MarkdownRenderer content={getTheoryContent(lesson.date) || ""} />
          </div>

          <Link
            href={`/quiz/${lesson.date}`}
            className="flex items-center justify-center gap-2 rounded-xl bg-[var(--color-primary)] py-4 text-base font-bold text-white transition-all hover:brightness-110 active:scale-[0.98]"
          >
            <Play size={18} fill="currentColor" />
            Làm bài tập · {lesson.soCau} câu · {lesson.thoiGian} phút
          </Link>

          <Link
            href="/ranking"
            className="flex items-center justify-center gap-2 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] py-3 text-sm font-medium text-[var(--color-text-secondary)] transition-colors hover:bg-[var(--color-border)]"
          >
            <BarChart3 size={16} />
            Xem bảng xếp hạng
          </Link>
        </>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 text-[var(--color-text-secondary)]">
          <Inbox size={48} strokeWidth={1.5} />
          <p className="mt-2">Chưa có bài học cho hôm nay</p>
        </div>
      )}
    </div>
  );
}
