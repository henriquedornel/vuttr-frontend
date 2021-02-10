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
        tagsArray: (tagsList) => {
            if(!tagsList || tagsList.trim() === '') {
                return []
            }
            return tagsList.toLowerCase()
                .replace(/[#,;]/g, ' ') //substitui hashtag, vírgula e ponto e vírgula por um espaço em branco
                .replace(/[^a-zA-Z0-9\s]/g, '') //remove tudo que não for caracter, dígito ou espaço em branco
                .replace(/\s+/g, ' ') //substitui qualquer sequência de espaços em branco, tabulação ou quebra de linha por um espaço em branco simples
                .trim()
                .split(' ') //converte em um array
        },
        tagsList: (tagsArray) => {
            return tagsArray.map((tag) => `#${tag}`).join(" ")
        }
    }
}