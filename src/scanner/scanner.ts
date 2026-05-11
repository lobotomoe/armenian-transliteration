import type { Token } from "./tokens.js";
import type { SequenceMapping } from "../types.js";
import {
  isArmenianInWordDiacritic,
  isArmenianLetter,
  isArmenianPunctuation,
} from "../armenian/alphabet.js";

/** U+0587 ARMENIAN SMALL LIGATURE EW — treated as an Armenian letter */
const ARMENIAN_EW = "\u0587";

/** Offset between Armenian uppercase (U+0531) and lowercase (U+0561) */
const ARMENIAN_CASE_OFFSET = 0x30;

function armenianCharToLower(ch: string): string {
  const cp = ch.codePointAt(0);
  if (cp === undefined) return ch;
  if (cp >= 0x0531 && cp <= 0x0556) return String.fromCodePoint(cp + ARMENIAN_CASE_OFFSET);
  return ch;
}

/** Convert an Armenian string to all-lowercase */
function seqToLower(s: string): string {
  return Array.from(s).map(armenianCharToLower).join("");
}

function isArmenianLetterOrEw(ch: string): boolean {
  return ch === ARMENIAN_EW || isArmenianLetter(ch);
}

/** Check if a character is « (U+00AB) or » (U+00BB) */
function isAngleBracketQuote(ch: string): boolean {
  return ch === "\u00AB" || ch === "\u00BB";
}

interface SequencePattern {
  /** Lowercase canonical form used for matching */
  lowercase: string;
  length: number;
}

/**
 * Scans Armenian text into tokens.
 *
 * The scanner is parameterized by the multi-character sequences defined
 * in a transliteration standard (e.g., "ու" for BGN/PCGN, "յու"/"յա" for Russian).
 *
 * Algorithm:
 * 1. Greedy longest-match for multi-char sequences
 * 2. Single Armenian letters
 * 3. Armenian punctuation
 * 4. Whitespace
 * 5. Everything else accumulated as "other"
 */
export function scan(text: string, sequences: readonly SequenceMapping[]): Token[] {
  // Build unique set of sequence patterns (lowercase canonical), sorted longest-first.
  // Matching is case-insensitive: input slice is lowercased before comparison.
  const seenPatterns = new Set<string>();
  const patterns: SequencePattern[] = [];

  for (const mapping of sequences) {
    const lower = seqToLower(mapping.armenian);
    if (!seenPatterns.has(lower)) {
      seenPatterns.add(lower);
      patterns.push({ lowercase: lower, length: Array.from(lower).length });
    }
  }

  patterns.sort((a, b) => b.length - a.length);

  const chars = Array.from(text);
  const tokens: Token[] = [];

  // Track byte offset alongside char index for the token offset field
  // We report char-index offsets (consistent with Array.from iteration)
  let i = 0;
  let otherStart = -1;
  let otherValue = "";

  const flushOther = () => {
    if (otherValue.length > 0) {
      tokens.push({ kind: "other", value: otherValue, offset: otherStart });
      otherValue = "";
      otherStart = -1;
    }
  };

  while (i < chars.length) {
    const ch = chars[i];
    if (ch === undefined) break;

    // 1. Try greedy longest-match for multi-char sequences
    let matched = false;
    for (const pattern of patterns) {
      if (i + pattern.length > chars.length) continue;
      const slice = chars.slice(i, i + pattern.length).join("");
      const sliceLower = seqToLower(slice);
      if (sliceLower === pattern.lowercase) {
        flushOther();
        tokens.push({ kind: "armenian_sequence", value: slice, offset: i });
        i += pattern.length;
        matched = true;
        break;
      }
    }
    if (matched) continue;

    // 2. Single Armenian letter (including U+0587)
    if (isArmenianLetterOrEw(ch)) {
      flushOther();
      tokens.push({ kind: "armenian_letter", value: ch, offset: i });
      i++;
      continue;
    }

    // 3. Armenian punctuation and angle-bracket quotes
    if (isArmenianPunctuation(ch) || isAngleBracketQuote(ch)) {
      flushOther();
      tokens.push({ kind: "punctuation", value: ch, offset: i });
      i++;
      continue;
    }

    // 4. Whitespace
    if (/\s/.test(ch)) {
      flushOther();
      tokens.push({ kind: "whitespace", value: ch, offset: i });
      i++;
      continue;
    }

    // 5. Accumulate "other"
    if (otherValue.length === 0) otherStart = i;
    otherValue += ch;
    i++;
  }

  flushOther();

  return annotateWordPositions(tokens);
}

/**
 * Annotate each Armenian token with its position within its word.
 *
 * A "word" is a consecutive run of armenian_letter and armenian_sequence
 * tokens. Armenian in-word diacritic punctuation (emphasis ՛, apostrophe ՚,
 * left half-ring ՙ, abbreviation ՟) is transparent: it does not break a
 * word run, but does not receive a wordPosition of its own — the
 * surrounding letters are positioned as if the diacritic were absent.
 *
 * All other punctuation, whitespace, and "other" tokens close the run.
 *
 * Positions:
 * - "isolated": single-letter-token word
 * - "initial": first letter token of a multi-token word
 * - "medial": middle letter token(s)
 * - "final": last letter token
 */
function annotateWordPositions(tokens: Token[]): Token[] {
  const isArmenian = (t: Token) =>
    t.kind === "armenian_letter" || t.kind === "armenian_sequence";
  const isInWordDiacritic = (t: Token) =>
    t.kind === "punctuation" && isArmenianInWordDiacritic(t.value);

  // Indices of Armenian-letter/sequence tokens belonging to the current run.
  let runLetterIndices: number[] = [];

  const closeRun = () => {
    if (runLetterIndices.length === 0) return;
    if (runLetterIndices.length === 1) {
      const idx = runLetterIndices[0];
      if (idx !== undefined) {
        const tok = tokens[idx];
        if (tok) tok.wordPosition = "isolated";
      }
    } else {
      const last = runLetterIndices.length - 1;
      for (let k = 0; k < runLetterIndices.length; k++) {
        const idx = runLetterIndices[k];
        if (idx === undefined) continue;
        const tok = tokens[idx];
        if (!tok) continue;
        if (k === 0) tok.wordPosition = "initial";
        else if (k === last) tok.wordPosition = "final";
        else tok.wordPosition = "medial";
      }
    }
    runLetterIndices = [];
  };

  for (let j = 0; j < tokens.length; j++) {
    const tok = tokens[j];
    if (!tok) continue;
    if (isArmenian(tok)) {
      runLetterIndices.push(j);
    } else if (isInWordDiacritic(tok)) {
      // Transparent within a run; if no run is open, it doesn't open one.
      continue;
    } else {
      closeRun();
    }
  }
  closeRun();

  return tokens;
}
