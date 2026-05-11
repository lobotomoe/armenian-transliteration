export function isArmenianLetter(ch: string): boolean {
  const cp = ch.codePointAt(0);
  if (cp === undefined) return false;
  return (cp >= 0x0531 && cp <= 0x0556) || (cp >= 0x0561 && cp <= 0x0586);
}

export function isArmenianUppercase(ch: string): boolean {
  const cp = ch.codePointAt(0);
  if (cp === undefined) return false;
  return cp >= 0x0531 && cp <= 0x0556;
}

export function armenianToLower(ch: string): string {
  const cp = ch.codePointAt(0);
  if (cp === undefined) return ch;
  if (cp >= 0x0531 && cp <= 0x0556) {
    return String.fromCodePoint(cp + 0x30);
  }
  return ch;
}

const ARMENIAN_PUNCTUATION: ReadonlySet<string> = new Set([
  "ՙ", // U+0559 MODIFIER LETTER LEFT HALF RING
  "՚", // U+055A ARMENIAN APOSTROPHE
  "՛", // U+055B ARMENIAN EMPHASIS MARK
  "՜", // U+055C ARMENIAN EXCLAMATION MARK
  "՝", // U+055D ARMENIAN COMMA
  "՞", // U+055E ARMENIAN QUESTION MARK
  "՟", // U+055F ARMENIAN ABBREVIATION MARK
  "։", // U+0589 ARMENIAN FULL STOP
  "֊", // U+058A ARMENIAN HYPHEN
]);

export function isArmenianPunctuation(ch: string): boolean {
  return ARMENIAN_PUNCTUATION.has(ch);
}

/**
 * Diacritic-like punctuation that appears word-internally and should be
 * transparent to word-boundary tracking. Includes the Armenian emphasis
 * mark (stress diacritic, U+055B), apostrophe (U+055A), modifier letter
 * left half ring (U+0559), and abbreviation mark (U+055F).
 *
 * Excludes terminal punctuation (full stop ։, question ՞, comma ՝,
 * exclamation ՜, hyphen ֊) which DO break words.
 *
 * Scanner emits these as kind:"punctuation" so they still map through
 * the standard's punctuation table for output, but they do not break
 * an Armenian-letter run for context-rule purposes (e.g. "մի՛թե" must
 * not let ՛ make թ word-initial).
 */
const ARMENIAN_INWORD_DIACRITICS: ReadonlySet<string> = new Set([
  "ՙ", // U+0559
  "՚", // U+055A
  "՛", // U+055B
  "՟", // U+055F
]);

export function isArmenianInWordDiacritic(ch: string): boolean {
  return ARMENIAN_INWORD_DIACRITICS.has(ch);
}
