import Vue from 'vue'
import VueRouter from 'vue-router'

import Auth from '@/components/user/Auth'
import Tools from '@/components/tools/Tools'

Vue.use(VueRouter)

const routes = [{
    name: 'auth',
    path: '/auth',
    component: Auth
}, {
    name: 'tools',
    path: '/',
    component: Tools
}]

export default new VueRouter({
    mode: 'history',
    routes
})