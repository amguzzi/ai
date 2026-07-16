/**
 * CANONICAL CARD SCHEMA — contract shared with other workstreams.
 * Do not rename fields. See README.md for the full spec.
 */
export type Register = "dread" | "contempt" | "overwhelm" | "wonder" | "other";

export type Card = {
  id: string; // slug, e.g. "licklider-1960"
  quote: string; // full quote text; redacted spans wrapped in [[double brackets]]
  answer: {
    technology: string; // canonical answer, e.g. "Interactive computers"
    year: number; // e.g. 1960
    author: string; // e.g. "J.C.R. Licklider"
    source: string; // work/publication title
    sourceUrl: string; // verifiable link
  };
  acceptedGuesses: string[]; // synonyms that count as correct (matched fuzzily)
  hint: string; // names the domain, never the era
  revealBlurb: string; // one sentence of context/delight for the reveal
  register: Register;
};

/** A single guess as tracked in client state (mirrors the `guesses` table). */
export type GuessRecord = {
  cardId: string;
  rawGuess: string;
  normalizedGuess: string;
  isCorrect: boolean;
  matchedTerm: string | null;
};

/** One parsed segment of a quote: plain text or a redacted span. */
export type QuoteSegment =
  | { type: "text"; text: string }
  | { type: "redacted"; text: string };

/**
 * Split a quote into plain-text and redacted segments.
 * Redacted spans are wrapped in [[double brackets]] in Card.quote.
 */
export function parseQuote(quote: string): QuoteSegment[] {
  const segments: QuoteSegment[] = [];
  const pattern = /\[\[(.+?)\]\]/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  while ((match = pattern.exec(quote)) !== null) {
    if (match.index > lastIndex) {
      segments.push({ type: "text", text: quote.slice(lastIndex, match.index) });
    }
    segments.push({ type: "redacted", text: match[1] });
    lastIndex = pattern.lastIndex;
  }
  if (lastIndex < quote.length) {
    segments.push({ type: "text", text: quote.slice(lastIndex) });
  }
  return segments;
}
