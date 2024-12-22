/**
 * Mapping between individual Armenian characters and their Russian equivalents.
 */
export const ARM_TO_RUS_MAP: Record<string, string> = {
  ա: "а",
  Ա: "А",
  բ: "б",
  Բ: "Б",
  գ: "г",
  Գ: "Г",
  դ: "д",
  Դ: "Д",
  ե: "е",
  Ե: "Е",
  զ: "з",
  Զ: "З",
  է: "э",
  Է: "Э",
  ը: "ы",
  Ը: "Ы",
  թ: "т'",
  Թ: "Т'",
  ժ: "ж",
  Ժ: "Ж",
  ի: "и",
  Ի: "И",
  լ: "л",
  Լ: "Л",
  խ: "х",
  Խ: "Х",
  ծ: "ц",
  Ծ: "Ц",
  կ: "к",
  Կ: "К",
  հ: "х",
  Հ: "Х",
  ձ: "дз",
  Ձ: "Дз",
  ղ: "гх",
  Ղ: "Гх",
  ճ: "ч'",
  Ճ: "Ч'",
  մ: "м",
  Մ: "М",
  յ: "й",
  Յ: "Й",
  ն: "н",
  Ն: "Н",
  շ: "ш",
  Շ: "Ш",
  ո: "о",
  Ո: "О",
  չ: "ч",
  Չ: "Ч",
  պ: "п",
  Պ: "П",
  ջ: "ж",
  Ջ: "Ж",
  ռ: "р",
  Ռ: "Р",
  ս: "с",
  Ս: "С",
  վ: "в",
  Վ: "В",
  տ: "т",
  Տ: "Т",
  ր: "р",
  Ր: "Р",
  ց: "ц",
  Ց: "Ц",
  ւ: "у",
  Ւ: "У",
  փ: "п'",
  Փ: "П'",
  ք: "к'",
  Ք: "К'",
  օ: "о",
  Օ: "О",
  ֆ: "ф",
  Ֆ: "Ф",
};

/**
 * Temporary symbols for multi-character sequences like "ու" and "և".
 * We convert them temporarily to symbols that are not otherwise used in Armenian
 * so that they are processed as single "characters" when we map them to Russian.
 */
export const TEMP_SYMBOLS_MAP: {
  forward: Record<string, string>;
  backward: Record<string, string>;
} = {
  forward: {
    // Map these sequences to temporary symbols for later processing.
    // "ու" or "Ու" -> "֏"
    // "և", "եւ", "Եւ" -> "֎"
    ու: "֏",
    Ու: "֏",
    և: "֎",
    եւ: "֎",
    Եւ: "֎",
  },
  backward: {
    // Once we see these temporary symbols, map them to their Russian equivalents.
    // "֏" -> "у"
    // "֎" -> "эв"
    "֏": "у",
    "֎": "эв",
  },
};

/**
 * Function to transliterate Armenian text to Russian.
 * @param text Armenian text to transliterate.
 * @returns Transliterated Russian text.
 */
export function transliterateArmenianToRussian(text: string): string {
  // First, replace multi-character sequences with temporary symbols.
  for (const [arm, temp] of Object.entries(TEMP_SYMBOLS_MAP.forward)) {
    const regex = new RegExp(arm, "g");
    text = text.replace(regex, temp);
  }

  // Then, replace individual Armenian characters with Russian equivalents.
  let result = "";
  for (const char of text) {
    if (ARM_TO_RUS_MAP[char]) {
      result += ARM_TO_RUS_MAP[char];
    } else {
      result += char; // If the character is not found in the map, leave it unchanged.
    }
  }

  // Finally, replace temporary symbols with their final Russian equivalents.
  for (const [temp, rus] of Object.entries(TEMP_SYMBOLS_MAP.backward)) {
    const regex = new RegExp(temp, "g");
    result = result.replace(regex, rus);
  }

  return result;
}
