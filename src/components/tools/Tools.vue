<template>
	<div class="tools">
		<Spinner v-if="loadingSpinner" :caption="$t('spinners.load')" variant="primary" size="large" />
		<div v-else class="tools-content">
			<FormModal entity="tool" :record="tool" name="tool-form-modal"
                :fields="fields" :title="modalTitle"
				:hiddenFunction="resetTool" :submitFunction="saveTool"
                :validationFunction="checkFormValidity" />
			<DeleteModal entity="tool" :record="tool" name="tool-delete-modal"
                :msg="$t('confirmations.tool.delete', { title: tool.title })"
				:hiddenFunction="resetTool" :deleteFunction="deleteTool" />
			<AddFirst v-if="addFirst" />
			<div v-else>
				<div class="menu" :class="$mq">
					<SearchBar />
					<AddButton />
				</div>
				<Spinner v-if="searchSpinner" :caption="$t('spinners.search')" variant="primary" size="medium" />
				<div v-else>
					<p v-if="emptyResult" class="empty-result">
						{{ $t('messages.emptyResult') }}
					</p>
					<div v-else>
						<ul>
							<li v-for="tool in tools" :key="tool.id">
								<Card :tool="tool" />
							</li>
						</ul>
						<scroll-loader :loader-method="loadTools" :loader-disable="!loadMore" />
					</div>
				</div>							
			</div>
		</div>
	</div>
</template>

<script>
import SearchBar from './SearchBar'
import AddButton from './AddButton'
import AddFirst from './AddFirst'
import Card from './Card'
import Spinner from '@/components/template/Spinner'
import FormModal from '@/components/modals/FormModal'
import DeleteModal from '@/components/modals/DeleteModal'

import axios from 'axios'
import toolsMixin from '@/mixins/toolsMixin'

export default {
	components: { SearchBar, AddButton, AddFirst, Card, Spinner, FormModal, DeleteModal },
	mixins: [ toolsMixin ],
	data: () => ({
        loadingSpinner: true,
		addFirst: false,
		emptyResult: false,
        fields: [
            { key: 'title', maxlength: 50, state: null, required: true },
            { key: 'link', maxlength: 255, state: null, required: true },
            { key: 'description', type: 'textarea', maxlength: 400 },
            { key: 'tags', maxlength: 140 },
        ]
    }),
	computed: {
		tools() { return this.$store.state.tools },
		tool() { return this.$store.state.tool },
        modalTitle() { return this.tool.id ? this.$t('titles.tool.edit') : this.$t('titles.tool.add') },
		search() { return this.$store.state.search },
        tagsOnly() { return this.$store.state.tagsOnly },
		searchSpinner() { return this.$store.state.searchSpinner },
        count() { return this.$store.state.count },
        page() { return this.$store.state.page },
        limit() { return this.$store.state.limit },
		loadMore() { return (this.page - 1) * this.limit < this.count }
	},
	mounted() {
		this.loadTools()
	},
	methods: {
		resetTool() {
            this.$store.commit('mutate', { prop: 'tool', with: {} })
        },

		loadTools() {
            let url = `${this.baseApiUrl}/tools?page=${this.page}&limit=${this.limit}`
            url += this.tagsOnly ? `&tag=${this.search}` : `&search=${this.search}`
			
            axios.get(url).then(res => {
                if(res.data) {
                    let tools = [...this.tools, ...res.data]
                    this.$store.commit('mutate', { prop: 'tools', with: tools })
                    this.$store.commit('mutate', { prop: 'page', with: this.page + 1 })
                    this.loadingSpinner = false
                    this.setToolsCount()
                }
            })
            .catch(this.showError)
        },

		saveTool() {
            const tool = { ...this.tool }
            tool.title = this.removeExtraSpaces(tool.title)
            tool.link = this.handleUrl(tool.link)
            tool.description = this.removeExtraSpaces(tool.description)
            tool.tags = this.tagsToArray(tool.tags)

            const method = tool.id ? 'put' : 'post'
            const operation = this.$t(tool.id ? 'messages.tool.updated' : 'messages.tool.added')
            const id = tool.id ? `/${tool.id}` : ''

            axios[method](`${this.baseApiUrl}/tools${id}`, tool)
                .then(() => {
                    this.$toasted.global.defaultSuccess({
                        msg: this.$t(
                            'messages.tool.confirmed',
                            { title: tool.title, operation }
                        )
                    })
                    this.updateToolsList()
                    this.$bvModal.hide('tool-form-modal')
                })
                .catch(this.showError)
                .finally(() => {
                    this.$store.commit('mutate', { prop: 'buttonSpinner', with: false })
                })
        },
        
        deleteTool() {
            const id = this.tool.id
            const title = this.tool.title

            axios.delete(`${this.baseApiUrl}/tools/${id}`)
                .then(() => {
                    this.$toasted.global.defaultSuccess({
                        msg: this.$t(
                            'messages.tool.confirmed',
                            { title, operation: this.$t('messages.tool.removed') }
                        )
                    })
                    this.updateToolsList()
                    this.$bvModal.hide('tool-delete-modal')
                })
                .catch(this.showError)
                .finally(() => {
                    this.$store.commit('mutate', { prop: 'buttonSpinner', with: false })
                })
        },

        handleUrl(value) {
            value = this.removeSpaces(value)
            if(value && value.substring(0, 7) !== 'http://' && value.substring(0, 8) !== 'https://') {
                value = 'http://' + value
            }
            return value
        },
        
        tagsToArray(tagsString) {
            if(!tagsString || tagsString.trim() === '')  return []
            
            const tagsArray = tagsString
                .toLowerCase()
                .replace(/[#,;]/g, ' ') //substitui hashtag, vírgula e ponto e vírgula por um espaço em branco
                .replace(/[^a-zA-Z0-9\s]/g, '') //remove tudo que não for caracter, dígito ou espaço em branco
                .replace(/\s+/g, ' ') //substitui qualquer sequência de espaços em branco, tabulação ou quebra de linha por um espaço em branco simples
                .trim()
                .split(' ') //converte em um array
            
            return tagsArray[0] === '' ? [] : tagsArray
        }
	},
	watch: {
		tools(array) {
			this.addFirst = array.length === 0 && this.search === ''
			this.emptyResult = array.length === 0 && this.search !== ''
		}
	}
}
</script>

<style>
.tools .tools-content {
	display: flex;
	flex-direction: column;
	align-items: stretch;
}
.tools .empty-result {
	padding-top: 50px;
	font-style: italic;
}
.tools .menu {
	display: flex;
	flex-direction: row;
	justify-content: space-between;
}
.tools ul {
	margin-bottom: 40px;
	padding: 0;
	list-style-type: none;
}
</style>