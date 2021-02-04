<template>
	<header class="header" :class="$mq">
		<h1 :class="$mq">
			<router-link to="/">{{ title }}</router-link>
		</h1>
		<h2 :class="$mq">
			<router-link to="/">{{baseApiUrl}}</router-link>
		</h2>
		<hr>
	</header>
</template>

<script>
export default {
	props: {
		title: String,
		subtitle: String
	},
	data() {
		return {
			baseApiUrl: process.env.VUE_APP_BASE_API_URL
		}
    }
}
</script>

<style lang="scss">
@import "@/styles/custom.scss";

.header {
	margin: 60px 0 10px 0;
	&.md,
	&.sm,
	&.xs {
		margin: 25px 0 0 0;
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
.header a,
.header a:hover {
    color: $body-color;
    text-decoration: none;
}
</style>