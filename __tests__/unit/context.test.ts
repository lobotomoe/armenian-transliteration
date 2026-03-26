import { evaluateCondition, resolveMapping } from "../../src/engine/context";
import type { Token } from "../../src/scanner/tokens";
import type { CharMapping, ContextCondition } from "../../src/types";

/** Build a minimal Token for testing */
function makeToken(
  value: string,
  wordPosition?: Token["wordPosition"],
  kind: Token["kind"] = "armenian_letter",
): Token {
  const token: Token = { kind, value, offset: 0 };
  if (wordPosition !== undefined) token.wordPosition = wordPosition;
  return token;
}

/** Build a minimal CharMapping for resolveMapping tests */
function makeMapping(
  armenian: string,
  target: string,
  contextRules?: CharMapping["contextRules"],
): CharMapping {
  const mapping: CharMapping = { armenian, target };
  if (contextRules !== undefined) mapping.contextRules = contextRules;
  return mapping;
}

describe("evaluateCondition", () => {
  describe("wordInitial condition", () => {
    test("wordInitial: true matches 'initial' position", () => {
      const token = makeToken("\u0574", "initial");
      const condition: ContextCondition = { wordInitial: true };
      expect(evaluateCondition(condition, token, undefined, undefined)).toBe(true);
    });

    test("wordInitial: true matches 'isolated' position", () => {
      const token = makeToken("\u0574", "isolated");
      const condition: ContextCondition = { wordInitial: true };
      expect(evaluateCondition(condition, token, undefined, undefined)).toBe(true);
    });

    test("wordInitial: true does NOT match 'medial' position", () => {
      const token = makeToken("\u0574", "medial");
      const condition: ContextCondition = { wordInitial: true };
      expect(evaluateCondition(condition, token, undefined, undefined)).toBe(false);
    });

    test("wordInitial: true does NOT match 'final' position", () => {
      const token = makeToken("\u0574", "final");
      const condition: ContextCondition = { wordInitial: true };
      expect(evaluateCondition(condition, token, undefined, undefined)).toBe(false);
    });

    test("wordInitial: false matches 'medial' position", () => {
      const token = makeToken("\u0574", "medial");
      const condition: ContextCondition = { wordInitial: false };
      expect(evaluateCondition(condition, token, undefined, undefined)).toBe(true);
    });

    test("wordInitial: false matches 'final' position", () => {
      const token = makeToken("\u0574", "final");
      const condition: ContextCondition = { wordInitial: false };
      expect(evaluateCondition(condition, token, undefined, undefined)).toBe(true);
    });

    test("wordInitial: false does NOT match 'initial' position", () => {
      const token = makeToken("\u0574", "initial");
      const condition: ContextCondition = { wordInitial: false };
      expect(evaluateCondition(condition, token, undefined, undefined)).toBe(false);
    });

    test("wordInitial: false does NOT match 'isolated' position", () => {
      const token = makeToken("\u0574", "isolated");
      const condition: ContextCondition = { wordInitial: false };
      expect(evaluateCondition(condition, token, undefined, undefined)).toBe(false);
    });
  });

  describe("followedBy condition", () => {
    test("followedBy: matches when next token value (lowercased) is in list", () => {
      const token = makeToken("\u0578", "initial");
      // Next token is բ (U+0562 lowercase)
      const nextToken = makeToken("\u0562");
      const condition: ContextCondition = { followedBy: ["\u0562"] };
      expect(evaluateCondition(condition, token, undefined, nextToken)).toBe(true);
    });

    test("followedBy: matches when next token is uppercase and list has lowercase", () => {
      const token = makeToken("\u0578", "initial");
      // Next token is Բ (U+0532 uppercase); toLowerCanonical converts to բ
      const nextToken = makeToken("\u0532");
      const condition: ContextCondition = { followedBy: ["\u0562"] }; // բ lowercase
      expect(evaluateCondition(condition, token, undefined, nextToken)).toBe(true);
    });

    test("followedBy: fails when next token value not in list", () => {
      const token = makeToken("\u0578", "initial");
      const nextToken = makeToken("\u0576"); // ն
      const condition: ContextCondition = { followedBy: ["\u0562"] }; // բ
      expect(evaluateCondition(condition, token, undefined, nextToken)).toBe(false);
    });

    test("followedBy: fails when no next token", () => {
      const token = makeToken("\u0578", "isolated");
      const condition: ContextCondition = { followedBy: ["\u0562"] };
      expect(evaluateCondition(condition, token, undefined, undefined)).toBe(false);
    });
  });

  describe("notFollowedBy condition", () => {
    test("notFollowedBy: satisfied when next token is NOT in list", () => {
      const token = makeToken("\u0578", "initial");
      const nextToken = makeToken("\u0576"); // ն — not in the list
      const condition: ContextCondition = { notFollowedBy: ["\u0562"] }; // բ
      expect(evaluateCondition(condition, token, undefined, nextToken)).toBe(true);
    });

    test("notFollowedBy: fails when next token IS in list", () => {
      const token = makeToken("\u0578", "initial");
      const nextToken = makeToken("\u0562"); // բ
      const condition: ContextCondition = { notFollowedBy: ["\u0562"] };
      expect(evaluateCondition(condition, token, undefined, nextToken)).toBe(false);
    });

    test("notFollowedBy: satisfied when there is no next token", () => {
      const token = makeToken("\u0578", "isolated");
      const condition: ContextCondition = { notFollowedBy: ["\u0562"] };
      expect(evaluateCondition(condition, token, undefined, undefined)).toBe(true);
    });

    test("notFollowedBy: uses toLowerCanonical for comparison", () => {
      const token = makeToken("\u0578", "initial");
      // Next is Բ (uppercase U+0532); list has բ (lowercase U+0562)
      const nextToken = makeToken("\u0532");
      const condition: ContextCondition = { notFollowedBy: ["\u0562"] };
      // toLowerCanonical(Բ) = բ, which IS in the list → fails
      expect(evaluateCondition(condition, token, undefined, nextToken)).toBe(false);
    });
  });

  describe("precededBy condition", () => {
    test("precededBy: satisfied when prev token value matches", () => {
      const token = makeToken("\u0576", "final");
      const prevToken = makeToken("\u0562"); // բ
      const condition: ContextCondition = { precededBy: ["\u0562"] };
      expect(evaluateCondition(condition, token, prevToken, undefined)).toBe(true);
    });

    test("precededBy: fails when prev token value not in list", () => {
      const token = makeToken("\u0576", "final");
      const prevToken = makeToken("\u0561"); // ա
      const condition: ContextCondition = { precededBy: ["\u0562"] };
      expect(evaluateCondition(condition, token, prevToken, undefined)).toBe(false);
    });

    test("precededBy: fails when no prev token", () => {
      const token = makeToken("\u0576", "isolated");
      const condition: ContextCondition = { precededBy: ["\u0562"] };
      expect(evaluateCondition(condition, token, undefined, undefined)).toBe(false);
    });

    test("precededBy: uses toLowerCanonical for comparison", () => {
      const token = makeToken("\u0576", "final");
      // Prev token is Բ (uppercase U+0532); list has բ (U+0562)
      const prevToken = makeToken("\u0532");
      const condition: ContextCondition = { precededBy: ["\u0562"] };
      expect(evaluateCondition(condition, token, prevToken, undefined)).toBe(true);
    });
  });

  describe("multiple conditions (AND logic)", () => {
    test("all conditions met → true", () => {
      const token = makeToken("\u0578", "initial");
      const nextToken = makeToken("\u0562");
      const condition: ContextCondition = {
        wordInitial: true,
        followedBy: ["\u0562"],
      };
      expect(evaluateCondition(condition, token, undefined, nextToken)).toBe(true);
    });

    test("wordInitial met but followedBy fails → false", () => {
      const token = makeToken("\u0578", "initial");
      const nextToken = makeToken("\u0576"); // ն, not բ
      const condition: ContextCondition = {
        wordInitial: true,
        followedBy: ["\u0562"],
      };
      expect(evaluateCondition(condition, token, undefined, nextToken)).toBe(false);
    });

    test("followedBy met but wordInitial fails → false", () => {
      const token = makeToken("\u0578", "medial"); // not initial
      const nextToken = makeToken("\u0562");
      const condition: ContextCondition = {
        wordInitial: true,
        followedBy: ["\u0562"],
      };
      expect(evaluateCondition(condition, token, undefined, nextToken)).toBe(false);
    });

    test("three conditions all met → true", () => {
      const token = makeToken("\u0578", "initial");
      const prevToken = makeToken("\u0561");
      const nextToken = makeToken("\u0562");
      const condition: ContextCondition = {
        wordInitial: true,
        precededBy: ["\u0561"],
        followedBy: ["\u0562"],
      };
      // wordInitial is true (initial matches), prevToken is ա, nextToken is բ
      expect(evaluateCondition(condition, token, prevToken, nextToken)).toBe(true);
    });

    test("empty condition object → always true", () => {
      const token = makeToken("\u0578", "medial");
      const condition: ContextCondition = {};
      expect(evaluateCondition(condition, token, undefined, undefined)).toBe(true);
    });
  });

  describe("position condition", () => {
    test("position: single value matches", () => {
      const token = makeToken("\u0574", "medial");
      const condition: ContextCondition = { position: "medial" };
      expect(evaluateCondition(condition, token, undefined, undefined)).toBe(true);
    });

    test("position: single value does not match other positions", () => {
      const token = makeToken("\u0574", "initial");
      const condition: ContextCondition = { position: "medial" };
      expect(evaluateCondition(condition, token, undefined, undefined)).toBe(false);
    });

    test("position: array matches any included position", () => {
      const token = makeToken("\u0574", "final");
      const condition: ContextCondition = { position: ["medial", "final"] };
      expect(evaluateCondition(condition, token, undefined, undefined)).toBe(true);
    });

    test("position: array does not match excluded positions", () => {
      const token = makeToken("\u0574", "initial");
      const condition: ContextCondition = { position: ["medial", "final"] };
      expect(evaluateCondition(condition, token, undefined, undefined)).toBe(false);
    });

    test("position: fails when token has no wordPosition", () => {
      const token = makeToken("\u0574"); // no wordPosition set
      const condition: ContextCondition = { position: "initial" };
      expect(evaluateCondition(condition, token, undefined, undefined)).toBe(false);
    });
  });
});

