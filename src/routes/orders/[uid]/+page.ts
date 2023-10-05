import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

// see https://kit.svelte.dev/docs#loading
export const load: PageLoad = async ({ fetch, params }) => {
	const res = await fetch(`/api/orders/${params.uid}.json`);

	if (res.ok) {
		const { data: orderDetails } = await res.json();

		return { orderDetails };
	}

	const { message } = await res.json();

	throw error(500, message);
};
