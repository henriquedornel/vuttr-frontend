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
import toolCrud from '@/mixins/toolCrud'

export default {
	mixins: [toolCrud],
    props: [ 'tool' ]
}
</script>

<style lang="scss">
@import '@/styles/custom.scss';

.actions .dropdown-menu {
	box-shadow: $dropdown-box-shadow;
}
</style>