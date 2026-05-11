import { DEFAULT_PUNCTUATION } from "../../src/engine/punctuation";

/**
 * Default Armenian punctuation mappings — dedicated unit test.
 *
 * Standards may override individual entries via their `punctuation` field,
 * but the defaults here are what the engine falls back to when a standard
 * does not specify an override.
 *
 * Armenian punctuation block: U+0559–U+055F and U+0589–U+058A.
 * Angle bracket quotes: U+00AB and U+00BB (used in Armenian texts).
 */
describe("DEFAULT_PUNCTUATION", () => {
  test.each([
    // Armenian-block punctuation
    ["ՙ", "'", "U+0559 ARMENIAN MODIFIER LETTER LEFT HALF RING ՙ"],
    ["՚", "'", "U+055A ARMENIAN APOSTROPHE ՚"],
    ["՛", "'", "U+055B ARMENIAN EMPHASIS MARK ՛"],
    ["՜", "!", "U+055C ARMENIAN EXCLAMATION MARK ՜"],
    ["՝", ",", "U+055D ARMENIAN COMMA ՝"],
    ["՞", "?", "U+055E ARMENIAN QUESTION MARK ՞"],
    ["՟", ".", "U+055F ARMENIAN ABBREVIATION MARK ՟"],
    ["։", ".", "U+0589 ARMENIAN FULL STOP ։"],
    ["֊", "-", "U+058A ARMENIAN HYPHEN ֊"],
    // Guillemets used in Armenian texts as quotation marks
    ["«", '"', "U+00AB LEFT-POINTING DOUBLE ANGLE QUOTATION MARK «"],
    ["»", '"', "U+00BB RIGHT-POINTING DOUBLE ANGLE QUOTATION MARK »"],
  ])("%s → %s (%s)", (armenian, expected) => {
    expect(DEFAULT_PUNCTUATION[armenian]).toBe(expected);
  });

  test("covers every Armenian-block punctuation code point (U+0559–U+055F, U+0589, U+058A)", () => {
    const required = [
      "ՙ",
      "՚",
      "՛",
      "՜",
      "՝",
      "՞",
      "՟",
      "։",
      "֊",
    ];
    for (const ch of required) {
      expect(DEFAULT_PUNCTUATION[ch]).toBeDefined();
    }
  });

  test("covers both guillemets", () => {
    expect(DEFAULT_PUNCTUATION["«"]).toBeDefined();
    expect(DEFAULT_PUNCTUATION["»"]).toBeDefined();
  });
});
