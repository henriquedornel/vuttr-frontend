<template>
	<div class="tools">
		<AddFirst v-if="addFirst" />
		<div v-else>
			<Menu />
			<List :tools="tools" />
			<DeleteModal />
			<scroll-loader :loader-method="getToolsLoader" :loader-disable="loaderDisable" />
		</div>
		<FormModal />
	</div>
</template>

<script>
import Menu from '@/components/tools/Menu'
import List from '@/components/tools/List'
import FormModal from '@/components/tools/FormModal'
import DeleteModal from '@/components/tools/DeleteModal'
import AddFirst from '@/components/tools/AddFirst'

import toolCrud from '@/mixins/toolCrud'

export default {
	components: { Menu, List, FormModal, DeleteModal, AddFirst },
	mixins: [ toolCrud ],
	data() {
		return {
			addFirst: false
		}
	},
	computed: {
		tools() {
			return this.$store.state.tools
		},
		loaderDisable() {
			const page = this.$store.state.page - 1
			const limit = this.$store.state.limit
			const count = this.$store.state.count
			
			return page * limit >= count
		}
	},
	mounted() {
		this.init()
	},
	watch: {
		tools(array) {
			this.addFirst = array.length === 0
		}
	}
}
</script>

<style>
.tools {
	display: flex;
	flex-direction: column;
	align-items: stretch;
}
</style>