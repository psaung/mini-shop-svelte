import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

// see https://kit.svelte.dev/docs#loading
export const load: PageLoad = async ({ fetch }) => {
	const res = await fetch('/api/products.json');

	if (res.ok) {
		const { data: products } = await res.json();

		return { products };
	}

	const { message } = await res.json();

	throw error(500, message);
};
