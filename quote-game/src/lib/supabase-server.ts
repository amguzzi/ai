import { createClient, type SupabaseClient } from "@supabase/supabase-js";

/**
 * Server-side Supabase client (service role). All reads/writes go through
 * Next.js route handlers / server components — no Supabase keys reach the
 * browser and no RLS policies are needed on the tables.
 *
 * Returns null when env vars are missing so the game still runs (guessing,
 * reveal, score) with persistence gracefully disabled — useful for local
 * dev and preview deploys.
 */
let cached: SupabaseClient | null | undefined;

export function getServerSupabase(): SupabaseClient | null {
  if (cached !== undefined) return cached;
  const url = process.env.SUPABASE_URL ?? process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  cached = url && key ? createClient(url, key, { auth: { persistSession: false } }) : null;
  return cached;
}

/** URL-safe random slug for shareable result links. */
export function generateShareId(length = 10): string {
  const alphabet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  const bytes = crypto.getRandomValues(new Uint8Array(length));
  let out = "";
  for (const b of bytes) out += alphabet[b % alphabet.length];
  return out;
}
