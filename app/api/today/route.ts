import { NextRequest } from "next/server";
import { rpc } from "@/lib/db";
import { playerFrom, bad, out } from "@/lib/req";
export const dynamic = "force-dynamic";

// Hot path: the public lineup is identical for everyone, so cache it per process for 60s.
// Only the per-player bits (guesses/finished/stats) hit the DB every time.
let cache: { at: number; data: any } | null = null;
export async function GET(req: NextRequest) {
  const p = playerFrom(req); if (!p) return bad("missing player");
  try {
    const data = await rpc("imp_today", { p });
    if (data?.error) return out(data);
    const pub = { date: data.date, dayNumber: data.dayNumber, round: data.round, answers: data.answers };
    if (!cache || Date.now() - cache.at > 60_000) cache = { at: Date.now(), data: pub };
    const res = out({ ...cache.data, ...data });
    res.headers.set("Cache-Control", "private, no-store");
    return res;
  } catch (e: any) { return bad(e.message, 500); }
}
