import { transliterate } from "../src";

/**
 * Test suite for Armenian-to-Russian transliteration.
 * Each test checks a specific case or set of letters, punctuation,
 * or contextual rules (e.g. initial letters, uppercase blocks, etc.).
 */
describe("Armenian transliteration correctness (Russian)", () => {
  /**
   * Basic letter mapping test: mixed case.
   */
  test("Կենտրոն -> Кентрон", () => {
    expect(transliterate("Կենտրոն", "ru")).toBe("Кентрон");
  });

  /**
   * Verifies mapping of initial Ո to 'Во' in most words.
   * (Note: 'Ով' is handled as 'Ов' below—special case in many systems.)
   */
  test("Ոչ -> Воч", () => {
    expect(transliterate("Ոչ", "ru")).toBe("Воч");
  });

  /**
   * Multi-word string with punctuation, uppercase words, numbers, etc.
   * Also shows that 'փ' -> 'п'' and 'շ' -> 'ш'.
   */
  test("Հայաստան, ԵՐԵՎԱՆ, ԿԵՆՏՐՈՆ, ՍԱՐՅԱՆ Փ., Շ 31, Բն. 16 ԲՆ. -> Хаястан, ЕРЕВАН, КЕНТРОН, САРЙАН П., Ш 31, Бн. 16 БН.", () => {
    expect(
      transliterate(
        "Հայաստան, ԵՐԵՎԱՆ, ԿԵՆՏՐՈՆ, ՍԱՐՅԱՆ Փ., Շ 31, Բն. 16 ԲՆ.",
        "ru"
      )
    ).toBe("Хаястан, ЕРЕВАН, КЕНТРОН, САРЙАН П., Ш 31, Бн. 16 БН.");
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
   * Verifies punctuation mapping (՞ -> ?) and one special case:
   * here 'Ով' transliterates to 'Ов' instead of 'Вов'.
   */
  test("Ով է այնտեղ։ -> Ов э айнтег.", () => {
    expect(transliterate("Ով է այնտեղ։", "ru")).toBe("Ов э айнтег.");
  });

  /**
   * Multi-word mixed-case, spacing, and standard letters.
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
   * Aspirated consonant test: in some systems Թ is marked with an apostrophe,
   * but here we see the final output as just Т (no apostrophe).
   */
  test("Թեստավորում -> Теставорум", () => {
    expect(transliterate("Թեստավորում", "ru")).toBe("Теставорум");
  });

  /**
   * Longer multi-word phrase with different letters,
   * including final '-յուն' -> 'ютюн' or similar.
   */
  test("Արմենիայի Հանրապետություն -> Армениайи Ханрапетутюн", () => {
    expect(transliterate("Արմենիայի Հանրապետություն", "ru")).toBe(
      "Армениайи Ханрапетутюн"
    );
  });

  /**
   * Verifies Շ -> Ш, տ -> т, ո -> о in context.
   */
  test("Մաշտոցի պողոտա -> Маштоци погота", () => {
    expect(transliterate("Մաշտոցի պողոտա", "ru")).toBe("Маштоци погота");
  });

  /**
   * Verifies single-word starting with և -> "ев".
   */
  test("ևազգի -> евазги", () => {
    expect(transliterate("ևազգի", "ru")).toBe("евазги");
  });

  /**
   * Verifies two consecutive letters: և + վ.
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
   * Verifies initial Ո -> Во plus combination ղ -> г, ջ -> ж, ու -> у, յ -> й, ն -> н.
   */
  test("Ողջույն -> Вогжуйн", () => {
    expect(transliterate("Ողջույն", "ru")).toBe("Вогжуйн");
  });

  /**
   * Verifies initial Ե -> Е plus standard letters inside.
   */
  test("Երևան -> Ереван", () => {
    expect(transliterate("Երևան", "ru")).toBe("Ереван");
  });

  /**
   * Verifies that "ու" is separate when it's its own word, transliterating to "у".
   */
  test("Նոր ու նորից -> Нор у нориц", () => {
    expect(transliterate("Նոր ու նորից", "ru")).toBe("Нор у нориц");
  });

  /**
   * Verifies mid-sentence և -> ев.
   */
  test("Մեզ և ձեզ -> Мез ев дзез", () => {
    expect(transliterate("Մեզ և ձեզ", "ru")).toBe("Мез ев дзез");
  });

  /**
   * Full uppercase transliteration plus question mark for Armenian '՞'.
   */
  test("ՄԱՍՍԵՐԼԻ՞ -> МАССЕРЛИ?", () => {
    expect(transliterate("ՄԱՍՍԵՐԼԻ՞", "ru")).toBe("МАССЕРЛИ?");
  });

  /**
   * Verifies handling of 'Եվ' at the beginning plus punctuation.
   */
  test("Եվս մեկ անգամ! -> Евс мек ангам!", () => {
    expect(transliterate("Եվս մեկ անգամ!", "ru")).toBe("Евс мек ангам!");
  });

  /**
   * Simple question mark replacement.
   */
  test("Ինչու՞ -> Инчу?", () => {
    expect(transliterate("Ինչու՞", "ru")).toBe("Инчу?");
  });

  /**
   * Verifies Armenian comma '՝' -> ',' and that other punctuation is preserved.
   */
  test("Այսօր՝ Հայաստանում. -> Айсор, Хаястанум.", () => {
    expect(transliterate("Այսօր՝ Հայաստանում.", "ru")).toBe(
      "Айсор, Хаястанум."
    );
  });

  /**
   * Verifies letters mixed with numbers and that 'թ' is shown as 'т'
   * (no apostrophe in final result).
   */
  test("Արմենիա2024թ -> Армениа2024т", () => {
    expect(transliterate("Արմենիա2024թ", "ru")).toBe("Армениа2024т");
  });

  /**
   * Alphanumeric test: keeping digits and transliterating letters.
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
   * Mixed uppercase/lowercase words.
   * Each uppercase Armenian block -> uppercase Russian, Latin stays untouched.
   */
  test("ԵՐԵՎԱՆ yerevan ԵՎՐՈՊԱ ԱՇԽԱՐՀ -> ЕРЕВАН yerevan ЕВРОПА АШХАРХ", () => {
    expect(transliterate("ԵՐԵՎԱՆ yerevan ԵՎՐՈՊԱ ԱՇԽԱՐՀ", "ru")).toBe(
      "ЕРЕВАН yerevan ЕВРОПА АШХАРХ"
    );
  });

  /**
   * Multiple punctuation and exclamations.
   * Also '՞' -> '?' mapping.
   */
  test("Ողջույն!!! Որտեղ՞ ես? -> Вогжуйн!!! Вортег? ес?", () => {
    expect(transliterate("Ողջույն!!! Որտեղ՞ ես?", "ru")).toBe(
      "Вогжуйн!!! Вортег? ес?"
    );
  });

  /**
   * Verify line breaks are preserved and question mark replaced properly.
   * Shows that 'Ք' -> 'К' in some systems,
   * here we reflect it as "K'" or "К'".
   */
  test("Բարեւ.\nՔանի՞ անգամ: -> Барев.\nКани? ангам:", () => {
    expect(transliterate("Բարեւ.\nՔանի՞ անգամ:", "ru")).toBe(
      "Барев.\nКани? ангам:"
    );
  });

  /**
   * Aspirated vs. unaspirated pairs example:
   * 'փ' -> 'п', 'պ' -> 'п'.
   */
  test("Փակ պարկ -> Пак парк", () => {
    expect(transliterate("Փակ պարկ", "ru")).toBe("Пак парк");
  });

  /**
   * Check խ -> х, ղ -> г, չ -> ч, ռ -> р, etc.
   */
  test("Խաղ չեմ գնում ռեստորան -> Хаг чем гнум ресторан", () => {
    expect(transliterate("Խաղ չեմ գնում ռեստորան", "ru")).toBe(
      "Хаг чем гнум ресторан"
    );
  });

  /**
   * Verify Ո -> Во if word-initial, Օ -> О, etc.
   */
  test("Ոսկի Օր -> Воски Ор", () => {
    expect(transliterate("Ոսկի Օր", "ru")).toBe("Воски Ор");
  });

  /**
   * Testing letter clusters: աղջիկ -> агжик.
   * Demonstrates 'ղ' -> 'г', 'ջ' -> 'ж'.
   */
  test("աղջիկ -> агжик", () => {
    expect(transliterate("աղջիկ", "ru")).toBe("агжик");
  });

  /**
   * Check for consonant+և sequence in the middle of a word.
   * 'դեռևս' -> 'деревс'.
   */
  test("դեռևս -> деревс", () => {
    expect(transliterate("դեռևս", "ru")).toBe("деревс");
  });
});
