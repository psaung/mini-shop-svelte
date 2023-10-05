import supabase from '$lib/apiClient/supabaseClient';

export const GET = async ({ params }) => {
	if (!params.uuid) {
		return new Response(
			JSON.stringify({
				message: 'Not Found',
				data: null
			}),
			{ status: 404 }
		);
	}

	const { data, error } = await supabase
		.from('orders')
		.select(
			`
		id,
		firstname,
		lastname,
        email,
        phone,
		address,
        order_items (
            sold_price,
            quantity,
            product:product_id (
                product_name,
                product_image,
                product_sku,
                id
            )
        )
	`
		)
		.eq('uuid', params.uuid)
		.maybeSingle();
	if (error) {
		return new Response(
			JSON.stringify({
				message: error.message,
				data: null
			}),
			{ status: 500 }
		);
	}

	function transformOrderItems(orderItems) {
		return orderItems.map((item) => ({
			...item,
			product: { ...item.product, product_price: item.sold_price, id: item.product.id }
		}));
	}

	const orderItems = transformOrderItems(data.order_items);
	const VAT = 0.07;

	const subTotal = Object.keys(orderItems).reduce(
		(p, v) => p + orderItems?.[v]?.quantity * orderItems?.[v]?.product.product_price,
		0
	);
	const vatCalculation = subTotal * VAT;
	const grandTotal = subTotal + vatCalculation;

	const orderData = {
		...data,
		order_items: orderItems,
		total_price: grandTotal,
		subtotal_price: subTotal,
		vat_calculated_price: vatCalculation
	};

	return new Response(
		JSON.stringify({
			message: 'success',
			data: orderData
		}),
		{ status: 200 }
	);
};
