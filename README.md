# Armenian Transliteration

Multi-standard Armenian transliteration library. Supports 5 transliteration standards with full type safety and 929 tests.

## Installation

```bash
npm install armenian-transliteration
```

## Usage

```typescript
import { transliterate, createTransliterator } from "armenian-transliteration";

// Default: BGN/PCGN romanization
transliterate("Երևան");              // "Yerevan"
transliterate("Հայաստան");           // "Hayastan"

// ISO 9985 (reversible, with diacritics)
transliterate("Երևան", { standard: "iso-9985" });  // "Erewan"

// Hübschmann-Meillet (academic)
transliterate("Երևան", { standard: "hubschmann-meillet" });

// ALA-LC (Library of Congress)
transliterate("Երևան", { standard: "ala-lc" });

// Russian phonetic
transliterate("Երևան", { standard: "russian-phonetic" });  // "Ереван"

// Factory for repeated use
const toRussian = createTransliterator({ standard: "russian-phonetic" });
toRussian("Հայաստան");  // "Хаястан"
toRussian("Երևան");     // "Ереван"
```

## Supported Standards

| Standard | ID | Target | Reversible | Description |
|---|---|---|---|---|
| BGN/PCGN | `bgn-pcgn` | Latin | No | US/UK geographic names (default) |
| ISO 9985 | `iso-9985` | Latin | Yes | International standard with diacritics |
| Hübschmann-Meillet | `hubschmann-meillet` | Latin | Yes | Classical academic system |
| ALA-LC | `ala-lc` | Latin | No | Library of Congress |
| Russian Phonetic | `russian-phonetic` | Cyrillic | No | Phonetic transcription to Russian |

## API

### `transliterate(text, options?)`

Transliterate Armenian text.

- `text: string` — input text (Armenian characters are transliterated, everything else passes through)
- `options.standard` — transliteration standard (default: `"bgn-pcgn"`)
- `options.direction` — `"from-armenian"` (default) or `"to-armenian"` (not yet implemented)

### `createTransliterator(options)`

Create a reusable transliterator function with fixed options. More efficient for repeated use.

### `listStandards()`

Returns an array of all supported standard IDs.

## Features

- **5 transliteration standards** — BGN/PCGN, ISO 9985, Hübschmann-Meillet, ALA-LC, Russian phonetic
- **Declarative standard definitions** — each standard is a data object, not imperative code
- **Proper tokenizer** — no temporary Unicode symbol hacks
- **Case preservation** — uppercase, lowercase, and title case handled correctly
- **Full Unicode support** — Armenian ligatures (U+FB13-FB17), punctuation, mixed scripts
- **Type-safe** — strict TypeScript, zero `any` types, zero type assertions
- **929 tests** — unit, per-standard, integration, edge cases, and formal model verification
- **Tree-shakeable** — ESM, CJS, and IIFE builds (16KB minified)
