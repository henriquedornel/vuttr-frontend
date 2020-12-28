import Vue from 'vue'
import VueMq from 'vue-mq'

Vue.use(VueMq, {
    breakpoints: {
        xs: 360,
        sm: 490,
        md: 600,
        lg: 960,
        xl: Infinity
    }
})