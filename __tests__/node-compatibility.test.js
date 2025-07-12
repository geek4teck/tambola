const tambola = require('../index.js');

describe('Node.js Compatibility Tests', () => {
  describe('Basic Module Loading', () => {
    test('should load module without errors', () => {
      expect(tambola).toBeDefined();
      expect(typeof tambola.generateTicket).toBe('function');
      expect(typeof tambola.getDrawSequence).toBe('function');
    });

    test('should generate ticket without errors', () => {
      const ticket = tambola.generateTicket();
      expect(Array.isArray(ticket)).toBe(true);
      expect(ticket.length).toBe(3);
      expect(ticket[0].length).toBe(9);
    });

    test('should generate sequence without errors', () => {
      const sequence = tambola.getDrawSequence();
      expect(Array.isArray(sequence)).toBe(true);
      expect(sequence.length).toBe(90);
    });
  });

  describe('Variable Scoping', () => {
    test('should not have global variable pollution', () => {
      // This test ensures that the fixes for variable scoping work
      const ticket1 = tambola.generateTicket();
      const ticket2 = tambola.generateTicket();
      
      // Both tickets should be valid and different
      expect(ticket1).not.toEqual(ticket2);
      expect(Array.isArray(ticket1)).toBe(true);
      expect(Array.isArray(ticket2)).toBe(true);
    });

    test('should handle multiple rapid calls without errors', () => {
      const tickets = [];
      for (let i = 0; i < 10; i++) {
        tickets.push(tambola.generateTicket());
      }
      
      // All tickets should be valid
      tickets.forEach(ticket => {
        expect(Array.isArray(ticket)).toBe(true);
        expect(ticket.length).toBe(3);
        expect(ticket[0].length).toBe(9);
      });
    });
  });

  describe('CLI Module Loading', () => {
    test('should load CLI module without errors', () => {
      const cli = require('../bin/tambola.js');
      expect(cli).toBeDefined();
      expect(typeof cli.main).toBe('function');
    });
  });

  describe('Package.json Compatibility', () => {
    test('should have valid package.json structure', () => {
      const pkg = require('../package.json');
      
      expect(pkg.name).toBe('tambola');
      expect(pkg.version).toBeDefined();
      expect(pkg.main).toBe('index.js');
      expect(pkg.bin).toBeDefined();
      expect(pkg.bin.tambola).toBe('./bin/tambola.js');
      expect(pkg.engines).toBeDefined();
      expect(pkg.engines.node).toBe('>=16.0.0');
    });
  });
}); 