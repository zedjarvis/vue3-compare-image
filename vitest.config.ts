import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    exclude: ['node_modules', 'dist'],
    coverage: {
      enabled: true,
      provider: 'v8',
      reporter: ['html', 'html-spa'],
      reportsDirectory: './dev/test/coverage',
    },
  },
})
