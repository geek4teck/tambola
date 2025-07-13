/**
 * @fileoverview CLI Module Coverage Tests
 * 
 * Tests for CLI module functions to ensure complete coverage
 * 
 * @author Vishal Goyal
 * @version 4.1.0
 * @license ISC
 */

const {
  parseOptions,
  validateOptions,
  formatTicketAsTable,
  formatSequenceAsArray,
  generateTickets,
  generateSequences,
} = require('../bin/tambola.js');

// Mock fs module
const fs = require('fs');
jest.mock('fs');

describe('CLI Module Coverage Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('parseOptions', () => {
    test('should parse default options for ticket command', () => {
      const args = ['ticket'];
      const options = parseOptions(args, 'ticket');
      
      expect(options).toEqual({
        count: 1,
        format: 'table',
        pretty: false,
        output: null,
      });
    });

    test('should parse default options for sequence command', () => {
      const args = ['sequence'];
      const options = parseOptions(args, 'sequence');
      
      expect(options).toEqual({
        count: 1,
        format: 'array',
        pretty: false,
        output: null,
      });
    });

    test('should parse count option', () => {
      const args = ['ticket', '-c', '5'];
      const options = parseOptions(args, 'ticket');
      
      expect(options.count).toBe(5);
    });

    test('should parse format option', () => {
      const args = ['ticket', '-f', 'json'];
      const options = parseOptions(args, 'ticket');
      
      expect(options.format).toBe('json');
    });

    test('should parse pretty option', () => {
      const args = ['ticket', '-p'];
      const options = parseOptions(args, 'ticket');
      
      expect(options.pretty).toBe(true);
    });

    test('should parse output option', () => {
      const args = ['ticket', '-o', 'output.txt'];
      const options = parseOptions(args, 'ticket');
      
      expect(options.output).toBe('output.txt');
    });

    test('should handle unknown options gracefully', () => {
      const args = ['ticket', '--unknown', 'value'];
      const options = parseOptions(args, 'ticket');
      
      expect(options).toEqual({
        count: 1,
        format: 'table',
        pretty: false,
        output: null,
      });
    });

    test('should handle missing count value', () => {
      const args = ['ticket', '-c'];
      const options = parseOptions(args, 'ticket');
      
      expect(options.count).toBe(1);
    });

    test('should handle invalid count value', () => {
      const args = ['ticket', '-c', 'invalid'];
      const options = parseOptions(args, 'ticket');
      
      expect(options.count).toBe(1);
    });

    test('should handle missing format value', () => {
      const args = ['ticket', '-f'];
      const options = parseOptions(args, 'ticket');
      
      expect(options.format).toBe('table');
    });

    test('should handle missing output value', () => {
      const args = ['ticket', '-o'];
      const options = parseOptions(args, 'ticket');
      
      expect(options.output).toBe(null);
    });

    test('should handle multiple options', () => {
      const args = ['ticket', '-c', '3', '-f', 'json', '-p', '-o', 'test.txt'];
      const options = parseOptions(args, 'ticket');
      
      expect(options).toEqual({
        count: 3,
        format: 'json',
        pretty: true,
        output: 'test.txt',
      });
    });
  });

  describe('validateOptions', () => {
    test('should validate correct options', () => {
      const options = { count: 5, format: 'json', pretty: false, output: null };
      
      expect(() => validateOptions(options, 'ticket')).not.toThrow();
    });

    test('should reject count below minimum', () => {
      const options = { count: 0, format: 'table', pretty: false, output: null };
      
      expect(() => validateOptions(options, 'ticket')).toThrow('Count must be between 1 and 100');
    });

    test('should reject count above maximum', () => {
      const options = { count: 101, format: 'table', pretty: false, output: null };
      
      expect(() => validateOptions(options, 'ticket')).toThrow('Count must be between 1 and 100');
    });

    test('should reject unsupported ticket format', () => {
      const options = { count: 1, format: 'invalid', pretty: false, output: null };
      
      expect(() => validateOptions(options, 'ticket')).toThrow('Unsupported format: invalid');
    });

    test('should reject unsupported sequence format', () => {
      const options = { count: 1, format: 'invalid', pretty: false, output: null };
      
      expect(() => validateOptions(options, 'sequence')).toThrow('Unsupported format: invalid');
    });

    test('should accept all supported ticket formats', () => {
      const formats = ['table', 'json', 'csv'];
      
      formats.forEach(format => {
        const options = { count: 1, format, pretty: false, output: null };
        expect(() => validateOptions(options, 'ticket')).not.toThrow();
      });
    });

    test('should accept all supported sequence formats', () => {
      const formats = ['array', 'json', 'csv'];
      
      formats.forEach(format => {
        const options = { count: 1, format, pretty: false, output: null };
        expect(() => validateOptions(options, 'sequence')).not.toThrow();
      });
    });
  });

  describe('formatTicketAsTable', () => {
    test('should format ticket as table', () => {
      const ticket = [
        [1, 0, 21, 0, 0, 51, 0, 71, 81],
        [0, 13, 0, 34, 45, 0, 65, 0, 88],
        [7, 19, 0, 39, 0, 59, 67, 0, 0],
      ];
      
      const result = formatTicketAsTable(ticket);
      
      expect(result).toContain('┌');
      expect(result).toContain('┐');
      expect(result).toContain('│');
      expect(result).toContain('└');
      expect(result).toContain('┘');
      expect(result).toContain(' 1 ');
      expect(result).toContain(' 21 ');
      expect(result).toContain('  ');
    });

    test('should format ticket with single digit numbers', () => {
      const ticket = [
        [1, 0, 2, 0, 0, 5, 0, 7, 8],
        [0, 1, 0, 3, 4, 0, 6, 0, 8],
        [1, 1, 0, 3, 0, 5, 6, 0, 0],
      ];
      
      const result = formatTicketAsTable(ticket);
      
      expect(result).toContain(' 1 ');
      expect(result).toContain(' 2 ');
      expect(result).toContain('  ');
    });

    test('should format ticket with double digit numbers', () => {
      const ticket = [
        [10, 0, 21, 0, 0, 51, 0, 71, 81],
        [0, 13, 0, 34, 45, 0, 65, 0, 88],
        [17, 19, 0, 39, 0, 59, 67, 0, 0],
      ];
      
      const result = formatTicketAsTable(ticket);
      
      expect(result).toContain('10 ');
      expect(result).toContain('21 ');
      expect(result).toContain('  ');
    });
  });

  describe('formatSequenceAsArray', () => {
    test('should format sequence as array string', () => {
      const sequence = [1, 2, 3, 4, 5];
      
      const result = formatSequenceAsArray(sequence);
      
      expect(result).toBe('[1, 2, 3, 4, 5]');
    });

    test('should handle empty sequence', () => {
      const sequence = [];
      
      const result = formatSequenceAsArray(sequence);
      
      expect(result).toBe('[]');
    });

    test('should handle single element sequence', () => {
      const sequence = [42];
      
      const result = formatSequenceAsArray(sequence);
      
      expect(result).toBe('[42]');
    });

    test('should handle large sequence', () => {
      const sequence = Array.from({ length: 10 }, (_, i) => i + 1);
      
      const result = formatSequenceAsArray(sequence);
      
      expect(result).toBe('[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]');
    });
  });



  describe('generateTickets', () => {
    test('should generate single ticket in table format', () => {
      const options = { count: 1, format: 'table', pretty: false, output: null };
      
      const result = generateTickets(options);
      
      expect(result).toContain('┌');
      expect(result).toContain('┐');
      expect(result).toContain('│');
    });

    test('should generate multiple tickets in table format', () => {
      const options = { count: 2, format: 'table', pretty: false, output: null };
      
      const result = generateTickets(options);
      
      expect(result).toContain('Ticket 1:');
      expect(result).toContain('Ticket 2:');
    });

    test('should generate ticket in JSON format', () => {
      const options = { count: 1, format: 'json', pretty: false, output: null };
      
      const result = generateTickets(options);
      
      expect(() => JSON.parse(result)).not.toThrow();
    });

    test('should generate ticket in pretty JSON format', () => {
      const options = { count: 1, format: 'json', pretty: true, output: null };
      
      const result = generateTickets(options);
      
      expect(() => JSON.parse(result)).not.toThrow();
      expect(result).toContain('\n');
    });

    test('should generate multiple tickets in JSON format', () => {
      const options = { count: 2, format: 'json', pretty: false, output: null };
      
      const result = generateTickets(options);
      
      expect(() => JSON.parse(result)).not.toThrow();
      const parsed = JSON.parse(result);
      expect(Array.isArray(parsed)).toBe(true);
      expect(parsed.length).toBe(2);
    });

    test('should generate ticket in CSV format', () => {
      const options = { count: 1, format: 'csv', pretty: false, output: null };
      
      const result = generateTickets(options);
      
      expect(result).toContain(',');
      expect(result).toContain('\n');
    });

    test('should generate multiple tickets in CSV format', () => {
      const options = { count: 2, format: 'csv', pretty: false, output: null };
      
      const result = generateTickets(options);
      
      expect(result).toContain('Ticket 1');
      expect(result).toContain('Ticket 2');
      expect(result).toContain(',');
      expect(result).toContain('\n');
    });

    test('should throw error for unsupported format', () => {
      const options = { count: 1, format: 'invalid', pretty: false, output: null };
      
      expect(() => generateTickets(options)).toThrow('Unsupported format: invalid');
    });
  });

  describe('generateSequences', () => {
    test('should generate single sequence in array format', () => {
      const options = { count: 1, format: 'array', pretty: false, output: null };
      
      const result = generateSequences(options);
      
      expect(result).toMatch(/^\[[\d, ]+\]$/);
    });

    test('should generate multiple sequences in array format', () => {
      const options = { count: 2, format: 'array', pretty: false, output: null };
      
      const result = generateSequences(options);
      
      expect(result).toContain('Sequence 1:');
      expect(result).toContain('Sequence 2:');
    });

    test('should generate sequence in JSON format', () => {
      const options = { count: 1, format: 'json', pretty: false, output: null };
      
      const result = generateSequences(options);
      
      expect(() => JSON.parse(result)).not.toThrow();
    });

    test('should generate sequence in pretty JSON format', () => {
      const options = { count: 1, format: 'json', pretty: true, output: null };
      
      const result = generateSequences(options);
      
      expect(() => JSON.parse(result)).not.toThrow();
      expect(result).toContain('\n');
    });

    test('should generate multiple sequences in JSON format', () => {
      const options = { count: 2, format: 'json', pretty: false, output: null };
      
      const result = generateSequences(options);
      
      expect(() => JSON.parse(result)).not.toThrow();
      const parsed = JSON.parse(result);
      expect(Array.isArray(parsed)).toBe(true);
      expect(parsed.length).toBe(2);
    });

    test('should generate sequence in CSV format', () => {
      const options = { count: 1, format: 'csv', pretty: false, output: null };
      
      const result = generateSequences(options);
      
      expect(result).toContain(',');
      expect(result.split(',').length).toBe(90);
    });

    test('should generate multiple sequences in CSV format', () => {
      const options = { count: 2, format: 'csv', pretty: false, output: null };
      
      const result = generateSequences(options);
      
      expect(result).toContain('Sequence 1,');
      expect(result).toContain('Sequence 2,');
      expect(result).toContain(',');
      expect(result).toContain('\n');
    });

    test('should throw error for unsupported format', () => {
      const options = { count: 1, format: 'invalid', pretty: false, output: null };
      
      expect(() => generateSequences(options)).toThrow('Unsupported format: invalid');
    });
  });
}); 