/**
 * IPA Eastern Armenian standard — comprehensive character mapping tests.
 *
 * All expected values were verified against the live transliteration engine.
 * Armenian characters are specified as Unicode escapes to avoid any accidental
 * look-alike substitution. IPA output characters are also given as Unicode
 * escapes.
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
 *
 * Key IPA Unicode escapes used below:
 *   \u0261  ɡ  LATIN SMALL LETTER SCRIPT G
 *   \u025B  ɛ  LATIN SMALL LETTER OPEN E
 *   \u0190  Ɛ  LATIN CAPITAL LETTER OPEN E (toUpperCase of \u025B)
 *   \u0259  ə  LATIN SMALL LETTER SCHWA
 *   \u018F  Ə  LATIN CAPITAL LETTER SCHWA (toUpperCase of \u0259)
 *   \u02B0  ʰ  MODIFIER LETTER SMALL H (aspiration)
 *   \u0292  ʒ  LATIN SMALL LETTER EZH
 *   \u01B7  Ʒ  LATIN CAPITAL LETTER EZH (toUpperCase of \u0292)
 *   \u03C7  χ  GREEK SMALL LETTER CHI
 *   \u03A7  Χ  GREEK CAPITAL LETTER CHI (toUpperCase of \u03C7)
 *   \u0361  ͡  COMBINING DOUBLE INVERTED BREVE (tie bar)
 *   \u0281  ʁ  LATIN LETTER SMALL CAPITAL INVERTED R
 *   \u0283  ʃ  LATIN SMALL LETTER ESH
 *   \u0254  ɔ  LATIN SMALL LETTER OPEN O
 *   \u0186  Ɔ  LATIN CAPITAL LETTER OPEN O (toUpperCase of \u0254)
 *   \u027E  ɾ  LATIN SMALL LETTER R WITH FISHOOK
 */
import { transliterate } from "../../src";

const t = (text: string) => transliterate(text, { standard: "ipa-eastern" });

// բ (U+0562) used as neutral wrapper for mid-word context tests
const B = "\u0562";
const mid = (ch: string) => `${B}${ch}${B}`;

