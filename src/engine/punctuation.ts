/**
 * Default Armenian punctuation mappings.
 * Standards can override these via their `punctuation` field.
 */
export const DEFAULT_PUNCTUATION: Record<string, string> = {
  "\u0559": "'",   // ՙ ARMENIAN MODIFIER LETTER LEFT HALF RING
  "\u055A": "'",   // ՚ ARMENIAN APOSTROPHE
  "\u055B": "'",   // ՛ ARMENIAN EMPHASIS MARK
  "\u055C": "!",   // ՜ ARMENIAN EXCLAMATION MARK
  "\u055D": ",",   // ՝ ARMENIAN COMMA
  "\u055E": "?",   // ՞ ARMENIAN QUESTION MARK
  "\u055F": ".",   // ՟ ARMENIAN ABBREVIATION MARK
  "\u0589": ".",   // ։ ARMENIAN FULL STOP
  "\u058A": "-",   // ֊ ARMENIAN HYPHEN
  "\u00AB": '"',   // « LEFT-POINTING DOUBLE ANGLE QUOTATION MARK
  "\u00BB": '"',   // » RIGHT-POINTING DOUBLE ANGLE QUOTATION MARK
};
