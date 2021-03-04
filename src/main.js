import Vue from 'vue'
import App from './App'

import './config/font-awesome'
import './config/bootstrap'
import './config/mq'
import './config/scroll-loader'
import './config/toasted'
import './config/google'

import router from './config/router'
import store from './config/store'
import i18n from './config/i18n'

Vue.config.productionTip = false

new Vue({
    router,
    store,
    i18n,
    render: h => h(App)
}).$mount('#app')