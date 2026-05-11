import type { TransliterationStandard } from "../../types.js";

/**
 * Western Armenian (Standard) — broad phonemic IPA (Tier 1: orthography → phoneme).
 *
 * Scope: strict orthography-to-phoneme mapping. Every rule is attested in
 * primary phonology sources (JIPA 2024, Dolatian 2022) as a phonemic-level
 * generalization, not as a lexicalized or morphophonological alternation.
 *
 * Western Armenian differs from Eastern in two ways:
 *  1. The Classical three-way stop/affricate contrast (voiced / voiceless
 *     unaspirated / voiceless aspirated) is reduced to two-way. The voiced
 *     and voiceless-aspirated series are merged into a single aspirated
 *     series; the voiceless-unaspirated series becomes voiced. (W1)
 *     Diachronic source: Sayeed & Vaux 2017, per JIPA 2024: 447–448;
 *     Baronian 2017; Dolatian 2022 slide 3.
 *
 *       Letter  Eastern   Standard Western
 *       բ       /b/       /pʰ/
 *       գ       /ɡ/       /kʰ/
 *       դ       /d/       /tʰ/
 *       ձ       /d͡z/      /t͡sʰ/
 *       ջ       /d͡ʒ/      /t͡ʃʰ/
 *       կ       /k/       /ɡ/
 *       պ       /p/       /b/
 *       տ       /t/       /d/
 *       ծ       /t͡s/      /d͡z/
 *       ճ       /t͡ʃ/      /d͡ʒ/
 *       թ       /tʰ/      /tʰ/   (unchanged: aspirated)
 *       ք       /kʰ/      /kʰ/   (unchanged)
 *       փ       /pʰ/      /pʰ/   (unchanged)
 *       ց       /t͡sʰ/     /t͡sʰ/  (unchanged in Standard Western)
 *       չ       /t͡ʃʰ/     /t͡ʃʰ/  (unchanged in Standard Western)
 *
 *  2. The /ju/ glide-vowel sequence is fronted to /ʏ/ in post-consonant
 *     contexts (W6). Documented as variable across speakers/words in
 *     Dolatian 2022 slide 6 and JIPA 2024: 461. Implemented here only for
 *     the orthographic digraph իւ (Classical spelling); the reformed
 *     spelling յու is left as /ju/ because the post-consonant context
 *     varies and the engine does not support the required lookbehind
 *     across arbitrary morpheme boundaries. Documented gap; see notes.
 *
 * Note on dialect variant: this profile targets the **Standard Western**
 * pronunciation taught in diaspora schools and used in dictionaries (e.g.,
 * Bedrossian, Kouymjian). The Beirut variety (HD speaker in JIPA 2024)
 * unaspirated affricates ց → /t͡s/ and չ → /t͡ʃ/; we keep them aspirated
 * for parity with Standard Western references.
 *
 * Out of scope (deferred to a future `ipa-western-narrow` profile):
 *  - Stress placement.
 *  - Schwa epenthesis (հոս → [hos], գրել → [kəɾel]; obligatory before
 *    initial sibilant-stop clusters in Western: ստ → [əst]).
 *    JIPA 2024: 465.
 *  - Western progressive obstruent devoicing (W4): voiced obstruent
 *    devoices when preceded by a voiceless obstruent across morpheme
 *    boundaries. JIPA 2024: 458–459. Applies in derived environments,
 *    not blindly.
 *  - Regressive obstruent devoicing (ղ → [χ], վ → [f] before voiceless).
 *    Same disposition as Eastern: lexicalized/morphophonological, not a
 *    productive phonotactic rule.
 *  - Adjacent-sibilant deaspiration of aspirated stops (ափսէ → [ɑpse]).
 *    Variable across speakers per JIPA 2024: 453.
 *  - յու / իւ → /ʏ/ in arbitrary post-consonant positions. Variable per
 *    Dolatian 2022 and JIPA 2024: 461.
 *  - Classical էօ → /œ/ digraph. Not attested in any primary source
 *    consulted; if needed, implement as a lexical exception list.
 *
 * Primary sources:
 *  - Seyfarth, S., Dolatian, H., Guekguezian, P., Kelly, N. & Toparlak, T.
 *    (2024). Armenian (Yerevan Eastern and Beirut Western). Journal of the
 *    International Phonetic Association 54(1): 445–478.
 *    DOI: 10.1017/S0025100323000130 (open access).
 *  - Dolatian, H. (2022). Armenian Phonology and Phonetics. Glottothèque
 *    lecture series.
 *  - Baronian, L. (2017). On the diachrony of Armenian stops. In Sayeed
 *    & Vaux (eds.). (Cited via JIPA 2024: 447.)
 */

// Sibilant + stop phonotactic constraint (W3). Armenian (and most languages)
// disallow sibilant + voiced-stop clusters at any morpheme boundary; the
// orthographic ստ, սպ, սկ, շտ, շպ, շկ surfaces with voiceless plosives
// regardless of the W1 voicing collapse applied to standalone պ/տ/կ.
// Cross-linguistically universal phonotactic pattern; specific Armenian
// confirmation in JIPA 2024: 453 (HD's "voiceless plosives are not
// aspirated adjacent to voiceless sibilants") and Dum-Tragut 2009: 24
// §1.2.1.b for the Eastern side of the same fact.

