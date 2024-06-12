import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { VueCompareImage } from '../../src/components'
import cat1 from '/src/assets/cat1.jpg'
import cat2 from '/src/assets/cat2.jpg'

describe('vci tests', async () => {
  it('should mount', async () => {
    expect(VueCompareImage).toBeTruthy()

    const wrapper = mount(VueCompareImage)

    expect(wrapper).toBeTruthy()
  })

  it('should render two images', async () => {
    const wrapper = mount(VueCompareImage, {
      props: {
        rightImage: cat1,
        leftImage: cat2,
      },
    })

    const images = wrapper.findAll('img')

    expect(images.length).toBe(2)
    expect(images[0].attributes('src')).toBe(cat1)
    expect(images[1].attributes('src')).toBe(cat2)
  })

  it('should have a draggable handle', async () => {
    const wrapper = mount(VueCompareImage)

    const handle = wrapper.find('.handle')

    expect(handle.exists()).toBe(true)
    expect(handle.classes()).toContain('draggable')
  })

  it('should update the position of the handle', async () => {
    const wrapper = mount(VueCompareImage)

    const handle = wrapper.find('.handle')

    handle.trigger('mousedown')
    handle.trigger('mousemove', { clientX: 100 })
    handle.trigger('mouseup')

    expect((wrapper.vm as any).position).toBe(100)
  })

  it('should emit a "position-change" event when the handle is moved', async () => {
    const wrapper = mount(VueCompareImage)

    const handle = wrapper.find('.handle')

    handle.trigger('mousedown')
    handle.trigger('mousemove', { clientX: 200 })
    handle.trigger('mouseup')

    expect(wrapper.emitted('position-change')).toBeTruthy()
    expect(wrapper.emitted('position-change')?.[0]?.[0]).toBe(200)
  })
})
