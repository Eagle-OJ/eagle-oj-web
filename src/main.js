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
if (process.env.NODE_ENV == 'development') {
    Axios.defaults.baseURL = Config.API_URL
}
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
                case 400:
                    iView.Message.error(error.response.data.message)
                    break
                case 401:
                    // 返回 401 清除token信息并跳转到登录页面
                    iView.Message.error('请登入')
                    store.commit('logout')
                    router.replace({
                        path: '/login',
                        query: {redirect: router.currentRoute.fullPath}
                    })
                    break
                case 403:
                    iView.Message.error('你无权进行此操作')
                    break
                case 404:
                    iView.Message.error('无法找到请求页面')
                    break
                case 500:
                    iView.Message.error('服务器出错')
                    break
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
    if(store.state.setting.is_open_storage) {
        return store.state.setting.oss_url+url
    } else {
        return ''
    }
}

Vue.prototype.$getAvatar = function(aid) {
    if(aid == 0 || !store.state.setting.is_open_storage) {
        return '/static/default_avatar.jpg'
    } else if (process.env.NODE_ENV == 'development') {
        return '/api/avatar?aid='+aid
    } else {
        return '/avatar?aid='+aid
    }
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
