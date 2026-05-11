import type { TransliterationStandard } from "../../types.js";

const VOWELS = ["ա", "ե", "է", "ը", "ի", "ո", "օ"] as const;

/**
 * Russian-oriented phonetic Cyrillic transcription for Eastern Armenian.
 *
 * This is a package profile for learner-facing common vocabulary, not an
 * official geographic or proper-name transfer system.
 */
export const ruPhoneticEastern: TransliterationStandard = {
  id: "ru-phonetic-eastern",
  name: "Russian Phonetic Transcription (Eastern Armenian)",
  targetScript: "cyrillic",
  reversible: false,

  charMappings: [
    { armenian: "ա", target: "а" },
    { armenian: "բ", target: "б" },
    { armenian: "գ", target: "г", reverseDefault: true },
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
    { armenian: "հ", target: "х", reverseDefault: false },
    { armenian: "ձ", target: "дз" },
    { armenian: "ղ", target: "г", reverseDefault: false },
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
        {
          condition: {
            wordInitial: true,
            notFollowedBy: [...VOWELS, "վ"],
          },
          target: "во",
        },
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
    { armenian: "ու", target: "у" },
    { armenian: "եվ", target: "ев" },
    { armenian: "եւ", target: "ев" },
    { armenian: "և", target: "ев" },
  ],

  punctuation: {},
};
