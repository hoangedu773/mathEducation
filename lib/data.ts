import fs from "fs";
import path from "path";

export interface LessonMeta {
  date: string;
  chuong: number;
  tenBai: string;
  thoiGian: number;
  soCau: number;
}

export interface QuizQuestion {
  cau: string;
  dapAn: string[];
  dung: number;
  giaiThich: string;
}

export interface QuizData {
  thoiGian: number;
  cauHoi: QuizQuestion[];
}

const DATA_DIR = path.join(process.cwd(), "data");

export function getAllLessons(): LessonMeta[] {
  const raw = fs.readFileSync(path.join(DATA_DIR, "index.json"), "utf-8");
  return JSON.parse(raw) as LessonMeta[];
}

export function getLessonByDate(date: string): LessonMeta | undefined {
  return getAllLessons().find((l) => l.date === date);
}

export function getQuizData(date: string): QuizData | null {
  const filePath = path.join(DATA_DIR, date, "bai-tap.json");
  if (!fs.existsSync(filePath)) return null;
  const raw = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(raw) as QuizData;
}

export function getTheoryContent(date: string): string | null {
  const filePath = path.join(DATA_DIR, date, "ly-thuyet.md");
  if (!fs.existsSync(filePath)) return null;
  return fs.readFileSync(filePath, "utf-8");
}

export function getTodayLesson(): LessonMeta | undefined {
  const now = new Date();
  const vnDate = new Date(now.getTime() + 7 * 60 * 60 * 1000);
  const today = vnDate.toISOString().slice(0, 10);
  return getLessonByDate(today);
}
