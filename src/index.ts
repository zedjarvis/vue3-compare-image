import type { App } from "vue";
import VueCompareImage from "./components";

// TODO: provide image options
export default {
    install: (app: App) => {
        app.component("VueCompareImage", VueCompareImage)
    }
}

export { VueCompareImage };