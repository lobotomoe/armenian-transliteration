import { scan } from "../../src/scanner/scanner";
import type { SequenceMapping } from "../../src/types";

// Minimal sequence mappings for testing: ու (U+0578 U+0582) -> "u"
const OU_SEQUENCE: SequenceMapping = {
  armenian: "\u0578\u0582", // ու
  target: "u",
};

// A longer sequence for greedy-match testing: ույ (U+0578 U+0582 U+056B)
const OUY_SEQUENCE: SequenceMapping = {
  armenian: "\u0578\u0582\u056B", // ույ
  target: "uy",
};

const NO_SEQUENCES: readonly SequenceMapping[] = [];
const WITH_OU: readonly SequenceMapping[] = [OU_SEQUENCE];
const WITH_OU_AND_OUY: readonly SequenceMapping[] = [OU_SEQUENCE, OUY_SEQUENCE];

describe("scanner", () => {
  describe("empty input", () => {
    test("empty string returns empty token array", () => {
      expect(scan("", NO_SEQUENCES)).toEqual([]);
    });
  });

  describe("single Armenian letter", () => {
    test("produces one armenian_letter token", () => {
      // մ U+0574
      const tokens = scan("\u0574", NO_SEQUENCES);
      expect(tokens).toHaveLength(1);
      expect(tokens[0]).toMatchObject({
        kind: "armenian_letter",
        value: "\u0574",
        offset: 0,
      });
    });

    test("single letter has wordPosition 'isolated'", () => {
      const tokens = scan("\u0574", NO_SEQUENCES);
      expect(tokens[0]?.wordPosition).toBe("isolated");
    });
  });

  describe("word position annotation", () => {
    test("two-letter word: first is initial, last is final", () => {
      // մի U+0574 U+056B
      const tokens = scan("\u0574\u056B", NO_SEQUENCES);
      expect(tokens).toHaveLength(2);
      expect(tokens[0]?.wordPosition).toBe("initial");
      expect(tokens[1]?.wordPosition).toBe("final");
    });

    test("three-letter word: initial, medial, final", () => {
      // մայ U+0574 U+0561 U+0575
      const tokens = scan("\u0574\u0561\u0575", NO_SEQUENCES);
      expect(tokens).toHaveLength(3);
      expect(tokens[0]?.wordPosition).toBe("initial");
      expect(tokens[1]?.wordPosition).toBe("medial");
      expect(tokens[2]?.wordPosition).toBe("final");
    });

    test("four-letter word has two medial tokens", () => {
      // մայր U+0574 U+0561 U+0575 U+0580
      const tokens = scan("\u0574\u0561\u0575\u0580", NO_SEQUENCES);
      expect(tokens).toHaveLength(4);
      expect(tokens[0]?.wordPosition).toBe("initial");
      expect(tokens[1]?.wordPosition).toBe("medial");
      expect(tokens[2]?.wordPosition).toBe("medial");
      expect(tokens[3]?.wordPosition).toBe("final");
    });
  });

  describe("multi-char sequence recognition", () => {
    test("ու recognized as a single armenian_sequence token", () => {
      // ու U+0578 U+0582
      const tokens = scan("\u0578\u0582", WITH_OU);
      expect(tokens).toHaveLength(1);
      expect(tokens[0]).toMatchObject({
        kind: "armenian_sequence",
        value: "\u0578\u0582",
        offset: 0,
      });
    });

    test("ու sequence in a word with surrounding letters", () => {
      // բուն U+0562 U+0578 U+0582 U+0576
      const tokens = scan("\u0562\u0578\u0582\u0576", WITH_OU);
      expect(tokens).toHaveLength(3);
      expect(tokens[0]).toMatchObject({ kind: "armenian_letter", value: "\u0562" });
      expect(tokens[1]).toMatchObject({ kind: "armenian_sequence", value: "\u0578\u0582" });
      expect(tokens[2]).toMatchObject({ kind: "armenian_letter", value: "\u0576" });
    });

    test("sequence wordPosition: sequence alone is isolated", () => {
      const tokens = scan("\u0578\u0582", WITH_OU);
      expect(tokens[0]?.wordPosition).toBe("isolated");
    });

    test("sequence wordPosition: sequence at start of word is initial", () => {
      // ութ U+0578 U+0582 U+0569
      const tokens = scan("\u0578\u0582\u0569", WITH_OU);
      expect(tokens[0]?.wordPosition).toBe("initial");
      expect(tokens[1]?.wordPosition).toBe("final");
    });
  });

  describe("greedy longest-match", () => {
    test("ույ matches the 3-char sequence, not ու + յ", () => {
      // ույ U+0578 U+0582 U+056B
      const tokens = scan("\u0578\u0582\u056B", WITH_OU_AND_OUY);
      expect(tokens).toHaveLength(1);
      expect(tokens[0]).toMatchObject({
        kind: "armenian_sequence",
        value: "\u0578\u0582\u056B",
      });
    });

    test("ու followed by non-matching letter: ու consumed as short sequence", () => {
      // ուն U+0578 U+0582 U+0576 (not ույ)
      const tokens = scan("\u0578\u0582\u0576", WITH_OU_AND_OUY);
      expect(tokens).toHaveLength(2);
      expect(tokens[0]).toMatchObject({ kind: "armenian_sequence", value: "\u0578\u0582" });
      expect(tokens[1]).toMatchObject({ kind: "armenian_letter", value: "\u0576" });
    });
  });

  describe("mixed Armenian and Latin text", () => {
    test("Latin characters become 'other' tokens", () => {
      // Mix: Armenian letter մ then ASCII 'x'
      const tokens = scan("\u0574x", NO_SEQUENCES);
      expect(tokens).toHaveLength(2);
      expect(tokens[0]).toMatchObject({ kind: "armenian_letter", value: "\u0574" });
      expect(tokens[1]).toMatchObject({ kind: "other", value: "x" });
    });

    test("Latin before Armenian: correct order and kinds", () => {
      const tokens = scan("A\u0574", NO_SEQUENCES);
      expect(tokens[0]).toMatchObject({ kind: "other", value: "A" });
      expect(tokens[1]).toMatchObject({ kind: "armenian_letter", value: "\u0574" });
    });
  });

  describe("whitespace", () => {
    test("space produces a whitespace token", () => {
      const tokens = scan(" ", NO_SEQUENCES);
      expect(tokens).toHaveLength(1);
      expect(tokens[0]).toMatchObject({ kind: "whitespace", value: " " });
    });

    test("whitespace between Armenian words is preserved", () => {
      // մ space մ
      const tokens = scan("\u0574 \u0574", NO_SEQUENCES);
      expect(tokens).toHaveLength(3);
      expect(tokens[0]).toMatchObject({ kind: "armenian_letter" });
      expect(tokens[1]).toMatchObject({ kind: "whitespace", value: " " });
      expect(tokens[2]).toMatchObject({ kind: "armenian_letter" });
    });

    test("tab produces a whitespace token", () => {
      const tokens = scan("\t", NO_SEQUENCES);
      expect(tokens[0]).toMatchObject({ kind: "whitespace", value: "\t" });
    });
  });

  describe("Armenian punctuation", () => {
    test("։ (U+0589) is detected as punctuation", () => {
      const tokens = scan("\u0589", NO_SEQUENCES);
      expect(tokens[0]).toMatchObject({ kind: "punctuation", value: "\u0589" });
    });

    test("՞ (U+055E) is detected as punctuation", () => {
      const tokens = scan("\u055E", NO_SEQUENCES);
      expect(tokens[0]).toMatchObject({ kind: "punctuation", value: "\u055E" });
    });

    test("՝ (U+055D) is detected as punctuation", () => {
      const tokens = scan("\u055D", NO_SEQUENCES);
      expect(tokens[0]).toMatchObject({ kind: "punctuation", value: "\u055D" });
    });

    test("՜ (U+055C) is detected as punctuation", () => {
      const tokens = scan("\u055C", NO_SEQUENCES);
      expect(tokens[0]).toMatchObject({ kind: "punctuation", value: "\u055C" });
    });

    test("֊ (U+058A Armenian hyphen) is detected as punctuation", () => {
      const tokens = scan("\u058A", NO_SEQUENCES);
      expect(tokens[0]).toMatchObject({ kind: "punctuation", value: "\u058A" });
    });
  });

  describe("guillemets", () => {
    test("« (U+00AB) is detected as punctuation", () => {
      const tokens = scan("\u00AB", NO_SEQUENCES);
      expect(tokens[0]).toMatchObject({ kind: "punctuation", value: "\u00AB" });
    });

    test("» (U+00BB) is detected as punctuation", () => {
      const tokens = scan("\u00BB", NO_SEQUENCES);
      expect(tokens[0]).toMatchObject({ kind: "punctuation", value: "\u00BB" });
    });

    test("guillemets around Armenian word are punctuation tokens", () => {
      // «մ»
      const tokens = scan("\u00AB\u0574\u00BB", NO_SEQUENCES);
      expect(tokens).toHaveLength(3);
      expect(tokens[0]).toMatchObject({ kind: "punctuation", value: "\u00AB" });
      expect(tokens[1]).toMatchObject({ kind: "armenian_letter", value: "\u0574" });
      expect(tokens[2]).toMatchObject({ kind: "punctuation", value: "\u00BB" });
    });
  });

  describe("numbers as 'other' tokens", () => {
    test("digit '3' becomes an other token", () => {
      const tokens = scan("3", NO_SEQUENCES);
      expect(tokens[0]).toMatchObject({ kind: "other", value: "3" });
    });

    test("digit string '31' produces one other token", () => {
      const tokens = scan("31", NO_SEQUENCES);
      expect(tokens).toHaveLength(1);
      expect(tokens[0]).toMatchObject({ kind: "other", value: "31" });
    });
  });

  describe("consecutive 'other' chars accumulate into a single token", () => {
    test("ABC becomes one other token with value 'ABC'", () => {
      const tokens = scan("ABC", NO_SEQUENCES);
      expect(tokens).toHaveLength(1);
      expect(tokens[0]).toMatchObject({ kind: "other", value: "ABC" });
    });

    test("mixed digits and letters accumulated: '42abc'", () => {
      const tokens = scan("42abc", NO_SEQUENCES);
      expect(tokens).toHaveLength(1);
      expect(tokens[0]).toMatchObject({ kind: "other", value: "42abc" });
    });

    test("other accumulation resets at Armenian letter boundary", () => {
      // 'AB' then Armenian մ then 'CD'
      const tokens = scan("AB\u0574CD", NO_SEQUENCES);
      expect(tokens).toHaveLength(3);
      expect(tokens[0]).toMatchObject({ kind: "other", value: "AB" });
      expect(tokens[1]).toMatchObject({ kind: "armenian_letter", value: "\u0574" });
      expect(tokens[2]).toMatchObject({ kind: "other", value: "CD" });
    });
  });

  describe("word boundary detection", () => {
    test("whitespace breaks the word: separate isolated words", () => {
      // մ space մ → two isolated letters
      const tokens = scan("\u0574 \u0574", NO_SEQUENCES);
      expect(tokens[0]?.wordPosition).toBe("isolated");
      expect(tokens[2]?.wordPosition).toBe("isolated");
    });

    test("punctuation breaks the word", () => {
      // մ։մ → two isolated letters separated by punctuation
      const tokens = scan("\u0574\u0589\u0574", NO_SEQUENCES);
      expect(tokens[0]?.wordPosition).toBe("isolated");
      expect(tokens[2]?.wordPosition).toBe("isolated");
    });

    test("'other' chars break the word", () => {
      // մ-մ (ASCII hyphen is 'other')
      const tokens = scan("\u0574-\u0574", NO_SEQUENCES);
      expect(tokens[0]?.wordPosition).toBe("isolated");
      expect(tokens[2]?.wordPosition).toBe("isolated");
    });
  });

  describe("multiple words with position annotations", () => {
    test("two separate words each get correct positions", () => {
      // մայր մ (first word 3 letters, second word 1 letter)
      // U+0574 U+0561 U+0575 U+0580 space U+0574
      const tokens = scan("\u0574\u0561\u0575\u0580 \u0574", NO_SEQUENCES);
      // Word 1: initial, medial, medial, final
      expect(tokens[0]?.wordPosition).toBe("initial");
      expect(tokens[1]?.wordPosition).toBe("medial");
      expect(tokens[2]?.wordPosition).toBe("medial");
      expect(tokens[3]?.wordPosition).toBe("final");
      // Whitespace
      expect(tokens[4]?.kind).toBe("whitespace");
      // Word 2: isolated
      expect(tokens[5]?.wordPosition).toBe("isolated");
    });
  });

  describe("token offsets", () => {
    test("single token has offset 0", () => {
      const tokens = scan("\u0574", NO_SEQUENCES);
      expect(tokens[0]?.offset).toBe(0);
    });

    test("second token offset is 1 for single-char tokens", () => {
      const tokens = scan("\u0574\u0561", NO_SEQUENCES);
      expect(tokens[0]?.offset).toBe(0);
      expect(tokens[1]?.offset).toBe(1);
    });

    test("sequence token offset is start char index", () => {
      // բ (offset 0) + ու (offset 1)
      const tokens = scan("\u0562\u0578\u0582", WITH_OU);
      expect(tokens[0]?.offset).toBe(0);
      expect(tokens[1]?.offset).toBe(1);
    });

    test("other token offset after whitespace", () => {
      // space (0) then 'x' (1)
      const tokens = scan(" x", NO_SEQUENCES);
      expect(tokens[0]?.offset).toBe(0);
      expect(tokens[1]?.offset).toBe(1);
    });
  });

  describe("case variants of sequences", () => {
    test("uppercase ՈՒ is also matched as armenian_sequence", () => {
      // ՈՒ = U+0548 U+0552 (uppercase forms of ու)
      const tokens = scan("\u0548\u0552", WITH_OU);
      expect(tokens).toHaveLength(1);
      expect(tokens[0]).toMatchObject({ kind: "armenian_sequence" });
    });
  });
});
