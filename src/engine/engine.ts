import type { TransliterationStandard, CharMapping, SequenceMapping } from "../types.js";
import type { Token } from "../scanner/tokens.js";
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

      // Transliterate each token in the word
      const wordParts: string[] = [];
      for (let i = run.start; i < run.end; i++) {
        const token = tokens[i]!;
        const prev = i > 0 ? tokens[i - 1] : undefined;
        const next = i < tokens.length - 1 ? tokens[i + 1] : undefined;

        const mapped = this.mapToken(token, prev, next);
        const cased =
          casing === "upper"
            ? applyUpperCasing(mapped)
            : applySingleTokenCasing(token, mapped);

        output[i] = cased;
        wordParts.push(cased);
        processedInWord.add(i);
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

  /** Find consecutive runs of Armenian tokens (words) */
  private findWordRuns(
    tokens: readonly Token[],
  ): Array<{ start: number; end: number }> {
    const runs: Array<{ start: number; end: number }> = [];
    let runStart = -1;

    for (let i = 0; i <= tokens.length; i++) {
      const token = i < tokens.length ? tokens[i] : undefined;
      const isArmenian =
        token?.kind === "armenian_letter" ||
        token?.kind === "armenian_sequence";

      if (isArmenian && runStart === -1) {
        runStart = i;
      } else if (!isArmenian && runStart !== -1) {
        runs.push({ start: runStart, end: i });
        runStart = -1;
      }
    }

    return runs;
  }
}
