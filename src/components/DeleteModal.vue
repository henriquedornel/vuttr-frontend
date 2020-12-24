<template>
    <b-modal :id="id" centered hide-header>
        <p class="delete-msg">
            Are you sure you want to remove the {{ entity }} <strong>{{ name }}</strong>?
        </p>
        <template #modal-footer="{ ok, cancel }">
            <b-button variant="secondary" class="modal-button" @click="cancel()">
                Cancel
            </b-button>
            <b-button variant="danger" class="modal-button" @click="ok()">
                Yes
            </b-button>
        </template>
    </b-modal>
</template>

<script>
export default {
	props: {
        entity: String,
		id: String,
		name: String
	}
}
</script>

<style lang="scss">
.delete-msg {
    font-size: 20px;
    padding-top: 20px;
}
button.modal-button {
	margin-left: 20px;
}
</style>