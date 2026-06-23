import type { RankingRow } from "@/lib/supabase-queries";
import { Medal, Inbox } from "lucide-react";
import RankingRowComp from "./RankingRow";

interface Props {
  data: RankingRow[];
  currentPlayer?: string;
}

export default function RankingTable({ data, currentPlayer }: Props) {
  if (data.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-[var(--color-text-secondary)]">
        <Inbox size={48} strokeWidth={1.5} />
        <p className="mt-2">Chưa có ai làm bài</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-[var(--color-border)] text-left text-xs uppercase text-[var(--color-text-secondary)]">
            <th className="px-3 py-3 w-12">#</th>
            <th className="px-3 py-3">Tên</th>
            <th className="px-3 py-3 w-16 text-right">Điểm</th>
            <th className="px-3 py-3 w-20 text-right">T.gian</th>
            <th className="px-3 py-3 w-12 text-center">Cờ</th>
            <th className="px-3 py-3 w-20 hidden sm:table-cell">Ngày</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, i) => (
            <RankingRowComp
              key={row.id}
              rank={i + 1}
              name={row.player_name}
              score={row.score}
              duration={row.duration}
              flags={Array.isArray(row.flags) ? row.flags.length : (row.flags || 0)}
              quizDate={row.quiz_date}
              isCurrentUser={row.player_name === currentPlayer}
              medal={i < 3 ? (i === 0 ? "gold" : i === 1 ? "silver" : "bronze") : undefined}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}
