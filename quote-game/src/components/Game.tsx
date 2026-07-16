"use client";

import { useCallback, useMemo, useState } from "react";
import type { Card, GuessRecord } from "@/lib/types";
import { matchGuess } from "@/lib/matching";
import { computeScore, pickFunniestMiss } from "@/lib/results";
import { QuoteCard } from "./QuoteCard";
import { GuessInput } from "./GuessInput";
import { HintButton } from "./HintButton";
import { ProgressIndicator } from "./ProgressIndicator";
import { RevealCard } from "./RevealCard";
import { ShareCard } from "./ShareCard";

type Phase = "intro" | "play" | "reveal" | "result";

/**
 * Game orchestrator — owns the whole state machine:
 *   intro → play (one card at a time, no correctness feedback)
 *         → reveal (step through all cards: guess vs. truth)
 *         → result (score + funniest miss + share)
 *
 * Persistence is fire-and-forget through /api/* route handlers; if Supabase
 * is unconfigured or a request fails, gameplay is unaffected.
 */
export function Game({ cards }: { cards: Card[] }) {
  const [phase, setPhase] = useState<Phase>("intro");
  const [cardIndex, setCardIndex] = useState(0);
  const [revealIndex, setRevealIndex] = useState(0);
  const [guesses, setGuesses] = useState<GuessRecord[]>([]);
  const [hintShown, setHintShown] = useState(false);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [shareId, setShareId] = useState<string | null>(null);

  const total = cards.length;
  const score = useMemo(() => computeScore(guesses), [guesses]);
  const funniestMiss = useMemo(() => pickFunniestMiss(cards, guesses), [cards, guesses]);

  const begin = useCallback(async () => {
    setPhase("play");
    try {
      const res = await fetch("/api/session", { method: "POST" });
      const data = await res.json();
      if (data.sessionId) {
        setSessionId(data.sessionId);
        setShareId(data.shareId);
      }
    } catch {
      // Persistence disabled/unreachable — play on.
    }
  }, []);

  const submitGuess = useCallback(
    (rawGuess: string) => {
      const card = cards[cardIndex];
      const match = matchGuess(rawGuess, card.acceptedGuesses);
      const record: GuessRecord = {
        cardId: card.id,
        rawGuess,
        normalizedGuess: match.normalizedGuess,
        isCorrect: match.isCorrect,
        matchedTerm: match.matchedTerm,
      };
      const nextGuesses = [...guesses, record];
      setGuesses(nextGuesses);
      setHintShown(false);

      if (sessionId) {
        fetch("/api/guess", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ sessionId, ...record }),
        }).catch(() => {});
      }

      if (cardIndex + 1 < total) {
        setCardIndex(cardIndex + 1);
      } else {
        setPhase("reveal");
        setRevealIndex(0);
        if (sessionId) {
          fetch("/api/finish", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ sessionId, score: computeScore(nextGuesses) }),
          }).catch(() => {});
        }
      }
    },
    [cards, cardIndex, guesses, sessionId, total]
  );

  if (phase === "intro") {
    return (
      <section data-phase="intro">
        <h1>Redacted</h1>
        <p>
          {total} quotes about transformative technologies. The technology in each has been
          redacted. Guess what each quote is about — the answers come at the end.
        </p>
        <button type="button" onClick={begin}>
          Begin
        </button>
      </section>
    );
  }

  if (phase === "play") {
    const card = cards[cardIndex];
    return (
      <section data-phase="play">
        <ProgressIndicator current={cardIndex + 1} total={total} />
        <QuoteCard quote={card.quote} revealed={false} />
        <HintButton hint={card.hint} revealed={hintShown} onReveal={() => setHintShown(true)} />
        <GuessInput cardId={card.id} onSubmit={submitGuess} />
      </section>
    );
  }

  if (phase === "reveal") {
    const card = cards[revealIndex];
    const guess = guesses.find((g) => g.cardId === card.id)!;
    const fooledSoFar = guesses
      .slice(0, revealIndex + 1)
      .filter((g) => !g.isCorrect).length;
    const isLast = revealIndex + 1 >= total;
    return (
      <section data-phase="reveal">
        <ProgressIndicator current={revealIndex + 1} total={total} />
        <RevealCard card={card} guess={guess} />
        <p data-component="fooled-count">Fooled so far: {fooledSoFar}</p>
        <button
          type="button"
          onClick={() => (isLast ? setPhase("result") : setRevealIndex(revealIndex + 1))}
        >
          {isLast ? "See your result" : "Next"}
        </button>
      </section>
    );
  }

  const shareUrl =
    shareId && typeof window !== "undefined"
      ? `${window.location.origin}/r/${shareId}`
      : null;

  return (
    <section data-phase="result">
      <h1>Your result</h1>
      <ShareCard score={score} total={total} funniestMiss={funniestMiss} shareUrl={shareUrl} />
    </section>
  );
}
