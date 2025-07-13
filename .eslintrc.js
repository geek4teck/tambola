module.exports = {
  env: {
    node: true,
    es2022: true,
    jest: true,
  },
  extends: [
    'airbnb-base',
    'plugin:jsdoc/recommended',
    'plugin:jest/recommended',
    'plugin:node/recommended',
    'prettier',
  ],
  plugins: [
    'import',
    'jsdoc',
    'jest',
    'node',
    'prettier',
  ],
  parserOptions: {
    ecmaVersion: 2022,
    sourceType: 'script',
  },
  rules: {
    // Prettier integration
    'prettier/prettier': 'error',
    
    // Airbnb overrides for better code quality
    'no-console': 'off', // Allow console in CLI and examples
    'no-underscore-dangle': 'off', // Allow underscore dangle for private methods
    'class-methods-use-this': 'off', // Allow static methods
    'no-param-reassign': 'off', // Allow parameter reassignment when necessary
    'prefer-destructuring': ['error', {
      array: false,
      object: true,
    }],
    'no-restricted-syntax': [
      'error',
      'ForInStatement',
      'LabeledStatement',
      'WithStatement',
    ],
    'no-continue': 'off', // Allow continue statements
    'no-plusplus': 'off', // Allow increment/decrement operators
    
    // Import rules
    'import/extensions': ['error', 'ignorePackages'],
    'import/prefer-default-export': 'off',
    'import/no-extraneous-dependencies': ['error', {
      devDependencies: [
        '**/*.test.js',
        '**/*.spec.js',
        'jest.config.js',
        '.eslintrc.js',
      ],
    }],
    
    // JSDoc rules
    'jsdoc/require-jsdoc': ['error', {
      publicOnly: true,
      require: {
        FunctionDeclaration: true,
        MethodDefinition: true,
        ClassDeclaration: true,
      },
    }],
    'jsdoc/require-description': 'error',
    'jsdoc/require-param-description': 'error',
    'jsdoc/require-returns-description': 'error',
    'jsdoc/check-param-names': 'error',
    'jsdoc/check-tag-names': 'error',
    'jsdoc/check-types': 'error',
    'jsdoc/no-undefined-types': 'warn',
    'jsdoc/valid-types': 'error',
    
    // Node.js specific rules
    'node/no-unsupported-features/es-syntax': 'off', // Allow modern syntax
    'node/no-missing-import': 'off', // Allow relative imports
    'node/no-unpublished-import': 'off', // Allow dev dependencies in tests
    
    // Jest rules
    'jest/no-disabled-tests': 'warn',
    'jest/no-focused-tests': 'error',
    'jest/no-identical-title': 'error',
    'jest/prefer-to-have-length': 'warn',
    'jest/valid-expect': 'error',
    
    // Code quality rules
    'complexity': ['warn', 10],
    'max-depth': ['warn', 4],
    'max-lines': ['warn', 300],
    'max-lines-per-function': ['warn', 50],
    'max-params': ['warn', 4],
    'max-statements': ['warn', 20],
    'no-magic-numbers': ['warn', {
      ignore: [0, 1, 2, 3, 9, 10, 90],
      ignoreArrayIndexes: true,
      detectObjects: false,
    }],
  },
  overrides: [
    {
      files: ['**/*.test.js', '**/*.spec.js'],
      env: {
        jest: true,
      },
      rules: {
        'no-magic-numbers': 'off',
        'max-lines-per-function': 'off',
        'jsdoc/require-jsdoc': 'off',
      },
    },
    {
      files: ['bin/**/*.js'],
      rules: {
        'no-console': 'off',
        'jsdoc/require-jsdoc': 'off',
      },
    },
    {
      files: ['example.js'],
      rules: {
        'no-console': 'off',
        'jsdoc/require-jsdoc': 'off',
      },
    },
  ],
  settings: {
    jsdoc: {
      mode: 'jsdoc',
    },
  },
}; 