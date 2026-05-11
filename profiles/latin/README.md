# Latin Profiles

Latin profiles are not language-specific in the same way as Russian profiles;
they represent romanization systems with their own source authorities.

## `bgn-pcgn`

BGN/PCGN 1981 romanization for Armenian names. Aspirates use U+2019 RIGHT
SINGLE QUOTATION MARK. Word-initial `ե → ye` (also after vowels), `ո → vo`
(except `ով`), `և → yev` (initial, isolated, or after vowels).

Sources:

- [Romanization of Armenian: BGN/PCGN 1981 System (2022 validation PDF)](https://assets.publishing.service.gov.uk/media/636cd40ad3bf7f164de3c9f3/ROMANIZATION_OF_ARMENIAN_2022_final.pdf)
- [Thomas T. Pedersen, Transliteration of Armenian, Rev. 2.0 (BGN/PCGN column)](https://transliteration.eki.ee/pdf/Armenian_2.0.pdf)

## `ala-lc`

ALA-LC Armenian romanization for library cataloging, 2022 version.

Key behaviour encoded:

- West Armenian bracketed alternates (note 1) are **not** emitted.
- Word-initial `ե → y` (replacing `e`) **only** when followed by a vowel (note 2,
  Classical orthography). Initial `ե + consonant` stays `e` — so `Երևան → Erevan`.
- Word-initial `յ → ḥ` (note 4); stem-internal compound boundaries are not
  detected automatically.
- Soft sign `ʹ` (U+02B9) is inserted between the bigrams `Գհ`, `Դզ`, `Կհ`, `Սհ`,
  `Տս` to prevent misreading as the digraphs `gh / dz / kh / sh / ts` (note 3).
- Classical `եւ → ew` (note 5) vs. modern ligature `և → ev` (note 6).
- The word-start `եվ → eʹv` soft-sign exception (note 6) has two lexical
  exceptions (`ևեթ`, `ևս`) and is **not** implemented; `եվ` always maps to `ev`.

Sources:

- [ALA-LC Armenian Romanization Table, 2022 version](https://www.loc.gov/catdir/cpso/romanization/armenian.pdf)
- [Thomas T. Pedersen, Transliteration of Armenian, Rev. 2.0 (ALA-LC 1997 column, historical)](https://transliteration.eki.ee/pdf/Armenian_2.0.pdf)

## `iso-9985`

ISO 9985:1996 reversible romanization with diacritics. Aspirates use U+02BF
MODIFIER LETTER LEFT HALF RING. `ու` romanizes letter-by-letter as `ow`
(ո→o + ւ→w).

Sources:

- [ISO 9985:1996 (catalogue entry)](https://www.iso.org/standard/17893.html)
- [Thomas T. Pedersen, Transliteration of Armenian, Rev. 2.0 (ISO 9985 column)](https://transliteration.eki.ee/pdf/Armenian_2.0.pdf)

## `hubschmann-meillet`

Academic romanization profile used in classical and linguistic contexts.
`ու → u` as a digraph. Aspirates use U+02BF MODIFIER LETTER LEFT HALF RING.
`ը → ə` (U+0259 SCHWA).

Sources:

- A. Meillet, *Altarmenisches Elementarbuch*, Heidelberg, 1913 (2nd ed. 1980).
- [Thomas T. Pedersen, Transliteration of Armenian, Rev. 2.0 (H-M column)](https://transliteration.eki.ee/pdf/Armenian_2.0.pdf)
