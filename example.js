#!/usr/bin/env node

/**
 * Tambola Ticket Generator - Example Usage
 * 
 * This example demonstrates how to use the tambola package
 * to generate tickets and draw sequences.
 */

const tambola = require('./index.js');

console.log('🎯 Tambola Ticket Generator Example\n');

// Generate a tambola ticket
console.log('📋 Generated Tambola Ticket:');
console.log('=' .repeat(50));

const ticket = tambola.generateTicket();

// Display the ticket in a formatted way
ticket.forEach((row, index) => {
  const formattedRow = row.map(cell => {
    if (cell === 0) {
      return '  '; // Empty space for zeros
    }
    return cell.toString().padStart(2, ' '); // Right-align numbers
  }).join(' | ');
  
  console.log(`Row ${index + 1}: | ${formattedRow} |`);
});

console.log('=' .repeat(50));

// Show ticket statistics
console.log('\n📊 Ticket Statistics:');
console.log('-'.repeat(30));

// Count numbers in each row
ticket.forEach((row, index) => {
  const numbers = row.filter(cell => cell !== 0);
  console.log(`Row ${index + 1}: ${numbers.length} numbers (${numbers.join(', ')})`);
});

// Count numbers in each column
console.log('\nColumn Analysis:');
for (let col = 0; col < 9; col++) {
  const columnNumbers = [];
  for (let row = 0; row < 3; row++) {
    if (ticket[row][col] !== 0) {
      columnNumbers.push(ticket[row][col]);
    }
  }
  const range = col === 0 ? '1-10' : col === 8 ? '81-90' : `${col * 10 + 1}-${col * 10 + 10}`;
  console.log(`Column ${col + 1} (${range}): ${columnNumbers.length} numbers [${columnNumbers.join(', ')}]`);
}

// Generate a draw sequence
console.log('\n🎲 Generated Draw Sequence (first 20 numbers):');
console.log('-'.repeat(50));

const sequence = tambola.getDrawSequence();
console.log(`First 20: [${sequence.slice(0, 20).join(', ')}]`);
console.log(`Last 10:  [${sequence.slice(-10).join(', ')}]`);
console.log(`Total numbers: ${sequence.length}`);

// Verify sequence properties
const uniqueNumbers = new Set(sequence);
const hasAllNumbers = sequence.length === 90 && uniqueNumbers.size === 90;
const inRange = sequence.every(num => num >= 1 && num <= 90);

console.log('\n✅ Sequence Validation:');
console.log(`- Contains all numbers 1-90: ${hasAllNumbers ? 'Yes' : 'No'}`);
console.log(`- All numbers in range 1-90: ${inRange ? 'Yes' : 'No'}`);
console.log(`- No duplicates: ${uniqueNumbers.size === 90 ? 'Yes' : 'No'}`);

// Generate multiple tickets to show variety
console.log('\n🎯 Multiple Tickets Example:');
console.log('=' .repeat(50));

for (let i = 1; i <= 3; i++) {
  console.log(`\nTicket ${i}:`);
  const multiTicket = tambola.generateTicket();
  multiTicket.forEach((row, index) => {
    const formattedRow = row.map(cell => {
      if (cell === 0) return '  ';
      return cell.toString().padStart(2, ' ');
    }).join(' | ');
    console.log(`Row ${index + 1}: | ${formattedRow} |`);
  });
}

console.log('\n🎉 Example completed successfully!');
console.log('💡 Use this package in your own projects:');
console.log('   npm install tambola');
console.log('   const tambola = require("tambola");'); 