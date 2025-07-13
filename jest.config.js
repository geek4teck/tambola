module.exports = {
  // Test environment
  testEnvironment: 'node',
  
  // Test file patterns
  testMatch: [
    '**/__tests__/**/*.js',
    '**/?(*.)+(spec|test).js',
  ],
  
  // Coverage configuration
  collectCoverage: true,
  collectCoverageFrom: [
    'index.js',
    'bin/**/*.js',
    'example.js',
    '!**/node_modules/**',
    '!**/coverage/**',
    '!**/*.test.js',
    '!**/*.spec.js',
  ],
  
  // Coverage thresholds
  coverageThreshold: {
    global: {
      branches: 70,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
  
  // Coverage reporters
  coverageReporters: [
    'text',
    'text-summary',
    'lcov',
    'html',
    'json',
  ],
  
  // Coverage directory
  coverageDirectory: 'coverage',
  
  // Clear mocks between tests
  clearMocks: true,
  
  // Restore mocks between tests
  restoreMocks: true,
  
  // Setup files
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  
  // Test timeout
  testTimeout: 10000,
  
  // Verbose output
  verbose: true,
  
  // Force exit after tests
  forceExit: true,
  
  // Detect open handles
  detectOpenHandles: true,
  
  // Transform files
  transform: {},
  
  // Module file extensions
  moduleFileExtensions: ['js', 'json'],
  
  // Module name mapping
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
  },
  
  // Test path ignore patterns
  testPathIgnorePatterns: [
    '/node_modules/',
    '/coverage/',
    '/__tests__/test-helpers.js',
  ],
  
  // Watch path ignore patterns
  watchPathIgnorePatterns: [
    '/node_modules/',
    '/coverage/',
  ],
}; 