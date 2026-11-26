import { transliterate, createTransliterator, listStandards } from "../../src";
import type { ReversibleStandard } from "../../src";
import { ReverseTransliterationEngine } from "../../src/engine/reverse";
import { getStandard } from "../../src/standards/registry";

const REVERSIBLE: readonly ReversibleStandard[] = ["iso-9985", "hubschmann-meillet"];

/** The 38 letters of the alphabet, plus the ու digraph and the և ligature. */
const LETTERS = [
  ..."աբգդեզէըթժիլխծկհձղճմյնշոչպջռսվտրցւփքօֆ",
  "ու",
  "և",
];

/** A third letter keeps every pair a word of two Latin tokens or more. */
const FILLER = "ա";

const toLatin = (text: string, standard: ReversibleStandard) =>
  transliterate(text, { standard });
const toArmenian = (text: string, standard: ReversibleStandard) =>
  transliterate(text, { standard, direction: "to-armenian" });

function titleCase(word: string): string {
  const upper = word.toUpperCase();
  return upper.charAt(0) + upper.slice(1).toLowerCase();
}

/**
 * What a round trip returns: the text itself, except that a lowercase ե+ւ
 * reads back as the ligature, which spells the same Latin "ew".
 */
const expectedBack = (text: string) => text.replaceAll("եւ", "և");

describe.each(REVERSIBLE)("to-armenian: %s", (standard) => {
  const words = LETTERS.flatMap((first) =>
    LETTERS.map((second) => `${first}${second}${FILLER}`),
  );

  test.each(["lower", "title", "upper"] as const)(
    "every letter pair round-trips in %s case",
    (casing) => {
      const cased = words.map((word) => {
        switch (casing) {
          case "lower":
            return word;
          case "title":
            return titleCase(word);
          case "upper":
            return word.toUpperCase();
        }
      });
      const failures = cased.filter((word) => {
        const back = toArmenian(toLatin(word, standard), standard);
        return back !== expectedBack(word);
      });
      expect(failures).toEqual([]);
    },
  );

  test.each([
    "Երևան",
    "Հայաստանի Հանրապետության Սահմանադրություն",
    "Մեսրոպ Մաշտոցը ստեղծել է հայոց այբուբենը 405 թվականին",
    "ԵՐԵՎԱՆԻ ՊԵՏԱԿԱՆ ՀԱՄԱԼՍԱՐԱՆ",
    "Կոմիտասի պողոտա 30, բնակարան 12",
    "Խաչատրյան, Ճաշակ, Ջրաղաց, Ռուբեն, Փարաջանով, Քաջարան, Օշական, Ֆրունզե",
  ])("text round-trips: %s", (text) => {
    expect(toArmenian(toLatin(text, standard), standard)).toBe(text);
  });

  test("lowercase ew reads as the ligature, capitalized Ew as Եւ", () => {
    expect(toArmenian("ew", standard)).toBe("և");
    expect(toArmenian("Ew", standard)).toBe("Եւ");
    expect(toArmenian("EW", standard)).toBe("ԵՒ");
    expect(toArmenian(toLatin("Երեւան", standard), standard)).toBe("Երևան");
  });

  test("decomposed input reads like composed input", () => {
    const composed = toLatin("ղ", standard).normalize("NFC");
    const decomposed = composed.normalize("NFD");
    expect(toArmenian(decomposed, standard)).toBe("ղ");
  });

  test("letters outside the standard and punctuation pass through", () => {
    expect(toArmenian("q.", standard)).toBe("q.");
  });

  test("createTransliterator honours the direction", () => {
    const back = createTransliterator({ standard, direction: "to-armenian" });
    expect(back(toLatin("Գյումրի", standard))).toBe("Գյումրի");
  });
});

describe("to-armenian: exact spellings", () => {
  test("ISO 9985 keeps ո+ւ as two letters", () => {
    expect(toArmenian("Owrartow", "iso-9985")).toBe("Ուրարտու");
  });

  test("Hübschmann-Meillet reads u as ու, and a lone U as title case", () => {
    expect(toArmenian("Urartu", "hubschmann-meillet")).toBe("Ուրարտու");
    expect(toArmenian("URARTU", "hubschmann-meillet")).toBe("ՈՒՐԱՐՏՈՒ");
    expect(toArmenian("U", "hubschmann-meillet")).toBe("Ու");
  });

  test("aspiration takes the modifier letter, not an apostrophe", () => {
    expect(toArmenian("tʿ", "iso-9985")).toBe("թ");
    expect(toArmenian("t'", "iso-9985")).toBe("տ'");
  });
});

describe("to-armenian: refusals", () => {
  test("ReversibleStandard names exactly the standards marked reversible", () => {
    const marked = listStandards().filter((id) => getStandard(id).reversible);
    expect(marked.toSorted()).toEqual([...REVERSIBLE].toSorted());
  });

  test.each(["bgn-pcgn", "ala-lc", "ru-geo-ra-2011", "ipa-eastern"] as const)(
    "%s is not reversible",
    (standard) => {
      const definition = getStandard(standard);
      expect(() => new ReverseTransliterationEngine(definition)).toThrow(/not reversible/);
    },
  );
});
