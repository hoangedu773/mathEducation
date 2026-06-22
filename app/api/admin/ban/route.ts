import { NextRequest, NextResponse } from "next/server";
import { getServiceClient } from "@/lib/supabase-admin";
import { verifyAdmin } from "@/lib/admin-auth";

export async function POST(request: NextRequest) {
  const auth = verifyAdmin(request);
  if (auth) return auth;

  const { ip, reason } = await request.json();
  if (!ip) return NextResponse.json({ error: "Missing ip" }, { status: 400 });

  const sb = getServiceClient();
  const { error } = await sb.from("banned_ips").insert({
    ip_address: ip,
    reason: reason || "Banned by admin",
    banned_by: "admin",
  });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ success: true });
}
