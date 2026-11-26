import type { TransliterationStandard, CharMapping, SequenceMapping } from "../types.js";

/**
 * Reverse engine: text in a reversible standard back to Armenian.
 *
 * Only standards whose every mapping is context-free and whose targets are
 * distinct can be inverted exactly; the constructor refuses anything else
 * rather than guessing. Input is read greedily, longest target first, so
 * "tʿ" is թ and not տ followed by a stray mark.
 *
 * Letters only: Latin punctuation is left as it is, since "." or "?" cannot
 * be told apart from punctuation that was Latin to begin with.
 */

/**
 * How a matched spelling was cased. "capital" is a spelling whose title and
 * upper forms coincide ("U", "Tʿ"), so only the rest of the word can say
 * whether the Armenian is ՈՒ or Ու.
 */
type MatchCasing = "lower" | "upper" | "title" | "capital";

interface ReverseEntry {
  armenian: string;
  casing: MatchCasing;
}

type ReverseToken =
  | { kind: "letter"; armenian: string; casing: MatchCasing }
  | { kind: "other"; value: string };

function titleCase(text: string): string {
  const upper = text.toUpperCase();
  return upper.charAt(0) + upper.slice(1).toLowerCase();
}

/** Every cased spelling of a lowercase target, keyed in NFC. */
function spellings(target: string): Array<[string, MatchCasing]> {
  const lower = target.normalize("NFC");
  const upper = target.toUpperCase().normalize("NFC");
  const title = titleCase(target).normalize("NFC");
  if (upper === lower) {
    return [[lower, "lower"]];
  }
  if (upper === title) {
    return [
      [lower, "lower"],
      [upper, "capital"],
    ];
  }
  return [
    [lower, "lower"],
    [upper, "upper"],
    [title, "title"],
  ];
}

/**
 * Picks one Armenian spelling per target. Two mappings with one target must
 * name a winner with `reverseDefault`, or the standard is not reversible.
 */
function reverseMappings(
  standard: TransliterationStandard,
): Map<string, string> {
  const mappings: ReadonlyArray<CharMapping | SequenceMapping> = [
    ...standard.charMappings,
    ...standard.sequenceMappings,
  ];
  const chosen = new Map<string, CharMapping | SequenceMapping>();
  for (const mapping of mappings) {
    if (mapping.contextRules && mapping.contextRules.length > 0) {
      throw new Error(
        `${standard.id}: ${mapping.armenian} has context rules, which cannot be reversed`,
      );
    }
    const target = mapping.target.normalize("NFC");
    if (target === "") {
      throw new Error(`${standard.id}: ${mapping.armenian} maps to nothing`);
    }
    const previous = chosen.get(target);
    if (previous === undefined) {
      chosen.set(target, mapping);
      continue;
    }
    if (Boolean(previous.reverseDefault) === Boolean(mapping.reverseDefault)) {
      throw new Error(
        `${standard.id}: ${previous.armenian} and ${mapping.armenian} both map to "${target}" and neither is the reverse default`,
      );
    }
    if (mapping.reverseDefault) {
      chosen.set(target, mapping);
    }
  }
  return new Map(
    [...chosen].map(([target, mapping]) => [target, mapping.armenian]),
  );
}

export class ReverseTransliterationEngine {
  private readonly entries = new Map<string, ReverseEntry>();
  private readonly longestSpelling: number;

  constructor(standard: TransliterationStandard) {
    if (!standard.reversible) {
      throw new Error(
        `${standard.id} is not reversible; only reversible standards can transliterate to Armenian`,
      );
    }
    for (const [target, armenian] of reverseMappings(standard)) {
      for (const [spelling, casing] of spellings(target)) {
        const existing = this.entries.get(spelling);
        if (existing !== undefined && existing.armenian !== armenian) {
          throw new Error(
            `${standard.id}: "${spelling}" would read as both ${existing.armenian} and ${armenian}`,
          );
        }
        this.entries.set(spelling, { armenian, casing });
      }
    }
    this.longestSpelling = Math.max(
      ...[...this.entries.keys()].map((spelling) => spelling.length),
    );
  }

  /** Transliterate text in this standard to Armenian */
  transliterate(text: string): string {
    const tokens = this.scan(text.normalize("NFC"));
    const output: string[] = [];
    let start = 0;
    while (start < tokens.length) {
      const token = tokens[start];
      if (token === undefined) {
        throw new Error(`token ${String(start)} is missing`);
      }
      if (token.kind === "other") {
        output.push(token.value);
        start += 1;
        continue;
      }
      let end = start;
      const word: Array<{ armenian: string; casing: MatchCasing }> = [];
      for (let next = tokens[end]; next?.kind === "letter"; next = tokens[end]) {
        word.push(next);
        end += 1;
      }
      output.push(writeWord(word));
      start = end;
    }
    return output.join("");
  }

  private scan(text: string): ReverseToken[] {
    const tokens: ReverseToken[] = [];
    let position = 0;
    while (position < text.length) {
      const match = this.matchAt(text, position);
      if (match !== undefined) {
        tokens.push({ kind: "letter", ...match.entry });
        position += match.length;
        continue;
      }
      const codePoint = text.codePointAt(position);
      if (codePoint === undefined) {
        throw new Error(`no character at ${String(position)}`);
      }
      const value = String.fromCodePoint(codePoint);
      tokens.push({ kind: "other", value });
      position += value.length;
    }
    return tokens;
  }

  private matchAt(
    text: string,
    position: number,
  ): { entry: ReverseEntry; length: number } | undefined {
    for (let length = this.longestSpelling; length > 0; length--) {
      const entry = this.entries.get(text.slice(position, position + length));
      if (entry !== undefined) {
        return { entry, length };
      }
    }
    return undefined;
  }
}

/**
 * A word is all caps when every letter is capital and the word shows it: two
 * letters or more, or one spelling written in caps throughout ("EW"). A lone
 * "U" stays title case, Ու.
 */
function writeWord(
  word: ReadonlyArray<{ armenian: string; casing: MatchCasing }>,
): string {
  const allCapital = word.every(
    ({ casing }) => casing === "upper" || casing === "capital",
  );
  const showsCaps =
    word.length > 1 || word.some(({ casing }) => casing === "upper");
  if (allCapital && showsCaps) {
    return word.map(({ armenian }) => armenian.toUpperCase()).join("");
  }
  return word
    .map(({ armenian, casing }) => {
      switch (casing) {
        case "lower":
          return armenian;
        case "upper":
          return armenian.toUpperCase();
        case "title":
        case "capital":
          return titleCase(armenian);
      }
    })
    .join("");
}
