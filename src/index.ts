////////////////////////////////////////////////////////////////////////////////
// Enums and Basic Types
////////////////////////////////////////////////////////////////////////////////

/**
 * Represents different word casing patterns.
 */
enum WordCasing {
  UPPER = "upper",
  LOWER = "lower",
  MIXED = "mixed",
}

/**
 * Defines how to map the first character(s) of an Armenian word
 * to Latin letters according to specific rules.
 */
interface FirstCharRule {
  name: string;
  match: (first: string, second?: string) => boolean;
  transliteration: (first: string, second?: string) => string;
}

////////////////////////////////////////////////////////////////////////////////
// Armenian-Specific Data
////////////////////////////////////////////////////////////////////////////////

/**
 * Mapping between individual Armenian characters and their Latin equivalents.
 */
const ARM_TO_LAT_MAP: Record<string, string> = {
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
 * Set of Armenian vowels, both uppercase and lowercase.
 */
const ARM_VOWELS = new Set([
  "ա",
  "Ա",
  "ե",
  "Ե",
  "է",
  "Է",
  "ի",
  "Ի",
  "ո",
  "Ո",
  "օ",
  "Օ",
  "ը",
  "Ը",
]);

/**
 * Mapping between Armenian punctuation characters and their English equivalents.
 * Added two extra guillemets: « and ».
 */
const ARM_PUNCT_MAP: Record<string, string> = {
  ՙ: "'",
  "՚": "'",
  "՛": "'",
  "՜": "!",
  "՝": ",",
  "՞": "?",
  "՟": ".",
  "։": ".",
  "֊": "-",
  "«": '"',
  "»": '"',
};

/**
 * Regular expression that matches Armenian letters (including the ligature `և`).
 */
const ARMENIAN_LETTER_REGEX = /[\u0530-\u058Fև]/u;

/**
 * Regex to split text into tokens while preserving delimiters that are not Armenian letters.
 * Example: splits spaces, punctuation, and other symbols but keeps them in the output array.
 */
const ARM_SPLIT_REGEX = /(\s+|[^ա-ֆԱ-Ֆև՝՛։,.\-0-9«»]+)/u;

/**
 * Temporary symbols for multi-character sequences like "ու" and "և".
 * We convert them temporarily to symbols that are not otherwise used in Armenian
 * so that they are processed as single "characters" when we map them to Latin.
 */
const TEMP_SYMBOLS_MAP: {
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
    // Once we see these temporary symbols, map them to their Latin equivalents.
    // "֏" -> "u"
    // "֎" -> "ev"
    "֏": "u",
    "֎": "ev",
  },
};

/**
 * List of special Armenian ligatures from the Alphabetic Presentation Forms block (U+FB13..U+FB17).
 * Each object maps the ligature character to its two-letter expansion.
 */
const ARMENIAN_LIGATURES: { ligature: string; expansion: string }[] = [
  { ligature: "ﬓ", expansion: "մն" }, // U+FB13
  { ligature: "ﬔ", expansion: "մե" }, // U+FB14
  { ligature: "ﬕ", expansion: "մի" }, // U+FB15
  { ligature: "ﬖ", expansion: "վն" }, // U+FB16
  { ligature: "ﬗ", expansion: "մխ" }, // U+FB17
];

////////////////////////////////////////////////////////////////////////////////
// Utility Functions
////////////////////////////////////////////////////////////////////////////////

/**
 * Determine if a character is uppercase by comparing its toUpperCase/toLowerCase forms.
 */
function isCharUppercase(ch: string): boolean {
  return ch.toUpperCase() === ch && ch.toLowerCase() !== ch;
}

/**
 * Split text into parts using a given regex while preserving delimiters.
 * The result is an array of tokens that includes non-Armenian parts.
 */
function splitTextPreservingDelimiters(text: string, regex: RegExp): string[] {
  return text.split(regex);
}

/**
 * Checks if a character (or a temporary symbol) should be treated as a vowel in Armenian.
 */
function isArmenianVowel(ch: string): boolean {
  const { backward } = TEMP_SYMBOLS_MAP;

  // If it's a temporary symbol, map it back to see if it starts with a vowel.
  // "֏" -> "u" => vowel, "֎" -> "ev" => starts with 'e', also a vowel
  if (ch in backward) {
    return true;
  }

  return ARM_VOWELS.has(ch);
}

/**
 * Maps a single Armenian character (or temporary symbol) to its Latin equivalent.
 */
function mapArmenianCharToLatin(ch: string): string {
  const { backward } = TEMP_SYMBOLS_MAP;

  // If it's one of the temporary symbols (֏ or ֎), map it back to multi-letter sequence.
  if (backward[ch]) {
    return backward[ch];
  }

  // Otherwise, fall back to standard Armenian->Latin mapping if it exists.
  return ARM_TO_LAT_MAP[ch] ?? ch;
}

