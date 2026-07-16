# REDACTED — Visual Direction Explorations

Look-and-feel exploration for a **play-once web game**: players read 8 short
historical quotes about technologies with the subject hidden behind redaction
bars, guess what it is, then see *guessed vs. truth* and a shareable score. The
arc is curiosity → the thrill of being fooled → *"wait, was that AI or a
300-year-old book?"*

These are **static, clickable mockups** — look-and-feel only, no real game
logic. Open `index.html` for the gallery, or open any direction file directly.
Each file walks the same four screens via the switcher pinned at the bottom.

## Files

| File | Direction |
|------|-----------|
| `index.html` | Gallery / launcher |
| `direction-1-dossier.html` | **Banned Book / Redaction Dossier** (anchor) |
| `direction-2-editorial.html` | Crisp Editorial / Daily Puzzle |
| `direction-3-terminal.html` | Terminal / "Human or Machine" |
| `direction-4-museum.html` | Museum Placard / Archival |

## Screens (identical set in every direction)

1. **Intro / cover**
2. **QuoteCard** — redacted passage + **GuessInput** (free text)
3. **RevealCard** — *You guessed ___ / It was ___, [year], [author]* + one-line context blurb
4. **Final result** — **ScoreSummary** + **ShareCard** (score + funniest miss as the hook)

## Named components (map cleanly onto a chosen direction)

Every direction expresses the *same* components through its own design tokens
(color, type scale, spacing, redaction-bar treatment), using the same class
names so a chosen direction ports straight over:

`QuoteCard` · `RedactionBar` · `GuessInput` · `RevealCard` · `ScoreSummary` · `ShareCard`

The **RedactionBar** is the signature element and is designed deliberately in
each world — never a plain black rectangle by default:

- **D1 Dossier** — heavy inked marker bar, slightly rotated, uneven ink bleed; the "subject" bar gets a dashed evidence outline.
- **D2 Editorial** — clean rounded spoiler tile with a diagonal sheen; the subject bar is ringed in the marigold accent.
- **D3 Terminal** — block-glyph censor (`████`) with phosphor glow; the subject bar shows a glowing `[?]`.
- **D4 Museum** — a matte conservator's *cover plate* with engraved corner ticks; the subject bar is framed in brass.

## Accessibility

- **Contrast:** body/label text meets **WCAG AA** (most primary text hits AAA). Palettes were chosen against their own backgrounds — e.g. the terminal's dim green is ~5.2:1 on near-black, the museum brass ~5.0:1 on card stock.
- **Never color alone:** correct/incorrect always carries a **✓ / ✗ glyph *and* a text label** ("Correct" / "Not quite / Misattributed / INCORRECT"), and the strike-through vs. underline treatment differs by shape, not just hue. Share grids label their results for screen readers (`aria-label="Results: 5 correct of 8"`).
- Redaction bars carry `role="img"` + an `aria-label` ("redacted" / "withheld") so the blackout is announced, not silently skipped.
- `prefers-reduced-motion` disables the screen-transition and cursor-blink animations.

All quotes are **placeholder text** — no real quotations are used.

---

## What each direction optimizes for — and where it struggles

### Direction 1 — Banned Book / Redaction Dossier  ★ front-runner
**Optimizes for:** the core emotional hook. The redaction bar isn't decoration
here — it *is* the concept, and warm paper + serif + typewriter chrome + oxblood
stamps sell "this is a real document someone tried to hide" better than anything
else. The declassified-file framing makes the reveal feel like *unsealing
evidence*, which is exactly the small-thrill beat. Highest personality, most
memorable, most on-brief.
**Struggles with:** texture is easy to overdo — grain, stamps, and torn edges
must stay restrained or it tips into kitsch. Warm paper + heavy serifs cost a
little raw legibility versus stark white, and it's the most opinionated look, so
it wins big or divides the room. Localization/long words can crowd the ornate
layout.

### Direction 2 — Crisp Editorial / Daily Puzzle
**Optimizes for:** **shareability and trust.** Reads instantly as a
reputable daily puzzle (byline, masthead, "No. 208"), which is the strongest cue
that a stranger's shared score is worth a tap. Cleanest ShareCard, best on small
screens, cheapest to build and extend, most familiar interaction model.
**Struggles with:** familiarity is also its ceiling — it can feel derivative of
existing games and carries the least of the game's *witty, literary* soul. The
redaction bar has to work harder to feel intentional rather than a generic
spoiler tile. Risks reading "clinical," the exact word the brief warns against.

### Direction 3 — Terminal / "Human or Machine"
**Optimizes for:** the **"was that AI or a 300-year-old book?"** beat, made
literal. The human-vs-machine classification framing turns the twist into the
whole premise, and the aesthetic is the most distinctive/ownable of the four —
great for a launch that wants to be talked about.
**Struggles with:** genre baggage. Monospace + scanlines skews techy and can
undercut the *literary* tone; it's the least "warm" and may narrow the audience.
Long serif quotes lose some grace in mono. Green-on-black needs careful contrast
discipline (done here), and the retro-terminal trope is common enough that
execution has to be sharp to avoid cliché.

### Direction 4 — Museum Placard / Archival
**Optimizes for:** a **premium, authoritative, "timeless"** feel. The object-label
framing ("attribute the fear," accession numbers, curator's notes) is a genuinely
fresh metaphor for guessing, and the conservator's-cover-plate redaction is the
most tactile bar of the set. Ages well; feels like a keepsake more than a meme.
**Struggles with:** it's the quietest and least *playful* — the wit has to live
entirely in the copy, since the chrome is reserved. Lowest urgency/shareability
(museums don't shout), and the ornamentation (double keylines, brass, engraving)
is the fussiest to keep crisp responsively. Slowest read of the four.

---

## Recommendation

Ship **Direction 1 (Dossier)** as the identity — it's the most on-brief and
owns the redaction concept outright — but **borrow Direction 2's ShareCard and
masthead discipline** for the shareable/result surfaces, where clarity and
instant-recognizability drive the loop. Direction 3 is the strongest *campaign*
idea if the team wants the AI-vs-history angle to be the headline; Direction 4 is
the fallback if the brand should feel premium and evergreen rather than punchy.
