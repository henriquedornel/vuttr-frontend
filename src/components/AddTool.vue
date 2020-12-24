<template>
	<div class="add-tool">
		<b-button variant="success" :class="$mq" v-b-modal.add-tool-modal>
			<img src="@/assets/icons/add.svg" alt="" />
			<span :class="$mq">
				Add
			</span>
		</b-button>
		<ToolModal id="add-tool-modal" title="Add new tool"/>
	</div>
</template>

<script>
import ToolModal from '@/components/ToolModal'

export default {
	components: { ToolModal }
}
</script>

<style lang="scss">
.add-tool button {
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-around;
	width: 90px;
	padding: 8px;
	&.md,
	&.sm {
		width: 70px;
	}
	&.xs {
		width: 50px;
	}
}
.add-tool button span {
	font-size: 18px;
	&.md,
	&.sm {
		font-size: 16px;
	}
	&.xs {
		display: none;
	}
}
.add-tool button img {
	width: 15px;
}
</style>