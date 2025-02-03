import { dev } from '$app/environment';
import db from '$lib/database';
import { Prisma } from '@prisma/client';
import { error, json, type RequestHandler } from '@sveltejs/kit';

export const GET = (async ({ setHeaders, url }) => {
	try {
		const blogs = await db.blog.findMany({
			where: {
				published: true,
				markdown: {
					contains: url.searchParams.get('search') ?? '',
					mode: 'insensitive'
				}
			},
			select: {
				id: true,
				title: true,
				slug: true,
				createdAt: true,
				categoryId: true,
				markdown: true,
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

		return json(blogs);
	} catch (e) {
		console.error('PUBLIC BLOGS SERVER ERROR: ', e);

		if (e instanceof Prisma.PrismaClientKnownRequestError) {
			return error(400, 'Connection time out, could not connect to the server');
		}

		return error(500, 'Something went wrong!!');
	}
}) satisfies RequestHandler;
