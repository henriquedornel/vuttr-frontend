<template>
	<header>
		<h1>{{ title }}</h1>
		<h2>{{ subtitle }}</h2>
	</header>
</template>

<script>
export default {
	props: {
		title: String,
		subtitle: String
	}
}
</script>

<style>
header {
	margin-top: 60px;
}
header h1,
header h2 {
	font-family: "Source Sans Pro Semibold", sans-serif;
}
header h1 {
	font-size: 42px;
	line-height: 50px;
	letter-spacing: 0.84px;
}
header h2 {
	font-size: 24px;
	line-height: 30px;
	letter-spacing: 0.48px;
}
@media (max-width: 576px) {
	header {
		margin-top: 25px;
	}
	header h1 {
		font-size: 36px;
		line-height: 40px;
		letter-spacing: 0.72px;
	}
	header h2 {
		font-size: 20px;
		line-height: 26px;
		letter-spacing: 0.4px;
	}
}
@media (max-width: 350px) {
	header h2 {
		font-size: 16px;
		line-height: 22px;
		letter-spacing: 0.32px;
	}
}
</style>