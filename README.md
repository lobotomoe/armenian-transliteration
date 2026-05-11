# Armenian Transliteration

Multi-standard Armenian transliteration library with IPA phonemic transcription. Supports 10 canonical transliteration profiles with full type safety and 1200+ tests.

## Installation

```bash
npm install armenian-transliteration
```

## Usage

```typescript
import { transliterate, createTransliterator } from "armenian-transliteration";
import { profiles } from "armenian-transliteration/profiles";

// Default: BGN/PCGN romanization
transliterate("Երևան");              // "Yerevan"
transliterate("Հայաստան");           // "Hayastan"

// ISO 9985 (reversible, with diacritics)
transliterate("Երևան", { standard: "iso-9985" });  // "Erewan"

// Hübschmann-Meillet (academic)
transliterate("Երևան", { standard: "hubschmann-meillet" });

// ALA-LC (Library of Congress, 2022)
transliterate("Երևան", { standard: "ala-lc" });          // "Erevan" (no Ye prefix)
transliterate("պատսպարան", { standard: "ala-lc" });     // "patʹsparan" (soft sign)

// Russian geographic names (Kuzmina-Tumanyan 1974)
transliterate("Երևան", { standard: "ru-geo-kt-1974" });  // "Ереван"
transliterate("Հաղպատ", { standard: "ru-geo-kt-1974" }); // "Ахпат"

// Russian geographic names (Republic of Armenia 2011)
transliterate("Գեղարքունիք", { standard: "ru-geo-ra-2011" }); // "Гехаркуник"

// Russian proper names (Vartapetyan)
transliterate("Հակոբ", { standard: "ru-proper-vartapetyan-1961" }); // "Акоб"

// Russian Cyrillic transcription for common Eastern Armenian vocabulary
transliterate("համար", { standard: "ru-phonetic-eastern" }); // "хамар"

// IPA phonemic transcription (Eastern Armenian)
transliterate("Երևան", { standard: "ipa-eastern" });  // "Jeɾevɑn"
transliterate("Տիգրան", { standard: "ipa-eastern" }); // "Tiɡɾɑn"

// IPA phonemic transcription (Standard Western Armenian) — W1 voicing collapse
transliterate("Երևան", { standard: "ipa-western" });  // "Jeɾevɑn"
transliterate("Տիգրան", { standard: "ipa-western" }); // "Dikʰɾɑn"

// Factory for repeated use
const toRussian = createTransliterator({ standard: "ru-geo-kt-1974" });
toRussian("Հայաստան");  // "Аястан"
toRussian("Երևան");     // "Ереван"

profiles["ru-geo-kt-1974"].targetLanguage; // "ru"
profiles["ru-proper-vartapetyan-1961"].domain; // "proper-names"
```

## Supported Standards

| Standard           | ID                   | Target   | Reversible | Description                               |
| ------------------ | -------------------- | -------- | ---------- | ----------------------------------------- |
| BGN/PCGN           | `bgn-pcgn`           | Latin    | No         | US/UK geographic names (default)          |
| ISO 9985           | `iso-9985`           | Latin    | Yes        | International standard with diacritics    |
| Hübschmann-Meillet | `hubschmann-meillet` | Latin    | Yes        | Classical academic system                 |
| ALA-LC             | `ala-lc`             | Latin    | No         | Library of Congress                       |
| Russian Geographic KT 1974 | `ru-geo-kt-1974` | Cyrillic | No         | Geographic names (Kuzmina-Tumanyan 1974)  |
| Russian Geographic RA 2011 | `ru-geo-ra-2011` | Cyrillic | No         | Geographic names (Republic of Armenia 2011) |
| Russian Proper Names Vartapetyan 1961 | `ru-proper-vartapetyan-1961` | Cyrillic | No         | Proper names: given names, surnames, geographic names |
| Russian Phonetic Eastern | `ru-phonetic-eastern` | Cyrillic | No         | Common-vocabulary Cyrillic transcription   |
| IPA Western        | `ipa-western`        | IPA      | No         | Broad phonemic (Standard Western Armenian) |
| IPA Eastern        | `ipa-eastern`        | IPA      | No         | Broad phonemic (Standard Eastern Armenian) |

## Source Notes

