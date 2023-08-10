/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution');
const process = require('node:process')

process.env.ESLINT_TSCONFIG = 'tsconfig.json'

module.exports = {
  root: true,
  'extends': ['@antfu', 'plugin:vue/vue3-essential', 'eslint:recommended', '@vue/eslint-config-typescript', '@vue/eslint-config-prettier/skip-formatting', 'plugin:storybook/recommended'],
  parserOptions: {
    ecmaVersion: 'latest'
  }
};