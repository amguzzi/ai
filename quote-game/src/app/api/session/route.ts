import { NextResponse } from "next/server";
import { getServerSupabase, generateShareId } from "@/lib/supabase-server";

/**
 * POST /api/session — start a game session.
 * Returns { sessionId, shareId } or { disabled: true } when Supabase is
 * not configured (the game still runs; nothing is persisted).
 */
export async function POST(request: Request) {
  const supabase = getServerSupabase();
  if (!supabase) {
    return NextResponse.json({ disabled: true, sessionId: null, shareId: null });
  }

  const shareId = generateShareId();
  const userAgent = request.headers.get("user-agent");

  const { data, error } = await supabase
    .from("sessions")
    .insert({ share_id: shareId, user_agent: userAgent })
    .select("id, share_id")
    .single();

  if (error) {
    console.error("Failed to create session:", error.message);
    return NextResponse.json({ disabled: true, sessionId: null, shareId: null });
  }

  return NextResponse.json({ sessionId: data.id, shareId: data.share_id });
}
