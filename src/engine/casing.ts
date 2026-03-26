import {
  isArmenianLetter,
  isArmenianUppercase,
  armenianToLower,
} from "../armenian/alphabet.js";
import type { Token } from "../scanner/tokens.js";

/** Casing pattern of an Armenian word */
export type CasingPattern = "upper" | "lower" | "title";

/** U+0587 ARMENIAN SMALL LIGATURE EW — always lowercase, no uppercase form */
const ARMENIAN_EW = "\u0587";

/**
 * Check if a character is an Armenian letter (including U+0587 և).
 */
function isArmenianLetterOrEw(ch: string): boolean {
  return ch === ARMENIAN_EW || isArmenianLetter(ch);
}

/**
 * Detect the casing pattern of an Armenian token.
 * Looks only at Armenian letters (ignores non-Armenian chars).
 * U+0587 (և) is always lowercase — it has no uppercase form.
 */
function isTokenUppercase(token: Token): boolean {
  const chars = Array.from(token.value);
  const armenianChars = chars.filter(isArmenianLetterOrEw);
  if (armenianChars.length === 0) return false;
  return armenianChars.every(
    (ch) => ch !== ARMENIAN_EW && isArmenianUppercase(ch),
  );
}

/**
 * Determine the casing pattern of a word from its constituent tokens.
 * A "word" is a consecutive run of Armenian tokens.
 */
export function detectWordCasing(wordTokens: readonly Token[]): CasingPattern {
  if (wordTokens.length === 0) return "lower";

  const allUpper = wordTokens.every(isTokenUppercase);
  if (allUpper) return "upper";

  // Check if first token starts with uppercase
  const firstToken = wordTokens[0];
  if (firstToken && isTokenUppercase(firstToken)) return "title";

  return "lower";
}

/**
 * Apply casing to a transliterated string based on the source Armenian token.
 *
 * For a single token's output:
 * - If the source was uppercase: capitalize the first character of the output
 * - If the source was lowercase: output as-is (lowercase)
 *
 * Word-level ALL-CAPS handling is done separately by the engine.
 */
export function applySingleTokenCasing(
  sourceToken: Token,
  transliterated: string,
): string {
  if (transliterated.length === 0) return transliterated;

  // Check if any Armenian char in the source is uppercase
  const hasUppercase = Array.from(sourceToken.value).some(
    (ch) => isArmenianLetter(ch) && isArmenianUppercase(ch),
  );

  if (hasUppercase) {
    // Capitalize first character of output
    return transliterated.charAt(0).toUpperCase() + transliterated.slice(1);
  }

  return transliterated;
}

/**
 * Apply ALL-CAPS casing to an entire word's transliterated output.
 */
export function applyUpperCasing(text: string): string {
  return text.toUpperCase();
}

/**
 * Get the lowercase canonical form of an Armenian token value.
 * Converts each Armenian character to lowercase.
 */
export function toLowerCanonical(value: string): string {
  return Array.from(value).map(armenianToLower).join("");
}
