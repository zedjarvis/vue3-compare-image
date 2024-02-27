<!-- eslint-disable no-irregular-whitespace -->
<script setup lang="ts">
// styles
import './style.css'

// utilities
import type { CSSProperties } from 'vue'
import { computed, getCurrentInstance, onBeforeUnmount, onMounted, ref, toRefs, watch } from 'vue'

// prop types
export interface Props {
  aspectRatio?: 'taller' | 'wider'
  handle?: string | number | boolean
  handleSize?: number
  hover?: boolean
  slideOnClick?: boolean
  keyboard?: boolean
  keyboardStep?: number
  leftImage: string
  leftImageAlt?: string
  leftImageCss?: object
  leftImageLabel?: string
  onSliderPositionChange?: (position: number) => void
  rightImage: string
  rightImageAlt?: string
  rightImageCss?: object
  rightImageLabel?: string
  skeleton?: string | number | boolean
  sliderLineColor?: string
  sliderLineWidth?: number
  sliderPositionPercentage?: number
  vertical?: boolean
}

// props
const props = withDefaults(defineProps<Props>(), {
  keyboard: false,
  keyboardStep: 0.01,
  hover: false,
  slideOnClick: true,
  handleSize: 40,
  sliderLineWidth: 2,
  sliderPositionPercentage: 0.5,
  vertical: false,
  onSliderPositionChange: () => { },
  sliderLineColor: '#ffffff',
  aspectRatio: 'wider',
})

// emits
const emit = defineEmits<{
  (e: 'slideStart', pos: number): void
  (e: 'slideEnd', pos: number): void
  (e: 'isSliding', state: boolean): void
}>()

// variables
const { aspectRatio, leftImage, leftImageAlt, leftImageLabel, leftImageCss, rightImage, rightImageAlt, rightImageLabel, rightImageCss, hover, handle, handleSize, sliderLineWidth, sliderPositionPercentage, skeleton, sliderLineColor, vertical, onSliderPositionChange, slideOnClick, keyboard, keyboardStep } = toRefs(props)

const componentId = Math.random().toString(36).substr(2, 9)

const horizontal = !vertical.value
const containerRef = ref()
const rightImageRef = ref<HTMLImageElement | null>(null)
const leftImageRef = ref<HTMLImageElement | null>(null)
const sliderPosition = ref(sliderPositionPercentage.value)
const containerWidth = ref(0)
const containerHeight = ref(0)
const leftImgLoaded = ref(false)
const rightImgLoaded = ref(false)
const isSliding = ref(false)

// computed refs
const allImagesLoaded = computed(() => leftImgLoaded.value && rightImgLoaded.value)
// Introduce refs(rightImageClip|leftImageClip) to correct bug caused when shifting from deprecated
// css property 'clip' to 'clipPath'. clip-path:inset works as paddings or margin
// so when right image clip reduces, left image clip has to increase for the comparison
// effect to work
const rightImageClip = computed(() => sliderPosition.value)
const leftImageClip = computed(() => 1 - sliderPosition.value)

// computed styles
const containerStyle = computed((): CSSProperties => {
  return {
    display: allImagesLoaded.value ? 'flex' : 'none',
    height: `${containerHeight.value}px`,
  }
})

const rightImageStyle = computed((): CSSProperties => {
  return {
    clipPath: horizontal ? `inset(0px 0px 0px ${containerWidth.value * rightImageClip.value}px)` : `inset(${containerHeight.value * rightImageClip.value}px 0px 0px 0px)`,
    ...rightImageCss,
  }
})

const leftImageStyle = computed((): CSSProperties => {
  return {
    clipPath: horizontal ? `inset(0px ${containerWidth.value * leftImageClip.value}px 0px 0px)` : `inset(0px 0px ${containerHeight.value * leftImageClip.value}px 0px)`,
    ...leftImageCss,
  }
})

