"use client";

import { Fragment, useState } from "react";
import { ChevronDown, ChevronRight, Monitor, Globe, Languages } from "lucide-react";

interface IPLog {
  id: number;
  ip_address: string;
  city: string | null;
  country: string | null;
  player_name: string | null;
  score: number | null;
  action: string;
  created_at: string;
  tracking?: {
    device?: string;
    browser?: string;
    screen_size?: string;
    language?: string;
    answers?: { cau: number; chon: number | null; dung: boolean }[];
    question_times?: number[];
    referrer?: string;
  } | null;
}

interface Props {
  logs: IPLog[];
  onBan: (ip: string) => void;
}

export default function IPLogTable({ logs, onBan }: Props) {
  const [search, setSearch] = useState("");
  const [expanded, setExpanded] = useState<number | null>(null);

  const filtered = search
    ? logs.filter((l) => l.ip_address.includes(search) || l.player_name?.toLowerCase().includes(search.toLowerCase()))
    : logs;

  if (logs.length === 0) {
    return <p className="py-10 text-center text-sm text-[var(--color-text-secondary)]">Chưa có log nào</p>;
  }

  const detail = expanded !== null ? logs.find((l) => l.id === expanded) : null;

  return (
    <div className="space-y-3">
      <input
        type="text"
        placeholder="Tìm IP hoặc tên..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-bg)] px-3 py-2 text-sm outline-none focus:border-[var(--color-primary)]"
      />
      <div className="max-h-96 overflow-y-auto rounded-xl border border-[var(--color-border)]">
        <table className="w-full text-xs">
          <thead className="sticky top-0 bg-[var(--color-surface)]">
            <tr className="border-b border-[var(--color-border)] text-left text-[var(--color-text-secondary)]">
              <th className="px-3 py-2 w-6"></th>
              <th className="px-3 py-2">IP</th>
              <th className="px-3 py-2 hidden sm:table-cell">City</th>
              <th className="px-3 py-2">Player</th>
              <th className="px-3 py-2">Action</th>
              <th className="px-3 py-2 w-8">S</th>
              <th className="px-3 py-2 w-14"></th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((log) => (
              <Fragment key={log.id}>
                <tr
                  onClick={() => setExpanded(expanded === log.id ? null : log.id)}
                  className="cursor-pointer border-b border-[var(--color-border)] hover:bg-[var(--color-border)]/30"
                >
                  <td className="px-3 py-2">
                    {expanded === log.id ? <ChevronDown size={12} /> : <ChevronRight size={12} />}
                  </td>
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
                  <td className="px-3 py-2 font-bold">{log.score ?? "—"}</td>
                  <td className="px-3 py-2">
                    <button
                      onClick={(e) => { e.stopPropagation(); onBan(log.ip_address); }}
                      className="rounded bg-[var(--color-danger)]/10 px-2 py-0.5 text-[var(--color-danger)] hover:bg-[var(--color-danger)]/20"
                    >
                      Ban
                    </button>
                  </td>
                </tr>
                {expanded === log.id && detail && (
                  <tr key={`expanded-${log.id}`} className="bg-[var(--color-bg)]">
                    <td colSpan={7} className="px-4 py-3">
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                        {detail.tracking?.device && (
                          <span className="flex items-center gap-1 text-[var(--color-text-secondary)]">
                            <Monitor size={12} /> {detail.tracking.device}
                          </span>
                        )}
                        {detail.tracking?.browser && (
                          <span className="text-[var(--color-text-secondary)]">🌐 {detail.tracking.browser}</span>
                        )}
                        {detail.tracking?.screen_size && (
                          <span className="text-[var(--color-text-secondary)]">📺 {detail.tracking.screen_size}</span>
                        )}
                        {detail.tracking?.language && (
                          <span className="flex items-center gap-1 text-[var(--color-text-secondary)]">
                            <Languages size={12} /> {detail.tracking.language}
                          </span>
                        )}
                      </div>
                      {detail.tracking?.question_times && detail.tracking.question_times.length > 0 && (
                        <div className="mt-2 text-xs text-[var(--color-text-secondary)]">
                          <span className="font-medium">Thời gian từng câu:</span>{" "}
                          {detail.tracking.question_times.join("s, ")}s
                        </div>
                      )}
                      {detail.tracking?.answers && detail.tracking.answers.length > 0 && (
                        <div className="mt-1 flex flex-wrap gap-1">
                          {detail.tracking.answers.map((a, i) => (
                            <span
                              key={i}
                              className={`inline-flex h-5 w-5 items-center justify-center rounded text-xs font-bold ${
                                a.dung ? "bg-[var(--color-success)]/10 text-[var(--color-success)]" : "bg-[var(--color-danger)]/10 text-[var(--color-danger)]"
                              }`}
                            >
                              {a.dung ? "✓" : "✗"}
                            </span>
                          ))}
                        </div>
                      )}
                      {detail.tracking?.referrer && (
                        <div className="mt-1 text-xs text-[var(--color-text-secondary)]">
                          <span className="font-medium">Referrer:</span> {detail.tracking.referrer}
                        </div>
                      )}
                    </td>
                  </tr>
                )}
              </Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
