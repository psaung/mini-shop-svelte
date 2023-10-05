<script lang="ts">
	import { fly } from 'svelte/transition';
	import type { Product } from '$lib/shared/types/Product';

	export let product: Product;
	export let isColumn = false;
	/* transition:scale|local={{ start: 0.7 }} */
</script>

<div
	class="product {isColumn && 'product-column'}"
	in:fly={{ delay: 300, duration: 300, y: 10 }}
	out:fly={{ delay: 300, duration: 300, y: 10 }}
>
	<img src={product.product_image} alt={product.product_name} class="dark:shadow-none shadow" />
	<div class={!isColumn ? 'grid gap-3 mt-5' : 'relative w-full'}>
		<h3>{product.product_name}</h3>
		<div>
			Price: <span class="inline-block text-green-700">{product.product_price} $</span>
		</div>
		<slot />
	</div>
</div>

<style>
	.product {
		display: grid;
		grid-gap: 0.5rem;
		align-items: center;
		margin: 0 0 0.5rem 0;
		padding: 0.5rem 0;
		border-radius: 8px;
		filter: drop-shadow(2px 4px 6px rgba(0, 0, 0, 0.1));
		transform: translate(-1px, -1px);
		transition: filter 0.2s, transform 0.2s;
	}

	.product-column {
		grid-template-columns: 80px 1fr;
		gap: 20px;
		padding: 20px;
		justify-items: start;
		align-items: flex-start;
	}
</style>
