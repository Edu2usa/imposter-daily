import { NextRequest } from "next/server";
import { rpc } from "@/lib/db";
import { playerFrom, bad, out } from "@/lib/req";
export const dynamic = "force-dynamic";
export async function GET(req: NextRequest) {
  const p = playerFrom(req); if (!p) return bad("missing player");
  try { return out(await rpc("imp_today", { p })); } catch (e: any) { return bad(e.message, 500); }
}
