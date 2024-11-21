import { dev } from '$app/environment';
import db from '$lib/database';

import { error, json, type RequestHandler } from '@sveltejs/kit';

export const GET = (async ({ params: { slug }, setHeaders }) => {
	try {
		const blog = await db.blog.findUnique({
			where: {
				slug
			},
			include: {
				comments: true,
				category: true,
				tags: true,
				author: true
			}
		});

		setHeaders({
			'Cache-Control': `max-age=${dev ? 0 : 3600}`
		});

		return json(blog);
	} catch (e) {
		error(400, `Failed to get Blog, Errors: ${JSON.stringify(e, null, 2)}`);
	}
}) satisfies RequestHandler;
