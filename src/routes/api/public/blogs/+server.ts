import { dev } from '$app/environment';
import db from '$lib/database';
import { error, json, type RequestHandler } from '@sveltejs/kit';

export const GET = (async ({ setHeaders }) => {
	try {
		const blogs = await db.blog.findMany({
			where: { published: true },
			select: {
				id: true,
				title: true,
				slug: true,
				createdAt: true,
				categoryId: true,
				thumbnail: true,
				tags: {
					select: {
						name: true
					}
				}
			},
			orderBy: {
				createdAt: 'desc'
			}
		});

		setHeaders({
			'Cache-Control': `max-age=${dev ? 0 : 3600}`
		});

		// console.log('BLOGS DATA IN PUBLIC API ROUTE: ', blogs);

		return json(blogs);
	} catch (e) {
		console.error('PUBLIC BLOGS SERVER ERROR: ', e);

		error(400, JSON.stringify(e, null, 2));
	}
}) satisfies RequestHandler;
