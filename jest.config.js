/** @type {import('ts-jest').JestConfigWithTsJest} **/
export default {
  testEnvironment: "node",
  transform: {
    "^.+\\.tsx?$": [
      "ts-jest",
      {
        // tsconfig.json uses module: NodeNext (ESM-first for the published
        // library). Jest 30 runs in CJS by default — tell ts-jest to emit
        // CommonJS for tests so Jest can require() them without flipping the
        // whole project to native ESM Jest mode.
        tsconfig: {
          module: "CommonJS",
          moduleResolution: "Node10",
          verbatimModuleSyntax: false,
          ignoreDeprecations: "6.0",
        },
      },
    ],
  },
  moduleNameMapper: {
    "^(\\.{1,2}/.*)\\.js$": "$1",
  },
  testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$",
  collectCoverage: true,
};
