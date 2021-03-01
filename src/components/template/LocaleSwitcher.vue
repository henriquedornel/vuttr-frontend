<template>
	<div class="locale-switcher">
		<select v-model="$i18n.locale">
			<option v-for="locale in locales" :key="locale.code" :value="locale.code">
				{{ locale.name }}
			</option>
		</select>
        <fa-icon :icon="['fas', 'globe']" :class="$mq" />
	</div>
</template>

<script>
import { getSupportedLocales } from '@/config/i18n'

export default {
	data: () => ({
		locales: getSupportedLocales(),
        localeKey: '__vuttr_locale'
	}),
    computed: {
        currentLocale() { return this.$i18n.locale }
    },
    mounted() {
        const json = localStorage.getItem(this.localeKey)
		const localeData = JSON.parse(json)		
		if(localeData) {
            this.$i18n.locale = localeData
		}
    },
	watch: {
		currentLocale(value) {
			localStorage.setItem(this.localeKey, JSON.stringify(value))
		}
	}
}
</script>

<style lang="scss">
@import "@/styles/custom.scss";

.locale-switcher {
    display: flex;
    flex-direction: row;
    align-items: center;
}
.locale-switcher select {
    font-size: 0.75rem;
    text-align-last: right;
    color: $gray-600;
    background-color: transparent;
    border: none;
    cursor: pointer;
    option {
        direction: rtl;
        color: $body-color;
    }
    &:active,
    &:focus {
        outline: none;
    }
    &:hover {
        color: $body-color;
    }
}
.locale-switcher svg {
    color: $primary;
    &.xs {
        display: none;
    }
}
</style>