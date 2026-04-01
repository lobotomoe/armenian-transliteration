import type { TransliterationStandard } from "../../types.js";

/** Armenian vowels (lowercase) used for context rules */
const VOWELS = ["ա", "ե", "է", "ը", "ի", "ո", "օ"] as const;

/**
 * Russian Geographic Transliteration
 *
 * Based on: Инструкция по русской передаче географических названий
 * Армянской ССР / Сост. Г. Г. Кузьмина; Ред. Э. Г. Туманян. — М., 1974.
 *
 * Key characteristics for Eastern Armenian toponyms:
 *   - ջ [dʒ]  → дж  (not ж — distinct from ժ)
 *   - ղ [ʁ]   → г mid-word; к word-initial  ("В начале слова — к", note 5)
 *   - հ [h]   → х   (kept in geographic names: Хаяcтан, Хачкар)
 *   - ե       → е   (word-initial е; same letter, no special prefix)
 *   - ո       → во  word-initial before consonant; о elsewhere
 */
export const ruGeographic: TransliterationStandard = {
  id: "ru-geographic",
  name: "Russian Geographic Transliteration (Кузьмина–Туманян 1974)",
  targetScript: "cyrillic",
  reversible: false,

  charMappings: [
    // U+0561 ա → а
    { armenian: "ա", target: "а" },
    // U+0562 բ → б
    { armenian: "բ", target: "б" },
    // U+0563 գ → г  (reverseDefault: ղ also → г mid-word, but գ is the canonical reverse)
    { armenian: "գ", target: "г", reverseDefault: true },
    // U+0564 դ → д
    { armenian: "դ", target: "д" },
    // U+0565 ե → е  (word-initial е; context rule is identity, present for explicitness)
    {
      armenian: "ե",
      target: "е",
      contextRules: [{ condition: { wordInitial: true }, target: "е" }],
    },
    // U+0566 զ → з
    { armenian: "զ", target: "з" },
    // U+0567 է → э
    { armenian: "է", target: "э" },
    // U+0568 ը → ы  (note: absent from source; ы used as phonetic approximation)
    { armenian: "ը", target: "ы" },
    // U+0569 թ [tʰ] → т  (reverseDefault: false — տ is the reverse default for т)
    { armenian: "թ", target: "т", reverseDefault: false },
    // U+056A ժ [ʒ] → ж  (reverseDefault: true — ջ maps to дж now, so ժ is sole reverse for ж)
    { armenian: "ժ", target: "ж" },
    // U+056B ի → и
    { armenian: "ի", target: "и" },
    // U+056C լ → л
    { armenian: "լ", target: "л" },
    // U+056D խ [χ] → х  (reverseDefault: true — հ also → х)
    { armenian: "խ", target: "х", reverseDefault: true },
    // U+056E ծ [ts] → ц  (reverseDefault: false — ց is the reverse default for ц)
    { armenian: "ծ", target: "ц", reverseDefault: false },
    // U+056F կ [k] → к  (reverseDefault: true — ք also → к)
    { armenian: "կ", target: "к", reverseDefault: true },
    // U+0570 հ [h] → х  (geographic names keep Հ as Х: Хаяcтан, Хачкар, Хандaберд)
    // reverseDefault: false — խ is the canonical reverse for х
    { armenian: "հ", target: "х", reverseDefault: false },
    // U+0571 ձ [dz] → дз
    { armenian: "ձ", target: "дз" },
    // U+0572 ղ [ʁ] → г mid-word; к word-initial
    // Note 5 in Wikipedia table: "В начале слова — к.
    // В зависимости от закрепившейся традиции может передаваться через г."
    // Real examples: Карабах (ղ initial → к), Мегри / Мегеди (ղ mid-word → г)
    {
      armenian: "ղ",
      target: "г",
      reverseDefault: false,
      contextRules: [{ condition: { wordInitial: true }, target: "к" }],
    },
    // U+0573 ճ [tʃ] → ч  (reverseDefault: false — չ is the reverse default for ч)
    { armenian: "ճ", target: "ч", reverseDefault: false },
    // U+0574 մ → м
    { armenian: "մ", target: "м" },
    // U+0575 յ → й
    { armenian: "յ", target: "й" },
    // U+0576 ն → н
    { armenian: "ն", target: "н" },
    // U+0577 շ [ʃ] → ш
    { armenian: "շ", target: "ш" },
    // U+0578 ո → о; word-initial + not followed by vowel/վ → во
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
    // U+0579 չ [tʃʰ] → ч  (reverseDefault: true — canonical reverse for ч)
    { armenian: "չ", target: "ч", reverseDefault: true },
    // U+057A պ [p] → п  (reverseDefault: true — փ also → п)
    { armenian: "պ", target: "п", reverseDefault: true },
    // U+057B ջ [dʒ] → дж
    // KEY DIFFERENCE from old russian-phonetic: дж not ж
    // Both Инструкция 1974 and Вартапетян give дж for Eastern Armenian ջ
    { armenian: "ջ", target: "дж" },
    // U+057C ռ [r] → р  (reverseDefault: true — ր also → р, ռ is canonical)
    { armenian: "ռ", target: "р", reverseDefault: true },
    // U+057D ս → с
    { armenian: "ս", target: "с" },
    // U+057E վ → в
    { armenian: "վ", target: "в" },
    // U+057F տ [t] → т  (reverseDefault: true — canonical reverse for т)
    { armenian: "տ", target: "т", reverseDefault: true },
    // U+0580 ր [ɾ] → р  (reverseDefault: false — ռ is the reverse default)
    { armenian: "ր", target: "р", reverseDefault: false },
    // U+0581 ց [tsʰ] → ц  (reverseDefault: true — canonical reverse for ц)
    { armenian: "ց", target: "ц", reverseDefault: true },
    // U+0582 ւ → у  (standalone yiwn; ու digraph handled in sequenceMappings)
    { armenian: "ւ", target: "у" },
    // U+0583 փ [pʰ] → п  (reverseDefault: false — պ is the reverse default)
    { armenian: "փ", target: "п", reverseDefault: false },
    // U+0584 ք [kʰ] → к  (reverseDefault: false — կ is the reverse default)
    { armenian: "ք", target: "к", reverseDefault: false },
    // U+0585 օ → о  (reverseDefault: false — ո is the canonical reverse)
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
    // 4. եւ traditional spelling (U+0565 + U+0582) → ев
    { armenian: "եւ", target: "ев" },
    // 5. և (U+0587 ligature) → ев
    { armenian: "և", target: "ев" },
  ],

  punctuation: {},
};
