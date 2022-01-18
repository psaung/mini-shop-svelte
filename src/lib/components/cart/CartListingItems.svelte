<script lang="ts">
	import ProductItem from '$lib/components/product/ProductItem.svelte';
	import CartCounter from '$lib/components/cart/CartCounter.svelte';
	import type { CartItem } from '$lib/shared/types/Cart';
	import type { Product } from '$lib/shared/types/Product';

	export let cartItems: CartItem[] = [];
	export let disableAction = false;
	export let onIncrease = (product: Product) => null,
		onDecrease = (product: Product, removeAll: Boolean) => null;
</script>

<div>
	{#each cartItems as cart, index (cart.product.id)}
		<ProductItem product={cart.product} {index} isColumn={true}>
			{#if !disableAction}
				<CartCounter
					quantity={cart.quantity}
					onIncrease={() => onIncrease(cart.product)}
					onDecrease={(removeAll) => onDecrease(cart.product, removeAll)}
				/>
			{:else}
				<div class="inline-block absolute top-0 right-0 text-right">
					Qty: <span class="text-red-500">{cart.quantity}</span><br />

					Total:
					<span class="text-green-700"
						>{(cart.product.product_price * cart.quantity).toLocaleString()}</span
					>
				</div>
			{/if}
		</ProductItem>
	{/each}
</div>
