<template>
	<b-pagination pills align="center" prev-text="Prev" next-text="Next" :class="$mq"
		v-model="currentPage" :total-rows="rows" :per-page="perPage">
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