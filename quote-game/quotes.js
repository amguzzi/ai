/* ============================================================
   REDACTED — quote library
   Sourced from the verified quote deck (39222546-redacted-tech-
   quote-deck.csv). The unverified almanac entry was excluded per
   its own attribution flag.

   Schema, per entry:
     id        stable key, used for guess tracking
     text      the passage. Wrap redacted spans in {{...}};
               the span naming the innovation gets a ! —
               {{!like this}} — and is underlined on reveal.
               (No spans is fine: Baudelaire never names it.)
     answer    the innovation, as shown on reveal
     accept    extra answers counted as correct (loose matching)
     author    shown only on reveal
     year      a number; negative = BC (used for sorting)
     yearLabel optional display override ("c. 370 BC")
     note      one-line context blurb shown after the reveal
     source    provenance (not shown in game)
     confidence  attribution status from the deck (not shown)

   The array order is the play order.
   ============================================================ */
const QUOTES = [
  {
    id: "books-baillet",
    text: "We have reason to fear that the multitude of {{!books}} which grows every day in a prodigious fashion will make the following centuries fall into a state as barbarous as that of the centuries that followed the fall of the Roman Empire…",
    answer: "the printed book",
    accept: ["books", "the book", "printed books", "the printing press", "print"],
    author: "Adrien Baillet",
    year: 1685,
    note: "A 17th-century scholar forecasting a new Dark Age from information overload — the information being too many books.",
    source: "Jugemens des sçavans (Paris, 1685); English translation by Ann Blair",
    confidence: "Verified (English wording is Ann Blair's translation of the French)"
  },
  {
    id: "television-white",
    text: "I believe {{!television}} is going to be the test of the modern world… We shall stand or fall by {{!television}} — of that I am quite sure.",
    answer: "television",
    accept: ["television", "tv", "the television"],
    author: "E. B. White",
    year: 1938,
    note: "The Charlotte's Web author, ambivalent prophet, betting civilization itself on the little glowing box.",
    source: "“Removal” (July 1938), collected in One Man's Meat (1942); trimmed with an ellipsis",
    confidence: "Verified"
  },
  {
    id: "photography-baudelaire",
    text: "…this industry, by invading the territories of art, has become art's most mortal enemy.",
    answer: "photography",
    accept: ["photography", "the camera", "the daguerreotype", "photographs", "photos"],
    author: "Charles Baudelaire",
    year: 1859,
    note: "France's most quotable poet declaring open war on the camera for muscling in on painting's turf.",
    source: "“Le Public Moderne et la Photographie,” Revue Française (Salon de 1859); Mayne translation",
    confidence: "Verified (no tech named in the sentence — inherently ambiguous)"
  },
  {
    id: "interactive-computing-licklider",
    text: "…because {{!interactive computers}} can give us our first look at unfettered thought. It can allow a decision maker to do almost nothing but decision making, instead of processing data to get into position to make the decision.",
    answer: "interactive computing",
    accept: ["computers", "the computer", "interactive computing", "time-sharing", "personal computing", "computing"],
    author: "J.C.R. Licklider",
    year: 1961,
    yearLabel: "1961",
    note: "A computing pioneer dreaming machines would free us to do nothing but think — before the microchip existed.",
    source: "Remarks in Martin Greenberger (ed.), Management and the Computer of the Future (MIT Press & Wiley, 1962), from a 1961 MIT symposium. “[interactive computers]” is an editorial bracket for Licklider's original pronoun.",
    confidence: "Verified with correction — not “Man-Computer Symbiosis” / 1960"
  },
  {
    id: "writing-plato",
    text: "For this invention will produce forgetfulness in the minds of those who learn to use it, because they will not practice their memory. Their trust in {{!writing}}, produced by external characters which are no part of themselves, will discourage the use of their own memory within them.",
    answer: "writing",
    accept: ["writing", "the alphabet", "written language", "letters", "script", "the written word"],
    author: "Plato",
    year: -370,
    yearLabel: "c. 370 BC",
    note: "The original “this new technology will rot your brain” take — aimed at the written word ~2,400 years before the group chat.",
    source: "Phaedrus, 274e–275b (Fowler / Loeb translation); Socrates relaying the myth of Thamus & Theuth",
    confidence: "Verified"
  }
];
