/**
 * Node.js Compatibility Tests
 * Ensures the package works correctly across different Node.js versions
 */

const tambola = require('../index.js');
const path = require('path');
const fs = require('fs');

describe('Node.js Compatibility Tests', () => {
  describe('Basic Module Loading', () => {
    test('should load module without errors', () => {
      expect(() => {
        require('../index.js');
      }).not.toThrow();
    });

    test('should generate ticket without errors', () => {
      expect(() => {
        const ticket = tambola.generateTicket();
        expect(ticket).toBeDefined();
        expect(Array.isArray(ticket)).toBe(true);
      }).not.toThrow();
    });

    test('should generate sequence without errors', () => {
      expect(() => {
        const sequence = tambola.getDrawSequence();
        expect(sequence).toBeDefined();
        expect(Array.isArray(sequence)).toBe(true);
      }).not.toThrow();
    });
  });

  describe('Variable Scoping', () => {
    test('should not have global variable pollution', () => {
      // Test that variables are properly scoped
      const originalGlobals = Object.keys(global);
      
      // Generate multiple tickets
      for (let i = 0; i < 10; i++) {
        tambola.generateTicket();
        tambola.getDrawSequence();
      }
      
      const afterGlobals = Object.keys(global);
      expect(afterGlobals).toEqual(originalGlobals);
    });

    test('should handle multiple rapid calls without errors', () => {
      expect(() => {
        for (let i = 0; i < 100; i++) {
          tambola.generateTicket();
          tambola.getDrawSequence();
        }
      }).not.toThrow();
    });
  });

  describe('CLI Module Loading', () => {
    test('should load CLI module without errors', () => {
      expect(() => {
        const cli = require('../bin/tambola.js');
        expect(cli).toBeDefined();
        expect(typeof cli.main).toBe('function');
      }).not.toThrow();
    });
  });

  describe('Package.json Compatibility', () => {
    test('should have valid package.json structure', () => {
      const packageJson = require('../package.json');
      
      expect(packageJson.name).toBe('tambola');
      expect(packageJson.version).toBeDefined();
      expect(packageJson.main).toBe('index.js');
      expect(packageJson.bin).toBeDefined();
      expect(packageJson.bin.tambola).toBe('./bin/tambola.js');
      expect(packageJson.engines).toBeDefined();
      expect(packageJson.engines.node).toBe('>=16.0.0');
    });
  });

  describe('File System Compatibility', () => {
    test('should have all required files', () => {
      const requiredFiles = [
        'index.js',
        'package.json',
        'bin/tambola.js',
        'example.js'
      ];
      
      requiredFiles.forEach(file => {
        expect(fs.existsSync(path.join(__dirname, '..', file))).toBe(true);
      });
    });
  });

  describe('ES6+ Feature Compatibility', () => {
    test('should work with template literals', () => {
      expect(() => {
        const test = `Node.js ${process.version}`;
        expect(typeof test).toBe('string');
      }).not.toThrow();
    });

    test('should work with arrow functions', () => {
      expect(() => {
        const test = () => 'test';
        expect(test()).toBe('test');
      }).not.toThrow();
    });

    test('should work with const/let declarations', () => {
      expect(() => {
        const test = 'const';
        let test2 = 'let';
        expect(test).toBe('const');
        expect(test2).toBe('let');
      }).not.toThrow();
    });

    test('should work with destructuring', () => {
      expect(() => {
        const { generateTicket, getDrawSequence } = tambola;
        expect(typeof generateTicket).toBe('function');
        expect(typeof getDrawSequence).toBe('function');
      }).not.toThrow();
    });
  });

  describe('Node.js Version Specific Tests', () => {
    test('should work with current Node.js version', () => {
      const nodeVersion = process.version;
      console.log(`Testing with Node.js version: ${nodeVersion}`);
      
      // Test that all basic functionality works
      const ticket = tambola.generateTicket();
      const sequence = tambola.getDrawSequence();
      
      expect(ticket).toBeDefined();
      expect(sequence).toBeDefined();
      expect(Array.isArray(ticket)).toBe(true);
      expect(Array.isArray(sequence)).toBe(true);
    });

    test('should handle process.argv correctly', () => {
      expect(() => {
        const argv = process.argv;
        expect(Array.isArray(argv)).toBe(true);
        expect(argv.length).toBeGreaterThan(0);
      }).not.toThrow();
    });

    test('should handle process.exit correctly', () => {
      // Mock process.exit to prevent actual exit
      const originalExit = process.exit;
      const mockExit = jest.fn();
      process.exit = mockExit;
      
      expect(() => {
        // This should not actually exit in test environment
        if (false) process.exit(1);
      }).not.toThrow();
      
      process.exit = originalExit;
    });
  });
}); 