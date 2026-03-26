import type { TransliterationStandard } from "../../types.js";

// Armenian vowels (lowercase) used in context rules for ո word-initial behaviour
const VOWELS_AND_V = ["ա", "ե", "է", "ը", "ի", "ո", "օ", "վ"] as const;

export const bgnPcgn: TransliterationStandard = {
  id: "bgn-pcgn",
  name: "BGN/PCGN Romanization (simplified)",
  targetScript: "latin",
  reversible: false,

  charMappings: [
    // U+0561 ա
    { armenian: "ա", target: "a" },
    // U+0562 բ
    { armenian: "բ", target: "b" },
    // U+0563 գ
    { armenian: "գ", target: "g" },
    // U+0564 դ
    { armenian: "դ", target: "d" },
    // U+0565 ե — word-initial maps to "ye"
    {
      armenian: "ե",
      target: "e",
      reverseDefault: true,
      contextRules: [
        { condition: { wordInitial: true }, target: "ye" },
      ],
    },
    // U+0566 զ
    { armenian: "զ", target: "z" },
    // U+0567 է — same Latin "e" as ե, not the reverse default
    { armenian: "է", target: "e", reverseDefault: false },
    // U+0568 ը
    { armenian: "ը", target: "ə" },
    // U+0569 թ — aspirated T, simplified (no apostrophe)
    { armenian: "թ", target: "t", reverseDefault: false },
    // U+056A ժ
    { armenian: "ժ", target: "zh" },
    // U+056B ի
    { armenian: "ի", target: "i" },
    // U+056C լ
    { armenian: "լ", target: "l" },
    // U+056D խ
    { armenian: "խ", target: "kh" },
    // U+056E ծ — same Latin "ts" as ձ, not the reverse default
    { armenian: "ծ", target: "ts", reverseDefault: false },
    // U+056F կ
    { armenian: "կ", target: "k", reverseDefault: true },
    // U+0570 հ
    { armenian: "հ", target: "h" },
    // U+0571 ձ
    { armenian: "ձ", target: "dz" },
    // U+0572 ղ
    { armenian: "ղ", target: "gh" },
    // U+0573 ճ — same Latin "ch" as չ, not the reverse default
    { armenian: "ճ", target: "ch", reverseDefault: false },
    // U+0574 մ
    { armenian: "մ", target: "m" },
    // U+0575 յ
    { armenian: "յ", target: "y" },
    // U+0576 ն
    { armenian: "ն", target: "n" },
    // U+0577 շ
    { armenian: "շ", target: "sh" },
    // U+0578 ո — word-initial maps to "vo" unless followed by a vowel or վ
    {
      armenian: "ո",
      target: "o",
      reverseDefault: true,
      contextRules: [
        {
          condition: { wordInitial: true, notFollowedBy: [...VOWELS_AND_V] },
          target: "vo",
        },
      ],
    },
    // U+0579 չ — reverse default "ch"
    { armenian: "չ", target: "ch", reverseDefault: true },
    // U+057A պ — aspirated P counterpart; reverse default
    { armenian: "պ", target: "p", reverseDefault: true },
    // U+057B ջ
    { armenian: "ջ", target: "j" },
    // U+057C ռ — trilled R; reverse default
    { armenian: "ռ", target: "r", reverseDefault: true },
    // U+057D ս
    { armenian: "ս", target: "s" },
    // U+057E վ
    { armenian: "վ", target: "v" },
    // U+057F տ — reverse default "t"
    { armenian: "տ", target: "t", reverseDefault: true },
    // U+0580 ր — non-trilled R; not reverse default (ռ is)
    { armenian: "ր", target: "r", reverseDefault: false },
    // U+0581 ց — reverse default "ts"
    { armenian: "ց", target: "ts", reverseDefault: true },
    // U+0582 ւ — rarely stands alone; part of the ու digraph
    { armenian: "ւ", target: "u" },
    // U+0583 փ — aspirated P, simplified (no apostrophe); not reverse default
    { armenian: "փ", target: "p", reverseDefault: false },
    // U+0584 ք — aspirated K, simplified (no apostrophe); not reverse default
    { armenian: "ք", target: "k", reverseDefault: false },
    // U+0585 օ — not reverse default (ո already maps to "o" with reverseDefault)
    { armenian: "օ", target: "o", reverseDefault: false },
    // U+0586 ֆ
    { armenian: "ֆ", target: "f" },
  ],

  sequenceMappings: [
    // ու digraph (U+0578 + U+0582) → "u"
    { armenian: "ու", target: "u" },
    // եվ sequence (ե + վ) as alternative spelling of "ev" — word-initial maps to "yev"
    {
      armenian: "եվ",
      target: "ev",
      contextRules: [
        { condition: { wordInitial: true }, target: "yev" },
      ],
    },
    // եւ traditional spelling (U+0565 + U+0582) — alternative spelling of "ev"
    {
      armenian: "եւ",
      target: "ev",
      contextRules: [
        { condition: { wordInitial: true }, target: "yev" },
      ],
    },
    // և ligature (U+0587) — word-initial maps to "yev"
    {
      armenian: "և",
      target: "ev",
      contextRules: [
        { condition: { wordInitial: true }, target: "yev" },
      ],
    },
  ],

  punctuation: {
    "։": ".",   // Armenian full stop → period
    "՞": "?",   // Armenian question mark → question mark
    "՝": ",",   // Armenian comma → comma
    "՜": "!",   // Armenian exclamation mark → exclamation mark
    "«": '"',   // Armenian left guillemet → double quote
    "»": '"',   // Armenian right guillemet → double quote
  },
};
