import Vue from 'vue'
import App from './App'

import './config/bootstrap'
import './config/mq'
import './config/axios'
import './config/toasted'

import 'font-awesome/css/font-awesome.css'

Vue.config.productionTip = false

new Vue({
    render: h => h(App)
}).$mount('#app')