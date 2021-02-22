import Vue from 'vue'
import VueMq from 'vue-mq'

Vue.use(VueMq, {
    breakpoints: {
        xs: 360,
        sm: 590,
        md: 685,
        lg: 960,
        xl: Infinity
    }
})