import type { TransliterationStandard } from "../../types.js";

// Armenian vowels (lowercase) used in context rules for \u0578 word-initial behaviour
// \u0561\u0565\u0567\u0568\u056B\u0578\u0585\u057E
const VOWELS_AND_V = ["\u0561", "\u0565", "\u0567", "\u0568", "\u056B", "\u0578", "\u0585", "\u057E"] as const;

// Western Armenian reduced the three-way stop/affricate contrast (voiced /
// voiceless unaspirated / aspirated) to a two-way contrast (voiced / aspirated):
//
//   - Eastern voiced series merged with aspirated in Western
//   - Eastern voiceless unaspirated series became voiced in Western
//   - Eastern aspirated series remained aspirated in Western
//
//   Letter  Eastern    Western
//   \u0562 (բ)   b          p\u02B0     (voiced → aspirated, merges with \u0583)
//   \u0563 (գ)   \u0261          k\u02B0     (voiced → aspirated, merges with \u0584)
//   \u0564 (դ)   d          t\u02B0     (voiced → aspirated, merges with \u0569)
//   \u056E (ծ)   t\u0361s        d\u0361z     (voiceless → voiced)
//   \u056F (կ)   k          \u0261      (voiceless → voiced)
//   \u0571 (ձ)   d\u0361z        t\u0361s\u02B0   (voiced → aspirated, merges with \u0581)
//   \u0573 (ճ)   t\u0361\u0283        d\u0361\u0292     (voiceless → voiced)
//   \u057A (պ)   p          b      (voiceless → voiced)
//   \u057B (ջ)   d\u0361\u0292        t\u0361\u0283\u02B0   (voiced → aspirated, merges with \u0579)
//   \u057F (տ)   t          d      (voiceless → voiced)
//
// Aspirated consonants (\u0569 t\u02B0, \u0579 t\u0361\u0283\u02B0, \u0581 t\u0361s\u02B0, \u0583 p\u02B0, \u0584 k\u02B0) are unchanged.

