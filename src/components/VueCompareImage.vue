<!-- eslint-disable no-irregular-whitespace -->
<script setup lang="ts">
// utilities
import { ref, computed, onMounted, onBeforeUnmount, toRefs } from "vue"
import { ResizeSensor } from "css-element-queries"

export interface Props {
    leftImage: string
    leftImageAlt?: string
    leftLabel?: string
    rightImage: string
    rightImageAlt?: string
    rightLabel?: string
    hover?: boolean
    handleSize?: number
    sliderLineWidth?: number
    sliderPositionPercentage?: number
}

const props = withDefaults(defineProps<Props>(), {
    hover: false,
    handleSize: 40,
    sliderLineWidth: 2,
    sliderPositionPercentage: 0.5,
})

const { leftImage, leftImageAlt, leftLabel, rightImage, rightImageAlt, rightLabel, hover, handleSize, sliderLineWidth, sliderPositionPercentage } = toRefs(props)

const imageWidth = ref(0)
const positionPct = ref(sliderPositionPercentage.value)
const rightLabelWidth = ref()
const containerRef = ref()
const leftImageRef = ref()
const rightImageRef = ref()
const rightLabelRef = ref()


const leftImageStyle = computed(() => {
    return {
        clip: `rect(auto, ${imageWidth.value * positionPct.value}px, auto, auto)`,
    }
})

const rightLabelStyle = computed(() => {
    const cutLeft = Math.max(
        0,
        rightLabelWidth.value + imageWidth.value * (positionPct.value - 1),
      );
    return {
        clip: `rect(auto, auto, auto, ${cutLeft}px)`,
    }
})

const sliderStyle = computed(() => {
    return {
        cursor: `${hover.value && 'ew-resize'}`,
        left: `${imageWidth.value * positionPct.value - handleSize.value / 2}px`,
        width: `${handleSize.value}px`,
    }
})

const sliderLineStyle = computed(() => {
    return { width: `${sliderLineWidth.value}px` };
})

const sliderHandleStyle = computed(() => {
    return {
        border: `${sliderLineWidth.value}px solid white`,
        height: `${handleSize.value}px`,
        width: `${handleSize.value}px`,
    }
})

const sliderLeftArrowStyle = computed(() => {
    return {
        border: `inset ${handleSize.value * 0.15}px rgba(0,0,0,0)`,
        borderRight: `${handleSize.value * 0.15}px solid white`,
        marginLeft: `-${handleSize.value * 0.25}px`, // for IE11
        marginRight: `${handleSize.value * 0.25}px`,
    }
})

const sliderRightArrowStyle = computed(() => {
    return {
        border: `inset ${handleSize.value * 0.15}px rgba(0,0,0,0)`,
        borderLeft: `${handleSize.value * 0.15}px solid white`,
        marginRight: `-${handleSize.value * 0.25}px`, // for IE11
    }
})


function getAndSetImageWidth() {
    imageWidth.value = rightImageRef.value?.getBoundingClientRect().width;
    rightLabelWidth.value = rightLabelRef.value?.getBoundingClientRect().width;
}

function  startSliding(e: Event) {
    // Prevent default behavior other than mobile scrolling
    if (!('touches' in e)) {
    e.preventDefault();
    }

    // Slide the image even if you just click or tap (not drag)
    updateSliderPosition(e);

    window.addEventListener('mousemove', updateSliderPosition);
    window.addEventListener('touchmove', updateSliderPosition);
}

function finishSliding() {
    window.removeEventListener('mousemove', updateSliderPosition);
    window.removeEventListener('touchmove', updateSliderPosition);
}

function updateSliderPosition(event: Event) {
    const e = event as TouchEvent

    // Calc Cursor Position from the left edge of the viewport
    // @ts-ignore
    const cursorXfromViewport = e.touches ? e.touches[0].pageX : e.pageX;

    // Calc Cursor Position from the left edge of the window (consider any page scrolling)
    const cursorXfromWindow = cursorXfromViewport - window.pageXOffset;

    // Calc Cursor Position from the left edge of the image
    const imagePosition = rightImageRef.value.getBoundingClientRect();
    let pos = cursorXfromWindow - imagePosition.left;

    // Set minimum and maximum values ​​to prevent the slider from overflowing
    const minPos = 0 + sliderLineWidth.value / 2;
    const maxPos = imageWidth.value - sliderLineWidth.value / 2;

    if (pos < minPos) pos = minPos;
    if (pos > maxPos) pos = maxPos;

    positionPct.value = pos / imageWidth.value;
}

onMounted(() => {
    // get and set `imageWidth` when the container size changed
    // (including first time rendering)
    //
    // eslint-disable-next-line
    new ResizeSensor(containerRef.value, () => {
        getAndSetImageWidth()
    })

    const containerElement = containerRef.value;

    // for mobile
    containerElement.addEventListener('touchstart', startSliding);
    window.addEventListener('touchend', finishSliding);

    // for desktop
    if (hover.value) {
      containerElement.addEventListener('mouseenter', startSliding);
      containerElement.addEventListener('mouseleave', finishSliding);
    } else {
      containerElement.addEventListener('mousedown', startSliding);
      window.addEventListener('mouseup', finishSliding);
    }
})

onBeforeUnmount(() => {
    finishSliding();
    window.removeEventListener('mouseup', finishSliding);
    window.removeEventListener('touchend', finishSliding);
})
</script>

<template>
    <div class="vci-container" ref="containerRef">
        <img :alt="leftImageAlt" :src="leftImage" :style="leftImageStyle" class="left-image" ref="leftImageRef" />
        <div :style="leftImageStyle" class="left-label">{{ leftLabel }}</div>

        <img :alt="rightImageAlt" :src="rightImage" class="right-image" ref="rightImageRef" />
        <div :style="rightLabelStyle" ref="rightLabelRef" class="right-label">{{ rightLabel }}</div>

        <div :style="sliderStyle" class="vci-slider">
            <div :style="sliderLineStyle" class="line" />
            <div :style="sliderHandleStyle" class="handle">
                <div :style="sliderLeftArrowStyle" class="left-arrow" />
                <div :style="sliderRightArrowStyle" class="right-arrow" />
            </div>
            <div :style="sliderLineStyle" class="line" />
        </div>
    </div>
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.vci-container {
    box-sizing: border-box;
    position: relative;
    width: 100%;
    overflow: hidden;
}

.left-image {
    display: block;
    height: 100%; // fit to the height of under image
    object-fit: cover; // protrudes is hidden
    position: absolute;
    top: 0;
    width: 100%;
}

.left-label {
    position: absolute;
    top: 0px;
    left: 0px;
    padding: 10px;
}

.right-image {
    display: block;
    height: auto; // Respect the aspect ratio
    width: 100%;
}

.right-label {
    position: absolute;
    top: 0px;
    right: 0px;
    padding: 10px;
}

.vci-slider {
    align-items: center;
    display: flex;
    flex-direction: column;
    height: 100%;
    justify-content: center;
    position: absolute;
    top: 0;

    .line {
        background: white;
        box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2),
            0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);
        flex: 0 1 auto;
        height: 100%;
    }

    .handle {
        align-items: center;
        border-radius: 100%;
        box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2),
            0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);
        box-sizing: border-box;
        display: flex;
        flex: 1 0 auto;
        justify-content: center;
    }

    .left-arrow {
        height: '0px';
        width: '0px';
    }

    .right-arrow {
        height: '0px';
        width: '0px';
    }
}
</style>