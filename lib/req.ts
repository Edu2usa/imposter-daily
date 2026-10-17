import { NextRequest, NextResponse } from "next/server";
export function playerFrom(req: NextRequest): string | null {
  const p = req.headers.get("x-player") ?? "";
  return /^[a-zA-Z0-9_-]{8,64}$/.test(p) ? p : null;
}
export const bad = (msg: string, status = 400) => NextResponse.json({ error: msg }, { status });
export function out(data: any) {
  if (data && typeof data === "object" && "error" in data) return bad(String(data.error), 400);
  return NextResponse.json(data);
}
