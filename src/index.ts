import { transliterateArmenianTextToEng } from "./latin";
import { transliterateArmenianTextToRus } from "./russian";

export function transliterate(
  text: string,
  language: "en" | "ru" = "en"
): string {
  switch (language) {
    case "en":
      return transliterateArmenianTextToEng(text);
    case "ru":
      return transliterateArmenianTextToRus(text);
  }
}
