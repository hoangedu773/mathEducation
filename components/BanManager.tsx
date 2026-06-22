"use client";

interface BannedIP {
  id: number;
  ip_address: string;
  reason: string | null;
  banned_at: string;
}

interface Props {
  banned: BannedIP[];
  onUnban: (ip: string) => void;
}

export default function BanManager({ banned, onUnban }: Props) {
  if (banned.length === 0) {
    return <p className="py-10 text-center text-sm text-[var(--color-text-secondary)]">Chưa có IP nào bị cấm</p>;
  }

  return (
    <div className="max-h-96 overflow-y-auto rounded-xl border border-[var(--color-border)]">
      <table className="w-full text-sm">
        <thead className="sticky top-0 bg-[var(--color-surface)]">
          <tr className="border-b border-[var(--color-border)] text-left text-xs text-[var(--color-text-secondary)]">
            <th className="px-3 py-2">IP</th>
            <th className="px-3 py-2 hidden sm:table-cell">Lý do</th>
            <th className="px-3 py-2 hidden sm:table-cell">Ngày ban</th>
            <th className="px-3 py-2 w-16"></th>
          </tr>
        </thead>
        <tbody>
          {banned.map((b) => (
            <tr key={b.id} className="border-b border-[var(--color-border)]">
              <td className="px-3 py-2 font-mono text-xs">{b.ip_address}</td>
              <td className="px-3 py-2 text-xs text-[var(--color-text-secondary)] hidden sm:table-cell">
                {b.reason || "—"}
              </td>
              <td className="px-3 py-2 text-xs text-[var(--color-text-secondary)] hidden sm:table-cell">
                {new Date(b.banned_at).toLocaleDateString("vi-VN")}
              </td>
              <td className="px-3 py-2">
                <button
                  onClick={() => onUnban(b.ip_address)}
                  className="rounded bg-[var(--color-success)]/10 px-2 py-0.5 text-xs text-[var(--color-success)] hover:bg-[var(--color-success)]/20"
                >
                  Unban
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
