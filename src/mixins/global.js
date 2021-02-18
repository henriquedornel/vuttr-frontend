import Vue from 'vue'

export default {
    data: () => ({
        baseApiUrl: process.env.VUE_APP_BASE_API_URL
    }),
	methods: {
        showError(e) {
            if(e && e.response && e.response.data) {
                if(typeof e.response.data === 'object')
                    Vue.toasted.global.defaultError()
                else
                    Vue.toasted.global.defaultError({ msg: e.response.data })
            } else if(typeof e === 'string') {
                Vue.toasted.global.defaultError({ msg: e })
            } else {
                Vue.toasted.global.defaultError()
            }
        }
    }
}