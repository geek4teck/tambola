# Tambola Documentation

Welcome to the comprehensive documentation for the Tambola package! This documentation covers everything you need to know about using, developing, and contributing to the Tambola/Housie ticket generator.

## 📚 Documentation Index

### 🚀 Getting Started
- **[Main README](../README.md)** - Quick start guide and overview
- **[API Reference](API_REFERENCE.md)** - Complete API documentation and examples
- **[CLI Guide](CLI_GUIDE.md)** - Command-line interface usage

### 🎯 Game Information
- **[Game Rules](GAME_RULES.md)** - Official Tambola/Housie game rules and guidelines

### 🛠️ Development
- **[Testing Guide](TESTING_GUIDE.md)** - Comprehensive testing documentation
- **[Contributing Guidelines](CONTRIBUTING.md)** - How to contribute to the project

## 📖 Quick Navigation

### For Users
1. **New to Tambola?** Start with the [Main README](../README.md)
2. **Want to use the API?** Check the [API Reference](API_REFERENCE.md)
3. **Prefer command line?** See the [CLI Guide](CLI_GUIDE.md)
4. **Need game rules?** Read the [Game Rules](GAME_RULES.md)

### For Developers
1. **Setting up development?** See [Contributing Guidelines](CONTRIBUTING.md)
2. **Writing tests?** Check the [Testing Guide](TESTING_GUIDE.md)
3. **Understanding the API?** Review the [API Reference](API_REFERENCE.md)

### For Contributors
1. **Want to contribute?** Start with [Contributing Guidelines](CONTRIBUTING.md)
2. **Testing your changes?** Follow the [Testing Guide](TESTING_GUIDE.md)
3. **Understanding the codebase?** Review the [API Reference](API_REFERENCE.md)

## 🎯 Package Overview

The Tambola package is a robust, well-tested Node.js module for generating standard Tambola/Housie tickets and draw sequences. It follows all official game rules and provides both programmatic and command-line interfaces.

### Key Features
- ✅ **Official Compliance**: Follows all Tambola/Housie game rules
- ✅ **High Performance**: Generates 1000+ tickets per second
- ✅ **Zero Dependencies**: Lightweight and fast
- ✅ **Comprehensive Testing**: 84+ tests with 80%+ coverage
- ✅ **CLI Support**: Command-line interface for quick generation
- ✅ **Multiple Formats**: JSON, CSV, and table output formats
- ✅ **Cross-Platform**: Works on all Node.js platforms

### Quick Example

```javascript
const tambola = require('tambola');

// Generate a ticket
const ticket = tambola.generateTicket();
console.log(ticket);

// Generate a draw sequence
const sequence = tambola.getDrawSequence();
console.log(sequence);
```

## 📋 Documentation Structure

```
docs/
├── README.md              # This file - Documentation index
├── API_REFERENCE.md       # Complete API documentation
├── CLI_GUIDE.md          # Command-line interface guide
├── GAME_RULES.md         # Official game rules
├── TESTING_GUIDE.md      # Testing documentation
└── CONTRIBUTING.md       # Contributing guidelines
```

## 🔗 External Resources

- **[NPM Package](https://www.npmjs.com/package/tambola)** - Install from npm
- **[GitHub Repository](https://github.com/geek4teck/tambola)** - Source code and issues
- **[GitHub Actions](https://github.com/geek4teck/tambola/actions)** - CI/CD status

## 📞 Getting Help

### Documentation Issues
If you find issues with the documentation:
- [Create an issue](https://github.com/geek4teck/tambola/issues) with the `documentation` label
- Suggest improvements in the issue description

### Code Issues
For bugs or feature requests:
- [Create an issue](https://github.com/geek4teck/tambola/issues) with appropriate labels
- Include Node.js version, error messages, and reproduction steps

### Questions
For general questions:
- Check the [API Reference](API_REFERENCE.md) for usage examples
- Review the [Game Rules](GAME_RULES.md) for game-specific questions
- [Create a discussion](https://github.com/geek4teck/tambola/discussions) for community help

## 🎉 Contributing to Documentation

We welcome contributions to improve the documentation! See the [Contributing Guidelines](CONTRIBUTING.md) for details on:

- Documentation standards
- Writing style guidelines
- Review process
- Recognition for contributors

## 📄 License

This documentation is part of the Tambola package and is licensed under the [ISC License](../LICENSE).

---

**Happy coding with Tambola! 🎯** 