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
Axios.defaults.baseURL = Config.TITLE

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
	store,
    template: '<App/>',
    components: { App }
})
