<template>
	<div class="menu">
		<SearchBar />
		<AddButton />
	</div>
</template>

<script>
import SearchBar from '@/components/SearchBar'
import AddButton from '@/components/AddButton'

export default {
	components: { SearchBar, AddButton },
}
</script>

<style>
.menu {
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	margin-top: 40px;
}
@media (max-width: 576px) {
	.menu {
		margin-top: 20px;
	}
}
</style>