<template>
    <div class="search-bar" :class="$mq">
        <div class="search-input" :class="$mq">
            <fa-icon :icon="['fas', 'search']" :class="`${$mq} ${$i18n.locale}`" />
            <input type="search" :placeholder="$t('search.placeholder')"
				:value="search" @input="e => search = e.target.value"
				:class="`${$mq} ${$i18n.locale}`"
				autocorrect="off" autocapitalize="none" />
        </div>
        <div class="search-checkbox" :class="`${$mq} ${$i18n.locale}`">
            <b-form-checkbox name="search-tags" switch size="lg" v-model="tagsOnly">
                {{ $t('search.tagsOnly') }}
            </b-form-checkbox>
        </div>
    </div>
</template>

<script>
import toolsMixin from '@/mixins/toolsMixin'

export default {
    mixins: [ toolsMixin ],
	data: () => ({
        search: '',
		tagsOnly: false
    }),
	methods: {
		searchTools() {
			this.$store.commit('mutate', { prop: 'searchSpinner', with: true })
			this.$store.commit('mutate', { prop: 'search', with: this.search })
			this.$store.commit('mutate', { prop: 'tagsOnly', with: this.tagsOnly })
			this.updateToolsList()
		}
	},
	watch: {
		search() {
			this.searchTools()
		},
		tagsOnly() {
			if(this.search.trim() != '') {
				this.searchTools()
			}
		}
	}
}
</script>

<style lang="scss">
@import '@/styles/custom.scss';

.search-bar {
	display: flex;
	flex-direction: row;
	align-items: center;
	&.sm,
	&.xs {
		flex-direction: column;
		align-items: flex-start;
	}
}
.search-input {
	display: flex;
	flex-direction: row;
	background: $gray-100;
	border: 1px solid $gray-200;
	border-radius: 5px;
	&.sm,
	&.xs {
		margin-bottom: 5px;
	}
}
.search-input svg {
	margin: 8px 8px 0;
	color: $gray-400;
	opacity: 0.7;
	&.sm {
		margin-top: 11px;
	}
	&.xs,
	&.sm.pt-BR {
		margin: 6px 6px 0;
	}
}
.search-input input {
	width: 180px;
	height: 30px;
	font-size: 17px;
	background: none;
	border: none;
	outline: none;
	&:focus {
		background: none;
	}
	&::placeholder {
		color: $gray-400;
	}
	&::-webkit-search-cancel-button {
		-webkit-appearance: none;
		height: 15px;
		width: 18px;
		background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAAn0lEQVR42u3UMQrDMBBEUZ9WfQqDmm22EaTyjRMHAlM5K+Y7lb0wnUZPIKHlnutOa+25Z4D++MRBX98MD1V/trSppLKHqj9TTBWKcoUqffbUcbBBEhTjBOV4ja4l4OIAZThEOV6jHO8ARXD+gPPvKMABinGOrnu6gTNUawrcQKNCAQ7QeTxORzle3+sDfjJpPCqhJh7GixZq4rHcc9l5A9qZ+WeBhgEuAAAAAElFTkSuQmCC);
		background-repeat: no-repeat;
		background-size: 15px;
		background-position: top left;
	}
	&.md {
		width: 140px;
	}
	&.sm {
		width: 180px;
		height: 37px;
	}
	&.xs,
	&.sm.pt-BR {
		width: 140px;
		height: 28px;
		font-size: 15px;
	}
}
.search-checkbox {
	margin-left: 10px;
	.custom-switch.b-custom-control-lg .custom-control-label {
		padding-top: 2px;
		font-size: 16px;
	}
	&.sm {
		margin-left: 0;
		font-size: 15px;
	}
	&.xs,
	&.sm.pt-BR {
		margin-left: 0;
		font-size: 15px;
		.custom-switch.b-custom-control-lg .custom-control-label {
			padding-top: 5px;
			font-size: 14px;
		}
	}
}
</style>