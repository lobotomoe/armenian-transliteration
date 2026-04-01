/**
 * Russian Personal Names Transliteration (Вартапетян) — comprehensive tests.
 *
 * Source: Вартапетян Н. А. Справочник по русской транскрипции армянских
 * имён, фамилий и географических названий. — Армянское государственное
 * издательство.
 *
 * Key differences from ru-geographic:
 *   - հ [h] — positional rule (NOT a fixed х as in geographic):
 *       word-initial before vowel  → "" (omit: Հakob → Акоб, Հarutyun → Арутюн)
 *       word-initial before consonant → г (Hrant → Грант)
 *       mid-word                   → г
 *
 * Shared with ru-geographic:
 *   - ջ [dʒ] → дж
 *   - ղ [ʁ]  → к word-initial; г mid-word
 *   - ո      → во word-initial + consonant; о elsewhere
 */
import { transliterate } from "../../src";

const t = (text: string) => transliterate(text, { standard: "ru-personal" });

const B = "\u0562"; // բ — neutral mid-word wrapper
const mid = (ch: string) => `${B}${ch}${B}`;

describe("ru-personal standard", () => {
  // ─────────────────────────────────────────────────────────────────────────
  // All 38 lowercase letters in mid-word context
  // ─────────────────────────────────────────────────────────────────────────
  describe("38 lowercase letter mappings (mid-word context)", () => {
    test.each([
      ["\u0561", "\u0430"], // ա → а
      ["\u0562", "\u0431"], // բ → б
      ["\u0563", "\u0433"], // գ → г
      ["\u0564", "\u0434"], // դ → д
      ["\u0565", "\u0435"], // ե → е
      ["\u0566", "\u0437"], // զ → з
      ["\u0567", "\u044D"], // է → э
      ["\u0568", "\u044B"], // ը → ы
      ["\u0569", "\u0442"], // թ → т
      ["\u056A", "\u0436"], // ժ → ж
      ["\u056B", "\u0438"], // ի → и
      ["\u056C", "\u043B"], // լ → л
      ["\u056D", "\u0445"], // խ → х
      ["\u056E", "\u0446"], // ծ → ц
      ["\u056F", "\u043A"], // կ → к
      ["\u0570", "\u0433"], // հ → г (mid-word; KEY DIFFERENCE from ru-geographic which uses х)
      ["\u0571", "\u0434\u0437"], // ձ → дз
      ["\u0572", "\u0433"], // ղ → г (mid-word)
      ["\u0573", "\u0447"], // ճ → ч
      ["\u0574", "\u043C"], // մ → м
      ["\u0575", "\u0439"], // յ → й
      ["\u0576", "\u043D"], // ն → н
      ["\u0577", "\u0448"], // շ → ш
      ["\u0578", "\u043E"], // ո → о (mid-word)
      ["\u0579", "\u0447"], // չ → ч
      ["\u057A", "\u043F"], // պ → п
      ["\u057B", "\u0434\u0436"], // ջ → дж (not ж)
      ["\u057C", "\u0440"], // ռ → р
      ["\u057D", "\u0441"], // ս → с
      ["\u057E", "\u0432"], // վ → в
      ["\u057F", "\u0442"], // տ → т
      ["\u0580", "\u0440"], // ր → р
      ["\u0581", "\u0446"], // ց → ц
      ["\u0582", "\u0443"], // ւ → у
      ["\u0583", "\u043F"], // փ → п
      ["\u0584", "\u043A"], // ք → к
      ["\u0585", "\u043E"], // օ → о
      ["\u0586", "\u0444"], // ֆ → ф
    ])("\u0562%s\u0562 → \u0431%s\u0431", (ch, expected) => {
      expect(t(mid(ch))).toBe(`\u0431${expected}\u0431`);
    });
  });

  // ─────────────────────────────────────────────────────────────────────────
  // All 38 uppercase single-letter words (isolated position → word-initial rules fire)
  // ─────────────────────────────────────────────────────────────────────────
  describe("38 uppercase single-letter words", () => {
    test.each([
      ["\u0531", "\u0410"], // Ա → А
      ["\u0532", "\u0411"], // Բ → Б
      ["\u0533", "\u0413"], // Գ → Г
      ["\u0534", "\u0414"], // Դ → Д
      ["\u0535", "\u0415"], // Ե → Е
      ["\u0536", "\u0417"], // Զ → З
      ["\u0537", "\u042D"], // Է → Э
      ["\u0538", "\u042B"], // Ը → Ы
      ["\u0539", "\u0422"], // Թ → Т
      ["\u053A", "\u0416"], // Ժ → Ж
      ["\u053B", "\u0418"], // Ի → И
      ["\u053C", "\u041B"], // Լ → Л
      ["\u053D", "\u0425"], // Խ → Х
      ["\u053E", "\u0426"], // Ծ → Ц
      ["\u053F", "\u041A"], // Կ → К
      // Հ isolated (word-initial, no following token): falls through to word-initial→г rule → Г
      ["\u0540", "\u0413"], // Հ isolated → Г
      ["\u0541", "\u0414\u0417"], // Ձ → ДЗ
      ["\u0542", "\u041A"], // Ղ isolated → К (word-initial)
      ["\u0543", "\u0427"], // Ճ → Ч
      ["\u0544", "\u041C"], // Մ → М
      ["\u0545", "\u0419"], // Յ → Й
      ["\u0546", "\u041D"], // Ն → Н
      ["\u0547", "\u0428"], // Շ → Ш
      ["\u0548", "\u0412\u041E"], // Ո isolated → ВО
      ["\u0549", "\u0427"], // Չ → Ч
      ["\u054A", "\u041F"], // Պ → П
      ["\u054B", "\u0414\u0416"], // Ջ → ДЖ (not Ж)
      ["\u054C", "\u0420"], // Ռ → Р
      ["\u054D", "\u0421"], // Ս → С
      ["\u054E", "\u0412"], // Վ → В
      ["\u054F", "\u0422"], // Տ → Т
      ["\u0550", "\u0420"], // Ր → Р
      ["\u0551", "\u0426"], // Ց → Ц
      ["\u0552", "\u0423"], // Ւ → У
      ["\u0553", "\u041F"], // Փ → П
      ["\u0554", "\u041A"], // Ք → К
      ["\u0555", "\u041E"], // Օ → О
      ["\u0556", "\u0424"], // Ֆ → Ф
    ])("%s → %s", (armenian, expected) => {
      expect(t(armenian)).toBe(expected);
    });
  });

  // ─────────────────────────────────────────────────────────────────────────
  // հ positional rule (KEY DIFFERENCE from ru-geographic)
  // ─────────────────────────────────────────────────────────────────────────
  describe("հ positional rule", () => {
    // word-initial before vowel → omit
    test("հ + ա (word-initial before vowel) → empty (omit)", () => {
      expect(t("\u0570\u0561")).toBe("\u0430"); // հa → а
    });

    test("հakob: հ+ա+կ+ο+բ → акоб (initial Հ dropped before vowel ա)", () => {
      expect(t("\u0570\u0561\u056F\u0578\u0562")).toBe(
        "\u0430\u043A\u043E\u0431",
      );
    });

    test("հarutyun: հ+ա+ρ+ο+υ+τ+υ+ν → арутюн", () => {
      expect(
        t("\u0570\u0561\u0580\u0578\u0582\u0569\u0575\u0578\u0582\u0576"),
      ).toBe("\u0430\u0440\u0443\u0442\u044E\u043D");
    });

    test("հaяcтan: lowercase հaяcтан → аяcтан (Հ dropped before ա)", () => {
      expect(t("\u0570\u0561\u0575\u0561\u057D\u057F\u0561\u0576")).toBe(
        "\u0430\u044F\u0441\u0442\u0430\u043D",
      );
    });

    // word-initial before consonant → г
    test("հ + ρ (word-initial before consonant) → г+ρ…", () => {
      expect(t("\u0570\u0580")).toBe("\u0433\u0440"); // հр → гр
    });

    test("հrant: հ+ρ+ա+ν+τ → грант (initial Հ before consonant ρ → г)", () => {
      expect(t("\u0570\u0580\u0561\u0576\u057F")).toBe(
        "\u0433\u0440\u0430\u043D\u0442",
      );
    });

    test("հ+մ (word-initial before consonant մ) → г+м", () => {
      expect(t("\u0570\u0574")).toBe("\u0433\u043C");
    });

    // mid-word → г
    test("mid-word հ → г (not х)", () => {
      expect(t(mid("\u0570"))).toBe("\u0431\u0433\u0431");
    });

    // isolated հ → г (wordInitial + no following vowel → second rule fires → г)
    test("հ isolated → г (word-initial before nothing → г, not omit)", () => {
      expect(t("\u0570")).toBe("\u0433");
    });

    test("Հ isolated → Г", () => {
      expect(t("\u0540")).toBe("\u0413");
    });

    // contrast with ru-geographic: same word gives different result
    test("contrast: in ru-geographic lowercase հaяcтан → хаяcтан; here → аяcтан", () => {
      const geo = transliterate(
        "\u0570\u0561\u0575\u0561\u057D\u057F\u0561\u0576",
        { standard: "ru-geographic" },
      );
      const per = t("\u0570\u0561\u0575\u0561\u057D\u057F\u0561\u0576");
      expect(geo).toBe("\u0445\u0430\u044F\u0441\u0442\u0430\u043D"); // хаяcтан
      expect(per).toBe("\u0430\u044F\u0441\u0442\u0430\u043D"); // аяcтан
    });
  });

  // ─────────────────────────────────────────────────────────────────────────
  // ղ positional: word-initial → к; mid-word → г  (shared with ru-geographic)
  // ─────────────────────────────────────────────────────────────────────────
  describe("ղ positional rule: word-initial к, mid-word г", () => {
    test("ղ isolated → к", () => {
      expect(t("\u0572")).toBe("\u043A");
    });

    test("Ղ isolated → К", () => {
      expect(t("\u0542")).toBe("\u041A");
    });

    test("mid-word ղ → г", () => {
      expect(t(mid("\u0572"))).toBe("\u0431\u0433\u0431");
    });

    test("Меgedi: Մ+ε+ղ+ε+δ+ι → Мегеди", () => {
      expect(t("\u0544\u0565\u0572\u0565\u0564\u056B")).toBe(
        "\u041C\u0435\u0433\u0435\u0434\u0438",
      );
    });
  });

  // ─────────────────────────────────────────────────────────────────────────
  // ջ → дж  (shared with ru-geographic)
  // ─────────────────────────────────────────────────────────────────────────
  describe("ջ → дж", () => {
    test("ջ isolated → дж", () => {
      expect(t("\u057B")).toBe("\u0434\u0436");
    });

    test("Ջ isolated → ДЖ", () => {
      expect(t("\u054B")).toBe("\u0414\u0416");
    });

    test("title Ջeюан → Джеюан", () => {
      expect(t("\u054B\u0565\u0575\u0578\u0582\u0561\u0576")).toBe(
        "\u0414\u0436\u0435\u044E\u0430\u043D",
      );
    });

    test("aghjik (ա+ղ+ջ+ι+κ) → агджик", () => {
      expect(t("\u0561\u0572\u057B\u056B\u056F")).toBe(
        "\u0430\u0433\u0434\u0436\u0438\u043A",
      );
    });
  });

  // ─────────────────────────────────────────────────────────────────────────
  // ո word-initial context  (shared with ru-geographic)
  // ─────────────────────────────────────────────────────────────────────────
  describe("ο word-initial context rules", () => {
    test("ο isolated → во", () => {
      expect(t("\u0578")).toBe("\u0432\u043E");
    });

    test("ο+ν (+ consonant) → вон", () => {
      expect(t("\u0578\u0576")).toBe("\u0432\u043E\u043D");
    });

    test("ο+β (ο followed by β) → ов, not во", () => {
      expect(t("\u0578\u057E")).toBe("\u043E\u0432");
    });

    test("mid-word ο: բ+ο+բ → боб", () => {
      expect(t(mid("\u0578"))).toBe("\u0431\u043E\u0431");
    });
  });

  // ─────────────────────────────────────────────────────────────────────────
  // Sequences
  // ─────────────────────────────────────────────────────────────────────────
  describe("sequences: ου → у, υου → ю, υα → я, and → ев", () => {
    test("ου isolated → у", () => {
      expect(t("\u0578\u0582")).toBe("\u0443");
    });

    test("υου isolated → ю", () => {
      expect(t("\u0575\u0578\u0582")).toBe("\u044E");
    });

    test("υα isolated → я", () => {
      expect(t("\u0575\u0561")).toBe("\u044F");
    });

    test("and (U+0587) isolated → ев", () => {
      expect(t("\u0587")).toBe("\u0435\u0432");
    });

    test("Ереван: Ε+ρ+and+α+ν → Ереван", () => {
      expect(t("\u0535\u057C\u0587\u0561\u0576")).toBe(
        "\u0415\u0440\u0435\u0432\u0430\u043D",
      );
    });
  });

  // ─────────────────────────────────────────────────────────────────────────
  // Full Armenian word transliterations (personal names context)
  // ─────────────────────────────────────────────────────────────────────────
  describe("full Armenian word transliterations", () => {
    test.each([
      // Personal names — note հ behavior
      ["\u0570\u0561\u056F\u0578\u0562", "\u0430\u043A\u043E\u0431"], // հakob → акоб (Акоб)
      [
        "\u0570\u0561\u0580\u0578\u0582\u0569\u0575\u0578\u0582\u0576",
        "\u0430\u0440\u0443\u0442\u044E\u043D",
      ], // հaруtюн → арутюн
      ["\u0570\u0580\u0561\u0576\u057F", "\u0433\u0440\u0430\u043D\u0442"], // հrant → грант
      [
        "\u053F\u0565\u0576\u057F\u0580\u0578\u0576",
        "\u041A\u0435\u043D\u0442\u0440\u043E\u043D",
      ], // Кентрон
      [
        "\u054F\u056B\u0563\u0580\u0561\u0576",
        "\u0422\u0438\u0433\u0440\u0430\u043D",
      ], // Тигран
      [
        "\u0531\u0580\u0574\u0565\u0576\u056B\u0561",
        "\u0410\u0440\u043C\u0435\u043D\u0438\u0430",
      ], // Армениа
      [
        "\u054A\u0565\u057F\u0580\u0578\u057D\u0575\u0561\u0576",
        "\u041F\u0435\u0442\u0440\u043E\u0441\u044F\u043D",
      ], // Петросян
      [
        "\u0544\u0565\u0572\u0565\u0564\u056B",
        "\u041C\u0435\u0433\u0435\u0434\u0438",
      ], // Мегеди
      [
        "\u0535\u057C\u0587\u0561\u0576",
        "\u0415\u0440\u0435\u0432\u0430\u043D",
      ], // Ереван
      // Common words (same as ru-geographic)
      ["\u056B\u0576\u0584\u0568", "\u0438\u043D\u043A\u044B"], // ինqը → инкы
      ["\u056F\u0561\u0580\u0578\u0572", "\u043A\u0430\u0440\u043E\u0433"], // կarəɤ → карог
      ["\u0576\u0561\u0587", "\u043D\u0430\u0435\u0432"], // naew → наев
      ["\u0574\u0565\u057B", "\u043C\u0435\u0434\u0436"], // mej → медж
      ["\u0569\u0565", "\u0442\u0435"], // te → те
      ["\u0578\u0579", "\u0432\u043E\u0447"], // voch → воч
      ["\u0565\u057D", "\u0435\u0441"], // yes → ес
    ])('"%s" → "%s"', (armenian, expected) => {
      expect(t(armenian)).toBe(expected);
    });
  });

  // ─────────────────────────────────────────────────────────────────────────
  // Multi-word phrases
  // ─────────────────────────────────────────────────────────────────────────
  describe("multi-word phrase transliterations", () => {
    test("Nor u Norits", () => {
      expect(
        t("\u0546\u0578\u0580 \u0578\u0582 \u0576\u0578\u0580\u056B\u0581"),
      ).toBe("\u041D\u043E\u0440 \u0443 \u043D\u043E\u0440\u0438\u0446");
    });

    test("Voski Or → Воски Ор", () => {
      expect(t("\u0548\u057D\u056F\u056B \u0555\u0580")).toBe(
        "\u0412\u043E\u0441\u043A\u0438 \u041E\u0440",
      );
    });
  });
});
