"use client";

import { useCallback, useEffect, useState } from "react";
import { Wrench, LogOut } from "lucide-react";
import { toast } from "@/lib/toast";
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
  tracking?: Record<string, unknown> | null;
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
  const [banModal, setBanModal] = useState<{ ip: string } | null>(null);
  const [banReason, setBanReason] = useState("");

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
    else toast.error("Sai admin key");
    setLoading(false);
  }

  function openBanModal(ip: string) {
    setBanModal({ ip });
    setBanReason("");
  }

  async function handleBan() {
    if (!banModal) return;
    const res = await fetch("/api/admin/ban", {
      method: "POST",
      headers: { ...headers, "Content-Type": "application/json" },
      body: JSON.stringify({ ip: banModal.ip, reason: banReason }),
    });
    if (res.ok) {
      toast.success("Đã ban IP " + banModal.ip);
      fetchLogs();
      fetchBanned();
    } else {
      toast.error("Lỗi khi ban IP " + banModal.ip);
    }
    setBanModal(null);
  }

  async function handleUnban(ip: string) {
    const res = await fetch("/api/admin/unban", {
      method: "POST",
      headers: { ...headers, "Content-Type": "application/json" },
      body: JSON.stringify({ ip }),
    });
    if (res.ok) {
      toast.success("Đã unban IP " + ip);
      fetchBanned();
    } else {
      toast.error("Lỗi khi unban IP " + ip);
    }
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
            className="w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-bg)] px-3 py-2 text-sm outline-none focus:border-[var(--color-primary)]"
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
      {tab === "log" && <IPLogTable logs={logs} onBan={openBanModal} />}
      {tab === "banned" && <BanManager banned={banned} onUnban={handleUnban} />}
      {tab === "map" && (
        <LeafletMap
          markers={logs
            .filter((l) => l.lat && l.lon)
            .map((l) => ({ lat: l.lat!, lon: l.lon!, ip: l.ip_address, city: l.city || undefined, score: l.score || undefined }))}
        />
      )}

      {banModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
          <div className="w-full max-w-sm rounded-xl bg-[var(--color-surface)] p-6 shadow-xl animate-[scaleIn_0.2s_ease-out]">
            <h3 className="font-bold">Ban IP: {banModal.ip}</h3>
            <input
              type="text"
              value={banReason}
              onChange={(e) => setBanReason(e.target.value)}
              placeholder="Lý do ban (tùy chọn)"
              className="mt-3 w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-bg)] px-3 py-2 text-sm outline-none focus:border-[var(--color-primary)]"
              autoFocus
              onKeyDown={(e) => { if (e.key === "Enter") handleBan(); if (e.key === "Escape") setBanModal(null); }}
            />
            <div className="mt-4 flex gap-2">
              <button onClick={handleBan} className="flex-1 rounded-lg bg-[var(--color-danger)] py-2 text-sm font-bold text-white transition-all hover:brightness-110 active:scale-95">
                Ban
              </button>
              <button onClick={() => setBanModal(null)} className="flex-1 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] py-2 text-sm transition-all hover:bg-[var(--color-border)] active:scale-95">
                Hủy
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
