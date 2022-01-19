<script context="module" lang="ts">
	import type { Load } from '@sveltejs/kit';

	// see https://kit.svelte.dev/docs#loading
	export const load: Load = async ({ fetch }) => {
		const res = await fetch('/products.json');

		if (res.ok) {
			const { data: products } = await res.json();

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
	import TransitionContainer from '$lib/components/utils/TransitionContainer.svelte';
	export let products: Product[];

	const getQuantity = (id, cart) => {
		const item = cart.find((c) => c.product_id === id);
		if (item) {
			return item.quantity;
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

<TransitionContainer>
	<h1 class="mb-5">
		Products <span class="text-slate-500 dark:text-gray-300">{products.length}</span>
	</h1>

	<div class="product-container">
		{#each products as product, index (product.id)}
			<ProductItem {product} {index}>
				<AddToCartButton
					quantity={getQuantity(product.id, $cart)}
					onIncrease={() => handleIncrease(product)}
					onDecrease={(removeAll) => handleDecrease(product, removeAll)}
				/>
			</ProductItem>
		{/each}
	</div>
</TransitionContainer>

<style>
	.product-container {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 10px;
		align-items: grid;
	}
</style>
