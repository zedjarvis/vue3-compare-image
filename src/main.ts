import { createApp } from 'vue'
import App from './App.vue'


import VueCompareImage from './index'

const app = createApp(App)
app.use(VueCompareImage)

app.mount('#app')
