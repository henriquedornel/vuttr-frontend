<template>
	<div id="app" :class="$mq">
		<Header title="VUTTR" subtitle="Very Useful Tools to Remember" />
		<Content />
	</div>
</template>

<script>
import Header from '@/components/template/Header'
import Content from '@/components/template/Content'

export default {
	components: { Header, Content }
}
</script>

<style lang="scss">
#app {
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	align-items: stretch;
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