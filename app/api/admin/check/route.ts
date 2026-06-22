import { NextRequest, NextResponse } from "next/server";
import { verifyAdmin } from "@/lib/admin-auth";

export async function GET(request: NextRequest) {
  const auth = verifyAdmin(request);
  if (auth) return auth;
  return NextResponse.json({ valid: true });
}
