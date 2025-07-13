# Tambola CLI Guide

## Overview

The Tambola package includes a powerful Command Line Interface (CLI) that allows you to generate tickets and draw sequences directly from the terminal. This guide covers all CLI features, options, and usage patterns.

## Table of Contents

- [Installation](#installation)
- [Basic Usage](#basic-usage)
- [Commands](#commands)
  - [ticket](#ticket-command)
  - [sequence](#sequence-command)
- [Options](#options)
- [Output Formats](#output-formats)
- [Examples](#examples)
- [Error Handling](#error-handling)
- [Advanced Usage](#advanced-usage)

## Installation

### Global Installation
```bash
npm install -g tambola
```

### Local Usage
```bash
npx tambola [command] [options]
```

### From Project
```bash
npm run cli -- [command] [options]
```

## Basic Usage

### Show Help
```bash
tambola --help
# or
tambola help
```

### Show Version
```bash
tambola --version
# or
tambola version
```

## Commands

### ticket

Generates Tambola tickets in various formats.

**Syntax:**
```bash
tambola ticket [options]
```

**Options:**
- `-c, --count <number>`: Number of tickets to generate (1-100, default: 1)
- `-f, --format <format>`: Output format (table, json, csv, default: table)
- `-p, --pretty`: Pretty print JSON output
- `-o, --output <file>`: Save output to file

**Examples:**
```bash
# Generate a single ticket in table format
tambola ticket

# Generate 5 tickets
tambola ticket -c 5

# Generate ticket in JSON format
tambola ticket -f json

# Generate pretty JSON
tambola ticket -f json -p

# Save to file
tambola ticket -o tickets.json
```

### sequence

Generates draw sequences in various formats.

**Syntax:**
```bash
tambola sequence [options]
```

**Options:**
- `-c, --count <number>`: Number of sequences to generate (1-100, default: 1)
- `-f, --format <format>`: Output format (array, json, csv, default: array)
- `-p, --pretty`: Pretty print JSON output
- `-o, --output <file>`: Save output to file

**Examples:**
```bash
# Generate a single sequence
tambola sequence

# Generate 3 sequences
tambola sequence -c 3

# Generate sequence in JSON format
tambola sequence -f json

# Save to CSV file
tambola sequence -f csv -o draw.csv
```

## Options

### Count Option (`-c, --count`)

Specifies the number of items to generate.

**Valid Range:** 1-100
**Default:** 1

```bash
# Generate 10 tickets
tambola ticket -c 10

# Generate 5 sequences
tambola sequence -c 5
```

### Format Option (`-f, --format`)

Specifies the output format.

**For Tickets:**
- `table`: ASCII table format (default)
- `json`: JSON array format
- `csv`: Comma-separated values

**For Sequences:**
- `array`: Array string format (default)
- `json`: JSON array format
- `csv`: Comma-separated values

```bash
# Table format (default for tickets)
tambola ticket

# JSON format
tambola ticket -f json

# CSV format
tambola ticket -f csv
```

### Pretty Option (`-p, --pretty`)

Enables pretty printing for JSON output.

```bash
# Pretty JSON
tambola ticket -f json -p
tambola sequence -f json -p
```

### Output Option (`-o, --output`)

Saves output to a file instead of printing to console.

```bash
# Save ticket to file
tambola ticket -o my_ticket.json

# Save sequence to CSV
tambola sequence -f csv -o draw_sequence.csv
```

## Output Formats

### Table Format (Tickets)

```
┌───────────────────────────────────┐
│  4 │    │ 22 │    │ 44 │    │ 61 │    │ 83 │
├───────────────────────────────────┤
│    │    │ 27 │ 36 │ 47 │    │ 66 │ 72 │    │
├───────────────────────────────────┤
│    │ 13 │    │ 39 │    │ 56 │    │ 75 │ 86 │
└───────────────────────────────────┘
```

### JSON Format (Tickets)

```json
[
  [4, 0, 22, 0, 0, 0, 61, 0, 83],
  [0, 0, 27, 36, 47, 0, 66, 72, 0],
  [0, 13, 0, 39, 0, 56, 0, 75, 86]
]
```

### Pretty JSON Format (Tickets)

```json
[
  [
    4,
    0,
    22,
    0,
    0,
    0,
    61,
    0,
    83
  ],
  [
    0,
    0,
    27,
    36,
    47,
    0,
    66,
    72,
    0
  ],
  [
    0,
    13,
    0,
    39,
    0,
    56,
    0,
    75,
    86
  ]
]
```

### CSV Format (Tickets)

```csv
4,,22,,,,61,,83
,,27,36,47,,66,72,
,13,,39,,56,,75,86
```

### Array Format (Sequences)

```
[80, 64, 73, 17, 32, 15, 82, 10, 45, 78, 6, 84, 89, 27, 9, 7, 34, 87, 42, 71, ...]
```

### JSON Format (Sequences)

```json
[80, 64, 73, 17, 32, 15, 82, 10, 45, 78, 6, 84, 89, 27, 9, 7, 34, 87, 42, 71]
```

### CSV Format (Sequences)

```csv
80,64,73,17,32,15,82,10,45,78,6,84,89,27,9,7,34,87,42,71
```

## Examples

### Basic Ticket Generation

```bash
# Generate a single ticket
tambola ticket

# Generate multiple tickets
tambola ticket -c 5

# Generate ticket in different formats
tambola ticket -f json
tambola ticket -f csv
```

### Basic Sequence Generation

```bash
# Generate a single sequence
tambola sequence

# Generate multiple sequences
tambola sequence -c 3

# Generate sequence in different formats
tambola sequence -f json
tambola sequence -f csv
```

### File Output

```bash
# Save ticket to JSON file
tambola ticket -f json -p -o ticket.json

# Save sequence to CSV file
tambola sequence -f csv -o sequence.csv

# Generate multiple tickets and save
tambola ticket -c 10 -f json -o tickets.json
```

### Event Preparation

```bash
# Generate 100 tickets for an event
tambola ticket -c 100 -f json -o event_tickets.json

# Generate 5 draw sequences for backup
tambola sequence -c 5 -f json -o draw_sequences.json
```

### Integration with Other Tools

```bash
# Pipe to jq for processing
tambola ticket -f json | jq '.[0]'

# Save to file and process with grep
tambola sequence -f csv -o temp.csv && grep "45" temp.csv

# Use in shell script
TICKET=$(tambola ticket -f json)
echo "Generated ticket: $TICKET"
```

## Error Handling

### Invalid Count
```bash
tambola ticket -c 0
# Error: Count must be between 1 and 100

tambola ticket -c 101
# Error: Count must be between 1 and 100
```

### Invalid Format
```bash
tambola ticket -f invalid
# Error: Unknown format: invalid
```

### File Write Errors
```bash
tambola ticket -o /invalid/path/file.json
# Error: Error saving to file: EACCES: permission denied
```

### Unknown Command
```bash
tambola unknown
# Error: Unknown command: unknown
```

## Advanced Usage

### Batch Processing

```bash
#!/bin/bash
# Generate tickets for multiple events

for event in "corporate" "family" "charity"; do
  echo "Generating tickets for $event event..."
  tambola ticket -c 50 -f json -o "${event}_tickets.json"
done
```

### Automated Testing

```bash
#!/bin/bash
# Test CLI functionality

echo "Testing ticket generation..."
tambola ticket -c 1 -f json > /dev/null && echo "✓ Ticket generation works"

echo "Testing sequence generation..."
tambola sequence -c 1 -f json > /dev/null && echo "✓ Sequence generation works"

echo "Testing file output..."
tambola ticket -o test.json && rm test.json && echo "✓ File output works"
```

### Integration with Node.js Scripts

```javascript
const { execSync } = require('child_process');

// Generate ticket using CLI
const ticketOutput = execSync('tambola ticket -f json', { encoding: 'utf8' });
const ticket = JSON.parse(ticketOutput);

// Generate sequence using CLI
const sequenceOutput = execSync('tambola sequence -f json', { encoding: 'utf8' });
const sequence = JSON.parse(sequenceOutput);

console.log('Generated ticket:', ticket);
console.log('Generated sequence:', sequence);
```

### Shell Aliases

Add to your shell configuration file (`.bashrc`, `.zshrc`, etc.):

```bash
# Quick ticket generation
alias ticket='tambola ticket'

# Quick sequence generation
alias sequence='tambola sequence'

# Generate event tickets
alias event-tickets='tambola ticket -c 100 -f json -p'
```

## Troubleshooting

### Common Issues

1. **Command not found**
   ```bash
   # Install globally
   npm install -g tambola
   
   # Or use npx
   npx tambola ticket
   ```

2. **Permission denied when saving files**
   ```bash
   # Check directory permissions
   ls -la /path/to/directory
   
   # Use relative paths
   tambola ticket -o ./ticket.json
   ```

3. **Invalid JSON output**
   ```bash
   # Use pretty format for readable JSON
   tambola ticket -f json -p
   ```

### Performance Tips

1. **For large batches, use JSON format**
   ```bash
   # Faster than table format for 100+ tickets
   tambola ticket -c 1000 -f json -o tickets.json
   ```

2. **Use file output for large datasets**
   ```bash
   # Avoid terminal buffer issues
   tambola sequence -c 100 -f csv -o sequences.csv
   ```

---

**Next Steps:**
- [API Reference](API_REFERENCE.md)
- [Game Rules](GAME_RULES.md)
- [Testing Guide](TESTING_GUIDE.md)
- [Contributing Guidelines](CONTRIBUTING.md) 