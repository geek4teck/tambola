#!/usr/bin/env node

/**
 * @fileoverview Tambola CLI - Command Line Interface
 * 
 * Professional command-line interface for generating Tambola tickets
 * and draw sequences with multiple output formats.
 * 
 * @author Vishal Goyal
 * @version 4.1.0
 * @license ISC
 */

const fs = require('fs');
const path = require('path');
const tambola = require('../index.js');

// Configuration constants
const CLI_CONFIG = {
  MIN_COUNT: 1,
  MAX_COUNT: 100,
  DEFAULT_COUNT: 1,
  SUPPORTED_TICKET_FORMATS: ['table', 'json', 'csv'],
  SUPPORTED_SEQUENCE_FORMATS: ['array', 'json', 'csv'],
  DEFAULT_TICKET_FORMAT: 'table',
  DEFAULT_SEQUENCE_FORMAT: 'array',
  TABLE_WIDTH: 35,
  EXIT_CODES: {
    SUCCESS: 0,
    ERROR: 1,
  },
};

// Package metadata
const packageJson = require('../package.json');
const VERSION = packageJson.version;

// Command line arguments
const ARGS = process.argv.slice(2);
const COMMAND = ARGS[0];

/**
 * Help text for the CLI
 */
const HELP_TEXT = `
🎯 Tambola CLI - Professional Command Line Interface

Usage:
  tambola <command> [options]

Commands:
  ticket [options]     Generate tambola tickets
  sequence [options]   Generate draw sequence
  help                 Show this help message
  version              Show version

Options for ticket command:
  --count, -c <number>    Number of tickets to generate (1-100, default: 1)
  --format, -f <format>   Output format: table, json, csv (default: table)
  --pretty, -p           Pretty print JSON output
  --output, -o <file>    Save output to file

Options for sequence command:
  --count, -c <number>    Number of sequences to generate (1-100, default: 1)
  --format, -f <format>   Output format: array, json, csv (default: array)
  --pretty, -p           Pretty print JSON output
  --output, -o <file>    Save output to file

Examples:
  tambola ticket                    # Generate 1 ticket in table format
  tambola ticket -c 5              # Generate 5 tickets
  tambola ticket -f json -p        # Generate 1 ticket in pretty JSON
  tambola sequence -c 3            # Generate 3 draw sequences
  tambola sequence -f csv -o draw.csv  # Save sequence to CSV file

For more information, visit: https://github.com/geek4teck/tambola
`;

/**
 * Parses command line arguments into structured options
 * 
 * @param {string[]} args - Command line arguments
 * @param {string} command - The main command (ticket/sequence)
 * @returns {Object} Parsed options object
 * 
 * @example
 * const options = parseOptions(['-c', '5', '-f', 'json'], 'ticket');
 * // Returns: { count: 5, format: 'json', pretty: false, output: null }
 */
const parseOptions = (args, command) => {
  const defaultFormat = command === 'sequence' || command === 'sequences' 
    ? CLI_CONFIG.DEFAULT_SEQUENCE_FORMAT 
    : CLI_CONFIG.DEFAULT_TICKET_FORMAT;

  const options = {
    count: CLI_CONFIG.DEFAULT_COUNT,
    format: defaultFormat,
    pretty: false,
    output: null,
  };

  for (let i = 1; i < args.length; i += 1) {
    const arg = args[i];
    const nextArg = args[i + 1];

    switch (arg) {
      case '--count':
      case '-c':
        if (nextArg && !Number.isNaN(Number(nextArg))) {
          options.count = parseInt(nextArg, 10);
          i += 1; // Skip next argument
        }
        break;
      case '--format':
      case '-f':
        if (nextArg) {
          options.format = nextArg.toLowerCase();
          i += 1; // Skip next argument
        }
        break;
      case '--pretty':
      case '-p':
        options.pretty = true;
        break;
      case '--output':
      case '-o':
        if (nextArg) {
          options.output = nextArg;
          i += 1; // Skip next argument
        }
        break;
      default:
        // Ignore unknown options
        break;
    }
  }

  return options;
};

/**
 * Validates CLI options and throws error if invalid
 * 
 * @param {Object} options - Parsed options
 * @param {string} command - The main command
 * @throws {Error} If options are invalid
 */
const validateOptions = (options, command) => {
  // Validate count
  if (options.count < CLI_CONFIG.MIN_COUNT || options.count > CLI_CONFIG.MAX_COUNT) {
    throw new Error(`Count must be between ${CLI_CONFIG.MIN_COUNT} and ${CLI_CONFIG.MAX_COUNT}`);
  }

  // Validate format based on command
  const supportedFormats = command === 'sequence' || command === 'sequences'
    ? CLI_CONFIG.SUPPORTED_SEQUENCE_FORMATS
    : CLI_CONFIG.SUPPORTED_TICKET_FORMATS;

  if (!supportedFormats.includes(options.format)) {
    throw new Error(`Unsupported format: ${options.format}. Supported formats: ${supportedFormats.join(', ')}`);
  }
};

/**
 * Formats a ticket as an ASCII table
 * 
 * @param {number[][]} ticket - 3x9 ticket array
 * @returns {string} Formatted table string
 * 
 * @example
 * const table = formatTicketAsTable(ticket);
 * console.log(table);
 */
const formatTicketAsTable = (ticket) => {
  const lines = [];
  const horizontalLine = '─'.repeat(CLI_CONFIG.TABLE_WIDTH);
  
  // Top border
  lines.push(`┌${horizontalLine}┐`);
  
  // Ticket rows
  ticket.forEach((row, index) => {
    const formattedRow = row.map(cell => {
      if (cell === 0) return '  ';
      return cell.toString().padStart(2, ' ');
    }).join(' │ ');
    
    lines.push(`│ ${formattedRow} │`);
    
    // Add separator between rows (except after last row)
    if (index < ticket.length - 1) {
      lines.push(`├${horizontalLine}┤`);
    }
  });
  
  // Bottom border
  lines.push(`└${horizontalLine}┘`);
  
  return lines.join('\n');
};

