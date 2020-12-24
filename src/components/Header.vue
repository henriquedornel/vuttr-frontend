<template>
	<header class='header' :class="$mq">
		<h1 :class="$mq">
			{{ title }}
		</h1>
		<h2 :class="$mq">
			{{ subtitle }}
		</h2>
	</header>
</template>

<script>
export default {
	props: {
		title: String,
		subtitle: String
	}
}
</script>

<style lang="scss">
.header {
	width: 100%;
	margin-top: 60px;
	&.md,
	&.sm,
	&.xs {
		margin-top: 25px;
	}
}
.header h1 {
	font-size: 42px;
	&.md,
	&.sm,
	&.xs {
		font-size: 36px;
	}
}
.header h2 {
	font-size: 24px;
	&.md,
	&.sm {
		font-size: 20px;
	}
	&.xs {
		font-size: 16px;
	}
}
</style>