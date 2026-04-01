/**
 * ALA-LC (American Library Association – Library of Congress) standard —
 * comprehensive character mapping tests.
 *
 * ALA-LC is similar to BGN/PCGN but uses aspirate modifiers (U+02BB turned comma)
 * and ě (U+011B) for ը instead of ə.
 *
 * Key differences from BGN/PCGN:
 *   ը U+0568 → ě  (U+011B, e with caron) instead of ə
 *   թ U+0569 → tʻ (t + U+02BB modifier letter turned comma)
 *   ց U+0581 → tsʻ (ts + U+02BB)
 *   փ U+0583 → pʻ (p + U+02BB)
 *   ք U+0584 → kʻ (k + U+02BB)
 *   խ U+056D → kh (same as BGN)
 *   ձ U+0571 → dz (same as BGN)
 *
 * Word-initial context rules (same as BGN/PCGN):
 *   ε (U+0565) word-initial → ye
 *   ο (U+0578) word-initial + notFollowedBy[vowels/β] → vo
 *
 * Sequences:
 *   ου (U+0578+U+0582) → u
 *   and (U+0587) → ev / yev
 *   ε+β (U+0565+U+057E) → ev / yev
 *   εω traditional (U+0565+U+0582) → yeu word-initial / eu mid-word
 *     (ALA-LC has no sequence mapping for εω, so it resolves ε→ye (word-initial)+ω→u)
 *
 * Armenian codepoints: see bgn-pcgn.test.ts for reference.
 */
import { transliterate } from "../../src";

const t = (text: string) => transliterate(text, { standard: "ala-lc" });

const B = "\u0562"; // բ — neutral mid-word wrapper
const mid = (ch: string) => `${B}${ch}${B}`;

