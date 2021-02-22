<template>
    <b-modal id="delete-modal" centered hide-header @hidden="resetTool" @ok="handleRemove">
		<input id="tool-id" type="hidden" v-model="tool.id" />
		<p class="delete-msg">
            {{ $t('confirmations.tool.delete', { title: tool.title }) }}
        </p>
		<template #modal-footer="{ ok, cancel }">
			<b-button variant="secondary" class="modal-button" @click="cancel()"
                :disabled="buttonSpinner" :class="$mq">
				{{ $t('buttons.cancel') }}
			</b-button>
			<b-button variant="danger" class="modal-button" @click="ok()"
                :disabled="buttonSpinner" :class="$mq">
                <Spinner v-if="buttonSpinner" :caption="$t('spinners.delete')" size="small" />
                <span v-else>{{ $t('buttons.confirm') }}</span>
			</b-button>
		</template>
	</b-modal>
</template>

<script>
import Spinner from '@/components/tools/Spinner'

import axios from 'axios'
import tools from '@/mixins/tools'

export default {
    components: { Spinner },
    mixins: [ tools ],
    data: () => ({
        buttonSpinner: false
    }),
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

            axios.delete(`${this.baseApiUrl}/tools/${id}`)
                .then(() => {
                    this.$toasted.global.defaultSuccess({
                        msg: this.$t(
                            'messages.tool.confirmed',
                            { title, operation: this.$t('messages.tool.removed') }
                        )
                    })
                    this.updateToolsList()
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

<style lang="scss">
#delete-modal .delete-msg {
    font-size: 20px;
    padding-top: 20px;
}
#delete-modal button.modal-button {
    min-width: 98px;
    padding: auto 20px; 
	margin-left: 20px;
	&.md,
	&.sm,
	&.xs {
		margin-left: 8px;
	}
}
</style>