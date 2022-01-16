<script lang="ts">
	import { spring, tweened } from 'svelte/motion';
	import { sineInOut, quintInOut } from 'svelte/easing';
	import cart, { addOne, subtractOne } from '$lib/shared/stores/cart';
	import Step from '../utils/Step.svelte';
	import imgURL from './images/cart.png';
	import CloseButton from '../button/CloseButton.svelte';
	import MiniCartListing from './CartListingItems.svelte';
	import Button from '../button/Button.svelte';

	const easing = quintInOut;
	const duration = 320;
	const delay = 300;

	const showCart = tweened(1, { easing, duration });
	const toggleCartItems = tweened(0, { easing, delay: delay * 2, duration });
	const toggleCartBackground = tweened(0, { easing, delay, duration });

	const quantity = spring(null, {
		stiffness: 0.2,
		damping: 0.8
	});
	const totalPrice = tweened(null, { easing: sineInOut });
	$: quantity.set(
		Object.keys($cart).reduce((p, v) => {
			return p + ($cart?.[v]?.quantity || 0);
		}, 0)
	);
	$: totalPrice.set(
		Object.keys($cart).reduce(
			(p, v) => p + $cart?.[v]?.quantity * $cart?.[v]?.product.product_price,
			0
		)
	);

	$: offset = 1 - 0.1 * modulo($quantity, 1);
	function modulo(n: number, m: number) {
		// handle negative numbers
		return ((n % m) + m) % m;
	}

	const toggleCart = () => {
		if ($toggleCartItems % 1 !== 0 || $showCart % 1 !== 0) {
			return false;
		}

		showCart.update((val) => (val ? 0 : 1), {
			delay: $showCart ? 0 : delay * 2 - 100
		});
		toggleCartItems.update((val) => (val ? 0 : 1), {
			delay: $toggleCartItems ? 0 : delay * 2
		});
		toggleCartBackground.update((val) => (val ? 0 : 1));
	};
</script>

<div
	style="display: {$toggleCartItems === 0 ? 'none' : 'block'};"
	class="backdrop"
	on:click={toggleCart}
/>
<section
	class="cart-container dark:bg-gray-800 cursor-pointer shadow bg-stone-100 rounded-full flex justify-center flex-col items-center"
	style="transform: scale({offset});  border-radius: calc(50% - {50 -
		$showCart * 50}% ); display: {$showCart === 0 ? 'none' : 'flex'}; opacity: {$showCart}"
	on:click={toggleCart}
>
	{#if $quantity > 0}
		<div
			class="cart-quantity-indicator flex justify-center items-center bg-transparent"
			style="transform: scale({0.7 * $showCart})"
		>
			<Step step={$quantity} />
		</div>
	{/if}
	<div class="w-6 overflow-hidden">
		<img
			src={imgURL}
			alt="Add to cart"
			class="w-6 dark:filter dark:invert"
			style="transform: translateY(+{100 - $showCart * 100}px)"
		/>
	</div>
</section>
<div
	class="mini-cart-drawer dark:bg-gray-800 bg-stone-50 shadow"
	style="transform: scale({1 * $toggleCartBackground})"
/>

<div
	class="mini-cart-drawer"
	style="display: {$toggleCartItems === 0 ? 'none' : 'block'}; opacity: {$toggleCartItems} "
>
	<div
		on:click={toggleCart}
		class="absolute cursor-pointer flex items-center justify-items-center overflow-hidden z-50"
		style="top: 10px; width: 30px; height: 30px; right: 20px"
	>
		<div
			class="absolute close-btn-inner"
			style="transform: translateY({100 - 100 * $toggleCartItems}px); opacity: {1 *
				$toggleCartItems}"
		>
			<CloseButton />
		</div>
	</div>
	<h2 class="pl-4 pt-5">CartItems</h2>
	<div class="overflow-scroll h-full overscroll-none pb-5">
		<MiniCartListing cartItems={$cart} onDecrease={subtractOne} onIncrease={addOne} />
	</div>
	<div
		class="flex flex-row justify-between p-5 absolute bottom-0 left-0 right-0 border-t-2 items-center z-50 bg-white dark:bg-gray-800 dark:border-t-slate-700"
	>
		<div>{parseInt($totalPrice).toLocaleString()}</div>
		<div on:click={toggleCart}>
			<a href="/checkout">
				<Button btnType="small">Checkout</Button>
			</a>
		</div>
	</div>
</div>

<style>
	.backdrop {
		z-index: 999;
		position: fixed;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
	}
	.cart-container {
		position: fixed;
		z-index: 1001;
		right: 30px;
		bottom: 10%;
		width: 52px;
		height: 52px;
		padding: 10px;
	}

	.mini-cart-drawer {
		width: 25%;
		height: 100vh;
		position: fixed;
		top: 0;
		right: 0;
		z-index: 1000;
		transform-origin: calc(100% - 50px) calc(90% - 20px);
		border-top-left-radius: 5px;
		border-bottom-left-radius: 5px;
		padding-bottom: 82px;
	}

	.cart-quantity-indicator {
		position: absolute;
		top: -15px;
		right: -10px;
		width: 40px;
		height: 40px;
		border-radius: 50%;
		backface-visibility: hidden;
		border: 1px solid var(--accent-color);
		z-index: 5;
	}

	.close-btn-inner {
		top: calc(50% - 10px);
		left: calc(50% - 2px);
		z-index: -1;
	}
</style>
