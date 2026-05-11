# Russian Profiles

Russian profiles use `ru-*` IDs because the target is Russian orthography, not
generic Cyrillic. A future Ukrainian or Belarusian profile should use its own
language prefix, for example `uk-*` or `be-*`, even though the script is also
Cyrillic.

Secondary cross-check:

- [Армянско-русская практическая транскрипция](https://ru.wikipedia.org/wiki/%D0%90%D1%80%D0%BC%D1%8F%D0%BD%D1%81%D0%BA%D0%BE-%D1%80%D1%83%D1%81%D1%81%D0%BA%D0%B0%D1%8F_%D0%BF%D1%80%D0%B0%D0%BA%D1%82%D0%B8%D1%87%D0%B5%D1%81%D0%BA%D0%B0%D1%8F_%D1%82%D1%80%D0%B0%D0%BD%D1%81%D0%BA%D1%80%D0%B8%D0%BF%D1%86%D0%B8%D1%8F) is useful for comparing the Kuzmina 1974 and Vartapetyan 1961 columns, but the executable profiles below cite the original source authorities.
- [И. Г. Казумян. Вариантные формы армянских фамилий в русском языке](https://search.rsl.ru/ru/record/01000295426), Ереван, 1990.
- [С. Б. Тошьян. Рецензия на Н. А. Вартапетян. Справочник по русской транскрипции армянских имён, фамилий и географических названий](https://arar.sci.am/Content/109000/file_0.pdf), Известия Академии наук Армянской ССР, 1962.

Lexical reference, not a transliteration standard:

- [Словарь терминов Геологической Энциклопедии Армении](https://web.archive.org/web/20240723162648/https://tert.nla.am/archive/HAY%20GIRQ/Ardy/2001-2011/erkrabanakan_rusengarm_2011.pdf)

## `ru-geo-kt-1974`

Russian geographic-name transfer according to:

[Инструкция по русской передаче географических названий Армянской ССР](https://arhiiv.eki.ee/knab/cyr/ins_topo_AM_ru_1974.pdf)
/ Сост. Г. Г. Кузьмина; Ред. Э. Г. Туманян. М., 1974. 22 с. 1000 экз.

Examples:

- `Հաղպատ` -> `Ахпат`
- `Գեղաձոր` -> `Гехадзор`
- `Բյուրական` -> `Бюракан`

## `ru-geo-ra-2011`

Russian geographic-name transfer according to Republic of Armenia Government
decision [N 220-N from March 3, 2011](https://www.arlis.am/hy/acts/66360).

Examples:

- `Գեղարքունիք` -> `Гехаркуник`
- `Հրազդան` -> `Раздан`
- `Վայոց ձոր` -> `Вайоц дзор`

## `ru-proper-vartapetyan-1961`

Russian proper-name profile based on Vartapetyan's 1961 reference for Armenian
given names, surnames, and geographic names.

Source:

- [Н. А. Вартапетян. Справочник по русской транскрипции армянских имен, фамилий и географических названий](https://books.google.com/books/about/%D0%A1%D0%BF%D1%80%D0%B0%D0%B2%D0%BE%D1%87%D0%BD%D0%B8%D0%BA_%D0%BF%D0%BE_%D1%80%D1%83%D1%81%D1%81%D0%BA%D0%BE%D0%B9.html?id=NYZKAQAAIAAJ), Армянское государственное издательство, 1961.

This profile is not a good default for common Armenian vocabulary because
proper-name conventions intentionally differ from geographic and phonemic
transcription.

## `ru-phonetic-eastern`

Learner-facing Russian Cyrillic transcription for common Eastern Armenian
vocabulary.

This is a package profile rather than an official geographic or proper-name
standard. It is the right Russian-script profile for frequency-list display,
where forms like `համար` should remain `хамар` rather than follow name-specific
rules that can omit `հ`.
