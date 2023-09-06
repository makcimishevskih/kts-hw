import path from 'path';

module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
    createDefaultProgram: true,
  },
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'prettier',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:react/recommended',
    'plugin:import/typescript',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
  ],
  plugins: ['@typescript-eslint', 'import', 'prettier', 'react', 'react-hooks'],
  rules: {
    // 'import/no-unresolved': [2, { caseSensitive: false }],
    'react/react-in-jsx-scope': 'off',
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx', '.ts', '.tsx'] }],
    'no-console': 'warn',
    'import/order': [
      'error',
      {
        groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
        alphabetize: {
          order: 'asc',
        },
        pathGroups: [
          {
            pattern: './**/*.scss',
            group: 'sibling',
            position: 'after',
          },
        ],
      },
    ],
  },
  settings: {
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx', '.scss', '.svg', '.png', '.jpg'],
    },
    'import/resolver': {
      // node: {
      //   extensions: ['.js', '.jsx', '.ts', '.tsx'],
      //   paths: ['src'],
      //   moduleDirectory: ['node_modules', 'src/'],
      // },
      typescript: {
        // project: path.resolve('./tsconfig.json'),
        project: 'packages/*/tsconfig.json',
        // project: './tsconfig.json',
      },
    },
    'import/external-module-folders': ['node_modules', 'node_modules/@types'],
    react: {
      version: 'detect',
    },
  },
};
