import type { TransliterationStandard } from "../../types.js";

/** Armenian vowels (lowercase) used for ո word-initial context rule */
const VOWELS = ["ա", "ե", "է", "ը", "ի", "ո", "օ"] as const;

export const russianPhonetic: TransliterationStandard = {
  id: "russian-phonetic",
  name: "Russian Phonetic Transliteration",
  targetScript: "cyrillic",
  reversible: false,

  charMappings: [
    // U+0561 ա → а
    { armenian: "ա", target: "а" },
    // U+0562 բ → б
    { armenian: "բ", target: "б" },
    // U+0563 գ → г (reverseDefault: true — ղ also → г)
    { armenian: "գ", target: "г", reverseDefault: true },
    // U+0564 դ → д
    { armenian: "դ", target: "д" },
    // U+0565 ե → е (wordInitial → "е" — same letter, no change)
    {
      armenian: "ե",
      target: "е",
      contextRules: [
        { condition: { wordInitial: true }, target: "е" },
      ],
    },
    // U+0566 զ → з
    { armenian: "զ", target: "з" },
    // U+0567 է → э
    { armenian: "է", target: "э" },
    // U+0568 ը → ы
    { armenian: "ը", target: "ы" },
    // U+0569 թ → т (reverseDefault: false — տ is the reverse default)
    { armenian: "թ", target: "т", reverseDefault: false },
    // U+056A ժ → ж (reverseDefault: true — ջ also → ж)
    { armenian: "ժ", target: "ж", reverseDefault: true },
    // U+056B ի → и
    { armenian: "ի", target: "и" },
    // U+056C լ → л
    { armenian: "լ", target: "л" },
    // U+056D խ → х (reverseDefault: true — հ also → х)
    { armenian: "խ", target: "х", reverseDefault: true },
    // U+056E ծ → ц (reverseDefault: false — ց is the reverse default)
    { armenian: "ծ", target: "ц", reverseDefault: false },
    // U+056F կ → к (reverseDefault: true — ք also → к)
    { armenian: "կ", target: "к", reverseDefault: true },
    // U+0570 հ → х (reverseDefault: false — խ is the reverse default)
    { armenian: "հ", target: "х", reverseDefault: false },
    // U+0571 ձ → дз
    { armenian: "ձ", target: "дз" },
    // U+0572 ղ → г (reverseDefault: false — գ is the reverse default)
    { armenian: "ղ", target: "г", reverseDefault: false },
    // U+0573 ճ → ч (reverseDefault: false — չ is the reverse default)
    { armenian: "ճ", target: "ч", reverseDefault: false },
    // U+0574 մ → м
    { armenian: "մ", target: "м" },
    // U+0575 յ → й
    { armenian: "յ", target: "й" },
    // U+0576 ն → н
    { armenian: "ն", target: "н" },
    // U+0577 շ → ш
    { armenian: "շ", target: "ш" },
    // U+0578 ո → о (wordInitial + NOT followed by vowel or վ → "во")
    {
      armenian: "ո",
      target: "о",
      reverseDefault: true,
      contextRules: [
        {
          condition: {
            wordInitial: true,
            notFollowedBy: [...VOWELS, "վ"],
          },
          target: "во",
        },
      ],
    },
    // U+0579 չ → ч (reverseDefault: true — ճ also → ч)
    { armenian: "չ", target: "ч", reverseDefault: true },
    // U+057A պ → п (reverseDefault: true — փ also → п)
    { armenian: "պ", target: "п", reverseDefault: true },
    // U+057B ջ → ж (reverseDefault: false — ժ is the reverse default)
    { armenian: "ջ", target: "ж", reverseDefault: false },
    // U+057C ռ → р (reverseDefault: true — ր also → р)
    { armenian: "ռ", target: "р", reverseDefault: true },
    // U+057D ս → с
    { armenian: "ս", target: "с" },
    // U+057E վ → в
    { armenian: "վ", target: "в" },
    // U+057F տ → т (reverseDefault: true — թ also → т)
    { armenian: "տ", target: "т", reverseDefault: true },
    // U+0580 ր → р (reverseDefault: false — ռ is the reverse default)
    { armenian: "ր", target: "р", reverseDefault: false },
    // U+0581 ց → ц (reverseDefault: true — ծ also → ц)
    { armenian: "ց", target: "ц", reverseDefault: true },
    // U+0582 ւ — standalone yiwn (part of ու digraph when preceded by ո, handled in sequenceMappings)
    { armenian: "ւ", target: "у" },
    // U+0583 փ → п (reverseDefault: false — պ is the reverse default)
    { armenian: "փ", target: "п", reverseDefault: false },
    // U+0584 ք → к (reverseDefault: false — կ is the reverse default)
    { armenian: "ք", target: "к", reverseDefault: false },
    // U+0585 օ → о (reverseDefault: false — ո is the reverse default)
    { armenian: "օ", target: "о", reverseDefault: false },
    // U+0586 ֆ → ф
    { armenian: "ֆ", target: "ф" },
  ],

  sequenceMappings: [
    // 1. յու → ю  (3 chars, longest first)
    { armenian: "յու", target: "ю" },
    // 2. յա → я
    { armenian: "յա", target: "я" },
    // 3. ու digraph → у
    { armenian: "ու", target: "у" },
    // 4. եւ traditional spelling (U+0565 + U+0582) — alternative spelling of "ev"  (2 chars)
    { armenian: "եւ", target: "ев" },
    // 5. և (U+0587 ligature) → ев (1 char, shortest last)
    { armenian: "և", target: "ев" },
  ],

  punctuation: {},
};
