import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'IndexMain',
			component: () => import('@/components/index/Main'),
			children: [

			]
		},
		{
			path: '/404',
			name: 'NotFound',
			title: '页面丢失',
			component: () => import('@/components/error_page/404')
		},
		{
			path: '/401',
			name: 'AccessDenied',
			title: '未经授权',
			component: () => import('@/components/error_page/401')
		},
		{
			path: '/500',
			name: 'InternalError',
			title: '网站出错了',
			component: () => import('@/components/error_page/500')
		}
  ]
})
