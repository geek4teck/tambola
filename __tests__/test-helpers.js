/**
 * Test helper functions for Tambola package tests
 */

/**
 * Validates if a tambola ticket follows all the standard rules
 * @param {Array} ticket - 3x9 tambola ticket
 * @returns {Object} - Validation result with isValid boolean and errors array
 */
function validateTambolaTicket(ticket) {
  const errors = [];
  
  // Check basic structure
  if (!Array.isArray(ticket) || ticket.length !== 3) {
    errors.push('Ticket must be a 3x9 array');
    return { isValid: false, errors };
  }
  
  ticket.forEach((row, rowIndex) => {
    if (!Array.isArray(row) || row.length !== 9) {
      errors.push(`Row ${rowIndex} must have exactly 9 elements`);
    }
  });
  
  if (errors.length > 0) {
    return { isValid: false, errors };
  }
  
  // Check each row has exactly 5 numbers and 4 zeros
  ticket.forEach((row, rowIndex) => {
    const numbers = row.filter(cell => cell !== 0);
    const zeros = row.filter(cell => cell === 0);
    
    if (numbers.length !== 5) {
      errors.push(`Row ${rowIndex} must have exactly 5 numbers, found ${numbers.length}`);
    }
    if (zeros.length !== 4) {
      errors.push(`Row ${rowIndex} must have exactly 4 zeros, found ${zeros.length}`);
    }
  });
  
  // Check column rules
  for (let col = 0; col < 9; col++) {
    const columnNumbers = [];
    for (let row = 0; row < 3; row++) {
      if (ticket[row][col] !== 0) {
        columnNumbers.push(ticket[row][col]);
      }
    }
    
    // Each column must have at least one number
    if (columnNumbers.length === 0) {
      errors.push(`Column ${col} must have at least one number`);
    }
    
    // Numbers must be in correct range for each column
    columnNumbers.forEach(num => {
      const expectedMin = col === 0 ? 1 : col * 10 + 1;
      const expectedMax = col === 8 ? 90 : col * 10 + 10;
      
      if (num < expectedMin || num > expectedMax) {
        errors.push(`Number ${num} in column ${col} is outside valid range [${expectedMin}-${expectedMax}]`);
      }
    });
    
    // Numbers must be unique within each column
    const uniqueNumbers = [...new Set(columnNumbers)];
    if (uniqueNumbers.length !== columnNumbers.length) {
      errors.push(`Column ${col} has duplicate numbers`);
    }
    
    // Numbers must be in ascending order within each column
    for (let i = 1; i < columnNumbers.length; i++) {
      if (columnNumbers[i] <= columnNumbers[i - 1]) {
        errors.push(`Numbers in column ${col} must be in ascending order`);
        break;
      }
    }
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
}

/**
 * Validates if a draw sequence follows tambola rules
 * @param {Array} sequence - Array of 90 numbers
 * @returns {Object} - Validation result with isValid boolean and errors array
 */
function validateDrawSequence(sequence) {
  const errors = [];
  
  // Check basic structure
  if (!Array.isArray(sequence) || sequence.length !== 90) {
    errors.push('Draw sequence must be an array of exactly 90 numbers');
    return { isValid: false, errors };
  }
  
  // Check all numbers are in range 1-90
  sequence.forEach((num, index) => {
    if (!Number.isInteger(num) || num < 1 || num > 90) {
      errors.push(`Number at index ${index} (${num}) is not in valid range [1-90]`);
    }
  });
  
  // Check all numbers are unique
  const uniqueNumbers = [...new Set(sequence)];
  if (uniqueNumbers.length !== 90) {
    errors.push('Draw sequence must contain exactly 90 unique numbers');
  }
  
  // Check all numbers from 1-90 are present
  for (let i = 1; i <= 90; i++) {
    if (!sequence.includes(i)) {
      errors.push(`Number ${i} is missing from draw sequence`);
    }
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
}

/**
 * Generates a sample valid tambola ticket for testing
 * @returns {Array} - Sample 3x9 tambola ticket
 */
function generateSampleTicket() {
  // This ticket follows all tambola rules:
  // - 3x9 grid
  // - 5 numbers per row, 4 blanks
  // - Numbers in each column are in ascending order from top to bottom
  // - Numbers in correct column ranges
  // - Each column has at least one number
  // - No duplicates
  return [
    [2, 0, 22, 0, 0, 56, 0, 71, 81],
    [0, 13, 0, 34, 45, 0, 65, 0, 88],
    [7, 19, 0, 39, 0, 59, 67, 0, 0]
  ];
}

/**
 * Generates a sample valid draw sequence for testing
 * @returns {Array} - Sample array of 90 numbers
 */
function generateSampleDrawSequence() {
  const sequence = [];
  for (let i = 1; i <= 90; i++) {
    sequence.push(i);
  }
  // Shuffle the sequence
  for (let i = sequence.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [sequence[i], sequence[j]] = [sequence[j], sequence[i]];
  }
  return sequence;
}

module.exports = {
  validateTambolaTicket,
  validateDrawSequence,
  generateSampleTicket,
  generateSampleDrawSequence
}; 