"use client";

import { useCallback, useEffect, useState } from "react";
import { Wrench, LogOut } from "lucide-react";
import AdminTabs from "@/components/AdminTabs";
import IPLogTable from "@/components/IPLogTable";
import BanManager from "@/components/BanManager";
import LeafletMap from "@/components/LeafletMap";

interface IPLog {
  id: number;
  ip_address: string;
  city: string | null;
  country: string | null;
  lat: number | null;
  lon: number | null;
  player_name: string | null;
  score: number | null;
  action: string;
  created_at: string;
}

interface BannedIP {
  id: number;
  ip_address: string;
  reason: string | null;
  banned_at: string;
}

export default function AdminPage() {
  const [tab, setTab] = useState<"log" | "banned" | "map">("log");
  const [logs, setLogs] = useState<IPLog[]>([]);
  const [banned, setBanned] = useState<BannedIP[]>([]);
  const [secret, setSecret] = useState("");
  const [authed, setAuthed] = useState(false);
  const [loading, setLoading] = useState(false);

  const headers = { "x-admin-key": secret };

  const fetchLogs = useCallback(async () => {
    const res = await fetch("/api/admin/logs", { headers });
    if (res.ok) setLogs(await res.json());
  }, [secret]);

  const fetchBanned = useCallback(async () => {
    const res = await fetch("/api/admin/logs", { headers });
    if (res.ok) {
      const r2 = await fetch(`${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/banned_ips?select=*`, {
        headers: { ...headers, apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "" },
      });
      if (r2.ok) setBanned(await r2.json());
    }
  }, [secret]);

  useEffect(() => {
    if (!authed) return;
    fetchLogs();
    fetchBanned();
  }, [authed, fetchLogs, fetchBanned]);

  useEffect(() => {
    if (!authed) return;
    const interval = setInterval(() => fetchLogs(), 30_000);
    return () => clearInterval(interval);
  }, [authed, fetchLogs]);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    const res = await fetch("/api/admin/check", { headers });
    if (res.ok) setAuthed(true);
    else alert("Sai admin key");
    setLoading(false);
  }

  async function handleBan(ip: string) {
    const reason = prompt("Lý do ban IP " + ip + ":");
    const res = await fetch("/api/admin/ban", {
      method: "POST",
      headers: { ...headers, "Content-Type": "application/json" },
      body: JSON.stringify({ ip, reason }),
    });
    if (res.ok) { alert("Đã ban IP " + ip); fetchLogs(); fetchBanned(); }
    else alert("Lỗi khi ban");
  }

  async function handleUnban(ip: string) {
    const res = await fetch("/api/admin/unban", {
      method: "POST",
      headers: { ...headers, "Content-Type": "application/json" },
      body: JSON.stringify({ ip }),
    });
    if (res.ok) { alert("Đã unban IP " + ip); fetchBanned(); }
    else alert("Lỗi khi unban");
  }

  if (!authed) {
    return (
      <div className="flex items-center justify-center py-20">
        <form onSubmit={handleLogin} className="w-full max-w-xs space-y-4 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6">
          <h1 className="flex items-center justify-center gap-2 text-lg font-bold">
            <Wrench size={20} />
            Admin
          </h1>
          <input
            type="password"
            value={secret}
            onChange={(e) => setSecret(e.target.value)}
            placeholder="Admin secret key"
            className="w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-background)] px-3 py-2 text-sm outline-none focus:border-[var(--color-primary)]"
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-[var(--color-primary)] py-2 text-sm font-bold text-white transition-all hover:brightness-110 active:scale-[0.98] disabled:opacity-50"
          >
            {loading ? "Đang kiểm tra..." : "Đăng nhập"}
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="flex items-center gap-2 text-xl font-bold">
          <Wrench size={22} />
          Admin Panel
        </h1>
        <button onClick={() => { setAuthed(false); setSecret(""); }} className="flex items-center gap-1 text-xs text-[var(--color-text-secondary)] hover:underline">
          <LogOut size={12} />
          Đăng xuất
        </button>
      </div>

      <AdminTabs active={tab} onChange={setTab} />
      {tab === "log" && <IPLogTable logs={logs} onBan={handleBan} />}
      {tab === "banned" && <BanManager banned={banned} onUnban={handleUnban} />}
      {tab === "map" && (
        <LeafletMap
          markers={logs
            .filter((l) => l.lat && l.lon)
            .map((l) => ({ lat: l.lat!, lon: l.lon!, ip: l.ip_address, city: l.city || undefined, score: l.score || undefined }))}
        />
      )}
    </div>
  );
}
