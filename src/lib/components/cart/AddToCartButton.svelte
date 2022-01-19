<script lang="ts">
	import { fly } from 'svelte/transition';
	import Button from '$lib/components/button/Button.svelte';
	import CartCounter from './CartCounter.svelte';

	export let quantity: number = 0;
	export let onDecrease;
	export let onIncrease;
	$: showAddToCart = quantity <= 0;
</script>

<div class="relative w-full h-20 text-left flex items-center justify-self-end">
	{#if showAddToCart}
		<div
			in:fly={{ delay: 300, duration: 300, x: -5 }}
			out:fly={{ duration: 300, x: 5 }}
			class="absolute inline-block right-0"
		>
			<Button handleClick={() => onIncrease()}>Add To Cart</Button>
		</div>
	{:else}
		<div
			in:fly={{ delay: 300, duration: 300, x: 5 }}
			out:fly={{ duration: 300, x: -5 }}
			class="absolute inline-block w-full right-0 text-right pr-5"
		>
			<CartCounter {quantity} {onDecrease} {onIncrease} />
		</div>
	{/if}
</div>
