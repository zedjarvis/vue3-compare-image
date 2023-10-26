import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { VueCompareImage } from '../src/components'

describe('vci tests', async () => {
  it('should mount', async () => {
    expect(VueCompareImage).toBeTruthy()

    const wrapper = mount(VueCompareImage)

    expect(wrapper).toBeTruthy()
  })
})
