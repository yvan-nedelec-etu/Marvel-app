// jest.config.cjs
module.exports = {
  testEnvironment: "jest-fixed-jsdom", // Use jsdom environment for testing React components
  
  testPathIgnorePatterns: [
    '/node_modules/',
    '/e2e-tests/',  // Exclure tous les tests Playwright
    'example.spec.cjs' // Exclure les fichiers .spec.cjs
  ],
  
  transform: {
    "^.+\\.jsx?$": "babel-jest",
  },
  
  collectCoverageFrom: [
    "src/**/*.{js,jsx}", // Collect coverage from all js or jsx files in src folder
    "!src/routes.js", // Exclude routes.js from coverage
    "!src/main.jsx", // Exclude main.jsx from coverage
    "!src/App.jsx", // Exclude App.jsx from coverage
    "!src/**/*.test.{js,jsx}", // Exclude test files
    "!src/**/*.spec.{js,jsx}", // Exclude spec files
    "!e2e-tests/**", // Exclude e2e tests
  ],
  
  moduleNameMapper: {
    "d3": "<rootDir>/node_modules/d3/dist/d3.min.js",
  },
  
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.js'],
  testResultsProcessor: 'jest-sonar-reporter',
  coverageReporters: ['text', 'lcov', 'html'],
};