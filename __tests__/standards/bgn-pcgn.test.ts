/**
 * BGN/PCGN standard — comprehensive character mapping tests.
 *
 * All expected values were verified against the live transliteration engine.
 * Armenian characters are specified as Unicode escapes to avoid any accidental
 * look-alike substitution.
 *
 * Codepoint reference for the 38 Armenian lowercase letters:
 *   ա U+0561  բ U+0562  գ U+0563  դ U+0564  ե U+0565  զ U+0566
 *   է U+0567  ը U+0568  թ U+0569  ժ U+056A  ի U+056B  լ U+056C
 *   խ U+056D  ծ U+056E  կ U+056F  հ U+0570  ձ U+0571  ղ U+0572
 *   ճ U+0573  մ U+0574  յ U+0575  ն U+0576  շ U+0577  ո U+0578
 *   չ U+0579  պ U+057A  ջ U+057B  ռ U+057C  ս U+057D  վ U+057E
 *   տ U+057F  ր U+0580  ց U+0581  ւ U+0582  փ U+0583  ք U+0584
 *   օ U+0585  ֆ U+0586
 *
 * Uppercase: U+0531–U+0556 (add 0x30 to lowercase codepoints)
 *
 * Special:
 *   և U+0587  (Armenian small ligature EW — always lowercase)
 */
import { transliterate } from "../../src";

const t = (text: string) => transliterate(text, { standard: "bgn-pcgn" });

// բ (U+0562) used as neutral wrapper for mid-word context tests
const B = "\u0562";
const mid = (ch: string) => `${B}${ch}${B}`;

