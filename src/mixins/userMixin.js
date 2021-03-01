import axios from 'axios'
import globalMixin from '@/mixins/globalMixin'

export default {
    mixins: [ globalMixin ],
    data: () => ({
        userKey: '__vuttr_user'
    }),
	methods: {
        setUser(user) {
            this.$store.commit('mutate', { prop: 'user', with: user })
            
            if(user) {
                axios.defaults.headers.common['Authorization'] = `bearer ${user.token}`
            } else {
                delete axios.defaults.headers.common['Authorization']
            }
        }
    }
}