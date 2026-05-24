import { defineConfig, globalIgnores } from 'eslint/config'
import nextVitals from 'eslint-config-next/core-web-vitals'
import nextTs from 'eslint-config-next/typescript'
import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tsEslint from 'typescript-eslint'
import stylistic from '@stylistic/eslint-plugin'

const stylisticConfig = {
  plugins: {
    '@stylistic': stylistic,
  },
  ...stylistic.configs.recommended,
}

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  globalIgnores([
    '.next/**',
    '.open-next/**',
    '.wrangler/**',
    'out/**',
    'build/**',
    'next-env.d.ts',
    'cloudflare-env.d.ts',
  ]),
  stylisticConfig,
  {
    extends: [
      js.configs.recommended,
      tsEslint.configs.recommended,
      reactHooks.configs.flat['recommended-latest'],
      reactRefresh.configs.next,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    rules: {
      'react-hooks/exhaustive-deps': 'off',
      'react-hooks/immutability': 'off',
      '@stylistic/quote-props': ['error', 'as-needed'],
      '@stylistic/jsx-one-expression-per-line': 'off',
    },
  },
])

export default eslintConfig
