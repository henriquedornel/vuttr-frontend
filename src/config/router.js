import Vue from 'vue'
import VueRouter from 'vue-router'

import Tools from '@/components/tools/Tools'

Vue.use(VueRouter)

const routes = [{
    name: 'tools',
    path: '/',
    component: Tools
}]

export default new VueRouter({
    mode: 'history',
    routes
})