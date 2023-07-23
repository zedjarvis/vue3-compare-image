<!-- eslint-disable no-irregular-whitespace -->
<script setup lang="ts">
// utilities
import { ref, computed, onMounted, onBeforeUnmount, toRefs, watch, type CSSProperties } from "vue"


export interface Props {
    aspectRatio?: 'taller' | 'wider';
    handle?: string | number | boolean;
    handleSize?: number;
    hover?: boolean;
    slideOnClick?: boolean;
    leftImage: string;
    leftImageAlt?: string;
    leftImageCss?: object;
    leftImageLabel?: string;
    onSliderPositionChange?: (position: number) => void;
    rightImage: string;
    rightImageAlt?: string;
    rightImageCss?: object;
    rightImageLabel?: string;
    skeleton?: string | number | boolean;
    sliderLineColor?: string;
    sliderLineWidth?: number;
    sliderPositionPercentage?: number;
    vertical?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
    hover: false,
    slideOnClick: true,
    handleSize: 40,
    sliderLineWidth: 2,
    sliderPositionPercentage: 0.5,
    vertical: false,
    onSliderPositionChange: () => { },
    sliderLineColor: '#ffffff',
    aspectRatio: "wider"
})

const { aspectRatio, leftImage, leftImageAlt, leftImageLabel, leftImageCss, rightImage, rightImageAlt, rightImageLabel, rightImageCss, hover, handle, handleSize, sliderLineWidth, sliderPositionPercentage, skeleton, sliderLineColor, vertical, onSliderPositionChange, slideOnClick } = toRefs(props)

const horizontal = !vertical.value
const containerRef = ref();
const rightImageRef = ref<HTMLImageElement | null>(null);
const leftImageRef = ref<HTMLImageElement | null>(null);
const sliderPosition = ref(sliderPositionPercentage.value);
const containerWidth = ref(0);
const containerHeight = ref(0);
const leftImgLoaded = ref(false);
const rightImgLoaded = ref(false);
const isSliding = ref(false);


const allImagesLoaded = computed(() => leftImgLoaded.value && rightImgLoaded.value)

const containerStyle = computed((): CSSProperties => {
    return {
        boxSizing: 'border-box',
        position: 'relative',
        width: '100%',
        height: `${containerHeight.value}px`,
        overflow: 'hidden',
    }
})

const rightImageStyle = computed((): CSSProperties => {
    return {
        clip: horizontal ? `rect(auto, auto, auto, ${containerWidth.value * sliderPosition.value}px)` : `rect(${containerHeight.value * sliderPosition.value}px, auto, auto, auto)`,
        display: 'block',
        height: '100%',
        objectFit: 'cover',
        position: 'absolute',
        width: '100%',
        ...rightImageCss,
    }
})

const leftImageStyle = computed((): CSSProperties => {
    return {
        clip: horizontal ? `rect(auto, ${containerWidth.value * sliderPosition.value}px, auto, auto)` : `rect(auto, auto, ${containerHeight.value * sliderPosition.value}px, auto)`,
        display: 'block',
        height: '100%',
        objectFit: 'cover',
        position: 'absolute',
        width: '100%',
        ...leftImageCss,
    }
})

const sliderStyle = computed((): CSSProperties => {
    return {
        alignItems: 'center',
        cursor: !hover.value && horizontal ? 'ew-resize' : !hover.value && !horizontal ? 'ns-resize' : undefined,
        display: 'flex',
        flexDirection: horizontal ? 'column' : 'row',
        height: horizontal ? '100%' : `${handleSize.value}px`,
        justifyContent: 'center',
        left: horizontal ? `${containerWidth.value * sliderPosition.value - handleSize.value / 2}px` : '0',
        position: 'absolute',
        top: horizontal ? '0' : `${containerHeight.value * sliderPosition.value - handleSize.value / 2}px`,
        width: horizontal ? `${handleSize.value}px` : '100%',
    }
})

const lineStyle = computed((): CSSProperties => {
    return {
        background: sliderLineColor.value,
        boxShadow:
            '0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12)',
        flex: '0 1 auto',
        height: horizontal ? '100%' : `${sliderLineWidth.value}px`,
        width: horizontal ? `${sliderLineWidth.value}px` : '100%',
    }
})

const handleCustomStyle = computed((): CSSProperties => {
    return {
        alignItems: 'center',
        boxSizing: 'border-box',
        display: 'flex',
        flex: '1 0 auto',
        height: 'auto',
        justifyContent: 'center',
        width: 'auto',
    }
})

const handleDefaultStyle = computed((): CSSProperties => {
    return {
        alignItems: 'center',
        border: `${sliderLineWidth.value}px solid ${sliderLineColor.value}`,
        borderRadius: '100%',
        boxShadow:
            '0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12)',
        boxSizing: 'border-box',
        display: 'flex',
        flex: '1 0 auto',
        height: `${handleSize.value}px`,
        justifyContent: 'center',
        width: `${handleSize.value}px`,
        transform: horizontal ? 'none' : 'rotate(90deg)',
    }
})

