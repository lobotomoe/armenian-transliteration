import { normalizeArmenian } from "../../src/armenian/normalize";

describe("normalizeArmenian", () => {
  describe("ligature expansion", () => {
    test("U+FB13 (ﬓ) expands to մն (U+0574 U+0576)", () => {
      expect(normalizeArmenian("\uFB13")).toBe("\u0574\u0576");
    });

    test("U+FB14 (ﬔ) expands to մե (U+0574 U+0565)", () => {
      expect(normalizeArmenian("\uFB14")).toBe("\u0574\u0565");
    });

    test("U+FB15 (ﬕ) expands to մի (U+0574 U+056B)", () => {
      expect(normalizeArmenian("\uFB15")).toBe("\u0574\u056B");
    });

    test("U+FB16 (ﬖ) expands to վն (U+057E U+0576)", () => {
      expect(normalizeArmenian("\uFB16")).toBe("\u057E\u0576");
    });

    test("U+FB17 (ﬗ) expands to մխ (U+0574 U+056D)", () => {
      expect(normalizeArmenian("\uFB17")).toBe("\u0574\u056D");
    });
  });

  describe("text without ligatures", () => {
    test("plain Armenian text passes through unchanged", () => {
      // Հայաստան (standard Armenian word, no ligatures)
      const input = "\u0540\u0561\u0575\u0561\u057D\u057F\u0561\u0576";
      expect(normalizeArmenian(input)).toBe(input);
    });

    test("empty string passes through unchanged", () => {
      expect(normalizeArmenian("")).toBe("");
    });

    test("Latin text passes through unchanged", () => {
      expect(normalizeArmenian("hello")).toBe("hello");
    });

    test("mixed Latin and Armenian without ligatures passes through unchanged", () => {
      const input = "hello \u0540\u0561\u0575";
      expect(normalizeArmenian(input)).toBe(input);
    });
  });

  describe("mixed text with ligatures", () => {
    test("ligature in the middle of Armenian text is expanded in-place", () => {
      // բ + ﬕ + ն → բ + մի + ն
      const input = "\u0562\uFB15\u0576";
      const expected = "\u0562\u0574\u056B\u0576";
      expect(normalizeArmenian(input)).toBe(expected);
    });

    test("multiple different ligatures in one string all expanded", () => {
      // ﬓ + space + ﬗ → մն + space + մխ
      const input = "\uFB13 \uFB17";
      const expected = "\u0574\u0576 \u0574\u056D";
      expect(normalizeArmenian(input)).toBe(expected);
    });

    test("ligature at start of string is expanded", () => {
      const input = "\uFB14\u0576";
      const expected = "\u0574\u0565\u0576";
      expect(normalizeArmenian(input)).toBe(expected);
    });

    test("ligature at end of string is expanded", () => {
      const input = "\u0562\uFB16";
      const expected = "\u0562\u057E\u0576";
      expect(normalizeArmenian(input)).toBe(expected);
    });

    test("repeated same ligature: both are expanded", () => {
      const input = "\uFB13\uFB13";
      const expected = "\u0574\u0576\u0574\u0576";
      expect(normalizeArmenian(input)).toBe(expected);
    });
  });

  describe("NFC normalization", () => {
    test("text already in NFC form is unchanged", () => {
      // Standard Armenian is already in NFC
      const input = "\u0574\u0561\u0575";
      expect(normalizeArmenian(input)).toBe(input.normalize("NFC"));
    });

    test("NFC normalization is applied (NFD composed form normalized)", () => {
      // Use a Latin character with a combining diacritic to verify NFC is applied
      // e.g. "e\u0301" (e + combining acute) → "é" (U+00E9)
      const nfd = "e\u0301";
      const nfc = "\u00E9";
      expect(normalizeArmenian(nfd)).toBe(nfc);
    });
  });
});
