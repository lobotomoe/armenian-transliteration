import type { Standard, Direction, TransliterateOptions } from "./types.js";
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

// Engine cache: avoid re-creating engines for the same standard
const engineCache = new Map<string, TransliterationEngine>();

function getEngine(standard: Standard): TransliterationEngine {
  let engine = engineCache.get(standard);
  if (!engine) {
    const std = getStandard(standard);
    engine = new TransliterationEngine(std);
    engineCache.set(standard, engine);
  }
  return engine;
}

/**
 * Transliterate text between Armenian and Latin/Cyrillic scripts.
 *
 * @param text - The text to transliterate
 * @param options - Standard and direction options
 * @returns Transliterated text
 */
export function transliterate(
  text: string,
  options?: TransliterateOptions,
): string {
  const standard: Standard = options?.standard ?? "bgn-pcgn";
  const direction: Direction = options?.direction ?? "from-armenian";

  if (direction === "to-armenian") {
    throw new Error(
      "Reverse transliteration (to-armenian) is not yet implemented",
    );
  }

  const engine = getEngine(standard);
  return engine.transliterate(text);
}

/**
 * Create a reusable transliterator function with fixed options.
 * More efficient for repeated transliterations with the same settings.
 *
 * @param options - Standard and direction options
 * @returns A function that transliterates text
 */
export function createTransliterator(
  options: TransliterateOptions,
): (text: string) => string {
  const standard: Standard = options.standard ?? "bgn-pcgn";
  const direction: Direction = options.direction ?? "from-armenian";

  if (direction === "to-armenian") {
    throw new Error(
      "Reverse transliteration (to-armenian) is not yet implemented",
    );
  }

  const engine = getEngine(standard);
  return (text: string) => engine.transliterate(text);
}
