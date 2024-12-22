import { ARM_TO_LAT_MAP, TEMP_SYMBOLS_MAP } from "./constants";

/**
 * Maps a single Armenian character (or temporary symbol) to its Latin equivalent.
 */
export function mapArmenianCharToLatin(ch: string): string {
  const { backward } = TEMP_SYMBOLS_MAP;

  return backward[ch] ?? ARM_TO_LAT_MAP[ch] ?? ch;
}
