import type { Token } from "./tokens.js";
import type { SequenceMapping } from "../types.js";
import { isArmenianLetter, isArmenianPunctuation } from "../armenian/alphabet.js";

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

function armenianCharToUpper(ch: string): string {
  const cp = ch.codePointAt(0);
  if (cp === undefined) return ch;
  if (cp >= 0x0561 && cp <= 0x0586) return String.fromCodePoint(cp - ARMENIAN_CASE_OFFSET);
  return ch;
}

/** Convert an Armenian string to all-lowercase */
function seqToLower(s: string): string {
  return Array.from(s).map(armenianCharToLower).join("");
}

/** Convert an Armenian string to all-uppercase */
function seqToUpper(s: string): string {
  return Array.from(s).map(armenianCharToUpper).join("");
}

/** Convert an Armenian string to title case (first char upper, rest lower) */
function seqToTitle(s: string): string {
  const chars = Array.from(s);
  return chars.map((ch, i) => (i === 0 ? armenianCharToUpper(ch) : armenianCharToLower(ch))).join("");
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
  // Build unique set of sequence patterns (lowercase canonical), sorted longest-first
  const seenPatterns = new Set<string>();
  const patterns: SequencePattern[] = [];

  for (const mapping of sequences) {
    const lower = seqToLower(mapping.armenian);
    const upper = seqToUpper(mapping.armenian);
    const chars = Array.from(mapping.armenian);
    const candidates = new Set([lower, upper]);
    if (chars.length > 1) candidates.add(seqToTitle(mapping.armenian));

    for (const variant of candidates) {
      const variantLower = seqToLower(variant);
      if (!seenPatterns.has(variantLower)) {
        seenPatterns.add(variantLower);
        patterns.push({ lowercase: variantLower, length: Array.from(variantLower).length });
      }
    }
  }

  // Sort longest-first for greedy matching
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
 * A "word" is a consecutive run of armenian_letter and armenian_sequence tokens.
 * Word boundaries are any non-Armenian token (whitespace, punctuation, other).
 *
 * Positions:
 * - "isolated": single-token word
 * - "initial": first token of a multi-token word
 * - "medial": middle token(s)
 * - "final": last token
 */
function annotateWordPositions(tokens: Token[]): Token[] {
  const isArmenian = (t: Token) => t.kind === "armenian_letter" || t.kind === "armenian_sequence";

  let runStart = -1;

  const closeRun = (runEnd: number) => {
    if (runStart === -1) return;
    const len = runEnd - runStart;
    if (len === 1) {
      const tok = tokens[runStart];
      if (tok) tok.wordPosition = "isolated";
    } else {
      for (let k = runStart; k < runEnd; k++) {
        const tok = tokens[k];
        if (!tok) continue;
        if (k === runStart) tok.wordPosition = "initial";
        else if (k === runEnd - 1) tok.wordPosition = "final";
        else tok.wordPosition = "medial";
      }
    }
    runStart = -1;
  };

  for (let j = 0; j < tokens.length; j++) {
    const tok = tokens[j];
    if (tok && isArmenian(tok)) {
      if (runStart === -1) runStart = j;
    } else {
      closeRun(j);
    }
  }
  closeRun(tokens.length);

  return tokens;
}
