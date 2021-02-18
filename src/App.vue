<template>
	<div id="app" :class="$mq">
		<Title title="VUTTR" :subtitle="$t('app.appTitle')" />
		<Content />
	</div>
</template>

<script>
import Title from '@/components/template/Title'
import Content from '@/components/template/Content'

export default {
	components: { Title, Content },
	mounted() {
		this.$watch(
			'$i18n.locale',
			(newLocale, oldLocale) => {
				if(newLocale === oldLocale) {
					return
				}
				document.documentElement.lang = newLocale
				document.title = this.$t('app.pageTitle')
			},
			{ immediate: true }
		)
	}
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