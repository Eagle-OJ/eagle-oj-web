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
            oss_url: ''
        }
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
        }
    },
    actions: {
        setWebsite() {
            Axios.get('/setting').then(res => {
                this.commit('setWebsite', res.data)
            })
        },
        getUserInfo() {
            Axios.get('/user/info').then(res => {
                this.commit('login', res.data)
            }) 
        },
    }
})
