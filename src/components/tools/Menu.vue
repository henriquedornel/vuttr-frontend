<template>
    <div class="menu" :class="$mq">
        <SearchBar />
        <AddButton />
    </div>
</template>

<script>
import SearchBar from '@/components/tools/SearchBar'
import AddButton from '@/components/tools/AddButton'

export default {
	components: { SearchBar, AddButton }
}
</script>

<style lang="scss">
.menu {
	display: flex;
	flex-direction: row;
	justify-content: space-between;
}
</style>