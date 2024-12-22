/**
 * Mapping between individual Armenian characters and their Latin equivalents.
 */
export const ARM_TO_LAT_MAP: Record<string, string> = {
  ա: "a",
  Ա: "a",
  բ: "b",
  Բ: "b",
  գ: "g",
  Գ: "g",
  դ: "d",
  Դ: "d",
  ե: "e",
  Ե: "e",
  զ: "z",
  Զ: "z",
  է: "e",
  Է: "e",
  ը: "ə",
  Ը: "ə",
  թ: "t'",
  Թ: "t'",
  ժ: "zh",
  Ժ: "zh",
  ի: "i",
  Ի: "i",
  լ: "l",
  Լ: "l",
  խ: "kh",
  Խ: "kh",
  ծ: "ts",
  Ծ: "ts",
  կ: "k",
  Կ: "k",
  հ: "h",
  Հ: "h",
  ձ: "dz",
  Ձ: "dz",
  ղ: "gh",
  Ղ: "gh",
  ճ: "ch'",
  Ճ: "ch'",
  մ: "m",
  Մ: "m",
  յ: "y",
  Յ: "y",
  ն: "n",
  Ն: "n",
  շ: "sh",
  Շ: "sh",
  ո: "o",
  Ո: "o",
  չ: "ch",
  Չ: "ch",
  պ: "p",
  Պ: "p",
  ջ: "j",
  Ջ: "j",
  ռ: "r",
  Ռ: "r",
  ս: "s",
  Ս: "s",
  վ: "v",
  Վ: "v",
  տ: "t",
  Տ: "t",
  ր: "r",
  Ր: "r",
  ց: "ts",
  Ց: "ts",
  ւ: "u",
  Ւ: "u",
  փ: "p'",
  Փ: "p'",
  ք: "k'",
  Ք: "k'",
  օ: "o",
  Օ: "o",
  ֆ: "f",
  Ֆ: "f",
};

/**
 * Temporary symbols for multi-character sequences like "ու" and "և".
 * We convert them temporarily to symbols that are not otherwise used in Armenian
 * so that they are processed as single "characters" when we map them to Latin.
 */
export const TEMP_SYMBOLS_MAP: {
  forward: Record<string, string>;
  backward: Record<string, string>;
} = {
  forward: {
    // Map these sequences to temporary symbols for later processing.
    ու: "\u2042",
    Ու: "\u2042",
    և: "\u00A4",
    եւ: "\u00A4",
    Եւ: "\u00A4",
  },
  backward: {
    // Once we see these temporary symbols, map them to their Latin equivalents.

    "\u2042": "u",
    "\u00A4": "ev",
  },
};
