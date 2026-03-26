/**
 * Armenian ligatures and their expansions.
 * These are in the Unicode Alphabetic Presentation Forms block (U+FB13-U+FB17).
 */
export const ARMENIAN_LIGATURES: ReadonlyMap<string, string> = new Map([
  ["\uFB13", "\u0574\u0576"],  // ﬓ → մն
  ["\uFB14", "\u0574\u0565"],  // ﬔ → մե
  ["\uFB15", "\u0574\u056B"],  // ﬕ → մի
  ["\uFB16", "\u057E\u0576"],  // ﬖ → վն
  ["\uFB17", "\u0574\u056D"],  // ﬗ → մխ
]);
