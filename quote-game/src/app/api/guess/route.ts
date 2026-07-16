import { NextResponse } from "next/server";
import { getServerSupabase } from "@/lib/supabase-server";
import { getCardById } from "@/lib/cards";

/**
 * POST /api/guess — log a single guess, matched or not.
 * Every guess is stored; raw_guess is the long-term gold (it feeds
 * acceptedGuesses growth and future stats), so nothing is filtered out.
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

  const { sessionId, cardId, rawGuess, normalizedGuess, isCorrect, matchedTerm } =
    (body ?? {}) as Record<string, unknown>;

  if (
    typeof sessionId !== "string" ||
    typeof cardId !== "string" ||
    typeof rawGuess !== "string" ||
    typeof normalizedGuess !== "string" ||
    typeof isCorrect !== "boolean" ||
    !(matchedTerm === null || typeof matchedTerm === "string") ||
    !getCardById(cardId)
  ) {
    return NextResponse.json({ error: "invalid payload" }, { status: 400 });
  }

  const { error } = await supabase.from("guesses").insert({
    session_id: sessionId,
    card_id: cardId,
    raw_guess: rawGuess,
    normalized_guess: normalizedGuess,
    is_correct: isCorrect,
    matched_term: matchedTerm,
  });

  if (error) {
    console.error("Failed to log guess:", error.message);
    return NextResponse.json({ error: "insert failed" }, { status: 500 });
  }
  return NextResponse.json({ ok: true });
}
