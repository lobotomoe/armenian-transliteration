import { transliterate } from "../../src";

const ra = (text: string) =>
  transliterate(text, { standard: "ru-geo-ra-2011" });

describe("ru-geo-ra-2011 standard", () => {
  test("հ follows the Republic of Armenia 2011 geographic rules", () => {
    expect(ra("Հացիկ")).toBe("Ацик");
    expect(ra("Հրազդան")).toBe("Раздан");
    expect(ra("Թանահատ")).toBe("Танаат");
    expect(ra("Վահագնի")).toBe("Ваагни");
    expect(ra("Բալահովիտ")).toBe("Балаовит");
    expect(ra("Գեղհովիտ")).toBe("Геховит");
    expect(ra("Ձիթհանքով")).toBe("Дзитанков");
    expect(ra("Վահրամաբերդ")).toBe("Вахрамаберд");
    expect(ra("Լեհվազ")).toBe("Лехваз");
  });

  test("ղ is х in the RA 2011 geographic profile", () => {
    expect(ra("Ղազարավան")).toBe("Хазараван");
    expect(ra("Գեղարքունիք")).toBe("Гехаркуник");
    expect(ra("Մեղվահովիտ")).toBe("Мехваовит");
  });

  test("selected official-list examples and productive sequences", () => {
    expect(ra("Երևան")).toBe("Ереван");
    expect(ra("Վայոց ձոր")).toBe("Вайоц дзор");
    expect(ra("Բյուրական")).toBe("Бюракан");
    expect(ra("Պռոշյան")).toBe("Прошян");
    expect(ra("Ջերմուկ")).toBe("Джермук");
    expect(ra("Կապուտջուղ")).toBe("Капутджух");
    expect(ra("Արևուտ")).toBe("Аревут");
  });
});
