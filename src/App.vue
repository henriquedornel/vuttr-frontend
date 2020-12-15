<template>
	<div id="app">
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
	components: { Header, Menu, ToolList },
}
</script>

<style>
* {
	font-family: "Source Sans Pro", sans-serif;
	color: #170c3a;
}
body {
	margin: 0;
}
#app {
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	align-items: center;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
}
#app > * {
	width: 70vw;
}
@media (max-width: 960px) {
	#app > * {
		width: 80vw;
	}
}
@media (max-width: 576px) {
	#app > * {
		width: 85vw;
	}
}
</style>