<script lang="ts">
	import ProductItem from '$lib/components/product/ProductItem.svelte';
	import CartCounter from '$lib/components/cart/CartCounter.svelte';
	import type { CartItem } from '$lib/shared/types/Cart';

	export let cartItems: Record<string, CartItem> = {};
	export let onIncrease, onDecrease;
</script>

<div>
	{#each Object.keys(cartItems).map((v) => cartItems[v]) as cart, index (cart.product.id)}
		<ProductItem product={cart.product} {index} isColumn={true}>
			<CartCounter
				quantity={cart.quantity}
				onIncrease={() => onIncrease(cart.product)}
				onDecrease={(removeAll) => onDecrease(cart.product, removeAll)}
			/>
		</ProductItem>
	{/each}
</div>
