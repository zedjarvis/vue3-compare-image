import { createApp } from 'vue'

// Using import aliases in Vite
import VueCompareImage from 'vue3-compare-image'
import App from './App.vue'

const app = createApp(App)
app.use(VueCompareImage)

app.mount('#app')
