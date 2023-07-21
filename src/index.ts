import type { App } from "vue";
import VueCompareImage from "./components/VueCompareImage.vue";

export default {
    install: (app: App) => {
        app.component('VueCompareImage', VueCompareImage);
    }
};

export { VueCompareImage };