const leftArrowStyle = computed((): CSSProperties => {
    return {
        border: `inset ${handleSize.value * 0.15}px rgba(0,0,0,0)`,
        borderRight: `${handleSize.value * 0.15}px solid ${sliderLineColor.value}`,
        height: '0px',
        marginLeft: `-${handleSize.value * 0.25}px`, // for IE11
        marginRight: `${handleSize.value * 0.25}px`,
        width: '0px',
    }
})

const rightArrowStyle = computed((): CSSProperties => {
    return {
        border: `inset ${handleSize.value * 0.15}px rgba(0,0,0,0)`,
        borderLeft: `${handleSize.value * 0.15}px solid ${sliderLineColor.value}`,
        height: '0px',
        marginRight: `-${handleSize.value * 0.25}px`, // for IE11
        width: '0px',
    }
})

const leftLabelStyle = computed((): CSSProperties => {
    return {
        background: 'rgba(0, 0, 0, 0.5)',
        color: 'white',
        left: horizontal ? '5%' : '50%',
        opacity: isSliding.value ? 0 : 1,
        padding: '10px 20px',
        position: 'absolute',
        top: horizontal ? '50%' : '3%',
        transform: horizontal ? 'translate(0,-50%)' : 'translate(-50%, 0)',
        transition: 'opacity 0.1s ease-out',
    }
})

const rightLabelStyle = computed((): CSSProperties => {
    return {
        background: 'rgba(0, 0, 0, 0.5)',
        color: 'white',
        opacity: isSliding.value ? 0 : 1,
        padding: '10px 20px',
        position: 'absolute',
        left: horizontal ? 'unset' : '50%',
        right: horizontal ? '5%' : 'unset',
        top: horizontal ? '50%' : 'unset',
        bottom: horizontal ? 'unset' : '3%',
        transform: horizontal ? 'translate(0,-50%)' : 'translate(-50%, 0)',
        transition: 'opacity 0.1s ease-out',
    }
})

const leftLabelContainerStyle = computed((): CSSProperties => {
    return {
        clip: horizontal ? `rect(auto, ${containerWidth.value * sliderPosition.value}px, auto, auto)` : `rect(auto, auto, ${containerHeight.value * sliderPosition.value}px, auto)`,
        height: '100%',
        position: 'absolute',
        width: '100%',
    }
})

const rightLabelContainerStyle = computed((): CSSProperties => {
    return {
        clip: horizontal ? `rect(auto, auto, auto, ${containerWidth.value * sliderPosition.value}px)` : `rect(${containerHeight.value * sliderPosition.value}px, auto, auto, auto)`,
        height: '100%',
        position: 'absolute',
        width: '100%',
    }
})

function startSliding(e: MouseEvent | TouchEvent) {
    isSliding.value = true
    // Prevent default behavior other than mobile scrolling
    if (!('touches' in e)) {
        e.preventDefault();
    }

    // Slide the image even if you just click or tap (not drag)
    if (slideOnClick.value) handleSliding(e);

    window.addEventListener('mousemove', handleSliding);
    window.addEventListener('touchmove', handleSliding);
}

function finishSliding() {
    isSliding.value = false
    window.removeEventListener('mousemove', handleSliding);
    window.removeEventListener('touchmove', handleSliding);
}

function handleSliding(event: MouseEvent | TouchEvent) {
    const e = event as TouchEvent;

    // Calc cursor position from the:
    // - left edge of the viewport (for horizontal)
    // - top edge of the viewport (for vertical)
    // @ts-ignore
    const cursorXfromViewport = e.touches ? e.touches[0].pageX : e.pageX;
    // @ts-ignore
    const cursorYfromViewport = e.touches ? e.touches[0].pageY : e.pageY;


    // Calc Cursor Position from the:
    // - left edge of the window (for horizontal)
    // - top edge of the window (for vertical)
    // to consider any page scrolling
    const cursorXfromWindow = cursorXfromViewport - window.pageXOffset;
    const cursorYfromWindow = cursorYfromViewport - window.pageYOffset;

    // Calc Cursor Position from the left edge of the image
    const imagePosition = rightImageRef.value!.getBoundingClientRect();
    let pos = horizontal ? cursorXfromWindow - imagePosition.left : cursorYfromWindow - imagePosition.top;


    // Set minimum and maximum values ​​to prevent the slider from overflowing
    const minPos = 0 + sliderLineWidth.value / 2;
    const maxPos = horizontal ? containerWidth.value - sliderLineWidth.value / 2 : containerHeight.value - sliderLineWidth.value / 2;

    if (pos < minPos) pos = minPos;
    if (pos > maxPos) pos = maxPos;

    sliderPosition.value = horizontal ? pos / containerWidth.value : pos / containerHeight.value;

    if (onSliderPositionChange.value) {
        onSliderPositionChange.value(horizontal ? pos / containerWidth.value : pos / containerHeight.value);
    }
}


