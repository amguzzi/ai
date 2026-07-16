import type { Card } from "./types";

/**
 * Card deck. Lives in a typed data file for now; the schema matches a
 * future `cards` table 1:1 so it can move to Supabase without code changes
 * beyond swapping this import for a query.
 *
 * NOTE: only 2 seed cards exist right now (content comes from another
 * workstream). All game logic keys off CARDS.length, not a hardcoded 8.
 */
export const CARDS: Card[] = [
  {
    id: "licklider-1960",
    quote:
      "No one knows what it would do to a creative brain to think creatively continuously. Perhaps the brain, like the heart, must devote most of its time to rest between beats. But I doubt that is true. I hope it is not, because [[interactive computers]] can give us our first look at unfettered thought.",
    answer: {
      technology: "Interactive computers",
      year: 1960,
      author: "J.C.R. Licklider",
      source: "Man-Computer Symbiosis",
      sourceUrl: "https://groups.csail.mit.edu/medg/people/psz/Licklider.html",
    },
    acceptedGuesses: [
      "interactive computers",
      "computers",
      "computing",
      "the computer",
      "personal computers",
      "interactive computing",
      "man-computer symbiosis",
    ],
    hint: "A machine humans think alongside.",
    revealBlurb:
      "Licklider imagined humans and machines thinking together decades before anyone had a computer on their desk.",
    register: "wonder",
  },
  {
    id: "baillet-1685",
    quote:
      "We have reason to fear that the multitude of [[books]] which grows every day in a prodigious fashion will make the following centuries fall into a state as barbarous as that of the centuries that followed the fall of the Roman Empire.",
    answer: {
      technology: "Books",
      year: 1685,
      author: "Adrien Baillet",
      source: "Jugemens des savans sur les principaux ouvrages des auteurs",
      sourceUrl: "https://gallica.bnf.fr/ark:/12148/bpt6k123657q",
    },
    acceptedGuesses: [
      "books",
      "book",
      "printed books",
      "printing",
      "the printing press",
      "print",
      "printed word",
    ],
    hint: "A way of recording and spreading the written word.",
    revealBlurb:
      "Information overload panic, three centuries before the feed: too much to read was going to end civilization.",
    register: "overwhelm",
  },
];

export function getCardById(id: string): Card | undefined {
  return CARDS.find((c) => c.id === id);
}
