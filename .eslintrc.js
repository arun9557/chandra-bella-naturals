module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'prettier'
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    // Code Quality
    'no-console': 'warn',
    'no-debugger': 'error',
    'no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    'no-var': 'error',
    'prefer-const': 'error',
    'prefer-arrow-callback': 'error',
    
    // Best Practices
    'eqeqeq': ['error', 'always'],
    'curly': ['error', 'all'],
    'no-eval': 'error',
    'no-implied-eval': 'error',
    'no-new-func': 'error',
    'no-script-url': 'error',
    
    // Style
    'indent': ['error', 4, { SwitchCase: 1 }],
    'quotes': ['error', 'single', { avoidEscape: true }],
    'semi': ['error', 'always'],
    'comma-dangle': ['error', 'never'],
    
    // ES6+
    'arrow-spacing': 'error',
    'no-duplicate-imports': 'error',
    'object-shorthand': 'error',
    'prefer-template': 'error',
    
    // Accessibility
    'jsx-a11y/alt-text': 'off', // We're not using JSX
    
    // Performance
    'no-loop-func': 'error',
    'no-new-object': 'error',
    'no-new-wrappers': 'error'
  },
  globals: {
    // Global variables available in the app
    'gtag': 'readonly',
    'fbq': 'readonly'
  },
  overrides: [
    {
      files: ['src/sw.js'],
      env: {
        serviceworker: true,
        browser: false
      },
      globals: {
        'self': 'readonly',
        'caches': 'readonly',
        'clients': 'readonly',
        'skipWaiting': 'readonly'
      }
    },
    {
      files: ['vite.config.js'],
      env: {
        node: true,
        browser: false
      }
    }
  ]
};
