// Measures conformance of our ipa-eastern / ipa-western profiles against
// Wiktionary's `phonemic_IPA` algorithm.
//
//   pnpm run ipa-conformance
//
// Wiktionary's algorithm mixes phonemic and phonetic rules; our v3 profiles
// implement strict Tier 1 phonemic transcription per Dum-Tragut 2009 and
// JIPA 2024. Cases with a `*_divergence_reason` field are expected to
// diverge from Wiktionary — they are reported separately and DO NOT count
// as regressions. Cases without a reason should match exactly; any divergence
// there is a real regression.

import { readFileSync } from "node:fs";
import { createTransliterator } from "../../lib/index.js";

const fixture = JSON.parse(
  readFileSync(new URL("./wiktionary-phonemic-testcases.json", import.meta.url), "utf8"),
);

const east = createTransliterator({ standard: "ipa-eastern" });
const west = createTransliterator({ standard: "ipa-western" });

const stats = {
  east: { pass: 0, total: 0, expectedDivergence: 0, regression: 0 },
  west: { pass: 0, total: 0, expectedDivergence: 0, regression: 0 },
};

const regressions = [];
const expectedDivergences = [];

for (const tc of fixture.cases) {
  for (const system of ["east", "west"]) {
    const expected = tc[system];
    if (!expected) continue;
    const s = stats[system];
    s.total++;

    const fn = system === "east" ? east : west;
    const got = fn(tc.armenian).toLowerCase();
    const want = expected.toLowerCase();
    const reason = tc[`${system}_divergence_reason`];

    if (got === want) {
      s.pass++;
    } else if (reason) {
      s.expectedDivergence++;
      expectedDivergences.push({ system, armenian: tc.armenian, expected, got, reason });
    } else {
      s.regression++;
      regressions.push({ system, armenian: tc.armenian, expected, got });
    }
  }
}

const formatTable = (rows, columns) => {
  const widths = Object.fromEntries(
    columns.map((c) => [c, Math.max(c.length, ...rows.map((r) => [...String(r[c])].length))]),
  );
  const pad = (s, w) => String(s) + " ".repeat(Math.max(0, w - [...String(s)].length));
  const header = columns.map((c) => pad(c, widths[c])).join("  ");
  const sep = columns.map((c) => "-".repeat(widths[c])).join("  ");
  const body = rows.map((r) => columns.map((c) => pad(r[c], widths[c])).join("  "));
  return [header, sep, ...body].join("\n");
};

console.log("=== Wiktionary phonemic_IPA conformance ===");
for (const system of ["east", "west"]) {
  const s = stats[system];
  console.log(
    `${system === "east" ? "Eastern" : "Western"}: ${s.pass}/${s.total} exact match` +
      `, ${s.expectedDivergence} expected divergences, ${s.regression} regressions`,
  );
}

if (regressions.length > 0) {
  console.log("\n!! REGRESSIONS (unexpected divergences — investigate) !!");
  console.log(formatTable(regressions, ["system", "armenian", "expected", "got"]));
}

if (expectedDivergences.length > 0) {
  console.log("\nExpected divergences (Tier 2/3 rules deliberately not applied):");
  const byReason = new Map();
  for (const d of expectedDivergences) {
    if (!byReason.has(d.reason)) byReason.set(d.reason, []);
    byReason.get(d.reason).push(d);
  }
  for (const [reason, cases] of byReason) {
    console.log(`\n  [${reason}] — ${fixture.divergence_categories[reason]}`);
    console.log("  " + formatTable(cases, ["system", "armenian", "expected", "got"]).replace(/\n/g, "\n  "));
  }
}

process.exit(regressions.length > 0 ? 1 : 0);
