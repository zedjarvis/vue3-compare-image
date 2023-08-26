import type { Plugin } from 'vue'
import VueCompareImage from './components/VueCompareImage.vue'

type VueCompareImageType = typeof VueCompareImage

const install: Plugin = {
  install(app) {
    app.component('VueCompareImage', VueCompareImage)
  },
}

export default install

export { VueCompareImage, type VueCompareImageType }
