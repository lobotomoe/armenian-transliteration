/**
 * IPA Eastern Armenian standard — phonemic test suite.
 *
 * Profile: Tier 1 broad phonemic, orthography → phoneme. Every assertion
 * here checks a rule that is attested in Dum-Tragut 2009 or JIPA 2024 (see
 * src/standards/ipa/ipa-eastern.ts for full rule citations).
 *
 * Allophonic / morphophonological behaviour (regressive ղ/վ devoicing,
 * schwa epenthesis, word-final devoicing, post-nasal aspiration, suffix
 * -ությ- palatalization) is intentionally NOT tested here — those are
 * deferred to a future `ipa-eastern-narrow` profile.
 *
 * Wiktionary conformance is tracked separately in
 *   tools/ipa-conformance/run.mjs  (pnpm run ipa-conformance)
 * which documents acceptable divergences from Wiktionary's algorithm.
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
 * Uppercase: U+0531–U+0556 (lowercase codepoint minus 0x30).
 *
 * Special:
 *   և U+0587  ligature ew — always lowercase
 *
 * Key IPA codepoints used below:
 *   ɑ  U+0251  open back unrounded vowel  (uppercase: Ⱝ U+2C6D)
 *   ɡ  U+0261  voiced velar stop          (uppercase: Ɡ U+A7AC)
 *   ə  U+0259  schwa                       (uppercase: Ə U+018F)
 *   ʰ  U+02B0  modifier letter small h    (aspiration)
 *   ʒ  U+0292  voiced postalveolar fricative (uppercase: Ʒ U+01B7)
 *   χ  U+03C7  voiceless uvular fricative (uppercase: Χ U+03A7)
 *   ʁ  U+0281  voiced uvular fricative    (no uppercase)
 *   ʃ  U+0283  voiceless postalveolar fricative (uppercase: Ʃ U+01A9)
 *   ͡  U+0361  combining double inverted breve (affricate tie bar)
 *   ɾ  U+027E  alveolar tap               (no uppercase)
 */
import { transliterate } from "../../src";

const t = (text: string) => transliterate(text, { standard: "ipa-eastern" });

// բ (U+0562) used as neutral mid-word wrapper — its Eastern mapping is /b/.
const B = "բ";
const mid = (ch: string) => `${B}${ch}${B}`;

