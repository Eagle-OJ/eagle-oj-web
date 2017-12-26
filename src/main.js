// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import iView from 'iview'
import 'iview/dist/styles/iview.css';
import Axios from 'axios'
import Cookie from 'js-cookie'
import Config from '@/env.js'

Vue.use(iView)

Vue.prototype.$http = Axios
Vue.prototype.$cookie = Cookie

Vue.config.productionTip = false

// config axios
Axios.defaults.baseURL = Config.API_URL

// Add a request interceptor
Axios.interceptors.request.use(function (config) {
    // Do something before request is sent
    let token = Cookie.get('token')
    if(token !== undefined) {
        config.headers.Authorization = token
    }
    return config;
    }, function (error) {
    // Do something with request error
    return Promise.reject(error);
});

// Add a response interceptor
Axios.interceptors.response.use(function (response) {
    // Do something with response data
    return response.data;
    }, function (error) {
    // Do something with response error
    if (error.response) {
        switch (error.response.status) {
            case 401:
                // 返回 401 清除token信息并跳转到登录页面
                store.commit('logout')
                router.replace({
                    path: '/login',
                    query: {redirect: router.currentRoute.fullPath}
                })
        }
        return Promise.reject(error.response.data);                
    } else {
        return Promise.reject(error); 
    }
});

// 初始化网站整体配置
store.dispatch('setWebsite')

// 如果存在token密钥，进行用户自动登入，并且获取信息
if (Cookie.get('token')) {
    store.dispatch('getUserInfo')    
}

Vue.prototype.$getUrl = function(url) {
    return store.state.setting.oss_url+url
}

Vue.prototype.$getAvatar = function(aid) {
    return 'http://localhost:8080/avatar?aid='+aid
}

Vue.prototype.$getLang = function(text) {
    return store.state.setting.lang[text]
}

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
	store,
    template: '<App/>',
    components: { App }
})
