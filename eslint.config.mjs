import antfu from '@antfu/eslint-config'

export default antfu(
  {
    vue: true,
    typescript: true,
    ignores: [
      '.cache',
      'dist',
      'node_modules',
      'docs/.vitepress/cache',
      'docs/.vitepress/dist',
      'dev/test/coverage',
    ],
  },
  {
    rules: {
      'no-console': 'off',
    },
  },
)
