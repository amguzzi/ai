import type { Card, GuessRecord } from "./types";
import { levenshtein, normalize } from "./matching";

/**
 * Pick the "funniest miss" to headline the share card.
 * Placeholder heuristic: the incorrect guess most distant (Levenshtein on
 * normalized strings) from the canonical technology — i.e. the most
 * confidently wrong answer. A later workstream can swap this out (e.g. for
 * a "years too modern" metric) without touching the UI.
 */
export function pickFunniestMiss(
  cards: Card[],
  guesses: GuessRecord[]
): { card: Card; guess: GuessRecord } | null {
  let best: { card: Card; guess: GuessRecord; distance: number } | null = null;
  for (const guess of guesses) {
    if (guess.isCorrect || guess.normalizedGuess.length === 0) continue;
    const card = cards.find((c) => c.id === guess.cardId);
    if (!card) continue;
    const distance = levenshtein(guess.normalizedGuess, normalize(card.answer.technology));
    if (!best || distance > best.distance) {
      best = { card, guess, distance };
    }
  }
  return best ? { card: best.card, guess: best.guess } : null;
}

export function computeScore(guesses: GuessRecord[]): number {
  return guesses.filter((g) => g.isCorrect).length;
}
