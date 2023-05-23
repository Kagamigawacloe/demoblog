import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/login.vue'
import Home from '../components/Home.vue'
import Welcome from'../components/Welcome.vue'
import {toKey} from "core-js/internals/reflect-metadata";
import User from"../components/user/user.vue"
import Rights from '../components/power/Rjghts.vue'
import Roles from '../components/power/Roles.vue'
import Cate from '../components/goods/cate.vue'
Vue.use(VueRouter)
const routes = [
  {
    path:'',
    redirect:'/login'
  },
  {
    path:'/login',
    component:Login
  },
  {
    path:'/home',
    component:Home,
    redirect:'/Welcome',
    children: [{path:'/Welcome',component: Welcome},
               {path:'/users',component: User},
               {path:'/rights',component: Rights},
               {path:'/roles',component: Roles},
               {path:'/categories',component: Cate}]
  }

]

const router = new VueRouter({
  routes
})
//挂载路由守卫验证验证用户权限
router.beforeEach((to,from,next) =>{
  //to 将要访问的路径
  //form 从那个路径跳转而来
  //next 是函数表示放行 next('/login')表示强制跳转
  if(to.path ==='/login') return next()
  const tokenStr =window.sessionStorage.getItem('token')
  if(!tokenStr) return next('/login')
  next()

})
export default router
