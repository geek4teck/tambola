# Tambola Testing Guide

## Overview

This guide covers all aspects of testing the Tambola package, including unit tests, integration tests, performance tests, and testing best practices. The package includes a comprehensive test suite with 84+ tests covering all functionality.

## Table of Contents

- [Test Structure](#test-structure)
- [Running Tests](#running-tests)
- [Test Categories](#test-categories)
- [Coverage Requirements](#coverage-requirements)
- [Writing Tests](#writing-tests)
- [Performance Testing](#performance-testing)
- [CI/CD Testing](#cicd-testing)
- [Debugging Tests](#debugging-tests)
- [Best Practices](#best-practices)

## Test Structure

```
__tests__/
├── tambola.test.js              # Main API tests
├── helper-functions.test.js     # Helper function tests
├── performance.test.js          # Performance and stress tests
├── cli.test.js                  # CLI functionality tests
├── node-compatibility.test.js   # Node.js compatibility tests
├── test-helpers.js              # Test utilities
└── README.md                    # Test documentation
```

## Running Tests

### Basic Test Commands

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage

# Run specific test file
npm test -- __tests__/tambola.test.js

# Run tests matching a pattern
npm test -- --testNamePattern="generateTicket"
```

### Coverage Commands

```bash
# Generate coverage report
npm run test:coverage

# View coverage in browser (if available)
npm run test:coverage -- --coverageReporters=html
```

### Performance Testing

```bash
# Run only performance tests
npm test -- __tests__/performance.test.js

# Run performance tests with verbose output
npm test -- __tests__/performance.test.js --verbose
```

## Test Categories

### 1. Main API Tests (`tambola.test.js`)

Tests the core functionality of the package:

- **Ticket Generation**: Structure, validation, uniqueness
- **Draw Sequence Generation**: Completeness, randomness
- **Edge Cases**: Multiple rapid calls, stress testing
- **Game Rules**: Official Tambola rule compliance
- **Module Exports**: Public API verification

**Key Test Groups:**
```javascript
describe('generateTicket()', () => {
  // Tests ticket structure and validation
});

describe('getDrawSequence()', () => {
  // Tests sequence generation and properties
});

describe('Edge Cases and Error Handling', () => {
  // Tests robustness and error handling
});
```

### 2. Helper Function Tests (`helper-functions.test.js`)

Tests internal helper functions and validation logic:

- **Ticket Validation**: Structure, rules, edge cases
- **Sequence Validation**: Completeness, uniqueness
- **Sample Data**: Test data generation
- **Internal Logic**: Algorithm correctness

**Key Test Groups:**
```javascript
describe('validateTambolaTicket', () => {
  // Tests ticket validation logic
});

describe('validateDrawSequence', () => {
  // Tests sequence validation logic
});

describe('Internal Logic Tests', () => {
  // Tests core algorithms
});
```

### 3. Performance Tests (`performance.test.js`)

Tests performance characteristics and memory usage:

- **Ticket Generation Performance**: Speed and efficiency
- **Draw Sequence Performance**: Generation speed
- **Concurrent Operations**: Multi-threading safety
- **Memory Usage**: Memory leak detection

**Key Test Groups:**
```javascript
describe('Ticket Generation Performance', () => {
  // Tests generation speed and efficiency
});

describe('Memory Usage', () => {
  // Tests memory leak detection
});
```

### 4. CLI Tests (`cli.test.js`)

Tests command-line interface functionality:

- **Help and Version**: Command output verification
- **Ticket Generation**: CLI ticket generation
- **Sequence Generation**: CLI sequence generation
- **Error Handling**: Invalid input handling

**Key Test Groups:**
```javascript
describe('Help and Version', () => {
  // Tests help and version commands
});

describe('Ticket Generation', () => {
  // Tests CLI ticket generation
});
```

### 5. Node.js Compatibility Tests (`node-compatibility.test.js`)

Tests compatibility across Node.js versions:

- **Module Loading**: Cross-version compatibility
- **Variable Scoping**: Memory management
- **ES6+ Features**: Modern JavaScript support
- **Process Handling**: Node.js specific features

## Coverage Requirements

### Coverage Thresholds

The package maintains strict coverage requirements:

- **Statements**: 80%+
- **Branches**: 80%+
- **Functions**: 80%+
- **Lines**: 80%+

### Current Coverage Status

```
----------|---------|----------|---------|---------|-------------------
File      | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s 
----------|---------|----------|---------|---------|-------------------
All files |   85.71 |    70.58 |   85.71 |   88.46 |                   
 index.js |   85.71 |    70.58 |   85.71 |   88.46 | 28-35             
----------|---------|----------|---------|---------|-------------------
```

### Coverage Improvement

To improve branch coverage:

1. **Identify uncovered branches** in the coverage report
2. **Add specific test cases** for conditional logic
3. **Test edge cases** and boundary conditions
4. **Verify all code paths** are exercised

## Writing Tests

### Test Structure

```javascript
describe('Feature Name', () => {
  test('should do something specific', () => {
    // Arrange
    const input = 'test data';
    
    // Act
    const result = functionUnderTest(input);
    
    // Assert
    expect(result).toBe(expectedValue);
  });
});
```

### Test Naming Conventions

- Use descriptive test names that explain the expected behavior
- Follow the pattern: "should [expected behavior] when [condition]"
- Be specific about what is being tested

```javascript
// Good test names
test('should generate valid 3x9 ticket', () => {});
test('should reject invalid count', () => {});
test('should handle multiple rapid calls', () => {});

// Avoid vague names
test('works', () => {});
test('test function', () => {});
```

### Assertion Best Practices

```javascript
// Use specific assertions
expect(result).toBe(expectedValue);        // Exact equality
expect(result).toEqual(expectedObject);    // Deep equality
expect(result).toContain(expectedItem);    // Array/string contains
expect(result).toHaveLength(expectedLength); // Array/string length
expect(result).toBeDefined();              // Not undefined
expect(result).toBeTruthy();               // Truthy value
expect(result).toBeFalsy();                // Falsy value

// Test for exceptions
expect(() => {
  functionThatShouldThrow();
}).toThrow();

expect(() => {
  functionThatShouldThrow();
}).toThrow('Specific error message');
```

### Test Data Management

```javascript
// Use test helpers for common data
const { generateSampleTicket, generateSampleSequence } = require('./test-helpers');

describe('Ticket Validation', () => {
  test('should validate correct ticket', () => {
    const ticket = generateSampleTicket();
    expect(validateTicket(ticket)).toBe(true);
  });
});
```

## Performance Testing

### Performance Benchmarks

```javascript
describe('Performance Tests', () => {
  test('should generate 1000 tickets within reasonable time', () => {
    const startTime = Date.now();
    
    for (let i = 0; i < 1000; i++) {
      tambola.generateTicket();
    }
    
    const endTime = Date.now();
    const duration = endTime - startTime;
    
    expect(duration).toBeLessThan(2000); // Should complete within 2 seconds
  });
});
```

### Memory Leak Detection

```javascript
test('should not cause memory leaks during extended use', () => {
  const initialMemory = process.memoryUsage().heapUsed;
  
  // Generate many tickets
  for (let i = 0; i < 10000; i++) {
    tambola.generateTicket();
  }
  
  // Force garbage collection if available
  if (global.gc) {
    global.gc();
  }
  
  const finalMemory = process.memoryUsage().heapUsed;
  const memoryIncrease = finalMemory - initialMemory;
  
  // Memory increase should be reasonable (less than 10MB)
  expect(memoryIncrease).toBeLessThan(10 * 1024 * 1024);
});
```

### Stress Testing

```javascript
test('should handle concurrent operations', () => {
  const promises = [];
  
  // Generate 100 tickets concurrently
  for (let i = 0; i < 100; i++) {
    promises.push(Promise.resolve(tambola.generateTicket()));
  }
  
  return Promise.all(promises).then(tickets => {
    expect(tickets).toHaveLength(100);
    tickets.forEach(ticket => {
      expect(validateTicket(ticket)).toBe(true);
    });
  });
});
```

## CI/CD Testing

### GitHub Actions Integration

The package uses GitHub Actions for continuous integration:

```yaml
# .github/workflows/ci.yml
jobs:
  test:
    strategy:
      matrix:
        node-version: [16, 18, 20]
    steps:
      - name: Run tests
        run: npm test
      - name: Run coverage
        run: npm run test:coverage
```

### Pre-commit Testing

```bash
#!/bin/bash
# pre-commit.sh

echo "Running tests..."
npm test

echo "Checking coverage..."
npm run test:coverage

echo "Running linting..."
npm run lint

echo "All checks passed!"
```

## Debugging Tests

### Debugging Failed Tests

```bash
# Run specific failing test with verbose output
npm test -- --verbose --testNamePattern="should generate valid ticket"

# Run tests with Node.js debugger
node --inspect-brk node_modules/.bin/jest --runInBand

# Run tests with console output
npm test -- --verbose --no-coverage
```

### Common Debugging Techniques

```javascript
// Add console.log for debugging
test('should generate valid ticket', () => {
  const ticket = tambola.generateTicket();
  console.log('Generated ticket:', JSON.stringify(ticket, null, 2));
  expect(ticket).toBeDefined();
});

// Use debugger statement
test('should handle edge case', () => {
  debugger; // Will pause execution in debugger
  const result = tambola.generateTicket();
  expect(result).toBeDefined();
});
```

### Test Isolation

```javascript
// Use beforeEach and afterEach for setup/cleanup
describe('Ticket Generation', () => {
  beforeEach(() => {
    // Setup before each test
    console.log('Setting up test...');
  });
  
  afterEach(() => {
    // Cleanup after each test
    console.log('Cleaning up test...');
  });
  
  test('should generate ticket', () => {
    // Test implementation
  });
});
```

## Best Practices

### 1. Test Organization

- Group related tests using `describe` blocks
- Use descriptive test names
- Keep tests focused and atomic
- Avoid test interdependencies

### 2. Test Data

- Use consistent test data
- Create reusable test helpers
- Avoid hardcoded values in tests
- Use meaningful test data

### 3. Performance Considerations

- Keep tests fast and efficient
- Avoid unnecessary setup/teardown
- Use appropriate timeouts
- Monitor test execution time

### 4. Coverage Quality

- Aim for meaningful coverage, not just high percentages
- Test edge cases and error conditions
- Verify all code paths are exercised
- Focus on critical functionality

### 5. Maintenance

- Keep tests up to date with code changes
- Refactor tests when code is refactored
- Remove obsolete tests
- Document complex test scenarios

## Example Test Implementation

```javascript
/**
 * Comprehensive test example
 */
describe('Ticket Generation Edge Cases', () => {
  test('should handle rapid successive calls', () => {
    const tickets = [];
    const iterations = 100;
    
    // Generate many tickets rapidly
    for (let i = 0; i < iterations; i++) {
      tickets.push(tambola.generateTicket());
    }
    
    // Verify all tickets are valid
    tickets.forEach((ticket, index) => {
      expect(ticket).toBeDefined();
      expect(Array.isArray(ticket)).toBe(true);
      expect(ticket.length).toBe(3);
      expect(ticket[0].length).toBe(9);
      
      // Verify ticket structure
      ticket.forEach(row => {
        const numbersInRow = row.filter(cell => cell !== 0);
        expect(numbersInRow.length).toBe(5);
      });
    });
    
    // Verify tickets are mostly unique
    const ticketStrings = tickets.map(t => JSON.stringify(t));
    const uniqueTickets = [...new Set(ticketStrings)];
    expect(uniqueTickets.length).toBeGreaterThan(iterations * 0.9);
  });
  
  test('should maintain consistent performance', () => {
    const iterations = 1000;
    const times = [];
    
    for (let i = 0; i < 10; i++) {
      const startTime = Date.now();
      
      for (let j = 0; j < iterations; j++) {
        tambola.generateTicket();
      }
      
      const endTime = Date.now();
      times.push(endTime - startTime);
    }
    
    // Calculate average and variance
    const average = times.reduce((a, b) => a + b, 0) / times.length;
    const variance = times.reduce((sum, time) => sum + Math.pow(time - average, 2), 0) / times.length;
    const standardDeviation = Math.sqrt(variance);
    
    // Performance should be consistent (low variance)
    expect(standardDeviation / average).toBeLessThan(0.2);
  });
});
```

---

**Next Steps:**
- [API Reference](API_REFERENCE.md)
- [CLI Guide](CLI_GUIDE.md)
- [Game Rules](GAME_RULES.md)
- [Contributing Guidelines](CONTRIBUTING.md) 