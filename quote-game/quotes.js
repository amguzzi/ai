/* ============================================================
   REDACTED — quote library
   ALL ENTRIES BELOW ARE FICTIONAL PLACEHOLDERS. Replace them
   with real, sourced quotes; the game reads only this file.

   Schema, per entry:
     text    the passage. Wrap redacted spans in {{...}}.
             The span that names the innovation gets a ! —
             {{!like this}} — and is underlined on reveal.
             Nothing outside the reveal should hint at the era.
     answer  the innovation, as shown on reveal ("the printed almanac")
     accept  extra answers counted as correct (lowercase, loose)
     author  shown only on reveal
     year    a number; negative means BC. Shown only on reveal.
     note    one-line context blurb shown after the reveal.

   The array order is the play order.
   ============================================================ */
const QUOTES = [
  {
    text: "Men are become slaves to the {{!pocket watch}}; they consult it at every turning, as though the hour and not the man were master. I have seen {{young Harrow}} check his own twice in the speaking of a single sentence.",
    answer: "the pocket watch",
    accept: ["pocket watch", "watch", "watches", "the watch"],
    author: "R. Beaumont",
    year: 1791,
    note: "Blamed for making men slaves to the minute-hand."
  },
  {
    text: "A young lady left alone with a {{!novel}} is a young lady left alone with fire. Her mother believes her at needlework; she is at {{Naples}}, eloping by moonlight with a man who does not exist.",
    answer: "the novel",
    accept: ["novel", "novels", "fiction", "romances", "romance novels"],
    author: "Lady M. Ashcombe",
    year: 1755,
    note: "Sure to inflame the passions of the young."
  },
  {
    text: "They promise this {{!printed almanac}} will unburden the mind of memory itself — already the young scarce trouble to learn what they may so easily look up. I have argued the point with {{the Dean of Wells}}, and set it down this {{Michaelmas}} past, that a later age might judge which of us the fool.",
    answer: "the printed almanac",
    accept: ["almanac", "printed almanac", "almanack", "the almanac"],
    author: "A. Verger",
    year: 1698,
    note: "Three hundred years before we feared machines would think for us, a clergyman was certain that cheap print would rot the memory of the young."
  },
  {
    text: "No frame of flesh was built for such unnatural speed as the {{!railway}} affords; the mind cannot take in fields that pass like poured water. My physician, {{Dr. Cole}}, assures me the very organs may be shaken loose.",
    answer: "the railway",
    accept: ["railway", "railroad", "train", "trains", "the train", "locomotive", "railways"],
    author: "T. Finch",
    year: 1830,
    note: "No body was thought built for such unnatural speed."
  },
  {
    text: "The {{!lending library}} puts idle reading within reach of every apprentice for a penny, and the workshops stand empty by four o'clock. What trade can prosper, when a boy may borrow {{forty volumes}} in a season for the price of one?",
    answer: "the lending library",
    accept: ["lending library", "library", "libraries", "public library"],
    author: "J. Pring",
    year: 1743,
    note: "Idle reading, they feared, would empty the workshops."
  },
  {
    text: "By the {{!telegraph}} a rumour now crosses the sea faster than wisdom can rise from her chair. We shall shortly know everything a minute after it happens, and understand none of it.",
    answer: "the telegraph",
    accept: ["telegraph", "the telegraph", "telegraphy", "telegram"],
    author: "H. Vole",
    year: 1858,
    note: "News had begun to outrun the wisdom to judge it."
  },
  {
    text: "In the {{!coffee-house}} idlers gather nightly to trade rumour as though it were coin, and every man leaves richer in falsehood than he came. {{The King}} would do well to shut their doors.",
    answer: "the coffee-house",
    accept: ["coffee house", "coffeehouse", "coffee-house", "coffee houses", "cafe", "café", "the coffee house"],
    author: "Anon.",
    year: 1675,
    note: "A gathering place for unverified news. Imagine."
  },
  {
    text: "Ladies who take to the {{!bicycle}} acquire in time a fixed and anxious set of the features, which no physician can afterwards undo. The {{wheel}} promises liberty, and delivers a countenance.",
    answer: "the bicycle",
    accept: ["bicycle", "bike", "the bicycle", "cycling", "bicycles"],
    author: "Dr. E. Salt",
    year: 1885,
    note: "The dreaded “bicycle face” that would ruin ladies' looks."
  }
];
