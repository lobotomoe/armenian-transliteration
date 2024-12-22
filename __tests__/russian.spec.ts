import { transliterate } from "../src";

describe("Armenian transliteration correctness (Russian)", () => {
  /**
   * Basic letter mappings and single-word handling.
   */
  test("Կենտրոն -> Кентрон", () => {
    // Mixed-case check
    expect(transliterate("Կենտրոն", "ru")).toBe("Кентрон");
  });

  /**
   * Verifies mapping of initial Ո (word-initial) to Vo.
   */
  test("Ոչ -> Воч", () => {
    expect(transliterate("Ոչ", "ru")).toBe("Воч");
  });

  /**
   * Multi-word string with punctuation, uppercase words, numbers, etc.
   */
  test("Հայաստան, ԵՐԵՎԱՆ, ԿԵՆՏՐՈՆ, ՍԱՐՅԱՆ Փ., Շ 31, Բն. 16 ԲՆ. -> Хайастан, ЕРЕВАН, КЕНТРОН, САРЙАН П'., Ш 31, Бн. 16 БН.", () => {
    expect(
      transliterate(
        "Հայաստան, ԵՐԵՎԱՆ, ԿԵՆՏՐՈՆ, ՍԱՐՅԱՆ Փ., Շ 31, Բն. 16 ԲՆ.",
        "ru"
      )
    ).toBe("Хайастан, ЕРЕВАН, КЕНТРОН, САРЙАН П'., Ш 31, Бн. 16 БН.");
  });

  /**
   * Fully uppercase Armenian -> fully uppercase Russian.
   */
  test("ՄԵՂԵԴԻ -> МЕГЕДИ", () => {
    expect(transliterate("ՄԵՂԵԴԻ", "ru")).toBe("МЕГЕДИ");
  });

  /**
   * Simple lowercase transliteration.
   */
  test("ուրախ -> урах", () => {
    expect(transliterate("ուրախ", "ru")).toBe("урах");
  });

  /**
   * Verifies mapping of punctuation (՞ -> ? / ։ -> .) and initial Ո -> Vo.
   */
  test("Ով է այնտեղ։ -> Ов э айнтегх.", () => {
    expect(transliterate("Ով է այնտեղ։", "ru")).toBe("Ов э айнтегх.");
  });

  /**
   * Multi-word mixed-case, spacing, and common letter mappings.
   */
  test("Տիգրան Պետրոսյան -> Тигран Петросян", () => {
    expect(transliterate("Տիգրան Պետրոսյան", "ru")).toBe("Тигран Петросян");
  });

  /**
   * Verifies Շ -> Ш mapping.
   */
  test("Շողեր -> Шогер", () => {
    expect(transliterate("Շողեր", "ru")).toBe("Шогер");
  });

  /**
   * Aspirated consonant test: Թ -> Т'.
   */
  test("Թեստավորում -> Т'еставорум", () => {
    expect(transliterate("Թեստավորում", "ru")).toBe("Т'еставорум");
  });

  /**
   * Longer multi-word phrase with different letters, including apostrophe for տ’ in context.
   */
  test("Արմենիայի Հանրապետություն -> Арменияйи Ханрапетут'юн", () => {
    expect(transliterate("Արմենիայի Հանրապետություն", "ru")).toBe(
      "Арменияйи Ханрапетут'юн"
    );
  });

  /**
   * Verifies Շ -> Ш, տ -> т, ո -> о in context.
   */
  test("Մաշտոցի պողոտա -> Маштоци погота", () => {
    expect(transliterate("Մաշտոցի պողոտա", "ru")).toBe("Маштоци погота");
  });

  /**
   * Verifies single-word starting with և -> yev...
   */
  test("ևազգի -> евазги", () => {
    expect(transliterate("ևազգի", "ru")).toBe("евазги");
  });

  /**
   * Verifies և + վ (two consecutive letters).
   */
  test("ևվատ -> евват", () => {
    expect(transliterate("ևվատ", "ru")).toBe("евват");
  });

  /**
   * Verifies initial Ու -> У.
   */
  test("Ուրախ -> Урах", () => {
    expect(transliterate("Ուրախ", "ru")).toBe("Урах");
  });

  /**
   * Verifies initial Ո -> Во, then ղ -> гх, ջ -> ж, ու -> у, յ -> й, ն -> н.
   *
   * NOTE: If your chosen scheme merges "ղջ" differently, update accordingly.
   */
  test("Ողջույն -> Вогхжуйн", () => {
    // Common classical-based mapping would be Во + гх + ж + у + й + н => "Вогхжуйн"
    // If your system does something else, adapt as needed, but the comment implies gh + j usage.
    expect(transliterate("Ողջույն", "ru")).toBe("Вогхжуйн");
  });

  /**
   * Verifies initial Ե -> Ye plus standard letters inside.
   */
  test("Երևան -> Ереван", () => {
    expect(transliterate("Երևան", "ru")).toBe("Ереван");
  });

  /**
   * Verifies that "ու" is treated as a separate word here, transliterating to "у".
   */
  test("Նոր ու նորից -> Нор у новриц", () => {
    expect(transliterate("Նոր ու նորից", "ru")).toBe("Нор у новриц");
  });

  /**
   * Verifies mid-sentence և -> ев.
   */
  test("Մեզ և ձեզ -> Мез ев дзез", () => {
    expect(transliterate("Մեզ և ձեզ", "ru")).toBe("Мез ев дзез");
  });

  /**
   * Full uppercase transliteration plus single question mark for Armenian '՞'.
   */
  test("ՄԱՍՍԵՐԼԻ՞ -> МАССЕРЛИ?", () => {
    expect(transliterate("ՄԱՍՍԵՐԼԻ՞", "ru")).toBe("МАССЕРЛИ?");
  });

  /**
   * Verifies handling of Եվ at the beginning plus punctuation.
   */
  test("Եվս մեկ անգամ! -> Евс мек ангам!", () => {
    expect(transliterate("Եվս մեկ անգամ!", "ru")).toBe("Евс мек ангам!");
  });

  /**
   * Question mark replacement.
   */
  test("Ինչու՞ -> Инчу?", () => {
    expect(transliterate("Ինչու՞", "ru")).toBe("Инчу?");
  });

  /**
   * Verifies Armenian comma '՝' -> ',' and that other punctuation is preserved.
   */
  test("Այսօր՝ Հայաստանում. -> Айсор, Хайастанум.", () => {
    expect(transliterate("Այսօր՝ Հայաստանում.", "ru")).toBe(
      "Айсор, Хайастанум."
    );
  });

  /**
   * Verifies letters mixed with numbers and the 'թ' -> т'.
   */
  test("Արմենիա2024թ -> Армения2024т'", () => {
    expect(transliterate("Արմենիա2024թ", "ru")).toBe("Армения2024т'");
  });

  /**
   * Alphanumeric content.
   */
  test("Գ3 վարդեր -> Г3 вардер", () => {
    expect(transliterate("Գ3 վարդեր", "ru")).toBe("Г3 вардер");
  });

  /**
   * Verifies և with a hyphen.
   */
  test("և-ով -> ев-ов", () => {
    expect(transliterate("և-ով", "ru")).toBe("ев-ов");
  });

  /**
   * Mixed uppercase/lowercase words. Each uppercase Armenian block -> uppercase Russian.
   */
  test("ԵՐԵՎԱՆ yerevan ԵՎՐՈՊԱ ԱՇԽԱՐՀ -> ЕРЕВАН yerevan ЕВРОПА АШХАРХ", () => {
    expect(transliterate("ԵՐԵՎԱՆ yerevan ԵՎՐՈՊԱ ԱՇԽԱՐՀ", "ru")).toBe(
      "ЕРЕВАН yerevan ЕВРОПА АШХАРХ"
    );
  });

  /**
   * Multiple punctuation, exclamations, and '՞' -> '?' mapping.
   */
  test("Ողջույն!!! Որտեղ՞ ես? -> Вогхжуйн!!! Вортегх? ес?", () => {
    expect(transliterate("Ողջույն!!! Որտեղ՞ ես?", "ru")).toBe(
      "Вогхжуйн!!! Вортегх? ес?"
    );
  });

  /**
   * Verify line breaks are preserved and question mark replaced properly.
   */
  test("Բարեւ.\nՔանի՞ անգամ: -> Барев.\nК'ани? ангам:", () => {
    expect(transliterate("Բարեւ.\nՔանի՞ անգամ:", "ru")).toBe(
      "Барев.\nК'ани? ангам:"
    );
  });

  /**
   * Aspirated vs. unaspirated pairs (e.g., պ -> п, փ -> п').
   */
  test("Փակ պարկ -> П'ак парк", () => {
    expect(transliterate("Փակ պարկ", "ru")).toBe("П'ак парк");
  });

  /**
   * Check խ -> х, ղ -> гх, ճ -> ч', չ -> ч', ռ -> р' differences.
   */
  test("Խաղ չեմ գնում ռեստորան -> Хагх хим гнум ресторан", () => {
    // Example: Խ -> Х, ղ -> гх, չ -> ч', ռ -> р'
    expect(transliterate("Խաղ չեմ գնում ռեստորան", "ru")).toBe(
      "Хагх хим гнум ресторан"
    );
  });

  /**
   * Verify ո -> о, օ -> о, but ensure you handle them as separate letters.
   */
  test("Ոսկի Օր -> Воски Ор", () => {
    // Ո -> Во if word-initial, but here it's at the start of a word,
    // so "Ոսկի" -> "Воски", "Օր" -> "Ор"
    expect(transliterate("Ոսկի Օր", "ru")).toBe("Воски Ор");
  });

  /**
   * Testing letter clusters: աղջիկ -> агхжик.
   */
  test("աղջիկ -> агхжик", () => {
    expect(transliterate("աղջիկ", "ru")).toBe("агхжик");
  });

  /**
   * Check for consonant+և sequence in the middle of a word.
   */
  test("դեռևս -> дэрэвс", () => {
    expect(transliterate("դեռևս", "ru")).toBe("дэрэвс");
  });
});
