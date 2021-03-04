<template>    
    <b-modal :id="name" ref="modal" centered no-stacking
        @show="initModal" @hidden="hiddenFunction" @ok="handleSubmit">
        <template #modal-header="{ close }">
            <h1 class="modal-title form-modal-title" :class="$mq">{{ title }}</h1>
            <button type="button" class="close form-modal-close" @click="close()">×</button>
        </template>
        <form ref="form">
            <input :id="`${entity}-id`" type="hidden" v-model="record.id" />
            <FormField v-for="field in fields" :key="field.key"
                :entity="entity" :field="field" :disabled="field.disabled || buttonSpinner" />
        </form>
        <template #modal-footer="{ ok, cancel }">
            <div class="form-modal-buttons">
                <b-button variant="secondary" @click="cancel()" :class="$mq" :disabled="buttonSpinner">
                    {{ $t('buttons.cancel') }}
                </b-button>
                <b-button variant="primary" @click="ok()" :class="$mq" :disabled="buttonSpinner">
                    <Spinner v-if="buttonSpinner" :caption="$t('spinners.save')" size="small" />
                    <span v-else>
                        {{ $t('buttons.save') }}
                    </span>                
                </b-button>
            </div>
            <div class="form-modal-buttons">
                <b-button v-if="deleteButton" variant="warning" class="delete-button" :class="$mq"
                    v-b-modal="`${entity}-delete-modal`" :disabled="buttonSpinner">
                    <span>{{ deleteButton }}</span>
                </b-button> 
            </div>           
        </template>
    </b-modal>
</template>

<script>
import FormField from './FormField'
import Spinner from '@/components/template/Spinner'

import globalMixin from '@/mixins/globalMixin'
import { mapState } from 'vuex'

export default {
    components: { FormField, Spinner },
    mixins: [ globalMixin ],
    props: {
        entity: String,
        name: String,
        record: Object,
        fields: Array,
        title: String,
        deleteButton: String,
        hiddenFunction: Function,
        validationFunction: Function,
        submitFunction: Function
    },
	computed: mapState(['buttonSpinner']),
    methods: {
        initModal() {
            this.fields.forEach(field => {
                field.state = true
            })
        },

        handleSubmit(bvModalEvt) {
            bvModalEvt.preventDefault() //prevent modal from closing          
            if(!this.validationFunction(this.record, this.fields)) { //exit when the form isn't valid
                return
            }
            this.$store.commit('mutate', { prop: 'buttonSpinner', with: true })
            this.submitFunction()
        }
    }
}
</script>

<style lang="scss">
@import "@/styles/custom.scss";

.form-modal-title {
	font-size: 24px;
	&.md,
	&.sm,
	&.xs {
		font-size: 20px;
	}
}
.form-modal-close:active,
.form-modal-close:focus {
	outline: 0;
}
.modal-footer {
    display: flex;
    flex-direction: column !important;
    align-items: flex-end !important;
}
.form-modal-buttons button {
    min-width: 98px;
    padding: auto 20px; 
	margin-left: 20px;
	&.md,
	&.sm,
	&.xs {
		margin-left: 8px;
	}
    &.delete-button {
        margin-top: 30px;
        color: $red;
        &:hover,
        &:focus,
        &:active {
            color: $red !important;
        }
    }
}
</style>