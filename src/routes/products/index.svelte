<script context="module" lang="ts">
	import type { Load } from '@sveltejs/kit';

	// see https://kit.svelte.dev/docs#loading
	export const load: Load = async ({ fetch }) => {
		const res = await fetch('/products.json');

		if (res.ok) {
			const products = await res.json();

			return {
				props: { products }
			};
		}

		const { message } = await res.json();

		return {
			error: new Error(message)
		};
	};
</script>

<script lang="ts">
	import ProductItem from '$lib/components/product/ProductItem.svelte';
	import type { Product } from '$lib/shared/types/Product';
	import AddToCartButton from '$lib/components/cart/AddToCartButton.svelte';
	import cart, { addOne, subtractOne } from '$lib/shared/stores/cart';
	export let products: Product[];

	const getQuantity = (id, cart) => {
		if (cart[id]) {
			return cart[id].quantity;
		}

		return 0;
	};

	const handleIncrease = (product) => {
		addOne(product);
	};

	const handleDecrease = (product, removeAll = false) => {
		subtractOne(product, removeAll);
	};
</script>

<svelte:head>
	<title>Products</title>
</svelte:head>

<div class="main-container">
	<h1 class="mb-10">
		Products <span class="text-slate-500 dark:text-gray-300">{products.length}</span>
	</h1>

	<div class="product-container">
		{#each products as product, index (product.id)}
			<ProductItem {product} {index}>
				<div class="ml-auto">
					<AddToCartButton
						quantity={getQuantity(product.id, $cart)}
						onIncrease={() => handleIncrease(product)}
						onDecrease={(removeAll) => handleDecrease(product, removeAll)}
					/>
				</div>
			</ProductItem>
		{/each}
	</div>
</div>

<style>
	.product-container {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 10px;
		align-items: grid;
	}
</style>
