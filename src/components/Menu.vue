<template>
	<div class="menu" :class="$mq">
		<SearchBar />
		<AddTool />
	</div>
</template>

<script>
import SearchBar from '@/components/SearchBar'
import AddTool from '@/components/AddTool'

export default {
	components: { SearchBar, AddTool },
}
</script>

<style lang="scss">
.menu {
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	width: 100%;
	margin-top: 30px;
	&.md,
	&.sm,
	&.xs {
		margin-top: 25px;
	}
}
</style>