/**
 * Determine the casing pattern of a word that may contain Armenian characters.
 *
 * Rules:
 * - If there's at least one uppercase Armenian char and no lowercase Armenian chars => UPPER
 * - If there's at least one lowercase Armenian char and no uppercase Armenian chars => LOWER
 * - If there's a mix => MIXED
 * - If no Armenian letters are found => default to LOWER
 */
function determineCasingPattern(
  word: string,
  isCharInScript: (ch: string) => boolean,
  isCharUpper: (ch: string) => boolean
): WordCasing {
  let hasUpper = false;
  let hasLower = false;

  for (const ch of word) {
    if (isCharInScript(ch)) {
      if (isCharUpper(ch)) {
        hasUpper = true;
      } else {
        hasLower = true;
      }

      // Early return if we already have both uppercase and lowercase
      if (hasUpper && hasLower) {
        return WordCasing.MIXED;
      }
    }
  }

  // Return the appropriate casing pattern based on flags.
  if (hasUpper && !hasLower) return WordCasing.UPPER;
  if (hasLower && !hasUpper) return WordCasing.LOWER;

  // If no Armenian letters are found, default to LOWER.
  return WordCasing.LOWER;
}

/**
 * Apply a pre-determined casing pattern (UPPER, LOWER, MIXED) to a given string.
 */
function applyCasingPattern(text: string, pattern: WordCasing): string {
  switch (pattern) {
    case WordCasing.UPPER:
      return text.toUpperCase();

    case WordCasing.LOWER:
      return text.toLowerCase();

    case WordCasing.MIXED: {
      // "Mixed" is defined as capitalizing the first letter,
      // and making the rest lowercase.
      const [firstChar, ...rest] = text;
      return firstChar
        ? firstChar.toUpperCase() + rest.join("").toLowerCase()
        : text;
    }
  }
}

////////////////////////////////////////////////////////////////////////////////
// First-Character Rules for Armenian Words
////////////////////////////////////////////////////////////////////////////////

/**
 * List of rules that apply specifically to the first character (and possibly the second)
 * in an Armenian word for special transliteration cases.
 */
const FIRST_CHAR_RULES: FirstCharRule[] = [
  {
    name: "YeRule",
    // Trigger only if the first character is uppercase Ե
    match: (firstChar) => firstChar === "Ե",
    transliteration: (_, secondChar) => {
      const secondCharLat = secondChar
        ? mapArmenianCharToLatin(secondChar)
        : "";
      return `Ye${secondCharLat}`;
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

      const secondCharLat = secondChar
        ? mapArmenianCharToLatin(secondChar)
        : "";
      const firstCharLat = isNextCharVowelOrV ? "o" : "vo";
      return `${firstCharLat}${secondCharLat}`;
    },
  },
  {
    name: "YevRule",
    // Trigger if the word starts with "֎" (which corresponds to "և" and variations)
    match: (first) => first === "֎",
    transliteration: (_, secondChar) => {
      const secondCharLat = secondChar
        ? mapArmenianCharToLatin(secondChar)
        : "";
      // "֎" -> "ev", but if it's the first character in a word, it's "yev"
      return `yev${secondCharLat}`;
    },
  },
];

/**
 * Apply the first-character rules to the first (and possibly second) character of the word.
 * If no rule matches, map the first character normally.
 */
function applyFirstCharRules(firstChar: string, secondChar?: string): string {
  for (const { match, transliteration } of FIRST_CHAR_RULES) {
    if (match(firstChar, secondChar)) {
      return transliteration(firstChar, secondChar);
    }
  }

  // Default: map the first character and (optionally) the second character
  const latinFirstChar = mapArmenianCharToLatin(firstChar);
  const latinSecondChar = secondChar ? mapArmenianCharToLatin(secondChar) : "";
  return `${latinFirstChar}${latinSecondChar}`;
}

////////////////////////////////////////////////////////////////////////////////
// Transliteration Pipeline for a Single Armenian Word
////////////////////////////////////////////////////////////////////////////////

/**
 * Step 1: Convert all multi-character sequences like "ու", "և", etc. to temporary symbols.
 * Also expand special Armenian ligatures (ﬓ, ﬔ, ﬕ, ﬖ, ﬗ) to their underlying letters.
 */
function normalizeArmenianWord(word: string): string {
  let result = word;

  // 1) Expand special Armenian ligatures to their original two-letter sequences.
  ARMENIAN_LIGATURES.forEach(({ ligature, expansion }) => {
    // Use 'g' flag to replace all occurrences
    result = result.replace(new RegExp(ligature, "g"), expansion);
  });

  // 2) Replace multi-character sequences (such as "ու", "և") with temporary symbols.
  const { forward } = TEMP_SYMBOLS_MAP;
  for (const [armSeq, tempSym] of Object.entries(forward)) {
    result = result.replace(new RegExp(armSeq, "g"), tempSym);
  }

  return result;
}

