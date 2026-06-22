export default async function QuizPage({
  params,
}: {
  params: Promise<{ date: string }>;
}) {
  const { date } = await params;

  return (
    <div className="flex items-center justify-center py-20">
      <p className="text-[var(--color-text-secondary)]">
        ✏️ Quiz ngày {date} — sẽ làm ở Phase 4
      </p>
    </div>
  );
}