/**
 * Formats a ticket as CSV
 * 
 * @param {number[][]} ticket - 3x9 ticket array
 * @returns {string} CSV formatted string
 */
const formatTicketAsCSV = (ticket) => {
  return ticket.map(row => 
    row.map(cell => (cell === 0 ? '' : cell)).join(',')
  ).join('\n');
};

/**
 * Formats a sequence as array string
 * 
 * @param {number[]} sequence - Array of numbers
 * @returns {string} Array string representation
 */
const formatSequenceAsArray = (sequence) => {
  return `[${sequence.join(', ')}]`;
};

/**
 * Formats a sequence as CSV
 * 
 * @param {number[]} sequence - Array of numbers
 * @returns {string} CSV formatted string
 */
const formatSequenceAsCSV = (sequence) => {
  return sequence.join(',');
};

/**
 * Saves content to a file
 * 
 * @param {string} content - Content to save
 * @param {string} filename - Target filename
 * @throws {Error} If file write fails
 */
const saveToFile = (content, filename) => {
  try {
    fs.writeFileSync(filename, content, 'utf8');
    console.log(`✅ Output saved to: ${filename}`);
  } catch (error) {
    throw new Error(`Failed to save file: ${error.message}`);
  }
};

/**
 * Generates and formats tickets based on options
 * 
 * @param {Object} options - CLI options
 * @returns {string} Formatted output string
 * 
 * @example
 * const output = generateTickets({ count: 2, format: 'json', pretty: true });
 */
const generateTickets = (options) => {
  const tickets = Array.from({ length: options.count }, () => tambola.generateTicket());

  switch (options.format) {
    case 'table':
      if (options.count === 1) {
        return formatTicketAsTable(tickets[0]);
      }
      return tickets.map((ticket, index) => 
        `\n📋 Ticket ${index + 1}:\n${formatTicketAsTable(ticket)}`
      ).join('\n');

    case 'json': {
      const jsonData = options.count === 1 ? tickets[0] : tickets;
      return options.pretty 
        ? JSON.stringify(jsonData, null, 2) 
        : JSON.stringify(jsonData);
    }

    case 'csv':
      if (options.count === 1) {
        return formatTicketAsCSV(tickets[0]);
      }
      return tickets.map((ticket, index) => 
        `Ticket ${index + 1}\n${formatTicketAsCSV(ticket)}`
      ).join('\n\n');

    default:
      throw new Error(`Unsupported format: ${options.format}`);
  }
};

/**
 * Generates and formats sequences based on options
 * 
 * @param {Object} options - CLI options
 * @returns {string} Formatted output string
 * 
 * @example
 * const output = generateSequences({ count: 2, format: 'json', pretty: true });
 */
const generateSequences = (options) => {
  const sequences = Array.from({ length: options.count }, () => tambola.getDrawSequence());

  switch (options.format) {
    case 'array':
      if (options.count === 1) {
        return formatSequenceAsArray(sequences[0]);
      }
      return sequences.map((seq, index) => 
        `Sequence ${index + 1}: ${formatSequenceAsArray(seq)}`
      ).join('\n');

    case 'json': {
      const jsonData = options.count === 1 ? sequences[0] : sequences;
      return options.pretty 
        ? JSON.stringify(jsonData, null, 2) 
        : JSON.stringify(jsonData);
    }

    case 'csv':
      if (options.count === 1) {
        return formatSequenceAsCSV(sequences[0]);
      }
      return sequences.map((seq, index) => 
        `Sequence ${index + 1},${formatSequenceAsCSV(seq)}`
      ).join('\n');

    default:
      throw new Error(`Unsupported format: ${options.format}`);
  }
};

/**
 * Main CLI function
 * 
 * Handles command parsing, validation, and execution
 */
const main = () => {
  try {
    // Show help
    if (!COMMAND || COMMAND === 'help' || COMMAND === '--help' || COMMAND === '-h') {
      console.log(HELP_TEXT);
      process.exit(CLI_CONFIG.EXIT_CODES.SUCCESS);
    }

    // Show version
    if (COMMAND === 'version' || COMMAND === '--version' || COMMAND === '-v') {
      console.log(`🎯 Tambola CLI v${VERSION}`);
      process.exit(CLI_CONFIG.EXIT_CODES.SUCCESS);
    }

    // Parse and validate options
    const options = parseOptions(ARGS, COMMAND);
    validateOptions(options, COMMAND);

    // Execute command
    let output;
    switch (COMMAND) {
      case 'ticket':
      case 'tickets':
        output = generateTickets(options);
        break;
        
      case 'sequence':
      case 'sequences':
        output = generateSequences(options);
        break;
        
      default:
        throw new Error(`Unknown command: ${COMMAND}`);
    }

    // Output result
    if (options.output) {
      saveToFile(output, options.output);
    } else {
      console.log(output);
    }

    process.exit(CLI_CONFIG.EXIT_CODES.SUCCESS);
  } catch (error) {
    console.error(`❌ Error: ${error.message}`);
    console.log('\nRun "tambola help" for usage information');
    process.exit(CLI_CONFIG.EXIT_CODES.ERROR);
  }
};

// Run CLI if this file is executed directly
if (require.main === module) {
  main();
}

// Export for testing
module.exports = {
  main,
  parseOptions,
  validateOptions,
  formatTicketAsTable,
  formatSequenceAsArray,
  generateTickets,
  generateSequences,
}; 