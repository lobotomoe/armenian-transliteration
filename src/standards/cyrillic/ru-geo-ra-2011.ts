import type { TransliterationStandard } from "../../types.js";
import { russianVowelsAndU } from "./ru-geo-kt-1974.js";

/**
 * Russian transliteration of Republic of Armenia geographic names.
 *
 * Source: ՀՀ կառավարության 2011-03-03 N 220-Ն որոշում,
 * "ՀՀ աշխարհագրական անվանումների ռուսերեն և անգլերեն տառադարձության կարգը":
 *
 * This is intentionally separate from the 1974 Kuzmina-Tumanyan instruction:
 * both are geographic-name systems, but they make different choices for
 * letters such as հ and ղ.
 */
export const ruGeoRa2011: TransliterationStandard = {
  id: "ru-geo-ra-2011",
  name: "Russian Geographic Transliteration (Republic of Armenia 2011)",
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
      contextRules: [
        { condition: { wordInitial: true }, target: "" },
        { condition: { followedBy: russianVowelsAndU }, target: "" },
      ],
    },
    { armenian: "ձ", target: "дз" },
    { armenian: "ղ", target: "х", reverseDefault: false },
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
    { armenian: "ու", target: "у" },
    { armenian: "եվ", target: "ев" },
    { armenian: "եւ", target: "ев" },
    { armenian: "և", target: "ев" },
  ],

  punctuation: {},
};
