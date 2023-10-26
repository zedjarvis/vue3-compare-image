import { defineConfig } from 'vitepress'

// #1D9371
// https://vitepress.dev/reference/site-config
export default defineConfig({
  sitemap: {
    hostname: 'https://zedjarvis.github.io/vue3-compare-image/',
  },
  base: '/',
  lang: 'en-US',
  title: 'Vue3 Compare Image',
  description: 'A Simple Vue 3 component to compare two images with a slider, supports vertical and horizontal modes, and Keyboard for accessibility.',
  head: [['link', { rel: 'icon', href: '/favicon.ico' }]],
  markdown: {
    lineNumbers: true,
  },
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    lastUpdated: {
      text: 'Updated on',
      formatOptions: {
        dateStyle: 'full',
        timeStyle: 'medium',
      },
    },
    logo: '/logo.png',
    search: {
      provider: 'local',
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
        text: 'v1.1.1',
        items: [
          { text: 'Changelog', link: 'https://github.com/zedjarvis/vue3-compare-image#changelog' },
          { text: 'Contributing', link: 'https://github.com/zedjarvis/vue3-compare-image#contributing' },
        ],
      },
    ],

    sidebar: [
      {
        text: 'Getting Started',
        items: [
          { text: 'Installation', link: '/getting-started#installation' },
          {
            text: 'Examples',
            link: '/examples',
          },
          {
            text: 'API Reference', link: '/api-reference',
          },
        ],
      },
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/zedjarvis/vue3-compare-image' },
    ],

    footer: {
      copyright: 'Copyright © Cedrouseroll',
    },
  },
})
