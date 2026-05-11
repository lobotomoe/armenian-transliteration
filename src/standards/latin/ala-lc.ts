import type { TransliterationStandard } from "../../types.js";

/**
 * ALA-LC (Library of Congress) Armenian Romanization, 2022 version.
 *
 * Source: https://www.loc.gov/catdir/cpso/romanization/armenian.pdf
 *
 * Notes encoded in this profile:
 *
 *   - Note 1 (West Armenian bracketed alternates): the package emits only the
 *     East/Classical default value; the West Armenian "[p] / [k] / [t] / …"
 *     references are not produced.
 *   - Note 2 (ե → y initial+vowel, Classical orthography): word-initial ե
 *     followed by a vowel romanizes as "y" (replacing "e"), e.g. classical
 *     "Եա..." → "ya…". Initial ե + consonant stays "e" (so "Երևան" → "Erevan").
 *   - Note 3 (soft-sign disambiguation): inserts U+02B9 MODIFIER LETTER PRIME
 *     between letter pairs whose romanization would otherwise be read as a
 *     digraph (գհ → gʹh, դզ → dʹz, կհ → kʹh, սհ → sʹh, տս → tʹs).
 *   - Note 4 (յ → ḥ initial-of-word-or-stem, Classical orthography): the
 *     simple "initial of a word" form is implemented; "initial of a stem in
 *     a compound" is morphology-dependent and cannot be detected automatically.
 *   - Note 5 (եւ → ew, Classical): treated as a sequence; the modern ligature
 *     և (U+0587) maps separately to "ev" per note 6.
 *   - Note 6 (և → ev, with eʹv exception): the soft-sign exception for
 *     lowercase "եվ" at word start has two lexical exceptions (ևեթ, ևս) and
 *     is therefore NOT implemented; "եվ" maps to "ev" unconditionally.
 *
 * Diacritic / modifier characters used:
 *   - U+02BB MODIFIER LETTER TURNED COMMA (ʻ): aspirate mark (թ, չ, ց, փ, ք)
 *   - U+02B9 MODIFIER LETTER PRIME (ʹ): soft sign (note 3)
 *   - U+0113 LATIN SMALL LETTER E WITH MACRON (ē): է
 *   - U+011B LATIN SMALL LETTER E WITH CARON (ě): ը
 *   - U+1E25 LATIN SMALL LETTER H WITH DOT BELOW (ḥ): word-initial յ
 *   - U+1E5B LATIN SMALL LETTER R WITH DOT BELOW (ṛ): ռ
 *   - U+014D LATIN SMALL LETTER O WITH MACRON (ō): օ
 */

// Classical Armenian vowels used by note 2 (ե → y when followed by a vowel).
// Includes the ու digraph token because the scanner emits ու as one sequence.
const ALA_LC_VOWELS = ["ա", "ե", "է", "ը", "ի", "ո", "ու", "օ"] as const;

