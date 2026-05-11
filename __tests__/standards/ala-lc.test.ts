/**
 * ALA-LC Armenian Romanization, 2022 version — comprehensive tests.
 *
 * All expected values are derived from the authoritative source:
 *   https://www.loc.gov/catdir/cpso/romanization/armenian.pdf
 *
 * Notes referenced below:
 *   - Note 1: West Armenian bracketed values are not emitted (East default).
 *   - Note 2: ե → y (replacing e) word-initial + followed by vowel, Classical.
 *   - Note 3: soft sign (U+02B9 ʹ) inserted between Գհ/Դզ/Կհ/Սհ/Տս bigrams.
 *   - Note 4: յ → ḥ (U+1E25) word-initial (or stem in compound — not detected).
 *   - Note 5: եւ → ew (Classical orthography).
 *   - Note 6: և → ev (modern ligature). Lowercase "եվ" word-start soft-sign
 *     exception with lexical exceptions (ևեթ, ևս) is NOT implemented.
 *
 * Diacritics used:
 *   ʻ U+02BB MODIFIER LETTER TURNED COMMA (aspirate mark)
 *   ʹ U+02B9 MODIFIER LETTER PRIME (soft sign)
 *   ē U+0113 / Ē U+0112  (է / Է)
 *   ě U+011B / Ě U+011A  (ը / Ը)
 *   ḥ U+1E25 / Ḥ U+1E24  (initial յ / Յ)
 *   ṛ U+1E5B / Ṛ U+1E5A  (ռ / Ռ)
 *   ō U+014D / Ō U+014C  (օ / Օ)
 *
 * Armenian codepoints: see bgn-pcgn.test.ts for the full reference table.
 */
import { transliterate } from "../../src";

const t = (text: string) => transliterate(text, { standard: "ala-lc" });

const B = "բ"; // բ — neutral mid-word wrapper
const mid = (ch: string) => `${B}${ch}${B}`;

