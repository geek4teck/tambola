#!/usr/bin/env node

/**
 * Tambola CLI - Command Line Interface for Tambola Ticket Generator
 * 
 * Usage:
 *   tambola ticket [options]     Generate tambola tickets
 *   tambola sequence [options]    Generate draw sequence
 *   tambola --help               Show help
 *   tambola --version            Show version
 */

const tambola = require('../index.js');
const path = require('path');

// Get package version
const packageJson = require('../package.json');
const version = packageJson.version;

// Parse command line arguments
const args = process.argv.slice(2);
const command = args[0];

// Help text
const helpText = `
🎯 Tambola CLI - Command Line Interface

Usage:
  tambola <command> [options]

Commands:
  ticket [options]     Generate tambola tickets
  sequence [options]   Generate draw sequence
  help                 Show this help message
  version              Show version

Options for ticket command:
  --count, -c <number>    Number of tickets to generate (default: 1)
  --format, -f <format>   Output format: table, json, csv (default: table)
  --pretty, -p           Pretty print JSON output
  --output, -o <file>    Save output to file

Options for sequence command:
  --count, -c <number>    Number of sequences to generate (default: 1)
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

// Parse options from command line arguments
function parseOptions(args) {
  const options = {
    count: 1,
    format: command === 'sequence' || command === 'sequences' ? 'array' : 'table',
    pretty: false,
    output: null
  };

  for (let i = 1; i < args.length; i++) {
    const arg = args[i];
    const nextArg = args[i + 1];

    switch (arg) {
      case '--count':
      case '-c':
        if (nextArg && !isNaN(nextArg)) {
          options.count = parseInt(nextArg);
          i++; // Skip next argument
        }
        break;
      case '--format':
      case '-f':
        if (nextArg) {
          options.format = nextArg.toLowerCase();
          i++; // Skip next argument
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
          i++; // Skip next argument
        }
        break;
    }
  }

  return options;
}

// Format ticket as table
function formatTicketAsTable(ticket) {
  const lines = [];
  lines.push('┌' + '─'.repeat(35) + '┐');
  
  ticket.forEach((row, index) => {
    const formattedRow = row.map(cell => {
      if (cell === 0) return '  ';
      return cell.toString().padStart(2, ' ');
    }).join(' │ ');
    lines.push(`│ ${formattedRow} │`);
    
    if (index < ticket.length - 1) {
      lines.push('├' + '─'.repeat(35) + '┤');
    }
  });
  
  lines.push('└' + '─'.repeat(35) + '┘');
  return lines.join('\n');
}

// Format ticket as CSV
function formatTicketAsCSV(ticket) {
  return ticket.map(row => 
    row.map(cell => cell === 0 ? '' : cell).join(',')
  ).join('\n');
}

// Format sequence as array string
function formatSequenceAsArray(sequence) {
  return `[${sequence.join(', ')}]`;
}

// Format sequence as CSV
function formatSequenceAsCSV(sequence) {
  return sequence.join(',');
}

// Save output to file
function saveToFile(content, filename) {
  const fs = require('fs');
  try {
    fs.writeFileSync(filename, content);
    console.log(`✅ Output saved to: ${filename}`);
  } catch (error) {
    console.error(`❌ Error saving to file: ${error.message}`);
    process.exit(1);
  }
}

// Generate and display tickets
function generateTickets(options) {
  const tickets = [];
  
  for (let i = 0; i < options.count; i++) {
    tickets.push(tambola.generateTicket());
  }

  let output = '';

  switch (options.format) {
    case 'table':
      if (options.count === 1) {
        output = formatTicketAsTable(tickets[0]);
      } else {
        tickets.forEach((ticket, index) => {
          output += `\n📋 Ticket ${index + 1}:\n`;
          output += formatTicketAsTable(ticket);
          output += '\n';
        });
      }
      break;
      
    case 'json':
      const jsonData = options.count === 1 ? tickets[0] : tickets;
      output = options.pretty ? 
        JSON.stringify(jsonData, null, 2) : 
        JSON.stringify(jsonData);
      break;
      
    case 'csv':
      if (options.count === 1) {
        output = formatTicketAsCSV(tickets[0]);
      } else {
        output = tickets.map((ticket, index) => 
          `Ticket ${index + 1}\n${formatTicketAsCSV(ticket)}`
        ).join('\n\n');
      }
      break;
      
    default:
      console.error(`❌ Unknown format: ${options.format}`);
      process.exit(1);
  }

  if (options.output) {
    saveToFile(output, options.output);
  } else {
    console.log(output);
  }
}

// Generate and display sequences
function generateSequences(options) {
  const sequences = [];
  
  for (let i = 0; i < options.count; i++) {
    sequences.push(tambola.getDrawSequence());
  }

  let output = '';

  switch (options.format) {
    case 'array':
      if (options.count === 1) {
        output = formatSequenceAsArray(sequences[0]);
      } else {
        sequences.forEach((seq, index) => {
          output += `Sequence ${index + 1}: ${formatSequenceAsArray(seq)}\n`;
        });
      }
      break;
      
    case 'json':
      const jsonData = options.count === 1 ? sequences[0] : sequences;
      output = options.pretty ? 
        JSON.stringify(jsonData, null, 2) : 
        JSON.stringify(jsonData);
      break;
      
    case 'csv':
      if (options.count === 1) {
        output = formatSequenceAsCSV(sequences[0]);
      } else {
        output = sequences.map((seq, index) => 
          `Sequence ${index + 1},${formatSequenceAsCSV(seq)}`
        ).join('\n');
      }
      break;
      
    default:
      console.error(`❌ Unknown format: ${options.format}`);
      process.exit(1);
  }

  if (options.output) {
    saveToFile(output, options.output);
  } else {
    console.log(output);
  }
}

// Main CLI logic
function main() {
  // Show help
  if (!command || command === 'help' || command === '--help' || command === '-h') {
    console.log(helpText);
    return;
  }

  // Show version
  if (command === 'version' || command === '--version' || command === '-v') {
    console.log(`🎯 Tambola CLI v${version}`);
    return;
  }

  // Parse options
  const options = parseOptions(args);

  // Validate count
  if (options.count < 1 || options.count > 100) {
    console.error('❌ Count must be between 1 and 100');
    process.exit(1);
  }

  // Execute command
  switch (command) {
    case 'ticket':
    case 'tickets':
      generateTickets(options);
      break;
      
    case 'sequence':
    case 'sequences':
      generateSequences(options);
      break;
      
    default:
      console.error(`❌ Unknown command: ${command}`);
      console.log('\nRun "tambola help" for usage information');
      process.exit(1);
  }
}

// Run CLI
if (require.main === module) {
  main();
}

module.exports = { main, parseOptions, formatTicketAsTable, formatSequenceAsArray }; 