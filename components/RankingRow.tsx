import { formatDuration } from "@/lib/quiz";

interface Props {
  rank: number;
  name: string;
  score: number;
  duration: number;
  city: string | null;
  isCurrentUser?: boolean;
  medal?: string;
}

export default function RankingRow({ rank, name, score, duration, city, isCurrentUser, medal }: Props) {
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
        {medal || rank}
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
      <td className="px-3 py-3 text-xs text-[var(--color-text-secondary)] hidden sm:table-cell">
        {city || "—"}
      </td>
    </tr>
  );
}
