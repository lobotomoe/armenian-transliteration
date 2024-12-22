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
  թ: "т",
  Թ: "Т",
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
  ղ: "г",
  Ղ: "Г",
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
    // Map these sequences to temporary (most unicode rare) symbols for later processing.
    // ORDER MATTERS! We need to process longer sequences first.

    յու: "\u2117", // "յու" -> "ю" -> "ю"
    Յու: "\u2117", // "Յու" -> "Ю" -> "ю"

    յա: "\u203D", // "յա" -> "я" -> "я"
    Յա: "\u203D", // "Յա" -> "Я" -> "я"

    ու: "\u2042", // "ու" -> "у" -> "у"
    Ու: "\u2042", // "Ու" -> "у" -> "у"

    և: "\u00A4", // "և" -> "եվ" -> "ев"
    եւ: "\u00A4", // "եւ" -> "ев" -> "ев"
    Եւ: "\u00A4", // "Եւ" -> "Ев" -> "ев"
  },
  backward: {
    "\u2042": "у",
    "\u00A4": "ев",
    "\u203D": "я",
    "\u2117": "ю",
  },
};
