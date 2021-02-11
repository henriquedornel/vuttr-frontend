import axios from 'axios'
import global from '@/mixins/global'

export default {
    mixins: [ global ],
	methods: {
        hide() {
            this.reset()
            this.loadTools()
        },
		reset() {
            this.$store.commit('mutate', { prop: 'modalTitle', with: 'Add new tool' })
            this.$store.commit('mutate', { prop: 'tool', with: {} })
        },
        loadTools() {
            const baseApiUrl = process.env.VUE_APP_BASE_API_URL
            const search = this.$store.state.search
            const tagsOnly = this.$store.state.tagsOnly
            const currentPage = this.$store.state.page
            const limit = (currentPage - 1) * this.$store.state.limit
            let url = `${baseApiUrl}/tools?page=1&limit=${limit}`
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
            const baseApiUrl = process.env.VUE_APP_BASE_API_URL
            const search = this.$store.state.search
            const tagsOnly = this.$store.state.tagsOnly
            let url = `${baseApiUrl}/tools?limit=`
            url += tagsOnly ? `&tag=${search}` : `&search=${search}`
            axios.get(url).then(res => {
                res.data && this.$store.commit('mutate', { prop: 'count', with: res.data.length })
            })
        },
        tagsList(tagsArray) {
            return tagsArray.map((tag) => `#${tag}`).join(" ")
        }
    }
}