import { NextRequest } from "next/server";
import { rpc } from "@/lib/db";
import { playerFrom, bad, out } from "@/lib/req";
export const dynamic = "force-dynamic";
export async function POST(req: NextRequest) {
  const p = playerFrom(req); if (!p) return bad("missing player");
  const { answerId } = await req.json().catch(() => ({}));
  if (typeof answerId !== "string") return bad("answerId required");
  try { return out(await rpc("imp_guess", { p, aid: answerId })); } catch (e: any) { return bad(e.message, 500); }
}
