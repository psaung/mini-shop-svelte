<script lang="ts">
	import Button from '$lib/components/button/Button.svelte';
	import CartListingItems from '$lib/components/cart/CartListingItems.svelte';
	import cart from '$lib/shared/stores/cart';

	const VAT = 0.07;

	$: subTotal = Object.keys($cart).reduce(
		(p, v) => p + $cart?.[v]?.quantity * $cart?.[v]?.product.product_price,
		0
	);
	$: vatCalculation = subTotal * VAT;
	$: grandTotal = subTotal + vatCalculation;
</script>

<svelte:head>
	<title>About</title>
</svelte:head>

<div class="content">
	<CartListingItems disableAction={true} cartItems={$cart} />
	<div class="flex flex-row w-full mt-5 justify-between pr-5">
		<div />
		<div class="text-right">
			<div class="grid grid-cols-2">
				<div>Sub Total</div>
				<div class="text-green-700">{subTotal.toLocaleString()}</div>
				<div>VAT 7%</div>
				<div class="text-green-700">{vatCalculation.toLocaleString()}</div>
				<div>Grand Total</div>
				<div class="text-green-700">{grandTotal.toLocaleString()}</div>
			</div>
		</div>
	</div>
	<h3 class="my-3">Delivery Information</h3>
	<form action="" class="my-7">
		<div class="grid grid-cols-2 gap-5">
			<div class="form-group">
				<label for="firstname" class="block">First Name</label>
				<input
					type="text"
					id="firstname"
					class="shadow p-3 border rounded w-full leading-tight focus:outline-none focus:shadow-outline mt-3"
					placeholder="First Name"
				/>
			</div>
			<div class="form-group">
				<label for="lastname" class="block">Last Name</label>
				<input
					type="text"
					id="lastname"
					class="shadow p-3 border rounded w-full leading-tight focus:outline-none focus:shadow-outline mt-3"
					placeholder="Last Name"
				/>
			</div>
		</div>
		<div class="grid grid-cols-2 gap-5 mt-5">
			<div class="form-group">
				<label for="email" class="block">Email</label>
				<input
					type="email"
					id="email"
					name="email"
					class="shadow p-3 border rounded w-full leading-tight focus:outline-none focus:shadow-outline mt-3"
					placeholder="Email"
				/>
			</div>
			<div class="form-group">
				<label for="phone" class="block">Phone Number</label>
				<input
					type="tel"
					id="phone"
					name="phone"
					class="shadow p-3 border rounded w-full leading-tight focus:outline-none focus:shadow-outline mt-3"
					placeholder="Telephone"
				/>
			</div>
		</div>
		<div class="mt-5">
			<label for="address" class="block">Address</label>
			<textarea
				name="address"
				id="address"
				cols="30"
				rows="4"
				class="shado p-3 border rounded w-full resize-none focus:outline-none"
			/>
		</div>

		<div class="mt-5 mr-auto w-auto text-right">
			<Button btnType="small">Checkout</Button>
		</div>
	</form>
</div>
