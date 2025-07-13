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

  describe('Array.prototype.count Function Coverage', () => {
    test('should handle count without parameter (undefined)', () => {
      const arr = [1, 2, 3, 4, 5];
      const count = arr.count();
      expect(count).toBe(5); // Should return array length when no parameter
    });

    test('should handle count with undefined parameter explicitly', () => {
      const arr = [1, 2, 3, 4, 5];
      const count = arr.count(undefined);
      expect(count).toBe(5); // Should return array length when parameter is undefined
    });

    test('should count occurrences of a specific value', () => {
      const arr = [1, 2, 2, 3, 2, 4, 5];
      const count = arr.count(2);
      expect(count).toBe(3); // Should count 3 occurrences of 2
    });

    test('should return 0 for value not in array', () => {
      const arr = [1, 2, 3, 4, 5];
      const count = arr.count(10);
      expect(count).toBe(0); // Should return 0 for value not present
    });

    test('should handle empty array', () => {
      const arr = [];
      const count = arr.count(1);
      expect(count).toBe(0); // Should return 0 for empty array
    });

    test('should handle array with only target value', () => {
      const arr = [5, 5, 5];
      const count = arr.count(5);
      expect(count).toBe(3); // Should count all occurrences
    });
  });
}); 