module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  moduleNameMapper: {
    "^@src(.*)$": "<rootDir>/src$1",
  },
  testPathIgnorePatterns: [".d.ts", ".js"],
};
