import type { TransliterationStandard, CharMapping, SequenceMapping } from "../types.js";
import type { Token } from "../scanner/tokens.js";
import { isArmenianInWordDiacritic } from "../armenian/alphabet.js";
import { normalizeArmenian } from "../armenian/normalize.js";
import { scan } from "../scanner/scanner.js";
import { resolveMapping } from "./context.js";
import {
  detectWordCasing,
  applySingleTokenCasing,
  applyUpperCasing,
  toLowerCanonical,
} from "./casing.js";
import { DEFAULT_PUNCTUATION } from "./punctuation.js";

/**
 * Armenian in-word diacritic punctuation is transparent to word runs and
 * context-rule prev/next lookups. The token is still emitted (and mapped
 * through punctuation) but it is invisible to phonological context.
 */
function isInWordDiacriticToken(token: Token | undefined): boolean {
  if (!token) return false;
  return (
    token.kind === "punctuation" && isArmenianInWordDiacritic(token.value)
  );
}

/**
 * Core transliteration engine.
 * Processes text through: normalize -> scan -> map -> casing.
 */
export class TransliterationEngine {
  private readonly charMap: Map<string, CharMapping>;
  private readonly seqMap: Map<string, SequenceMapping>;
  private readonly punctMap: Map<string, string>;

  constructor(private readonly standard: TransliterationStandard) {
    // Build lookup maps keyed by lowercase canonical Armenian
    this.charMap = new Map(
      standard.charMappings.map((m) => [m.armenian, m]),
    );
    this.seqMap = new Map(
      standard.sequenceMappings.map((m) => [m.armenian, m]),
    );

    // Merge default punctuation with standard-specific overrides
    this.punctMap = new Map(Object.entries(DEFAULT_PUNCTUATION));
    if (standard.punctuation) {
      for (const [key, value] of Object.entries(standard.punctuation)) {
        this.punctMap.set(key, value);
      }
    }
  }

  /** Transliterate Armenian text to the target script */
  transliterate(text: string): string {
    // 1. Normalize: expand ligatures, NFC
    const normalized = normalizeArmenian(text);

    // 2. Scan into tokens
    const tokens = scan(normalized, this.standard.sequenceMappings);

    // 3. Find word boundaries (consecutive Armenian token runs)
    const wordRuns = this.findWordRuns(tokens);

    // 4. For each word, detect casing and transliterate
    const output: string[] = new Array(tokens.length);
    const processedInWord = new Set<number>();

    for (const run of wordRuns) {
      const wordTokens = tokens.slice(run.start, run.end);
      const casing = detectWordCasing(wordTokens);

      for (let i = run.start; i < run.end; i++) {
        const token = tokens[i]!;
        if (isInWordDiacriticToken(token)) {
          // Diacritic — emit via punctuation map, skip phonological mapping.
          output[i] = this.punctMap.get(token.value) ?? token.value;
          processedInWord.add(i);
          continue;
        }
        const prev = findNeighbor(tokens, i, -1);
        const next = findNeighbor(tokens, i, +1);

        const mapped = this.mapToken(token, prev, next);
        output[i] =
          casing === "upper"
            ? applyUpperCasing(mapped)
            : applySingleTokenCasing(token, mapped);
        processedInWord.add(i);
      }

      if (casing === "title") {
        this.applyTitleCasingToFirstOutput(output, run);
      }
    }

    // 5. Process non-word tokens (punctuation, whitespace, other)
    for (let i = 0; i < tokens.length; i++) {
      if (processedInWord.has(i)) continue;
      const token = tokens[i]!;

      switch (token.kind) {
        case "punctuation":
          output[i] = this.punctMap.get(token.value) ?? token.value;
          break;
        default:
          output[i] = token.value;
          break;
      }
    }

    return output.join("");
  }

  /** Map a single Armenian token to its transliterated form (lowercase) */
  private mapToken(
    token: Token,
    prev: Token | undefined,
    next: Token | undefined,
  ): string {
    const canonical = toLowerCanonical(token.value);

    if (token.kind === "armenian_sequence") {
      const mapping = this.seqMap.get(canonical);
      if (mapping) return resolveMapping(mapping, token, prev, next);
    }

    if (token.kind === "armenian_letter") {
      // Handle U+0587 (և) as a special case - it might be in seqMap
      const seqMapping = this.seqMap.get(canonical);
      if (seqMapping) return resolveMapping(seqMapping, token, prev, next);

      const charMapping = this.charMap.get(canonical);
      if (charMapping) return resolveMapping(charMapping, token, prev, next);
    }

    return token.value;
  }

  /** Preserve title case when the first source token maps to an empty string. */
  private applyTitleCasingToFirstOutput(
    output: string[],
    run: { start: number; end: number },
  ): void {
    for (let i = run.start; i < run.end; i++) {
      const value = output[i];
      if (value && value.length > 0) {
        output[i] = value.charAt(0).toUpperCase() + value.slice(1);
        return;
      }
    }
  }

  /**
   * Find consecutive runs of Armenian tokens (words). Armenian in-word
   * diacritics (՛ ՚ ՙ ՟) extend a run but cannot start one — they only
   * count as word-internal if surrounded by Armenian letters.
   */
  private findWordRuns(
    tokens: readonly Token[],
  ): Array<{ start: number; end: number }> {
    const runs: Array<{ start: number; end: number }> = [];
    let runStart = -1;
    let lastLetterIndex = -1;

    for (let i = 0; i <= tokens.length; i++) {
      const token = i < tokens.length ? tokens[i] : undefined;
      const isLetter =
        token?.kind === "armenian_letter" ||
        token?.kind === "armenian_sequence";
      const isDiacritic = isInWordDiacriticToken(token);

      if (isLetter) {
        if (runStart === -1) runStart = i;
        lastLetterIndex = i;
      } else if (isDiacritic && runStart !== -1) {
        // Extend the open run, but only commit to end:lastLetterIndex+1
        // if no further letter appears.
        continue;
      } else if (runStart !== -1) {
        runs.push({ start: runStart, end: lastLetterIndex + 1 });
        runStart = -1;
        lastLetterIndex = -1;
      }
    }

    return runs;
  }
}

/**
 * Find the nearest non-diacritic token from `tokens[i]` in `direction`
 * (-1 = before, +1 = after). Used for context-rule prev/next so in-word
 * diacritics are skipped during context evaluation.
 */
function findNeighbor(
  tokens: readonly Token[],
  i: number,
  direction: -1 | 1,
): Token | undefined {
  let j = i + direction;
  while (j >= 0 && j < tokens.length) {
    const candidate = tokens[j];
    if (candidate && !isInWordDiacriticToken(candidate)) return candidate;
    j += direction;
  }
  return undefined;
}
