import { defineConfig } from 'vitepress'

// #1D9371
// https://vitepress.dev/reference/site-config
export default defineConfig({
  sitemap: {
    hostname: 'https://zedjarvis.github.io/vue3-compare-image/',
  },
  base: '/vue3-compare-image/',
  lang: 'en-US',
  title: 'Vue3 Compare Image',
  description: 'A Simple Vue 3 component to compare two images with a slider, supports vertical and horizontal modes, and Keyboard for accessibility.',
  head: [['link', { rel: 'icon', href: '/vue3-compare-image/favicon.ico' }]],
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    logo: './assets/logo.png',
    nav: [
      { text: 'Home', link: '/' },
      {
        text: 'Guide',
        items: [
          { text: 'Getting Started', link: '/markdown-examples' },
          { text: 'Examples', link: '/markdown-examples' },
          { text: 'API', link: '/markdown-examples' },
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
          { text: 'Markdown Examples', link: '/markdown-examples' },
          { text: 'Runtime API Examples', link: '/api-examples' },
        ],
      },
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/zedjarvis/vue3-compare-image' },
    ],
  },
})
