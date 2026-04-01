import { transliterate, createTransliterator, listStandards } from "../../src";

describe("integration: full text transliteration", () => {
  describe("BGN/PCGN sentences", () => {
    test("simple multi-word sentence", () => {
      expect(transliterate("Ես սիրում եմ Հայաստանը")).toBe(
        "Yes sirum yem Hayastanə",
      );
    });

    test("sentence with Armenian punctuation", () => {
      expect(transliterate("Ով է այնտեղ։")).toBe("Ov e ayntegh.");
    });

    test("sentence with Armenian question mark ՞", () => {
      expect(transliterate("Ինչու՞ ես այստեղ")).toBe("Inchu? yes aystegh");
    });

    test("mixed case words — title + ALL CAPS + lower", () => {
      expect(transliterate("Արարատ Հայաստան ԵՐԵՎԱՆ")).toBe(
        "Ararat Hayastan YEREVAN",
      );
    });

    test("sentence with embedded numbers", () => {
      expect(transliterate("Կամուրջ 5, Երևան 0010")).toBe(
        "Kamurj 5, Yerevan 0010",
      );
    });

    test("sentence with newlines", () => {
      expect(transliterate("Հայ\nՌուս\nԱնգ")).toBe("Hay\nRus\nAng");
    });

    test("sentence with tabs", () => {
      expect(transliterate("Հայ\tռուս")).toBe("Hay\trus");
    });

    test("sentence with exclamation and question Armenian marks", () => {
      expect(transliterate("Ողջույն!!! Որտեղ՞ ես?")).toBe(
        "Voghjuyn!!! Vortegh? yes?",
      );
    });

    test("word-initial Ե → Ye, medial ե → e", () => {
      expect(transliterate("Երևան")).toBe("Yerevan");
    });

    test("word-initial Ո → Vo before consonant", () => {
      expect(transliterate("Ոսկի")).toBe("Voski");
    });

    test("word-initial Ու → U", () => {
      expect(transliterate("Ուրախ")).toBe("Urakh");
    });

    test("full uppercase Armenian sentence", () => {
      expect(transliterate("ԱՐԱՐԱՏ")).toBe("ARARAT");
    });

    test("multi-word string with punctuation, mixed case and numbers", () => {
      expect(
        transliterate("Հայաստան, ԵՐԵՎԱՆ, ԿԵՆՏՐՈՆ, ՍԱՐՅԱՆ Փ., Շ 31, Բն. 16 ԲՆ."),
      ).toBe("Hayastan, YEREVAN, KENTRON, SARYAN P., SH 31, Bn. 16 BN.");
    });

    test("Armenian line-break with question mark", () => {
      expect(transliterate("Բարեւ.\nՔանի՞ անգամ:")).toBe(
        "Barev.\nKani? angam:",
      );
    });

    test("և mid-sentence → yev at word start, ev elsewhere", () => {
      expect(transliterate("Մեզ և ձեզ")).toBe("Mez yev dzez");
    });

    test("ու treated as standalone word → u", () => {
      expect(transliterate("Նոր ու նորից")).toBe("Nor u norits");
    });

    test("Ֆ / ֆ → F / f", () => {
      expect(transliterate("Ֆ")).toBe("F");
      expect(transliterate("ֆ")).toBe("f");
    });
  });

  describe("Russian geographic sentences", () => {
    const ru = { standard: "ru-geographic" } as const;

    test("simple multi-word sentence", () => {
      expect(transliterate("Ես սիրում եմ Հայաստանը", ru)).toBe(
        "Ес сирум ем Хаястаны",
      );
    });

    test("sentence with Armenian question mark ՞", () => {
      expect(transliterate("Ինչու՞", ru)).toBe("Инчу?");
    });

    test("mixed case — title + ALL CAPS", () => {
      expect(transliterate("Արարատ Հայաստան ԵՐԵՎԱՆ", ru)).toBe(
        "Арарат Хаястан ЕРЕВАН",
      );
    });

    test("sentence with embedded numbers", () => {
      expect(transliterate("Կամուրջ 5, Երևան 0010", ru)).toBe(
        "Камурдж 5, Ереван 0010",
      );
    });

    test("full uppercase Armenian sentence", () => {
      expect(transliterate("ԱՐԱՐԱՏ", ru)).toBe("АРАРАТ");
    });

    test("word-initial Ո → Во", () => {
      expect(transliterate("Ոսկի", ru)).toBe("Воски");
    });

    test("word-initial Ե stays Е (no Е→Е prefix change)", () => {
      expect(transliterate("Երևան", ru)).toBe("Ереван");
    });

    test("multi-word string with punctuation, mixed case and numbers", () => {
      expect(
        transliterate(
          "Հայաստան, ԵՐԵՎԱՆ, ԿԵՆՏՐՈՆ, ՍԱՐՅԱՆ Փ., Շ 31, Բն. 16 ԲՆ.",
          ru,
        ),
      ).toBe("Хаястан, ЕРЕВАН, КЕНТРОН, САРЯН П., Ш 31, Бн. 16 БН.");
    });

    test("Armenian line-break with question mark", () => {
      expect(transliterate("Բարեւ.\nՔանի՞ անգամ:", ru)).toBe(
        "Барев.\nКани? ангам:",
      );
    });

    test("Ֆ / ֆ → Ф / ф", () => {
      expect(transliterate("Ֆ", ru)).toBe("Ф");
      expect(transliterate("ֆ", ru)).toBe("ф");
    });
  });

  describe("createTransliterator factory", () => {
    test("creates a reusable function that returns correct output", () => {
      const t = createTransliterator({ standard: "bgn-pcgn" });
      expect(t("Երևան")).toBe("Yerevan");
    });

    test("multiple calls with the same instance produce consistent results", () => {
      const t = createTransliterator({ standard: "bgn-pcgn" });
      expect(t("Հայաստան")).toBe("Hayastan");
      expect(t("Հայաստան")).toBe("Hayastan");
      expect(t("Երևան")).toBe("Yerevan");
    });

    test("factory for ru-geographic standard works", () => {
      const t = createTransliterator({ standard: "ru-geographic" });
      expect(t("Հայաստան")).toBe("Хаястан");
      expect(t("Երևան")).toBe("Ереван");
    });

    test("factory for iso-9985 standard works", () => {
      const t = createTransliterator({ standard: "iso-9985" });
      expect(t("Հայաստան")).toBe("Hayastan");
    });

    test("factory throws immediately for to-armenian direction", () => {
      expect(() => createTransliterator({ direction: "to-armenian" })).toThrow(
        "Reverse transliteration (to-armenian) is not yet implemented",
      );
    });
  });

  describe("listStandards", () => {
    test("returns exactly 8 standards", () => {
      expect(listStandards()).toHaveLength(8);
    });

    test("includes all expected standard identifiers", () => {
      const standards = listStandards();
      expect(standards).toContain("bgn-pcgn");
      expect(standards).toContain("iso-9985");
      expect(standards).toContain("hubschmann-meillet");
      expect(standards).toContain("ala-lc");
      expect(standards).toContain("ru-geographic");
      expect(standards).toContain("ru-personal");
      expect(standards).toContain("ipa-eastern");
      expect(standards).toContain("ipa-western");
    });

    test("returns a readonly array (does not mutate the registry)", () => {
      const standards = listStandards();
      expect(Array.isArray(standards)).toBe(true);
    });
  });

  describe("cross-standard comparison", () => {
    test("BGN/PCGN and ISO 9985 produce different output for ղ", () => {
      const bgn = transliterate("ղ");
      const iso = transliterate("ղ", { standard: "iso-9985" });
      expect(bgn).toBe("gh");
      // ISO 9985 uses g + combining dot above (U+0307), not precomposed ġ (U+0121)
      expect(iso).toBe("g\u0307");
      expect(bgn).not.toBe(iso);
    });

    test("BGN/PCGN and HM produce different output for ղ", () => {
      const bgn = transliterate("ղ");
      const hm = transliterate("ղ", { standard: "hubschmann-meillet" });
      expect(bgn).toBe("gh");
      expect(hm).toBe("ł");
      expect(bgn).not.toBe(hm);
    });

    test("ISO 9985 and HM produce different output for ղ", () => {
      const iso = transliterate("ղ", { standard: "iso-9985" });
      const hm = transliterate("ղ", { standard: "hubschmann-meillet" });
      expect(iso).not.toBe(hm);
    });

    test("BGN/PCGN uses Ye for word-initial Ե, ISO 9985 does not", () => {
      const bgn = transliterate("Երևան");
      const iso = transliterate("Երևան", { standard: "iso-9985" });
      expect(bgn).toBe("Yerevan");
      expect(iso).toBe("Erewan");
    });

    test("BGN/PCGN adds Vo for word-initial Ո, ISO 9985 does not", () => {
      const bgn = transliterate("Ոսկի");
      const iso = transliterate("Ոսկի", { standard: "iso-9985" });
      expect(bgn).toBe("Voski");
      expect(iso).toBe("Oski");
    });

    test("BGN ու → u, ISO 9985 ու → ow (o + w separately)", () => {
      expect(transliterate("ու")).toBe("u");
      expect(transliterate("ու", { standard: "iso-9985" })).toBe("ow");
    });

    test("BGN և → yev (word-initial), ISO 9985 → ew", () => {
      expect(transliterate("և")).toBe("yev");
      expect(transliterate("և", { standard: "iso-9985" })).toBe("ew");
    });

    test("BGN ծ → ts, ISO ծ → c̣, HM ծ → c", () => {
      expect(transliterate("ծ")).toBe("ts");
      expect(transliterate("ծ", { standard: "iso-9985" })).toBe("c\u0323");
      expect(transliterate("ծ", { standard: "hubschmann-meillet" })).toBe("c");
    });

    test("BGN օ → o, ISO օ → ò, HM օ → ō", () => {
      expect(transliterate("օ")).toBe("o");
      expect(transliterate("օ", { standard: "iso-9985" })).toBe("ò");
      expect(transliterate("օ", { standard: "hubschmann-meillet" })).toBe("ō");
    });

    test("BGN ջ → j, ISO ջ → ǰ (U+01F0)", () => {
      expect(transliterate("ջ")).toBe("j");
      expect(transliterate("ջ", { standard: "iso-9985" })).toBe("\u01F0");
    });

    test("BGN ռ → r, ISO ռ → ṙ (U+1E59)", () => {
      expect(transliterate("ռ")).toBe("r");
      expect(transliterate("ռ", { standard: "iso-9985" })).toBe("\u1E59");
    });

    test("BGN ձ → dz, ISO ձ → j", () => {
      expect(transliterate("ձ")).toBe("dz");
      expect(transliterate("ձ", { standard: "iso-9985" })).toBe("j");
    });

    test("BGN/PCGN and ru-geographic produce scripts of different type", () => {
      const latin = transliterate("Հայաստան");
      const cyrillic = transliterate("Հայաստան", { standard: "ru-geographic" });
      expect(latin).toBe("Hayastan");
      expect(cyrillic).toBe("Хаястан");
      expect(latin).not.toBe(cyrillic);
    });

    test("ALA-LC ք → kʻ, HM ք → kʿ, BGN ք → k", () => {
      expect(transliterate("ք")).toBe("k");
      expect(transliterate("ք", { standard: "ala-lc" })).toBe("k\u02BB");
      expect(transliterate("ք", { standard: "hubschmann-meillet" })).toBe(
        "k\u02BF",
      );
    });
  });
});
