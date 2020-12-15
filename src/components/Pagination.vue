<template>
	<div class="pagination">
		<img src="@/assets/icon-prev.svg" alt="" />
		<span class="prev">Prev</span>
		<span class="pages">
			<span class="page">1</span>
		</span>
		<span class="next">Next</span>
		<img src="@/assets/icon-next.svg" alt="" />
	</div>
</template>

<style>
.pagination {
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: center;
	margin: 30px 0;
}
.pagination img {
	height: 10px;
	padding: 0 10px;
}
.pagination .prev,
.pagination .next {
	font-family: "Source Sans Pro Semibold", sans-serif;
    font-weight: 600;
	font-size: 18px;
	line-height: 24px;
	letter-spacing: 0.36px;
	color: #b9c6fa;
}
.pagination .pages {
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: center;
	padding: 0 20px;
}
.pagination .page {
	font-family: "Source Sans Pro Semibold", sans-serif;
    font-weight: 600;
	font-size: 18px;
	line-height: 30px;
	width: 30px;
	letter-spacing: 0.36px;
	text-align: center;
	color: #170c3a;
	background-color: #ebeaed;
	border-radius: 50%;
}
@media (max-width: 576px) {
	.pagination {
		margin: 20px 0;
	}
	.pagination .prev,
	.pagination .next {
		font-size: 16px;
		line-height: 22px;
		letter-spacing: 0.32px;
	}
	.pagination .pages {
		padding: 0 15px;
	}
	.pagination .page {
		font-size: 16px;
		line-height: 22px;
		width: 22px;
		letter-spacing: 0.32px;
	}
}
</style>