<template>
	<div class="add-button">
		<button>
			<img src="@/assets/icon-add.svg" alt="" />
			<span>Add</span>
		</button>
	</div>
</template>

<style>
.add-button button {
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-around;
	width: 90px;
	padding: 8px;
	background: #365df0;
	border: none;
	border-radius: 5px;
}
.add-button button:hover {
	background: #2f55cc;
}
.add-button button:active {
	background: #244aa8;
}
.add-button button:focus {
	outline: none;
}
.add-button span {
	font-size: 18px;
	line-height: 24px;
	letter-spacing: 0.36px;
	color: #fff;
}
.add-button img {
	width: 15px;
}
@media (max-width: 576px) {
	.add-button button {
		width: 70px;
	}
	.add-button span {
		font-size: 16px;
		line-height: 22px;
		letter-spacing: 0.32px;
	}
}
@media (max-width: 350px) {
	.add-button button {
		width: 50px;
	}
	.add-button span {
		display: none;
	}
}
</style>