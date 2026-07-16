# Redacted — quote guessing game (functional skeleton)

A play-once web game: read quotes about transformative technologies with the
technology redacted, guess what each is about, then get a card-by-card reveal
and a shareable score. Deliberately **unstyled** — this is the functional
skeleton; a separate design pass owns all visuals.

Stack: Next.js (App Router, TypeScript) + Supabase. Deploys to Vercel.

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build
npm run test:matching   # matching-logic sanity tests (Node built-in runner)
```

The game runs **without** Supabase configured — persistence and the share
link are silently disabled. To enable persistence:

1. Create a Supabase project and run `supabase/schema.sql` in the SQL editor.
2. Copy `.env.example` to `.env.local` and fill in `SUPABASE_URL` and
   `SUPABASE_SERVICE_ROLE_KEY`.

All DB access is server-side (route handlers + server components) using the
service role key; no Supabase keys reach the browser and the tables have RLS
enabled with no anon policies.

### Deploying to Vercel

Set the project's **Root Directory** to `quote-game/` and add the two env
vars above. No other config needed.

## Game flow (locked)

1. Intro screen → **Begin** (creates a session row).
2. One card at a time: quote with redaction bars, free-text guess, optional
   hint (names the domain, never the era). Submit advances — **no
   correctness feedback yet**. Every guess is logged.
3. After the last card: step-through reveal — your guess vs. the actual
   technology/year/author + a one-line blurb, with a running "fooled" count.
   The reveal always fires, hit or miss.
4. Final result: score, the funniest miss as the hook, copy-share text and a
   copyable link to `/r/[shareId]`.

## Card schema (CONTRACT — do not rename fields)

Cards live in `src/lib/cards.ts` as a typed array. The schema matches a
future `cards` table 1:1, so moving them to Supabase later only means
swapping the import for a query. Defined in `src/lib/types.ts`:

```ts
type Card = {
  id: string;                 // slug, e.g. "licklider-1960"
  quote: string;              // full quote text; redacted spans wrapped in [[double brackets]]
  answer: {
    technology: string;       // canonical answer, e.g. "Interactive computers"
    year: number;             // e.g. 1960
    author: string;           // e.g. "J.C.R. Licklider"
    source: string;           // work/publication title
    sourceUrl: string;        // verifiable link
  };
  acceptedGuesses: string[];  // synonyms that count as correct (matched fuzzily)
  hint: string;               // names the domain, never the era
  revealBlurb: string;        // one sentence of context/delight for the reveal
  register: "dread" | "contempt" | "overwhelm" | "wonder" | "other";
};
```

Rendering rule: `[[bracketed]]` spans render as opaque redaction bars
(`RedactionBar`) during play and as the revealed text afterward. Everything
else is plain text.

Adding cards: append to `CARDS` in `src/lib/cards.ts`. All logic (progress,
score denominators, reveal) keys off `CARDS.length` — nothing assumes 8.

## Matching logic (`src/lib/matching.ts`)

Pure client-side, no AI call. Both the guess and every `acceptedGuesses`
entry are normalized identically:

1. lowercase
2. trim
3. replace punctuation with a space (anything that isn't a letter, digit,
   or space; Unicode-aware — so `"printing-press"` → `"printing press"`)
4. collapse internal whitespace
5. drop ONE leading article (`a`, `an`, `the`)

Then, against the normalized accepted terms:

1. **Exact match** → correct
2. **Levenshtein distance ≤ 2** to any term → correct (typo tolerance)
3. Otherwise → incorrect

`matchGuess(rawGuess, acceptedGuesses)` returns
`{ isCorrect, matchedTerm, normalizedGuess }` where `matchedTerm` is the
*normalized* accepted term that matched (null on a miss). Correctness only
gates the score; the reveal always happens.

Tests: `src/lib/matching.test.ts` (`npm run test:matching`).

## Persistence (Supabase)

Schema in `supabase/schema.sql`:

- `sessions(id, started_at, finished_at, score, share_id, user_agent)`
- `guesses(id, session_id, card_id, raw_guess, normalized_guess, is_correct, matched_term, created_at)`

**Every guess is logged, matched or not.** `raw_guess` is the long-term
gold: it grows `acceptedGuesses` over time and enables future stats (e.g.
"how many years too modern did you guess"). Never filter unmatched guesses.

Route handlers (all no-ops returning `{disabled: true}` when Supabase env
vars are absent):

| Route | Method | Purpose |
| --- | --- | --- |
| `/api/session` | POST | create session, returns `{sessionId, shareId}` |
| `/api/guess` | POST | log one guess (called on every submit) |
| `/api/finish` | POST | stamp `finished_at` + `score` |

`/r/[shareId]` is a server-rendered read-only result page — the natural
hook for the OG/share-image stretch goal.

## Components (for the design pass)

All presentational, props-driven, theme-agnostic (structure-only inline
styles; each root element carries a `data-component` attribute to target):

`QuoteCard`, `RedactionBar`, `GuessInput`, `HintButton`, `RevealCard`,
`ScoreSummary`, `ShareCard`, `ProgressIndicator` — plus `Game`, the state
machine (`intro → play → reveal → result`) that composes them.

The "funniest miss" heuristic (`src/lib/results.ts`) is a documented
placeholder: the incorrect guess most edit-distant from the canonical
answer. Swap it without touching the UI.
