<template>
    <b-form-group class="form-field" :label="label" :label-for="fieldId"
        :class="$mq" :invalid-feedback="invalidFeedback">
        <b-form-textarea v-if="field.type === 'textarea'"
            :id="fieldId" :placeholder="placeholder"
            v-model="record[field.key]" :maxlength="field.maxlength"
            rows="3" no-resize :required="field.required"
            :state="field.state" :disabled="disabled" />
        <b-form-input v-else :type="field.type || 'text'"
            :id="fieldId" :placeholder="placeholder"
            v-model="record[field.key]" :maxlength="field.maxlength"
            autocomplete="off" :required="field.required"
            autocorrect="off" autocapitalize="none"
            :state="field.state" :disabled="disabled" />
    </b-form-group>
</template>

<script>
export default {
    props: {
        entity: String,
        field: Object,
        disabled: Boolean
    },
    computed: {        
        record() {
            return this.$store.state[this.entity]
        },
        fieldId() {
            return `${this.entity}-${this.field.key}`
        },
        label() {
            let label = this.$t(`fields.${this.entity}.${this.field.key}`)
            if(this.field.required) {
                label += ' *';
            }
            return label
        },
        placeholder() {
            return this.$t(
                `fields.${this.entity}.placeholder`,
                { field: this.$t(`fields.${this.entity}.${this.field.key}`) }
            )
        },
        invalidFeedback() {
            return this.field.validationMsg
                || this.$t(
                    'messages.requiredField',
                    { field: this.$t(`fields.${this.entity}.${this.field.key}`) }
                )
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
    background: $white-red;
}
.form-field.form-group.is-invalid {
	margin: 0;
}
.form-field .invalid-feedback {
	text-align: right;
}
.form-field .form-control:disabled {
    color: $gray-600;
}
</style>