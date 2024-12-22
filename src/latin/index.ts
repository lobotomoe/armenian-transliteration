/******************************************************************************
 * This module contains functions and constants to transliterate Armenian text
 * into the Latin alphabet, while preserving specific rules and casing patterns.
 *
 * Steps Overview:
 *   1) Normalize the Armenian word (expand ligatures, replace certain sequences).
 *   2) Apply special rules to the first characters.
 *   3) Reapply original casing based on the Armenian source word.
 *   4) Transform entire text by splitting and processing tokens, replacing
 *      punctuation, etc.
 ******************************************************************************/

import {
  applyCasingPattern,
  ARM_PUNCTUATION_MAP,
  ARM_SPLIT_REGEX,
  ARMENIAN_LETTER_REGEX,
  ARMENIAN_LIGATURES,
  determineCasingPattern,
  isCharUppercase,
  splitTextPreservingDelimiters,
} from "../common";

import { TEMP_SYMBOLS_MAP } from "./constants";
import { FIRST_CHAR_RULES } from "./rules";
import { mapArmenianCharToLatin } from "./transformations";

/**
 * Represents a tuple containing the first and (optional) second character.
 */
type FirstChars = [string, string | undefined];

///////////////////////////////////////////////////////////////////////////////
// 1) Normalizing Armenian Words
///////////////////////////////////////////////////////////////////////////////

/**
 * Normalizes an Armenian word by:
 * 1) Expanding special ligatures (e.g. ﬓ, ﬔ, ﬕ, ﬖ, ﬗ).
 * 2) Replacing multi-character sequences (e.g. "ու", "և") with temporary symbols.
 *
 * @param {string} word - The original Armenian word.
 * @returns {string} - The normalized word.
 */
function normalizeArmenianWord(word: string): string {
  let result = word;

  // 1. Expand special ligatures
  ARMENIAN_LIGATURES.forEach(({ ligature, expansion }) => {
    const regex = new RegExp(ligature, "g");
    result = result.replace(regex, expansion);
  });

  // 2. Replace multi-character sequences with temporary symbols
  const { forward } = TEMP_SYMBOLS_MAP;
  for (const [armSequence, tempSymbol] of Object.entries(forward)) {
    const sequenceRegex = new RegExp(armSequence, "g");
    result = result.replace(sequenceRegex, tempSymbol);
  }

  return result;
}

///////////////////////////////////////////////////////////////////////////////
// 2) Applying Special Rules to the First Characters
///////////////////////////////////////////////////////////////////////////////

/**
 * Applies predefined rules to the first (and optionally second) character.
 * If none of the rules match, the characters are transliterated normally.
 *
 * @param {[string, string | undefined]} firstChars - A tuple of the first and second characters.
 * @returns {string} - The transliterated output for the first (and optional second) character.
 */
function applyFirstCharRules([firstChar, secondChar]: FirstChars): string {
  for (const { match, transliteration } of FIRST_CHAR_RULES) {
    if (match(firstChar, secondChar)) {
      return transliteration(firstChar, secondChar);
    }
  }

  // Default: map both characters if no rule applies
  const latinFirstChar = mapArmenianCharToLatin(firstChar);
  const latinSecondChar = secondChar ? mapArmenianCharToLatin(secondChar) : "";
  return `${latinFirstChar}${latinSecondChar}`;
}

/**
 * Transliterates an Armenian word without considering its original casing.
 * This includes applying special rules for the initial characters.
 *
 * @param {string} word - The normalized Armenian word.
 * @returns {string} - The transliterated string (ignoring original casing).
 */
function transliterateArmenianWordRaw(word: string): string {
  const chars = Array.from(word);
  if (chars.length === 0) {
    return "";
  }

  const [firstChar, secondChar, ...restChars] = chars;

  // Safety check in case the first character is somehow missing
  if (!firstChar) {
    throw new Error(
      "Unexpected empty first character in transliterateArmenianWordRaw"
    );
  }

  // Apply special rules to the first (and possibly second) character
  let result = applyFirstCharRules([firstChar, secondChar]);

  // Transliterate the remaining characters
  if (secondChar !== undefined) {
    for (const char of restChars) {
      result += mapArmenianCharToLatin(char);
    }
  }

  return result;
}

