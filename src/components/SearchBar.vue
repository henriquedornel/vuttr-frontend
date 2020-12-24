<template>
	<div class="search-bar" :class="$mq">
		<div class="search-input" :class="$mq">
			<img src="@/assets/icons/search.svg" alt="" />
			<input type="text" v-model="search" placeholder="search" :class="$mq" />
		</div>
		<div class="search-checkbox" :class="$mq">
			<b-form-checkbox v-model="tags" name="search-tags" switch>
				Search in tags only
			</b-form-checkbox>
		</div>
	</div>
</template>

<script>
export default {
	data: () => {
		return {
			search: '',
			tags: false
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
.search-input img {
	width: 25px;
	padding: 0 5px;
}
.search-input input {
	width: 180px;
	height: 25px;
	font-size: 16px;
	background: none;
	border: none;
	outline: none;
	&:focus {
		background: none;
	}
	&::placeholder {
		color: $gray-400;
	}
	&.md,
	&.sm,
	&.xs {
		width: 140px;
		font-size: 14px;
	}
}
.search-checkbox {
	margin-left: 10px;
	&.sm,
	&.xs {
		margin-left: -15px;
	}
	label {
		font-size: 16px;
	}
	&.md label,
	&.sm label,
	&.xs label {
		font-size: 15px;
	}
}
</style>