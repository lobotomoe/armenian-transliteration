import type { TransliterationStandard } from "../../types.js";

// Armenian vowels (lowercase) used in context rules for \u0578 word-initial behaviour
// \u0561\u0565\u0567\u0568\u056B\u0578\u0585\u057E
const VOWELS_AND_V = ["\u0561", "\u0565", "\u0567", "\u0568", "\u056B", "\u0578", "\u0585", "\u057E"] as const;

export const ipaEastern: TransliterationStandard = {
  id: "ipa-eastern",
  name: "IPA Phonemic Transcription (Eastern Armenian)",
  targetScript: "ipa",
  reversible: false,

  charMappings: [
    // U+0561 \u0561
    { armenian: "\u0561", target: "a" },
    // U+0562 \u0562
    { armenian: "\u0562", target: "b" },
    // U+0563 \u0563 — IPA \u0261 (lowercase g, U+0261)
    { armenian: "\u0563", target: "\u0261" },
    // U+0564 \u0564
    { armenian: "\u0564", target: "d" },
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
    // U+0569 \u0569 — aspirated T
    { armenian: "\u0569", target: "t\u02B0" },
    // U+056A \u056A
    { armenian: "\u056A", target: "\u0292" },
    // U+056B \u056B
    { armenian: "\u056B", target: "i" },
    // U+056C \u056C
    { armenian: "\u056C", target: "l" },
    // U+056D \u056D
    { armenian: "\u056D", target: "\u03C7" },
    // U+056E \u056E — same IPA "t\u0361s" as \u0571 variant, not the reverse default
    { armenian: "\u056E", target: "t\u0361s", reverseDefault: false },
    // U+056F \u056F
    { armenian: "\u056F", target: "k" },
    // U+0570 \u0570
    { armenian: "\u0570", target: "h" },
    // U+0571 \u0571
    { armenian: "\u0571", target: "d\u0361z" },
    // U+0572 \u0572
    { armenian: "\u0572", target: "\u0281" },
    // U+0573 \u0573 — same IPA "t\u0361\u0283" as \u0579 base, not the reverse default
    { armenian: "\u0573", target: "t\u0361\u0283", reverseDefault: false },
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
    // U+0579 \u0579 — aspirated affricate; reverse default
    { armenian: "\u0579", target: "t\u0361\u0283\u02B0", reverseDefault: true },
    // U+057A \u057A
    { armenian: "\u057A", target: "p" },
    // U+057B \u057B
    { armenian: "\u057B", target: "d\u0361\u0292" },
    // U+057C \u057C — trilled R; reverse default
    { armenian: "\u057C", target: "r", reverseDefault: true },
    // U+057D \u057D
    { armenian: "\u057D", target: "s" },
    // U+057E \u057E
    { armenian: "\u057E", target: "v" },
    // U+057F \u057F — reverse default "t"
    { armenian: "\u057F", target: "t", reverseDefault: true },
    // U+0580 \u0580 — tap R; not reverse default (\u057C is)
    { armenian: "\u0580", target: "\u027E", reverseDefault: false },
    // U+0581 \u0581 — aspirated affricate; reverse default
    { armenian: "\u0581", target: "t\u0361s\u02B0", reverseDefault: true },
    // U+0582 \u0582 — rarely stands alone; part of the \u0578\u0582 digraph
    { armenian: "\u0582", target: "u" },
    // U+0583 \u0583 — aspirated P; not reverse default
    { armenian: "\u0583", target: "p\u02B0", reverseDefault: false },
    // U+0584 \u0584 — aspirated K; not reverse default
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
