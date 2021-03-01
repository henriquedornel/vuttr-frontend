<template>
    <b-dropdown class="actions" variant="none" no-caret right>
        <template #button-content>
            <fa-icon :icon="['fas', 'ellipsis-v']" />
            <span class="sr-only">
                {{ $t('actions.actions') }}
            </span>
        </template>
        <b-dropdown-item v-b-modal.tool-form-modal @click="loadTool">
            {{ $t('actions.edit') }}
        </b-dropdown-item>
        <b-dropdown-divider></b-dropdown-divider>
        <b-dropdown-item v-b-modal.tool-delete-modal variant="danger" @click="loadTool">
            {{ $t('actions.delete') }}
        </b-dropdown-item>
    </b-dropdown>
</template>

<script>
import toolsMixin from '@/mixins/toolsMixin'

export default {
	mixins: [ toolsMixin ],
    props: [ 'tool' ],
    methods: {
		loadTool() {
            this.$store.commit('mutate', { prop: 'tool', with: {
				id: this.tool.id,
				title: this.tool.title,
				link: this.tool.link,
                description: this.tool.description,
                tags: this.tagsToString(this.tool.tags)
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
.actions svg {
    margin: 0 3px;
    color: $white;
}
</style>