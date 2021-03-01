<template>
    <b-modal :id="name" centered hide-header @hidden="hiddenFunction" @ok="handleDelete">
		<input :id="`${entity}-id`" type="hidden" v-model="record.id" />
		<p class="delete-modal-msg">{{ msg }}</p>
		<template #modal-footer="{ ok, cancel }">
            <div class="delete-modal-buttons">
                <b-button variant="secondary" class="delete-modal-button" @click="cancel()"
                    :disabled="buttonSpinner" :class="$mq">
                    {{ $t('buttons.cancel') }}
                </b-button>
                <b-button variant="danger" class="delete-modal-button" @click="ok()"
                    :disabled="buttonSpinner" :class="$mq">
                    <Spinner v-if="buttonSpinner" :caption="$t('spinners.delete')" size="small" />
                    <span v-else>{{ $t('buttons.confirm') }}</span>
                </b-button>
            </div>
		</template>
	</b-modal>
</template>

<script>
import Spinner from '@/components/template/Spinner'

import { mapState } from 'vuex'

export default {
    components: { Spinner },
    props: {
        entity: String,
        name: String,
        record: Object,
        msg: String,
        hiddenFunction: Function,
        deleteFunction: Function,
    },
	computed: mapState(['buttonSpinner']),
    methods: {
        handleDelete(bvModalEvt) {
            bvModalEvt.preventDefault() //prevent modal from closing
            this.$store.commit('mutate', { prop: 'buttonSpinner', with: true })
            this.deleteFunction()
        }
    }
}
</script>

<style lang="scss">
.delete-modal-msg {
    font-size: 20px;
    padding-top: 20px;
}
.delete-modal-buttons button {
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