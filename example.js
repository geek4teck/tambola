#!/usr/bin/env node

/**
 * @fileoverview Tambola Ticket Generator - Example Usage
 * 
 * Professional example demonstrating how to use the tambola package
 * to generate tickets and draw sequences with comprehensive analysis.
 * 
 * @author Vishal Goyal
 * @version 4.1.0
 * @license ISC
 */

const tambola = require('./index.js');

// Configuration constants
const EXAMPLE_CONFIG = {
  TICKET_ROWS: 3,
  TICKET_COLUMNS: 9,
  SEQUENCE_LENGTH: 90,
  DISPLAY_SEQUENCE_LENGTH: 20,
  DISPLAY_LAST_SEQUENCE_LENGTH: 10,
  MULTIPLE_TICKETS_COUNT: 3,
  COLUMN_RANGES: [
    { min: 1, max: 10 },
    { min: 11, max: 20 },
    { min: 21, max: 30 },
    { min: 31, max: 40 },
    { min: 41, max: 50 },
    { min: 51, max: 60 },
    { min: 61, max: 70 },
    { min: 71, max: 80 },
    { min: 81, max: 90 },
  ],
};

/**
 * Formats a ticket row for display
 * 
 * @param {number[]} row - Ticket row array
 * @returns {string} Formatted row string
 * 
 * @example
 * const formatted = formatTicketRow([1, 0, 21, 0, 0, 51, 0, 71, 81]);
 * // Returns: " 1 |   | 21 |   |   | 51 |   | 71 | 81"
 */
const formatTicketRow = (row) => {
  return row.map(cell => {
    if (cell === 0) return '  ';
    return cell.toString().padStart(2, ' ');
  }).join(' | ');
};

/**
 * Analyzes ticket statistics
 * 
 * @param {number[][]} ticket - 3x9 ticket array
 * @returns {Object} Analysis results
 * 
 * @example
 * const analysis = analyzeTicket(ticket);
 * console.log(analysis.rowStats);
 */
const analyzeTicket = (ticket) => {
  const rowStats = ticket.map((row, index) => {
    const numbers = row.filter(cell => cell !== 0);
    return {
      rowIndex: index + 1,
      numberCount: numbers.length,
      numbers,
    };
  });

  const columnStats = EXAMPLE_CONFIG.COLUMN_RANGES.map((range, index) => {
    const columnNumbers = ticket.map(row => row[index]).filter(cell => cell !== 0);
    return {
      columnIndex: index + 1,
      range: `${range.min}-${range.max}`,
      numberCount: columnNumbers.length,
      numbers: columnNumbers,
    };
  });

  return { rowStats, columnStats };
};

/**
 * Validates a draw sequence
 * 
 * @param {number[]} sequence - Array of 90 numbers
 * @returns {Object} Validation results
 * 
 * @example
 * const validation = validateSequence(sequence);
 * console.log(validation.isValid);
 */
const validateSequence = (sequence) => {
  const uniqueNumbers = new Set(sequence);
  const hasAllNumbers = sequence.length === EXAMPLE_CONFIG.SEQUENCE_LENGTH &&
    uniqueNumbers.size === EXAMPLE_CONFIG.SEQUENCE_LENGTH &&
    Array.from({ length: EXAMPLE_CONFIG.SEQUENCE_LENGTH }, (_, i) => i + 1).every(n => sequence.includes(n));
  const hasCorrectSize = uniqueNumbers.size === EXAMPLE_CONFIG.SEQUENCE_LENGTH;
  const inRange = sequence.every(num => num >= 1 && num <= EXAMPLE_CONFIG.SEQUENCE_LENGTH);

  return {
    isValid: hasAllNumbers && hasCorrectSize && inRange,
    hasAllNumbers,
    hasCorrectSize,
    inRange,
    uniqueCount: uniqueNumbers.size,
  };
};

/**
 * Displays ticket analysis
 * 
 * @param {number[][]} ticket - 3x9 ticket array
 */
