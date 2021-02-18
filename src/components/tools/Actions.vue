<template>
    <b-dropdown class="actions" variant="link" no-caret right>
        <template #button-content>
            <img src="@/assets/icons/menu.svg" alt="" />
            <span class="sr-only">Actions</span>
        </template>
        <b-dropdown-item v-b-modal.form-modal @click="loadTool(tool)">
            Edit
        </b-dropdown-item>
        <b-dropdown-divider></b-dropdown-divider>
        <b-dropdown-item v-b-modal.delete-modal variant="danger" @click="loadTool(tool)">
            Remove
        </b-dropdown-item>
    </b-dropdown>
</template>

<script>
import tools from '@/mixins/tools'

export default {
	mixins: [tools],
    props: [ 'tool' ],
    methods: {        
		loadTool(tool) {
            this.$store.commit('mutate', { prop: 'tool', with: {
				id: tool.id,
				title: tool.title,
				link: tool.link,
                description: tool.description,
                tags: this.tagsToString(tool.tags)
			}})
        },
    }
}
</script>

<style lang="scss">
@import '@/styles/custom.scss';

.actions .dropdown-menu {
	box-shadow: $dropdown-box-shadow;
}
</style>