describe("IPA Eastern Armenian standard", () => {
  // ─────────────────────────────────────────────────────────────────────────
  // All 38 lowercase letters in mid-word context.
  // This prevents word-initial rules from firing on ե (U+0565) and ո (U+0578).
  // ─────────────────────────────────────────────────────────────────────────
  describe("38 lowercase letter mappings (mid-word context)", () => {
    test.each([
      ["\u0561", "a"],                              // ա
      ["\u0562", "b"],                              // բ
      ["\u0563", "\u0261"],                         // գ → ɡ
      ["\u0564", "d"],                              // դ
      ["\u0565", "\u025B"],                         // ե — mid-word: ɛ (no j prefix)
      ["\u0566", "z"],                              // զ
      ["\u0567", "\u025B"],                         // է → ɛ
      ["\u0568", "\u0259"],                         // ը → ə
      ["\u0569", "t\u02B0"],                        // թ → tʰ
      ["\u056A", "\u0292"],                         // ժ → ʒ
      ["\u056B", "i"],                              // ի
      ["\u056C", "l"],                              // լ
      ["\u056D", "\u03C7"],                         // խ → χ
      ["\u056E", "t\u0361s"],                       // ծ → t͡s
      ["\u056F", "k"],                              // կ
      ["\u0570", "h"],                              // հ
      ["\u0571", "d\u0361z"],                       // ձ → d͡z
      ["\u0572", "\u0281"],                         // ղ → ʁ
      ["\u0573", "t\u0361\u0283"],                  // ճ → t͡ʃ
      ["\u0574", "m"],                              // մ
      ["\u0575", "j"],                              // յ
      ["\u0576", "n"],                              // ն
      ["\u0577", "\u0283"],                         // շ → ʃ
      ["\u0578", "\u0254"],                         // ո — mid-word: ɔ (no v prefix)
      ["\u0579", "t\u0361\u0283\u02B0"],            // չ → t͡ʃʰ
      ["\u057A", "p"],                              // պ
      ["\u057B", "d\u0361\u0292"],                  // ջ → d͡ʒ
      ["\u057C", "r"],                              // ռ
      ["\u057D", "s"],                              // ս
      ["\u057E", "v"],                              // վ
      ["\u057F", "t"],                              // տ
      ["\u0580", "\u027E"],                         // ր → ɾ
      ["\u0581", "t\u0361s\u02B0"],                 // ց → t͡sʰ
      ["\u0582", "u"],                              // ւ
      ["\u0583", "p\u02B0"],                        // փ → pʰ
      ["\u0584", "k\u02B0"],                        // ք → kʰ
      ["\u0585", "\u0254"],                         // օ → ɔ
      ["\u0586", "f"],                              // ֆ
    ])("%s → b%sb", (ch, expected) => {
      expect(t(mid(ch))).toBe(`b${expected}b`);
    });
  });

  // ─────────────────────────────────────────────────────────────────────────
  // All 38 uppercase letters as isolated single-letter words.
  // Single-letter uppercase words are detected as all-caps by the engine,
  // so the output is the fully-uppercased version of the mapped string.
  // Ե (U+0535) → word-initial → "jɛ" → all-caps → "JƐ"
  // Ո (U+0548) → word-initial, isolated → "vɔ" → all-caps → "VƆ"
  // ─────────────────────────────────────────────────────────────────────────
  describe("38 uppercase single-letter words", () => {
    test.each([
      ["\u0531", "A"],                              // Ա
      ["\u0532", "B"],                              // Բ
      ["\u0533", "\uA7AC"],                         // Գ → Ɡ (U+A7AC LATIN CAPITAL LETTER SCRIPT G)
      ["\u0534", "D"],                              // Դ
      ["\u0535", "J\u0190"],                        // Ե — word-initial → jɛ → all-caps → JƐ
      ["\u0536", "Z"],                              // Զ
      ["\u0537", "\u0190"],                         // Է → Ɛ
      ["\u0538", "\u018F"],                         // Ը → Ə
      ["\u0539", "T\u02B0"],                        // Թ → Tʰ
      ["\u053A", "\u01B7"],                         // Ժ → Ʒ
      ["\u053B", "I"],                              // Ի
      ["\u053C", "L"],                              // Լ
      ["\u053D", "\u03A7"],                         // Խ → Χ
      ["\u053E", "T\u0361S"],                       // Ծ → T͡S
      ["\u053F", "K"],                              // Կ
      ["\u0540", "H"],                              // Հ
      ["\u0541", "D\u0361Z"],                       // Ձ → D͡Z
      ["\u0542", "\u0281"],                         // Ղ → ʁ (no uppercase)
      ["\u0543", "T\u0361\u01A9"],                  // Ճ → T͡Ʃ (\u0283 uppercases to \u01A9)
      ["\u0544", "M"],                              // Մ
      ["\u0545", "J"],                              // Յ
      ["\u0546", "N"],                              // Ν
      ["\u0547", "\u01A9"],                         // Շ → Ʃ (\u0283 uppercases to \u01A9)
      ["\u0548", "V\u0186"],                        // Ո — isolated → vɔ → all-caps → VƆ
      ["\u0549", "T\u0361\u01A9\u02B0"],            // Չ → T͡Ʃʰ (\u0283 uppercases to \u01A9)
      ["\u054A", "P"],                              // Պ
      ["\u054B", "D\u0361\u01B7"],                  // Ջ → D͡Ʒ
      ["\u054C", "R"],                              // Ռ
      ["\u054D", "S"],                              // Ս
      ["\u054E", "V"],                              // Վ
      ["\u054F", "T"],                              // Տ
      ["\u0550", "\u027E"],                         // Ր → ɾ (no uppercase)
      ["\u0551", "T\u0361S\u02B0"],                 // Ց → T͡Sʰ
      ["\u0552", "U"],                              // Ւ
      ["\u0553", "P\u02B0"],                        // Փ → Pʰ
      ["\u0554", "K\u02B0"],                        // Ք → Kʰ
      ["\u0555", "\u0186"],                         // Օ → Ɔ
      ["\u0556", "F"],                              // Ֆ
    ])("%s → %s", (armenian, expected) => {
      expect(t(armenian)).toBe(expected);
    });
  });

  // ─────────────────────────────────────────────────────────────────────────
  // Context rule: ե (U+0565) word-initial → "jɛ"
  // ─────────────────────────────────────────────────────────────────────────
  describe("\u0565 (U+0565) word-initial \u2192 j\u025B", () => {
    test("\u0565 (isolated lowercase) \u2192 j\u025B", () => {
      expect(t("\u0565")).toBe("j\u025B");
    });

    test("\u0535 (isolated uppercase) \u2192 J\u0190 (all-caps single-letter word)", () => {
      expect(t("\u0535")).toBe("J\u0190");
    });

    test("\u0565+\u056F (word-initial) \u2192 j\u025Bk", () => {
      // ե (U+0565) + կ (U+056F)
      expect(t("\u0565\u056F")).toBe("j\u025Bk");
    });

    test("\u0535+\u057C+\u0587+\u0561+\u0576 (Yerevan — title-case) \u2192 J\u025Br\u025Bvan", () => {
      // Ե(U+0535)+ռ(U+057C)+և(U+0587)+ա(U+0561)+ն(U+0576)
      expect(t("\u0535\u057C\u0587\u0561\u0576")).toBe("J\u025Br\u025Bvan");
    });

    test("\u0562+\u0565+\u0562 (mid-word \u0565) \u2192 b\u025Bb (no j)", () => {
      expect(t(mid("\u0565"))).toBe("b\u025Bb");
    });

    test("all-caps YEREVAN \u2192 J\u0190\u027E\u0190VAN", () => {
      // Ε(U+0535)+Ρ(U+0550)+Ε(U+0535)+Β(U+054E)+Α(U+0531)+Ν(U+0546)
      expect(t("\u0535\u0550\u0535\u054E\u0531\u0546")).toBe("J\u0190\u027E\u0190VAN");
    });
  });

  // ─────────────────────────────────────────────────────────────────────────
  // Context rule: ο (U+0578) word-initial + notFollowedBy[vowels/վ] → "vɔ"
  // VOWELS_AND_V = [ա U+0561, ե U+0565, է U+0567, ը U+0568, ի U+056B,
  //                ο U+0578, օ U+0585, վ U+057E]
  // ─────────────────────────────────────────────────────────────────────────
  describe("\u0578 (U+0578) word-initial context rules", () => {
    test("\u0578 (isolated, nothing follows) \u2192 v\u0254", () => {
      expect(t("\u0578")).toBe("v\u0254");
    });

    test("\u0548 (isolated) \u2192 V\u0186", () => {
      expect(t("\u0548")).toBe("V\u0186");
    });

    test("\u0578+\u0576 (word-initial + consonant) \u2192 v\u0254n", () => {
      expect(t("\u0578\u0576")).toBe("v\u0254n");
    });

    test("\u0578+\u0579+\u056B (word-initial + \u0579 U+0579) \u2192 v\u0254t\u0361\u0283\u02B0i", () => {
      // ο(U+0578) + չ(U+0579) + ι(U+056B)
      expect(t("\u0578\u0579\u056B")).toBe("v\u0254t\u0361\u0283\u02B0i");
    });

    test("\u0578+\u057E (\u0578 followed by \u057E U+057E \u2014 in VOWELS_AND_V) \u2192 \u0254v, not v\u0254", () => {
      expect(t("\u0578\u057E")).toBe("\u0254v");
    });

    test("\u0578+\u0561 (\u0578 followed by \u0561 U+0561 \u2014 vowel) \u2192 \u0254a, not v\u0254", () => {
      expect(t("\u0578\u0561")).toBe("\u0254a");
    });

    test("\u0578+\u0578 (\u0578 followed by \u0578 U+0578 \u2014 vowel) \u2192 \u0254\u0254, not v\u0254", () => {
      expect(t("\u0578\u0578")).toBe("\u0254\u0254");
    });

    test("\u0578+\u056B (\u0578 followed by \u056B U+056B \u2014 vowel) \u2192 \u0254i, not v\u0254", () => {
      expect(t("\u0578\u056B")).toBe("\u0254i");
    });

    test("\u0562+\u0578+\u0562 (mid-word \u0578) \u2192 b\u0254b, not bv\u0254b", () => {
      expect(t(mid("\u0578"))).toBe("b\u0254b");
    });

    test("\u0548+\u0576 (\u0548 word-initial + consonant) \u2192 V\u0254n", () => {
      expect(t("\u0548\u0576")).toBe("V\u0254n");
    });

    test("\u0548+\u057E (\u0548 followed by \u057E \u2014 VOWELS_AND_V) \u2192 \u0186v, not V\u0254", () => {
      expect(t("\u0548\u057E")).toBe("\u0186v");
    });

    test("\u0548+\u057D+\u056F+\u056B (Voski) \u2192 V\u0254ski", () => {
      expect(t("\u0548\u057D\u056F\u056B")).toBe("V\u0254ski");
    });
  });

  // ─────────────────────────────────────────────────────────────────────────
  // Sequence: ου (U+0578 + U+0582) → "u"
  // ─────────────────────────────────────────────────────────────────────────
  describe("sequence \u0578\u0582 (U+0578+U+0582) \u2192 u", () => {
    test("\u0578\u0582 (isolated) \u2192 u", () => {
      expect(t("\u0578\u0582")).toBe("u");
    });

    test("\u0548\u0582 (standalone \u2014 title-case digraph) \u2192 U", () => {
      // Ο(U+0548) + ω(U+0582) — engine treats the uppercase Ο as start, ω as part of digraph
      expect(t("\u0548\u0582")).toBe("U");
    });

    test("\u0548+\u0582+\u0580+\u0561+\u056D (Urakh) \u2192 U\u027Ea\u03C7", () => {
      // Ου(U+0548+U+0582)+ρ(U+0580)+α(U+0561)+χ(U+056D)
      expect(t("\u0548\u0582\u0580\u0561\u056D")).toBe("U\u027Ea\u03C7");
    });

    test("\u0562+\u0578\u0582+\u0562 (mid-word) \u2192 bub", () => {
      expect(t(`${B}\u0578\u0582${B}`)).toBe("bub");
    });

    test("all-caps TIMUR \u2192 TIMU\u027E", () => {
      // Τ(U+054F)+Ι(U+053B)+Μ(U+0544)+Ο(U+0548)+Υ(U+0552)+Ρ(U+0550)
      expect(t("\u054F\u053B\u0544\u0548\u0582\u0550")).toBe("TIMU\u027E");
    });
  });

  // ─────────────────────────────────────────────────────────────────────────
  // Sequence: և ligature (U+0587) → "ɛv" mid-word / "jɛv" word-initial
  // ─────────────────────────────────────────────────────────────────────────
  describe("sequence \u0587 (U+0587) \u2192 \u025Bv / j\u025Bv", () => {
    test("\u0587 (isolated) \u2192 j\u025Bv", () => {
      expect(t("\u0587")).toBe("j\u025Bv");
    });

    test("\u0562+\u0587+\u0562 (mid-word \u0587) \u2192 b\u025Bvb", () => {
      expect(t(`${B}\u0587${B}`)).toBe("b\u025Bvb");
    });

    test("\u0564+\u0565+\u057C+\u0587+\u057D (mid-word \u0587) \u2192 d\u025Br\u025Bvs", () => {
      // դ(U+0564)+ե(U+0565)+ռ(U+057C)+և(U+0587)+ս(U+057D)
      expect(t("\u0564\u0565\u057C\u0587\u057D")).toBe("d\u025Br\u025Bvs");
    });

    test("standalone \u0587 between words (Mez and Dzez) \u2192 M\u025Bz j\u025Bv Dz\u025Bz", () => {
      // Μ(U+0544)+ε(U+0565)+ζ(U+0566) [space] և(U+0587) [space] Δ(U+0534)+ζ(U+0566)+ε(U+0565)+ζ(U+0566)
      expect(t("\u0544\u0565\u0566 \u0587 \u0534\u0566\u0565\u0566")).toBe("M\u025Bz j\u025Bv Dz\u025Bz");
    });
  });

  // ─────────────────────────────────────────────────────────────────────────
  // Sequence: ե+վ (U+0565 + U+057E) → "ɛv" mid-word / "jɛv" word-initial
  // ─────────────────────────────────────────────────────────────────────────
  describe("sequence \u0565+\u057E (U+0565+U+057E) \u2192 \u025Bv / j\u025Bv", () => {
    test("\u0565+\u057E (isolated) \u2192 j\u025Bv", () => {
      expect(t("\u0565\u057E")).toBe("j\u025Bv");
    });

    test("\u0535+\u057E+\u057D (word-initial) \u2192 J\u025Bvs", () => {
      // Ε(U+0535)+β(U+057E)+ς(U+057D)
      expect(t("\u0535\u057E\u057D")).toBe("J\u025Bvs");
    });

    test("\u0562+\u0565+\u057E+\u0562 (mid-word \u0565+\u057E) \u2192 b\u025Bvb", () => {
      expect(t(`${B}\u0565\u057E${B}`)).toBe("b\u025Bvb");
    });
  });

  // ─────────────────────────────────────────────────────────────────────────
  // Sequence: traditional ե+ւ (U+0565 + U+0582) → "ɛv" mid-word / "jɛv" word-initial
  // ─────────────────────────────────────────────────────────────────────────
  describe("sequence \u0565\u0582 traditional (U+0565+U+0582) \u2192 \u025Bv / j\u025Bv", () => {
    test("\u0565+\u0582 (isolated) \u2192 j\u025Bv", () => {
      expect(t("\u0565\u0582")).toBe("j\u025Bv");
    });

    test("\u0562+\u0565+\u0582+\u0562 (mid-word) \u2192 b\u025Bvb", () => {
      expect(t(`${B}\u0565\u0582${B}`)).toBe("b\u025Bvb");
    });

    test("\u0532+\u0561+\u0580+\u0565+\u0582 (Barev \u2014 classical spelling) \u2192 Ba\u027E\u025Bv", () => {
      // Բ(U+0532)+α(U+0561)+ρ(U+0580)+ε(U+0565)+ω(U+0582)
      expect(t("\u0532\u0561\u0580\u0565\u0582")).toBe("Ba\u027E\u025Bv");
    });
  });

  // ─────────────────────────────────────────────────────────────────────────
  // Punctuation
  // ─────────────────────────────────────────────────────────────────────────
  describe("punctuation mappings", () => {
    test("\u0589 (Armenian full stop \u0589) \u2192 .", () => {
      expect(t("\u0532\u0561\u0580\u0565\u0582\u0589")).toBe("Ba\u027E\u025Bv.");
    });

    test("\u055E (Armenian question mark \u055E) \u2192 ?", () => {
      expect(t("\u053B\u0576\u0579\u0578\u0582\u055E")).toBe("Int\u0361\u0283\u02B0u?");
    });

    test("\u055D (Armenian comma \u055D) \u2192 ,", () => {
      expect(t("\u0531\u0575\u057D\u0578\u0580\u055D")).toBe("Ajs\u0254\u027E,");
    });

    test("\u055C (Armenian exclamation \u055C) \u2192 !", () => {
      expect(t("\u0532\u0561\u0580\u0565\u0582\u055C")).toBe("Ba\u027E\u025Bv!");
    });

    test("\u00AB (left guillemet \u00AB) \u2192 double quote", () => {
      expect(t("\u00AB\u0532\u0561\u0580\u0565\u0582\u00BB")).toBe('"Ba\u027E\u025Bv"');
    });
  });

  // ─────────────────────────────────────────────────────────────────────────
  // Full Armenian word transliterations (known-good)
  // ─────────────────────────────────────────────────────────────────────────
  describe("full Armenian word transliterations", () => {
    test.each([
      // Հayastan: Հ(U+0540)+ա(U+0561)+յ(U+0575)+ա(U+0561)+ս(U+057D)+տ(U+057F)+ա(U+0561)+ն(U+0576)
      ["\u0540\u0561\u0575\u0561\u057D\u057F\u0561\u0576", "Hajastan"],
      // Kentron: Կ(U+053F)+ե(U+0565)+ն(U+0576)+տ(U+057F)+ր(U+0580)+ո(U+0578)+ն(U+0576)
      ["\u053F\u0565\u0576\u057F\u0580\u0578\u0576", "K\u025Bnt\u027E\u0254n"],
      // Yerevan with և: Ε(U+0535)+ռ(U+057C)+և(U+0587)+ա(U+0561)+ն(U+0576)
      ["\u0535\u057C\u0587\u0561\u0576", "J\u025Br\u025Bvan"],
      // Voghjuyn: Ո(U+0548)+ղ(U+0572)+ջ(U+057B)+ու(U+0578+U+0582)+յ(U+0575)+ն(U+0576)
      ["\u0548\u0572\u057B\u0578\u0582\u0575\u0576", "V\u0254\u0281d\u0361\u0292ujn"],
      // Tigran: Տ(U+054F)+ի(U+056B)+գ(U+0563)+ր(U+0580)+ա(U+0561)+ն(U+0576)
      ["\u054F\u056B\u0563\u0580\u0561\u0576", "Ti\u0261\u027Ean"],
      // Shogher: Շ(U+0547)+ո(U+0578)+ղ(U+0572)+ե(U+0565)+ր(U+0580)
      // Շ title-cased: \u0283.toUpperCase() = \u01A9
      ["\u0547\u0578\u0572\u0565\u0580", "\u01A9\u0254\u0281\u025B\u027E"],
      // Voski: Ο(U+0548)+ς(U+057D)+κ(U+056F)+ι(U+056B)
      ["\u0548\u057D\u056F\u056B", "V\u0254ski"],
      // aghjik: ա(U+0561)+ղ(U+0572)+ջ(U+057B)+ի(U+056B)+կ(U+056F)
      ["\u0561\u0572\u057B\u056B\u056F", "a\u0281d\u0361\u0292ik"],
      // Meghedi: Μ(U+0544)+ε(U+0565)+ρ(U+0572)+ε(U+0565)+δ(U+0564)+ι(U+056B)
      ["\u0544\u0565\u0572\u0565\u0564\u056B", "M\u025B\u0281\u025Bdi"],
      // Armenia: Α(U+0531)+ρ(U+0580)+μ(U+0574)+ε(U+0565)+ν(U+0576)+ι(U+056B)+α(U+0561)
      ["\u0531\u0580\u0574\u0565\u0576\u056B\u0561", "A\u027Em\u025Bnia"],      // inks (himself): ι+ν+κ(U+0584→kʰ=k+U+02B0)+ε(U+0568→ə=U+0259)
      ["\u056B\u0576\u0584\u0568", "ink\u02B0\u0259"],
      // karogh (can/able): κ+α+ρ(→ɾ=U+027E)+ο(mid,→ɔ=U+0254)+ρ(U+0572→ʁ=U+0281)
      ["\u056F\u0561\u0580\u0578\u0572", "ka\u027E\u0254\u0281"],
      // naev (also): ν+α+and(U+0587→ɛv mid-word, ɛ=U+025B)
      ["\u0576\u0561\u0587", "na\u025Bv"],
      // mej (inside): μ+ε(→ɛ=U+025B)+ч(U+057B→d͡ʒ=d+U+0361+U+0292)
      ["\u0574\u0565\u057B", "m\u025Bd\u0361\u0292"],
      // te (if/or): θ(U+0569→tʰ=t+U+02B0)+ε(→ɛ=U+025B)
      ["\u0569\u0565", "t\u02B0\u025B"],
      // voch (not/no): ο(word-initial→vɔ=v+U+0254)+χ(U+0579→t͡ʃʰ=t+U+0361+U+0283+U+02B0)
      ["\u0578\u0579", "v\u0254t\u0361\u0283\u02B0"],
      // yes (I): ε(word-initial→jɛ=j+U+025B)+ς→s
      ["\u0565\u057D", "j\u025Bs"],    ])('"%s" \u2192 "%s"', (armenian, expected) => {
      expect(t(armenian)).toBe(expected);
    });
  });

  // ─────────────────────────────────────────────────────────────────────────
  // Multi-word phrase transliterations
  // ─────────────────────────────────────────────────────────────────────────
  describe("multi-word phrase transliterations", () => {
    test("Nor u norits (\u0578\u0582 standalone = u)", () => {
      // Ν(U+0546)+ο(U+0578)+ρ(U+0580) [space] ου(U+0578+U+0582) [space] ν(U+0576)+ο(U+0578)+ρ(U+0580)+ι(U+056B)+ць(U+0581)
      expect(t("\u0546\u0578\u0580 \u0578\u0582 \u0576\u0578\u0580\u056B\u0581")).toBe("N\u0254\u027E u n\u0254\u027Eit\u0361s\u02B0");
    });

    test("Voski Or (\u0548+\u057D+\u056F+\u056B and \u0548+\u0580)", () => {
      expect(t("\u0548\u057D\u056F\u056B \u0555\u0580")).toBe("V\u0254ski \u0186\u027E");
    });

    test("Khagh chem gnum restoran", () => {
      // Χ(U+053D)+α(U+0561)+ρ(U+0572) [space] χ(U+0579)+ε(U+0565)+μ(U+0574) ...
      expect(t("\u053D\u0561\u0572 \u0579\u0565\u0574 \u0563\u0576\u0578\u0582\u0574 \u057C\u0565\u057D\u057F\u0578\u0580\u0561\u0576")).toBe("\u03A7a\u0281 t\u0361\u0283\u02B0\u025Bm \u0261num r\u025Bst\u0254\u027Ean");
    });

    test("Mez yev Dzez (\u0587 standalone between words)", () => {
      expect(t("\u0544\u0565\u0566 \u0587 \u0534\u0566\u0565\u0566")).toBe("M\u025Bz j\u025Bv Dz\u025Bz");
    });
  });
});
