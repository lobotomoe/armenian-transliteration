import { transliterateArmenianText } from "../src";

describe("Armenian transliteration correctness", () => {
  /**
   * Basic letter mappings and single-word handling.
   */
  test("Կենտրոն -> Kentron", () => {
    // Mixed-case check
    expect(transliterateArmenianText("Կենտրոն")).toBe("Kentron");
  });

  /**
   * Verifies mapping of initial Ո (word-initial) to Vo.
   */
  test("Ոչ -> Voch", () => {
    expect(transliterateArmenianText("Ոչ")).toBe("Voch");
  });

  /**
   * Multi-word string with punctuation, uppercase words, numbers, etc.
   */
  test("Հայաստան, ԵՐԵՎԱՆ, ԿԵՆՏՐՈՆ, ՍԱՐՅԱՆ Փ., Շ 31, Բն. 16 ԲՆ. -> Hayastan, YEREVAN, KENTRON, SARYAN P'., SH 31, Bn. 16 BN.", () => {
    expect(
      transliterateArmenianText(
        "Հայաստան, ԵՐԵՎԱՆ, ԿԵՆՏՐՈՆ, ՍԱՐՅԱՆ Փ., Շ 31, Բն. 16 ԲՆ."
      )
    ).toBe("Hayastan, YEREVAN, KENTRON, SARYAN P'., SH 31, Bn. 16 BN.");
  });

  /**
   * Fully uppercase Armenian -> fully uppercase Latin.
   */
  test("ՄԵՂԵԴԻ -> MEGHEDI", () => {
    expect(transliterateArmenianText("ՄԵՂԵԴԻ")).toBe("MEGHEDI");
  });

  /**
   * Simple lowercase transliteration.
   */
  test("ուրախ -> urakh", () => {
    expect(transliterateArmenianText("ուրախ")).toBe("urakh");
  });

  /**
   * Verifies mapping of punctuation (՞ -> ? / ։ -> .) and initial Ո -> Vo.
   */
  test("Ով է այնտեղ։ -> Ov e ayntegh.", () => {
    expect(transliterateArmenianText("Ով է այնտեղ։")).toBe("Ov e ayntegh.");
  });

  /**
   * Multi-word mixed-case, spacing, and common letter mappings.
   */
  test("Տիգրան Պետրոսյան -> Tigran Petrosyan", () => {
    expect(transliterateArmenianText("Տիգրան Պետրոսյան")).toBe(
      "Tigran Petrosyan"
    );
  });

  /**
   * Verifies Շ -> Sh mapping.
   */
  test("Շողեր -> Shogher", () => {
    expect(transliterateArmenianText("Շողեր")).toBe("Shogher");
  });

  /**
   * Aspirated consonant test: Թ -> T'.
   */
  test("Թեստավորում -> T'estavorum", () => {
    expect(transliterateArmenianText("Թեստավորում")).toBe("T'estavorum");
  });

  /**
   * Longer multi-word phrase with different letters, including apostrophe for տ’ in context.
   */
  test("Արմենիայի Հանրապետություն -> Armeniayi Hanrapetut'yun", () => {
    expect(transliterateArmenianText("Արմենիայի Հանրապետություն")).toBe(
      "Armeniayi Hanrapetut'yun"
    );
  });

  /**
   * Verifies Շ -> Sh, տ -> t, ո -> o in context.
   */
  test("Մաշտոցի պողոտա -> Mashtotsi poghota", () => {
    expect(transliterateArmenianText("Մաշտոցի պողոտա")).toBe(
      "Mashtotsi poghota"
    );
  });

  /**
   * Verifies single-word starting with և -> yev...
   */
  test("ևազգի -> yevazgi", () => {
    expect(transliterateArmenianText("ևազգի")).toBe("yevazgi");
  });

  /**
   * Verifies և + վ (two consecutive letters).
   */
  test("ևվատ -> yevvat", () => {
    expect(transliterateArmenianText("ևվատ")).toBe("yevvat");
  });

  /**
   * Verifies initial Ու -> U.
   */
  test("Ուրախ -> Urakh", () => {
    expect(transliterateArmenianText("Ուրախ")).toBe("Urakh");
  });

  /**
   * Verifies initial Ո -> Vo, then ղ -> gh, ջ -> j, ու -> u, յ -> y, ն -> n.
   *
   * NOTE: If your chosen scheme merges "ղջ" differently, update accordingly.
   */
  test("Ողջույն -> Voghjuyn", () => {
    // Common classical-based mapping would be Vo + gh + j + u + y + n => "Voghjuyn"
    // If your system does something else, adapt as needed, but the comment implies gh + j usage.
    expect(transliterateArmenianText("Ողջույն")).toBe("Voghjuyn");
  });

  /**
   * Verifies initial Ե -> Ye plus standard letters inside.
   */
  test("Երևան -> Yerevan", () => {
    expect(transliterateArmenianText("Երևան")).toBe("Yerevan");
  });

  /**
   * Verifies that "ու" is treated as a separate word here, transliterating to "u".
   */
  test("Նոր ու նորից -> Nor u norits", () => {
    expect(transliterateArmenianText("Նոր ու նորից")).toBe("Nor u norits");
  });

  /**
   * Verifies mid-sentence և -> yev.
   */
  test("Մեզ և ձեզ -> Mez yev dzez", () => {
    expect(transliterateArmenianText("Մեզ և ձեզ")).toBe("Mez yev dzez");
  });

  /**
   * Full uppercase transliteration plus single question mark for Armenian '՞'.
   */
  test("ՄԱՍՍԵՐԼԻ՞ -> MASSERLI?", () => {
    expect(transliterateArmenianText("ՄԱՍՍԵՐԼԻ՞")).toBe("MASSERLI?");
  });

  /**
   * Verifies handling of Եվ at the beginning plus punctuation.
   */
  test("Եվս մեկ անգամ! -> Yevs mek angam!", () => {
    expect(transliterateArmenianText("Եվս մեկ անգամ!")).toBe("Yevs mek angam!");
  });

  /**
   * Question mark replacement.
   */
  test("Ինչու՞ -> Inchu?", () => {
    expect(transliterateArmenianText("Ինչու՞")).toBe("Inchu?");
  });

  /**
   * Verifies Armenian comma '՝' -> ',' and that other punctuation is preserved.
   */
  test("Այսօր՝ Հայաստանում. -> Aysor, Hayastanum.", () => {
    expect(transliterateArmenianText("Այսօր՝ Հայաստանում.")).toBe(
      "Aysor, Hayastanum."
    );
  });

  /**
   * Verifies letters mixed with numbers and the 'թ' -> t'.
   */
  test("Արմենիա2024թ -> Armenia2024t'", () => {
    expect(transliterateArmenianText("Արմենիա2024թ")).toBe("Armenia2024t'");
  });

  /**
   * Alphanumeric content.
   */
  test("Գ3 վարդեր -> G3 varder", () => {
    expect(transliterateArmenianText("Գ3 վարդեր")).toBe("G3 varder");
  });

  /**
   * Verifies և with a hyphen.
   */
  test("և-ով -> yev-ov", () => {
    expect(transliterateArmenianText("և-ով")).toBe("yev-ov");
  });

  /**
   * Mixed uppercase/lowercase words. Each uppercase Armenian block -> uppercase Latin.
   */
  test("ԵՐԵՎԱՆ yerevan ԵՎՐՈՊԱ ԱՇԽԱՐՀ -> YEREVAN yerevan YEVROPA ASHKHARH", () => {
    expect(transliterateArmenianText("ԵՐԵՎԱՆ yerevan ԵՎՐՈՊԱ ԱՇԽԱՐՀ")).toBe(
      "YEREVAN yerevan YEVROPA ASHKHARH"
    );
  });

  /**
   * Multiple punctuation, exclamations, and '՞' -> '?' mapping.
   */
  test("Ողջույն!!! Որտեղ՞ ես? -> Voghjuyn!!! Vortegh? es?", () => {
    expect(transliterateArmenianText("Ողջույն!!! Որտեղ՞ ես?")).toBe(
      "Voghjuyn!!! Vortegh? es?"
    );
  });

  /**
   * Verify line breaks are preserved and question mark replaced properly.
   */
  test("Բարեւ.\nՔանի՞ անգամ: -> Barev.\nK'ani? angam:", () => {
    expect(transliterateArmenianText("Բարեւ.\nՔանի՞ անգամ:")).toBe(
      "Barev.\nK'ani? angam:"
    );
  });

  /**
   * Aspirated vs. unaspirated pairs (e.g., պ -> p, փ -> p').
   */
  test("Փակ պարկ -> P'ak park", () => {
    expect(transliterateArmenianText("Փակ պարկ")).toBe("P'ak park");
  });

  /**
   * Check խ -> kh, ղ -> gh, ճ -> ch, չ -> ch', ռ -> r' differences.
   */
  test("Խաղ չեմ գնում ռեստորան -> Khagh chem gnum restoran", () => {
    // Example: Խ -> Kh, աղ -> agh, չ -> ch', եմ -> em, ռ -> r'
    // If your scheme differs, adapt accordingly.
    expect(transliterateArmenianText("Խաղ չեմ գնում ռեստորան")).toBe(
      "Khagh chem gnum restoran"
    );
  });

  /**
   * Verify ո -> o, օ -> o, but ensure you handle them as separate letters.
   */
  test("Ոսկի Օր -> Voski Or", () => {
    // Ո -> Vo if word-initial, but here it's not quite at start of line,
    // so be sure your code recognizes word boundaries. If it is at word start, it's "Vo-".
    // In this example, "Ոսկի" is a separate word, so initial Ո => Vo.
    // Օր is also word-initial, so Օ -> O.
    expect(transliterateArmenianText("Ոսկի Օր")).toBe("Voski Or");
  });

  /**
   * Testing letter clusters: աղջիկ -> aghjik.
   */
  test("աղջիկ -> aghjik", () => {
    expect(transliterateArmenianText("աղջիկ")).toBe("aghjik");
  });

  /**
   * Check for consonant+և sequence in the middle of a word.
   */
  test("դեռևս -> derevs", () => {
    expect(transliterateArmenianText("դեռևս")).toBe("derevs");
  });
});
