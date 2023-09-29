import supabase from '$lib/apiClient/supabaseClient';
import type { Order } from '$lib/shared/types/Order';

export const POST = async ({ request }) => {
	const body: Order = await request.json();

	try {
		const { products, ...orderData } = body;
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

		return new Response(
			JSON.stringify({
				message: 'success',
				data: result,
				status: 200
			}),
			{ status: 200 }
		);
	} catch (e: any) {
		console.log(e);
		return new Response(
			JSON.stringify({
				message: e?.message,
				data: null,
				status: 500
			}),
			{ status: 500 }
		);
	}
};
