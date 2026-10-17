import { NextRequest, NextResponse } from "next/server";
import { rpc } from "@/lib/db";
import { playerFrom, bad } from "@/lib/req";
export const dynamic = "force-dynamic";
export async function POST(req: NextRequest) {
  const p = playerFrom(req); if (!p) return bad("missing player");
  const { answerId } = await req.json().catch(() => ({}));
  if (typeof answerId !== "string") return bad("answerId required");
  try { await rpc("imp_flag_answer", { aid: answerId }); return NextResponse.json({ ok: true }); } catch (e: any) { return bad(e.message, 500); }
}
