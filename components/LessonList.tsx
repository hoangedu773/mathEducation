import type { LessonMeta } from "@/lib/data";
import { Inbox } from "lucide-react";
import LessonCard from "./LessonCard";

interface Props {
  lessons: LessonMeta[];
  bestScores?: Record<string, number>;
}

export default function LessonList({ lessons, bestScores }: Props) {
  if (lessons.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-[var(--color-text-secondary)]">
        <Inbox size={48} strokeWidth={1.5} />
        <p className="mt-2">Chưa có bài học nào</p>
      </div>
    );
  }

  return (
    <div className="grid gap-3">
      {lessons.map((lesson) => (
        <LessonCard key={lesson.date} lesson={lesson} bestScore={bestScores?.[lesson.date]} />
      ))}
    </div>
  );
}
