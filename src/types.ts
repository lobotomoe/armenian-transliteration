/** Latin-script transliteration standards */
export type LatinStandard =
  | "bgn-pcgn"
  | "iso-9985"
  | "hubschmann-meillet"
  | "ala-lc";

/** Cyrillic-script transliteration standards */
export type CyrillicStandard = "russian-phonetic";

/** All supported transliteration standards */
export type Standard = LatinStandard | CyrillicStandard;

/** Transliteration direction */
export type Direction = "from-armenian" | "to-armenian";

/** Options for the transliterate function */
export interface TransliterateOptions {
  /** Transliteration standard to use. Default: "bgn-pcgn" */
  standard?: Standard;
  /** Direction of transliteration. Default: "from-armenian" */
  direction?: Direction;
}

/** Position of a token within a word */
export type LetterPosition = "initial" | "medial" | "final" | "isolated";

/** Target script for a standard */
export type TargetScript = "latin" | "cyrillic";

/** Context condition for position-dependent mapping rules */
export interface ContextCondition {
  /** Token is at word start (initial or isolated) */
  wordInitial?: boolean;
  /** Next Armenian token value is one of these (lowercase canonical) */
  followedBy?: readonly string[];
  /** Previous Armenian token value is one of these (lowercase canonical) */
  precededBy?: readonly string[];
  /** Token is at a specific position within the word */
  position?: LetterPosition | readonly LetterPosition[];
  /** Invert: negate the followedBy check (match when NOT followed by) */
  notFollowedBy?: readonly string[];
}

/** A context-dependent override rule */
export interface ContextRule {
  condition: ContextCondition;
  target: string;
}

/** Mapping for a single Armenian letter */
export interface CharMapping {
  /** Armenian letter (lowercase canonical form) */
  armenian: string;
  /** Default transliteration output (lowercase) */
  target: string;
  /** When multiple Armenian letters map to the same target, mark one as the reverse default */
  reverseDefault?: boolean;
  /** Context-dependent overrides, evaluated in order (first match wins) */
  contextRules?: readonly ContextRule[];
}

/** Mapping for a multi-character Armenian sequence */
export interface SequenceMapping {
  /** Armenian sequence (lowercase canonical), e.g. "\u0578\u0582" (ou) */
  armenian: string;
  /** Default transliteration output */
  target: string;
  /** Reverse default flag */
  reverseDefault?: boolean;
  /** Context-dependent overrides */
  contextRules?: readonly ContextRule[];
}

/** Complete definition of a transliteration standard */
export interface TransliterationStandard {
  /** Standard identifier */
  id: Standard;
  /** Human-readable name */
  name: string;
  /** Target script */
  targetScript: TargetScript;
  /** Whether this standard supports lossless round-trip */
  reversible: boolean;
  /** Single-letter mappings (38 Armenian letters) */
  charMappings: readonly CharMapping[];
  /** Multi-character sequence mappings, ordered longest-first */
  sequenceMappings: readonly SequenceMapping[];
  /** Armenian punctuation to target punctuation */
  punctuation: Record<string, string>;
}
