import { showError } from '@/global'
import axios from 'axios'

export default {
	methods: {
		init() {
            this.reset()
            this.getToolsLoader()
		},
        hide() {
            this.reset()
            this.loadTools()
        },
		reset() {
            this.$store.commit('mutate', { prop: 'modalTitle', with: 'Add new tool' })
            this.$store.commit('mutate', { prop: 'tool', with: {} })
        },
        getToolsLoader() {
            let tools = this.$store.state.tools
            const baseApiUrl = process.env.VUE_APP_BASE_API_URL
            const search = this.$store.state.search
            const tagsOnly = this.$store.state.tagsOnly
            const page = this.$store.state.page
            const limit = this.$store.state.limit
            let url = `${baseApiUrl}/tools?page=${page}&limit=${limit}`
            url += tagsOnly ? `&tag=${search}` : `&search=${search}`
            axios.get(url).then(res => {
                if(res.data) {
                    tools = [...tools, ...res.data]
                    this.$store.commit('mutate', { prop: 'tools', with: tools })
                    this.$store.commit('mutate', { prop: 'page', with: page + 1 })
                    this.setToolsCount()
                }
            })
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
                    this.setToolsCount()
                }
            })
        },
		loadTool(tool) {
            this.$store.commit('mutate', { prop: 'modalTitle', with: 'Edit tool' })
            this.$store.commit('mutate', { prop: 'tool', with: { ...tool } })
            this.$store.commit('mutate', { prop: 'tool', with: {
				id: tool.id,
				title: tool.title,
				link: tool.link,
                description: tool.description,
                tags: this.tagsList(tool.tags)
			}})
        },
		save() {            
            const method = this.tool.id ? 'put' : 'post'
            const operation = this.tool.id ? 'updated' : 'added'
            const id = this.tool.id ? `/${this.tool.id}` : ''
            const tool = { ...this.tool }
            tool.title = tool.title ? tool.title.trim() : '',
            tool.link = tool.link ? tool.link.trim() : '',
            tool.description = tool.description ? tool.description.trim() : '',
            tool.tags = this.tagsArray(tool.tags)
            axios[method](`${process.env.VUE_APP_BASE_API_URL}/tools${id}`, tool)
                .then(() => {
                    this.$toasted.global.defaultSuccess({
                        msg: `The tool ${tool.title} has been ${operation} successfully`
                    })
                    this.$bvModal.hide('form-modal')
                })
                .catch(showError)
        },
        remove() {
            const id = this.tool.id
            axios.delete(`${process.env.VUE_APP_BASE_API_URL}/tools/${id}`)
                .then(() => {
                    this.$toasted.global.defaultSuccess({
                        msg: `The tool ${this.tool.title} has been removed successfully`
                    })
                })
                .catch(showError)
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
        },
        checkNotEmpty(value) {
            if(!value ||
              (Array.isArray(value) && value.length === 0) ||
              (typeof value === 'string' && !value.trim())) {
                return false
            }
            return true
        }
    }
}