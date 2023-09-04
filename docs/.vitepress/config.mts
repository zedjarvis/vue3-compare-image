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
  markdown: {
    lineNumbers: true,
  },
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    logo: './assets/logo.png',
    search: {
      provider: 'local',
    },
    nav: [
      {
        text: 'Guide',
        items: [
          { text: 'Getting Started', link: '/getting-started' },
          { text: 'Examples', link: '/examples' },
          { text: 'API Reference', link: '/markdown-examples' },
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
        text: 'Introduction',
        items: [
          {
            text: 'Getting Started',
            collapsed: false,
            items: [
              {
                text: 'Installation',
                link: '/getting-started#installation',
                items: [
                  { text: 'Global', link: '/getting-started#global' },
                  { text: 'Component', link: '/getting-started#component' },
                ],
              },
            ],
          },
          {
            text: 'Examples',
            items: [
              { text: 'Simple usage', link: '/examples#simple-component' },
              { text: 'Custom handle', link: '/examples#custom-handle' },
              { text: 'Emmitted events', link: '/examples#emmitted-events' },
            ],
          },
          {
            text: 'API Reference',
            items: [
              { text: 'Props', link: '/api-reference#props' },
              { text: 'Events', link: '/api-reference#events' },
            ],
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
