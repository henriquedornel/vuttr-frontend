<template>
	<div class="tools">
		<div v-if="loadingSpinner" class="loading-spinner">
            <b-spinner variant="primary"></b-spinner>
            <span class="sr-only">Loading...</span>
        </div>
		<div v-else>
			<FormModal />
			<AddFirst v-if="addFirst" />
			<div v-else>
				<Menu />
				<div v-if="searchSpinner" class="search-spinner">
					<b-spinner variant="primary"></b-spinner>
					<span class="sr-only">Searching...</span>
				</div>
				<div v-else>
					<p v-if="emptyResult" class="empty-result">
						No tools were found with these keywords
					</p>
					<div v-else>
						<List :tools="tools" />
						<DeleteModal />
						<scroll-loader :loader-method="getToolsLoader" :loader-disable="loaderDisable" />
					</div>
				</div>							
			</div>
		</div>
	</div>
</template>

<script>
import Menu from '@/components/tools/Menu'
import List from '@/components/tools/List'
import FormModal from '@/components/tools/FormModal'
import DeleteModal from '@/components/tools/DeleteModal'
import AddFirst from '@/components/tools/AddFirst'

import axios from 'axios'
import tools from '@/mixins/tools'

export default {
	components: { Menu, List, FormModal, DeleteModal, AddFirst },
	mixins: [ tools ],
	data() {
		return {
			loadingSpinner: true,
			addFirst: false,
			emptyResult: false
		}
	},
	computed: {
		tools() {
			return this.$store.state.tools
		},
		searchSpinner() {
			return this.$store.state.searchSpinner
		},
		loaderDisable() {
			const page = this.$store.state.page - 1
			const limit = this.$store.state.limit
			const count = this.$store.state.count
			
			return page * limit >= count
		}
	},
	methods: {		
		init() {
            this.reset()
            this.getToolsLoader()
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
                    this.loadingSpinner = false
                    this.setToolsCount()
                }
            })
            .catch(this.showError)
        },
	},
	mounted() {
		this.init()
	},
	watch: {
		tools(array) {
			this.addFirst = array.length === 0 && this.$store.state.search === ''
			this.emptyResult = array.length === 0 && this.$store.state.search !== ''
		}
	}
}
</script>

<style>
.tools > div {
	display: flex;
	flex-direction: column;
	align-items: stretch;
}
.tools .empty-result {
	padding-top: 50px;
	font-style: italic;
}
.tools .loading-spinner,
.tools .search-spinner {
	display: flex;
	flex-direction: row;
	justify-content: center;
	margin-top: 50px;
}
.tools .loading-spinner .spinner-border {
	width: 70px;
	height: 70px;
}
</style>