# Tambola Package Tests

This directory contains comprehensive unit tests for the Tambola/Housie ticket generator package.

## Test Structure

### `tambola.test.js`
Main test suite covering:
- **generateTicket()** function tests
- **getDrawSequence()** function tests
- Edge cases and error handling
- Tambola game rules validation
- Module exports verification

### `helper-functions.test.js`
Tests for helper functions and internal logic:
- Ticket validation functions
- Draw sequence validation functions
- Sample data generation
- Internal algorithm testing

### `performance.test.js`
Performance and stress tests:
- High-volume ticket generation
- High-volume draw sequence generation
- Concurrent operations
- Memory usage monitoring
- Performance consistency

### `cli.test.js`
Command Line Interface tests:
- Help and version commands
- Ticket generation in various formats
- Sequence generation in various formats
- Error handling and validation
- CLI argument parsing

### `node-compatibility.test.js`
Node.js compatibility tests:
- Basic module loading
- Variable scoping validation
- CLI module loading
- Package.json structure validation
- Node.js 16.x+ compatibility

### `test-helpers.js`
Utility functions for testing:
- `validateTambolaTicket()` - Validates tambola ticket structure and rules
- `validateDrawSequence()` - Validates draw sequence integrity
- `generateSampleTicket()` - Creates sample valid tickets for testing
- `generateSampleDrawSequence()` - Creates sample valid draw sequences

## Running Tests

### Install Dependencies
```bash
npm install
```

### Run All Tests
```bash
npm test
```

### Run Tests in Watch Mode
```bash
npm run test:watch
```

### Run Tests with Coverage
```bash
npm run test:coverage
```

### Run Specific Test Files
```bash
# Run only main tests
npx jest tambola.test.js

# Run only performance tests
npx jest performance.test.js

# Run only helper function tests
npx jest helper-functions.test.js
```

### Run Tests with Verbose Output
```bash
npx jest --verbose
```

## Test Coverage

The tests aim to achieve at least 80% coverage across:
- **Branches**: 80%
- **Functions**: 80%
- **Lines**: 80%
- **Statements**: 80%

## What the Tests Cover

### Ticket Generation Tests
- ✅ Valid 3x9 ticket structure
- ✅ Correct number distribution (5 numbers, 4 zeros per row)
- ✅ Numbers in correct column ranges (1-10, 11-20, etc.)
- ✅ Unique numbers within each column
- ✅ Ascending order within columns
- ✅ Each column has at least one number
- ✅ No numbers outside valid range (1-90)
- ✅ Different tickets on multiple calls

### Draw Sequence Tests
- ✅ Array of exactly 90 numbers
- ✅ Numbers in range 1-90
- ✅ All numbers are unique
- ✅ All numbers 1-90 are present
- ✅ Different sequences on multiple calls

### Edge Cases & Error Handling
- ✅ Multiple rapid function calls
- ✅ Stress testing with 1000+ tickets
- ✅ Concurrent operations
- ✅ Memory usage monitoring

### Performance Tests
- ✅ 1000 tickets generated within 5 seconds
- ✅ 10000 tickets generated within 30 seconds
- ✅ 1000 draw sequences within 3 seconds
- ✅ 10000 draw sequences within 20 seconds
- ✅ Consistent performance across runs
- ✅ No memory leaks during extended use

### Tambola Game Rules Validation
- ✅ Standard tambola ticket structure
- ✅ Column number distribution (1-3 numbers per column)
- ✅ Row number distribution (5 numbers per row)
- ✅ Number range constraints per column
- ✅ Ascending order within columns

## Test Environment

- **Test Framework**: Jest
- **Node.js Version**: Compatible with Node.js 12+
- **Test Timeout**: 15 seconds (configurable in jest.config.js)
- **Coverage Reporters**: text, lcov, html

## Continuous Integration

The tests are designed to run in CI/CD environments and include:
- Fast execution times
- Deterministic results
- Comprehensive coverage
- Performance benchmarks
- Memory usage validation

## Adding New Tests

When adding new tests:

1. Follow the existing test structure and naming conventions
2. Use descriptive test names that explain what is being tested
3. Include both positive and negative test cases
4. Add performance tests for new functionality
5. Update this README if adding new test categories

## Troubleshooting

### Tests Failing Due to Randomness
Some tests check for randomness and may occasionally fail due to statistical probability. These tests are designed with tolerance for rare edge cases.

### Performance Test Failures
Performance tests may fail on slower machines. Adjust the time thresholds in `performance.test.js` if needed for your environment.

### Memory Test Failures
Memory tests require garbage collection to be available. Run Node.js with `--expose-gc` flag for accurate memory testing:
```bash
node --expose-gc node_modules/.bin/jest
``` 