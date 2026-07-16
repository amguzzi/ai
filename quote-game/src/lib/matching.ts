/**
 * Client-side guess matching. No AI calls.
 *
 * Pipeline (documented in README.md — other workstreams conform to this):
 *   normalize(guess) and normalize(each acceptedGuess), then
 *   1. exact match on normalized strings           → correct
 *   2. Levenshtein distance ≤ 2 to any accepted    → correct (typo tolerance)
 *   3. otherwise                                   → incorrect
 */

export const LEVENSHTEIN_THRESHOLD = 2;

/**
 * Normalize a guess or accepted term:
 * lowercase → trim → strip punctuation → collapse whitespace →
 * drop a leading article (a/an/the).
 */
export function normalize(input: string): string {
  let s = input.toLowerCase().trim();
  // Punctuation becomes a space (so "printing-press" → "printing press"),
  // then whitespace collapses.
  s = s.replace(/[^\p{L}\p{N}\s]/gu, " ");
  s = s.replace(/\s+/g, " ").trim();
  s = s.replace(/^(a|an|the)\s+/, "");
  return s;
}

/** Standard dynamic-programming Levenshtein edit distance. */
export function levenshtein(a: string, b: string): number {
  if (a === b) return 0;
  if (a.length === 0) return b.length;
  if (b.length === 0) return a.length;

  let prev = new Array<number>(b.length + 1);
  let curr = new Array<number>(b.length + 1);
  for (let j = 0; j <= b.length; j++) prev[j] = j;

  for (let i = 1; i <= a.length; i++) {
    curr[0] = i;
    for (let j = 1; j <= b.length; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      curr[j] = Math.min(prev[j] + 1, curr[j - 1] + 1, prev[j - 1] + cost);
    }
    [prev, curr] = [curr, prev];
  }
  return prev[b.length];
}

export type MatchResult = {
  isCorrect: boolean;
  /** The normalized accepted term that matched, or null on a miss. */
  matchedTerm: string | null;
  normalizedGuess: string;
};

/** Match a raw free-text guess against a card's acceptedGuesses. */
export function matchGuess(rawGuess: string, acceptedGuesses: string[]): MatchResult {
  const normalizedGuess = normalize(rawGuess);
  const normalizedAccepted = acceptedGuesses.map(normalize);

  if (normalizedGuess.length === 0) {
    return { isCorrect: false, matchedTerm: null, normalizedGuess };
  }

  // 1. exact match
  for (const term of normalizedAccepted) {
    if (normalizedGuess === term) {
      return { isCorrect: true, matchedTerm: term, normalizedGuess };
    }
  }

  // 2. typo tolerance
  for (const term of normalizedAccepted) {
    if (levenshtein(normalizedGuess, term) <= LEVENSHTEIN_THRESHOLD) {
      return { isCorrect: true, matchedTerm: term, normalizedGuess };
    }
  }

  // 3. miss
  return { isCorrect: false, matchedTerm: null, normalizedGuess };
}
