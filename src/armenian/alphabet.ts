export const ARMENIAN_LOWER: string[] = Array.from({ length: 38 }, (_, i) => String.fromCodePoint(0x0561 + i));

export const ARMENIAN_UPPER: string[] = Array.from({ length: 38 }, (_, i) => String.fromCodePoint(0x0531 + i));

const vowelLowerCodepoints = [0x0561, 0x0565, 0x0567, 0x0568, 0x056B, 0x0578, 0x0585];
const vowelUpperCodepoints = [0x0531, 0x0535, 0x0537, 0x0538, 0x053B, 0x0548, 0x0555];

export const ARMENIAN_VOWELS: Set<string> = new Set([
  ...vowelLowerCodepoints.map((cp) => String.fromCodePoint(cp)),
  ...vowelUpperCodepoints.map((cp) => String.fromCodePoint(cp)),
]);

export const ARMENIAN_LETTER_RANGE = /[\u0531-\u0556\u0561-\u0586]/;

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

export function isArmenianVowel(ch: string): boolean {
  return ARMENIAN_VOWELS.has(ch);
}

export function armenianToLower(ch: string): string {
  const cp = ch.codePointAt(0);
  if (cp === undefined) return ch;
  if (cp >= 0x0531 && cp <= 0x0556) {
    return String.fromCodePoint(cp + 0x30);
  }
  return ch;
}

export function armenianToUpper(ch: string): string {
  const cp = ch.codePointAt(0);
  if (cp === undefined) return ch;
  if (cp >= 0x0561 && cp <= 0x0586) {
    return String.fromCodePoint(cp - 0x30);
  }
  return ch;
}

export const ARMENIAN_PUNCTUATION: string[] = [
  String.fromCodePoint(0x0559), // ՙ
  String.fromCodePoint(0x055A), // ՚
  String.fromCodePoint(0x055B), // ՛
  String.fromCodePoint(0x055C), // ՜
  String.fromCodePoint(0x055D), // ՝
  String.fromCodePoint(0x055E), // ՞
  String.fromCodePoint(0x055F), // ՟
  String.fromCodePoint(0x0589), // ։
  String.fromCodePoint(0x058A), // ֊
];

export function isArmenianPunctuation(ch: string): boolean {
  return ARMENIAN_PUNCTUATION.includes(ch);
}
