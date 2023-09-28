import { json } from '@sveltejs/kit';
import type { Order } from '$lib/shared/types/Order';
import type { RequestHandler } from '@sveltejs/kit';
import { getOrderDetail } from '../_api';

export const get: RequestHandler<Order, FormData> = async (request) => {
	return getOrderDetail(request);
};

export function GET() {}
