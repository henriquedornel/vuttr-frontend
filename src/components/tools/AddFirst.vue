<template>    
    <div class="add-first" v-b-modal.tool-form-modal>
        <fa-icon :icon="['fas', 'plus']" />
        <span>
			{{ $t('actions.add') }} {{ $t('main.tool') }}
		</span>
    </div>
</template>

<style lang="scss">
@import '@/styles/custom.scss';

.add-first {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	align-self: center;
	width: 216px;
	height: 180px;
	margin-top: 60px;
	color: $blue;
	font-weight: bold;
	background: rgb($white-blue, 26%);
	border: 3px dashed $purple;
	outline: 0;
	&:hover {
		background: $white-blue;
	}
}
.add-first svg {
	font-size: 80px;
	padding-bottom: 30px;
}
</style>