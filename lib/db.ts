import { createClient } from "@supabase/supabase-js";

// Anon key is safe to expose: anon has zero table privileges, only the imp_* RPCs.
const url = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "https://dwbpjhwprdxhnatntyug.supabase.co";
const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "sb_publishable_HRfeaX6qe020CsDRwrmMMA_PYpMiTfC";
export const db = createClient(url, key, { auth: { persistSession: false } });

export async function rpc<T = any>(fn: string, args: Record<string, unknown>): Promise<T> {
  const { data, error } = await db.rpc(fn, args);
  if (error) throw new Error(error.message);
  return data as T;
}
