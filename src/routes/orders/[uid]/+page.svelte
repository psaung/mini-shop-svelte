<script lang="ts">
	import type { PageData } from './$types';
	import CartListingItems from '$lib/components/cart/CartListingItems.svelte';
	import TotalPriceWrapper from '$lib/components/cart/TotalPriceWrapper.svelte';
	import TransitionContainer from '$lib/components/utils/TransitionContainer.svelte';

	export let data: PageData = {orderDetails: {}, t: ''};

</script>

<TransitionContainer>
	<h3>Order Details</h3>

	<CartListingItems disableAction={true} cartItems={data.orderDetails.order_items} />

	<TotalPriceWrapper
		subTotal={data.orderDetails.subtotal_price || 0}
		vatCalculation={data.orderDetails.vat_calculated_price || 0}
		grandTotal={data.orderDetails.total_price || 0}
	/>

	<div>
		<h3>Customer's Information</h3>
		<div class="grid grid-cols-2 gap-5 mt-5">
			<div>First Name</div>
			<div class="text-amber-600">: {data.orderDetails.firstname}</div>
			<div>Last Name</div>
			<div class="text-amber-600">: {data.orderDetails.lastname}</div>
			<div>Email</div>
			<div class="text-amber-600">: {data.orderDetails.email}</div>
			<div>Phone</div>
			<div class="text-amber-600">: {data.orderDetails.phone}</div>
			<div>Address</div>
			<div class="text-amber-600">: {data.orderDetails.address}</div>
		</div>
	</div>
</TransitionContainer>