import Link from "next/link";
import { notFound } from "next/navigation";
import { getServerSupabase } from "@/lib/supabase-server";
import { getCardById, CARDS } from "@/lib/cards";
import { ScoreSummary } from "@/components/ScoreSummary";

export const dynamic = "force-dynamic";

/**
 * Shareable result page (/r/[shareId]) — a server-rendered, read-only view
 * of a finished session. This is where OG/share-image generation would hook
 * in later (stretch goal).
 */
export default async function SharePage({
  params,
}: {
  params: Promise<{ shareId: string }>;
}) {
  const { shareId } = await params;
  const supabase = getServerSupabase();
  if (!supabase) notFound();

  const { data: session } = await supabase
    .from("sessions")
    .select("id, score, finished_at")
    .eq("share_id", shareId)
    .maybeSingle();
  if (!session || session.finished_at === null || session.score === null) notFound();

  const { data: guesses } = await supabase
    .from("guesses")
    .select("card_id, raw_guess, is_correct")
    .eq("session_id", session.id)
    .order("created_at", { ascending: true });

  return (
    <main data-page="shared-result">
      <h1>Someone played Redacted</h1>
      <ScoreSummary score={session.score} total={CARDS.length} />
      <ul>
        {(guesses ?? []).map((g) => {
          const card = getCardById(g.card_id);
          if (!card) return null;
          return (
            <li key={g.card_id}>
              Guessed &ldquo;{g.raw_guess}&rdquo; — it was {card.answer.technology} (
              {card.answer.year}, {card.answer.author}).{" "}
              {g.is_correct ? "Correct." : "Fooled."}
            </li>
          );
        })}
      </ul>
      <p>
        <Link href="/">Play it yourself</Link>
      </p>
    </main>
  );
}
