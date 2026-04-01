import type { Standard, TransliterationStandard } from "../types.js";
import { bgnPcgn } from "./latin/bgn-pcgn.js";
import { iso9985 } from "./latin/iso-9985.js";
import { hubschmannMeillet } from "./latin/hubschmann-meillet.js";
import { alaLc } from "./latin/ala-lc.js";
import { ruGeographic } from "./cyrillic/ru-geographic.js";
import { ruPersonal } from "./cyrillic/ru-personal.js";
import { ipaEastern } from "./ipa/ipa-eastern.js";
import { ipaWestern } from "./ipa/ipa-western.js";

const STANDARDS: ReadonlyMap<Standard, TransliterationStandard> = new Map([
  ["bgn-pcgn", bgnPcgn],
  ["iso-9985", iso9985],
  ["hubschmann-meillet", hubschmannMeillet],
  ["ala-lc", alaLc],
  ["ru-geographic", ruGeographic],
  ["ru-personal", ruPersonal],
  ["ipa-eastern", ipaEastern],
  ["ipa-western", ipaWestern],
]);

export function getStandard(id: Standard): TransliterationStandard {
  const standard = STANDARDS.get(id);
  if (!standard) {
    throw new Error(`Unknown transliteration standard: ${id}`);
  }
  return standard;
}

export function listStandards(): readonly Standard[] {
  return [...STANDARDS.keys()];
}
