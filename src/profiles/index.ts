import type { Standard } from "../types.js";
import type { ProfileMetadata } from "./types.js";
import { profiles } from "./metadata.js";

export type {
  ProfileDomain,
  ProfileMetadata,
  ProfileSource,
  ProfileSourceKind,
  ProfileStatus,
} from "./types.js";

export { profiles };

export function getProfile(id: Standard): ProfileMetadata {
  const profile = profiles[id];
  if (!profile) {
    throw new Error(`Unknown transliteration profile: ${String(id)}`);
  }
  return profile;
}

export function listProfiles(): readonly ProfileMetadata[] {
  return Object.values(profiles);
}

export function getProfilesByTargetLanguage(
  targetLanguage: string,
): readonly ProfileMetadata[] {
  return listProfiles().filter(
    (profile) => profile.targetLanguage === targetLanguage,
  );
}