describe("ALA-LC standard", () => {
  // ─────────────────────────────────────────────────────────────────────────
  // All 38 lowercase letters in mid-word context
  // ─────────────────────────────────────────────────────────────────────────
  describe("38 lowercase letter mappings (mid-word context)", () => {
    test.each([
      ["\u0561", "a"], // ա → a
      ["\u0562", "b"], // բ → b
      ["\u0563", "g"], // գ → g
      ["\u0564", "d"], // դ → d
      ["\u0565", "e"], // ե → e (mid-word; no ye)
      ["\u0566", "z"], // զ → z
      ["\u0567", "e"], // է → e (same as ε, not ē like ISO)
      ["\u0568", "\u011B"], // ը → ě (U+011B, ALA-LC specific!)
      ["\u0569", "t\u02BB"], // թ → tʻ (t + U+02BB)
      ["\u056A", "zh"], // ժ → zh
      ["\u056B", "i"], // ի → i
      ["\u056C", "l"], // լ → l
      ["\u056D", "kh"], // խ → kh
      ["\u056E", "ts"], // ծ → ts
      ["\u056F", "k"], // կ → k
      ["\u0570", "h"], // հ → h
      ["\u0571", "dz"], // ձ → dz
      ["\u0572", "gh"], // ղ → gh
      ["\u0573", "ch"], // ճ → ch
      ["\u0574", "m"], // մ → m
      ["\u0575", "y"], // յ → y
      ["\u0576", "n"], // ն → n
      ["\u0577", "sh"], // շ → sh
      ["\u0578", "o"], // ο → o (mid-word; no vo)
      ["\u0579", "ch"], // չ → ch
      ["\u057A", "p"], // պ → p
      ["\u057B", "j"], // ջ → j
      ["\u057C", "r"], // ռ → r
      ["\u057D", "s"], // ς → s
      ["\u057E", "v"], // β → v
      ["\u057F", "t"], // τ → t
      ["\u0580", "r"], // ρ → r
      ["\u0581", "ts\u02BB"], // ց → tsʻ (ts + U+02BB)
      ["\u0582", "u"], // ω → u (same as BGN)
      ["\u0583", "p\u02BB"], // փ → pʻ (p + U+02BB)
      ["\u0584", "k\u02BB"], // ք → kʻ (k + U+02BB)
      ["\u0585", "o"], // օ → o
      ["\u0586", "f"], // ֆ → f
    ])("բ%sβ → b%sb", (ch, expected) => {
      expect(t(mid(ch))).toBe(`b${expected}b`);
    });
  });

  // ─────────────────────────────────────────────────────────────────────────
  // All 38 uppercase single-letter words
  // Ε (U+0535) isolated → YE (word-initial rule)
  // Ο (U+0548) isolated → VO (word-initial, nothing follows)
  // ─────────────────────────────────────────────────────────────────────────
  describe("38 uppercase single-letter words", () => {
    test.each([
      ["\u0531", "A"], // Ա → A
      ["\u0532", "B"], // Բ → B
      ["\u0533", "G"], // Γ → G
      ["\u0534", "D"], // Δ → D
      ["\u0535", "YE"], // Ε — word-initial → ye → YE
      ["\u0536", "Z"], // Ζ → Z
      ["\u0537", "E"], // Η → E
      ["\u0538", "\u011A"], // Θ → Ě (U+011A, capital E with caron)
      ["\u0539", "T\u02BB"], // Θ → Tʻ
      ["\u053A", "ZH"], // Ι → ZH
      ["\u053B", "I"], // Ι → I
      ["\u053C", "L"], // Κ → L
      ["\u053D", "KH"], // Λ → KH
      ["\u053E", "TS"], // Μ → TS
      ["\u053F", "K"], // Ν → K
      ["\u0540", "H"], // Ξ → H
      ["\u0541", "DZ"], // Ο → DZ
      ["\u0542", "GH"], // Π → GH
      ["\u0543", "CH"], // Ρ → CH
      ["\u0544", "M"], // Σ → M
      ["\u0545", "Y"], // Τ → Y
      ["\u0546", "N"], // Υ → N
      ["\u0547", "SH"], // Φ → SH
      ["\u0548", "VO"], // Ο — isolated, nothing follows → VO
      ["\u0549", "CH"], // Χ → CH
      ["\u054A", "P"], // Ψ → P
      ["\u054B", "J"], // Ω → J
      ["\u054C", "R"], // Ρ → R
      ["\u054D", "S"], // Σ → S
      ["\u054E", "V"], // Β → V
      ["\u054F", "T"], // Τ → T
      ["\u0550", "R"], // Υ → R
      ["\u0551", "TS\u02BB"], // Ω → TSʻ
      ["\u0552", "U"], // Ω → U
      ["\u0553", "P\u02BB"], // Φ → Pʻ
      ["\u0554", "K\u02BB"], // Ψ → Kʻ
      ["\u0555", "O"], // Ω → O
      ["\u0556", "F"], // Φ → F
    ])("%s → %s", (armenian, expected) => {
      expect(t(armenian)).toBe(expected);
    });
  });

  // ─────────────────────────────────────────────────────────────────────────
  // Context rule: ε (U+0565) word-initial → ye (same as BGN/PCGN)
  // ─────────────────────────────────────────────────────────────────────────
  describe("ε (U+0565) word-initial → ye", () => {
    test("ε (isolated) → ye", () => {
      expect(t("\u0565")).toBe("ye");
    });

    test("Ε (isolated) → YE", () => {
      expect(t("\u0535")).toBe("YE");
    });

    test("ε+κ (word-initial) → yek", () => {
      expect(t("\u0565\u056F")).toBe("yek");
    });

    test("β+ε+β (mid-word ε) → beb (no ye)", () => {
      expect(t(mid("\u0565"))).toBe("beb");
    });

    test("Ε+ρ+and+α+ν (Yerevan) → Yerevan", () => {
      expect(t("\u0535\u057C\u0587\u0561\u0576")).toBe("Yerevan");
    });
  });

  // ─────────────────────────────────────────────────────────────────────────
  // Context rule: ο (U+0578) word-initial + notFollowedBy[vowels/β] → vo
  // ─────────────────────────────────────────────────────────────────────────
  describe("ο (U+0578) word-initial context rules", () => {
    test("ο (isolated) → vo", () => {
      expect(t("\u0578")).toBe("vo");
    });

    test("Ο (isolated) → VO", () => {
      expect(t("\u0548")).toBe("VO");
    });

    test("ο+ν (word-initial + consonant) → von", () => {
      expect(t("\u0578\u0576")).toBe("von");
    });

    test("ο+χ+ι (word-initial + χ) → vochi", () => {
      expect(t("\u0578\u0579\u056B")).toBe("vochi");
    });

    test("ο+β (ο followed by β — in VOWELS_AND_V) → ov, not vo", () => {
      expect(t("\u0578\u057E")).toBe("ov");
    });

    test("ο+α (ο followed by α — vowel) → oa, not vo", () => {
      expect(t("\u0578\u0561")).toBe("oa");
    });

    test("ο+ο (ο followed by ο — vowel) → oo, not vo", () => {
      expect(t("\u0578\u0578")).toBe("oo");
    });

    test("β+ο+β (mid-word ο) → bob, not bvo b", () => {
      expect(t(mid("\u0578"))).toBe("bob");
    });

    test("Ο+ς+κ+ι (Oski) → Voski", () => {
      expect(t("\u0548\u057D\u056F\u056B")).toBe("Voski");
    });
  });

  // ─────────────────────────────────────────────────────────────────────────
  // Sequence: ου (U+0578 + U+0582) → u (same as BGN)
  // ─────────────────────────────────────────────────────────────────────────
  describe("sequence ου (U+0578+U+0582) → u", () => {
    test("ου (isolated) → u", () => {
      expect(t("\u0578\u0582")).toBe("u");
    });

    test("Ου standalone → U", () => {
      expect(t("\u0548\u0582")).toBe("U");
    });

    test("ο+υ+ρ+α+χ (Urakh) → Urakh", () => {
      expect(t("\u0548\u0582\u0580\u0561\u056D")).toBe("Urakh");
    });

    test("β+ου+β (mid-word) → bub", () => {
      expect(t(`${B}\u0578\u0582${B}`)).toBe("bub");
    });
  });

  // ─────────────────────────────────────────────────────────────────────────
  // Sequence: and (U+0587) → ev / yev (same as BGN)
  // ─────────────────────────────────────────────────────────────────────────
  describe("sequence and (U+0587) → ev / yev", () => {
    test("and (isolated) → yev", () => {
      expect(t("\u0587")).toBe("yev");
    });

    test("β+and+β (mid-word) → bevb", () => {
      expect(t(`${B}\u0587${B}`)).toBe("bevb");
    });

    test("Μεζ and Δζεζ (standalone) → Mez yev Dzez", () => {
      expect(t("\u0544\u0565\u0566 \u0587 \u0534\u0566\u0565\u0566")).toBe(
        "Mez yev Dzez",
      );
    });

    test("δ+ε+ρ+and+ς → derevs", () => {
      expect(t("\u0564\u0565\u057C\u0587\u057D")).toBe("derevs");
    });
  });

  // ─────────────────────────────────────────────────────────────────────────
  // Sequence: ε+β (U+0565 + U+057E) → ev / yev (same as BGN)
  // ─────────────────────────────────────────────────────────────────────────
  describe("sequence ε+β (U+0565+U+057E) → ev / yev", () => {
    test("ε+β (isolated) → yev", () => {
      expect(t("\u0565\u057E")).toBe("yev");
    });

    test("Ε+β+ς (word-initial) → Yevs", () => {
      expect(t("\u0535\u057E\u057D")).toBe("Yevs");
    });

    test("β+ε+β+β (mid-word) → bevb", () => {
      expect(t(`${B}\u0565\u057E${B}`)).toBe("bevb");
    });
  });

  // ─────────────────────────────────────────────────────────────────────────
  // εω traditional (U+0565 + U+0582) — ALA-LC has NO sequence mapping for this.
  // Each letter maps independently: ε word-initial → ye, ω → u → "yeu"
  // Mid-word: ε → e, ω → u → "eu"
  // ─────────────────────────────────────────────────────────────────────────
  describe("εω traditional (U+0565+U+0582) — independent mapping (no sequence)", () => {
    test("ε+ω (isolated) → yeu (ε word-initial → ye, ω → u)", () => {
      expect(t("\u0565\u0582")).toBe("yeu");
    });

    test("β+ε+ω+β (mid-word) → beub (ε mid-word → e, ω → u)", () => {
      expect(t(`${B}\u0565\u0582${B}`)).toBe("beub");
    });
  });

  // ─────────────────────────────────────────────────────────────────────────
  // ALA-LC-specific aspirate distinctions
  // ─────────────────────────────────────────────────────────────────────────
  describe("ALA-LC aspirate modifier mappings", () => {
    test("θ (U+0569 թ) → tʻ (with U+02BB turned comma)", () => {
      expect(t("\u0569")).toBe("t\u02BB");
    });

    test("ω (U+0581 ց) → tsʻ", () => {
      expect(t("\u0581")).toBe("ts\u02BB");
    });

    test("φ (U+0583 փ) → pʻ", () => {
      expect(t("\u0583")).toBe("p\u02BB");
    });

    test("ψ (U+0584 ք) → kʻ", () => {
      expect(t("\u0584")).toBe("k\u02BB");
    });

    test("ε (U+0568 ը) → ě (U+011B)", () => {
      expect(t("\u0568")).toBe("\u011B");
    });
  });

  // ─────────────────────────────────────────────────────────────────────────
  // Punctuation
  // ─────────────────────────────────────────────────────────────────────────
  describe("punctuation mappings", () => {
    test("\u0589 → .", () => {
      expect(t("\u0532\u0561\u0580\u0565\u0582\u0589")).toBe("Bareu.");
    });

    test("\u055E → ?", () => {
      expect(t("\u053B\u0576\u0579\u0578\u0582\u055E")).toBe("Inchu?");
    });

    test("\u055D → ,", () => {
      expect(t("\u0531\u0575\u057D\u0578\u0580\u055D")).toBe("Aysor,");
    });

    test("\u055C → !", () => {
      expect(t("\u0532\u0561\u0580\u0565\u0582\u055C")).toBe("Bareu!");
    });

    test("\u00AB\u00BB → double quotes", () => {
      expect(t("\u00AB\u0532\u0561\u0580\u0565\u0582\u00BB")).toBe('"Bareu"');
    });
  });

  // ─────────────────────────────────────────────────────────────────────────
  // Full Armenian word transliterations
  // ─────────────────────────────────────────────────────────────────────────
  describe("full Armenian word transliterations", () => {
    test.each([
      ["\u0540\u0561\u0575\u0561\u057D\u057F\u0561\u0576", "Hayastan"],
      ["\u053F\u0565\u0576\u057F\u0580\u0578\u0576", "Kentron"],
      ["\u0535\u057C\u0587\u0561\u0576", "Yerevan"],
      ["\u0548\u0572\u057B\u0578\u0582\u0575\u0576", "Voghjuyn"],
      ["\u054F\u056B\u0563\u0580\u0561\u0576", "Tigran"],
      ["\u0547\u0578\u0572\u0565\u0580", "Shogher"],
      ["\u0548\u057D\u056F\u056B", "Voski"],
      ["\u0561\u0572\u057B\u056B\u056F", "aghjik"],
      ["\u0531\u0580\u0574\u0565\u0576\u056B\u0561", "Armenia"],
      ["\u056B\u0576\u0584\u0568", "ink\u02BB\u011B"],
      ["\u056F\u0561\u0580\u0578\u0572", "karogh"],
      ["\u0576\u0561\u0587", "naev"],
      ["\u0574\u0565\u057B", "mej"],
      ["\u0569\u0565", "t\u02BBe"],
      ["\u0578\u0579", "voch"],
      ["\u0565\u057D", "yes"],
    ])('"%s" → "%s"', (armenian, expected) => {
      expect(t(armenian)).toBe(expected);
    });
  });

  // ─────────────────────────────────────────────────────────────────────────
  // Multi-word phrase transliterations
  // ─────────────────────────────────────────────────────────────────────────
  describe("multi-word phrase transliterations", () => {
    test("Nor u norits", () => {
      // ν+ο+ρ+ι+ς: ν→n, ο→o (mid-word), ρ→r, ι→i, ς(U+0581 ց)→tsʻ → "noritsʻ"
      expect(
        t("\u0546\u0578\u0580 \u0578\u0582 \u0576\u0578\u0580\u056B\u0581"),
      ).toBe("Nor u norits\u02BB");
    });

    test("Voski Or", () => {
      expect(t("\u0548\u057D\u056F\u056B \u0555\u0580")).toBe("Voski Or");
    });

    test("Mez yev Dzez", () => {
      expect(t("\u0544\u0565\u0566 \u0587 \u0534\u0566\u0565\u0566")).toBe(
        "Mez yev Dzez",
      );
    });
  });
});