// Make the component responsive
onMounted(() => {
    const containerElement = containerRef.value;
    const resizeObserver = new ResizeObserver(([entry]) => {
        const currentContainerWidth = entry.target.getBoundingClientRect().width;
        containerWidth.value = currentContainerWidth;
    });
    resizeObserver.observe(containerElement);

    return () => resizeObserver.disconnect();
});


onMounted(() => {
    const containerElement = containerRef.value;

    // for mobile
    containerElement?.addEventListener('touchstart', startSliding); // 01
    window.addEventListener('touchend', finishSliding); // 02

    // for desktop
    if (props.hover) {
        containerElement?.addEventListener('mousemove', handleSliding); // 03
        containerElement?.addEventListener('mouseleave', finishSliding); // 04
    } else {
        containerElement?.addEventListener('mousedown', startSliding); // 05
        window.addEventListener('mouseup', finishSliding); // 06
    }
})

onBeforeUnmount(() => {
    finishSliding();

    const containerElement = containerRef.value;

    containerElement?.removeEventListener('touchstart', startSliding);
    window.removeEventListener('touchend', finishSliding);
    containerElement?.removeEventListener('mousemove', handleSliding);
    containerElement?.removeEventListener('mouseleave', finishSliding);
    containerElement?.removeEventListener('mousedown', startSliding);
    window.removeEventListener('mouseup', finishSliding);
    window.removeEventListener('mousemove', handleSliding);
    window.removeEventListener('touchmove', handleSliding);
})

// Handle image loading
const handleImageLoad = (imageRef: HTMLImageElement | null, setImgLoaded: (value: boolean) => void) => {
    if (imageRef && imageRef.complete) {
        setImgLoaded(true);
    }
};

onMounted(() => {
    handleImageLoad(leftImageRef.value, (value) => (leftImgLoaded.value = value));
});

// Watch for changes in leftImage
const prevLeftImage = ref(leftImage);
watch(
    () => leftImage,
    () => {
        if (prevLeftImage.value !== leftImage.value) {
            prevLeftImage.value = leftImage.value;
            leftImgLoaded.value = false;
            handleImageLoad(leftImageRef.value, (value) => (leftImgLoaded.value = value));
        }
    }
);

// Watch for changes in rightImage
const prevRightImage = ref(rightImage);
watch(
    () => rightImage,
    () => {
        if (prevRightImage.value !== rightImage.value) {
            prevRightImage.value = rightImage.value;
            rightImgLoaded.value = false;
            handleImageLoad(rightImageRef.value, (value) => (rightImgLoaded.value = value));
        }
    }
);

// Calculate container height
watch(
    [() => containerWidth.value, () => leftImgLoaded.value, () => rightImgLoaded.value],
    () => {
        const leftImageWidthHeightRatio = leftImageRef.value!.naturalHeight / leftImageRef.value!.naturalWidth;
        const rightImageWidthHeightRatio = rightImageRef.value!.naturalHeight / rightImageRef.value!.naturalWidth;

        const idealWidthHeightRatio =
            aspectRatio.value === 'taller' ? Math.max(leftImageWidthHeightRatio, rightImageWidthHeightRatio) : Math.min(leftImageWidthHeightRatio, rightImageWidthHeightRatio);

        const idealContainerHeight = containerWidth.value * idealWidthHeightRatio;
        containerHeight.value = idealContainerHeight;
    }
);
</script>

<template>
    <div v-if="skeleton && !allImagesLoaded" :style="containerStyle" v-html="skeleton"></div>
    <div data-testid="container" ref="containerRef"
        :style="{ ...containerStyle, display: allImagesLoaded ? 'block' : 'none' }">
        <img @load="rightImgLoaded = true" :alt="rightImageAlt" data-testid="right-image" ref="rightImageRef"
            :src="rightImage" :style="rightImageStyle">
        <img @load="leftImgLoaded = true" :alt="leftImageAlt" data-testid="left-image" ref="leftImageRef" :src="leftImage"
            :style="leftImageStyle">
        <div :style="sliderStyle">
            <div :style="lineStyle" />
            <div v-if="handle" :style="handleCustomStyle" v-html="handle"></div>
            <div v-else :style="handleDefaultStyle">
                <div :style="leftArrowStyle" />
                <div :style="rightArrowStyle" />
            </div>
            <div :style="lineStyle" />
        </div>
        <div v-if="leftImageLabel" :style="leftLabelContainerStyle">
            <div :style="leftLabelStyle">{{ leftImageLabel }}</div>
        </div>
        <div v-if="rightImageLabel" :style="rightLabelContainerStyle">
            <div :style="rightLabelStyle">{{ rightImageLabel }}</div>
        </div>
    </div>
</template>