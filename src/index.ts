import type { Standard, TransliterateOptions } from "./types.js";
import { TransliterationEngine } from "./engine/engine.js";
import { getStandard } from "./standards/registry.js";

export type {
  Standard,
  LatinStandard,
  CyrillicStandard,
  IpaStandard,
  Direction,
  TransliterateOptions,
  TransliterationStandard,
  CharMapping,
  SequenceMapping,
  ContextCondition,
  ContextRule,
  LetterPosition,
  TargetScript,
} from "./types.js";

export { listStandards } from "./standards/registry.js";
export {
  getProfile,
  getProfilesByTargetLanguage,
  listProfiles,
  profiles,
} from "./profiles/index.js";
export type {
  ProfileDomain,
  ProfileMetadata,
  ProfileSource,
  ProfileSourceKind,
  ProfileStatus,
} from "./profiles/index.js";

const engineCache = new Map<Standard, TransliterationEngine>();

function assertString(text: string): void {
  if (typeof text !== "string") {
    throw new TypeError("Expected text to be a string");
  }
}

function getEngine(standard: Standard): TransliterationEngine {
  let engine = engineCache.get(standard);
  if (!engine) {
    engine = new TransliterationEngine(getStandard(standard));
    engineCache.set(standard, engine);
  }
  return engine;
}

/**
 * Transliterate Armenian text to the chosen target script.
 *
 * @param text - The Armenian text to transliterate
 * @param options - Standard and direction options
 * @returns Transliterated text
 */
export function transliterate(
  text: string,
  options?: TransliterateOptions,
): string {
  assertString(text);
  return getEngine(options?.standard ?? "bgn-pcgn").transliterate(text);
}

/**
 * Create a reusable transliterator function with fixed options.
 * More efficient for repeated transliterations with the same settings.
 *
 * @param options - Standard and direction options
 * @returns A function that transliterates text
 */
export function createTransliterator(
  options: TransliterateOptions = {},
): (text: string) => string {
  const engine = getEngine(options.standard ?? "bgn-pcgn");
  return (text: string) => {
    assertString(text);
    return engine.transliterate(text);
  };
}
