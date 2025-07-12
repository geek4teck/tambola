const tambola = require('../index.js');

describe('Performance Tests', () => {
  describe('Ticket Generation Performance', () => {
    test('should generate 1000 tickets within reasonable time', () => {
      const startTime = Date.now();
      const tickets = [];
      
      for (let i = 0; i < 1000; i++) {
        const ticket = tambola.generateTicket();
        tickets.push(ticket);
      }
      
      const endTime = Date.now();
      const duration = endTime - startTime;
      
      // Should complete within 5 seconds
      expect(duration).toBeLessThan(5000);
      
      // All tickets should be valid
      tickets.forEach(ticket => {
        expect(ticket).toHaveLength(3);
        ticket.forEach(row => {
          expect(row).toHaveLength(9);
          const numbers = row.filter(cell => cell !== 0);
          expect(numbers).toHaveLength(5);
        });
      });
    });

    test('should generate 10000 tickets without memory issues', () => {
      const startTime = Date.now();
      const tickets = [];
      
      for (let i = 0; i < 10000; i++) {
        const ticket = tambola.generateTicket();
        tickets.push(ticket);
      }
      
      const endTime = Date.now();
      const duration = endTime - startTime;
      
      // Should complete within 30 seconds
      expect(duration).toBeLessThan(30000);
      
      // Verify a sample of tickets are valid
      for (let i = 0; i < 100; i++) {
        const randomIndex = Math.floor(Math.random() * tickets.length);
        const ticket = tickets[randomIndex];
        
        expect(ticket).toHaveLength(3);
        ticket.forEach(row => {
          expect(row).toHaveLength(9);
          const numbers = row.filter(cell => cell !== 0);
          expect(numbers).toHaveLength(5);
        });
      }
    });

    test('should maintain consistent performance across multiple runs', () => {
      const durations = [];
      
      for (let run = 0; run < 5; run++) {
        const startTime = Date.now();
        
        for (let i = 0; i < 100; i++) {
          tambola.generateTicket();
        }
        
        const endTime = Date.now();
        durations.push(endTime - startTime);
      }
      
      // Calculate average and standard deviation
      const avgDuration = durations.reduce((a, b) => a + b, 0) / durations.length;
      const variance = durations.reduce((acc, val) => acc + Math.pow(val - avgDuration, 2), 0) / durations.length;
      const stdDev = Math.sqrt(variance);
      
      // Performance should be consistent (low standard deviation relative to mean)
      expect(stdDev / avgDuration).toBeLessThan(0.5); // Less than 50% coefficient of variation
    });
  });

  describe('Draw Sequence Performance', () => {
    test('should generate 1000 draw sequences within reasonable time', () => {
      const startTime = Date.now();
      const sequences = [];
      
      for (let i = 0; i < 1000; i++) {
        const sequence = tambola.getDrawSequence();
        sequences.push(sequence);
      }
      
      const endTime = Date.now();
      const duration = endTime - startTime;
      
      // Should complete within 3 seconds
      expect(duration).toBeLessThan(3000);
      
      // All sequences should be valid
      sequences.forEach(sequence => {
        expect(sequence).toHaveLength(90);
        const uniqueNumbers = new Set(sequence);
        expect(uniqueNumbers.size).toBe(90);
      });
    });

    test('should generate 10000 draw sequences without memory issues', () => {
      const startTime = Date.now();
      const sequences = [];
      
      for (let i = 0; i < 10000; i++) {
        const sequence = tambola.getDrawSequence();
        sequences.push(sequence);
      }
      
      const endTime = Date.now();
      const duration = endTime - startTime;
      
      // Should complete within 20 seconds
      expect(duration).toBeLessThan(20000);
      
      // Verify a sample of sequences are valid
      for (let i = 0; i < 100; i++) {
        const randomIndex = Math.floor(Math.random() * sequences.length);
        const sequence = sequences[randomIndex];
        
        expect(sequence).toHaveLength(90);
        const uniqueNumbers = new Set(sequence);
        expect(uniqueNumbers.size).toBe(90);
      }
    });
  });

  describe('Concurrent Operations', () => {
    test('should handle concurrent ticket generation', () => {
      const promises = [];
      const startTime = Date.now();
      
      // Generate 100 tickets concurrently
      for (let i = 0; i < 100; i++) {
        promises.push(
          new Promise((resolve) => {
            const ticket = tambola.generateTicket();
            resolve(ticket);
          })
        );
      }
      
      return Promise.all(promises).then(tickets => {
        const endTime = Date.now();
        const duration = endTime - startTime;
        
        // Should complete within 2 seconds
        expect(duration).toBeLessThan(2000);
        
        // All tickets should be valid
        tickets.forEach(ticket => {
          expect(ticket).toHaveLength(3);
          ticket.forEach(row => {
            expect(row).toHaveLength(9);
            const numbers = row.filter(cell => cell !== 0);
            expect(numbers).toHaveLength(5);
          });
        });
      });
    });

    test('should handle concurrent draw sequence generation', () => {
      const promises = [];
      const startTime = Date.now();
      
      // Generate 100 draw sequences concurrently
      for (let i = 0; i < 100; i++) {
        promises.push(
          new Promise((resolve) => {
            const sequence = tambola.getDrawSequence();
            resolve(sequence);
          })
        );
      }
      
      return Promise.all(promises).then(sequences => {
        const endTime = Date.now();
        const duration = endTime - startTime;
        
        // Should complete within 1 second
        expect(duration).toBeLessThan(1000);
        
        // All sequences should be valid
        sequences.forEach(sequence => {
          expect(sequence).toHaveLength(90);
          const uniqueNumbers = new Set(sequence);
          expect(uniqueNumbers.size).toBe(90);
        });
      });
    });
  });

  describe('Memory Usage', () => {
    test('should not cause memory leaks during extended use', () => {
      const initialMemory = process.memoryUsage().heapUsed;
      const tickets = [];
      
      // Generate many tickets
      for (let i = 0; i < 5000; i++) {
        const ticket = tambola.generateTicket();
        tickets.push(ticket);
      }
      
      // Force garbage collection if available
      if (global.gc) {
        global.gc();
      }
      
      const finalMemory = process.memoryUsage().heapUsed;
      const memoryIncrease = finalMemory - initialMemory;
      
      // Memory increase should be reasonable (less than 50MB)
      expect(memoryIncrease).toBeLessThan(50 * 1024 * 1024);
    });

    test('should not cause memory leaks during draw sequence generation', () => {
      const initialMemory = process.memoryUsage().heapUsed;
      const sequences = [];
      
      // Generate many draw sequences
      for (let i = 0; i < 5000; i++) {
        const sequence = tambola.getDrawSequence();
        sequences.push(sequence);
      }
      
      // Force garbage collection if available
      if (global.gc) {
        global.gc();
      }
      
      const finalMemory = process.memoryUsage().heapUsed;
      const memoryIncrease = finalMemory - initialMemory;
      
      // Memory increase should be reasonable (less than 50MB)
      expect(memoryIncrease).toBeLessThan(50 * 1024 * 1024);
    });
  });
}); 