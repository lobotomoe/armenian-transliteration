import type { Direction, Standard, TransliterateOptions } from "./types.js";
import { TransliterationEngine } from "./engine/engine.js";
import { ReverseTransliterationEngine } from "./engine/reverse.js";
import { getStandard } from "./standards/registry.js";

export type {
  Standard,
  LatinStandard,
  CyrillicStandard,
  IpaStandard,
  Direction,
  ReversibleStandard,
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

interface Engine {
  transliterate(text: string): string;
}

const engineCache = new Map<string, Engine>();

function assertString(text: string): void {
  if (typeof text !== "string") {
    throw new TypeError("Expected text to be a string");
  }
}

function createEngine(standard: Standard, direction: Direction): Engine {
  const definition = getStandard(standard);
  switch (direction) {
    case "from-armenian":
      return new TransliterationEngine(definition);
    case "to-armenian":
      return new ReverseTransliterationEngine(definition);
    default:
      throw new Error(`Unknown transliteration direction: ${String(direction)}`);
  }
}

function getEngine(options: TransliterateOptions | undefined): Engine {
  const standard = options?.standard ?? "bgn-pcgn";
  const direction = options?.direction ?? "from-armenian";
  const key = `${standard} ${direction}`;
  let engine = engineCache.get(key);
  if (!engine) {
    engine = createEngine(standard, direction);
    engineCache.set(key, engine);
  }
  return engine;
}

/**
 * Transliterate Armenian text to the chosen target script, or, with
 * `direction: "to-armenian"` and a reversible standard, back to Armenian.
 *
 * @param text - The text to transliterate
 * @param options - Standard and direction options
 * @returns Transliterated text
 */
export function transliterate(
  text: string,
  options?: TransliterateOptions,
): string {
  assertString(text);
  return getEngine(options).transliterate(text);
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
  const engine = getEngine(options);
  return (text: string) => {
    assertString(text);
    return engine.transliterate(text);
  };
}
