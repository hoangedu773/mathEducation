"use client";

import { useCallback, useEffect, useState } from "react";
import { Trophy } from "lucide-react";
import { getRanking, type RankingRow } from "@/lib/supabase-queries";
import TimeFilter from "@/components/TimeFilter";
import RankingTable from "@/components/RankingTable";

type Filter = "today" | "week" | "month" | "all";

function getPlayerName(): string | null {
  const m = document.cookie.match(/(?:^|;\s*)player_name=([^;]*)/);
  return m ? decodeURIComponent(m[1]) : null;
}

export default function RankingPage() {
  const [filter, setFilter] = useState<Filter>("today");
  const [data, setData] = useState<RankingRow[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    setLoading(true);
    const rows = await getRanking(filter);
    setData(rows);
    setLoading(false);
  }, [filter]);

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 60_000);
    return () => clearInterval(interval);
  }, [fetchData]);

  return (
    <div className="space-y-4">
      <h1 className="flex items-center gap-2 text-xl font-bold">
        <Trophy size={24} className="text-[var(--color-warning)]" />
        Bảng xếp hạng
      </h1>
      <TimeFilter active={filter} onChange={setFilter} />
      {loading ? (
        <div className="flex items-center justify-center py-16">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-[var(--color-border)] border-t-[var(--color-primary)]" />
        </div>
      ) : (
        <RankingTable data={data} currentPlayer={getPlayerName() || undefined} />
      )}
    </div>
  );
}