describe("ALA-LC standard (2022)", () => {
  // ─────────────────────────────────────────────────────────────────────────
  // All 38 lowercase letters in mid-word context (no word-initial rules fire).
  // ─────────────────────────────────────────────────────────────────────────
  describe("38 lowercase letter mappings (mid-word context)", () => {
    test.each([
      ["ա", "a"],            // ա
      ["բ", "b"],            // բ
      ["գ", "g"],            // գ
      ["դ", "d"],            // դ
      ["ե", "e"],            // ե (mid-word: e)
      ["զ", "z"],            // զ
      ["է", "ē"],       // է → ē
      ["ը", "ě"],       // ը → ě
      ["թ", "tʻ"],      // թ → tʻ
      ["ժ", "zh"],           // ժ
      ["ի", "i"],            // ի
      ["լ", "l"],            // լ
      ["խ", "kh"],           // խ
      ["ծ", "ts"],           // ծ
      ["կ", "k"],            // կ
      ["հ", "h"],            // հ
      ["ձ", "dz"],           // ձ
      ["ղ", "gh"],           // ղ
      ["ճ", "ch"],           // ճ
      ["մ", "m"],            // մ
      ["յ", "y"],            // յ (mid-word: y)
      ["ն", "n"],            // ն
      ["շ", "sh"],           // շ
      ["ո", "o"],            // ո (NO vo rule)
      ["չ", "chʻ"],     // չ → chʻ
      ["պ", "p"],            // պ
      ["ջ", "j"],            // ջ
      ["ռ", "ṛ"],       // ռ → ṛ
      ["ս", "s"],            // ս
      ["վ", "v"],            // վ
      ["տ", "t"],            // տ
      ["ր", "r"],            // ր
      ["ց", "tsʻ"],     // ց → tsʻ
      ["ւ", "w"],            // ւ → w (yiwn)
      ["փ", "pʻ"],      // փ → pʻ
      ["ք", "kʻ"],      // ք → kʻ
      ["օ", "ō"],       // օ → ō
      ["ֆ", "f"],            // ֆ
    ])("բ%sբ → b%sb", (ch, expected) => {
      expect(t(mid(ch))).toBe(`b${expected}b`);
    });
  });

  // ─────────────────────────────────────────────────────────────────────────
  // All 38 uppercase single-letter words — isolated position fires word-initial
  // rules where applicable.
  // ─────────────────────────────────────────────────────────────────────────
  describe("38 uppercase single-letter words", () => {
    test.each([
      ["Ա", "A"],                  // Ա
      ["Բ", "B"],                  // Բ
      ["Գ", "G"],                  // Գ (isolated, no follower → plain g/G)
      ["Դ", "D"],                  // Դ (isolated → plain d/D)
      ["Ե", "E"],                  // Ե — isolated, no follower → just E
      ["Զ", "Z"],                  // Զ
      ["Է", "Ē"],             // Է → Ē
      ["Ը", "Ě"],             // Ը → Ě
      ["Թ", "Tʻ"],            // Թ → Tʻ
      ["Ժ", "ZH"],                 // Ժ
      ["Ի", "I"],                  // Ի
      ["Լ", "L"],                  // Լ
      ["Խ", "KH"],                 // Խ
      ["Ծ", "TS"],                 // Ծ
      ["Կ", "K"],                  // Կ
      ["Հ", "H"],                  // Հ
      ["Ձ", "DZ"],                 // Ձ
      ["Ղ", "GH"],                 // Ղ
      ["Ճ", "CH"],                 // Ճ
      ["Մ", "M"],                  // Մ
      ["Յ", "Ḥ"],             // Յ — word-initial → Ḥ (note 4)
      ["Ն", "N"],                  // Ն
      ["Շ", "SH"],                 // Շ
      ["Ո", "O"],                  // Ո — no vo rule
      ["Չ", "CHʻ"],           // Չ → CHʻ
      ["Պ", "P"],                  // Պ
      ["Ջ", "J"],                  // Ջ
      ["Ռ", "Ṛ"],             // Ռ → Ṛ
      ["Ս", "S"],                  // Ս (isolated → no soft-sign trigger)
      ["Վ", "V"],                  // Վ
      ["Տ", "T"],                  // Տ (isolated)
      ["Ր", "R"],                  // Ր
      ["Ց", "TSʻ"],           // Ց → TSʻ
      ["Ւ", "W"],                  // Ւ
      ["Փ", "Pʻ"],            // Փ → Pʻ
      ["Ք", "Kʻ"],            // Ք → Kʻ
      ["Օ", "Ō"],             // Օ → Ō
      ["Ֆ", "F"],                  // Ֆ
    ])("%s → %s", (armenian, expected) => {
      expect(t(armenian)).toBe(expected);
    });
  });

  // ─────────────────────────────────────────────────────────────────────────
  // Note 2: ե → y (replaces e) word-initial + followed by vowel.
  // ─────────────────────────────────────────────────────────────────────────
  describe("note 2: ե → y word-initial + followed by vowel", () => {
    test("ե isolated → e (no follower, not vowel)", () => {
      expect(t("ե")).toBe("e");
    });

    test("ե + consonant (word-initial) → e (no y replacement)", () => {
      // ե (U+0565) + կ (U+056F)
      expect(t("եկ")).toBe("ek");
    });

    test("ե + ա (word-initial + vowel) → y + a = ya", () => {
      // ե (U+0565) + ա (U+0561) — Classical "Եա..." form
      expect(t("եա")).toBe("ya");
    });

    test("ե + ի (word-initial + vowel) → yi", () => {
      expect(t("եի")).toBe("yi");
    });

    test("Yerevan: Ե+ր+և+ա+ն → Erevan (Ե followed by consonant ր → E)", () => {
      // Ե(U+0535)+ր(U+0580)+և(U+0587 ligature → ev)+ա(U+0561)+ն(U+0576)
      expect(t("Երևան")).toBe("Erevan");
    });

    test("բ + ե + բ (mid-word ե) → beb (no y, not word-initial)", () => {
      expect(t(mid("ե"))).toBe("beb");
    });

    test("ա + ե (mid-word ե after vowel) → ae (no y replacement mid-word)", () => {
      expect(t("աե")).toBe("ae");
    });
  });

  // ─────────────────────────────────────────────────────────────────────────
  // Note 4: յ → ḥ word-initial (Classical orthography).
  // ─────────────────────────────────────────────────────────────────────────
  describe("note 4: յ → ḥ word-initial", () => {
    test("յ isolated → ḥ (word-initial)", () => {
      expect(t("յ")).toBe("ḥ");
    });

    test("Յ isolated → Ḥ", () => {
      expect(t("Յ")).toBe("Ḥ");
    });

    test("յ + ա (word-initial) → ḥa", () => {
      expect(t("յա")).toBe("ḥa");
    });

    test("բ + յ + բ (mid-word յ) → byb (y, not ḥ)", () => {
      expect(t(mid("յ"))).toBe("byb");
    });
  });

  // ─────────────────────────────────────────────────────────────────────────
  // Note 3: soft-sign (U+02B9 ʹ) disambiguation for digraph-conflicting bigrams.
  // ─────────────────────────────────────────────────────────────────────────
  describe("note 3: soft-sign disambiguation bigrams", () => {
    test("գ + հ → gʹh (would otherwise read as ղ=gh)", () => {
      expect(t("գհ")).toBe("gʹh");
    });

    test("դ + զ → dʹz (would otherwise read as ձ=dz)", () => {
      expect(t("դզ")).toBe("dʹz");
    });

    test("կ + հ → kʹh (would otherwise read as խ=kh)", () => {
      expect(t("կհ")).toBe("kʹh");
    });

    test("ս + հ → sʹh (would otherwise read as շ=sh)", () => {
      expect(t("սհ")).toBe("sʹh");
    });

    test("տ + ս → tʹs (would otherwise read as ծ=ts)", () => {
      expect(t("տս")).toBe("tʹs");
    });

    test("LoC example: պատսպարան → patʹsparan", () => {
      // պ ա տ ս պ ա ր ա ն
      expect(
        t("պատսպարան"),
      ).toBe("patʹsparan");
    });

    test("LoC example: Դզնունի → Dʹznuni", () => {
      // Դ զ ն ո ւ ն ի — note ո+ւ → ու sequence → u
      expect(
        t("Դզնունի"),
      ).toBe("Dʹznuni");
    });

    test("LoC example: կհալ → kʹhal", () => {
      // կ հ ա լ
      expect(t("կհալ")).toBe("kʹhal");
    });

    test("LoC example: մոտս → motʹs", () => {
      // մ ո տ ս
      expect(t("մոտս")).toBe("motʹs");
    });

    test("plain ղ stays gh (no soft sign — single letter, not bigram)", () => {
      expect(t(mid("ղ"))).toBe("bghb");
    });

    test("plain ձ stays dz (no soft sign — single letter, not bigram)", () => {
      expect(t(mid("ձ"))).toBe("bdzb");
    });
  });

  // ─────────────────────────────────────────────────────────────────────────
  // Sequence: ու digraph (U+0578 + U+0582) → "u"
  // ─────────────────────────────────────────────────────────────────────────
  describe("sequence ու (U+0578+U+0582) → u", () => {
    test("ու (isolated) → u", () => {
      expect(t("ու")).toBe("u");
    });

    test("Ու (standalone) → U", () => {
      expect(t("Ու")).toBe("U");
    });

    test("Ո+ւ+ր+ա+խ (Ուrakh) → Urakh", () => {
      expect(t("Ուրախ")).toBe("Urakh");
    });

    test("բ + ու + բ (mid-word) → bub", () => {
      expect(t(`${B}ու${B}`)).toBe("bub");
    });
  });

  // ─────────────────────────────────────────────────────────────────────────
  // Sequence: և modern ligature (U+0587) → "ev" (note 6, no soft-sign exception)
  // ─────────────────────────────────────────────────────────────────────────
  describe("sequence և (U+0587) → ev", () => {
    test("և isolated → ev (no yev)", () => {
      expect(t("և")).toBe("ev");
    });

    test("բ + և + բ (mid-word) → bevb", () => {
      expect(t(`${B}և${B}`)).toBe("bevb");
    });

    test("Մեզ և Ձեզ → Mez ev Dzez (no Yev capitalization)", () => {
      expect(t("Մեզ և Ձեզ")).toBe(
        "Mez ev Dzez",
      );
    });

    test("դ + ե + ռ + և + ս → deṛevs (mid-word ե stays e, ռ → ṛ, և → ev)", () => {
      // դ ե ռ և ս → d + e + ṛ + ev + s
      expect(t("դեռևս")).toBe("deṛevs");
    });
  });

  // ─────────────────────────────────────────────────────────────────────────
  // Sequence: եւ Classical orthography (U+0565 + U+0582) → "ew" (note 5)
  // ─────────────────────────────────────────────────────────────────────────
  describe("sequence եւ (U+0565+U+0582) → ew (Classical)", () => {
    test("ե + ւ (isolated, Classical) → ew", () => {
      expect(t("եւ")).toBe("ew");
    });

    test("բ + ե + ւ + բ (mid-word) → bewb", () => {
      expect(t(`${B}եւ${B}`)).toBe("bewb");
    });

    test("Բ + ա + ր + ե + ւ (Barew — Classical spelling) → Barew", () => {
      // Բ(U+0532)+ա(U+0561)+ր(U+0580)+ե(U+0565)+ւ(U+0582)
      expect(t("Բարեւ")).toBe("Barew");
    });
  });

  // ─────────────────────────────────────────────────────────────────────────
  // Sequence: եվ (U+0565 + U+057E) modern Eve sequence → "ev"
  // ─────────────────────────────────────────────────────────────────────────
  describe("sequence եվ (U+0565+U+057E) → ev (modern)", () => {
    test("ե + վ (isolated) → ev", () => {
      expect(t("եվ")).toBe("ev");
    });

    test("Ե + վ + ս (word-initial) → Evs (no Yev)", () => {
      // Ե(U+0535)+վ(U+057E)+ս(U+057D)
      expect(t("Եվս")).toBe("Evs");
    });

    test("բ + ե + վ + բ (mid-word) → bevb", () => {
      expect(t(`${B}եվ${B}`)).toBe("bevb");
    });
  });

  // ─────────────────────────────────────────────────────────────────────────
  // Punctuation mappings
  // ─────────────────────────────────────────────────────────────────────────
  describe("punctuation mappings", () => {
    test("։ (Armenian full stop ։) → .", () => {
      // Բ ա ր ե ւ ։  (Barew. — Classical orthography)
      expect(t("Բարեւ։")).toBe("Barew.");
    });

    test("՞ (Armenian question mark ՞) → ?", () => {
      // Ի ն չ ո ւ ՞  (Inchʻu?)
      expect(t("Ինչու՞")).toBe("Inchʻu?");
    });

    test("՝ (Armenian comma ՝) → ,", () => {
      // Ա + յ + ս + օ + ր + ՝  → Aysōr,
      //   (Ա word-initial → A; յ mid-word → y; օ U+0585 → ō)
      expect(t("Այսօր՝")).toBe("Aysōr,");
    });

    test("՜ (Armenian exclamation ՜) → !", () => {
      expect(t("Բարեւ՜")).toBe("Barew!");
    });

    test("« » → double quotes", () => {
      expect(t("«Բարեւ»")).toBe('"Barew"');
    });
  });

  // ─────────────────────────────────────────────────────────────────────────
  // Full Armenian word transliterations (LoC 2022 conformance)
  // ─────────────────────────────────────────────────────────────────────────
  describe("full Armenian word transliterations", () => {
    test.each([
      // Հայաստան: Հ+ա+յ+ա+ս+տ+ա+ն — Հ word-initial, յ mid-word → y
      ["Հայաստան", "Hayastan"],
      // Կենտրոն: Կ+ե+ն+տ+ր+ո+ն
      ["Կենտրոն", "Kentron"],
      // Երևան: Ե+ր+և+ա+ն — Ե+ր (consonant) → E (not Ye)
      ["Երևան", "Erevan"],
      // Ողջույն: Ո+ղ+ջ+ու+յ+ն — Ո → O, ղ → gh, ջ → j, ու → u, յ → y, ն → n
      ["Ողջույն", "Oghjuyn"],
      // Տիգրան
      ["Տիգրան", "Tigran"],
      // Շողեր: Շ+ո+ղ+ե+ր
      ["Շողեր", "Shogher"],
      // Ոսկի: Ո+ս+կ+ի — note: ս+կ does NOT trigger soft sign (only ս+հ does)
      ["Ոսկի", "Oski"],
      // աղջիկ: ա+ղ+ջ+ի+կ
      ["աղջիկ", "aghjik"],
      // Արմենիա
      ["Արմենիա", "Armenia"],
      // ինքը: ի+ն+ք+ը → i+n+kʻ+ě
      ["ինքը", "inkʻě"],
      // կարող: կ+ա+ր+ո+ղ
      ["կարող", "karogh"],
      // նաև: ն+ա+և → naev
      ["նաև", "naev"],
      // մեջ: մ+ե+ջ
      ["մեջ", "mej"],
      // թե: թ+ե
      ["թե", "tʻe"],
      // ոչ: ո+չ → ochʻ
      ["ոչ", "ochʻ"],
      // ես: ե+ս → es (initial ե + consonant ս → e, no y)
      ["ես", "es"],
      // Օձուն: Օ+ձ+ո+ւ+ն → Ōdzun (ո+ւ → u sequence)
      ["Օձուն", "Ōdzun"],
      // Ռուբեն: Ռ+ո+ւ+բ+ե+ն — title case (Ռ uppercase) → Ṛuben
      ["Ռուբեն", "Ṛuben"],
      // Արարատ
      ["Արարատ", "Ararat"],
      // Sample with the Note-6 LoC example word: Երևան → Erevan (already covered, repeat for clarity)
      // and the all-caps form ԵՐԵՎԱՆ → EREVAN
      ["ԵՐԵՎԱՆ", "EREVAN"],
    ])('"%s" → "%s"', (armenian, expected) => {
      expect(t(armenian)).toBe(expected);
    });
  });

  // ─────────────────────────────────────────────────────────────────────────
  // Multi-word phrase transliterations
  // ─────────────────────────────────────────────────────────────────────────
  describe("multi-word phrase transliterations", () => {
    test("Նոր ու նորից → Nor u noritsʻ", () => {
      // Ն+ո+ր  ' '  ո+ւ  ' '  ն+ո+ր+ի+ց (note: word-final ց → tsʻ)
      expect(
        t("Նոր ու նորից"),
      ).toBe("Nor u noritsʻ");
    });

    test("Ոսկի Օր → Oski Ōr", () => {
      // Ո+ս+կ+ի  ' '  Օ+ր
      expect(t("Ոսկի Օր")).toBe("Oski Ōr");
    });

    test("Մեզ և Ձեզ → Mez ev Dzez", () => {
      expect(t("Մեզ և Ձեզ")).toBe(
        "Mez ev Dzez",
      );
    });
  });
});
