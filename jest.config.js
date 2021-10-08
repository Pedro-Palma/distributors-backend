module.exports = {
  clearMocks: true,
  moduleFileExtensions: ['js','ts'],
  roots: [
    "<rootDir>/src",
    "./tests"
  ],
  testEnvironment: 'node',
  transform: {
    '^.+\\.ts?$': 'ts-jest',
  },
  setupFilesAfterEnv: ['jest-extended'],
  globals: {
    'ts-jest': {
      diagnostics: false,
    },
  },
  preset: 'ts-jest',
  globalSetup: './test/global-setup.ts',
  globalTeardown: './test/global-teardown.ts',
}