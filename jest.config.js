module.exports = {
  verbose: true,
  roots: [
    '<rootDir>/tests/',
    '<rootDir>/components/',
    '<rootDir>/modules/',
    '<rootDir>/pages/',
    '<rootDir>/server/'
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
