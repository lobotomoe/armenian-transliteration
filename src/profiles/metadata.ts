import type { Standard } from "../types.js";
import type { ProfileMetadata } from "./types.js";

const bgnSources = [
  {
    title: "Romanization of Armenian: BGN/PCGN 1981 System",
    kind: "official-standard",
    year: 2022,
    url: "https://assets.publishing.service.gov.uk/media/636cd40ad3bf7f164de3c9f3/ROMANIZATION_OF_ARMENIAN_2022_final.pdf",
  },
  {
    title: "Thomas T. Pedersen, Transliteration of Armenian, Rev. 2.0",
    kind: "reference-table",
    year: 2009,
    url: "https://transliteration.eki.ee/pdf/Armenian_2.0.pdf",
  },
] as const;

const canonicalProfiles = {
  "bgn-pcgn": {
    id: "bgn-pcgn",
    canonicalId: "bgn-pcgn",
    status: "canonical",
    label: "BGN/PCGN Romanization (1981)",
    targetLanguage: null,
    targetScript: "latin",
    scriptCode: "Latn",
    domain: "geographic",
    authority: "United States Board on Geographic Names / PCGN",
    year: 1981,
    aliases: [],
    sources: bgnSources,
    notes: [
      "Designed for romanizing Armenian names in the eastern variety used in the Republic of Armenia.",
      "Aspirates use U+2019 RIGHT SINGLE QUOTATION MARK (per BGN/PCGN 2022 validation).",
      "Word-initial ե → ye, after vowels → ye (note 4.1); ո → vo word-initial except ով (note 4.2); և → yev initially/isolated/after vowels (note 4.3).",
    ],
  },
  "iso-9985": {
    id: "iso-9985",
    canonicalId: "iso-9985",
    status: "canonical",
    label: "ISO 9985 Romanization",
    targetLanguage: null,
    targetScript: "latin",
    scriptCode: "Latn",
    domain: "romanization",
    authority: "International Organization for Standardization",
    year: 1996,
    aliases: [],
    sources: [
      {
        title:
          "ISO 9985:1996 — Information and documentation — Transliteration of Armenian characters into Latin characters",
        kind: "official-standard",
        year: 1996,
      },
      {
        title:
          "Thomas T. Pedersen, Transliteration of Armenian, Rev. 2.0 (ISO 9985 column)",
        kind: "reference-table",
        year: 2009,
        url: "https://transliteration.eki.ee/pdf/Armenian_2.0.pdf",
      },
    ],
    notes: [
      "Reversible Latin transliteration profile with diacritics.",
      "Aspirates use U+02BF MODIFIER LETTER LEFT HALF RING (per ISO 9985:1996).",
      "ու digraph romanizes letter-by-letter as 'ow' (ո→o + ւ→w), per Pedersen ISO column entry 35.",
    ],
  },
  "hubschmann-meillet": {
    id: "hubschmann-meillet",
    canonicalId: "hubschmann-meillet",
    status: "canonical",
    label: "Hübschmann-Meillet Romanization",
    targetLanguage: null,
    targetScript: "latin",
    scriptCode: "Latn",
    domain: "academic",
    authority: "Hübschmann-Meillet scholarly tradition",
    year: 1913,
    aliases: [],
    sources: [
      {
        title:
          "A. Meillet, Altarmenisches Elementarbuch, Heidelberg, 1913 (2nd ed. 1980)",
        kind: "scholarly-system",
        year: 1913,
      },
      {
        title:
          "Thomas T. Pedersen, Transliteration of Armenian, Rev. 2.0 (H-M column)",
        kind: "reference-table",
        year: 2009,
        url: "https://transliteration.eki.ee/pdf/Armenian_2.0.pdf",
      },
    ],
    notes: [
      "Academic Latin profile used for classical/linguistic contexts.",
      "ու digraph → 'u' (per Pedersen H-M column entry 35).",
      "Aspirates use U+02BF MODIFIER LETTER LEFT HALF RING; some scholarly editions use U+02BD instead.",
      "ը → ə (U+0259 SCHWA); some sources use U+01DD LATIN SMALL LETTER TURNED E.",
    ],
  },
  "ala-lc": {
    id: "ala-lc",
    canonicalId: "ala-lc",
    status: "canonical",
    label: "ALA-LC Romanization (2022)",
    targetLanguage: null,
    targetScript: "latin",
    scriptCode: "Latn",
    domain: "romanization",
    authority: "American Library Association / Library of Congress",
    year: 2022,
    aliases: [],
    sources: [
      {
        title: "ALA-LC Armenian Romanization Table, 2022 version",
        kind: "official-standard",
        year: 2022,
        url: "https://www.loc.gov/catdir/cpso/romanization/armenian.pdf",
      },
      {
        title:
          "Thomas T. Pedersen, Transliteration of Armenian, Rev. 2.0 (ALA-LC 1997 column for historical comparison)",
        kind: "secondary-reference",
        year: 2009,
        url: "https://transliteration.eki.ee/pdf/Armenian_2.0.pdf",
      },
    ],
    notes: [
      "Cataloging romanization profile (LoC 2022).",
      "West Armenian bracketed alternates (note 1) are not emitted; East/Classical default only.",
      "Word-initial 'ե → y' fires only when followed by a vowel (note 2, Classical orthography).",
      "Soft sign U+02B9 inserted between Գհ/Դզ/Կհ/Սհ/Տս bigrams (note 3).",
      "Word-initial 'յ → ḥ' (note 4); stem-internal compound boundaries are not detected.",
      "'եւ → ew' is the Classical orthography sequence (note 5); modern 'և → ev' (note 6).",
      "Note 6 lowercase 'եվ → eʹv' word-start soft-sign exception (with lexical exceptions ևեթ, ևս) is NOT implemented; 'եվ' always maps to 'ev'.",
    ],
  },
  "ru-geo-kt-1974": {
    id: "ru-geo-kt-1974",
    canonicalId: "ru-geo-kt-1974",
    status: "canonical",
    label: "Russian Geographic Transliteration, Kuzmina-Tumanyan 1974",
    targetLanguage: "ru",
    targetScript: "cyrillic",
    scriptCode: "Cyrl",
    domain: "geographic",
    authority: "G. G. Kuzmina, editor E. G. Tumanyan",
    year: 1974,
    aliases: [],
    sources: [
      {
        title:
          "Инструкция по русской передаче географических названий Армянской ССР / Сост. Г. Г. Кузьмина; Ред. Э. Г. Туманян. — М., 1974. — 22 с. — 1000 экз.",
        kind: "geographic-instruction",
        year: 1974,
        url: "https://arhiiv.eki.ee/knab/cyr/ins_topo_AM_ru_1974.pdf",
      },
    ],
    notes: [
      "Russian is primary in the ID: Ukrainian or Belarusian Cyrillic profiles would use different rules.",
      "This profile models the 1974 instruction; official and traditional place names may override productive rules.",
    ],
  },
  "ru-geo-ra-2011": {
    id: "ru-geo-ra-2011",
    canonicalId: "ru-geo-ra-2011",
    status: "canonical",
    label: "Russian Geographic Transliteration, Republic of Armenia 2011",
    targetLanguage: "ru",
    targetScript: "cyrillic",
    scriptCode: "Cyrl",
    domain: "geographic",
    authority: "Government of the Republic of Armenia",
    year: 2011,
    aliases: [],
    sources: [
      {
        title:
          "ՀՀ կառավարության 2011 թվականի մարտի 3-ի N 220-Ն որոշում / Постановление Правительства Республики Армения № 220 от 3 марта 2011 года",
        kind: "government-decision",
        year: 2011,
        url: "https://www.arlis.am/hy/acts/66360",
      },
    ],
    notes: [
      "Separate from Kuzmina-Tumanyan 1974; it makes different choices for հ and ղ.",
      "Designed for Republic of Armenia geographic names, not for general-word Cyrillic transcription.",
    ],
  },
  "ru-proper-vartapetyan-1961": {
    id: "ru-proper-vartapetyan-1961",
    canonicalId: "ru-proper-vartapetyan-1961",
    status: "canonical",
    label: "Russian Proper Names Transliteration, Vartapetyan 1961",
    targetLanguage: "ru",
    targetScript: "cyrillic",
    scriptCode: "Cyrl",
    domain: "proper-names",
    authority: "N. A. Vartapetyan",
    year: 1961,
    aliases: [],
    sources: [
      {
        title:
          "Н. А. Вартапетян. Справочник по русской транскрипции армянских имен, фамилий и географических названий. Армянское государственное издательство, 1961",
        kind: "reference-table",
        year: 1961,
        url: "https://books.google.com/books/about/%D0%A1%D0%BF%D1%80%D0%B0%D0%B2%D0%BE%D1%87%D0%BD%D0%B8%D0%BA_%D0%BF%D0%BE_%D1%80%D1%83%D1%81%D1%81%D0%BA%D0%BE%D0%B9.html?id=NYZKAQAAIAAJ",
      },
      {
        title:
          "И. Г. Казумян. Вариантные формы армянских фамилий в русском языке. Автореферат диссертации, Ереван, 1990",
        kind: "secondary-reference",
        year: 1990,
        url: "https://search.rsl.ru/ru/record/01000295426",
      },
      {
        title:
          "С. Б. Тошьян. Рецензия на Н. А. Вартапетян. Справочник по русской транскрипции армянских имён, фамилий и географических названий. Известия Академии наук Армянской ССР, 1962",
        kind: "critical-review",
        year: 1962,
        url: "https://arar.sci.am/Content/109000/file_0.pdf",
      },
    ],
    notes: [
      "For Armenian given names, surnames, and geographic names.",
      "Not suitable as a default Cyrillic display for common Armenian vocabulary.",
    ],
  },
  "ru-phonetic-eastern": {
    id: "ru-phonetic-eastern",
    canonicalId: "ru-phonetic-eastern",
    status: "canonical",
    label: "Russian Phonetic Transcription, Eastern Armenian",
    targetLanguage: "ru",
    targetScript: "cyrillic",
    scriptCode: "Cyrl",
    domain: "phonemic",
    authority: "armenian-transliteration package profile",
    aliases: [],
    sources: [
      {
        title: "armenian-transliteration Russian phonetic Eastern Armenian profile",
        kind: "package-profile",
      },
    ],
    notes: [
      "Learner-facing Cyrillic transcription for common vocabulary.",
      "Not an official geographic or proper-name transfer system.",
    ],
  },
  "ipa-eastern": {
    id: "ipa-eastern",
    canonicalId: "ipa-eastern",
    status: "canonical",
    label: "Eastern Armenian IPA",
    targetLanguage: null,
    targetScript: "ipa",
    scriptCode: "IPA",
    domain: "phonemic",
    authority: "Standard Eastern Armenian phonemic inventory",
    aliases: [],
    sources: [
      {
        title:
          "Bert Vaux, The Phonology of Armenian, Oxford: Clarendon Press, 1998",
        kind: "scholarly-system",
        year: 1998,
      },
      {
        title:
          "Jasmine Dum-Tragut, Armenian: Modern Eastern Armenian, London Oriental and African Language Library 14, Amsterdam: John Benjamins, 2009",
        kind: "scholarly-system",
        year: 2009,
      },
      {
        title: "Armenian language — IPA inventory, Wikipedia",
        kind: "secondary-reference",
        url: "https://en.wikipedia.org/wiki/Help:IPA/Armenian",
      },
    ],
    notes: [
      "Broad phonemic transcription of Standard Eastern Armenian.",
      "Word-initial 'ե → jɛ' (yotation); word-initial 'ո → vɔ' except before vowels or վ.",
      "Aspirated stops/affricates use U+02B0 MODIFIER LETTER SMALL H (ʰ).",
      "Affricates use U+0361 COMBINING DOUBLE INVERTED BREVE (tie bar): t͡s, d͡z, t͡ʃ, d͡ʒ.",
      "ղ → ʁ (uvular trill/fricative); ր → ɾ (tap); ռ → r (trill).",
    ],
  },
  "ipa-western": {
    id: "ipa-western",
    canonicalId: "ipa-western",
    status: "canonical",
    label: "Western Armenian IPA",
    targetLanguage: null,
    targetScript: "ipa",
    scriptCode: "IPA",
    domain: "phonemic",
    authority: "Standard Western Armenian phonemic inventory",
    aliases: [],
    sources: [
      {
        title:
          "Bert Vaux, The Phonology of Armenian, Oxford: Clarendon Press, 1998",
        kind: "scholarly-system",
        year: 1998,
      },
      {
        title:
          "Michele Sigler, Specificity and agreement in Standard Western Armenian, MIT PhD thesis, 1996",
        kind: "scholarly-system",
        year: 1996,
      },
      {
        title: "Western Armenian — sound system, Wikipedia",
        kind: "secondary-reference",
        url: "https://en.wikipedia.org/wiki/Western_Armenian#Phonology",
      },
    ],
    notes: [
      "Broad phonemic transcription of Standard Western Armenian.",
      "Western collapses the three-way East stop/affricate contrast into a two-way contrast (voiced/aspirated): East voiced (բ գ դ ձ ջ) → West aspirated (pʰ kʰ tʰ t͡sʰ t͡ʃʰ); East voiceless unaspirated (պ կ տ ծ ճ) → West voiced (b ɡ d d͡z d͡ʒ).",
      "Aspirated series (թ չ ց փ ք) is unchanged from East.",
      "Word-initial yotation rules (ե → jɛ) and (ո → vɔ except before vowels/վ) are preserved.",
    ],
  },
} as const satisfies Record<Standard, ProfileMetadata>;

export const profiles: Record<Standard, ProfileMetadata> = canonicalProfiles;
