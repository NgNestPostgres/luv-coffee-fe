import { defineConfig, globalIgnores } from 'eslint/config';
import unusedImports from 'eslint-plugin-unused-imports';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import stylisticJs from '@stylistic/eslint-plugin-js'
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import js from '@eslint/js';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all
});

export default defineConfig([
  // globalIgnores(['projects/**/*']),
  {
    plugins: {
      'unused-imports': unusedImports,
      'simple-import-sort': simpleImportSort,
      '@stylistic/js': stylisticJs
    },

    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',

      parserOptions: {
        project: ['tsconfig.json'],
        createDefaultProgram: true,
      },
    },
  },
  {
    files: ['**/*.ts'],
    extends: compat.extends(
      'eslint:recommended',
      'google',
      'plugin:@typescript-eslint/recommended',
      'plugin:@angular-eslint/recommended',
      'plugin:@angular-eslint/template/process-inline-templates',
    ),
    rules: {
      // eslint
      'class-methods-use-this': 'off',
      'indent': ['error', 2],
      'import/prefer-default-export': 'off',
      'max-len': ['error', 120],
      'no-plusplus': 'off',
      'new-cap': 0,
      'require-jsdoc': 'off',
      'valid-jsdoc': 'off',

      // @stylistic/js
      'object-curly-spacing': ['error', 'always'],

      // simple-import-sort
      'simple-import-sort/imports': 'error',
      'simple-import-sort/exports': 'error',

      // 'unused-imports/no-unused-imports': 'error',
      'unused-imports/no-unused-imports': 'error',
      'unused-imports/no-unused-vars': ['warn', {
        vars: 'all',
        varsIgnorePattern: '^_',
        args: 'after-used',
        argsIgnorePattern: '^_',
      }],

      '@typescript-eslint/no-unused-expressions': ['error', {
        allowTernary: true,
      }],

      '@typescript-eslint/dot-notation': ['error', {
        allowPrivateClassPropertyAccess: true,
        allowProtectedClassPropertyAccess: true,
      }],

      '@typescript-eslint/no-use-before-define': ['error', {
        functions: false,
      }],

      '@typescript-eslint/comma-dangle': 'off',
      '@typescript-eslint/lines-between-class-members': 'off',
      '@typescript-eslint/no-shadow': 'error',
      '@typescript-eslint/no-explicit-any': 0,

      '@angular-eslint/directive-selector': ['error', {
        type: 'attribute',
        prefix: 'anp',
        style: 'camelCase',
      }],

      '@angular-eslint/component-selector': ['error', {
        type: 'element',
        prefix: ['anp', 'ngx'],
        style: 'kebab-case',
      }],
    },
  },
  {
    files: ['**/*.html'],
    extends: compat.extends('plugin:@angular-eslint/template/recommended'),
    rules: {},
  }
]);