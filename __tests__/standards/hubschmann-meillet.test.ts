/**
 * Hübschmann-Meillet standard — comprehensive character mapping tests.
 *
 * H-M is a reversible scholarly standard used in academic Armenian linguistics.
 *
 * Key differences from ISO 9985:
 *   ε U+0568 ը → ə  (schwa U+0259, not ë as in ISO)
 *   ρ U+0572 ղ → ł  (l with stroke U+0142, not ġ as in ISO)
 *   σ U+0573 ճ → č  (c with caron U+010D, no dot below)
 *   χ U+0579 չ → čʿ (č + U+02BF left half ring)
 *   ε U+0585 օ → ō  (o with macron U+014D, not ò as in ISO)
 *
 * Shared with ISO 9985:
 *   ε U+0567 է → ē  (U+0113)
 *   θ U+0569 թ → tʿ (t + U+02BF)
 *   σ U+056A ժ → ž  (U+017E)
 *   χ U+056D խ → x
 *   ρ U+0571 ձ → j
 *   ρ U+057B ջ → ǰ  (U+01F0)
 *   ρ U+057C ռ → ṙ  (U+1E59)
 *   ω U+0581 ց → cʿ
 *   ω U+0582 ւ → w
 *   φ U+0583 փ → pʿ (p + U+02BF)
 *   ψ U+0584 ք → kʿ (k + U+02BF)
 *
 * No word-initial context rules (same as ISO 9985):
 *   ε (U+0565) → e always
 *   ο (U+0578) → o always
 *
 * Sequence: and (U+0587) → ew
 *           ου (U+0578+U+0582) → ow (independent mapping)
 *
 * Armenian codepoints: see bgn-pcgn.test.ts for reference.
 */
import { transliterate } from "../../src";

const t = (text: string) =>
  transliterate(text, { standard: "hubschmann-meillet" });

const B = "\u0562"; // բ — neutral mid-word wrapper
const mid = (ch: string) => `${B}${ch}${B}`;

