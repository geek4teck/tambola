/**
 * @fileoverview Tambola/Housie Ticket Generator
 * 
 * This module provides functionality to generate standard Tambola tickets
 * and draw sequences following official game rules.
 * 
 * @author Vishal Goyal
 * @version 4.1.0
 * @license ISC
 */

// Constants for game configuration
const TICKET_CONFIG = {
  ROWS: 3,
  COLUMNS: 9,
  NUMBERS_PER_ROW: 5,
  BLANKS_PER_ROW: 4,
  MIN_NUMBER: 1,
  MAX_NUMBER: 90,
  NUMBERS_PER_COLUMN_MIN: 1,
  NUMBERS_PER_COLUMN_MAX: 3,
};

// Column range configuration
const COLUMN_RANGES = [
  { min: 1, max: 10 },
  { min: 11, max: 20 },
  { min: 21, max: 30 },
  { min: 31, max: 40 },
  { min: 41, max: 50 },
  { min: 51, max: 60 },
  { min: 61, max: 70 },
  { min: 71, max: 80 },
  { min: 81, max: 90 },
];

/**
 * Generates a random integer between min and max (inclusive)
 * 
 * @param {number} min - Minimum value (inclusive)
 * @param {number} max - Maximum value (inclusive)
 * @returns {number} Random integer between min and max
 * 
 * @example
 * randomInteger(1, 10); // Returns a number between 1 and 10
 */
const randomInteger = (min, max) => {
  const minCeiled = Math.ceil(min);
  const maxFloored = Math.floor(max);
  return Math.floor(Math.random() * (maxFloored - minCeiled + 1)) + minCeiled;
};

/**
 * Generates an array of unique random numbers
 * 
 * @param {number} min - Minimum value (inclusive)
 * @param {number} max - Maximum value (inclusive)
 * @param {number} count - Number of unique numbers to generate
 * @param {boolean} [sort=true] - Whether to sort the result
 * @returns {number[]} Array of unique random numbers
 * 
 * @example
 * generateUniqueRandomNumbers(1, 90, 5); // Returns 5 unique numbers between 1-90
 */
const generateUniqueRandomNumbers = (min, max, count, sort = true) => {
  const numbers = new Set();
  
  while (numbers.size < count) {
    const randomNum = randomInteger(min, max);
    numbers.add(randomNum);
  }
  
  const result = Array.from(numbers);
  return sort ? result.sort((a, b) => a - b) : result;
};

/**
 * Validates if a ticket follows Tambola rules
 * 
 * @param {number[][]} ticket - 3x9 ticket array
 * @returns {boolean} True if ticket needs regeneration, false if valid
 * 
 * @example
 * const ticket = [[1, 0, 21, 0, 0, 51, 0, 71, 81], ...];
 * const needsRegeneration = validateTicket(ticket);
 */
const validateTicket = (ticket) => {
  for (let rowIndex = 0; rowIndex < TICKET_CONFIG.ROWS; rowIndex += 1) {
    const row = ticket[rowIndex];
    const blankCount = row.filter(cell => cell === 0).length;
    
    if (blankCount !== TICKET_CONFIG.BLANKS_PER_ROW) {
      return true; // Needs regeneration
    }
  }
  
  return false; // Valid ticket
};

/**
 * Creates an empty ticket template
 * 
 * @returns {number[][]} 3x9 array filled with zeros
 */
const createEmptyTicket = () => {
  return Array.from({ length: TICKET_CONFIG.ROWS }, () => 
    Array(TICKET_CONFIG.COLUMNS).fill(0)
  );
};

/**
 * Generates a valid Tambola ticket following official game rules
 * 
 * The generated ticket will have:
 * - 3 rows and 9 columns
 * - Exactly 5 numbers per row
 * - Numbers in correct column ranges (1-10, 11-20, etc.)
 * - Numbers in ascending order within each column
 * - No duplicate numbers in any column
 * 
 * @returns {number[][]} Valid 3x9 Tambola ticket
 * 
 * @example
 * const ticket = generateTicket();
 * console.log(ticket);
 * // Output: [[2, 0, 22, 0, 0, 56, 0, 71, 81], [0, 13, 0, 34, 45, 0, 65, 0, 88], [7, 19, 0, 39, 0, 59, 67, 0, 0]]
 */
const generateTicket = () => {
  let isValidTicket = false;
  let ticket;
  
  while (!isValidTicket) {
    // Initialize ticket structure
    ticket = createEmptyTicket();
    
    // Determine how many numbers each column will have (1-3)
    const columnNumberCounts = Array(TICKET_CONFIG.COLUMNS).fill(2);
    const columnsWithOneNumber = generateUniqueRandomNumbers(0, 8, 3);
    
    columnsWithOneNumber.forEach(columnIndex => {
      columnNumberCounts[columnIndex] = 1;
    });
    
    // Generate positions for numbers in each column
    const columnPositions = columnNumberCounts.map(count => 
      generateUniqueRandomNumbers(0, 2, count)
    );
    
    // Fill ticket with numbers
    columnPositions.forEach((positions, columnIndex) => {
      const { min, max } = COLUMN_RANGES[columnIndex];
      const numbers = generateUniqueRandomNumbers(min, max, positions.length);
      
      positions.forEach((rowIndex, numberIndex) => {
        ticket[rowIndex][columnIndex] = numbers[numberIndex];
      });
    });
    
    // Validate ticket
    isValidTicket = !validateTicket(ticket);
  }
  
  return ticket;
};

/**
 * Generates a random draw sequence for Tambola game
 * 
 * Creates a shuffled array containing all numbers from 1 to 90,
 * which represents the order in which numbers will be called during the game.
 * 
 * @returns {number[]} Array of 90 numbers in random order
 * 
 * @example
 * const sequence = getDrawSequence();
 * console.log(sequence);
 * // Output: [37, 2, 89, 15, 73, 41, 8, 56, 23, ...]
 */
const getDrawSequence = () => {
  return generateUniqueRandomNumbers(
    TICKET_CONFIG.MIN_NUMBER,
    TICKET_CONFIG.MAX_NUMBER,
    TICKET_CONFIG.MAX_NUMBER,
    false // Don't sort - keep random order
  );
};

// Export public API
module.exports = {
  generateTicket,
  getDrawSequence,
};

