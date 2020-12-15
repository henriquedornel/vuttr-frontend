<template>
	<div class="search-bar">
		<div class="search-input">
			<img src="@/assets/icon-search.svg" alt="" />
			<input type="text" v-model="search" placeholder="search" />
		</div>
		<div class="search-checkbox">
			<input type="checkbox" v-model="tags" value="search-tags" />
			<label for="search-tags">search in tags only</label>
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

<style>
.search-bar {
	display: flex;
	flex-direction: row;
	align-items: flex-start;
}
.search-input {
	display: flex;
	flex-direction: row;
	background: #f5f4f6;
	border: 1px solid #ebeaed;
	border-radius: 5px;
}
.search-input img {
	width: 25px;
	padding: 0 5px;
}
.search-input input {
	width: 180px;
	font-family: "Source Sans Pro", sans-serif;
	font-size: 16px;
	background: none;
	border: none;
	outline: none;
}
.search-input input::placeholder {
	color: #b1adb9;
}
.search-checkbox {
	display: flex;
	flex-direction: row;
	align-items: center;
}
.search-checkbox input {
	margin: 0 5px 5px 10px;
	opacity: 0.6;
}
.search-checkbox input:checked {
	opacity: 1;
}
.search-checkbox label {
	font-size: 16px;
}
@media (max-width: 576px) {
	.search-input input {
		width: 140px;
		font-size: 14px;
	}
	.search-checkbox label {
		font-size: 14px;
	}
}
@media (max-width: 460px) {
	.search-bar {
		flex-direction: column;
	}
	.search-input {
		margin-bottom: 5px;
	}
	.search-checkbox input {
		margin-left: 5px;
	}
}
</style>