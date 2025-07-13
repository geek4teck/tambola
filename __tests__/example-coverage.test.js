/**
 * @fileoverview Example Module Coverage Tests
 * 
 * Tests for example module functions to ensure complete coverage
 * 
 * @author Vishal Goyal
 * @version 4.1.0
 * @license ISC
 */

const {
  formatTicketRow,
  analyzeTicket,
  validateSequence,
  displayTicketAnalysis,
  displaySequenceAnalysis,
  displayMultipleTickets,
  runExample,
} = require('../example.js');

describe('Example Module Coverage Tests', () => {
  describe('formatTicketRow', () => {
    test('should format row with numbers and zeros', () => {
      const row = [1, 0, 21, 0, 0, 51, 0, 71, 81];
      
      const result = formatTicketRow(row);
      
      expect(result).toBe(' 1 |    | 21 |    |    | 51 |    | 71 | 81');
    });

    test('should format row with only zeros', () => {
      const row = [0, 0, 0, 0, 0, 0, 0, 0, 0];
      
      const result = formatTicketRow(row);
      
      expect(result).toBe('   |    |    |    |    |    |    |    |   ');
    });

    test('should format row with only numbers', () => {
      const row = [1, 13, 21, 34, 45, 51, 65, 71, 81];
      
      const result = formatTicketRow(row);
      
      expect(result).toBe(' 1 | 13 | 21 | 34 | 45 | 51 | 65 | 71 | 81');
    });
  });

  describe('analyzeTicket', () => {
    test('should analyze ticket structure correctly', () => {
      const ticket = [
        [1, 0, 21, 0, 0, 51, 0, 71, 81],
        [0, 13, 0, 34, 45, 0, 65, 0, 88],
        [7, 19, 0, 39, 0, 59, 67, 0, 0],
      ];
      
      const result = analyzeTicket(ticket);
      
      expect(result).toHaveProperty('rowStats');
      expect(result).toHaveProperty('columnStats');
      expect(result.rowStats).toHaveLength(3);
      expect(result.columnStats).toHaveLength(9);
    });

    test('should count numbers in each row correctly', () => {
      const ticket = [
        [1, 0, 21, 0, 0, 51, 0, 71, 81],
        [0, 13, 0, 34, 45, 0, 65, 0, 88],
        [7, 19, 0, 39, 0, 59, 67, 0, 0],
      ];
      
      const result = analyzeTicket(ticket);
      
      expect(result.rowStats[0].numberCount).toBe(5);
      expect(result.rowStats[1].numberCount).toBe(5);
      expect(result.rowStats[2].numberCount).toBe(5);
    });

    test('should analyze column ranges correctly', () => {
      const ticket = [
        [1, 0, 21, 0, 0, 51, 0, 71, 81],
        [0, 13, 0, 34, 45, 0, 65, 0, 88],
        [7, 19, 0, 39, 0, 59, 67, 0, 0],
      ];
      
      const result = analyzeTicket(ticket);
      
      expect(result.columnStats[0].range).toBe('1-10');
      expect(result.columnStats[1].range).toBe('11-20');
      expect(result.columnStats[8].range).toBe('81-90');
    });
  });

  describe('validateSequence', () => {
    test('should validate correct sequence', () => {
      const sequence = Array.from({ length: 90 }, (_, i) => i + 1);
      
      const result = validateSequence(sequence);
      
      expect(result.isValid).toBe(true);
      expect(result.hasAllNumbers).toBe(true);
      expect(result.hasCorrectSize).toBe(true);
      expect(result.inRange).toBe(true);
      expect(result.uniqueCount).toBe(90);
    });

    test('should reject sequence with wrong length', () => {
      const sequence = Array.from({ length: 89 }, (_, i) => i + 1);
      
      const result = validateSequence(sequence);
      
      expect(result.isValid).toBe(false);
      expect(result.hasAllNumbers).toBe(false);
    });

    test('should reject sequence with duplicate numbers', () => {
      const sequence = Array.from({ length: 90 }, (_, i) => i + 1);
      sequence[0] = 2; // Create duplicate
      
      const result = validateSequence(sequence);
      
      expect(result.isValid).toBe(false);
      expect(result.hasCorrectSize).toBe(false);
    });

    test('should reject sequence with numbers outside range', () => {
      const sequence = Array.from({ length: 90 }, (_, i) => i + 1);
      sequence[0] = 91; // Out of range
      
      const result = validateSequence(sequence);
      
      expect(result.isValid).toBe(false);
      expect(result.inRange).toBe(false);
    });

    test('should reject sequence with missing numbers', () => {
      const sequence = Array.from({ length: 90 }, (_, i) => i + 2); // Missing 1
      
      const result = validateSequence(sequence);
      
      expect(result.isValid).toBe(false);
      expect(result.hasAllNumbers).toBe(false);
      expect(result.uniqueCount).toBe(90); // Still has 90 unique numbers
    });
  });

  describe('displayTicketAnalysis', () => {
    test('should call analyzeTicket and log results', () => {
      const ticket = [
        [1, 0, 21, 0, 0, 51, 0, 71, 81],
        [0, 13, 0, 34, 45, 0, 65, 0, 88],
        [7, 19, 0, 39, 0, 59, 67, 0, 0],
      ];
      
      // Mock console.log to capture output
      const originalLog = console.log;
      const logs = [];
      console.log = jest.fn((...args) => logs.push(args.join(' ')));
      
      displayTicketAnalysis(ticket);
      
      // Restore console.log
      console.log = originalLog;
      
      expect(logs.length).toBeGreaterThan(0);
      expect(logs.some(log => log.includes('Ticket Statistics'))).toBe(true);
      expect(logs.some(log => log.includes('Column Analysis'))).toBe(true);
    });
  });

  describe('displaySequenceAnalysis', () => {
    test('should call validateSequence and log results', () => {
      const sequence = Array.from({ length: 90 }, (_, i) => i + 1);
      
      // Mock console.log to capture output
      const originalLog = console.log;
      const logs = [];
      console.log = jest.fn((...args) => logs.push(args.join(' ')));
      
      displaySequenceAnalysis(sequence);
      
      // Restore console.log
      console.log = originalLog;
      
      expect(logs.length).toBeGreaterThan(0);
      expect(logs.some(log => log.includes('Generated Draw Sequence'))).toBe(true);
      expect(logs.some(log => log.includes('Sequence Validation'))).toBe(true);
    });
  });

  describe('displayMultipleTickets', () => {
    test('should generate and display multiple tickets', () => {
      // Mock console.log to capture output
      const originalLog = console.log;
      const logs = [];
      console.log = jest.fn((...args) => logs.push(args.join(' ')));
      
      displayMultipleTickets();
      
      // Restore console.log
      console.log = originalLog;
      
      expect(logs.length).toBeGreaterThan(0);
      expect(logs.some(log => log.includes('Multiple Tickets Example'))).toBe(true);
      expect(logs.some(log => log.includes('Ticket 1:'))).toBe(true);
      expect(logs.some(log => log.includes('Ticket 2:'))).toBe(true);
      expect(logs.some(log => log.includes('Ticket 3:'))).toBe(true);
    });
  });

  describe('runExample', () => {
    test('should run complete example without errors', () => {
      // Mock console.log to capture output
      const originalLog = console.log;
      const logs = [];
      console.log = jest.fn((...args) => logs.push(args.join(' ')));
      
      runExample();
      
      // Restore console.log
      console.log = originalLog;
      
      expect(logs.length).toBeGreaterThan(0);
      expect(logs.some(log => log.includes('Tambola Ticket Generator Example'))).toBe(true);
      expect(logs.some(log => log.includes('Generated Tambola Ticket'))).toBe(true);
      expect(logs.some(log => log.includes('Example completed successfully'))).toBe(true);
    });
  });
}); 