describe("BGN/PCGN standard", () => {
  // ─────────────────────────────────────────────────────────────────────────
  // All 38 lowercase letters in mid-word context.
  // This prevents word-initial rules from firing on ե (U+0565) and ո (U+0578).
  // ─────────────────────────────────────────────────────────────────────────
  describe("38 lowercase letter mappings (mid-word context)", () => {
    test.each([
      ["\u0561", "a"], // ա
      ["\u0562", "b"], // բ
      ["\u0563", "g"], // գ
      ["\u0564", "d"], // դ
      ["\u0565", "e"], // ե — mid-word: e (no ye)
      ["\u0566", "z"], // զ
      ["\u0567", "e"], // է
      ["\u0568", "\u0259"], // ը → ə
      ["\u0569", "t"], // թ
      ["\u056A", "zh"], // ժ
      ["\u056B", "i"], // ի
      ["\u056C", "l"], // լ
      ["\u056D", "kh"], // խ
      ["\u056E", "ts"], // ծ
      ["\u056F", "k"], // կ
      ["\u0570", "h"], // հ
      ["\u0571", "dz"], // ձ
      ["\u0572", "gh"], // ղ
      ["\u0573", "ch"], // ճ
      ["\u0574", "m"], // մ
      ["\u0575", "y"], // յ
      ["\u0576", "n"], // ն
      ["\u0577", "sh"], // շ
      ["\u0578", "o"], // ո — mid-word: o (no vo)
      ["\u0579", "ch"], // չ
      ["\u057A", "p"], // պ
      ["\u057B", "j"], // ջ
      ["\u057C", "r"], // ռ
      ["\u057D", "s"], // ս
      ["\u057E", "v"], // վ
      ["\u057F", "t"], // տ
      ["\u0580", "r"], // ր
      ["\u0581", "ts"], // ց
      ["\u0582", "u"], // ւ
      ["\u0583", "p"], // փ
      ["\u0584", "k"], // ք
      ["\u0585", "o"], // օ
      ["\u0586", "f"], // ֆ
    ])("%s → b%sb", (ch, expected) => {
      expect(t(mid(ch))).toBe(`b${expected}b`);
    });
  });

  // ─────────────────────────────────────────────────────────────────────────
  // All 38 uppercase letters as isolated single-letter words.
  // Single-letter uppercase words are detected as all-caps by the engine,
  // so the output is the fully-uppercased version of the mapped string.
  // Ե (U+0535) → word-initial → "ye" → all-caps → "YE"
  // Ο (U+0548) → word-initial, isolated → "vo" → all-caps → "VO"
  // ─────────────────────────────────────────────────────────────────────────
  describe("38 uppercase single-letter words", () => {
    test.each([
      ["\u0531", "A"], // Ա
      ["\u0532", "B"], // Բ
      ["\u0533", "G"], // Գ
      ["\u0534", "D"], // Դ
      ["\u0535", "YE"], // Ε — word-initial → ye → all-caps → YE
      ["\u0536", "Z"], // Զ
      ["\u0537", "E"], // Է
      ["\u0538", "\u018F"], // Ը → Ə (capital schwa)
      ["\u0539", "T"], // Թ
      ["\u053A", "ZH"], // Ժ
      ["\u053B", "I"], // Ի
      ["\u053C", "L"], // Լ
      ["\u053D", "KH"], // Խ
      ["\u053E", "TS"], // Ծ
      ["\u053F", "K"], // Կ
      ["\u0540", "H"], // Հ
      ["\u0541", "DZ"], // Ձ
      ["\u0542", "GH"], // Ղ
      ["\u0543", "CH"], // Ճ
      ["\u0544", "M"], // Մ
      ["\u0545", "Y"], // Յ
      ["\u0546", "N"], // Ν
      ["\u0547", "SH"], // Շ
      ["\u0548", "VO"], // Ο — isolated, nothing follows → vo → VO
      ["\u0549", "CH"], // Չ
      ["\u054A", "P"], // Π
      ["\u054B", "J"], // Ջ
      ["\u054C", "R"], // Ռ
      ["\u054D", "S"], // Σ
      ["\u054E", "V"], // Β
      ["\u054F", "T"], // Τ
      ["\u0550", "R"], // Ρ
      ["\u0551", "TS"], // Ց
      ["\u0552", "U"], // Ւ
      ["\u0553", "P"], // Փ
      ["\u0554", "K"], // Ք
      ["\u0555", "O"], // Օ
      ["\u0556", "F"], // Ֆ
    ])("%s → %s", (armenian, expected) => {
      expect(t(armenian)).toBe(expected);
    });
  });

  // ─────────────────────────────────────────────────────────────────────────
  // Context rule: ե (U+0565) word-initial → "ye"
  // ─────────────────────────────────────────────────────────────────────────
  describe("ե (U+0565) word-initial → ye", () => {
    test("ե (isolated lowercase) → ye", () => {
      expect(t("\u0565")).toBe("ye");
    });

    test("Ε (isolated uppercase) → YE (all-caps single-letter word)", () => {
      expect(t("\u0535")).toBe("YE");
    });

    test("ե+կ (word-initial) → yek", () => {
      // ե (U+0565) + կ (U+056F)
      expect(t("\u0565\u056F")).toBe("yek");
    });

    test("Ε+ρ+ε+β+α+ν (Erewmore — title-case) → Yerevan", () => {
      // Ε(U+0535)+ρ(U+0580)+ε(U+0565, mid)+β(U+057E)+α(U+0561)+ν(U+0576)
      // but real Yerevan uses and: Ε+ρ+and+α+ν
      expect(t("\u0535\u057C\u0587\u0561\u0576")).toBe("Yerevan");
    });

    test("β+ε+β (mid-word ε) → beb (no ye)", () => {
      expect(t(mid("\u0565"))).toBe("beb");
    });

    test("ΕΡΕΒΑΝ all-caps → YEREVAN", () => {
      // Ε(U+0535)+Ρ(U+0550)+Ε(U+0535)+Β(U+054E)+Α(U+0531)+Ν(U+0546)
      expect(t("\u0535\u0550\u0535\u054E\u0531\u0546")).toBe("YEREVAN");
    });
  });

  // ─────────────────────────────────────────────────────────────────────────
  // Context rule: ο (U+0578) word-initial + notFollowedBy[vowels/վ] → "vo"
  // VOWELS_AND_V = [ա U+0561, ε U+0565, ε U+0567, ε U+0568, ι U+056B,
  //                ο U+0578, ο U+0585, β U+057E]
  // ─────────────────────────────────────────────────────────────────────────
  describe("ο (U+0578) word-initial context rules", () => {
    test("ο (isolated, nothing follows) → vo", () => {
      expect(t("\u0578")).toBe("vo");
    });

    test("Ο (isolated) → VO", () => {
      expect(t("\u0548")).toBe("VO");
    });

    test("ο+ν (word-initial + consonant) → von", () => {
      expect(t("\u0578\u0576")).toBe("von");
    });

    test("ο+χ (word-initial + χ U+0579) → voch", () => {
      // ο(U+0578) + χ(U+0579) + ι(U+056B)
      expect(t("\u0578\u0579\u056B")).toBe("vochi");
    });

    test("ο+β (ο followed by β U+057E — in VOWELS_AND_V) → ov, not vo", () => {
      expect(t("\u0578\u057E")).toBe("ov");
    });

    test("ο+α (ο followed by α U+0561 — vowel) → oa, not vo", () => {
      expect(t("\u0578\u0561")).toBe("oa");
    });

    test("ο+ο (ο followed by ο U+0578 — vowel) → oo, not vo", () => {
      expect(t("\u0578\u0578")).toBe("oo");
    });

    test("ο+ι (ο followed by ι U+056B — vowel) → oi, not vo", () => {
      expect(t("\u0578\u056B")).toBe("oi");
    });

    test("β+ο+β (mid-word ο) → bob, not bvo b", () => {
      expect(t(mid("\u0578"))).toBe("bob");
    });

    test("Ο+ν (Ο word-initial + consonant) → Von", () => {
      expect(t("\u0548\u0576")).toBe("Von");
    });

    test("Ο+β (Ο followed by β — VOWELS_AND_V) → Ov, not Vo", () => {
      expect(t("\u0548\u057E")).toBe("Ov");
    });

    test("Ο+ς+κ+ι (Oski) → Voski", () => {
      expect(t("\u0548\u057D\u056F\u056B")).toBe("Voski");
    });
  });

  // ─────────────────────────────────────────────────────────────────────────
  // Sequence: ου (U+0578 + U+0582) → "u"
  // ─────────────────────────────────────────────────────────────────────────
  describe("sequence ου (U+0578+U+0582) → u", () => {
    test("ου (isolated) → u", () => {
      expect(t("\u0578\u0582")).toBe("u");
    });

    test("Ου (standalone — title-case digraph) → U", () => {
      // Ο(U+0548) + ω(U+0582) — engine treats the uppercase Ο as start, ω as part of digraph
      expect(t("\u0548\u0582")).toBe("U");
    });

    test("ο+υ+ρ+α+χ (Ουrakh) → Urakh", () => {
      // Ο(U+0548)+ω(U+0582)+ρ(U+0580)+α(U+0561)+χ(U+056D)
      expect(t("\u0548\u0582\u0580\u0561\u056D")).toBe("Urakh");
    });

    test("β+ου+β (mid-word) → bub", () => {
      expect(t(`${B}\u0578\u0582${B}`)).toBe("bub");
    });

    test("ΤΙΜΟΥΡ all-caps → TIMUR", () => {
      // Τ(U+054F)+Ι(U+053B)+Μ(U+0544)+Ο(U+0548)+Υ(U+0552)+Ρ(U+0550)
      expect(t("\u054F\u053B\u0544\u0548\u0582\u0550")).toBe("TIMUR");
    });
  });

  // ─────────────────────────────────────────────────────────────────────────
  // Sequence: and ligature (U+0587) → "ev" mid-word / "yev" word-initial
  // ─────────────────────────────────────────────────────────────────────────
  describe("sequence and (U+0587) → ev / yev", () => {
    test("and (isolated) → yev", () => {
      expect(t("\u0587")).toBe("yev");
    });

    test("β+and+β (mid-word and) → bevb", () => {
      expect(t(`${B}\u0587${B}`)).toBe("bevb");
    });

    test("δ+ε+ρ+and+ς (mid-word and) → derevs", () => {
      // δ(U+0564)+ε(U+0565)+ρ(U+057C)+and(U+0587)+ς(U+057D) — same as test word δεραλδ-ς
      expect(t("\u0564\u0565\u057C\u0587\u057D")).toBe("derevs");
    });

    test("standalone and between words (Μεζ and Δζεζ) → Mez yev Dzez", () => {
      // Μ(U+0544)+ε(U+0565)+ζ(U+0566) [space] and(U+0587) [space] Δ(U+0534)+ζ(U+0566)+ε(U+0565)+ζ(U+0566)
      expect(t("\u0544\u0565\u0566 \u0587 \u0534\u0566\u0565\u0566")).toBe(
        "Mez yev Dzez",
      );
    });
  });

  // ─────────────────────────────────────────────────────────────────────────
  // Sequence: ε+β (U+0565 + U+057E) → "ev" mid-word / "yev" word-initial
  // ─────────────────────────────────────────────────────────────────────────
  describe("sequence ε+β (U+0565+U+057E) → ev / yev", () => {
    test("ε+β (isolated) → yev", () => {
      expect(t("\u0565\u057E")).toBe("yev");
    });

    test("Ε+β+ς (word-initial) → Yevs", () => {
      // Ε(U+0535)+β(U+057E)+ς(U+057D)
      expect(t("\u0535\u057E\u057D")).toBe("Yevs");
    });

    test("β+ε+β+β (mid-word ε+β) → bevb", () => {
      expect(t(`${B}\u0565\u057E${B}`)).toBe("bevb");
    });
  });

  // ─────────────────────────────────────────────────────────────────────────
  // Sequence: traditional εω (U+0565 + U+0582) → "ev" mid-word / "yev" word-initial
  // ─────────────────────────────────────────────────────────────────────────
  describe("sequence εω traditional (U+0565+U+0582) → ev / yev", () => {
    test("ε+ω (isolated) → yev", () => {
      expect(t("\u0565\u0582")).toBe("yev");
    });

    test("β+ε+ω+β (mid-word) → bevb", () => {
      expect(t(`${B}\u0565\u0582${B}`)).toBe("bevb");
    });

    test("Β+α+ρ+ε+ω (Barev — classical spelling) → Barev", () => {
      // Β(U+0532)+α(U+0561)+ρ(U+0580)+ε(U+0565)+ω(U+0582)
      expect(t("\u0532\u0561\u0580\u0565\u0582")).toBe("Barev");
    });
  });

  // ─────────────────────────────────────────────────────────────────────────
  // Punctuation
  // ─────────────────────────────────────────────────────────────────────────
  describe("punctuation mappings", () => {
    test("\u0589 (Armenian full stop ։) → .", () => {
      expect(t("\u0532\u0561\u0580\u0565\u0582\u0589")).toBe("Barev.");
    });

    test("\u055E (Armenian question mark ՞) → ?", () => {
      expect(t("\u053B\u0576\u0579\u0578\u0582\u055E")).toBe("Inchu?");
    });

    test("\u055D (Armenian comma ՝) → ,", () => {
      expect(t("\u0531\u0575\u057D\u0578\u0580\u055D")).toBe("Aysor,");
    });

    test("\u055C (Armenian exclamation ՜) → !", () => {
      expect(t("\u0532\u0561\u0580\u0565\u0582\u055C")).toBe("Barev!");
    });

    test("\u00AB (left guillemet «) → double quote", () => {
      expect(t("\u00AB\u0532\u0561\u0580\u0565\u0582\u00BB")).toBe('"Barev"');
    });
  });

  // ─────────────────────────────────────────────────────────────────────────
  // Full Armenian word transliterations (known-good)
  // ─────────────────────────────────────────────────────────────────────────
  describe("full Armenian word transliterations", () => {
    test.each([
      // Հayastan: Հ(U+0540)+α(U+0561)+յ(U+0575)+α(U+0561)+ς(U+057D)+τ(U+057F)+α(U+0561)+ν(U+0576)
      ["\u0540\u0561\u0575\u0561\u057D\u057F\u0561\u0576", "Hayastan"],
      // Κentron: Κ(U+053F)+ε(U+0565)+ν(U+0576)+τ(U+057F)+ρ(U+0580)+ο(U+0578)+ν(U+0576)
      ["\u053F\u0565\u0576\u057F\u0580\u0578\u0576", "Kentron"],
      // Ερεβαν with and: Ε(U+0535)+ρ(U+057C)+and(U+0587)+α(U+0561)+ν(U+0576)
      ["\u0535\u057C\u0587\u0561\u0576", "Yerevan"],
      // Ooghjuyn: Ο(U+0548)+ρ(U+0572)+ч(U+057B)+ο+υ(U+0578+U+0582)+υ(U+0575)+ν(U+0576)
      ["\u0548\u0572\u057B\u0578\u0582\u0575\u0576", "Voghjuyn"],
      // Τιγραν: Τ(U+054F)+ι(U+056B)+γ(U+0563)+ρ(U+0580)+α(U+0561)+ν(U+0576)
      ["\u054F\u056B\u0563\u0580\u0561\u0576", "Tigran"],
      // Shogher: Σ(U+0547)+ο(U+0578)+ρ(U+0572)+ε(U+0565)+ρ(U+0580)
      ["\u0547\u0578\u0572\u0565\u0580", "Shogher"],
      // Oski: Ο(U+0548)+ς(U+057D)+κ(U+056F)+ι(U+056B)
      ["\u0548\u057D\u056F\u056B", "Voski"],
      // Aghjik: α(U+0561)+ρ(U+0572)+ч(U+057B)+ι(U+056B)+κ(U+056F)
      ["\u0561\u0572\u057B\u056B\u056F", "aghjik"],
      // Meghedi: Μ(U+0544)+ε(U+0565)+ρ(U+0572)+ε(U+0565)+δ(U+0564)+ι(U+056B)
      ["\u0544\u0565\u0572\u0565\u0564\u056B", "Meghedi"],
      // Armenia: Α(U+0531)+ρ(U+0580)+μ(U+0574)+ε(U+0565)+ν(U+0576)+ι(U+056B)+α(U+0561)
      ["\u0531\u0580\u0574\u0565\u0576\u056B\u0561", "Armenia"],
      // inks (himself): ι(U+056B)+ν(U+0576)+κ(U+0584)+ε(U+0568) → i+n+k+ə(U+0259)
      ["\u056B\u0576\u0584\u0568", "ink\u0259"],
      // karogh (can/able): κ(U+056F)+α(U+0561)+ρ(U+0580)+ο(U+0578)+ρ(U+0572) → k+a+r+o+gh
      ["\u056F\u0561\u0580\u0578\u0572", "karogh"],
      // naev (also): ν(U+0576)+α(U+0561)+and(U+0587) → n+a+ev (and mid-word)
      ["\u0576\u0561\u0587", "naev"],
      // mej (inside): μ(U+0574)+ε(U+0565)+ч(U+057B) → m+e(mid)+j
      ["\u0574\u0565\u057B", "mej"],
      // te (if/or): θ(U+0569)+ε(U+0565) → t+e(mid)
      ["\u0569\u0565", "te"],
      // voch (not/no): ο(U+0578)+χ(U+0579) → vo+ch (word-initial ο rule)
      ["\u0578\u0579", "voch"],
      // yes (I): ε(U+0565)+ς(U+057D) → ye+s (word-initial ε rule)
      ["\u0565\u057D", "yes"],
    ])('"%s" → "%s"', (armenian, expected) => {
      expect(t(armenian)).toBe(expected);
    });
  });

  // ─────────────────────────────────────────────────────────────────────────
  // Multi-word phrase transliterations
  // ─────────────────────────────────────────────────────────────────────────
  describe("multi-word phrase transliterations", () => {
    test("Nor u norits (ου standalone = u)", () => {
      // Ν(U+0546)+ο(U+0578)+ρ(U+0580) [space] ου(U+0578+U+0582) [space] ν(U+0576)+ο(U+0578)+ρ(U+0580)+ι(U+056B)+τ(U+0581)
      expect(
        t("\u0546\u0578\u0580 \u0578\u0582 \u0576\u0578\u0580\u056B\u0581"),
      ).toBe("Nor u norits");
    });

    test("Voski Or (Ο+ς+κ+ι and Ο+ρ)", () => {
      expect(t("\u0548\u057D\u056F\u056B \u0555\u0580")).toBe("Voski Or");
    });

    test("Khagh chem gnum restoran", () => {
      // Χ(U+053D)+α(U+0561)+ρ(U+0572) [space] χ(U+0579)+ε(U+0565)+μ(U+0574)...
      expect(
        t(
          "\u053D\u0561\u0572 \u0579\u0565\u0574 \u0563\u0576\u0578\u0582\u0574 \u057C\u0565\u057D\u057F\u0578\u0580\u0561\u0576",
        ),
      ).toBe("Khagh chem gnum restoran");
    });

    test("Mez yev Dzez (and standalone between words)", () => {
      expect(t("\u0544\u0565\u0566 \u0587 \u0534\u0566\u0565\u0566")).toBe(
        "Mez yev Dzez",
      );
    });
  });
});