const displayTicketAnalysis = (ticket) => {
  const analysis = analyzeTicket(ticket);

  console.log('\n📊 Ticket Statistics:');
  console.log('-'.repeat(30));

  // Row statistics
  analysis.rowStats.forEach(({ rowIndex, numberCount, numbers }) => {
    console.log(`Row ${rowIndex}: ${numberCount} numbers (${numbers.join(', ')})`);
  });

  // Column analysis
  console.log('\nColumn Analysis:');
  analysis.columnStats.forEach(({ columnIndex, range, numberCount, numbers }) => {
    console.log(`Column ${columnIndex} (${range}): ${numberCount} numbers [${numbers.join(', ')}]`);
  });
};

/**
 * Displays sequence analysis
 * 
 * @param {number[]} sequence - Array of 90 numbers
 */
const displaySequenceAnalysis = (sequence) => {
  const validation = validateSequence(sequence);

  console.log('\n🎲 Generated Draw Sequence:');
  console.log('-'.repeat(50));

  console.log(`First ${EXAMPLE_CONFIG.DISPLAY_SEQUENCE_LENGTH}: [${sequence.slice(0, EXAMPLE_CONFIG.DISPLAY_SEQUENCE_LENGTH).join(', ')}]`);
  console.log(`Last ${EXAMPLE_CONFIG.DISPLAY_LAST_SEQUENCE_LENGTH}:  [${sequence.slice(-EXAMPLE_CONFIG.DISPLAY_LAST_SEQUENCE_LENGTH).join(', ')}]`);
  console.log(`Total numbers: ${sequence.length}`);

  console.log('\n✅ Sequence Validation:');
  console.log(`- Contains all numbers 1-90: ${validation.hasAllNumbers ? 'Yes' : 'No'}`);
  console.log(`- All numbers in range 1-90: ${validation.inRange ? 'Yes' : 'No'}`);
  console.log(`- No duplicates: ${validation.hasCorrectSize ? 'Yes' : 'No'}`);
};

/**
 * Displays multiple tickets example
 */
const displayMultipleTickets = () => {
  console.log('\n🎯 Multiple Tickets Example:');
  console.log('='.repeat(50));

  for (let i = 1; i <= EXAMPLE_CONFIG.MULTIPLE_TICKETS_COUNT; i += 1) {
    console.log(`\nTicket ${i}:`);
    const multiTicket = tambola.generateTicket();
    
    multiTicket.forEach((row, index) => {
      const formattedRow = formatTicketRow(row);
      console.log(`Row ${index + 1}: | ${formattedRow} |`);
    });
  }
};

/**
 * Main example function
 * 
 * Demonstrates comprehensive usage of the tambola package
 */
const runExample = () => {
  console.log('🎯 Tambola Ticket Generator Example\n');

  // Generate and display a single ticket
  console.log('📋 Generated Tambola Ticket:');
  console.log('='.repeat(50));

  const ticket = tambola.generateTicket();
  
  ticket.forEach((row, index) => {
    const formattedRow = formatTicketRow(row);
    console.log(`Row ${index + 1}: | ${formattedRow} |`);
  });

  console.log('='.repeat(50));

  // Display ticket analysis
  displayTicketAnalysis(ticket);

  // Generate and display sequence analysis
  const sequence = tambola.getDrawSequence();
  displaySequenceAnalysis(sequence);

  // Display multiple tickets example
  displayMultipleTickets();

  // Conclusion
  console.log('\n🎉 Example completed successfully!');
  console.log('💡 Use this package in your own projects:');
  console.log('   npm install tambola');
  console.log('   const tambola = require("tambola");');
};

// Run example if this file is executed directly
if (require.main === module) {
  runExample();
}

// Export for testing
module.exports = {
  formatTicketRow,
  analyzeTicket,
  validateSequence,
  displayTicketAnalysis,
  displaySequenceAnalysis,
  displayMultipleTickets,
  runExample,
}; 