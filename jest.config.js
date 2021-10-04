/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  globalSetup: "<rootDir>/src/tests/setup/globalSetup.ts",
  globalTeardown: "<rootDir>/src/tests/setup/globalTeardown.ts",
};
