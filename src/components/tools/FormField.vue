<template>
    <b-form-group class="form-field" :label="label" :label-for="fieldId"
        :class="$mq" :invalid-feedback="invalidFeedback">
        <b-form-input v-if="field.type === 'input'"
            :id="fieldId" :placeholder="placeholder"
            v-model="tool[field.key]" :maxlength="field.maxlength"
            autocomplete="off" :required="field.required"
            autocorrect="off" autocapitalize="none"
            :state="field.state" :disabled="disabled" />
        <b-form-textarea v-else-if="field.type === 'text'"
            :id="fieldId" :placeholder="placeholder"
            v-model="tool[field.key]" :maxlength="field.maxlength"
            rows="3" no-resize :required="field.required"
            :state="field.state" :disabled="disabled" />
    </b-form-group>
</template>

<script>
export default {
    props: {
        field: Object,
        disabled: Boolean
    },
    computed: {        
        tool() {
            return this.$store.state.tool
        },
        fieldId() {
            return `tool-${this.field.key}`
        },
        label() {
            let label = this.$t(`fields.tool.${this.field.key}`)
            if(this.field.required) {
                label += ' *';
            }
            return label
        },
        placeholder() {
            return this.$t('fields.tool.placeholder', { field: this.$t(`fields.tool.${this.field.key}`) })
        },
        invalidFeedback() {
            return this.field.validationMsg
                || this.$t('messages.requiredField', { field: this.$t(`fields.tool.${this.field.key}`) })
        }
    }
}
</script>

<style lang="scss">
@import '@/styles/custom.scss';

.form-field {
    label {
        font-size: 18px;
        font-weight: bold;
        text-transform: capitalize;
    }
    &.md,
    &.sm,
    &.xs {
        label {
            font-size: 16px;
        }
    }
}
.form-field input,
.form-field textarea {
	font-size: 16px;
}
.form-field input.is-invalid,
.form-field textarea.is-invalid {
    background: $light-red;
    
}
.form-field.form-group.is-invalid {
	margin: 0;
}
.form-field .invalid-feedback {
	text-align: right;
}
</style>