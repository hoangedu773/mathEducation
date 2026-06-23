import { getSupabase } from "./supabase";

function sb() {
  try {
    return getSupabase();
  } catch {
    return null;
  }
}

export interface ScoreEntry {
  player_name: string;
  score: number;
  duration: number;
  quiz_date: string;
  ip_address: string;
  city: string | null;
  country: string | null;
  lat: number | null;
  lon: number | null;
  flags: string[];
  device?: string;
  browser?: string;
  screen_size?: string;
  language?: string;
  answers?: { cau: number; chon: number | null; dung: boolean }[];
  question_times?: number[];
  referrer?: string;
}

export interface RankingRow {
  id: number;
  player_name: string;
  score: number;
  duration: number;
  flags: number | null;
  quiz_date: string;
}

export async function checkBannedIP(ip: string): Promise<boolean> {
  const client = sb();
  if (!client) return false;
  const { data, error } = await client
    .from("banned_ips")
    .select("ip_address")
    .eq("ip_address", ip)
    .maybeSingle();
  if (error) {
    console.error("checkBannedIP error:", error);
    return false;
  }
  return data !== null;
}

export async function submitScore(entry: ScoreEntry): Promise<boolean> {
  const client = sb();
  if (!client) return false;
  const { error } = await client.from("scores").insert({
    player_name: entry.player_name,
    score: entry.score,
    duration: entry.duration,
    quiz_date: entry.quiz_date,
    ip_address: entry.ip_address,
    city: entry.city,
    country: entry.country,
    lat: entry.lat,
    lon: entry.lon,
    flags: entry.flags,
    device: entry.device || null,
    browser: entry.browser || null,
    screen_size: entry.screen_size || null,
    language: entry.language || null,
    answers: entry.answers || null,
    question_times: entry.question_times || null,
    referrer: entry.referrer || null,
  });
  if (error) {
    console.error("submitScore error:", error);
    return false;
  }
  return true;
}

export async function logIP(data: {
  ip_address: string;
  city: string | null;
  country: string | null;
  lat: number | null;
  lon: number | null;
  player_name: string;
  score: number | null;
  action: string;
}): Promise<void> {
  const client = sb();
  if (!client) return;
  const { error } = await client.from("ip_logs").insert(data);
  if (error) console.error("logIP error:", error);
}

export async function getRanking(filter: "today" | "week" | "month" | "all"): Promise<RankingRow[]> {
  const client = sb();
  if (!client) return [];

  let query = client
    .from("scores")
    .select("id, player_name, score, duration, quiz_date, flags")
    .order("score", { ascending: false })
    .order("duration", { ascending: true })
    .limit(100);

  const now = new Date();
  const vnNow = new Date(now.getTime() + 7 * 60 * 60 * 1000);

  if (filter === "today") {
    const today = vnNow.toISOString().slice(0, 10);
    query = query.eq("quiz_date", today);
  } else if (filter === "week") {
    const weekAgo = new Date(vnNow);
    weekAgo.setDate(weekAgo.getDate() - 7);
    query = query.gte("quiz_date", weekAgo.toISOString().slice(0, 10));
  } else if (filter === "month") {
    const monthAgo = new Date(vnNow);
    monthAgo.setDate(monthAgo.getDate() - 30);
    query = query.gte("quiz_date", monthAgo.toISOString().slice(0, 10));
  }

  const { data, error } = await query;
  if (error) {
    console.error("getRanking error:", error);
    return [];
  }
  return (data as RankingRow[]) || [];
}
