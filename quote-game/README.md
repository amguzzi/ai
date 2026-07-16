# REDACTED — Visual Direction Explorations

A **play-once web game**: read a real reaction to some new innovation, with the
innovation (and its telltale details) blacked out, and guess *what's the
innovation?* Then meet the author and the year — usually far older than you'd
guess. The arc is curiosity → the thrill of being fooled → *"wait, was that AI
or a 300-year-old book?"*

Static, clickable mockups — look-and-feel only, no real game logic. Open
`index.html` for the gallery, or any file directly and use the switcher pinned
at the bottom to walk the screens.

## Round 3 — what changed

- **The era is never shown before a guess.** Any "circa 1600s / 17th century"
  hints on the quote screen are gone — knowing the age defeats the whole game.
  Dates appear only in the **reveal**, as the payoff.
- **Reframed to "What's the innovation?"** The redaction can hide the
  innovation *and* other identifying details — author, date, place — not just a
  single tech word.
- **Start screen** leans into *"everything old was new once"* — every panic
  about a new innovation has been written before.
- **Finish screen leads with the biggest miss**, grade second (see logic below).
- **Flow settled on reveal one-by-one**; the reveal-all-at-the-end variant was
  retired.
- **Literary is the front-runner** and is now the fully-realized canonical file
  (`direction-literary.html`). Editorial and Dossier are kept as alternate looks,
  updated to the same concept.

## Files

| File | Role |
|------|------|
| `index.html` | Gallery / launcher |
| `direction-literary-inline-reveal.html` | **Literary — a nicely bound book** · front-runner, canonical (in-place dissolve reveal) |
| `direction-editorial.html` | Alternate — crisp daily puzzle |
| `direction-dossier-refined.html` | Alternate — declassified report |

## Reveal happens in place

There is **no separate reveal screen** — you stay on the quote so you can see the
un-redacted words in context. On **Reveal**:

- the black bars **dissolve all at once** (fade + slight blur), exposing the
  innovation, author and date right in the sentence (the answer keeps a quiet
  green underline);
- the **verdict (✓/✗) appears inside the guess box**, and a wrong guess is struck
  through in place — no separate "you guessed" line;
- a condensed **"It was … — author, year."** line and a one-line context note
  expand just below.

Respects `prefers-reduced-motion` (bars simply disappear). Keeping the quote,
your guess, and the truth on one screen makes the "wait, *that* old?" beat land
harder.

## Screens & named components

Cover → **QuoteCard** + **GuessInput** → **RevealCard** → **ScoreSummary** +
**ShareCard**, built from the same six named components (`QuoteCard`,
`RedactionBar`, `GuessInput`, `RevealCard`, `ScoreSummary`, `ShareCard`) so a
chosen direction ports over cleanly. The **RedactionBar** is the signature
element and now appears in the body *and* the citation line (author/date struck
out) to reinforce that identifying details are hidden.

## The "biggest miss" that leads the finish

The results screen opens with the single most entertaining wrong answer, chosen
like this (documented in a comment on each file's results screen):

1. **If the player named "AI" / "artificial intelligence" on any wrong answer**,
   surface the **oldest** actual innovation among those:
   *"I was certain [oldest such innovation], [year], was artificial intelligence."*
2. **Otherwise**, surface the **oldest** innovation they got wrong, with their
   guess: *"I was certain [oldest wrong innovation], [year], was [their guess]."*

The grade (e.g. *4 of 8 · reasonably suspicious*) and the ✓/✗ marks follow
underneath. The mockups show case 1 — the funniest and most on-theme.

## Accessibility

- Body/label text meets **WCAG AA** (most primary text AAA), checked against each direction's own background.
- **Never colour alone:** correct/incorrect always carries a **✓ / ✗ glyph + a word** ("Not quite" / "Correct" / "Incorrect identification"); struck-through guess vs. underlined answer differ by shape, not just hue. Share/marks rows are labelled for screen readers.
- Redaction bars carry `role="img"` + an `aria-label` ("the innovation, redacted", "author and date, redacted", …).
- `prefers-reduced-motion` disables transitions.
- All quotes are **placeholder text**.

---

## What each direction optimizes for — and where it struggles

### Literary — A Nicely Bound Book  ★ front-runner
**Optimizes for:** the witty, literary, keepsake tone the brief asks for. One
clean reading face, generous margins, running heads and folios make it feel like
a beautifully typeset book; hiding the citation behind the bar and revealing
"1698" on the next leaf lands the "wait, *that* old?" beat perfectly. Ages well;
feels like an object, not a meme.
**Struggles with:** it's the quietest — the wit lives in the copy, since the
chrome is restrained. Lower built-in urgency than a daily-puzzle frame, and fine
typography needs care to stay crisp responsively.

### Editorial — Daily Puzzle (alternate)
**Optimizes for:** shareability and trust — reads instantly as a reputable daily
puzzle. Cleanest ShareCard, best on small screens, cheapest to build.
**Struggles with:** familiarity is its ceiling; can feel derivative and carries
the least literary soul. Risks reading "clinical."

### Dossier, refined — Declassified Report (alternate)
**Optimizes for:** keeping the redaction concept front-and-centre without kitsch.
Cool stock + Swiss type + one signal-red make the bar feel deliberate; the
"unsealed record" framing gives the reveal a satisfying click.
**Struggles with:** seriousness can tip into cold — least playful of the three,
leans on copy for warmth.

## Recommendation

Ship **Literary** with **reveal one-by-one** and the **miss-first finish**. Borrow
**Editorial's ShareCard clarity** if the share loop needs more punch. Keep
**Dossier** as the sharper, more concept-driven alternative.
