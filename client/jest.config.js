module.exports = {
  preset: "jest-puppeteer",
  testMatch: ["**/?(*.)+(spec|test).[t]s"],
  moduleNameMapper: {
    "^src(.*)$": "<rootDir>/src$1",
  },
  transform: {
    "^.+\\.ts?$": "ts-jest",
    "\\.js$": "ts-jest",
  },
  globalSetup: "./src/test/setup.ts",
  // globalTeardown: "./src/test/teardown.ts",
};