export const alaLc: TransliterationStandard = {
  id: "ala-lc",
  name: "ALA-LC Romanization (2022)",
  targetScript: "latin",
  reversible: false,

  charMappings: [
    // U+0561 ա
    { armenian: "ա", target: "a" },
    // U+0562 բ
    { armenian: "բ", target: "b" },
    // U+0563 գ — note 3: gʹh when followed by հ
    {
      armenian: "գ",
      target: "g",
      contextRules: [
        { condition: { followedBy: ["հ"] }, target: "gʹ" },
      ],
    },
    // U+0564 դ — note 3: dʹz when followed by զ
    {
      armenian: "դ",
      target: "d",
      contextRules: [
        { condition: { followedBy: ["զ"] }, target: "dʹ" },
      ],
    },
    // U+0565 ե — note 2: y (replaces e) word-initial + followed by vowel
    {
      armenian: "ե",
      target: "e",
      reverseDefault: true,
      contextRules: [
        {
          condition: { wordInitial: true, followedBy: [...ALA_LC_VOWELS] },
          target: "y",
        },
      ],
    },
    // U+0566 զ
    { armenian: "զ", target: "z" },
    // U+0567 է → ē (e with macron, U+0113)
    { armenian: "է", target: "ē" },
    // U+0568 ը → ě (e with caron, U+011B)
    { armenian: "ը", target: "ě" },
    // U+0569 թ → tʻ (t + U+02BB modifier letter turned comma)
    { armenian: "թ", target: "tʻ" },
    // U+056A ժ → zh
    { armenian: "ժ", target: "zh" },
    // U+056B ի
    { armenian: "ի", target: "i" },
    // U+056C լ
    { armenian: "լ", target: "l" },
    // U+056D խ → kh
    { armenian: "խ", target: "kh" },
    // U+056E ծ → ts (note 1: West Armenian alternative [dz] not emitted)
    { armenian: "ծ", target: "ts", reverseDefault: true },
    // U+056F կ — note 3: kʹh when followed by հ
    {
      armenian: "կ",
      target: "k",
      reverseDefault: true,
      contextRules: [
        { condition: { followedBy: ["հ"] }, target: "kʹ" },
      ],
    },
    // U+0570 հ
    { armenian: "հ", target: "h" },
    // U+0571 ձ → dz (note 1: West Armenian alternative [ts] not emitted)
    { armenian: "ձ", target: "dz", reverseDefault: true },
    // U+0572 ղ → gh
    { armenian: "ղ", target: "gh" },
    // U+0573 ճ → ch (note 1: West Armenian alternative [j] not emitted)
    { armenian: "ճ", target: "ch", reverseDefault: true },
    // U+0574 մ
    { armenian: "մ", target: "m" },
    // U+0575 յ — note 4: ḥ word-initial (Classical orthography)
    {
      armenian: "յ",
      target: "y",
      reverseDefault: true,
      contextRules: [
        { condition: { wordInitial: true }, target: "ḥ" },
      ],
    },
    // U+0576 ն
    { armenian: "ն", target: "n" },
    // U+0577 շ → sh
    { armenian: "շ", target: "sh" },
    // U+0578 ո → o (NO word-initial vo rule)
    { armenian: "ո", target: "o", reverseDefault: true },
    // U+0579 չ → chʻ (ch + U+02BB)
    { armenian: "չ", target: "chʻ", reverseDefault: false },
    // U+057A պ
    { armenian: "պ", target: "p", reverseDefault: true },
    // U+057B ջ → j (note 1: West Armenian alternative [ch] not emitted)
    { armenian: "ջ", target: "j" },
    // U+057C ռ → ṙ (r with dot below, U+1E5B)
    { armenian: "ռ", target: "ṛ", reverseDefault: true },
    // U+057D ս — note 3: sʹh when followed by հ
    {
      armenian: "ս",
      target: "s",
      contextRules: [
        { condition: { followedBy: ["հ"] }, target: "sʹ" },
      ],
    },
    // U+057E վ
    { armenian: "վ", target: "v" },
    // U+057F տ — note 3: tʹs when followed by ս
    {
      armenian: "տ",
      target: "t",
      reverseDefault: true,
      contextRules: [
        { condition: { followedBy: ["ս"] }, target: "tʹ" },
      ],
    },
    // U+0580 ր
    { armenian: "ր", target: "r", reverseDefault: false },
    // U+0581 ց → tsʻ (ts + U+02BB)
    { armenian: "ց", target: "tsʻ", reverseDefault: false },
    // U+0582 ւ → w (yiwn; the ու digraph below overrides for the o+w pair)
    { armenian: "ւ", target: "w" },
    // U+0583 փ → pʻ (p + U+02BB)
    { armenian: "փ", target: "pʻ", reverseDefault: false },
    // U+0584 ք → kʻ (k + U+02BB)
    { armenian: "ք", target: "kʻ", reverseDefault: false },
    // U+0585 օ → ō (o with macron, U+014D)
    { armenian: "օ", target: "ō", reverseDefault: false },
    // U+0586 ֆ
    { armenian: "ֆ", target: "f" },
  ],

  sequenceMappings: [
    // ու digraph (U+0578 + U+0582) → "u"
    { armenian: "ու", target: "u" },
    // եւ (U+0565 + U+0582), Classical orthography → "ew" (note 5)
    { armenian: "եւ", target: "ew" },
    // եվ (U+0565 + U+057E), modern Eve sequence → "ev"
    { armenian: "եվ", target: "ev" },
    // և (U+0587) modern ligature → "ev" (note 6, soft-sign exception not implemented)
    { armenian: "և", target: "ev" },
  ],

  punctuation: {
    "։": ".",
    "՞": "?",
    "՝": ",",
    "՜": "!",
    "«": '"',
    "»": '"',
  },
};
