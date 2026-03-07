import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { defineConfig } from 'vitepress'

const packageJsonPath = resolve(__dirname, '../../package.json')
const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf-8')) as { version: string }
const versionLabel = `v${packageJson.version}`

export default defineConfig({
  base: '/',
  lang: 'en-US',
  title: 'Vue3 Compare Image',
  description: 'Vue 3 component for before/after image comparison with slider, keyboard support, and vertical mode.',
  sitemap: {
    hostname: 'https://vue3-compare-image.vercel.app',
  },
  head: [['link', { rel: 'icon', href: '/favicon.ico' }]],
  markdown: {
    lineNumbers: true,
  },
  themeConfig: {
    logo: '/logo.png',
    search: {
      provider: 'local',
    },
    lastUpdated: {
      text: 'Updated',
      formatOptions: {
        dateStyle: 'medium',
        timeStyle: 'short',
      },
    },
    nav: [
      {
        text: 'Guide',
        items: [
          { text: 'Getting Started', link: '/getting-started' },
          { text: 'Examples', link: '/examples' },
          { text: 'API Reference', link: '/api-reference' },
        ],
      },
      {
        text: versionLabel,
        items: [
          { text: 'Changelog', link: 'https://github.com/zedjarvis/vue3-compare-image/blob/main/CHANGELOG.md' },
          { text: 'Contributing', link: 'https://github.com/zedjarvis/vue3-compare-image/blob/main/CONTRIBUTING.md' },
        ],
      },
    ],
    sidebar: [
      {
        text: 'Guide',
        items: [
          { text: 'Getting Started', link: '/getting-started' },
          { text: 'Examples', link: '/examples' },
          { text: 'API Reference', link: '/api-reference' },
        ],
      },
    ],
    socialLinks: [
      { icon: 'github', link: 'https://github.com/zedjarvis/vue3-compare-image' },
    ],
    footer: {
      copyright: 'MIT License © Cedrouseroll Omondi',
    },
  },
})
