const tambola = require('../index.js');

describe('Tambola Package Tests', () => {
  describe('generateTicket()', () => {
    test('should generate a valid 3x9 ticket', () => {
      const ticket = tambola.generateTicket();
      
      expect(ticket).toBeDefined();
      expect(Array.isArray(ticket)).toBe(true);
      expect(ticket.length).toBe(3);
      
      ticket.forEach(row => {
        expect(Array.isArray(row)).toBe(true);
        expect(row.length).toBe(9);
      });
    });

    test('should generate tickets with correct number structure', () => {
      const ticket = tambola.generateTicket();
      
      // Check that each row has exactly 5 numbers and 4 zeros
      ticket.forEach(row => {
        const numbers = row.filter(cell => cell !== 0);
        const zeros = row.filter(cell => cell === 0);
        
        expect(numbers.length).toBe(5);
        expect(zeros.length).toBe(4);
      });
    });

    test('should generate tickets with numbers in correct ranges', () => {
      const ticket = tambola.generateTicket();
      
      // Check that numbers are in correct column ranges
      for (let col = 0; col < 9; col++) {
        const columnNumbers = [];
        for (let row = 0; row < 3; row++) {
          if (ticket[row][col] !== 0) {
            columnNumbers.push(ticket[row][col]);
          }
        }
        
        // Each column should have numbers in the correct range
        columnNumbers.forEach(num => {
          if (col === 0) {
            expect(num).toBeGreaterThanOrEqual(1);
            expect(num).toBeLessThanOrEqual(10);
          } else if (col === 8) {
            expect(num).toBeGreaterThanOrEqual(81);
            expect(num).toBeLessThanOrEqual(90);
          } else {
            expect(num).toBeGreaterThanOrEqual(col * 10 + 1);
            expect(num).toBeLessThanOrEqual(col * 10 + 10);
          }
        });
      }
    });

    test('should generate tickets with unique numbers in each column', () => {
      const ticket = tambola.generateTicket();
      
      // Check that each column has unique numbers
      for (let col = 0; col < 9; col++) {
        const columnNumbers = [];
        for (let row = 0; row < 3; row++) {
          if (ticket[row][col] !== 0) {
            columnNumbers.push(ticket[row][col]);
          }
        }
        
        // Check for uniqueness
        const uniqueNumbers = [...new Set(columnNumbers)];
        expect(uniqueNumbers.length).toBe(columnNumbers.length);
      }
    });

    test('should generate different tickets on multiple calls', () => {
      const ticket1 = tambola.generateTicket();
      const ticket2 = tambola.generateTicket();
      
      // Convert tickets to strings for comparison
      const ticket1Str = JSON.stringify(ticket1);
      const ticket2Str = JSON.stringify(ticket2);
      
      // They should be different (though there's a small chance they could be the same)
      // We'll run this test multiple times to reduce false positives
      let differentTickets = false;
      for (let i = 0; i < 10; i++) {
        const t1 = tambola.generateTicket();
        const t2 = tambola.generateTicket();
        if (JSON.stringify(t1) !== JSON.stringify(t2)) {
          differentTickets = true;
          break;
        }
      }
      expect(differentTickets).toBe(true);
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
      
      // They should be different (though there's a small chance they could be the same)
      let differentSequences = false;
      for (let i = 0; i < 10; i++) {
        const s1 = tambola.getDrawSequence();
        const s2 = tambola.getDrawSequence();
        if (JSON.stringify(s1) !== JSON.stringify(s2)) {
          differentSequences = true;
          break;
        }
      }
      expect(differentSequences).toBe(true);
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
      for (let i = 0; i < 100; i++) {
        const ticket = tambola.generateTicket();
        tickets.push(ticket);
      }
      
      // All tickets should be valid
      tickets.forEach(ticket => {
        expect(ticket.length).toBe(3);
        ticket.forEach(row => {
          expect(row.length).toBe(9);
          const numbers = row.filter(cell => cell !== 0);
          expect(numbers.length).toBe(5);
        });
      });
    });

    test('should handle multiple rapid calls to getDrawSequence', () => {
      const sequences = [];
      for (let i = 0; i < 100; i++) {
        const sequence = tambola.getDrawSequence();
        sequences.push(sequence);
      }
      
      // All sequences should be valid
      sequences.forEach(sequence => {
        expect(sequence.length).toBe(90);
        const uniqueNumbers = [...new Set(sequence)];
        expect(uniqueNumbers.length).toBe(90);
      });
    });

    test('should generate valid tickets even under stress', () => {
      // Generate many tickets rapidly to test for any edge cases
      const startTime = Date.now();
      const tickets = [];
      
      for (let i = 0; i < 1000; i++) {
        const ticket = tambola.generateTicket();
        tickets.push(ticket);
      }
      
      const endTime = Date.now();
      
      // Should complete within reasonable time (less than 10 seconds)
      expect(endTime - startTime).toBeLessThan(10000);
      
      // All tickets should be valid
      tickets.forEach(ticket => {
        expect(ticket.length).toBe(3);
        ticket.forEach(row => {
          expect(row.length).toBe(9);
          const numbers = row.filter(cell => cell !== 0);
          expect(numbers.length).toBe(5);
        });
      });
    });
  });

  describe('Tambola Game Rules Validation', () => {
    test('should follow tambola ticket structure rules', () => {
      const ticket = tambola.generateTicket();
      
      // Rule 1: Each row must have exactly 5 numbers and 4 blanks
      ticket.forEach(row => {
        const numbers = row.filter(cell => cell !== 0);
        const blanks = row.filter(cell => cell === 0);
        expect(numbers.length).toBe(5);
        expect(blanks.length).toBe(4);
      });
      
      // Rule 2: Each column must have at least one number
      for (let col = 0; col < 9; col++) {
        let hasNumber = false;
        for (let row = 0; row < 3; row++) {
          if (ticket[row][col] !== 0) {
            hasNumber = true;
            break;
          }
        }
        expect(hasNumber).toBe(true);
      }
      
      // Rule 3: Numbers must be in ascending order within each column
      for (let col = 0; col < 9; col++) {
        const columnNumbers = [];
        for (let row = 0; row < 3; row++) {
          if (ticket[row][col] !== 0) {
            columnNumbers.push(ticket[row][col]);
          }
        }
        
        // Check if numbers are in ascending order
        for (let i = 1; i < columnNumbers.length; i++) {
          expect(columnNumbers[i]).toBeGreaterThan(columnNumbers[i - 1]);
        }
      }
    });

    test('should have correct number distribution across columns', () => {
      const ticket = tambola.generateTicket();
      
      // Count numbers in each column
      const columnCounts = new Array(9).fill(0);
      
      for (let row = 0; row < 3; row++) {
        for (let col = 0; col < 9; col++) {
          if (ticket[row][col] !== 0) {
            columnCounts[col]++;
          }
        }
      }
      
      // Each column should have 1, 2, or 3 numbers
      columnCounts.forEach(count => {
        expect(count).toBeGreaterThanOrEqual(1);
        expect(count).toBeLessThanOrEqual(3);
      });
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
      expect(tambola.randomNumber).toBeUndefined();
      expect(tambola.getUniqueRandomNumber).toBeUndefined();
      expect(tambola.testFinalTicket).toBeUndefined();
      expect(tambola.sortNumbersinArray).toBeUndefined();
    });
  });
}); 