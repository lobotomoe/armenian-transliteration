import { transliterate } from "../../src";

const t = (text: string) =>
  transliterate(text, { standard: "ru-phonetic-eastern" });

describe("ru-phonetic-eastern standard", () => {
  test("keeps Armenian հ as х for common vocabulary", () => {
    expect(t("համար")).toBe("хамар");
    expect(t("հետ")).toBe("хет");
    expect(t("հայաստան")).toBe("хаястан");
  });

  test("keeps common Eastern Armenian word forms readable in Cyrillic", () => {
    expect(t("ինքը")).toBe("инкы");
    expect(t("կարող")).toBe("карог");
    expect(t("մեջ")).toBe("медж");
    expect(t("ոչ")).toBe("воч");
    expect(t("նաև")).toBe("наев");
  });

  test("handles core sequences used in common words", () => {
    expect(t("ուրախ")).toBe("урах");
    expect(t("այսօր")).toBe("айсор");
    expect(t("կյանք")).toBe("кянк");
    expect(t("հարություն")).toBe("харутюн");
  });
});
