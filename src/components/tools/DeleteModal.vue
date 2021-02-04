<template>
    <b-modal id="delete-modal" centered hide-header @hidden="hide" @ok="remove">
		<input id="tool-id" type="hidden" v-model="tool.id" />
		<p class="delete-msg">
			Are you sure you want to remove the tool <strong>{{ tool.title }}</strong>?
		</p>
		<template #modal-footer="{ ok, cancel }">
			<b-button variant="secondary" class="modal-button" @click="cancel()">
				Cancel
			</b-button>
			<b-button variant="danger" class="modal-button" @click="ok()">
				Yes
			</b-button>
		</template>
	</b-modal>
</template>

<script>
import toolCrud from '@/mixins/toolCrud'

export default {
    mixins: [ toolCrud ],
    computed: {
		tool() {
            return this.$store.state.tool
        }
    }
}
</script>

<style>
#delete-modal .delete-msg {
    font-size: 20px;
    padding-top: 20px;
}
#delete-modal button.modal-button {
	margin-left: 20px;
}
</style>