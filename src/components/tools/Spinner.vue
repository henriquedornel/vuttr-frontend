<template>    
    <div class="spinner" :class="size">
        <b-spinner :variant="variant"></b-spinner>
        <span class="sr-only">{{ caption }}...</span>
    </div>
</template>

<script>
export default {
	props: {
		variant: String,
		size: String,
		caption: String
	}
}
</script>

<style>
.spinner.medium,
.spinner.large {
	display: flex;
	flex-direction: row;
	justify-content: center;
	margin-top: 50px;
}
.spinner.small .spinner-border {
	width: 1rem;
	height: 1rem;
}
.spinner.large .spinner-border {
	width: 70px;
	height: 70px;
}
</style>