<template>
	<div id="app" :class="$mq">
		<Header title="VUTTR" subtitle="Very Useful Tools to Remember" />
		<Menu />
		<ToolList />
	</div>
</template>

<script>
import Header from '@/components/Header'
import Menu from '@/components/Menu'
import ToolList from '@/components/ToolList'

export default {
	components: { Header, Menu, ToolList }
}
</script>

<style lang="scss">
#app {
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	align-items: center;
	max-width: 890px;
	margin: 0 auto;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	&.lg {
		width: 80vw;
	}
	&.md,
	&.sm,
	&.xs {
		width: 85vw;
	}
}
</style>