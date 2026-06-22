"use client";

import { useState } from "react";

interface IPLog {
  id: number;
  ip_address: string;
  city: string | null;
  country: string | null;
  player_name: string | null;
  score: number | null;
  action: string;
  created_at: string;
}

interface Props {
  logs: IPLog[];
  onBan: (ip: string) => void;
}

export default function IPLogTable({ logs, onBan }: Props) {
  const [search, setSearch] = useState("");

  const filtered = search
    ? logs.filter((l) => l.ip_address.includes(search) || l.player_name?.toLowerCase().includes(search.toLowerCase()))
    : logs;

  if (logs.length === 0) {
    return <p className="py-10 text-center text-sm text-[var(--color-text-secondary)]">Chưa có log nào</p>;
  }

  return (
    <div className="space-y-3">
      <input
        type="text"
        placeholder="Tìm IP hoặc tên..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-background)] px-3 py-2 text-sm outline-none focus:border-[var(--color-primary)]"
      />
      <div className="max-h-96 overflow-y-auto rounded-xl border border-[var(--color-border)]">
        <table className="w-full text-xs">
          <thead className="sticky top-0 bg-[var(--color-surface)]">
            <tr className="border-b border-[var(--color-border)] text-left text-[var(--color-text-secondary)]">
              <th className="px-3 py-2">IP</th>
              <th className="px-3 py-2 hidden sm:table-cell">City</th>
              <th className="px-3 py-2">Player</th>
              <th className="px-3 py-2">Action</th>
              <th className="px-3 py-2 w-16"></th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((log) => (
              <tr key={log.id} className="border-b border-[var(--color-border)] hover:bg-[var(--color-border)]/30">
                <td className="px-3 py-2 font-mono">{log.ip_address}</td>
                <td className="px-3 py-2 hidden sm:table-cell text-[var(--color-text-secondary)]">
                  {log.city || "—"}
                </td>
                <td className="px-3 py-2">{log.player_name || "—"}</td>
                <td className="px-3 py-2">
                  <span className={`rounded-full px-2 py-0.5 text-xs ${
                    log.action === "banned_block" ? "bg-[var(--color-danger)]/10 text-[var(--color-danger)]" :
                    log.action === "quiz_submit" ? "bg-[var(--color-success)]/10 text-[var(--color-success)]" :
                    "bg-[var(--color-border)] text-[var(--color-text-secondary)]"
                  }`}>
                    {log.action}
                  </span>
                </td>
                <td className="px-3 py-2">
                  <button
                    onClick={() => onBan(log.ip_address)}
                    className="rounded bg-[var(--color-danger)]/10 px-2 py-0.5 text-[var(--color-danger)] hover:bg-[var(--color-danger)]/20"
                  >
                    Ban
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
