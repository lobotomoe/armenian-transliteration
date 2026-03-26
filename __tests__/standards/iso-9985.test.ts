/**
 * ISO 9985:1996 standard — comprehensive character mapping tests.
 *
 * ISO 9985 is a fully reversible standard with diacritics.
 * There are NO word-initial context rules — every character maps
 * purely character-by-character regardless of position.
 *
 * Key diacritics used:
 *   ε U+0565 → e        (plain e, unlike BGN)
 *   ο U+0578 → o        (plain o, no vo rule)
 *   ε U+0567 → ē        (U+0113, e with macron)
 *   ε U+0568 → ë        (U+00EB, e with diaeresis)
 *   θ U+0569 → tʿ       (t + U+02BF left half ring)
 *   σ U+056A → ž        (U+017E, z with caron)
 *   χ U+056D → x        (plain x, unlike BGN kh)
 *   ψ U+056E → c̣       (c + U+0323 combining dot below)
 *   ρ U+0571 → j        (plain j)
 *   ρ U+0572 → ġ        (g + U+0307 combining dot above, displayed as ġ)
 *   σ U+0573 → č̣       (U+010D + U+0323)
 *   σ U+0577 → š        (U+0161, s with caron)
 *   χ U+0579 → č        (U+010D, c with caron)
 *   ρ U+057B → ǰ        (U+01F0, j with caron)
 *   ρ U+057C → ṙ        (U+1E59, r with dot above)
 *   ω U+0581 → cʿ       (c + U+02BF)
 *   ω U+0582 → w        (plain w, unlike BGN u)
 *   φ U+0583 → pʿ       (p + U+02BF)
 *   ψ U+0584 → kʿ       (k + U+02BF)
 *   ω U+0585 → ò        (U+00F2, o with grave)
 *
 * Sequence: ου (U+0578+U+0582) → "ow" (independent mapping of each char)
 *           and (U+0587) → "ew"
 *           ε+β (U+0565+U+057E) — no sequence mapping; ε→e, β→v independently
 */
import { transliterate } from "../../src";

const t = (text: string) => transliterate(text, { standard: "iso-9985" });

const B = "\u0562"; // բ — neutral mid-word wrapper
const mid = (ch: string) => `${B}${ch}${B}`;