describe("IPA Eastern Armenian (strict Tier 1 phonemic)", () => {
  // ───────────────────────────────────────────────────────────────────────
  // Per-letter character mappings (mid-word, no word-boundary rules firing).
  // Wrapping in բ (U+0562) ensures ե / ո stay mid-word so their initial
  // /je/ /vo/ rules don't trigger.
  // ───────────────────────────────────────────────────────────────────────
  describe("38 lowercase letter mappings (mid-word)", () => {
    test.each([
      ["ա", "ɑ"],                         // ա → ɑ
      ["բ", "b"],                              // բ → b
      ["գ", "ɡ"],                         // գ → ɡ
      ["դ", "d"],                              // դ → d
      ["ե", "e"],                              // ե (mid) → e
      ["զ", "z"],                              // զ → z
      ["է", "e"],                              // է → e
      ["ը", "ə"],                         // ը → ə
      ["թ", "tʰ"],                        // թ → tʰ
      ["ժ", "ʒ"],                         // ժ → ʒ
      ["ի", "i"],                              // ի → i
      ["լ", "l"],                              // լ → l
      ["խ", "χ"],                         // խ → χ
      ["ծ", "t͡s"],                       // ծ → t͡s
      ["կ", "k"],                              // կ → k
      ["հ", "h"],                              // հ → h
      ["ձ", "d͡z"],                       // ձ → d͡z
      ["ղ", "ʁ"],                         // ղ → ʁ (no devoicing rule)
      ["ճ", "t͡ʃ"],                  // ճ → t͡ʃ
      ["մ", "m"],                              // մ → m
      ["յ", "j"],                              // յ → j
      ["ն", "n"],                              // ն → n
      ["շ", "ʃ"],                         // շ → ʃ
      ["ո", "o"],                              // ո (mid) → o
      ["չ", "t͡ʃʰ"],            // չ → t͡ʃʰ
      ["պ", "p"],                              // պ → p
      ["ջ", "d͡ʒ"],                  // ջ → d͡ʒ
      ["ռ", "r"],                              // ռ → r (alveolar trill)
      ["ս", "s"],                              // ս → s
      ["վ", "v"],                              // վ → v (no devoicing rule)
      ["տ", "t"],                              // տ → t
      ["ր", "ɾ"],                         // ր → ɾ (alveolar tap)
      ["ց", "t͡sʰ"],                 // ց → t͡sʰ
      ["ւ", "v"],                              // ւ → v (merged with վ in MEA)
      ["փ", "pʰ"],                        // փ → pʰ
      ["ք", "kʰ"],                        // ք → kʰ
      ["օ", "o"],                              // օ → o
      ["ֆ", "f"],                              // ֆ → f
    ])("mid-word %s → b%sb", (ch, expected) => {
      expect(t(mid(ch))).toBe(`b${expected}b`);
    });
  });

  // ───────────────────────────────────────────────────────────────────────
  // Per-letter uppercase as isolated single-letter words.
  // The engine treats single-letter uppercase as an all-caps word and
  // uppercases the entire mapping. ɑ → Ⱝ (U+2C6D), ɡ → Ɡ (U+A7AC), etc.
  // ───────────────────────────────────────────────────────────────────────
  describe("38 uppercase single-letter words", () => {
    test.each([
      ["Ա", "Ɑ"],                         // Ա → Ⱝ
      ["Բ", "B"],                              // Բ → B
      ["Գ", "Ɡ"],                         // Գ → Ɡ
      ["Դ", "D"],                              // Դ → D
      ["Ե", "JE"],                             // Ե → JE (word-initial je → uppercased)
      ["Զ", "Z"],                              // Զ → Z
      ["Է", "E"],                              // Է → E
      ["Ը", "Ə"],                         // Ը → Ə
      ["Թ", "Tʰ"],                        // Թ → Tʰ
      ["Ժ", "Ʒ"],                         // Ժ → Ʒ
      ["Ի", "I"],                              // Ի → I
      ["Լ", "L"],                              // Լ → L
      ["Խ", "Χ"],                         // Խ → Χ
      ["Ծ", "T͡S"],                       // Ծ → T͡S
      ["Կ", "K"],                              // Կ → K
      ["Հ", "H"],                              // Հ → H
      ["Ձ", "D͡Z"],                       // Ձ → D͡Z
      ["Ղ", "ʁ"],                         // Ղ → ʁ (no uppercase)
      ["Ճ", "T͡Ʃ"],                  // Ճ → T͡Ʃ
      ["Մ", "M"],                              // Մ → M
      ["Յ", "J"],                              // Յ → J
      ["Ն", "N"],                              // Ն → N
      ["Շ", "Ʃ"],                         // Շ → Ʃ
      ["Ո", "VO"],                             // Ո → VO (word-initial vo → uppercased)
      ["Չ", "T͡Ʃʰ"],            // Չ → T͡Ʃʰ
      ["Պ", "P"],                              // Պ → P
      ["Ջ", "D͡Ʒ"],                  // Ջ → D͡Ʒ
      ["Ռ", "R"],                              // Ռ → R
      ["Ս", "S"],                              // Ս → S
      ["Վ", "V"],                              // Վ → V
      ["Տ", "T"],                              // Տ → T
      ["Ր", "ɾ"],                         // Ր → ɾ (no uppercase for the tap)
      ["Ց", "T͡Sʰ"],                 // Ց → T͡Sʰ
      ["Ւ", "V"],                              // Ւ → V
      ["Փ", "Pʰ"],                        // Փ → Pʰ
      ["Ք", "Kʰ"],                        // Ք → Kʰ
      ["Օ", "O"],                              // Օ → O
      ["Ֆ", "F"],                              // Ֆ → F
    ])("%s → %s", (armenian, expected) => {
      expect(t(armenian)).toBe(expected);
    });
  });

  // ───────────────────────────────────────────────────────────────────────
  // Word-initial ե → /je/. Dum-Tragut 2009: 14 §1.1.1, point 1.a.
  // ───────────────────────────────────────────────────────────────────────
  describe("word-initial ե → je", () => {
    test("isolated ե (lowercase)", () => {
      expect(t("ե")).toBe("je");
    });

    test("isolated Ե (uppercase) → JE (all-caps single-letter word)", () => {
      expect(t("Ե")).toBe("JE");
    });

    test("ե+կ → jek", () => {
      expect(t("եկ")).toBe("jek");
    });

    test("Yerevan (Եռևան) → Jerevɑn", () => {
      expect(t("Եռևան")).toBe("Jerevɑn");
    });

    test("mid-word ե stays /e/, no glide", () => {
      expect(t(mid("ե"))).toBe("beb");
    });

    test("all-caps YEREVAN → JEɾEVⱝN", () => {
      expect(t("ԵՐԵՎԱՆ")).toBe(
        "JEɾEVⱭN",
      );
    });
  });

  // ───────────────────────────────────────────────────────────────────────
  // Word-initial ո → /vo/, with ո + վ → /o/ exception (ով family +
  // /ov/-initial loanwords). Dum-Tragut 2009: 16 §1.1.1, point 2.a.
  // ───────────────────────────────────────────────────────────────────────
  describe("word-initial ո rules", () => {
    test("isolated ո → vo", () => {
      expect(t("ո")).toBe("vo");
    });

    test("isolated Ո → VO", () => {
      expect(t("Ո")).toBe("VO");
    });

    test("ո+ն (word-initial + consonant) → von", () => {
      expect(t("ոն")).toBe("von");
    });

    test("ո+վ (ո followed by վ) → ov (ով family exception)", () => {
      expect(t("ով")).toBe("ov");
    });

    test("ո+ա (ո + vowel ա) → voɑ (vo rule fires)", () => {
      // The "followedBy: vowel" exception is NOT in our spec; only the
      // ո + վ → o case is. Other vowels still get the glide.
      expect(t("ոա")).toBe("voɑ");
    });

    test("mid-word ո stays /o/, no glide", () => {
      expect(t(mid("ո"))).toBe("bob");
    });

    test("Ո+ն (uppercase word-initial) → Von", () => {
      expect(t("Ոն")).toBe("Von");
    });

    test("Ո+վ (ով family, uppercase) → Ov", () => {
      expect(t("Ով")).toBe("Ov");
    });

    test("Voski (Ոսկի) → Voski", () => {
      expect(t("Ոսկի")).toBe("Voski");
    });
  });

  // ───────────────────────────────────────────────────────────────────────
  // Digraph ու → /u/. Dum-Tragut 2009: 13, 18.
  // ───────────────────────────────────────────────────────────────────────
  describe("digraph ու → u", () => {
    test("isolated lowercase ու → u", () => {
      expect(t("ու")).toBe("u");
    });

    test("title-case Ու → U", () => {
      expect(t("Ու")).toBe("U");
    });

    test("Urakh (Ուրախ) → Uɾɑχ", () => {
      expect(t("Ուրախ")).toBe(
        "Uɾɑχ",
      );
    });

    test("mid-word ու → u", () => {
      expect(t(`${B}ու${B}`)).toBe("bub");
    });

    test("all-caps TIMUR → TIMUɾ", () => {
      // Note: in our reformed-orthography model, ու appears in the upper-
      // case word as Ո + Ւ (U+0548 + U+0552). The engine title-cases the
      // first letter only; the rest of an all-caps word stays uppercase
      // until folded back by the sequence rule.
      expect(t("ՏԻՄՈւՐ")).toBe(
        "TIMUɾ",
      );
    });
  });

  // ───────────────────────────────────────────────────────────────────────
  // ե+վ / ե+ւ / և sequences. Word-initial → /jev/, else /ev/.
  // The Classical ե+ւ and the ligature և are orthographic variants of
  // the reformed ե+վ.
  // ───────────────────────────────────────────────────────────────────────
  describe("և (ligature ew) → ev / jev", () => {
    test("isolated և → jev (word-initial)", () => {
      expect(t("և")).toBe("jev");
    });

    test("mid-word և → ev", () => {
      expect(t(`${B}և${B}`)).toBe("bevb");
    });

    test("դեռևս (դեռևս) mid-word և → derevs", () => {
      expect(t("դեռևս")).toBe("derevs");
    });

    test("standalone և between words → jev", () => {
      expect(t("Մեզ և Դզեզ")).toBe(
        "Mez jev Dzez",
      );
    });
  });

  describe("ե+վ (reformed eve) → ev / jev", () => {
    test("isolated եվ → jev", () => {
      expect(t("եվ")).toBe("jev");
    });

    test("Եվս (word-initial) → Jevs", () => {
      expect(t("Եվս")).toBe("Jevs");
    });

    test("mid-word եվ → ev", () => {
      expect(t(`${B}եվ${B}`)).toBe("bevb");
    });
  });

  describe("եւ (classical eve) → ev / jev", () => {
    test("isolated եւ → jev", () => {
      expect(t("եւ")).toBe("jev");
    });

    test("mid-word եւ → ev", () => {
      expect(t(`${B}եւ${B}`)).toBe("bevb");
    });

    test("Barev classical (Բարեւ) → Bɑɾev", () => {
      expect(t("Բարեւ")).toBe("Bɑɾev");
    });
  });

  // ───────────────────────────────────────────────────────────────────────
  // Armenian punctuation → ASCII.
  // ───────────────────────────────────────────────────────────────────────
  describe("punctuation", () => {
    test("։ (full stop) → .", () => {
      expect(t("Բարեւ։")).toBe(
        "Bɑɾev.",
      );
    });

    test("՞ (question mark) → ?", () => {
      expect(t("Ինչու՞")).toBe(
        "Int͡ʃʰu?",
      );
    });

    test("՝ (comma) → ,", () => {
      expect(t("Այսոր՝")).toBe(
        "Ɑjsoɾ,",
      );
    });

    test("՜ (exclamation) → !", () => {
      expect(t("Բարեւ՜")).toBe(
        "Bɑɾev!",
      );
    });

    test("« » → double quote", () => {
      expect(t("«Բարեւ»")).toBe(
        '"Bɑɾev"',
      );
    });

    test("՛ (emphasis mark) is dropped", () => {
      expect(t("Բառ՛եւ")).toBe(
        "Bɑrev",
      );
    });

    test("՚ (apostrophe) is dropped", () => {
      expect(t("Բառ՚եւ")).toBe(
        "Bɑrev",
      );
    });
  });

  // ───────────────────────────────────────────────────────────────────────
  // Full-word transliterations. These exercise multiple rules in combination
  // and serve as regression anchors.
  // ───────────────────────────────────────────────────────────────────────
  describe("full-word transliterations", () => {
    test.each([
      // Place names + common words. Expected outputs were computed from
      // the live transliterator and verified against the rule set.
      ["Հայաստան", "Hɑjɑstɑn"], // Հայաստան
      ["Կենտրոն", "Kentɾon"],                  // Կենտրոն
      ["Եռևան", "Jerevɑn"],                              // Երևան
      ["Ողջույն", "Voʁd͡ʒujn"],      // Ողջույն
      ["Տիգրան", "Tiɡɾɑn"],               // Տիգրան
      ["Շողեր", "Ʃoʁeɾ"],                      // Շողեր
      ["Ոսկի", "Voski"],                                            // Ոսկի
      ["աղջիկ", "ɑʁd͡ʒik"],               // աղջիկ
      ["Մեղեդի", "Meʁedi"],                          // Մեղեդի
      ["Արմենիա", "Ɑɾmeniɑ"],         // Արմենիա
      ["ինքը", "inkʰə"],                                  // ինքը
      ["կարող", "kɑɾoʁ"],                       // կարող
      ["նաև", "nɑev"],                                              // նաև
      ["մեջ", "med͡ʒ"],                                        // մեջ
      ["թե", "tʰe"],                                                     // թե
      ["ոչ", "vot͡ʃʰ"],                                        // ոչ
      ["ես", "jes"],                                                          // ես
    ])('"%s" → "%s"', (armenian, expected) => {
      expect(t(armenian)).toBe(expected);
    });
  });

  // ───────────────────────────────────────────────────────────────────────
  // Multi-word phrases.
  // ───────────────────────────────────────────────────────────────────────
  describe("multi-word phrases", () => {
    test("Nor u norits", () => {
      expect(
        t("Նոր ու նորից"),
      ).toBe("Noɾ u noɾit͡sʰ");
    });

    test("Voski Or", () => {
      expect(t("Ոսկի Օր")).toBe(
        "Voski Oɾ",
      );
    });

    test("Khagh chem gnum restoran", () => {
      expect(
        t(
          "Խաղ չեմ գնում ռեստորան",
        ),
      ).toBe("Χɑʁ t͡ʃʰem ɡnum restoɾɑn");
    });

    test("Mez yev Dzez", () => {
      expect(t("Մեզ և Դզեզ")).toBe(
        "Mez jev Dzez",
      );
    });
  });

  // ───────────────────────────────────────────────────────────────────────
  // Tier 1 SCOPE GUARDS — explicit assertions that allophonic rules are NOT
  // applied at this profile level. If any of these start failing, a Tier 2
  // rule has leaked into the phonemic profile.
  // ───────────────────────────────────────────────────────────────────────
  describe("scope guard: NO allophonic rules in phonemic profile", () => {
    test("ղ does NOT devoice to χ before voiceless (աղտ → ɑʁt, not ɑχt)", () => {
      expect(t("աղտ")).toBe("ɑʁt");
    });

    test("վ does NOT devoice to f before voiceless (Կովկաս → Kovkɑs, not Kofkɑs)", () => {
      expect(t("Կովկաս")).toBe(
        "Kovkɑs",
      );
    });

    test("-ությ- does NOT affricate to -ut͡sʰj- (անկախություն → ɑnkɑχutʰjun)", () => {
      expect(t("անկախություն")).toBe(
        "ɑnkɑχutʰjun",
      );
    });

    test("no schwa epenthesis (գրել → ɡɾel, not ɡəɾel)", () => {
      expect(t("գրել")).toBe("ɡɾel");
    });

    test("no word-final devoicing (մարդ → mɑɾd, not mɑɾtʰ)", () => {
      expect(t("մարդ")).toBe("mɑɾd");
    });

    test("no post-nasal aspiration (անդամ → ɑndɑm, not ɑntʰɑm)", () => {
      expect(t("անդամ")).toBe("ɑndɑm");
    });
  });
});
