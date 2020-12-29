<template>
	<b-pagination pills align="center" v-model="currentPage" :total-rows="rows" :per-page="perPage"
		:prev-text="$mq | mq({'sm': 'Prev'})" :next-text="$mq | mq({'sm': 'Next'})" :class="$mq">
	</b-pagination>
</template>

<script>
export default {
	data() {
		return {
			rows: 100,
			perPage: 5,
			currentPage: 1
		}
	}
}
</script>

<style lang="scss">
.pagination {
	span,
	button {
		font-weight: 600;
		font-size: 18px;
		margin: 10px 0;
	}	
	&.md,
	&.sm,
	&.xs {
		span,
		button {
			font-size: 16px;
			margin: 0;
		}		
	}
}
</style>