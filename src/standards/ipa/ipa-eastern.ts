import type { TransliterationStandard } from "../../types.js";

/**
 * Eastern Armenian — broad phonemic IPA (Tier 1: orthography → phoneme).
 *
 * Scope: strict orthography-to-phoneme mapping. Every rule is attested in
 * primary phonology sources (Dum-Tragut 2009, JIPA 2024) as a phonemic-level
 * generalization, not as a lexicalized or morphophonological alternation.
 *
 * Out of scope (deferred to a future `ipa-eastern-narrow` profile):
 *  - Stress placement (regular: rightmost non-schwa syllable; many lexical
 *    exceptions documented in Dum-Tragut 2009: 47–49).
 *  - Schwa epenthesis in CC clusters (գրել → [ɡəɾel]). Not in the orthography
 *    and realization is variable. Dum-Tragut 2009: 30–35.
 *  - Word-final devoicing/aspiration (մարդ → [mɑɾtʰ]). Dum-Tragut 2009: 22
 *    explicitly states "in principle, no terminal devoicing"; the cases that
 *    do devoice are a closed lexical list, not a productive rule.
 *  - Post-nasal aspiration (անդամ → [ɑntʰɑm]). Lexicalized exception list
 *    per Dum-Tragut 2009: 23.
 *  - Regressive obstruent cluster devoicing (ղ → [χ] before voiceless;
 *    վ → [f] before voiceless). Morphophonological in derived environments
 *    only; the orthography typically preserves the underlying form. Dum-
 *    Tragut 2009: 22 explicitly: "the 'rules' … are NOT strict and general".
 *    JIPA 2024: 458–459 confirms the rule applies in compounds/suffixation,
 *    not as a blind phonotactic constraint.
 *  - -ությ- "palatalization" to [ut͡sʰjun]. NOT attested in the cited
 *    sources: Dum-Tragut 2009: 35 transcribes the suffix as [utʰjun] with
 *    plain [tʰ], not affricated [t͡sʰ]. This appears to be a Wiktionary-only
 *    over-narrow phonetic claim.
 *
 * Primary sources:
 *  - Dum-Tragut, Jasmine (2009). Armenian: Modern Eastern Armenian.
 *    John Benjamins. ISBN 978-90-272-3814-6. Phonology: pp. 12–55.
 *  - Seyfarth, S., Dolatian, H., Guekguezian, P., Kelly, N. & Toparlak, T.
 *    (2024). Armenian (Yerevan Eastern and Beirut Western). Journal of the
 *    International Phonetic Association 54(1): 445–478.
 *    DOI: 10.1017/S0025100323000130 (open access).
 *  - Dolatian, H. (2022). Armenian Phonology and Phonetics. Glottothèque
 *    lecture series.
 */

