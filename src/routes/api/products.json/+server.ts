import supabase from '$lib/apiClient/supabaseClient';

export const GET = async ({ locals }) => {
	if (!locals.userid) {
		return new Response(JSON.stringify({ message: 'invalid userid' }), { status: 401 });
	}

	const { data, error } = await supabase.from('products').select(`
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

	if (error) {
		return new Response(JSON.stringify({ message: 'Bad Request', error }), { status: 400 });
	}

	return new Response(JSON.stringify({ data }), { status: 200 });

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
};
