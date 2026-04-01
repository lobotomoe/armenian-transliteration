import { bgnPcgn } from "../../src/standards/latin/bgn-pcgn.js";
import { iso9985 } from "../../src/standards/latin/iso-9985.js";
import { hubschmannMeillet } from "../../src/standards/latin/hubschmann-meillet.js";
import { alaLc } from "../../src/standards/latin/ala-lc.js";
import { ruGeographic } from "../../src/standards/cyrillic/ru-geographic.js";
import { ruPersonal } from "../../src/standards/cyrillic/ru-personal.js";
import type { TransliterationStandard } from "../../src/types.js";

const standards: TransliterationStandard[] = [
  bgnPcgn,
  iso9985,
  hubschmannMeillet,
  alaLc,
  ruGeographic,
  ruPersonal,
];
const expectedLetters = Array.from({ length: 38 }, (_, i) =>
  String.fromCodePoint(0x0561 + i),
);

describe("formal model completeness", () => {
  for (const std of standards) {
    describe(std.id, () => {
      test("covers all 38 Armenian letters", () => {
        const mapped = new Set(std.charMappings.map((m) => m.armenian));
        for (const letter of expectedLetters) {
          expect(mapped.has(letter)).toBe(true);
        }
        expect(std.charMappings.length).toBe(38);
      });

      test("no duplicate letter mappings", () => {
        const seen = new Set<string>();
        for (const m of std.charMappings) {
          expect(seen.has(m.armenian)).toBe(false);
          seen.add(m.armenian);
        }
      });

      test("all ambiguous targets have reverseDefault", () => {
        const targetGroups = new Map<
          string,
          (typeof std.charMappings)[number][]
        >();
        for (const m of std.charMappings) {
          const group = targetGroups.get(m.target) ?? [];
          group.push(m);
          targetGroups.set(m.target, group);
        }
        for (const [target, group] of targetGroups) {
          if (group.length > 1) {
            const hasDefault = group.some((m) => m.reverseDefault === true);
            const hasExplicitFalse = group.every(
              (m) => m.reverseDefault !== undefined,
            );
            expect({ target, hasDefault, hasExplicitFalse }).toEqual(
              expect.objectContaining({
                hasDefault: true,
                hasExplicitFalse: true,
              }),
            );
          }
        }
      });

      test("all charMappings have lowercase armenian keys", () => {
        for (const m of std.charMappings) {
          const cp = m.armenian.codePointAt(0)!;
          expect(cp).toBeGreaterThanOrEqual(0x0561);
          expect(cp).toBeLessThanOrEqual(0x0586);
        }
      });

      test("sequenceMappings ordered longest-first or equal", () => {
        for (let i = 1; i < std.sequenceMappings.length; i++) {
          const prev = Array.from(std.sequenceMappings[i - 1]!.armenian).length;
          const curr = Array.from(std.sequenceMappings[i]!.armenian).length;
          expect(prev).toBeGreaterThanOrEqual(curr);
        }
      });

      test("all context rule conditions reference valid fields", () => {
        const allMappings = [...std.charMappings, ...std.sequenceMappings];
        for (const m of allMappings) {
          if (m.contextRules) {
            for (const rule of m.contextRules) {
              const validKeys = new Set([
                "wordInitial",
                "followedBy",
                "notFollowedBy",
                "precededBy",
                "position",
              ]);
              for (const key of Object.keys(rule.condition)) {
                expect(validKeys.has(key)).toBe(true);
              }
              expect(typeof rule.target).toBe("string");
              // empty target ("omit") is only valid for non-reversible standards
              if (rule.target.length === 0) {
                expect(std.reversible).toBe(false);
              }
            }
          }
        }
      });
    });
  }
});
