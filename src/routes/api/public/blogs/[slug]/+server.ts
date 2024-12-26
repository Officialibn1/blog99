import { dev } from '$app/environment';
import db from '$lib/database';
import { Prisma } from '@prisma/client';

import { error, json, type RequestHandler } from '@sveltejs/kit';

export const GET = (async ({ params: { slug }, setHeaders }) => {
	try {
		if (!slug) {
			error(400, {
				message: 'Invalid Blog Slug.'
			});
		}
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

		if (!blog) {
			error(404, {
				message: 'Blog not found'
			});
		}

		await db.blog.update({
			where: {
				slug
			},
			data: {
				views: blog.views + 1
			}
		});

		return json(blog);
	} catch (e) {
		if (e instanceof Error) {
			console.log(e);

			return error(404, e.message);
		} else if (e instanceof Prisma.PrismaClientKnownRequestError) {
			console.error('Prisma Database Error:', e);

			return error(409, e.message);
		} else {
			return error(500, 'Internal Server Error');
		}
	}
}) satisfies RequestHandler;
