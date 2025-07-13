/**
 * Tambola Package Tests
 * Tests the main functionality of the tambola package
 */

const tambola = require('../index.js');

describe('Tambola Package Tests', () => {
  describe('generateTicket()', () => {
    test('should generate a valid 3x9 ticket', () => {
      const ticket = tambola.generateTicket();
      expect(ticket).toBeDefined();
      expect(Array.isArray(ticket)).toBe(true);
      expect(ticket.length).toBe(3);
      expect(ticket[0].length).toBe(9);
      expect(ticket[1].length).toBe(9);
      expect(ticket[2].length).toBe(9);
    });

    test('should generate tickets with correct number structure', () => {
      const ticket = tambola.generateTicket();
      
      // Check each row has exactly 5 numbers
      ticket.forEach(row => {
        const numbersInRow = row.filter(cell => cell !== 0).length;
        expect(numbersInRow).toBe(5);
      });
    });

    test('should generate tickets with numbers in correct ranges', () => {
      const ticket = tambola.generateTicket();
      
      for (let col = 0; col < 9; col++) {
        const numbersInCol = ticket.map(row => row[col]).filter(num => num !== 0);
        numbersInCol.forEach(num => {
          const expectedMin = col * 10 + 1;
          const expectedMax = col === 8 ? 90 : (col + 1) * 10;
          expect(num).toBeGreaterThanOrEqual(expectedMin);
          expect(num).toBeLessThanOrEqual(expectedMax);
        });
      }
    });

    test('should generate tickets with unique numbers in each column', () => {
      const ticket = tambola.generateTicket();
      
      for (let col = 0; col < 9; col++) {
        const numbersInCol = ticket.map(row => row[col]).filter(num => num !== 0);
        const uniqueNumbers = [...new Set(numbersInCol)];
        expect(uniqueNumbers.length).toBe(numbersInCol.length);
      }
    });

    test('should generate different tickets on multiple calls', () => {
      const ticket1 = tambola.generateTicket();
      const ticket2 = tambola.generateTicket();
      expect(ticket1).not.toEqual(ticket2);
    });

    test('should not have any numbers outside valid range (1-90)', () => {
      const ticket = tambola.generateTicket();
      
      ticket.forEach(row => {
        row.forEach(cell => {
          if (cell !== 0) {
            expect(cell).toBeGreaterThanOrEqual(1);
            expect(cell).toBeLessThanOrEqual(90);
          }
        });
      });
    });
  });

  describe('getDrawSequence()', () => {
    test('should generate an array of 90 numbers', () => {
      const sequence = tambola.getDrawSequence();
      expect(Array.isArray(sequence)).toBe(true);
      expect(sequence.length).toBe(90);
    });

    test('should generate numbers from 1 to 90', () => {
      const sequence = tambola.getDrawSequence();
      sequence.forEach(num => {
        expect(num).toBeGreaterThanOrEqual(1);
        expect(num).toBeLessThanOrEqual(90);
      });
    });

    test('should generate unique numbers only', () => {
      const sequence = tambola.getDrawSequence();
      const uniqueNumbers = [...new Set(sequence)];
      expect(uniqueNumbers.length).toBe(90);
    });

    test('should generate different sequences on multiple calls', () => {
      const sequence1 = tambola.getDrawSequence();
      const sequence2 = tambola.getDrawSequence();
      expect(sequence1).not.toEqual(sequence2);
    });

    test('should contain all numbers from 1 to 90', () => {
      const sequence = tambola.getDrawSequence();
      for (let i = 1; i <= 90; i++) {
        expect(sequence).toContain(i);
      }
    });
  });

  describe('Edge Cases and Error Handling', () => {
    test('should handle multiple rapid calls to generateTicket', () => {
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

    test('should handle multiple rapid calls to getDrawSequence', () => {
      const sequences = [];
      for (let i = 0; i < 10; i++) {
        sequences.push(tambola.getDrawSequence());
      }
      
      // All sequences should be valid
      sequences.forEach(sequence => {
        expect(Array.isArray(sequence)).toBe(true);
        expect(sequence.length).toBe(90);
      });
    });

    test('should generate valid tickets even under stress', () => {
      const tickets = [];
      for (let i = 0; i < 100; i++) {
        tickets.push(tambola.generateTicket());
      }
      
      // All tickets should be valid and different
      const ticketStrings = tickets.map(t => JSON.stringify(t));
      const uniqueTickets = [...new Set(ticketStrings)];
      expect(uniqueTickets.length).toBeGreaterThan(90); // Most should be unique
    });
  });

  describe('Tambola Game Rules Validation', () => {
    test('should follow tambola ticket structure rules', () => {
      const ticket = tambola.generateTicket();
      
      // Check each row has exactly 5 numbers
      ticket.forEach(row => {
        const numbersInRow = row.filter(cell => cell !== 0).length;
        expect(numbersInRow).toBe(5);
      });
      
      // Check each column has at least 1 number
      for (let col = 0; col < 9; col++) {
        const numbersInCol = ticket.map(row => row[col]).filter(num => num !== 0);
        expect(numbersInCol.length).toBeGreaterThan(0);
      }
    });

    test('should have correct number distribution across columns', () => {
      const ticket = tambola.generateTicket();
      
      for (let col = 0; col < 9; col++) {
        const numbersInCol = ticket.map(row => row[col]).filter(num => num !== 0);
        
        // Numbers should be in ascending order
        for (let i = 1; i < numbersInCol.length; i++) {
          expect(numbersInCol[i]).toBeGreaterThan(numbersInCol[i - 1]);
        }
      }
    });
  });

  describe('Module Exports', () => {
    test('should export generateTicket function', () => {
      expect(typeof tambola.generateTicket).toBe('function');
    });

    test('should export getDrawSequence function', () => {
      expect(typeof tambola.getDrawSequence).toBe('function');
    });

    test('should not export internal helper functions', () => {
      expect(tambola.testFinalTicket).toBeUndefined();
      expect(tambola.getUniqueRandomNumber).toBeUndefined();
      expect(tambola.randomNumber).toBeUndefined();
    });
  });

  describe('Code Quality and Performance', () => {
    test('should generate tickets efficiently', () => {
      const startTime = Date.now();
      const tickets = [];
      
      for (let i = 0; i < 50; i += 1) {
        tickets.push(tambola.generateTicket());
      }
      
      const endTime = Date.now();
      const duration = endTime - startTime;
      
      // Should generate 50 tickets in under 1 second
      expect(duration).toBeLessThan(1000);
      expect(tickets.length).toBe(50);
      
      // All tickets should be valid
      tickets.forEach(ticket => {
        expect(Array.isArray(ticket)).toBe(true);
        expect(ticket.length).toBe(3);
        expect(ticket[0].length).toBe(9);
      });
    });

    test('should generate sequences efficiently', () => {
      const startTime = Date.now();
      const sequences = [];
      
      for (let i = 0; i < 20; i += 1) {
        sequences.push(tambola.getDrawSequence());
      }
      
      const endTime = Date.now();
      const duration = endTime - startTime;
      
      // Should generate 20 sequences in under 1 second
      expect(duration).toBeLessThan(1000);
      expect(sequences.length).toBe(20);
      
      // All sequences should be valid
      sequences.forEach(sequence => {
        expect(Array.isArray(sequence)).toBe(true);
        expect(sequence.length).toBe(90);
      });
    });

    test('should maintain consistent API', () => {
      // Test that the API remains stable
      expect(typeof tambola.generateTicket).toBe('function');
      expect(typeof tambola.getDrawSequence).toBe('function');
      
      // Test function signatures
      expect(tambola.generateTicket.length).toBe(0); // No parameters
      expect(tambola.getDrawSequence.length).toBe(0); // No parameters
    });
  });
}); 