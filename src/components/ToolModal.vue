<template>
	<b-modal :id="id" ref="modal" centered @show="resetModal" @hidden="resetModal" @ok="handleOk">
		<template #modal-header="{ close }">
			<h1 class="modal-title" :class="$mq">{{ title }}</h1>
			<button type="button" class="close" @click="close()">×</button>
		</template>
		<form ref="form" @submit.stop.prevent="handleSubmit">
			<FormField entity="tool" :field="name" />
			<FormField entity="tool" :field="link" />
			<FormField entity="tool" :field="description" />
			<FormField entity="tool" :field="tags" />
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
import FormField from '@/components/FormField'

export default {
	components: { FormField },
	props: {
		id: String,
		title: String,
		record: Object,
	},
	data() {
		return {
			name: {
				name: 'name',
				type: 'input',
				maxlength: '50',
				required: true,
				value: '',
				state: null,
			},
			link: {
				name: 'link',
				type: 'input',
				maxlength: '255',
				required: true,
				value: '',
				state: null,
			},
			description: {
				name: 'description',
				type: 'text',
				maxlength: '700',
				required: true,
				value: '',
				state: null,
			},
			tags: {
				name: 'tags',
				type: 'input',
				maxlength: '140',
				required: true,
				value: '',
				state: null,
			},
		}
	},
	methods: {
		checkFormValidity() {
			const valid = this.$refs.form.checkValidity()
			this.name.state = valid
			this.link.state = valid
			this.description.state = valid
			this.tags.state = valid
			return valid
		},
		resetModal() {
			this.name.value = ''
			this.name.state = null
			this.link.value = ''
			this.link.state = null
			this.description.value = ''
			this.description.state = null
			this.tags.value = ''
			this.tags.state = null
		},
		handleOk(bvModalEvt) {
			// Prevent modal from closing
			bvModalEvt.preventDefault()
			// Trigger submit handler
			this.handleSubmit()
		},
		handleSubmit() {
			// Exit when the form isn't valid
			if (!this.checkFormValidity()) {
				return
			}
			// Push the name to submitted names
			//this.submittedNames.push(this.name)
			// Hide the modal manually
			this.$nextTick(() => {
				this.$bvModal.hide(this.id)
			})
		}
	}
}
</script>

<style lang="scss">
.modal-title {
	font-size: 24px;
	&.md,
	&.sm,
	&.xs {
		font-size: 20px;
	}
}
button.close:active,
button.close:focus {
	outline: 0;
}
button.modal-button {
	margin-left: 20px;
	&.md,
	&.sm,
	&.xs {
		margin-left: 10px;
	}
}
</style>