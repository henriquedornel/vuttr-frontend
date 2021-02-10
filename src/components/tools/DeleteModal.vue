<template>
    <b-modal id="delete-modal" centered hide-header @hidden="hide" @ok="handleRemove">
		<input id="tool-id" type="hidden" v-model="tool.id" />
		<p class="delete-msg">
			Are you sure you want to remove the tool <strong>{{ tool.title }}</strong>?
		</p>
		<template #modal-footer="{ ok, cancel }">
			<b-button variant="secondary" class="modal-button" @click="cancel()"
                :disabled="buttonSpinner">
				Cancel
			</b-button>
			<b-button variant="danger" class="modal-button" @click="ok()"
                :disabled="buttonSpinner">
				<div v-if="buttonSpinner">
                    <b-spinner small></b-spinner>
                    <span class="sr-only">Removing...</span>
                </div>
                <span v-else>Yes</span>
			</b-button>
		</template>
	</b-modal>
</template>

<script>
import axios from 'axios'
import tools from '@/mixins/tools'

export default {
    mixins: [ tools ],
	data() {
		return {
            buttonSpinner: false
		}
    },
    computed: {
		tool() {
            return this.$store.state.tool
        }
    },
    methods: {
        handleRemove(bvModalEvt) {
            bvModalEvt.preventDefault() //prevent modal from closing
            this.buttonSpinner = true
            this.remove()
        },
        remove() {
            const id = this.tool.id
            const title = this.tool.title
            axios.delete(`${process.env.VUE_APP_BASE_API_URL}/tools/${id}`)
                .then(() => {
                    this.$toasted.global.defaultSuccess({
                        msg: `The tool ${title} has been removed successfully`
                    })
                    this.$bvModal.hide('delete-modal')
                })
                .catch(this.showError)
                .finally(() => {
                    this.buttonSpinner = false                    
                })
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
    width: 98px; 
	margin-left: 20px;
}
</style>