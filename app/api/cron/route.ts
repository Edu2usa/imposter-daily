import { NextRequest, NextResponse } from "next/server";
import { rpc } from "@/lib/db";
export const dynamic = "force-dynamic";
// Pre-builds tomorrow's lineup so midnight traffic never triggers the build inside a request.
export async function GET(req: NextRequest) {
  if (process.env.CRON_SECRET && req.headers.get("authorization") !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }
  try { return NextResponse.json(await rpc("imp_prebuild_tomorrow", {})); }
  catch (e: any) { return NextResponse.json({ error: e.message }, { status: 500 }); }
}
