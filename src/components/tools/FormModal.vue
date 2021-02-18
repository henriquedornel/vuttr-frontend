<template>    
    <b-modal id="form-modal" ref="modal" centered @show="initModal" @hidden="resetTool" @ok="handleSubmit">
        <template #modal-header="{ close }">
            <h1 class="modal-title" :class="$mq">{{ title }}</h1>
            <button type="button" class="close" @click="close()">×</button>
        </template>
        <form ref="form">
            <input id="tool-id" type="hidden" v-model="tool.id" />
            <FormField v-for="field in fields" :key="field.key" :field="field" :disabled="buttonSpinner" />
        </form>
        <template #modal-footer="{ ok, cancel }">
            <b-button variant="secondary" class="modal-button" @click="cancel()" :class="$mq"
                :disabled="buttonSpinner">
                Cancel
            </b-button>
            <b-button variant="primary" class="modal-button" @click="ok()" :class="$mq"
                :disabled="buttonSpinner">
                <Spinner v-if="buttonSpinner" caption="Saving" size="small" />
                <span v-else>Save</span>                
            </b-button>
        </template>
    </b-modal>
</template>

<script>
import FormField from '@/components/tools/FormField'
import Spinner from '@/components/tools/Spinner'

import axios from 'axios'
import tools from '@/mixins/tools'

export default {
    components: { FormField, Spinner },
    mixins: [ tools ],    
    data: () => ({
        buttonSpinner: false,
        fields: [
			{ key: 'title', caption: 'Tool Name', type: 'input', maxlength: 50, state: null, required: true },
			{ key: 'link', caption: 'Tool Link', type: 'input', maxlength: 255, state: null, required: true },
			{ key: 'description', caption: 'Tool Description', type: 'text', maxlength: 400 },
			{ key: 'tags', caption: 'Tags', type: 'input', maxlength: 140 },
        ]
    }),
    computed: {
		tool() {
            return this.$store.state.tool
        },
        title() {
            return this.tool.id ? 'Edit tool' : 'Add new tool'
        },
    },
    methods: {
        initModal() {
            this.fields.forEach(field => {
                field.state = true
            })
        },

        handleSubmit(bvModalEvt) {
            bvModalEvt.preventDefault() //prevent modal from closing          
            if(!this.checkFormValidity()) { //exit when the form isn't valid
                return
            }
            this.buttonSpinner = true
            this.save()
        },

		save() {            
            const tool = { ...this.tool }
            tool.title = this.removeExtraSpaces(tool.title),
            tool.link = this.handleUrl(tool.link),
            tool.description = this.removeExtraSpaces(tool.description),
            tool.tags = this.tagsToArray(tool.tags)

            const method = tool.id ? 'put' : 'post'
            const operation = tool.id ? 'updated' : 'added'
            const id = tool.id ? `/${tool.id}` : ''

            axios[method](`${this.baseApiUrl}/tools${id}`, tool)
                .then(() => {
                    this.$toasted.global.defaultSuccess({
                        msg: `The tool ${tool.title} has been ${operation} successfully`
                    })
                    this.updateToolsList()
                    this.$bvModal.hide('form-modal')
                })
                .catch(this.showError)
                .finally(() => {
                    this.buttonSpinner = false
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

        checkNotEmpty(value) {
            if(!value ||
              (Array.isArray(value) && value.length === 0) ||
              (typeof value === 'string' && !value.trim())) {
                return false
            }
            return true
        },

        removeSpaces(value, replace = '') {
            if(!value) return ''
            return value
                .replace(/\s+/g, replace)
                .trim()
        },

        removeExtraSpaces(value) {
            return this.removeSpaces(value, ' ')
        },

        handleUrl(value) {
            value = this.removeSpaces(value)
            if(value.substring(0, 7) !== 'http://' && value.substring(0, 8) !== 'https://') {
                value = 'http://' + value
            }
            return value
        },
        
        tagsToArray(tagsString) {
            if(!tagsString || tagsString.trim() === '')  return []
            
            const tagsArray = tagsString
                .toLowerCase()
                .replace(/[#,;]/g, ' ') //substitui hashtag, vírgula e ponto e vírgula por um espaço em branco
                .replace(/[^a-zA-Z0-9\s]/g, '') //remove tudo que não for caracter, dígito ou espaço em branco
                .replace(/\s+/g, ' ') //substitui qualquer sequência de espaços em branco, tabulação ou quebra de linha por um espaço em branco simples
                .trim()
                .split(' ') //converte em um array
            
            return tagsArray[0] === '' ? [] : tagsArray
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
    width: 98px; 
	margin-left: 20px;
	&.md,
	&.sm,
	&.xs {
		margin-left: 10px;
	}
}
</style>