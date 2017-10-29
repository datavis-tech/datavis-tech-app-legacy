module.exports = {
  verbose: true,
  roots: [
    '<rootDir>/tests/',
    '<rootDir>/src/',
  ],
  collectCoverageFrom: [
    '**/*.{js,jsx}',
    '!node_modules/**',
    '!prototypes/**',
    '!static/**'
  ],
  setupFiles: [
    './tests/rafPolyfill',
    './tests/setupTests.js'
  ]
}
