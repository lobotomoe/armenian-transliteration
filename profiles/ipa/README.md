# IPA Profiles

Broad phonemic transcription of Armenian into IPA (International Phonetic
Alphabet). Two dialect variants are provided: Standard Eastern Armenian and
Standard Western Armenian.

## `ipa-eastern`

Phonemic transcription of Standard Eastern Armenian (Republic of Armenia, Iran).

Key behaviour encoded:

- Word-initial yotation: `ե → jɛ`, `ո → vɔ` (except before vowels or `վ`),
  `և → jɛv`.
- Aspirated series (թ չ ց փ ք) uses U+02B0 MODIFIER LETTER SMALL H (`ʰ`).
- Affricates use U+0361 COMBINING DOUBLE INVERTED BREVE (tie bar):
  `t͡s` (ծ), `d͡z` (ձ), `t͡ʃ` (ճ), `d͡ʒ` (ջ), `t͡sʰ` (ց), `t͡ʃʰ` (չ).
- `ղ → ʁ` (uvular), `ր → ɾ` (tap), `ռ → r` (trill).

Sources:

- Bert Vaux, *The Phonology of Armenian*, Oxford: Clarendon Press, 1998.
- Jasmine Dum-Tragut, *Armenian: Modern Eastern Armenian*, London Oriental and African Language Library 14, Amsterdam: John Benjamins, 2009.
- [Help:IPA/Armenian — Wikipedia](https://en.wikipedia.org/wiki/Help:IPA/Armenian) (secondary cross-check).

## `ipa-western`

Phonemic transcription of Standard Western Armenian (diasporic communities;
the dialect of the Armenian Apostolic Church outside Armenia and Iran).

Western Armenian collapses the Classical three-way stop/affricate contrast
(voiced / voiceless unaspirated / aspirated) into a two-way contrast
(voiced / aspirated):

| Letter | Eastern | Western |
| --- | --- | --- |
| բ | b | pʰ (merges with փ) |
| գ | ɡ | kʰ (merges with ք) |
| դ | d | tʰ (merges with թ) |
| ձ | d͡z | t͡sʰ (merges with ց) |
| ջ | d͡ʒ | t͡ʃʰ (merges with չ) |
| ծ | t͡s | d͡z |
| կ | k | ɡ |
| ճ | t͡ʃ | d͡ʒ |
| պ | p | b |
| տ | t | d |

The aspirated series (թ չ ց փ ք) is preserved unchanged from Eastern.
Word-initial yotation rules (ե → jɛ, ո → vɔ) are preserved.

Sources:

- Bert Vaux, *The Phonology of Armenian*, Oxford: Clarendon Press, 1998.
- Michele Sigler, *Specificity and agreement in Standard Western Armenian*, MIT PhD thesis, 1996.
- [Western Armenian — Phonology — Wikipedia](https://en.wikipedia.org/wiki/Western_Armenian#Phonology) (secondary cross-check).
