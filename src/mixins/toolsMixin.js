import axios from 'axios'
import globalMixin from '@/mixins/globalMixin'

export default {
    mixins: [ globalMixin ],
	methods: {
        updateToolsList() {
            const search = this.$store.state.search
            const tagsOnly = this.$store.state.tagsOnly
            const currentPage = this.$store.state.page
            const limit = (currentPage - 1) * this.$store.state.limit
            
            let url = `${this.baseApiUrl}/tools?page=1&limit=${limit}`
            url += tagsOnly ? `&tag=${search}` : `&search=${search}`

			axios.get(url).then(res => {
                if(res.data) {
                    this.$store.commit('mutate', { prop: 'tools', with: res.data })
                    this.$store.commit('mutate', { prop: 'searchSpinner', with: false })
                    this.setToolsCount()
                }
            })
            .catch(this.showError)
        },
        
        setToolsCount() {
            const search = this.$store.state.search
            const tagsOnly = this.$store.state.tagsOnly

            let url = `${this.baseApiUrl}/tools?limit=`
            url += tagsOnly ? `&tag=${search}` : `&search=${search}`

            axios.get(url).then(res => {
                res.data && this.$store.commit('mutate', { prop: 'count', with: res.data.length })
            })
        },

        tagsToString(tagsArray) {
            return tagsArray.map((tag) => `#${tag}`).join(" ")
        }
    }
}