describe("ISO 9985:1996 standard", () => {
  // ─────────────────────────────────────────────────────────────────────────
  // All 38 lowercase letters in mid-word context.
  // ISO 9985 has no word-initial rules so mid-word = word-initial for all.
  // ─────────────────────────────────────────────────────────────────────────
  describe("38 lowercase letter mappings (mid-word context)", () => {
    test.each([
      ["\u0561", "a"],                // ա → a
      ["\u0562", "b"],                // բ → b
      ["\u0563", "g"],                // գ → g
      ["\u0564", "d"],                // դ → d
      ["\u0565", "e"],                // ե → e (no word-initial rule)
      ["\u0566", "z"],                // զ → z
      ["\u0567", "\u0113"],           // է → ē (U+0113)
      ["\u0568", "\u00EB"],           // ը → ë (U+00EB)
      ["\u0569", "t\u02BF"],          // թ → tʿ (t + U+02BF)
      ["\u056A", "\u017E"],           // ժ → ž (U+017E)
      ["\u056B", "i"],                // ի → i
      ["\u056C", "l"],                // լ → l
      ["\u056D", "x"],                // խ → x (not kh!)
      ["\u056E", "c\u0323"],          // ծ → c̣ (c + U+0323)
      ["\u056F", "k"],                // կ → k
      ["\u0570", "h"],                // հ → h
      ["\u0571", "j"],                // ձ → j
      ["\u0572", "g\u0307"],          // ղ → ġ (g U+0067 + combining dot above U+0307; NOT precomposed U+0121)
      ["\u0573", "\u010D\u0323"],     // ճ → č̣ (U+010D + U+0323)
      ["\u0574", "m"],                // մ → m
      ["\u0575", "y"],                // յ → y
      ["\u0576", "n"],                // ն → n
      ["\u0577", "\u0161"],           // շ → š (U+0161)
      ["\u0578", "o"],                // ο → o (no vo rule)
      ["\u0579", "\u010D"],           // չ → č (U+010D)
      ["\u057A", "p"],                // պ → p
      ["\u057B", "\u01F0"],           // ջ → ǰ (U+01F0)
      ["\u057C", "\u1E59"],           // ռ → ṙ (U+1E59)
      ["\u057D", "s"],                // ς → s
      ["\u057E", "v"],                // β → v
      ["\u057F", "t"],                // τ → t
      ["\u0580", "r"],                // ρ → r
      ["\u0581", "c\u02BF"],          // ց → cʿ (c + U+02BF)
      ["\u0582", "w"],                // ω → w (not u!)
      ["\u0583", "p\u02BF"],          // փ → pʿ (p + U+02BF)
      ["\u0584", "k\u02BF"],          // ք → kʿ (k + U+02BF)
      ["\u0585", "\u00F2"],           // օ → ò (U+00F2)
      ["\u0586", "f"],                // ֆ → f
    ])("բ%sβ → b%sb", (ch, expected) => {
      expect(t(mid(ch))).toBe(`b${expected}b`);
    });
  });

  // ─────────────────────────────────────────────────────────────────────────
  // All 38 uppercase single-letter words.
  // ISO 9985 has no context rules, so uppercase = straightforward capitalisation.
  // ─────────────────────────────────────────────────────────────────────────
  describe("38 uppercase single-letter words", () => {
    test.each([
      ["\u0531", "A"],                 // Ա → A
      ["\u0532", "B"],                 // Բ → B
      ["\u0533", "G"],                 // Γ → G
      ["\u0534", "D"],                 // Δ → D
      ["\u0535", "E"],                 // Ε → E (no YE prefix in ISO!)
      ["\u0536", "Z"],                 // Ζ → Z
      ["\u0537", "\u0112"],            // Η → Ē (U+0112, capital E with macron)
      ["\u0538", "\u00CB"],            // Θ → Ë (U+00CB, capital E with diaeresis)
      ["\u0539", "T\u02BF"],           // Θ → Tʿ
      ["\u053A", "\u017D"],            // Ι → Ž (U+017D)
      ["\u053B", "I"],                 // Ι → I
      ["\u053C", "L"],                 // Κ → L
      ["\u053D", "X"],                 // Λ → X
      ["\u053E", "C\u0323"],           // Μ → C̣
      ["\u053F", "K"],                 // Ν → K
      ["\u0540", "H"],                 // Ξ → H
      ["\u0541", "J"],                 // Ο → J
      ["\u0542", "G\u0307"],           // Ղ → Ġ (G + combining dot above U+0307; NOT precomposed U+0121)
      ["\u0543", "\u010C\u0323"],      // Ρ → Č̣ (U+010C + U+0323)
      ["\u0544", "M"],                 // Σ → M
      ["\u0545", "Y"],                 // Τ → Y
      ["\u0546", "N"],                 // Υ → N
      ["\u0547", "\u0160"],            // Φ → Š (U+0160)
      ["\u0548", "O"],                 // Ο → O (no VO!)
      ["\u0549", "\u010C"],            // Χ → Č (U+010C)
      ["\u054A", "P"],                 // Ψ → P
      ["\u054B", "J\u030C"],           // Ջ → J̌ (J + U+030C combining caron — uppercase of ǰ U+01F0)
      ["\u054C", "\u1E58"],            // Ρ → Ṙ (U+1E58, capital R with dot above)
      ["\u054D", "S"],                 // Σ → S
      ["\u054E", "V"],                 // Β → V
      ["\u054F", "T"],                 // Τ → T
      ["\u0550", "R"],                 // Υ → R
      ["\u0551", "C\u02BF"],           // Ω → Cʿ
      ["\u0552", "W"],                 // Ω → W (capital of w)
      ["\u0553", "P\u02BF"],           // Φ → Pʿ
      ["\u0554", "K\u02BF"],           // Ψ → Kʿ
      ["\u0555", "\u00D2"],            // Ω → Ò (U+00D2, capital O with grave)
      ["\u0556", "F"],                 // Φ → F
    ])("%s → %s", (armenian, expected) => {
      expect(t(armenian)).toBe(expected);
    });
  });

  // ─────────────────────────────────────────────────────────────────────────
  // No word-initial context rules — ε and ο behave the same everywhere
  // ─────────────────────────────────────────────────────────────────────────
  describe("no word-initial context rules", () => {
    test("ε (isolated) → e (not ye)", () => {
      expect(t("\u0565")).toBe("e");
    });

    test("Ε (isolated) → E (not YE)", () => {
      expect(t("\u0535")).toBe("E");
    });

    test("ε+κ (word-initial ε) → ek (not yek)", () => {
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

    test("ο+χ+ι (word-initial + χ) → oči (not voči)", () => {
      expect(t("\u0578\u0579\u056B")).toBe("o\u010Di");
    });
  });

  // ─────────────────────────────────────────────────────────────────────────
  // Sequence: ου (U+0578 + U+0582) → "ow" (each char maps independently)
  // ο→o, ω→w — ISO 9985 does not merge them into a single "u"
  // ─────────────────────────────────────────────────────────────────────────
  describe("sequence ου (U+0578+U+0582) → ow (not u)", () => {
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
  // Sequence: and (U+0587) → "ew" (always, no context variants)
  // ─────────────────────────────────────────────────────────────────────────
  describe("sequence and (U+0587) → ew", () => {
    test("and (isolated) → ew", () => {
      expect(t("\u0587")).toBe("ew");
    });

    test("β+and+β (mid-word) → bewb", () => {
      expect(t(`${B}\u0587${B}`)).toBe("bewb");
    });

    test("Μεζ and Δζεζ (standalone) → Mez ew Dzez", () => {
      expect(t("\u0544\u0565\u0566 \u0587 \u0534\u0566\u0565\u0566")).toBe("Mez ew Dzez");
    });
  });

  // ─────────────────────────────────────────────────────────────────────────
  // Traditional εω (U+0565 + U+0582) — no sequence mapping in ISO 9985;
  // each letter maps independently: ε→e, ω→w → "ew"
  // ─────────────────────────────────────────────────────────────────────────
  describe("εω traditional (U+0565+U+0582) → ew (independent char mapping)", () => {
    test("ε+ω (isolated) → ew", () => {
      expect(t("\u0565\u0582")).toBe("ew");
    });

    test("β+ε+ω+β (mid-word) → bewb", () => {
      expect(t(`${B}\u0565\u0582${B}`)).toBe("bewb");
    });
  });

  // ─────────────────────────────────────────────────────────────────────────
  // ε+β (U+0565 + U+057E) — no sequence mapping; ε→e, β→v → "ev"
  // (No yev prefix unlike BGN/ALA-LC)
  // ─────────────────────────────────────────────────────────────────────────
  describe("ε+β (U+0565+U+057E) → ev (independent, no yev)", () => {
    test("ε+β (isolated) → ev (not yev)", () => {
      expect(t("\u0565\u057E")).toBe("ev");
    });

    test("Ε+β+ς (word-initial) → Evs (not Yevs)", () => {
      expect(t("\u0535\u057E\u057D")).toBe("Evs");
    });

    test("β+ε+β+β (mid-word) → bevb", () => {
      expect(t(`${B}\u0565\u057E${B}`)).toBe("bevb");
    });
  });

  // ─────────────────────────────────────────────────────────────────────────
  // Punctuation (same as BGN/PCGN)
  // ─────────────────────────────────────────────────────────────────────────
  describe("punctuation mappings", () => {
    test("\u0589 (Armenian full stop ։) → .", () => {
      expect(t("\u0532\u0561\u0580\u0565\u0582\u0589")).toBe("Barew.");
    });

    test("\u055E (Armenian question mark ՞) → ?", () => {
      // Ι(U+053B)+ν(U+0576)+χ(U+0579)+ου(U+0578+U+0582)+՞(U+055E)
      // χ(U+0579)→č(U+010D), ο→o, ω→w → "Inčow?"
      expect(t("\u053B\u0576\u0579\u0578\u0582\u055E")).toBe("In\u010Dow?");
    });

    test("\u055D (Armenian comma ՝) → ,", () => {
      expect(t("\u0531\u0575\u057D\u0578\u0580\u055D")).toBe("Aysor,");
    });

    test("\u055C (Armenian exclamation ՜) → !", () => {
      expect(t("\u0532\u0561\u0580\u0565\u0582\u055C")).toBe("Barew!");
    });

    test("\u00AB\u00BB (guillemets) → double quotes", () => {
      expect(t("\u00AB\u0532\u0561\u0580\u0565\u0582\u00BB")).toBe('"Barew"');
    });
  });

  // ─────────────────────────────────────────────────────────────────────────
  // Full Armenian word transliterations
  // ─────────────────────────────────────────────────────────────────────────
  describe("full Armenian word transliterations", () => {
    test.each([
      // Hayastan (same as BGN — no special chars)
      ["\u0540\u0561\u0575\u0561\u057D\u057F\u0561\u0576", "Hayastan"],
      // Κentron (same)
      ["\u053F\u0565\u0576\u057F\u0580\u0578\u0576", "Kentron"],
      // Yerevan — ISO: Ε→E (not Ye), ρ→ṙ, and→ew
      ["\u0535\u057C\u0587\u0561\u0576", "E\u1E59ewan"],
      // Ooghjuyn — ISO: ο→o (no vo), ρ→g+U+0307 (ġ), ч→ǰ(U+01F0), ου→ow
      ["\u0548\u0572\u057B\u0578\u0582\u0575\u0576", "Og\u0307\u01F0owyn"],
      // Tigran (same)
      ["\u054F\u056B\u0563\u0580\u0561\u0576", "Tigran"],
      // Shogher — ISO: Σ→Š, ο→o (mid-word, no vo), ρ→g+U+0307 (ġ), ε→e
      ["\u0547\u0578\u0572\u0565\u0580", "\u0160og\u0307er"],
      // Voski — ISO: Ο→O (no Vo!)
      ["\u0548\u057D\u056F\u056B", "Oski"],
      // aghjik — ISO: ρ→g+U+0307 (ġ), ч→ǰ (U+01F0)
      ["\u0561\u0572\u057B\u056B\u056F", "ag\u0307\u01F0ik"],
    ])('"%s" → "%s"', (armenian, expected) => {
      expect(t(armenian)).toBe(expected);
    });
  });
});
