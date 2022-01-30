<script context="module" lang="ts">
	import type { Load } from '@sveltejs/kit';

	export const load: Load = async ({ fetch, page }) => {
		const res = await fetch(`/orders/${page.params.uuid}.json`);

		if (res.ok) {
			const { data: orderDetails } = await res.json();

			return {
				props: { orderDetails }
			};
		}

		const { message } = await res.json();

		return {
			error: new Error(message)
		};
	};
</script>

<script lang="ts">
	import type { Order } from '$lib/shared/types/Order';
	import CartListingItems from '$lib/components/cart/CartListingItems.svelte';
	import TotalPriceWrapper from '$lib/components/cart/TotalPriceWrapper.svelte';
	import TransitionContainer from '$lib/components/utils/TransitionContainer.svelte';

	export let orderDetails: Order;
</script>

<TransitionContainer>
	<h3>Order Details</h3>

	<CartListingItems disableAction={true} cartItems={orderDetails.order_items} />

	<TotalPriceWrapper
		subTotal={orderDetails.subtotal_price}
		vatCalculation={orderDetails.vat_calculated_price}
		grandTotal={orderDetails.total_price}
	/>

	<div>
		<h3>Customer's Information</h3>
		<div class="grid grid-cols-2 gap-5 mt-5">
			<div>First Name</div>
			<div class="text-amber-600">: {orderDetails.firstname}</div>
			<div>Last Name</div>
			<div class="text-amber-600">: {orderDetails.lastname}</div>
			<div>Email</div>
			<div class="text-amber-600">: {orderDetails.email}</div>
			<div>Phone</div>
			<div class="text-amber-600">: {orderDetails.phone}</div>
			<div>Address</div>
			<div class="text-amber-600">: {orderDetails.address}</div>
		</div>
	</div>
</TransitionContainer>
