import Vue from 'vue'
import Router from 'vue-router'
import Config from '@/env.js'
Vue.use(Router)

const router = new Router({
    routes: [
        {
            path: '/',
            component: () => import('@/components/index/Main'),
            children: [
                {
                    path: '/dashboard',
                    component: () => import('@/components/index/dashboard/Dashboard'),
                    meta: {
                        title: '主页'
                    }
                },
                {
                    path: '/contest',
                    component: () => import('@/components/index/contest/Contest'),
                    meta: {
                        title: '比赛'
                    }
                },
                {
                    path: '/problem',
                    component: () => import('@/components/index/problem/Problem'),
                    meta: {
                        title: '题目'
                    }
                },
                {
                    path: '/problem/:pid/:action',
                    component: () => import('@/components/index/problem/ProblemDetail'),
                    meta: {
                        title: '题目详情'
                    }
                },
                {
                    path: '/leaderboard',
                    component: () => import('@/components/index/leaderboard/Leaderboard'),
                    meta: {
                        title: '排行榜'
                    }
                },
                {
                    path: '/register',
                    component: () => import('@/components/index/account/Account'),
                    name: 'register',
                    meta: {
                        title: '用户注册',                        
                    },
                },
                {
                    path: '/login',
                    component: () => import('@/components/index/account/Account'),
                    name: 'login',
                    meta: {
                        title: '用户登入'
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
