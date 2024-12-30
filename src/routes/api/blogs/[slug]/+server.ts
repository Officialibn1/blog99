import { SECRET_INGREDIENT } from '$env/static/private';
import db from '$lib/database';
import { error, json, type RequestHandler } from '@sveltejs/kit';
import jwt from 'jsonwebtoken';

export const GET = (async ({ cookies, params }) => {
	const authToken = cookies.get('adminSession');

	if (!authToken) {
		error(400, 'Unauthorized');
	}

	try {
		const claims = jwt.verify(authToken, SECRET_INGREDIENT);

		if (!claims) {
			cookies.delete('adminSession', { path: '/' });

			error(400, 'Session Expired');
		}

		const admin = await db.user.findUnique({ where: { authToken } });

		if (!admin) {
			cookies.delete('adminSession', { path: '/' });

			error(400, `User doesn't exist /  Session Expired`);
		}

		const blog = await db.blog.findUnique({
			where: { id: params.slug }
		});

		return json(blog);
	} catch (e) {
		error(400, e instanceof Error ? e.message : JSON.stringify(e));
	}
}) satisfies RequestHandler;
