import { describe, test, expect } from "vitest";
import { mount } from "@vue/test-utils"
import VueCompareImage from "../components/VueCompareImage.vue";
import DUMMY_LEFT_IMAGE from "../assets/cat1.jpg";
import DUMMY_LEFT_IMAGE_UPDATED from "../assets/cat2.jpg";
import DUMMY_RIGHT_IMAGE from "../assets/forest1.jpg";


// mock resize observer
// @ts-ignore
window.ResizeObserver = class MockResizeObserver {
    observe() { }
    disconnect() { }
};


describe("VueCompareImage", () => {

    const RIGHT_IMAGE_ALT = "right";
    const LEFT_IMAGE_ALT = "left";
    const RIGHT_IMAGE_LABEL = "Right Image"
    const LEFT_IMAGE_LABEL = "Left Image"

    test("should render correctly", () => {
        expect(VueCompareImage).toBeTruthy();

        const wrapper = mount(VueCompareImage, {
            props: {
                rightImage: DUMMY_RIGHT_IMAGE,
                leftImage: DUMMY_LEFT_IMAGE,
                rightImageLabel: RIGHT_IMAGE_LABEL,
                leftImageLabel: LEFT_IMAGE_LABEL,
                rightImageAlt: RIGHT_IMAGE_ALT,
                leftImageAlt: LEFT_IMAGE_ALT,
            }
        })
        // @ts-ignore
        expect(wrapper.innerHTML).toMatchSnapshot();

        const rightImg = wrapper.get('[data-testid="right-image"]')
        const leftImg = wrapper.get('[data-testid="left-image"]')
        const rightImgLabel = wrapper.get('[data-testid="right-image-label"]')
        const leftImgLabel = wrapper.get('[data-testid="left-image-label"]')

        expect(rightImg.element.getAttribute('src')).toBe(DUMMY_RIGHT_IMAGE)
        expect(leftImg.element.getAttribute('src')).toBe(DUMMY_LEFT_IMAGE)
        expect(rightImg.element.getAttribute('alt')).toBe(RIGHT_IMAGE_ALT)
        expect(leftImg.element.getAttribute('alt')).toBe(LEFT_IMAGE_ALT)
        expect(rightImgLabel.text()).toBe(RIGHT_IMAGE_LABEL)
        expect(leftImgLabel.text()).toBe(LEFT_IMAGE_LABEL)
    })
})