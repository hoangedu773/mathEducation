"use client";

import { useState, useMemo } from "react";
import type { LessonMeta } from "@/lib/data";
import ChapterFilter from "./ChapterFilter";
import LessonList from "./LessonList";

export default function BaiCuClient({ lessons }: { lessons: LessonMeta[] }) {
  const [activeChapter, setActiveChapter] = useState<number | null>(null);
  const chapters = useMemo(() => lessons.map((l) => l.chuong), [lessons]);

  const filtered = activeChapter
    ? lessons.filter((l) => l.chuong === activeChapter)
    : lessons;

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-bold">📋 Bài cũ</h1>
      <ChapterFilter chapters={chapters} active={activeChapter} onChange={setActiveChapter} />
      <LessonList lessons={filtered} />
    </div>
  );
}
