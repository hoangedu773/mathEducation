import { getQuizData } from "@/lib/data";
import { cookies } from "next/headers";
import QuizClient from "@/components/QuizClient";

export default async function QuizPage({ params }: { params: Promise<{ date: string }> }) {
  const { date } = await params;
  const quizData = getQuizData(date);
  const cookieStore = await cookies();
  const playerNameCookie = cookieStore.get("player_name")?.value || null;

  if (!quizData) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-[var(--color-text-secondary)]">
        <span className="text-4xl">📭</span>
        <p className="mt-2">Không tìm thấy bài tập cho ngày {date}</p>
      </div>
    );
  }

  return <QuizClient date={date} quizData={quizData} playerNameCookie={playerNameCookie} />;
}
