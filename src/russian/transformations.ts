import { ARM_TO_RUS_MAP, TEMP_SYMBOLS_MAP } from "./constants";

/**
 * Maps a single Armenian character (or temporary symbol) to its Russian equivalent.
 */
export function mapArmenianCharToRussian(ch: string): string {
  const { backward } = TEMP_SYMBOLS_MAP;
  return backward[ch] ?? ARM_TO_RUS_MAP[ch] ?? ch;
}
