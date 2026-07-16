# REDACTED — Visual Direction Explorations

Look-and-feel exploration for a **play-once web game**: players read 8 short
historical quotes about technologies with the subject hidden behind redaction
bars, guess what it is, then see *guessed vs. truth* and a shareable score. The
arc is curiosity → the thrill of being fooled → *"wait, was that AI or a
300-year-old book?"*

Static, clickable mockups — look-and-feel only, no real game logic. Open
`index.html` for the gallery, or open any file directly and use the switcher
pinned at the bottom to walk the screens.

## Round 2 — what changed after review

- **Dropped** the terminal / "human or machine" direction.
- **Kept** Editorial (crisp daily-puzzle) as-is.
- **Reworked** the Dossier direction — the kitsch (rubber stamps, torn edges,
  paper grain, typewriter face) is gone. It's now a cool, Swiss-clean
  "declassified report" with the black bar as a disciplined hero.
- **Reimagined** the Museum direction as a **nicely bound book** — one clean
  reading typeface (Newsreader), running heads, folios, a drop cap, hairline
  rules. No brass, no placards.
- **No "how wrong" magnitude** anywhere. Reveals now say only *Correct* or
  *Not quite* (with a ✓/✗ and a word) — never "off by 3 centuries."
- **Two reveal flows** mocked up in the Literary direction (see below).

## Files

| File | Direction / flow |
|------|------------------|
| `index.html` | Gallery / launcher |
| `direction-editorial.html` | **Editorial** — daily puzzle |
| `direction-dossier-refined.html` | **Dossier, refined** — declassified report |
| `direction-museum-onebyone.html` | **Literary** — reveal one-by-one (Flow A) |
| `direction-museum-allatend.html` | **Literary** — reveal all at the end (Flow B) |

## Screens & named components

Same four screens everywhere — cover → **QuoteCard** + **GuessInput** →
**RevealCard** → **ScoreSummary** + **ShareCard** — built from the same six
named components (`QuoteCard`, `RedactionBar`, `GuessInput`, `RevealCard`,
`ScoreSummary`, `ShareCard`) so a chosen direction ports over cleanly. The
**RedactionBar** is the signature element and is deliberate in each:

- **Editorial** — clean rounded spoiler tile with a diagonal sheen; subject bar ringed in marigold.
- **Dossier, refined** — dead-flat sharp black bar with corner registration ticks; subject bar keyed in signal-red.
- **Literary** — a printed censor block with a faint letterpress impression; subject bar underscored by a hairline.

## Accessibility

- Body/label text meets **WCAG AA** (most primary text AAA), verified against each direction's own background.
- **Never color alone:** correct/incorrect always carries a **✓ / ✗ glyph + a word** ("Correct" / "Not quite" / "Incorrect"), and struck-through vs. underlined answers differ by shape, not just hue. Share grids and the answer key are labelled for screen readers.
- Redaction bars carry `role="img"` + an `aria-label` so the blackout is announced.
- `prefers-reduced-motion` disables transitions.
- All quotes are **placeholder text**.

---

## The reveal-flow decision (shown in the Literary direction)

Both flows use the identical direction — only pacing differs.

### Flow A — reveal one-by-one (`…onebyone.html`)
Guess a passage → turn the leaf → see the truth → next.
- **Optimizes for:** the dopamine loop. Immediate feedback delivers the
  "fooled you" thrill eight times, and each reveal can teach before the next
  guess. Lowest cognitive load; easiest to pick up and put down.
- **Struggles with:** it spends the surprise in small change. There's no single
  climactic reveal, and a bad start can feel discouraging mid-run.

### Flow B — reveal all at the end (`…allatend.html`)
Guess all eight (answers sealed) → an **Answer Key** unseals everything at once → result.
- **Optimizes for:** suspense and the shareable payoff. Preserves the
  "was that AI or 300 years old?" tension across the *whole* set, then pays it
  off in one binge — which reads beautifully as a book's back-of-the-book
  solutions and makes the strongest single reveal moment to screenshot.
- **Struggles with:** delayed gratification. No feedback while you play (a
  weaker teaching loop), the Answer Key is a longer scroll, and impatient
  players may bounce before the reveal.

**Recommendation:** **Flow B (all at the end)** fits this game's emotional arc
and its literary, book-like framing best — the sealed-then-revealed structure
*is* the "wait, what?" moment, and it's the more shareable climax. Keep Flow A
in your pocket as the friendlier on-ramp if early testing shows drop-off.

---

## What each direction optimizes for — and where it struggles

### Editorial — Daily Puzzle
**Optimizes for:** shareability and trust. Reads instantly as a reputable daily
puzzle (masthead, byline, "No. 208"), the strongest cue that a stranger's shared
score is worth a tap. Cleanest ShareCard, best on small screens, cheapest to
build and extend.
**Struggles with:** familiarity is also its ceiling — it can feel derivative and
carries the least of the game's witty, literary soul. Risks reading "clinical."

### Dossier, refined — Declassified Report
**Optimizes for:** keeping the redaction concept front-and-centre without the
kitsch. Cool stock + Swiss type + a single signal-red make the black bar feel
*designed and deliberate*, and the "unsealed record" framing gives the reveal a
satisfying click. Most concept-forward; the bar has never looked more intentional.
**Struggles with:** seriousness can tip into cold. It's the least playful of the
three and leans on copy to carry warmth; the report structure needs discipline
to avoid feeling like a form.

### Literary — A Nicely Bound Book  ★
**Optimizes for:** a premium, timeless, keepsake feel and the most *literary*
voice — exactly the tone the brief asks for. One clean reading face, generous
margins, running heads and folios make it feel like a beautifully typeset book;
the Answer-Key flow extends that metaphor perfectly. Ages well; feels like an
object, not a meme.
**Struggles with:** it's the quietest — wit must live in the copy, since the
chrome is restrained. Lower built-in urgency than Editorial, and fine
typography demands care to stay crisp responsively.

---

## Recommendation

Lead with **Literary** as the identity — it best matches the witty, literary,
shareable brief and reads as a keepsake — paired with **Flow B (reveal at the
end)** for the climactic, screenshot-ready payoff. Borrow **Editorial's
ShareCard clarity** for the result surface if the share loop needs more
punch. **Dossier, refined** is the strong alternative if the brand should feel
sharper and more concept-driven than warm.
