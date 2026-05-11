import type { Standard, TransliterationStandard } from "../types.js";
import { bgnPcgn } from "./latin/bgn-pcgn.js";
import { iso9985 } from "./latin/iso-9985.js";
import { hubschmannMeillet } from "./latin/hubschmann-meillet.js";
import { alaLc } from "./latin/ala-lc.js";
import { ruGeoKt1974 } from "./cyrillic/ru-geo-kt-1974.js";
import { ruGeoRa2011 } from "./cyrillic/ru-geo-ra-2011.js";
import { ruProperVartapetyan1961 } from "./cyrillic/ru-proper-vartapetyan-1961.js";
import { ruPhoneticEastern } from "./cyrillic/ru-phonetic-eastern.js";
import { ipaEastern } from "./ipa/ipa-eastern.js";
import { ipaWestern } from "./ipa/ipa-western.js";

const STANDARDS = {
  "bgn-pcgn": bgnPcgn,
  "iso-9985": iso9985,
  "hubschmann-meillet": hubschmannMeillet,
  "ala-lc": alaLc,
  "ru-geo-kt-1974": ruGeoKt1974,
  "ru-geo-ra-2011": ruGeoRa2011,
  "ru-proper-vartapetyan-1961": ruProperVartapetyan1961,
  "ru-phonetic-eastern": ruPhoneticEastern,
  "ipa-eastern": ipaEastern,
  "ipa-western": ipaWestern,
} as const satisfies Record<Standard, TransliterationStandard>;

const STANDARD_IDS = Object.keys(STANDARDS) as readonly Standard[];

export function getStandard(id: Standard): TransliterationStandard {
  const standard = STANDARDS[id];
  if (!standard) {
    throw new Error(`Unknown transliteration standard: ${String(id)}`);
  }
  return standard;
}

export function listStandards(): readonly Standard[] {
  return STANDARD_IDS;
}
