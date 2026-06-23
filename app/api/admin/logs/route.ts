import { NextRequest, NextResponse } from "next/server";
import { getServiceClient } from "@/lib/supabase-admin";
import { verifyAdmin } from "@/lib/admin-auth";

export async function GET(request: NextRequest) {
  const auth = verifyAdmin(request);
  if (auth) return auth;

  const sb = getServiceClient();

  const [logRes, scoresRes] = await Promise.all([
    sb.from("ip_logs").select("*").order("created_at", { ascending: false }).limit(200),
    sb.from("scores").select("ip_address, player_name, device, browser, screen_size, language, answers, question_times, referrer").order("created_at", { ascending: false }).limit(200),
  ]);

  if (logRes.error) return NextResponse.json({ error: logRes.error.message }, { status: 500 });

  const scores = (scoresRes.data || []) as Record<string, unknown>[];

  const enriched = (logRes.data || []).map((log: Record<string, unknown>) => {
    const match = scores.find(
      (s) => s.ip_address === log.ip_address && s.player_name === log.player_name
    );
    return { ...log, tracking: match || null };
  });

  return NextResponse.json(enriched);
}
