<template>
	<div class="header" :class="$mq">
		<header>
			<h1 :class="$mq">{{ title }}</h1>
			<nav :class="$mq">
				<LocaleSwitcher />
				<UserMenu v-if="user" />
			</nav>
		</header>
		<h2 :class="`${$mq} ${$i18n.locale}`">{{ subtitle }}</h2>
	</div>
</template>

<script>
import UserMenu from '@/components/user/UserMenu'
import LocaleSwitcher from './LocaleSwitcher'

import { mapState } from 'vuex'

export default {
	components: { UserMenu, LocaleSwitcher },
	computed: mapState(['user']),
	props: {
		title: String,
		subtitle: String
	}
}
</script>

<style lang="scss">
.header {
	margin: 50px 0 25px 0;
	&.md,
	&.sm,
	&.xs {
		margin: 25px 0 0 0;
	}
}
.header header {
	display: flex;
	flex-direction: row;
	align-items: flex-start;
	justify-content: space-between;
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
	&.xs,
	&.sm.pt-BR {
		font-size: 15px;
	}
}
.header nav {
	display: flex;
	flex-direction: row;
	align-items: center;
    &.xs {
        flex-direction: column;
        align-items: flex-end;
    }
}
</style>