import Vue from 'vue'
import Router from 'vue-router'
import Config from '@/env.js'
Vue.use(Router)

const router = new Router({
    routes: [
        {
            path: '/',
            name: 'IndexMain',
            component: () => import('@/components/index/Main'),
            children: [
                {
                    path: '/register',
                    component: () => import('@/components/index/register/Register'),
                    meta: {
                        title: '用户注册',                        
                    }
                }
            ]
        },
        {
            path: '/404',
            name: 'NotFound',
            component: () => import('@/components/error_page/404'),
            meta: {
                title: '页面丢失',
            }
        },
        {
            path: '/401',
            name: 'AccessDenied',
            component: () => import('@/components/error_page/401'),
            meta: {
                title: '未经授权',
            }
        },
        {
            path: '/500',
            name: 'InternalError',
            component: () => import('@/components/error_page/500'),
            meta: {
                title: '网站出错了',
            }
        }
    ]
})

router.beforeEach((to, from, next) => {
    document.title = to.meta.title+Config.TITLE
    next()
})

export default router
