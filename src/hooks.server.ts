import cookie from 'cookie';
import { v4 as uuid } from '@lukeed/uuid';

/** @type {import('@sveltejs/kit').Handle} */
export const handle = async ({ event, resolve }) => {
	const headers = event.request.headers;
	const cookies = cookie.parse(headers.get('cookie') || '');
	event.locals.userid = cookies.userid || uuid();
	event.locals.theme = cookies.theme || 'light';

	const response = await resolve(event);

	if (!cookies.userid) {
		// if this is the first time the user has visited this app,
		// set a cookie so that we recognise them when they return
		response.headers['set-cookie'] = cookie.serialize('userid', event.locals.userid, {
			path: '/',
			httpOnly: true
		});
	}

	return response;
};

export const getSession = (request) => {
	return {
		theme: request.locals.theme || 'light'
	};
};
