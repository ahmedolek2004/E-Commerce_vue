import { createApp } from 'vue'
import App from './App.vue'
import router from './services/router'
import './index.css' // أو app.css لو نقلته

createApp(App).use(router).mount('#app')
