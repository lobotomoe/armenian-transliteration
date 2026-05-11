/**
 * IPA Standard Western Armenian — phonemic test suite.
 *
 * Profile: Tier 1 broad phonemic, orthography → phoneme. Every assertion
 * here checks a rule attested in JIPA 2024 (Seyfarth et al.), Dolatian 2022,
 * or Vaux 1998 (see src/standards/ipa/ipa-western.ts for full citations).
 *
 * Western Armenian collapses the Classical three-way stop/affricate
 * contrast to two ways: voiced + voiceless-aspirated. Eastern's voiced
 * series becomes Western aspirated; Eastern's voiceless-unaspirated
 * series becomes Western voiced; Eastern's voiceless-aspirated stays
 * aspirated. This produces orthographic homophony — e.g. both ձ and ց
 * map to /t͡sʰ/, both ջ and չ map to /t͡ʃʰ/, both բ and փ map to /pʰ/,
 * both գ and ք map to /kʰ/, both դ and թ map to /tʰ/. This is the
 * Standard Western system (Vaux 1998; JIPA 2024: 447–448).
 *
 * Allophonic / morphophonological behaviour (progressive devoicing,
 * regressive ղ/վ assimilation, schwa epenthesis, յու → ʏ post-consonant)
 * is intentionally NOT tested here — see ipa-western.ts for scope notes.
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
 * Special:
 *   և U+0587  ligature ew
 */
import { transliterate } from "../../src";

const t = (text: string) => transliterate(text, { standard: "ipa-western" });

// հ (U+0570) used as neutral mid-word wrapper — its Western mapping is /h/.
// (բ cannot be used because in Western it maps to /pʰ/, an aspirated stop.)
const H = "հ";
const mid = (ch: string) => `${H}${ch}${H}`;

