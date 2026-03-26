import type { LetterPosition } from "../types.js";

/** Token kinds produced by the scanner */
export type TokenKind =
  | "armenian_letter"
  | "armenian_sequence"
  | "punctuation"
  | "whitespace"
  | "other";

/** A single token from scanning Armenian text */
export interface Token {
  /** What kind of token this is */
  kind: TokenKind;
  /** The original text of this token */
  value: string;
  /** Character offset in the source string */
  offset: number;
  /** Position within the current word (set by post-pass) */
  wordPosition?: LetterPosition;
}
