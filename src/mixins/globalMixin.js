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
        },

        checkFormValidity(record, fields) {
            let valid = true
            fields.forEach(field => {
                if(field.required) {
                    field.state = this.checkNotEmpty(record[field.key])
                    if(!field.state) valid = false
                }
            })
            return valid
        },
        checkNotEmpty(value) {
            if(!value ||
              (Array.isArray(value) && value.length === 0) ||
              (typeof value === 'string' && !value.trim())) {
                return false
            }
            return true
        },
        
        removeSpaces(value, replace = '') {
            if(!value) return ''
            return value
                .replace(/\s+/g, replace)
                .trim()
        },
        removeExtraSpaces(value) {
            return this.removeSpaces(value, ' ')
        }
    }
}