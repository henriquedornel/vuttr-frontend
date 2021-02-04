<template>
    <div class="tool-list">
		<ul>
			<li v-for="tool in tools" :key="tool.id">
				<Card :tool="tool" />
			</li>
		</ul>
	</div>
</template>

<script>
import Card from '@/components/tools/Card'

export default {
    components: { Card },
    props: [ 'tools' ]
}
</script>

<style>
.tools .tool-list ul {
	margin-bottom: 40px;
	padding: 0;
	list-style-type: none;
}
</style>