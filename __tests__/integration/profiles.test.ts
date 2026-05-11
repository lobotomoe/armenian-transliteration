import { readFileSync } from "node:fs";
import { join } from "node:path";
import {
  getProfile,
  getProfilesByTargetLanguage,
  listProfiles,
  profiles,
} from "../../src";
import { profiles as subpathProfiles } from "../../src/profiles";
import type { ProfileMetadata } from "../../src/profiles";

interface StaticProfileSource {
  title: string;
  kind: string;
  year?: number;
  url?: string;
}

interface StaticProfileEntry {
  label: string;
  domain: string;
  authority: string;
  year?: number;
  sources: StaticProfileSource[];
}

interface StaticProfileFile {
  targetLanguage: string | null;
  targetScript: string;
  scriptCode: string;
  profileIds: string[];
  aliases: Record<string, string>;
  profiles: Record<string, StaticProfileEntry>;
}

function readStaticProfileMetadata(relativePath: string): StaticProfileFile {
  return JSON.parse(
    readFileSync(join(process.cwd(), relativePath), "utf8"),
  ) as StaticProfileFile;
}

describe("profile metadata", () => {
  test("exports profiles from the main API and profiles subpath source", () => {
    expect(profiles["ru-geo-kt-1974"].targetLanguage).toBe("ru");
    expect(subpathProfiles["ru-geo-kt-1974"].scriptCode).toBe("Cyrl");
  });

  test("exposes canonical profile IDs without aliases", () => {
    expect(getProfile("ru-geo-kt-1974").status).toBe("canonical");
    expect(getProfile("ru-geo-kt-1974").canonicalId).toBe("ru-geo-kt-1974");
    expect(getProfile("ru-geo-kt-1974").id).toBe("ru-geo-kt-1974");
  });

  test("lists canonical profiles", () => {
    expect(listProfiles()).toHaveLength(10);
  });

  test("groups Russian profiles by target language", () => {
    const russianProfiles = getProfilesByTargetLanguage("ru").map(
      (profile) => profile.id,
    );
    expect(russianProfiles).toEqual([
      "ru-geo-kt-1974",
      "ru-geo-ra-2011",
      "ru-proper-vartapetyan-1961",
      "ru-phonetic-eastern",
    ]);
  });

  test("rejects removed legacy aliases at runtime", () => {
    expect(() => getProfile("ru-geographic" as never)).toThrow(
      "Unknown transliteration profile: ru-geographic",
    );
    expect(() => getProfile("ru-personal-vartapetyan" as never)).toThrow(
      "Unknown transliteration profile: ru-personal-vartapetyan",
    );
    expect(() => getProfile("ru-personal" as never)).toThrow(
      "Unknown transliteration profile: ru-personal",
    );
  });

  test.each([
    "profiles/latin/metadata.json",
    "profiles/ru/metadata.json",
    "profiles/ipa/metadata.json",
  ])("%s stays aligned with runtime profile metadata", (relativePath) => {
    const staticMetadata = readStaticProfileMetadata(relativePath);

    expect(Object.keys(staticMetadata.aliases)).toHaveLength(0);
    expect(Object.keys(staticMetadata.profiles)).toEqual(
      staticMetadata.profileIds,
    );

    for (const id of staticMetadata.profileIds) {
      const runtimeProfile = profiles[
        id as keyof typeof profiles
      ] as ProfileMetadata | undefined;
      const staticProfile = staticMetadata.profiles[id]!;

      expect(runtimeProfile).toBeDefined();
      if (!runtimeProfile) {
        throw new Error(`Missing runtime profile metadata for ${id}`);
      }

      expect(runtimeProfile.id).toBe(id);
      expect(runtimeProfile.targetLanguage).toBe(
        staticMetadata.targetLanguage,
      );
      expect(runtimeProfile.targetScript).toBe(staticMetadata.targetScript);
      expect(runtimeProfile.scriptCode).toBe(staticMetadata.scriptCode);
      expect(runtimeProfile.label).toBe(staticProfile.label);
      expect(runtimeProfile.domain).toBe(staticProfile.domain);
      expect(runtimeProfile.authority).toBe(staticProfile.authority);
      expect(runtimeProfile.year).toBe(staticProfile.year);
      expect(
        runtimeProfile.sources.map((source) => ({
          title: source.title,
          kind: source.kind,
          year: source.year,
          url: source.url,
        })),
      ).toEqual(staticProfile.sources);
    }
  });
});
