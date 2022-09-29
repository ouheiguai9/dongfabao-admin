import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import 'element-plus/es/components/message/style/css'
import './main.scss'
const app = createApp(App).use(createPinia()).use(router)
app.mount('#app')
