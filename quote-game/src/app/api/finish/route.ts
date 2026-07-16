import { NextResponse } from "next/server";
import { getServerSupabase } from "@/lib/supabase-server";

/**
 * POST /api/finish — mark a session finished and record the final score.
 */
export async function POST(request: Request) {
  const supabase = getServerSupabase();
  if (!supabase) return NextResponse.json({ disabled: true });

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "invalid JSON" }, { status: 400 });
  }

  const { sessionId, score } = (body ?? {}) as Record<string, unknown>;
  if (typeof sessionId !== "string" || typeof score !== "number" || !Number.isInteger(score)) {
    return NextResponse.json({ error: "invalid payload" }, { status: 400 });
  }

  const { error } = await supabase
    .from("sessions")
    .update({ finished_at: new Date().toISOString(), score })
    .eq("id", sessionId);

  if (error) {
    console.error("Failed to finish session:", error.message);
    return NextResponse.json({ error: "update failed" }, { status: 500 });
  }
  return NextResponse.json({ ok: true });
}