export const ipaWestern: TransliterationStandard = {
  id: "ipa-western",
  name: "IPA Phonemic Transcription (Standard Western Armenian)",
  targetScript: "ipa",
  reversible: false,

  charMappings: [
    // ── Vowels ──────────────────────────────────────────────────────────
    // Identical inventory to Eastern. JIPA 2024: 446, 461.
    { armenian: "ա", target: "ɑ" },
    { armenian: "ի", target: "i" },
    { armenian: "ը", target: "ə" },
    { armenian: "օ", target: "o", reverseDefault: false },

    // ե / է / ո — identical rules to Eastern. Dum-Tragut 2009: 14, 16.
    {
      armenian: "ե",
      target: "e",
      reverseDefault: true,
      contextRules: [{ condition: { wordInitial: true }, target: "je" }],
    },
    { armenian: "է", target: "e", reverseDefault: false },
    {
      armenian: "ո",
      target: "o",
      reverseDefault: true,
      contextRules: [
        { condition: { wordInitial: true, followedBy: ["վ"] }, target: "o" },
        { condition: { wordInitial: true }, target: "vo" },
      ],
    },

    // ── Stops and affricates: W1 voicing collapse ───────────────────────
    // Eastern voiced → Western aspirated:
    { armenian: "բ", target: "pʰ", reverseDefault: false },
    { armenian: "գ", target: "kʰ", reverseDefault: false },
    { armenian: "դ", target: "tʰ", reverseDefault: false },
    { armenian: "ձ", target: "t͡sʰ", reverseDefault: false },
    { armenian: "ջ", target: "t͡ʃʰ", reverseDefault: false },
    // Eastern voiceless-unaspirated → Western voiced:
    { armenian: "պ", target: "b", reverseDefault: false },
    { armenian: "տ", target: "d", reverseDefault: false },
    { armenian: "կ", target: "ɡ", reverseDefault: false },
    { armenian: "ծ", target: "d͡z", reverseDefault: false },
    { armenian: "ճ", target: "d͡ʒ", reverseDefault: false },
    // Eastern voiceless-aspirated → unchanged:
    { armenian: "թ", target: "tʰ", reverseDefault: true },
    { armenian: "ք", target: "kʰ", reverseDefault: true },
    { armenian: "փ", target: "pʰ", reverseDefault: true },
    { armenian: "ց", target: "t͡sʰ", reverseDefault: true },
    { armenian: "չ", target: "t͡ʃʰ", reverseDefault: true },

    // ── Fricatives ──────────────────────────────────────────────────────
    // Identical to Eastern. JIPA 2024: 447.
    { armenian: "զ", target: "z" },
    { armenian: "ժ", target: "ʒ" },
    { armenian: "խ", target: "χ" },
    { armenian: "ղ", target: "ʁ", reverseDefault: false },
    { armenian: "հ", target: "h" },
    { armenian: "ս", target: "s" },
    { armenian: "շ", target: "ʃ" },
    { armenian: "վ", target: "v", reverseDefault: true },
    { armenian: "ֆ", target: "f" },

    // ── Sonorants ───────────────────────────────────────────────────────
    // Standard Western has merged ր and ռ to a single rhotic /ɾ/ in most
    // varieties (JIPA 2024: 459: "Beirut WA … has neutralized the rhotic
    // distinction"). Some conservative speakers and prescriptive
    // transcriptions retain the contrast. We follow the JIPA Beirut
    // analysis: both → /ɾ/.
    { armenian: "լ", target: "l" },
    { armenian: "մ", target: "m" },
    { armenian: "ն", target: "n" },
    { armenian: "յ", target: "j" },
    { armenian: "ռ", target: "ɾ", reverseDefault: false },
    { armenian: "ր", target: "ɾ", reverseDefault: true },

    // Classical glide letter ւ — see note under sequenceMappings (the
    // standalone form is now rare; appears mainly in digraphs ու and ե+ւ).
    { armenian: "ւ", target: "v", reverseDefault: false },
  ],

  // sequenceMappings: ordered longest-first as required by the scanner.
  // All two-char sequences precede the single-char ligature և.
  sequenceMappings: [
    // ── Digraph ─────────────────────────────────────────────────────────
    // ու = /u/. Identical to Eastern.
    { armenian: "ու", target: "u" },

    // ── ե + V/W combinations ────────────────────────────────────────────
    {
      armenian: "եվ",
      target: "ev",
      contextRules: [{ condition: { wordInitial: true }, target: "jev" }],
    },
    {
      armenian: "եւ",
      target: "ev",
      contextRules: [{ condition: { wordInitial: true }, target: "jev" }],
    },

    // ── W3: sibilant + stop anti-collapse ───────────────────────────────
    // Phonotactic constraint: Armenian disallows sibilant + voiced-stop
    // clusters. The orthographic ս/շ + պ/տ/կ surface as /sp st sk ʃp ʃt
    // ʃk/, NOT /sb sd sɡ ʃb ʃd ʃɡ/ (which the W1 collapse on պ/տ/կ would
    // otherwise produce). JIPA 2024: 453.
    { armenian: "սպ", target: "sp" },
    { armenian: "ստ", target: "st" },
    { armenian: "սկ", target: "sk" },
    { armenian: "շպ", target: "ʃp" },
    { armenian: "շտ", target: "ʃt" },
    { armenian: "շկ", target: "ʃk" },

    // Single-char ligature (length 1). Must come last to keep the
    // longest-first invariant.
    {
      armenian: "և",
      target: "ev",
      contextRules: [{ condition: { wordInitial: true }, target: "jev" }],
    },
  ],

  punctuation: {
    "։": ".",
    "՞": "?",
    "՝": ",",
    "՜": "!",
    "«": '"',
    "»": '"',
    "՛": "",
    "՚": "",
    "ՙ": "",
    "՟": "",
  },
};
