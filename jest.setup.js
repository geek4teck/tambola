/**
 * @fileoverview Jest Setup Configuration
 * 
 * Global setup and configuration for Jest tests
 * 
 * @author Vishal Goyal
 * @version 4.1.0
 * @license ISC
 */

// Global test timeout
jest.setTimeout(10000);

// Suppress console output during tests unless explicitly needed
const originalConsoleLog = console.log;
const originalConsoleError = console.error;
const originalConsoleWarn = console.warn;

beforeAll(() => {
  // Suppress console output during tests
  console.log = jest.fn();
  console.error = jest.fn();
  console.warn = jest.fn();
});

afterAll(() => {
  // Restore console output
  console.log = originalConsoleLog;
  console.error = originalConsoleError;
  console.warn = originalConsoleWarn;
});

// Global test utilities
global.testUtils = {
  /**
   * Creates a mock ticket for testing
   * 
   * @returns {number[][]} Mock ticket
   */
  createMockTicket: () => [
    [1, 0, 21, 0, 0, 51, 0, 71, 81],
    [0, 13, 0, 34, 45, 0, 65, 0, 88],
    [7, 19, 0, 39, 0, 59, 67, 0, 0],
  ],

  /**
   * Creates a mock sequence for testing
   * 
   * @returns {number[]} Mock sequence
   */
  createMockSequence: () => Array.from({ length: 90 }, (_, i) => i + 1),

  /**
   * Validates ticket structure
   * 
   * @param {number[][]} ticket - Ticket to validate
   * @returns {boolean} True if valid
   */
  validateTicketStructure: (ticket) => {
    if (!Array.isArray(ticket) || ticket.length !== 3) return false;
    
    return ticket.every(row => 
      Array.isArray(row) && row.length === 9 && 
      row.every(cell => typeof cell === 'number' && cell >= 0 && cell <= 90)
    );
  },

  /**
   * Validates sequence structure
   * 
   * @param {number[]} sequence - Sequence to validate
   * @returns {boolean} True if valid
   */
  validateSequenceStructure: (sequence) => {
    if (!Array.isArray(sequence) || sequence.length !== 90) return false;
    
    const uniqueNumbers = new Set(sequence);
    return uniqueNumbers.size === 90 && 
           sequence.every(num => typeof num === 'number' && num >= 1 && num <= 90);
  },

  /**
   * Counts non-zero numbers in a ticket
   * 
   * @param {number[][]} ticket - Ticket to count
   * @returns {number} Count of non-zero numbers
   */
  countTicketNumbers: (ticket) => {
    return ticket.reduce((total, row) => 
      total + row.filter(cell => cell !== 0).length, 0
    );
  },

  /**
   * Gets numbers in a specific column
   * 
   * @param {number[][]} ticket - Ticket to analyze
   * @param {number} columnIndex - Column index (0-8)
   * @returns {number[]} Numbers in the column
   */
  getColumnNumbers: (ticket, columnIndex) => {
    return ticket.map(row => row[columnIndex]).filter(cell => cell !== 0);
  },

  /**
   * Gets numbers in a specific row
   * 
   * @param {number[][]} ticket - Ticket to analyze
   * @param {number} rowIndex - Row index (0-2)
   * @returns {number[]} Numbers in the row
   */
  getRowNumbers: (ticket, rowIndex) => {
    return ticket[rowIndex].filter(cell => cell !== 0);
  },
};

// Custom matchers for better test assertions
expect.extend({
  /**
   * Custom matcher to check if a ticket is valid
   */
  toBeValidTicket(received) {
    const isValid = global.testUtils.validateTicketStructure(received);
    
    if (isValid) {
      return {
        message: () => `Expected ticket to be invalid, but it was valid`,
        pass: true,
      };
    }
    
    return {
      message: () => `Expected ticket to be valid, but it was invalid`,
      pass: false,
    };
  },

  /**
   * Custom matcher to check if a sequence is valid
   */
  toBeValidSequence(received) {
    const isValid = global.testUtils.validateSequenceStructure(received);
    
    if (isValid) {
      return {
        message: () => `Expected sequence to be invalid, but it was valid`,
        pass: true,
      };
    }
    
    return {
      message: () => `Expected sequence to be valid, but it was invalid`,
      pass: false,
    };
  },

  /**
   * Custom matcher to check if a number is in valid range
   */
  toBeInRange(received, min, max) {
    const isInRange = received >= min && received <= max;
    
    if (isInRange) {
      return {
        message: () => `Expected ${received} to be outside range [${min}, ${max}]`,
        pass: true,
      };
    }
    
    return {
      message: () => `Expected ${received} to be in range [${min}, ${max}]`,
      pass: false,
    };
  },
}); 