describe("IPA Standard Western Armenian (strict Tier 1 phonemic)", () => {
  // ───────────────────────────────────────────────────────────────────────
  // Per-letter character mappings (mid-word).
  // The W1 voicing collapse is the main difference from Eastern: see the
  // table in the file-level JSDoc.
  // ───────────────────────────────────────────────────────────────────────
  describe("38 lowercase letter mappings (mid-word)", () => {
    test.each([
      ["ա", "ɑ"],                         // ա → ɑ
      ["բ", "pʰ"],                        // ★ բ → pʰ (Eastern: b)
      ["գ", "kʰ"],                        // ★ գ → kʰ (Eastern: ɡ)
      ["դ", "tʰ"],                        // ★ դ → tʰ (Eastern: d)
      ["ե", "e"],                              // ե (mid) → e
      ["զ", "z"],                              // զ → z
      ["է", "e"],                              // է → e
      ["ը", "ə"],                         // ը → ə
      ["թ", "tʰ"],                        // թ → tʰ (unchanged)
      ["ժ", "ʒ"],                         // ժ → ʒ
      ["ի", "i"],                              // ի → i
      ["լ", "l"],                              // լ → l
      ["խ", "χ"],                         // խ → χ
      ["ծ", "d͡z"],                       // ★ ծ → d͡z (Eastern: t͡s)
      ["կ", "ɡ"],                         // ★ կ → ɡ (Eastern: k)
      ["հ", "h"],                              // հ → h
      ["ձ", "t͡sʰ"],            // ★ ձ → t͡sʰ (Eastern: d͡z)
      ["ղ", "ʁ"],                         // ղ → ʁ
      ["ճ", "d͡ʒ"],                  // ★ ճ → d͡ʒ (Eastern: t͡ʃ)
      ["մ", "m"],                              // մ → m
      ["յ", "j"],                              // յ → j
      ["ն", "n"],                              // ն → n
      ["շ", "ʃ"],                         // շ → ʃ
      ["ո", "o"],                              // ո (mid) → o
      ["չ", "t͡ʃʰ"],            // չ → t͡ʃʰ (unchanged)
      ["պ", "b"],                              // ★ պ → b (Eastern: p)
      ["ջ", "t͡ʃʰ"],            // ★ ջ → t͡ʃʰ (Eastern: d͡ʒ; merges with չ)
      ["ռ", "ɾ"],                         // ★ ռ → ɾ (Western has single rhotic)
      ["ս", "s"],                              // ս → s
      ["վ", "v"],                              // վ → v
      ["տ", "d"],                              // ★ տ → d (Eastern: t)
      ["ր", "ɾ"],                         // ր → ɾ
      ["ց", "t͡sʰ"],                 // ց → t͡sʰ (merges with ձ)
      ["ւ", "v"],                              // ւ → v
      ["փ", "pʰ"],                        // փ → pʰ (merges with բ)
      ["ք", "kʰ"],                        // ք → kʰ (merges with գ)
      ["օ", "o"],                              // օ → o
      ["ֆ", "f"],                              // ֆ → f
    ])("mid-word %s → h%sh", (ch, expected) => {
      expect(t(mid(ch))).toBe(`h${expected}h`);
    });
  });

  // ───────────────────────────────────────────────────────────────────────
  // Per-letter uppercase as isolated single-letter words.
  // ───────────────────────────────────────────────────────────────────────
  describe("38 uppercase single-letter words", () => {
    test.each([
      ["Ա", "Ɑ"],                         // Ա → Ⱝ
      ["Բ", "Pʰ"],                        // ★ Բ → Pʰ
      ["Գ", "Kʰ"],                        // ★ Գ → Kʰ
      ["Դ", "Tʰ"],                        // ★ Դ → Tʰ
      ["Ե", "JE"],                             // Ե → JE
      ["Զ", "Z"],
      ["Է", "E"],
      ["Ը", "Ə"],
      ["Թ", "Tʰ"],
      ["Ժ", "Ʒ"],
      ["Ի", "I"],
      ["Լ", "L"],
      ["Խ", "Χ"],
      ["Ծ", "D͡Z"],                       // ★ Ծ → D͡Z
      ["Կ", "Ɡ"],                         // ★ Կ → Ɡ
      ["Հ", "H"],
      ["Ձ", "T͡Sʰ"],                 // ★ Ձ → T͡Sʰ
      ["Ղ", "ʁ"],                         // no uppercase for ʁ
      ["Ճ", "D͡Ʒ"],                  // ★ Ճ → D͡Ʒ
      ["Մ", "M"],
      ["Յ", "J"],
      ["Ն", "N"],
      ["Շ", "Ʃ"],
      ["Ո", "VO"],
      ["Չ", "T͡Ʃʰ"],
      ["Պ", "B"],                              // ★ Պ → B
      ["Ջ", "T͡Ʃʰ"],            // ★ Ջ → T͡Ʃʰ
      ["Ռ", "ɾ"],                         // no uppercase for ɾ
      ["Ս", "S"],
      ["Վ", "V"],
      ["Տ", "D"],                              // ★ Տ → D
      ["Ր", "ɾ"],                         // no uppercase for ɾ
      ["Ց", "T͡Sʰ"],
      ["Ւ", "V"],
      ["Փ", "Pʰ"],
      ["Ք", "Kʰ"],
      ["Օ", "O"],
      ["Ֆ", "F"],
    ])("%s → %s", (armenian, expected) => {
      expect(t(armenian)).toBe(expected);
    });
  });

  // ───────────────────────────────────────────────────────────────────────
  // Word-initial ե / ո — same rules as Eastern.
  // ───────────────────────────────────────────────────────────────────────
  describe("word-initial ե → je", () => {
    test("isolated ե → je", () => {
      expect(t("ե")).toBe("je");
    });

    test("Ե (uppercase isolated) → JE", () => {
      expect(t("Ե")).toBe("JE");
    });

    test("Yerevan → Jeɾevɑ̃ (Western single-rhotic)", () => {
      expect(t("Եռևան")).toBe(
        "Jeɾevɑn",
      );
    });

    test("mid-word ե stays /e/", () => {
      expect(t(mid("ե"))).toBe("heh");
    });
  });

  describe("word-initial ո rules", () => {
    test("isolated ո → vo", () => {
      expect(t("ո")).toBe("vo");
    });

    test("Ո (uppercase isolated) → VO", () => {
      expect(t("Ո")).toBe("VO");
    });

    test("ո+վ (ով family) → ov (exception)", () => {
      expect(t("ով")).toBe("ov");
    });

    test("ո+ա → voɑ (no exception)", () => {
      expect(t("ոա")).toBe("voɑ");
    });

    test("mid-word ո stays /o/", () => {
      expect(t(mid("ո"))).toBe("hoh");
    });
  });

  // ───────────────────────────────────────────────────────────────────────
  // ու digraph + ե+վ / ե+ւ / և sequences.
  // ───────────────────────────────────────────────────────────────────────
  describe("digraph ու → u", () => {
    test("isolated ու → u", () => {
      expect(t("ու")).toBe("u");
    });

    test("Ուրախ (Urakh) → Uɾɑχ", () => {
      expect(t("Ուրախ")).toBe(
        "Uɾɑχ",
      );
    });

    test("mid-word ու → u", () => {
      expect(t(`${H}ու${H}`)).toBe("huh");
    });
  });

  describe("և (ligature ew)", () => {
    test("isolated և → jev", () => {
      expect(t("և")).toBe("jev");
    });

    test("mid-word և → ev", () => {
      expect(t(`${H}և${H}`)).toBe("hevh");
    });

    test("Mez և Dzez (standalone և between words)", () => {
      // Note: Western Դ → Tʰ, so Dz becomes Tʰz.
      expect(t("Մեզ և Դզեզ")).toBe(
        "Mez jev Tʰzez",
      );
    });
  });

  describe("ե+վ (reformed)", () => {
    test("isolated եվ → jev", () => {
      expect(t("եվ")).toBe("jev");
    });

    test("mid-word եվ → ev", () => {
      expect(t(`${H}եվ${H}`)).toBe("hevh");
    });
  });

  describe("ե+ւ (classical)", () => {
    test("isolated եւ → jev", () => {
      expect(t("եւ")).toBe("jev");
    });

    test("Barev classical (Բարեւ) → Pʰɑɾev", () => {
      expect(t("Բարեւ")).toBe(
        "Pʰɑɾev",
      );
    });
  });

  // ───────────────────────────────────────────────────────────────────────
  // W3: sibilant + stop phonotactic constraint.
  // ───────────────────────────────────────────────────────────────────────
  describe("W3: sibilant + stop preserves voiceless stop", () => {
    test("ստ → st (not sd)", () => {
      expect(t("ստ")).toBe("st");
    });

    test("սպ → sp (not sb)", () => {
      expect(t("սպ")).toBe("sp");
    });

    test("սկ → sk (not sɡ)", () => {
      expect(t("սկ")).toBe("sk");
    });

    test("շտ → ʃt (not ʃd)", () => {
      expect(t("շտ")).toBe("ʃt");
    });

    test("շպ → ʃp (not ʃb)", () => {
      expect(t("շպ")).toBe("ʃp");
    });

    test("շկ → ʃk (not ʃɡ)", () => {
      expect(t("շկ")).toBe("ʃk");
    });

    test("ստանալ → stɑnɑl (full word)", () => {
      expect(t("ստանալ")).toBe("stɑnɑl");
    });
  });

  // ───────────────────────────────────────────────────────────────────────
  // Punctuation.
  // ───────────────────────────────────────────────────────────────────────
  describe("punctuation", () => {
    test("։ → .", () => {
      expect(t("Բարեւ։")).toBe(
        "Pʰɑɾev.",
      );
    });

    test("՞ → ?", () => {
      expect(t("Ինչու՞")).toBe(
        "Int͡ʃʰu?",
      );
    });

    test("՝ → ,", () => {
      expect(t("Այսոր՝")).toBe(
        "Ɑjsoɾ,",
      );
    });

    test("« » → double quote", () => {
      expect(t("«Բարեւ»")).toBe(
        '"Pʰɑɾev"',
      );
    });

    test("՛ emphasis mark is transparent (word stays intact)", () => {
      // Real Wiktionary test case: մի՛թե should NOT break the word at ՛.
      // The ՛ drops from output but the word remains a single unit.
      expect(t("մի՛թե")).toBe(
        "mitʰe",
      );
    });
  });

  // ───────────────────────────────────────────────────────────────────────
  // Full-word transliterations.
  // ───────────────────────────────────────────────────────────────────────
  describe("full-word transliterations", () => {
    test.each([
      ["Հայաստան", "Hɑjɑstɑn"],
      ["Կենտրոն", "Ɡendɾon"],
      ["Եռևան", "Jeɾevɑn"],
      ["Ողջույն", "Voʁt͡ʃʰujn"],
      ["Տիգրան", "Dikʰɾɑn"],
      ["Շողեր", "Ʃoʁeɾ"],
      ["Ոսկի", "Voski"],
      ["աղջիկ", "ɑʁt͡ʃʰiɡ"],
      ["Մեղեդի", "Meʁetʰi"],
      ["Արմենիա", "Ɑɾmeniɑ"],
      ["ինքը", "inkʰə"],
      ["կարող", "ɡɑɾoʁ"],
      ["նաև", "nɑev"],
      ["մեջ", "met͡ʃʰ"],
      ["թե", "tʰe"],
      ["ոչ", "vot͡ʃʰ"],
      ["ես", "jes"],
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

    test("Khagh chem gnum restoran (Western: գ → kʰ, ստ → st)", () => {
      // ստ in ռեստ stays /st/ via W3 phonotactic sequence rule
      // (ստ → /st/, overriding the W1 collapse of տ → /d/).
      expect(
        t("Խաղ չեմ գնում ռեստորան"),
      ).toBe("Χɑʁ t͡ʃʰem kʰnum ɾestoɾɑn");
    });
  });

  // ───────────────────────────────────────────────────────────────────────
  // Tier 1 SCOPE GUARDS — explicit assertions that allophonic / variable
  // rules are NOT applied at this profile level.
  // ───────────────────────────────────────────────────────────────────────
  describe("scope guard: NO allophonic rules in phonemic profile", () => {
    test("no progressive devoicing (բացբերան keeps aspiration on second բ)", () => {
      // Wiktionary's algorithm produces [pʰɑtspeɾɑn] (progressive devoicing
      // of the second բ /pʰ/ → /p/). JIPA 2024 documents this as Beirut-
      // specific and morphophonological; we do not apply it. Both բ stay /pʰ/.
      expect(t("բացբերան")).toBe(
        "pʰɑt͡sʰpʰeɾɑn",
      );
    });

    test("ղ does NOT devoice to χ before voiceless (աղտ → ɑʁd)", () => {
      expect(t("աղտ")).toBe("ɑʁd");
    });

    test("վ does NOT devoice to f before voiceless (Կովկաս → Ɡovɡɑs)", () => {
      expect(t("Կովկաս")).toBe(
        "Ɡovɡɑs",
      );
    });

    test("no schwa epenthesis (գրել → kʰɾel, not kʰəɾel)", () => {
      expect(t("գրել")).toBe("kʰɾel");
    });

    test("no յու → ʏ post-consonant (մյուս → mjus, not mʏs)", () => {
      // Documented gap; the յու → ʏ rule is variable per Dolatian 2022
      // and JIPA 2024: 461.
      expect(t("մյուս")).toBe("mjus");
    });
  });
});
