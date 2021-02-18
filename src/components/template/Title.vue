<template>
	<div class="title" :class="$mq">
		<h1 :class="$mq">
			<router-link to="/">{{ title }}</router-link>
		</h1>
		<h2 :class="$mq">
			<router-link to="/">{{ subtitle }}</router-link>
		</h2>		
		<div class="locale-switcher">
			<select v-model="$i18n.locale">
				<option v-for="locale in locales" :key="locale.code" :value="locale.code">
					{{ locale.name }}
				</option>
			</select>
		</div>
		<hr>
	</div>
</template>

<script>
import { getSupportedLocales } from '@/config/i18n'

export default {
	props: {
		title: String,
		subtitle: String
	},
	data: () => ({
		locales: getSupportedLocales()
	})
}
</script>

<style lang="scss">
@import "@/styles/custom.scss";

.title {
	margin: 50px 0 10px 0;
	&.md,
	&.sm,
	&.xs {
		margin: 25px 0 0 0;
	}
}
.title h1 {
	font-size: 42px;
	&.md,
	&.sm,
	&.xs {
		font-size: 36px;
	}
}
.title h2 {
	font-size: 24px;
	&.md,
	&.sm {
		font-size: 20px;
	}
	&.xs {
		font-size: 16px;
	}
}
.title a,
.title a:hover {
    color: $body-color;
    text-decoration: none;
}
</style>