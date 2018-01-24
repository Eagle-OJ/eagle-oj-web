import Vue from 'vue'
import Router from 'vue-router'
import Store from '@/store'
import Cookie from 'js-cookie'
import Config from '@/env.js'
import iView from 'iview'
Vue.use(Router)

const router = new Router({
    routes: [
        {
            path: '/install',
            component: () => import('@/components/install/Install'),
            meta: {
                title: '网站安装'
            }
        },
        {
            path: '/',
            component: () => import('@/components/index/Main'),
            children: [
                {
                    path: '/',
                    component: () => import('@/components/index/Index'),
                    meta: {
                        title: '登入中'
                    },
                },
                {
                    path: '/dashboard',
                    component: () => import('@/components/index/dashboard/Dashboard'),
                    meta: {
                        title: '主页',
                        requireAuth: true
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
                    path: '/submission/:id',
                    component: () => import('@/components/index/submission/Submission'),
                    meta: {
                        title: '判卷详情'
                    }
                },
                {
                    path: '/contest/:cid',
                    component: () => import('@/components/index/contest/ContestDetail'),
                    meta: {
                        title: '比赛详情'
                    }
                },
                {
                    path: '/contest/:cid/leaderboard',
                    component: () => import('@/components/index/leaderboard/ContestLeaderboard'),
                    meta: {
                        title: '比赛排行榜'
                    }
                },
                {
                    path: '/contest/:cid/problems',
                    component: () => import('@/components/index/contest/problems/ContestProblems'),
                    meta: {
                        title: 'xxx比赛',
                        requireAuth: true
                    }
                },
                {
                    path: '/contest/:cid/problem/:pid',
                    component: () => import('@/components/index/problem/ProblemDetail'),
                    meta: {
                        title: 'xx比赛的题目',
                        requireAuth: true
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
                    path: '/problem/:pid',
                    component: () => import('@/components/index/problem/ProblemDetail'),
                    meta: {
                        title: '题目详情'
                    }
                },
                {
                    path: '/group/:gid',
                    component: () => import('@/components/index/group/GroupDetail'),
                    meta: {
                        title: '加入小组'
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
            meta: {
                requireAuth: true
            },
            children: [
                {
                    path: '/',
                    component: () => import('@/components/user/profile/Profile'),
                    meta: {
                        title: '个人资料'
                    }
                }, 
                {
                    path: 'security',
                    component: () => import('@/components/user/security/Security'),
                    meta: {
                        title: '账号安全'
                    }
                },
                {
                    path: 'problem',
                    component: () => import('@/components/user/problem_admin/ProblemAdmin'),
                    meta: {
                        title: '问题管理'
                    }
                },
                {
                    path: 'contest',
                    component: () => import('@/components/user/contest_admin/ContestAdmin'),
                    meta: {
                        title: '比赛管理'
                    }
                },
                {
                    path: 'my_contest',
                    component: () => import('@/components/user/my_contest/MyContest'),
                    meta: {
                        title: '我的比赛'
                    }
                },
                {
                    path: 'group',
                    component: () => import('@/components/user/group_admin/GroupAdmin'),
                    meta: {
                        title: '小组管理'
                    }
                },
                {
                    path: 'my_group',
                    component: () => import('@/components/user/my_group/MyGroup'),
                    meta: {
                        title: '我的小组'
                    }
                }
            ]
        },
        {
            path: '/user_admin',
            component: () => import('@/components/user_admin/Main'),
            meta: {
                requireAuth: true
            },
            children: [
                {
                    path: 'problem/add',
                    component: () => import('@/components/user_admin/problem/AddProblem'),
                    meta: {
                        title: '创建题目'
                    }
                },
                {
                    path: 'problem/:pid/edit',
                    component: () => import('@/components/user_admin/problem/problem_edit/ProblemEdit'),
                    meta: {
                        title: '题目编辑'
                    }
                },
                {
                    path: 'contest/add',
                    component: () => import('@/components/user_admin/contest/AddContest'),
                    meta: {
                        title: '创建比赛'
                    }
                },
                {
                    path: 'contest/:cid/edit',
                    component: () => import('@/components/user_admin/contest/contest_edit/ContestEdit'),
                    meta: {
                        title: 'xxx比赛编辑'
                    }
                },
                {
                    path: 'group/add',
                    component: () => import('@/components/user_admin/group/AddGroup'),
                    meta: {
                        title: '创建小组'
                    }
                },
                {
                    path: 'group/:gid/edit',
                    component: () => import('@/components/user_admin/group/group_edit/GroupEdit'),
                    meta: {
                        title: '编辑小组'
                    }
                },

            ]
        },
        {
            path: '/admin',
            component: () => import('@/components/admin/Main'),
            meta: {
                requireAuth: true
            },
            children: [
                {
                    path: '/',
                    component: () => import('@/components/admin/Index'),
                    meta: {
                        title: '管理中心'
                    }
                },
                {
                    path: 'announcement',
                    component: () => import('@/components/admin/Announcement'),
                    meta: {
                        title: '公告管理'
                    }
                },
                {
                    path: 'setting',
                    component: () => import('@/components/admin/Setting'),
                    meta: {
                        title: '系统设置'
                    }
                },
                {
                    path: 'judger',
                    component: () => import('@/components/admin/Judger'),
                    meta: {
                        title: '判卷机管理'
                    }
                },
                {
                    path: 'user',
                    component: () => import('@/components/admin/User'),
                    meta: {
                        title: '用户管理'
                    }
                },
                {
                    path: 'group',
                    component: () => import('@/components/admin/Group'),
                    meta: {
                        title: '小组管理'
                    }
                },
                {
                    path: 'contest',
                    component: () => import('@/components/admin/Contest'),
                    meta: {
                        title: '比赛管理'
                    }
                },
                {
                    path: 'auditing',
                    component: () => import('@/components/admin/Auditing'),
                    meta: {
                        title: '审核管理'
                    }
                },
                {
                    path: 'problem',
                    component: () => import('@/components/admin/Problem'),
                    meta: {
                        title: '题目管理'
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
    ],
    scrollBehavior (to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition
        } else {
            return { x: 0, y: 0 }
        }
      }
})

router.beforeEach((to, from, next) => {
    let webTitle = ''
    if(Store.state.setting.title.length != 0) {
        webTitle = ' - '+Store.state.setting.title
    }
    document.title = to.meta.title+webTitle+Config.TITLE
    iView.LoadingBar.start();    
    if(to.matched.some(record => record.meta.requireAuth)) {
        if (!Cookie.get('token')) {
            iView.Message.warning('请登入')
            next({
                path: '/login',
                query: { redirect: to.fullPath }
            })
        } else {
            next()
        }
    } else {
        next()
    }
})

router.afterEach(route => {
    iView.LoadingBar.finish();
})
export default router
