"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { logIP } from "@/lib/supabase-queries";
import { getClientIP } from "@/lib/ip";

const ACTION_MAP: Record<string, string> = {
  "/": "page_view",
  "/bai-cu": "page_view",
  "/ranking": "ranking_view",
  "/admin": "admin_view",
};

export default function PageTracker() {
  const pathname = usePathname();

  useEffect(() => {
    const name = document.cookie
      .split("; ")
      .find((r) => r.startsWith("player_name="))
      ?.split("=")[1];
    const playerName = name ? decodeURIComponent(name) : null;

    if (pathname.startsWith("/quiz/")) {
      logIP({
        ip_address: "",
        city: null,
        country: null,
        lat: null,
        lon: null,
        player_name: playerName || "unknown",
        score: null,
        action: "quiz_start",
      });
      return;
    }

    const action = ACTION_MAP[pathname] || "page_view";

    (async () => {
      const ip = await getClientIP();
      logIP({
        ip_address: ip,
        city: null,
        country: null,
        lat: null,
        lon: null,
        player_name: playerName || "unknown",
        score: null,
        action,
      });
    })();
  }, [pathname]);

  return null;
}
