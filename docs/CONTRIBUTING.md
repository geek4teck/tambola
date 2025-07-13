# Contributing to Tambola

## Overview

Thank you for your interest in contributing to the Tambola package! This document provides guidelines and information for contributors who want to help improve the project.

## Table of Contents

- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [Code Style](#code-style)
- [Testing Guidelines](#testing-guidelines)
- [Pull Request Process](#pull-request-process)
- [Issue Guidelines](#issue-guidelines)
- [Release Process](#release-process)
- [Code of Conduct](#code-of-conduct)

## Getting Started

### Prerequisites

- **Node.js**: Version 16.0.0 or higher
- **npm**: Version 7.0.0 or higher
- **Git**: Latest version recommended

### Quick Start

1. **Fork the repository**
   ```bash
   # Fork on GitHub, then clone your fork
   git clone https://github.com/your-username/tambola.git
   cd tambola
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run tests**
   ```bash
   npm test
   ```

4. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

## Development Setup

### Local Development Environment

```bash
# Clone the repository
git clone https://github.com/geek4teck/tambola.git
cd tambola

# Install dependencies
npm install

# Run tests to ensure everything works
npm test

# Run tests in watch mode for development
npm run test:watch

# Run example script
npm run example

# Test CLI functionality
npm run cli -- --help
```

### Development Scripts

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage

# Run example script
npm run example

# Run CLI
npm run cli -- [options]

# Build package
npm pack
```

### IDE Setup

Recommended VS Code extensions:
- **ESLint**: Code linting
- **Prettier**: Code formatting
- **Jest**: Test runner integration
- **GitLens**: Git integration

## Code Style

### JavaScript Style Guide

We follow standard JavaScript conventions:

- **Indentation**: 2 spaces
- **Semicolons**: Required
- **Quotes**: Single quotes for strings
- **Line length**: 80 characters maximum
- **Variable declarations**: Use `const` and `let`, avoid `var`

### Code Formatting

```javascript
// Good
const tambola = require('tambola');
const ticket = tambola.generateTicket();

function validateTicket(ticket) {
  if (!Array.isArray(ticket)) {
    return false;
  }
  return ticket.length === 3;
}

// Avoid
var tambola = require("tambola");
var ticket = tambola.generateTicket();

function validateTicket(ticket){
if(!Array.isArray(ticket)){return false;}
return ticket.length===3;}
```

### File Organization

```
tambola/
├── index.js              # Main module
├── bin/
│   └── tambola.js        # CLI executable
├── example.js            # Example usage
├── package.json          # Package metadata
├── README.md             # Main documentation
├── TAMBOLA_RULES.md      # Game rules
├── docs/                 # Documentation
│   ├── API_REFERENCE.md
│   ├── CLI_GUIDE.md
│   ├── TESTING_GUIDE.md
│   └── CONTRIBUTING.md
├── __tests__/            # Test files
│   ├── tambola.test.js
│   ├── helper-functions.test.js
│   ├── performance.test.js
│   ├── cli.test.js
│   └── node-compatibility.test.js
└── .github/              # GitHub configuration
    └── workflows/
        ├── build.yml
        └── ci.yml
```

## Testing Guidelines

### Test Requirements

- **Coverage**: Maintain 80%+ coverage for statements, branches, functions, and lines
- **Test Types**: Unit tests, integration tests, performance tests
- **Test Organization**: Group related tests using `describe` blocks
- **Test Names**: Use descriptive names that explain expected behavior

### Writing Tests

```javascript
// Good test structure
describe('generateTicket()', () => {
  test('should generate valid 3x9 ticket', () => {
    // Arrange
    const expectedRows = 3;
    const expectedCols = 9;
    
    // Act
    const ticket = tambola.generateTicket();
    
    // Assert
    expect(ticket).toBeDefined();
    expect(Array.isArray(ticket)).toBe(true);
    expect(ticket.length).toBe(expectedRows);
    expect(ticket[0].length).toBe(expectedCols);
  });
  
  test('should generate different tickets on multiple calls', () => {
    const ticket1 = tambola.generateTicket();
    const ticket2 = tambola.generateTicket();
    
    expect(ticket1).not.toEqual(ticket2);
  });
});
```

### Running Tests

```bash
# Run all tests
npm test

# Run specific test file
npm test -- __tests__/tambola.test.js

# Run tests matching pattern
npm test -- --testNamePattern="generateTicket"

# Run tests with coverage
npm run test:coverage

# Run tests in watch mode
npm run test:watch
```

### Test Categories

1. **Unit Tests**: Test individual functions and components
2. **Integration Tests**: Test how components work together
3. **Performance Tests**: Test performance characteristics
4. **CLI Tests**: Test command-line interface
5. **Compatibility Tests**: Test Node.js version compatibility

## Pull Request Process

### Before Submitting a PR

1. **Ensure tests pass**
   ```bash
   npm test
   npm run test:coverage
   ```

2. **Check code style**
   ```bash
   # If ESLint is configured
   npm run lint
   ```

3. **Update documentation**
   - Update relevant documentation files
   - Add JSDoc comments for new functions
   - Update examples if needed

4. **Test CLI functionality**
   ```bash
   npm run cli -- --help
   npm run cli -- ticket
   npm run cli -- sequence
   ```

### PR Guidelines

1. **Title**: Use conventional commit format
   ```
   feat: add new ticket validation function
   fix: resolve memory leak in sequence generation
   docs: update API documentation
   ```

2. **Description**: Provide clear description of changes
   - What was changed
   - Why it was changed
   - How it was tested
   - Any breaking changes

3. **Scope**: Keep PRs focused and manageable
   - One feature or fix per PR
   - Maximum 500 lines of code
   - Include tests for new functionality

### PR Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Documentation update
- [ ] Performance improvement
- [ ] Refactoring

## Testing
- [ ] All tests pass
- [ ] Coverage maintained at 80%+
- [ ] CLI functionality tested
- [ ] Example script tested

## Checklist
- [ ] Code follows style guidelines
- [ ] Documentation updated
- [ ] Tests added for new functionality
- [ ] No breaking changes (or documented if necessary)
```

## Issue Guidelines

### Creating Issues

1. **Bug Reports**
   - Provide clear description of the problem
   - Include steps to reproduce
   - Specify Node.js version and environment
   - Include error messages and stack traces

2. **Feature Requests**
   - Describe the desired functionality
   - Explain use cases and benefits
   - Consider implementation complexity
   - Check if similar features exist

3. **Documentation Issues**
   - Specify which documentation needs updating
   - Provide suggestions for improvements
   - Include examples if applicable

### Issue Templates

#### Bug Report Template
```markdown
## Bug Description
Clear description of the bug

## Steps to Reproduce
1. Step 1
2. Step 2
3. Step 3

## Expected Behavior
What should happen

## Actual Behavior
What actually happens

## Environment
- Node.js version:
- npm version:
- Operating system:
- Package version:

## Additional Information
Error messages, logs, etc.
```

#### Feature Request Template
```markdown
## Feature Description
Clear description of the requested feature

## Use Cases
How this feature would be used

## Benefits
Why this feature is valuable

## Implementation Ideas
Optional suggestions for implementation

## Alternatives Considered
Other approaches that were considered
```

## Release Process

### Version Management

We follow [Semantic Versioning](https://semver.org/):
- **Major**: Breaking changes
- **Minor**: New features (backward compatible)
- **Patch**: Bug fixes (backward compatible)

### Release Checklist

1. **Update version**
   ```bash
   npm version patch  # or minor/major
   ```

2. **Update documentation**
   - Update README.md if needed
   - Update API documentation
   - Update changelog

3. **Run full test suite**
   ```bash
   npm test
   npm run test:coverage
   ```

4. **Test CLI functionality**
   ```bash
   npm run cli -- --version
   npm run cli -- ticket
   npm run cli -- sequence
   ```

5. **Build and test package**
   ```bash
   npm pack
   npm install ./tambola-*.tgz
   ```

6. **Publish to npm**
   ```bash
   npm publish
   ```

### Automated Releases

The project uses GitHub Actions for automated releases:
- Tests run on multiple Node.js versions
- Coverage reports are generated
- Security audits are performed
- Releases are automated on tag creation

## Code of Conduct

### Our Standards

- **Respectful**: Treat all contributors with respect
- **Inclusive**: Welcome contributors from all backgrounds
- **Constructive**: Provide constructive feedback
- **Professional**: Maintain professional communication

### Unacceptable Behavior

- Harassment or discrimination
- Trolling or insulting comments
- Publishing private information
- Any conduct inappropriate in a professional setting

### Enforcement

- Violations will be addressed by project maintainers
- Temporary or permanent bans may be issued
- Serious violations will be reported to appropriate authorities

## Getting Help

### Communication Channels

- **GitHub Issues**: For bugs and feature requests
- **GitHub Discussions**: For questions and general discussion
- **Pull Requests**: For code contributions

### Resources

- [API Reference](API_REFERENCE.md)
- [CLI Guide](CLI_GUIDE.md)
- [Testing Guide](TESTING_GUIDE.md)
- [Game Rules](GAME_RULES.md)

### Mentorship

New contributors are welcome! We provide:
- Code review with constructive feedback
- Documentation for getting started
- Examples and templates
- Mentorship for complex contributions

## Recognition

### Contributors

All contributors are recognized in:
- GitHub contributors list
- Package documentation
- Release notes
- Project acknowledgments

### Contribution Types

We value all types of contributions:
- **Code**: Bug fixes, new features, improvements
- **Documentation**: Guides, examples, API docs
- **Testing**: Test cases, coverage improvements
- **Design**: UI/UX improvements, accessibility
- **Community**: Support, mentoring, evangelism

---

**Thank you for contributing to Tambola!**

Your contributions help make this package better for everyone in the community. 