import type { EndpointOutput, Request } from '@sveltejs/kit';
import supabase from '$lib/apiClient/supabaseClient';
import type { Order } from '$lib/shared/types/Order';

export async function createOrder(
	request: Request<Order>,
	formData?: Record<string, any>
): Promise<EndpointOutput> {
	try {
		const { products, ...orderData } = formData;
		const { data, error }: any = await supabase.from('orders').insert(orderData);
		let result = data;

		if (Array.isArray(result) && result.length > 0) {
			result = result[0];
		}

		const { error: productsError } = await supabase.from('order_items').insert(
			products.map((product) => ({
				product_id: product.product_id,
				sold_price: product.product_price,
				quantity: product.quantity,
				order_id: result.id
			}))
		);

		if (error) {
			throw error;
		}

		if (productsError) {
			throw productsError;
		}

		return {
			status: 200,
			body: {
				message: 'success',
				data: result,
				status: 200
			}
		};
	} catch (e) {
		console.log(e);
		return {
			status: 500,
			body: {
				message: e.message,
				status: 500
			}
		};
	}
}

export async function getOrderDetail(request: Request<Order>): Promise<EndpointOutput> {
	if (!request.params.uuid) {
		return { status: 404 };
	}

	const { data, error, status } = await supabase
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
		.eq('uuid', request.params.uuid)
		.maybeSingle();
	if (error) {
		return {
			status: 500,
			body: {
				message: error.message,
				status: 500
			}
		};
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

	return {
		status,
		body: { data: orderData, status }
	};
}
