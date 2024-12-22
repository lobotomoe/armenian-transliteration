import { ARM_TO_RUS_MAP, TEMP_SYMBOLS_MAP } from "./constants";

/**
 * Maps a single Armenian character (or temporary symbol) to its Russian equivalent.
 */
export function mapArmenianCharToRussian(ch: string): string {
  const { backward } = TEMP_SYMBOLS_MAP;

  // If it's one of the temporary symbols (֏ or ֎), map it back to multi-letter sequence.
  if (backward[ch]) {
    return backward[ch];
  }

  // Otherwise, fall back to standard Armenian->Russian mapping if it exists.
  return ARM_TO_RUS_MAP[ch] ?? ch;
}
