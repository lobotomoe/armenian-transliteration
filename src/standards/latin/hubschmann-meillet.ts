import type { TransliterationStandard } from "../../types.js";

export const hubschmannMeillet: TransliterationStandard = {
  id: "hubschmann-meillet",
  name: "Hübschmann-Meillet Transliteration",
  targetScript: "latin",
  reversible: true,

  charMappings: [
    // U+0561 ա
    { armenian: "ա", target: "a" },
    // U+0562 բ
    { armenian: "բ", target: "b" },
    // U+0563 գ
    { armenian: "գ", target: "g" },
    // U+0564 դ
    { armenian: "դ", target: "d" },
    // U+0565 ե
    { armenian: "ե", target: "e" },
    // U+0566 զ
    { armenian: "զ", target: "z" },
    // U+0567 է → ē (e with macron, U+0113)
    { armenian: "է", target: "ē" },
    // U+0568 ը → ə (schwa, U+0259)
    { armenian: "ը", target: "ə" },
    // U+0569 թ → tʿ (t + modifier letter left half ring U+02BF)
    { armenian: "թ", target: "tʿ" },
    // U+056A ժ → ž (U+017E)
    { armenian: "ժ", target: "ž" },
    // U+056B ի
    { armenian: "ի", target: "i" },
    // U+056C լ
    { armenian: "լ", target: "l" },
    // U+056D խ
    { armenian: "խ", target: "x" },
    // U+056E ծ → c (plain c; H-M uses c without diacritic)
    { armenian: "ծ", target: "c" },
    // U+056F կ
    { armenian: "կ", target: "k" },
    // U+0570 հ
    { armenian: "հ", target: "h" },
    // U+0571 ձ → j
    { armenian: "ձ", target: "j" },
    // U+0572 ղ → ł (l with stroke, U+0142)
    { armenian: "ղ", target: "ł" },
    // U+0573 ճ → č (c with caron, U+010D)
    { armenian: "ճ", target: "č" },
    // U+0574 մ
    { armenian: "մ", target: "m" },
    // U+0575 յ
    { armenian: "յ", target: "y" },
    // U+0576 ն
    { armenian: "ն", target: "n" },
    // U+0577 շ → š (U+0161)
    { armenian: "շ", target: "š" },
    // U+0578 ո
    { armenian: "ո", target: "o" },
    // U+0579 չ → čʿ (č + modifier letter left half ring U+02BF)
    { armenian: "չ", target: "č\u02BF" },
    // U+057A պ
    { armenian: "պ", target: "p" },
    // U+057B ջ → ǰ (j with combining caron, U+01F0)
    { armenian: "ջ", target: "\u01F0" },
    // U+057C ռ → ṙ (r with dot above, U+1E59)
    { armenian: "ռ", target: "\u1E59" },
    // U+057D ս
    { armenian: "ս", target: "s" },
    // U+057E վ
    { armenian: "վ", target: "v" },
    // U+057F տ
    { armenian: "տ", target: "t" },
    // U+0580 ր
    { armenian: "ր", target: "r" },
    // U+0581 ց → cʿ (c + modifier letter left half ring U+02BF)
    { armenian: "ց", target: "c\u02BF" },
    // U+0582 ւ → w
    { armenian: "ւ", target: "w" },
    // U+0583 փ → pʿ (p + modifier letter left half ring U+02BF)
    { armenian: "փ", target: "pʿ" },
    // U+0584 ք → kʿ (k + modifier letter left half ring U+02BF)
    { armenian: "ք", target: "kʿ" },
    // U+0585 օ → ō (o with macron, U+014D)
    { armenian: "օ", target: "ō" },
    // U+0586 ֆ
    { armenian: "ֆ", target: "f" },
  ],

  sequenceMappings: [
    // և ligature (U+0587) → ew
    { armenian: "և", target: "ew" },
  ],

  punctuation: {
    "։": ".",
    "՞": "?",
    "՝": ",",
    "՜": "!",
    "«": '"',
    "»": '"',
  },
};
