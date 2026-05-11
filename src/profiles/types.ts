import type { Standard, TargetScript } from "../types.js";

export type ProfileStatus = "canonical" | "alias";

export type ProfileDomain =
  | "romanization"
  | "geographic"
  | "proper-names"
  | "academic"
  | "phonemic";

export type ProfileSourceKind =
  | "official-standard"
  | "government-decision"
  | "geographic-instruction"
  | "reference-table"
  | "secondary-reference"
  | "critical-review"
  | "terminology-dictionary"
  | "scholarly-system"
  | "package-profile";

export interface ProfileSource {
  title: string;
  kind: ProfileSourceKind;
  year?: number;
  url?: string;
}

export interface ProfileMetadata {
  id: Standard;
  canonicalId: Standard;
  status: ProfileStatus;
  label: string;
  targetLanguage: string | null;
  targetScript: TargetScript;
  scriptCode: "Latn" | "Cyrl" | "IPA";
  domain: ProfileDomain;
  authority: string;
  year?: number;
  aliases: readonly Standard[];
  sources: readonly ProfileSource[];
  notes: readonly string[];
}
