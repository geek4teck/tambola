const { spawn } = require('child_process');
const path = require('path');

describe('CLI Tests', () => {
  const cliPath = path.join(__dirname, '../bin/tambola.js');

  function runCLI(args = []) {
    return new Promise((resolve, reject) => {
      const child = spawn('node', [cliPath, ...args]);
      let stdout = '';
      let stderr = '';

      child.stdout.on('data', (data) => {
        stdout += data.toString();
      });

      child.stderr.on('data', (data) => {
        stderr += data.toString();
      });

      child.on('close', (code) => {
        resolve({ code, stdout, stderr });
      });

      child.on('error', (error) => {
        reject(error);
      });
    });
  }

  describe('Help and Version', () => {
    test('should show help when no arguments provided', async () => {
      const result = await runCLI();
      
      expect(result.code).toBe(0);
      expect(result.stdout).toContain('🎯 Tambola CLI');
      expect(result.stdout).toContain('Usage:');
      expect(result.stdout).toContain('ticket [options]');
      expect(result.stdout).toContain('sequence [options]');
    });

    test('should show help with --help flag', async () => {
      const result = await runCLI(['--help']);
      
      expect(result.code).toBe(0);
      expect(result.stdout).toContain('🎯 Tambola CLI');
      expect(result.stdout).toContain('Usage:');
    });

    test('should show version with --version flag', async () => {
      const result = await runCLI(['--version']);
      
      expect(result.code).toBe(0);
      expect(result.stdout).toContain('🎯 Tambola CLI v');
    });
  });

  describe('Ticket Generation', () => {
    test('should generate a single ticket in table format', async () => {
      const result = await runCLI(['ticket']);
      
      expect(result.code).toBe(0);
      expect(result.stdout).toContain('┌');
      expect(result.stdout).toContain('└');
      expect(result.stdout).toContain('│');
    });

    test('should generate multiple tickets', async () => {
      const result = await runCLI(['ticket', '-c', '2']);
      
      expect(result.code).toBe(0);
      expect(result.stdout).toContain('📋 Ticket 1:');
      expect(result.stdout).toContain('📋 Ticket 2:');
    });

    test('should generate ticket in JSON format', async () => {
      const result = await runCLI(['ticket', '-f', 'json']);
      
      expect(result.code).toBe(0);
      const output = result.stdout.trim();
      expect(() => JSON.parse(output)).not.toThrow();
      
      const ticket = JSON.parse(output);
      expect(Array.isArray(ticket)).toBe(true);
      expect(ticket.length).toBe(3);
      expect(ticket[0].length).toBe(9);
    });

    test('should generate ticket in pretty JSON format', async () => {
      const result = await runCLI(['ticket', '-f', 'json', '-p']);
      
      expect(result.code).toBe(0);
      const output = result.stdout.trim();
      expect(() => JSON.parse(output)).not.toThrow();
      
      const ticket = JSON.parse(output);
      expect(Array.isArray(ticket)).toBe(true);
    });

    test('should generate ticket in CSV format', async () => {
      const result = await runCLI(['ticket', '-f', 'csv']);
      
      expect(result.code).toBe(0);
      const lines = result.stdout.trim().split('\n');
      expect(lines.length).toBe(3); // 3 rows
      expect(lines[0].split(',').length).toBe(9); // 9 columns
    });

    test('should reject invalid count', async () => {
      const result = await runCLI(['ticket', '-c', '0']);
      
      expect(result.code).toBe(1);
      expect(result.stderr).toContain('Count must be between 1 and 100');
    });

    test('should reject invalid format', async () => {
      const result = await runCLI(['ticket', '-f', 'invalid']);
      
      expect(result.code).toBe(1);
      expect(result.stderr).toContain('Unsupported format');
    });
  });

  describe('Sequence Generation', () => {
    test('should generate a single sequence in array format', async () => {
      const result = await runCLI(['sequence']);
      
      expect(result.code).toBe(0);
      const output = result.stdout.trim();
      expect(output).toMatch(/^\[[\d,\s]+\]$/);
      
      // Parse the array and verify it has 90 unique numbers
      const sequence = JSON.parse(output);
      expect(sequence.length).toBe(90);
      expect(new Set(sequence).size).toBe(90);
      expect(Math.min(...sequence)).toBe(1);
      expect(Math.max(...sequence)).toBe(90);
    });

    test('should generate multiple sequences', async () => {
      const result = await runCLI(['sequence', '-c', '2']);
      
      expect(result.code).toBe(0);
      expect(result.stdout).toContain('Sequence 1:');
      expect(result.stdout).toContain('Sequence 2:');
    });

    test('should generate sequence in JSON format', async () => {
      const result = await runCLI(['sequence', '-f', 'json']);
      
      expect(result.code).toBe(0);
      const output = result.stdout.trim();
      expect(() => JSON.parse(output)).not.toThrow();
      
      const sequence = JSON.parse(output);
      expect(Array.isArray(sequence)).toBe(true);
      expect(sequence.length).toBe(90);
    });

    test('should generate sequence in CSV format', async () => {
      const result = await runCLI(['sequence', '-f', 'csv']);
      
      expect(result.code).toBe(0);
      const numbers = result.stdout.trim().split(',');
      expect(numbers.length).toBe(90);
      expect(numbers.every(n => !isNaN(parseInt(n)))).toBe(true);
    });
  });

  describe('Error Handling', () => {
    test('should handle unknown command', async () => {
      const result = await runCLI(['unknown']);
      
      expect(result.code).toBe(1);
      expect(result.stderr).toContain('Unknown command');
    });

    test('should handle invalid options gracefully', async () => {
      const result = await runCLI(['ticket', '--invalid']);
      
      expect(result.code).toBe(0); // Should still work, just ignore invalid option
    });
  });
}); 