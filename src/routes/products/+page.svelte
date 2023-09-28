<script lang="ts">
	// throw new Error("@migration task: Add data prop (https://github.com/sveltejs/kit/discussions/5774#discussioncomment-3292707)");

	import ProductItem from '$lib/components/product/ProductItem.svelte';
	import type { PageData } from './$types';
	import AddToCartButton from '$lib/components/cart/AddToCartButton.svelte';
	import cart, { addOne, subtractOne } from '$lib/shared/stores/cart';
	import TransitionContainer from '$lib/components/utils/TransitionContainer.svelte';

	export let data: PageData;

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
		Products <span class="text-slate-500 dark:text-gray-300">{data.products?.length}</span>
	</h1>

	<div class="product-container">
		{#each data?.products as product, index (product.id)}
			<ProductItem {product}>
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