export const ipaWestern: TransliterationStandard = {
  id: "ipa-western",
  name: "IPA Phonemic Transcription (Western Armenian)",
  targetScript: "ipa",
  reversible: false,

  charMappings: [
    // U+0561 \u0561
    { armenian: "\u0561", target: "a" },
    // U+0562 \u0562 — Western: Eastern voiced /b/ → aspirated /p\u02B0/ (merges with \u0583); reverseDefault false (\u0583 is canonical /p\u02B0/)
    { armenian: "\u0562", target: "p\u02B0", reverseDefault: false },
    // U+0563 \u0563 — Western: Eastern voiced /\u0261/ → aspirated /k\u02B0/ (merges with \u0584); reverseDefault false (\u0584 is canonical /k\u02B0/)
    { armenian: "\u0563", target: "k\u02B0", reverseDefault: false },
    // U+0564 \u0564 — Western: Eastern voiced /d/ → aspirated /t\u02B0/ (merges with \u0569); reverseDefault false (\u0569 is canonical /t\u02B0/)
    { armenian: "\u0564", target: "t\u02B0", reverseDefault: false },
    // U+0565 \u0565 — word-initial maps to "j\u025B"
    {
      armenian: "\u0565",
      target: "\u025B",
      reverseDefault: true,
      contextRules: [
        { condition: { wordInitial: true }, target: "j\u025B" },
      ],
    },
    // U+0566 \u0566
    { armenian: "\u0566", target: "z" },
    // U+0567 \u0567 — same IPA "\u025B" as \u0565, not the reverse default
    { armenian: "\u0567", target: "\u025B", reverseDefault: false },
    // U+0568 \u0568
    { armenian: "\u0568", target: "\u0259" },
    // U+0569 \u0569 — aspirated T (unchanged in Western)
    { armenian: "\u0569", target: "t\u02B0" },
    // U+056A \u056A
    { armenian: "\u056A", target: "\u0292" },
    // U+056B \u056B
    { armenian: "\u056B", target: "i" },
    // U+056C \u056C
    { armenian: "\u056C", target: "l" },
    // U+056D \u056D
    { armenian: "\u056D", target: "\u03C7" },
    // U+056E \u056E — Western voicing shift: Eastern t\u0361s → Western d\u0361z; reverseDefault true (sole source of /d\u0361z/)
    { armenian: "\u056E", target: "d\u0361z", reverseDefault: true },
    // U+056F \u056F — Western voicing shift: Eastern k → Western \u0261 (IPA voiced velar stop, U+0261); reverseDefault true (sole source of /\u0261/)
    { armenian: "\u056F", target: "\u0261", reverseDefault: true },
    // U+0570 \u0570
    { armenian: "\u0570", target: "h" },
    // U+0571 \u0571 — Western: Eastern voiced /d\u0361z/ → aspirated /t\u0361s\u02B0/ (merges with \u0581); reverseDefault false (\u0581 is canonical /t\u0361s\u02B0/)
    { armenian: "\u0571", target: "t\u0361s\u02B0", reverseDefault: false },
    // U+0572 \u0572
    { armenian: "\u0572", target: "\u0281" },
    // U+0573 \u0573 — Western voicing shift: Eastern t\u0361\u0283 → Western d\u0361\u0292; reverseDefault true (sole source of /d\u0361\u0292/)
    { armenian: "\u0573", target: "d\u0361\u0292", reverseDefault: true },
    // U+0574 \u0574
    { armenian: "\u0574", target: "m" },
    // U+0575 \u0575
    { armenian: "\u0575", target: "j" },
    // U+0576 \u0576
    { armenian: "\u0576", target: "n" },
    // U+0577 \u0577
    { armenian: "\u0577", target: "\u0283" },
    // U+0578 \u0578 — word-initial maps to "v\u0254" unless followed by a vowel or \u057E
    {
      armenian: "\u0578",
      target: "\u0254",
      reverseDefault: true,
      contextRules: [
        {
          condition: { wordInitial: true, notFollowedBy: [...VOWELS_AND_V] },
          target: "v\u0254",
        },
      ],
    },
    // U+0579 \u0579 — aspirated affricate (unchanged in Western); reverse default
    { armenian: "\u0579", target: "t\u0361\u0283\u02B0", reverseDefault: true },
    // U+057A \u057A — Western voicing shift: Eastern p → Western b; reverseDefault true (sole source of /b/)
    { armenian: "\u057A", target: "b", reverseDefault: true },
    // U+057B \u057B — Western: Eastern voiced /d\u0361\u0292/ → aspirated /t\u0361\u0283\u02B0/ (merges with \u0579); reverseDefault false (\u0579 is canonical /t\u0361\u0283\u02B0/)
    { armenian: "\u057B", target: "t\u0361\u0283\u02B0", reverseDefault: false },
    // U+057C \u057C — trilled R; reverse default
    { armenian: "\u057C", target: "r", reverseDefault: true },
    // U+057D \u057D
    { armenian: "\u057D", target: "s" },
    // U+057E \u057E
    { armenian: "\u057E", target: "v" },
    // U+057F \u057F — Western voicing shift: Eastern t → Western d; reverseDefault true (sole source of /d/)
    { armenian: "\u057F", target: "d", reverseDefault: true },
    // U+0580 \u0580 — tap R; not reverse default (\u057C is)
    { armenian: "\u0580", target: "\u027E", reverseDefault: false },
    // U+0581 \u0581 — aspirated affricate (unchanged in Western); reverse default
    { armenian: "\u0581", target: "t\u0361s\u02B0", reverseDefault: true },
    // U+0582 \u0582 — rarely stands alone; part of the \u0578\u0582 digraph
    { armenian: "\u0582", target: "u" },
    // U+0583 \u0583 — aspirated P (unchanged in Western); not reverse default
    { armenian: "\u0583", target: "p\u02B0", reverseDefault: false },
    // U+0584 \u0584 — aspirated K (unchanged in Western); not reverse default
    { armenian: "\u0584", target: "k\u02B0", reverseDefault: false },
    // U+0585 \u0585 — not reverse default (\u0578 already maps to "\u0254" with reverseDefault)
    { armenian: "\u0585", target: "\u0254", reverseDefault: false },
    // U+0586 \u0586
    { armenian: "\u0586", target: "f" },
  ],

  sequenceMappings: [
    // \u0578\u0582 digraph (U+0578 + U+0582) \u2192 "u"
    { armenian: "\u0578\u0582", target: "u" },
    // \u0565\u057E sequence (\u0565 + \u057E) \u2014 word-initial maps to "j\u025Bv"
    {
      armenian: "\u0565\u057E",
      target: "\u025Bv",
      contextRules: [
        { condition: { wordInitial: true }, target: "j\u025Bv" },
      ],
    },
    // \u0565\u0582 traditional spelling (U+0565 + U+0582) \u2014 alternative spelling of "\u025Bv"
    {
      armenian: "\u0565\u0582",
      target: "\u025Bv",
      contextRules: [
        { condition: { wordInitial: true }, target: "j\u025Bv" },
      ],
    },
    // \u0587 ligature (U+0587) \u2014 word-initial maps to "j\u025Bv"
    {
      armenian: "\u0587",
      target: "\u025Bv",
      contextRules: [
        { condition: { wordInitial: true }, target: "j\u025Bv" },
      ],
    },
  ],

  punctuation: {
    "\u0589": ".",   // Armenian full stop \u2192 period
    "\u055E": "?",   // Armenian question mark \u2192 question mark
    "\u055D": ",",   // Armenian comma \u2192 comma
    "\u055C": "!",   // Armenian exclamation mark \u2192 exclamation mark
    "\u00AB": '"',   // Armenian left guillemet \u2192 double quote
    "\u00BB": '"',   // Armenian right guillemet \u2192 double quote
  },
};
