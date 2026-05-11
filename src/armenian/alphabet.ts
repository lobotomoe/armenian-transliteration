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
  "ՙ", // ՙ
  "՚", // ՚
  "՛", // ՛
  "՜", // ՜
  "՝", // ՝
  "՞", // ՞
  "՟", // ՟
  "։", // ։
  "֊", // ֊
]);

export function isArmenianPunctuation(ch: string): boolean {
  return ARMENIAN_PUNCTUATION.has(ch);
}
