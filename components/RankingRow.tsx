import { formatDuration } from "@/lib/quiz";
import { Crown, Medal, Flag } from "lucide-react";

interface Props {
  rank: number;
  name: string;
  score: number;
  duration: number;
  flags?: number;
  quizDate?: string;
  isCurrentUser?: boolean;
  medal?: "gold" | "silver" | "bronze";
}

const medalColors = {
  gold: "text-amber-500",
  silver: "text-slate-400",
  bronze: "text-amber-700",
};

export default function RankingRow({ rank, name, score, duration, flags, quizDate, isCurrentUser, medal }: Props) {
  return (
    <tr
      className={`border-b border-[var(--color-border)] transition-colors ${
        isCurrentUser
          ? "bg-[var(--color-primary)]/10 font-medium"
          : medal
          ? "bg-[var(--color-warning)]/5"
          : "hover:bg-[var(--color-border)]/50"
      }`}
    >
      <td className="px-3 py-3 text-center font-mono text-xs text-[var(--color-text-secondary)]">
        {medal ? (
          medal === "gold" ? <Crown size={16} className={`mx-auto ${medalColors.gold}`} /> :
          <Medal size={16} className={`mx-auto ${medalColors[medal]}`} />
        ) : rank}
      </td>
      <td className="px-3 py-3">
        <span className="truncate block max-w-32">{name}</span>
      </td>
      <td className="px-3 py-3 text-right font-semibold">
        <span className={score >= 8 ? "text-[var(--color-success)]" : ""}>{score}</span>
      </td>
      <td className="px-3 py-3 text-right font-mono text-xs text-[var(--color-text-secondary)]">
        {formatDuration(duration)}
      </td>
      <td className="px-3 py-3 text-center">
        {flags && flags > 0 ? (
          <span className="inline-flex items-center gap-1 text-xs text-[var(--color-warning)]" title={`${flags} cảnh báo`}>
            <Flag size={12} />
            {flags}
          </span>
        ) : (
          <span className="text-xs text-[var(--color-text-secondary)]">—</span>
        )}
      </td>
      <td className="px-3 py-3 text-xs text-[var(--color-text-secondary)] hidden sm:table-cell">
        {quizDate ? new Date(quizDate).toLocaleDateString("vi-VN") : "—"}
      </td>
    </tr>
  );
}