const sliderStyle = computed((): CSSProperties => {
  return {
    cursor: !hover.value && horizontal ? 'ew-resize !important' : !hover.value && !horizontal ? 'ns-resize !important' : undefined,
    flexDirection: horizontal ? 'column' : 'row',
    height: horizontal ? '100%' : `${handleSize.value}px`,
    left: horizontal ? `${containerWidth.value * sliderPosition.value - handleSize.value / 2}px` : '0',
    top: horizontal ? '0' : `${containerHeight.value * sliderPosition.value - handleSize.value / 2}px`,
    width: horizontal ? `${handleSize.value}px` : '100%',
  }
})

const lineStyle = computed((): CSSProperties => {
  return {
    background: sliderLineColor.value,
    height: horizontal ? '100%' : `${sliderLineWidth.value}px`,
    width: horizontal ? `${sliderLineWidth.value}px` : '100%',
  }
})

const handleDefaultStyle = computed((): CSSProperties => {
  return {
    border: `${sliderLineWidth.value}px solid ${sliderLineColor.value}`,
    height: `${handleSize.value}px`,
    width: `${handleSize.value}px`,
    transform: horizontal ? 'none' : 'rotate(90deg)',
  }
})

const leftArrowStyle = computed((): CSSProperties => {
  return {
    border: `inset ${handleSize.value * 0.15}px rgba(0,0,0,0)`,
    borderRight: `${handleSize.value * 0.15}px solid ${sliderLineColor.value}`,
    marginLeft: `-${handleSize.value * 0.25}px`, // for IE11
    marginRight: `${handleSize.value * 0.25}px`,
  }
})

const rightArrowStyle = computed((): CSSProperties => {
  return {
    border: `inset ${handleSize.value * 0.15}px rgba(0,0,0,0)`,
    borderLeft: `${handleSize.value * 0.15}px solid ${sliderLineColor.value}`,
    marginRight: `-${handleSize.value * 0.25}px`, // for IE11
  }
})

const leftLabelStyle = computed((): CSSProperties => {
  return {
    left: horizontal ? '5%' : '50%',
    opacity: isSliding.value ? 0 : 1,
    top: horizontal ? '50%' : '3%',
    transform: horizontal ? 'translate(0,-50%)' : 'translate(-50%, 0)',
  }
})

const rightLabelStyle = computed((): CSSProperties => {
  return {
    opacity: isSliding.value ? 0 : 1,
    left: horizontal ? 'unset' : '50%',
    right: horizontal ? '5%' : 'unset',
    top: horizontal ? '50%' : 'unset',
    bottom: horizontal ? 'unset' : '3%',
    transform: horizontal ? 'translate(0,-50%)' : 'translate(-50%, 0)',
  }
})

const leftLabelContainerStyle = computed((): CSSProperties => {
  return {
    clip: horizontal ? `rect(auto, ${containerWidth.value * sliderPosition.value}px, auto, auto)` : `rect(auto, auto, ${containerHeight.value * sliderPosition.value}px, auto)`,
  }
})

const rightLabelContainerStyle = computed((): CSSProperties => {
  return {
    clipPath: horizontal ? `inset(0px 0px 0px ${containerWidth.value * rightImageClip.value}px)` : `inset(${containerHeight.value * rightImageClip.value}px 0px 0px 0px)`,
  }
})

function handleSliding(event: MouseEvent | TouchEvent | KeyboardEvent) {
  const e = event as TouchEvent

  // Calc cursor position from the:
  // - left edge of the viewport (for horizontal)
  // - top edge of the viewport (for vertical)
  // @ts-expect-error it is necessary
  const cursorXfromViewport = e.touches ? e.touches[0].pageX : e.pageX
  // @ts-expect-error it is necessary
  const cursorYfromViewport = e.touches ? e.touches[0].pageY : e.pageY

  // Calc Cursor Position from the:
  // - left edge of the window (for horizontal)
  // - top edge of the window (for vertical)
  // to consider any page scrolling
  const cursorXfromWindow = cursorXfromViewport - window.pageXOffset
  const cursorYfromWindow = cursorYfromViewport - window.pageYOffset

  // Calc Cursor Position from the left edge of the image
  const imagePosition = rightImageRef.value!.getBoundingClientRect()
  let pos = horizontal ? cursorXfromWindow - imagePosition.left : cursorYfromWindow - imagePosition.top

  // Set minimum and maximum value-to-prevent the slider from overflowing
  const minPos = 0 + sliderLineWidth.value / 2
  const maxPos = horizontal ? containerWidth.value - sliderLineWidth.value / 2 : containerHeight.value - sliderLineWidth.value / 2

  if (pos < minPos)
    pos = minPos
  if (pos > maxPos)
    pos = maxPos

  sliderPosition.value = horizontal ? pos / containerWidth.value : pos / containerHeight.value

  if (onSliderPositionChange.value)
    onSliderPositionChange.value(horizontal ? pos / containerWidth.value : pos / containerHeight.value)
}

