import { NextRequest } from "next/server";
import { rpc } from "@/lib/db";
import { playerFrom, bad, out } from "@/lib/req";
export const dynamic = "force-dynamic";
export async function POST(req: NextRequest) {
  const p = playerFrom(req); if (!p) return bad("missing player");
  const { text } = await req.json().catch(() => ({}));
  try { return out(await rpc("imp_submit", { p, t: String(text ?? "") })); } catch (e: any) { return bad(e.message, 500); }
}
