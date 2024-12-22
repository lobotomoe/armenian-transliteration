import { ARM_TO_LAT_MAP, TEMP_SYMBOLS_MAP } from "./constants";

/**
 * Maps a single Armenian character (or temporary symbol) to its Latin equivalent.
 */
export function mapArmenianCharToLatin(ch: string): string {
  const { backward } = TEMP_SYMBOLS_MAP;

  // If it's one of the temporary symbols (֏ or ֎), map it back to multi-letter sequence.
  if (backward[ch]) {
    return backward[ch];
  }

  // Otherwise, fall back to standard Armenian->Latin mapping if it exists.
  return ARM_TO_LAT_MAP[ch] ?? ch;
}
