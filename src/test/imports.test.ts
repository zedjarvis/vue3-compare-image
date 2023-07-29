import { describe, test, expect } from 'vitest'

describe('import vue components', () => {
    test('normal imports as expected', async () => {
      const cmp = await import('../components/VueCompareImage.vue')
      expect(cmp).toBeDefined()
    })
  
    test('template string imports as expected', async () => {
      // eslint-disable-next-line @typescript-eslint/quotes
      const cmp = await import(`../components/VueCompareImage.vue`)
      expect(cmp).toBeDefined()
    })
  
    test('dynamic imports as expected', async () => {
    //   const name = 'Hello'
      const cmp = await import(`../components/VueCompareImage.vue`)
      expect(cmp).toBeDefined()
    })
  })