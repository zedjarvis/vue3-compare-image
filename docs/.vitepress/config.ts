import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Vue 3 Compare Image",
  description: "A Vue 3 component to compare and slide between two images, supporting vertical and horizontal comparison modes and Keyboard navigation for accessibility.",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Guide', link: '/markdown-examples' }
    ],

    sidebar: [
      {
        text: 'Guide',
        items: [
          { text: 'Introduction', link: '/markdown-examples' },
          { text: 'Installation', link: '/markdown-examples' },
          { text: 'Usage', link: '/markdown-examples' },
          { text: 'API', link: '/api-examples' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/zedjarvis/vue3-compare-image' }
    ]
  }
})
