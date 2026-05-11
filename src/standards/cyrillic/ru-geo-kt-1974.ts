import type { TransliterationStandard } from "../../types.js";

/**
 * Armenian vowels/digraphs used for Russian context rules.
 * "ու" can be a sequence token, so keep it in the same list as letters.
 */
const VOWELS_AND_U = ["ա", "ե", "է", "ը", "ի", "ո", "ու", "օ"] as const;

/**
 * Russian transfer of Armenian SSR geographic names.
 *
 * Source: Инструкция по русской передаче географических названий Армянской ССР
 * / Сост. Г. Г. Кузьмина; Ред. Э. Г. Туманян. — М., 1974.
 *
 * This is a geographic-name profile, not a general phonetic Cyrillic
 * transcription. Official/traditional names may still override the table.
 */
export const ruGeoKt1974: TransliterationStandard = {
  id: "ru-geo-kt-1974",
  name: "Russian Geographic Transliteration (Kuzmina-Tumanyan 1974)",
  targetScript: "cyrillic",
  reversible: false,

  charMappings: [
    { armenian: "ա", target: "а" },
    { armenian: "բ", target: "б" },
    { armenian: "գ", target: "г" },
    { armenian: "դ", target: "д" },
    { armenian: "ե", target: "е" },
    { armenian: "զ", target: "з" },
    { armenian: "է", target: "э" },
    { armenian: "ը", target: "ы" },
    { armenian: "թ", target: "т", reverseDefault: false },
    { armenian: "ժ", target: "ж" },
    { armenian: "ի", target: "и" },
    { armenian: "լ", target: "л" },
    { armenian: "խ", target: "х", reverseDefault: true },
    { armenian: "ծ", target: "ц", reverseDefault: false },
    { armenian: "կ", target: "к", reverseDefault: true },
    {
      armenian: "հ",
      target: "х",
      reverseDefault: false,
      contextRules: [{ condition: { wordInitial: true }, target: "" }],
    },
    { armenian: "ձ", target: "дз" },
    {
      armenian: "ղ",
      target: "х",
      reverseDefault: false,
      contextRules: [{ condition: { wordInitial: true }, target: "к" }],
    },
    { armenian: "ճ", target: "ч", reverseDefault: false },
    { armenian: "մ", target: "м" },
    { armenian: "յ", target: "й" },
    { armenian: "ն", target: "н" },
    { armenian: "շ", target: "ш" },
    {
      armenian: "ո",
      target: "о",
      reverseDefault: true,
      contextRules: [
        { condition: { wordInitial: true, followedBy: ["վ"] }, target: "о" },
        { condition: { wordInitial: true }, target: "во" },
      ],
    },
    { armenian: "չ", target: "ч", reverseDefault: true },
    { armenian: "պ", target: "п", reverseDefault: true },
    { armenian: "ջ", target: "дж" },
    { armenian: "ռ", target: "р", reverseDefault: true },
    { armenian: "ս", target: "с" },
    { armenian: "վ", target: "в" },
    { armenian: "տ", target: "т", reverseDefault: true },
    { armenian: "ր", target: "р", reverseDefault: false },
    { armenian: "ց", target: "ц", reverseDefault: true },
    { armenian: "ւ", target: "у" },
    { armenian: "փ", target: "п", reverseDefault: false },
    { armenian: "ք", target: "к", reverseDefault: false },
    { armenian: "օ", target: "о", reverseDefault: false },
    { armenian: "ֆ", target: "ф" },
  ],

  sequenceMappings: [
    { armenian: "յու", target: "ю" },
    { armenian: "յա", target: "я" },
    { armenian: "յո", target: "ё" },
    { armenian: "յե", target: "е" },
    { armenian: "յի", target: "и" },
    { armenian: "ու", target: "у" },
    { armenian: "եվ", target: "ев" },
    { armenian: "եւ", target: "ев" },
    { armenian: "և", target: "ев" },
  ],

  punctuation: {},
};

/**
 * Re-exported for sibling Russian geographic profiles that share the same
 * basic vowel contexts.
 */
export const russianVowelsAndU = VOWELS_AND_U;
