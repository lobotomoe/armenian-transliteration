import { transliterate } from "../../src";

const kt = (text: string) =>
  transliterate(text, { standard: "ru-geo-kt-1974" });

describe("ru-geo-kt-1974 standard", () => {
  test("հ follows Kuzmina-Tumanyan geographic rules", () => {
    expect(kt("Հաղպատ")).toBe("Ахпат");
    expect(kt("Ահնիձոր")).toBe("Ахнидзор");
    expect(kt("Վահագնի")).toBe("Вахагни");
    expect(kt("համար")).toBe("амар");
  });

  test("ղ is к word-initial and х elsewhere", () => {
    expect(kt("ղ")).toBe("к");
    expect(kt("Գեղաձոր")).toBe("Гехадзор");
    expect(kt("Աստղաձոր")).toBe("Астхадзор");
    expect(kt("բղբ")).toBe("бхб");
  });

  test("Russian iotated sequences are handled", () => {
    expect(kt("Բյուրական")).toBe("Бюракан");
    expect(kt("Գյոլլի")).toBe("Гёлли");
    expect(kt("Մոյեմբերյան")).toBe("Моемберян");
  });

  test("core geographic-name examples", () => {
    expect(kt("Երևան")).toBe("Ереван");
    expect(kt("Ոսկեպար")).toBe("Воскепар");
    expect(kt("ով")).toBe("ов");
    expect(kt("Ուջան")).toBe("Уджан");
    expect(kt("Ջերմուկ")).toBe("Джермук");
    expect(kt("ինքը")).toBe("инкы");
  });
});
