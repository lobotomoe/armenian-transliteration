import { ReverseTransliterationEngine } from "../../src/engine/reverse";
import type { CharMapping, TransliterationStandard } from "../../src/types";

function standard(charMappings: readonly CharMapping[]): TransliterationStandard {
  return {
    id: "iso-9985",
    name: "test",
    targetScript: "latin",
    reversible: true,
    charMappings,
    sequenceMappings: [],
    punctuation: {},
  };
}

describe("ReverseTransliterationEngine", () => {
  test("refuses a standard not marked reversible", () => {
    const definition = { ...standard([{ armenian: "ա", target: "a" }]), reversible: false };
    expect(() => new ReverseTransliterationEngine(definition)).toThrow(/not reversible/);
  });

  test("refuses context rules", () => {
    const definition = standard([
      { armenian: "ե", target: "e", contextRules: [{ condition: { wordInitial: true }, target: "ye" }] },
    ]);
    expect(() => new ReverseTransliterationEngine(definition)).toThrow(/context rules/);
  });

  test("refuses a letter that maps to nothing", () => {
    expect(() => new ReverseTransliterationEngine(standard([{ armenian: "ա", target: "" }]))).toThrow(
      /maps to nothing/,
    );
  });

  test("refuses two letters with one target and no reverse default", () => {
    const definition = standard([
      { armenian: "տ", target: "t" },
      { armenian: "թ", target: "t" },
    ]);
    expect(() => new ReverseTransliterationEngine(definition)).toThrow(/neither is the reverse default/);
  });

  test("the reverse default wins a shared target, in either order", () => {
    const first = standard([
      { armenian: "տ", target: "t", reverseDefault: true },
      { armenian: "թ", target: "t" },
    ]);
    const second = standard([
      { armenian: "թ", target: "t" },
      { armenian: "տ", target: "t", reverseDefault: true },
    ]);
    expect(new ReverseTransliterationEngine(first).transliterate("Tt")).toBe("Տտ");
    expect(new ReverseTransliterationEngine(second).transliterate("Tt")).toBe("Տտ");
  });

  test("refuses spellings that only collide once cased", () => {
    const definition = standard([
      { armenian: "ա", target: "a" },
      { armenian: "բ", target: "A" },
    ]);
    expect(() => new ReverseTransliterationEngine(definition)).toThrow(/would read as both/);
  });

  test("passes characters outside the basic plane through whole", () => {
    const engine = new ReverseTransliterationEngine(standard([{ armenian: "ա", target: "a" }]));
    expect(engine.transliterate("a\u{1F600}a")).toBe("ա\u{1F600}ա");
  });
});
