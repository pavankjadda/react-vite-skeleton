import { defineConfig } from 'eslint/config';
import react from 'eslint-plugin-react';
import typescriptEslint from '@typescript-eslint/eslint-plugin';
import pluginQuery from '@tanstack/eslint-plugin-query';
import globals from 'globals';
import tsParser from '@typescript-eslint/parser';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import js from '@eslint/js';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
	baseDirectory: __dirname,
	recommendedConfig: js.configs.recommended,
	allConfig: js.configs.all,
});

export default defineConfig([
	{
		settings: {
			react: {
				version: 'detect',
			},
		},
		extends: compat.extends('eslint:recommended', 'plugin:react/recommended', 'plugin:@typescript-eslint/recommended'),
		plugins: {
			react,
			'@typescript-eslint': typescriptEslint,
			'@tanstack/query': pluginQuery,
		},
		languageOptions: {
			globals: {
				...globals.browser,
			},
			parser: tsParser,
			ecmaVersion: 12,
			sourceType: 'module',

			parserOptions: {
				ecmaFeatures: {
					jsx: true,
				},
			},
		},
		rules: {
			'@typescript-eslint/no-unused-vars': [
				'error',
				{
					vars: 'all',
					args: 'after-used',
					argsIgnorePattern: '^_',
				},
			],
			semi: 'error',
			'@typescript-eslint/no-explicit-any': 'off',
			'@typescript-eslint/no-empty-function': 'off',
			'@typescript-eslint/ban-ts-comment': 'off',
			'@typescript-eslint/no-var-requires': 'off',
			'react/display-name': 'off',
			'react/react-in-jsx-scope': 'off',
			'react-hooks/exhaustive-deps': 'off',
			'react/no-unescaped-entities': 'off',
			'react/jsx-no-leaked-render': ['warn'],
		},
	},
]);