function startSliding(e: MouseEvent | TouchEvent | KeyboardEvent) {
  isSliding.value = true
  emit('slideStart', sliderPosition.value)
  emit('isSliding', isSliding.value)

  if (!horizontal)
    e.preventDefault() // prevent all default + mobile scrolling if vertical
  else if (!('touches' in e))
    e.preventDefault() // prevent default except from mobile scrolling

  // Slide the image even if you just click or tap (not drag)
  if (slideOnClick.value)
    handleSliding(e)

  window.addEventListener('mousemove', handleSliding)
  window.addEventListener('touchmove', handleSliding)
}

function finishSliding() {
  isSliding.value = false
  emit('slideEnd', sliderPosition.value)
  emit('isSliding', isSliding.value)

  window.removeEventListener('mousemove', handleSliding)
  window.removeEventListener('touchmove', handleSliding)
}

function handleFocusIn() {
  if (keyboard.value)
    window.addEventListener('keydown', handleKeyDown)
}

function handleFocusOut() {
  if (keyboard.value)
    window.removeEventListener('keydown', handleKeyDown)
}

function handleOnClick() {
  if (keyboard.value)
    window.addEventListener('keydown', handleKeyDown)
}

function handleOnClickOutside(event: KeyboardEvent | MouseEvent) {
  if (containerRef.value && !containerRef.value.contains(event.target)) {
    // The click is outside the container, remove the event listener
    containerRef.value.blur()
    window.removeEventListener('keydown', handleKeyDown)
  }
}

function handleKeyDown(e: KeyboardEvent) {
  if (e.key === 'ArrowDown' && !horizontal) {
    e.preventDefault()
    if ((sliderPosition.value + keyboardStep.value) > 1)
      sliderPosition.value = 1
    else
      sliderPosition.value += keyboardStep.value
  }
  else if (e.key === 'ArrowUp' && !horizontal) {
    e.preventDefault()
    if ((sliderPosition.value - keyboardStep.value) < 0)
      sliderPosition.value = 0
    else
      sliderPosition.value -= keyboardStep.value
  }
  else if (e.key === 'ArrowLeft' && horizontal) {
    e.preventDefault()
    if ((sliderPosition.value - keyboardStep.value) < 0)
      sliderPosition.value = 0
    else
      sliderPosition.value -= keyboardStep.value
  }
  else if (e.key === 'ArrowRight' && horizontal) {
    e.preventDefault()
    if ((sliderPosition.value + keyboardStep.value) > 1)
      sliderPosition.value = 1
    else
      sliderPosition.value += keyboardStep.value
  }
  else {
    // do something
  }
}

function forceRenderHover(): void {
  const instance = getCurrentInstance()
  instance?.proxy?.$forceUpdate()
  const containerElement = containerRef.value
  if (props.hover) {
    containerElement?.addEventListener('mousemove', startSliding) // 03
    containerElement?.addEventListener('mouseleave', finishSliding) // 04
  }
  else {
    containerElement?.removeEventListener('mousemove', startSliding) // 03
    // containerElement?.removeEventListener('mouseleave', finishSliding) // 04
    // containerElement?.addEventListener('mouseleave', finishSliding)
  }
}

// Make the component responsive
onMounted(() => {
  const containerElement = containerRef.value
  const resizeObserver = new ResizeObserver(([entry]) => {
    const currentContainerWidth = entry.target.getBoundingClientRect().width
    containerWidth.value = currentContainerWidth
  })
  resizeObserver.observe(containerElement)

  return () => resizeObserver.disconnect()
})

