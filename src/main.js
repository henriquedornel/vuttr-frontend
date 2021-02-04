import Vue from 'vue'
import App from './App'

import ScrollLoader from 'vue-scroll-loader'
Vue.use(ScrollLoader)

import './config/bootstrap'
import './config/mq'
import './config/axios'
import './config/toasted'

import 'font-awesome/css/font-awesome.css'

import router from './config/router'
import store from './config/store'

Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')