#!/usr/bin/env node

/**
 * Test script to verify all components work for GitHub Actions
 */

const fs = require('fs');
const path = require('path');

console.log('🧪 Testing GitHub Actions compatibility...\n');

// Test 1: Check if main files exist
console.log('1. Checking file existence:');
const files = [
  'index.js',
  'bin/tambola.js',
  'example.js',
  'package.json',
  'jest.config.js'
];

files.forEach(file => {
  const exists = fs.existsSync(file);
  console.log(`   ${exists ? '✅' : '❌'} ${file}`);
  if (!exists) {
    console.error(`   Missing file: ${file}`);
    process.exit(1);
  }
});

// Test 2: Check package.json
console.log('\n2. Checking package.json:');
try {
  const pkg = require('./package.json');
  console.log(`   ✅ Package name: ${pkg.name}`);
  console.log(`   ✅ Package version: ${pkg.version}`);
  console.log(`   ✅ Main file: ${pkg.main}`);
  console.log(`   ✅ Bin file: ${pkg.bin.tambola}`);
  
  // Check required scripts
  const requiredScripts = ['test', 'test:coverage', 'example', 'cli'];
  requiredScripts.forEach(script => {
    if (pkg.scripts[script]) {
      console.log(`   ✅ Script: ${script}`);
    } else {
      console.log(`   ❌ Missing script: ${script}`);
      process.exit(1);
    }
  });
} catch (error) {
  console.error(`   ❌ Error reading package.json: ${error.message}`);
  process.exit(1);
}

// Test 3: Test module loading
console.log('\n3. Testing module loading:');
try {
  const tambola = require('./index.js');
  console.log(`   ✅ Module loaded successfully`);
  console.log(`   ✅ generateTicket function: ${typeof tambola.generateTicket}`);
  console.log(`   ✅ getDrawSequence function: ${typeof tambola.getDrawSequence}`);
} catch (error) {
  console.error(`   ❌ Error loading module: ${error.message}`);
  process.exit(1);
}

// Test 4: Test CLI loading
console.log('\n4. Testing CLI loading:');
try {
  const cli = require('./bin/tambola.js');
  console.log(`   ✅ CLI module loaded successfully`);
  console.log(`   ✅ main function: ${typeof cli.main}`);
} catch (error) {
  console.error(`   ❌ Error loading CLI: ${error.message}`);
  process.exit(1);
}

// Test 5: Test Jest configuration
console.log('\n5. Testing Jest configuration:');
try {
  const jestConfig = require('./jest.config.js');
  console.log(`   ✅ Jest config loaded successfully`);
  console.log(`   ✅ Test environment: ${jestConfig.testEnvironment}`);
} catch (error) {
  console.error(`   ❌ Error loading Jest config: ${error.message}`);
  process.exit(1);
}

console.log('\n🎉 All tests passed! GitHub Actions should work correctly.');
console.log('\nTo test locally:');
console.log('  npm test');
console.log('  npm run example');
console.log('  npm run cli -- --help'); 