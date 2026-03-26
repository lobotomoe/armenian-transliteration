import {
  detectWordCasing,
  applySingleTokenCasing,
  applyUpperCasing,
  toLowerCanonical,
} from "../../src/engine/casing";
import type { Token } from "../../src/scanner/tokens";

/** Build a minimal armenian_letter token */
function makeToken(value: string, wordPosition?: Token["wordPosition"]): Token {
  const token: Token = { kind: "armenian_letter", value, offset: 0 };
  if (wordPosition !== undefined) token.wordPosition = wordPosition;
  return token;
}

describe("detectWordCasing", () => {
  test("empty array returns 'lower'", () => {
    expect(detectWordCasing([])).toBe("lower");
  });

  test("single uppercase letter → 'upper'", () => {
    // Մ U+0544
    const tokens = [makeToken("\u0544")];
    expect(detectWordCasing(tokens)).toBe("upper");
  });

  test("all uppercase letters → 'upper'", () => {
    // ՄԱՅ U+0544 U+0531 U+0545
    const tokens = [makeToken("\u0544"), makeToken("\u0531"), makeToken("\u0545")];
    expect(detectWordCasing(tokens)).toBe("upper");
  });

  test("all lowercase letters → 'lower'", () => {
    // մայ U+0574 U+0561 U+0575
    const tokens = [makeToken("\u0574"), makeToken("\u0561"), makeToken("\u0575")];
    expect(detectWordCasing(tokens)).toBe("lower");
  });

  test("first token uppercase, rest lowercase → 'title'", () => {
    // Մ U+0544 uppercase, followed by lowercase
    const tokens = [makeToken("\u0544"), makeToken("\u0561"), makeToken("\u0575")];
    expect(detectWordCasing(tokens)).toBe("title");
  });

  test("first token lowercase, second uppercase → 'lower' (camelCase-like is treated as lower)", () => {
    // մԱ: first lowercase, second uppercase → first token not uppercase → 'lower'
    const tokens = [makeToken("\u0574"), makeToken("\u0531")];
    expect(detectWordCasing(tokens)).toBe("lower");
  });

  test("U+0587 (և) treated as lowercase: prevents all-upper detection", () => {
    // ԱևԱ: first and last are uppercase, middle is և (always lowercase)
    // allUpper check: every token must be uppercase; և fails → not 'upper'
    // first token Ա is uppercase → 'title'
    const tokenA = makeToken("\u0531"); // Ա uppercase
    const tokenEw = makeToken("\u0587"); // և no uppercase form
    const tokenA2 = makeToken("\u0531"); // Ա uppercase
    expect(detectWordCasing([tokenA, tokenEw, tokenA2])).toBe("title");
  });

  test("single U+0587 (և) → 'lower' (not uppercase)", () => {
    const tokens = [makeToken("\u0587")];
    expect(detectWordCasing(tokens)).toBe("lower");
  });

  test("uppercase sequence token treated correctly", () => {
    // Token with multi-char uppercase value ՄԱ
    const seqToken: Token = {
      kind: "armenian_sequence",
      value: "\u0544\u0531", // ՄԱ
      offset: 0,
    };
    expect(detectWordCasing([seqToken])).toBe("upper");
  });
});

describe("applySingleTokenCasing", () => {
  test("uppercase source: capitalizes first char of output", () => {
    // Source: Մ (uppercase U+0544)
    const source = makeToken("\u0544");
    expect(applySingleTokenCasing(source, "m")).toBe("M");
  });

  test("uppercase source with multi-char output: only first char capitalized", () => {
    // Source: Շ (uppercase U+0547), output "sh"
    const source = makeToken("\u0547");
    expect(applySingleTokenCasing(source, "sh")).toBe("Sh");
  });

  test("lowercase source: output is kept as-is", () => {
    // Source: մ (lowercase U+0574)
    const source = makeToken("\u0574");
    expect(applySingleTokenCasing(source, "m")).toBe("m");
  });

  test("lowercase source multi-char output: kept as-is", () => {
    const source = makeToken("\u0577"); // շ lowercase
    expect(applySingleTokenCasing(source, "sh")).toBe("sh");
  });

  test("empty transliterated string returns empty string", () => {
    const source = makeToken("\u0544");
    expect(applySingleTokenCasing(source, "")).toBe("");
  });

  test("mixed token with uppercase Armenian: capitalizes output", () => {
    // Sequence token where first char is uppercase
    const source: Token = {
      kind: "armenian_sequence",
      value: "\u0548\u0552", // ՈՒ uppercase
      offset: 0,
    };
    expect(applySingleTokenCasing(source, "u")).toBe("U");
  });

  test("U+0587 (և) in source: no uppercase form, output stays lowercase", () => {
    // և is not in the uppercase range → hasUppercase = false
    const source = makeToken("\u0587");
    expect(applySingleTokenCasing(source, "yev")).toBe("yev");
  });
});

describe("applyUpperCasing", () => {
  test("ASCII text is uppercased", () => {
    expect(applyUpperCasing("kentron")).toBe("KENTRON");
  });

  test("already uppercase text is unchanged", () => {
    expect(applyUpperCasing("KENTRON")).toBe("KENTRON");
  });

  test("mixed case is fully uppercased", () => {
    expect(applyUpperCasing("Kentron")).toBe("KENTRON");
  });

  test("empty string returns empty string", () => {
    expect(applyUpperCasing("")).toBe("");
  });

  test("string with diacritics: toUpperCase handles them", () => {
    // e.g. ë → Ë
    expect(applyUpperCasing("yev\u00eb")).toBe("YEV\u00cb");
  });
});

describe("toLowerCanonical", () => {
  test("Armenian uppercase letter is converted to lowercase", () => {
    // Մ U+0544 → մ U+0574
    expect(toLowerCanonical("\u0544")).toBe("\u0574");
  });

  test("Armenian lowercase letter stays lowercase", () => {
    // մ U+0574 → մ U+0574
    expect(toLowerCanonical("\u0574")).toBe("\u0574");
  });

  test("mixed-case Armenian string converted to all-lowercase", () => {
    // ՄԱՅ → մայ
    expect(toLowerCanonical("\u0544\u0531\u0545")).toBe("\u0574\u0561\u0575");
  });

  test("non-Armenian characters pass through unchanged", () => {
    expect(toLowerCanonical("abc")).toBe("abc");
  });

  test("empty string returns empty string", () => {
    expect(toLowerCanonical("")).toBe("");
  });

  test("U+0587 (և) passes through as-is (it is already lowercase canonical)", () => {
    // U+0587 is not in the uppercase range, so armenianToLower returns it unchanged
    expect(toLowerCanonical("\u0587")).toBe("\u0587");
  });

  test("entire alphabet: all 38 uppercase letters convert to their lowercase counterparts", () => {
    for (let i = 0; i < 38; i++) {
      const upper = String.fromCodePoint(0x0531 + i);
      const lower = String.fromCodePoint(0x0561 + i);
      expect(toLowerCanonical(upper)).toBe(lower);
    }
  });

  test("last uppercase letter Ֆ (U+0556) → ֆ (U+0586)", () => {
    expect(toLowerCanonical("\u0556")).toBe("\u0586");
  });
});
