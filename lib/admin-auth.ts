import { NextResponse } from "next/server";

export function verifyAdmin(request: Request): NextResponse | null {
  const header = request.headers.get("x-admin-key");
  if (header !== process.env.ADMIN_SECRET_KEY) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  return null;
}
