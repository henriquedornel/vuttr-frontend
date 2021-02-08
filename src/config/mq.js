import Vue from 'vue'
import VueMq from 'vue-mq'

Vue.use(VueMq, {
    breakpoints: {
        xs: 360,
        sm: 510,
        md: 615,
        lg: 960,
        xl: Infinity
    }
})