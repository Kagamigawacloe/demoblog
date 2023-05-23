import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
import'./assets/css/global.css'
/* 导入字体图标 */
import './assets/fonts/iconfont.css'
import axios from "axios"
import {toKey} from "core-js/internals/reflect-metadata";
import TreeTable from 'vue-table-with-tree-grid'
const request = axios.create({
  baseURL: 'https://lianghj.top:8888/api/private/v1/'
})
request.interceptors.request.use(config => {
  //console.log(config)
  config.headers.Authorization = window.sessionStorage.getItem('token')
  return config
})
// axios.defaults.baseURI ='https://localhost:8888/api/private/v1/'
Vue.prototype.$http = request
Vue.config.productionTip = false
Vue.component('tree-table',TreeTable)
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
