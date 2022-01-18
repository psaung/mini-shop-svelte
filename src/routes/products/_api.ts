import type { EndpointOutput, Request } from '@sveltejs/kit';
import type { Locals } from '$lib/types';
import supabase from '$lib/apiClient/supabaseClient';

/*
	This module is used by the /todos.json and /todos/[uid].json
	endpoints to make calls to api.svelte.dev, which stores todos
	for each user. The leading underscore indicates that this is
	a private module, _not_ an endpoint — visiting /todos/_api
	will net you a 404 response.

	(The data on the todo app will expire periodically; no
	guarantees are made. Don't use it to organise your life.)
*/

// const base = 'https://api.svelte.dev';

export async function api(
	request: Request<Locals>
	// resource: string,
	// data?: Record<string, unknown>
): Promise<EndpointOutput> {
	// user must have a cookie set
	if (!request.locals.userid) {
		return { status: 401 };
	}

	const data = [
		{
			id: 1,
			product_name: 'Zinc Plus',
			product_image: 'https://picsum.photos/id/104/3840/2160.jpg',
			product_description: 'Lorem ipsum dollur sit amut',
			product_price: 300,
			product_sku: 'zinc_plus_360',
			category: { id: 2, category_name: 'Health' }
		},
		{
			id: 2,
			product_name: 'Traditional Blouse',
			product_image: 'https://picsum.photos/id/1054/3079/1733',
			product_description:
				'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum d',
			product_price: 310,
			product_sku: 'traditional_blouse_221',
			category: { id: 3, category_name: 'Fashion' }
		},
		{
			id: 3,
			product_name: 'Skin care',
			product_image: 'https://picsum.photos/id/1068/7117/4090.jpg',
			product_description:
				'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum d. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum d',
			product_price: 120,
			product_sku: 'skin_care_120',
			category: { id: 1, category_name: 'Cosmetic' }
		}
	];

	/*const { data, error, status } = await supabase.from('products').select(`
		id,
		product_name,
		product_image,
		product_description,
		product_price,
		product_sku,
		category:product_category (
			id,
			category_name
		)
	`);

	if (error) throw error;
	*/

	return {
		status: 200,
		body: { data, status: 200 }
	};

	// return {
	// 	status: res.status,
	// 	body: await res.json()
	// };

	// const res = await fetch(`${base}/${resource}`, {
	// 	method: request.method,
	// 	headers: {
	// 		'content-type': 'application/json'
	// 	},
	// 	body: data && JSON.stringify(data)
	// });

	// if the request came from a <form> submission, the browser's default
	// behaviour is to show the URL corresponding to the form's "action"
	// attribute. in those cases, we want to redirect them back to the
	// /todos page, rather than showing the response
	// if (res.ok && request.method !== 'GET' && request.headers.accept !== 'application/json') {
	// 	return {
	// 		status: 303,
	// 		headers: {
	// 			location: '/products'
	// 		}
	// 	};
	// }

	// return {
	// 	status: res.status,
	// 	body: await res.json()
	// };
}
