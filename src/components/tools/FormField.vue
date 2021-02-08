<template>
    <b-form-group class="form-field" :label="label" :label-for="fieldId"
        :class="$mq" :invalid-feedback="invalidFeedback">
        <b-form-input v-if="type === 'input'"
            :id="fieldId" :placeholder="placeholder"
            v-model="tool[fieldName]" :maxlength="maxlength"
            autocomplete="off" :required="required"
            autocorrect="off" autocapitalize="none"
            :state="state"  />
        <b-form-textarea v-else-if="type === 'text'"
            :id="fieldId" :placeholder="placeholder"
            v-model="tool[fieldName]" :maxlength="maxlength"
            rows="3" no-resize :required="required"
            :state="state"  />
    </b-form-group>
</template>

<script>
export default {
    props: {
        fieldName: String,
        type: String,
        caption: String,
        maxlength: Number,
        required: Boolean,
        state: Boolean
    },
    computed: {        
        tool() {
            return this.$store.state.tool
        },
        fieldId() {
            return `tool-${this.fieldName}`
        },
        label() {
            let label = `${this.caption}`
            if(this.required) {
                label += ' *';
            }
            return label
        },
        placeholder() {
            return `Enter ${this.caption}...`
        },
        invalidFeedback() {
            return `Field "${this.caption}" is required`
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