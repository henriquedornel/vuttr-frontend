<template>
	<b-form-group class="form-field" :label="field.name" :label-for="fieldInput" :class="$mq"
        :state="field.state" :invalid-feedback="invalidFeedback">
		<b-form-input v-if="field.type === 'input'" :id="fieldInput" :title="title"
            v-model="field.value" :state="field.state"
			autocomplete="off" :required="field.required">
		</b-form-input>        
		<b-form-textarea v-else id="fieldInput" :title="title"
            v-model="field.value" :state="field.state"
            rows="3" no-resize :required="field.required">
		</b-form-textarea>
	</b-form-group>
</template>

<script>
export default {
	props: {
		entity: String,
        field: Object
    },
    computed: {
        fieldInput() {
            return `${this.field.name}-input`
        },
        title() {
            return `Enter ${this.entity} ${this.field.name}`
        },
        invalidFeedback() {
            return `Field "${this.field.name}" is required`
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
	color: $red;
	background: $light-red;
}
.form-field.form-group.is-invalid {
	margin: 0;
}
.form-field .invalid-feedback {
	text-align: right;
}
</style>