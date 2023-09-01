import type { App, Plugin } from 'vue'
import { VueCompareImage } from './components'

const install: Plugin = {
  install(app: App) {
    app.component('VueCompareImage', VueCompareImage)
  },
}

export default install

export { VueCompareImage }