/**
 * Step 2: Apply special "first character" rules, then map the rest normally.
 */
function transliterateArmenianWordRaw(word: string): string {
  const chars = Array.from(word);
  if (chars.length === 0) return "";

  // Destructure first two characters for special handling, and the rest individually.
  const [firstChar, secondChar, ...restChars] = chars;

  if (!firstChar) {
    throw new Error("First character is undefined");
  }

  // Apply first-char rules to the first (and possibly second) character.
  let result = applyFirstCharRules(firstChar, secondChar);

  // Map the remaining characters to Latin.
  if (secondChar !== undefined) {
    // We already consumed the secondChar in applyFirstCharRules, so skip it here.
    for (const char of restChars) {
      result += mapArmenianCharToLatin(char);
    }
  }

  return result;
}

/**
 * Step 3: Determine the original word's casing and apply that casing pattern
 * to the transliterated Latin result.
 */
function finalizeArmenianWordCasing(
  originalWord: string,
  rawLatinWord: string
): string {
  // Determine casing pattern from the original word.
  const pattern = determineCasingPattern(
    originalWord,
    (ch) => ARMENIAN_LETTER_REGEX.test(ch),
    (ch) => isCharUppercase(ch)
  );

  // Apply that pattern to the raw transliteration.
  return applyCasingPattern(rawLatinWord, pattern);
}

/**
 * High-level function that executes the entire pipeline for a single Armenian word.
 */
function transliterateArmenianWord(word: string): string {
  // 1. Normalize: convert multi-char sequences (including ligatures) to temporary symbols.
  const normalized = normalizeArmenianWord(word);

  // 2. Transliterate the normalized word (handle first-char rules, then map the rest).
  const rawLatin = transliterateArmenianWordRaw(normalized);

  // 3. Preserve the original word's casing in the final transliteration.
  return finalizeArmenianWordCasing(word, rawLatin);
}

////////////////////////////////////////////////////////////////////////////////
// Punctuation and Full Text Processing
////////////////////////////////////////////////////////////////////////////////

/**
 * Replace all Armenian punctuation marks with their English equivalents.
 * Now includes replacements for the guillemets « and ».
 */
function replaceArmenianPunctuation(text: string): string {
  let result = text;
  for (const [armPunc, engPunc] of Object.entries(ARM_PUNCT_MAP)) {
    result = result.split(armPunc).join(engPunc);
  }
  return result;
}

/**
 * Main pipeline to transliterate an entire text that may contain a mix
 * of Armenian and non-Armenian content and punctuation.
 */
function transliterateArmenianText(text: string): string {
  // Split text into tokens (words, punctuation, spaces, etc.) while preserving delimiters.
  const parts = splitTextPreservingDelimiters(text, ARM_SPLIT_REGEX);

  // Process each token independently, recombine them at the end.
  const result = parts
    .map((part) => {
      // Replace Armenian punctuation first.
      let segment = replaceArmenianPunctuation(part);

      // If the segment contains any Armenian letters, transliterate each word separately.
      if (ARMENIAN_LETTER_REGEX.test(segment)) {
        // We split on whitespace within the segment to handle multi-word segments,
        // then transliterate each "word" individually.
        const words = segment
          .split(/\s+/)
          .map((w) => transliterateArmenianWord(w));
        // Rejoin them with a space to preserve spacing inside this part.
        return words.join(" ");
      }

      // If no Armenian letters, return as-is.
      return segment;
    })
    .join("");

  return result;
}

////////////////////////////////////////////////////////////////////////////////
// Exports
////////////////////////////////////////////////////////////////////////////////

export {
  transliterateArmenianText,
  // Exported for testing / finer control if needed
  transliterateArmenianWord,
  normalizeArmenianWord,
  transliterateArmenianWordRaw,
  finalizeArmenianWordCasing,
  applyFirstCharRules,
  mapArmenianCharToLatin,
  isArmenianVowel,
  determineCasingPattern,
  applyCasingPattern,
  isCharUppercase,
  splitTextPreservingDelimiters,
  replaceArmenianPunctuation,
  WordCasing,
  FIRST_CHAR_RULES,
  ARM_TO_LAT_MAP,
  ARM_VOWELS,
  ARM_PUNCT_MAP,
  ARMENIAN_LETTER_REGEX,
  ARM_SPLIT_REGEX,
  TEMP_SYMBOLS_MAP,
  ARMENIAN_LIGATURES,
};
