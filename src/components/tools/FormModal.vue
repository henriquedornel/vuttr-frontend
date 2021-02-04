<template>    
    <b-modal id="form-modal" ref="modal" centered @show="resetModal" @hidden="hide" @ok="handleSubmit">
        <template #modal-header="{ close }">
            <h1 class="modal-title" :class="$mq">{{ modalTitle }}</h1>
            <button type="button" class="close" @click="close()">×</button>
        </template>
        <form ref="form">
            <input id="tool-id" type="hidden" v-model="tool.id" />
            <FormField v-for="field in fields" :key="field.key" :fieldName="field.key" :type="field.type"
                :caption="field.caption" :maxlength="field.maxlength" :required="field.required"
                :state="field.state" />
        </form>
        <template #modal-footer="{ ok, cancel }">
            <b-button variant="secondary" class="modal-button" @click="cancel()" :class="$mq">
                Cancel
            </b-button>
            <b-button variant="primary" class="modal-button" @click="ok()" :class="$mq">
                Save
            </b-button>
        </template>
    </b-modal>
</template>

<script>
import FormField from '@/components/tools/FormField'

import toolCrud from '@/mixins/toolCrud'

export default {
    components: { FormField },
    mixins: [ toolCrud ],
    computed: {
        modalTitle() { return this.$store.state.modalTitle },
		tool() { return this.$store.state.tool }
    },
	data() {
		return {
			fields: [
				{ key: 'title', caption: 'Tool Name', type: 'input', maxlength: 50, state: null, required: true },
				{ key: 'link', caption: 'Tool Link', type: 'input', maxlength: 255, state: null, required: true },
				{ key: 'description', caption: 'Tool Description', type: 'text', maxlength: 700, state: null, required: false },
				{ key: 'tags', caption: 'Tags', type: 'input', maxlength: 140, state: null, required: false }
            ],
            submittedFields: []
		}
    },
    methods: {
        resetModal() {
            this.fields.forEach(field => {
                field.state = true
            })
        },
        checkFormValidity() { 
            let valid = true
            this.fields.forEach(field => {
                if(field.required) {
                    field.state = this.checkNotEmpty(this.tool[field.key])
                    if(!field.state) {
                        valid = false
                    }
                }                
            })
            return valid
        },
        handleSubmit(bvModalEvt) {
            bvModalEvt.preventDefault() //prevent modal from closing          
            if(!this.checkFormValidity()) { //exit when the form isn't valid
                return
            }
            this.save()
        }
    }
}
</script>

<style lang="scss">
#form-modal .modal-title {
	font-size: 24px;
	&.md,
	&.sm,
	&.xs {
		font-size: 20px;
	}
}
#form-modal button.close:active,
#form-modal button.close:focus {
	outline: 0;
}
#form-modal button.modal-button {
	margin-left: 20px;
	&.md,
	&.sm,
	&.xs {
		margin-left: 10px;
	}
}
</style>