describe("Hübschmann-Meillet standard", () => {
  // ─────────────────────────────────────────────────────────────────────────
  // All 38 lowercase letters in mid-word context
  // ─────────────────────────────────────────────────────────────────────────
  describe("38 lowercase letter mappings (mid-word context)", () => {
    test.each([
      ["\u0561", "a"], // ա → a
      ["\u0562", "b"], // բ → b
      ["\u0563", "g"], // գ → g
      ["\u0564", "d"], // դ → d
      ["\u0565", "e"], // ե → e (no word-initial rule)
      ["\u0566", "z"], // զ → z
      ["\u0567", "\u0113"], // է → ē (U+0113)
      ["\u0568", "\u0259"], // ը → ə (schwa U+0259 — H-M specific!)
      ["\u0569", "t\u02BF"], // թ → tʿ (t + U+02BF)
      ["\u056A", "\u017E"], // ժ → ž (U+017E)
      ["\u056B", "i"], // ի → i
      ["\u056C", "l"], // լ → l
      ["\u056D", "x"], // խ → x
      ["\u056E", "c"], // ծ → c (plain c — H-M has no dot below!)
      ["\u056F", "k"], // կ → k
      ["\u0570", "h"], // հ → h
      ["\u0571", "j"], // ձ → j
      ["\u0572", "\u0142"], // ղ → ł (l with stroke U+0142 — H-M specific!)
      ["\u0573", "\u010D"], // ճ → č (U+010D — no dot below unlike ISO)
      ["\u0574", "m"], // մ → m
      ["\u0575", "y"], // յ → y
      ["\u0576", "n"], // ն → n
      ["\u0577", "\u0161"], // շ → š (U+0161)
      ["\u0578", "o"], // ο → o (no vo rule)
      ["\u0579", "\u010D\u02BF"], // չ → čʿ (č U+010D + U+02BF — H-M specific!)
      ["\u057A", "p"], // պ → p
      ["\u057B", "\u01F0"], // ջ → ǰ (U+01F0)
      ["\u057C", "\u1E59"], // ռ → ṙ (U+1E59)
      ["\u057D", "s"], // ς → s
      ["\u057E", "v"], // β → v
      ["\u057F", "t"], // τ → t
      ["\u0580", "r"], // ρ → r
      ["\u0581", "c\u02BF"], // ց → cʿ (c + U+02BF)
      ["\u0582", "w"], // ω → w
      ["\u0583", "p\u02BF"], // փ → pʿ (p + U+02BF)
      ["\u0584", "k\u02BF"], // ք → kʿ (k + U+02BF)
      ["\u0585", "\u014D"], // օ → ō (U+014D, o with macron — H-M specific!)
      ["\u0586", "f"], // ֆ → f
    ])("բ%sβ → b%sb", (ch, expected) => {
      expect(t(mid(ch))).toBe(`b${expected}b`);
    });
  });

  // ─────────────────────────────────────────────────────────────────────────
  // All 38 uppercase single-letter words
  // H-M has no context rules, so uppercase is straightforward capitalisation.
  // ─────────────────────────────────────────────────────────────────────────
  describe("38 uppercase single-letter words", () => {
    test.each([
      ["\u0531", "A"], // Ա → A
      ["\u0532", "B"], // Բ → B
      ["\u0533", "G"], // Γ → G
      ["\u0534", "D"], // Δ → D
      ["\u0535", "E"], // Ε → E (no YE prefix!)
      ["\u0536", "Z"], // Ζ → Z
      ["\u0537", "\u0112"], // Η → Ē (U+0112)
      ["\u0538", "\u018F"], // Θ → Ə (capital schwa U+018F)
      ["\u0539", "T\u02BF"], // Θ → Tʿ
      ["\u053A", "\u017D"], // Ι → Ž (U+017D)
      ["\u053B", "I"], // Ι → I
      ["\u053C", "L"], // Κ → L
      ["\u053D", "X"], // Λ → X
      ["\u053E", "C"], // Μ → C (plain, no diacritic!)
      ["\u053F", "K"], // Ν → K
      ["\u0540", "H"], // Ξ → H
      ["\u0541", "J"], // Ο → J
      ["\u0542", "\u0141"], // Π → Ł (L with stroke U+0141)
      ["\u0543", "\u010C"], // Ρ → Č (U+010C, no dot below)
      ["\u0544", "M"], // Σ → M
      ["\u0545", "Y"], // Τ → Y
      ["\u0546", "N"], // Υ → N
      ["\u0547", "\u0160"], // Φ → Š (U+0160)
      ["\u0548", "O"], // Ο → O (no VO!)
      ["\u0549", "\u010C\u02BF"], // Χ → Čʿ (Č + U+02BF)
      ["\u054A", "P"], // Ψ → P
      ["\u054B", "J\u030C"], // Ω → J̌ (J + combining caron U+030C)
      ["\u054C", "\u1E58"], // Ρ → Ṙ (U+1E58, capital R dot above)
      ["\u054D", "S"], // Σ → S
      ["\u054E", "V"], // Β → V
      ["\u054F", "T"], // Τ → T
      ["\u0550", "R"], // Υ → R
      ["\u0551", "C\u02BF"], // Ω → Cʿ
      ["\u0552", "W"], // Ω → W
      ["\u0553", "P\u02BF"], // Φ → Pʿ
      ["\u0554", "K\u02BF"], // Ψ → Kʿ
      ["\u0555", "\u014C"], // Ω → Ō (U+014C, capital O with macron)
      ["\u0556", "F"], // Φ → F
    ])("%s → %s", (armenian, expected) => {
      expect(t(armenian)).toBe(expected);
    });
  });

  // ─────────────────────────────────────────────────────────────────────────
  // No word-initial context rules
  // ─────────────────────────────────────────────────────────────────────────
  describe("no word-initial context rules", () => {
    test("ε (isolated) → e (not ye)", () => {
      expect(t("\u0565")).toBe("e");
    });

    test("Ε (isolated) → E (not YE)", () => {
      expect(t("\u0535")).toBe("E");
    });

    test("ε+κ (word-initial) → ek (not yek)", () => {
      expect(t("\u0565\u056F")).toBe("ek");
    });

    test("ο (isolated) → o (not vo)", () => {
      expect(t("\u0578")).toBe("o");
    });

    test("Ο (isolated) → O (not VO)", () => {
      expect(t("\u0548")).toBe("O");
    });

    test("ο+ν (word-initial) → on (not von)", () => {
      expect(t("\u0578\u0576")).toBe("on");
    });

    test("ο+χ+ι (word-initial + χ) → očʿi (not vočʿi)", () => {
      // χ(U+0579)→čʿ (U+010D+U+02BF)
      expect(t("\u0578\u0579\u056B")).toBe("o\u010D\u02BFi");
    });
  });

  // ─────────────────────────────────────────────────────────────────────────
  // H-M specific character distinctions
  // ─────────────────────────────────────────────────────────────────────────
  describe("H-M specific character mappings", () => {
    test("ε (U+0568 ը) → ə (schwa U+0259), not ë or ě", () => {
      expect(t("\u0568")).toBe("\u0259");
    });

    test("ρ (U+0572 ղ) → ł (l-stroke U+0142), not gh or ġ", () => {
      expect(t("\u0572")).toBe("\u0142");
    });

    test("σ (U+0573 ճ) → č (U+010D, no dot below), not ch or č̣", () => {
      expect(t("\u0573")).toBe("\u010D");
    });

    test("χ (U+0579 չ) → čʿ (č + U+02BF), not ch or č", () => {
      expect(t("\u0579")).toBe("\u010D\u02BF");
    });

    test("ε (U+0585 օ) → ō (o-macron U+014D), not o or ò", () => {
      expect(t("\u0585")).toBe("\u014D");
    });

    test("ψ (U+056E ծ) → c (plain c), not ts or c̣", () => {
      expect(t("\u056E")).toBe("c");
    });
  });

  // ─────────────────────────────────────────────────────────────────────────
  // Sequence: ου (U+0578 + U+0582) → ow (independent char mapping)
  // ─────────────────────────────────────────────────────────────────────────
  describe("sequence ου (U+0578+U+0582) → ow", () => {
    test("ου (isolated) → ow", () => {
      expect(t("\u0578\u0582")).toBe("ow");
    });

    test("Ου (standalone) → Ow", () => {
      expect(t("\u0548\u0582")).toBe("Ow");
    });

    test("ο+υ+ρ+α+χ (Ουrakh) → Owrax", () => {
      expect(t("\u0548\u0582\u0580\u0561\u056D")).toBe("Owrax");
    });

    test("β+ου+β (mid-word) → bowb", () => {
      expect(t(`${B}\u0578\u0582${B}`)).toBe("bowb");
    });
  });

  // ─────────────────────────────────────────────────────────────────────────
  // Sequence: and (U+0587) → ew (always)
  // ─────────────────────────────────────────────────────────────────────────
  describe("sequence and (U+0587) → ew", () => {
    test("and (isolated) → ew", () => {
      expect(t("\u0587")).toBe("ew");
    });

    test("β+and+β (mid-word) → bewb", () => {
      expect(t(`${B}\u0587${B}`)).toBe("bewb");
    });

    test("Μεζ and Δζεζ (standalone) → Mez ew Dzez", () => {
      expect(t("\u0544\u0565\u0566 \u0587 \u0534\u0566\u0565\u0566")).toBe(
        "Mez ew Dzez",
      );
    });
  });

  // ─────────────────────────────────────────────────────────────────────────
  // εω traditional (U+0565 + U+0582) — no sequence mapping;
  // independent: ε→e, ω→w → "ew"
  // ─────────────────────────────────────────────────────────────────────────
  describe("εω traditional (U+0565+U+0582) → ew (independent mapping)", () => {
    test("ε+ω (isolated) → ew", () => {
      expect(t("\u0565\u0582")).toBe("ew");
    });

    test("β+ε+ω+β (mid-word) → bewb", () => {
      expect(t(`${B}\u0565\u0582${B}`)).toBe("bewb");
    });
  });

  // ─────────────────────────────────────────────────────────────────────────
  // Punctuation (same as ISO 9985)
  // ─────────────────────────────────────────────────────────────────────────
  describe("punctuation mappings", () => {
    test("\u0589 → .", () => {
      expect(t("\u0532\u0561\u0580\u0565\u0582\u0589")).toBe("Barew.");
    });

    test("\u055E → ?", () => {
      // χ(U+0579 չ)→čʿ, ου→ow → "InčʿoW?"
      expect(t("\u053B\u0576\u0579\u0578\u0582\u055E")).toBe(
        "In\u010D\u02BFow?",
      );
    });

    test("\u055D → ,", () => {
      expect(t("\u0531\u0575\u057D\u0578\u0580\u055D")).toBe("Aysor,");
    });

    test("\u055C → !", () => {
      expect(t("\u0532\u0561\u0580\u0565\u0582\u055C")).toBe("Barew!");
    });

    test("\u00AB\u00BB → double quotes", () => {
      expect(t("\u00AB\u0532\u0561\u0580\u0565\u0582\u00BB")).toBe('"Barew"');
    });
  });

  // ─────────────────────────────────────────────────────────────────────────
  // Full Armenian word transliterations
  // ─────────────────────────────────────────────────────────────────────────
  describe("full Armenian word transliterations", () => {
    test.each([
      // Hayastan — ρ(U+0575 յ)→y standalone, then υα→ya... but ρ+α = y+a (not "я" in H-M!)
      // Actually H-M has no sequence for υα, so it's just y+a
      ["\u0540\u0561\u0575\u0561\u057D\u057F\u0561\u0576", "Hayastan"],
      // Kentron
      ["\u053F\u0565\u0576\u057F\u0580\u0578\u0576", "Kentron"],
      // Yerevan — Ε→E (no Ye), ρ→ṙ, and→ew, α→a, ν→n → "Eṙewan"
      ["\u0535\u057C\u0587\u0561\u0576", "E\u1E59ewan"],
      // Ooghjuyn — Ο→O (no Vo!), ρ→ł, ч→ǰ, ου→ow
      ["\u0548\u0572\u057B\u0578\u0582\u0575\u0576", "O\u0142\u01F0owyn"],
      // Tigran
      ["\u054F\u056B\u0563\u0580\u0561\u0576", "Tigran"],
      // Shogher — Σ→Š, ο→o (mid-word), ρ→ł, ε→e, ρ→r → "Šołer"
      ["\u0547\u0578\u0572\u0565\u0580", "\u0160o\u0142er"],
      // Oski — Ο→O (no Vo)
      ["\u0548\u057D\u056F\u056B", "Oski"],
      // aghjik — ρ→ł, ч→ǰ → "ałǰik"
      ["\u0561\u0572\u057B\u056B\u056F", "a\u0142\u01F0ik"],
      // Armenia
      ["\u0531\u0580\u0574\u0565\u0576\u056B\u0561", "Armenia"],
      // inks (himself): ι+ν+κ(U+0584→kʿ=k+U+02BF)+ε(U+0568→ə=U+0259)
      ["\u056B\u0576\u0584\u0568", "ink\u02BF\u0259"],
      // karogh (can/able): κ+α+ρ+ο(mid)+ρ(U+0572→ł=U+0142)
      ["\u056F\u0561\u0580\u0578\u0572", "karo\u0142"],
      // naev (also): ν+α+and(U+0587→ew)
      ["\u0576\u0561\u0587", "naew"],
      // mej (inside): μ+ε+ч(U+057B→ǰ=U+01F0)
      ["\u0574\u0565\u057B", "me\u01F0"],
      // te (if/or): θ(U+0569→tʿ=t+U+02BF)+ε
      ["\u0569\u0565", "t\u02BFe"],
      // voch (not/no): ο→o+χ(U+0579→čʿ=U+010D+U+02BF)
      ["\u0578\u0579", "o\u010D\u02BF"],
      // yes (I): ε→e (no word-initial rule)+ς
      ["\u0565\u057D", "es"],
    ])('"%s" → "%s"', (armenian, expected) => {
      expect(t(armenian)).toBe(expected);
    });
  });

  // ─────────────────────────────────────────────────────────────────────────
  // Multi-word phrase transliterations
  // ─────────────────────────────────────────────────────────────────────────
  describe("multi-word phrase transliterations", () => {
    test("Nor u norits — ου standalone = ow, ς(U+0581)→cʿ", () => {
      // ν+ο+ρ+ι+ς: cʿ at end → "noricʿ"
      expect(
        t("\u0546\u0578\u0580 \u0578\u0582 \u0576\u0578\u0580\u056B\u0581"),
      ).toBe("Nor ow noric\u02BF");
    });

    test("Oski Ōr (Ο→O, Ο+ρ→Ō+r — Ο title-case → Ō)", () => {
      // Ο(U+0555 Օ)→Ō, uppercase title-case → Ō; ρ(U+0580 ρ)→r → "Ōr"
      expect(t("\u0548\u057D\u056F\u056B \u0555\u0580")).toBe("Oski \u014Cr");
    });

    test("Mez ew Dzez (and standalone → ew)", () => {
      expect(t("\u0544\u0565\u0566 \u0587 \u0534\u0566\u0565\u0566")).toBe(
        "Mez ew Dzez",
      );
    });
  });
});
