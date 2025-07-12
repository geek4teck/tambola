const tambola = require('../index.js');
const { validateTambolaTicket, validateDrawSequence, generateSampleTicket, generateSampleDrawSequence } = require('./test-helpers');

describe('Helper Functions Tests', () => {
  describe('validateTambolaTicket', () => {
    test('should validate a correct tambola ticket', () => {
      const validTicket = generateSampleTicket();
      const result = validateTambolaTicket(validTicket);
      
      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    test('should reject ticket with wrong dimensions', () => {
      const invalidTicket = [[1, 2, 3], [4, 5, 6]];
      const result = validateTambolaTicket(invalidTicket);
      
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Ticket must be a 3x9 array');
    });

    test('should reject ticket with wrong row length', () => {
      const invalidTicket = [
        [1, 0, 21, 31, 0, 0, 64, 71, 85],
        [0, 11, 0, 0, 0, 58, 70, 74],
        [0, 0, 28, 40, 43, 59, 0, 0, 87]
      ];
      const result = validateTambolaTicket(invalidTicket);
      
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Row 1 must have exactly 9 elements');
    });

    test('should reject ticket with wrong number of numbers in row', () => {
      const invalidTicket = [
        [1, 2, 21, 31, 5, 6, 64, 71, 85], // 9 numbers instead of 5
        [0, 11, 0, 0, 0, 58, 70, 74, 0],
        [0, 0, 28, 40, 43, 59, 0, 0, 87]
      ];
      const result = validateTambolaTicket(invalidTicket);
      
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Row 0 must have exactly 5 numbers, found 9');
    });

    test('should reject ticket with numbers outside column range', () => {
      const invalidTicket = [
        [1, 0, 21, 31, 0, 0, 64, 71, 85],
        [0, 11, 0, 0, 0, 58, 70, 74, 0],
        [0, 0, 28, 40, 43, 59, 0, 0, 87]
      ];
      // Modify a number to be outside its column range
      invalidTicket[0][0] = 15; // Should be 1-10 for column 0
      
      const result = validateTambolaTicket(invalidTicket);
      
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Number 15 in column 0 is outside valid range [1-10]');
    });

    test('should reject ticket with duplicate numbers in column', () => {
      const invalidTicket = [
        [1, 0, 21, 31, 0, 0, 64, 71, 85],
        [0, 11, 0, 0, 0, 58, 70, 74, 0],
        [1, 0, 28, 40, 43, 59, 0, 0, 87] // Duplicate 1 in column 0
      ];
      
      const result = validateTambolaTicket(invalidTicket);
      
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Column 0 has duplicate numbers');
    });

    test('should reject ticket with numbers not in ascending order in column', () => {
      const invalidTicket = [
        [5, 0, 21, 31, 0, 0, 64, 71, 85],
        [0, 11, 0, 0, 0, 58, 70, 74, 0],
        [1, 0, 28, 40, 43, 59, 0, 0, 87] // 1 comes after 5 in column 0
      ];
      
      const result = validateTambolaTicket(invalidTicket);
      
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Numbers in column 0 must be in ascending order');
    });
  });

  describe('validateDrawSequence', () => {
    test('should validate a correct draw sequence', () => {
      const validSequence = generateSampleDrawSequence();
      const result = validateDrawSequence(validSequence);
      
      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    test('should reject sequence with wrong length', () => {
      const invalidSequence = [1, 2, 3, 4, 5];
      const result = validateDrawSequence(invalidSequence);
      
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Draw sequence must be an array of exactly 90 numbers');
    });

    test('should reject sequence with numbers outside range', () => {
      const invalidSequence = Array.from({ length: 90 }, (_, i) => i + 1);
      invalidSequence[0] = 0; // Invalid number
      
      const result = validateDrawSequence(invalidSequence);
      
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Number at index 0 (0) is not in valid range [1-90]');
    });

    test('should reject sequence with duplicate numbers', () => {
      const invalidSequence = Array.from({ length: 90 }, (_, i) => i + 1);
      invalidSequence[0] = 2; // Duplicate of number 2
      
      const result = validateDrawSequence(invalidSequence);
      
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Draw sequence must contain exactly 90 unique numbers');
    });

    test('should reject sequence missing numbers', () => {
      const invalidSequence = Array.from({ length: 90 }, (_, i) => i + 2); // Missing 1
      
      const result = validateDrawSequence(invalidSequence);
      
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Number 1 is missing from draw sequence');
    });
  });

  describe('Sample Data Generation', () => {
    test('should generate valid sample ticket', () => {
      const sampleTicket = generateSampleTicket();
      const result = validateTambolaTicket(sampleTicket);
      
      expect(result.isValid).toBe(true);
    });

    test('should generate valid sample draw sequence', () => {
      const sampleSequence = generateSampleDrawSequence();
      const result = validateDrawSequence(sampleSequence);
      
      expect(result.isValid).toBe(true);
    });
  });
});

describe('Internal Logic Tests', () => {
  describe('Ticket Generation Algorithm', () => {
    test('should generate tickets with consistent structure across multiple runs', () => {
      const tickets = [];
      for (let i = 0; i < 50; i++) {
        const ticket = tambola.generateTicket();
        tickets.push(ticket);
      }
      
      // All tickets should have the same structure
      tickets.forEach(ticket => {
        expect(ticket).toHaveLength(3);
        ticket.forEach(row => {
          expect(row).toHaveLength(9);
          const numbers = row.filter(cell => cell !== 0);
          expect(numbers).toHaveLength(5);
        });
      });
    });

    test('should ensure each column has at least one number', () => {
      const tickets = [];
      for (let i = 0; i < 100; i++) {
        const ticket = tambola.generateTicket();
        tickets.push(ticket);
      }
      
      tickets.forEach(ticket => {
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
      });
    });

    test('should maintain number range constraints', () => {
      const tickets = [];
      for (let i = 0; i < 100; i++) {
        const ticket = tambola.generateTicket();
        tickets.push(ticket);
      }
      
      tickets.forEach(ticket => {
        for (let col = 0; col < 9; col++) {
          for (let row = 0; row < 3; row++) {
            const num = ticket[row][col];
            if (num !== 0) {
              const expectedMin = col === 0 ? 1 : col * 10 + 1;
              const expectedMax = col === 8 ? 90 : col * 10 + 10;
              expect(num).toBeGreaterThanOrEqual(expectedMin);
              expect(num).toBeLessThanOrEqual(expectedMax);
            }
          }
        }
      });
    });
  });

  describe('Draw Sequence Algorithm', () => {
    test('should generate truly random sequences', () => {
      const sequences = [];
      for (let i = 0; i < 100; i++) {
        const sequence = tambola.getDrawSequence();
        sequences.push(sequence);
      }
      
      // Check that sequences are different (with some tolerance for rare duplicates)
      let uniqueSequences = new Set();
      sequences.forEach(seq => {
        uniqueSequences.add(JSON.stringify(seq));
      });
      
      // Should have at least 95% unique sequences
      expect(uniqueSequences.size).toBeGreaterThan(sequences.length * 0.95);
    });

    test('should maintain number distribution', () => {
      const sequence = tambola.getDrawSequence();
      
      // Check that all numbers 1-90 are present
      for (let i = 1; i <= 90; i++) {
        expect(sequence).toContain(i);
      }
      
      // Check that no number appears more than once
      const uniqueNumbers = new Set(sequence);
      expect(uniqueNumbers.size).toBe(90);
    });
  });
}); 