throw new Error("@migration task: Update +server.js (https://github.com/sveltejs/kit/discussions/5774#discussioncomment-3292701)");


// @migration task: Check imports
import type { Order } from '$lib/shared/types/Order';
import type { RequestHandler } from '@sveltejs/kit';
import { createOrder } from './_api';

export const post: RequestHandler<Order, FormData> = async (request) => {
	const response = await createOrder(request, request.body);
	return response;
};
