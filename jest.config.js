/** @type {import('jest').Config} */
module.exports = {
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],

  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },

  transform: {
    "^.+\\.(t|j)sx?$": ["@swc/jest"],
  },

  collectCoverageFrom: [
    "src/**/*.{ts,tsx}",
    "!src/pages/_app.tsx",
    "!src/pages/_document.tsx",
    "!src/**/index.ts",
  ],
};
