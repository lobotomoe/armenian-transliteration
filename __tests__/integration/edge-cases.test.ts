import { transliterate, createTransliterator } from "../../src";

describe("edge cases", () => {
  // ── Passthrough / empty ────────────────────────────────────────────────────

  test("empty string returns empty string", () => {
    expect(transliterate("")).toBe("");
  });

  test("whitespace-only string is preserved unchanged", () => {
    expect(transliterate("   ")).toBe("   ");
  });

  test("Latin text passes through unchanged", () => {
    expect(transliterate("hello world")).toBe("hello world");
  });

  test("ASCII digits pass through unchanged", () => {
    expect(transliterate("12345")).toBe("12345");
  });

  test("emoji passes through unchanged", () => {
    expect(transliterate("🇦🇲")).toBe("🇦🇲");
  });

  test("Cyrillic text passes through unchanged (not Armenian)", () => {
    expect(transliterate("Россия")).toBe("Россия");
  });

  // ── Mixed scripts ──────────────────────────────────────────────────────────

  test("mixed Armenian and Latin: Armenian word is transliterated, Latin left unchanged", () => {
    expect(transliterate("Հայաստան Armenia")).toBe("Hayastan Armenia");
  });

  test("mixed Armenian and digits: Armenian transliterated, digits preserved", () => {
    expect(transliterate("Արմենիա2024")).toBe("Armenia2024");
  });

  test("mixed Armenian, Cyrillic and Latin in one line", () => {
    expect(transliterate("Հայ мир world")).toBe("Hay мир world");
  });

  test("Armenian word followed immediately by digits (no space)", () => {
    expect(transliterate("Գ3 վարդեր")).toBe("G3 varder");
  });

  // ── Armenian presentation ligatures U+FB13–FB17 ────────────────────────────

  test("U+FB13 ﬓ (մն ligature) expands to mn", () => {
    expect(transliterate("\uFB13")).toBe("mn");
  });

  test("U+FB14 ﬔ (մե ligature) expands to me", () => {
    expect(transliterate("\uFB14")).toBe("me");
  });

  test("U+FB15 ﬕ (մի ligature) expands to mi", () => {
    expect(transliterate("\uFB15")).toBe("mi");
  });

  test("U+FB16 ﬖ (վն ligature) expands to vn", () => {
    expect(transliterate("\uFB16")).toBe("vn");
  });

  test("U+FB17 ﬗ (մխ ligature) expands to mkh", () => {
    expect(transliterate("\uFB17")).toBe("mkh");
  });

  // ── Single character ───────────────────────────────────────────────────────

  test("single lowercase Armenian letter", () => {
    expect(transliterate("ա")).toBe("a");
  });

  test("single uppercase Armenian letter", () => {
    expect(transliterate("Ա")).toBe("A");
  });

  // ── Very long string ───────────────────────────────────────────────────────

  test("very long string (1 200+ chars) is processed correctly", () => {
    const input = "Հայ ".repeat(300);           // 1 200 chars
    const result = transliterate(input);
    expect(result.length).toBe(1200);
    expect(result.startsWith("Hay ")).toBe(true);
    expect(result.endsWith("Hay ")).toBe(true);
  });

  // ── Armenian punctuation marks ─────────────────────────────────────────────

  test("Armenian full stop ։ (U+0589) → period", () => {
    expect(transliterate("բարև\u0589")).toBe("barev.");
  });

  test("Armenian question mark ՞ (U+055E) → ?", () => {
    expect(transliterate("ինչ\u055E")).toBe("inch?");
  });

  test("Armenian exclamation mark ՜ (U+055C) → !", () => {
    expect(transliterate("բարև\u055C")).toBe("barev!");
  });

  test("Armenian comma ՝ (U+055D) → ,", () => {
    expect(transliterate("բարև\u055D")).toBe("barev,");
  });

  test("Armenian abbreviation mark ՟ (U+055F) → period", () => {
    expect(transliterate("բ\u055F")).toBe("b.");
  });

  test("Armenian emphasis mark ՛ (U+055B) → apostrophe", () => {
    expect(transliterate("բ\u055B")).toBe("b'");
  });

  test("Armenian apostrophe ՚ (U+055A) → apostrophe", () => {
    expect(transliterate("բ\u055A")).toBe("b'");
  });

  test("Armenian modifier letter left half ring ՙ (U+0559) → apostrophe", () => {
    expect(transliterate("բ\u0559")).toBe("b'");
  });

  test("Armenian hyphen ֊ (U+058A) → hyphen-minus", () => {
    expect(transliterate("\u058A")).toBe("-");
  });

  // ── Guillemets ─────────────────────────────────────────────────────────────

  test("guillemets « » are converted to double quotes", () => {
    // «Հ» → "H"
    expect(transliterate("«Հ»")).toBe('"H"');
  });

  test("Armenian text between guillemets", () => {
    expect(transliterate("«Հայաստան»")).toBe('"Hayastan"');
  });

  // ── Consecutive punctuation ────────────────────────────────────────────────

  test("consecutive ASCII exclamation marks pass through unchanged", () => {
    expect(transliterate("!!!")).toBe("!!!");
  });

  test("consecutive Armenian question marks ՞՞՞ → ???", () => {
    expect(transliterate("\u055E\u055E\u055E")).toBe("???");
  });

  test("Armenian exclamation mark followed by ASCII !", () => {
    expect(transliterate("բարև\u055C!")).toBe("barev!!");
  });

  // ── Tab and newline preservation ───────────────────────────────────────────

  test("tab characters are preserved around Armenian text", () => {
    expect(transliterate("\tաղ\tboo")).toBe("\tagh\tboo");
  });

  test("newline is preserved between Armenian words", () => {
    expect(transliterate("այ\nupper")).toBe("ay\nupper");
  });

  // ── direction: to-armenian throws ─────────────────────────────────────────

  test("direction 'to-armenian' throws an error", () => {
    expect(() => transliterate("hello", { direction: "to-armenian" })).toThrow(
      "Reverse transliteration (to-armenian) is not yet implemented"
    );
  });

  test("createTransliterator with to-armenian throws at creation", () => {
    expect(() => createTransliterator({ direction: "to-armenian" })).toThrow(
      "Reverse transliteration (to-armenian) is not yet implemented"
    );
  });

  // ── Default standard ───────────────────────────────────────────────────────

  test("omitting options uses BGN/PCGN standard by default", () => {
    expect(transliterate("Հայ")).toBe(
      transliterate("Հայ", { standard: "bgn-pcgn" })
    );
  });

  test("explicit bgn-pcgn equals default", () => {
    const word = "Ողջույն";
    expect(transliterate(word)).toBe(transliterate(word, { standard: "bgn-pcgn" }));
  });

  // ── U+0587 unds (և) ────────────────────────────────────────────────────────

  test("U+0587 unds as standalone word → yev (word-initial)", () => {
    // unds is a word of its own; word-initial rule fires
    expect(transliterate("\u0587")).toBe("yev");
  });

  test("U+0587 unds at word start in a compound word → Yev... (title case)", () => {
    // "ևազ" — unds is word-initial, title case
    expect(transliterate("\u0587ազ")).toBe("yevaz");
  });

  test("U+0587 unds mid-word → ev (not word-initial)", () => {
    // դ → d, unds (not word-initial) → ev; result is "dev"
    expect(transliterate("դ\u0587")).toBe("dev");
  });

  test("U+0587 unds after space is word-initial → yev", () => {
    expect(transliterate("Մեզ \u0587 ձեզ")).toBe("Mez yev dzez");
  });

  // ── ALL CAPS ───────────────────────────────────────────────────────────────

  test("ALL CAPS Armenian word → ALL CAPS output", () => {
    expect(transliterate("ՀԱՅԱՍՏԱՆ")).toBe("HAYASTAN");
  });

  test("ALL CAPS sentence", () => {
    expect(transliterate("ՄԵՂԵԴԻ")).toBe("MEGHEDI");
  });

  test("ALL CAPS with multi-letter mapping (ՇOUTK)", () => {
    // Շ → SH; ALL CAPS word → SH stays as SH (both uppercase)
    expect(transliterate("ՇՈՒԿԱ")).toBe("SHUKA");
  });

  // ── Title Case preservation ────────────────────────────────────────────────

  test("Title Case Armenian word → Title Case output", () => {
    expect(transliterate("Հայաստան")).toBe("Hayastan");
  });

  test("Title Case word starting with Ե → Ye...", () => {
    expect(transliterate("Երևան")).toBe("Yerevan");
  });

  test("Title Case word starting with Շ → Sh...", () => {
    expect(transliterate("Շողեր")).toBe("Shogher");
  });

  test("Title Case word starting with Ու → U...", () => {
    expect(transliterate("Ուրախ")).toBe("Urakh");
  });

  // ── Hyphenated words ───────────────────────────────────────────────────────

  test("hyphenated Armenian words are each transliterated independently", () => {
    // Each part of hyphenated word is its own word unit
    expect(transliterate("Հայ-Ռուս")).toBe("Hay-Rus");
  });

  test("և with hyphen", () => {
    expect(transliterate("և-ով")).toBe("yev-ov");
  });

  // ── ISO 9985 specific ──────────────────────────────────────────────────────

  test("ISO 9985: ը → ë (e with diaeresis), not schwa ə", () => {
    expect(transliterate("ը", { standard: "iso-9985" })).toBe("ë");
  });

  test("ISO 9985: խ → x (not kh)", () => {
    expect(transliterate("խ", { standard: "iso-9985" })).toBe("x");
  });

  test("ISO 9985: no word-initial Ո→Vo rule — Ոսկի → Oski", () => {
    expect(transliterate("Ոսկի", { standard: "iso-9985" })).toBe("Oski");
  });

  test("ISO 9985: no word-initial Ե→Ye rule — Երևան → Erewan", () => {
    expect(transliterate("Երևան", { standard: "iso-9985" })).toBe("Erewan");
  });

  test("ISO 9985: ու → ow (o + w independently)", () => {
    expect(transliterate("ու", { standard: "iso-9985" })).toBe("ow");
  });

  // ── HM specific ───────────────────────────────────────────────────────────

  test("HM: ը → ə (schwa)", () => {
    expect(transliterate("ը", { standard: "hubschmann-meillet" })).toBe("ə");
  });

  test("HM: ղ → ł (l with stroke)", () => {
    expect(transliterate("ղ", { standard: "hubschmann-meillet" })).toBe("ł");
  });

  test("HM: no word-initial Ե→Ye rule — Երևան → Erewan", () => {
    expect(transliterate("Երևան", { standard: "hubschmann-meillet" })).toBe(
      "Erewan"
    );
  });

  // ── ALA-LC specific ────────────────────────────────────────────────────────

  test("ALA-LC: ը → ě (e with caron)", () => {
    expect(transliterate("ը", { standard: "ala-lc" })).toBe("ě");
  });

  test("ALA-LC: ց → tsʻ (ts + turned comma U+02BB)", () => {
    expect(transliterate("ց", { standard: "ala-lc" })).toBe("ts\u02BB");
  });

  test("ALA-LC: word-initial Ե → Ye (same rule as BGN)", () => {
    expect(transliterate("Երևան", { standard: "ala-lc" })).toBe("Yerevan");
  });
});
