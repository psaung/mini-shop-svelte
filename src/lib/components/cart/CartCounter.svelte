<script lang="ts">
	import Counter from '$lib/components/utils/Counter.svelte';
	import imgURL from './images/trash.svg';

	export let quantity: number = 0;
	export let onDecrease;
	export let onIncrease;
	$: showAddToCart = quantity <= 0;
</script>

<div class="inline-block mr-5">
	<Counter count={quantity} {onIncrease} {onDecrease} />
</div>
<span on:click={() => onDecrease(true)} class="inline-block">
	<img src={imgURL} alt="Remove" class="remove-icon rounded-full" />
</span>

<style>
	.remove-icon {
		width: 32px;
		height: 32px;
		padding: 10px;
		background: #fff;
		cursor: pointer;
		display: inline-block;
	}
</style>
