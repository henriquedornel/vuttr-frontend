<template>
	<div id="app" :class="$mq">
		<Header :title="$t('main.appTitle')" :subtitle="$t('main.appSubtitle')" />
		<hr>
		<Spinner v-if="validatingToken" :caption="$t('spinners.auth')" variant="primary" size="large" />
		<Content v-else />
	</div>
</template>

<script>
import Header from '@/components/template/Header'
import Spinner from '@/components/template/Spinner'
import Content from '@/components/template/Content'

import axios from 'axios'
import userMixin from '@/mixins/userMixin'

export default {
	components: { Header, Spinner, Content },
	mixins: [ userMixin ],
	data: () => ({
		validatingToken: true
	}),
	created() {
		this.validateToken()
	},
	mounted() {
		this.$watch(
			'$i18n.locale',
			(newLocale, oldLocale) => {
				if(newLocale === oldLocale) {
					return
				}
				document.documentElement.lang = newLocale
				document.title = this.$t('main.pageTitle')
			},
			{ immediate: true }
		)
	},
	methods: {
		async validateToken() { //para manter os dados do usuário salvos na aplicação mesmo se der refresh na página
			this.validatingToken = true

			const json = localStorage.getItem(this.userKey)
			const userData = JSON.parse(json)
			this.setUser(null) //vai começar a validar o token

			if(!userData) {
				this.validatingToken = false
				if(this.$route.name !== 'auth') this.$router.push({ name: 'auth' })
				return
			}

			const res = await axios.post(`${this.baseApiUrl}/validateToken`, userData)

			if(res.data) { //se o token foi validado
				this.setUser(userData)
			} else {
				localStorage.removeItem(this.userKey)
				this.$toasted.global.defaultInfo({
                    msg: 'messages.user.invalidToken'
                })
				this.$router.push({ name: 'auth' })
			}

			this.validatingToken = false
		}
	}
}
</script>

<style lang="scss">
@import "@/styles/custom.scss";
@import '~bootstrap/scss/bootstrap.scss';
@import '~bootstrap-vue/src/index.scss';

#app {
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