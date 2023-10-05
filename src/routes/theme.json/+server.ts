// @migration task: Check imports
import cookie from 'cookie';
type Theme = {
	theme: string;
};

export const POST = async ({ request }) => {
	const { theme }: Theme = await request.json();
	const headers = {
		'Set-Cookie': cookie.serialize('theme', theme, {
			path: '/',
			httpOnly: true,
			sameSite: true
		})
	};

	const data = {
		message: 'success',
		theme
	};
	return new Response(JSON.stringify({ data }), { status: 200, headers });
};
