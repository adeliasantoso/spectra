import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import sonarjs from 'eslint-plugin-sonarjs'

export default [
  {
    ignores: ['dist/**']
  },
  {
    files: ['**/*.{js,jsx}'],
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      'sonarjs': sonarjs,
    },
    languageOptions: {
      ecmaVersion: 2020,
      globals: {
        ...globals.browser,
        process: 'readonly', // Add process as global for Node.js environment checks
      },
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    rules: {
      ...js.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,
      ...sonarjs.configs.recommended.rules,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      'no-unused-vars': ['error', { 
        varsIgnorePattern: '^[A-Z_]',
        argsIgnorePattern: '^_',
      }],
      'sonarjs/no-duplicate-string': ['error', { threshold: 5 }], // Allow 5 duplicates before error
      'sonarjs/cognitive-complexity': ['error', 25], // Increase to 25 for React components
      'sonarjs/no-identical-expressions': 'warn',
      'sonarjs/no-unused-collection': 'warn',
      'sonarjs/prefer-single-boolean-return': 'warn',
      'sonarjs/no-nested-conditional': 'warn', // Ternary operators are common in React
      'sonarjs/no-nested-functions': 'warn', // Event handlers often nested
      'sonarjs/unused-import': 'error',
      'sonarjs/no-unused-vars': 'warn',
      'sonarjs/no-dead-store': 'warn',
      'sonarjs/pseudo-random': 'off', // Math.random is fine for UI animations
    },
  },
]
