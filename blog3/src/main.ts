import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { createPinia } from 'pinia' // 引入pinia
import router from './router' // 引入router
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import '@/assets/styles/iconfont/iconfont.less'
import './index.css'//引入tailwindcss
import  '@/assets/fonts/fonts.css'
import { createHead } from '@vueuse/head'
import 'virtual:svg-icons-register'
// 1 引入数据持久化插件
import piniaPersist from 'pinia-plugin-persist'
const head = createHead()
const pinia = createPinia()
// 2 pinia使用数据持久化插件
pinia.use(piniaPersist)
createApp(App).use(pinia).use(ElementPlus).use(router).use(head).mount('#app')
