<template>    
    <div class="add-tool">
        <b-button variant="success" :class="`${$mq} ${$i18n.locale}`" v-b-modal.form-modal>
            <img src="@/assets/icons/add.svg" alt="" />
            <span :class="`${$mq} ${$i18n.locale}`">
                {{ $t('actions.add') }}
            </span>
        </b-button>
    </div>
</template>

<style lang="scss">
.add-tool button {
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-around;
	min-width: 90px;
	padding: 8px;
	&.md,
	&.sm {
		min-width: 75px;
	}
	&.xs,
	&.sm.pt-BR {
		min-width: 50px;
	}
}
.add-tool button span {
	padding: 0 8px;
	font-size: 18px;
	&.md,
	&.sm {
		font-size: 16px;
	}
	&.xs,
	&.sm.pt-BR {
		display: none;
	}
}
.add-tool button img {
	width: 15px;
}
</style>