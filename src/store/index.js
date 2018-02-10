import Vue from 'vue'
import Vuex from 'vuex'
import Axios from 'axios'
import router from '../router'
import Cookie from 'js-cookie'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
        userInfo: {
            isLogin: false,
        },
        setting: {
            is_installed: false,
            lang: {},
            oss_config: {
                url: ''
            },
            title: ''
        },
        submissions: [
            // {
            //     title: 'A+B problem',                
            //     path: 'afea',                
            //     id: 'xxxxxxxx',
            //     status: null,
            //     response: {
            //         status: 'TLE',
            //         memory: '123',
            //         time: '3s'
            //     }
            // }
        ],
        judgingList: []
	},
	mutations: {
        setWebsite(state, payload) {
            state.setting = payload
        },
        login(state, payload) {
            state.userInfo = payload
            state.userInfo.isLogin = true
        },
        logout(state) {
            state.userInfo = {}
            state.userInfo.isLogin = false
            router.push('/login')
            Cookie.remove('token')
        },
        addSubmission(state, data) {
            let title = data.title
            let path = data.url            
            let id = data.id
            state.submissions.push({
                path: path,
                title: title,
                id: id,
                status: '队列中',
                response: null
            })
            this.commit('getSubmission', id)
        },
        getSubmission(state, id) {
            let clock = setInterval(() => {
                Axios.get('/code/'+id).then(res => {
                    let data = res.data
                    let index = 0
                    for (let i=0; i<state.submissions.length; i++) {
                        if (state.submissions[i].id == id) {
                            index = i
                        }
                    }
                    let newArray = []
                    for (let i=0; i<state.submissions.length; i++) {
                        let obj = state.submissions[i]                        
                        if (index == i) {
                            obj.status = data.status
                            obj.response = data.response
                        } 
                        newArray.push(obj)                        
                    }
                    state.submissions = newArray
                    // 判卷完成
                    if (data.status == '完成' || data.status == '错误') {
                        Cookie.remove()
                        clearInterval(clock)
                    }
                }).catch((res) => {
                    let index = 0
                    for (let i=0; i<state.submissions.length; i++) {
                        if (state.submissions[i].id == id) {
                            index = i
                        }
                    }
                    state.submissions.splice(index, 1)
                    clearInterval(clock)
                })
            }, 1000)
        },
        deleteSubmission(state, index) {
            state.submissions.splice(index, 1)
        }
    },
    actions: {
        setWebsite() {
            Axios.get('/setting').then(res => {
                this.commit('setWebsite', res.data)
                if(! res.data.is_installed) {
                    router.push('/install')
                }
            }).catch(res => {
                router.push('/500')
            })
        },
        getUserInfo() {
            Axios.get('/user').then(res => {
                this.commit('login', res.data)
            }) 
        },
    }
})
