import Vue from 'vue'
import Router from 'vue-router'
import Config from '@/env.js'
import iView from 'iview'
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
                    path: '/contest/add',
                    component: () => import('@/components/user/contest/AddContest'),
                    meta: {
                        title: '创建比赛'
                    }
                },
                {
                    path: '/contest/:cid',
                    component: () => import('@/components/index/contest/ContestDetail'),
                    meta: {
                        title: '加入比赛'
                    }
                },
                {
                    path: '/contest/:cid/problems',
                    component: () => import('@/components/index/contest/problems/ContestProblems.vue'),
                    meta: {
                        title: 'xxx比赛'
                    }
                },
                {
                    path: '/problems',
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
                    path: '/problem/add',
                    component: () => import('@/components/user/problem/AddProblem'),
                    meta: {
                        title: '创建题目'
                    }
                },
                {
                    path: '/problem/:pid',
                    redirect: '/problem/:pid/description'
                },
                {
                    path: '/problem/:pid/edit/:action',
                    component: () => import('@/components/user/problem/problem_edit/ProblemEdit'),
                    meta: {
                        title: '题目编辑'
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
                    path: '/profile/:uid',
                    component: () => import('@/components/index/profile/Profile'),
                    meta: {
                        title: '资料卡'
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
            path: '/user',
            component: () => import('@/components/user/Main'),
            children: [
                {
                    path: '/',
                    component: () => import('@/components/user/profile/Profile'),
                    meta: {
                        title: '个人资料'
                    }
                }, 
                {
                    path: 'history',
                    component: () => import('@/components/user/history/History'),
                    meta: {
                        title: '我的记录'
                    }
                },
                {
                    path: 'problem',
                    component: () => import('@/components/user/problem/Problem'),
                    meta: {
                        title: '问题管理'
                    }
                },
                {
                    path: 'contest',
                    component: () => import('@/components/user/contest/Contest'),
                    meta: {
                        title: '比赛管理'
                    }
                },
                {
                    path: 'group',
                    component: () => import('@/components/user/group/Group'),
                    meta: {
                        title: '小组管理'
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
    iView.LoadingBar.start();    
    next()
})

router.afterEach(route => {
    iView.LoadingBar.finish();
})
export default router
