import { SECRET_INGREDIENT } from '$env/static/private';
import db from '$lib/database';
import { error, json, type RequestHandler } from '@sveltejs/kit';
import jwt from 'jsonwebtoken';

export const GET = (async ({ cookies }) => {
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

			error(400, 'User does not exist / Session Expired');
		}

		const traffic = await db.traffic.findMany({
			orderBy: {
				date: 'asc'
			}
		});

		return json(traffic);
	} catch (e) {
		error(400, e instanceof Error ? e.message : String(e));
	}
}) satisfies RequestHandler;
