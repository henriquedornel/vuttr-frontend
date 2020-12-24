<template>
	<div>
		<b-card class="tool-card" :class="$mq" bg-variant="info" text-variant="white" hide-footer>
			<template #header>
				<h1 :class="$mq">
					<a :href="tool.link" target="_blank">
						{{ tool.name }}
					</a>
				</h1>
				<b-button variant="link" v-b-modal="`delete-tool-modal-${tool.id}`">
					<img src="@/assets/icons/close.svg" alt="" :class="$mq" />
				</b-button>
			</template>
			<b-card-text v-b-modal="`edit-tool-modal-${tool.id}`">
				<p class="tool-description" :class="$mq">
					{{ tool.description }}
				</p>
				<p class="tool-tags" :class="$mq">
					{{ tool.tags.map((tool) => `#${tool}`).join(" ") }}
				</p>
			</b-card-text>
		</b-card>
		<ToolModal :id="`edit-tool-modal-${tool.id}`" title="Edit tool" :record="tool" />
		<DeleteModal entity="tool" :id="`delete-tool-modal-${tool.id}`" :name="tool.name" />
	</div>
</template>

<script>
import ToolModal from '@/components/ToolModal'
import DeleteModal from '@/components/DeleteModal'

export default {
	components: { ToolModal, DeleteModal },
	props: ['tool']
}
</script>

<style lang="scss">
@import '@/styles/custom.scss';

.tool-card {
	margin-top: 30px;
	outline: 0;
	box-shadow: $card-shadow;
	&.md,
	&.sm,
	&.xs {
		margin-top: 20px;
	}
}
.tool-card .card-header {
	display: flex;
	flex-direction: row;
	align-items: flex-start;
	justify-content: space-between;
}
.tool-card h1 {
	font-size: 26px;
	padding: 15px 0 0 20px;
	&.md,
	&.sm,
	&.xs {
		font-size: 20px;
	}
}
.tool-card a,
.tool-card a:hover {
	color: $white;
}
.tool-card button {
	padding: 15px 20px 0 0;
}
.tool-card img {
	width: 15px;
	&.md,
	&.sm,
	&.xs {
		width: 13px;
	}
}
.tool-card .card-text {
	outline: 0;
}
.tool-card .tool-description {
	padding: 20px 20px 10px 20px;
	font-size: 18px;
	&.md,
	&.sm,
	&.xs {
		padding: 15px 20px 0 20px;
		font-size: 16px;
	}
}
.tool-card .tool-tags {
	padding: 0 20px 15px 20px;
	font-size: 16px;
	color: $secondary;
	&.md,
	&.sm,
	&.xs {
		padding-bottom: 5px;
		font-size: 14px;
	}
}
</style>