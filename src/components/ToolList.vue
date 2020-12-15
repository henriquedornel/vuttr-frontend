<template>
	<div class="tool-list">
		<ul>
			<li v-for="tool in tools" :key="tool.id">
				<ToolCard :tool="tool" />
			</li>
		</ul>
		<Pagination />
	</div>
</template>

<script>
import ToolCard from '@/components/ToolCard'
import Pagination from '@/components/Pagination'

export default {
	components: { ToolCard, Pagination },
	data: () => {
		return {
			tools: [
				{
					id: 1,
					name: 'Notion',
					description: 'All in one tool to organize teams and ideas. Write, plan, collaborate, and get organized.',
					tags: ['organization', 'planning', 'collaboration', 'writing', 'calendar']
				},
				{
					id: 2,
					name: 'json-server',
					description: 'Fake REST API based on a json schema. Useful for mocking and creating APIs for front-end devs to consume in coding challenges.',
					tags: ['api', 'json', 'schema', 'node', 'github', 'rest']
				},
				{
					id: 3,
					name: 'fastify',
					description: 'Extremely fast and simple, low-overhead web framework for NodeJS. Supports HTTP2.',
					tags: ['web', 'framework', 'node', 'http2', 'https', 'localhost']
				}
			]
		}
	}
}
</script>

<style>
.tool-list ul {
	padding: 0;
	list-style-type: none;
}
</style>