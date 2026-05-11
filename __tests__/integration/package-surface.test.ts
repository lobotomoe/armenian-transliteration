import { readFileSync } from "node:fs";
import { join } from "node:path";

interface PackageJson {
  version: string;
  exports: Record<string, unknown>;
  files: string[];
  scripts: Record<string, string>;
}

const packageJson = JSON.parse(
  readFileSync(join(process.cwd(), "package.json"), "utf8"),
) as PackageJson;

describe("published package surface", () => {
  test("publishes the expected major version", () => {
    expect(packageJson.version).toBe("3.0.0");
  });

  test("exports runtime API, profile API, static profile files and package metadata", () => {
    expect(packageJson.exports["."]).toEqual({
      types: "./lib/index.d.ts",
      require: "./lib/index.cjs",
      import: "./lib/index.js",
    });
    expect(packageJson.exports["./profiles"]).toEqual({
      types: "./lib/profiles/index.d.ts",
      require: "./lib/profiles/index.cjs",
      import: "./lib/profiles/index.js",
    });
    expect(packageJson.exports["./profiles/*"]).toBe("./profiles/*");
    expect(packageJson.exports["./browser"]).toBe("./lib/index.global.js");
    expect(packageJson.exports["./package.json"]).toBe("./package.json");
  });

  test("does not publish removed legacy aliases as package entry points", () => {
    expect(JSON.stringify(packageJson.exports)).not.toContain("ru-geographic");
    expect(JSON.stringify(packageJson.exports)).not.toContain('"ru-personal"');
    expect(JSON.stringify(packageJson.exports)).not.toContain(
      "ru-personal-vartapetyan",
    );
  });

  test("includes generated code and static profile metadata in the package", () => {
    expect(packageJson.files).toEqual([
      "lib/**/*",
      "profiles/**/*",
      "README.md",
    ]);
  });

  test("build scripts clean the actual output directory before packaging", () => {
    expect(packageJson.scripts["clean"]).toContain("lib");
    expect(packageJson.scripts["build"]).toContain("rimraf lib dist");
    expect(packageJson.scripts["prepack"]).toBe("npm run build");
  });
});
