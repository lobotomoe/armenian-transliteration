import { ARMENIAN_LIGATURES } from "./ligatures.js";

/**
 * Normalize Armenian text before transliteration:
 * 1. Unicode NFC normalization
 * 2. Expand Armenian ligatures to their component letters
 */
export function normalizeArmenian(text: string): string {
  let result = text.normalize("NFC");
  for (const [ligature, expansion] of ARMENIAN_LIGATURES) {
    result = result.replaceAll(ligature, expansion);
  }
  return result;
}