- **BGN/PCGN** is checked against the UK/PCGN 2022 validation PDF and Thomas T. Pedersen's EKI cross-table.
- **ALA-LC** follows the 2022 Library of Congress Armenian Romanization Table. Key rules encoded: word-initial `ե → y` only when followed by a vowel (Classical, note 2); word-initial `յ → ḥ` (note 4); soft-sign `ʹ` (U+02B9) for the bigrams `Գհ Դզ Կհ Սհ Տս` (note 3); `եւ → ew` Classical (note 5) vs `և → ev` modern ligature (note 6). The word-start `եվ → eʹv` soft-sign exception (note 6) has two lexical exceptions (`ևեթ`, `ևս`) and is not implemented; `եվ` always maps to `ev`. West Armenian bracketed alternates (note 1) are not emitted.
- **ISO 9985** uses U+02BF (modifier letter left half ring) for aspirates, per ISO 9985:1996.
- **Hübschmann-Meillet** follows Pedersen's EKI cross-table (column H-M); `ու → u` as a digraph; aspirates use U+02BF; `ը → ə` (U+0259 schwa).
- `ru-geo-kt-1974` follows Kuzmina-Tumanyan's 1974 instruction for Armenian SSR geographic names.
- `ru-geo-ra-2011` follows the Republic of Armenia Government decision N 220-N for RA geographic names.
- `ru-proper-vartapetyan-1961` follows Vartapetyan's 1961 reference for Armenian given names, surnames, and geographic names; Kazumyan 1990, Toshyan 1962, and the Armenian-Russian practical transcription article are useful secondary cross-checks, but not treated as original standard sources.
- `ru-phonetic-eastern` is a package profile for learner-facing common vocabulary, not an official name-transfer standard.
- **IPA** (`ipa-eastern`, `ipa-western`) profiles target **Tier 1 broad phonemic** — strict orthography → phoneme mapping. Every rule is attested in Dum-Tragut (2009) and JIPA 2024 (Seyfarth, Dolatian, Guekguezian, Kelly & Toparlak), cross-checked against Dolatian 2022 and Vaux 1998. Standard Western retains aspiration on թ ք փ ց չ (unlike Wiktionary's algorithm, which strips it — incorrectly per JIPA 2024: 447–448). Lexicalized and allophonic detail (stress placement, schwa epenthesis, regressive ղ/վ devoicing, word-final devoicing, post-nasal aspiration, suffix palatalization, Western progressive devoicing, յու → /ʏ/ glide fronting) is deferred to future narrow-phonetic profiles. See [`docs/LINGUISTIC_RATIONALE.md`](docs/LINGUISTIC_RATIONALE.md) for the rule-by-rule citation table and [`tools/ipa-conformance/`](tools/ipa-conformance/) for the Wiktionary conformance harness with annotated divergences (run via `pnpm run ipa-conformance`).

## Profiles

Profile metadata is available from the main package and from the lighter
`armenian-transliteration/profiles` subpath:

```typescript
import {
  getProfile,
  getProfilesByTargetLanguage,
  profiles,
} from "armenian-transliteration/profiles";

getProfile("ru-proper-vartapetyan-1961").authority;
getProfilesByTargetLanguage("ru").map((profile) => profile.id);
```

Use language-first IDs for language-specific transfer systems. `ru-geo-kt-1974`
is preferred over `cyr-geo-kt-1974` because Russian, Ukrainian, and Belarusian
profiles would all use Cyrillic but would not share identical transfer rules.

## API

### `transliterate(text, options?)`

Transliterate Armenian text.

- `text: string` — input text (Armenian characters are transliterated, everything else passes through)
- `options.standard` — transliteration standard (default: `"bgn-pcgn"`)
- `options.direction` — only `"from-armenian"` (default) is supported in 3.x; reverse transliteration is out of scope

### `createTransliterator(options)`

Create a reusable transliterator function with fixed options. More efficient for repeated use.

### `listStandards()`

Returns an array of all supported canonical standard IDs.

## Features

- **10 canonical transliteration profiles** — BGN/PCGN, ISO 9985, Hübschmann-Meillet, ALA-LC, Russian geographic KT 1974, Russian geographic RA 2011, Russian proper names Vartapetyan 1961, Russian phonetic Eastern, IPA (Western & Eastern Armenian)
- **Declarative standard definitions** — each standard is a data object, not imperative code
- **Proper tokenizer** — no temporary Unicode symbol hacks
- **Case preservation** — uppercase, lowercase, and title case handled correctly
- **Full Unicode support** — Armenian ligatures (U+FB13-FB17), punctuation, mixed scripts
- **Type-safe** — strict TypeScript and no `any` in the public implementation
- **1200+ tests** — unit, per-standard, integration, edge cases, and formal model verification
- **Tree-shakeable** — ESM, CJS, and browser IIFE builds
