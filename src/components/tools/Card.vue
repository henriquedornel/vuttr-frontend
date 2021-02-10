<template>
    <b-card class="card" :class="$mq" bg-variant="info" text-variant="white" hide-footer>
        <template #header>
            <h1 :class="$mq">
                <a :href="tool.link" target="_blank">
                    {{ tool.title }}
                </a>
            </h1>
            <Actions :tool="tool" />		
        </template>
        <b-card-text>
            <p class="tool-description" :class="$mq">
                {{ tool.description }}
            </p>
            <p class="tool-tags" :class="$mq">
                {{ tagsList(tool.tags) }}
            </p>
        </b-card-text>
    </b-card>
</template>

<script>
import Actions from '@/components/tools/Actions'
import tools from '@/mixins/tools'

export default {
	components: { Actions },
	mixins: [ tools ],
    props: [ 'tool' ]
}
</script>

<style lang="scss">
@import '@/styles/custom.scss';

.card {
	margin-top: 30px;
	outline: 0;
	box-shadow: $card-shadow;
	&.md,
	&.sm,
	&.xs {
		margin-top: 20px;
	}
}
.card .card-header {
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
}
.card h1 {
	font-size: 26px;
	padding: 15px 0 0 20px;
	&.md,
	&.sm {
		padding-top: 12px;
		font-size: 20px;
	}
	&.xs {
		padding-top: 15px;
		font-size: 16px;
	}
}
.card h1 a,
.card h1 a:hover {
	color: $white;
}
.card img {
	width: 15px;
}
.card .card-header button {
	padding-right: 15px;
}
.card .card-text {
	outline: 0;
}
.card .tool-description {
	padding: 20px 20px 10px 20px;
	font-size: 18px;
	&.md,
	&.sm {
		padding: 15px 20px 0 20px;
		font-size: 16px;
	}
	&.xs {
		padding: 15px 20px 0 20px;
		font-size: 14px;
	}
}
.card .tool-tags {
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