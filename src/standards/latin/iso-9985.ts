import type { TransliterationStandard } from "../../types.js";

export const iso9985: TransliterationStandard = {
  id: "iso-9985",
  name: "ISO 9985:1996",
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
    // U+0568 ը → ë (e with diaeresis, U+00EB)
    { armenian: "ը", target: "ë" },
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
    // U+056E ծ → c̣ (c + combining dot below U+0323)
    { armenian: "ծ", target: "c\u0323" },
    // U+056F կ
    { armenian: "կ", target: "k" },
    // U+0570 հ
    { armenian: "հ", target: "h" },
    // U+0571 ձ → j
    { armenian: "ձ", target: "j" },
    // U+0572 ղ → ġ (g + combining dot above U+0307)
    { armenian: "ղ", target: "g\u0307" },
    // U+0573 ճ → č̣ (č U+010D + combining dot below U+0323)
    { armenian: "ճ", target: "\u010D\u0323" },
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
    // U+0579 չ → č (U+010D)
    { armenian: "չ", target: "č" },
    // U+057A պ
    { armenian: "պ", target: "p" },
    // U+057B ջ → ǰ (j + combining caron, U+01F0)
    { armenian: "ջ", target: "\u01F0" },
    // U+057C ռ → ṙ (r + combining dot above U+0307 applied to r... use ṙ U+1E59)
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
    { armenian: "փ", target: "p\u02BF" },
    // U+0584 ք → kʿ (k + modifier letter left half ring U+02BF)
    { armenian: "ք", target: "k\u02BF" },
    // U+0585 օ → ò (o with grave, U+00F2)
    { armenian: "օ", target: "ò" },
    // U+0586 ֆ
    { armenian: "ֆ", target: "f" },
  ],

  sequenceMappings: [
    // ու digraph (U+0578 + U+0582) — in ISO 9985 each letter maps independently (ո→o, ւ→w)
    // but the digraph "ow" is the natural reversible representation; no override needed.
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
