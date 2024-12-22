import { FirstCharRule } from "../common";
import { mapArmenianCharToRussian } from "./transformations";
import { isArmenianVowel } from "./utils";

/**
 * List of rules that apply specifically to the first character (and possibly the second)
 * in an Armenian word for special transliteration cases.
 */
export const FIRST_CHAR_RULES: FirstCharRule[] = [
  {
    name: "YeRule",
    // Trigger only if the first character is uppercase Ե
    match: (firstChar) => firstChar === "Ե",
    transliteration: (_, secondChar) => {
      const secondCharRus = secondChar
        ? mapArmenianCharToRussian(secondChar)
        : "";
      return `Е${secondCharRus}`;
    },
  },
  {
    name: "VoRule",
    // Trigger if the first character is Ո or ո
    match: (firstChar) => firstChar === "Ո" || firstChar === "ո",
    transliteration: (_, secondChar) => {
      // Check if the second char is a vowel or v/V to decide if we do "o" vs "vo".
      const isNextCharVowelOrV =
        secondChar !== undefined &&
        (isArmenianVowel(secondChar) ||
          secondChar === "վ" ||
          secondChar === "Վ");

      const secondCharRus = secondChar
        ? mapArmenianCharToRussian(secondChar)
        : "";
      const firstCharRus = isNextCharVowelOrV ? "о" : "во";
      return `${firstCharRus}${secondCharRus}`;
    },
  },
  {
    name: "YevRule",
    // Trigger if the word starts with "֎" (which corresponds to "և" and variations)
    match: (first) => first === "֎",
    transliteration: (_, secondChar) => {
      const secondCharRus = secondChar
        ? mapArmenianCharToRussian(secondChar)
        : "";
      // "֎" -> "эв", but if it's the first character in a word, it's "ев"
      return `ев${secondCharRus}`;
    },
  },
];
