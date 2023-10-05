<script lang="ts">
	export let active: boolean = false;
	export let handleClick;
</script>

<div class="wrapper" class:active on:click={handleClick} aria-hidden="true" />

<style>
	.wrapper {
		border-radius: 30px;
		width: 60px;
		height: 34px;
		background: #ccc;
		position: relative;
		cursor: pointer;
		transition: background ease 0.2s;
	}

	.wrapper.active {
		background: #aaa;
	}

	.wrapper.active:before {
		transform: translateX(calc(100% - 4px));
		background: #fafafa;
	}

	.wrapper:before {
		content: '';
		position: absolute;
		background: #fff;
		width: 30px;
		height: 30px;
		border-radius: 50%;
		top: 2px;
		left: 2px;
		transition: all ease 0.2s;
	}
</style>
