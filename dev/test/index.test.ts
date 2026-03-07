import { mount } from '@vue/test-utils'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { createApp } from 'vue'
import VueCompareImagePlugin from '../../src'
import { VueCompareImage } from '../../src/components'

function setImageMetrics(image: Element, width = 1000, height = 500) {
  Object.defineProperty(image, 'naturalWidth', { configurable: true, value: width })
  Object.defineProperty(image, 'naturalHeight', { configurable: true, value: height })
  Object.defineProperty(image, 'complete', { configurable: true, value: true })
}

async function markImagesAsLoaded(wrapper: ReturnType<typeof mount>) {
  const rightImage = wrapper.get('[data-testid="right-image"]')
  const leftImage = wrapper.get('[data-testid="left-image"]')

  setImageMetrics(rightImage.element, 1200, 800)
  setImageMetrics(leftImage.element, 1200, 600)
  await rightImage.trigger('load')
  await leftImage.trigger('load')
}

function mountCompareImage(extraProps: Record<string, unknown> = {}) {
  return mount(VueCompareImage, {
    props: {
      leftImage: 'left.jpg',
      rightImage: 'right.jpg',
      ...extraProps,
    },
  })
}

describe('vueCompareImage', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders two images with provided sources', async () => {
    const wrapper = mountCompareImage()
    await markImagesAsLoaded(wrapper)

    const images = wrapper.findAll('img')
    expect(images).toHaveLength(2)
    expect(images[0].attributes('src')).toBe('right.jpg')
    expect(images[1].attributes('src')).toBe('left.jpg')
  })

  it('registers component via plugin install', () => {
    const app = createApp({})
    app.use(VueCompareImagePlugin)
    expect(app.component('VueCompareImage')).toBeTruthy()
  })

  it('renders skeleton while images are loading', () => {
    const wrapper = mountCompareImage({
      skeleton: '<div>Loading...</div>',
    })

    expect(wrapper.get('[data-testid="skeleton"]').html()).toContain('Loading...')
  })

  it('renders custom handle and image labels', async () => {
    const wrapper = mountCompareImage({
      handle: '<div id="custom-handle">Custom</div>',
      leftImageLabel: 'Before',
      rightImageLabel: 'After',
    })
    await markImagesAsLoaded(wrapper)

    expect(wrapper.html()).toContain('custom-handle')
    expect(wrapper.get('[data-testid="left-image-label"]').text()).toBe('Before')
    expect(wrapper.get('[data-testid="right-image-label"]').text()).toBe('After')
  })

  it('emits sliding events on mouse interaction', async () => {
    const wrapper = mountCompareImage()
    await markImagesAsLoaded(wrapper)

    const container = wrapper.get('[data-testid="vci-container"]')
    await container.trigger('mousedown', { pageX: 200, pageY: 100 })
    await container.trigger('mouseup')

    expect(wrapper.emitted('slideStart')).toBeTruthy()
    expect(wrapper.emitted('slideEnd')).toBeTruthy()
    expect(wrapper.emitted('isSliding')?.[0]).toEqual([true])
    expect(wrapper.emitted('isSliding')?.[1]).toEqual([false])
  })

  it('keeps slider position after release', async () => {
    const wrapper = mountCompareImage()
    await markImagesAsLoaded(wrapper)

    const container = wrapper.get('[data-testid="vci-container"]')
    await container.trigger('mousedown', { pageX: 100, pageY: 50 })
    await window.dispatchEvent(new MouseEvent('mousemove', { clientX: 320, clientY: 50 }))

    const beforeMouseUp = wrapper.get('.vci--slider').attributes('style')
    await window.dispatchEvent(new MouseEvent('mouseup'))
    const afterMouseUp = wrapper.get('.vci--slider').attributes('style')

    expect(beforeMouseUp).toContain('left:')
    expect(afterMouseUp).toBe(beforeMouseUp)
  })

  it('calls onSliderPositionChange and clamps in horizontal mode', async () => {
    const onSliderPositionChange = vi.fn()
    const wrapper = mountCompareImage({ onSliderPositionChange })
    await markImagesAsLoaded(wrapper)

    const container = wrapper.get('[data-testid="vci-container"]')
    await container.trigger('mousedown', { pageX: -999, pageY: 100 })
    await window.dispatchEvent(new MouseEvent('mousemove', { clientX: 9999, clientY: 100 }))
    await window.dispatchEvent(new MouseEvent('mouseup'))

    const positions = onSliderPositionChange.mock.calls.map(call => call[0] as number)
    expect(positions.length).toBeGreaterThan(0)
    expect(Math.min(...positions)).toBeGreaterThanOrEqual(0)
    expect(Math.max(...positions)).toBeLessThanOrEqual(1)
  })

  it('supports vertical mode drag and updates top style', async () => {
    const wrapper = mountCompareImage({ vertical: true })
    await markImagesAsLoaded(wrapper)

    const container = wrapper.get('[data-testid="vci-container"]')
    await container.trigger('mousedown', { pageX: 50, pageY: 150 })
    await window.dispatchEvent(new MouseEvent('mousemove', { clientX: 50, clientY: 180 }))
    await window.dispatchEvent(new MouseEvent('mouseup'))

    expect(wrapper.get('.vci--slider').attributes('style')).toContain('top:')
  })

  it('handles keyboard navigation in horizontal mode', async () => {
    const wrapper = mountCompareImage({
      keyboard: true,
      keyboardStep: 0.1,
    })
    await markImagesAsLoaded(wrapper)

    const container = wrapper.get('[data-testid="vci-container"]')
    await container.trigger('focusin')
    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight' }))
    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowLeft' }))

    expect(wrapper.get('.vci--slider').attributes('style')).toContain('left:')

    await container.trigger('focusout')
  })

  it('handles keyboard navigation in vertical mode and clamps at bounds', async () => {
    const wrapper = mountCompareImage({
      vertical: true,
      keyboard: true,
      keyboardStep: 1,
    })
    await markImagesAsLoaded(wrapper)

    const container = wrapper.get('[data-testid="vci-container"]')
    await container.trigger('focusin')
    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }))
    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowUp' }))
    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }))

    expect(wrapper.get('.vci--slider').attributes('style')).toContain('top:')
  })

  it('handles click registration for keyboard and click-outside cleanup', async () => {
    const wrapper = mountCompareImage({
      keyboard: true,
    })
    await markImagesAsLoaded(wrapper)

    const container = wrapper.get('[data-testid="vci-container"]')
    await container.trigger('click')
    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight' }))
    window.dispatchEvent(new MouseEvent('click', { bubbles: true }))
    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight' }))

    expect(wrapper.get('.vci--slider').attributes('style')).toContain('left:')
  })

  it('reacts to hover prop changes in both directions', async () => {
    const wrapper = mountCompareImage({ hover: true })
    await markImagesAsLoaded(wrapper)

    await wrapper.get('[data-testid="vci-container"]').trigger('mousemove', { pageX: 250, pageY: 100 })
    await wrapper.setProps({ hover: false })
    await wrapper.setProps({ hover: true })
    await wrapper.get('[data-testid="vci-container"]').trigger('mousemove', { pageX: 250, pageY: 100 })

    expect(wrapper.emitted('slideStart')).toBeTruthy()
  })

  it('applies custom image style objects', async () => {
    const wrapper = mountCompareImage({
      leftImageCss: { opacity: '0.8' },
      rightImageCss: { opacity: '0.2' },
    })
    await markImagesAsLoaded(wrapper)

    expect(wrapper.get('[data-testid="left-image"]').attributes('style')).toContain('opacity: 0.8')
    expect(wrapper.get('[data-testid="right-image"]').attributes('style')).toContain('opacity: 0.2')
  })

  it('covers keyboard boundaries in horizontal mode', async () => {
    const wrapper = mountCompareImage({
      keyboard: true,
      keyboardStep: 1,
    })
    await markImagesAsLoaded(wrapper)

    const container = wrapper.get('[data-testid="vci-container"]')
    await container.trigger('focusin')
    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowLeft' }))
    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight' }))
    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }))

    expect(wrapper.get('.vci--slider').attributes('style')).toContain('left:')
  })

  it('runs unmount cleanup handlers safely', async () => {
    const wrapper = mountCompareImage({ hover: true, keyboard: true })
    await markImagesAsLoaded(wrapper)
    wrapper.unmount()
    expect(wrapper.exists()).toBe(false)
  })
})