///////////////////////////////////////////////////////////////////////////////
// 3) Reapplying Original Casing
///////////////////////////////////////////////////////////////////////////////

/**
 * Determines the original casing pattern of the Armenian word and
 * applies it to the raw Latin transliteration.
 *
 * @param {string} originalWord - The original Armenian word (used for casing).
 * @param {string} rawLatinWord - The transliteration ignoring casing.
 * @returns {string} - The transliterated word with the original casing pattern applied.
 */
function applyOriginalCasingPattern(
  originalWord: string,
  rawLatinWord: string
): string {
  // Determine casing pattern by examining Armenian letters only
  const pattern = determineCasingPattern(
    originalWord,
    (ch) => ARMENIAN_LETTER_REGEX.test(ch),
    (ch) => isCharUppercase(ch)
  );

  // Apply that pattern to the transliterated string
  return applyCasingPattern(rawLatinWord, pattern);
}

///////////////////////////////////////////////////////////////////////////////
// 4) Transliterate a Single Word (Combining All Steps)
///////////////////////////////////////////////////////////////////////////////

/**
 * Transliterates a single Armenian word, preserving its original casing.
 *
 * @param {string} word - The original Armenian word.
 * @returns {string} - The transliterated word with the original casing preserved.
 */
function transliterateArmenianWord(word: string): string {
  // 1. Normalize (expand ligatures, handle multi-character sequences)
  const normalizedWord = normalizeArmenianWord(word);

  // 2. Transliterate ignoring casing
  const rawLatin = transliterateArmenianWordRaw(normalizedWord);

  // 3. Reapply the original casing pattern
  return applyOriginalCasingPattern(word, rawLatin);
}

///////////////////////////////////////////////////////////////////////////////
// 5) Replacing Armenian Punctuation
///////////////////////////////////////////////////////////////////////////////

/**
 * Replaces all Armenian punctuation marks with their English counterparts.
 *
 * @param {string} text - The text containing potential Armenian punctuation marks.
 * @returns {string} - The text where Armenian punctuation is replaced with English equivalents.
 */
function replaceArmenianPunctuation(text: string): string {
  let result = text;
  for (const [armMark, latinMark] of Object.entries(ARM_PUNCTUATION_MAP)) {
    result = result.split(armMark).join(latinMark);
  }
  return result;
}

///////////////////////////////////////////////////////////////////////////////
// 6) Transliterate Complex Text (Main Entry Point)
///////////////////////////////////////////////////////////////////////////////

/**
 * Transliterates arbitrary text containing both Armenian and non-Armenian characters
 * (including punctuation) into Latin.
 *
 * Process:
 *   1) Split the text into tokens (words, punctuation, etc.), preserving delimiters.
 *   2) Replace Armenian punctuation in each token.
 *   3) For any token containing Armenian letters, split it by whitespace,
 *      transliterate each piece, and rejoin.
 *   4) Reconstruct the final string from the processed tokens.
 *
 * @param {string} text - The input string (can contain Armenian, Latin, punctuation, etc.).
 * @returns {string} - The transliterated string.
 */
export function transliterateArmenianTextToEng(text: string): string {
  // 1) Split into tokens while preserving delimiters
  const tokens = splitTextPreservingDelimiters(text, ARM_SPLIT_REGEX);

  // 2) Process each token
  const processedTokens = tokens.map((token) => {
    // First, replace Armenian punctuation with English equivalents
    const tokenWithoutPunctuation = replaceArmenianPunctuation(token);

    // If the token contains Armenian letters, split by whitespace and transliterate
    if (ARMENIAN_LETTER_REGEX.test(tokenWithoutPunctuation)) {
      const subWords = tokenWithoutPunctuation.split(/\s+/);
      const transliteratedSubWords = subWords.map(transliterateArmenianWord);
      return transliteratedSubWords.join(" ");
    }

    // If there are no Armenian letters, return the token unchanged
    return tokenWithoutPunctuation;
  });

  // 3) Join all processed tokens back into a final string
  return processedTokens.join("");
}
