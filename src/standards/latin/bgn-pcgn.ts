import type { TransliterationStandard } from "../../types.js";

// Armenian vowels (lowercase) used in context rules for ո word-initial behaviour
const VOWELS_AND_OU = ["ա", "ե", "է", "ը", "ի", "ո", "ու", "օ"] as const;

export const bgnPcgn: TransliterationStandard = {
  id: "bgn-pcgn",
  name: "BGN/PCGN Romanization",
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
    // U+0565 ե — maps to "ye" initially and after vowels
    {
      armenian: "ե",
      target: "e",
      reverseDefault: true,
      contextRules: [
        { condition: { wordInitial: true }, target: "ye" },
        { condition: { precededBy: [...VOWELS_AND_OU] }, target: "ye" },
      ],
    },
    // U+0566 զ
    { armenian: "զ", target: "z" },
    // U+0567 է — same Latin "e" as ե, not the reverse default
    { armenian: "է", target: "e", reverseDefault: false },
    // U+0568 ը
    { armenian: "ը", target: "y", reverseDefault: false },
    // U+0569 թ — aspirated T
    { armenian: "թ", target: "t\u2019", reverseDefault: false },
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
    { armenian: "յ", target: "y", reverseDefault: true },
    // U+0576 ն
    { armenian: "ն", target: "n" },
    // U+0577 շ
    { armenian: "շ", target: "sh" },
    // U+0578 ո — word-initial maps to "vo" except in ով
    {
      armenian: "ո",
      target: "o",
      reverseDefault: true,
      contextRules: [
        {
          condition: { wordInitial: true, followedBy: ["վ"] },
          target: "o",
        },
        {
          condition: { wordInitial: true },
          target: "vo",
        },
      ],
    },
    // U+0579 չ — aspirated CH
    { armenian: "չ", target: "ch\u2019", reverseDefault: true },
    // U+057A պ — aspirated P counterpart; reverse default
    { armenian: "պ", target: "p", reverseDefault: true },
    // U+057B ջ
    { armenian: "ջ", target: "j" },
    // U+057C ռ — trilled R
    { armenian: "ռ", target: "rr" },
    // U+057D ս
    { armenian: "ս", target: "s" },
    // U+057E վ
    { armenian: "վ", target: "v" },
    // U+057F տ — reverse default "t"
    { armenian: "տ", target: "t", reverseDefault: true },
    // U+0580 ր — non-trilled R
    { armenian: "ր", target: "r" },
    // U+0581 ց — aspirated TS
    { armenian: "ց", target: "ts\u2019", reverseDefault: true },
    // U+0582 ւ — not romanized standalone in BGN/PCGN; handled in ու/եւ sequences
    { armenian: "ւ", target: "" },
    // U+0583 փ — aspirated P; not reverse default
    { armenian: "փ", target: "p\u2019", reverseDefault: false },
    // U+0584 ք — aspirated K; not reverse default
    { armenian: "ք", target: "k\u2019", reverseDefault: false },
    // U+0585 օ — not reverse default (ո already maps to "o" with reverseDefault)
    { armenian: "օ", target: "o", reverseDefault: false },
    // U+0586 ֆ
    { armenian: "ֆ", target: "f" },
  ],

  sequenceMappings: [
    // ու digraph (U+0578 + U+0582) → "u"
    { armenian: "ու", target: "u" },
    // եվ sequence (ե + վ) as alternative spelling of "ev" — maps to "yev" initially and after vowels
    {
      armenian: "եվ",
      target: "ev",
      contextRules: [
        { condition: { wordInitial: true }, target: "yev" },
        { condition: { precededBy: [...VOWELS_AND_OU] }, target: "yev" },
      ],
    },
    // եւ traditional spelling (U+0565 + U+0582) — alternative spelling of "ev"
    {
      armenian: "եւ",
      target: "ev",
      contextRules: [
        { condition: { wordInitial: true }, target: "yev" },
        { condition: { precededBy: [...VOWELS_AND_OU] }, target: "yev" },
      ],
    },
    // և ligature (U+0587) — maps to "yev" initially and after vowels
    {
      armenian: "և",
      target: "ev",
      contextRules: [
        { condition: { wordInitial: true }, target: "yev" },
        { condition: { precededBy: [...VOWELS_AND_OU] }, target: "yev" },
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
