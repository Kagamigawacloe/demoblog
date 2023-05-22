import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
// 1. 配置路由
const routes: Array<RouteRecordRaw> = [
	{
	  path: '/',
	  redirect: '/index/aboutme'
	},
	{
	  path: '/index',
		name: 'Layout',
		meta: {
		  title: '首页',
		  requireAuth: false,
		  keepAlive: false
		},
	  component: () => import('@/components/Layout.vue'),
	  children: [
			{
			  path: '',
				name: 'IndexPage',
			  component: () => import('@/views/index/index.vue')
			},
			{
        path: 'messageboard',
        name: 'MessageBoard',
        meta: {
          title: '留言板',
					requireAuth: false,
          keepAlive: true
        },
				component: () => import('@/views/messageboard/index.vue')
			},
			{
			  path: 'aboutme',
			  name: 'AboutMe',
			  meta: {
			    title: '关于我',
			    requireAuth: false,
			    keepAlive: true
			  },
			  component: () => import('@/views/aboutme/AboutMePage.vue')
			}]
			},
			{
			  path: '/article/:id',
			  name: 'ArticleDetail',
			  meta: {
			    keepAlive: false
			  },
			  component: () => import('@/views/article/ArticleDetail.vue')
			},
			{
			  path: '/login',
			  name: 'Login',
			  meta: {
			    requireAuth: false
			  },
			  component: () => import('@/views/login/index.vue')
			},
			{
			  path: '/:pathMatch(.*)*',
			  name: 'notfound',
			  meta: {
			    title: '页面走失啦~',
			    requireAuth: false,
			    keepAlive: false
			  },
			  component: () => import('@/views/404.vue')
			}
 
];
// 2.返回一个 router 实列，为函数，配置 history 模式
const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  NProgress.start() // 进度条开始
  next()
})
 
router.afterEach(() => {
  NProgress.done() // 进度条结束
})

NProgress.configure({
  easing: 'ease', // 动画方式
  speed: 500, // 递增进度条的速度
  showSpinner: false, // 是否显示加载 icon
  trickleSpeed: 200, // 自动递增间隔
  minimum: 0.3 // 初始化时的最小百分比
})
// 3.导出路由   去 main.ts 注册 router.ts
export default router