onMounted(() => {
  const containerElement = containerRef.value
  // had to include this here, binding it with the container with the if hover prop doesn't work for some reason
  if (props.hover) {
    containerElement?.addEventListener('mousemove', startSliding) // 03
    containerElement?.addEventListener('mouseleave', finishSliding) // 04
  }

  window.addEventListener('click', handleOnClickOutside)
  containerElement?.addEventListener('mouseleave', finishSliding)
})

onBeforeUnmount(() => {
  const containerElement = containerRef.value

  containerElement?.removeEventListener('mousemove', startSliding)
  containerElement?.removeEventListener('mouseleave', finishSliding)
  window.removeEventListener('keydown', handleKeyDown)
  window.removeEventListener('click', handleOnClickOutside)
})

// Watch for changes in leftImage
watch(leftImageRef, () => {
  leftImgLoaded.value = false
  if (leftImageRef.value?.complete)
    leftImgLoaded.value = true
})

// Watch for changes in rightImage
watch(rightImageRef, () => {
  rightImgLoaded.value = false
  if (rightImageRef.value?.complete)
    rightImgLoaded.value = true
})

// since hover is the only listener set on mount, we need to rerender component if the value changes
watch(hover, () => {
  forceRenderHover()
})

// Calculate container height
watch(
  [() => containerWidth.value, () => leftImgLoaded.value, () => rightImgLoaded.value],
  () => {
    const leftImageWidthHeightRatio = leftImageRef.value!.naturalHeight / leftImageRef.value!.naturalWidth
    const rightImageWidthHeightRatio = rightImageRef.value!.naturalHeight / rightImageRef.value!.naturalWidth

    const idealWidthHeightRatio
      = aspectRatio.value === 'taller' ? Math.max(leftImageWidthHeightRatio, rightImageWidthHeightRatio) : Math.min(leftImageWidthHeightRatio, rightImageWidthHeightRatio)

    const idealContainerHeight = containerWidth.value * idealWidthHeightRatio
    containerHeight.value = idealContainerHeight
  },
)
</script>

<template>
  <div v-if="skeleton && !allImagesLoaded" data-testid="skeleton" :style="containerStyle" v-html="skeleton" />
  <div
    v-else :id="componentId" ref="containerRef" class="vci--container" tabindex="0" data-testid="vci-container"
    :style="containerStyle" @click="handleOnClick" @touchstart="startSliding" @touchend="finishSliding"
    @focusin="handleFocusIn" @focusout="handleFocusOut" @mousedown="startSliding" @mouseup="finishSliding"
  >
    <img
      ref="rightImageRef" class="vci--right-image" :alt="rightImageAlt" data-testid="right-image" :src="rightImage"
      :style="rightImageStyle" @load="rightImgLoaded = true"
    >
    <img
      ref="leftImageRef" class="vci--left-image" :alt="leftImageAlt" data-testid="left-image" :src="leftImage"
      :style="leftImageStyle" @load="leftImgLoaded = true"
    >
    <div class="vci--slider" :style="sliderStyle">
      <div class="vci--slider-line" :style="lineStyle" />
      <div v-if="handle" class="vci--custom-handle" v-html="handle" />
      <div v-else class="vci--default-handle" :style="handleDefaultStyle">
        <div class="vci--left-arrow" :style="leftArrowStyle" />
        <div class="vci--right-arrow" :style="rightArrowStyle" />
      </div>
      <div class="vci--slider-line" :style="lineStyle" />
    </div>
    <div v-if="leftImageLabel" class="vci--left-label-container" :style="leftLabelContainerStyle">
      <div class="vci--left-label" data-testid="left-image-label" :style="leftLabelStyle">
        {{ leftImageLabel }}
      </div>
    </div>
    <div v-if="rightImageLabel" class="vci--right-label-container" :style="rightLabelContainerStyle">
      <div class="vci--right-label" data-testid="right-image-label" :style="rightLabelStyle">
        {{ rightImageLabel }}
      </div>
    </div>
  </div>
</template>