export const ipaEastern: TransliterationStandard = {
  id: "ipa-eastern",
  name: "IPA Phonemic Transcription (Eastern Armenian)",
  targetScript: "ipa",
  reversible: false,

  charMappings: [
    // ── Vowels ──────────────────────────────────────────────────────────
    // Vowel inventory: Dum-Tragut 2009: 13 (Table 1.1); JIPA 2024: 446.
    // Six-vowel system /ɑ e i o u ə/. Note: open central /ɑ/ (not /a/) per
    // JIPA 2024: 446 ("low central /ɑ/, not /a/").
    { armenian: "ա", target: "ɑ" },
    { armenian: "ի", target: "i" },
    { armenian: "ը", target: "ə" }, // schwa — phonemic per Dum-Tragut 2009: 13
    { armenian: "օ", target: "o", reverseDefault: false },

    // ե: word-initial → /je/ (E2). Dum-Tragut 2009: 14 §1.1.1 point 1.a.
    // Reformed orthography distinguishes ե (with glide) from է (no glide).
    {
      armenian: "ե",
      target: "e",
      reverseDefault: true,
      contextRules: [{ condition: { wordInitial: true }, target: "je" }],
    },
    { armenian: "է", target: "e", reverseDefault: false },

    // ո: word-initial → /vo/ (E3). Dum-Tragut 2009: 16 §1.1.1 point 2.a.
    // Exception: ով + derivatives (interrogative pronoun "who?") stay /o/.
    // The orthographic test "ո + վ word-initial → o" captures both the ով
    // family and loanwords like ովասիս /ovɑsis/ "oasis" by phonotactic
    // generalization. Dum-Tragut 2009: 16 lists the exceptions.
    {
      armenian: "ո",
      target: "o",
      reverseDefault: true,
      contextRules: [
        { condition: { wordInitial: true, followedBy: ["վ"] }, target: "o" },
        { condition: { wordInitial: true }, target: "vo" },
      ],
    },

    // ── Stops and affricates: three-way contrast ────────────────────────
    // Eastern preserves the Classical voiced / voiceless-unaspirated /
    // voiceless-aspirated contrast (E1). Dum-Tragut 2009: 17–18 (Table
    // 1.2 with minimal pairs); JIPA 2024: 447; Vaux 1998 (per JIPA: 447).
    // Voiced:
    { armenian: "բ", target: "b" },
    { armenian: "դ", target: "d" },
    { armenian: "գ", target: "ɡ" }, // U+0261 LATIN SMALL LETTER SCRIPT G
    { armenian: "ձ", target: "d͡z" },
    { armenian: "ջ", target: "d͡ʒ" },
    // Voiceless unaspirated:
    { armenian: "պ", target: "p" },
    { armenian: "տ", target: "t", reverseDefault: true },
    { armenian: "կ", target: "k" },
    { armenian: "ծ", target: "t͡s", reverseDefault: false },
    { armenian: "ճ", target: "t͡ʃ", reverseDefault: false },
    // Voiceless aspirated:
    { armenian: "թ", target: "tʰ" },
    { armenian: "ք", target: "kʰ", reverseDefault: false },
    { armenian: "փ", target: "pʰ", reverseDefault: false },
    { armenian: "ց", target: "t͡sʰ", reverseDefault: true },
    { armenian: "չ", target: "t͡ʃʰ", reverseDefault: true },

    // ── Fricatives ──────────────────────────────────────────────────────
    // Dum-Tragut 2009: 19 (Table 1.3); JIPA 2024: 447.
    { armenian: "զ", target: "z" },
    { armenian: "ժ", target: "ʒ" },
    { armenian: "խ", target: "χ" }, // voiceless uvular fricative
    { armenian: "ղ", target: "ʁ", reverseDefault: false }, // voiced uvular fricative
    { armenian: "հ", target: "h" },
    { armenian: "ս", target: "s" },
    { armenian: "շ", target: "ʃ" },
    { armenian: "վ", target: "v", reverseDefault: true },
    { armenian: "ֆ", target: "f" },

    // ── Sonorants ───────────────────────────────────────────────────────
    // Two rhotics: ր alveolar tap /ɾ/ vs ռ alveolar trill /r/.
    // Dum-Tragut 2009: 19; JIPA 2024: 447, 459 ("Yerevan EA preserves the
    // historical contrast between a trill ⟨ռ⟩ /r/ and a tap ⟨ր⟩ /ɾ/").
    { armenian: "լ", target: "l" },
    { armenian: "մ", target: "m" },
    { armenian: "ն", target: "n" },
    { armenian: "յ", target: "j" },
    { armenian: "ռ", target: "r", reverseDefault: true },
    { armenian: "ր", target: "ɾ", reverseDefault: false },

    // ── Glide letter ────────────────────────────────────────────────────
    // ւ (standalone, U+0582) appears almost exclusively in the digraphs
    // ու and ե+ւ (handled below). In rare standalone Classical orthography
    // it represented /w/; in Modern Eastern it has merged with /v/.
    { armenian: "ւ", target: "v", reverseDefault: false },
  ],

  sequenceMappings: [
    // ── Digraph ─────────────────────────────────────────────────────────
    // ու is a single grapheme in the Armenian alphabet, representing /u/
    // (E7). Dum-Tragut 2009: 13, 18; JIPA 2024: 446.
    { armenian: "ու", target: "u" },

    // ── ե + V/W combinations ────────────────────────────────────────────
    // ե+վ, ե+ւ, և (U+0587 ligature) — orthographic variants of the
    // /ev/ sequence. Apply the word-initial /je/ rule to the whole
    // sequence: word-initial → /jev/, otherwise /ev/.
    // The ligature և is always lowercase; the reformed digraph ե+վ
    // replaced the Classical ե+ւ in 1922.
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
    {
      armenian: "և",
      target: "ev",
      contextRules: [{ condition: { wordInitial: true }, target: "jev" }],
    },
  ],

  punctuation: {
    // Armenian punctuation → ASCII equivalents. The Unicode tables and
    // glyphs follow the Armenian block (U+0531–U+058F).
    "։": ".", // U+0589 ARMENIAN FULL STOP
    "՞": "?", // U+055E ARMENIAN QUESTION MARK
    "՝": ",", // U+055D ARMENIAN COMMA
    "՜": "!", // U+055C ARMENIAN EXCLAMATION MARK
    "«": '"',
    "»": '"',
    // Stress/emphasis markers in source orthography. We do not emit IPA
    // stress in broad phonemic transcription (out of scope), so drop them.
    "՛": "", // U+055B ARMENIAN EMPHASIS MARK
    "՚": "", // U+055A ARMENIAN APOSTROPHE
    "ՙ": "", // U+0559 ARMENIAN MODIFIER LETTER LEFT HALF RING
    "՟": "", // U+055F ARMENIAN ABBREVIATION MARK
  },
};
