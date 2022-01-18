import type { Order } from '$lib/shared/types/Order';
import type { RequestHandler } from '@sveltejs/kit';
import { createOrder } from './_api';

export const post: RequestHandler<Order, FormData> = async (request) => {
	console.log(request.body);
	const response = await createOrder(request, request.body);
	return response;
};