describe("resolveMapping", () => {
  test("returns default target when contextRules is undefined", () => {
    const token = makeToken("\u0574", "isolated");
    const mapping = makeMapping("\u0574", "m");
    expect(resolveMapping(mapping, token, undefined, undefined)).toBe("m");
  });

  test("returns default target when contextRules is empty array", () => {
    const token = makeToken("\u0574", "isolated");
    const mapping = makeMapping("\u0574", "m", []);
    expect(resolveMapping(mapping, token, undefined, undefined)).toBe("m");
  });

  test("first matching rule wins", () => {
    const token = makeToken("\u0578", "initial");
    const mapping = makeMapping("\u0578", "o", [
      { condition: { wordInitial: true }, target: "vo" },
      { condition: { wordInitial: true }, target: "SHOULD_NOT_REACH" },
    ]);
    expect(resolveMapping(mapping, token, undefined, undefined)).toBe("vo");
  });

  test("falls back to default when no rules match", () => {
    const token = makeToken("\u0578", "medial");
    const mapping = makeMapping("\u0578", "o", [
      { condition: { wordInitial: true }, target: "vo" },
    ]);
    expect(resolveMapping(mapping, token, undefined, undefined)).toBe("o");
  });

  test("second rule wins when first does not match", () => {
    const token = makeToken("\u0578", "medial");
    const nextToken = makeToken("\u0562");
    const mapping = makeMapping("\u0578", "o", [
      { condition: { wordInitial: true }, target: "vo" },
      { condition: { followedBy: ["\u0562"] }, target: "ob" },
    ]);
    expect(resolveMapping(mapping, token, undefined, nextToken)).toBe("ob");
  });

  test("rule with empty condition always matches", () => {
    const token = makeToken("\u0574", "medial");
    const mapping = makeMapping("\u0574", "m", [
      { condition: {}, target: "always" },
    ]);
    expect(resolveMapping(mapping, token, undefined, undefined)).toBe("always");
  });

  test("context rules use prevToken correctly", () => {
    const token = makeToken("\u0576", "final");
    const prevToken = makeToken("\u0578\u0582"); // ու sequence
    const mapping = makeMapping("\u0576", "n", [
      { condition: { precededBy: ["\u0578\u0582"] }, target: "n-after-ou" },
    ]);
    expect(resolveMapping(mapping, token, prevToken, undefined)).toBe("n-after-ou");
  });
});
