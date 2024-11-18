import type { PageLoad } from './$types';
import type { Blog } from '@prisma/client';

export const ssr = false;

export interface BlogWithComments extends Blog {
	comments: Array<never>[];
}

export const load = (async ({ fetch }) => {
	const blogsResponse = await fetch(`/api/blogs`);

	const blogs: BlogWithComments[] = await blogsResponse.json();

	console.log(blogs);

	return {
		blogs
	};
}) satisfies PageLoad;
