import cookie from 'cookie';
import type { RequestHandler } from '@sveltejs/kit';

type Theme = {
	theme: string;
};

export const post: RequestHandler<Theme, Theme> = async (request) => {
	const headers = {
		'Set-Cookie': cookie.serialize('theme', request.body.theme, {
			path: '/',
			httpOnly: true,
			sameSite: true
		})
	};

	return {
		status: 200,
		headers,
		data: {
			message: 'success',
			theme: request.body.theme
		}
	};
};
