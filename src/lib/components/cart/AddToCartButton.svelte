<script lang="ts">
	import Button from '$lib/components/button/Button.svelte';
	import CartCounter from './CartCounter.svelte';

	export let quantity: number = 0;
	export let onDecrease;
	export let onIncrease;
	$: showAddToCart = quantity <= 0;
</script>

{#if showAddToCart}
	<Button handleClick={() => onIncrease()}>Add To Cart</Button>
{:else}
	<CartCounter {quantity} {onDecrease} {onIncrease} />
{/if}
