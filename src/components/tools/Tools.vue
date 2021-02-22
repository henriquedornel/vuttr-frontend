<template>
	<div class="tools">
		<Spinner v-if="loadingSpinner" :caption="$t('spinners.load')" variant="primary" size="large" />
		<div v-else class="tools-content">
			<FormModal />
			<DeleteModal />
			<AddFirst v-if="addFirst" />
			<div v-else>
				<Menu />
				<Spinner v-if="searchSpinner" :caption="$t('spinners.search')" variant="primary" size="medium" />
				<div v-else>
					<p v-if="emptyResult" class="empty-result">
						{{ $t('messages.emptyResult') }}
					</p>
					<div v-else>
						<List :tools="tools" />
						<scroll-loader :loader-method="loadTools" :loader-disable="!loadMore" />
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
import Spinner from '@/components/tools/Spinner'

import axios from 'axios'
import tools from '@/mixins/tools'

export default {
	components: { Menu, List, FormModal, DeleteModal, AddFirst, Spinner },
	mixins: [ tools ],
	data: () => ({
        loadingSpinner: true,
		addFirst: false,
		emptyResult: false
    }),
	computed: {
		tools() { return this.$store.state.tools },
		search() { return this.$store.state.search },
        tagsOnly() { return this.$store.state.tagsOnly },
		searchSpinner() { return this.$store.state.searchSpinner },
        count() { return this.$store.state.count },
        page() { return this.$store.state.page },
        limit() { return this.$store.state.limit },
		loadMore() { return (this.page - 1) * this.limit < this.count }
	},
	methods: {
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
        }
	},
	mounted() {
		this.loadTools()
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
</style>