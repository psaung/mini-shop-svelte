<script lang="ts">
	import { blur } from 'svelte/transition';
	import Button from '$lib/components/button/Button.svelte';
	import CartListingItems from '$lib/components/cart/CartListingItems.svelte';
	import cart, { emptyCart } from '$lib/shared/stores/cart';
	import { goto } from '$app/navigation';
	import TotalPriceWrapper from '$lib/components/cart/TotalPriceWrapper.svelte';

	const VAT = 0.07;

	$: subTotal = Object.keys($cart).reduce(
		(p, v) => p + $cart?.[v]?.quantity * $cart?.[v]?.product.product_price,
		0
	);
	$: vatCalculation = subTotal * VAT;
	$: grandTotal = subTotal + vatCalculation;

	let form: Record<string, any> = {
		firstname: null,
		lastname: null,
		email: null,
		phone: null,
		address: null
	};

	let isLoading = false,
		error = null;

	const handleSubmit = async () => {
		if (isLoading) {
			return;
		}

		error = null;
		isLoading = true;

		try {
			const rawResponse = await fetch('/orders.json', {
				method: 'POST',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					...form,
					products: Object.entries($cart).map(([_, val]) => ({
						product_id: val.product.id,
						quantity: val.quantity,
						product_price: val.product.product_price
					}))
				})
			});
			const content = await rawResponse.json();

			if (content.status === 200) {
				emptyCart();
				goto(`/orders/${content.data.uuid}`);
				return;
			}
			throw content.message || 'Something went wrong';
		} catch (e) {
			error = e.message;
			console.log(e);
		}

		isLoading = false;
	};
</script>

<svelte:head>
	<title>About</title>
</svelte:head>

<div class="content">
	<CartListingItems disableAction={true} cartItems={$cart} />
	<TotalPriceWrapper {subTotal} {vatCalculation} {grandTotal} />

	<h3 class="my-3">Delivery Information</h3>
	{#if error}
		<div transition:blur={{ delay: 300, duration: 800 }}>
			{error}
		</div>
	{/if}
	<div transition:blur={{ delay: 300, duration: 800 }}>
		<form action="" class="my-7" on:submit|preventDefault={handleSubmit}>
			<div class="grid grid-cols-2 gap-5">
				<div class="form-group">
					<label for="firstname" class="block">First Name</label>
					<input
						type="text"
						id="firstname"
						bind:value={form.firstname}
						required
						class="shadow p-3 border rounded w-full leading-tight focus:outline-none focus:shadow-outline mt-3 text-black"
						placeholder="First Name"
					/>
				</div>
				<div class="form-group">
					<label for="lastname" class="block">Last Name</label>
					<input
						type="text"
						id="lastname"
						bind:value={form.lastname}
						required
						class="shadow p-3 border rounded w-full leading-tight focus:outline-none focus:shadow-outline mt-3 text-black"
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
						bind:value={form.email}
						required
						class="shadow p-3 border rounded w-full leading-tight focus:outline-none focus:shadow-outline mt-3 text-black"
						placeholder="Email"
					/>
				</div>
				<div class="form-group">
					<label for="phone" class="block">Phone Number</label>
					<input
						type="tel"
						id="phone"
						required
						name="phone"
						bind:value={form.phone}
						class="shadow p-3 border rounded w-full leading-tight focus:outline-none focus:shadow-outline mt-3 text-black"
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
					bind:value={form.address}
					required
					class="shado p-3 border rounded w-full resize-none focus:outline-none text-black"
				/>
			</div>

			<div class="mt-5 mr-auto w-auto text-right">
				<Button btnType="small" isDisabled={isLoading}>
					{isLoading ? 'Loading...' : 'Checkout'}
				</Button>
			</div>
		</form>
	</div>
</div>
