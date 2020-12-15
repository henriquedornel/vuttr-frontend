<template>
	<div class="tool-card">
		<div class="tool-menu">
			<h1>{{ tool.name }}</h1>
			<img src="@/assets/icon-close.svg" alt="" />
		</div>
		<p class="tool-description">
			{{ tool.description }}
		</p>
		<p class="tool-tags">
			{{ tool.tags.map(tool => `#${tool}`).join(' ') }}
		</p>
	</div>
</template>

<script>
export default {
	props: ['tool']
}
</script>

<style>
.tool-card {
	margin-top: 30px;
	padding: 20px;
	background: #2497b2;
	border-radius: 5px;
	box-shadow: 0px 20px 25px #0000001a;
}
.tool-menu {
	display: flex;
	flex-direction: row;
	align-items: flex-start;
	justify-content: space-between;
}
.tool-card h1 {
	font-family: "Source Sans Pro Semibold", sans-serif;
	font-size: 26px;
	line-height: 32px;
	letter-spacing: 0.52px;
	color: #fff;
}
.tool-card img {
	width: 15px;
}
.tool-card .tool-description {
	padding: 20px 0 10px;
	font-size: 18px;
	line-height: 24px;
	letter-spacing: 0.36px;
	color: #fff;
}
.tool-card .tool-tags {
	font-size: 16px;
	line-height: 22px;
	letter-spacing: 0.32px;
	color: #dedce1;
}
@media (max-width: 576px) {
	.tool-card {
		margin-top: 20px;
		padding: 15px;
	}
	.tool-card h1 {
		font-size: 24px;
		line-height: 30px;
		letter-spacing: 0.48px;
	}
	.tool-card img {
		width: 13px;
	}
	.tool-card .tool-description {
		font-size: 16px;
		line-height: 22px;
		letter-spacing: 0.32px;
	}
	.tool-card .tool-tags {
		font-size: 14px;
		line-height: 20px;
		letter-spacing: 0.3px;
	}
}
</style>