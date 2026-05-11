# IPA Profiles

Broad phonemic transcription of Armenian into IPA (International Phonetic
Alphabet). Two dialect variants are provided: Standard Eastern Armenian and
Standard Western Armenian.

Both profiles target **Tier 1: orthography → broad phonemic**, with every
rule attested in primary phonological literature. Allophonic, lexicalized,
and morphophonological detail is deferred to future narrow-phonetic profiles
(`ipa-*-narrow`). See [`docs/LINGUISTIC_RATIONALE.md`](../../docs/LINGUISTIC_RATIONALE.md)
for the rule-by-rule citations.

## What "Tier 1 broad phonemic" means

- **Included**: phoneme inventory (per dialect), word-initial yotation rules
  (ե → /je/, ո → /vo/ with ով exception), digraphs (ու → /u/, և → /ev/),
  Western voicing collapse (W1), Western sibilant + stop phonotactics (W3).
- **Excluded**: stress placement, schwa epenthesis in CC clusters,
  word-final devoicing, post-nasal aspiration, regressive ղ/վ assimilation,
  suffix -ությ- palatalization, Western progressive devoicing, յու → /ʏ/
  glide fronting.

For per-rule sources and rationale, see
[`docs/LINGUISTIC_RATIONALE.md`](../../docs/LINGUISTIC_RATIONALE.md).

## `ipa-eastern`

Phonemic transcription of Standard Eastern Armenian (Republic of Armenia, Iran).

Key behaviour encoded:

- Three-way stop/affricate contrast: voiced (բ դ գ ձ ջ) / voiceless
  unaspirated (պ տ կ ծ ճ) / voiceless aspirated (թ ք փ ց չ).
- Open back unrounded vowel /ɑ/ (not /a/) per JIPA 2024.
- Word-initial ե → `je`, word-initial ո → `vo` (exception: ո + վ → `o`
  for the ով interrogative family and /ov/-initial loans).
- Aspirated series uses U+02B0 MODIFIER LETTER SMALL H (`ʰ`).
- Affricates use U+0361 COMBINING DOUBLE INVERTED BREVE (tie bar):
  `t͡s`, `d͡z`, `t͡ʃ`, `d͡ʒ`, `t͡sʰ`, `t͡ʃʰ`.
- ղ → /ʁ/ (uvular), ր → /ɾ/ (tap), ռ → /r/ (trill — distinction preserved
  in Yerevan EA per JIPA 2024).
- Armenian emphasis mark ՛ and apostrophe ՚ are dropped from output but are
  transparent to context rules (do not break word runs).

Primary sources:

- Dum-Tragut, J. (2009). *Armenian: Modern Eastern Armenian*. John Benjamins.
- Seyfarth, S., Dolatian, H., Guekguezian, P., Kelly, N. & Toparlak, T.
  (2024). Armenian (Yerevan EA and Beirut WA). *JIPA* 54(1): 445–478.
  [DOI: 10.1017/S0025100323000130](https://doi.org/10.1017/S0025100323000130).
- Dolatian, H. (2022). *Armenian Phonology and Phonetics*. Glottothèque.
- Vaux, B. (1998). *The Phonology of Armenian*. Oxford University Press.

## `ipa-western`

Phonemic transcription of **Standard Western Armenian** (diasporic
communities; the dialect of the Armenian Apostolic Church outside Armenia
and Iran).

Western Armenian collapses the Classical three-way contrast into a two-way
contrast (voiced + voiceless-aspirated). **Aspiration is retained** on
թ ք փ ց չ — contrary to Wiktionary's algorithm, which strips it.

| Letter | Eastern | Western |
| --- | --- | --- |
| բ | /b/  | /pʰ/ (merges with փ) |
| գ | /ɡ/  | /kʰ/ (merges with ք) |
| դ | /d/  | /tʰ/ (merges with թ) |
| ձ | /d͡z/ | /t͡sʰ/ (merges with ց) |
| ջ | /d͡ʒ/ | /t͡ʃʰ/ (merges with չ) |
| ծ | /t͡s/ | /d͡z/ |
| կ | /k/  | /ɡ/ |
| ճ | /t͡ʃ/ | /d͡ʒ/ |
| պ | /p/  | /b/ |
| տ | /t/  | /d/ |
| թ ք փ ց չ | /tʰ kʰ pʰ t͡sʰ t͡ʃʰ/ | /tʰ kʰ pʰ t͡sʰ t͡ʃʰ/ (unchanged) |

Rhotic merger: Western has merged ր and ռ to a single /ɾ/ in most
varieties (JIPA 2024: 459).

Word-initial yotation rules (ե → /je/, ո → /vo/) are preserved.

Phonotactic constraint: sibilant + plain stop clusters (ստ սպ սկ շտ
շպ շկ) surface as voiceless /st sp sk ʃt ʃp ʃk/, overriding the W1
voicing collapse on պ/տ/կ in standalone contexts.

Primary sources:

- Seyfarth, S., Dolatian, H., Guekguezian, P., Kelly, N. & Toparlak, T.
  (2024). Armenian (Yerevan EA and Beirut WA). *JIPA* 54(1): 445–478.
- Dolatian, H. (2022). *Armenian Phonology and Phonetics*. Glottothèque.
- Vaux, B. (1998). *The Phonology of Armenian*. Oxford University Press.
- Baronian, L. (2017). On the diachrony of Armenian stops.
